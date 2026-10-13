/**
 * TRUSTGRID.AI - Automated WhatsApp Lead Notification Service
 * Dispatches instant lead alerts to the admin/executive team whenever any form is submitted.
 * 
 * Supported Providers:
 * 1. CallMeBot API (100% Free - zero portal signup, active in 60 seconds)
 * 2. Meta WhatsApp Cloud API (Official Meta Developer App)
 * 3. Generic WhatsApp Webhook (WATI, Aisensy, Interakt, UltraMsg)
 */

export interface LeadNotificationPayload {
  leadId: string
  name: string
  email: string
  company: string
  phone?: string
  service?: string
  message?: string
  source?: string
  formType?: string
  pageUrl?: string
  utmCampaign?: string
}

export interface WhatsAppSendResult {
  success: boolean
  provider: string
  skipped?: boolean
  error?: string
  data?: any
}

/**
 * Format a rich WhatsApp message with badges and dividers
 */
function buildWhatsAppMessageText(lead: LeadNotificationPayload): string {
  const istTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  const lines = [
    `🚨 *NEW TRUSTGRID.AI LEAD ALERT* 🚨`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🆔 *Lead ID:* \`${lead.leadId}\``,
    `👤 *Name:* *${lead.name}*`,
    `🏢 *Company:* ${lead.company}`,
    `📧 *Work Email:* ${lead.email}`,
    `📱 *Phone:* ${lead.phone && lead.phone.trim() ? lead.phone : 'Not provided'}`,
    `🎯 *Service/Interest:* ${lead.service || lead.formType || 'Enterprise AI Stack'}`,
    `🌐 *Source:* ${lead.source || 'Website Lead'}`,
  ]

  if (lead.utmCampaign) {
    lines.push(`📢 *Campaign:* ${lead.utmCampaign}`)
  }

  if (lead.message && lead.message.trim()) {
    lines.push(`💬 *Message:* _${lead.message.replace(/\n/g, ' ')}_`)
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━`)
  lines.push(`⏰ *Received:* ${istTime}`)
  lines.push(`⚡ *Action:* Please follow up within 15 minutes.`)

  return lines.join('\n')
}

/**
 * Option 1: UltraMsg WhatsApp Gateway (Active & Working)
 */
async function sendViaUltraMsg(
  instanceId: string,
  token: string,
  recipientPhone: string,
  message: string
): Promise<WhatsAppSendResult> {
  const cleanPhone = recipientPhone.replace(/[^\d]/g, '')
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`
  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`

  try {
    const params = new URLSearchParams()
    params.append('token', token)
    params.append('to', formattedPhone)
    params.append('body', message)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      signal: AbortSignal.timeout(10000)
    })

    const data = await res.json()
    if (data.sent === 'true' || data.id) {
      console.log(`[WhatsApp:UltraMsg] Alert successfully queued/sent to ${formattedPhone}`)
      return { success: true, provider: 'UltraMsg', data }
    } else {
      console.warn(`[WhatsApp:UltraMsg Notice]`, data)
      return { success: false, provider: 'UltraMsg', error: data.message || JSON.stringify(data) }
    }
  } catch (err: any) {
    console.error('[WhatsApp:UltraMsg Error]', err?.message || err)
    return { success: false, provider: 'UltraMsg', error: err?.message || 'Timeout' }
  }
}

/**
 * Option 2: Twilio WhatsApp Service
 */
async function sendViaTwilio(
  accountSid: string,
  authToken: string,
  recipientPhone: string,
  message: string
): Promise<WhatsAppSendResult> {
  const cleanPhone = recipientPhone.replace(/[^\d]/g, '')
  const to = `whatsapp:+${cleanPhone}`
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

  try {
    const params = new URLSearchParams()
    params.append('From', from)
    params.append('To', to)
    params.append('Body', message)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      signal: AbortSignal.timeout(10000)
    })

    const data = await res.json()
    if (res.ok && data.sid) {
      console.log(`[WhatsApp:Twilio] Alert delivered with SID: ${data.sid}`)
      return { success: true, provider: 'Twilio', data }
    } else if (data.code === 21654) {
      // ContentSid Required on Trial account - fallback to approved Content template
      const contentSid = process.env.TWILIO_CONTENT_SID || ''
      const fallbackParams = new URLSearchParams()
      fallbackParams.append('From', from)
      fallbackParams.append('To', to)
      fallbackParams.append('ContentSid', contentSid)

      const fallbackRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fallbackParams.toString(),
        signal: AbortSignal.timeout(10000)
      })
      const fallbackData = await fallbackRes.json()
      if (fallbackRes.ok && fallbackData.sid) {
        console.log(`[WhatsApp:Twilio] Template alert delivered with SID: ${fallbackData.sid}`)
        return { success: true, provider: 'Twilio (Template)', data: fallbackData }
      }
      return { success: false, provider: 'Twilio', error: fallbackData.message }
    } else {
      console.warn(`[WhatsApp:Twilio Error]`, data)
      return { success: false, provider: 'Twilio', error: data.message || JSON.stringify(data) }
    }
  } catch (err: any) {
    console.error('[WhatsApp:Twilio Exception]', err?.message || err)
    return { success: false, provider: 'Twilio', error: err?.message || 'Timeout' }
  }
}

/**
 * Option 3: CallMeBot WhatsApp Gateway
 */
async function sendViaCallMeBot(
  phone: string,
  apiKey: string,
  message: string
): Promise<WhatsAppSendResult> {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const encodedText = encodeURIComponent(message)
  const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodedText}&apikey=${apiKey}`

  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(10000)
    })
    const textResp = await res.text()

    if (res.ok && !textResp.toLowerCase().includes('error')) {
      console.log(`[WhatsApp:CallMeBot] Alert successfully delivered to ${cleanPhone}`)
      return { success: true, provider: 'CallMeBot', data: textResp }
    } else {
      console.warn(`[WhatsApp:CallMeBot Notice] Response: ${textResp}`)
      return { success: false, provider: 'CallMeBot', error: textResp }
    }
  } catch (err: any) {
    console.error('[WhatsApp:CallMeBot Error]', err?.message || err)
    return { success: false, provider: 'CallMeBot', error: err?.message || 'Timeout' }
  }
}

