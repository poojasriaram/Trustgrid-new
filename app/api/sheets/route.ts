import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/services/rate-limiter'

export async function GET() {
  const webhookUrl =
    process.env.TRUSTGRID_SHEET1_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_SHEET1_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL

  return NextResponse.json({
    success: true,
    service: 'Google Sheets Dual-Write Sync Engine',
    isConfigured: Boolean(webhookUrl),
    endpointType: 'Google Apps Script Web App',
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 60, identifier: 'api-sheets' })
  if (!rateLimit.success) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Missing sync payload' }, { status: 400 })
    }

    const webhookUrl =
      process.env.TRUSTGRID_SHEET1_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_TRUSTGRID_SHEET1_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: 'Google Sheet webhook URL not configured' },
        { status: 503 }
      )
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json(
        { success: false, error: `Sheet dispatch failed: ${err}` },
        { status: 502 }
      )
    }

    const data = await res.json().catch(() => ({ status: 'success' }))
    return NextResponse.json({
      success: true,
      status: 'Synced',
      response: data,
      timestamp: new Date().toISOString()
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
