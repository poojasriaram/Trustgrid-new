import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsDashboard, FilterOptions } from '@/lib/analytics-service'

const MODULE_KEY_MAP: Record<string, string> = {
  'mission-control': 'missionControl',
  'executive-kpis': 'executiveKpis',
  'ad-intelligence': 'adIntelligence',
  'geo': 'geoMap',
  'geo-map': 'geoMap',
  'pareto': 'pareto',
  'heatmap': 'dailyHeatmap',
  'daily-heatmap': 'dailyHeatmap',
  'growth': 'growthMomentum',
  'growth-momentum': 'growthMomentum',
  'visitor-ratio': 'visitorRatio',
  'tech-profile': 'techProfile',
  'identity': 'identityLinker',
  'identity-linker': 'identityLinker',
  'std-deviation': 'stdDeviation',
  'sankey': 'sankeyFlow',
  'sankey-flow': 'sankeyFlow',
  'broken-links': 'brokenLinkQa',
  'broken-link-qa': 'brokenLinkQa',
  'co-occurrence': 'coOccurrence',
  'funnel': 'funnelDropOff',
  'funnel-drop-off': 'funnelDropOff',
  'lead-scoring': 'leadScoring'
}

/**
 * GET /api/analytics/[module]
 * Sub-endpoint for progressive loading and isolated module refreshing
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ module: string }> }
) {
  try {
    const { module: moduleParam } = await params
    const key = MODULE_KEY_MAP[moduleParam.toLowerCase()]

    if (!key) {
      return NextResponse.json(
        { success: false, message: `Invalid analytics module: ${moduleParam}` },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const options: FilterOptions = {
      dateRange: searchParams.get('dateRange') || 'all',
      source: searchParams.get('source') || undefined,
      refresh: searchParams.get('refresh') === 'true'
    }

    const dashboard = await getAnalyticsDashboard(options)
    const moduleData = (dashboard as any)[key]

    return NextResponse.json({
      success: true,
      module: moduleParam,
      data: moduleData,
      timestamp: dashboard.timestamp
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Error processing module analytics' },
      { status: 500 }
    )
  }
}
