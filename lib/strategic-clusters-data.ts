import {
  Layers,
  Building2,
  Cpu,
  Zap,
  Network,
  Workflow,
  ShieldCheck,
  Cable,
  Satellite,
  Leaf,
  Boxes,
  BarChart3,
  TrendingUp,
  Activity,
  Server,
  Cloud,
  Globe2,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Briefcase,
  DollarSign,
  Lock,
  Compass,
  FileSpreadsheet,
  Target
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface StrategicServiceItem {
  title: string
  desc: string
  href: string
  icon: LucideIcon
}

export interface StrategicCluster {
  id: string
  number: string
  title: string
  shortTitle: string
  description: string
  icon: LucideIcon
  ctaText: string
  ctaHref: string
  services: StrategicServiceItem[]
}

export const strategicClustersData: StrategicCluster[] = [
  {
    id: 'infrastructure-build',
    number: '01',
    title: 'AI-Ready Infrastructure Build',
    shortTitle: 'Infrastructure Build',
    description: 'End-to-end delivery of AI factories — from land control to full-load commissioning — engineered for next-generation GPU densities and tropical climates.',
    icon: Building2,
    ctaText: 'Explore AI Factory Build',
    ctaHref: '/solutions/ai-infra-engineering#core-offerings',
    services: [
      {
        title: 'Site Identification & Control Program',
        desc: 'Geospatial + power-grid analytics, due diligence, purchase / long-term lease / JV structuring.',
        href: '/solutions/ai-infra-engineering#lifecycle',
        icon: Compass
      },
      {
        title: 'AI Factory Concept & Detailed Design',
        desc: 'Structural, MEP, high-density hall design, Tier III/IV readiness, digital-twin handover.',
        href: '/solutions/ai-infra-engineering#high-density-engineering',
        icon: Building2
      },
      {
        title: 'Turnkey EPC & Commissioning',
        desc: 'Single-accountable design-build-execute, L1–L5 scripted IST, cold-start <10 min, Tier certification.',
        href: '/solutions/ai-infra-engineering#delivery-models',
        icon: Boxes
      },
      {
        title: 'Whitespace Fit-Out & Rack-Ready Delivery',
        desc: 'Tenant-ready containment layers, busways, and structured cabling between shell and full build.',
        href: '/solutions/ai-infra-engineering#core-offerings',
        icon: Layers
      },
      {
        title: 'Retrofit & Densification Projects',
        desc: 'Upgrading existing legacy facilities to high-density, liquid-ready AI computing standards.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: SlidersHorizontal
      },
      {
        title: 'Power-Grid Feasibility & Dual-Feed Planning',
        desc: 'High-voltage grid ingress, substation interconnects & transmission capacity planning.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: Zap
      },
      {
        title: 'CFD, Microclimate & Floor-Loading Engineering',
        desc: 'Computational fluid dynamics, hot-aisle containment & heavy rack floor-loading engineering.',
        href: '/solutions/ai-infra-engineering#high-density-engineering',
        icon: Activity
      },
      {
        title: 'OEM & Supply-Chain Coordination',
        desc: 'Direct silicon vendor coordination (Blackwell/Hopper), long-lead transformers & CDU delivery.',
        href: '/solutions/ai-infra-engineering#core-offerings',
        icon: Cpu
      },
      {
        title: 'Zero-Harm HSE & Quality Gateways',
        desc: 'Industrial construction safety standards, quality control & operational readiness gateways.',
        href: '/solutions/ai-infra-engineering#delivery-models',
        icon: ShieldCheck
      }
    ]
  },
  {
    id: 'power-cooling',
    number: '02',
    title: 'Power, Cooling & High-Density Systems',
    shortTitle: 'Power & Cooling Systems',
    description: 'Power and thermal systems purpose-built for AI step-loads, liquid cooling, and continuous high utilization — delivering industry-leading efficiency.',
    icon: Zap,
    ctaText: 'Explore Power & Cooling',
    ctaHref: '/solutions/ai-infra-engineering#power-cooling',
    services: [
      {
        title: 'Power Distribution & Resiliency Systems',
        desc: '33/66/220 kV feeds, 2N/N+1 UPS with Li-ion BESS fast discharge for AI step-load smoothing.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: Zap
      },
      {
        title: 'Direct Liquid Cooling Systems (DLC)',
        desc: 'Cold plates with 35–45 °C warm-water supply, N+1 CDU loops & manifold distribution.',
        href: '/solutions/ai-infra-engineering#high-density-engineering',
        icon: Flame
      },
      {
        title: 'Immersion Cooling Systems',
        desc: 'Single- and two-phase dielectric immersion solutions for ultra-dense >100 kW/rack compute.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: Layers
      },
      {
        title: 'Thermal Retrofit Packages',
        desc: 'Converting air-cooled enterprise halls to high-density liquid-ready AI environments.',
        href: '/solutions/ai-infra-engineering#high-density-engineering',
        icon: SlidersHorizontal
      },
      {
        title: 'PUE Engineering & Continuous Optimization',
        desc: 'Design and operational thermal programs targeting ultra-efficient PUE < 1.15 in all climates.',
        href: '/solutions/ai-infra-engineering#lifecycle-metrics',
        icon: BarChart3
      },
      {
        title: 'Substation & HT Ingress Engineering',
        desc: 'Dedicated on-site substations, gas-insulated switchgear & grid interconnection agreements.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: Building2
      },
      {
        title: 'UPS / BESS Integration & Sizing',
        desc: 'Lithium-ion energy storage systems (BESS) engineered for dynamic sub-second generator ride-through.',
        href: '/solutions/ai-infra-engineering#power-cooling',
        icon: Activity
      },
      {
        title: 'Adiabatic + Indirect Evaporative Cooling',
        desc: 'Hybrid heat rejection solutions minimizing water consumption with zero cooling tower plume.',
        href: '/solutions/ai-infra-engineering#energy-green-power',
        icon: Leaf
      },
      {
        title: 'Continuous Thermal Telemetry & Tuning',
        desc: 'In-rack heat flux sensor arrays, dynamic flow valves & closed-loop thermal balancing.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: SlidersHorizontal
      }
    ]
  },
  {
    id: 'datacenter-operations',
    number: '03',
    title: 'Data Center Operations',
    shortTitle: 'Data Center Operations',
    description: 'Full-stack, AI-native operations that treat the data center as a living system — from chiller pumps and optical links to GPU tensor cores and cloud control planes.',
    icon: Activity,
    ctaText: 'Explore AI Data Center Operations',
    ctaHref: '/solutions/ai-infra-engineering#ai-dcim-ops',
    services: [
      {
        title: 'Network Operations (NetOps)',
        desc: '400G/800G lossless fabrics, RoCEv2 / InfiniBand, DCI, IX peering & cloud on-ramps.',
        href: '/solutions/ai-networking#lossless-fabrics',
        icon: Network
      },
      {
        title: 'Cloud & Orchestration Ops',
        desc: 'Hybrid / multi-cloud orchestration, sovereign on-ramps & distributed workload placement.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: Cloud
      },
      {
        title: 'AI-DCIM & Environmental Telemetry',
        desc: 'Real-time power, cooling, spatial and ambient sensor telemetry with digital-twin mapping.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: SlidersHorizontal
      },
      {
        title: 'GPU Fleet Operations',
        desc: 'Accelerator health monitoring, ECC error trapping, kernel profiling & utilization tuning.',
        href: '/solutions/ai-infra-engineering#high-density-engineering',
        icon: Cpu
      },
      {
        title: 'Facility & Critical Operations',
        desc: 'Mission-critical power trains, liquid cooling loops, BESS management & physical security.',
        href: '/solutions/ai-infra-engineering#delivery-models',
        icon: Server
      },
      {
        title: 'Mission-Critical NOC & Smart Hands',
        desc: '24×7 real-time monitoring, Tier 3/4 engineering dispatch & rapid physical intervention.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: ShieldCheck
      },
      {
        title: 'AIOps Predictive Maintenance',
        desc: 'Predictive failure analysis across coolant pumps, power modules and optical transceivers.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: Workflow
      },
      {
        title: 'Managed GPU & AI Factory Operations',
        desc: 'Slurm / Kubernetes scheduler tuning, multi-tenant partitioning & continuous OEE tracking.',
        href: '/solutions/ai-infra-engineering#lifecycle-metrics',
        icon: Boxes
      },
      {
        title: 'Closed-Loop Autonomous Self-Healing',
        desc: 'Automated telemetry triggers for rerouting network traffic and dynamic fan/pump speeds.',
        href: '/solutions/ai-infra-engineering#ai-dcim-ops',
        icon: Activity
      }
    ]
  },
  {
    id: 'sales-revenue-acceleration',
    number: '04',
    title: 'Data Center Services Sales & Revenue Acceleration',
    shortTitle: 'Commercial & Revenue Engine',
    description: "The commercial engine that converts TrustGrid's technical differentiation into booked, recurring, high-margin revenue.",
    icon: TrendingUp,
    ctaText: 'Explore Revenue Acceleration',
    ctaHref: '/solutions/ai-value-engineering',
    services: [
      {
        title: 'Hyperscale & Wholesale Capacity Products',
        desc: 'Custom reserved MW capacity tranches with guaranteed density, power and latency SLAs.',
        href: '/solutions/ai-infra-engineering#core-offerings',
        icon: Building2
      },
      {
        title: 'Build-to-Suit & Build-to-Scale Campuses',
        desc: 'Dedicated single-tenant AI campuses engineered to client hardware and security specs.',
        href: '/solutions/ai-infra-engineering#delivery-models',
        icon: Boxes
      },
      {
        title: 'Sovereign & Regulated Deployment Packages',
        desc: 'In-country sovereign AI compliance, air-gapped security & regulatory hosting packages.',
        href: '/solutions/ai-cybersecurity-quantum-safe#air-gapped-sovereign',
        icon: ShieldCheck
      },
      {
        title: 'Interconnection & Ecosystem Services',
        desc: 'Direct cross-connects, peering fabrics, multi-tenant exchange & low-latency carrier meshes.',
        href: '/solutions/ai-networking#dci-interconnect',
        icon: Network
      },
      {
        title: 'Managed & Value-Added Services Attach',
        desc: 'GPU-as-a-Service, managed Kubernetes orchestration & white-glove AI engineering attach.',
        href: '/solutions/ai-infra-engineering#lifecycle-metrics',
        icon: Briefcase
      },
      {
        title: 'CLS & Satellite Gateway Monetization',
        desc: 'Monetizing subsea cable landing stations and LEO satellite ground connectivity streams.',
        href: '/solutions/ai-infra-engineering#cable-landing',
        icon: Satellite
      },
      {
        title: 'Pre-Leasing & Anchor-Tenant Structuring',
        desc: 'Structuring institutional off-take agreements, anchor tenants & commercial terms.',
        href: '/solutions/ai-value-engineering#job-plan-stages',
        icon: DollarSign
      },
      {
        title: 'Capacity Roadmap & Phasing Advisory',
        desc: 'Multi-year enterprise AI compute expansion forecasting and staged capacity reservation.',
        href: '/solutions/ai-value-engineering#ledger-economics',
        icon: Compass
      },
      {
        title: 'Solution-Selling Playbooks & TCO Calculators',
        desc: 'CFO-defensible unit economics, token cost models & immersive virtual facility walkthroughs.',
        href: '/solutions/ai-value-engineering#operating-system',
        icon: Target
      }
    ]
  },
  {
    id: 'strategic-advisory',
    number: '05',
    title: 'Strategic Advisory, Energy & Sovereignty',
    shortTitle: 'Strategic Advisory & Sovereignty',
    description: 'One accountable partner from concept through financing, energy strategy, security architecture and transfer — delivering investment-ready, sustainable and sovereign-grade AI infrastructure.',
    icon: ShieldCheck,
    ctaText: 'Explore Strategic Advisory',
    ctaHref: '/solutions/ai-infra-engineering#delivery-models',
    services: [
      {
        title: 'Turnkey DBOT / DBFO Delivery Suite',
        desc: 'Design, Build, Operate, Transfer & Finance frameworks delivering complete single accountability.',
        href: '/solutions/ai-infra-engineering#delivery-models',
        icon: Boxes
      },
      {
        title: 'Investment Development & Capital Formation',
        desc: 'Equity/debt financial modeling, institutional capital partnering & project IRR maximization.',
        href: '/solutions/ai-value-engineering#value-currencies',
        icon: DollarSign
      },
      {
        title: 'Green Power & Renewable PPAs',
        desc: 'Corporate Power Purchase Agreements (PPAs), solar/hydro integration & net-zero roadmaps.',
        href: '/solutions/ai-infra-engineering#energy-green-power',
        icon: Leaf
      },
      {
        title: 'AI Security, Compliance & Sovereignty',
        desc: 'Post-Quantum Cryptography (PQC), ISO 27001, Tier III/IV certifications & national governance.',
        href: '/solutions/ai-cybersecurity-quantum-safe#regulatory-compliance',
        icon: ShieldCheck
      },
      {
        title: 'Subsea Cable Landing & Satellite Gateways',
        desc: 'Turnkey beach manholes, wet-plant connectivity & 9 Tbps satellite ground stations.',
        href: '/solutions/ai-infra-engineering#cable-landing',
        icon: Cable
      },
      {
        title: 'Techno-Commercial PMO Governance',
        desc: 'Rigorous 9-Pillars PMO governance, risk registers, critical path analysis & milestone gating.',
        href: '/solutions/ai-infra-engineering#lifecycle',
        icon: FileSpreadsheet
      },
      {
        title: 'Regulatory & Data Sovereignty Policy',
        desc: 'Advisory on sovereign data boundary mandates, EU AI Act conformity & national AI security.',
        href: '/solutions/ai-cybersecurity-quantum-safe#pqc-cbom',
        icon: Globe2
      },
      {
        title: 'Asset Monetization & Refinancing Readiness',
        desc: 'Infrastructure securitization, operational valuation optimization & exit structuring.',
        href: '/solutions/ai-value-engineering#ledger-economics',
        icon: TrendingUp
      },
      {
        title: 'Lifecycle Metrics & Cost-Per-Token Economics',
        desc: 'Applying Lean, TOC & DMAIC to reduce token generation cost and maximize infrastructure yield.',
        href: '/solutions/ai-infra-engineering#lifecycle-metrics',
        icon: BarChart3
      }
    ]
  }
]
