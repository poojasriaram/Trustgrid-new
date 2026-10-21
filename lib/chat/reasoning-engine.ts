/**
 * ============================================================================
 * TRUSTGRID.AI — CONTEXTUAL REASONING & RESPONSE GENERATION ENGINE
 * ============================================================================
 * Generates continuous, intelligent, personalized, and action-oriented
 * responses grounded in the TRUSTGRID.AI knowledge corpus.
 *
 * Supports:
 * - Direct integration with external LLMs (OpenAI, Groq, Anthropic, Gemini)
 * - Deterministic Grounded Domain Synthesizer when API keys are pending
 * - Real-time Server-Sent Events (SSE) streaming
 * ============================================================================
 */

import { ResolvedTurn, SessionContext, getTopicHumanLabel } from './context-engine'
import { RetrievalResult } from './rag-engine'
import { StoredChatMessage } from './memory-store'

export interface GenerationOutput {
  text: string
  offeringTag: string
  pageLink?: { label: string; href: string }
  suggestedFollowUps: string[]
  isLeadPrompt: boolean
  cta?: { label: string; href: string }
}

/**
 * Generates a grounded conversational response using layered context
 */
export async function generateChatResponse(
  turn: ResolvedTurn,
  session: SessionContext,
  retrieval: RetrievalResult,
  history: StoredChatMessage[]
): Promise<GenerationOutput> {
  const externalApiKey = 
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.LLM_API_KEY

  if (externalApiKey) {
    try {
      return await callExternalLLM(turn, session, retrieval, history, externalApiKey)
    } catch (err) {
      console.warn('[ReasoningEngine] External LLM failed, switching to Grounded Domain Synthesizer:', err)
    }
  }

  // Use Built-in Grounded Domain Synthesizer
  return synthesizeGroundedResponse(turn, session, retrieval, history)
}

/**
 * Calls OpenAI or compatible provider if configured
 */
