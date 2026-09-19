/**
 * ============================================================================
 * TRUSTGRID.AI — HIGH-RESOLUTION 95-COLUMN BEHAVIORAL TELEMETRY & ANALYTICS ENGINE
 * ============================================================================
 * Captures comprehensive real-time user behavior, interaction forensics,
 * hardware profiling, Web Vitals performance, multi-touch attribution,
 * micro-funnel forensics, rage clicks, and dynamic intent segmentation.
 *
 * Fully matches the exact 95-column enterprise schema:
 * https://docs.google.com/spreadsheets/d/1B7hkCHLPeNVVnaPJ89ZO8R9nv4FngAzzqvwyK0zqnWM/edit?gid=153939990
 * ============================================================================
 */

export interface Telemetry95Event {
  // 1-6: Geo & Network Location
  ip_address?: string
  geo_country?: string
  geo_state?: string
  geo_city?: string
  geo_latitude?: number | string
  geo_longitude?: number | string

  // 7-16: User Identity & Visit History
  user_id: string
  user_name?: string
  user_email?: string
  user_type: 'new' | 'returning'
  returning_user: boolean | string
  first_visit_timestamp: string
  last_visit_timestamp: string
  total_sessions: number
  total_time_spent: number
  avg_session_duration: number

  // 17-23: Session Lifecycle & Flow
  session_id: string
  session_number: number
  session_start_time: string
  session_end_time?: string
  total_session_duration: number
  total_pages_visited: number
  bounce: boolean | string

  // 24-31: Traffic Attribution & Campaign
  traffic_source: string
  referrer_url: string
  campaign_name: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string

  // 32-43: Page Navigation & Engagement
  page: string
  page_url: string
  previous_page: string
  next_page: string
  entry_page: string
  exit_page: string
  page_title: string
  time_on_page: number
  scroll_percentage: number
  max_scroll_depth: number
  interaction_count: number
  inactivity_time: number

  // 44-55: Interaction & Element Forensics
  event_id: string
  event_name: string
  event_category: string
  event_action: string
  event_label: string
  section: string
  element_type: string
  element_id: string
  element_class: string
  element_text: string
  click_position_x: number
  click_position_y: number

  // 56-64: Form Funnel & Conversions
  form_id: string
  form_field_name: string
  form_completion_status: boolean | string
  form_abandonment: boolean | string
  goal_name: string
  goal_completed: boolean | string
  conversion_id: string
  conversion_value: number
  funnel_step: string | number

  // 65-76: Device & Tech Profile
  device_type: string
  device_brand: string
  device_model: string
  operating_system: string
  browser: string
  browser_version: string
  screen_width: number
  screen_height: number
  viewport_width: number
  viewport_height: number
  language: string
  timezone: string

  // 77-83: Network & Web Vitals Performance
  network_type: string
  connection_speed: number | string
  page_load_time: number
  dom_load_time: number
  first_contentful_paint: number
  largest_contentful_paint: number
  time_to_interactive: number

  // 84-95: Behavioral Diagnostics & Errors
  js_error_message: string
  api_error_message: string
  http_status_code: number | string
  cpu_cores: number
  memory_size: number
  tab_visibility_status: 'visible' | 'hidden'
  back_button_used: boolean | string
  copy_event: boolean | string
  paste_event: boolean | string
  rage_click_detected: boolean | string
  user_segment: string
  timestamp: string
}

// Storage Keys
const STORAGE_KEYS = {
  USER_ID: 'tg_user_id',
  USER_NAME: 'tg_user_name',
  USER_EMAIL: 'tg_user_email',
  FIRST_VISIT: 'tg_first_visit_time',
  LAST_VISIT: 'tg_last_visit_time',
  TOTAL_SESSIONS: 'tg_total_sessions',
  TOTAL_TIME_SPENT: 'tg_total_time_spent',
  SESSION_ID: 'tg_session_id',
  SESSION_NUM: 'tg_session_number',
  SESSION_START: 'tg_session_start_time',
  PAGES_VISITED: 'tg_pages_visited_set',
  ENTRY_PAGE: 'tg_entry_page',
  PREV_PAGE: 'tg_previous_page',
  UTM_DATA: 'tg_utm_data',
  FIRST_TOUCH: 'tg_first_touch',
  LAST_TOUCH: 'tg_last_touch',
  INITIAL_REFERRER: 'tg_initial_referrer',
  GEO_CACHE: 'tg_geo_cache',
  MAX_SCROLL: 'tg_max_scroll_depth',
  USER_SEGMENT: 'tg_user_segment',
  INTERACTION_COUNT: 'tg_page_interactions',
  LAST_ACTIVE: 'tg_last_active_time',
  INACTIVITY_ACCUMULATOR: 'tg_inactivity_accumulator'
}

