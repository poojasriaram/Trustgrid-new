export interface IndustryDetail {
  id: string
  name: string
  slug: string
  badge: string
  tagline: string
  summary: string
  challenges: string[]
  solutionApplications: {
    solutionSlug: string
    solutionTitle: string
    useCases: string[]
  }[]
  keyMethodologies: string[]
  metricsImpact: {
    metric: string
    value: string
  }[]
}

export const industriesData: IndustryDetail[] = [
  {
    id: 'banking-finance',
    name: 'Banking & Financial Services',
    slug: 'banking-financial-services',
    badge: 'BFSI & Fintech',
    tagline: 'High-frequency algorithmic trust, low-latency agentic finance, and post-quantum banking security.',
    summary: 'From sovereign on-prem GPU trading infrastructure and autonomous loan underwriting agents to strict regulatory compliance and quantum-safe payments.',
    challenges: [
      'Strict regulatory compliance (EU AI Act, OCC, Fed SR 11-7)',
      'Sub-millisecond inference requirements for fraud and trade surveillance',
      'Harvest-now-decrypt-later risks on interbank communications and cryptographic keys',
      'High inference compute costs across massive internal copilot fleets'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-infra-engineering',
        solutionTitle: 'AI Infrastructure Engineering',
        useCases: [
          'Sovereign private AI factories with air-gapped confidential compute',
          'Inference optimization for sub-millisecond fraud scoring and risk engines',
          'Multi-cloud GPU cluster utilization engineering'
        ]
      },
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Autonomous corporate finance and reconciliation agent fleets',
          'Multi-agent regulatory reporting and stress testing agents',
          'Tier-1 algorithmic compliance and KYC/AML orchestration'
        ]
      },
      {
        solutionSlug: 'trusted-ai-enterprise-transformation',
        solutionTitle: 'Trusted AI & Enterprise Transformation',
        useCases: [
          'Mathematically provable explainability for credit decisioning',
          'SR 11-7 model risk management and automated audit trails',
          'Continuous drift and bias monitoring across production models'
        ]
      },
      {
        solutionSlug: 'ai-cybersecurity-quantum-safe-networking',
        solutionTitle: 'AI Cybersecurity & Quantum-Safe Networking',
        useCases: [
          'Post-quantum cryptographic migration for core banking rails',
          'Zero-trust cryptographic isolation for multi-agent trading systems',
          'Model weight and IP exfiltration protection'
        ]
      }
    ],
    keyMethodologies: ['FMEA', 'SPC', 'DMAIC', 'Hoshin Kanri', 'Throughput Accounting'],
    metricsImpact: [
      { metric: 'Underwriting Latency Reduction', value: '78%' },
      { metric: 'Inference Cost Optimization', value: '54%' },
      { metric: 'Audit Traceability Coverage', value: '100%' }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    badge: 'Underwriting & Claims',
    tagline: 'Autonomous claims adjudication, actuarial agent fleets, and decision explainability.',
    summary: 'Transform legacy actuarial models and claims pipelines with high-throughput agent fleets, explainable risk pricing, and secure data enclaves.',
    challenges: [
      'Disparate legacy mainframe claims processing systems',
      'Actuarial bias and regulatory fairness mandates',
      'Complex multi-modal document processing (telematics, medical records, property imagery)'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'First-notice-of-loss (FNOL) autonomous agent processing',
          'Multi-agent actuarial loss modeling and catastrophe simulations',
          'Fraud ring identification via graph agent networks'
        ]
      },
      {
        solutionSlug: 'trusted-ai-enterprise-transformation',
        solutionTitle: 'Trusted AI & Enterprise Transformation',
        useCases: [
          'Explainable automated underwriting pricing engines',
          'Algorithmic fairness verification for policyholders',
          'Automated claims decision lineage & compliance logging'
        ]
      }
    ],
    keyMethodologies: ['Value Stream Mapping', 'Poka-Yoke', 'Kanban', 'DMAIC'],
    metricsImpact: [
      { metric: 'Claims Processing Speedup', value: '4.2x' },
      { metric: 'Loss Adjustment Expense Reduction', value: '38%' },
      { metric: 'Model Transparency Verification', value: '100%' }
    ]
  },
  {
    id: 'healthcare-life-sciences',
    name: 'Healthcare & Life Sciences',
    slug: 'healthcare-life-sciences',
    badge: 'HIPAA & Clinical AI',
    tagline: 'Sovereign clinical AI clusters, molecular agent discovery, and HIPAA-compliant zero trust.',
    summary: 'Accelerate drug discovery, optimize hospital bed telemetry, and enforce clinical safety boundaries across multimodal patient intelligence systems.',
    challenges: [
      'Strict patient data privacy and HIPAA / GDPR mandates',
      'Zero tolerance for hallucinations in clinical decision support',
      'High compute costs for molecular simulation and cryogenic electron microscopy AI'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-infra-engineering',
        solutionTitle: 'AI Infrastructure Engineering',
        useCases: [
          'On-premise sovereign clinical compute clusters with confidential enclave support',
          'Distributed training for protein folding and molecular dynamics',
          'Low-power edge AI deployment for medical diagnostics equipment'
        ]
      },
      {
        solutionSlug: 'trusted-ai-enterprise-transformation',
        solutionTitle: 'Trusted AI & Enterprise Transformation',
        useCases: [
          'FDA SaMD compliance engineering and clinical validation',
          'Continuous hallucination and safety guardrail monitoring',
          'Counterfactual explainability for diagnostic support'
        ]
      }
    ],
    keyMethodologies: ['FMEA', 'DMAIC', '5 Whys', 'Jidoka', 'Life Cycle Costing'],
    metricsImpact: [
      { metric: 'Drug Candidate Triage Speed', value: '5.8x' },
      { metric: 'Clinical Hallucination Rate', value: '<0.01%' },
      { metric: 'HIPAA Enclave Security Score', value: '100%' }
    ]
  },
  {
    id: 'manufacturing-discrete',
    name: 'Manufacturing (Discrete)',
    slug: 'manufacturing-discrete',
    badge: 'Industry 4.0 & Robotics',
    tagline: 'Real-time computer vision quality control, predictive robotics maintenance, and OEE optimization.',
    summary: 'Deploy edge AI factories to the shop floor for zero-defect assembly, autonomous robotic workcells, and shop-floor yield engineering.',
    challenges: [
      'Millisecond-level inference constraints on high-speed assembly lines',
      'Shop-floor network interference and air-gapped OT environments',
      'High downtime costs from unplanned robotic cell failures'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-infra-engineering',
        solutionTitle: 'AI Infrastructure Engineering',
        useCases: [
          'Ultra-low-latency edge AI nodes for assembly line computer vision',
          'Air-gapped factory AI deployment with localized model sync',
          'High-throughput visual inspection clusters'
        ]
      },
      {
        solutionSlug: 'ai-value-engineering',
        solutionTitle: 'AI Value Engineering',
        useCases: [
          'OEE (Overall Equipment Effectiveness) continuous AI engineering',
          'Shop-floor waste reduction through Lean Thinking + AI telemetry',
          'Target costing for manufacturing intelligence'
        ]
      }
    ],
    keyMethodologies: ['OEE', 'TPM', 'SMED', '5S/6S', 'Poka-Yoke', 'Kaizen'],
    metricsImpact: [
      { metric: 'Assembly Defect Escape Rate', value: '-92%' },
      { metric: 'Unplanned Downtime Reduction', value: '45%' },
      { metric: 'OEE Uplift', value: '+14.6%' }
    ]
  },
  {
    id: 'process-manufacturing',
    name: 'Process Manufacturing',
    slug: 'process-manufacturing',
    badge: 'Chemicals & Refining',
    tagline: 'Continuous yield optimization, thermodynamic control agents, and chemical process safety.',
    summary: 'Harness continuous time-series AI models, automated chemical process adjustments, and rigorous safety barrier monitoring.',
    challenges: [
      'Non-linear thermodynamic dynamics and complex chemistry flows',
      'Severe hazardous facility safety requirements',
      'Legacy SCADA / DCS integration hurdles'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Continuous chemical yield tuning multi-agent controllers',
          'Autonomous energy-dispatch agents for industrial boilers',
          'Hazardous runaway process early warning agents'
        ]
      },
      {
        solutionSlug: 'ai-cybersecurity-quantum-safe-networking',
        solutionTitle: 'AI Cybersecurity & Quantum-Safe Networking',
        useCases: [
          'Air-gapped industrial OT zero-trust microsegmentation',
          'SCADA telemetry integrity verification',
          'Adversarial sensor spoofing detection'
        ]
      }
    ],
    keyMethodologies: ['TOC', 'SPC', 'DMAIC', 'FMEA', 'Deming 14 Points'],
    metricsImpact: [
      { metric: 'Raw Material Yield Gain', value: '+3.8%' },
      { metric: 'Energy Waste Reduction', value: '22%' },
      { metric: 'Process Variance (Cpk)', value: '>1.67' }
    ]
  },
  {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    badge: 'Smart Grid & Renewables',
    tagline: 'Autonomous grid balancing, renewable forecasting agents, and critical infrastructure defense.',
    summary: 'Power the energy transition with low-latency dispatch agents, predictive transmission maintenance, and quantum-safe grid telemetry.',
    challenges: [
      'Intermittent renewable integration and rapid load swings',
      'Vast distributed remote substations and transmission lines',
      'Target of state-sponsored cyberattacks and sabotage'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-networking',
        solutionTitle: 'AI Networking',
        useCases: [
          'Ultra-reliable low latency grid-edge telemetry networks',
          'Multi-point WAN optimization for distributed renewable farms',
          'Self-healing utility network switching'
        ]
      },
      {
        solutionSlug: 'ai-cybersecurity-quantum-safe-networking',
        solutionTitle: 'AI Cybersecurity & Quantum-Safe Networking',
        useCases: [
          'NERC-CIP compliant post-quantum cryptographic security',
          'Zero-trust remote substation access controls',
          'Stateful anomaly detection across substation SCADA flows'
        ]
      }
    ],
    keyMethodologies: ['Value Stream Mapping', 'TOC', 'Kaizen', 'Life Cycle Costing'],
    metricsImpact: [
      { metric: 'Renewable Dispatch Accuracy', value: '96.4%' },
      { metric: 'Grid Outage Prevention Time', value: '45 min advance' },
      { metric: 'Cyber Defense Posture', value: 'Quantum-Safe' }
    ]
  },
  {
    id: 'telecommunications',
    name: 'Telecommunications',
    slug: 'telecommunications',
    badge: '5G / 6G & RAN',
    tagline: 'Autonomous network slicing, AI-driven traffic steering, and self-healing telco fabrics.',
    summary: 'Transform telco operations from reactive ticketing to predictive, autonomous self-optimizing RAN and core transport fabrics.',
    challenges: [
      'Exponential surge in mobile AI and video inference bandwidth',
      'Complex multi-vendor virtualized RAN (vRAN/OpenRAN)',
      'Legacy BSS/OSS operational friction'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-networking',
        solutionTitle: 'AI Networking',
        useCases: [
          'AI-driven dynamic spectrum allocation and traffic steering',
          'Predictive optical backhaul rerouting before fiber degradation',
          'Low-jitter AI traffic orchestration across edge compute nodes'
        ]
      },
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Autonomous NOC / SRE remediation agent fleets',
          'Predictive customer churn mitigation and dynamic care agents',
          'Multi-agent spectrum bidding and network capacity planning'
        ]
      }
    ],
    keyMethodologies: ['Lean Thinking', 'Kanban', 'SMED', 'TPM', 'DMAIC'],
    metricsImpact: [
      { metric: 'NOC Mean Time to Resolve (MTTR)', value: '-65%' },
      { metric: 'Network Bandwidth Efficiency', value: '+42%' },
      { metric: 'Truck Roll Reductions', value: '31%' }
    ]
  },
  {
    id: 'retail-consumer-goods',
    name: 'Retail & Consumer Goods',
    slug: 'retail-consumer-goods',
    badge: 'Omnichannel & CPG',
    tagline: 'Hyper-personalized customer agents, autonomous inventory optimization, and dynamic pricing.',
    summary: 'Maximize margins and customer lifetime value with real-time demand-sensing agent fleets and secure edge store intelligence.',
    challenges: [
      'Rapid demand volatility and seasonal inventory overstocking',
      'High customer acquisition costs and low loyalty retention',
      'Fragmented omnichannel point-of-sale and fulfillment data'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-value-engineering',
        solutionTitle: 'AI Value Engineering',
        useCases: [
          'Activity-based costing for SKU-level AI profitability',
          'Value Stream Costing across omnichannel fulfillment',
          'Target Costing for retail personalization engines'
        ]
      },
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Autonomous merchant pricing and markdown agent fleets',
          'Conversational customer concierge agents with zero hallucination',
          'Multi-echelon supplier procurement agents'
        ]
      }
    ],
    keyMethodologies: ['Lean Thinking', 'Kata', 'Kanban', 'Balanced Scorecard', 'OKR'],
    metricsImpact: [
      { metric: 'Stockout Reduction', value: '52%' },
      { metric: 'Gross Margin Expansion', value: '+240 bps' },
      { metric: 'Cart Conversion Uplift', value: '+18.5%' }
    ]
  },
  {
    id: 'supply-chain-logistics',
    name: 'Supply Chain & Logistics',
    slug: 'supply-chain-logistics',
    badge: 'Global Freight & Fulfillment',
    tagline: 'Multi-agent freight orchestration, predictive port logistics, and warehouse robotics AI.',
    summary: 'Build resilient, self-healing supply networks that dynamically reroute shipments, optimize freight load factors, and automate customs compliance.',
    challenges: [
      'Geopolitical supply shocks and customs bottleneck delays',
      'Fragmented multi-tier supplier visibility',
      'High carbon emissions and fuel waste from suboptimal routing'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Autonomous customs filing and trade compliance agents',
          'Multi-agent dynamic freight bidding and load consolidation',
          'Predictive port congestion avoidance and routing agents'
        ]
      },
      {
        solutionSlug: 'ai-infra-engineering',
        solutionTitle: 'AI Infrastructure Engineering',
        useCases: [
          'Distributed edge compute for automated warehouse sorting robots',
          'Fleet telemetry real-time inference clusters',
          'Energy-efficient route calculation engines'
        ]
      }
    ],
    keyMethodologies: ['TOC', 'Value Stream Mapping', 'Kanban', 'DMAIC', 'Poka-Yoke'],
    metricsImpact: [
      { metric: 'On-Time In-Full (OTIF) Delivery', value: '98.8%' },
      { metric: 'Logistics Cost per Ton-Mile', value: '-28%' },
      { metric: 'Customs Clearance Latency', value: '-85%' }
    ]
  },
  {
    id: 'government-public-sector',
    name: 'Government & Public Sector',
    slug: 'government-public-sector',
    badge: 'GovTech & Civic AI',
    tagline: 'Sovereign citizen service agents, air-gapped defense enclaves, and public trust frameworks.',
    summary: 'Modernize civic operations with transparent, audited AI systems that maintain 100% data sovereignty and strict constitutional protections.',
    challenges: [
      'Mandatory on-premise air-gapped data sovereignty',
      'Zero tolerance for discriminatory bias in civic entitlement allocation',
      'Complex legacy bureaucratic record structures'
    ],
    solutionApplications: [
      {
        solutionSlug: 'trusted-ai-enterprise-transformation',
        solutionTitle: 'Trusted AI & Enterprise Transformation',
        useCases: [
          'Public sector algorithmic bias audits and fairness certification',
          'Constitutional AI policy implementation and decision provenance',
          'Fully traceable civic document processing'
        ]
      },
      {
        solutionSlug: 'ai-cybersecurity-quantum-safe-networking',
        solutionTitle: 'AI Cybersecurity & Quantum-Safe Networking',
        useCases: [
          'FIPS 140-3 & post-quantum encrypted government communications',
          'Zero-trust citizen data isolation',
          'Air-gapped model parameter protection'
        ]
      }
    ],
    keyMethodologies: ['Deming 14 Points', 'Baldrige Framework', 'A3 Problem Solving', '5 Whys'],
    metricsImpact: [
      { metric: 'Citizen Case Processing Time', value: '-72%' },
      { metric: 'Fairness Disparity Index', value: '<1.02' },
      { metric: 'Data Sovereignty Guarantee', value: '100% On-Prem' }
    ]
  },
  {
    id: 'technology-software',
    name: 'Technology & Software',
    slug: 'technology-software',
    badge: 'ISVs & SaaS',
    tagline: 'GPU inference cost reduction (30–60%), automated SRE agent fleets, and AI-native architecture.',
    summary: 'Help AI product companies and SaaS enterprises scale model throughput 10x without ballooning compute budgets.',
    challenges: [
      'Crushing cloud GPU bills destroying gross margins',
      'Model latency degradation at peak user traffic',
      'Fast-evolving agentic framework fragmentation'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-infra-engineering',
        solutionTitle: 'AI Infrastructure Engineering',
        useCases: [
          'Kernel-level vLLM / TensorRT-LLM inference optimization',
          'Heterogeneous GPU cluster orchestration (H100, B200, L40S)',
          'KV cache compression and speculative decoding'
        ]
      },
      {
        solutionSlug: 'ai-agentic-factory',
        solutionTitle: 'AI Agentic + Factory',
        useCases: [
          'Autonomous DevOps and code generation agent teams',
          'Continuous evaluation & regression benchmarking harness',
          'Multi-agent enterprise orchestrators'
        ]
      }
    ],
    keyMethodologies: ['DevOps/CI/CD', 'Lean Thinking', 'TOC', 'Agile/Scrum', 'Throughput Accounting'],
    metricsImpact: [
      { metric: 'Inference Cost Reduction', value: '30–60%' },
      { metric: 'P99 Latency Improvement', value: '3.4x' },
      { metric: 'GPU Utilization Rate', value: '88%+' }
    ]
  },
  {
    id: 'aerospace-defense',
    name: 'Aerospace & Defense',
    slug: 'aerospace-defense',
    badge: 'Mission-Critical & Edge',
    tagline: 'Air-gapped tactical AI, adversarial robustness, and quantum-resistant mission command.',
    summary: 'Deliver ruggedized, provably secure AI systems capable of autonomous mission execution in contested, GPS-denied, and electronic warfare environments.',
    challenges: [
      'Strict ITAR, DoD IL5/IL6, and NATO security compliance',
      'Operation in disconnected, intermittent, and low-bandwidth (DIL) environments',
      'Adversarial evasion and sensor spoofing attacks'
    ],
    solutionApplications: [
      {
        solutionSlug: 'ai-cybersecurity-quantum-safe-networking',
        solutionTitle: 'AI Cybersecurity & Quantum-Safe Networking',
        useCases: [
          'Post-quantum tactical mesh cryptography for unmanned systems',
          'Adversarial perturbation defense on sensor feeds',
          'Tamper-proof agent flight logs and cryptographic memory enclaves'
        ]
      },
      {
        solutionSlug: 'trusted-ai-enterprise-transformation',
        solutionTitle: 'Trusted AI & Enterprise Transformation',
        useCases: [
          'Rules-of-engagement compliant deterministic constraint enforcement',
          'Explainable target classification under sensor degradation',
          'Continuous mission safety boundary monitoring'
        ]
      }
    ],
    keyMethodologies: ['FMEA', '8D', 'Poka-Yoke', 'SPC', 'Kaizen', 'TOC'],
    metricsImpact: [
      { metric: 'Edge Compute Footprint', value: '-65%' },
      { metric: 'Adversarial Jamming Resilience', value: '99.9%' },
      { metric: 'Mission Assurance Rating', value: 'DO-178C Level A' }
    ]
  }
]
