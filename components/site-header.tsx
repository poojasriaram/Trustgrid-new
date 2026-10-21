'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Building2,
  Users,
  Award,
  MapPin,
  FileText,
  Cpu,
  Layers,
  ShieldCheck,
  Network,
  TrendingUp,
  BrainCircuit,
  Bot,
  Compass,
  BookOpen,
  CheckCircle2,
  Trophy,
  Lock,
  Workflow,
  BarChart3,
  Lightbulb,
  FileSpreadsheet,
  FolderOpen,
  Globe2,
  Phone,
  MessageCircle,
  Zap,
  Cable,
  Satellite,
  Leaf,
  Boxes,
  ShieldAlert,
  SlidersHorizontal,
  Target,
  Factory,
  Wifi,
  Radio,
  Server,
  Activity
} from 'lucide-react'
import { logoUrl, solutions } from '@/lib/solutions'
import { industriesData } from '@/lib/industries-data'
import { trackWhatsAppClick } from '@/lib/analytics'
import { AiInfraMegaMenu, MobileAiInfraAccordion } from '@/components/ui/ai-infra-mega-menu'

// 1. AI Infra Menu Items (12 Items)
const aiInfraMenuItems = [
  {
    id: 'lifecycle',
    label: '7-Stage Lifecycle',
    desc: 'Turnkey site selection, power, build, commissioning & ops',
    icon: Layers
  },
  {
    id: 'core-offerings',
    label: 'Core Infrastructure Pillars',
    desc: 'Greenfield, high density, power/cooling & DCIM ops',
    icon: Building2
  },
  {
    id: 'high-density-engineering',
    label: 'GPU Cluster & High-Density',
    desc: '30–100kW/rack, NVLink, InfiniBand & Blackwell scale',
    icon: Cpu
  },
  {
    id: 'power-cooling',
    label: 'Power & Liquid Immersion',
    desc: 'Substations, direct-to-chip, DLC & PUE < 1.10 target',
    icon: Zap
  },
  {
    id: 'ai-networking',
    label: '400G / 800G AI Networking',
    desc: 'Non-blocking RoCEv2, InfiniBand & ultra-low latency',
    icon: Network
  },
  {
    id: 'ai-dcim-ops',
    label: 'AI-DCIM & GPU Fleet Ops',
    desc: 'Autonomous telemetry, Slurm/K8s, and AIOps predictive DCIM',
    icon: Workflow
  },
  {
    id: 'cybersecurity-compliance',
    label: 'Quantum-Safe & Compliance',
    desc: 'Tier III/IV, L1–L7 PQC, ISO 27001 & sovereign governance',
    icon: ShieldCheck
  },
  {
    id: 'cable-landing',
    label: 'Subsea Cable Landing (CLS)',
    desc: 'Turnkey CLS, wet-plant, beach manholes & backhaul',
    icon: Cable
  },
  {
    id: 'satellite-landing',
    label: 'Satellite Ground Stations',
    desc: '9 Tbps landing capacity, LEO/MEO tracking & GSaaS',
    icon: Satellite
  },
  {
    id: 'energy-green-power',
    label: 'Green Energy & PPAs',
    desc: 'Renewable microgrids, BESS, solar/hydro & utility grid',
    icon: Leaf
  },
  {
    id: 'delivery-models',
    label: 'Turnkey DBOT Suite',
    desc: 'Design, Build, Operate, Transfer & EPC accountability',
    icon: Boxes
  },
  {
    id: 'lifecycle-metrics',
    label: 'Lifecycle Metrics & OpEx',
    desc: 'Lean, TOC, OEE scoring & cost-per-token economics',
    icon: BarChart3
  }
]

// 2. Agentic Enterprise Menu Items (12 Items)
const agenticEnterpriseMenuItems = [
  {
    id: 'agent-architecture',
    label: 'Autonomous Agent Architecture',
    desc: 'Cognitive loops, ReAct, Tree-of-Thought & persistent memory',
    icon: Bot
  },
  {
    id: 'multi-agent-orchestration',
    label: 'Multi-Agent Swarm Orchestration',
    desc: 'LangGraph, AutoGen, CrewAI & deterministic consensus DAGs',
    icon: Workflow
  },
  {
    id: 'vertical-factories',
    label: 'Vertical Enterprise Agent Factories',
    desc: 'Pre-built autonomous agents for Finance, Supply Chain, SRE & HR',
    icon: Layers
  },
  {
    id: 'mcp-tool-integration',
    label: 'Model Context Protocol & Tools',
    desc: 'Standardized tool interfaces, ERP/CRM & database connectors',
    icon: Cpu
  },
  {
    id: 'agentops-governance',
    label: 'Enterprise AgentOps & Telemetry',
    desc: 'Distributed trace observability, token telemetry & failure triage',
    icon: BarChart3
  },
  {
    id: 'guardrails-safety',
    label: 'Runtime Guardrails & Firewalls',
    desc: 'Anti-injection shields, semantic boundary enforcement & safety',
    icon: ShieldCheck
  },
  {
    id: 'human-agent-teaming',
    label: 'Human-in-the-Loop (HITL) Teaming',
    desc: 'Dynamic confidence gates, approval workflows & workforce ops',
    icon: Users
  },
  {
    id: 'synthetic-eval-sprints',
    label: 'Continuous Agent Evaluation',
    desc: 'Synthetic benchmarking, automated red-teaming & regression suites',
    icon: Target
  },
  {
    id: 'edge-onprem-runtimes',
    label: 'Sovereign & On-Prem Agent Runtimes',
    desc: 'Air-gapped SLMs, local inference pods & zero-data-leakage',
    icon: Building2
  },
  {
    id: 'agentic-transformation',
    label: '12–24 Wk Pilot to Factory Delivery',
    desc: 'Organizational enablement, change management & DBOT delivery',
    icon: Compass
  },
  {
    id: 'fleet-metrics-roi',
    label: 'Agent Fleet Yield & SLA Metrics',
    desc: 'Task autonomy rate, cost-per-successful-task & cycle time reduction',
    icon: TrendingUp
  },
  {
    id: 'agentic-diagnostic',
    label: 'Enterprise Agentic Diagnostic',
    desc: 'Executive technical readiness audit, opportunity prioritization & roadmap',
    icon: Sparkles
  }
]

// 3. AI Networking & Cybersecurity Intelligence (Categorized Thematic Architecture)
export interface SubmenuItem {
  id: string
  label: string
  desc: string
  tooltip?: string
  icon: any
  href: string
}

export interface ThematicGroup {
  id: string
  title: string
  badge: string
  icon: any
  items: SubmenuItem[]
}