/**
 * Option 2: Meta Official WhatsApp Cloud API
 */
async function sendViaMetaCloud(
  recipientPhone: string,
  token: string,
  phoneNumberId: string,
  message: string
): Promise<WhatsAppSendResult> {
  const cleanPhone = recipientPhone.replace(/[^\d]/g, '')
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: message }
      }),
      signal: AbortSignal.timeout(10000)
    })

    const data = await res.json()
    if (res.ok) {
      console.log(`[WhatsApp:Meta] Alert delivered to ${cleanPhone}`)
      return { success: true, provider: 'Meta Cloud API', data }
    } else {
      console.error('[WhatsApp:Meta Error]', data)
      return { success: false, provider: 'Meta Cloud API', error: JSON.stringify(data) }
    }
  } catch (err: any) {
    console.error('[WhatsApp:Meta Dispatch Error]', err?.message || err)
    return { success: false, provider: 'Meta Cloud API', error: err?.message || 'Timeout' }
  }
}

/**
 * Option 3: Custom Webhook (WATI / Aisensy / Interakt / Zapier / Make)
 */
async function sendViaCustomWebhook(
  webhookUrl: string,
  lead: LeadNotificationPayload,
  message: string
): Promise<WhatsAppSendResult> {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'TRUSTGRID_LEAD_SUBMISSION',
        recipientPhone: process.env.ADMIN_WHATSAPP_PHONE || '919513088611',
        lead,
        formattedMessage: message,
        timestamp: new Date().toISOString()
      }),
      signal: AbortSignal.timeout(10000)
    })
    return { success: res.ok, provider: 'Custom Webhook' }
  } catch (err: any) {
    return { success: false, provider: 'Custom Webhook', error: err?.message }
  }
}

/**
 * Central Lead WhatsApp Notification Dispatcher
 * Automatically checks configured environment variables and dispatches through the active provider.
 */
export async function sendWhatsAppLeadAlert(
  lead: LeadNotificationPayload
): Promise<WhatsAppSendResult> {
  const message = buildWhatsAppMessageText(lead)
  const adminPhone = process.env.ADMIN_WHATSAPP_PHONE || '919513088611'

  // 1. Twilio Provider Check (Configured)
  const twilioSid = process.env.TWILIO_ACCOUNT_SID
  const twilioToken = process.env.TWILIO_AUTH_TOKEN
  if (twilioSid && twilioToken) {
    return await sendViaTwilio(twilioSid.trim(), twilioToken.trim(), adminPhone, message)
  }

  // 2. UltraMsg Provider Check (Active & Verified)
  const ultramsgInstance = process.env.ULTRAMSG_INSTANCE_ID
  const ultramsgToken = process.env.ULTRAMSG_TOKEN
  if (ultramsgInstance && ultramsgToken) {
    return await sendViaUltraMsg(ultramsgInstance.trim(), ultramsgToken.trim(), adminPhone, message)
  }

  // 2. CallMeBot Provider Check
  const callMeBotApiKey = process.env.CALLMEBOT_API_KEY
  if (callMeBotApiKey && callMeBotApiKey.trim()) {
    return await sendViaCallMeBot(adminPhone, callMeBotApiKey.trim(), message)
  }

  // 2. Meta WhatsApp Cloud API Check
  const metaToken = process.env.WHATSAPP_API_TOKEN
  const metaPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (metaToken && metaPhoneId) {
    return await sendViaMetaCloud(adminPhone, metaToken, metaPhoneId, message)
  }

  // 3. Custom Webhook Check
  const customWebhook = process.env.WHATSAPP_WEBHOOK_URL
  if (customWebhook && customWebhook.startsWith('http')) {
    return await sendViaCustomWebhook(customWebhook, lead, message)
  }

  console.log('[WhatsApp Notification] No WhatsApp API key found in environment. WhatsApp alert skipped.')
  return {
    success: false,
    skipped: true,
    provider: 'None',
    error: 'No WhatsApp API key or credentials configured in .env.local'
  }
}
