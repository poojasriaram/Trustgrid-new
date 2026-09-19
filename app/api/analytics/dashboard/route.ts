import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsDashboard, FilterOptions } from '@/lib/analytics-service'

/**
 * GET /api/analytics/dashboard
 * Secure server-side endpoint returning all 16 processed Sheet 2 analytics datasets.
 * Applies date range, channel, and device filtering without exposing Google Sheets
 * credentials or sensitive private data to the client.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || 'all'
    const source = searchParams.get('source') || undefined
    const utmCampaign = searchParams.get('utmCampaign') || undefined
    const utmMedium = searchParams.get('utmMedium') || undefined
    const device = searchParams.get('device') || undefined
    const visitorType = (searchParams.get('visitorType') as 'all' | 'new' | 'returning') || 'all'
    const refresh = searchParams.get('refresh') === 'true' || searchParams.get('refresh') === '1'

    const options: FilterOptions = {
      dateRange,
      source,
      utmCampaign,
      utmMedium,
      device,
      visitorType,
      refresh
    }

    const data = await getAnalyticsDashboard(options)

    return NextResponse.json({
      success: true,
      data,
      serverTime: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Failed to load analytics dashboard:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve analytics dataset: ' + (error?.message || 'Unknown server error')
      },
      { status: 500 }
    )
  }
}