const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec'

// Runtime volatile state
let pageLoadTimestamp = Date.now()
let pageInteractionCount = 0
let pageInactivityMs = 0
let lastUserActivityTimestamp = Date.now()
let maxScrollDepth = 0
let fcpMetric = 0
let lcpMetric = 0
let isBackNavigation = false

// Detect Performance Metrics (FCP, LCP)
if (typeof window !== 'undefined') {
  try {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          fcpMetric = Math.round(entry.startTime)
        }
      }
    })
    observer.observe({ type: 'paint', buffered: true })
  } catch (e) {}

  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1]
        lcpMetric = Math.round(lastEntry.startTime)
      }
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (e) {}

  window.addEventListener('popstate', () => {
    isBackNavigation = true
  })
}

/**
 * UUID generator
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Get or initialize persistent Anonymous User ID
 */
export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return 'server_user'
  let uid = localStorage.getItem(STORAGE_KEYS.USER_ID)
  if (!uid) {
    uid = generateUUID()
    localStorage.setItem(STORAGE_KEYS.USER_ID, uid)
    localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, new Date().toISOString())
    localStorage.setItem(STORAGE_KEYS.TOTAL_SESSIONS, '1')
    localStorage.setItem(STORAGE_KEYS.TOTAL_TIME_SPENT, '0')
  }
  return uid
}

/**
 * Get or initialize Session State
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server_session'

  let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID)
  if (!sid) {
    sid = generateUUID()
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid)
    sessionStorage.setItem(STORAGE_KEYS.SESSION_START, new Date().toISOString())
    sessionStorage.setItem(STORAGE_KEYS.PAGES_VISITED, JSON.stringify([window.location.pathname]))
    sessionStorage.setItem(STORAGE_KEYS.ENTRY_PAGE, window.location.pathname)

    // Increment Total Sessions in localStorage
    const currentSessions = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_SESSIONS) || '0', 10)
    const newSessionCount = currentSessions + 1
    localStorage.setItem(STORAGE_KEYS.TOTAL_SESSIONS, newSessionCount.toString())
    sessionStorage.setItem(STORAGE_KEYS.SESSION_NUM, newSessionCount.toString())
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString())
  } else {
    // Record visited page
    try {
      const visited = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.PAGES_VISITED) || '[]')
      if (!visited.includes(window.location.pathname)) {
        visited.push(window.location.pathname)
        sessionStorage.setItem(STORAGE_KEYS.PAGES_VISITED, JSON.stringify(visited))
      }
    } catch (e) {}
  }
  return sid
}

/**
 * Cached IP & Geolocation Resolver
 */
interface GeoData {
  ip: string
  country: string
  state: string
  city: string
  latitude: number | string
  longitude: number | string
}

let cachedGeo: GeoData | null = null

export async function fetchGeoData(): Promise<GeoData> {
  if (typeof window === 'undefined') {
    return { ip: '', country: '', state: '', city: '', latitude: '', longitude: '' }
  }
  if (cachedGeo) return cachedGeo

  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.GEO_CACHE)
    if (stored) {
      cachedGeo = JSON.parse(stored)
      return cachedGeo!
    }
  } catch (e) {}

  try {
    const res = await fetch('https://ipapi.co/json/', { mode: 'cors', cache: 'force-cache' })
    if (res.ok) {
      const d = await res.json()
      cachedGeo = {
        ip: d.ip || '',
        country: d.country_name || '',
        state: d.region || '',
        city: d.city || '',
        latitude: d.latitude || '',
        longitude: d.longitude || ''
      }
      try {
        sessionStorage.setItem(STORAGE_KEYS.GEO_CACHE, JSON.stringify(cachedGeo))
      } catch (e) {}
      return cachedGeo
    }
  } catch (err) {
    // Fallback if blocked
  }

  cachedGeo = {
    ip: '61.0.101.193',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Tirunelveli',
    latitude: 8.7272,
    longitude: 77.687
  }
  return cachedGeo
}

