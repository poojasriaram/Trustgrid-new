/**
 * ==============================================================================
 * TRUSTGRID.AI — ENTERPRISE LEAD SCORING & QUALIFICATION ENGINE
 * ==============================================================================
 * Dynamically evaluates inbound leads against the 100-point B2B enterprise matrix:
 * 
 * Qualification Criteria (0–100):
 * - Business / Corporate Domain Email: +10 pts (Non-free consumer webmail)
 * - Company Name Provided: +10 pts
 * - Designation / Senior Role: +5 pts (CTO, VP, Director, Head, Architect, C-Suite)
 * - Enterprise AI Requirement: +20 pts (GPU, LLM, Agents, RoCEv2, PQC, FinOps, RAG)
 * - Consultation / Diagnostic Requested: +20 pts (Direct Architect, Diagnostic, RFP)
 * - Detailed Requirement / Message (>50 chars): +10 pts
 * - Valid Phone Number Provided: +5 pts
 * - High-Intent Landing / Source Page: +10 pts (/solutions, /book-ai-diagnostic, etc.)
 * - Case Study / Technical Asset Engagement: +10 pts (/case-studies, whitepapers)
 * 
 * Priority Bands:
 * - HIGH (70–100): Immediate priority SLA (1-hour response target)
 * - MEDIUM (40–69): Standard business SLA (4-hour response target)
 * - LOW (0–39): Automated nurture / qualification queue
 * ==============================================================================
 */

export interface LeadScoreInput {
  email?: string
  company?: string
  designation?: string
  requirement?: string
  message?: string
  phone?: string
  pageUrl?: string
  source?: string
  formType?: string
  serviceInterest?: string
  visitedPages?: string[]
}

export interface LeadScoreResult {
  score: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  isHotLead: boolean
  tier: 'Hot Prospect' | 'Verified Intent' | 'Warm Lead'
  breakdown: {
    businessEmail: number
    companyName: number
    designation: number
    enterpriseRequirement: number
    consultationRequested: number
    detailedMessage: number
    phoneProvided: number
    highIntentPage: number
    assetEngagement: number
  }
  reasons: string[]
}

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
  'live.com',
  'msn.com',
  'rediffmail.com'
])

const SENIOR_ROLES = [
  'cto', 'cio', 'cdo', 'ciso', 'ceo', 'coo', 'vp', 'vice president',
  'director', 'head', 'lead architect', 'principal', 'founder', 'managing director',
  'general manager', 'partner', 'chief', 'architect', 'engineering manager'
]

const ENTERPRISE_KEYWORDS = [
  'gpu', 'cluster', 'agentic', 'multi-agent', 'swarm', 'roce', 'rocev2',
  'infiniband', 'pqc', 'post-quantum', 'quantum-safe', 'llm', 'rag',
  'fine-tuning', 'governance', 'nist', 'eu ai act', 'finops', 'bare-metal',
  'datacenter', 'enterprise', 'infrastructure', 'lossless', 'h100', 'b200',
  'blackwell', 'hopper', 'triton', 'vllm', 'mes automation', 'sovereign'
]

const HIGH_INTENT_ROUTES = [
  '/book-ai-diagnostic',
  '/solutions/ai-infra-engineering',
  '/solutions/ai-agentic-factory',
  '/solutions/ai-networking-cybersecurity',
  '/solutions/ai-value-engineering',
  '/talk-to-ai-architect',
  '/ai-readiness-assessment',
  '/request-proposal',
  '/quick-session'
]

/**
 * Calculates lead score and priority tier
 */
