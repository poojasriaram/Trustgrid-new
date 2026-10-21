/**
 * ============================================================================
 * TRUSTGRID.AI — LAYERED CONVERSATION CONTEXT ENGINE
 * ============================================================================
 * Manages 4 discrete context layers:
 * 1. Immediate Context: Active topic, unresolved pronouns/references, latest turns
 * 2. Session Context: Accumulating user attributes, business challenges, explored solutions
 * 3. Knowledge Context: RAG-retrieved chunks and verified facts
 * 4. Task Context: Intent stage (exploring, evaluating, troubleshooting, lead/consulting)
 * ============================================================================
 */

export type TopicDomain = 
  | 'ai_infrastructure'
  | 'agentic_enterprise'
  | 'networking_cybersecurity'
  | 'trusted_ai'
  | 'ai_value_finops'
  | 'industrial_methodology'
  | 'executive_diagnostic'
  | 'industry_verticals'
  | 'general_architecture'
  | 'direct_contact'

export type TaskStage =
  | 'exploring'
  | 'researching_technical'
  | 'evaluating_challenges'
  | 'solution_mapping'
  | 'implementation_planning'
  | 'consultation_seeking'

export interface ImmediateContext {
  activeTopic: TopicDomain
  activeSubtopic?: string
  lastUserMessage: string
  lastBotMessage?: string
  resolvedReference?: string
  isFollowUp: boolean
  isTopicShift: boolean
  isAmbiguous: boolean
}

export interface SessionContext {
  conversationId: string
  topicsDiscussed: TopicDomain[]
  userIndustry?: string
  userRole?: string
  statedChallenges: string[]
  exploredSolutions: string[]
  currentTaskStage: TaskStage
  consultationIntentDetected: boolean
  leadDetails: {
    name?: string
    email?: string
    company?: string
    phone?: string
    requirement?: string
  }
  turnCount: number
  rollingSummary?: string
  createdAt: string
  updatedAt: string
}

export interface ResolvedTurn {
  originalQuery: string
  expandedQuery: string
  activeTopic: TopicDomain
  taskStage: TaskStage
  referenceEntity?: string
  needsClarification: boolean
  clarificationPrompt?: string
}

const TOPIC_KEYWORDS: Record<TopicDomain, string[]> = {
  ai_infrastructure: ['gpu', 'h100', 'h200', 'b200', 'blackwell', 'liquid cooling', 'rack density', 'compute', 'cluster', 'pue', 'datacenter', 'data center', 'vllm', 'tensorrt', 'cuda', 'infrastructure', 'ai factory'],
  agentic_enterprise: ['agent', 'agentic', 'langgraph', 'crewai', 'autogen', 'mcp', 'swarm', 'digital worker', 'workflow', 'agentops', 'episodic memory', 'multi-agent', 'autonomous'],
  networking_cybersecurity: ['network', 'networking', 'infiniband', 'roce', 'rocev2', 'spectrum-x', 'packet drop', 'latency', 'cybersecurity', 'quantum', 'pqc', 'cbom', 'ml-kem', 'prompt injection', 'firewall', 'zero-trust'],
  trusted_ai: ['trusted', 'explainability', 'shap', 'lime', 'governance', 'eu ai act', 'nist', 'iso 42001', 'audit', 'bias', 'drift', 'hallucination', 'compliance', 'spc'],
  ai_value_finops: ['value', 'finops', 'roi', 'cost', 'economics', 'token', 'tco', 'p&l', 'business case', 'lean', 'dmaic', 'theory of constraints', 'sprint'],
  industrial_methodology: ['methodology', 'oee', 'tpm', 'smed', 'fmea', 'spc', 'hoshin kanri', 'poka-yoke', 'six sigma', 'kaizen', 'operational excellence'],
  executive_diagnostic: ['diagnostic', 'assessment', 'audit', 'strategy session', 'evaluate', 'benchmark', 'roadmap', 'dbot', 'engagement', 'scope', 'pricing', 'hire'],
  industry_verticals: ['banking', 'finance', 'healthcare', 'clinical', 'hospital', 'defense', 'military', 'aerospace', 'manufacturing', 'factory', 'telecom', 'energy', 'utility', 'pharma', 'insurance'],
  direct_contact: ['contact', 'email', 'phone', 'whatsapp', 'call', 'meeting', 'speak with architect', 'talk to architect', 'book', 'schedule', 'consultant'],
  general_architecture: ['trustgrid', 'company', 'architecture', 'services', 'offerings', 'overview', 'what do you do', 'platform']
}

const REFERENCE_PRONOUNS = [
  'it', 'this', 'that', 'these', 'those',
  'that solution', 'the solution', 'the previous option', 'the previous',
  'those challenges', 'the challenges', 'these bottlenecks', 'the bottlenecks',
  'them', 'solve them', 'fix them', 'implement this', 'the implementation',
  'how does it work', 'what about it', 'can trustgrid solve them', 'what would the implementation involve'
]

/**
 * Detects the primary topic domain from query text
 */
export function detectTopicDomain(text: string, currentTopic?: TopicDomain): { topic: TopicDomain; confidence: number; isShift: boolean } {
  const lower = text.toLowerCase()
  let bestTopic: TopicDomain = currentTopic || 'general_architecture'
  let highestScore = 0

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS) as [TopicDomain, string[]][]) {
    let score = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score += kw.length > 5 ? 2 : 1
      }
    }
    if (score > highestScore) {
      highestScore = score
      bestTopic = topic
    }
  }

  const isShift = Boolean(currentTopic && bestTopic !== currentTopic && highestScore >= 2)
  return {
    topic: highestScore > 0 ? bestTopic : (currentTopic || 'general_architecture'),
    confidence: highestScore,
    isShift
  }
}