export const networkingThematicGroups: ThematicGroup[] = [
  {
    id: 'datacenter-cloud-fabric',
    title: 'Data Center & Cloud Fabric',
    badge: 'FABRIC',
    icon: Server,
    items: [
      {
        id: 'datacenter-networking',
        label: 'Data Center Networking',
        desc: 'Ultra-low latency RoCEv2, Spectrum-X, and InfiniBand fabrics for high-throughput distributed AI cluster training.',
        icon: Server,
        href: '/solutions/ai-networking-cybersecurity#hyperscale-datacenters'
      },
      {
        id: 'storage-networking-san',
        label: 'Storage Networking (SAN)',
        tooltip: 'Storage Area Networking (SAN) & NVMe-oF Interconnects',
        desc: 'Non-blocking NVMe-oF and GPUDirect Storage interconnects eliminating I/O bottlenecks in GPU memory pipelines.',
        icon: Layers,
        href: '/solutions/ai-networking-cybersecurity#hyperscale-datacenters'
      },
      {
        id: 'cloud-networking',
        label: 'Cloud Networking',
        desc: 'Multi-cloud transit fabrics and hybrid interconnects engineered for optimized egress costs and deterministic connectivity.',
        icon: Globe2,
        href: '/solutions/ai-networking-cybersecurity#enterprises'
      },
      {
        id: 'edge-networking',
        label: 'Edge Networking',
        desc: 'Micro-edge compute clusters and rugged mesh networks delivering deterministic real-time inferencing at line speed.',
        icon: Cpu,
        href: '/solutions/ai-networking-cybersecurity#aerospace-air-tech'
      }
    ]
  },
  {
    id: 'enterprise-connected-environments',
    title: 'Enterprise & Connected Environments',
    badge: 'ENTERPRISE',
    icon: Building2,
    items: [
      {
        id: 'campus-networking',
        label: 'Campus Networking',
        desc: 'Multi-gigabit access, automated policy segmentation, and zero-loss core switching for modern enterprise campuses.',
        icon: Building2,
        href: '/solutions/ai-networking-cybersecurity#campus-environments'
      },
      {
        id: 'enterprise-networking',
        label: 'Enterprise Networking',
        desc: 'Resilient wired and wireless underlay infrastructure unified with software-defined overlay governance and QoS.',
        icon: Network,
        href: '/solutions/ai-networking-cybersecurity#enterprises'
      },
      {
        id: 'wireless-networking',
        label: 'Wireless Networking',
        desc: 'Cognitive WiFi 7 with AI-RRM spectrum tuning ensuring seamless client roaming across dense enterprise environments.',
        icon: Wifi,
        href: '/solutions/ai-networking-cybersecurity#cognitive-wifi-7'
      },
      {
        id: 'iot-networking',
        label: 'IoT Networking',
        desc: 'Scalable sensor fabric with automated device profiling and real-time telemetry ingestion for operational environments.',
        icon: Radio,
        href: '/solutions/ai-networking-cybersecurity#manufacturing-mission-critical'
      }
    ]
  },
  {
    id: 'global-carrier-specialized',
    title: 'Global, Carrier & Specialized Networks',
    badge: 'CARRIER & WAN',
    icon: Compass,
    items: [
      {
        id: 'wide-area-networking-wan',
        label: 'Wide Area Networking (WAN)',
        tooltip: 'Software-Defined Wide Area Networking (SD-WAN / WAN)',
        desc: 'AI-driven SD-WAN with intelligent path selection and sovereign encryption overlays across distributed enterprise branches.',
        icon: Compass,
        href: '/solutions/ai-networking-cybersecurity#enterprises'
      },
      {
        id: 'service-provider-networking',
        label: 'Service Provider Networking',
        desc: 'Coherent DCI/DWDM transport and cable landing architectures delivering multi-terabit capacity for carrier networks.',
        icon: Cable,
        href: '/solutions/ai-networking-cybersecurity#cable-landing-stations'
      },
      {
        id: 'space-satellite-networking-ntn',
        label: 'Space & Satellite Networking (NTN)',
        tooltip: 'Non-Terrestrial Networks (NTN) & Satellite Feeder Routing',
        desc: 'Orbital feeder links and non-terrestrial network routing enabling resilient global communication beyond terrestrial infrastructure.',
        icon: Satellite,
        href: '/solutions/ai-networking-cybersecurity#satellite-networking'
      },
      {
        id: 'industrial-networking',
        label: 'Industrial Networking',
        desc: 'Time-sensitive networking (TSN) and ultra-reliable wireless bridging mission-critical OT/IT convergence on factory floors.',
        icon: Factory,
        href: '/solutions/ai-networking-cybersecurity#manufacturing-mission-critical'
      }
    ]
  }
]

export const cybersecurityThematicGroups: ThematicGroup[] = [
  {
    id: 'threat-detection-defense',
    title: 'Threat Detection & Defense',
    badge: 'DETECTION',
    icon: ShieldCheck,
    items: [
      {
        id: 'threat-detection-prevention',
        label: 'Threat Detection & Prevention',
        desc: 'Cross-layer behavioral threat hunting and automated line-rate blocking achieving sub-3-minute incident containment.',
        icon: ShieldCheck,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'nids-nips',
        label: 'Network Intrusion Detection & Prevention (NIDS/NIPS)',
        tooltip: 'Network Intrusion Detection and Prevention Systems (NIDS/NIPS)',
        desc: 'Deep in-band packet inspection and adversarial pattern matching with automated threat vector shunting.',
        icon: Network,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'anomaly-drift-detection',
        label: 'Anomaly & Drift Detection',
        desc: 'Continuous telemetry baselining and silent drop forensics detecting early deviations in model and cluster performance.',
        icon: Activity,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'malware-analysis-sandboxing',
        label: 'Malware Analysis & Sandboxing',
        desc: 'Automated reverse-engineering and zero-day heuristic sandboxing isolating suspicious payloads in air-gapped runtimes.',
        icon: ShieldAlert,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      }
    ]
  },
  {
    id: 'identity-trust-digital-risk',
    title: 'Identity, Trust & Digital Risk',
    badge: 'IDENTITY',
    icon: Lock,
    items: [
      {
        id: 'zero-trust-identity-access-iam',
        label: 'Zero-Trust Identity & Access (IAM)',
        tooltip: 'Identity and Access Management (Zero-Trust IAM)',
        desc: 'Cryptographic SPIFFE/SPIRE ephemeral identities and post-quantum keys enforcing continuous least-privilege verification.',
        icon: Lock,
        href: '/solutions/ai-networking-cybersecurity#agent-identity-iam'
      },
      {
        id: 'user-entity-behavior-analytics-ueba',
        label: 'User & Entity Behavior Analytics (UEBA)',
        tooltip: 'User and Entity Behavior Analytics (UEBA)',
        desc: 'Continuous behavioral baselining of operators, digital workers, and microservices to detect insider threats.',
        icon: Users,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'fraud-abuse-detection',
        label: 'Fraud & Abuse Detection',
        desc: 'Real-time transaction anomaly analysis and synthetic identity defense safeguarding financial platforms and tokens.',
        icon: TrendingUp,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'phishing-social-engineering-defense',
        label: 'Phishing & Social Engineering Defense',
        desc: 'Contextual natural language threat shields neutralizing credential-harvesting attempts and executive spoofing in real time.',
        icon: Target,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      }
    ]
  },
  {
    id: 'secops-resilience',
    title: 'Security Operations & Resilience',
    badge: 'SECOPS',
    icon: Workflow,
    items: [
      {
        id: 'security-orchestration-automated-response-soar',
        label: 'Security Orchestration & Automated Response (SOAR)',
        tooltip: 'Security Orchestration, Automation, and Response (SOAR)',
        desc: 'Autonomous incident playbooks and self-healing isolation workflows accelerating enterprise mean time to remediation.',
        icon: Workflow,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'predictive-threat-intelligence',
        label: 'Predictive Threat Intelligence',
        desc: 'Proactive global adversary intelligence correlated with MITRE ATLAS matrices for continuous threat preparedness.',
        icon: Sparkles,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'vulnerability-management',
        label: 'Vulnerability Management',
        desc: 'Continuous automated Cryptographic Bill of Materials (CBOM) discovery and risk-based vulnerability remediation.',
        icon: BarChart3,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      },
      {
        id: 'endpoint-protection-response-edr',
        label: 'Endpoint Protection & Response (EDR)',
        tooltip: 'Endpoint Detection and Response (EDR)',
        desc: 'Agentic behavioral runtime shields and memory-space protection preventing unauthorized privilege escalation across endpoints.',
        icon: Cpu,
        href: '/solutions/ai-networking-cybersecurity#platform-offerings'
      }
    ]
  }
]

export const networkingCategories = networkingThematicGroups.flatMap((g) => g.items)
export const cybersecurityCategories = cybersecurityThematicGroups.flatMap((g) => g.items)

// Backwards compatibility aliases
const aiNetworkingCyberMenuItems = [...networkingCategories, ...cybersecurityCategories]
const aiNetworkingMenuItems = networkingCategories
const aiCybersecurityMenuItems = cybersecurityCategories

