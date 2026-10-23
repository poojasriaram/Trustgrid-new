import { NextResponse } from 'next/server'
import { getLeadsStore } from '../route'
import { getAllLeadsDb } from '@/lib/db/leads'
import { detectTestLead } from '@/lib/lead-normalization'

/**
 * GET /api/leads/stats - Returns administrative metrics, attribution breakdown & test lead audit
 */
export async function GET() {
  const store = getLeadsStore()
  const inMemoryLeads = Array.from(store.values())

  let dbLeads: any[] = []
  try {
    dbLeads = getAllLeadsDb()
  } catch (e) {
    // SQLite fallback
  }

  const leads = inMemoryLeads.length > 0 ? inMemoryLeads : dbLeads

  const totalLeads = leads.length
  let jiraCreated = 0
  let jiraPending = 0
  let jiraFailed = 0
  let skippedNonSales = 0
  let testLeadsCount = 0
  let productionLeadsCount = 0

  const sourceBreakdown: Record<string, number> = {
    'Google Ads': 0,
    'YouTube': 0,
    'Meta / Facebook': 0,
    'Affiliate': 0,
    'Organic': 0,
    'Community': 0,
    'Direct': 0,
    'Referral': 0,
    'LinkedIn': 0,
    'Other': 0
  }

  const leadTypeBreakdown: Record<string, number> = {}

  for (const item of leads) {
    const isMemory = 'normalized' in item
    const norm = isMemory ? item.normalized : item
    const jResult = isMemory ? item.jiraResult : { status: 'Created' }

    // Jira Status
    if (jResult?.status === 'Created') jiraCreated++
    else if (jResult?.status === 'Pending') jiraPending++
    else if (jResult?.status === 'Failed') jiraFailed++
    else if (jResult?.status === 'Skipped_NonSales') skippedNonSales++
    else jiraCreated++

    // Test lead evaluation
    const testEval = detectTestLead({
      name: norm.name,
      email: norm.email,
      company: norm.company,
      message: norm.message
    })

    if (testEval.isTestLead) {
      testLeadsCount++
    } else {
      productionLeadsCount++
    }

    // Source Attribution
    const source = norm.channelAttribution || norm.source || 'Direct'
    sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1

    // Lead Type
    const type = norm.leadTypeLabel || norm.service || 'Enterprise Inquiry'
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
      testLeadsCount,
      productionLeadsCount,
      retryRequired: jiraFailed
    },
    sourceBreakdown,
    leadTypeBreakdown,
    timestamp: new Date().toISOString()
  })
}

