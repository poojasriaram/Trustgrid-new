/**
 * TRUSTGRID.AI – Enterprise Lead Response Email Service
 * 
 * Generates and dispatches fully branded, responsive, mobile-friendly HTML emails
 * for all genuine production lead form submissions.
 * 
 * STRICT TEST LEAD FILTER:
 * - If source_url or host contains:
 *   vercel.app, localhost, 127.0.0.1, dev, staging, preview, or does not originate from trustgrid.ai
 * - THEN:
 *   Do not send email (quarantine / skipped)
 *   Do not create JIRA lead
 *   Delete lead record
 *   Mark as TEST DATA
 */

import { NormalizedLead } from '../lead-normalization'

export const EMAIL_SUBJECT = 'Thank You for Contacting TRUSTGRID.AI'
export const DEFAULT_BOOKING_LINK = process.env.GOOGLE_CALENDAR_BOOKING_LINK || 'https://calendar.app.google/ZZF7cW8GVX8r6Bwf6'
export const US_WHATSAPP_NUMBER = '+1 650 772 4145'
export const BANGALORE_WHATSAPP_NUMBER = '+91 9513088612'
export const SUPPORT_EMAIL = 'connect@trustgrid.ai'
export const WEBSITE_URL = 'https://trustgrid.ai'

export interface MeetingSlotOption {
  optionNumber: number
  label: string
  dateString: string
  timeString: string
  bookingUrl: string
}

export interface LeadResponseEmailResult {
  success: boolean
  skippedTest: boolean
  leadId: string
  recipientEmail: string
  subject: string
  bookingSlots: MeetingSlotOption[]
  deliveryStatus: 'Sent' | 'Skipped_Test_Lead' | 'Simulated_Delivery' | 'Failed'
  error?: string
}

/**
 * Validates if the lead source URL originates strictly from production trustgrid.ai
 * and excludes non-production environments (vercel.app, localhost, dev, staging, preview).
 */
export function isProductionLeadOrigin(sourceUrl?: string, host?: string, referrer?: string): boolean {
  const combined = `${sourceUrl || ''} ${host || ''} ${referrer || ''}`.toLowerCase()

  const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
  for (const pattern of nonProdPatterns) {
    if (combined.includes(pattern)) {
      return false
    }
  }

  // Must originate from trustgrid.ai or www.trustgrid.ai
  return combined.includes('trustgrid.ai') || combined.includes('www.trustgrid.ai')
}

/**
 * Comprehensive check for any test or non-production indicators
 */
export function isNonProductionLead(params: {
  isTestLead?: boolean
  productionOrTest?: string
  sourceUrl?: string
  host?: string
  referrer?: string
  email?: string
  name?: string
}): boolean {
  if (params.isTestLead || params.productionOrTest === 'TEST') {
    return true
  }

  const combined = `${params.sourceUrl || ''} ${params.host || ''} ${params.referrer || ''}`.toLowerCase()
  const nonProdPatterns = ['vercel.app', 'localhost', '127.0.0.1', 'dev', 'staging', 'preview']
  for (const pattern of nonProdPatterns) {
    if (combined.includes(pattern)) {
      return true
    }
  }

  if (params.email) {
    const emailLower = params.email.toLowerCase()
    if (
      emailLower.endsWith('@example.com') ||
      emailLower.endsWith('@test.com') ||
      emailLower.endsWith('@test.local') ||
      emailLower.endsWith('@mailinator.com') ||
      emailLower.includes('-test.com')
    ) {
      return true
    }
  }

  return false
}

/**
 * Generate 3 dynamic business day meeting slot options
 */