// 5. Unified AI Value Engineering & Common Foundation Menu Items (12 Consolidated Capabilities)
const aiValueMenuItems = [
  {
    category: 'ENGAGEMENT MODELS',
    id: 'engagement-models',
    href: '/request-proposal',
    label: 'Engagement Models & Turnkey DBOT',
    desc: 'Diagnostic sprints, co-engineering, and turnkey DBOT delivery frameworks',
    icon: Workflow
  },
  {
    category: 'METHODOLOGY ENGINE',
    id: 'methodology-engine',
    href: '/methodology-engine',
    label: 'AI-Driven Methodology Engine',
    desc: 'Proprietary framework to assess, select, automate, and compound operational methods',
    icon: Sparkles
  },
  {
    category: 'OPERATIONAL TOOLBOX',
    id: '80-methodologies',
    href: '/solutions/ai-value-engineering#methodology-engine',
    label: '80+ Operational Methodologies',
    desc: 'Lean, Six Sigma, TOC, TPS, SMED, FMEA, and TRIZ industrialized by AI agents',
    icon: Boxes
  },
  {
    category: 'FINANCIAL ARCHITECTURE',
    id: 'unit-economics',
    href: '/solutions/ai-value-engineering#ledger-economics',
    label: 'AI Economics & Unit Economics',
    desc: 'Cost-to-serve, inference unit economics & function-cost ledger decomposition',
    icon: BarChart3
  },
  {
    category: 'COST GOVERNANCE',
    id: 'finops-governance',
    href: '/solutions/ai-value-engineering#operating-system',
    label: 'AI FinOps & Cost Governance',
    desc: 'Continuous GPU token governance, infrastructure OpEx & budget attribution',
    icon: SlidersHorizontal
  },
  {
    category: 'VALUE REALIZATION',
    id: 'value-currencies',
    href: '/solutions/ai-value-engineering#value-currencies',
    label: 'ROI, TCO & Value Realization',
    desc: 'Cost Down, Cash Out, Revenue Up, Risk Down & growth option P&L proof',
    icon: TrendingUp
  },
  {
    category: 'ENTERPRISE PROOF',
    id: 'case-studies-metrics',
    href: '/case-studies',
    label: 'Case Studies & Performance Metrics',
    desc: 'Production outcomes, GPU yield gains, latency & balance-sheet impact',
    icon: FileText
  },
  {
    category: 'TECHNOLOGY STACK',
    id: 'tech-ecosystem',
    href: '/partners',
    label: 'Technology Ecosystem & Enablers',
    desc: 'Hardware accelerators, silicon platforms, orchestration & partner network',
    icon: Network
  },
  {
    category: 'SYSTEM ARCHITECTURE',
    id: 'system-architecture',
    href: '/solutions/ai-value-engineering#five-layer-architecture',
    label: 'System Architecture & Frameworks',
    desc: '5-layer agent fleet architecture from sensory ingest to compounding OS',
    icon: Layers
  },
  {
    category: 'RISK & COMPLIANCE',
    id: 'governance-risk',
    href: '/solutions/ai-value-engineering#waste-governance',
    label: 'Governance, Risk & Excellence',
    desc: 'DOWNTIME waste elimination coupled with deterministic human risk bands',
    icon: ShieldCheck
  },
  {
    category: 'DELIVERY STANDARDS',
    id: 'job-plan',
    href: '/solutions/ai-value-engineering#job-plan-stages',
    label: '70-Year AI-VE Job Plan (8 Stages)',
    desc: 'SAVE International standard re-engineered with AI: Info to Audit',
    icon: Zap
  },
  {
    category: 'STRATEGIC EVALUATION',
    id: 'diagnostic-assessment',
    href: '/book-ai-diagnostic#diagnostic-form-section',
    label: 'AI Diagnostic & Assessment',
    desc: 'Executive technical & financial evaluation of enterprise AI readiness',
    icon: ArrowUpRight
  }
]

// 6. Industries Mega Menu Data (3 Non-Negotiable Categories: 70 Industries, Methodologies, Use Cases)
const industriesMegaCategories = [
  {
    id: '70-industries',
    title: '70 Industries',
    tagline: 'Sector Directory & Vertical Blueprints',
    badge: '70 SECTORS',
    ctaText: 'View All 70 Industries Directory →',
    ctaHref: '/industries#industries-list',
    icon: Building2,
    items: [
      {
        label: '70 Industries Directory & Overview',
        desc: 'Explore all specialized enterprise verticals, regulatory profiles & architectures',
        href: '/industries#industries-list',
        icon: Building2
      },
      {
        label: 'Banking & Financial Services',
        desc: 'High-frequency trading, underwriting agent fleets, AML & quantum-safe payments',
        href: '/industries/banking-financial-services',
        icon: TrendingUp
      },
      {
        label: 'Healthcare & Life Sciences',
        desc: 'Sovereign clinical AI clusters, molecular agent discovery & HIPAA/FDA compliance',
        href: '/industries/healthcare-life-sciences',
        icon: ShieldCheck
      },
      {
        label: 'Manufacturing (Discrete & Process)',
        desc: 'Shop-floor vision QC, predictive robotics maintenance, OEE & chemical yield tuning',
        href: '/industries/manufacturing-discrete',
        icon: Cpu
      },
      {
        label: 'Aerospace, Defense & GovTech',
        desc: 'Air-gapped tactical AI, DO-178C Level A assurance & sovereign citizen workflows',
        href: '/industries/aerospace-defense',
        icon: Lock
      }
    ]
  },
  {
    id: 'methodologies',
    title: 'Methodologies',
    tagline: 'Operational Disciplines for Industry',
    badge: '80+ METHODS',
    ctaText: 'Explore Methodology Engine →',
    ctaHref: '/methodology-engine',
    icon: Sparkles,
    items: [
      {
        label: 'AI-Driven Methodology Engine',
        desc: 'Systematic approach to evaluate, select, and automate operational methods',
        href: '/methodology-engine',
        icon: Sparkles
      },
      {
        label: 'Lean Thinking & DMAIC Six Sigma',
        desc: 'Compute waste elimination, cycle time reduction & shop-floor defect mitigation',
        href: '/methodology-engine#full-spectrum-architecture',
        icon: Workflow
      },
      {
        label: 'Theory of Constraints (TOC)',
        desc: 'Bottleneck triage, throughput accounting & GPU cluster queue optimization',
        href: '/methodology-engine#diagnostic',
        icon: SlidersHorizontal
      },
      {
        label: 'FMEA & Mistake-Proofing (Poka-Yoke)',
        desc: 'Risk priority numbers, failure mode prevention & deterministic safety boundaries',
        href: '/methodology-engine#architecture',
        icon: ShieldCheck
      },
      {
        label: 'TPM & OEE Asset Optimization',
        desc: 'Machine telemetry, predictive maintenance & zero-downtime equipment yield',
        href: '/methodology-engine#deployment',
        icon: Target
      }
    ]
  },
  {
    id: 'use-cases',
    title: 'Use Cases',
    tagline: 'Enterprise Deployments & Workflows',
    badge: 'VERIFIED DEPLOYMENTS',
    ctaText: 'Browse Use Cases Compendium →',
    ctaHref: '/use-cases',
    icon: Target,
    items: [
      {
        label: 'Enterprise Use Case Compendium',
        desc: 'Practical cross-industry deployment blueprints with clear inputs, outputs & KPIs',
        href: '/use-cases',
        icon: Layers
      },
      {
        label: 'Sub-Millisecond Algorithmic Finance',
        desc: 'Real-time inference scoring for algorithmic compliance & fraud ring detection',
        href: '/use-cases#banking-finance',
        icon: TrendingUp
      },
      {
        label: 'Shop-Floor Visual Quality Control',
        desc: 'High-speed edge vision inspection achieving 92% defect escape reduction',
        href: '/use-cases#manufacturing-industry',
        icon: Cpu
      },
      {
        label: 'Autonomous Grid Outage Prevention',
        desc: '45-minute advance warning & predictive transmission line load balancing',
        href: '/use-cases#energy-utilities',
        icon: Zap
      },
      {
        label: 'Automated Claims Adjudication',
        desc: '4.2x claims processing speedup with transparent actuarial lineage & audit',
        href: '/use-cases#insurance',
        icon: CheckCircle2
      }
    ]
  }
]

// 7. About Us Menu Items (6 Items)
const aboutMenuItems = [
  {
    label: 'About TRUSTGRID.AI',
    href: '/about',
    icon: Building2,
    desc: 'Our mission, vision, and full-spectrum engineering verticals'
  },
  {
    label: 'Leadership & Teams',
    href: '/leadership',
    icon: Users,
    desc: 'World-class AI architects, systems leads, and advisory board'
  },
  {
    label: 'Careers & Fellowships',
    href: '/careers',
    icon: Award,
    desc: 'Frontier AI hackathons, research fellowships, and open roles'
  },
  {
    label: 'Global Presence',
    href: '/about#presence',
    icon: MapPin,
    desc: 'Executive offices in US, Singapore, and India R&D labs'
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    icon: FileText,
    desc: 'Production outcomes across defense, banking, and enterprise AI'
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: BookOpen,
    desc: 'Engineering insights on AI-native networking, infrastructure, distributed AI, and enterprise AI systems.'
  }
]

