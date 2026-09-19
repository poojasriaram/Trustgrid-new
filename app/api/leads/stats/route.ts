import { NextResponse } from 'next/server'
import { getLeadsStore } from '../route'

/**
 * GET /api/leads/stats - Returns administrative metrics & attribution breakdown
 */
export async function GET() {
  const store = getLeadsStore()
  const leads = Array.from(store.values())

  const totalLeads = leads.length
  let jiraCreated = 0
  let jiraPending = 0
  let jiraFailed = 0
  let skippedNonSales = 0

  const sourceBreakdown: Record<string, number> = {
    'Google Ads': 0,
    'YouTube': 0,
    'Meta / Facebook': 0,
    'Affiliate': 0,
    'Organic': 0,
    'Community': 0,
    'Direct': 0,
    'Referral': 0,
    'Other': 0
  }

  const leadTypeBreakdown: Record<string, number> = {}

  for (const item of leads) {
    // Jira Status
    if (item.jiraResult.status === 'Created') jiraCreated++
    else if (item.jiraResult.status === 'Pending') jiraPending++
    else if (item.jiraResult.status === 'Failed') jiraFailed++
    else if (item.jiraResult.status === 'Skipped_NonSales') skippedNonSales++

    // Source Attribution
    const source = item.normalized.channelAttribution || 'Direct'
    sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1

    // Lead Type
    const type = item.normalized.leadTypeLabel || 'Other'
    leadTypeBreakdown[type] = (leadTypeBreakdown[type] || 0) + 1
  }

  return NextResponse.json({
    success: true,
    metrics: {
      totalLeads,
      jiraCreated,
      jiraPending,
      jiraFailed,
      skippedNonSales,
      retryRequired: jiraFailed
    },
    sourceBreakdown,
    leadTypeBreakdown,
    timestamp: new Date().toISOString()
  })
}
