/**
 * ============================================================================
 * TRUSTGRID.AI — COMPREHENSIVE FORM & TRAFFIC ANALYTICS ENGINE
 * ============================================================================
 * Enterprise-grade telemetry engine providing:
 * 1. Form-wise funnel analytics (view -> start -> field -> error -> abandon -> submit -> success -> lead)
 * 2. Multi-touch UTM and traffic attribution (first-touch, last-touch, landing, referrer)
 * 3. Chatbot funnel & lead attribution tracking
 * 4. WhatsApp CTA click & context tracking
 * 5. Google Analytics 4 (GA4) / GTM dataLayer push compatibility
 * 6. Non-blocking delivery via Beacon API & no-cors fetch
 */

export interface TrackingEvent {
  eventId?: string
  eventType: string
  sessionId: string
  timestamp: string
  pageUrl: string
  pagePath: string
  pageTitle: string
  referrer: string
  landingPage: string
  previousPage?: string
  element?: string
  elementId?: string
  elementText?: string
  section?: string
  destination?: string
  
  // Traffic & Attribution
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  firstTouchSource?: string
  lastTouchSource?: string
  
  // Device & Environment
  device: string
  browser: string
  operatingSystem: string
  screenSize: string
  scrollDepth?: number
  timeOnPage?: number
  
  // Form Funnel Attributes
  formId?: string
  formName?: string
  formType?: string
  formStep?: string | number
  fieldName?: string
  ctaSource?: string
  leadSource?: string
  leadStatus?: string
  
  // Chatbot Telemetry
  chatSessionId?: string
  chatIntent?: string
  offeringInterest?: string
  industryInterest?: string
  
  // WhatsApp Telemetry
  whatsappPosition?: string
  
  metadata?: Record<string, any>
}

const SESSION_KEY = 'tg_session_id'
const SESSION_START_KEY = 'tg_session_start'
const LANDING_KEY = 'tg_landing_page'
const REFERRER_KEY = 'tg_initial_referrer'
const UTM_KEY = 'tg_utm_data'
const FIRST_TOUCH_KEY = 'tg_first_touch'
const LAST_TOUCH_KEY = 'tg_last_touch'
const PREV_PAGE_KEY = 'tg_previous_page'

const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxwUkYylflGO1ylxVtgb_qn9FlEuf4NP23CEqDX_FVXGbwg46q5bcXE71BErLTBIGCG/exec'

/**
 * Gets or creates anonymous Session ID
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server_session'

  let sid = sessionStorage.getItem(SESSION_KEY)
  if (!sid) {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    sid = `SES-${timestamp}-${randomStr}`
    sessionStorage.setItem(SESSION_KEY, sid)
    sessionStorage.setItem(SESSION_START_KEY, new Date().toISOString())
  }
  return sid
}

/**
 * Reads & persists UTM parameters with First-Touch and Last-Touch logic
 */
export function getStoredUtmData() {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      firstTouch: 'Direct / Organic',
      lastTouch: 'Direct / Organic'
    }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const sourceParam = urlParams.get('utm_source')
  const mediumParam = urlParams.get('utm_medium')
  const campaignParam = urlParams.get('utm_campaign')
  const termParam = urlParams.get('utm_term')
  const contentParam = urlParams.get('utm_content')

  const currentSourceString = sourceParam
    ? `${sourceParam} / ${mediumParam || 'cpc'}`
    : document.referrer && !document.referrer.includes(window.location.hostname)
    ? `Referral: ${new URL(document.referrer).hostname}`
    : 'Direct / Organic'

  // 1. First Touch Attribution (persisted permanently in localStorage)
  let firstTouch = localStorage.getItem(FIRST_TOUCH_KEY)
  if (!firstTouch) {
    firstTouch = currentSourceString
    localStorage.setItem(FIRST_TOUCH_KEY, firstTouch)
  }

  // 2. Last Touch Attribution (updated per session / campaign)
  let lastTouch = currentSourceString
  if (sourceParam || mediumParam || campaignParam) {
    sessionStorage.setItem(LAST_TOUCH_KEY, lastTouch)
    localStorage.setItem(LAST_TOUCH_KEY, lastTouch)
  } else {
    lastTouch = sessionStorage.getItem(LAST_TOUCH_KEY) || localStorage.getItem(LAST_TOUCH_KEY) || firstTouch
  }

  const currentUtm = {
    utmSource: sourceParam || '',
    utmMedium: mediumParam || '',
    utmCampaign: campaignParam || '',
    utmTerm: termParam || '',
    utmContent: contentParam || '',
  }

  if (currentUtm.utmSource || currentUtm.utmMedium || currentUtm.utmCampaign) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(currentUtm))
    localStorage.setItem(UTM_KEY, JSON.stringify(currentUtm))
    return { ...currentUtm, firstTouch, lastTouch }
  }

  try {
    const stored = sessionStorage.getItem(UTM_KEY) || localStorage.getItem(UTM_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...parsed, firstTouch, lastTouch }
    }
  } catch (e) {}

  return {
    utmSource: 'Direct / Organic',
    utmMedium: 'None',
    utmCampaign: 'None',
    utmTerm: 'None',
    utmContent: 'None',
    firstTouch,
    lastTouch
  }
}