/**
 * Detects user intent and task lifecycle stage
 */
export function detectTaskStage(text: string, currentStage: TaskStage, turnCount: number): TaskStage {
  const lower = text.toLowerCase()

  // Consultation / Purchasing Intent
  const consultTriggers = [
    'can you implement', 'can trustgrid implement', 'hire', 'contract',
    'speak to an architect', 'talk to an architect', 'speak with',
    'book a session', 'schedule a call', 'strategy session', 'diagnostic',
    'request a proposal', 'rfp', 'pricing', 'cost of engagement', 'how do we get started'
  ]
  if (consultTriggers.some(t => lower.includes(t))) {
    return 'consultation_seeking'
  }

  // Implementation Planning
  const implTriggers = [
    'implementation involve', 'what would implementation', 'deployment timeline',
    'next steps', 'prerequisites', 'deliverables', 'stages', 'how long does it take'
  ]
  if (implTriggers.some(t => lower.includes(t))) {
    return 'implementation_planning'
  }

  // Solution Mapping / How TRUSTGRID.AI Solves It
  const solveTriggers = [
    'how can trustgrid solve', 'how do you solve', 'your solution', 'trustgrid address',
    'what do you offer', 'how does trustgrid fix', 'solve them'
  ]
  if (solveTriggers.some(t => lower.includes(t))) {
    return 'solution_mapping'
  }

  // Evaluating Challenges / Bottlenecks
  const challengeTriggers = [
    'challenge', 'bottleneck', 'risk', 'problem', 'failure', 'limitation', 'downside', 'difficult'
  ]
  if (challengeTriggers.some(t => lower.includes(t))) {
    return 'evaluating_challenges'
  }

  // Technical deep dive
  const techTriggers = [
    'how does it work', 'architecture', 'specifications', 'roce vs', 'cooling', 'kv-cache', 'latency', 'benchmark'
  ]
  if (techTriggers.some(t => lower.includes(t))) {
    return 'researching_technical'
  }

  return currentStage || (turnCount > 1 ? 'researching_technical' : 'exploring')
}

/**
 * Resolves pronoun and contextual references from conversation history
 */
export function resolveContextualReferences(
  query: string,
  session: SessionContext,
  lastBotMessage?: string
): ResolvedTurn {
  const lower = query.toLowerCase().trim()
  const { topic: detectedTopic, isShift } = detectTopicDomain(lower, session.topicsDiscussed[session.topicsDiscussed.length - 1])
  const activeTopic = isShift ? detectedTopic : (session.topicsDiscussed[session.topicsDiscussed.length - 1] || detectedTopic)
  const taskStage = detectTaskStage(lower, session.currentTaskStage, session.turnCount)

  let expandedQuery = query
  let referenceEntity: string | undefined = undefined
  let isFollowUp = false

  // Detect reference patterns
  const hasPronounRef = REFERENCE_PRONOUNS.some(p => lower.includes(p))

  if (hasPronounRef || query.split(' ').length <= 5) {
    isFollowUp = true
    const topicLabel = getTopicHumanLabel(activeTopic)

    if (lower.includes('challenge') || lower.includes('bottleneck') || lower.includes('problem')) {
      referenceEntity = `${topicLabel} challenges & bottlenecks`
      expandedQuery = `${query} regarding ${topicLabel} challenges, thermal constraints, and operational bottlenecks`
    } else if (lower.includes('solve them') || lower.includes('how can trustgrid solve') || lower.includes('how do you solve')) {
      referenceEntity = `TRUSTGRID.AI solutions for ${topicLabel} challenges`
      expandedQuery = `How TRUSTGRID.AI solves ${topicLabel} challenges through architectural engineering and methodology`
    } else if (lower.includes('implementation') || lower.includes('involve') || lower.includes('next step')) {
      referenceEntity = `${topicLabel} implementation stages, deliverables & diagnostic roadmap`
      expandedQuery = `Implementation stages, prerequisites, and timeline for TRUSTGRID.AI ${topicLabel}`
    } else if (lower.includes('it') || lower.includes('that') || lower.includes('this')) {
      referenceEntity = topicLabel
      expandedQuery = `${query} in relation to TRUSTGRID.AI ${topicLabel}`
    }
  }

  // Ambiguity check: user inputs very short vague words with no active session context
  const isAmbiguous = query.trim().length <= 3 && !isFollowUp && session.turnCount === 0

  return {
    originalQuery: query,
    expandedQuery,
    activeTopic,
    taskStage,
    referenceEntity,
    needsClarification: isAmbiguous,
    clarificationPrompt: isAmbiguous 
      ? 'Could you specify which layer of enterprise AI you are exploring: high-density GPU infrastructure, autonomous agent swarms, AI networking, or trusted governance?'
      : undefined
  }
}

/**
 * Human readable topic labels
 */
export function getTopicHumanLabel(topic: TopicDomain): string {
  switch (topic) {
    case 'ai_infrastructure':
      return 'AI Infrastructure & GPU Supercomputing'
    case 'agentic_enterprise':
      return 'Agentic Enterprise & Autonomous Multi-Agent Swarms'
    case 'networking_cybersecurity':
      return 'AI-Native Networking & Post-Quantum Cybersecurity'
    case 'trusted_ai':
      return 'Trusted AI Engineering & Governance'
    case 'ai_value_finops':
      return 'AI Value Engineering & FinOps Acceleration'
    case 'industrial_methodology':
      return 'AI Industrial Methodology Engine'
    case 'executive_diagnostic':
      return 'Executive AI Diagnostic & Engagement Models'
    case 'industry_verticals':
      return 'Regulated Industry Architectures'
    case 'direct_contact':
      return 'Principal Advisory & Consultation'
    default:
      return 'Enterprise AI Systems'
  }
}
