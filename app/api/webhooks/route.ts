import { NextRequest, NextResponse } from 'next/server'
import { processInboundLead } from '@/lib/services/lead-orchestrator'
import { supabaseInsert } from '@/lib/services/supabase-leads'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const provider = searchParams.get('provider') || 'generic'

  try {
    const payload = await req.json().catch(() => null)
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Empty webhook payload' }, { status: 400 })
    }

    const nowIso = new Date().toISOString()

    // 1. Calendly Webhook Handler
    if (provider === 'calendly') {
      const invitee = payload.payload?.invitee || {}
      const eventDetails = payload.payload?.event || {}

      if (invitee.email) {
        await processInboundLead({
          name: invitee.name || 'Calendly Guest',
          email: invitee.email,
          source: 'Calendly',
          serviceInterest: 'Executive Consultation',
          message: `Scheduled Event: ${eventDetails.name || 'Executive Session'} at ${eventDetails.start_time || ''}`,
          rawPayload: payload
        })
      }
      return NextResponse.json({ success: true, processedAs: 'calendly' })
    }

    // 2. WhatsApp Business Inbound Webhook
    if (provider === 'whatsapp') {
      const entry = payload.entry?.[0]?.changes?.[0]?.value || {}
      const contact = entry.contacts?.[0] || {}
      const message = entry.messages?.[0] || {}

      if (contact.wa_id) {
        await processInboundLead({
          name: contact.profile?.name || 'WhatsApp Lead',
          email: `${contact.wa_id}@whatsapp.inbound`,
          phone: `+${contact.wa_id}`,
          source: 'WhatsApp',
          serviceInterest: 'AI Systems Scoping',
          message: message.text?.body || 'WhatsApp Direct Scoping Inquiry',
          rawPayload: payload
        })
      }
      return NextResponse.json({ success: true, processedAs: 'whatsapp' })
    }

    // 3. LinkedIn Lead Gen Webhook
    if (provider === 'linkedin') {
      const leadData = payload.lead_gen_data || {}
      if (leadData.email) {
        await processInboundLead({
          name: leadData.name || 'LinkedIn Prospect',
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          source: 'LinkedIn',
          serviceInterest: leadData.service || 'Enterprise AI Infrastructure',
          message: leadData.message || 'LinkedIn Inbound Lead Gen Form',
          rawPayload: payload
        })
      }
      return NextResponse.json({ success: true, processedAs: 'linkedin' })
    }

    // 4. Jira Webhook Callback (Status transition / ticket close)
    if (provider === 'jira') {
      const issue = payload.issue || {}
      const changelog = payload.changelog || {}

      await supabaseInsert('jira_sync_logs', {
        lead_id: issue.key || 'UNKNOWN',
        action: 'WEBHOOK_CALLBACK',
        status: 'SUCCESS',
        jira_issue_key: issue.key || '',
        response_payload: { changelog, issueStatus: issue.fields?.status?.name },
        created_at: nowIso
      }).catch(() => {})

      return NextResponse.json({ success: true, processedAs: 'jira' })
    }

    // Generic Webhook Fallback
    await supabaseInsert('audit_logs', {
      entity_type: 'WEBHOOK',
      entity_id: provider,
      action: 'SYNC_DISPATCH',
      actor: `Webhook:${provider}`,
      new_state: payload,
      created_at: nowIso
    }).catch(() => {})

    return NextResponse.json({ success: true, processedAs: 'generic' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
