/**
 * TRUSTGRID.AI - Central Lead Normalization & Attribution Engine
 * Handles Lead ID generation, classification, channel attribution, and structured formatting.
 */

export type LeadType =
  | 'AI_DIAGNOSTIC'
  | 'CONTACT'
  | 'PROPOSAL'
  | 'WORKSHOP'
  | 'AI_READINESS'
  | 'TALK_TO_ARCHITECT'
  | 'SOLUTION_INTAKE'
  | 'PARTNER'
  | 'CHATBOT'
  | 'FLOATING_LEAD'
  | 'CAREER'
  | 'NEWSLETTER'
  | 'GENERAL_LEAD'

export type ChannelAttribution =
  | 'Google Ads'
  | 'YouTube'
  | 'Meta / Facebook'
  | 'Affiliate'
  | 'Organic'
  | 'Community'
  | 'Direct'
  | 'Referral'
  | 'Other'

export interface RawLeadInput {
  submissionId?: string
  formId?: string
  formName?: string
  form_type?: string
  formType?: string
  name: string
  email: string
  phone?: string
  company?: string
  designation?: string
  role?: string
  industry?: string
  companySize?: string
  country?: string
  aiMaturity?: string
  challenges?: string | string[]
  preferredTimeline?: string
  requirement?: string
  message?: string
  partnershipType?: string
  portfolio?: string
  resume?: string
  selectedSolutions?: string | string[]
  ctaSource?: string
  leadSource?: string
  chatIntent?: string
  pageUrl?: string
  page_url?: string
  referrer?: string
  utmSource?: string
  utm_source?: string
  utmMedium?: string
  utm_medium?: string
  utmCampaign?: string
  utm_campaign?: string
  utmTerm?: string
  utm_term?: string
  utmContent?: string
  utm_content?: string
  metadata?: any
}

export interface NormalizedLead {
  leadId: string
  siteOrigin: string
  isSalesLead: boolean
  leadType: LeadType
  leadTypeLabel: string
  name: string
  email: string
  phone: string
  company: string
  jobTitle: string
  industry: string
  companySize: string
  aiMaturity: string
  challenges: string
  timeline: string
  requirement: string
  message: string
  interestedSolution: string
  partnershipType: string
  portfolioUrl: string
  resumeUrl: string
  formId: string
  formName: string
  ctaSource: string
  pageUrl: string
  pageName: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  channelAttribution: ChannelAttribution
  timestampIso: string
  timestampFormatted: string
  jiraSummary: string
  jiraDescription: string
  rawPayload: Record<string, any>
}

/**
 * Generate a unique TRUSTGRID Lead ID: TG-YYYYMMDD-XXXX
 */