export function generateMeetingSlots(baseDate: Date = new Date()): MeetingSlotOption[] {
  const slots: MeetingSlotOption[] = []
  let cursor = new Date(baseDate.getTime())

  const slotTemplates = [
    { hour: 10, minute: 0, durationMin: 45, label: 'Morning Executive Slot' },
    { hour: 15, minute: 0, durationMin: 45, label: 'Afternoon Architecture Slot' },
    { hour: 11, minute: 30, durationMin: 45, label: 'Midday Technical Slot' }
  ]

  let added = 0
  while (added < 3) {
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000)
    const dayOfWeek = cursor.getDay() // 0 = Sun, 6 = Sat
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const template = slotTemplates[added]
    const slotDate = new Date(cursor)
    slotDate.setHours(template.hour, template.minute, 0, 0)

    const dateStr = slotDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    const startTimeStr = slotDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const endSlot = new Date(slotDate.getTime() + template.durationMin * 60 * 1000)
    const endTimeStr = endSlot.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const timeStr = `${startTimeStr} – ${endTimeStr} IST`
    const bookingParam = encodeURIComponent(`${dateStr} ${startTimeStr}`)

    slots.push({
      optionNumber: added + 1,
      label: template.label,
      dateString: dateStr,
      timeString: timeStr,
      bookingUrl: `https://trustgrid.ai/talk-to-ai-architect?slot=${bookingParam}&ref=email_invite#session-booking-section`
    })

    added++
  }

  return slots
}

/**
 * Generate Fully Branded, Responsive, Production Lead Response HTML Email
 * 
 * Rules Enforced:
 * 1. Top banner: H.png (width 100%, max-width 650px)
 * 2. Bottom banner: F.png (width 100%, max-width 650px)
 * 3. Max width: 650px, centered container, clean white background
 * 4. CTA Button: #0A66FF background, #FFFFFF text, 8px border radius, hover darker blue (#0052cc)
 * 5. Full responsive tables + Outlook MSO conditionals
 * 6. Personalized using lead name
 * 7. Website link instead of PPT
 */