function detectDevice(): string {
  if (typeof window === 'undefined') return 'Desktop'
  const ua = navigator.userAgent.toLowerCase()
  const w = window.innerWidth
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet'
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua) || w < 768) return 'Mobile'
  return 'Desktop'
}

function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const ua = navigator.userAgent
  if (ua.indexOf('Firefox') > -1) return 'Firefox'
  if (ua.indexOf('SamsungBrowser') > -1) return 'Samsung Internet'
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera'
  if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) return 'Microsoft Edge'
  if (ua.indexOf('Chrome') > -1) return 'Chrome'
  if (ua.indexOf('Safari') > -1) return 'Safari'
  return 'Other'
}

function detectOS(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const ua = navigator.userAgent
  if (ua.indexOf('Win') !== -1) return 'Windows'
  if (ua.indexOf('Mac') !== -1 && !/iPhone|iPad|iPod/.test(ua)) return 'macOS'
  if (ua.indexOf('Linux') !== -1) return 'Linux'
  if (ua.indexOf('Android') !== -1) return 'Android'
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  return 'Other'
}

/**
 * Builds base event context payload
 */
export function buildBaseEvent(eventType: string, extraData: Partial<TrackingEvent> = {}): TrackingEvent {
  const sessionId = getOrCreateSessionId()
  const utm = getStoredUtmData()

  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(LANDING_KEY, window.location.href)
    }
    if (!sessionStorage.getItem(REFERRER_KEY) && document.referrer) {
      sessionStorage.setItem(REFERRER_KEY, document.referrer)
    }
  }

  const landingPage = typeof window !== 'undefined' ? (sessionStorage.getItem(LANDING_KEY) || window.location.href) : ''
  const referrer = typeof window !== 'undefined' ? (sessionStorage.getItem(REFERRER_KEY) || document.referrer || 'Direct') : 'Direct'
  const previousPage = typeof window !== 'undefined' ? (sessionStorage.getItem(PREV_PAGE_KEY) || '') : ''

  const eventId = `EVT-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`

  return {
    eventId,
    eventType,
    sessionId,
    timestamp: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
    pageTitle: typeof window !== 'undefined' ? document.title : '',
    referrer,
    landingPage,
    previousPage,
    utmSource: utm.utmSource || 'Direct / Organic',
    utmMedium: utm.utmMedium || 'None',
    utmCampaign: utm.utmCampaign || 'None',
    utmTerm: utm.utmTerm || 'None',
    utmContent: utm.utmContent || 'None',
    firstTouchSource: utm.firstTouch,
    lastTouchSource: utm.lastTouch,
    device: detectDevice(),
    browser: detectBrowser(),
    operatingSystem: detectOS(),
    screenSize: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
    ...extraData,
  }
}

/**
 * Non-blocking dispatch to Google Apps Script & Google Tag Manager dataLayer
 */
export function sendAnalyticsEvent(event: TrackingEvent): void {
  if (typeof window === 'undefined') return

  // 1. Push to GTM / GA4 dataLayer if available
  try {
    const w = window as any
    if (w.dataLayer && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: event.eventType.toLowerCase(),
        ...event
      })
    }
  } catch (e) {}

  // 2. Dispatch to Apps Script webhook
  const endpoint =
    process.env.NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    DEFAULT_ENDPOINT

  const payloadStr = JSON.stringify(event)

  try {
    if (navigator.sendBeacon && typeof Blob !== 'undefined') {
      const blob = new Blob([payloadStr], { type: 'text/plain;charset=utf-8' })
      const sent = navigator.sendBeacon(endpoint, blob)
      if (sent) return
    }
  } catch (e) {}

  try {
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payloadStr,
      keepalive: true,
    }).catch(() => {})
  } catch (e) {}
}

/**
 * Page View
 */
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  const event = buildBaseEvent('PAGE_VIEW', {
    pagePath: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    pageTitle: pageTitle || (typeof window !== 'undefined' ? document.title : ''),
  })
  sendAnalyticsEvent(event)

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(PREV_PAGE_KEY, window.location.pathname)
  }
}

/**
 * CTA Tracking
 */
export function trackCTA(ctaName: string, destination?: string, section?: string, ctaSource?: string): void {
  const event = buildBaseEvent('CTA_CLICK', {
    element: 'CTA Button / Link',
    elementText: ctaName,
    destination: destination || '',
    section: section || 'Main Body',
    ctaSource: ctaSource || section || 'website_cta'
  })
  sendAnalyticsEvent(event)
}

/**
 * Navigation Menu Click
 */
export function trackNavigation(menuName: string, menuItem: string, destination?: string): void {
  const event = buildBaseEvent('NAVIGATION_CLICK', {
    element: 'Navigation Menu',
    elementText: `${menuName} > ${menuItem}`,
    section: menuName,
    destination: destination || '',
  })
  sendAnalyticsEvent(event)
}