export function generateLeadId(prefix: string = 'TG'): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${year}${month}${day}-${randomSuffix}`
}

/**
 * Classify incoming lead into a standardized LeadType
 */
export function classifyLeadType(input: RawLeadInput): { type: LeadType; isSales: boolean; label: string } {
  const explicit = (input.form_type || input.formType || '').toUpperCase().trim()
  const idOrName = `${input.formId || ''} ${input.formName || ''} ${input.ctaSource || ''}`.toLowerCase()

  // 1. Non-Sales: Careers
  if (explicit === 'CAREER' || idOrName.includes('career') || idOrName.includes('resume') || idOrName.includes('job')) {
    return { type: 'CAREER', isSales: false, label: 'Career Application' }
  }

  // 2. Non-Sales: Newsletter only
  if (explicit === 'NEWSLETTER' || idOrName.includes('newsletter') || idOrName.includes('subscribe')) {
    return { type: 'NEWSLETTER', isSales: false, label: 'Newsletter Subscription' }
  }

  // 3. Sales Leads
  if (explicit === 'FLOATING_LEAD' || explicit === 'QUICK_INQUIRY' || idOrName.includes('floating') || idOrName.includes('quick')) {
    return { type: 'FLOATING_LEAD', isSales: true, label: 'Quick Inquiry Lead' }
  }

  if (explicit === 'AI_DIAGNOSTIC' || idOrName.includes('diag')) {
    return { type: 'AI_DIAGNOSTIC', isSales: true, label: 'AI Diagnostic Request' }
  }

  if (explicit === 'AI_READINESS' || idOrName.includes('readiness')) {
    return { type: 'AI_READINESS', isSales: true, label: 'AI Readiness Assessment' }
  }

  if (explicit === 'PROPOSAL' || idOrName.includes('proposal') || idOrName.includes('rfp')) {
    return { type: 'PROPOSAL', isSales: true, label: 'Enterprise Proposal Inquiry' }
  }

  if (explicit === 'WORKSHOP' || idOrName.includes('workshop')) {
    return { type: 'WORKSHOP', isSales: true, label: 'Use Case Workshop' }
  }

  if (explicit === 'TALK_TO_ARCHITECT' || idOrName.includes('architect')) {
    return { type: 'TALK_TO_ARCHITECT', isSales: true, label: 'Talk to AI Architect' }
  }

  if (explicit === 'PARTNER' || idOrName.includes('partner')) {
    return { type: 'PARTNER', isSales: true, label: 'Ecosystem Partner Alliance' }
  }

  if (explicit === 'CHATBOT' || idOrName.includes('chat')) {
    return { type: 'CHATBOT', isSales: true, label: 'Chatbot Lead' }
  }

  if (idOrName.includes('solution') || idOrName.includes('infra') || idOrName.includes('agentic') || idOrName.includes('network') || idOrName.includes('cyber') || idOrName.includes('value')) {
    return { type: 'SOLUTION_INTAKE', isSales: true, label: 'Solution Architecture Intake' }
  }

  if (explicit === 'CONTACT' || idOrName.includes('contact')) {
    return { type: 'CONTACT', isSales: true, label: 'Direct Contact Inquiry' }
  }

  return { type: 'GENERAL_LEAD', isSales: true, label: 'General Business Enquiry' }
}

/**
 * Attribute the acquisition channel from UTM parameters and Referrer
 */
export function deriveChannelAttribution(utmSource: string, utmMedium: string, referrer: string): ChannelAttribution {
  const src = (utmSource || '').toLowerCase().trim()
  const med = (utmMedium || '').toLowerCase().trim()
  const ref = (referrer || '').toLowerCase().trim()

  // Google Ads
  if (src.includes('google') && (med.includes('cpc') || med.includes('ppc') || med.includes('ad') || med.includes('paid'))) {
    return 'Google Ads'
  }
  if (med.includes('cpc') || med.includes('ppc') || src.includes('adwords') || src.includes('gads')) {
    return 'Google Ads'
  }

  // YouTube
  if (src.includes('youtube') || ref.includes('youtube.com') || ref.includes('youtu.be')) {
    return 'YouTube'
  }

  // Meta / Facebook / Instagram
  if (
    src.includes('meta') ||
    src.includes('facebook') ||
    src.includes('fb') ||
    src.includes('instagram') ||
    src.includes('ig') ||
    ref.includes('facebook.com') ||
    ref.includes('instagram.com')
  ) {
    return 'Meta / Facebook'
  }

  // Affiliate
  if (src.includes('affiliate') || med.includes('affiliate') || med.includes('partner_referral')) {
    return 'Affiliate'
  }

  // Community / LinkedIn / Twitter / Reddit / Slack
  if (
    src.includes('linkedin') ||
    src.includes('twitter') ||
    src.includes('x.com') ||
    src.includes('reddit') ||
    src.includes('community') ||
    ref.includes('linkedin.com') ||
    ref.includes('t.co') ||
    ref.includes('reddit.com')
  ) {
    return 'Community'
  }

  // Organic Search
  if (med.includes('organic') || src.includes('organic') || ref.includes('google.') || ref.includes('bing.') || ref.includes('duckduckgo.')) {
    return 'Organic'
  }

  // Referral
  if (ref && !ref.includes('trustgrid') && !ref.includes('localhost') && ref !== 'direct') {
    return 'Referral'
  }

  // Direct
  if (!src && (!ref || ref === 'direct' || ref.includes('trustgrid') || ref.includes('localhost'))) {
    return 'Direct'
  }

  return 'Other'
}

/**
 * Format page name cleanly from URL path
 */
export function derivePageName(pageUrl?: string): string {
  if (!pageUrl) return 'TRUSTGRID.AI Homepage'
  try {
    const url = new URL(pageUrl.startsWith('http') ? pageUrl : `https://trustgridnew.vercel.app${pageUrl}`)
    const pathname = url.pathname.replace(/\/$/, '')
    if (!pathname || pathname === '') return 'Homepage'
    if (pathname.includes('/solutions/')) {
      const slug = pathname.split('/solutions/')[1]
      return `Solution: ${slug.replace(/-/g, ' ').toUpperCase()}`
    }
    return pathname.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  } catch (e) {
    return pageUrl
  }
}

/**
 * Normalize complete lead record from any form/chatbot input
 */
