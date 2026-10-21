export type Offering = {
  title: string
  description: string
  subItems?: string[]
}

export type UseCase = {
  title: string
  description: string
}

export type MethodologyItem = {
  method: string
  focus: string
}

export type CapabilityGroup = {
  category: string
  items: string[]
}

export type MetricItem = {
  metric: string
  range: string
}

export type EngagementModel = {
  number: string
  title: string
  duration: string
  description: string
}

export type Solution = {
  slug: string
  aliases?: string[]
  number: string
  label: string
  shortTitle: string
  heroStatement: string
  marketContext: string
  problemStatement: string
  overview: string
  offerings: Offering[]
  useCases: UseCase[]
  industries: string[]
  methodologyDomain?: string
  methodologies: MethodologyItem[]
  subMethodologyDomain?: string
  subMethodologies?: MethodologyItem[]
  capabilities: CapabilityGroup[]
  metrics: MetricItem[]
  engagementModels: EngagementModel[]
}

export const allIndustries = [
  'Banking & Financial Services',
  'Insurance',
  'Healthcare & Life Sciences',
  'Manufacturing (Discrete)',
  'Process Manufacturing',
  'Energy & Utilities',
  'Telecommunications',
  'Retail & Consumer Goods',
  'Supply Chain & Logistics',
  'Government & Public Sector',
  'Technology & Software',
  'Aerospace & Defense',
]

export const marketGaps = [
  {
    number: 'INFRA',
    name: 'The Infrastructure Gap',
    tagline: 'Underutilized & Misarchitected Compute',
    description: 'Over 70% of enterprise AI budgets are consumed by infrastructure that is underutilized, misarchitected, or operationally immature. GPU clusters sit idle at 30–50% utilization. Inference costs balloon uncontrollably while the promise of AI economics fails to materialize.',
  },
  {
    number: 'AGENTS',
    name: 'The Agentic Gap',
    tagline: 'From Copilots to Autonomous Fleets',
    description: 'The shift from simple chatbots to autonomous multi-agent systems is the most consequential architectural change since the internet. Most enterprises lack the engineering capability to architect, govern, evaluate, and scale agent fleets safely.',
  },
  {
    number: 'TRUST',
    name: 'The Trust Gap',
    tagline: 'Black-Box Decisions in High-Stakes Environments',
    description: 'As AI systems take autonomous actions and make consequential decisions, trust is the non-negotiable precondition for adoption. Black-box models cannot survive regulatory scrutiny, board oversight, or public accountability.',
  },
  {
    number: 'SECURITY',
    name: 'The Security Gap',
    tagline: 'Novel AI Attack Surfaces & the Quantum Threat',
    description: 'AI introduces entirely new attack surfaces — prompt injection, agent hijacking, data poisoning, and model theft — while quantum computing and Harvest Now Decrypt Later campaigns render today\'s cryptographic foundations obsolete.',
  },
  {
    number: 'VALUE',
    name: 'The Value Gap',
    tagline: 'Opaque ROI & Unsustainable Cost of Intelligence',
    description: 'Billions are invested globally, yet the majority of enterprises cannot clearly attribute measurable business value to their AI spend. The cost of intelligence remains too high, and returns remain opaque without operational excellence rigor.',
  },
]

export const architectureStack = [
  {
    number: 'INFRA',
    title: 'Efficient AI Infrastructure',
    description: 'Purpose-engineered AI Factories delivering maximum intelligence per dollar and watt.',
    slug: 'ai-infra-engineering',
  },
  {
    number: 'AGENTS',
    title: 'Autonomous Agentic Systems',
    description: 'Digital workers and multi-agent systems turning autonomy into compounding capability.',
    slug: 'ai-agentic-factory',
  },
  {
    number: 'TRUST',
    title: 'Trusted, Governed Intelligence',
    description: 'Explainable, robust, auditable AI meeting strict global regulatory and board standards.',
    slug: 'trusted-ai-transformation',
  },
  {
    number: 'FABRIC & CYBER',
    title: 'AI Networking & Cybersecurity Intelligence',
    description: 'Lossless RoCEv2/InfiniBand fabrics, Cognitive WiFi 7, and L1–L7 post-quantum cyber defense as one nervous system.',
    slug: 'ai-networking-cybersecurity',
  },
  {
    number: 'TRANSFORM',
    title: 'Rapid Organizational Transformation',
    description: 'Accelerating enterprises from pilot purgatory to production-scale AI operations in months.',
    slug: 'trusted-ai-transformation',
  },
  {
    number: 'VALUE',
    title: 'Measurable, Compounding Business Value',
    description: 'Operational excellence (Lean, TOC, DMAIC) and AI FinOps ensuring 3-10x ROI.',
    slug: 'ai-value-engineering',
  },
]

export const differentiationData = [
  {
    dimension: 'Scope',
    typical: 'Single layer (infrastructure OR models OR governance)',
    trustgrid: 'Complete vertical stack: infra → agents → trust → security → networking → transformation → value',
  },
  {
    dimension: 'Depth',
    typical: 'Strategy decks or isolated technical delivery',
    trustgrid: 'Deep systems engineering + strategic alignment + operational accountability',
  },
  {
    dimension: 'Trust',
    typical: 'Afterthought or compliance checklist',
    trustgrid: 'First-class engineering property, designed into the architecture from day one',
  },
  {
    dimension: 'Value',
    typical: 'Activity-based billing, vague ROI claims',
    trustgrid: 'Measurable value engineering, unit economics, and continuous post-deployment tracking',
  },
  {
    dimension: 'Quantum',
    typical: 'Ignored or mentioned in passing',
    trustgrid: 'Integrated quantum-safe cryptography (PQC, CBOM) as core defense capability',
  },
  {
    dimension: 'Agents',
    typical: 'Single-agent demos and brittle prototypes',
    trustgrid: 'Production multi-agent systems with governance, observability, and lifecycle management',
  },
  {
    dimension: 'Accountability',
    typical: 'Deliverable-based (report delivered, project closed)',
    trustgrid: 'Outcome-based (value measured, capability sustained, teams upskilled)',
  },
]

export const operatingPrinciples = [
  {
    number: '01',
    title: 'Engineering First',
    description: 'We are an engineering company. Strategy without implementation is speculation. Implementation without strategy is waste. We do both, with engineering depth matching the complexity of the AGI era.',
  },
  {
    number: '02',
    title: 'Trust by Design',
    description: 'Every system we build is designed for trustworthiness from inception — not retrofitted for compliance after deployment. Trust is an architectural system property.',
  },
  {
    number: '03',
    title: 'Value Accountability',
    description: 'We tie our work to measurable business outcomes. We do not disappear after delivering a report. We stay until the value is realized, verified, and compounding.',
  },
  {
    number: '04',
    title: 'Complete Stack',
    description: 'Infrastructure without agents is wasted compute. Agents without trust are risk generators. Trust without security is a locked door with no walls. We engineer the complete stack because only the complete stack delivers results.',
  },
  {
    number: '05',
    title: 'Speed with Rigor',
    description: 'The AGI era moves fast. But speed without engineering rigor produces technical debt that compounds into failure. We move fast and build to last.',
  },
]

