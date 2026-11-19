import { NextRequest, NextResponse } from 'next/server'
import { processInboundLead } from '@/lib/services/lead-orchestrator'
import { checkRateLimit } from '@/lib/services/rate-limiter'

export async function POST(req: NextRequest) {
  // 1. Rate Limiting (60 requests per minute per IP)
  const rateLimit = checkRateLimit(req, { limit: 60, windowMs: 60000, identifier: 'api-forms' })
  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded. Please wait a moment before resubmitting.',
        reset: rateLimit.reset
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.reset)
        }
      }
    )
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Malformed JSON payload.' }, { status: 400 })
    }

    // 2. Anti-Spam Honeypot Check
    // If hidden fields like `website_url` or `honeypot` or `hp_field` are populated, flag as spam
    const isHoneypot = Boolean(body.website_url || body.honeypot || body.hp_field)

    const result = await processInboundLead({
      name: body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim(),
      email: body.email,
      phone: body.phone || body.mobile,
      company: body.company || body.organization,
      source: body.source || body.formName || 'Website Forms',
      campaign: body.campaign || body.utmCampaign,
      serviceInterest: body.service || body.areaOfInterest || body.serviceInterest,
      message: body.message || body.requirement || body.challengeDescription,
      utmSource: body.utm_source || body.utmSource,
      utmMedium: body.utm_medium || body.utmMedium,
      utmCampaign: body.utm_campaign || body.utmCampaign,
      utmTerm: body.utm_term || body.utmTerm,
      utmContent: body.utm_content || body.utmContent,
      pageUrl: body.page_url || body.pageUrl || req.headers.get('referer') || 'https://trustgrid.ai',
      referrer: body.referrer || req.headers.get('referer') || '',
      ipMasked: req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '0.0.***.***',
      visitorId: body.visitorId || body.visitor_id,
      sessionId: body.sessionId || body.session_id,
      isHoneypotCaught: isHoneypot,
      rawPayload: body
    })

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          status: result.status,
          errors: result.errors
        },
        { status: result.status === 'SPAM_REJECTED' ? 403 : 422 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        leadId: result.leadId,
        status: result.status,
        synced: {
          supabase: result.supabaseSynced,
          googleSheets: result.sheetSynced,
          jira: result.jiraSynced,
          jiraKey: result.jiraKey
        }
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining)
        }
      }
    )
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