// 8. Consolidated Practice Areas: 5 Divisions (Left Sidebar & Right Content)
const practiceAreasFiveSections = [
  {
    id: 'engagement' as const,
    num: '1',
    title: 'Engagement Models',
    shortLabel: 'Engagement Models',
    sub: '5-Stage Proof · DBOT · Operating Model',
    badge: 'OUTCOME-BASED DELIVERY',
    headerTitle: 'Outcome-Based Engagement Models & FDE Delivery',
    tagline: 'Commercially accountable delivery models tied directly to verified business impact & capability transfer.',
    ctaText: 'Request Outcome Proposal →',
    ctaHref: '/request-proposal',
    icon: Boxes,
    items: [
      {
        category: 'OUTCOME PROOF',
        label: '5-Stage Outcome Proof Framework',
        href: '/request-proposal?model=proof-framework',
        desc: 'Deterministic progression from validation to enterprise scale, with fees tied to milestones.',
        icon: CheckCircle2
      },
      {
        category: 'OPERATING MODEL',
        label: 'Forward Deployment Engineering (FDE)',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Elite AI engineers embedded on-site in your environment to co-engineer and scale production systems.',
        icon: Layers
      },
      {
        category: 'TURNKEY LIFECYCLE',
        label: 'Turnkey DBOT Suite',
        href: '/request-proposal?model=turnkey',
        desc: 'Design, Build, Operate, and Transfer full-stack AI systems with 100% intellectual property ownership.',
        icon: Workflow
      },
      {
        category: 'DELIVERY LIFECYCLE',
        label: '5-Step Delivery Lifecycle',
        href: '/solutions/ai-value-engineering',
        desc: 'Structured 5-step operational process: Discovery, Sprint Delivery, Validation, Assurance, and Handover.',
        icon: Zap
      },
      {
        category: 'CERTIFIED STANDARDS',
        label: 'Certified Methodologies',
        href: '/methodology-engine',
        desc: 'Battle-tested frameworks combining NIST AI RMF, ISO 42001, Lean Six Sigma, and FinOps.',
        icon: ShieldCheck
      },
      {
        category: 'TALENT PROFILE',
        label: 'FDE Talent Profile & Diagnostic',
        href: '/book-ai-diagnostic#diagnostic-form-section',
        desc: 'Multidisciplinary experts combining domain operations, business finance, and hands-on AI engineering.',
        icon: ArrowUpRight
      }
    ]
  },
  {
    id: 'engineering' as const,
    num: '2',
    title: 'Engineering Practices',
    shortLabel: 'Engineering Practices',
    sub: 'DIVISION 1 · How We Build',
    badge: 'DIVISION 1 · HOW WE BUILD',
    headerTitle: 'Division 1 — Engineering Practices (How We Build)',
    tagline: 'Deterministic AI systems, high-density compute, agentic orchestration, loss-free fabrics, cyber defense & edge deployment.',
    ctaText: 'Explore Engineering Directory →',
    ctaHref: '/solutions/ai-infra-engineering',
    icon: Cpu,
    items: [
      {
        category: 'ENGINEERING · 4.1',
        label: '4.1 AI Infrastructure & High-Density Compute',
        href: '/solutions/ai-infra-engineering',
        desc: 'Turnkey high-density AI data centers, direct liquid cooling, and GPU cluster optimization.',
        icon: Cpu
      },
      {
        category: 'ENGINEERING · 4.2',
        label: '4.2 Agentic Enterprise & Orchestration',
        href: '/solutions/ai-agentic-factory',
        desc: 'Autonomous multi-agent systems with deterministic reasoning DAGs and persistent memory fabrics.',
        icon: Bot
      },
      {
        category: 'ENGINEERING · 4.3',
        label: '4.3 AI Networking & Systems Integration',
        href: '/solutions/ai-networking-cybersecurity',
        desc: 'Ultra-low latency lossless fabrics and secure API gateways bridging modern AI with ERP.',
        icon: Network
      },
      {
        category: 'ENGINEERING · 4.4',
        label: '4.4 AI Cybersecurity & Quantum-Safe Defense',
        href: '/practice-areas/ai-cybersecurity-quantum-safe-defense',
        desc: 'Frontier defense with zero-trust permissions, prompt-injection firewalls, and post-quantum crypto.',
        icon: ShieldCheck
      },
      {
        category: 'ENGINEERING · 4.5',
        label: '4.5 Edge & Air-Gapped Deployment',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Ruggedized offline architectures and site reliability engineering for mission-critical edge deployments.',
        icon: Server
      }
    ]
  },
  {
    id: 'cross-domain' as const,
    num: '3',
    title: 'Cross Domain Practices',
    shortLabel: 'Cross Domain Practices',
    sub: 'DIVISION 2 · Deliver Everywhere',
    badge: 'DIVISION 2 · WHAT WE DELIVER',
    headerTitle: 'Division 2 — Cross-Industry Practices (What We Deliver — Everywhere)',
    tagline: 'Horizontal business capabilities, operational intelligence, FinOps, and global workforce enablement deployed enterprise-wide.',
    ctaText: 'Explore Cross-Domain Blueprint →',
    ctaHref: '/practice-areas/forward-deployment-engineering',
    icon: Layers,
    items: [
      {
        category: 'CROSS-DOMAIN · 5.1',
        label: '5.1 Forward Deployment Engineering (FDE)',
        href: '/practice-areas/forward-deployment-engineering',
        desc: 'Embedded delivery pods engineering last-mile production AI with full internal client handover.',
        icon: Layers
      },
      {
        category: 'CROSS-DOMAIN · 5.2',
        label: '5.2 Supply Chain & Intelligent Operations',
        href: '/industries/supply-chain-logistics',
        desc: 'Autonomous demand sensing, supplier risk tracking, and real-time logistics route optimization.',
        icon: Boxes
      },
      {
        category: 'CROSS-DOMAIN · 5.3',
        label: '5.3 Revenue Operations (RevOps)',
        href: '/solutions/ai-value-engineering',
        desc: 'Intelligent deal scoring, dynamic margin pricing, and autonomous go-to-market agent swarms.',
        icon: TrendingUp
      },
      {
        category: 'CROSS-DOMAIN · 5.4',
        label: '5.4 Governance, Risk & Compliance (GRC)',
        href: '/practice-areas/ai-governance-risk-compliance',
        desc: 'Continuous policy automation, regulatory compliance monitoring, and immutable audit ledgers.',
        icon: ShieldCheck
      },
      {
        category: 'CROSS-DOMAIN · 5.5',
        label: '5.5 Global Workforce Acceleration',
        href: '/about#careers-hackathons',
        desc: 'Enterprise AI enablement, role-specific workplace co-pilots, and structured change management.',
        icon: Users
      },
      {
        category: 'CROSS-DOMAIN · 5.6',
        label: '5.6 Customer & Partner Experience (CXP)',
        href: '/case-studies',
        desc: 'Multi-agent customer journey orchestration, churn prediction, and automated partner portals.',
        icon: Target
      },
      {
        category: 'CROSS-DOMAIN · 5.7',
        label: '5.7 Finance & AI FinOps Command',
        href: '/solutions/ai-value-engineering#finops',
        desc: 'Real-time GPU spend telemetry, model cost attribution, and CFO-ready investment reporting.',
        icon: BarChart3
      },
      {
        category: 'CROSS-DOMAIN · 5.8',
        label: '5.8 Enterprise Data & Knowledge Fabric',
        href: '/practice-areas/data-engineering-realtime-pipelines',
        desc: 'Semantic layers, unified knowledge graphs, data readiness pipelines, and governed RAG.',
        icon: BrainCircuit
      }
    ]
  },
  {
    id: 'industry' as const,
    num: '4',
    title: 'Focused Industry Practices',
    shortLabel: 'Focused Industry Practices',
    sub: 'Vertical Domain Blueprints',
    badge: 'VERTICAL DOMAIN BLUEPRINTS',
    headerTitle: 'Focused Industry Practices (Vertical Blueprints)',
    tagline: 'Solving mission-critical physical and operational bottlenecks through a deterministic triad: FDE, Value Realization & Value Assurance.',
    ctaText: 'Explore All 70 Industries →',
    ctaHref: '/industries',
    icon: Building2,
    items: [
      {
        category: 'VERTICAL BLUEPRINT · 1',
        label: 'Ports, Airports & Global Logistics Hubs',
        href: '/industries/supply-chain-logistics',
        desc: 'Autonomous agents for gantry cranes, airside operations, and baggage tracking with TOS.',
        icon: Boxes
      },
      {
        category: 'VERTICAL BLUEPRINT · 2',
        label: 'Urban Mass Transportation & Rail Operations',
        href: '/industries/supply-chain-logistics',
        desc: 'Edge computer vision and predictive maintenance for rolling stock and trackside infrastructure.',
        icon: Workflow
      },
      {
        category: 'VERTICAL BLUEPRINT · 3',
        label: 'Energy, Utilities & Smart Infrastructure',
        href: '/industries/energy-utilities',
        desc: 'Autonomous sensor-fusion and dynamic grid balancing securely bridging operational tech and IT.',
        icon: Zap
      },
      {
        category: 'VERTICAL BLUEPRINT · 4',
        label: 'Telecom Services & MEC Infrastructure',
        href: '/industries/telecommunications',
        desc: 'Multi-access edge computing (MEC) and self-organizing networks optimizing RAN slicing and OpEx.',
        icon: Radio
      },
      {
        category: 'VERTICAL BLUEPRINT · 5',
        label: 'Electronic Manufacturing (Semiconductors, PCB, SMT)',
        href: '/industries/manufacturing-discrete',
        desc: 'Sub-10ms computer vision defect inspection and automated agent fleets on SMT assembly lines.',
        icon: Factory
      },
      {
        category: 'VERTICAL BLUEPRINT · 6',
        label: 'Food Processing & Agri-Tech Operations',
        href: '/industries',
        desc: 'Washdown-rated edge vision sorting and automated batch traceability complying with FDA and FSMA.',
        icon: Leaf
      }
    ]
  },
  {
    id: 'value-engineering' as const,
    num: '5',
    title: 'Value Engineering Framework',
    shortLabel: 'Value Engineering Framework',
    sub: 'CFO-Visible Compounding ROI',
    badge: '80+ METHODS · FINOPS',
    headerTitle: 'Value Engineering Framework & Financial Accountability',
    tagline: 'Transforming opaque AI compute spend into transparent, compounding balance sheet returns via 80+ operational methods.',
    ctaText: 'Explore Value Engineering Blueprint →',
    ctaHref: '/solutions/ai-value-engineering',
    icon: TrendingUp,
    items: [
      {
        category: 'PROVEN FRAMEWORK',
        label: '5-Stage Outcome Proof Framework',
        href: '/request-proposal?model=proof-framework',
        desc: 'Milestone-based delivery model tying engineering fees directly to verified business outcomes.',
        icon: CheckCircle2
      },
      {
        category: 'BLACK-BOX ELIMINATION',
        label: 'Value Assurance Services',
        href: '/practice-areas/value-assurance-services',
        desc: 'Eliminating black-box risk through mathematical explainability (SHAP/LIME) and regulatory audits.',
        icon: ShieldCheck
      },
      {
        category: 'FINANCIAL GOVERNANCE',
        label: 'AI FinOps Command & Spend Telemetry',
        href: '/solutions/ai-value-engineering#finops',
        desc: 'Granular GPU token tracking, departmental chargeback models, and spend mapping to EBITDA.',
        icon: BarChart3
      },
      {
        category: 'OPERATIONAL METHOD',
        label: 'Lean Thinking & DOWNTIME Elimination',
        href: '/solutions/ai-value-engineering#waste-governance',
        desc: 'Eliminating idle compute and token over-provisioning to cut AI operating costs by 40–70%.',
        icon: SlidersHorizontal
      },
      {
        category: 'BOTTLENECK TRIAGE',
        label: 'Theory of Constraints (TOC)',
        href: '/methodology-engine#diagnostic',
        desc: 'Identifying and resolving compute and memory bottlenecks using Drum-Buffer-Rope scheduling.',
        icon: TrendingUp
      },
      {
        category: 'GLOBAL STANDARD',
        label: '70-Year AI-VE Job Plan (8 Stages)',
        href: '/solutions/ai-value-engineering#job-plan-stages',
        desc: 'The SAVE International value engineering methodology modernized for AI across 8 disciplined stages.',
        icon: FileText
      }
    ]
  }
]



