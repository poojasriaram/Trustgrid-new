export interface InsightArticle {
  id: string
  title: string
  category: 'Case Study' | 'Whitepaper' | 'Research' | 'Blog' | 'Open Innovation'
  readTime: string
  date: string
  abstract: string
  highlights: string[]
  externalUrl?: string
  slug: string
}

export const insightsArticles: InsightArticle[] = [
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
  }
]