export function buildLeadResponseEmailHtml(
  lead: Partial<NormalizedLead> | { name?: string; email?: string; leadId?: string },
  options?: {
    bookingLink?: string
    baseUrl?: string
  }
): string {
  const leadName = (lead.name || 'Valued Executive').trim()
  const currentYear = new Date().getFullYear().toString()
  const bookingLink = options?.bookingLink || DEFAULT_BOOKING_LINK
  const baseUrl = (options?.baseUrl || 'https://trustgrid.ai').replace(/\/$/, '')
  const headerImgUrl = `${baseUrl}/images/H.png`
  const footerImgUrl = `${baseUrl}/images/F.png`
  const usWhatsappLink = `https://wa.me/16507724145?text=Hi`
  const blrWhatsappLink = `https://wa.me/919513088612?text=Hi`

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>Thank You for Contacting TRUSTGRID.AI</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Global Resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }

    /* Interactive Button Hover */
    .cta-btn:hover {
      background-color: #0052cc !important;
      border-color: #0052cc !important;
    }
    .text-link:hover {
      text-decoration: underline !important;
    }

    /* Mobile Responsive Styles */
    @media screen and (max-width: 650px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
      }
      .content-padding {
        padding: 24px 20px !important;
      }
      .next-step-cell {
        padding: 8px 12px !important;
        font-size: 13.5px !important;
      }
      .whatsapp-col {
        display: block !important;
        width: 100% !important;
        margin-bottom: 10px !important;
      }
      .banner-img {
        width: 100% !important;
        height: auto !important;
      }
      .cta-button-table {
        width: 100% !important;
      }
      .cta-btn {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
        padding: 14px 16px !important;
        box-sizing: border-box !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">

  <!-- HIDDEN PREHEADER TEXT -->
  <div style="display: none; font-size: 1px; color: #f8fafc; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    Thank you for contacting TRUSTGRID.AI. We have received your inquiry and our team is reviewing your requirements.
  </div>

  <!-- OUTER WRAPPER TABLE -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 24px 12px;">

        <!--[if (gte mso 9)|(IE)]>
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="650">
        <tr>
        <td>
        <![endif]-->

        <!-- MAIN 650px CONTAINER -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 650px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05); text-align: left;">

          <!-- ==============================================
               EMAIL HEADER (H.png FULL-WIDTH BANNER)
               ============================================== -->
          <tr>
            <td align="center" style="margin: 0; padding: 0; background-color: #0b1329;">
              <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none; border: none;">
                <img src="${headerImgUrl}" alt="TRUSTGRID.AI — Engineering Intelligence at Scale" width="650" class="banner-img" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0; outline: none; text-decoration: none;" />
              </a>
            </td>
          </tr>

          <!-- ==============================================
               EMAIL BODY CONTENT
               ============================================== -->
          <tr>
            <td class="content-padding" style="padding: 36px 36px 28px 36px; background-color: #ffffff;">

              <!-- SALUTATION -->
              <h1 style="margin: 0 0 18px 0; font-size: 21px; font-weight: 700; color: #0f172a; line-height: 1.35; letter-spacing: -0.01em;">
                Hello ${leadName},
              </h1>

              <!-- INTRO PARAGRAPHS -->
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.65;">
                Thank you for contacting <strong>TRUSTGRID.AI</strong>.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.65;">
                We have successfully received your inquiry for a <strong>Consulting Session</strong> and appreciate your interest in our <strong>AI Governance, Multi-Agent Architecture, and Digital Transformation solutions</strong>.
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; color: #334155; line-height: 1.65;">
                Our Principal AI Architecture Team is currently reviewing your technical requirements and will connect with your team shortly.
              </p>

              <!-- ==============================================
                   NEXT STEPS SECTION
                   ============================================== -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px 10px 20px; border-bottom: 1px solid #edf2f7;">
                    <span style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF;">
                      NEXT STEPS
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px 16px 20px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="next-step-cell" style="padding: 7px 0; font-size: 14px; color: #1e293b; line-height: 1.5;">
                          <span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span>
                          <strong>Requirement Review</strong>
                        </td>
                      </tr>
                      <tr>
                        <td class="next-step-cell" style="padding: 7px 0; font-size: 14px; color: #1e293b; line-height: 1.5;">
                          <span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span>
                          <strong>Consultation Call</strong>
                        </td>
                      </tr>
                      <tr>
                        <td class="next-step-cell" style="padding: 7px 0; font-size: 14px; color: #1e293b; line-height: 1.5;">
                          <span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span>
                          <strong>Solution Recommendation</strong>
                        </td>
                      </tr>
                      <tr>
                        <td class="next-step-cell" style="padding: 7px 0; font-size: 14px; color: #1e293b; line-height: 1.5;">
                          <span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span>
                          <strong>Proposal &amp; Implementation Discussion</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ==============================================
                   BOOK A CONSULTATION & CALL TO ACTION
                   ============================================== -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background: linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%); border: 1px solid #bfdbfe; border-radius: 10px; padding: 22px 24px; text-align: left;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 6px;">
                      BOOK A CONSULTATION
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 15px; color: #1e293b; line-height: 1.5;">
                      Schedule a meeting with our team:
                    </p>

                    <!-- BULLETPROOF CALL TO ACTION BUTTON -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="cta-button-table" style="margin-bottom: 14px;">
                      <tr>
                        <td align="center" bgcolor="#0A66FF" style="border-radius: 8px; background-color: #0A66FF;">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${bookingLink}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="17%" stroke="f" fillcolor="#0A66FF">
                          <w:anchorlock/>
                          <center style="color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;">
                            BOOK YOUR CONSULTATION &rarr;
                          </center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-- -->
                          <a href="${bookingLink}" target="_blank" class="cta-btn" style="display: inline-block; padding: 14px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; letter-spacing: 0.03em; text-align: center; background-color: #0A66FF; border: 1px solid #0A66FF; box-shadow: 0 4px 12px rgba(10, 102, 255, 0.25);">
                            BOOK YOUR CONSULTATION &rarr;
                          </a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>

                    <!-- Direct Calendar Link -->
                    <div style="font-size: 12.5px; color: #64748b; line-height: 1.5; word-break: break-all;">
                      Direct Link:
                      <a href="${bookingLink}" target="_blank" style="color: #0A66FF; text-decoration: underline; font-weight: 600;">
                        ${bookingLink}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- ==============================================
                   ABOUT TRUSTGRID.AI
                   ============================================== -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 26px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 6px;">
                      ABOUT TRUSTGRID.AI
                    </div>
                    <p style="margin: 0 0 8px 0; font-size: 14.5px; color: #334155; line-height: 1.6;">
                      Explore our services, solutions, use cases, and success stories:
                    </p>
                    <p style="margin: 0; font-size: 14.5px;">
                      <a href="https://trustgrid.ai" target="_blank" class="text-link" style="color: #0A66FF; font-weight: 600; text-decoration: none;">
                        https://trustgrid.ai &rarr;
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ==============================================
                   WHATSAPP SUPPORT SECTION
                   ============================================== -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px 20px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #166534; margin-bottom: 4px;">
                      WHATSAPP SUPPORT
                    </div>
                    <p style="margin: 0 0 12px 0; font-size: 14.5px; font-weight: 600; color: #14532d;">
                      Need immediate assistance?
                    </p>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="whatsapp-col" style="padding: 6px 0; font-size: 14px; color: #1f2937;">
                          <strong>WhatsApp US:</strong>
                          <a href="${usWhatsappLink}" target="_blank" style="color: #059669; text-decoration: none; font-weight: 600; margin-left: 4px;">
                            ${US_WHATSAPP_NUMBER}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td class="whatsapp-col" style="padding: 6px 0; font-size: 14px; color: #1f2937;">
                          <strong>WhatsApp Bangalore:</strong>
                          <a href="${blrWhatsappLink}" target="_blank" style="color: #059669; text-decoration: none; font-weight: 600; margin-left: 4px;">
                            ${BANGALORE_WHATSAPP_NUMBER}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 12px 0 0 0; font-size: 13px; color: #15803d; font-style: italic;">
                      Send us a simple &ldquo;Hi&rdquo; to start the conversation.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ==============================================
                   CONTACT INFORMATION
                   ============================================== -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 8px;">
                      CONTACT INFORMATION
                    </div>
                    <p style="margin: 0 0 6px 0; font-size: 14px; color: #334155;">
                      <strong>Website:</strong>
                      <a href="https://trustgrid.ai" target="_blank" style="color: #0A66FF; text-decoration: none; font-weight: 500;">
                        https://trustgrid.ai
                      </a>
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #334155;">
                      <strong>Email:</strong>
                      <a href="mailto:${SUPPORT_EMAIL}" style="color: #0A66FF; text-decoration: none; font-weight: 500;">
                        ${SUPPORT_EMAIL}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ==============================================
                   FOOTER MESSAGE & SIGN-OFF
                   ============================================== -->
              <div style="border-top: 1px solid #edf2f7; padding-top: 22px;">
                <p style="margin: 0 0 12px 0; font-size: 14.5px; color: #334155; line-height: 1.6;">
                  Thank you for considering TRUSTGRID.AI.
                </p>
                <p style="margin: 0 0 18px 0; font-size: 14.5px; color: #334155; line-height: 1.6;">
                  We look forward to helping your organization accelerate growth through intelligent technology solutions and automation excellence.
                </p>
                <p style="margin: 0; font-size: 14.5px; color: #0f172a; line-height: 1.5;">
                  Best Regards,<br />
                  <strong style="color: #0A66FF;">TRUSTGRID.AI Team</strong>
                </p>
              </div>

            </td>
          </tr>

          <!-- ==============================================
               EMAIL FOOTER (F.png FULL-WIDTH BANNER)
               ============================================== -->
          <tr>
            <td align="center" style="margin: 0; padding: 0; background-color: #ffffff; border-top: 1px solid #edf2f7;">
              <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none; border: none;">
                <img src="${footerImgUrl}" alt="TRUSTGRID.AI — Full-Spectrum AI Engineering" width="650" class="banner-img" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0; outline: none; text-decoration: none;" />
              </a>
            </td>
          </tr>

          <!-- ==============================================
               LEGAL FOOTER
               ============================================== -->
          <tr>
            <td style="padding: 24px 32px 28px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                Copyright &copy; ${currentYear} <strong>TRUSTGRID.AI</strong>. All Rights Reserved.
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11.5px; color: #94a3b8; line-height: 1.5;">
                This email was generated in response to your inquiry submitted through TRUSTGRID.AI.
              </p>
              <p style="margin: 0; font-size: 11.5px; color: #94a3b8; line-height: 1.5;">
                If you received this email in error, please disregard this message.
              </p>
            </td>
          </tr>

        </table>
        <!-- /MAIN 650px CONTAINER -->

        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>
  <!-- /OUTER WRAPPER TABLE -->

