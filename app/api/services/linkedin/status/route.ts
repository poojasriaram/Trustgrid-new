import { NextRequest, NextResponse } from 'next/server'
import { getLinkedInStatus, disconnectLinkedIn } from '@/lib/services/linkedin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/services/linkedin/status
 * Check LinkedIn connection status without exposing tokens or secrets.
 */
export async function GET() {
  try {
    const status = await getLinkedInStatus('admin')
    return NextResponse.json({
      success: true,
      ...status
    })
  } catch (error: any) {
    console.error('[LinkedIn Status API Error]', error?.message || error)
    return NextResponse.json(
      { success: false, connected: false, message: 'Unable to check connection status.' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/services/linkedin/status
 * Allows disconnecting the LinkedIn account.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.action === 'disconnect') {
      const removed = await disconnectLinkedIn('admin')
      return NextResponse.json({
        success: true,
        connected: false,
        message: 'LinkedIn account disconnected successfully.'
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action provided.' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('[LinkedIn Disconnect Error]', error?.message || error)
    return NextResponse.json(
      { success: false, message: 'Unable to process action.' },
      { status: 500 }
    )
  }
}