export const solutions: Solution[] = [
  {
    slug: 'ai-infra-engineering',
    aliases: ['ai-infrastructure', 'infra'],
    number: 'INFRASTRUCTURE',
    label: 'AI INFRASTRUCTURE & DATA CENTER',
    shortTitle: 'AI Infra Engineering',
    heroStatement: 'We design, build, and continuously optimize production-grade AI Factories that deliver maximum intelligence per dollar and per watt — the foundational compute layer for enterprise AI at scale.',
    marketContext: 'The AI infrastructure landscape is in crisis. Enterprises are spending unprecedented sums on GPU hardware, cloud compute, and data center capacity — yet the majority of this investment is operationally inefficient. Training runs fail. Inference costs spiral. GPU utilization hovers at 30–50% in most environments.',
    problemStatement: 'Most enterprise AI infrastructure was built incrementally without systems-level engineering or holistic economics. True AI Factories are purpose-engineered, continuously optimized, economically governed compute systems designed to produce intelligence as reliably and efficiently as a semiconductor fab produces chips.',
    overview: 'TRUSTGRID.AI transforms experimental GPU clusters into hyper-optimized AI Factories — systems engineered end-to-end for throughput, latency, cost efficiency, energy sustainability, and operational resilience. We design, build, deploy, operate, and continuously optimize every watt, token, and dollar.',
    offerings: [
      {
        title: 'AI Factory Design & Architecture',
        description: 'End-to-end engineering of production AI compute environments — from accelerator selection and cluster topology to power, cooling, networking, and storage.',
        subItems: ['Integrated accelerator topology design (Blackwell / HGX / MI300X)', 'Direct-to-chip liquid cooling engineering (30–100kW/rack)', 'Multi-region distributed compute fabrics & sovereign deployments', 'Bare-metal & Kubernetes AI cluster orchestration'],
      },
      {
        title: 'LLMOps & Model Lifecycle Engineering',
        description: 'We engineer the complete model lifecycle — from foundation model selection and optimization to production deployment, evaluation, observability, and continuous improvement.',
        subItems: ['Foundation model selection, fine-tuning & LoRA/DPO adaptation', 'Inference acceleration via TensorRT-LLM, vLLM & Triton Inference Server', 'FP8, INT8 & INT4 activation-aware quantization', 'Continuous model evaluation, drift benchmarking & LLM observability'],
      },
      {
        title: 'Inference Optimization Engineering',
        description: 'Deep specialization in model serving economics and latency reduction — the single largest recurring cost in production AI.',
        subItems: ['Speculative decoding (Medusa, Eagle, lookahead)', 'Continuous batching & PagedAttention KV-cache management', 'Prefix caching & dynamic multi-LoRA switching at line speed', 'Multi-tenant GPU slicing (MIG, vGPU) & distributed serving'],
      },
      {
        title: 'Cluster Performance & Utilization Engineering',
        description: 'Continuous measurement, profiling, and optimization of accelerator utilization, memory bandwidth, and interconnect efficiency.',
        subItems: ['GPU memory bandwidth optimization & kernel micro-tuning', 'Workload-aware intelligent Slurm/K8s scheduling', 'Elimination of idle cycles, thermal throttling & straggler jobs', 'Distributed tensor & pipeline parallelism tuning'],
      },
      {
        title: 'AI Infrastructure Deployment & Managed Services',
        description: 'Full lifecycle deployment from procurement coordination and hardware installation to software stack validation and 24/7 Managed AI Factory operations.',
        subItems: ['Turnkey cluster deployment & validation', 'Software stack configuration (vLLM, TensorRT-LLM, Triton, Ray)', 'Continuous SLA monitoring and incident response', 'Capacity planning and cost engineering'],
      },
      {
        title: 'Hybrid Classical–Quantum Readiness',
        description: 'Architecture and infrastructure design that accommodates emerging quantum and quantum-hybrid workloads alongside classical GPU compute.',
        subItems: ['Quantum-hybrid co-processor interfaces', 'Post-quantum architectural isolation', 'Future-proof interconnect topologies', 'Quantum algorithm simulation optimization'],
      },
    ],
    useCases: [
      {
        title: 'Private / Sovereign AI Factory Deployment',
        description: 'Air-gapped, domestically operated, and fully controlled AI compute environments for defense, governments, and regulated financial institutions.',
      },
      {
        title: 'Inference Cost Reduction (30–60%)',
        description: 'Re-architecting production model serving to dramatically slash cost-per-token while increasing throughput within the first optimization cycle.',
      },
      {
        title: 'Scaling Large Agent Fleets Economically',
        description: 'Engineering elastic, multi-tenant AI infrastructure that dynamically scales bursty multi-agent workloads without costly overprovisioning.',
      },
      {
        title: 'Hybrid, Multi-Cloud & Air-Gapped Infrastructure',
        description: 'Unified AI compute fabrics spanning on-prem data centers, AWS, Azure, GCP, and classified edge nodes with uniform governance.',
      },
      {
        title: 'Energy-Efficient AI Clusters (Watts-per-Token)',
        description: 'Co-designing compute, power delivery, and direct-to-chip liquid cooling to minimize environmental footprint per unit of intelligence produced.',
      },
      {
        title: 'Rapid Productionization of Experimental AI',
        description: 'Bridging research notebooks to enterprise production with robust serving frameworks, automated failovers, and auto-scaling.',
      },
    ],
    industries: allIndustries,
    methodologyDomain: 'AI Methodology Engine (Relevant to Infra)',
    methodologies: [
      { method: 'Lean Thinking', focus: 'Infrastructure waste elimination across idle compute & memory leaks' },
      { method: 'Value Stream Mapping', focus: 'AI compute value streams from raw prompt to response delivery' },
      { method: 'Theory of Constraints (TOC)', focus: 'Infrastructure bottleneck identification (memory bandwidth, PCIe, network)' },
      { method: 'OEE (Overall Equipment Effectiveness)', focus: 'AI Factory equipment effectiveness & accelerator uptime' },
      { method: 'TPM (Total Productive Maintenance)', focus: 'Proactive GPU cluster maintenance & thermal wear prevention' },
      { method: 'SMED', focus: 'Deployment changeover reduction & instant model swapping' },
      { method: '5S / 6S', focus: 'Infrastructure environment organization and systematic stack hygiene' },
      { method: 'DMAIC', focus: 'Infrastructure quality improvement and latency jitter elimination' },
      { method: 'Kaizen', focus: 'Continuous infrastructure cost and throughput optimization' },
      { method: 'Life Cycle Costing', focus: 'Total infrastructure cost engineering (capex, opex, power, cooling)' },
      { method: 'Target Costing', focus: 'Infrastructure cost engineering to hit target cost-per-token' },
    ],
    capabilities: [
      {
        category: 'Full-Stack Accelerator & Compute Architecture',
        items: ['NVIDIA Blackwell GB200, HGX H100/H200, DGX, Grace Hopper', 'AMD Instinct MI300X & MI350X series', 'Custom ASIC deployments & heterogeneous orchestration (TPU, Trainium)', 'Bare-metal & Kubernetes AI orchestration with Slurm scheduler integration'],
      },
      {
        category: 'LLMOps & Foundation Model Engineering',
        items: ['Complete model lifecycle: selection, fine-tuning (LoRA/DPO), evaluation & deployment', 'Model serving via vLLM, TensorRT-LLM, NVIDIA NIM, and Triton Inference Server', 'Continuous model evaluation, regression benchmarking & output guardrails', 'Full-stack LLM observability, distributed tracing & token telemetry'],
      },
      {
        category: 'Inference Micro-Optimization & Serving Performance',
        items: ['FP8, INT8 & INT4 activation-aware quantization runtimes', 'Speculative decoding (Medusa, Eagle, lookahead)', 'Continuous batching, chunked prefill & prefix caching', 'PagedAttention & KV-cache memory compression'],
      },
      {
        category: 'AI-for-AI Infrastructure Optimization',
        items: ['Automated profiling & kernel tuning engines', 'Continuous performance regression detection', 'Workload-aware dynamic power capping', 'Predictive capacity and failure forecasting'],
      },
    ],
    metrics: [
      { metric: 'Reduction in effective cost of intelligence', range: '20–40%' },
      { metric: 'Improvement in GPU cluster utilization', range: '30–70%' },
      { metric: 'Reduction in production cost-per-token', range: 'Up to 60%' },
      { metric: 'Reduction in time-to-production', range: 'Weeks to months faster' },
      { metric: 'Energy efficiency improvement (watts-per-token)', range: '25–50%' },
      { metric: 'Increase in inference throughput on same hardware', range: '2–4x' },
    ],
    engagementModels: [
      {
        number: '01',
        title: 'AI Factory Architecture Audit',
        duration: '4 wks',
        description: 'Comprehensive assessment of existing compute infrastructure — topology, utilization, cost structure, performance bottlenecks, and prioritized optimization roadmap.',
      },
      {
        number: '02',
        title: 'Inference Economics Assessment',
        duration: '4–8 wks',
        description: 'Deep-dive into production inference workloads — serving architecture, cost-per-token analysis, and proof-of-concept optimization of one critical workload.',
      },
      {
        number: '03',
        title: 'Full AI Factory Design & Build',
        duration: '16–32 wks',
        description: 'Complete architecture, engineering, procurement coordination, deployment, and operational readiness of a turnkey production AI Factory.',
      },
      {
        number: '04',
        title: 'Continuous Optimization / Managed AI Factory',
        duration: 'Ongoing',
        description: 'Ongoing operational management and continuous optimization of AI infrastructure — performance monitoring, capacity planning, cost engineering, and incident response.',
      },
    ],
  },
  {
    slug: 'ai-agentic-factory',
    aliases: ['agentic-enterprise', 'agentic', 'agents', 'ai-agentic'],
    number: 'AGENTIC',
    label: 'AGENTIC ENTERPRISE & FACTORY',
    shortTitle: 'AI Agentic + Factory',
    heroStatement: 'We architect, industrialize, and operate multi-agent systems that become the new operating system of the enterprise — turning autonomy into reliable, governed, and compounding business capability.',
    marketContext: 'The enterprise software application layer is giving way to autonomous digital workers that perceive, reason, plan, act, and collaborate across enterprise systems without human intervention at every step.',
    problemStatement: 'The gap between a single-agent demo and a production multi-agent system is vast. Production agent fleets require robust orchestration, persistent memory, hierarchical planning, tool integration at enterprise scale, comprehensive observability, human-in-the-loop governance, security boundaries, and continuous evaluation.',
    overview: 'TRUSTGRID.AI builds production-grade agentic systems on top of optimized AI Factories. We engineer multi-agent architectures that scale from pilot to enterprise-wide operation with the reliability, observability, and governance that production demands.',
    offerings: [
      {
        title: 'Agentic System Architecture',
        description: 'End-to-end architectural design of enterprise multi-agent systems — agent roles, communication protocols, memory architectures, planning hierarchies, and tool integration.',
        subItems: ['Multi-agent topology design (hierarchical, swarm, consensus)', 'Agent communication protocols and message buses', 'Persistent memory architectures (episodic, procedural, semantic)', 'Tool integration and API authorization boundaries via Model Context Protocol (MCP)'],
      },
      {
        title: 'Long-Memory AI & Persistent Enterprise Intelligence',
        description: 'Engineering the continuous cognitive spine: Enterprise Data → Knowledge Graph → Vector Memory → RAG → Semantic Search → Long-Term Memory → Enterprise Agents.',
        subItems: ['Enterprise data consolidation & automated knowledge graph construction', 'Vector database infrastructure & sub-50ms semantic search', 'Hybrid retrieval-augmented generation (RAG & GraphRAG)', 'Persistent cross-session long-term memory for digital worker fleets'],
      },
      {
        title: 'Vertical Agent Factories',
        description: 'Purpose-built agent development and deployment platforms for specific industry verticals and functional domains, pre-configured with enterprise connectors and compliance guardrails.',
        subItems: ['Domain-specific prompt & reasoning libraries', 'Pre-built enterprise connectors (ERP, CRM, SCM, ITSM)', 'Industry compliance and validation benchmarks', 'Accelerated time-to-production in weeks instead of months'],
      },
      {
        title: 'Agent Lifecycle & Governance Platform',
        description: 'The operational backbone for enterprise agent fleets — provisioning, configuration management, version control, runtime monitoring, policy enforcement, and audit logging.',
        subItems: ['Agent versioning, rollback, and Canary deployments', 'Granular action logging and decision tracing', 'Runtime policy enforcement & confidence thresholds', 'Automated agent regression testing & benchmark suites'],
      },
      {
        title: 'Agentic Enterprise Transformation',
        description: 'Strategic and organizational consulting to help enterprises redesign their operating models around human-agent collaboration and workforce evolution.',
        subItems: ['Human-agent workflow redesign', 'Role evolution and escalation protocol design', 'Workforce enablement & agentic literacy programs', 'Continuous feedback and improvement loops'],
      },
      {
        title: 'Multi-Agent Orchestration Platforms',
        description: 'Engineering the orchestration middleware that coordinates complex multi-agent workflows across sequential, parallel, hierarchical, swarm, debate, and consensus patterns.',
        subItems: ['Dynamic task decomposition and delegation engines', 'Shared team memory & cross-agent context sharing', 'Inter-agent conflict resolution & consensus mechanisms', 'Distributed agent execution runtime (LangGraph, CrewAI, AutoGen)'],
      },
    ],
    useCases: [
      {
        title: 'Autonomous Finance Operations',
        description: 'Multi-agent systems handling billing discrepancy detection, accounts receivable reconciliation, financial anomaly investigation, and cash forecasting 24/7.',
      },
      {
        title: 'Persistent Long-Memory Intelligence Hub',
        description: 'Unified enterprise cognitive core indexing multi-decade corporate data, technical manuals, contracts, and customer interactions into a searchable knowledge graph and vector memory.',
      },
      {
        title: 'Multi-Agent Supply Chain Planning',
        description: 'Agent fleets monitoring real-time demand signals, inventory levels, supplier lead times, and logistical risks to dynamically adjust procurement plans.',
      },
      {
        title: 'AI SRE / DevOps Autonomous Agents',
        description: 'Automating the detect → diagnose → remediate → learn incident loop across complex cloud architectures with intelligent human escalation.',
      },
      {
        title: 'Customer Operations Agent Fleets',
        description: 'Coordinated multi-agent resolution swarms (intake, triage, knowledge retrieval, resolution, QA) delivering 40–70% cost-to-serve reductions.',
      },
      {
        title: 'Knowledge-Work Automation',
        description: 'Autonomous research, synthesis, drafting, financial modeling, and regulatory analysis agent teams augmenting knowledge workers by 10x.',
      },
      {
        title: 'Cross-Functional Enterprise Workflows',
        description: 'End-to-end agentic workflows seamlessly bridging procurement, legal review, compliance validation, and vendor onboarding across silos.',
      },
    ],
    industries: allIndustries,
    methodologyDomain: 'AI Methodology Engine (Relevant to Agents)',
    methodologies: [
      { method: 'Lean Thinking', focus: 'Agent workflow waste elimination (unnecessary LLM hops, repetitive context)' },
      { method: 'Kanban (Software)', focus: 'Agent flow optimization & work-in-progress task limit enforcement' },
      { method: 'Value Stream Mapping', focus: 'Agent execution streams from user intent to downstream action' },
      { method: 'Agile / Scrum', focus: 'Agent development sprints & rapid capability iterations' },
      { method: 'DevOps / CI / CD', focus: 'MLOps & AgentOps continuous delivery and regression testing' },
      { method: 'Design Thinking', focus: 'Human-agent interaction design & seamless escalation UX' },
      { method: 'BPM', focus: 'Agent process modeling & enterprise workflow mapping' },
      { method: 'DMAIC', focus: 'Agent workflow quality & task completion rate enhancement' },
      { method: 'FMEA', focus: 'Agent failure mode and effects analysis (hallucinations, action loops)' },
      { method: 'Poka-Yoke', focus: 'Agent action mistake-proofing via schema validation & sandboxing' },
      { method: 'Jidoka', focus: 'Agent self-stopping on confidence drops or anomaly detection' },
      { method: 'Kata', focus: 'Daily agent performance improvement and self-refinement routines' },
      { method: 'Theory of Constraints (TOC)', focus: 'Agent system bottlenecks in memory, tools, and token context' },
      { method: 'OKR', focus: 'Agent fleet performance tracking against measurable enterprise outcomes' },
    ],
    capabilities: [
      {
        category: 'Multi-Agent Orchestration Architectures',
        items: ['Hierarchical delegation & supervisor patterns', 'Swarm intelligence & autonomous peer collaboration', 'Adversarial debate & consensus protocols', 'Dynamic graph-based workflow execution (LangGraph, CrewAI, AutoGen)'],
      },
      {
        category: 'Long-Memory AI & Enterprise Memory Systems',
        items: ['Enterprise Data → Knowledge Graph → Vector Memory → RAG pipeline', 'Episodic, procedural and semantic memory with vector database indexing', 'GraphRAG relationship querying and entity resolution', 'Cross-session long-term memory with automated consolidation and pruning'],
      },
      {
        category: 'Planning & Reasoning Frameworks',
        items: ['ReAct, Plan-and-Execute, Tree-of-Thought, Graph-of-Thought', 'Reflection and Self-Refine validation loops', 'Domain-specific symbolic + neural reasoning hybrids', 'Dynamic tool discovery and Model Context Protocol (MCP) schema binding'],
      },
      {
        category: 'Governance & Human-in-the-Loop',
        items: ['Configurable human approval gates & escalation triggers', 'Confidence thresholding and uncertainty quantification', 'Immutable action audit trails and replay capabilities', 'Zero-trust agent sandboxing and permission boundaries'],
      },
    ],
    metrics: [
      { metric: 'Automation of routine knowledge work', range: '15–40%' },
      { metric: 'Reduction in process cycle times', range: '50–80%' },
      { metric: 'Reliability of multi-step agent workflows', range: '>95% completion' },
      { metric: 'Time to measurable business ROI', range: '90–180 days' },
      { metric: 'Reduction in cost-to-serve (customer operations)', range: '40–70%' },
      { metric: 'Cross-functional workflow acceleration', range: '3–10x faster' },
    ],
    engagementModels: [
      {
        number: '01',
        title: 'Agentic Readiness Assessment',
        duration: '4 wks',
        description: 'Evaluation of organizational readiness — process landscape, data accessibility, system APIs, governance maturity, and prioritized use case roadmap.',
      },
      {
        number: '02',
        title: 'Multi-Agent Pilot',
        duration: '12–24 wks',
        description: 'End-to-end design, development, testing, and production deployment of a multi-agent system for one high-value enterprise use case.',
      },
      {
        number: '03',
        title: 'Vertical Agent Factory Build',
        duration: '24–40 wks',
        description: 'Design and deployment of a reusable, domain-specific agent platform enabling the enterprise to build and govern agent fleets at industrial scale.',
      },
      {
        number: '04',
        title: 'Enterprise Agentic Transformation',
        duration: '24–72 wks',
        description: 'Comprehensive program to redesign the enterprise operating model around human-agent collaboration — strategy, architecture, development, and change management.',
      },
      {
        number: '05',
        title: 'Managed Agent Fleet Operations',
        duration: 'Ongoing',
        description: 'Continuous 24/7 operation, monitoring, optimization, and governance of production agent fleets operated by TRUSTGRID.AI engineers.',
      },
    ],
  },
  {
    slug: 'trusted-ai-transformation',
    aliases: ['trusted-ai', 'transformation', 'enterprise-transformation'],
    number: 'TRUSTED',
    label: 'TRUSTED AI & ENTERPRISE TRANSFORMATION',
    shortTitle: 'Trusted AI & Enterprise Transformation',
    heroStatement: 'We engineer AI systems that are reliable, transparent, auditable, and trustworthy — while accelerating enterprises from fragmented pilots to governed, production-scale AI operations.',
    marketContext: 'Trust is the defining bottleneck of enterprise AI adoption. Black-box models cannot survive the EU AI Act, NIST AI RMF, ISO/IEC 42001, or board scrutiny. Simultaneously, most enterprises are stuck in "pilot purgatory" with dozens of disconnected proof-of-concepts that fail to scale.',
    problemStatement: 'Trust cannot be an afterthought or a compliance checkbox added after deployment. It must be engineered into the architecture, data pipelines, model lifecycle, and agent orchestration. Combined with rapid organizational transformation, enterprises achieve production-grade AI in months instead of years.',
    overview: 'TRUSTGRID.AI integrates TRUSTED AI Engineering with Enterprise Rapid Transformation into a cohesive discipline. We build verifiable, explainable, robust, and accountable AI systems while deploying the foundational operating model, platforms, and cultural literacy required to scale sustainably.',
    offerings: [
      {
        title: 'TRUSTED AI Engineering',
        description: 'Comprehensive engineering discipline ensuring AI systems are inherently trustworthy, explainable, robust, and compliant from inception.',
        subItems: [
          'Trustworthy AI Architecture & Design',
          'Explainability & Transparency Engineering',
          'Robustness, Reliability & Safety Engineering',
          'AI Auditability & Decision Traceability',
          'Responsible AI Governance Frameworks',
          'Continuous Trust Monitoring & Assurance',
        ],
      },
      {
        title: 'Enterprise Transformation',
        description: 'Accelerating enterprises from fragmented, disconnected pilots into governed, production-scale AI operations and modern operating models.',
        subItems: [
          'AI Transformation Strategy & Roadmap',
          'Rapid AI Foundation Building',
          'Accelerated Productionization',
          'Agentic Operating Model Transformation',
          'TRUSTED AI Integration into Transformation',
          'Change Management & AI Literacy Programs',
        ],
      },
    ],
    useCases: [
      {
        title: 'Explainable High-Stakes Decisions',
        description: 'Making credit decisions, medical diagnostics, insurance underwriting, and hiring assessments fully explainable and auditable to regulators and affected individuals.',
      },
      {
        title: 'Robust AI for Adversarial Environments',
        description: 'Hardening AI systems in fraud detection, cybersecurity, and defense against adversarial manipulation, evasion attacks, and severe distribution shift.',
      },
      {
        title: 'Decision-Traceable Agentic Workflows',
        description: 'Reconstructing every tool call, reasoning branch, and data retrieval for autonomous agents operating in regulated financial services and healthcare.',
      },
      {
        title: 'Enterprise Responsible AI Policy Implementation',
        description: 'Operationalizing corporate AI principles into automated engineering guardrails, CI/CD policy gates, and runtime compliance enforcement.',
      },
      {
        title: 'Production Trust Monitoring',
        description: 'Real-time telemetry tracking model drift, fairness decay, hallucination rates, and confidence scoring across live production inference pipelines.',
      },
      {
        title: 'Regulatory Audit Preparation',
        description: 'Preparing technical documentation, risk management systems, and verifiable testing evidence for EU AI Act, NIST AI RMF, and ISO 42001 certification.',
      },
      {
        title: 'Disconnected Pilots → Governed Platform (<6 mo)',
        description: 'Consolidating 10–50+ scattered GenAI experiments into a standardized, governed enterprise AI platform with unified infrastructure and ROI tracking.',
      },
      {
        title: 'Production Agentic Workflows (90–180 days)',
        description: 'Deploying hardened, production-ready multi-agent systems across finance, operations, and customer service with full governance from day one.',
      },
      {
        title: 'TRUSTED AI from Day One',
        description: 'Embedding explainability, safety bounds, and audit trails directly into early-stage architectures before technical debt accumulates.',
      },
      {
        title: 'Internal AI Factory + Agent Factory',
        description: 'Standing up centralized internal delivery hubs that empower business units to safely build, validate, and deploy AI capabilities at scale.',
      },
      {
        title: 'Regulatory-Compliant AI Transformation',
        description: 'Executing cross-functional enterprise transformation aligned with global regulatory mandates and board-level risk tolerance.',
      },
      {
        title: 'Cross-Functional AI Delivery Teams',
        description: 'Upskilling enterprise engineering, product, legal, and operational teams to deliver AI-native workflows through structured literacy programs.',
      },
    ],
    industries: allIndustries,
    methodologyDomain: 'AI Methodology Engine (TRUSTED AI Domain)',
    methodologies: [
      { method: 'FMEA', focus: 'AI failure mode analysis & hallucination containment' },
      { method: 'SPC', focus: 'AI model quality monitoring & statistical control' },
      { method: 'DMAIC', focus: 'Trust improvement and systematic bias reduction' },
      { method: 'PDCA / PDSA', focus: 'Trust verification cycles & continuous evaluation' },
      { method: '5 Whys', focus: 'AI trust root cause analysis for anomalous outputs' },
      { method: 'Ishikawa', focus: 'AI bias & robustness causes root-cause mapping' },
      { method: 'A3 Problem Solving', focus: 'Trust problem docs & cross-functional alignment' },
      { method: 'Poka-Yoke', focus: 'AI decision mistake-proofing & automated guardrails' },
      { method: 'Benchmarking', focus: 'Trust metric benchmarking against global standards' },
      { method: 'TQM', focus: 'AI quality culture embedded across engineering' },
    ],
    subMethodologyDomain: 'AI Methodology Engine (Enterprise Transformation Domain)',
    subMethodologies: [
      { method: 'Hoshin Kanri', focus: 'AI strategy deployment from executive board to teams' },
      { method: 'Balanced Scorecard', focus: 'AI performance across financial, customer, process & learning' },
      { method: 'OKR', focus: '90-day transformation objectives & measurable results' },
      { method: 'Lean Thinking', focus: 'Transformation waste elimination across delivery pipelines' },
      { method: 'BPR', focus: 'Process redesign for AI-native autonomous workflows' },
      { method: 'BPM', focus: 'AI process management & enterprise workflow modeling' },
      { method: 'Kata', focus: 'Daily improvement routines and coaching for AI leaders' },
      { method: 'Kaizen', focus: 'Continuous transformation & incremental capability compounding' },
      { method: 'Design Thinking', focus: 'AI adoption design & human-agent interaction ergonomics' },
      { method: 'Change Management + AI Literacy', focus: 'Workforce enablement & cultural readiness' },
      { method: 'Shingo Model', focus: 'Cultural foundation for sustainable operational excellence' },
      { method: 'Deming\'s 14 Points', focus: 'AI management principles for quality and continuous learning' },
      { method: 'Baldrige Framework', focus: 'Enterprise-wide AI performance excellence standards' },
    ],
    capabilities: [
      {
        category: 'Model Interpretability & Explainability',
        items: ['SHAP, LIME, Integrated Gradients, Grad-CAM', 'Concept-based explanations (TCAV) & counterfactual reasoning', 'Natural language justification and chain-of-thought verification', 'Auditor-friendly and executive-level explanation dashboards'],
      },
      {
        category: 'Robustness & Formal Verification',
        items: ['Adversarial attack simulation (PGD, C&W, AutoAttack)', 'Certified robustness testing & randomized smoothing', 'Out-of-distribution (OOD) detection & uncertainty estimation', 'Automated fail-safe routing and fallback mechanisms'],
      },
      {
        category: 'Decision Logging & Provenance Tracking',
        items: ['Causal provenance graphs for AI decisions', 'Immutable cryptographic audit trails & ledger integration', 'Agent action recording, indexing, and replay capability', 'Automated regulatory report generation'],
      },
      {
        category: 'Transformation & Industrialization Execution',
        items: ['Proprietary AI maturity assessment & value mapping', 'Pilot-to-production industrialization methodology', 'Internal AI Factory & Agent Factory operating model design', 'Enterprise-wide AI literacy curricula and change management'],
      },
    ],
    metrics: [
      { metric: 'Explainability coverage of critical AI decisions', range: '>95% for high-risk systems' },
      { metric: 'Reduction in model risk and unexpected failures', range: '40–70%' },
      { metric: 'Auditability of AI and agent decisions', range: '100% for instrumented systems' },
      { metric: 'Reduction in time-to-production for AI systems', range: '50–70% faster' },
      { metric: 'Pilots successfully converted to production', range: '>80% of prioritized pilots' },
      { metric: 'Time from transformation start to first measurable value', range: '90 days' },
    ],
    engagementModels: [
      {
        number: '01',
        title: 'TRUSTED AI Readiness Assessment',
        duration: '4 wks',
        description: 'Rigorous evaluation of existing AI systems, governance maturity, regulatory exposure, and risk posture with prioritized engineering recommendations.',
      },
      {
        number: '02',
        title: 'Trust Architecture Workshop',
        duration: '2–4 wks',
        description: 'Collaborative technical design sessions to architect explainability, audit trails, and safety boundaries for high-stakes AI applications.',
      },
      {
        number: '03',
        title: 'Full TRUSTED AI Engineering',
        duration: '16–32 wks',
        description: 'End-to-end implementation of explainability pipelines, robustness verification, and immutable decision audit logging into core production systems.',
      },
      {
        number: '04',
        title: 'Continuous Trust Assurance',
        duration: 'Ongoing',
        description: 'Continuous runtime trust monitoring, model drift detection, fairness remediation, and compliance telemetry management.',
      },
      {
        number: '05',
        title: 'Responsible AI Governance',
        duration: '16–24 wks',
        description: 'Enterprise-wide governance rollout aligned with EU AI Act, NIST AI RMF, and ISO 42001, embedding policy gates across CI/CD pipelines.',
      },
      {
        number: '06',
        title: 'AI Transformation Readiness Assessment',
        duration: '6–8 wks',
        description: 'Comprehensive organizational, architectural, and data landscape evaluation establishing the 18–36 month transformation roadmap.',
      },
      {
        number: '07',
        title: '90-Day Rapid Transformation Sprint',
        duration: '12 wks',
        description: 'Intensive engagement to stand up production platform foundations, launch 1–3 high-impact agent workflows, and demonstrate verifiable ROI.',
      },
      {
        number: '08',
        title: 'Full Enterprise Transformation',
        duration: '48–96 wks',
        description: 'Multi-year enterprise-wide operating model redesign, establishing internal AI factories, agent fleets, and continuous delivery capabilities.',
      },
      {
        number: '09',
        title: 'Transformation Office',
        duration: 'Ongoing',
        description: 'Standing transformation PMO and engineering advisory ensuring strategic alignment, value compounding, and continuous capability enhancement.',
      },
    ],
  },
  {
    slug: 'ai-networking-cybersecurity',
    aliases: ['ai-networking', 'ai-cybersecurity-quantum-safe', 'networking', 'cybersecurity', 'quantum-safe', 'networking-cybersecurity'],
    number: 'NETWORKING & CYBER',
    label: 'AI NETWORKING & CYBERSECURITY INTELLIGENCE',
    shortTitle: 'AI Networking & Cybersecurity',
    heroStatement: 'We engineer high-performance, intelligent, and quantum-resilient networking fabrics with end-to-end cybersecurity intelligence — delivering zero packet loss, sub-minute threat containment, and purpose-engineered resilience from the WiFi access point to the orbital asset and hyperscale AI factory.',
    marketContext: 'The industry has historically treated high-performance AI networking and enterprise cybersecurity as disconnected silos. In modern AI architectures, network bottlenecks cause GPU clusters to sit idle while fragmented security defenses fail to protect model weights, agent sessions, and telemetry streams from adversarial manipulation and quantum threats.',
    problemStatement: 'AI workloads demand lossless fabrics (RoCEv2, InfiniBand) with sub-microsecond tail latency, while adversaries exploit unencrypted interconnects, prompt injection, and Harvest-Now-Decrypt-Later campaigns. Addressing networking without embedded cybersecurity creates massive vulnerabilities, while securing networks without fabric-level optimization throttles AI throughput.',
    overview: 'TRUSTGRID.AI AI unites high-performance AI networking and full-stack cybersecurity into one common nervous system. We deliver lossless fabrics, autonomous AI NOC operations, post-quantum cryptography (PQC/CBOM), 24/7 managed AI SOC intelligence, and Cognitive WiFi 7 across seven sector domains — from Enterprise and Campus to Hyperscale, Manufacturing OT, Satellite NTN, Cable Landing Stations, and Aerospace.',
    offerings: [
      {
        title: 'Lossless AI Networking Fabrics',
        description: 'RoCEv2, Quantum-2 InfiniBand, and Spectrum-X Ethernet fabrics engineered with rail-optimized and non-blocking topologies for zero packet loss and minimized tail latency.',
        subItems: ['Rail-optimized, Dragonfly+, and Fat-Tree topologies', 'NCCL/RCCL collective-communications tuning', '400G–1.6T optics & GPUDirect Storage/RDMA', 'NTN / satellite and multi-cloud interconnect integration'],
      },
      {
        title: 'Autonomous AI NOC & Telemetry',
        description: 'In-band Network Telemetry (INT), silent-drop detection (<100 ms), self-healing reroute, and predictive link degradation across multi-domain environments.',
        subItems: ['Sub-100 ms silent drop detection & automated reroute', 'Multi-domain visibility: LAN/WAN, WiFi 7, Gigabit Ethernet, hyperscale', 'AIOps self-driving operations targeting 70–80% autonomous resolution', 'Unified telemetry streaming into the AI SOC for threat hunting'],
      },
      {
        title: 'Quantum-Safe & Zero-Trust Cybersecurity',
        description: 'Automated Cryptographic Bill of Materials (CBOM), NIST PQC migration (ML-KEM / ML-DSA hybrid), and end-to-end zero-trust architecture for models and agents.',
        subItems: ['Automated CBOM discovery and algorithm vulnerability mapping', 'L1–L7 post-quantum cryptography & line-rate MACsec', 'Ephemeral SPIFFE/SPIRE agent identities and dynamic micro-segmentation', 'Confidential compute (TEEs) and model weight cryptographic signing'],
      },
      {
        title: 'Unified AI SOC & Threat Intelligence',
        description: '24/7 managed AI Security Operations Center with cross-layer correlation, sub-3-minute containment, and continuous adversarial red-teaming.',
        subItems: ['Cross-layer correlation (network telemetry + agent behavior + model runtime)', 'Sub-3-minute Mean Time to Contain (MTTC) target', 'Prompt-injection firewalls & data-poisoning defenses', 'Immutable cryptographic decision provenance and forensic audit replay'],
      },
      {
        title: 'Cognitive / AI-Native WiFi Fabric',
        description: 'WiFi 6E/7 with AI-driven radio resource management, multi-link operation (MLO), campus-gateway roaming, and dynamic segmentation at the AP edge.',
        subItems: ['AI-RRM real-time RF optimization and client steering', 'Multi-gigabit uplinks with link-layer MACsec encryption', 'Campus-gateway roaming for tens of thousands of concurrent clients', 'Private 5G / Ultra-Reliable Wireless Backhaul (URWB) integration'],
      },
      {
        title: 'Sector Mission Fabrics (Plan → Design → Implement → Operate)',
        description: 'Turnkey, purpose-engineered networking and cyber-resilience frameworks for Enterprises, Hyperscale, Campus, Manufacturing OT/IT, Satellite, Subsea, and Aerospace.',
        subItems: ['Enterprises: Zero-trust WiFi 7 + LAN/WAN/Gigabit Ethernet underlay', 'Hyperscale: Non-blocking >96% effective bandwidth GPU fabrics', 'Campus: Multi-tenant role-based segmentation & event-scale roaming', 'Manufacturing & Aerospace: URWB make-before-break (<10 ms) deterministic control'],
      },
    ],
    useCases: [
      {
        title: 'Lossless Multi-Thousand-GPU Training Fabric',
        description: 'RoCEv2/InfiniBand with zero-trust workload identity, INT telemetry delivering >96% effective bandwidth and active cyber hunting across collective communications.',
      },
      {
        title: 'Zero-Trust Campus-to-Cloud WAN & Cognitive WiFi 7',
        description: 'WiFi 6E/7 access control + Gigabit Ethernet underlay + SD-WAN, delivering 30–60% lower AI workload latency and 60–80% MTTR reduction with quantum-ready MACsec.',
      },
      {
        title: 'Converged Plant-Floor OT/IT & URWB Fabric',
        description: 'Deterministic <10 ms latency, make-before-break handoffs, least-privilege agent permissions, and vibration/sensor anomaly correlation with the AI SOC.',
      },
      {
        title: 'Global Satellite NTN & Ground-Station Mesh',
        description: 'Multi-Tbps feeder links, adaptive space-ground routing, PQC key exchange, and self-healing resilience maintaining zero-loss performance under jamming or attack.',
      },
      {
        title: 'Quantum-Ready Subsea Interconnect Fabric',
        description: 'Coherent DCI/DWDM linking hyperscale AI factories with continuous CBOM inventory, differentiated fault-vs-threat analytics, and sovereign data perimeters.',
      },
      {
        title: 'Aerospace Command-and-Control Data Fabric',
        description: 'Ultra-reliable wireless, confidential compute for avionics AI, hardware root-of-trust, and deterministic audit trails meeting the highest safety-assurance levels.',
      },
    ],
    industries: allIndustries,
    methodologyDomain: 'AI Methodology Engine (Networking & Cybersecurity)',
    methodologies: [
      { method: 'Theory of Constraints (TOC)', focus: 'Fabric & security bottlenecks' },
      { method: 'Value Stream Mapping', focus: 'Data, collective, and control flows' },
      { method: 'DMAIC', focus: 'Zero-loss quality & latency assurance' },
      { method: 'FMEA', focus: 'Failure mode & cyber threat analysis' },
      { method: 'Statistical Process Control (SPC)', focus: 'Real-time telemetry & anomaly bounds' },
      { method: 'Overall Equipment Effectiveness (OEE)', focus: 'GPU fabric & network effectiveness' },
      { method: 'Total Productive Maintenance (TPM)', focus: 'Predictive link & optical maintenance' },
      { method: 'SMED', focus: 'Automated config & policy provisioning' },
      { method: 'Lean Thinking', focus: 'Buffer bloat & packet latency waste reduction' },
      { method: 'Benchmarking', focus: 'Lossless throughput vs. AI training requirements' },
      { method: 'Kaizen', focus: 'Continuous NOC/SOC correlation optimization' },
      { method: 'Kanban', focus: 'AIOps automated remediation pipeline flow' },
    ],
    capabilities: [
      {
        category: 'Lossless AI Fabrics & Collective Tuning',
        items: ['InfiniBand Quantum-2 / NDR / XDR & RoCEv2 fabrics', 'Rail-optimized, Dragonfly+, and Fat-Tree non-blocking topologies', 'NCCL/RCCL collective communication tuning (AllReduce, AllGather)', 'GPUDirect RDMA and GPUDirect Storage optimization'],
      },
      {
        category: 'Autonomous AI NOC & Telemetry',
        items: ['In-band Network Telemetry (INT) with sub-100 ms silent drop detection', 'Predictive link degradation and autonomous traffic rerouting', 'AIOps self-driving operations targeting 70–80% autonomous resolution', 'Multi-domain visibility: LAN/WAN, WiFi 7, Gigabit Ethernet, Hyperscale, Satellite'],
      },
      {
        category: 'Post-Quantum Cryptography & CBOM',
        items: ['Automated Cryptographic Bill of Materials (CBOM) discovery & currency', 'NIST PQC migration: ML-KEM and ML-DSA hybrid implementation', 'Hardware-accelerated line-rate MACsec & coherent DCI encryption', 'Harvest-Now-Decrypt-Later exposure mitigation and cryptographic agility'],
      },
      {
        category: 'Unified AI SOC & Model Defense',
        items: ['24/7 managed AI SOC with cross-layer telemetry correlation', 'Sub-3-minute Mean Time to Contain (MTTC) target', 'Prompt injection, jailbreak firewalls & data-poisoning defenses', 'Continuous adversarial red-teaming (MITRE ATLAS) and forensic replay'],
      },
      {
        category: 'Cognitive WiFi & Edge Access Fabric',
        items: ['WiFi 6E/7 with AI-RRM real-time RF optimization & client steering', 'Campus-gateway-scale roaming for tens of thousands of concurrent clients', 'Dynamic Segmentation and continuous zero-trust attestation at AP edge', 'Private 5G / Ultra-Reliable Wireless Backhaul (URWB) for mobile robotics/AGVs'],
      },
    ],
    metrics: [
      { metric: 'Fabric utilization under AI workloads', range: '>96% effective bandwidth; zero packet loss' },
      { metric: 'Worst-case flow latency in AI fabrics', range: 'Sub-microsecond class' },
      { metric: 'Reduction in AI workload network latency', range: '30–60%' },
      { metric: 'Increase in effective GPU cluster throughput', range: '20–50%' },
      { metric: 'Reduction in mean-time-to-resolution (MTTR)', range: '60–80%' },
      { metric: 'Mean time to contain security events (MTTC)', range: 'Sub-3-minute (sub-minute target)' },
      { metric: 'Autonomous issue remediation rate (AIOps)', range: '70–80%' },
      { metric: 'Silent-drop detection time', range: '<100 ms' },
      { metric: 'Cryptographic Bill of Materials (CBOM) coverage', range: '100%' },
      { metric: 'Roaming scale across campus gateways', range: 'Thousands of roams/sec class' },
      { metric: 'URWB mobile asset handoff latency', range: '<10 ms; zero packet loss' },
      { metric: 'Compliance evidence generation (EU AI Act / NIST)', range: 'Continuous, audit-ready' },
    ],
    engagementModels: [
      {
        number: '01',
        title: 'Executive AI Networking & Cybersecurity Diagnostic',
        duration: '2–4 wks',
        description: 'Comprehensive evaluation of network readiness, RF spectrum, CBOM discovery, threat modeling, and 90-day value realization plan.',
      },
      {
        number: '02',
        title: 'Domain-Specific Value Sprint / Optimization',
        duration: '4–12 wks',
        description: 'Focused engineering of a specific domain (Hyperscale fabric + PQC, Enterprise LAN/WAN + SOC, Campus Cognitive WiFi, or Manufacturing OT/IT).',
      },
      {
        number: '03',
        title: 'Cognitive WiFi Value Sprint',
        duration: '4–8 wks',
        description: 'Rapid design and production pilot of AI-driven WiFi 7 (radio optimization, zero-trust access control, telemetry integration) for a campus or plant.',
      },
      {
        number: '04',
        title: 'Full-Stack Transformation Program',
        duration: '8–16+ wks',
        description: 'End-to-end design, deployment, and operationalization across physical optics, lossless core, autonomous NOC/SOC, and PQC migration.',
      },
      {
        number: '05',
        title: 'Managed Continuous Operations (AI NOC + AI SOC)',
        duration: 'Ongoing',
        description: '24/7 autonomous NOC and managed AI SOC operations with continuous self-healing, threat hunting, CBOM updates, and SLA-backed performance.',
      },
    ],
  },
  {
    slug: 'ai-value-engineering',
    aliases: ['value-engineering', 'finops', 'value'],
    number: 'VALUE',
    label: 'AI VALUE ENGINEERING & ACCELERATION',
    shortTitle: 'AI Value Engineering',
    heroStatement: 'We ensure every AI investment delivers quantifiable, accelerated, and sustainable enterprise value — through rigorous economics, operational excellence methodologies, and continuous value acceleration that makes the AI business case a living, breathing accountability framework.',
    marketContext: 'The global enterprise AI market will exceed $500 billion, yet the majority of enterprises cannot clearly quantify the business value of their AI investments. Budgets grow while returns remain ambiguous. Board presentations show impressive demos but struggle to demonstrate P&L impact.',
    problemStatement: 'The cost of intelligence remains too high, inference expenses balloon without unit-cost tracking, and agent deployments generate activity metrics without connecting to revenue or cost elimination. TRUSTGRID.AI brings the rigor of classical operational excellence into the AI-native era.',
    overview: 'TRUSTGRID.AI\'s AI Value Engineering practice applies advanced operational excellence methodologies (Lean, Theory of Constraints, Six Sigma DMAIC, Hoshin Kanri) combined with AI FinOps to ensure every dollar invested in AI generates measurable, compounding returns.',
    offerings: [
      {
        title: 'AI Value Discovery & Business Case Engineering',
        description: 'Developing rigorous, board-ready financial models for AI investments — TCO, ROI, NPV, sensitivity analysis, and risk-adjusted scenario modeling.',
        subItems: ['Granular Total Cost of Ownership (TCO) modeling', 'Risk-adjusted Net Present Value (NPV) and IRR analysis', 'Opportunity cost & competitive vulnerability modeling', 'Defensible CFO-grade financial cases'],
      },
      {
        title: 'AI Economics & FinOps',
        description: 'Deep specialization in unit economics of AI operations — cost-per-token, cost-per-inference, cost-per-agent-action, and GPU capacity optimization.',
        subItems: ['Cost-per-token and cost-per-inference accounting', 'Cloud vs. on-premises vs. sovereign cost comparisons', 'FinOps governance & automated cloud spend controls', 'Granular cost attribution by department and workflow'],
      },
      {
        title: 'AI Value Acceleration',
        description: 'Intensive sprint-based engagements applying Kaizen, TOC, DMAIC, and Kata to rapidly eliminate the primary bottlenecks holding back AI returns.',
        subItems: ['4–6 week focused value acceleration sprints', 'Constraint diagnosis & bottleneck elimination', 'Inference stack cost engineering (30–60% reduction)', 'Rapid value realization and executive reporting'],
      },
      {
        title: 'Value Realization Office (VRO)',
        description: 'Design and operation of a permanent organizational capability dedicated to tracking, governing, and compounding AI value across all business units.',
        subItems: ['Automated AI value dashboards and KPI frameworks', 'Continuous value attribution and post-implementation audit', 'Portfolio rebalancing and underperforming initiative rescue', 'Executive leadership and board value reporting'],
      },
      {
        title: 'Strategic AI Portfolio & Operating System',
        description: 'Designing the strategic and operational framework through which all AI initiatives are prioritized, governed, and aligned with enterprise goals.',
        subItems: ['Hoshin Kanri strategy deployment cascading', 'Balanced Scorecard and OKR alignment', 'AI portfolio optimization and capital allocation', 'Continuous capability building and compounding model'],
      },
    ],
    useCases: [
      {
        title: 'Board-Ready AI Investment Business Cases',
        description: 'Preparing defensible financial models for major AI Factory builds and agent deployments that survive rigorous CFO and audit challenge.',
      },
      {
        title: 'Cost of Intelligence Reduction (30–60% in 12 wks)',
        description: 'Rapidly optimizing existing AI infrastructure economics — eliminating compute waste and engineering cost-per-token down within 12 weeks.',
      },
      {
        title: 'Rescuing Stalled AI Initiatives',
        description: 'Diagnosing why stalled AI projects are burning budget without business impact and engineering a fast path to measurable ROI.',
      },
      {
        title: 'Permanent Value Realization Office',
        description: 'Establishing a standing governance function for ongoing value tracking, executive visibility, and portfolio optimization.',
      },
      {
        title: 'TOC Applied to AI Operations',
        description: 'Identifying and breaking the single primary constraint (compute, data, adoption, governance) limiting AI value realization.',
      },
      {
        title: 'AI-Native Enterprise Operating System',
        description: 'Designing the comprehensive operating system for an enterprise that operates with AI as a core strategic capability.',
      },
    ],
    industries: allIndustries,
    methodologyDomain: 'AI Methodology Engine (Relevant to Value)',
    methodologies: [
      { method: 'Hoshin Kanri', focus: 'Strategic AI objective deployment' },
      { method: 'Balanced Scorecard', focus: 'AI performance management' },
      { method: 'OKR', focus: '90-day AI value objectives' },
      { method: 'TOC', focus: 'AI value bottleneck identification' },
      { method: 'Throughput Accounting', focus: 'AI throughput decisions' },
      { method: 'Activity Based Costing', focus: 'True AI activity costs' },
      { method: 'Target Costing', focus: 'AI cost target engineering' },
      { method: 'Kaizen Costing', focus: 'Continuous AI cost reduction' },
      { method: 'Value Stream Costing', focus: 'AI value stream economics' },
      { method: 'Life Cycle Costing', focus: 'AI investment lifecycle' },
      { method: 'Lean Accounting', focus: 'Accounting for AI enterprise' },
      { method: 'DMAIC', focus: 'AI value improvement' },
      { method: 'Kaizen', focus: 'Continuous AI value improvement' },
      { method: 'Benchmarking', focus: 'AI value vs. best-in-class' },
      { method: 'Value Engineering', focus: 'AI value = function / cost' },
      { method: 'Lean Thinking', focus: 'AI operational waste' },
      { method: 'Kata', focus: 'Daily AI value improvement' },
      { method: 'Portfolio Optimization (BSC + OKR + Hoshin)', focus: 'AI portfolio governance & capital balance' },
    ],
    capabilities: [
      {
        category: 'Advanced Financial & Economics Modeling',
        items: ['TCO, ROI, NPV, IRR, and payback period modeling', 'Monte Carlo risk simulations and sensitivity analysis', 'Real options valuation for AI compute investments', 'Scenario modeling under volatile hardware and energy pricing'],
      },
      {
        category: 'Unit Economics & FinOps Engineering',
        items: ['Cost-per-token, cost-per-inference, cost-per-agent-action tracking', 'Granular cost allocation and internal showback/chargeback', 'Cloud commitment optimization (Reserved Instances, Savings Plans)', 'Dynamic multi-cloud cost arbitration'],
      },
      {
        category: 'AI Value Acceleration Sprints',
        items: ['Structured 4–6 week value improvement sprints', 'Rapid bottleneck diagnosis and elimination', 'Operational excellence tool deployment (TOC, DMAIC, Kaizen)', 'Executive-level before/after value validation reports'],
      },
      {
        category: 'Strategic Portfolio & Governance Systems',
        items: ['Hoshin Kanri X-matrix strategy cascading', 'Balanced Scorecard AI governance frameworks', 'Value Realization Office (VRO) operating manuals and dashboards', 'Continuous investment rebalancing and capital efficiency tools'],
      },
    ],
    metrics: [
      { metric: 'Clear payback period for AI investments', range: 'Typically 6–18 months' },
      { metric: 'ROI on optimized enterprise AI initiatives', range: '3–10x for production workloads' },
      { metric: 'Reduction in effective cost of intelligence', range: '30–60% within 90 days' },
      { metric: 'AI initiatives delivering tracked value', range: '>85% of portfolio' },
      { metric: 'Board-level visibility into AI value', range: '100% of major investments' },
      { metric: 'Continuous improvement rate in AI portfolio', range: 'Measurable quarter-over-quarter' },
    ],
    engagementModels: [
      {
        number: '01',
        title: 'AI Value Discovery Workshop',
        duration: '1–2 wks',
        description: 'Intensive collaborative workshop to identify, quantify, and prioritize AI value opportunities across the enterprise with preliminary business case modeling.',
      },
      {
        number: '02',
        title: 'AI Value Acceleration Sprint',
        duration: '8–12 wks',
        description: 'Focused engagement to rapidly improve the economics and throughput of existing AI systems — diagnosis, optimization, and documented savings.',
      },
      {
        number: '03',
        title: 'Full AI Value Engineering',
        duration: '16–32 wks',
        description: 'Comprehensive value engineering for a major AI initiative — complete TCO/ROI financial models, unit economics optimization, and tracking governance.',
      },
      {
        number: '04',
        title: 'Value Realization Office Setup',
        duration: '16–24 wks + Ongoing',
        description: 'Design, tooling, staffing, and operational launch of a permanent AI Value Realization Office tracking and compounding value across all business units.',
      },
      {
        number: '05',
        title: 'Enterprise AI Operating System',
        duration: '24–40 wks',
        description: 'Design and implementation of the strategic, financial, and operational framework governing all enterprise AI investments.',
      },
    ],
  },
]

export const getSolution = (slug: string): Solution | undefined => {
  return solutions.find(
    (solution) => solution.slug === slug || (solution.aliases && solution.aliases.includes(slug))
  )
}

export const logoUrl = '/images/trustgrid-logo.webp'