/**
 * User Identity Linking
 */
export function identifyUser(name: string, email: string) {
  if (typeof window === 'undefined') return
  if (name) localStorage.setItem(STORAGE_KEYS.USER_NAME, name)
  if (email) localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email)
}

/**
 * Device & Browser Detection
 */
export function detectDeviceDetails() {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'desktop',
      deviceBrand: 'Generic',
      deviceModel: 'PC',
      operatingSystem: 'Unknown',
      browser: 'Unknown',
      browserVersion: '',
      screenWidth: 1920,
      screenHeight: 1080,
      viewportWidth: 1920,
      viewportHeight: 900,
      language: 'en-US',
      timezone: 'UTC',
      networkType: '4g',
      connectionSpeed: 10,
      cpuCores: 8,
      memorySize: 8
    }
  }

  const ua = navigator.userAgent
  const uaLower = ua.toLowerCase()
  const width = window.innerWidth
  const screenW = window.screen.width
  const screenH = window.screen.height

  let deviceType = 'desktop'
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(uaLower)) {
    deviceType = 'tablet'
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Opera M(obi|ini)/i.test(ua) || width < 768) {
    deviceType = 'mobile'
  }

  let operatingSystem = 'Other'
  if (ua.indexOf('Win') !== -1) operatingSystem = 'Windows'
  else if (ua.indexOf('Mac') !== -1 && !/iPhone|iPad|iPod/.test(ua)) operatingSystem = 'macOS'
  else if (ua.indexOf('Linux') !== -1) operatingSystem = 'Linux'
  else if (ua.indexOf('Android') !== -1) operatingSystem = 'Android'
  else if (/iPhone|iPad|iPod/.test(ua)) operatingSystem = 'iOS'

  let browser = 'Chrome'
  let browserVersion = ''
  if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox'
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    browser = 'Samsung Internet'
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browser = 'Opera'
  } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
    browser = 'Microsoft Edge'
  } else if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome'
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari'
  }

  const nav = navigator as any
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection
  const networkType = conn?.effectiveType || '4g'
  const connectionSpeed = conn?.downlink || 10
  const cpuCores = nav.hardwareConcurrency || 8
  const memorySize = nav.deviceMemory || 8

  return {
    deviceType,
    deviceBrand: /iPhone|iPad|Macintosh/.test(ua) ? 'Apple' : /Samsung/.test(ua) ? 'Samsung' : 'Generic',
    deviceModel: /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Windows/.test(ua) ? 'PC' : 'Device',
    operatingSystem,
    browser,
    browserVersion,
    screenWidth: screenW,
    screenHeight: screenH,
    viewportWidth: width,
    viewportHeight: window.innerHeight,
    language: navigator.language || 'en-US',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta',
    networkType,
    connectionSpeed,
    cpuCores,
    memorySize
  }
}

/**
 * Dynamic Intent Scoring & User Segmentation Engine
 */
export function calculateUserSegment(
  pagesVisited: number,
  timeOnPage: number,
  totalTimeSpent: number,
  interactionCount: number,
  hasConverted: boolean,
  path: string
): string {
  if (hasConverted) return 'High-Intent Lead'

  const highIntentPaths = ['/contact', '/diagnostics', '/pricing', '/ai-diagnostic', '/rfp', '/talk-to-architect']
  const productPaths = ['/offerings', '/solutions', '/products', '/industries', '/capabilities', '/crypto', '/demand-pulse', '/ai-revenue-acceleration']

  if (highIntentPaths.some((p) => path.startsWith(p))) {
    return 'High-Intent Lead'
  }

  if (pagesVisited >= 5 || totalTimeSpent > 120000 || interactionCount > 15) {
    return 'Enterprise Evaluation'
  }

  if (productPaths.some((p) => path.startsWith(p)) || pagesVisited >= 2) {
    return 'Product Explorer'
  }

  if (timeOnPage > 45000) {
    return 'Technical Evaluator'
  }

  return 'Casual Browser'
}

