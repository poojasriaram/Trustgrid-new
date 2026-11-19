import { NextRequest, NextResponse } from 'next/server'
import { validateLeadSubmission } from '@/lib/validation'
import { insertLeadDb } from '@/lib/db/leads'
import { insertLeadToSupabase } from '@/lib/services/supabase-leads'
import { supabaseSelect } from '@/lib/supabase/api-store'

export const dynamic = 'force-dynamic'

/**
 * GET /api/leads/inbound-linkedin
 * Fetches LinkedIn inbound leads directly from Supabase (`linkedin_leads`)
 */
export async function GET() {
  try {
    const rows = await supabaseSelect<any>('linkedin_leads', 'order=id.desc&limit=100')
    return NextResponse.json({
      success: true,
      count: rows.length,
      leads: rows
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch LinkedIn leads' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/leads/inbound-linkedin
 * Dedicated LinkedIn inbound lead ingestion endpoint backed by Supabase (`linkedin_leads`, `form_submissions`, `leads`)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = validateLeadSubmission(body)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.errorMessage || 'Invalid LinkedIn lead submission.',
          errors: validation.errors
        },
        { status: 400 }
      )
    }

    const nowIso = new Date().toISOString()
    const dateStr = nowIso.slice(0, 10).replace(/-/g, '')
    const leadId =
      body.submissionId && String(body.submissionId).startsWith('TG-')
        ? String(body.submissionId)
        : `TG-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`

    // 1. Write to SQLite + Supabase `leads` table
    insertLeadDb({
      id: leadId,
      name: validation.data!.name,
      email: validation.data!.email,
      company: validation.data!.company,
      phone: validation.data!.phone || '',
      message: validation.data!.message || '',
      source: 'LinkedIn',
      service: 'LinkedIn API Integration',
      website: 'TRUSTGRID.AI',
      createdAt: nowIso,
      updatedAt: nowIso
    })

    // 2. Write to Supabase `form_submissions` + `linkedin_leads`
    const supaRes = await insertLeadToSupabase({
      leadId,
      name: validation.data!.name,
      email: validation.data!.email,
      company: validation.data!.company,
      phone: validation.data!.phone || '',
      message: validation.data!.message || '',
      source: 'LinkedIn',
      formName: 'LinkedIn API Integration',
      leadType: 'LINKEDIN_LEAD',
      timestamp: nowIso
    })

    return NextResponse.json({
      success: true,
      leadId,
      supabaseStatus: supaRes.status,
      supabaseTables: supaRes.tablesWritten
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to ingest LinkedIn lead' },
      { status: 500 }
    )
  }
}

