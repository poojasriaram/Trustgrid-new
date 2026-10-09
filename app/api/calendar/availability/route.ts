import { NextRequest, NextResponse } from 'next/server'
import { fetchCalendarAvailability } from '@/lib/services/google-calendar'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')
    const timezone = searchParams.get('timezone') || 'America/New_York'

    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Missing required query parameter "date" (YYYY-MM-DD).' },
        { status: 400 }
      )
    }

    // Validate format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, message: 'Invalid date format. Expected YYYY-MM-DD.' },
        { status: 400 }
      )
    }

    const availability = await fetchCalendarAvailability(date, timezone)

    return NextResponse.json({
      success: true,
      ...availability
    })
  } catch (error: any) {
    console.error('[Calendar Availability API Error]', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve calendar availability. Please try again or reach out to connect@trustgrid.ai directly.'
      },
      { status: 500 }
    )
  }
}