/**
 * UTM & Traffic Source Extractor
 */
export function getUtmAndTrafficSource() {
  if (typeof window === 'undefined') {
    return {
      trafficSource: 'direct',
      referrerUrl: '',
      campaignName: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: ''
    }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const source = urlParams.get('utm_source') || ''
  const medium = urlParams.get('utm_medium') || ''
  const campaign = urlParams.get('utm_campaign') || ''
  const term = urlParams.get('utm_term') || ''
  const content = urlParams.get('utm_content') || ''

  const referrer = document.referrer || ''
  let trafficSource = 'direct'

  if (source || campaign) {
    trafficSource = 'campaign'
  } else if (referrer) {
    if (referrer.includes(window.location.hostname)) {
      trafficSource = 'internal'
    } else if (/google|bing|yahoo|duckduckgo|baidu/i.test(referrer)) {
      trafficSource = 'organic'
    } else {
      trafficSource = 'referral'
    }
  }

  return {
    trafficSource,
    referrerUrl: referrer,
    campaignName: campaign,
    utmSource: source,
    utmMedium: medium,
    utmCampaign: campaign,
    utmTerm: term,
    utmContent: content
  }
}

/**
 * Assembles the full 95-column telemetry payload
 */
export async function build95TelemetryPayload(
  eventName: string,
  eventCategory: string,
  eventAction: string,
  overrides: Partial<Telemetry95Event> = {}
): Promise<Telemetry95Event> {
  const now = new Date()
  const timestamp = now.toISOString()
  const userId = getOrCreateUserId()
  const sessionId = getOrCreateSessionId()
  const geo = await fetchGeoData()
  const tech = detectDeviceDetails()
  const utm = getUtmAndTrafficSource()

  const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT) || timestamp
  const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT) || timestamp
  const totalSessions = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_SESSIONS) || '1', 10)
  const sessionNumber = parseInt(sessionStorage.getItem(STORAGE_KEYS.SESSION_NUM) || '1', 10)
  const sessionStartTime = sessionStorage.getItem(STORAGE_KEYS.SESSION_START) || timestamp

  // Calculate Cumulative Time
  const nowMs = Date.now()
  const timeOnPage = Math.max(0, nowMs - pageLoadTimestamp)
  const sessionDuration = Math.max(0, nowMs - new Date(sessionStartTime).getTime())
  const prevTotalTime = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_TIME_SPENT) || '0', 10)
  const currentTotalTime = prevTotalTime + timeOnPage
  const avgSessionDuration = totalSessions > 0 ? Math.round(currentTotalTime / totalSessions) : sessionDuration

  // Pages Visited
  let visitedList: string[] = []
  try {
    visitedList = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.PAGES_VISITED) || '[]')
  } catch (e) {}
  const totalPagesVisited = Math.max(1, visitedList.length)
  const isBounce = totalPagesVisited <= 1 && sessionDuration < 15000

  // Navigation Links
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const entryPage = sessionStorage.getItem(STORAGE_KEYS.ENTRY_PAGE) || currentPath
  const previousPage = sessionStorage.getItem(STORAGE_KEYS.PREV_PAGE) || ''

  // Scroll & Interaction
  const scrollPercentage = Math.min(100, Math.round((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100)) || 0
  maxScrollDepth = Math.max(maxScrollDepth, scrollPercentage)
  pageInteractionCount++

  // User segment
  const userSegment = calculateUserSegment(
    totalPagesVisited,
    timeOnPage,
    currentTotalTime,
    pageInteractionCount,
    Boolean(overrides.goal_completed),
    currentPath
  )

  // Performance timings
  let pageLoadTime = 0
  let domLoadTime = 0
  let timeToInteractive = 0
  if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
    const pt = window.performance.timing
    if (pt.loadEventEnd > 0 && pt.navigationStart > 0) {
      pageLoadTime = pt.loadEventEnd - pt.navigationStart
    }
    if (pt.domContentLoadedEventEnd > 0 && pt.navigationStart > 0) {
      domLoadTime = pt.domContentLoadedEventEnd - pt.navigationStart
    }
    timeToInteractive = domLoadTime > 0 ? domLoadTime + 30 : 0
  }

  const payload: Telemetry95Event = {
    // 1-6
    ip_address: geo.ip,
    geo_country: geo.country,
    geo_state: geo.state,
    geo_city: geo.city,
    geo_latitude: geo.latitude,
    geo_longitude: geo.longitude,

    // 7-16
    user_id: userId,
    user_name: localStorage.getItem(STORAGE_KEYS.USER_NAME) || '',
    user_email: localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || '',
    user_type: totalSessions > 1 ? 'returning' : 'new',
    returning_user: totalSessions > 1,
    first_visit_timestamp: firstVisit,
    last_visit_timestamp: lastVisit,
    total_sessions: totalSessions,
    total_time_spent: currentTotalTime,
    avg_session_duration: avgSessionDuration,

    // 17-23
    session_id: sessionId,
    session_number: sessionNumber,
    session_start_time: sessionStartTime,
    session_end_time: '',
    total_session_duration: sessionDuration,
    total_pages_visited: totalPagesVisited,
    bounce: isBounce,

    // 24-31
    traffic_source: utm.trafficSource,
    referrer_url: utm.referrerUrl,
    campaign_name: utm.campaignName,
    utm_source: utm.utmSource,
    utm_medium: utm.utmMedium,
    utm_campaign: utm.utmCampaign,
    utm_term: utm.utmTerm,
    utm_content: utm.utmContent,

    // 32-43
    page: currentPath,
    page_url: currentUrl,
    previous_page: previousPage,
    next_page: '',
    entry_page: entryPage,
    exit_page: '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    time_on_page: timeOnPage,
    scroll_percentage: scrollPercentage,
    max_scroll_depth: maxScrollDepth,
    interaction_count: pageInteractionCount,
    inactivity_time: pageInactivityMs,

    // 44-55
    event_id: generateUUID(),
    event_name: eventName,
    event_category: eventCategory,
    event_action: eventAction,
    event_label: overrides.event_label || '',
    section: overrides.section || '',
    element_type: overrides.element_type || '',
    element_id: overrides.element_id || '',
    element_class: overrides.element_class || '',
    element_text: overrides.element_text || '',
    click_position_x: overrides.click_position_x || 0,
    click_position_y: overrides.click_position_y || 0,

    // 56-64
    form_id: overrides.form_id || '',
    form_field_name: overrides.form_field_name || '',
    form_completion_status: overrides.form_completion_status || false,
    form_abandonment: overrides.form_abandonment || false,
    goal_name: overrides.goal_name || '',
    goal_completed: overrides.goal_completed || false,
    conversion_id: overrides.conversion_id || '',
    conversion_value: overrides.conversion_value || 0,
    funnel_step: overrides.funnel_step || '',

    // 65-76
    device_type: tech.deviceType,
    device_brand: tech.deviceBrand,
    device_model: tech.deviceModel,
    operating_system: tech.operatingSystem,
    browser: tech.browser,
    browser_version: tech.browserVersion,
    screen_width: tech.screenWidth,
    screen_height: tech.screenHeight,
    viewport_width: tech.viewportWidth,
    viewport_height: tech.viewportHeight,
    language: tech.language,
    timezone: tech.timezone,

    // 77-83
    network_type: tech.networkType,
    connection_speed: tech.connectionSpeed,
    page_load_time: pageLoadTime,
    dom_load_time: domLoadTime,
    first_contentful_paint: fcpMetric,
    largest_contentful_paint: lcpMetric,
    time_to_interactive: timeToInteractive,

    // 84-95
    js_error_message: overrides.js_error_message || '',
    api_error_message: overrides.api_error_message || '',
    http_status_code: overrides.http_status_code || 200,
    cpu_cores: tech.cpuCores,
    memory_size: tech.memorySize,
    tab_visibility_status: document.hidden ? 'hidden' : 'visible',
    back_button_used: isBackNavigation,
    copy_event: overrides.copy_event || false,
    paste_event: overrides.paste_event || false,
    rage_click_detected: overrides.rage_click_detected || false,
    user_segment: userSegment,
    timestamp: timestamp,

    ...overrides
  }

  return payload
}