export function normalizeLead(input: RawLeadInput): NormalizedLead {
  const leadId = input.submissionId && input.submissionId.startsWith('TG-')
    ? input.submissionId
    : generateLeadId()

  const siteOrigin = 'TG'
  const { type: leadType, isSales: isSalesLead, label: leadTypeLabel } = classifyLeadType(input)

  const utmSource = input.utm_source || input.utmSource || input.metadata?.utmSource || ''
  const utmMedium = input.utm_medium || input.utmMedium || input.metadata?.utmMedium || ''
  const utmCampaign = input.utm_campaign || input.utmCampaign || input.metadata?.utmCampaign || ''
  const utmTerm = input.utm_term || input.utmTerm || input.metadata?.utmTerm || ''
  const utmContent = input.utm_content || input.utmContent || input.metadata?.utmContent || ''
  const pageUrl = input.page_url || input.pageUrl || input.metadata?.pageUrl || 'https://trustgridnew.vercel.app/'
  const referrer = input.referrer || input.metadata?.referrer || 'Direct'
  const pageName = derivePageName(pageUrl)

  const channelAttribution = deriveChannelAttribution(utmSource, utmMedium, referrer)

  const solutionsStr = Array.isArray(input.selectedSolutions)
    ? input.selectedSolutions.join(', ')
    : input.selectedSolutions || ''

  const challengesStr = Array.isArray(input.challenges)
    ? input.challenges.join(', ')
    : input.challenges || ''

  const name = (input.name || 'Enterprise Inquiry').trim()
  const email = (input.email || '').trim()
  const phone = (input.phone || '').trim()
  const company = (input.company || 'Enterprise Organization').trim()
  const jobTitle = (input.designation || input.role || (leadType === 'CAREER' ? 'Applicant' : 'Executive / Lead')).trim()
  const industry = (input.industry || 'Cross-Industry').trim()
  const requirement = (input.requirement || input.message || `Inquiry submitted via ${input.formName || 'Website'}`).trim()
  const message = (input.message || input.requirement || '').trim()

  const now = new Date()
  const timestampIso = now.toISOString()
  const timestampFormatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }).format(now) + ' IST'

  // Build Parent Jira Issue Summary: [TG] [TG-YYYYMMDD-XXXX] <Lead Type> – <Company Name or Solution>
  const companyDisplay = company && company !== 'Enterprise Organization' ? company : solutionsStr || 'Enterprise AI'
  const jiraSummary = `[TG] [${leadId}] ${leadTypeLabel} – ${companyDisplay}`

  // Build Structured Clean Jira Description
  const jiraDescription = `=========================================
SITE ORIGIN: TG (TRUSTGRID.AI)
=========================================

Lead ID:
${leadId}

Lead Type:
${leadTypeLabel}

Contact Details:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not Provided'}

Company / Organization:
${company}

Job Title / Role:
${jobTitle}

Industry Sector:
${industry}

Interested Solution:
${solutionsStr || 'Enterprise AI Engineering Stack'}

Requirement / Details:
${requirement}
${challengesStr ? `\nTarget Challenges:\n${challengesStr}` : ''}
${input.aiMaturity ? `AI Maturity Stage: ${input.aiMaturity}` : ''}
${input.preferredTimeline ? `Target Timeline: ${input.preferredTimeline}` : ''}
${input.partnershipType ? `Partnership Scope: ${input.partnershipType}` : ''}
${input.portfolio ? `Portfolio/GitHub: ${input.portfolio}` : ''}

Traffic & Attribution:
Source: ${channelAttribution}
UTM Source: ${utmSource || 'N/A'}
UTM Medium: ${utmMedium || 'N/A'}
UTM Campaign: ${utmCampaign || 'N/A'}
UTM Term: ${utmTerm || 'N/A'}
UTM Content: ${utmContent || 'N/A'}
Referrer: ${referrer || 'Direct'}

Origin Page Context:
Page Name: ${pageName}
Page URL: ${pageUrl}
CTA Trigger: ${input.ctaSource || input.formName || 'Direct'}

Timestamp:
${timestampFormatted}`

  return {
    leadId,
    siteOrigin,
    isSalesLead,
    leadType,
    leadTypeLabel,
    name,
    email,
    phone,
    company,
    jobTitle,
    industry,
    companySize: input.companySize || '',
    aiMaturity: input.aiMaturity || '',
    challenges: challengesStr,
    timeline: input.preferredTimeline || '',
    requirement,
    message,
    interestedSolution: solutionsStr,
    partnershipType: input.partnershipType || '',
    portfolioUrl: input.portfolio || '',
    resumeUrl: input.resume || '',
    formId: input.formId || `form_${leadType.toLowerCase()}`,
    formName: input.formName || leadTypeLabel,
    ctaSource: input.ctaSource || 'website',
    pageUrl,
    pageName,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    channelAttribution,
    timestampIso,
    timestampFormatted,
    jiraSummary,
    jiraDescription,
    rawPayload: { ...input, leadId, siteOrigin: 'TG' }
  }
}
