/**
 * TrustGrid.AI - Attribution & System Tracking Engine
 * Captures UTM parameters, referrer, landing page, device, OS, browser, and screen size.
 */

export interface TrackingMetadata {
  submissionId?: string
  timestamp: string
  formName: string
  pageUrl: string
  landingPage: string
  referrer: string
  userAgent: string
  device: string
  browser: string
  operatingSystem: string
  screenSize: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  country?: string
  region?: string
  city?: string
}

const UTM_STORAGE_KEY = 'trustgrid_utm_data'
const LANDING_STORAGE_KEY = 'trustgrid_landing_page'
const REFERRER_STORAGE_KEY = 'trustgrid_referrer'

/**
 * Initializes and stores UTM parameters from the current URL on first arrival.
 * Preserves these across all user sessions and navigation.
 */
export function initUtmTracking(): void {
  if (typeof window === 'undefined') return

  try {
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')
    const utmTerm = urlParams.get('utm_term')
    const utmContent = urlParams.get('utm_content')

    // If new UTM parameters exist in current URL, save/update them
    if (utmSource || utmMedium || utmCampaign || utmTerm || utmContent) {
      const utmData = {
        utmSource: utmSource || '',
        utmMedium: utmMedium || '',
        utmCampaign: utmCampaign || '',
        utmTerm: utmTerm || '',
        utmContent: utmContent || '',
      }
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData))
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData))
    }

    // Save initial landing page if not yet recorded
    if (!sessionStorage.getItem(LANDING_STORAGE_KEY)) {
      sessionStorage.setItem(LANDING_STORAGE_KEY, window.location.href)
      localStorage.setItem(LANDING_STORAGE_KEY, window.location.href)
    }

    // Save initial referrer if not yet recorded
    if (!sessionStorage.getItem(REFERRER_STORAGE_KEY) && document.referrer) {
      sessionStorage.setItem(REFERRER_STORAGE_KEY, document.referrer)
      localStorage.setItem(REFERRER_STORAGE_KEY, document.referrer)
    }
  } catch (err) {
    console.warn('Tracking initialization notice:', err)
  }
}

/**
 * Detects device type based on user agent and screen dimensions.
 */
function detectDevice(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet'
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent) || width < 768) {
    return 'Mobile'
  }
  return 'Desktop'
}

/**
 * Detects browser name and version.
 */
function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const ua = navigator.userAgent

  if (ua.indexOf('Firefox') > -1) return 'Firefox'
  if (ua.indexOf('SamsungBrowser') > -1) return 'Samsung Internet'
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera'
  if (ua.indexOf('Trident') > -1) return 'Internet Explorer'
  if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) return 'Microsoft Edge'
  if (ua.indexOf('Chrome') > -1) return 'Chrome'
  if (ua.indexOf('Safari') > -1) return 'Safari'
  return 'Other Browser'
}

/**
 * Detects operating system.
 */
function detectOS(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const ua = navigator.userAgent

  if (ua.indexOf('Win') !== -1) return 'Windows'
  if (ua.indexOf('Mac') !== -1 && ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1) return 'macOS'
  if (ua.indexOf('Linux') !== -1) return 'Linux'
  if (ua.indexOf('Android') !== -1) return 'Android'
  if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1 || ua.indexOf('iPod') !== -1) return 'iOS'
  return 'Other OS'
}

/**
 * Retrieves all captured metadata for form submissions.
 */
export function getTrackingMetadata(formName: string): TrackingMetadata {
  if (typeof window === 'undefined') {
    return {
      timestamp: new Date().toISOString(),
      formName,
      pageUrl: '',
      landingPage: '',
      referrer: '',
      userAgent: '',
      device: 'Desktop',
      browser: 'Unknown',
      operatingSystem: 'Unknown',
      screenSize: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
    }
  }

  // Retrieve stored UTM data
  let savedUtm = { utmSource: '', utmMedium: '', utmCampaign: '', utmTerm: '', utmContent: '' }
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY)
    if (raw) {
      savedUtm = JSON.parse(raw)
    }
  } catch (err) {
    console.warn('Error reading stored UTM data:', err)
  }

  // Check URL query parameters as direct fallback
  const urlParams = new URLSearchParams(window.location.search)

  const landingPage = sessionStorage.getItem(LANDING_STORAGE_KEY) || localStorage.getItem(LANDING_STORAGE_KEY) || window.location.href
  const referrer = sessionStorage.getItem(REFERRER_STORAGE_KEY) || localStorage.getItem(REFERRER_STORAGE_KEY) || document.referrer || 'Direct'

  return {
    timestamp: new Date().toISOString(),
    formName,
    pageUrl: window.location.href,
    landingPage,
    referrer,
    userAgent: navigator.userAgent || '',
    device: detectDevice(),
    browser: detectBrowser(),
    operatingSystem: detectOS(),
    screenSize: `${window.screen.width}x${window.screen.height}`,
    utmSource: urlParams.get('utm_source') || savedUtm.utmSource || '',
    utmMedium: urlParams.get('utm_medium') || savedUtm.utmMedium || '',
    utmCampaign: urlParams.get('utm_campaign') || savedUtm.utmCampaign || '',
    utmTerm: urlParams.get('utm_term') || savedUtm.utmTerm || '',
    utmContent: urlParams.get('utm_content') || savedUtm.utmContent || '',
  }
}