/**
 * Non-blocking dispatch to Google Apps Script Webhook
 */
export async function sendTelemetryEvent(payload: Telemetry95Event): Promise<void> {
  if (typeof window === 'undefined') return

  // 1. GTM / GA4 dataLayer push
  try {
    const w = window as any
    if (w.dataLayer && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: payload.event_name,
        ...payload
      })
    }
  } catch (e) {}

  // 2. Apps Script Endpoint
  const endpoint =
    process.env.NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL ||
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    DEFAULT_ENDPOINT

  const bodyString = JSON.stringify({
    event_type: 'telemetry_95',
    ...payload
  })

  // Attempt sendBeacon
  try {
    if (navigator.sendBeacon && typeof Blob !== 'undefined') {
      const blob = new Blob([bodyString], { type: 'text/plain;charset=utf-8' })
      const sent = navigator.sendBeacon(endpoint, blob)
      if (sent) return
    }
  } catch (e) {}

  // Fetch fallback
  try {
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: bodyString,
      keepalive: true
    }).catch(() => {})
  } catch (e) {}
}

/**
 * Dedicated Tracking Methods
 */

export async function trackPageView(pagePath?: string, pageTitle?: string): Promise<void> {
  const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const title = pageTitle || (typeof window !== 'undefined' ? document.title : '')

  pageLoadTimestamp = Date.now()
  pageInteractionCount = 0

  const payload = await build95TelemetryPayload('page_view', 'navigation', 'view', {
    page: path,
    page_title: title
  })

  await sendTelemetryEvent(payload)

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEYS.PREV_PAGE, path)
  }
}

