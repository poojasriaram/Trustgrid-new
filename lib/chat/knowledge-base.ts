/**
 * ============================================================================
 * TRUSTGRID.AI — APPROVED ENTERPRISE KNOWLEDGE BASE CORPUS (RAG)
 * ============================================================================
 * Ground truth technical facts, architectures, metrics, methodologies, and
 * service offerings across all TRUSTGRID.AI practices.
 * ============================================================================
 */

export interface KnowledgeChunk {
  id: string
  title: string
  category: 'infra' | 'agentic' | 'networking' | 'cybersecurity' | 'trusted_ai' | 'value_engineering' | 'methodology' | 'diagnostic' | 'industries' | 'company'
  url: string
  topics: string[]
  content: string
  keyFacts: string[]
  suggestedFollowUps: string[]
  primaryCta?: {
    label: string
    href: string
  }
}

export const trustgridKnowledgeCorpus: KnowledgeChunk[] = [
  // --------------------------------------------------------------------------
  // 1. AI Infrastructure & AI Data Center Engineering
  // --------------------------------------------------------------------------
  {
    id: 'ai-infra-overview',
    title: 'AI Infrastructure & AI Data Center Engineering',
    category: 'infra',
    url: '/solutions/ai-infra-engineering',
    topics: ['ai infrastructure', 'gpu cluster', 'data center', 'liquid cooling', 'blackwell', 'h100', 'h200', 'b200', 'compute utilization', 'pue', 'ai factory'],
    content: `TRUSTGRID.AI architects high-density AI Factories and GPU superclusters (30–100kW/rack) designed for deterministic training and high-throughput inference. 
We solve the critical physical and architectural bottlenecks that waste 30–50% of raw GPU compute capacity. Our engineering capabilities cover direct-to-chip (DLC) and rear-door heat exchanger (RDHx) liquid cooling transitions, high-radix InfiniBand/RoCEv2 fabrics, Slurm/Kubernetes GPU orchestration, and kernel-level CUDA optimizations (vLLM, TensorRT-LLM, continuous batching, FP8/INT4 quantization).
By optimizing the physical layer through to the attention mechanism, TrustGrid slashes enterprise inference TCO by 30–60% and doubles cluster throughput without requiring new silicon procurement.`,
    keyFacts: [
      '30–100kW/rack high-density thermal engineering with direct-to-chip liquid cooling',
      'Target PUE < 1.15 in sovereign and hybrid AI data center campuses',
      '30–60% inference cost reduction delivered via FP8/INT4 mixed precision & continuous batching',
      'Turnkey Design-Build-Operate-Transfer (DBOT) delivery model from site power substations to GPU turn-up'
    ],
    suggestedFollowUps: [
      'What are the main bottlenecks in enterprise GPU infrastructure?',
      'How does TrustGrid optimize liquid cooling for 50kW+ racks?',
      'What is involved in a GPU infrastructure assessment?'
    ],
    primaryCta: {
      label: 'Explore AI Infrastructure Architecture',
      href: '/solutions/ai-infra-engineering'
    }
  },
  {
    id: 'ai-infra-challenges',
    title: 'Enterprise AI Infrastructure Challenges & Bottlenecks',
    category: 'infra',
    url: '/solutions/ai-infra-engineering',
    topics: ['gpu challenges', 'memory bottleneck', 'power constraints', 'thermal limits', 'inference cost', 'gpu idle time', 'tail latency'],
    content: `Enterprise AI infrastructure faces four critical bottlenecks:
1. Power & Thermal Ceiling: Modern GPU nodes (H100, H200, B200) draw 10.2kW per 8-way chassis, pushing rack densities beyond traditional 10–15kW air-cooled limits into 40–100kW liquid cooling regimes.
2. GPU Underutilization (Idle Tax): Clusters frequently operate at 25–40% Model Flops Utilization (MFU) due to unoptimized batching, NCCL communication deadlocks, and slow I/O pipelines.
3. Memory Bandwidth & Kv-Cache Bloat: Long-context inference runs into memory bandwidth limits, causing severe tail latencies and exponential inference costs.
4. Network Tail Latency: Standard spine-leaf Ethernet drops packets during AllReduce collectives, triggering microburst retransmissions and GPU starvation.`,
    keyFacts: [
      'Most unoptimized enterprise GPU clusters waste up to 40% of their power and capital on idle cycles',
      'Air cooling becomes thermodynamically infeasible above 35kW per rack',
      'Kv-cache memory footprint scales linearly with concurrent agent context windows'
    ],
    suggestedFollowUps: [
      'How does TrustGrid eliminate GPU communication deadlocks?',
      'What cooling technologies do you engineer for Blackwell B200 clusters?',
      'How can we reduce our monthly cloud GPU inference spend?'
    ],
    primaryCta: {
      label: 'Book GPU Utilization Diagnostic',
      href: '/book-ai-diagnostic?type=infra#diagnostic-form-section'
    }
  },

  // --------------------------------------------------------------------------
  // 2. Agentic Enterprise & AI Agent Swarms
  // --------------------------------------------------------------------------
  {
    id: 'agentic-enterprise-overview',
    title: 'Agentic Enterprise: Autonomous Multi-Agent Swarms & AgentOps',
    category: 'agentic',
    url: '/solutions/ai-agentic-factory',
    topics: ['agentic enterprise', 'ai agents', 'multi-agent systems', 'langgraph', 'crewai', 'autogen', 'mcp', 'digital workers', 'agentops', 'autonomous workflows'],
    content: `TRUSTGRID.AI engineers production-grade Agentic Enterprise architectures that transcend fragile single-prompt bots. We build resilient multi-agent swarms orchestrated via deterministic Directed Acyclic Graphs (DAGs) using frameworks like LangGraph, CrewAI, AutoGen, and custom Rust/Python runtimes.
Key capabilities include:
- Dual-Tier Memory Fabrics: Working context, episodic recall, and semantic memory vectors backed by low-latency Redis/milvus layers.
- Model Context Protocol (MCP): Secure, sandboxed tool augmentation connecting agents to enterprise databases, ERPs, and APIs.
- Enterprise AgentOps & Telemetry: Real-time hallucination detection, cycle-loop breakers, human-in-the-loop (HITL) escalations, and strict >95% SLA verification on mission-critical business transactions.`,
    keyFacts: [
      '>95% verified execution SLA on multi-step enterprise workflows',
      'Persistent episodic & semantic memory fabrics prevent context amnesia across sessions',
      'Hardware-sandboxed tool execution via standardized Model Context Protocol (MCP)',
      'Deterministic verification nodes prevent runaway loops and uncontrolled agent actions'
    ],
    suggestedFollowUps: [
      'How do you manage agent memory and prevent context loss?',
      'What is the Model Context Protocol (MCP) and how is it secured?',
      'Can autonomous agents integrate with legacy ERP and core banking systems?'
    ],
    primaryCta: {
      label: 'Explore Agentic Enterprise Solutions',
      href: '/solutions/ai-agentic-factory'
    }
  },

  // --------------------------------------------------------------------------
  // 3. AI-Native Networking & Quantum-Safe Cybersecurity
  // --------------------------------------------------------------------------
  {
    id: 'ai-networking-cybersecurity',
    title: 'AI-Native Networking & Post-Quantum Cybersecurity',
    category: 'networking',
    url: '/solutions/ai-networking-cybersecurity',
    topics: ['ai networking', 'infiniband', 'roce', 'rocev2', 'spectrum-x', 'packet loss', 'cybersecurity', 'quantum-safe', 'pqc', 'cbom', 'prompt injection', 'zero-trust'],
    content: `TRUSTGRID.AI provides unified AI Networking and Quantum-Safe Cybersecurity engineering:
1. AI Networking: High-radix, non-blocking InfiniBand (Quantum-2/XDR) and RoCEv2 (NVIDIA Spectrum-X) architectures engineered for zero packet loss, rail-optimized node alignment, and hardware-enforced Priority Flow Control (PFC) with Explicit Congestion Notification (ECN). This eliminates microsecond jitter and collective communication bottlenecks.
2. AI Cybersecurity: Zero-trust model sandboxing, real-time prompt-injection firewalls, adversarial jailbreak robustification, and agent credential vaults.
3. Post-Quantum Cryptography (PQC): Migrating critical enterprise communications to NIST standards (ML-KEM / Kyber and ML-DSA / Dilithium) accompanied by automated Cryptographic Bill of Materials (CBOM) generation.`,
    keyFacts: [
      'Zero packet drop across 400G and 800G GPU interconnect fabrics',
      'Hardware-tuned PFC & ECN buffer thresholds prevent Incast packet collapse',
      'NIST-compliant Post-Quantum Cryptography migration (ML-KEM & ML-DSA)',
      'Real-time automated prompt-injection & data leakage guardrails for LLM agents'
    ],
    suggestedFollowUps: [
      'What causes packet drop in GPU clusters and how does TrustGrid fix it?',
      'What is a Cryptographic Bill of Materials (CBOM)?',
      'How do you protect AI agents from prompt injection attacks?'
    ],
    primaryCta: {
      label: 'Explore Networking & Cybersecurity Architecture',
      href: '/solutions/ai-networking-cybersecurity'
    }
  },

  // --------------------------------------------------------------------------
  // 4. Trusted AI Engineering & Regulatory Governance
  // --------------------------------------------------------------------------
  {
    id: 'trusted-ai-governance',
    title: 'Trusted AI Engineering: Explainability, Auditing & Governance',
    category: 'trusted_ai',
    url: '/solutions/trusted-ai-transformation',
    topics: ['trusted ai', 'explainability', 'shap', 'lime', 'eu ai act', 'nist ai rmf', 'iso 42001', 'governance', 'bias detection', 'audit trail', 'deterministic ai'],
    content: `TRUSTGRID.AI transforms black-box AI models into mathematically verifiable, deterministic enterprise assets. 
We implement:
- Mathematical Explainability: Local and global feature attribution using SHAP (Shapley Additive exPlanations), LIME, and integrated gradients to provide clear audit rationales for every automated decision.
- Continuous Statistical Process Control (SPC): Real-time drift detection for embeddings, features, and model outputs, triggering automated rollback before business impact occurs.
- Cryptographic Audit Trails: Immutable, tamper-evident hash chains recording inputs, model checkpoints, prompts, and outputs for strict EU AI Act High-Risk systems and NIST AI RMF compliance.`,
    keyFacts: [
      'Full compliance readiness for EU AI Act, NIST AI RMF, and ISO/IEC 42001',
      'Mathematical decision attribution for high-stakes credit, clinical, and safety models',
      'Statistical Process Control (SPC) eliminates silent model drift in production'
    ],
    suggestedFollowUps: [
      'How do you meet EU AI Act requirements for high-risk models?',
      'What is the difference between SHAP and LIME in production systems?',
      'How does TrustGrid implement immutable audit logging?'
    ],
    primaryCta: {
      label: 'Explore Trusted AI Governance',
      href: '/solutions/trusted-ai-transformation'
    }
  },

  // --------------------------------------------------------------------------
  // 5. AI Value Engineering & FinOps
  // --------------------------------------------------------------------------
  {
    id: 'ai-value-engineering',
    title: 'AI Value Engineering: FinOps & 90-Day ROI Acceleration',
    category: 'value_engineering',
    url: '/solutions/ai-value-engineering',
    topics: ['ai value engineering', 'finops', 'roi', 'token economics', 'gpu tco', 'cost optimization', 'dmaic', 'theory of constraints'],
    content: `TRUSTGRID.AI connects AI engineering directly to P&L results. While the market suffers from pilot fatigue, we apply industrial operational excellence (Lean Thinking, Theory of Constraints, DMAIC) combined with granular AI FinOps.
We audit your complete inference and training pipeline to establish unit economics: cost per successful transaction, cost per 1M tokens, and GPU dollar efficiency. 
Our 90-Day Rapid Value Sprints deliver 3–10x verified ROI by prioritizing high-yield operational workflows, eliminating compute waste, and automating high-volume business constraints.`,
    keyFacts: [
      '3–10x verified return on investment delivered across 90-day sprints',
      'Granular FinOps tracking: exact dollar cost per successful task and per 1,000 queries',
      'Identification and resolution of operational bottlenecks using Theory of Constraints (TOC)'
    ],
    suggestedFollowUps: [
      'What metrics are tracked in an AI FinOps audit?',
      'How does a 90-Day Rapid Value Sprint work?',
      'How can we calculate our cost per automated transaction?'
    ],
    primaryCta: {
      label: 'Explore AI Value Engineering',
      href: '/solutions/ai-value-engineering'
    }
  },

  // --------------------------------------------------------------------------
  // 6. Methodology Engine
  // --------------------------------------------------------------------------
  {
    id: 'methodology-engine',
    title: 'AI-Driven Industrial Methodology Engine',
    category: 'methodology',
    url: '/methodology-engine',
    topics: ['methodology engine', 'lean', 'theory of constraints', 'dmaic', 'oee', 'tpm', 'smed', 'fmea', 'spc', 'hoshin kanri', 'poka-yoke', 'six sigma'],
    content: `TRUSTGRID.AI adapts world-class industrial manufacturing methodologies to modern software and AI operations:
- OEE (Overall Equipment Effectiveness): Applied to GPU superclusters to measure Availability, Performance, and Quality of compute.
- FMEA (Failure Mode & Effects Analysis): Systematically maps agent failure modes and hallucinatory vectors before production deployment.
- Poka-Yoke (Mistake Proofing): Hardware-enforced guardrails and schema validation preventing agents from executing invalid operations.
- SMED (Single-Minute Exchange of Die): Slashing model cold-start and GPU checkpoint restoration times from hours to seconds.
- TPM (Total Productive Maintenance): Predictive telemetry for liquid cooling loops, optical transceivers, and InfiniBand links.`,
    keyFacts: [
      'OEE framework applied to GPU compute cycles eliminates hidden idle time',
      'Poka-Yoke guards ensure zero invalid transactions reach core databases',
      'FMEA risk priority numbers (RPN) quantify and neutralize autonomous agent vulnerabilities'
    ],
    suggestedFollowUps: [
      'How does OEE apply to GPU clusters?',
      'What is Poka-Yoke in the context of LLM agents?',
      'How does TrustGrid implement FMEA for AI workflows?'
    ],
    primaryCta: {
      label: 'Explore Methodology Engine',
      href: '/methodology-engine'
    }
  },

  // --------------------------------------------------------------------------
  // 7. Executive Diagnostic & Engagement Models
  // --------------------------------------------------------------------------
  {
    id: 'engagement-models',
    title: 'TrustGrid Engagement Models & Executive AI Diagnostic',
    category: 'diagnostic',
    url: '/book-ai-diagnostic',
    topics: ['diagnostic', 'consultation', 'talk to architect', 'engagement models', 'strategy session', 'dbot', 'pricing', 'hire', 'implementation timeline'],
    content: `TRUSTGRID.AI offers structured, enterprise-grade engagement models tailored to organization maturity:
1. Executive AI Diagnostic (2–4 Weeks): Deep technical and financial evaluation of compute economics, agent readiness, networking fabrics, and security posture. Delivers an authoritative 90-day roadmap.
2. 90-Day Rapid Value Sprint (12 Weeks): Rapid prototype-to-production deployment targeting high-yield operational bottlenecks with guaranteed ROI milestones.
3. Turnkey Design-Build-Operate-Transfer (DBOT) (16–32 Weeks): Complete custom engineering of AI Factories, high-radix fabrics, and autonomous agent swarms transferred with full IP ownership.
4. Enterprise Operating Partnership: Ongoing co-engineering, continuous kernel tuning, 24/7 AgentOps SLA support, and PQC transition oversight.`,
    keyFacts: [
      '45-minute Executive Strategy Sessions available with principal systems architects',
      'Fixed-scope 2–4 week Executive Diagnostic provides comprehensive architectural blueprint',
      'All IP, code, and weights remain 100% proprietary to the client'
    ],
    suggestedFollowUps: [
      'What deliverables are included in the Executive AI Diagnostic?',
      'Can we book a 45-minute architectural briefing with a principal engineer?',
      'How does the DBOT model work for enterprise IP ownership?'
    ],
    primaryCta: {
      label: 'Book an Executive AI Diagnostic',
      href: '/book-ai-diagnostic#diagnostic-form-section'
    }
  },

  // --------------------------------------------------------------------------
  // 8. Regulated Industry Vertical Blueprints
  // --------------------------------------------------------------------------
  {
    id: 'industry-verticals',
    title: 'Enterprise AI Architectures for Regulated Industries',
    category: 'industries',
    url: '/industries',
    topics: ['industries', 'banking', 'healthcare', 'defense', 'manufacturing', 'telecom', 'energy', 'pharma', 'insurance', 'air-gapped', 'hipaa', 'sovereign'],
    content: `TRUSTGRID.AI provides pre-calibrated reference architectures across 12 regulated industry sectors:
- Banking & Capital Markets: Sub-millisecond algorithmic fraud arbitration, real-time stress testing, and sovereign financial transaction agents.
- Healthcare & Clinical AI: HIPAA/HITECH compliant air-gapped multimodal diagnostics, clinical documentation pipelines, and verified medical OCR.
- Aerospace & Defense: Air-gapped GPU networks, edge inference on ruggedized hardware, and post-quantum encrypted satellite downlinks.
- Industrial Manufacturing: Predictive OEE telemetry, optical conveyor seal integrity inspection, and autonomous supply chain scheduling.
- Telecommunications & Energy: Non-Terrestrial Network (NTN) orbital sync, autonomous NOC telemetry, and substation microgrid power management.`,
    keyFacts: [
      'Pre-calibrated for stringent regulatory regimes: HIPAA, FedRAMP, EU AI Act, DORA, and SEC Rule 17a-4',
      'Air-gapped and hybrid deployment capabilities with zero third-party cloud data exfiltration',
      'Production case study in medical packaging achieved 300% distribution velocity and 99.9% defect prevention'
    ],
    suggestedFollowUps: [
      'How does TrustGrid handle air-gapped deployments for defense and intelligence?',
      'What compliance safeguards are in place for HIPAA and healthcare data?',
      'Can you share details on the medical manufacturing packaging case study?'
    ],
    primaryCta: {
      label: 'View Industry Blueprints',
      href: '/industries'
    }
  }
]