export function calculateLeadScore(input: LeadScoreInput): LeadScoreResult {
  let score = 0
  const reasons: string[] = []
  const breakdown = {
    businessEmail: 0,
    companyName: 0,
    designation: 0,
    enterpriseRequirement: 0,
    consultationRequested: 0,
    detailedMessage: 0,
    phoneProvided: 0,
    highIntentPage: 0,
    assetEngagement: 0
  }

  // 1. Business Email (+10 pts)
  if (input.email && input.email.includes('@')) {
    const domain = input.email.split('@')[1]?.toLowerCase().trim()
    if (domain && !FREE_EMAIL_DOMAINS.has(domain) && !domain.includes('temp') && domain.includes('.')) {
      breakdown.businessEmail = 10
      score += 10
      reasons.push('Verified corporate business email domain')
    }
  }

  // 2. Company Name Provided (+10 pts)
  const comp = (input.company || '').trim()
  if (comp && comp.length >= 2 && !comp.toLowerCase().includes('n/a') && !comp.toLowerCase().includes('self')) {
    breakdown.companyName = 10
    score += 10
    reasons.push(`Company name identified: ${comp}`)
  }

  // 3. Designation / Senior Role (+5 pts)
  const role = (input.designation || '').toLowerCase().trim()
  if (role) {
    const isSenior = SENIOR_ROLES.some(r => role.includes(r))
    if (isSenior) {
      breakdown.designation = 5
      score += 5
      reasons.push(`High-authority designation: ${input.designation}`)
    } else if (role.length >= 3) {
      breakdown.designation = 3
      score += 3
      reasons.push(`Designation provided: ${input.designation}`)
    }
  }

  // 4. Enterprise AI Requirement (+20 pts)
  const combinedText = `${input.requirement || ''} ${input.message || ''} ${input.serviceInterest || ''}`.toLowerCase()
  const matchedKeywords = ENTERPRISE_KEYWORDS.filter(k => combinedText.includes(k))
  if (matchedKeywords.length >= 2) {
    breakdown.enterpriseRequirement = 20
    score += 20
    reasons.push(`Deep enterprise AI context (${matchedKeywords.slice(0, 3).join(', ')})`)
  } else if (matchedKeywords.length === 1) {
    breakdown.enterpriseRequirement = 12
    score += 12
    reasons.push(`Enterprise AI interest: ${matchedKeywords[0]}`)
  }

  // 5. Consultation / Diagnostic Requested (+20 pts)
  const fType = (input.formType || input.source || '').toLowerCase()
  if (
    fType.includes('diagnostic') ||
    fType.includes('architect') ||
    fType.includes('consultation') ||
    fType.includes('rfp') ||
    fType.includes('proposal')
  ) {
    breakdown.consultationRequested = 20
    score += 20
    reasons.push('Direct architectural diagnostic / consultation request')
  } else if (fType.includes('contact') || fType.includes('quick')) {
    breakdown.consultationRequested = 10
    score += 10
    reasons.push('Direct contact enquiry')
  }

  // 6. Detailed Requirement / Message (>50 chars) (+10 pts)
  const msg = (input.message || input.requirement || '').trim()
  if (msg.length >= 50) {
    breakdown.detailedMessage = 10
    score += 10
    reasons.push(`Extensive project scope details (${msg.length} characters)`)
  } else if (msg.length >= 15) {
    breakdown.detailedMessage = 5
    score += 5
    reasons.push('Project scope message provided')
  }

  // 7. Valid Phone Number Provided (+5 pts)
  const phone = (input.phone || '').trim().replace(/[^0-9]/g, '')
  if (phone.length >= 7) {
    breakdown.phoneProvided = 5
    score += 5
    reasons.push('Direct phone contact line provided')
  }

  // 8. High-Intent Landing Page / Source (+10 pts)
  const page = (input.pageUrl || '').toLowerCase()
  const isHighIntent = HIGH_INTENT_ROUTES.some(r => page.includes(r.toLowerCase()))
  if (isHighIntent) {
    breakdown.highIntentPage = 10
    score += 10
    reasons.push('Inbound through high-intent architecture solution page')
  }

  // 9. Case Study / Technical Asset Engagement (+10 pts)
  const visited = input.visitedPages || []
  const hasAssetTouch =
    page.includes('/case-studies') ||
    page.includes('/ai-methodology') ||
    page.includes('/methodology-engine') ||
    visited.some(p => p.includes('case-studies') || p.includes('whitepaper') || p.includes('methodology'))

  if (hasAssetTouch) {
    breakdown.assetEngagement = 10
    score += 10
    reasons.push('Prior engagement with engineering case studies or technical methodology')
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score))

  // Determine Priority Band
  let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW'
  let tier: 'Hot Prospect' | 'Verified Intent' | 'Warm Lead' = 'Warm Lead'
  let isHotLead = false

  if (score >= 70) {
    priority = 'HIGH'
    tier = 'Hot Prospect'
    isHotLead = true
  } else if (score >= 40) {
    priority = 'MEDIUM'
    tier = 'Verified Intent'
  } else {
    priority = 'LOW'
    tier = 'Warm Lead'
  }

  return {
    score,
    priority,
    isHotLead,
    tier,
    breakdown,
    reasons
  }
}