export async function trackClickEvent(
  element: HTMLElement,
  x: number,
  y: number,
  isRageClick = false
): Promise<void> {
  const elementText = (element.textContent || '').trim().substring(0, 150)
  const elementType = element.tagName
  const elementId = element.id || ''
  const elementClass = element.className ? String(element.className).substring(0, 200) : ''
  const section = element.closest('section, header, footer, nav, aside')?.getAttribute('aria-label') ||
                  element.closest('[data-section]')?.getAttribute('data-section') ||
                  element.closest('section')?.id || ''

  const payload = await build95TelemetryPayload(
    isRageClick ? 'rage_click' : 'click',
    'interaction',
    'click',
    {
      element_type: elementType,
      element_id: elementId,
      element_class: elementClass,
      element_text: elementText,
      click_position_x: Math.round(x),
      click_position_y: Math.round(y),
      section: section,
      rage_click_detected: isRageClick
    }
  )

  await sendTelemetryEvent(payload)
}

export async function trackCTA(
  ctaName: string,
  destination?: string,
  section?: string,
  ctaSource?: string
): Promise<void> {
  const payload = await build95TelemetryPayload('cta_click', 'conversion', 'click', {
    element_text: ctaName,
    section: section || 'Main',
    event_label: destination || ctaSource || 'CTA'
  })
  await sendTelemetryEvent(payload)
}

export async function trackVisibilityState(status: 'visible' | 'hidden'): Promise<void> {
  const payload = await build95TelemetryPayload('visibility_change', 'lifecycle', status, {
    tab_visibility_status: status
  })
  await sendTelemetryEvent(payload)
}

export async function trackCopyEvent(copiedText: string): Promise<void> {
  const payload = await build95TelemetryPayload('copy', 'interaction', 'copy', {
    copy_event: true,
    element_text: copiedText.substring(0, 100)
  })
  await sendTelemetryEvent(payload)
}

export async function trackPasteEvent(): Promise<void> {
  const payload = await build95TelemetryPayload('paste', 'interaction', 'paste', {
    paste_event: true
  })
  await sendTelemetryEvent(payload)
}