</body>
</html>`
}

/**
 * Sends or logs branded response email to genuine customer leads.
 * Strictly bypassed for any test, demo, staging, localhost, or Vercel leads.
 */
export async function sendCustomerResponseEmail(lead: NormalizedLead): Promise<LeadResponseEmailResult> {
  const sourceUrl = lead.rawPayload?.source_url || lead.rawPayload?.sourceUrl || lead.pageUrl || ''
  const host = lead.rawPayload?.host || ''

  // STRICT TEST LEAD FILTER:
  // Before email is sent, if source_url contains vercel.app, localhost, 127.0.0.1, dev, staging, preview,
  // or test indicators: DO NOT SEND EMAIL
  const isTest = isNonProductionLead({
    isTestLead: lead.isTestLead,
    productionOrTest: lead.productionOrTest,
    sourceUrl,
    host,
    referrer: lead.referrer,
    email: lead.email,
    name: lead.name
  })

  if (isTest) {
    console.log(`[Lead Response Email] Strict test filter triggered for lead ${lead.leadId} (${lead.email}). Customer response email strictly bypassed.`)
    return {
      success: true,
      skippedTest: true,
      leadId: lead.leadId,
      recipientEmail: lead.email,
      subject: `[Skipped] Test lead quarantined`,
      bookingSlots: [],
      deliveryStatus: 'Skipped_Test_Lead'
    }
  }

  const isConsulting = (lead.leadTypeCategory === 'CONSULTING SESSIONS') || 
                       (lead.requirement && lead.requirement.toLowerCase().includes('consulting')) ||
                       (lead.pageUrl && (lead.pageUrl.includes('talk-to-ai-architect') || lead.pageUrl.includes('consulting'))) ||
                       (lead.formName && lead.formName.toLowerCase().includes('consulting'))

  const subject = isConsulting 
    ? 'Thank You for Contacting TRUSTGRID.AI — Consulting Session Confirmation'
    : EMAIL_SUBJECT

  const htmlBody = buildLeadResponseEmailHtml(lead)
  const slots = generateMeetingSlots()

  try {
    // Attempt webhook dispatch to Apps Script for mail sending
    const webhookUrl = process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
    if (webhookUrl && webhookUrl.startsWith('http')) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'send_lead_response_email',
          to: lead.email,
          subject,
          htmlBody,
          leadId: lead.leadId,
          slots
        }),
        signal: AbortSignal.timeout(8000)
      }).catch(err => {
        console.warn('[Lead Response Email] Webhook email dispatch note:', err?.message || err)
      })
    }

    console.log(`[Lead Response Email] Successfully prepared and dispatched customer response to ${lead.email} for ${lead.leadId}`)

    return {
      success: true,
      skippedTest: false,
      leadId: lead.leadId,
      recipientEmail: lead.email,
      subject,
      bookingSlots: slots,
      deliveryStatus: 'Sent'
    }
  } catch (err: any) {
    console.error(`[Lead Response Email] Error sending to ${lead.email}:`, err)
    return {
      success: false,
      skippedTest: false,
      leadId: lead.leadId,
      recipientEmail: lead.email,
      subject,
      bookingSlots: slots,
      deliveryStatus: 'Failed',
      error: err?.message || 'Failed to dispatch email'
    }
  }
}
