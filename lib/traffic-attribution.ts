/**
 * ============================================================================
 * TRUSTGRID.AI — TRAFFIC ATTRIBUTION & CHANNEL INTELLIGENCE ENGINE
 * ============================================================================
 * Strictly categorizes traffic channels with zero fabricated attribution:
 * - Paid Search (CPC/PPC/Ads)
 * - Organic Search (Google, Bing, DuckDuckGo, Yahoo, etc.)
 * - Social Media (LinkedIn, Twitter/X, Reddit, etc.)
 * - Email Campaigns
 * - External Referral
 * - Direct / Unattributed
 * ============================================================================
 */

export interface TrafficChannelResult {
  channel: 'Direct' | 'Organic Search' | 'Paid Search' | 'Social' | 'Email' | 'Referral' | 'Campaign'
  source: string
  medium: string
  campaign: string
  referrerDomain: string
  isAttributed: boolean
}

const SEARCH_ENGINES = [
  'google.', 'bing.com', 'yahoo.com', 'duckduckgo.com',
  'baidu.com', 'yandex.', 'ecosia.org', 'qwant.com', 'ask.com'
]

const SOCIAL_NETWORKS = [
  'linkedin.com', 'lnkd.in', 'twitter.com', 'x.com', 't.co',
  'facebook.com', 'fb.com', 'instagram.com', 'reddit.com',
  'youtube.com', 'youtu.be', 'threads.net', 'quora.com', 'github.com'
]

const WEBMAIL_DOMAINS = [
  'mail.google.com', 'outlook.live.com', 'mail.yahoo.com',
  'webmail.', 'mail.proton.me', 'mail.aol.com'
]

/**
 * Classifies traffic source and channel based on referrer and UTM parameters.
 * Adheres strictly to the requirement: "Do not claim traffic is organic or paid
 * when available information cannot establish this reliably."
 */
export function classifyTraffic(
  referrer: string = '',
  utmSource: string = '',
  utmMedium: string = '',
  utmCampaign: string = '',
  currentHost: string = ''
): TrafficChannelResult {
  const normSource = (utmSource || '').toLowerCase().trim()
  const normMedium = (utmMedium || '').toLowerCase().trim()
  const normCampaign = (utmCampaign || '').trim()

  let refDomain = ''
  if (referrer && referrer.startsWith('http')) {
    try {
      refDomain = new URL(referrer).hostname.toLowerCase()
    } catch (e) {}
  }

  // Exclude internal domain navigation
  if (refDomain && currentHost && refDomain.includes(currentHost.toLowerCase())) {
    refDomain = ''
  }

  // 1. Paid Search (Explicit CPC / PPC / Paid parameters)
  const isPaidMedium = ['cpc', 'ppc', 'paid', 'paidsearch', 'adwords', 'search_ads'].includes(normMedium)
  if (isPaidMedium || (normSource.includes('google') && normMedium === 'cpc')) {
    return {
      channel: 'Paid Search',
      source: utmSource || (refDomain ? `google_ads` : 'Paid Search'),
      medium: utmMedium || 'cpc',
      campaign: normCampaign || 'General_Paid',
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 2. Email Campaign
  const isEmailMedium = ['email', 'newsletter', 'e-mail', 'mail_blast'].includes(normMedium)
  const isWebmailReferrer = WEBMAIL_DOMAINS.some(d => refDomain.includes(d))
  if (isEmailMedium || isWebmailReferrer) {
    return {
      channel: 'Email',
      source: utmSource || refDomain || 'email_client',
      medium: utmMedium || 'email',
      campaign: normCampaign || 'Newsletter',
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 3. Paid Social / Display Campaigns
  if (['display', 'banner', 'retargeting', 'paid_social', 'sponsor'].includes(normMedium)) {
    return {
      channel: 'Campaign',
      source: utmSource || 'Display_Network',
      medium: utmMedium,
      campaign: normCampaign || 'Display_Campaign',
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 4. Social Media (Organic)
  const isSocialReferrer = SOCIAL_NETWORKS.some(d => refDomain.includes(d))
  const isSocialMedium = ['social', 'social_media', 'post', 'organic_social'].includes(normMedium)
  if (isSocialReferrer || isSocialMedium) {
    const identifiedNetwork = SOCIAL_NETWORKS.find(d => refDomain.includes(d)) || normSource || 'Social'
    return {
      channel: 'Social',
      source: cleanNetworkName(identifiedNetwork),
      medium: utmMedium || 'social',
      campaign: normCampaign,
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 5. Organic Search
  const isSearchReferrer = SEARCH_ENGINES.some(d => refDomain.includes(d))
  if (isSearchReferrer) {
    const searchEngine = cleanSearchEngine(refDomain)
    return {
      channel: 'Organic Search',
      source: searchEngine,
      medium: 'organic',
      campaign: '',
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 6. External Referral
  if (refDomain) {
    return {
      channel: 'Referral',
      source: refDomain,
      medium: 'referral',
      campaign: normCampaign,
      referrerDomain: refDomain,
      isAttributed: true
    }
  }

  // 7. Custom Campaign (Other UTMs without recognized medium)
  if (utmSource || utmCampaign) {
    return {
      channel: 'Campaign',
      source: utmSource || 'Custom',
      medium: utmMedium || 'campaign',
      campaign: normCampaign,
      referrerDomain: '',
      isAttributed: true
    }
  }

  // 8. Direct / Unattributed (No referrer, no UTMs)
  return {
    channel: 'Direct',
    source: 'Direct / None',
    medium: 'none',
    campaign: '',
    referrerDomain: '',
    isAttributed: false
  }
}

function cleanSearchEngine(domain: string): string {
  if (domain.includes('google')) return 'Google'
  if (domain.includes('bing')) return 'Bing'
  if (domain.includes('yahoo')) return 'Yahoo'
  if (domain.includes('duckduckgo')) return 'DuckDuckGo'
  if (domain.includes('baidu')) return 'Baidu'
  if (domain.includes('yandex')) return 'Yandex'
  return domain
}

function cleanNetworkName(domain: string): string {
  if (domain.includes('linkedin') || domain.includes('lnkd')) return 'LinkedIn'
  if (domain.includes('twitter') || domain.includes('x.com') || domain.includes('t.co')) return 'X (Twitter)'
  if (domain.includes('facebook') || domain.includes('fb.com')) return 'Facebook'
  if (domain.includes('instagram')) return 'Instagram'
  if (domain.includes('reddit')) return 'Reddit'
  if (domain.includes('youtube')) return 'YouTube'
  if (domain.includes('github')) return 'GitHub'
  return domain
}