export async function trackFormFunnel(
  formId: string,
  fieldName: string,
  action: 'view' | 'start' | 'field_focus' | 'abandon' | 'submit' | 'error',
  errorMsg?: string,
  submissionId?: string
): Promise<void> {
  const isSubmit = action === 'submit'
  const isAbandon = action === 'abandon'
  const isError = action === 'error'

  const payload = await build95TelemetryPayload(
    `form_${action}`,
    'form',
    action,
    {
      form_id: formId,
      form_field_name: fieldName,
      form_completion_status: isSubmit,
      form_abandonment: isAbandon,
      goal_name: isSubmit ? 'Form Lead Generated' : '',
      goal_completed: isSubmit,
      conversion_id: submissionId || '',
      js_error_message: errorMsg || ''
    }
  )

  await sendTelemetryEvent(payload)
}

export async function trackOutboundClick(url: string, linkText?: string): Promise<void> {
  const payload = await build95TelemetryPayload('outbound_click', 'navigation', 'click', {
    element_text: linkText || url,
    event_label: url
  })
  await sendTelemetryEvent(payload)
}

export function initScrollTracking(): () => void {
  if (typeof window === 'undefined') return () => {}

  const milestonesTracked = new Set<number>()

  const handleScroll = async () => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return

    const percent = Math.round((scrollY / docHeight) * 100)
    maxScrollDepth = Math.max(maxScrollDepth, percent)

    const milestones = [25, 50, 75, 90, 100]
    for (const m of milestones) {
      if (percent >= m && !milestonesTracked.has(m)) {
        milestonesTracked.add(m)
        const payload = await build95TelemetryPayload('scroll_depth', 'interaction', 'scroll', {
          scroll_percentage: percent,
          max_scroll_depth: maxScrollDepth,
          event_label: `${m}% Scroll`
        })
        sendTelemetryEvent(payload)
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Backwards-compatible Helper Functions
 */

export function trackFormView(formId: string, formName: string, formType = 'lead_form', ctaSource = 'page_embed') {
  trackFormFunnel(formId, '', 'view', undefined, undefined)
}

export function trackFormStart(formId: string, formName: string, firstField = 'name') {
  trackFormFunnel(formId, firstField, 'start', undefined, undefined)
}

export function trackFormFieldInteraction(formId: string, formName: string, fieldName: string) {
  trackFormFunnel(formId, fieldName, 'field_focus', undefined, undefined)
}

export function trackFormValidationError(formId: string, formName: string, fieldName: string, errorMsg: string) {
  trackFormFunnel(formId, fieldName, 'error', errorMsg, undefined)
}

export function trackFormAbandon(formId: string, formName: string, lastFieldInteracted?: string) {
  trackFormFunnel(formId, lastFieldInteracted || '', 'abandon', undefined, undefined)
}

export function trackFormSubmit(formId: string, formName: string, isSuccess: boolean, submissionId?: string, errorMsg?: string) {
  trackFormFunnel(formId, '', isSuccess ? 'submit' : 'error', errorMsg, submissionId)
}

export function trackChatbotEvent(eventType: string, extraData: any = {}) {
  build95TelemetryPayload(`chat_${eventType.toLowerCase()}`, 'chatbot', eventType, {
    form_id: 'ai_architect_chatbot',
    element_text: extraData.intent || extraData.message || 'Chatbot Interaction',
    ...extraData
  }).then(sendTelemetryEvent)
}

export function trackWhatsAppClick(source = 'floating_cta', position = 'bottom-right', contextTopic?: string) {
  build95TelemetryPayload('whatsapp_click', 'conversion', 'click', {
    element_text: contextTopic ? `WhatsApp: ${contextTopic}` : 'WhatsApp Chat',
    event_label: source,
    section: position
  }).then(sendTelemetryEvent)
}

export function trackNavigation(menuName: string, menuItem: string, destination?: string) {
  build95TelemetryPayload('navigation_click', 'navigation', 'click', {
    element_text: `${menuName} > ${menuItem}`,
    section: menuName,
    event_label: destination || ''
  }).then(sendTelemetryEvent)
}

export function sendAnalyticsEvent(event: any) {
  if (event && event.eventType) {
    build95TelemetryPayload(event.eventType.toLowerCase(), 'telemetry', event.eventType, event).then(sendTelemetryEvent)
  }
}

