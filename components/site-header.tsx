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
  Activity,
  Scale,
  Clock,
  AlertCircle
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

export interface SubmenuItem {
  id?: string
  label: string
  desc: string
  tooltip?: string
  category?: string
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

// 2. Agentic Enterprise Thematic Groups (3 Equal-Width Columns, 12 Items Total)
export const agenticEnterpriseThematicGroups: ThematicGroup[] = [
  {
    id: 'cognitive-architecture-swarms',
    title: 'Cognitive Architecture & Swarms',
    badge: 'ORCHESTRATION',
    icon: Bot,
    items: [
      {
        id: 'agent-architecture',
        label: 'Autonomous Agent Architecture',
        desc: 'Cognitive loops, ReAct, Tree-of-Thought & persistent memory',
        icon: Bot,
        href: '/solutions/ai-agentic-factory#agent-architecture'
      },
      {
        id: 'multi-agent-orchestration',
        label: 'Multi-Agent Swarm Orchestration',
        desc: 'LangGraph, AutoGen, CrewAI & deterministic consensus DAGs',
        icon: Workflow,
        href: '/solutions/ai-agentic-factory#multi-agent-orchestration'
      },
      {
        id: 'vertical-factories',
        label: 'Vertical Enterprise Agent Factories',
        desc: 'Pre-built autonomous agents for Finance, Supply Chain, SRE & HR',
        icon: Layers,
        href: '/solutions/ai-agentic-factory#vertical-factories'
      },
      {
        id: 'mcp-tool-integration',
        label: 'Model Context Protocol & Tools',
        desc: 'Standardized tool interfaces, ERP/CRM & database connectors',
        icon: Cpu,
        href: '/solutions/ai-agentic-factory#mcp-tool-integration'
      }
    ]
  },
  {
    id: 'agentops-safety-governance',
    title: 'AgentOps, Safety & Teaming',
    badge: 'GOVERNANCE',
    icon: ShieldCheck,
    items: [
      {
        id: 'agentops-governance',
        label: 'Enterprise AgentOps & Telemetry',
        desc: 'Distributed trace observability, token telemetry & failure triage',
        icon: BarChart3,
        href: '/solutions/ai-agentic-factory#agentops-governance'
      },
      {
        id: 'guardrails-safety',
        label: 'Runtime Guardrails & Firewalls',
        desc: 'Anti-injection shields, semantic boundary enforcement & safety',
        icon: ShieldCheck,
        href: '/solutions/ai-agentic-factory#guardrails-safety'
      },
      {
        id: 'human-agent-teaming',
        label: 'Human-in-the-Loop (HITL) Teaming',
        desc: 'Dynamic confidence gates, approval workflows & workforce ops',
        icon: Users,
        href: '/solutions/ai-agentic-factory#human-agent-teaming'
      },
      {
        id: 'synthetic-eval-sprints',
        label: 'Continuous Agent Evaluation',
        desc: 'Synthetic benchmarking, automated red-teaming & regression suites',
        icon: Target,
        href: '/solutions/ai-agentic-factory#synthetic-eval-sprints'
      }
    ]
  },
  {
    id: 'sovereign-yield-delivery',
    title: 'Deployment, Yield & Readiness',
    badge: 'PRODUCTION',
    icon: TrendingUp,
    items: [
      {
        id: 'edge-onprem-runtimes',
        label: 'Sovereign & On-Prem Agent Runtimes',
        desc: 'Air-gapped SLMs, local inference pods & zero-data-leakage',
        icon: Building2,
        href: '/solutions/ai-agentic-factory#edge-onprem-runtimes'
      },
      {
        id: 'agentic-transformation',
        label: '12–24 Wk Pilot to Factory Delivery',
        desc: 'Organizational enablement, change management & DBOT delivery',
        icon: Compass,
        href: '/solutions/ai-agentic-factory#agentic-transformation'
      },
      {
        id: 'fleet-metrics-roi',
        label: 'Agent Fleet Yield & SLA Metrics',
        desc: 'Task autonomy rate, cost-per-successful-task & cycle time reduction',
        icon: TrendingUp,
        href: '/solutions/ai-agentic-factory#fleet-metrics-roi'
      },
      {
        id: 'agentic-diagnostic',
        label: 'Enterprise Agentic Diagnostic',
        desc: 'Executive technical readiness audit, opportunity prioritization & roadmap',
        icon: Sparkles,
        href: '/solutions/ai-agentic-factory#agentic-diagnostic'
      }
    ]
  }
]

// Backward-compatible flat array
export const agenticEnterpriseMenuItems = agenticEnterpriseThematicGroups.flatMap((g) => g.items)

// 3. AI Networking & Cybersecurity Intelligence (Categorized Thematic Architecture)

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

// 5. Unified AI Value Engineering & Common Foundation Menu Items (3 Equal-Width Columns, 13 Items Total)
export const aiValueThematicGroups: ThematicGroup[] = [
  {
    id: 'delivery-frameworks',
    title: 'Delivery Frameworks & Methods',
    badge: 'FRAMEWORKS',
    icon: TrendingUp,
    items: [
      {
        category: 'DELIVERY PRACTICE',
        id: 'ai-value-engineering-practice',
        href: '/practice-areas/ai-value-engineering',
        label: 'AI Value Engineering Practice',
        desc: '5 stages, 4 engineers, 5 proofs, one number Finance signs across 7 tech families',
        icon: TrendingUp
      },
      {
        category: 'ENGAGEMENT MODELS',
        id: 'engagement-models',
        href: '/practice-areas#engagement-models',
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
      }
    ]
  },
  {
    id: 'financial-architecture',
    title: 'Financial Architecture & FinOps',
    badge: 'FINANCIAL ARCH',
    icon: BarChart3,
    items: [
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
        category: 'SYSTEM ARCHITECTURE',
        id: 'system-architecture',
        href: '/solutions/ai-value-engineering#five-layer-architecture',
        label: 'System Architecture & Frameworks',
        desc: '5-layer agent fleet architecture from sensory ingest to compounding OS',
        icon: Layers
      }
    ]
  },
  {
    id: 'enterprise-proof-standards',
    title: 'Enterprise Proof & Standards',
    badge: 'ASSURANCE',
    icon: ShieldCheck,
    items: [
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
  }
]

// Backward-compatible flat array
export const aiValueMenuItems = aiValueThematicGroups.flatMap((g) => g.items)

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

// 7. About Us Thematic Groups (3 Equal-Width Columns, 6 Items Total)
export const aboutThematicGroups: ThematicGroup[] = [
  {
    id: 'company-leadership',
    title: 'Company & Leadership',
    badge: 'LEADERSHIP',
    icon: Building2,
    items: [
      {
        id: 'about-company',
        label: 'About TRUSTGRID.AI',
        href: '/about',
        icon: Building2,
        desc: 'Our mission, vision, and full-spectrum engineering verticals'
      },
      {
        id: 'leadership-teams',
        label: 'Leadership & Teams',
        href: '/leadership',
        icon: Users,
        desc: 'World-class AI architects, systems leads, and advisory board'
      }
    ]
  },
  {
    id: 'talent-presence',
    title: 'Talent & Global Network',
    badge: 'GLOBAL',
    icon: MapPin,
    items: [
      {
        id: 'careers-fellowships',
        label: 'Careers & Fellowships',
        href: '/careers',
        icon: Award,
        desc: 'Frontier AI hackathons, research fellowships, and open roles'
      },
      {
        id: 'global-presence',
        label: 'Global Presence',
        href: '/about#presence',
        icon: MapPin,
        desc: 'Executive offices in US, Singapore, and India R&D labs'
      }
    ]
  },
  {
    id: 'proof-perspectives',
    title: 'Proof & Thought Leadership',
    badge: 'PUBLICATIONS',
    icon: FileText,
    items: [
      {
        id: 'case-studies-about',
        label: 'Case Studies',
        href: '/case-studies',
        icon: FileText,
        desc: 'Production outcomes across defense, banking, and enterprise AI'
      },
      {
        id: 'blog-about',
        label: 'Blog',
        href: '/blog',
        icon: BookOpen,
        desc: 'Engineering insights on AI-native networking, infrastructure, distributed AI, and enterprise AI systems.'
      }
    ]
  }
]

// Backward-compatible flat array
export const aboutMenuItems = aboutThematicGroups.flatMap((g) => g.items)

// 8. Consolidated Practice Areas: 5 Core Menus (Left Sidebar & Right Categorized Submenus)
const practiceAreasFiveSections = [
  {
    id: 'engineering' as const,
    num: '1',
    title: 'Engineering Practices',
    shortLabel: 'Engineering Practices',
    sub: 'Silicon · Fabrics · Agent Swarms · Sovereign',
    badge: 'CORE SYSTEMS ENGINEERING',
    headerTitle: 'Core Systems Engineering & AI Computing Practices',
    tagline: 'Deterministic systems engineering across silicon, data center hardware, fabrics, and multi-agent systems.',
    ctaText: 'Explore Engineering Directory →',
    ctaHref: '/practice-areas#primary-categories',
    icon: Cpu,
    categories: [
      {
        title: 'Silicon & Data Center',
        badge: 'L1-L3 COMPUTE',
        icon: Cpu,
        items: [
          {
            category: 'HARDWARE ACCELERATION',
            label: 'AI Data Center & Compute Factory',
            href: '/practice-areas/ai-infrastructure-high-density-compute',
            desc: 'GPU clusters, ASIC accelerators, high-density power distribution, and liquid cooling architectures.',
            icon: Cpu
          },
          {
            category: 'LOSSLESS FABRIC',
            label: 'Lossless AI Networking & Fabrics',
            href: '/practice-areas/ai-native-networking-systems-integration',
            desc: 'Ultra-low latency RoCEv2, InfiniBand, adaptive routing, and telemetry for zero-drop AI workloads.',
            icon: Activity
          },
          {
            category: 'POWER & THERMAL',
            label: 'High-Density Power & Facilities',
            href: '/practice-areas/ai-infrastructure-high-density-compute',
            desc: 'Megawatt-scale power distribution, thermal envelope modeling, and liquid immersion cooling systems.',
            icon: Zap
          }
        ]
      },
      {
        title: 'Agent Swarms & Mesh',
        badge: 'ORCHESTRATION',
        icon: Network,
        items: [
          {
            category: 'AGENT FLEETS',
            label: 'Distributed Agent Swarms & Mesh',
            href: '/practice-areas/agentic-ai-multi-agent-orchestration',
            desc: 'Production-grade multi-agent swarms, deterministic execution, and distributed semantic memory.',
            icon: Network
          },
          {
            category: 'WORKFLOW ENGINE',
            label: 'Agentic Workflow Orchestration',
            href: '/practice-areas/agentic-ai-multi-agent-orchestration',
            desc: 'Deterministic multi-agent DAGs, tool-calling validation, and self-correcting feedback loops.',
            icon: Workflow
          },
          {
            category: 'RUNTIME & SERVING',
            label: 'Model Lifecycle & Inference Serving',
            href: '/solutions/ai-infra-engineering',
            desc: 'Continuous quantization, speculative decoding, and high-throughput vLLM cluster serving.',
            icon: Layers
          }
        ]
      },
      {
        title: 'Sovereign & Cyber Defense',
        badge: 'MISSION-CRITICAL',
        icon: ShieldCheck,
        items: [
          {
            category: 'SOVEREIGN AI',
            label: 'Edge AI, Sovereign & Air-Gapped',
            href: '/practice-areas/ai-cybersecurity-quantum-safe-defense',
            desc: 'Air-gapped, zero-trust edge compute with on-device quantization and local compliance enforcement.',
            icon: Server
          },
          {
            category: 'CYBER DEFENSE',
            label: 'AI-Native Cybersecurity & Defense Mesh',
            href: '/practice-areas/security-engineering-governance',
            desc: 'Self-healing cyber mesh, autonomous threat neutralization, and post-quantum cryptographic resilience.',
            icon: ShieldCheck
          },
          {
            category: 'SYSTEMS INTEGRATION',
            label: 'Full-Stack Systems Co-Engineering',
            href: '/solutions/ai-infra-engineering',
            desc: 'End-to-end integration uniting silicon primitives, model runtimes, and distributed enterprise workflows.',
            icon: Bot
          }
        ]
      }
    ]
  },
  {
    id: 'functional' as const,
    num: '2',
    title: 'Functional Practices',
    shortLabel: 'Functional Practices',
    sub: 'GRC · RevOps · Supply Chain · Finance',
    badge: '15 HORIZONTAL DISCIPLINES',
    headerTitle: 'Cross-Industry Capabilities & Functional Transformation',
    tagline: '15 horizontal disciplines industrializing enterprise operations with compounding agent workflows.',
    ctaText: 'View All 15 Disciplines →',
    ctaHref: '/practice-areas#primary-categories',
    icon: Workflow,
    categories: [
      {
        title: 'Risk, GRC & Legal',
        badge: 'BOARD DEFENSE',
        icon: ShieldAlert,
        items: [
          {
            category: 'GOVERNANCE & RISK',
            label: 'Enterprise AI Governance & GRC',
            href: '/practice-areas/ai-governance-risk-compliance',
            desc: 'EU AI Act compliance, algorithmic auditability, bias monitoring, and safety guardrail frameworks.',
            icon: ShieldAlert
          },
          {
            category: 'LEGAL & CONTRACTS',
            label: 'Legal & Regulatory Compliance',
            href: '/practice-areas/regulatory-change-monitoring',
            desc: 'Automated contract redlining, regulatory change tracking, and corporate governance automation.',
            icon: FileText
          },
          {
            category: 'SUSTAINABILITY & ESG',
            label: 'ESG & Sustainability Intelligence',
            href: '/practice-areas/carbon-accounting-mrv-agents',
            desc: 'Automated Scope 1-3 carbon accounting, audit trail generation, and ESG disclosure intelligence.',
            icon: Leaf
          }
        ]
      },
      {
        title: 'Revenue & Customer Ops',
        badge: 'COMMERCIAL GROWTH',
        icon: Users,
        items: [
          {
            category: 'CUSTOMER OPERATIONS',
            label: 'Customer Operations & Service Excellence',
            href: '/practice-areas/workforce-co-pilots',
            desc: 'Omnichannel autonomous support swarms, contact center orchestration, and sentiment triage.',
            icon: Users
          },
          {
            category: 'REVENUE OPERATIONS',
            label: 'Revenue Operations & Growth AI',
            href: '/practice-areas/pipeline-intelligence-deal-scoring',
            desc: 'Predictive pipeline progression, churn mitigation swarms, and pricing elasticity models.',
            icon: TrendingUp
          },
          {
            category: 'SALES ACCELERATION',
            label: 'Sales Engineering & Deal Intelligence',
            href: '/practice-areas/sales-productivity-deal-acceleration',
            desc: 'Autonomous RFP parsing, dynamic proposal generation, and competitive battlecard synthesis.',
            icon: Target
          }
        ]
      },
      {
        title: 'Supply Chain & Finance',
        badge: 'OPERATIONS & LEDGER',
        icon: BarChart3,
        items: [
          {
            category: 'SUPPLY & SOURCING',
            label: 'Supply Chain & Logistics Intelligence',
            href: '/practice-areas/supplier-risk-resilience-intelligence',
            desc: 'Predictive inventory allocation, supplier risk intelligence, and automated freight optimization.',
            icon: Workflow
          },
          {
            category: 'FINANCE & TREASURY',
            label: 'Finance, Accounting & Treasury Automation',
            href: '/practice-areas/spend-telemetry-chargeback',
            desc: 'Continuous close, automated reconciliation, algorithmic cash flow forecasting, and anomaly detection.',
            icon: BarChart3
          },
          {
            category: 'SEMANTIC KNOWLEDGE',
            label: 'Enterprise Knowledge & Semantic Fabric',
            href: '/practice-areas/enterprise-llm-rag-context-engineering',
            desc: 'Enterprise semantic layer, knowledge graphs, and hybrid retrieval-augmented generation.',
            icon: Layers
          }
        ]
      }
    ]
  },
  {
    id: 'industry' as const,
    num: '3',
    title: 'Industry Practices',
    shortLabel: 'Industry Practices',
    sub: 'BFSI · Healthcare · Manufacturing · Retail · Energy',
    badge: '8 SPECIALIZED VERTICALS',
    headerTitle: 'Industry Vertical Practices & Domain-Tailored AI',
    tagline: '8 specialized industry practices delivering deterministic, compliant solutions tailored to market realities.',
    ctaText: 'View All 8 Verticals →',
    ctaHref: '/practice-areas#primary-categories',
    icon: Building2,
    categories: [
      {
        title: 'Financial & Public Sector',
        badge: 'HIGH REGULATION',
        icon: Building2,
        items: [
          {
            category: 'FINANCIAL SERVICES',
            label: 'Banking, Financial Services & Insurance (BFSI)',
            href: '/industries/banking-financial-services',
            desc: 'Algorithmic underwriting, real-time AML fraud graph defense, and Basel IV capital compliance.',
            icon: Building2
          },
          {
            category: 'CAPITAL MARKETS',
            label: 'Capital Markets & Asset Management',
            href: '/industries/banking-financial-services',
            desc: 'Algorithmic execution, quantitative risk modeling, and automated SEC regulatory filings.',
            icon: BarChart3
          },
          {
            category: 'CIVIC & DEFENSE',
            label: 'Public Sector, Defense & Civic AI',
            href: '/industries/government-public-sector',
            desc: 'FedRAMP High architectures, mission-critical workflow defense, and citizen service automation.',
            icon: ShieldCheck
          }
        ]
      },
      {
        title: 'Life Sciences & Energy',
        badge: 'CRITICAL INFRA',
        icon: Activity,
        items: [
          {
            category: 'HEALTH SYSTEMS',
            label: 'Healthcare & Health Systems',
            href: '/industries/healthcare-life-sciences',
            desc: 'HIPAA-compliant clinical documentation, bedside triage, and diagnostic assistant workflows.',
            icon: Activity
          },
          {
            category: 'PHARMA & BIOTECH',
            label: 'Life Sciences & Drug Discovery',
            href: '/industries/healthcare-life-sciences',
            desc: 'Target identification, molecular simulation, and automated clinical trial protocol design.',
            icon: Compass
          },
          {
            category: 'ENERGY & UTILITIES',
            label: 'Energy, Utilities & Smart Infrastructure',
            href: '/industries/energy-utilities',
            desc: 'Smart grid load balancing, renewables yield forecasting, and predictive transformer maintenance.',
            icon: Leaf
          }
        ]
      },
      {
        title: 'Industrial, Retail & Telecom',
        badge: 'COMMERCE & MFG',
        icon: Factory,
        items: [
          {
            category: 'MANUFACTURING',
            label: 'Manufacturing & Industrial AI',
            href: '/industries/manufacturing-discrete',
            desc: 'Predictive maintenance, digital twins, computer vision defect inspection, and shopfloor OEE.',
            icon: Factory
          },
          {
            category: 'COMMERCE & CPG',
            label: 'Retail, E-Commerce & Consumer Goods',
            href: '/industries/retail-consumer-goods',
            desc: 'Dynamic localized pricing engines, visual shelf merchandising, and hyper-personalized discovery.',
            icon: Boxes
          },
          {
            category: 'TELECOM & CLOUD',
            label: 'Telecommunications, Media & Cloud',
            href: '/industries/telecommunications',
            desc: '5G/6G autonomous RAN slice optimization, optical fiber anomaly triage, and automated CDN cache.',
            icon: Satellite
          }
        ]
      }
    ]
  },
  {
    id: 'engagement' as const,
    num: '4',
    title: 'Engagement Models',
    shortLabel: 'Engagement Models',
    sub: '5-Stage Proof · DBOT · Gain-Share · Private Cloud',
    badge: 'OUTCOME-BASED DELIVERY',
    headerTitle: 'Outcome-Based Engagement Models & Turnkey Delivery',
    tagline: 'Commercially accountable delivery models tied directly to verified business impact & capability transfer.',
    ctaText: 'Explore Engagement Models →',
    ctaHref: '/practice-areas#engagement-models',
    icon: Boxes,
    categories: [
      {
        title: 'Outcome Proof & Value Share',
        badge: 'GUARANTEED ROI',
        icon: CheckCircle2,
        items: [
          {
            category: 'OUTCOME PROOF',
            label: '5-Stage Outcome Proof Framework',
            href: '/practice-areas/ai-value-engineering',
            desc: 'Deterministic progression from validation to enterprise scale, with fees tied to milestones.',
            icon: CheckCircle2
          },
          {
            category: 'SHARED RISK',
            label: 'Shared-Risk / Gain-Share Model',
            href: '/practice-areas#engagement-models',
            desc: 'Commercial alignment where fees are directly tied to verified cost-reduction and revenue metrics.',
            icon: Trophy
          },
          {
            category: 'CAPACITY PODS',
            label: 'Fixed Capacity Pods & Squads',
            href: '/practice-areas#engagement-models',
            desc: 'Dedicated elite pod of forward deployed engineers integrated directly into client sprints.',
            icon: Users
          }
        ]
      },
      {
        title: 'Operating & Turnkey Delivery',
        badge: 'TURNKEY BUILDS',
        icon: Boxes,
        items: [
          {
            category: 'OPERATING MODEL',
            label: 'Forward Deployment Engineering (FDE)',
            href: '/practice-areas/forward-deployment-engineering',
            desc: 'Elite AI engineers embedded on-site in your environment to co-engineer and scale production systems.',
            icon: Layers
          },
          {
            category: 'TURNKEY DELIVERY',
            label: 'DBOT (Design-Build-Operate-Transfer)',
            href: '/practice-areas#engagement-models',
            desc: 'Full-lifecycle turnkey AI infrastructure and platform build, operated and transferred cleanly.',
            icon: Boxes
          },
          {
            category: 'SOVEREIGN DELIVERY',
            label: 'Private Cloud & Sovereign Model',
            href: '/practice-areas#engagement-models',
            desc: 'Air-gapped and on-premises delivery model guaranteeing complete data ownership and regulatory compliance.',
            icon: Lock
          }
        ]
      },
      {
        title: 'Diagnostics & Continuous SRE',
        badge: 'ASSURANCE',
        icon: ShieldCheck,
        items: [
          {
            category: 'DIAGNOSTIC AUDIT',
            label: 'Zero-Footprint AI Diagnostic',
            href: '/solutions/ai-value-engineering#diagnostic',
            desc: '72-hour non-invasive diagnostic auditing compute waste, model latencies, and token inefficiencies.',
            icon: Target
          },
          {
            category: 'TALENT TRANSFER',
            label: 'AI Capability & Team Bootcamps',
            href: '/practice-areas/forward-deployment-engineering',
            desc: 'Hands-on engineering bootcamps, architectural transfer, and production runbooks for internal squads.',
            icon: Sparkles
          },
          {
            category: 'SLA ASSURANCE',
            label: '24/7 SRE & Mission-Critical SLAs',
            href: '/solutions/ai-infra-engineering',
            desc: 'Enterprise support, continuous latency profiling, model failover, and guaranteed uptime SLAs.',
            icon: Activity
          }
        ]
      }
    ]
  },
  {
    id: 'value' as const,
    num: '5',
    title: 'AI Value Engineering',
    shortLabel: 'AI Value Engineering',
    sub: '5 Stages · 4 Engineers · 5 Proofs · Forward Deployed Pods',
    badge: 'SECTION 4 · DIVISION 1',
    headerTitle: 'Division 1 · Delivery Practice: AI Value Engineering',
    tagline: 'Forward deployment for value delivery — across agents, data, robotics, IoT, RPA, DLT and physical AI.',
    ctaText: 'Explore AI Value Engineering Practice →',
    ctaHref: '/practice-areas/ai-value-engineering',
    icon: TrendingUp,
    categories: [
      {
        title: '5 Stages & 5 Gates',
        badge: 'VALUE LIFECYCLE',
        icon: Workflow,
        items: [
          {
            category: 'DISCOVER & DESIGN',
            label: 'Stage 01–02: Value Discovery & Framing',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'P&L value pool sizing, binding constraints, frozen baselines & pre-registered thresholds.',
            icon: Target
          },
          {
            category: 'DEPLOY & PERFORM',
            label: 'Stage 03–04: Delivery & Repeatable Realization',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Thinnest end-to-end production path, unaided operator lift, and 3 consecutive Finance-signed cycles.',
            icon: CheckCircle2
          },
          {
            category: 'PROVE & ACCELERATE',
            label: 'Stage 05: Value Assurance & Acceleration',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Audit-ready assurance dossier, 3 acceleration levers (reusable assets, parallel stages, one owner).',
            icon: ShieldCheck
          }
        ]
      },
      {
        title: 'Technologies in Scope',
        badge: '7 TECH FAMILIES',
        icon: Cpu,
        items: [
          {
            category: 'INTELLIGENCE & CONSORTIA',
            label: 'Agentic AI, Copilots & Blockchain / DLT',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'Judgement-heavy workflows, dispute elimination, reconciliation audit trails, and multi-agent systems.',
            icon: Bot
          },
          {
            category: 'PHYSICAL & SENSORS',
            label: 'Robotics, IoT, Edge & Physical AI',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'Sensor fleets, signal chains, autonomous mobile robots (AMR), adaptive unstructured automation & safety cases.',
            icon: Activity
          },
          {
            category: 'DATA & WORKFLOWS',
            label: 'RPA, Workflows & Data Platform',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'FTE hours in repetitive work, data freshness SLAs, pipeline cost efficiency, and enterprise semantic graphs.',
            icon: Layers
          }
        ]
      },
      {
        title: 'Proofs & Delivery Pod',
        badge: 'OPERATING MODEL',
        icon: Boxes,
        items: [
          {
            category: 'PROOF STANDARD',
            label: 'The Five Proofs (PoC → PoComp)',
            href: '/practice-areas/ai-value-engineering#proofs',
            desc: 'PoC, PoV, PoP, PoRV (recurring value), and PoComp (compounding curves) across the Focal Matrix.',
            icon: Award
          },
          {
            category: 'FORWARD-DEPLOYED POD',
            label: 'Pod Architecture (4 Ours, 3 Theirs)',
            href: '/practice-areas/ai-value-engineering#pod',
            desc: 'FDE Lead, Domain Engineer, AI Agentic Engineer, AI Operational Engineer paired with client leadership.',
            icon: Users
          },
          {
            category: 'ENGAGEMENT MODELS',
            label: 'Outcome-Based Engagement Models',
            href: '/practice-areas/ai-value-engineering#engagement-models',
            desc: '6 shapes: Diagnostic, Sprint, Proof Engagement, Deployment & Banking, Embedded Value Engineering, Rescue.',
            icon: Boxes
          }
        ]
      }
    ]
  }
]

// 9. AI Value Engineering 5 Tabbed Sections
export const aiValueFiveSections = [
  {
    id: 'framework',
    title: 'Delivery Frameworks',
    shortLabel: 'Frameworks',
    badge: '5-STAGE LIFECYCLE',
    headerTitle: 'AI Value Engineering Practice & Delivery Pods',
    tagline: '5 stages, 4 engineers, 5 proofs, one number Finance signs across 7 tech families.',
    ctaText: 'Explore Practice Blueprint →',
    ctaHref: '/practice-areas/ai-value-engineering',
    icon: TrendingUp,
    categories: [
      {
        title: '5 Stages & 5 Gates',
        badge: 'VALUE LIFECYCLE',
        icon: Workflow,
        items: [
          {
            category: 'DISCOVER & DESIGN',
            label: 'Stage 01–02: Value Discovery & Framing',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'P&L value pool sizing, binding constraints, frozen baselines & pre-registered thresholds.',
            icon: Target
          },
          {
            category: 'DEPLOY & PERFORM',
            label: 'Stage 03–04: Delivery & Realization',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Thinnest end-to-end production path, unaided operator lift, and 3 consecutive Finance-signed cycles.',
            icon: CheckCircle2
          },
          {
            category: 'PROVE & ACCELERATE',
            label: 'Stage 05: Value Assurance',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Audit-ready assurance dossier, 3 acceleration levers (reusable assets, parallel stages, one owner).',
            icon: ShieldCheck
          },
          {
            category: 'DELIVERY PRACTICE',
            label: 'AI Value Engineering Practice',
            href: '/practice-areas/ai-value-engineering',
            desc: '5 stages, 4 engineers, 5 proofs, one number Finance signs across 7 tech families.',
            icon: TrendingUp
          }
        ]
      },
      {
        title: 'Delivery Pods & DBOT',
        badge: 'OPERATING MODEL',
        icon: Boxes,
        items: [
          {
            category: 'FORWARD-DEPLOYED POD',
            label: 'Pod Architecture (4 Ours, 3 Theirs)',
            href: '/practice-areas/ai-value-engineering#pod',
            desc: 'FDE Lead, Domain Engineer, AI Agentic Engineer, AI Operational Engineer paired with client leadership.',
            icon: Users
          },
          {
            category: 'TURNKEY DELIVERY',
            label: 'Turnkey DBOT Delivery Frameworks',
            href: '/practice-areas#engagement-models',
            desc: 'Design, Build, Operate, Transfer with verified SLA milestones and commercial risk alignment.',
            icon: Boxes
          },
          {
            category: 'COMMERCIAL ALIGNMENT',
            label: 'Outcome-Based Engagement Models',
            href: '/practice-areas/ai-value-engineering#engagement-models',
            desc: 'Diagnostic sprints, shared-risk gain-share models & embedded value engineering.',
            icon: Trophy
          },
          {
            category: 'TALENT TRANSFER',
            label: 'AI Capability & Team Bootcamps',
            href: '/practice-areas/forward-deployment-engineering',
            desc: 'Hands-on engineering bootcamps, architectural transfer, and production runbooks for internal squads.',
            icon: Sparkles
          }
        ]
      },
      {
        title: '7 Tech Families in Scope',
        badge: 'FULL-SPECTRUM',
        icon: Cpu,
        items: [
          {
            category: 'INTELLIGENCE & CONSORTIA',
            label: 'Agentic AI, Copilots & DLT',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'Judgement-heavy workflows, dispute elimination, reconciliation audit trails, and multi-agent systems.',
            icon: Bot
          },
          {
            category: 'PHYSICAL & SENSORS',
            label: 'Robotics, IoT, Edge & Physical AI',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'Sensor fleets, signal chains, autonomous mobile robots (AMR), adaptive unstructured automation & safety cases.',
            icon: Activity
          },
          {
            category: 'DATA & WORKFLOWS',
            label: 'RPA, Workflows & Data Platforms',
            href: '/practice-areas/ai-value-engineering#technologies',
            desc: 'FTE hours in repetitive work, data freshness SLAs, pipeline cost efficiency, and enterprise semantic graphs.',
            icon: Layers
          },
          {
            category: 'SYSTEM ARCHITECTURE',
            label: '5-Layer AI-VE System Architecture',
            href: '/solutions/ai-value-engineering#five-layer-architecture',
            desc: '5-layer agent fleet architecture from sensory ingest to compounding OS.',
            icon: Layers
          }
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Architecture',
    shortLabel: 'FinOps & Cost',
    badge: 'CFO CONSENSUS',
    headerTitle: 'Financial Architecture, Token FinOps & Unit Economics',
    tagline: 'Cost-to-serve, inference unit economics, GPU budget attribution & verified CFO P&L impact.',
    ctaText: 'Explore Financial Architecture →',
    ctaHref: '/solutions/ai-value-engineering#ledger-economics',
    icon: BarChart3,
    categories: [
      {
        title: 'Unit Economics & Cost Ledger',
        badge: 'UNIT ECONOMICS',
        icon: BarChart3,
        items: [
          {
            category: 'FINANCIAL ARCHITECTURE',
            label: 'AI Economics & Unit Economics',
            href: '/solutions/ai-value-engineering#ledger-economics',
            desc: 'Cost-to-serve, inference unit economics & function-cost ledger decomposition.',
            icon: BarChart3
          },
          {
            category: 'COST-PER-TASK',
            label: 'Cost-Per-Task & Inference Economics',
            href: '/solutions/ai-value-engineering#ledger-economics',
            desc: 'Per-transaction token burn, prompt caching savings, and amortized fine-tuning unit costs.',
            icon: SlidersHorizontal
          },
          {
            category: 'LEDGER DECOMPOSITION',
            label: 'Function-Cost Ledger Decomposition',
            href: '/solutions/ai-value-engineering#ledger-economics',
            desc: 'Granular attribution of LLM reasoning, retrieval, validation, and storage overhead.',
            icon: Layers
          },
          {
            category: 'CAPITAL EFFICIENCY',
            label: 'Working Capital & Margin Modeling',
            href: '/solutions/ai-value-engineering#ledger-economics',
            desc: 'Translating GPU utilization and token throughput into working capital and EBITDA gains.',
            icon: TrendingUp
          }
        ]
      },
      {
        title: 'AI FinOps & Cost Governance',
        badge: 'OPEX CONTROL',
        icon: SlidersHorizontal,
        items: [
          {
            category: 'COST GOVERNANCE',
            label: 'AI FinOps & Cost Governance',
            href: '/solutions/ai-value-engineering#operating-system',
            desc: 'Continuous GPU token governance, infrastructure OpEx & budget attribution.',
            icon: SlidersHorizontal
          },
          {
            category: 'TOKEN GOVERNANCE',
            label: 'Continuous GPU Token Governance',
            href: '/solutions/ai-value-engineering#operating-system',
            desc: 'Automated spend caps, model fallback routing to cheaper SLMs, and prompt token minimization.',
            icon: Cpu
          },
          {
            category: 'OPEX ATTRIBUTION',
            label: 'Infrastructure OpEx & Attribution',
            href: '/solutions/ai-value-engineering#operating-system',
            desc: 'Chargeback and showback by business unit, project, and autonomous agent pod.',
            icon: BarChart3
          },
          {
            category: 'REAL-TIME TELEMETRY',
            label: 'Token Burn Telemetry & Alerting',
            href: '/solutions/ai-value-engineering#operating-system',
            desc: 'Sub-minute alert thresholds for anomalous token consumption and infinite agent loops.',
            icon: Activity
          }
        ]
      },
      {
        title: 'Value Realization & ROI',
        badge: 'P&L CURRENCIES',
        icon: TrendingUp,
        items: [
          {
            category: 'VALUE REALIZATION',
            label: 'ROI, TCO & Value Realization',
            href: '/solutions/ai-value-engineering#value-currencies',
            desc: 'Cost Down, Cash Out, Revenue Up, Risk Down & growth option P&L proof.',
            icon: TrendingUp
          },
          {
            category: 'P&L CURRENCIES',
            label: 'Cost Down, Cash Out, Revenue Up',
            href: '/solutions/ai-value-engineering#value-currencies',
            desc: 'Four mathematical value currencies audited by CFO controllers before capital deployment.',
            icon: CheckCircle2
          },
          {
            category: 'NPV & IRR PROJECTIONS',
            label: 'CFO Consensus Canvas & NPV Models',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Transparent economic projections bridging technical AI engineers with the finance committee.',
            icon: Scale
          },
          {
            category: 'CAPITAL GATES',
            label: 'Milestone-Gated Commitments',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Tranche release tied directly to verified operational KPIs and Finance sign-off.',
            icon: Target
          }
        ]
      }
    ]
  },
  {
    id: 'methodology',
    title: 'Methodology Engine',
    shortLabel: '80+ Methods',
    badge: '80+ METHODS',
    headerTitle: 'AI-Driven Methodology Engine & 80+ Industrial Methods',
    tagline: 'Lean, Six Sigma, TOC, TPS, SMED, FMEA, and TRIZ industrialized by autonomous AI agents.',
    ctaText: 'Explore Methodology Engine →',
    ctaHref: '/methodology-engine',
    icon: Sparkles,
    categories: [
      {
        title: 'Theory of Constraints (TOC)',
        badge: 'THROUGHPUT',
        icon: SlidersHorizontal,
        items: [
          {
            category: 'CONSTRAINT ELEVATION',
            label: 'Critical Chain & Bottleneck Elevation',
            href: '/methodology-engine',
            desc: 'Locate the single constraint gating enterprise throughput and focus AI automation directly upon it.',
            icon: Target
          },
          {
            category: 'FIVE FOCUSING STEPS',
            label: 'Five Focusing Steps Automation',
            href: '/methodology-engine',
            desc: 'Identify, Exploit, Subordinate, Elevate, and Prevent Inertia automated across enterprise systems.',
            icon: Workflow
          },
          {
            category: 'THROUGHPUT ACCOUNTING',
            label: 'Throughput Accounting by AI Agents',
            href: '/methodology-engine',
            desc: 'T, I, OE financial modeling replacing traditional cost accounting distortion with cash velocity.',
            icon: BarChart3
          },
          {
            category: 'QUEUE OPTIMIZATION',
            label: 'GPU Cluster Queue Optimization',
            href: '/methodology-engine#diagnostic',
            desc: 'Eliminating queue friction, batch stalling, and compute starvation with Drum-Buffer-Rope scheduling.',
            icon: Cpu
          }
        ]
      },
      {
        title: 'Lean & Six Sigma (DMAIC)',
        badge: 'VARIATION & WASTE',
        icon: Workflow,
        items: [
          {
            category: 'WASTE ELIMINATION',
            label: 'DOWNTIME Waste Elimination',
            href: '/solutions/ai-value-engineering#waste-governance',
            desc: 'Eliminating Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing.',
            icon: ShieldCheck
          },
          {
            category: 'STATISTICAL PROCESS CONTROL',
            label: 'DMAIC & Continuous SPC',
            href: '/methodology-engine',
            desc: 'Define, Measure, Analyze, Improve, Control loops with automated statistical variance monitoring.',
            icon: Activity
          },
          {
            category: 'CYCLE TIME REDUCTION',
            label: 'SMED & Value Stream Mapping',
            href: '/methodology-engine',
            desc: 'Single-minute exchange of dies applied to AI model swaps, pipeline context shifts, and operator handoffs.',
            icon: Clock
          },
          {
            category: 'DEFECT MITIGATION',
            label: 'Shop-Floor Defect Mitigation',
            href: '/methodology-engine#full-spectrum-architecture',
            desc: 'Automated root-cause analysis, 5-Whys reasoning trees, and preventive action triggers.',
            icon: AlertCircle
          }
        ]
      },
      {
        title: 'Engineering Frameworks',
        badge: 'ROBUST DESIGN',
        icon: Boxes,
        items: [
          {
            category: 'METHODOLOGY CATALOG',
            label: '80+ Operational Methods Catalog',
            href: '/solutions/ai-value-engineering#methodology-engine',
            desc: 'Comprehensive library of industrial methods cataloged, prioritized, and executed by agent swarms.',
            icon: Boxes
          },
          {
            category: 'SYSTEMATIC INNOVATION',
            label: 'TRIZ Systematic Innovation Engine',
            href: '/methodology-engine',
            desc: 'Algorithmic contradiction resolution and technical inventive principles applied to complex AI systems.',
            icon: Sparkles
          },
          {
            category: 'MISTAKE-PROOFING',
            label: 'FMEA, Poka-Yoke & Jidoka',
            href: '/methodology-engine#architecture',
            desc: 'Failure Mode & Effects Analysis, mechanical error-proofing, and autonomous stop-on-defect mechanisms.',
            icon: ShieldCheck
          },
          {
            category: 'ASSET PRODUCTIVITY',
            label: 'TPM & OEE Asset Optimization',
            href: '/methodology-engine#deployment',
            desc: 'Total Productive Maintenance and Overall Equipment Effectiveness for GPU farms and data pipelines.',
            icon: Target
          }
        ]
      }
    ]
  },
  {
    id: 'assurance',
    title: 'Enterprise Proofs',
    shortLabel: 'Proofs & SAVE',
    badge: 'SAVE STANDARDS',
    headerTitle: 'Enterprise Proofs, SAVE Job Plan & Assurance Dossiers',
    tagline: 'SAVE International standards re-engineered with AI: 70-year job plan from Information to Audit.',
    ctaText: 'Explore Case Studies & Proofs →',
    ctaHref: '/case-studies',
    icon: ShieldCheck,
    categories: [
      {
        title: '70-Year AI-VE Job Plan',
        badge: 'SAVE STANDARD',
        icon: Zap,
        items: [
          {
            category: 'JOB PLAN STAGES',
            label: '8-Stage Standard: Info to Audit',
            href: '/solutions/ai-value-engineering#job-plan-stages',
            desc: 'SAVE International standard re-engineered with AI: Information, Function Analysis, Creative, Evaluation, Development, Presentation, Implementation, Audit.',
            icon: Zap
          },
          {
            category: 'PRE-REGISTERED GATES',
            label: 'Pre-Registered P&L Thresholds',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Pre-agreed performance metrics that prevent retroactive goalpost shifting and ensure objective evaluation.',
            icon: Target
          },
          {
            category: 'FINANCE-SIGNED PROOFS',
            label: 'Finance-Signed Verification Dossier',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Formal proof package reviewed and attested by client financial controllers across 3 consecutive cycles.',
            icon: FileText
          },
          {
            category: 'CONTINUOUS ASSURANCE',
            label: 'Continuous Value Assurance OS',
            href: '/practice-areas/ai-value-engineering#lifecycle',
            desc: 'Always-on telemetry ensuring value gains do not decay over time due to drift or organizational inertia.',
            icon: ShieldCheck
          }
        ]
      },
      {
        title: 'The Five Proofs Framework',
        badge: 'OUTCOME VERIFICATION',
        icon: CheckCircle2,
        items: [
          {
            category: 'PROOF MATRIX',
            label: 'The Five Proofs (PoC → PoComp)',
            href: '/practice-areas/ai-value-engineering#proofs',
            desc: 'Proof of Concept, Value, Production, Recurring Value, and Compounding across enterprise operations.',
            icon: Award
          },
          {
            category: 'CASE STUDIES',
            label: 'Case Studies & Performance Metrics',
            href: '/case-studies',
            desc: 'Production outcomes, GPU yield gains, latency & balance-sheet impact across Tier-1 institutions.',
            icon: FileText
          },
          {
            category: 'YIELD & LATENCY',
            label: 'Balance Sheet Yield & Latency',
            href: '/case-studies',
            desc: 'Measured operational throughput expansion and sub-second decision cycle acceleration.',
            icon: Activity
          },
          {
            category: 'VERIFIABLE IMPACT',
            label: '3–10x Verifiable ROI Dossiers',
            href: '/case-studies',
            desc: 'Detailed empirical dossiers documenting verified cost-down and revenue-up achievements.',
            icon: TrendingUp
          }
        ]
      },
      {
        title: 'Governance & Ecosystem',
        badge: 'ENTERPRISE SCALE',
        icon: ShieldCheck,
        items: [
          {
            category: 'RISK & COMPLIANCE',
            label: 'Governance & Human Risk Bands',
            href: '/solutions/ai-value-engineering#waste-governance',
            desc: 'DOWNTIME waste elimination coupled with deterministic human risk bands and regulatory guardrails.',
            icon: ShieldCheck
          },
          {
            category: 'TECHNOLOGY STACK',
            label: 'Technology Ecosystem & Enablers',
            href: '/partners',
            desc: 'Hardware accelerators, silicon platforms, orchestration engines & strategic partner network.',
            icon: Network
          },
          {
            category: 'SILICON ALLIANCES',
            label: 'Accelerators & Silicon Alliances',
            href: '/partners',
            desc: 'Direct co-engineering with frontier GPU, NPU, and interconnect providers.',
            icon: Cpu
          },
          {
            category: 'SECURITY ASSURANCE',
            label: 'Enterprise Security & Compliance',
            href: '/solutions/ai-value-engineering#waste-governance',
            desc: 'Air-gapped operation, cryptographic lineage, and continuous security compliance verification.',
            icon: Lock
          }
        ]
      }
    ]
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic & Advisory',
    shortLabel: '72-Hr Audit',
    badge: '72-HR EVALUATION',
    headerTitle: 'Zero-Footprint AI Diagnostic & Value Discovery Audit',
    tagline: 'Rapid 72-hour non-invasive diagnostic auditing compute waste, model latencies, and trapped value.',
    ctaText: 'Book AI Value Diagnostic →',
    ctaHref: '/book-ai-diagnostic#diagnostic-form-section',
    icon: Activity,
    categories: [
      {
        title: 'Zero-Footprint Diagnostic',
        badge: 'RAPID AUDIT',
        icon: Target,
        items: [
          {
            category: 'RAPID DIAGNOSTIC',
            label: '72-Hour Rapid Diagnostic Audit',
            href: '/solutions/ai-value-engineering#diagnostic',
            desc: 'Non-invasive telemetry audit analyzing GPU utilization, inference bottlenecks, and token waste.',
            icon: Target
          },
          {
            category: 'COMPUTE AUDIT',
            label: 'Compute Waste & GPU Idle Audit',
            href: '/book-ai-diagnostic#diagnostic-form-section',
            desc: 'Pinpointing idle cycles, oversized context windows, and underutilized accelerator clusters.',
            icon: Cpu
          },
          {
            category: 'READINESS SCORING',
            label: 'Enterprise AI Readiness Scoring',
            href: '/ai-readiness-assessment',
            desc: 'Empirical readiness index across data quality, systems architecture, governance, and talent.',
            icon: Sparkles
          },
          {
            category: 'BASELINE MEASUREMENT',
            label: 'Baseline Measurement & VSM',
            href: '/solutions/ai-value-engineering#diagnostic',
            desc: 'Freezing operational baselines to establish indisputable pre/post performance benchmarks.',
            icon: FileText
          }
        ]
      },
      {
        title: 'Discovery & Canvases',
        badge: 'OPPORTUNITY MAPPING',
        icon: Scale,
        items: [
          {
            category: 'VALUE STREAM',
            label: 'P&L Value Stream Mapping',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Translating corporate strategic objectives into specific operational bottlenecks addressable by AI.',
            icon: TrendingUp
          },
          {
            category: 'FEASIBILITY MATRIX',
            label: 'Technical Feasibility Matrix',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Filtering out high-risk research experiments in favor of mathematically solvable production problems.',
            icon: Scale
          },
          {
            category: 'CFO CANVAS',
            label: 'CFO Consensus Canvas & NPV',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Constructing transparent financial models that bridge AI engineers and the finance committee.',
            icon: BarChart3
          },
          {
            category: 'CONSTRAINT IDENTIFICATION',
            label: 'Operating Constraint Identification',
            href: '/solutions/ai-value-engineering#value-discovery',
            desc: 'Locating the exact point in the value chain where AI intervention produces maximum financial leverage.',
            icon: SlidersHorizontal
          }
        ]
      },
      {
        title: 'Commercial Models & Strategy',
        badge: 'COMMERCIAL TERMS',
        icon: Boxes,
        items: [
          {
            category: 'SHARED RISK',
            label: 'Shared-Risk & Gain-Share Models',
            href: '/practice-areas#engagement-models',
            desc: 'Commercial alignment where fees are directly tied to verified cost-reduction and revenue metrics.',
            icon: Trophy
          },
          {
            category: 'SPRINT ENGAGEMENTS',
            label: 'Diagnostic Sprints & Proofs',
            href: '/practice-areas/ai-value-engineering#engagement-models',
            desc: 'Time-boxed 6-to-12 week sprint delivering verified PoV and deployment roadmap.',
            icon: Clock
          },
          {
            category: 'CAPACITY SQUADS',
            label: 'Fixed Capacity Pods & Sprints',
            href: '/practice-areas#engagement-models',
            desc: 'Dedicated elite pod of forward deployed engineers integrated directly into client sprints.',
            icon: Users
          },
          {
            category: 'EXECUTIVE ADVISORY',
            label: 'Executive Consultation Booking',
            href: '/book-consultation',
            desc: 'Direct strategy session with TrustGrid.AI Principal Systems Architects and FinOps Directors.',
            icon: ArrowUpRight
          }
        ]
      }
    ]
  }
]

// 10. AI Agentic Enterprise 3 Tabbed Sections
export const agenticEnterpriseThreeSections = [
  {
    id: 'cognitive',
    title: 'Cognitive Architecture',
    shortLabel: 'Architecture',
    badge: 'ORCHESTRATION',
    headerTitle: 'Autonomous Agent Architecture & Multi-Agent Swarms',
    tagline: 'Architect, deploy, and govern production multi-agent systems with deterministic reasoning DAGs and persistent memory.',
    ctaText: 'Explore Agentic Architecture →',
    ctaHref: '/solutions/ai-agentic-factory#agent-architecture',
    icon: Bot,
    categories: [
      {
        title: 'Cognitive Loops & Memory',
        badge: 'REASONING & STATE',
        icon: Bot,
        items: [
          {
            category: 'COGNITIVE ARCHITECTURE',
            label: 'Autonomous Agent Architecture',
            href: '/solutions/ai-agentic-factory#agent-architecture',
            desc: 'Cognitive loops, ReAct, Tree-of-Thought & persistent memory.',
            icon: Bot
          },
          {
            category: 'STATE GRAPHS',
            label: 'Persistent Memory & State Graphs',
            href: '/solutions/ai-agentic-factory#agent-architecture',
            desc: 'Cross-session memory persistence, vector store memory & state rollback.',
            icon: Layers
          },
          {
            category: 'REASONING ENGINES',
            label: 'ReAct & Tree-of-Thought Workflows',
            href: '/solutions/ai-agentic-factory#agent-architecture',
            desc: 'Structured deliberation chains with dynamic backtracking and goal pruning.',
            icon: Workflow
          },
          {
            category: 'CONTEXT WINDOWS',
            label: 'Dynamic Context & Compaction',
            href: '/solutions/ai-agentic-factory#agent-architecture',
            desc: 'Hierarchical context summarization reducing token cost and latency.',
            icon: SlidersHorizontal
          }
        ]
      },
      {
        title: 'Multi-Agent Swarms & DAGs',
        badge: 'SWARM ORCHESTRATION',
        icon: Workflow,
        items: [
          {
            category: 'SWARM ORCHESTRATION',
            label: 'Multi-Agent Swarm Orchestration',
            href: '/solutions/ai-agentic-factory#multi-agent-orchestration',
            desc: 'LangGraph, AutoGen, CrewAI & deterministic consensus DAGs.',
            icon: Workflow
          },
          {
            category: 'CONSENSUS PROTOCOLS',
            label: 'Deterministic Consensus DAGs',
            href: '/solutions/ai-agentic-factory#multi-agent-orchestration',
            desc: 'Byzantine fault-tolerant agent voting, quorum validation & audit logs.',
            icon: ShieldCheck
          },
          {
            category: 'INTER-AGENT BUS',
            label: 'Agent Messaging & Event Bus',
            href: '/solutions/ai-agentic-factory#multi-agent-orchestration',
            desc: 'High-throughput async event streaming for hundreds of concurrent agents.',
            icon: Network
          },
          {
            category: 'TASK DECOMPOSITION',
            label: 'Hierarchical Task Decomposition',
            href: '/solutions/ai-agentic-factory#multi-agent-orchestration',
            desc: 'Supervisor agent pattern decomposing broad enterprise goals into sub-tasks.',
            icon: Target
          }
        ]
      },
      {
        title: 'Tools & Enterprise Systems',
        badge: 'MCP TOOLS',
        icon: Cpu,
        items: [
          {
            category: 'MCP INTEGRATION',
            label: 'Model Context Protocol & Tools',
            href: '/solutions/ai-agentic-factory#mcp-tool-integration',
            desc: 'Standardized tool interfaces, ERP/CRM & database connectors.',
            icon: Cpu
          },
          {
            category: 'VERTICAL FACTORIES',
            label: 'Vertical Enterprise Agent Factories',
            href: '/solutions/ai-agentic-factory#vertical-factories',
            desc: 'Pre-built autonomous agents for Finance, Supply Chain, SRE & HR.',
            icon: Layers
          },
          {
            category: 'DATABASE CONNECTORS',
            label: 'Enterprise Data Connectors',
            href: '/solutions/ai-agentic-factory#mcp-tool-integration',
            desc: 'Secure sandboxed tool execution against SAP, Salesforce, Oracle & Postgres.',
            icon: Boxes
          },
          {
            category: 'SANDBOX EXECUTION',
            label: 'Isolated Runtime Sandboxes',
            href: '/solutions/ai-agentic-factory#mcp-tool-integration',
            desc: 'gVisor and microVM sandboxes for deterministic code execution.',
            icon: Lock
          }
        ]
      }
    ]
  },
  {
    id: 'agentops',
    title: 'AgentOps & Safety',
    shortLabel: 'AgentOps',
    badge: 'GOVERNANCE',
    headerTitle: 'Enterprise AgentOps, Guardrails & Human-in-the-Loop',
    tagline: 'Continuous telemetry, anti-injection firewalls, semantic boundaries & SLA governance.',
    ctaText: 'Explore AgentOps Blueprint →',
    ctaHref: '/solutions/ai-agentic-factory#agentops-governance',
    icon: ShieldCheck,
    categories: [
      {
        title: 'AgentOps Telemetry & Tracing',
        badge: 'OBSERVABILITY',
        icon: BarChart3,
        items: [
          {
            category: 'TELEMETRY & TRACING',
            label: 'Enterprise AgentOps & Telemetry',
            href: '/solutions/ai-agentic-factory#agentops-governance',
            desc: 'Distributed trace observability, token telemetry & failure triage.',
            icon: BarChart3
          },
          {
            category: 'DISTRIBUTED TRACING',
            label: 'OpenTelemetry Trace Spans',
            href: '/solutions/ai-agentic-factory#agentops-governance',
            desc: 'End-to-end span tracking through multi-turn agent deliberation cycles.',
            icon: Activity
          },
          {
            category: 'FAILURE TRIAGE',
            label: 'Loop & Hallucination Triage',
            href: '/solutions/ai-agentic-factory#agentops-governance',
            desc: 'Real-time detection of infinite reasoning cycles and drift.',
            icon: AlertCircle
          },
          {
            category: 'COST TELEMETRY',
            label: 'Per-Task Token Cost Attribution',
            href: '/solutions/ai-agentic-factory#agentops-governance',
            desc: 'Granular token usage and inference latency tracking per agent workflow.',
            icon: TrendingUp
          }
        ]
      },
      {
        title: 'Runtime Guardrails & Firewalls',
        badge: 'SAFETY SHIELDS',
        icon: ShieldCheck,
        items: [
          {
            category: 'RUNTIME GUARDRAILS',
            label: 'Runtime Guardrails & Firewalls',
            href: '/solutions/ai-agentic-factory#guardrails-safety',
            desc: 'Anti-injection shields, semantic boundary enforcement & safety.',
            icon: ShieldCheck
          },
          {
            category: 'INJECTION DEFENSE',
            label: 'Anti-Prompt Injection Defense',
            href: '/solutions/ai-agentic-factory#guardrails-safety',
            desc: 'Dual-model input validation blocking adversarial jailbreaks and indirect injection.',
            icon: Lock
          },
          {
            category: 'SEMANTIC BOUNDARIES',
            label: 'Semantic Boundary Enforcement',
            href: '/solutions/ai-agentic-factory#guardrails-safety',
            desc: 'Strict policy and scope boundary checks on every tool call and generated output.',
            icon: Target
          },
          {
            category: 'COMPLIANCE AUDITING',
            label: 'Continuous Policy Auditing & Logs',
            href: '/solutions/ai-agentic-factory#guardrails-safety',
            desc: 'Immutable append-only audit trail for compliance verification and forensic review.',
            icon: FileText
          }
        ]
      },
      {
        title: 'HITL Teaming & Continuous Eval',
        badge: 'HUMAN OVERSIGHT',
        icon: Users,
        items: [
          {
            category: 'HITL TEAMING',
            label: 'Human-in-the-Loop (HITL) Teaming',
            href: '/solutions/ai-agentic-factory#human-agent-teaming',
            desc: 'Dynamic confidence gates, approval workflows & workforce ops.',
            icon: Users
          },
          {
            category: 'CONFIDENCE GATES',
            label: 'Dynamic Confidence Escapes',
            href: '/solutions/ai-agentic-factory#human-agent-teaming',
            desc: 'Automated human routing whenever agent certainty falls below threshold.',
            icon: CheckCircle2
          },
          {
            category: 'SYNTHETIC EVALS',
            label: 'Continuous Agent Evaluation',
            href: '/solutions/ai-agentic-factory#synthetic-eval-sprints',
            desc: 'Synthetic benchmarking, automated red-teaming & regression suites.',
            icon: Target
          },
          {
            category: 'RED TEAMING',
            label: 'Automated Adversarial Red-Teaming',
            href: '/solutions/ai-agentic-factory#synthetic-eval-sprints',
            desc: 'Continuous simulated stress tests exposing edge-case vulnerabilities.',
            icon: Sparkles
          }
        ]
      }
    ]
  },
  {
    id: 'production',
    title: 'Production Fleets',
    shortLabel: 'Fleets & Yield',
    badge: 'PRODUCTION',
    headerTitle: 'Sovereign Runtimes, Turnkey Delivery & Fleet SLAs',
    tagline: 'Deploy governed agent fleets in air-gapped or hybrid environments with >95% task accuracy.',
    ctaText: 'Explore Production Fleets →',
    ctaHref: '/solutions/ai-agentic-factory#edge-onprem-runtimes',
    icon: TrendingUp,
    categories: [
      {
        title: 'Sovereign & On-Prem Runtimes',
        badge: 'AIR-GAPPED RUNTIMES',
        icon: Building2,
        items: [
          {
            category: 'SOVEREIGN RUNTIMES',
            label: 'Sovereign & On-Prem Agent Runtimes',
            href: '/solutions/ai-agentic-factory#edge-onprem-runtimes',
            desc: 'Air-gapped SLMs, local inference pods & zero-data-leakage.',
            icon: Building2
          },
          {
            category: 'LOCAL INFERENCE',
            label: 'Local SLM Inference Pods',
            href: '/solutions/ai-agentic-factory#edge-onprem-runtimes',
            desc: 'Quantized 7B–70B model execution on local GPU clusters with zero external dependencies.',
            icon: Cpu
          },
          {
            category: 'ZERO LEAKAGE',
            label: 'Zero-Data-Leakage Deployment',
            href: '/solutions/ai-agentic-factory#edge-onprem-runtimes',
            desc: 'Customer-hosted VPCs and air-gapped physical data centers.',
            icon: Lock
          },
          {
            category: 'EDGE CONTAINERS',
            label: 'Containerized Edge Agents',
            href: '/solutions/ai-agentic-factory#edge-onprem-runtimes',
            desc: 'Lightweight autonomous agents compiled for edge servers and IoT gateways.',
            icon: Layers
          }
        ]
      },
      {
        title: 'Turnkey Factory Delivery',
        badge: 'DBOT ROLLOUT',
        icon: Compass,
        items: [
          {
            category: 'TRANSFORMATION SPRINT',
            label: '12–24 Wk Pilot to Factory Delivery',
            href: '/solutions/ai-agentic-factory#agentic-transformation',
            desc: 'Organizational enablement, change management & DBOT delivery.',
            icon: Compass
          },
          {
            category: 'ORGANIZATIONAL RUNBOOKS',
            label: 'Enablement & Runbooks',
            href: '/solutions/ai-agentic-factory#agentic-transformation',
            desc: 'Standard operating procedures, prompt engineering libraries, and agent governance roles.',
            icon: FileText
          },
          {
            category: 'DBOT TRANSFER',
            label: 'DBOT Capability Transfer',
            href: '/solutions/ai-agentic-factory#agentic-transformation',
            desc: 'We design, build, and operate, then transition complete ownership to internal teams.',
            icon: Boxes
          },
          {
            category: 'FORWARD PODS',
            label: 'Forward Deployed Engineering Pods',
            href: '/practice-areas/forward-deployment-engineering',
            desc: 'Elite engineers embedded on-site to build and tune mission-critical agent workflows.',
            icon: Users
          }
        ]
      },
      {
        title: 'Fleet SLAs & Readiness',
        badge: 'PERFORMANCE',
        icon: TrendingUp,
        items: [
          {
            category: 'FLEET METRICS',
            label: 'Agent Fleet Yield & SLA Metrics',
            href: '/solutions/ai-agentic-factory#fleet-metrics-roi',
            desc: 'Task autonomy rate, cost-per-successful-task & cycle time reduction.',
            icon: TrendingUp
          },
          {
            category: 'TASK ACCURACY',
            label: '>95% Task Accuracy with SLA',
            href: '/solutions/ai-agentic-factory#fleet-metrics-roi',
            desc: 'Deterministic multi-agent DAGs guaranteeing output fidelity and bounded error rates.',
            icon: CheckCircle2
          },
          {
            category: 'DIAGNOSTIC AUDIT',
            label: 'Enterprise Agentic Diagnostic',
            href: '/solutions/ai-agentic-factory#agentic-diagnostic',
            desc: 'Executive technical readiness audit, opportunity prioritization & roadmap.',
            icon: Sparkles
          },
          {
            category: 'CONSULTATION',
            label: 'Talk to an AI Architect',
            href: '/talk-to-ai-architect',
            desc: 'Schedule a deep architectural review of your enterprise agent fleet strategy.',
            icon: ArrowUpRight
          }
        ]
      }
    ]
  }
]

// 11. About Us 3 Tabbed Sections
export const aboutThreeSections = [
  {
    id: 'company',
    title: 'Company & Leadership',
    shortLabel: 'Company',
    badge: 'LEADERSHIP',
    headerTitle: 'TRUSTGRID.AI Global Organization & Leadership',
    tagline: 'Full-Spectrum AI Engineering Company with executive offices in US, Singapore & India.',
    ctaText: 'Explore Company Profile →',
    ctaHref: '/about',
    icon: Building2,
    categories: [
      {
        title: 'Company & Systems Rigor',
        badge: 'ENTERPRISE FOUNDATION',
        icon: Building2,
        items: [
          {
            category: 'ABOUT US',
            label: 'About TRUSTGRID.AI',
            href: '/about',
            desc: 'Our mission, vision, and full-spectrum engineering verticals.',
            icon: Building2
          },
          {
            category: 'MISSION & VISION',
            label: 'Mission, Vision & Principles',
            href: '/about#mission',
            desc: 'Deterministic AI systems engineering for the compounding enterprise.',
            icon: Target
          },
          {
            category: 'CORE ARCHITECTURE',
            label: 'Full-Spectrum Architecture',
            href: '/about#architecture',
            desc: 'Integrated delivery from power & silicon to autonomous agents and value engineering.',
            icon: Layers
          },
          {
            category: 'NEWS & MEDIA',
            label: 'Press & Media Announcements',
            href: '/about#press',
            desc: 'Latest company announcements, research releases, and milestone achievements.',
            icon: FileText
          }
        ]
      },
      {
        title: 'Leadership & Systems Leads',
        badge: 'WORLD-CLASS ARCHITECTS',
        icon: Users,
        items: [
          {
            category: 'LEADERSHIP TEAM',
            label: 'Leadership & Systems Leads',
            href: '/leadership',
            desc: 'World-class AI architects, systems leads, and advisory board.',
            icon: Users
          },
          {
            category: 'ADVISORY BOARD',
            label: 'Board of Directors & Advisors',
            href: '/leadership#advisory',
            desc: 'Industry pioneers in hyperscale computing, semiconductor fabrics, and enterprise AI.',
            icon: Award
          },
          {
            category: 'FELLOWSHIPS',
            label: 'Systems Engineering Fellowship',
            href: '/careers#fellowship',
            desc: 'Elite fellowship program training the next generation of frontier AI systems engineers.',
            icon: Sparkles
          },
          {
            category: 'EXECUTIVE SPEAKING',
            label: 'Keynotes & Thought Leadership',
            href: '/insights',
            desc: 'Executive presentations at global AI infrastructure and enterprise summits.',
            icon: Compass
          }
        ]
      },
      {
        title: 'Strategic Alliances & Ecosystem',
        badge: 'PARTNERSHIPS',
        icon: Network,
        items: [
          {
            category: 'PARTNER NETWORK',
            label: 'Technology Ecosystem & Alliances',
            href: '/partners',
            desc: 'Strategic partnerships across silicon manufacturers, hyperscalers, and OEM systems.',
            icon: Network
          },
          {
            category: 'RESEARCH LABS',
            label: 'Frontier AI Research Consortia',
            href: '/about#research',
            desc: 'Collaborative applied research in mathematical explainability and post-quantum security.',
            icon: Cpu
          },
          {
            category: 'CLIENT ALLIANCES',
            label: 'Global Enterprise Customers',
            href: '/case-studies',
            desc: 'Co-engineering initiatives across defense, banking, healthcare, and manufacturing.',
            icon: TrendingUp
          },
          {
            category: 'CONTACT US',
            label: 'Executive Briefing Center',
            href: '/contact',
            desc: 'Schedule a visit to our Silicon Valley, Singapore, or India engineering labs.',
            icon: ArrowUpRight
          }
        ]
      }
    ]
  },
  {
    id: 'global',
    title: 'Global Hubs & Talent',
    shortLabel: 'Global Hubs',
    badge: 'GLOBAL PRESENCE',
    headerTitle: 'Global R&D Hubs, Delivery Centers & Talent Network',
    tagline: 'Distributed engineering delivery labs across North America, Asia-Pacific, and India.',
    ctaText: 'Explore Careers & Hubs →',
    ctaHref: '/careers',
    icon: MapPin,
    categories: [
      {
        title: 'Global Delivery Centers',
        badge: 'ENGINEERING LABS',
        icon: MapPin,
        items: [
          {
            category: 'NORTH AMERICA',
            label: 'Silicon Valley R&D Lab (US)',
            href: '/about#locations',
            desc: 'Systems architecture, advanced silicon co-engineering, and strategic headquarters.',
            icon: Building2
          },
          {
            category: 'ASIA-PACIFIC',
            label: 'Singapore Asia-Pacific Hub',
            href: '/about#locations',
            desc: 'Regional delivery center, cross-border banking AI, and sovereign infrastructure operations.',
            icon: Globe2
          },
          {
            category: 'INDIA LABS',
            label: 'India Systems Engineering Center',
            href: '/about#locations',
            desc: 'High-throughput software engineering, model training pipelines, and 24/7 SRE NOC/SOC.',
            icon: MapPin
          },
          {
            category: 'GLOBAL SRE',
            label: 'Follow-the-Sun Operations',
            href: '/practice-areas#engagement-models',
            desc: 'Continuous worldwide engineering coverage and sub-15 minute incident escalation.',
            icon: Clock
          }
        ]
      },
      {
        title: 'Careers & Engineering Culture',
        badge: 'CAREERS',
        icon: Users,
        items: [
          {
            category: 'OPEN ROLES',
            label: 'Open Engineering Positions',
            href: '/careers',
            desc: 'Join our team of frontier AI architects, GPU systems engineers, and forward deployed leads.',
            icon: Users
          },
          {
            category: 'ENGINEERING CULTURE',
            label: 'Culture of Systems Rigor',
            href: '/careers#culture',
            desc: 'Deterministic principles, first-principles problem solving, and zero operational fluff.',
            icon: Trophy
          },
          {
            category: 'TALENT BOOTCAMPS',
            label: 'Internal Advancement & Mentorship',
            href: '/careers#bootcamp',
            desc: 'Continuous technical upskilling and direct apprenticeship with Principal Engineers.',
            icon: Sparkles
          },
          {
            category: 'BENEFITS & IMPACT',
            label: 'Total Rewards & Relocation',
            href: '/careers#benefits',
            desc: 'Top-tier global compensation, equity participation, and worldwide mobility.',
            icon: Award
          }
        ]
      },
      {
        title: 'Client Deployments & Proof',
        badge: 'CASE STUDIES',
        icon: FileText,
        items: [
          {
            category: 'PRODUCTION CASE STUDIES',
            label: 'Enterprise Production Case Studies',
            href: '/case-studies',
            desc: 'Documented results in tier-1 banking, healthcare, manufacturing, and defense.',
            icon: FileText
          },
          {
            category: 'OUTCOME REVIEWS',
            label: 'Verified P&L Impact Dossiers',
            href: '/case-studies',
            desc: 'Audited balance-sheet ROI, compute cost reduction, and throughput acceleration.',
            icon: CheckCircle2
          },
          {
            category: 'CLIENT VOICES',
            label: 'Executive Testimonials & Reviews',
            href: '/case-studies#testimonials',
            desc: 'Perspectives from Fortune 500 CIOs, CTOs, and Heads of AI Infrastructure.',
            icon: Sparkles
          },
          {
            category: 'WHITE PAPERS',
            label: 'Whitepapers & Benchmarks',
            href: '/insights',
            desc: 'In-depth benchmarks on RoCEv2 fabrics, token economics, and model quantization.',
            icon: FileSpreadsheet
          }
        ]
      }
    ]
  },
  {
    id: 'trust',
    title: 'Trust & Governance',
    shortLabel: 'Governance',
    badge: 'SECURITY & TRUST',
    headerTitle: 'Enterprise Trust, Security & Compliance Standards',
    tagline: 'Formal mathematical explainability, SOC 2 compliance & post-quantum security.',
    ctaText: 'Explore Trust & Security →',
    ctaHref: '/privacy-policy',
    icon: ShieldCheck,
    categories: [
      {
        title: 'Certifications & Compliance',
        badge: 'AUDIT CERTIFICATIONS',
        icon: ShieldCheck,
        items: [
          {
            category: 'SOC 2 COMPLIANCE',
            label: 'SOC 2 Type II & ISO 27001',
            href: '/privacy-policy#compliance',
            desc: 'Independently audited operational security, availability, and confidentiality controls.',
            icon: ShieldCheck
          },
          {
            category: 'HEALTHCARE COMPLIANCE',
            label: 'HIPAA & FDA 21 CFR Part 11',
            href: '/privacy-policy#compliance',
            desc: 'Protected health information (PHI) safeguards and validated clinical workflows.',
            icon: Lock
          },
          {
            category: 'GLOBAL DATA PRIVACY',
            label: 'GDPR, CCPA & Sovereignty',
            href: '/privacy-policy',
            desc: 'Strict localized data processing guarantees and zero unauthorized cross-border transfer.',
            icon: Globe2
          },
          {
            category: 'NIST AI RMF',
            label: 'NIST AI Risk Management Framework',
            href: '/privacy-policy#framework',
            desc: 'Governed lifecycle mapping, measurement, and management of AI systemic risk.',
            icon: CheckCircle2
          }
        ]
      },
      {
        title: 'Security Architecture',
        badge: 'DEFENSE-IN-DEPTH',
        icon: Lock,
        items: [
          {
            category: 'POST-QUANTUM',
            label: 'Post-Quantum Crypto & CBOM',
            href: '/solutions/ai-networking-cybersecurity',
            desc: 'Quantum-safe key exchange and Cryptographic Bill of Materials across all fabrics.',
            icon: Lock
          },
          {
            category: 'AIR-GAPPED RUNTIMES',
            label: 'Air-Gapped Sovereign Deployment',
            href: '/solutions/ai-infra-engineering',
            desc: 'Complete physical isolation for defense, intelligence, and high-security enterprises.',
            icon: Building2
          },
          {
            category: 'ZERO DATA RETENTION',
            label: 'Zero-Data-Retention Agreements',
            href: '/privacy-policy',
            desc: 'Contractually guaranteed zero logging of prompts, completions, and enterprise embeddings.',
            icon: ShieldAlert
          },
          {
            category: 'CONTINUOUS SOC',
            label: '24/7 Autonomous SOC Defense',
            href: '/solutions/ai-networking-cybersecurity',
            desc: 'Sub-minute autonomous threat detection and behavioral isolation.',
            icon: Activity
          }
        ]
      },
      {
        title: 'Policies & Responsible AI',
        badge: 'RESPONSIBLE AI',
        icon: FileText,
        items: [
          {
            category: 'LEGAL NOTICE',
            label: 'Privacy Policy & Terms of Service',
            href: '/privacy-policy',
            desc: 'Comprehensive enterprise privacy notice, data usage rights, and terms of service.',
            icon: FileText
          },
          {
            category: 'RESPONSIBLE AI',
            label: 'Responsible AI & Ethics Charter',
            href: '/about#ethics',
            desc: 'Deterministic safety boundaries, bias prevention, and transparency commitments.',
            icon: Sparkles
          },
          {
            category: 'SECURITY ADVISORIES',
            label: 'Security Disclosures & Advisories',
            href: '/contact',
            desc: 'Vulnerability reporting protocols, bug bounty guidelines, and incident notices.',
            icon: AlertCircle
          },
          {
            category: 'TALK TO COUNSEL',
            label: 'Contact Legal & Compliance',
            href: '/contact',
            desc: 'Direct consultation with our Data Protection Officer and Corporate Counsel.',
            icon: ArrowUpRight
          }
        ]
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
  const [desktopPracticeTab, setDesktopPracticeTab] = useState<'engineering' | 'functional' | 'industry' | 'engagement' | 'value'>('engineering')
  const [desktopValueTab, setDesktopValueTab] = useState<string>('framework')
  const [desktopAgenticTab, setDesktopAgenticTab] = useState<string>('cognitive')
  const [desktopAboutTab, setDesktopAboutTab] = useState<string>('company')
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({
    'datacenter-cloud-fabric': true,
    'threat-detection-defense': true,
    'delivery-frameworks': true,
    'cognitive-architecture-swarms': true,
    'company-leadership': true,
    'practice-engineering': true
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
        setDesktopPracticeTab('engineering')
        setDesktopValueTab('framework')
        setDesktopAgenticTab('cognitive')
        setDesktopAboutTab('company')
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

        {/* 2. PRACTICE AREAS (5 DIVISIONS: ENGAGEMENT MODELS, ENGINEERING, CROSS-DOMAIN, INDUSTRY, VALUE ENGINEERING) */}
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
                {/* Left Side Bar: Clean Main Menu Only */}
                <div className="isi-mega-sidebar tg-clean-sidebar">
                  <div className="tg-sidebar-domain-switch" role="tablist" aria-label="Practice Areas">
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
                            <span className="tg-tab-title">{sec.title}</span>
                          </div>
                          <ChevronRight size={12} className="tg-tab-chevron" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right Structured Submenus Content Area */}
                {(() => {
                  const activeSection = practiceAreasFiveSections.find((s) => s.id === desktopPracticeTab) || practiceAreasFiveSections[0]
                  const ActiveIcon = activeSection.icon
                  return (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                      {/* Active Section Header Bar */}
                      <div
                        style={{
                          padding: '6px 14px',
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
                              borderRadius: '5px',
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
                              <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                                {activeSection.headerTitle}
                              </h4>
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#2563eb', background: 'rgba(37, 99, 235, 0.08)', padding: '1px 5px', borderRadius: '4px' }}>
                                {activeSection.badge}
                              </span>
                            </div>
                            <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                              {activeSection.tagline}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={activeSection.ctaHref}
                          className="isi-footer-action"
                          style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
                          onClick={closeAll}
                        >
                          <span>{activeSection.ctaText}</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>

                      {/* 3 Categorized Columns */}
                      <div
                        style={{
                          padding: '8px 12px',
                          overflowY: 'auto',
                          flex: 1,
                          display: 'flex'
                        }}
                      >
                        <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
                          {activeSection.categories.map((cat, cIdx) => {
                            const CatIcon = cat.icon
                            return (
                              <div key={cIdx} className="tg-category-col">
                                <div className="tg-category-col-header">
                                  <div className="tg-category-col-left">
                                    <CatIcon size={12} className="text-blue-600" />
                                    <span className="tg-category-col-title">{cat.title}</span>
                                  </div>
                                  <span className="tg-category-col-badge">{cat.badge}</span>
                                </div>

                                <div className="tg-category-items-stack">
                                  {cat.items.map((item, iIdx) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={iIdx}
                                        href={item.href}
                                        className="tg-compact-menu-card"
                                        title={item.label}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="tg-compact-icon-box">
                                          <ItemIcon size={13} />
                                        </div>
                                        <div className="tg-compact-card-body">
                                          <div className="tg-compact-card-head">
                                            <span className="tg-compact-card-title">{item.label}</span>
                                            <ArrowRight size={11} className="tg-compact-arrow" />
                                          </div>
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

        {/* 3. AI VALUE ENGINEERING (UNIFIED WITH COMMON FOUNDATION) */}
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
            <div className="isi-mega-panel isi-mega-value isi-mega-practice-areas tg-tabbed-mega">
              <div className="isi-mega-layout">
                {/* Left Side Bar: Clean Main Menu Only */}
                <div className="isi-mega-sidebar tg-clean-sidebar">
                  <div className="tg-sidebar-domain-switch" role="tablist" aria-label="AI Value Engineering">
                    {aiValueFiveSections.map((sec) => {
                      const SecIcon = sec.icon
                      const isActive = desktopValueTab === sec.id
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`tg-domain-tab-btn ${isActive ? 'active-networking' : ''}`}
                          onClick={() => setDesktopValueTab(sec.id)}
                          onMouseEnter={() => setDesktopValueTab(sec.id)}
                        >
                          <div className="tg-domain-tab-left">
                            <div
                              className={`tg-tab-icon-box ${isActive ? 'tg-icon-net' : ''}`}
                              style={!isActive ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                            >
                              <SecIcon size={14} />
                            </div>
                            <span className="tg-tab-title">{sec.title}</span>
                          </div>
                          <ChevronRight size={12} className="tg-tab-chevron" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right Structured Submenus Content Area */}
                {(() => {
                  const activeSection = aiValueFiveSections.find((s) => s.id === desktopValueTab) || aiValueFiveSections[0]
                  const ActiveIcon = activeSection.icon
                  return (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                      {/* Active Section Header Bar */}
                      <div
                        style={{
                          padding: '6px 14px',
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
                              borderRadius: '5px',
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
                              <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                                {activeSection.headerTitle}
                              </h4>
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#2563eb', background: 'rgba(37, 99, 235, 0.08)', padding: '1px 5px', borderRadius: '4px' }}>
                                {activeSection.badge}
                              </span>
                            </div>
                            <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                              {activeSection.tagline}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={activeSection.ctaHref}
                          className="isi-footer-action"
                          style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
                          onClick={closeAll}
                        >
                          <span>{activeSection.ctaText}</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>

                      {/* 3 Categorized Columns */}
                      <div
                        style={{
                          padding: '8px 12px',
                          overflowY: 'auto',
                          flex: 1,
                          display: 'flex'
                        }}
                      >
                        <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
                          {activeSection.categories.map((cat, cIdx) => {
                            const CatIcon = cat.icon
                            return (
                              <div key={cIdx} className="tg-category-col">
                                <div className="tg-category-col-header">
                                  <div className="tg-category-col-left">
                                    <CatIcon size={12} className="text-blue-600" />
                                    <span className="tg-category-col-title">{cat.title}</span>
                                  </div>
                                  <span className="tg-category-col-badge">{cat.badge}</span>
                                </div>

                                <div className="tg-category-items-stack">
                                  {cat.items.map((item, iIdx) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={iIdx}
                                        href={item.href}
                                        className="tg-compact-menu-card"
                                        title={item.label}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="tg-compact-icon-box">
                                          <ItemIcon size={13} />
                                        </div>
                                        <div className="tg-compact-card-body">
                                          <div className="tg-compact-card-head">
                                            <span className="tg-compact-card-title">{item.label}</span>
                                            <ArrowRight size={11} className="tg-compact-arrow" />
                                          </div>
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
                  )
                })()}
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>From operational methodology to measurable enterprise AI value: 3–10x verifiable ROI</span>
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

        {/* 4. AI AGENTIC ENTERPRISE */}
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
            <span>AI Agentic Enterprise</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'agentic' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'agentic' && (
            <div className="isi-mega-panel isi-mega-agentic isi-mega-practice-areas tg-tabbed-mega">
              <div className="isi-mega-layout">
                {/* Left Side Bar: Clean Main Menu Only */}
                <div className="isi-mega-sidebar tg-clean-sidebar">
                  <div className="tg-sidebar-domain-switch" role="tablist" aria-label="AI Agentic Enterprise">
                    {agenticEnterpriseThreeSections.map((sec) => {
                      const SecIcon = sec.icon
                      const isActive = desktopAgenticTab === sec.id
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`tg-domain-tab-btn ${isActive ? 'active-networking' : ''}`}
                          onClick={() => setDesktopAgenticTab(sec.id)}
                          onMouseEnter={() => setDesktopAgenticTab(sec.id)}
                        >
                          <div className="tg-domain-tab-left">
                            <div
                              className={`tg-tab-icon-box ${isActive ? 'tg-icon-net' : ''}`}
                              style={!isActive ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                            >
                              <SecIcon size={14} />
                            </div>
                            <span className="tg-tab-title">{sec.title}</span>
                          </div>
                          <ChevronRight size={12} className="tg-tab-chevron" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right Structured Submenus Content Area */}
                {(() => {
                  const activeSection = agenticEnterpriseThreeSections.find((s) => s.id === desktopAgenticTab) || agenticEnterpriseThreeSections[0]
                  const ActiveIcon = activeSection.icon
                  return (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                      {/* Active Section Header Bar */}
                      <div
                        style={{
                          padding: '6px 14px',
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
                              borderRadius: '5px',
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
                              <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                                {activeSection.headerTitle}
                              </h4>
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#2563eb', background: 'rgba(37, 99, 235, 0.08)', padding: '1px 5px', borderRadius: '4px' }}>
                                {activeSection.badge}
                              </span>
                            </div>
                            <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                              {activeSection.tagline}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={activeSection.ctaHref}
                          className="isi-footer-action"
                          style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
                          onClick={closeAll}
                        >
                          <span>{activeSection.ctaText}</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>

                      {/* 3 Categorized Columns */}
                      <div
                        style={{
                          padding: '8px 12px',
                          overflowY: 'auto',
                          flex: 1,
                          display: 'flex'
                        }}
                      >
                        <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
                          {activeSection.categories.map((cat, cIdx) => {
                            const CatIcon = cat.icon
                            return (
                              <div key={cIdx} className="tg-category-col">
                                <div className="tg-category-col-header">
                                  <div className="tg-category-col-left">
                                    <CatIcon size={12} className="text-blue-600" />
                                    <span className="tg-category-col-title">{cat.title}</span>
                                  </div>
                                  <span className="tg-category-col-badge">{cat.badge}</span>
                                </div>

                                <div className="tg-category-items-stack">
                                  {cat.items.map((item, iIdx) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={iIdx}
                                        href={item.href}
                                        className="tg-compact-menu-card"
                                        title={item.label}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="tg-compact-icon-box">
                                          <ItemIcon size={13} />
                                        </div>
                                        <div className="tg-compact-card-body">
                                          <div className="tg-compact-card-head">
                                            <span className="tg-compact-card-title">{item.label}</span>
                                            <ArrowRight size={11} className="tg-compact-arrow" />
                                          </div>
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
                  )
                })()}
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Governed AgentOps, continuous evaluation &amp; multi-agent swarms with SLA guarantees</span>
                </div>
                <Link
                  href="/solutions/ai-agentic-factory"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Explore Agentic Factory Blueprint</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 5. AI INFRA ENGINEERING */}
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
            <span>AI Infra Engineering</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'ai-infra' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'ai-infra' && (
            <AiInfraMegaMenu onNavigate={handleNavClick} onClose={closeAll} />
          )}
        </div>

        {/* 6. AI NETWORK AND CYBERSECURITY */}
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
            <span>AI Network and Cybersecurity</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'networking-cybersecurity' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'networking-cybersecurity' && (
            <div
              className="isi-mega-panel isi-mega-networking isi-mega-practice-areas tg-tabbed-mega"
              role="region"
              aria-label="AI Networking & Cybersecurity Mega Menu"
            >
              <div className="isi-mega-layout">
                {/* Left Side Bar: Clean Main Menu Only */}
                <div className="isi-mega-sidebar tg-clean-sidebar">
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
                        <div
                          className={`tg-tab-icon-box ${desktopActiveDomain === 'networking' ? 'tg-icon-net' : ''}`}
                          style={desktopActiveDomain !== 'networking' ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                        >
                          <Network size={14} />
                        </div>
                        <span className="tg-tab-title">AI Networking</span>
                      </div>
                      <ChevronRight size={12} className="tg-tab-chevron" />
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={desktopActiveDomain === 'cybersecurity'}
                      className={`tg-domain-tab-btn ${desktopActiveDomain === 'cybersecurity' ? 'active-networking' : ''}`}
                      onClick={() => setDesktopActiveDomain('cybersecurity')}
                      onMouseEnter={() => setDesktopActiveDomain('cybersecurity')}
                    >
                      <div className="tg-domain-tab-left">
                        <div
                          className={`tg-tab-icon-box ${desktopActiveDomain === 'cybersecurity' ? 'tg-icon-cyber' : ''}`}
                          style={desktopActiveDomain !== 'cybersecurity' ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                        >
                          <ShieldCheck size={14} />
                        </div>
                        <span className="tg-tab-title">AI Cybersecurity</span>
                      </div>
                      <ChevronRight size={12} className="tg-tab-chevron" />
                    </button>
                  </div>
                </div>

                {/* Right Structured Submenus Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                  {/* Active Section Header Bar */}
                  <div
                    style={{
                      padding: '6px 14px',
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
                          borderRadius: '5px',
                          background: desktopActiveDomain === 'networking' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                          color: desktopActiveDomain === 'networking' ? '#2563eb' : '#4f46e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {desktopActiveDomain === 'networking' ? <Network size={13} /> : <ShieldCheck size={13} />}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                            {desktopActiveDomain === 'networking' ? 'AI Networking Architecture' : 'AI Cybersecurity Architecture'}
                          </h4>
                          <span
                            style={{
                              fontSize: '9px',
                              fontWeight: 700,
                              color: desktopActiveDomain === 'networking' ? '#2563eb' : '#4f46e5',
                              background: desktopActiveDomain === 'networking' ? 'rgba(37, 99, 235, 0.08)' : 'rgba(79, 70, 229, 0.08)',
                              padding: '1px 5px',
                              borderRadius: '4px'
                            }}
                          >
                            {desktopActiveDomain === 'networking' ? 'ROCEV2 & 800G FABRIC' : 'ZERO TRUST & AI-SOC'}
                          </span>
                        </div>
                        <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                          {desktopActiveDomain === 'networking'
                            ? 'Ultra-low latency RoCEv2, WiFi 7, DWDM & space NTN fabric'
                            : 'Zero-trust IAM, continuous UEBA, SOAR & EDR runtime defense'}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/solutions/ai-networking-cybersecurity"
                      className="isi-footer-action"
                      style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
                      onClick={closeAll}
                    >
                      <span>Explore Solutions →</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>

                  {/* 3 Columns matching Group A, Group B, Group C */}
                  <div
                    style={{
                      padding: '8px 12px',
                      overflowY: 'auto',
                      flex: 1,
                      display: 'flex'
                    }}
                  >
                    <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
                      {(desktopActiveDomain === 'networking' ? networkingThematicGroups : cybersecurityThematicGroups).map((group) => {
                        const GroupIcon = group.icon
                        const isCyber = desktopActiveDomain === 'cybersecurity'
                        return (
                          <div key={group.id} className="tg-category-col">
                            <div className="tg-category-col-header">
                              <div className="tg-category-col-left">
                                <GroupIcon size={12} className={isCyber ? 'text-indigo-600' : 'text-blue-600'} />
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
                                    title={item.tooltip || item.label}
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
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>One common nervous system: unified NOC/SOC intelligence from WiFi 7 to hyperscale</span>
                </div>
                <Link
                  href="/solutions/ai-networking-cybersecurity"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Explore Master Solutions</span>
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
            <div className="isi-mega-panel isi-mega-about isi-mega-practice-areas tg-tabbed-mega">
              <div className="isi-mega-layout">
                {/* Left Side Bar: Clean Main Menu Only */}
                <div className="isi-mega-sidebar tg-clean-sidebar">
                  <div className="tg-sidebar-domain-switch" role="tablist" aria-label="About Us">
                    {aboutThreeSections.map((sec) => {
                      const SecIcon = sec.icon
                      const isActive = desktopAboutTab === sec.id
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`tg-domain-tab-btn ${isActive ? 'active-networking' : ''}`}
                          onClick={() => setDesktopAboutTab(sec.id)}
                          onMouseEnter={() => setDesktopAboutTab(sec.id)}
                        >
                          <div className="tg-domain-tab-left">
                            <div
                              className={`tg-tab-icon-box ${isActive ? 'tg-icon-net' : ''}`}
                              style={!isActive ? { background: '#f1f5f9', color: '#64748b' } : undefined}
                            >
                              <SecIcon size={14} />
                            </div>
                            <span className="tg-tab-title">{sec.title}</span>
                          </div>
                          <ChevronRight size={12} className="tg-tab-chevron" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right Structured Submenus Content Area */}
                {(() => {
                  const activeSection = aboutThreeSections.find((s) => s.id === desktopAboutTab) || aboutThreeSections[0]
                  const ActiveIcon = activeSection.icon
                  return (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0 }}>
                      {/* Active Section Header Bar */}
                      <div
                        style={{
                          padding: '6px 14px',
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
                              borderRadius: '5px',
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
                              <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                                {activeSection.headerTitle}
                              </h4>
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#2563eb', background: 'rgba(37, 99, 235, 0.08)', padding: '1px 5px', borderRadius: '4px' }}>
                                {activeSection.badge}
                              </span>
                            </div>
                            <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.25 }}>
                              {activeSection.tagline}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={activeSection.ctaHref}
                          className="isi-footer-action"
                          style={{ fontSize: '10.5px', padding: '3px 8px', flexShrink: 0 }}
                          onClick={closeAll}
                        >
                          <span>{activeSection.ctaText}</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>

                      {/* 3 Categorized Columns */}
                      <div
                        style={{
                          padding: '8px 12px',
                          overflowY: 'auto',
                          flex: 1,
                          display: 'flex'
                        }}
                      >
                        <div className="tg-thematic-columns-3" style={{ width: '100%' }}>
                          {activeSection.categories.map((cat, cIdx) => {
                            const CatIcon = cat.icon
                            return (
                              <div key={cIdx} className="tg-category-col">
                                <div className="tg-category-col-header">
                                  <div className="tg-category-col-left">
                                    <CatIcon size={12} className="text-blue-600" />
                                    <span className="tg-category-col-title">{cat.title}</span>
                                  </div>
                                  <span className="tg-category-col-badge">{cat.badge}</span>
                                </div>

                                <div className="tg-category-items-stack">
                                  {cat.items.map((item, iIdx) => {
                                    const ItemIcon = item.icon
                                    return (
                                      <Link
                                        key={iIdx}
                                        href={item.href}
                                        className="tg-compact-menu-card"
                                        title={item.label}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                      >
                                        <div className="tg-compact-icon-box">
                                          <ItemIcon size={13} />
                                        </div>
                                        <div className="tg-compact-card-body">
                                          <div className="tg-compact-card-head">
                                            <span className="tg-compact-card-title">{item.label}</span>
                                            <ArrowRight size={11} className="tg-compact-arrow" />
                                          </div>
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
                  )
                })()}
              </div>

              {/* Mega-Menu Footer */}
              <div className="isi-mega-footer">
                <div className="isi-footer-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Full-Spectrum AI Engineering Company with executive offices in US, Singapore &amp; India</span>
                </div>
                <Link
                  href="/about"
                  className="isi-footer-action"
                  onClick={closeAll}
                >
                  <span>Explore Company Profile</span>
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
                  {practiceAreasFiveSections.map((sec) => {
                    const SecIcon = sec.icon
                    const isDivOpen = !!mobileOpenGroups[`sec-${sec.id}`]
                    return (
                      <div key={sec.id} className="mobile-group-wrapper">
                        <button
                          type="button"
                          className="mobile-group-accordion-btn"
                          onClick={() => toggleMobileGroup(`sec-${sec.id}`)}
                          aria-expanded={isDivOpen}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <SecIcon size={12} className="text-blue-600 shrink-0" />
                            <span className="truncate">{sec.num}. {sec.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="mobile-group-count">{sec.categories.reduce((acc, c) => acc + c.items.length, 0)}</span>
                            <ChevronDown size={12} className={`chevron-icon transition-transform ${isDivOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {isDivOpen && (
                          <div className="mobile-group-body">
                            {sec.categories.map((cat, cIdx) => (
                              <div key={cIdx} style={{ margin: '4px 0 8px' }}>
                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em', padding: '3px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span>{cat.title}</span>
                                  <span style={{ fontSize: '8px', fontWeight: 600, color: '#94a3b8' }}>{cat.badge}</span>
                                </div>
                                {cat.items.map((item, i) => {
                                  const ItemIcon = item.icon
                                  return (
                                    <Link
                                      key={i}
                                      href={item.href}
                                      className="mobile-cap-card"
                                      onClick={(e) => handleNavClick(e, item.href)}
                                    >
                                      <div className="mobile-cap-icon">
                                        <ItemIcon size={12} />
                                      </div>
                                      <div className="mobile-cap-info">
                                        <span className="mobile-cap-title">{item.label}</span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
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
                  <Link href="/solutions/ai-value-engineering" className="mobile-sublink font-semibold text-blue-600 mb-1" onClick={closeAll}>
                    <span>★ AI Value Engineering Blueprint Overview →</span>
                  </Link>
                  {aiValueThematicGroups.map((group) => {
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
                            <span className="mobile-group-count">{group.items.length}</span>
                            <ChevronDown size={12} className={`chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mobile-group-body">
                            {group.items.map((item, i) => {
                              const ItemIcon = item.icon
                              const itemHref = item.href || `/solutions/ai-value-engineering#${item.id}`
                              return (
                                <Link
                                  key={i}
                                  href={itemHref}
                                  className="mobile-cap-card"
                                  onClick={(e) => handleNavClick(e, itemHref)}
                                >
                                  <div className="mobile-cap-icon">
                                    <ItemIcon size={12} />
                                  </div>
                                  <div className="mobile-cap-info">
                                    <span className="mobile-cap-title">{item.label}</span>
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

            {/* Mobile AI Agentic Enterprise Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('agentic')}
              >
                <span>AI Agentic Enterprise</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'agentic' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'agentic' && (
                <div className="mobile-accordion-body">
                  <Link href="/solutions/ai-agentic-factory" className="mobile-sublink font-semibold text-blue-600 mb-1" onClick={closeAll}>
                    <span>★ Agentic Enterprise Blueprint Overview →</span>
                  </Link>
                  {agenticEnterpriseThematicGroups.map((group) => {
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
                            <span className="mobile-group-count">{group.items.length}</span>
                            <ChevronDown size={12} className={`chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mobile-group-body">
                            {group.items.map((item, i) => {
                              const ItemIcon = item.icon
                              const itemHref = item.href || `/solutions/ai-agentic-factory#${item.id}`
                              return (
                                <Link
                                  key={i}
                                  href={itemHref}
                                  className="mobile-cap-card"
                                  onClick={(e) => handleNavClick(e, itemHref)}
                                >
                                  <div className="mobile-cap-icon">
                                    <ItemIcon size={12} />
                                  </div>
                                  <div className="mobile-cap-info">
                                    <span className="mobile-cap-title">{item.label}</span>
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

            {/* Mobile AI Infra Engineering Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('ai-infra')}
              >
                <span>AI Infra Engineering</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'ai-infra' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'ai-infra' && (
                <div className="mobile-accordion-body">
                  <MobileAiInfraAccordion onNavigate={handleNavClick} onClose={closeAll} />
                </div>
              )}
            </div>

            {/* Mobile AI Network and Cybersecurity Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('networking-cybersecurity')}
              >
                <span>AI Network and Cybersecurity</span>
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
                  <Link href="/about" className="mobile-sublink font-semibold text-blue-600 mb-1" onClick={closeAll}>
                    <span>About TRUSTGRID.AI Overview →</span>
                  </Link>

                  <div className="space-y-1.5 pt-1">
                    {aboutThematicGroups.map((group) => {
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
                              <span className="mobile-group-count">{group.items.length}</span>
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
                                    <div className="mobile-cap-icon mobile-cap-icon-blue">
                                      <ItemIcon size={12} />
                                    </div>
                                    <div className="mobile-cap-info">
                                      <span className="mobile-cap-title">{item.label}</span>
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
                </div>
              )}
            </div>

            <div className="mobile-cta-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <a
                  href="https://wa.me/919513088612?text=Hi%20TrustGrid%20India%20team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-ghost button-sm"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    borderColor: 'rgba(37, 211, 102, 0.4)',
                    color: '#25D366',
                    background: 'rgba(37, 211, 102, 0.08)',
                    fontSize: '11.5px',
                    padding: '8px 10px'
                  }}
                  onClick={() => {
                    closeAll()
                    if (typeof window !== 'undefined') {
                      trackWhatsAppClick('mobile_drawer_india', 'mobile_header', 'Mobile Drawer India WhatsApp')
                    }
                  }}
                >
                  <span>WhatsApp (IN)</span>
                </a>
                <a
                  href="https://wa.me/16507724145?text=Hi%20TrustGrid%20Americas%20team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-ghost button-sm"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    borderColor: 'rgba(37, 211, 102, 0.4)',
                    color: '#25D366',
                    background: 'rgba(37, 211, 102, 0.08)',
                    fontSize: '11.5px',
                    padding: '8px 10px'
                  }}
                  onClick={() => {
                    closeAll()
                    if (typeof window !== 'undefined') {
                      trackWhatsAppClick('mobile_drawer_us', 'mobile_header', 'Mobile Drawer US WhatsApp')
                    }
                  }}
                >
                  <span>WhatsApp (US)</span>
                </a>
              </div>
              <Link
                href="/contact"
                className="button button-primary button-full"
                onClick={closeAll}
              >
                <span>Contact Enterprise Advisory</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
