import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import {
  getSupabaseServerCredentials,
  mapRawRowToCopperProfile,
  CopperProfileRecord
} from '@/lib/copper/server-mapper'

export const dynamic = 'force-dynamic'

const BATCH_SIZE = 500
const MAX_RETRIES = 3

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function upsertCopperBatchRpc(
  url: string,
  serviceRoleKey: string,
  batchRecords: CopperProfileRecord[]
) {
  let lastError: any = null
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${url}/rest/v1/rpc/upsert_copper_profiles_batch`, {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_records: batchRecords }),
        cache: 'no-store'
      })

      if (!res.ok) {
        const errText = await res.text().catch(() => `HTTP ${res.status}`)
        throw new Error(`HTTP ${res.status}: ${errText}`)
      }

      const data = await res.json()
      return {
        inserted: Number(data.inserted || 0),
        updated: Number(data.updated || 0),
        failed: Number(data.failed || 0),
        errors: Array.isArray(data.errors) ? data.errors : []
      }
    } catch (err: any) {
      lastError = err
      if (attempt < MAX_RETRIES) {
        await sleep(800 * Math.pow(2, attempt - 1))
      }
    }
  }

  return {
    inserted: 0,
    updated: 0,
    failed: batchRecords.length,
    errors: batchRecords.map((r, idx) => ({
      batch_index: idx + 1,
      profile_id: r.profile_id || 'UNKNOWN',
      company_name: r.company_name || '',
      source_sheet: r.source_sheet || '',
      reason: `RPC failed after ${MAX_RETRIES} retries: ${lastError?.message || 'Unknown error'}`
    }))
  }
}

export async function GET() {
  try {
    const { url, serviceRoleKey } = getSupabaseServerCredentials()
    const rootDir = process.cwd()

    const reportPath = path.join(rootDir, 'data', 'copper_import_report.json')
    const progressPath = path.join(rootDir, 'data', 'copper_import_progress.json')
    const failedPath = path.join(rootDir, 'data', 'copper_failed_records.json')

    const report = fs.existsSync(reportPath)
      ? JSON.parse(fs.readFileSync(reportPath, 'utf8'))
      : null
    const progress = fs.existsSync(progressPath)
      ? JSON.parse(fs.readFileSync(progressPath, 'utf8'))
      : null
    const failedRecords = fs.existsSync(failedPath)
      ? JSON.parse(fs.readFileSync(failedPath, 'utf8'))
      : []

    let liveSummary = null
    let previewRecords: any[] = []

    if (url && serviceRoleKey) {
      const [summaryRes, previewRes] = await Promise.all([
        fetch(`${url}/rest/v1/rpc/get_copper_validation_summary`, {
          method: 'POST',
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}),
          cache: 'no-store'
        }).catch(() => null),
        fetch(
          `${url}/rest/v1/copper_profiles?select=profile_id,full_name,company_name,designation,industry,location,linkedin_url,website,business_email,phone,source_sheet,capture_date,data_status,validation_status,duplicate_status&order=created_at.desc&limit=20`,
          {
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
              Accept: 'application/json'
            },
            cache: 'no-store'
          }
        ).catch(() => null)
      ])

      if (summaryRes && summaryRes.ok) {
        liveSummary = await summaryRes.json().catch(() => null)
      }
      if (previewRes && previewRes.ok) {
        previewRecords = await previewRes.json().catch(() => [])
      }
    }

    return NextResponse.json({
      success: true,
      report,
      progress,
      failedRecords: failedRecords.slice(0, 200),
      liveSummary,
      previewRecords
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to load Copper import status' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, serviceRoleKey } = getSupabaseServerCredentials()
    if (!url || !serviceRoleKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Server environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are not configured.'
        },
        { status: 500 }
      )
    }

    const body = await req.json()
    const rawRows: Record<string, any>[] = Array.isArray(body.records) ? body.records : []
    const fileName: string = body.fileName || 'Uploaded_Dataset.csv'
    const sourceSheet: string = body.sourceSheet || fileName.replace(/\.csv$/i, '')
    const startIndex: number = Number(body.startIndex || 0)

    if (rawRows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No records provided in batch payload.' },
        { status: 400 }
      )
    }

    const mappedRecords: CopperProfileRecord[] = []
    const validationErrors: any[] = []

    for (let i = 0; i < rawRows.length; i++) {
      const mapped = mapRawRowToCopperProfile(rawRows[i], sourceSheet, startIndex + i + 2, fileName)
      if (!mapped.profile_id) {
        validationErrors.push({
          batch_index: i + 1,
          profile_id: 'MISSING',
          company_name: mapped.company_name || '',
          source_sheet: mapped.source_sheet || sourceSheet,
          reason: 'Mandatory profile_id could not be resolved or generated'
        })
        continue
      }
      mappedRecords.push(mapped)
    }

    let inserted = 0
    let updated = 0
    let failed = validationErrors.length
    const errors: any[] = [...validationErrors]

    for (let i = 0; i < mappedRecords.length; i += BATCH_SIZE) {
      const chunk = mappedRecords.slice(i, i + BATCH_SIZE)
      const res = await upsertCopperBatchRpc(url, serviceRoleKey, chunk)
      inserted += res.inserted
      updated += res.updated
      failed += res.failed
      if (res.errors.length > 0) {
        errors.push(...res.errors)
      }
    }

    return NextResponse.json({
      success: true,
      inserted,
      updated,
      failed,
      errors
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Copper batch import error' },
      { status: 500 }
    )
  }
}

