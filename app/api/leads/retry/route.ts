import { NextRequest, NextResponse } from 'next/server'
import { getLeadsStore } from '../route'
import { createJiraLead } from '@/lib/jira-service'

/**
 * POST /api/leads/retry - Retries Jira creation for failed or pending leads
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const targetLeadId = body.leadId as string | undefined

    const store = getLeadsStore()
    const results: Array<{ leadId: string; success: boolean; status: string; issueKey?: string; error?: string }> = []

    for (const [id, record] of store.entries()) {
      if (targetLeadId && id !== targetLeadId) continue

      if (record.jiraResult.status === 'Failed' || record.jiraResult.status === 'Pending') {
        record.retryCount += 1
        const retryResult = await createJiraLead(record.normalized)
        record.jiraResult = retryResult

        results.push({
          leadId: id,
          success: retryResult.success,
          status: retryResult.status,
          issueKey: retryResult.issueKey,
          error: retryResult.error
        })
      }
    }

    return NextResponse.json({
      success: true,
      retriedCount: results.length,
      results
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Retry operation failed', error: err?.message },
      { status: 500 }
    )
  }
}
