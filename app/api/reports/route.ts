import { NextRequest, NextResponse } from 'next/server'
import {
  generateDailyProductionReport,
  generateWeeklyExecutiveSummary,
  getConsolidatedLeads
} from '@/lib/services/executive-reporting'

/**
 * GET /api/reports - Retrieve Production Daily & Weekly Reports (Strictly filtered)
 * Query params: ?type=daily | weekly | audit
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const reportType = (searchParams.get('type') || 'daily').toLowerCase()
    const dateParam = searchParams.get('date') || undefined

    if (reportType === 'weekly') {
      const weekly = await generateWeeklyExecutiveSummary()
      return NextResponse.json({
        success: true,
        report: weekly
      })
    }

    if (reportType === 'audit' || reportType === 'leads') {
      const allLeads = await getConsolidatedLeads()
      const realLeads = allLeads.filter(l => !l.isTestLead)
      const testLeads = allLeads.filter(l => l.isTestLead)

      return NextResponse.json({
        success: true,
        totalLeads: allLeads.length,
        realLeadsCount: realLeads.length,
        testLeadsCount: testLeads.length,
        retainedRealLeads: realLeads,
        quarantinedTestLeads: testLeads
      })
    }

    // Default: Daily Report
    const daily = await generateDailyProductionReport(dateParam)
    return NextResponse.json({
      success: true,
      report: daily
    })
  } catch (err: any) {
    console.error('[Reports API Error]', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to generate report' },
      { status: 500 }
    )
  }
}