async function callExternalLLM(
  turn: ResolvedTurn,
  session: SessionContext,
  retrieval: RetrievalResult,
  history: StoredChatMessage[],
  apiKey: string
): Promise<GenerationOutput> {
  const endpoint = process.env.LLM_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions'
  const model = process.env.LLM_MODEL || 'gpt-4o-mini'

  const systemPrompt = `You are the TRUSTGRID.AI Principal Systems Architect & Conversational Assistant.
You advise enterprise CTOs, VP Infrastructure, and AI Leads on GPU infrastructure, autonomous agent swarms, AI-native networking, cybersecurity, trusted AI, and AI value engineering.

CRITICAL INSTRUCTIONS:
1. Maintain continuity across follow-up turns. Resolve pronouns like "it", "that solution", "the previous option", "those challenges".
2. Base all claims ONLY on the provided TRUSTGRID.AI Grounded Knowledge. Do NOT invent pricing, guarantees, or phantom case studies.
3. Present answers in authoritative, professional markdown with crisp bullet points, bold key terms, and clear sections.
4. If the user asks about challenges, explain the specific architectural bottlenecks.
5. If the user asks how TRUSTGRID.AI solves them, map the challenges directly to TRUSTGRID.AI engineering services.
6. If the user asks about implementation, detail the stages, prerequisites, timeline, and deliverables.
7. Offer to connect with an AI Architect or book an Executive AI Diagnostic when consultation intent is detected.

GROUNDED KNOWLEDGE:
Title: ${retrieval.primaryChunk.title}
Category: ${retrieval.primaryChunk.category}
Source URL: ${retrieval.primaryChunk.url}
Overview: ${retrieval.primaryChunk.content}
Key Verified Facts:
${retrieval.groundedFacts.map(f => `- ${f}`).join('\n')}

SESSION CONTEXT:
Active Topic: ${getTopicHumanLabel(turn.activeTopic)}
Task Stage: ${turn.taskStage}
Topics Explored: ${session.topicsDiscussed.join(', ') || 'Initial exploration'}
Previous Challenges Identified: ${session.statedChallenges.join(', ') || 'None specified'}`

  const messagesPayload = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-4).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: turn.expandedQuery }
  ]

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: messagesPayload,
      temperature: 0.2,
      max_tokens: 800
    })
  })

  if (!res.ok) {
    throw new Error(`LLM API returned status ${res.status}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ''

  const isConsultation = turn.taskStage === 'consultation_seeking' || session.consultationIntentDetected

  return {
    text: content,
    offeringTag: retrieval.primaryChunk.title,
    pageLink: { label: retrieval.primaryChunk.title, href: retrieval.primaryChunk.url },
    suggestedFollowUps: retrieval.suggestedFollowUps,
    isLeadPrompt: isConsultation,
    cta: isConsultation
      ? { label: 'Book 45-Min Strategy Session', href: '/book-ai-diagnostic?type=strategy-session#diagnostic-form-section' }
      : retrieval.primaryCta
  }
}

/**
 * Built-in Grounded Domain Synthesizer
 * Accurately models the exact multi-turn conversational stages requested by the enterprise spec.
 */
function synthesizeGroundedResponse(
  turn: ResolvedTurn,
  session: SessionContext,
  retrieval: RetrievalResult,
  history: StoredChatMessage[]
): GenerationOutput {
  const topicLabel = getTopicHumanLabel(turn.activeTopic)
  const isConsultation = turn.taskStage === 'consultation_seeking'

  // Stage 1: Clarification needed
  if (turn.needsClarification && turn.clarificationPrompt) {
    return {
      text: turn.clarificationPrompt,
      offeringTag: 'Architecture Exploration',
      pageLink: { label: 'Explore Enterprise AI Offerings', href: '/#offerings' },
      suggestedFollowUps: [
        'Explore AI Infrastructure & GPU Optimization',
        'Deploy Autonomous Agentic Enterprise Swarms',
        'Evaluate Lossless AI Networking & PQC Security'
      ],
      isLeadPrompt: false
    }
  }

  // Stage 2: User asking about Challenges / Bottlenecks
  if (turn.taskStage === 'evaluating_challenges') {
    let challengesText = ''
    if (turn.activeTopic === 'ai_infrastructure') {
      challengesText = `Deploying and scaling enterprise **${topicLabel}** surfaces four primary engineering challenges:

1. **Power & Thermal Limits (The 30–100kW/Rack Wall)**
   Modern clusters (H100, H200, Blackwell B200) consume 10.2kW per 8-GPU node. Conventional air-cooling ceases to be thermodynamically viable above 35kW/rack, requiring direct-to-chip liquid cooling (DLC).

2. **Compute Underutilization ("The GPU Idle Tax")**
   Most unoptimized enterprise clusters operate at only **25%–40% Model Flops Utilization (MFU)**. Idle cycles stem from unoptimized batching, serial memory reads, and NCCL communication deadlocks.

3. **Memory Bandwidth & KV-Cache Bloat**
   Large context windows across agent fleets rapidly exhaust high-bandwidth memory (HBM), leading to severe tail latency spikes and escalating operational inference costs.

4. **Network Collective Microbursts**
   Standard spine-leaf Ethernet drops packets during AllReduce collective synchronization, triggering retransmission storms that stall GPU execution pipelines.`
    } else if (turn.activeTopic === 'agentic_enterprise') {
      challengesText = `Scaling **${topicLabel}** into mission-critical business operations involves three major bottlenecks:

1. **Context Amnesia & Memory Drift**
   Single-turn LLMs lack persistent episodic memory, causing agents to lose track of multi-step business logic and customer state across sessions.

2. **Runaway Loops & Execution Non-Determinism**
   Without deterministic verification DAGs, autonomous agents can enter infinite recursive loops or hallucinate tool parameters when accessing enterprise databases.

3. **Security & Data Exfiltration Risks**
   Granting agents autonomous tool access without Model Context Protocol (MCP) sandboxing introduces severe prompt injection and unauthorized API execution vulnerabilities.`
    } else if (turn.activeTopic === 'networking_cybersecurity') {
      challengesText = `Enterprise **${topicLabel}** is constrained by:

1. **Incast Packet Loss in High-Radix Fabrics**
   Concurrent GPU all-to-all communication saturates switch buffer queues, causing tail-drop packet loss and stalling multi-node training checkpoints.

2. **Harvest-Now-Decrypt-Later Quantum Threats**
   Adversaries intercepting encrypted enterprise traffic intend to decrypt it once cryptanalytically relevant quantum computers emerge, necessitating an urgent transition to NIST Post-Quantum Cryptography (ML-KEM/ML-DSA).

3. **Autonomous Agent Identity Hijacking**
   Agent-to-agent communication often lacks zero-trust cryptographic verification, exposing workflows to prompt injection and credential leakage.`
    } else {
      challengesText = `The primary operational challenges in **${topicLabel}** involve eliminating non-deterministic execution, establishing measurable unit economics, and guaranteeing compliance with rigorous regulatory frameworks (EU AI Act, NIST AI RMF).`
    }

    return {
      text: challengesText,
      offeringTag: `${topicLabel} Challenges`,
      pageLink: { label: `Explore ${topicLabel}`, href: retrieval.primaryChunk.url },
      suggestedFollowUps: [
        'How can TRUSTGRID.AI solve them?',
        'What would the implementation involve?',
        'Can you audit our current GPU cluster utilization?'
      ],
      isLeadPrompt: false,
      cta: {
        label: 'Schedule a Diagnostic Review',
        href: `/book-ai-diagnostic?type=${retrieval.primaryChunk.category}#diagnostic-form-section`
      }
    }
  }

  // Stage 3: User asking "How can TRUSTGRID.AI solve them?"
  if (turn.taskStage === 'solution_mapping') {
    let solutionText = ''
    if (turn.activeTopic === 'ai_infrastructure') {
      solutionText = `**TRUSTGRID.AI resolves these infrastructure challenges through full-stack systems co-engineering:**

* **30–100kW/Rack Liquid Cooling Transitions**
  We engineer turnkey direct-to-chip liquid cooling (DLC) loops and secondary fluid distribution units (CDUs) to sustain peak Blackwell/Hopper densities with a target PUE < 1.15.

* **Kernel Optimization & Continuous Batching**
  By integrating custom CUDA kernels, vLLM continuous batching, and FP8/INT4 quantization with defense-domain calibration, we slash inference costs by **30%–60%** and increase MFU up to **70%+**.

* **Lossless Collective Interconnects**
  We tune non-blocking InfiniBand and RoCEv2 (NVIDIA Spectrum-X) with hardware Priority Flow Control (PFC) and Explicit Congestion Notification (ECN) to eliminate packet loss during AllReduce operations.

* **Slurm & Kubernetes Unified Orchestration**
  Deterministic workload scheduling that isolates distributed training checkpoints from latency-critical production inference swarms.`
    } else if (turn.activeTopic === 'agentic_enterprise') {
      solutionText = `**TRUSTGRID.AI solves multi-agent operational challenges through resilient engineering:**

* **Deterministic Reasoning DAGs (LangGraph & CrewAI)**
  We replace brittle chains with formal Directed Acyclic Graphs featuring cycle breakers, state validation nodes, and human-in-the-loop (HITL) checkpoints.

* **Dual-Tier Memory Fabrics**
  Combining high-throughput working memory in Redis with persistent episodic vectors, ensuring digital workers retain context across weeks of operational execution.

* **Model Context Protocol (MCP) Tool Sandboxing**
  Enterprise-grade, token-scoped access to ERPs, SQL databases, and internal APIs, protected by zero-trust prompt firewalls.`
    } else {
      solutionText = `**TRUSTGRID.AI addresses ${topicLabel} through systematic industrial engineering:**

* Applying proven industrial frameworks (**Lean, TOC, DMAIC, FMEA, SPC**) to eliminate computational waste and guarantee >95% execution accuracy.
* Deploying cryptographic audit envelopes and SHAP/LIME explainability for deterministic regulatory compliance.
* Delivering 3–10x verified ROI in phased 90-day execution sprints.`
    }

    return {
      text: solutionText,
      offeringTag: `TRUSTGRID.AI ${topicLabel} Solutions`,
      pageLink: { label: `View Complete ${topicLabel} Blueprints`, href: retrieval.primaryChunk.url },
      suggestedFollowUps: [
        'What would the implementation involve?',
        'What is the timeline and prerequisites for deployment?',
        'Can I speak with a principal AI architect?'
      ],
      isLeadPrompt: false,
      cta: {
        label: 'Discuss Architecture with an AI Architect',
        href: '/talk-to-ai-architect#session-booking-section'
      }
    }
  }

  // Stage 4: User asking "What would the implementation involve?"
  if (turn.taskStage === 'implementation_planning') {
    const implText = `**Implementing ${topicLabel} with TRUSTGRID.AI follows a structured 4-phase engineering engagement:**

### Phase 1: Architectural Assessment & AI Diagnostic (Weeks 1–2)
* **Compute & Telemetry Audit**: Non-invasive benchmarking of current GPU utilization (MFU), memory bandwidth bottlenecks, and network packet drop telemetry.
* **Workload Prioritization**: Mapping highest-yield enterprise workflows using Theory of Constraints (TOC).
* **Deliverable**: Comprehensive Architecture Blueprint & Sequenced 90-Day Production Roadmap.

### Phase 2: Pilot & Kernel Optimization (Weeks 3–6)
* **Kernel & Serving Acceleration**: Deployment of continuous batching, FP8/INT4 engine quantization, and custom CUDA kernels.
* **Network & Fabric Tuning**: Setting lossless PFC/ECN buffer thresholds across InfiniBand or RoCEv2 switches.
* **Milestone**: 2x–4x throughput verification on target production workloads.

### Phase 3: Production Hardening & Full Rollout (Weeks 7–12)
* Full integration into Slurm/Kubernetes orchestration or enterprise ERP/data pipelines.
* Deployment of real-time AgentOps telemetry, failover circuit breakers, and zero-trust security envelopes.

### Phase 4: Knowledge Transfer & Operating Handover (Ongoing)
* Full intellectual property (IP), custom kernel code, and configuration scripts transferred to your internal team.
* SLA-backed ongoing co-engineering partnership.`

    return {
      text: implText,
      offeringTag: `${topicLabel} Implementation Plan`,
      pageLink: { label: 'Book an Executive AI Diagnostic', href: '/book-ai-diagnostic#diagnostic-form-section' },
      suggestedFollowUps: [
        'What are the technical prerequisites from our engineering team?',
        'Can we schedule a 45-minute Executive Strategy Session?',
        'What are the engagement pricing and scope terms?'
      ],
      isLeadPrompt: true,
      cta: {
        label: 'Book 45-Min Executive Strategy Session',
        href: '/book-ai-diagnostic?type=strategy-session#diagnostic-form-section'
      }
    }
  }

  // Stage 5: Consultation or Purchasing Intent
  if (isConsultation) {
    const consultText = `We would be delighted to evaluate your enterprise requirements and outline a tailored architecture plan.

**TRUSTGRID.AI provides two immediate consultation paths:**

1. **Executive Strategy Session (45 Minutes)**
   A focused architectural briefing with our principal systems engineers to evaluate your compute economics, multi-agent readiness, lossless networking, or security posture.

2. **Fixed-Scope Executive AI Diagnostic (2–4 Weeks)**
   A structured engineering deep-dive delivering verifiable ROI metrics, GPU utilization benchmarks, and a turnkey 90-day deployment roadmap.

Would you like to book a 45-minute architectural session directly, or share your high-level cluster requirements below?`

    return {
      text: consultText,
      offeringTag: 'Principal Advisory & Diagnostic',
      pageLink: { label: 'Book Strategy Session (Calendar & Form)', href: '/book-ai-diagnostic?type=strategy-session#diagnostic-form-section' },
      suggestedFollowUps: [
        'Schedule a 45-minute architectural briefing',
        'Request an Executive Diagnostic proposal',
        'Connect directly with our team on WhatsApp'
      ],
      isLeadPrompt: true,
      cta: {
        label: 'Schedule Executive Strategy Session',
        href: '/book-ai-diagnostic?type=strategy-session#diagnostic-form-section'
      }
    }
  }

  // General / Initial Answer grounded in knowledge chunk
  const baseText = `${retrieval.primaryChunk.content}

**Key Architectural Highlights:**
${retrieval.groundedFacts.map(fact => `* ${fact}`).join('\n')}`

  return {
    text: baseText,
    offeringTag: retrieval.primaryChunk.title,
    pageLink: { label: `Explore ${retrieval.primaryChunk.title}`, href: retrieval.primaryChunk.url },
    suggestedFollowUps: retrieval.suggestedFollowUps,
    isLeadPrompt: false,
    cta: retrieval.primaryCta
  }
}
