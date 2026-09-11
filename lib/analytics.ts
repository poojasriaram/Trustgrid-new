/**
 * ============================================================================
 * TRUSTGRID.AI — COMPREHENSIVE CLIENT-SIDE ANALYTICS & TELEMETRY ENGINE
 * ============================================================================
 * Asynchronous, non-blocking telemetry engine for Page Views, Sessions,
 * CTA Clicks, Navigation Clicks, Form Lifecycles, Scroll Depth, and Outbound Links.
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
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  device: string
  browser: string
  operatingSystem: string
  screenSize: string
  scrollDepth?: number
  timeOnPage?: number
  formName?: string
  formId?: string
  formStep?: string | number
  metadata?: Record<string, any>
}

const SESSION_KEY = 'tg_session_id'
const SESSION_START_KEY = 'tg_session_start'
const LANDING_KEY = 'tg_landing_page'
const REFERRER_KEY = 'tg_initial_referrer'
const UTM_KEY = 'tg_utm_data'
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
 * Reads & persists UTM parameters
 */
export function getStoredUtmData() {
  if (typeof window === 'undefined') {
    return { utmSource: '', utmMedium: '', utmCampaign: '', utmTerm: '', utmContent: '' }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const currentUtm = {
    utmSource: urlParams.get('utm_source') || '',
    utmMedium: urlParams.get('utm_medium') || '',
    utmCampaign: urlParams.get('utm_campaign') || '',
    utmTerm: urlParams.get('utm_term') || '',
    utmContent: urlParams.get('utm_content') || '',
  }

  if (currentUtm.utmSource || currentUtm.utmMedium || currentUtm.utmCampaign) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(currentUtm))
    localStorage.setItem(UTM_KEY, JSON.stringify(currentUtm))
    return currentUtm
  }

  try {
    const stored = sessionStorage.getItem(UTM_KEY) || localStorage.getItem(UTM_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}

  return { utmSource: 'Direct / Organic', utmMedium: 'None', utmCampaign: 'None', utmTerm: 'None', utmContent: 'None' }
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
function buildBaseEvent(eventType: string, extraData: Partial<TrackingEvent> = {}): TrackingEvent {
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
    device: detectDevice(),
    browser: detectBrowser(),
    operatingSystem: detectOS(),
    screenSize: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
    ...extraData,
  }
}

/**
 * Non-blocking dispatch to Google Apps Script #1
 */
export function sendAnalyticsEvent(event: TrackingEvent): void {
  if (typeof window === 'undefined') return

  const endpoint =
    process.env.NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    DEFAULT_ENDPOINT

  const payloadStr = JSON.stringify(event)

  try {
    // 1. Try sendBeacon for zero impact on navigation/page teardown
    if (navigator.sendBeacon && typeof Blob !== 'undefined') {
      const blob = new Blob([payloadStr], { type: 'text/plain;charset=utf-8' })
      const sent = navigator.sendBeacon(endpoint, blob)
      if (sent) return
    }
  } catch (e) {}

  // 2. Fallback to background fetch with mode: 'no-cors'
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
 * 1. Track Page View
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
 * 2. Track CTA Click
 */
export function trackCTA(ctaName: string, destination?: string, section?: string): void {
  const event = buildBaseEvent('CTA_CLICK', {
    element: 'CTA Button / Link',
    elementText: ctaName,
    destination: destination || '',
    section: section || 'Main Body',
  })
  sendAnalyticsEvent(event)
}

/**
 * 3. Track Navigation Click
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
 * 4. Track Form Lifecycle Events
 */
export function trackFormView(formName: string, formId?: string): void {
  const event = buildBaseEvent('FORM_VIEW', {
    formName,
    formId: formId || formName,
  })
  sendAnalyticsEvent(event)
}

export function trackFormStart(formName: string, formId?: string): void {
  const event = buildBaseEvent('FORM_START', {
    formName,
    formId: formId || formName,
  })
  sendAnalyticsEvent(event)
}

export function trackFormStep(formName: string, stepNumber: number | string, stepTitle?: string): void {
  const event = buildBaseEvent('FORM_STEP_COMPLETED', {
    formName,
    formStep: stepNumber,
    elementText: stepTitle || `Step ${stepNumber}`,
  })
  sendAnalyticsEvent(event)
}

export function trackFormSubmit(formName: string, success: boolean, submissionId?: string, errorMsg?: string): void {
  const event = buildBaseEvent(success ? 'FORM_SUCCESS' : 'FORM_ERROR', {
    formName,
    elementId: submissionId,
    elementText: errorMsg || 'Submission Complete',
  })
  sendAnalyticsEvent(event)
}

/**
 * 5. Track Outbound Links, Phone & Email clicks
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
 * 6. Track Scroll Depth
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