const methodologyCategories = [
  {
    title: 'AI Engineering',
    icon: Cpu,
    desc: 'Eliminate compute waste, maximize GPU utilization, and engineer factory throughput.',
    items: [
      'Lean Thinking',
      'TOC',
      'DMAIC',
      'OEE',
      'TPM',
      'SMED',
      'Value Stream Mapping'
    ]
  },
  {
    title: 'Agentic AI',
    icon: Bot,
    desc: 'Orchestrate multi-agent DAGs, mistake-proof tool calls, and monitor agent fleet SLA.',
    items: [
      'AgentOps',
      'Agile/Scrum',
      'DevOps/CI/CD',
      'FMEA',
      'Poka-Yoke',
      'Jidoka',
      'OKR'
    ]
  },
  {
    title: 'Trusted AI',
    icon: ShieldCheck,
    desc: 'Deterministic guardrails, mathematical explainability, and regulatory governance.',
    items: [
      'Responsible AI',
      'Explainability',
      'FMEA',
      'SPC',
      'Governance',
      'Continuous Assurance'
    ]
  },
  {
    title: 'AI Value Engineering',
    icon: TrendingUp,
    desc: 'Bridge technical compute metrics directly to CFO-approved P&L earnings.',
    items: [
      'Hoshin Kanri',
      'Balanced Scorecard',
      'OKR',
      'Throughput Accounting',
      'Value Engineering',
      'Portfolio Optimization'
    ]
  }
]

const insightsMenuItems = [
  {
    label: 'AI Insights',
    href: '/insights',
    icon: BookOpen,
    desc: 'Core perspectives on frontier AI architectures, systems, and enterprise deployment.'
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    icon: FileText,
    desc: 'Production outcomes in defense, tier-1 banking, healthcare, and industrial manufacturing.'
  },
  {
    label: 'Whitepapers',
    href: '/insights',
    icon: FileSpreadsheet,
    desc: 'Inference economics, token cost reduction blueprints, and hardware benchmarks.'
  },
  {
    label: 'Research',
    href: '/insights',
    icon: Compass,
    desc: 'Post-quantum cryptographic transitions (PQC / CBOM) and agent safety research.'
  },
  {
    label: 'Blog',
    href: '/insights',
    icon: Lightbulb,
    desc: 'Engineering dispatches, architectural reviews, and operational methodologies.'
  },
  {
    label: 'Resources & Frameworks',
    href: '/insights',
    icon: FolderOpen,
    desc: 'Frameworks, maturity assessment models, and technical reference guides.'
  },
  {
    label: 'Site Map v14.0',
    href: '/sitemap',
    icon: Layers,
    desc: 'Complete 5-level expert content model spanning 6 Groups and 18 Engineering Areas.'
  },
  {
    label: 'Crowd Safety Predictor',
    href: 'https://crowd-safety-predictor.vercel.app/',
    icon: Trophy,
    isExternal: true,
    desc: 'Live open innovation hackathon project: multi-camera computer vision & telemetry.'
  }
]

