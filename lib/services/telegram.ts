/**
 * TRUSTGRID.AI - Telegram Real-Time Lead Notification Service
 * Delivers instantaneous, complete lead alert cards with full details to Telegram.
 */

export interface TelegramLeadPayload {
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

export interface TelegramSendResult {
  success: boolean
  skipped?: boolean
  error?: string
  data?: any
}

function buildTelegramHtmlMessage(lead: TelegramLeadPayload): string {
  const istTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  let html = `🚨 <b>NEW TRUSTGRID.AI LEAD ALERT</b> 🚨\n`
  html += `━━━━━━━━━━━━━━━━━━━━\n`
  html += `🆔 <b>Lead ID:</b> <code>${escapeHtml(lead.leadId)}</code>\n`
  html += `👤 <b>Name:</b> <b>${escapeHtml(lead.name)}</b>\n`
  html += `🏢 <b>Company:</b> ${escapeHtml(lead.company)}\n`
  html += `📧 <b>Work Email:</b> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>\n`
  html += `📱 <b>Phone:</b> ${lead.phone && lead.phone.trim() ? `<code>${escapeHtml(lead.phone)}</code>` : '<i>Not provided</i>'}\n`
  html += `🎯 <b>Service / Interest:</b> ${escapeHtml(lead.service || lead.formType || 'Enterprise AI Stack')}\n`
  html += `🌐 <b>Source:</b> ${escapeHtml(lead.source || 'Website Form')}\n`

  if (lead.utmCampaign) {
    html += `📢 <b>Campaign:</b> ${escapeHtml(lead.utmCampaign)}\n`
  }

  if (lead.message && lead.message.trim()) {
    html += `💬 <b>Message:</b> <i>${escapeHtml(lead.message.replace(/\n/g, ' '))}</i>\n`
  }

  html += `━━━━━━━━━━━━━━━━━━━━\n`
  html += `⏰ <b>Received:</b> ${istTime}\n`
  html += `⚡ <b>Action:</b> Please follow up within 15 minutes.`

  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Dispatch Lead Notification to Telegram Bot
 */
export async function sendTelegramLeadAlert(lead: TelegramLeadPayload): Promise<TelegramSendResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return { success: false, skipped: true, error: 'Telegram credentials not configured in .env.local' }
  }

  const text = buildTelegramHtmlMessage(lead)
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      signal: AbortSignal.timeout(10000)
    })

    const data = await res.json()
    if (res.ok && data.ok) {
      console.log(`[Telegram:Alert] Lead notification successfully sent to Telegram (chat_id: ${chatId})`)
      return { success: true, data }
    } else {
      console.warn(`[Telegram:Alert Warning]`, data)
      return { success: false, error: data.description }
    }
  } catch (err: any) {
    console.error(`[Telegram:Alert Error]`, err?.message || err)
    return { success: false, error: err?.message || 'Timeout' }
  }
}