/**
 * ============================================================================
 * FORM-WISE FUNNEL TRACKING
 * ============================================================================
 */
export function trackFormView(formId: string, formName: string, formType = 'lead_form', ctaSource = 'page_embed'): void {
  const event = buildBaseEvent('FORM_VIEW', {
    formId,
    formName,
    formType,
    ctaSource,
    element: 'Form Container',
    elementText: `Viewed ${formName}`
  })
  sendAnalyticsEvent(event)
}

export function trackFormStart(formId: string, formName: string, firstField = 'name'): void {
  const event = buildBaseEvent('FORM_START', {
    formId,
    formName,
    fieldName: firstField,
    elementText: `Started ${formName} at field ${firstField}`
  })
  sendAnalyticsEvent(event)
}

export function trackFormFieldInteraction(formId: string, formName: string, fieldName: string): void {
  const event = buildBaseEvent('FORM_FIELD_INTERACTION', {
    formId,
    formName,
    fieldName,
    elementText: `Interacted with field: ${fieldName}`
  })
  sendAnalyticsEvent(event)
}

export function trackFormValidationError(formId: string, formName: string, fieldName: string, errorMsg: string): void {
  const event = buildBaseEvent('FORM_VALIDATION_ERROR', {
    formId,
    formName,
    fieldName,
    elementText: errorMsg
  })
  sendAnalyticsEvent(event)
}

export function trackFormAbandon(formId: string, formName: string, lastFieldInteracted?: string): void {
  const event = buildBaseEvent('FORM_ABANDON', {
    formId,
    formName,
    fieldName: lastFieldInteracted,
    elementText: `Abandoned ${formName} after ${lastFieldInteracted || 'initial input'}`
  })
  sendAnalyticsEvent(event)
}

export function trackFormSubmit(formId: string, formName: string, isSuccess: boolean, submissionId?: string, errorMsg?: string): void {
  const event = buildBaseEvent(isSuccess ? 'FORM_SUCCESS' : 'FORM_FAILURE', {
    formId,
    formName,
    elementId: submissionId,
    elementText: isSuccess ? 'Form Submitted Successfully' : (errorMsg || 'Form Submission Failed'),
    leadStatus: isSuccess ? 'SUBMITTED' : 'FAILED'
  })
  sendAnalyticsEvent(event)

  if (isSuccess) {
    const leadEvent = buildBaseEvent('LEAD_CREATED', {
      formId,
      formName,
      elementId: submissionId,
      leadSource: formName,
      elementText: `New Lead Created: ${submissionId}`
    })
    sendAnalyticsEvent(leadEvent)
  }
}

/**
 * ============================================================================
 * CHATBOT TELEMETRY
 * ============================================================================
 */
export function trackChatbotEvent(eventType: string, extraData: Partial<TrackingEvent> = {}): void {
  const event = buildBaseEvent(`CHAT_${eventType.toUpperCase()}`, {
    formId: 'form_chat_lead',
    formName: 'Chatbot Lead Capture',
    ...extraData
  })
  sendAnalyticsEvent(event)
}

/**
 * ============================================================================
 * WHATSAPP CONVERSION TRACKING
 * ============================================================================
 */
export function trackWhatsAppClick(source = 'floating_cta', position = 'bottom-right', contextTopic?: string): void {
  const event = buildBaseEvent('WHATSAPP_CLICK', {
    element: 'WhatsApp CTA',
    ctaSource: source,
    whatsappPosition: position,
    elementText: contextTopic ? `WhatsApp Inquiry: ${contextTopic}` : 'WhatsApp Direct Chat',
    destination: 'https://wa.me/'
  })
  sendAnalyticsEvent(event)
}

/**
 * Outbound Link Clicks
 */
export function trackOutboundClick(url: string, linkText?: string): void {
  let eventType = 'OUTBOUND_LINK_CLICK'
  if (url.startsWith('mailto:')) eventType = 'EMAIL_CLICK'
  if (url.startsWith('tel:')) eventType = 'PHONE_CLICK'

  const event = buildBaseEvent(eventType, {
    destination: url,
    elementText: linkText || url,
  })
  sendAnalyticsEvent(event)
}

/**
 * Scroll Depth Tracking
 */
const trackedDepths = new Set<number>()

export function initScrollTracking(): () => void {
  if (typeof window === 'undefined') return () => {}

  trackedDepths.clear()

  const handleScroll = () => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return

    const percent = Math.round((scrollY / docHeight) * 100)
    const milestones = [25, 50, 75, 90, 100]
    
    for (const milestone of milestones) {
      if (percent >= milestone && !trackedDepths.has(milestone)) {
        trackedDepths.add(milestone)
        const event = buildBaseEvent('SCROLL_DEPTH', {
          scrollDepth: milestone,
          elementText: `${milestone}% Page Depth`,
        })
        sendAnalyticsEvent(event)
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}