const solutionGroups = [
  {
    groupTag: 'AGENTIC ENTERPRISE',
    name: 'AGENTIC ENTERPRISE',
    title: 'AGENTIC ENTERPRISE',
    slug: 'ai-agentic-factory',
    sitemapAnchor: 'group-1',
    desc: 'Autonomous Agent Design, Multi-Agent Orchestration, Vertical Agent Fleets & Governed AgentOps',
    icon: Bot,
  },
  {
    groupTag: 'AI INFRASTRUCTURE',
    name: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    title: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
    slug: 'ai-infra-engineering',
    sitemapAnchor: 'group-2',
    desc: 'Strategic Site Due Diligence, High-Density Facilities (30–100kW), GPU Acceleration & Cluster Fabric',
    icon: Cpu,
  },
  {
    groupTag: 'AI NETWORKING & CYBERSECURITY',
    name: 'AI NETWORKING & CYBERSECURITY INTELLIGENCE',
    title: 'AI NETWORKING & CYBERSECURITY INTELLIGENCE',
    slug: 'ai-networking-cybersecurity',
    sitemapAnchor: 'group-3',
    desc: 'Lossless Fabrics (RoCEv2/InfiniBand), L1–L7 Post-Quantum Cryptography (PQC/CBOM), Autonomous AI NOC/SOC, Cognitive WiFi 7 & 7 Sector Portfolios',
    icon: Network,
  },
  {
    groupTag: 'TRUSTED AI',
    name: 'TRUSTED AI ENGINEERING',
    title: 'TRUSTED AI ENGINEERING',
    slug: 'trusted-ai-transformation',
    sitemapAnchor: 'group-5',
    desc: 'Mathematical Explainability (SHAP/LIME), Formal Robustness, Responsible AI & Continuous SPC',
    icon: ShieldCheck,
  },
  {
    groupTag: 'VALUE ENGINEERING',
    name: 'AI VALUE ENGINEERING & ACCELERATION',
    title: 'AI VALUE ENGINEERING & ACCELERATION',
    slug: 'ai-value-engineering',
    sitemapAnchor: 'group-6',
    desc: 'Value Discovery, FinOps Unit Economics, Acceleration Sprints & Enterprise Operating System',
    icon: TrendingUp,
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [mobileDomainNetOpen, setMobileDomainNetOpen] = useState(true)
  const [mobileDomainCyberOpen, setMobileDomainCyberOpen] = useState(true)
  const [desktopActiveDomain, setDesktopActiveDomain] = useState<'networking' | 'cybersecurity'>('networking')
  const [desktopPracticeTab, setDesktopPracticeTab] = useState<'engagement' | 'engineering' | 'cross-domain' | 'industry' | 'value-engineering'>('engagement')
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({
    'datacenter-cloud-fabric': true,
    'threat-detection-defense': true
  })
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMobileGroup = (groupId: string) => {
    setMobileOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 180)
  }

  const closeAll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(null)
    setOpen(false)
    setDesktopPracticeTab('engagement')
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll()
    if (!href || !href.includes('#')) return

    const [targetPath, hash] = href.split('#')
    if (!hash) return

    const currentPath = (typeof window !== 'undefined' ? window.location.pathname : '').replace(/\/$/, '') || '/'
    const normTarget = (targetPath || '').replace(/\/$/, '') || '/'

    // If already on the target page, intercept and scroll smoothly with header offset
    if (currentPath === normTarget) {
      e.preventDefault()
      window.history.pushState(null, '', href)
      const el = document.getElementById(hash)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  // Cross-page and initial load hash scroll handler
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === 'undefined') return
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(hash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top, behavior: 'smooth' })
        } else if (attempts < 15) {
          attempts++
          setTimeout(tryScroll, 80)
        }
      }

      setTimeout(tryScroll, 60)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [pathname])

  const toggleMenu = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  const toggleMobileSection = (sec: string) => {
    setMobileSection(mobileSection === sec ? null : sec)
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
    >
      <Link className="brand" href="/" aria-label="TRUSTGRID.AI home" onClick={closeAll}>
        <img src={logoUrl} alt="TRUSTGRID.AI" width="90" height="75" fetchPriority="high" />
      </Link>

      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {/* 1. HOME */}
        <Link href="/" className="nav-link" onClick={closeAll}>
          Home
        </Link>

        {/* 2. AI INFRA & DATA CENTER */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('ai-infra')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'ai-infra' ? 'active' : ''}`}
            onClick={() => toggleMenu('ai-infra')}
            aria-expanded={activeMenu === 'ai-infra'}
          >
            <span>AI Infra & Data Center</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'ai-infra' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'ai-infra' && (
            <AiInfraMegaMenu onNavigate={handleNavClick} onClose={closeAll} />
          )}
        </div>

        {/* 3. AGENTIC ENTERPRISE */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('agentic')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'agentic' ? 'active' : ''}`}
            onClick={() => toggleMenu('agentic')}
            aria-expanded={activeMenu === 'agentic'}
          >
            <span>Agentic Enterprise</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'agentic' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'agentic' && (
            <div className="isi-mega-panel isi-mega-agentic">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      AUTONOMOUS AGENTIC FACTORY
                    </span>
                    <h3 className="isi-sidebar-title">Agentic Enterprise</h3>
                    <p className="isi-sidebar-desc">
                      Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs and persistent memory.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>&gt;95% Task Accuracy with SLA</span>
                    </div>
                    <Link
                      href="/solutions/ai-agentic-factory"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Blueprint</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {agenticEnterpriseMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = `/solutions/ai-agentic-factory#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Governed AgentOps, continuous evaluation & multi-agent swarms</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-agentic-factory#diagnostic-form-section"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. AI NETWORKING & CYBERSECURITY INTELLIGENCE (UNIFIED) */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('networking-cybersecurity')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'networking-cybersecurity' ? 'active' : ''}`}
            onClick={() => toggleMenu('networking-cybersecurity')}
            aria-expanded={activeMenu === 'networking-cybersecurity'}
          >
            <span>AI Networking & Cyber</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'networking-cybersecurity' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'networking-cybersecurity' && (
            <div
              className="isi-mega-panel isi-mega-networking tg-minimized-mega"
              role="region"
              aria-label="AI Networking & Cybersecurity Mega Menu"
            >
              <div className="isi-mega-layout">
                {/* Left Category Introduction & Interactive Domain Switcher */}
                <div className="isi-mega-sidebar tg-menu-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      FULL-STACK FABRIC
                    </span>
                    <h3 className="isi-sidebar-title">AI Networking & Cyber</h3>
                    <p className="isi-sidebar-desc">
                      Converged high-speed AI networking fabric and autonomous AI cybersecurity.
                    </p>

                    {/* Domain Navigation Tabs */}
                    <div className="tg-sidebar-domain-switch" role="tablist" aria-label="Architecture Domains">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={desktopActiveDomain === 'networking'}
                        className={`tg-domain-tab-btn ${desktopActiveDomain === 'networking' ? 'active-networking' : ''}`}
                        onClick={() => setDesktopActiveDomain('networking')}
                        onMouseEnter={() => setDesktopActiveDomain('networking')}
                      >
                        <div className="tg-domain-tab-left">
                          <div className="tg-tab-icon-box tg-icon-net">
                            <Network size={14} />
                          </div>
                          <div className="tg-tab-text">
                            <span className="tg-tab-title">AI Networking</span>
                            <span className="tg-tab-sub">High-Performance Fabric</span>
                          </div>
                        </div>
                        <ChevronRight size={13} className="tg-tab-chevron" />
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={desktopActiveDomain === 'cybersecurity'}
                        className={`tg-domain-tab-btn ${desktopActiveDomain === 'cybersecurity' ? 'active-cyber' : ''}`}
                        onClick={() => setDesktopActiveDomain('cybersecurity')}
                        onMouseEnter={() => setDesktopActiveDomain('cybersecurity')}
                      >
                        <div className="tg-domain-tab-left">
                          <div className="tg-tab-icon-box tg-icon-cyber">
                            <ShieldCheck size={14} />
                          </div>
                          <div className="tg-tab-text">
                            <span className="tg-tab-title">AI Cybersecurity</span>
                            <span className="tg-tab-sub">Autonomous Zero-Trust</span>
                          </div>
                        </div>
                        <ChevronRight size={13} className="tg-tab-chevron" />
                      </button>
                    </div>
                  </div>

                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>Zero Loss · Sub-3m MTTC</span>
                    </div>
                    <Link
                      href="/solutions/ai-networking-cybersecurity"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Master Solutions</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured 3-Group Content Area */}
                <div className="tg-minimized-content-area">
                  {/* Domain Sub-header with quick toggle pills */}
                  <div className="tg-content-header-bar">
                    <div className="tg-content-header-info">
                      <div className="flex items-center gap-2">
                        {desktopActiveDomain === 'networking' ? (
                          <>
                            <Network size={15} className="text-blue-600" />
                            <span className="tg-active-domain-heading">AI Networking Architecture</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={15} className="text-indigo-600" />
                            <span className="tg-active-domain-heading">AI Cybersecurity Architecture</span>
                          </>
                        )}
                      </div>
                      <span className="tg-active-domain-tagline">
                        {desktopActiveDomain === 'networking'
                          ? 'Ultra-low latency RoCEv2, WiFi 7, DWDM & space NTN fabric'
                          : 'Zero-trust IAM, continuous UEBA, SOAR & EDR runtime defense'}
                      </span>
                    </div>

                    <div className="tg-domain-pills-row">
                      <button
                        type="button"
                        className={`tg-quick-pill ${desktopActiveDomain === 'networking' ? 'active-pill' : ''}`}
                        onClick={() => setDesktopActiveDomain('networking')}
                      >
                        <Network size={12} />
                        <span>Networking</span>
                      </button>
                      <button
                        type="button"
                        className={`tg-quick-pill ${desktopActiveDomain === 'cybersecurity' ? 'active-pill-cyber' : ''}`}
                        onClick={() => setDesktopActiveDomain('cybersecurity')}
                      >
                        <ShieldCheck size={12} />
                        <span>Cybersecurity</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Columns matching Group A, Group B, Group C */}
                  <div className="tg-thematic-columns-3">
                    {(desktopActiveDomain === 'networking' ? networkingThematicGroups : cybersecurityThematicGroups).map((group) => {
                      const GroupIcon = group.icon
                      const isCyber = desktopActiveDomain === 'cybersecurity'
                      return (
                        <div key={group.id} className="tg-category-col">
                          <div className="tg-category-col-header">
                            <div className="tg-category-col-left">
                              <GroupIcon size={13} className={isCyber ? 'text-indigo-600' : 'text-blue-600'} />
                              <span className="tg-category-col-title">{group.title}</span>
                            </div>
                            <span className="tg-category-col-badge">{group.badge}</span>
                          </div>

                          <div className="tg-category-items-stack">
                            {group.items.map((item) => {
                              const ItemIcon = item.icon
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className="tg-compact-menu-card"
                                  title={item.tooltip || `${item.label} — ${item.desc}`}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                >
                                  <div className={`tg-compact-icon-box ${isCyber ? 'tg-box-cyber' : ''}`}>
                                    <ItemIcon size={13} />
                                  </div>
                                  <div className="tg-compact-card-body">
                                    <div className="tg-compact-card-head">
                                      <span className="tg-compact-card-title">{item.label}</span>
                                      <ArrowRight size={11} className="tg-compact-arrow" />
                                    </div>
                                    <p className="tg-compact-card-desc">{item.desc}</p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>One common nervous system: unified NOC/SOC intelligence from WiFi 7 to hyperscale</span>
                </div>
                <Link
                  href="/book-ai-diagnostic?solution=ai-networking-cybersecurity#diagnostic-form-section"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Book AI Diagnostic Assessment</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 4. AI VALUE ENGINEERING (UNIFIED WITH COMMON FOUNDATION) */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('value')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'value' ? 'active' : ''}`}
            onClick={() => toggleMenu('value')}
            aria-expanded={activeMenu === 'value'}
          >
            <span>AI Value Engineering</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'value' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'value' && (
            <div className="isi-mega-panel isi-mega-value">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      ENTERPRISE VALUE & OPERATIONAL EXCELLENCE
                    </span>
                    <h3 className="isi-sidebar-title">AI Value Engineering</h3>
                    <p className="isi-sidebar-desc">
                      Connect enterprise AI strategy, proven operational methodologies, implementation frameworks, and financial accountability to measurable business outcomes.
                    </p>
                    <div style={{ marginTop: '8px', padding: '8px 10px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                      <p style={{ margin: 0, fontSize: '11px', color: '#475569', lineHeight: 1.45 }}>
                        From methodology selection to implementation and value realization, establish a disciplined approach to enterprise AI performance.
                      </p>
                    </div>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>3–10x Verifiable ROI • 80+ Methods</span>
                    </div>
                    <Link
                      href="/book-ai-diagnostic#diagnostic-form-section"
                      className="isi-sidebar-action"
                      style={{ background: '#2563eb', color: '#ffffff' }}
                      onClick={closeAll}
                    >
                      <span>Book AI Value Diagnostic</span>
                      <ArrowUpRight size={13} />
                    </Link>
                    <Link
                      href="/methodology-engine"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Methodology Engine</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (3 columns, 12 items) */}
                <div className="isi-mega-content columns-3">
                  {aiValueMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const itemHref = item.href || `/solutions/ai-value-engineering#${item.id}`
                    return (
                      <Link
                        key={idx}
                        href={itemHref}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                            {item.category}
                          </span>
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>From operational methodology to measurable enterprise AI value.</span>
                </div>
                <Link
                  href="/solutions/ai-value-engineering"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Explore Value Engineering Blueprint</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* PRACTICE AREAS (5 DIVISIONS: ENGAGEMENT MODELS, ENGINEERING, CROSS-DOMAIN, INDUSTRY, VALUE ENGINEERING) */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('practice-areas')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'practice-areas' ? 'active' : ''}`}
            onClick={() => toggleMenu('practice-areas')}
            aria-expanded={activeMenu === 'practice-areas'}
          >
            <span>Practice Areas</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'practice-areas' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'practice-areas' && (
            <div className="isi-mega-panel isi-mega-practice-areas">
              <div className="isi-mega-layout">
                {/* Left Side Bar: 5 Practice Divisions */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      PRACTICE ARCHITECTURE
                    </span>
                    <h3 className="isi-sidebar-title">Practice Areas</h3>
                    <p className="isi-sidebar-desc">
                      5 enterprise divisions: from silicon engineering to cross-industry capabilities &amp; outcome models.
                    </p>

                    {/* Left Sidebar 5 Divisions Switch */}
                    <div className="tg-sidebar-domain-switch" role="tablist" aria-label="Practice Areas Divisions" style={{ marginTop: '10px' }}>
                      {practiceAreasFiveSections.map((sec) => {
                        const SecIcon = sec.icon
                        const isActive = desktopPracticeTab === sec.id
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`tg-domain-tab-btn ${isActive ? 'active-networking' : ''}`}
                            onClick={() => setDesktopPracticeTab(sec.id)}
                            onMouseEnter={() => setDesktopPracticeTab(sec.id)}
                          >
                            <div className="tg-domain-tab-left">
                              <div
                                className={`tg-tab-icon-box ${isActive ? 'tg-icon-net' : ''}`}
                                style={!isActive ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                              >
                                <SecIcon size={14} />
                              </div>
                              <div className="tg-tab-text">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                  <span style={{ fontSize: '10px', fontWeight: 800, color: isActive ? '#2563eb' : '#94a3b8' }}>{sec.num}.</span>
                                  <span className="tg-tab-title" style={{ fontSize: '12px' }}>{sec.title}</span>
                                </div>
                                <span className="tg-tab-sub" style={{ fontSize: '10px' }}>{sec.sub}</span>
                              </div>
                            </div>
                            <ChevronRight size={13} className="tg-tab-chevron" />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Sparkles size={12} className="text-blue-600" />
                      <span>5 Divisions • 30+ Disciplines</span>
                    </div>
                    <Link
                      href="/practice-areas"
                      className="isi-sidebar-action"
                      style={{ background: '#2563eb', color: '#ffffff' }}
                      onClick={closeAll}
                    >
                      <span>Explore Practice Directory</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Content Area */}
                {(() => {
                  const activeSection = practiceAreasFiveSections.find((s) => s.id === desktopPracticeTab) || practiceAreasFiveSections[0]
                  const ActiveIcon = activeSection.icon
                  return (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                      {/* Active Division Header Bar */}
                      <div
                        style={{
                          padding: '7px 14px',
                          borderBottom: '1px solid #f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          background: '#fafafa'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: 'rgba(37, 99, 235, 0.1)',
                              color: '#2563eb',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <ActiveIcon size={13} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                {activeSection.headerTitle}
                              </h4>
                              <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#2563eb', background: 'rgba(37, 99, 235, 0.08)', padding: '1px 6px', borderRadius: '4px' }}>
                                {activeSection.badge}
                              </span>
                            </div>
                            <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#64748b', lineHeight: 1.3 }}>
                              {activeSection.tagline}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={activeSection.ctaHref}
                          className="isi-footer-action"
                          style={{ fontSize: '11px', padding: '4px 10px', flexShrink: 0 }}
                          onClick={closeAll}
                        >
                          <span>{activeSection.ctaText}</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>

                      {/* Structured Grid Cards */}
                      <div
                        className={`isi-mega-content ${activeSection.items.length > 5 ? 'columns-3' : 'columns-2'}`}
                        style={{ padding: '8px 12px 10px', overflowY: 'auto' }}
                      >
                        {activeSection.items.map((item, idx) => {
                          const ItemIcon = item.icon
                          return (
                            <Link
                              key={idx}
                              href={item.href}
                              className="isi-menu-card"
                              onClick={(e) => handleNavClick(e, item.href)}
                            >
                              <div className="isi-card-icon">
                                <ItemIcon size={16} />
                              </div>
                              <div className="isi-card-body">
                                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                                  {item.category}
                                </span>
                                <div className="isi-card-heading">
                                  <span className="isi-card-title">{item.label}</span>
                                  <ArrowRight size={13} className="isi-card-arrow" />
                                </div>
                                <p className="isi-card-desc">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Enterprise AI systems: engineering practices, cross-domain capabilities &amp; outcome delivery</span>
                </div>
                <Link
                  href="/practice-areas"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Explore All Practice Areas</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>


        {/* 8. ABOUT US */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter('about')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-menu-trigger ${activeMenu === 'about' ? 'active' : ''}`}
            onClick={() => toggleMenu('about')}
            aria-expanded={activeMenu === 'about'}
          >
            <span>About Us</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'about' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'about' && (
            <div className="isi-mega-panel isi-mega-about">
              <div className="isi-mega-layout">
                {/* Left Category Introduction */}
                <div className="isi-mega-sidebar">
                  <div className="isi-sidebar-top">
                    <span className="isi-sidebar-badge">
                      <span className="pulse-dot" />
                      COMPANY & TALENT
                    </span>
                    <h3 className="isi-sidebar-title">About TRUSTGRID.AI</h3>
                    <p className="isi-sidebar-desc">
                      Full-Spectrum AI Engineering Company for the Global AI Economy with executive offices in US, Singapore & India.
                    </p>
                  </div>
                  <div className="isi-sidebar-bottom">
                    <div className="isi-sidebar-metric-chip">
                      <Building2 size={12} className="text-blue-600" />
                      <span>Global R&D & Delivery Labs</span>
                    </div>
                    <Link
                      href="/about"
                      className="isi-sidebar-action"
                      onClick={closeAll}
                    >
                      <span>Explore Company Profile</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Right Structured Grid (2 columns, 6 items) */}
                <div className="isi-mega-content columns-2">
                  {aboutMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className="isi-menu-card"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <div className="isi-card-icon">
                          <Icon size={16} />
                        </div>
                        <div className="isi-card-body">
                          <div className="isi-card-heading">
                            <span className="isi-card-title">{item.label}</span>
                            <ArrowRight size={13} className="isi-card-arrow" />
                          </div>
                          <p className="isi-card-desc">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Users size={13} className="text-blue-600" />
                  <span>World-class AI architects, systems leads, and advisory board</span>
                </div>
                <Link
                  href="/contact"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Contact Leadership</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* WHATSAPP ADVISORY CTA (Icon Only) */}
        <a
          href="https://wa.me/919513088612?text=Hi%20TrustGrid%20team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20AI%20requirement."
          target="_blank"
          rel="noopener noreferrer"
          className="nav-whatsapp-cta"
          aria-label="Chat with AI Advisory on WhatsApp"
          title="Chat with AI Advisory on WhatsApp"
          onClick={() => {
            closeAll()
            if (typeof window !== 'undefined') {
              trackWhatsAppClick('navbar_cta', 'header', 'Navbar WhatsApp Advisory')
            }
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="currentColor"
            className="whatsapp-icon"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.19-.48-.31z" />
          </svg>
        </a>



        {/* 9. CONTACT US — Primary CTA */}
        <Link
          href="/contact"
          className="nav-cta"
          onClick={closeAll}
        >
          <span>Contact Us</span>
          <ArrowUpRight size={14} />
        </Link>
      </nav>

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            <Link href="/" className="mobile-nav-link" onClick={closeAll}>
              Home
            </Link>


            {/* Mobile AI Infra & Data Center Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('ai-infra')}
              >
                <span>AI Infra & Data Center</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'ai-infra' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'ai-infra' && (
                <div className="mobile-accordion-body">
                  <MobileAiInfraAccordion onNavigate={handleNavClick} onClose={closeAll} />
                </div>
              )}
            </div>

            {/* Mobile Agentic Enterprise Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('agentic')}
              >
                <span>Agentic Enterprise</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'agentic' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'agentic' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-agentic-factory" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>Agentic Enterprise Blueprint Overview →</span>
                  </Link>
                  {agenticEnterpriseMenuItems.map((item, i) => {
                    const itemHref = `/solutions/ai-agentic-factory#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile AI Networking & Cybersecurity Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('networking-cybersecurity')}
              >
                <span>AI Networking & Cyber</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'networking-cybersecurity' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'networking-cybersecurity' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-networking-cybersecurity" className="mobile-sublink font-semibold text-blue-600 mb-1" onClick={closeAll}>
                    <span>★ Master Portfolio: AI Networking & Cyber Intelligence →</span>
                  </Link>

                  {/* Expandable Section 1: AI Networking */}
                  <div className="mobile-domain-section">
                    <button
                      type="button"
                      className="mobile-domain-accordion-btn"
                      onClick={() => setMobileDomainNetOpen(!mobileDomainNetOpen)}
                      aria-expanded={mobileDomainNetOpen}
                    >
                      <div className="flex items-center gap-2">
                        <Network size={14} className="text-blue-600" />
                        <span>AI Networking</span>
                      </div>
                      <ChevronDown size={14} className={`chevron-icon transition-transform ${mobileDomainNetOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileDomainNetOpen && (
                      <div className="mobile-domain-content">
                        {networkingThematicGroups.map((group) => {
                          const GroupIcon = group.icon
                          const isOpen = !!mobileOpenGroups[group.id]
                          return (
                            <div key={group.id} className="mobile-group-wrapper">
                              <button
                                type="button"
                                className="mobile-group-accordion-btn"
                                onClick={() => toggleMobileGroup(group.id)}
                                aria-expanded={isOpen}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <GroupIcon size={12} className="text-blue-600 shrink-0" />
                                  <span className="truncate">{group.title}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="mobile-group-count">4</span>
                                  <ChevronDown size={12} className={`chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                              </button>

                              {isOpen && (
                                <div className="mobile-group-body">
                                  {group.items.map((item) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={item.id}
                                        href={item.href}
                                        className="mobile-cap-card"
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="mobile-cap-icon">
                                          <ItemIcon size={12} />
                                        </div>
                                        <div className="mobile-cap-info">
                                          <span className="mobile-cap-title">{item.label}</span>
                                          <span className="mobile-cap-desc">{item.desc}</span>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Expandable Section 2: AI Cybersecurity */}
                  <div className="mobile-domain-section mt-2">
                    <button
                      type="button"
                      className="mobile-domain-accordion-btn"
                      onClick={() => setMobileDomainCyberOpen(!mobileDomainCyberOpen)}
                      aria-expanded={mobileDomainCyberOpen}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-indigo-600" />
                        <span>AI Cybersecurity</span>
                      </div>
                      <ChevronDown size={14} className={`chevron-icon transition-transform ${mobileDomainCyberOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileDomainCyberOpen && (
                      <div className="mobile-domain-content">
                        {cybersecurityThematicGroups.map((group) => {
                          const GroupIcon = group.icon
                          const isOpen = !!mobileOpenGroups[group.id]
                          return (
                            <div key={group.id} className="mobile-group-wrapper">
                              <button
                                type="button"
                                className="mobile-group-accordion-btn"
                                onClick={() => toggleMobileGroup(group.id)}
                                aria-expanded={isOpen}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <GroupIcon size={12} className="text-indigo-600 shrink-0" />
                                  <span className="truncate">{group.title}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="mobile-group-count">4</span>
                                  <ChevronDown size={12} className={`chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                              </button>

                              {isOpen && (
                                <div className="mobile-group-body">
                                  {group.items.map((item) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={item.id}
                                        href={item.href}
                                        className="mobile-cap-card"
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="mobile-cap-icon mobile-cap-icon-cyber">
                                          <ItemIcon size={12} />
                                        </div>
                                        <div className="mobile-cap-info">
                                          <span className="mobile-cap-title">{item.label}</span>
                                          <span className="mobile-cap-desc">{item.desc}</span>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile AI Value Engineering Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('value')}
              >
                <span>AI Value Engineering</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'value' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'value' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-value-engineering" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>AI Value Engineering Blueprint Overview →</span>
                  </Link>
                  {aiValueMenuItems.map((item, i) => {
                    const itemHref = item.href || `/solutions/ai-value-engineering#${item.id}`
                    return (
                      <Link
                        key={i}
                        href={itemHref}
                        className="mobile-sublink"
                        onClick={(e) => handleNavClick(e, itemHref)}
                      >
                        <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block mb-0.5">{item.category}</span>
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Practice Areas Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('practice-areas')}
              >
                <span>Practice Areas</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'practice-areas' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'practice-areas' && (
                <div className="mobile-accordion-body">
                  <Link href="/practice-areas" className="mobile-sublink font-semibold text-blue-600 mb-1" onClick={closeAll}>
                    <span>★ View All Practice Areas Overview →</span>
                  </Link>
                  {practiceAreasFiveSections.map((sec) => (
                    <div key={sec.id} style={{ marginTop: '8px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d5cff', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 8px', background: 'rgba(29, 92, 255, 0.06)', borderRadius: '4px', margin: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{sec.num}. {sec.title}</span>
                        <span style={{ fontSize: '9px', fontWeight: 600, color: '#64748b' }}>{sec.badge}</span>
                      </div>
                      {sec.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="mobile-sublink"
                          onClick={(e) => handleNavClick(e, item.href)}
                        >
                          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block mb-0.5">{item.category}</span>
                          <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.label}</span>
                          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '2px', lineHeight: 1.35 }}>{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('about')}
              >
                <span>About Us</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'about' && (
                <div className="mobile-accordion-body">
                  <Link href="/about" className="mobile-sublink font-semibold" onClick={closeAll}>
                    <span>About TRUSTGRID.AI Overview →</span>
                  </Link>
                  {aboutMenuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-sublink"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-cta-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://wa.me/919513088612?text=Hi%20TrustGrid%20team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20AI%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost button-full"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderColor: 'rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                  background: 'rgba(37, 211, 102, 0.08)'
                }}
                onClick={() => {
                  closeAll()
                  if (typeof window !== 'undefined') {
                    trackWhatsAppClick('mobile_drawer_cta', 'mobile_header', 'Mobile Drawer WhatsApp')
                  }
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.19-.48-.31z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="button button-primary button-full"
                onClick={closeAll}
              >
                <span>Contact Us</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
