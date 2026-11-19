import { NextRequest, NextResponse } from 'next/server'
import { getSystemMonitoringMetrics } from '@/lib/services/lead-orchestrator'
import { getSupabaseConfig, supabaseInsert } from '@/lib/services/supabase-leads'
import { getJiraConfig } from '@/lib/jira-service'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const detail = searchParams.get('detail') === 'full'

  const metrics = getSystemMonitoringMetrics()
  const supa = getSupabaseConfig()
  const jira = getJiraConfig()
  const sheetWebhook = Boolean(
    process.env.TRUSTGRID_SHEET1_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_SHEET1_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL
  )

  const systemStatus = {
    overallHealth: metrics.activeFailures === 0 ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    integrations: {
      supabase: {
        configured: Boolean(supa.url && supa.key),
        endpoint: supa.url,
        successCount: metrics.supabaseSuccessCount,
        failureCount: metrics.supabaseFailureCount
      },
      googleSheets: {
        configured: sheetWebhook,
        successCount: metrics.sheetSuccessCount,
        failureCount: metrics.sheetFailureCount
      },
      jiraCrm: {
        configured: Boolean(jira.apiToken),
        projectKey: jira.projectKey,
        successCount: metrics.jiraSuccessCount,
        failureCount: metrics.jiraFailureCount
      }
    },
    metrics: {
      totalLeadsIngested: metrics.totalLeadsIngested,
      activeFailures: metrics.activeFailures
    },
    recentLogs: detail ? metrics.recentLogs : metrics.recentLogs.slice(0, 10)
  }

  return NextResponse.json(systemStatus)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.entityType || !body.action) {
      return NextResponse.json({ success: false, error: 'Invalid audit payload' }, { status: 400 })
    }

    const nowIso = new Date().toISOString()
    await supabaseInsert('audit_logs', {
      entity_type: body.entityType,
      entity_id: body.entityId || 'SYSTEM',
      action: body.action,
      actor: body.actor || 'Admin',
      old_state: body.oldState || null,
      new_state: body.newState || null,
      ip_address: req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1',
      created_at: nowIso
    }).catch(() => {})

    return NextResponse.json({ success: true, timestamp: nowIso })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
