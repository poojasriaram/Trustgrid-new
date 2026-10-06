export interface InsightArticle {
  id: string
  title: string
  category: 'Case Study' | 'Whitepaper' | 'Research' | 'Blog' | 'Open Innovation'
  readTime: string
  date: string
  abstract: string
  highlights: string[]
  externalUrl?: string
  internalLink?: string
  slug: string
  subtitle?: string
  tags?: string[]
  ctaLabel?: string
  industryTag?: string
}

export const insightsArticles: InsightArticle[] = [
  {
    id: 'case-study-medical-supplies-ai',
    title: 'GLOBAL CASE STUDY: Medical Supplies & Manufacturing',
    subtitle: 'End-to-End AI Automation in Medical Supplies Packaging, Regulatory Labeling, Supply Chain Inspection & Warranty Management',
    category: 'Case Study',
    industryTag: 'Medical Supplies & Manufacturing',
    readTime: 'Enterprise Case Study',
    date: 'March 2026',
    abstract: 'How TRUSTGRID.AI combines Generative AI, RAG, Edge Computer Vision, dynamic regulatory labeling, and agentic warranty automation to transform global compliance, quality verification, supply chain inspection, and claim adjudication.',
    highlights: [
      '3-Day T&C lead time across 40+ global jurisdictions (vs 3-4 weeks)',
      'Dynamic packaging labeling with verified FDA, ANVISA, CDSCO license numbers',
      'Edge Computer Vision multi-node seal & OCR inspection with 74% energy savings',
      '85% touchless warranty claims auto-approved in under 2 minutes (STP)'
    ],
    tags: [
      'Generative AI',
      'Computer Vision',
      'Regulatory AI',
      'Supply Chain',
      'Warranty Automation'
    ],
    internalLink: '/case-studies/medical-supplies-ai',
    ctaLabel: 'View Case Study →',
    slug: 'medical-supplies-ai'
  },
  {
    id: 'crowd-safety-hackathon',
    title: 'Crowd Safety Predictor: Real-Time Computer Vision & Thermal Telemetry at Scale',
    category: 'Open Innovation',
    readTime: 'Live Application',
    date: 'March 2026',
    abstract: 'Our flagship open hackathon project predicting stampedes, crowd density surges, and thermal safety hazards via distributed multi-camera edge streams.',
    highlights: [
      'Sub-50ms inference on live 4K video feeds',
      'Spatial density & directional telemetry clustering',
      'Early warning notifications for event dispatch'
    ],
    externalUrl: 'https://crowd-safety-predictor.vercel.app/',
    slug: 'crowd-safety-predictor'
  },
  {
    id: 'inference-economics-whitepaper',
    title: 'The Inference Economics Blueprint: Slashing Enterprise Token Costs by 30–60%',
    category: 'Whitepaper',
    readTime: '12 min read',
    date: 'February 2026',
    abstract: 'An architectural breakdown of kernel-level optimizations, speculative decoding, dynamic batching, and KV cache quantization for enterprise agent fleets.',
    highlights: [
      'vLLM vs. TensorRT-LLM vs. SGLang deep benchmarks',
      'Mathematical model for KV cache memory footprint',
      'Continuous FinOps automated autoscaling rules'
    ],
    slug: 'inference-economics-blueprint'
  },
  {
    id: 'case-study-defense-mesh',
    title: 'DO-178C Compliant Autonomous Drone Swarm Mesh with Zero-Trust Cryptography',
    category: 'Case Study',
    readTime: '8 min read',
    date: 'January 2026',
    abstract: 'Deploying air-gapped tactical agent fleets with post-quantum lattice encryption across contested electronic warfare environments for a global defense contractor.',
    highlights: [
      'Zero model exfiltration during electronic jamming',
      '99.9% deterministic obstacle clearance under sensor failure',
      'Full compliance with NATO STANAG requirements'
    ],
    slug: 'defense-drone-swarm-mesh'
  },
  {
    id: 'post-quantum-cryptography-research',
    title: 'Harvest Now, Decrypt Later: The Urgent Transition to NIST FIPS 203/204 in AI Fabrics',
    category: 'Research',
    readTime: '15 min read',
    date: 'January 2026',
    abstract: 'Why enterprise agentic memory stores and inter-GPU cluster interconnects are prime targets for adversary data interception, and how to implement ML-KEM/ML-DSA.',
    highlights: [
      'Cryptographic Bill of Materials (CBOM) scanning methodology',
      'Benchmarking RoCEv2 latency under quantum-safe encapsulation',
      'Hybrid classical-quantum transition roadmaps'
    ],
    slug: 'post-quantum-cryptography-ai-fabrics'
  },
  {
    id: 'agentic-vsm-methodology',
    title: 'Applying Value Stream Mapping to 1,000-Agent Fleets: Eliminating Latency Bottlenecks',
    category: 'Blog',
    readTime: '10 min read',
    date: 'December 2025',
    abstract: 'How industrial engineering methodologies like Toyota VSM, SMED, and Theory of Constraints translate into multi-agent DAG orchestration and prompt routing.',
    highlights: [
      'Mapping agent token handoffs as physical inventory',
      'Identifying synchronous bottleneck agents',
      'Achieving 4.5x faster end-to-end task completion'
    ],
    slug: 'agentic-value-stream-mapping'
  },
  {
    id: 'case-study-tier1-bank-reconciliation',
    title: 'Autonomous Financial Reconciliation: 12-Agent Fleet Slashing Month-End Close from 14 Days to 4 Hours',
    category: 'Case Study',
    readTime: '7 min read',
    date: 'November 2025',
    abstract: 'How a Global Systemically Important Bank (G-SIB) replaced manual ledger reconciliation with an auditable, Poka-Yoke mistake-proofed multi-agent system.',
    highlights: [
      '100% mathematical auditability with SR 11-7 compliance',
      'Zero human intervention for 99.4% of reconciliation entries',
      '$18.2M annualized operational expense savings'
    ],
    slug: 'tier1-bank-autonomous-reconciliation'
  },
  {
    id: 'ai-native-networking-architecture',
    title: 'AI-Native Networking: Why Traditional Spine-Leaf Fabrics Collapse Under Multi-Tenant GPU Training',
    category: 'Blog',
    readTime: '11 min read',
    date: 'March 2026',
    abstract: 'An architectural deep dive into why enterprise Ethernet and legacy spine-leaf fabrics fail under distributed GPU collective communications (AllReduce/AlltoAll), and how non-blocking Spectrum-X and InfiniBand fabrics eliminate packet drops and microsecond jitter.',
    highlights: [
      '400G / 800G Spectrum-X RoCEv2 vs. Quantum-2 InfiniBand benchmarks',
      'Preventing Incast buffer overflow with hardware-level PFC & ECN tuning',
      'Autonomous AI NOC telemetry for automated link degradation self-healing'
    ],
    slug: 'ai-native-networking-architecture',
    internalLink: '/solutions/ai-networking'
  },
  {
    id: 'ai-infrastructure-networking-convergence',
    title: 'AI Infrastructure + Networking: Co-Engineering Subsea CLS, 100MW Substations, and Non-Terrestrial Satellites',
    category: 'Blog',
    readTime: '14 min read',
    date: 'March 2026',
    abstract: 'How the physical convergence of dedicated multi-gigawatt power grids, turnkey cable landing stations (CLS), and 9 Tbps satellite ground stations creates a resilient backbone for next-generation sovereign AI data center campuses.',
    highlights: [
      'Co-locating AI Factories with subsea CLS backhauls for <5ms transcontinental latency',
      '9 Tbps Non-Terrestrial Network (NTN) orbital sync for distributed training checkpoints',
      'Full-stack DBOT delivery model from raw land acquisition to GPU cluster turn-up'
    ],
    slug: 'ai-infrastructure-networking-convergence',
    internalLink: '/solutions/ai-infra-engineering'
  },
  {
    id: 'ai-native-enterprise-networking',
    title: 'AI-Native Enterprise Networking: Zero-Loss RoCEv2 Fabrics for Distributed Agentic Swarms',
    category: 'Blog',
    readTime: '9 min read',
    date: 'March 2026',
    abstract: 'Engineering blueprints for interconnecting thousands of autonomous enterprise agents across on-premise inference pods and sovereign cloud environments with zero packet drop and deterministic execution SLAs.',
    highlights: [
      'Eliminating tail latency in distributed LangGraph and CrewAI multi-agent DAGs',
      'Post-Quantum Cryptographic (PQC) encapsulation over high-throughput enterprise RoCEv2',
      'Hardware-enforced Model Context Protocol (MCP) data plane isolation'
    ],
    slug: 'ai-native-enterprise-networking',
    internalLink: '/solutions/ai-networking'
  },
  {
    id: 'case-study-gpu-performance-engineering',
    title: 'GPU Performance Engineering: 12× H100 Cluster Inference & Training Optimization',
    subtitle: 'Kernel-Level CUDA Tuning, NCCL Ring Communication & TensorRT-LLM Serving Acceleration',
    category: 'Case Study',
    industryTag: 'Enterprise AI Infrastructure',
    readTime: '6 min read',
    date: 'February 2026',
    abstract: 'How TrustGrid engineered kernel optimizations, FP8/INT4 precision quantization, and non-blocking RoCEv2 fabrics to achieve 12× throughput on a 128+ H100 GPU cluster while eliminating communication deadlocks.',
    highlights: [
      '12× inference throughput scaling across 128+ NVIDIA H100 GPUs',
      '40–75% reduction in compute and power costs per million tokens',
      'Zero packet drop and deterministic NCCL collective communications'
    ],
    tags: [
      'GPU Infrastructure',
      'CUDA',
      'TensorRT-LLM',
      'NCCL',
      'RoCEv2'
    ],
    internalLink: '/solutions/ai-infra-engineering',
    ctaLabel: 'View Architecture →',
    slug: 'gpu-performance-engineering-h100'
  },
  {
    id: 'case-study-autonomous-operations',
    title: 'Autonomous Enterprise Operations: 70–90% End-to-End Workflow Automation',
    subtitle: 'Multi-Agent Orchestration, Long-Memory AI, and Graph-Based State Machines',
    category: 'Case Study',
    industryTag: 'Autonomous Operations',
    readTime: '8 min read',
    date: 'January 2026',
    abstract: 'Deploying hierarchical multi-agent swarms with persistent episodic memory and Model Context Protocol (MCP) tooling to automate complex multi-departmental workflows with human-in-the-loop oversight.',
    highlights: [
      '70–90% automation across multi-step enterprise workflows',
      'Persistent memory retrieval via hybrid vector + knowledge graph search',
      'Automated Poka-Yoke mistake-proofing with deterministic audit logs'
    ],
    tags: [
      'Agentic Enterprise',
      'Multi-Agent Systems',
      'Long-Memory AI',
      'RAG',
      'Knowledge Graphs'
    ],
    internalLink: '/solutions/ai-agentic-factory',
    ctaLabel: 'View Architecture →',
    slug: 'autonomous-enterprise-operations'
  },
  {
    id: 'case-study-enterprise-ai-deployment',
    title: 'Enterprise AI Deployment: 10× Velocity Acceleration Across Regulated Environments',
    subtitle: 'Deterministic Methodology Stage Gates, Full-Spectrum Architecture & Sovereign CI/CD',
    category: 'Case Study',
    industryTag: 'Government & Regulated AI',
    readTime: '7 min read',
    date: 'March 2026',
    abstract: 'Accelerating mission-critical AI delivery from exploratory proof-of-concept to air-gapped production deployment in under 90 days with mathematical verification and zero regulatory drift.',
    highlights: [
      '10× faster AI deployment lifecycle from diagnostic to production',
      'Full-spectrum architecture unifying infrastructure, agents, and governance',
      'Continuous compliance against EU AI Act, Fed SR 11-7, and NIST AI RMF'
    ],
    tags: [
      'Enterprise AI',
      'Methodology Engine',
      'Trusted AI',
      'Governance',
      'FinOps'
    ],
    internalLink: '/methodology-engine',
    ctaLabel: 'View Architecture →',
    slug: 'enterprise-ai-deployment-velocity'
  }
]

