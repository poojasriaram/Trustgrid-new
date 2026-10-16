import {
  Network,
  Lock,
  ShieldCheck,
  Cpu,
  Zap,
  Workflow,
  Satellite,
  Cable,
  Plane,
  Building2,
  Factory,
  Radio,
  Wifi,
  Globe2,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  Activity,
  BarChart3,
  Target,
  Layers,
  ShieldAlert,
  Server,
  FileSpreadsheet,
  Boxes,
  Compass,
  Briefcase,
  Users,
  TrendingUp
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ============================================================================
// 1. SECTOR PORTFOLIOS (7 SECTORS, 12 OFFERINGS EACH, 84 TOTAL)
// ============================================================================

export interface OfferingItem {
  id: number
  phase: 'Plan' | 'Design' | 'Implement' | 'Operate'
  title: string
  description: string
}

export interface SectorPortfolio {
  id: string
  title: string
  badge: string
  icon: LucideIcon
  wifiEmphasis: string
  offeringsCount: number
  capabilitiesCount: number
  phasesSummary: string
  tagline: string
  overview: string
  offerings: OfferingItem[]
  capabilities: string[]
  solutionsUseCases: {
    title: string
    description: string
  }[]
  valueOutcomes: string[]
  crossDomainSynergy: string
}

export const sectorPortfolios: SectorPortfolio[] = [
  {
    id: 'enterprises',
    title: 'Enterprises',
    badge: 'Enterprise LAN/WAN & WiFi',
    icon: Building2,
    wifiEmphasis: 'High',
    offeringsCount: 12,
    capabilitiesCount: 6,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Zero-trust enterprise networking and Cognitive WiFi 7 with unified NOC/SOC intelligence.',
    overview: 'Full-stack enterprise connectivity integrating Gigabit/multi-gigabit Ethernet underlays, cognitive wireless fabrics, and autonomous threat containment across office, remote, and agentic AI estates.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'Enterprise WiFi & Access Fabric Assessment',
        description: 'Spectrum/RF baseline, capacity and client-experience scoring, identity integration review, AI-readiness and device-fleet profiling; prioritization of Cognitive WiFi + zero-trust upgrades.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Security Posture, Threat Model & CBOM Discovery',
        description: 'Attack-surface mapping across LAN/WAN/WiFi/agents; cryptographic bill-of-materials discovery; compliance gap analysis (EU AI Act, NIST AI RMF, ISO 42001).'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'AIOps Readiness & Business-Case Diagnostic',
        description: 'Automation maturity, telemetry coverage, NOC/SOC workflow review; unit-economics benchmark and 90-day value realization plan.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'Zero-Trust Cognitive WiFi 7 Architecture Blueprint',
        description: 'AI-RRM design, dynamic segmentation, WPA3 + MACsec, PQC-ready cryptography, continuous attestation, and campus-gateway-scale roaming design.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Secure Multi-Gig WiFi 7 + LAN/WAN Integration Design',
        description: 'Wired underlay (Gigabit/multi-gig Ethernet), SD-WAN overlay, EVPN-VXLAN multi-tenancy, policy-based micro-segmentation, and hybrid RoCEv2/Ethernet paths for AI traffic.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'AI NOC & Cross-Domain Telemetry Architecture',
        description: 'Telemetry pipelines (WiFi/LAN/WAN/agent/model), correlation and self-healing playbooks, SOC feed design, dashboards and SLAs.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'Cognitive WiFi 7 Deployment & Zero-Trust Onboarding',
        description: 'Production rollout with continuous device/user/agent attestation; ephemeral SPIFFE/SPIRE identities; automated policy enforcement at the AP edge.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'AI NOC Stand-Up with In-Band Telemetry',
        description: 'INT deployment, silent-drop detection (<100 ms target), root-cause automation, and predictive link/interference degradation alerts.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Secure Fabric Integration & Quantum-Ready Encryption Rollout',
        description: 'MACsec/PQC enablement, segmentation rollout, SOC integration, and compliance evidence pipelines.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization Sprint (RF + Wired + Collective Tuning)',
        description: 'Continuous AI-RRM optimization, congestion control, client steering; latency and tail-latency tuning for AI workloads (30–60% lower target).'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous AIOps Self-Healing & Threat-Hunting Service',
        description: 'Autonomous remediation (70–80% target), sub-minute containment feeding the AI SOC, adaptive policy updates.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Enterprise Access Fabric with Value Dashboards',
        description: '24/7 managed operations, CBOM currency, compliance evidence, and board-level performance & risk dashboards.'
      }
    ],
    capabilities: [
      'AI-driven real-time RF optimization and client steering with measurable capacity and experience gains.',
      'Zero-trust dynamic segmentation and continuous attestation from the WiFi edge to the core.',
      'Autonomous AI NOC with 70–80% self-healing remediation across wireless and wired estates.',
      'Seamless multi-gig WiFi 7 integration with Gigabit Ethernet and SD-WAN underlays.',
      'Full CBOM visibility and PQC-ready encryption for all wireless and wired cryptographic assets.',
      'Unified telemetry feeding both performance optimization and AI SOC threat hunting.'
    ],
    solutionsUseCases: [
      {
        title: 'Zero-Trust Campus-to-Cloud WAN',
        description: 'WiFi 6/7 access control + Gigabit Ethernet underlay + SD-WAN, delivering 30–60% lower AI workload latency and 60–80% MTTR reduction while enforcing policy-based micro-segmentation and quantum-ready MACsec.'
      },
      {
        title: 'Compliance-as-Code & Predictive Breach Simulation',
        description: 'Auto-generated EU AI Act / NIST AI RMF evidence from network and agent audit logs; historical traffic patterns replayed against current guardrails.'
      },
      {
        title: 'AI-Ready Hybrid Workplace',
        description: 'Dense offices, IoT, and agentic AI workloads with real-time assurance and SOC correlation for prompt-injection / anomalous agent detection.'
      }
    ],
    valueOutcomes: [
      'Board-level single pane quantifying performance yield and cyber exposure reduction together.',
      '60–80% MTTR reduction and sub-minute containment for security events (targets).',
      'Automated compliance evidence and full cryptographic auditability.'
    ],
    crossDomainSynergy: 'Enterprise NOC telemetry becomes the early-warning feed for SOC anomaly detection; the same autonomous remediation engines that heal congested LAN segments also isolate compromised agent sessions.'
  },
  {
    id: 'data-centers',
    title: 'Data Centers / Hyperscale',
    badge: 'Lossless AI Factories & GPU Clusters',
    icon: Cpu,
    wifiEmphasis: 'Edge access & operations layer',
    offeringsCount: 12,
    capabilitiesCount: 7,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Non-blocking, zero-loss RoCEv2 and InfiniBand fabrics engineered for thousands of GPUs.',
    overview: 'Purpose-engineered interconnects, collective communications optimization, and confidential compute enclaves maximizing effective GPU throughput while eliminating lateral cyber attack vectors.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'AI Fabric Readiness & Congestion Baseline Assessment',
        description: 'Topology audit (rail-optimized / Fat-Tree / Dragonfly+), PFC/DCQCN tuning review, tail-latency and microburst analysis, optics/cabling audit, job-completion-time baseline.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Secure AI Factory Threat Model & CBOM Discovery',
        description: 'Model theft/hijack, agent abuse, and supply-chain risk mapped to MITRE ATLAS; crypto inventory across the fabric; Harvest-Now-Decrypt-Later exposure scan.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'Edge Access & Operations Readiness Review',
        description: 'WiFi/management-access layer assessment for operators, tools, and temporary AI workloads onto the lossless core.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'Lossless RoCEv2 / Spectrum-X / InfiniBand-Class Topology Design',
        description: 'Non-blocking design with front-end/back-end separation; rail-optimized and Dragonfly+/Fat-Tree options; 400G/800G/1.6T optics plan.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Collective Communications & GPUDirect Storage Architecture',
        description: 'NCCL/RCCL tuning strategy, storage-network design, congestion-control pipeline (DCQCN/PFC), and buffer modelling.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'Zero-Trust Micro-Segmentation & Confidential-Compute Design',
        description: 'VRFs, hardware MACsec/PQC in optics, TEE-based confidential compute (H100/B200-class), model-weight signing, and tenant isolation.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'High-Density Optical & Liquid-Cooled Fabric Implementation',
        description: 'Build-out of the lossless fabric with liquid-ready optics and hardware-accelerated encryption.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'AI NOC Deployment with In-Band Telemetry & Predictive Analytics',
        description: 'Packet-level INT, silent-drop detection, self-healing reroute, and <5-minute root-cause workflows (target).'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Secure Edge WiFi Management Access Layer',
        description: 'Zero-trust onboarding of operators and tools, with full telemetry correlation into the AI NOC/SOC.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for GPU Collective Workloads',
        description: 'Continuous congestion control, tail-latency reduction, >96% effective bandwidth target, and job-completion-time optimization.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Predictive Breach Simulation & Automated Containment',
        description: 'Synthetic attack injection, sub-second isolation of compromised inference nodes, and Harvest-Now-Decrypt-Later / agent-hijacking scenario replay.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Hyperscale AI NOC/SOC with Performance & Risk SLAs',
        description: 'Unified operations, continuous CBOM/PQC migration currency, and combined performance + security SLAs.'
      }
    ],
    capabilities: [
      'Non-blocking, zero-loss fabrics with >96% effective bandwidth under AI workloads.',
      'Sub-microsecond tail latency with automated collective-communications tuning.',
      'AI NOC with packet-level telemetry, silent-drop detection, and self-healing reroute.',
      'Hardware-accelerated MACsec / PQC and confidential-compute integration.',
      'Predictive congestion management and job-completion-time optimization.',
      'Unified security posture across front-end, back-end, and storage networks.',
      'Edge WiFi operator access tightly coupled to core fabric telemetry.'
    ],
    solutionsUseCases: [
      {
        title: 'Lossless Multi-Thousand-GPU Training Fabric',
        description: 'RoCEv2/InfiniBand with zero-trust workload identity, telemetry harvested for both performance OEE (>96% effective bandwidth) and cyber hunting.'
      },
      {
        title: 'Predictive Simulation of HNDL & Agent-Hijacking',
        description: 'Synthetic attacks continuously validate guardrails across the fabric against Harvest Now Decrypt Later campaigns and supply-chain compromises.'
      },
      {
        title: 'Hyperscale Edge Access & Operations',
        description: 'Cognitive WiFi / multi-gig access for operators and temporary workloads, zero-trust onboarding into the lossless core.'
      }
    ],
    valueOutcomes: [
      '20–50% higher effective GPU throughput and measurable reduction in AI-specific cyber-risk exposure.',
      'Full CBOM visibility and model-weight provenance.',
      'Sub-second threat isolation with <5-minute root-cause SLAs (targets).'
    ],
    crossDomainSynergy: 'Hyperscale fabric telemetry directly feeds campus and satellite edge security models; the same self-healing NOC that prevents training-job restarts supplies the SOC with precise lateral-movement signals.'
  },
  {
    id: 'campus',
    title: 'Campus Environments',
    badge: 'Cognitive WiFi 7 & Dense Multi-Tenant',
    icon: Wifi,
    wifiEmphasis: 'Very High (centerpiece domain)',
    offeringsCount: 12,
    capabilitiesCount: 6,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'High-density Cognitive WiFi 7 with seamless campus-gateway scale roaming and role-based zero-trust isolation.',
    overview: 'Transforming university, research, and corporate campuses with AI radio resource management, tenant-isolated dynamic segmentation, IoT radio platforms, and continuous anomalous device revocation.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'Multi-Tenant Campus Wireless & Fabric Assessment',
        description: 'RF/capacity baseline across dens; tenant/role mapping (students, faculty, research, IoT, guests); client-experience scoring.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Data Protection & Compliance Triage',
        description: 'Student/faculty data, research IP, and privacy regulation analysis with a gap-closure and evidence plan.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'High-Density Event & Peak Capacity Study',
        description: 'Stadium, lecture-hall, and class-change peak modelling; predictive capacity planning and event-readiness scoring.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'High-Density Cognitive WiFi 7 + Campus Gateway Design',
        description: 'AI-RRM, multi-link operation, seamless roaming at campus-gateway scale, and IoT radio integration.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Role-Based Zero-Trust Segmentation Design',
        description: 'Per-tenant/role dynamic segmentation and continuous profiling; policy design spanning wired and wireless.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'IoT Radio Platform & Location Services Design',
        description: 'BLE/Zigbee integration, precise location services, asset tracking, and secure onboarding workflows.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'Large-Scale WiFi 7 Deployment with Seamless Roaming',
        description: 'Thousands-of-AP deployment with continuous attestation and automated policy enforcement.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'AI NOC Stand-Up for Multi-Tenant Visibility',
        description: 'Unified telemetry correlation across WiFi controllers, LAN switches, and agent fleets with automated containment paths.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Research AI Cluster Isolation & Confidential-Compute Enablement',
        description: 'Micro-segmentation, TEEs, and immutable decision provenance for sensitive research workloads.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for Dense Academic Environments',
        description: 'AIOps-driven RF and client-experience optimization targeting 70–80% autonomous fixes.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous Client Insights & Anomalous Device Isolation → AI SOC',
        description: 'Behavior analytics with instant revocation of ephemeral tokens without disrupting legitimate traffic.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Campus Fabric Operations with Experience SLAs + Compliance Evidence',
        description: '24/7 operations with automated evidence generation for data-protection regulations.'
      }
    ],
    capabilities: [
      'AI-optimized high-density WiFi 7 with campus-gateway-scale seamless roaming.',
      'Fine-grained Dynamic Segmentation and continuous profiling per tenant/role.',
      'Autonomous AIOps remediation of RF and client-experience issues.',
      'Integrated IoT radios and precise location services on the same infrastructure.',
      'Real-time correlation of wireless health with security events in the AI SOC.',
      'Predictive capacity management for large events and class-change peaks.'
    ],
    solutionsUseCases: [
      {
        title: 'Multi-Tenant Campus Fabric',
        description: 'Isolating research AI clusters, student IoT, and administrative systems under a single NOC/SOC view with automated compliance evidence.'
      },
      {
        title: 'Cognitive WiFi Anomaly Detection & Token Revocation',
        description: 'Detects anomalous agent or device behavior and instantly revokes ephemeral tokens without disrupting legitimate traffic.'
      },
      {
        title: 'Smart Campus Operations Platform',
        description: 'Location services, IoT radio integration, and unified NOC/SOC across the entire campus estate.'
      }
    ],
    valueOutcomes: [
      'Secure, high-density wireless AI access with quantifiable reduction in mean-time-to-contain.',
      'Full auditability and privacy compliance evidence.',
      'Superior client experience (capacity + roaming) at event and stadium scale.'
    ],
    crossDomainSynergy: 'Campus edge telemetry enriches data-center and manufacturing anomaly models; the same PQC and zero-trust identity fabric spans campus WiFi through hyperscale interconnects.'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Mission-Critical OT',
    badge: 'Deterministic Wireless & OT/IT Convergence',
    icon: Factory,
    wifiEmphasis: 'High (URWB + private 5G convergence)',
    offeringsCount: 12,
    capabilitiesCount: 7,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Ultra-reliable wireless backhaul (<10ms latency, zero loss) and cyber-physical protection for AGVs and robotics.',
    overview: 'Converging industrial OT and AI-driven IT operations with deterministic make-before-break roaming, SCADA-aware security, vibration/sensor anomaly fusion, and least-privilege agent autonomy.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'OT/IT Convergence & Industrial Wireless Assessment',
        description: 'Deterministic latency requirements, mobility patterns (AGVs/robots), interference baseline, and safety-zone mapping.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Cyber-Physical Threat Model & Protocol Audit',
        description: 'SCADA/robotics protocol risk, sensor-poisoning exposure, and safety-impact analysis.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'Production Continuity & Downtime-Cost Study',
        description: 'OEE baseline, MTTR/MTTC cost model, and the resilience investment case.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'Deterministic WiFi + URWB / Private 5G Hybrid Design',
        description: '<10 ms latency and zero-packet-loss handoff design for moving assets, with multipath redundancy.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Zero-Trust Segmentation Design for Production vs. Enterprise Zones',
        description: 'Least-privilege agent permissions, dynamic segmentation, and safety-critical isolation.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'Mobile Asset (AGV/Robot) Connectivity Architecture',
        description: 'Roaming engineering, on-robot compute defense, and deterministic control paths.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'Ruggedized Cognitive WiFi + URWB Implementation',
        description: 'High-interference-tolerant deployment with industrial-grade APs and make-before-break mobility.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'AI NOC Deployment for Production-Line Visibility',
        description: 'OT-aware telemetry, microburst detection, and self-healing focused on zero packet loss.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Industrial CBOM & Protocol-Aware Hardening',
        description: 'Cryptographic inventory, protocol-aware firewalling, and continuous red-team validation of OT guardrails.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for Moving Assets & Low-Latency Control',
        description: 'Continuous RF/mobility optimization with deterministic performance assurance.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous Anomaly Detection (RF + SCADA + Agents) & Predictive Maintenance Correlation',
        description: 'Fusing vibration/sensor anomalies with network and model telemetry to prevent both downtime and cyber-physical attacks.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Mission-Critical Wireless Operations with Uptime SLAs',
        description: 'Automated containment, immutable provenance for regulatory and insurance purposes, 24/7 NOC/SOC.'
      }
    ],
    capabilities: [
      'Ultra-reliable wireless (URWB-style) with make-before-break handoffs, zero packet loss, and <10 ms latency.',
      'Seamless OT/IT convergence with Dynamic Segmentation into production zones.',
      'AI-driven anomaly detection fusing wireless, sensor, and agent telemetry.',
      'Ruggedized, high-interference-tolerant Cognitive WiFi and private 5G options.',
      'Autonomous AI NOC focused on zero packet loss for mobile assets.',
      'Continuous attestation and model defense for industrial AI/robotics.',
      'Predictive fault and threat detection that protects both uptime and safety.'
    ],
    solutionsUseCases: [
      {
        title: 'Converged Plant-Floor Fabric',
        description: 'Carrying both real-time control traffic and AI inference workloads, with least-privilege agent permissions and continuous red-team validation.'
      },
      {
        title: 'Predictive Fault-and-Threat Detection',
        description: 'Correlating vibration/sensor anomalies with network and model telemetry to preempt equipment failures and cyber intrusions.'
      },
      {
        title: 'Mobile Asset & Tele-Remote Operations Platform',
        description: 'URWB-style make-before-break roaming and multipath redundancy for high-speed automated guided vehicles in contested industrial environments.'
      }
    ],
    valueOutcomes: [
      'Higher production OEE; reduced MTTR for both operational and security incidents.',
      'Verifiable supply-chain resilience and immutable regulatory evidence.',
      'Safety-assured convergence of OT and IT domains.'
    ],
    crossDomainSynergy: 'Manufacturing OT telemetry informs satellite and aerospace remote-operations models; NOC self-healing that protects production lines also hardens cable-landing and data-center edge sites.'
  },
  {
    id: 'satellite',
    title: 'Satellite Networking',
    badge: 'NTN & Space-to-Ground Resilience',
    icon: Satellite,
    wifiEmphasis: 'Ground-station & remote-terminal access',
    offeringsCount: 12,
    capabilitiesCount: 6,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Multi-Tbps Non-Terrestrial Network integration with quantum-safe key exchange across space-ground links.',
    overview: 'Integrating orbital LEO/MEO/GEO assets and terrestrial ground stations with adaptive routing, SPIFFE/SPIRE agent identities, quantum-safe encryption, and self-healing under jamming.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'Ground-Segment & NTN Connectivity Assessment',
        description: 'Gateway/terminal estate review, link budgets, and capacity demand modelling (multi-Tbps class).'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Space-Segment Threat Model & PQC Readiness Review',
        description: 'Orbital/ground agent risks, quantum-safe migration planning, and sovereign / air-gapped requirements.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'Remote & Contested Operations Requirements Study',
        description: 'Environmental and jamming scenarios, resilience requirements, and temporary-site needs.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'Hybrid Satellite + Terrestrial Fabric Design',
        description: 'Adaptive routing across LEO/MEO/GEO and terrestrial segments; NTN integration; collective-communications tuning across space-ground.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Cognitive WiFi for Ground Stations & Remote Terminals Design',
        description: 'Ruggedized access, IoT/telemetry onboarding, and zero-trust integration.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'Zero-Trust Agent Identity & Quantum-Safe Key Exchange Design',
        description: 'SPIFFE/SPIRE-style identities for orbital and ground assets; PQC key exchange over intermittent links.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'High-Throughput Feeder & Ground WiFi Implementation',
        description: 'Optical/Ka/Ku feeder integration (multi-Tbps landing class) with ground WiFi rollout.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'Global AI NOC Stand-Up for Orbital + Ground Visibility',
        description: 'Continuous INT-style telemetry, silent-drop and link-degradation detection, and automated failover.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'PQC & Continuous Attestation Rollout for Space-Ground Flows',
        description: 'Quantum-safe cryptography deployment and attestation of satellite agents.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for Intermittent / High-Latency Links',
        description: 'Adaptive routing, link optimization, and collective tuning toward zero-loss performance.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous Link Health Prediction, Self-Healing & Failover',
        description: 'Predictive degradation detection and sub-minute containment even under jamming or cyber attack.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Global Satellite Networking Operations',
        description: 'Cross-domain threat correlation (satellite + terrestrial + subsea) under a unified NOC/SOC.'
      }
    ],
    capabilities: [
      'AI-optimized adaptive routing and capacity management across satellite links.',
      'Cognitive WiFi at ground stations tightly integrated with NTN backhaul.',
      'Quantum-safe cryptography and continuous attestation for remote/orbital agents.',
      'Global AI NOC with predictive link degradation and automated failover.',
      'Unified telemetry correlating space-segment health with cyber events.',
      'Self-healing global mesh maintaining zero-loss performance under jamming or attack.'
    ],
    solutionsUseCases: [
      {
        title: 'Real-Time Earth-Observation / Defense Pipeline',
        description: 'Orbital data downlinked directly into GPU clusters while enforcing PQC and continuous attestation of satellite agents.'
      },
      {
        title: 'Self-Healing Global Mesh',
        description: 'Maintaining zero-loss performance and sub-minute containment under jamming or electronic warfare attacks.'
      },
      {
        title: 'Remote & Contested Operations Solution',
        description: 'Portable/rugged WiFi + satellite backhaul with quantum-safe encryption and real-time NOC/SOC correlation.'
      }
    ],
    valueOutcomes: [
      'Uninterrupted mission data flows with full cryptographic and behavioral assurance.',
      'Predictive capacity and link management across intermittent links.',
      'Sovereign and air-gapped deployment options.'
    ],
    crossDomainSynergy: 'Satellite ground-station NOC/SOC shares threat intelligence and topology models with cable-landing stations and hyperscale data centers, creating a unified space-to-ground resilience fabric.'
  },
  {
    id: 'cable-landing',
    title: 'Cable Landing Stations',
    badge: 'Subsea DCI/DWDM & Optical Forensics',
    icon: Cable,
    wifiEmphasis: 'Landing-station access & operations',
    offeringsCount: 12,
    capabilitiesCount: 6,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Coherent DCI/DWDM interconnects with AI optical forensics distinguishing physical cuts from cyber interference.',
    overview: 'Engineering the critical international subsea junction with hardware MACsec/PQC, strict sovereign perimeters, and regional AI NOCs distinguishing physical fiber degradation from hostile tapping.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'Subsea Interconnect & Landing-Station Fabric Assessment',
        description: 'Capacity utilization, optical health, routing baseline, and DCI/DWDM review.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Sovereign & Regulatory Requirements Study',
        description: 'Data-perimeter, geolocation controls, and compliance obligations.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'Predictive Analytics Readiness Review',
        description: 'Telemetry coverage for fault-vs-threat differentiation and SOC integration readiness.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'High-Capacity Coherent DCI + Secure Access Design',
        description: 'Coherent DCI/DWDM with adaptive routing and quantum-ready interconnect fabric.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Zero-Trust Micro-Segmentation Design for Interconnect Zones',
        description: 'Segmentation of landing-station fabrics with hardware MACsec/PQC and CBOM.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'Predictive Optical + Traffic Intelligence Architecture',
        description: 'Anomaly models distinguishing fiber cuts from adversarial interference, plus capacity forecasting.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'Secure Multi-Gig Access & Optical Implementation',
        description: 'Landing-station build-out with multi-gig access and hardware encryption.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'Regional AI NOC Deployment with Optical Telemetry',
        description: 'Real-time optical + security correlation with forensic replay.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Quantum-Ready Encryption & CBOM Rollout for Interconnects',
        description: 'PQC migration with continuous cryptographic inventory.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for Subsea Capacity Utilization',
        description: 'Traffic engineering, congestion control, and predictive capacity management across high-capacity international links.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous Fault vs. Threat Differentiation Analytics & Threat Hunting',
        description: 'Correlating optical performance metrics with global threat feeds.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Landing-Station Operations with Sovereignty Controls',
        description: 'Global threat visibility, automated isolation, and sovereign-grade data-perimeter enforcement.'
      }
    ],
    capabilities: [
      'AI-driven traffic engineering and predictive capacity management across subsea links.',
      'Hardware MACsec / PQC and strict micro-segmentation of landing-station fabrics.',
      'Differentiated analytics that separate fiber faults from adversarial activity.',
      'Regional-to-global AI NOC with real-time optical and security correlation.',
      'Sovereign data-perimeter enforcement with full audit provenance.',
      'Global threat visibility with rapid automated isolation.'
    ],
    solutionsUseCases: [
      {
        title: 'Quantum-Ready Intercontinental Interconnect Fabric',
        description: 'Linking hyperscale AI factories while providing continuous cryptographic inventory and automated breach simulation.'
      },
      {
        title: 'Predictive Maintenance + Threat Hunting',
        description: 'Correlating optical performance with global threat feeds to distinguish physical faults from stealthy optical taps.'
      },
      {
        title: 'Sovereign Data Perimeter Fabric',
        description: 'Strict geolocation and policy controls maximizing effective capacity while enforcing national data sovereignty.'
      }
    ],
    valueOutcomes: [
      'Higher effective capacity utilization and lower outage risk.',
      'Sovereign-grade data-perimeter enforcement with immutable provenance.',
      'Early-warning indicators for data-center and manufacturing sites.'
    ],
    crossDomainSynergy: 'Cable-landing intelligence feeds satellite NTN optimization and enterprise WAN policy; shared NOC/SOC platforms turn subsea telemetry into early indicators for data-center and manufacturing sites.'
  },
  {
    id: 'aerospace',
    title: 'Aerospace & Air-Tech',
    badge: 'C2 Networking & Deterministic Avionics',
    icon: Plane,
    wifiEmphasis: 'High (ground ops, hangars, temporary sites)',
    offeringsCount: 12,
    capabilitiesCount: 6,
    phasesSummary: 'Plan 3 / Design 3 / Implement 3 / Operate 3',
    tagline: 'Deterministic command-and-control networking with TEMPEST-capable and air-gapped sovereign isolation.',
    overview: 'Air-to-ground-to-AI-factory data links, hangar and flight-line Cognitive WiFi, deterministic time-sensitive networking (TSN), and continuous adversarial red-teaming for flight-critical AI models.',
    offerings: [
      {
        id: 1,
        phase: 'Plan',
        title: 'Mission-Critical Wireless & Ground Operations Assessment',
        description: 'Hangar/tarmac/command-post connectivity, mobility, and determinism requirements.'
      },
      {
        id: 2,
        phase: 'Plan',
        title: 'Avionics & Air-Traffic Data-Flow Threat Model',
        description: 'Attack surfaces across ground and airborne systems with safety-assurance mapping.'
      },
      {
        id: 3,
        phase: 'Plan',
        title: 'Red-Team Readiness & Continuous Assurance Study',
        description: 'Adversarial testing plan for flight-ops AI, determinism, and replay requirements.'
      },
      {
        id: 4,
        phase: 'Design',
        title: 'Ultra-Reliable WiFi + URWB Design for Hangars & Moving Assets',
        description: 'Deterministic low latency with make-before-break and multipath design.'
      },
      {
        id: 5,
        phase: 'Design',
        title: 'Zero-Trust Command-and-Control Fabric Design',
        description: 'Identity for all agents/devices, PQC-protected links, and time-sensitive networking design.'
      },
      {
        id: 6,
        phase: 'Design',
        title: 'Avionics Data Flow & Air-Traffic Protection Architecture',
        description: 'Confidential compute for flight-critical models, hardware root-of-trust, and deterministic audit design.'
      },
      {
        id: 7,
        phase: 'Implement',
        title: 'Ruggedized Cognitive WiFi & Temporary Site Implementation',
        description: 'Rapid-deployment kits for field and contested environments.'
      },
      {
        id: 8,
        phase: 'Implement',
        title: 'Aerospace AI NOC/SOC Stand-Up with Deterministic Audit',
        description: 'Network + sensor + agent telemetry correlation, automated isolation, and incident replay.'
      },
      {
        id: 9,
        phase: 'Implement',
        title: 'Air-Gapped / TEMPEST-Capable Hardening',
        description: 'Sovereign deployment options, hardened communications, and air-gapped enclaves.'
      },
      {
        id: 10,
        phase: 'Operate',
        title: 'AI Networking Optimization for Flight Operations Connectivity',
        description: 'Collective-communications tuning and low-latency data fabric across air-ground-AI factories.'
      },
      {
        id: 11,
        phase: 'Operate',
        title: 'Continuous Red-Teaming & Automated Containment for Mission AI',
        description: 'Continuous adversarial testing of flight-operations agents with automated containment that meets the highest safety and security assurance levels.'
      },
      {
        id: 12,
        phase: 'Operate',
        title: 'Managed Aerospace C2 Networking Operations with Immutable Provenance',
        description: '24/7 operations with verifiable audit trails and sovereign controls.'
      }
    ],
    capabilities: [
      'Ultra-reliable wireless with deterministic low latency for moving and safety-critical assets.',
      'End-to-end zero-trust identity and continuous attestation across ground and airborne systems.',
      'AI NOC/SOC with deterministic audit trails and rapid containment.',
      'Continuous adversarial testing and model defense for flight-operations AI.',
      'Hybrid Cognitive WiFi + private cellular options for coverage and resilience.',
      'Full integration with satellite and core AI infrastructure under sovereign controls.'
    ],
    solutionsUseCases: [
      {
        title: 'Secure Air-Ground Data Fabric',
        description: 'Linking airborne platforms, ground stations, and AI factories — optimizing collective communications while enforcing zero-trust, PQC-protected agent identities.'
      },
      {
        title: 'Continuous Adversarial Testing of Mission Systems',
        description: 'Continuous adversarial testing of air-traffic and mission systems with automated containment meeting the highest assurance levels.'
      },
      {
        title: 'Integrated Command-and-Control Networking',
        description: 'Spanning ground stations, temporary sites, and core AI infrastructure with air-gapped options.'
      }
    ],
    valueOutcomes: [
      'Mission-assured resilience, verifiable audit trails, and deterministic incident replay.',
      'Reduced risk of both performance degradation and cyber-physical compromise.',
      'Full sovereign-control deployment flexibility.'
    ],
    crossDomainSynergy: 'Aerospace command-and-control NOC/SOC reuses the same telemetry and self-healing engines developed for satellite and hyperscale fabrics; manufacturing and campus lessons in OT/IT convergence directly inform avionics-ground convergence.'
  }
]

// ============================================================================
// 2. DELIVERY FRAMEWORK (PLAN -> DESIGN -> IMPLEMENT -> OPERATE + AIOPS)
// ============================================================================

export interface DeliveryPhase {
  phase: 'Plan' | 'Design' | 'Implement' | 'Operate' | 'AIOps'
  title: string
  objective: string
  typicalActivities: string[]
  keyOutputs: string[]
  automationFocus: string
}

export const deliveryPhases: DeliveryPhase[] = [
  {
    phase: 'Plan',
    title: 'Phase 01: Plan',
    objective: 'Establish objective baseline, empirical threat model, and investment business case.',
    typicalActivities: [
      'Technical interviews & passive telemetry capture',
      'RF / spectrum baseline & client experience scoring',
      'Full CBOM (Cryptographic Bill of Materials) discovery',
      'Lossless fabric latency, tail-latency, and loss baseline',
      'Unit-economics benchmarking & GPU TCO modeling',
      'Regulatory conformity scan (EU AI Act, NIST AI RMF, ISO 42001)'
    ],
    keyOutputs: [
      'Comprehensive Security & Fabric Posture Report',
      'Prioritized High-Yield Architecture Roadmap',
      '90-Day Value Realization Plan with verified KPIs',
      'Board-ready Risk & Return on Investment (ROI) Summary'
    ],
    automationFocus: 'Automated CBOM scanning & passive telemetry ingest.'
  },
  {
    phase: 'Design',
    title: 'Phase 02: Design',
    objective: 'Translate diagnostic findings into build-ready, zero-loss, quantum-safe architectures.',
    typicalActivities: [
      'Zero-trust dynamic segmentation & policy matrix modeling',
      'Lossless fabric topology engineering (RoCEv2 / InfiniBand / Spectrum-X)',
      'NCCL/RCCL collective-communications tuning strategies',
      'AI NOC/SOC unified telemetry pipeline architecture',
      'NIST PQC migration pathway (ML-KEM / ML-DSA hybrid)',
      'Cognitive WiFi 7 / URWB / private-5G high-density blueprints'
    ],
    keyOutputs: [
      'Build-ready Architecture Blueprints & Schematics',
      'Fine-grained Micro-Segmentation Policy Models',
      'Hardware Optical & Transceiver Wiring Schedules',
      'Deterministic Acceptance Testing & Validation Plans'
    ],
    automationFocus: 'Policy-as-code compilation & synthetic traffic simulation.'
  },
  {
    phase: 'Implement',
    title: 'Phase 03: Implement',
    objective: 'Deploy, integrate, harden, and empirically prove zero-loss resilience.',
    typicalActivities: [
      'Lossless switching fabric & high-density optics rollout',
      'Zero-trust onboarding with ephemeral SPIFFE/SPIRE agent identities',
      'AI NOC stand-up with In-Band Network Telemetry (INT)',
      'Silent-drop detection (<100 ms) and self-healing loop activation',
      'Hardware MACsec and L1–L7 post-quantum crypto enablement',
      'Pilot stress testing, runbook production & staff co-training'
    ],
    keyOutputs: [
      'Production-grade Hardened Configuration',
      'Empirical Benchmarking Evidence (>96% effective BW)',
      'Operational Engineering Runbooks & Escalation Trees',
      'SOC-integrated Incident Containment Playbooks'
    ],
    automationFocus: 'Zero-touch provisioning & automated acceptance testing.'
  },
  {
    phase: 'Operate',
    title: 'Phase 04: Operate',
    objective: 'Continuously optimize, self-heal, threat hunt, and generate immutable audit evidence.',
    typicalActivities: [
      'Continuous AI networking optimization (RF + wired + collective tuning)',
      'AIOps autonomous remediation targeting 70–80% self-healing',
      'Continuous threat hunting across network, agent & model runtime',
      'Live CBOM currency tracking & quantum algorithm transitions',
      'Continuous synthetic adversarial red-teaming (prompt firewalls / lateral movement)',
      'Continuous regulatory compliance evidence generation'
    ],
    keyOutputs: [
      'Measured Outcome Proof (Throughput, Tail Latency, MTTR, MTTC)',
      'SLA-backed 24/7 Unified AI NOC/SOC Operations',
      'Audit-ready Cryptographic Decision Provenance',
      'Continuous Capability & Value Improvement Backlog'
    ],
    automationFocus: 'Closed-loop autonomous remediation (70–80% self-driving).'
  },
  {
    phase: 'AIOps',
    title: 'Cross-Cutting AIOps Thread',
    objective: 'The continuous autonomous nervous system binding Plan, Design, Implement, and Operate.',
    typicalActivities: [
      'AgenticOps Day-0 to Day-N lifecycle orchestration',
      'Cross-domain correlation (performance telemetry ↔ security signals)',
      'Predictive analytics feeding simultaneous NOC and SOC actions',
      'Closed-loop validation: every change verified against performance & security'
    ],
    keyOutputs: [
      '70–80% Autonomous Issue Remediation Rate',
      'Sub-100ms Silent-Drop Detection & Isolation',
      'Sub-3-Minute Mean Time to Contain (MTTC)',
      'Single-pane performance yield & cyber-risk executive dashboard'
    ],
    automationFocus: 'Full-stack self-healing & continuous autonomous operation.'
  }
]

export const aiNocSetupSteps = [
  {
    step: '01',
    title: 'Telemetry Baseline',
    desc: 'In-Band Network Telemetry (INT), flow, RF, optical, and agent runtime telemetry sources mapped and normalized into unified time-series pipelines.'
  },
  {
    step: '02',
    title: 'Correlation Engine',
    desc: 'Cross-domain correlation engine linking network performance metrics with security events and agent/model behavior with sub-5-minute root-cause automation.'
  },
  {
    step: '03',
    title: 'Self-Healing Playbooks',
    desc: 'Silent-drop detection (<100 ms), dynamic congestion remediation, adaptive reroute, and quarantine workflows codified and tested in production.'
  },
  {
    step: '04',
    title: 'SOC Integration',
    desc: 'Performance telemetry published to the AI SOC as high-fidelity security signals; containment actions trigger instant physical/logical network isolation.'
  },
  {
    step: '05',
    title: 'Value Dashboards',
    desc: 'Throughput yield, tail latency, MTTR/MTTC, CBOM coverage, and risk reduction tracked together in one executive single-pane view.'
  }
]

// ============================================================================
// 3. CORE CROSS-CUTTING OFFERINGS (PLATFORM LAYER)
// ============================================================================

export interface PlatformOffering {
  number: string
  title: string
  shortTitle: string
  icon: LucideIcon
  summary: string
  deliverables: string[]
  differentiator: string
}

export const platformOfferings: PlatformOffering[] = [
  {
    number: '3.1',
    title: 'Lossless AI Networking Fabrics',
    shortTitle: 'Lossless Fabrics',
    icon: Network,
    summary: 'High-performance RoCEv2, Quantum-2 InfiniBand, Spectrum-X-class Ethernet; rail-optimized, Dragonfly+, and Fat-Tree topologies; NCCL/RCCL collective tuning; 400G–1.6T optics; GPUDirect Storage; and NTN/satellite integration.',
    deliverables: [
      'Zero packet loss under sustained 100% saturation',
      'Sub-microsecond tail latency jitter elimination',
      '20–50% higher effective GPU / AI workload throughput',
      'Non-blocking bisection bandwidth across thousands of accelerators'
    ],
    differentiator: 'Hardware-verified zero loss with custom collective communication tuning algorithms.'
  },
  {
    number: '3.2',
    title: 'Autonomous AI NOC & Telemetry',
    shortTitle: 'Autonomous AI NOC',
    icon: Workflow,
    summary: 'In-band Network Telemetry (INT), silent-drop detection (<100 ms), self-healing reroute, predictive link degradation, and autonomous root-cause analysis integrated with multi-domain visibility across LAN/WAN, WiFi, Gigabit Ethernet, hyperscale, satellite, subsea, and aerospace.',
    deliverables: [
      '<100 ms silent drop detection time',
      '70–80% autonomous issue remediation without human touch',
      '<5-minute root-cause attribution across physical and virtual layers',
      'Predictive optical and RF degradation alerts before service impact'
    ],
    differentiator: 'Packet-level INT telemetry correlated directly with AI training job completion times.'
  },
  {
    number: '3.3',
    title: 'Quantum-Safe & Zero-Trust Cybersecurity',
    shortTitle: 'Quantum-Safe & Zero-Trust',
    icon: Lock,
    summary: 'Automated Cryptographic Bill of Materials (CBOM); NIST PQC migration (ML-KEM / ML-DSA hybrid); L1–L7 post-quantum cryptography; MACsec; SPIFFE/SPIRE ephemeral agent identities; prompt-injection firewalls; model-weight signing; confidential compute (TEEs); and data-poisoning defense.',
    deliverables: [
      '100% live inventory of all cryptographic assets via automated CBOM',
      'Protection against Harvest Now Decrypt Later (HNDL) attacks',
      'Sub-millisecond ephemeral token issuance for autonomous agents',
      'Hardware-enforced confidential compute enclaves for model weights'
    ],
    differentiator: 'Security engineered directly into high-speed network optics without throughput tax.'
  },
  {
    number: '3.4',
    title: 'Unified AI SOC & Threat Intelligence',
    shortTitle: 'Unified AI SOC',
    icon: ShieldCheck,
    summary: '24/7 managed AI Security Operations Center with cross-layer correlation (network telemetry + agent behavior + model runtime), automated containment (sub-3-minute MTTC target), continuous adversarial red-teaming, and immutable cryptographic decision provenance / audit replay.',
    deliverables: [
      'Sub-3-minute mean time to contain (MTTC) with sub-minute ambitions',
      'Continuous automated red-teaming mapped to MITRE ATLAS',
      'Immutable cryptographic decision logs for legal and regulatory defense',
      'Real-time prompt firewalling and semantic jailbreak mitigation'
    ],
    differentiator: 'Correlating network flow anomalies directly with LLM prompt injections and agent deviations.'
  },
  {
    number: '3.5',
    title: 'Cognitive / AI-Native WiFi Fabric',
    shortTitle: 'Cognitive WiFi 7',
    icon: Wifi,
    summary: 'WiFi 6E/7 with AI-driven radio resource management (AI-RRM), predictive RF optimization, client steering, multi-link operation (MLO), high-density capacity engineering (stadium/venue-grade), integrated BLE/Zigbee/IoT radios, and seamless roaming at campus-gateway scale.',
    deliverables: [
      'AI-RRM real-time RF optimization with 70–80% autonomous remediation',
      'Wi-Fi 7 APs with MACsec link-layer encryption and multi-gig uplinks',
      'Campus-gateway-scale roaming for tens of thousands of simultaneous clients',
      'WPA3 + MACsec, PQC-ready cryptographic extensions, and CBOM visibility',
      'Private 5G / Ultra-Reliable Wireless Backhaul (URWB) convergence',
      'Rogue AP / evil-twin detection feeding directly into the AI SOC'
    ],
    differentiator: 'Engineered as a first-class zero-trust edge access fabric matching wired performance.'
  },
  {
    number: '3.6',
    title: 'Full-Spectrum Domain Coverage Overlay',
    shortTitle: 'Domain Overlay',
    icon: Globe2,
    summary: 'Purpose-engineered extensions for Enterprises, Hyperscale Data Centers, Campus Environments, Manufacturing & Mission-Critical OT/IT, Satellite Networking, Cable Landing Stations, and Aerospace & Air-Tech — each with embedded cyber-resilience, NOC/SOC intelligence, and quantum-readiness.',
    deliverables: [
      'Consistent security and telemetry primitives across 7 distinct physical domains',
      'Cross-domain threat correlation (e.g. subsea optical cuts ↔ satellite re-routing)',
      'Deterministic TSN and URWB integration for moving physical assets',
      'Sovereign and air-gapped deployment configurations'
    ],
    differentiator: 'One unified nervous system spanning from the office access point to orbital assets.'
  }
]

// ============================================================================
// 4. ENGAGEMENT MODELS & TRACKS (SECTION 5)
// ============================================================================

export interface EngagementModelItem {
  id: string
  title: string
  duration: string
  idealFor: string
  scope: string[]
  deliverables: string[]
  variant?: {
    title: string
    duration: string
    description: string
  }
}

export const engagementModels: EngagementModelItem[] = [
  {
    id: 'diagnostic',
    title: '5.1 Executive AI Networking & Cybersecurity Diagnostic',
    duration: '2–4 weeks',
    idealFor: 'Leadership teams needing an objective baseline, risk quantification, and board ROI case before capital deployment.',
    scope: [
      'On-site / remote deep technical interviews across network and security teams',
      'Passive telemetry capture & traffic profiling across fabrics',
      'WiFi/RF spectrum survey, interference mapping, and client experience scoring',
      'Threat modeling mapped to MITRE ATLAS & EU AI Act / NIST AI RMF',
      'Automated Cryptographic Bill of Materials (CBOM) discovery',
      'Fabric performance baseline: latency, tail latency, microbursts, and silent packet loss',
      'Unit-economic benchmarking & GPU throughput yield modeling'
    ],
    deliverables: [
      'Comprehensive Security & Fabric Posture Report',
      'Prioritized High-Yield Architecture Roadmap',
      '90-Day Value Realization Plan with verifiable milestones',
      'Board-ready Risk & Return on Investment (ROI) Summary'
    ]
  },
  {
    id: 'sprint',
    title: '5.2 Domain-Specific Value Sprint / Optimization Engagement',
    duration: '4–12 weeks',
    idealFor: 'Teams needing fast, verifiable wins in a specific domain (e.g., Enterprise LAN/WAN + SOC, Hyperscale RoCEv2, Campus WiFi, or OT/IT).',
    scope: [
      'Focused engineering of one or more physical domains',
      'Production-grade architecture design & high-density blueprinting',
      'Proof-of-concept or live pilot deployment on target infrastructure',
      'Collective-communications tuning (NCCL/RCCL) and buffer optimization',
      'Zero-trust policy implementation & ephemeral agent onboarding',
      'Autonomous AI NOC telemetry integration and self-healing enablement'
    ],
    deliverables: [
      'Production-grade configuration & implementation',
      'Empirical performance & security benchmark verification',
      'Operational engineering runbooks & escalation trees',
      'Staff training & knowledge transfer sessions',
      'Measured impact report (latency reduction, throughput increase, MTTC)'
    ],
    variant: {
      title: 'Cognitive WiFi Value Sprint',
      duration: '4–8 weeks',
      description: 'Rapid design and pilot of AI-driven WiFi 7 (radio resource management, zero-trust dynamic segmentation, telemetry integration) scoped to a single campus, enterprise site, or manufacturing plant.'
    }
  },
  {
    id: 'transformation',
    title: '5.3 Full-Stack Transformation Program',
    duration: '8–16+ weeks (Modular)',
    idealFor: 'Multi-site enterprises and mission-critical operators modernizing at scale across multiple physical and logical domains.',
    scope: [
      'End-to-end design, deployment, and operationalization across multiple domains',
      'Physical/optical layer build-out through autonomous AI NOC/SOC',
      'Enterprise-wide quantum-safe cryptographic migration (NIST PQC)',
      'Universal zero-trust agent identity fabric (SPIFFE/SPIRE)',
      'Continuous adversarial red-teaming & model guardrail deployment',
      'Optional 24/7 managed operations stand-up (AI NOC + AI SOC)'
    ],
    deliverables: [
      'Turnkey multi-domain fabric + quantum-safe security stack',
      'Immutable cryptographic decision provenance and audit replay systems',
      'Value Realization Office (VRO) executive dashboards',
      'Comprehensive organizational knowledge transfer and co-management',
      'Ongoing performance yield and cyber-risk SLA contracts'
    ],
    variant: {
      title: 'Full Access Fabric Transformation',
      duration: '8–16 weeks',
      description: 'Cognitive WiFi 7 + LAN/WAN/Gigabit Ethernet underlays with unified AI NOC/SOC, PQC readiness, and domain-specific hardening across multi-building estates.'
    }
  },
  {
    id: 'managed',
    title: '5.4 Managed Continuous Operations',
    duration: 'Ongoing (24/7)',
    idealFor: 'Production estates requiring SLA-backed 24/7 autonomous monitoring, continuous performance tuning, and active cyber threat hunting.',
    scope: [
      '24/7 Autonomous AI NOC with self-healing closed loops (70–80% target)',
      '24/7 Managed AI SOC with sub-3-minute containment (sub-minute ambitions)',
      'Continuous AI networking optimization (RF, wired, and collective tuning)',
      'Live CBOM currency management & cryptographic lifecycle governance',
      'Continuous synthetic adversarial red-teaming against model runtime',
      'Automated regulatory compliance evidence generation (EU AI Act, ISO 42001)'
    ],
    deliverables: [
      'SLA-backed operations (uptime, tail latency, MTTR, MTTC)',
      'Monthly Value Realization and Cyber-Risk Executive Reports',
      'Continuous improvement backlog prioritized by business impact',
      'Audit-ready regulatory compliance packages'
    ],
    variant: {
      title: 'Managed Cognitive WiFi & Access Operations',
      duration: 'Ongoing',
      description: 'Continuous AI-driven RF optimization, security monitoring, zero-trust policy enforcement, and self-healing across the wireless and wired access layers, fully integrated with broader AI NOC and AI SOC.'
    }
  }
]

export const wifiEngagementTracks = [
  {
    track: 'Executive WiFi & Access Fabric Diagnostic',
    duration: '2–4 weeks',
    focus: 'RF/security/AI-readiness baseline; CBOM for wireless crypto; upgrade prioritization',
    idealFor: 'Sites planning a WiFi 7 refresh or dense AI workspace deployment'
  },
  {
    track: 'Cognitive WiFi Value Sprint',
    duration: '4–8 weeks',
    focus: 'AI-RRM pilot, zero-trust access control, telemetry integration',
    idealFor: 'A single campus, enterprise site, or manufacturing zone'
  },
  {
    track: 'Full Access Fabric Transformation',
    duration: '8–16 weeks',
    focus: 'WiFi 7 + LAN/WAN + unified AI NOC/SOC + PQC readiness',
    idealFor: 'Multi-site modernization across enterprise and campus estates'
  },
  {
    track: 'Managed Cognitive WiFi & Access Operations',
    duration: 'Ongoing',
    focus: 'AI RF optimization, security monitoring, self-healing',
    idealFor: 'Stable estates needing 24/7 SLA assurance and continuous tuning'
  }
]

export const entryPointGuidance = [
  {
    situation: 'No objective baseline; board needs a quantified business and ROI case before capital allocation',
    recommendation: 'Executive AI Networking & Cybersecurity Diagnostic (5.1)',
    href: '#intake-form',
    timeframe: '2–4 weeks'
  },
  {
    situation: 'Isolated pain in one domain (e.g. WiFi capacity, OT plant downtime, or GPU fabric congestion)',
    recommendation: 'Domain-Specific Value Sprint / Optimization Engagement (5.2)',
    href: '#intake-form',
    timeframe: '4–12 weeks'
  },
  {
    situation: 'Multi-domain enterprise modernization, looming quantum deadlines, or AI factory build-out',
    recommendation: 'Full-Stack Transformation Program (5.3)',
    href: '#intake-form',
    timeframe: '8–16+ weeks'
  },
  {
    situation: 'Existing infrastructure estate needing 24/7 assurance, proactive self-healing, and threat hunting',
    recommendation: 'Managed Continuous Operations (5.4)',
    href: '#intake-form',
    timeframe: 'Ongoing (24/7)'
  },
  {
    situation: 'Specific requirement for PQC migration, adversarial red-teaming, or sovereign satellite NTN',
    recommendation: 'Specialized Add-On Modules (5.5)',
    href: '#intake-form',
    timeframe: 'Flexible Sprints'
  }
]

// ============================================================================
// 5. VALUE REALIZATION METRICS (SECTION 7)
// ============================================================================

export interface ValueMetricRow {
  metric: string
  whatItMeasures: string
  indicativeTarget: string
  primaryDomains: string
  impactBadge: string
}

export const valueRealizationMetrics: ValueMetricRow[] = [
  {
    metric: 'Effective bandwidth / loss',
    whatItMeasures: 'Fabric utilization under collective AI workloads',
    indicativeTarget: '>96% effective bandwidth; zero packet loss',
    primaryDomains: 'Hyperscale, Enterprise, Satellite, Subsea',
    impactBadge: 'Performance'
  },
  {
    metric: 'Tail latency',
    whatItMeasures: 'Worst-case flow latency in synchronized AI fabrics',
    indicativeTarget: 'Sub-microsecond class',
    primaryDomains: 'Hyperscale, Enterprise',
    impactBadge: 'Throughput'
  },
  {
    metric: 'AI workload latency',
    whatItMeasures: 'End-to-end distributed application & inference latency',
    indicativeTarget: '30–60% reduction',
    primaryDomains: 'Enterprise, Campus, Hyperscale',
    impactBadge: 'Speed'
  },
  {
    metric: 'Effective GPU throughput',
    whatItMeasures: 'Training & inference output per fabric dollar',
    indicativeTarget: '20–50% improvement',
    primaryDomains: 'Hyperscale, Data Centers',
    impactBadge: 'ROI'
  },
  {
    metric: 'Mean Time to Resolve (MTTR)',
    whatItMeasures: 'Mean time to resolve operational network incidents',
    indicativeTarget: '60–80% reduction',
    primaryDomains: 'All domains',
    impactBadge: 'Operations'
  },
  {
    metric: 'Mean Time to Contain (MTTC)',
    whatItMeasures: 'Time to isolate compromised agents or lateral threats',
    indicativeTarget: 'Sub-3-minute; sub-minute ambitions',
    primaryDomains: 'All domains',
    impactBadge: 'Security'
  },
  {
    metric: 'Autonomous remediation rate',
    whatItMeasures: 'Issues remediated by AIOps without human touch',
    indicativeTarget: '70–80%',
    primaryDomains: 'All domains (AIOps)',
    impactBadge: 'Automation'
  },
  {
    metric: 'Silent-drop detection',
    whatItMeasures: 'Time to detect invisible packet drops across switches',
    indicativeTarget: '<100 ms',
    primaryDomains: 'Hyperscale, Satellite, Subsea',
    impactBadge: 'Reliability'
  },
  {
    metric: 'CBOM coverage',
    whatItMeasures: 'Real-time visibility of all cryptographic assets',
    indicativeTarget: '100% full inventory',
    primaryDomains: 'All domains',
    impactBadge: 'Compliance'
  },
  {
    metric: 'Roaming scale',
    whatItMeasures: 'Seamless mobility handoff throughput at scale',
    indicativeTarget: 'Thousands of roams/sec class',
    primaryDomains: 'Campus, Enterprise, Industrial',
    impactBadge: 'Experience'
  },
  {
    metric: 'URWB handoff',
    whatItMeasures: 'Mobility handoff latency/loss for moving robotics',
    indicativeTarget: '<10 ms; zero packet loss',
    primaryDomains: 'Manufacturing, Aerospace',
    impactBadge: 'Safety'
  },
  {
    metric: 'Compliance evidence',
    whatItMeasures: 'Automated cryptographic & policy audit evidence',
    indicativeTarget: 'Continuous, audit-ready',
    primaryDomains: 'All domains',
    impactBadge: 'Governance'
  },
  {
    metric: 'Root-cause SLA',
    whatItMeasures: 'Time to isolate root cause for fabric or security alerts',
    indicativeTarget: '<5 minutes',
    primaryDomains: 'Hyperscale, Enterprise',
    impactBadge: 'Assurance'
  }
]

// ============================================================================
// 6. GLOSSARY & ACRONYMS (SECTION 8)
// ============================================================================

export interface GlossaryTerm {
  term: string
  fullName?: string
  definition: string
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'AI NOC',
    fullName: 'Autonomous Network Operations Center',
    definition: 'Telemetry-driven, self-healing network operations center leveraging in-band telemetry (INT), predictive link modeling, and closed-loop automation to achieve zero job restarts.'
  },
  {
    term: 'AI SOC',
    fullName: 'AI Security Operations Center',
    definition: '24/7 managed security operations center fusing network flow telemetry, agent execution behavior, prompt firewall alerts, and model runtime anomalies into sub-minute containment.'
  },
  {
    term: 'Cognitive WiFi',
    fullName: 'AI-Native WiFi 6E/7 Architecture',
    definition: 'Wireless access fabric utilizing AI radio resource management (AI-RRM), continuous client profiling, dynamic segmentation, and WPA3/MACsec link-layer encryption.'
  },
  {
    term: 'CBOM',
    fullName: 'Cryptographic Bill of Materials',
    definition: 'Automated, real-time machine-readable inventory of every cryptographic key, certificate, cipher suite, and protocol across an enterprise, mapped for post-quantum vulnerability.'
  },
  {
    term: 'Lossless Fabric',
    definition: 'Non-blocking, zero-packet-loss network topology (RoCEv2, Quantum-2 InfiniBand, Spectrum-X Ethernet) engineered for collective AI communications with PFC, ECN, and buffer tuning.'
  },
  {
    term: 'PQC',
    fullName: 'Post-Quantum Cryptography',
    definition: 'NIST-standardized quantum-resistant cryptographic algorithms (ML-KEM for key exchange and ML-DSA for digital signatures) deployed in hybrid models to defend against Harvest Now Decrypt Later.'
  },
  {
    term: 'Zero-Trust Agent IAM',
    definition: 'Security architecture enforcing continuous attestation, ephemeral cryptographic identities (SPIFFE/SPIRE), micro-segmentation, and least-privilege tool execution for autonomous AI workers.'
  }
]

export interface AcronymItem {
  acronym: string
  meaning: string
  domain: string
}

export const acronymsList: AcronymItem[] = [
  { acronym: 'AI-RRM', meaning: 'AI Radio Resource Management', domain: 'Wireless' },
  { acronym: 'AIOps', meaning: 'Artificial Intelligence for IT Operations', domain: 'Operations' },
  { acronym: 'CBOM', meaning: 'Cryptographic Bill of Materials', domain: 'Security' },
  { acronym: 'DCI', meaning: 'Data Center Interconnect', domain: 'Transport' },
  { acronym: 'DCQCN', meaning: 'Data Center Quantized Congestion Notification', domain: 'Networking' },
  { acronym: 'DWDM', meaning: 'Dense Wavelength Division Multiplexing', domain: 'Optical' },
  { acronym: 'EVPN-VXLAN', meaning: 'Ethernet VPN over Virtual Extensible LAN', domain: 'Networking' },
  { acronym: 'GPU', meaning: 'Graphics Processing Unit (AI Compute Accelerator)', domain: 'Compute' },
  { acronym: 'GPUDirect', meaning: 'NVIDIA direct memory access for storage & networking', domain: 'Fabric' },
  { acronym: 'INT', meaning: 'In-band Network Telemetry', domain: 'Telemetry' },
  { acronym: 'IoT', meaning: 'Internet of Things', domain: 'Edge' },
  { acronym: 'LEO/MEO/GEO', meaning: 'Low / Medium / Geostationary Earth Orbit', domain: 'Satellite' },
  { acronym: 'MACsec', meaning: 'Media Access Control Security (IEEE 802.1AE L2 encryption)', domain: 'Security' },
  { acronym: 'MITRE ATLAS', meaning: 'Adversarial Threat Landscape for Artificial-Intelligence Systems', domain: 'Security' },
  { acronym: 'ML-KEM / ML-DSA', meaning: 'NIST post-quantum algorithms (Key Encapsulation / Signatures)', domain: 'Quantum' },
  { acronym: 'MLO', meaning: 'Multi-Link Operation (Wi-Fi 7)', domain: 'Wireless' },
  { acronym: 'MTTC', meaning: 'Mean Time to Contain (Security incidents)', domain: 'Security' },
  { acronym: 'MTTR', meaning: 'Mean Time to Resolve (Operational incidents)', domain: 'Operations' },
  { acronym: 'NCCL / RCCL', meaning: 'NVIDIA / AMD Collective Communications Libraries', domain: 'AI Fabric' },
  { acronym: 'NOC / SOC', meaning: 'Network / Security Operations Center', domain: 'Operations' },
  { acronym: 'NTN', meaning: 'Non-Terrestrial Network', domain: 'Satellite' },
  { acronym: 'OT / IT', meaning: 'Operational Technology / Information Technology', domain: 'Industrial' },
  { acronym: 'PFC', meaning: 'Priority Flow Control (IEEE 802.1Qbb)', domain: 'Networking' },
  { acronym: 'PQC', meaning: 'Post-Quantum Cryptography', domain: 'Security' },
  { acronym: 'RoCEv2', meaning: 'RDMA over Converged Ethernet version 2', domain: 'Networking' },
  { acronym: 'SASE', meaning: 'Secure Access Service Edge', domain: 'Security' },
  { acronym: 'SCADA', meaning: 'Supervisory Control and Data Acquisition', domain: 'Industrial' },
  { acronym: 'SD-WAN', meaning: 'Software-Defined Wide Area Network', domain: 'Transport' },
  { acronym: 'SIEM', meaning: 'Security Information and Event Management', domain: 'Security' },
  { acronym: 'SPIFFE / SPIRE', meaning: 'Secure Production Identity Framework / Runtime Engine', domain: 'Identity' },
  { acronym: 'TEE', meaning: 'Trusted Execution Environment (Confidential Compute)', domain: 'Hardware' },
  { acronym: 'TSN', meaning: 'Time-Sensitive Networking', domain: 'Industrial' },
  { acronym: 'URWB', meaning: 'Ultra-Reliable Wireless Backhaul', domain: 'Wireless' },
  { acronym: 'VRF', meaning: 'Virtual Routing and Forwarding', domain: 'Networking' }
]

// ============================================================================
// 10. REFINED 12 CATEGORIES OF NETWORKING & 12 CATEGORIES OF CYBERSECURITY
// ============================================================================

export interface CategoryDetailItem {
  id: string
  number: number
  label: string
  badge: string
  tagline: string
  description: string
  capabilities: string[]
  impactMetric: string
  icon: LucideIcon
  href: string
  sectorId?: string
}

export const networkingCategoriesData: CategoryDetailItem[] = [
  {
    id: 'campus-networking',
    number: 1,
    label: 'Campus Networking',
    badge: 'ZERO-TRUST CAMPUS',
    tagline: 'High-Density Wired & Wireless Access Fabric',
    description: 'Unified multi-gigabit access, dynamic identity-based micro-segmentation, and seamless roaming designed for modern enterprise campuses and research facilities.',
    capabilities: [
      'Multi-gigabit PoE switching and automated client profiling',
      'Dynamic identity segmentation isolating IoT, guest, and corporate flows',
      'Microsecond campus-gateway handoffs supporting dense client fleets'
    ],
    impactMetric: 'Sub-5ms roaming handoff · Zero configuration drift',
    icon: Building2,
    href: '#campus-environments',
    sectorId: 'campus-environments'
  },
  {
    id: 'enterprise-networking',
    number: 2,
    label: 'Enterprise Networking',
    badge: 'HYBRID ENTERPRISE CORE',
    tagline: 'Resilient Multi-Cloud LAN/WAN Architecture',
    description: 'Software-defined enterprise fabric interconnecting branch offices, corporate headquarters, and sovereign clouds with automated traffic engineering.',
    capabilities: [
      'Autonomous failover routing with real-time path health scoring',
      'Unified multi-cloud transit fabric with deterministic QoS guarantees',
      'Zero-touch branch provisioning with centralized policy compliance'
    ],
    impactMetric: '99.999% transport uptime · 40% egress cost reduction',
    icon: Globe2,
    href: '#enterprises',
    sectorId: 'enterprises'
  },
  {
    id: 'datacenter-networking',
    number: 3,
    label: 'Data Center Networking',
    badge: 'LOSSLESS AI FABRIC',
    tagline: 'RoCEv2 & Quantum-2 InfiniBand GPU Fabrics',
    description: 'High-density, non-blocking network topologies engineered for ultra-large GPU training clusters and inference factories with zero packet drops.',
    capabilities: [
      'DCQCN, PFC, and dynamic buffer tuning eliminating packet loss',
      'In-Band Network Telemetry (INT) with sub-100ms silent drop detection',
      'Rail-optimized Fat-Tree & Dragonfly+ topologies (400G–1.6T)'
    ],
    impactMetric: '>96% effective GPU fabric yield · Zero packet drop',
    icon: Server,
    href: '#hyperscale-datacenters',
    sectorId: 'hyperscale-datacenters'
  },
  {
    id: 'space-networking',
    number: 4,
    label: 'Space Networking',
    badge: 'ORBITAL NTN INTEGRATION',
    tagline: 'Non-Terrestrial Network & Space-Ground Relays',
    description: 'Resilient multi-terabit space-to-ground communication links connecting LEO/MEO/GEO constellations with terrestrial AI processing hubs.',
    capabilities: [
      'Adaptive orbital routing adjusting for dynamic satellite ephemeris',
      'Jam-resistant self-healing mesh maintaining throughput under attack',
      'Continuous attestation and quantum-safe key distribution for orbital nodes'
    ],
    impactMetric: 'Multi-Tbps feeder throughput · Sub-minute orbital reroute',
    icon: Satellite,
    href: '#satellite-networking',
    sectorId: 'satellite-networking'
  },
  {
    id: 'industrial-networking',
    number: 5,
    label: 'Industrial Networking',
    badge: 'DETERMINISTIC OT/IT',
    tagline: 'Time-Sensitive Industrial Manufacturing Fabrics',
    description: 'Ruggedized deterministic networks connecting plant-floor robotics, automated guided vehicles, and SCADA systems with enterprise AI models.',
    capabilities: [
      'Ultra-Reliable Wireless Backhaul (URWB) with make-before-break roaming',
      'Sub-10ms deterministic latency across heavy electromagnetic interference',
      'Strict protocol air-gapping separating safety systems from enterprise IT'
    ],
    impactMetric: '<10ms deterministic latency · 92% lower unplanned downtime',
    icon: Factory,
    href: '#manufacturing-mission-critical',
    sectorId: 'manufacturing-mission-critical'
  },
  {
    id: 'cloud-networking',
    number: 6,
    label: 'Cloud Networking',
    badge: 'MULTI-CLOUD TRANSIT',
    tagline: 'Sovereign Multi-Cloud Interconnects & Overlays',
    description: 'High-bandwidth, encrypted hybrid cloud mesh interconnecting AWS, Azure, GCP, and private on-premises AI infrastructure with zero egress sprawl.',
    capabilities: [
      'Direct cloud interconnects (DCI/DWDM) with line-rate MACsec encryption',
      'Consistent security policy overlays across disparate cloud providers',
      'Real-time egress route optimization reducing inter-cloud transit bills'
    ],
    impactMetric: 'Line-rate MACsec encryption · 35% latency improvement',
    icon: Layers,
    href: '#enterprises',
    sectorId: 'enterprises'
  },
  {
    id: 'edge-networking',
    number: 7,
    label: 'Edge Networking',
    badge: 'LOW-LATENCY EDGE',
    tagline: 'Decentralized Micro-Edge Inference Clusters',
    description: 'Decentralized edge computing networks executing real-time AI inference at the point of data creation with local autonomous survival.',
    capabilities: [
      'Local deterministic routing keeping processing close to physical sensors',
      'Rugged field cluster interconnects operating in harsh environments',
      'Offline-first edge survivability maintaining operations during backhaul cuts'
    ],
    impactMetric: 'Sub-2ms local response · 100% offline survivability',
    icon: Cpu,
    href: '#aerospace-air-tech',
    sectorId: 'aerospace-air-tech'
  },
  {
    id: 'service-provider-networking',
    number: 8,
    label: 'Service Provider Networking',
    badge: 'OPTICAL SUBSEA CORE',
    tagline: 'Carrier-Grade Subsea Landing & Backhaul Transport',
    description: 'Multi-terabit coherent optical transport networks powering intercontinental cable landing stations and carrier exchanges with zero-loss assurance.',
    capabilities: [
      'Coherent DWDM transmission optimizing optical spectrum utilization',
      'Differentiated analytics distinguishing fiber cuts from cyber interference',
      'Automated optical link restoration with sub-50ms protection switching'
    ],
    impactMetric: 'Multi-Tbps line-rate throughput · <50ms optical failover',
    icon: Cable,
    href: '#cable-landing-stations',
    sectorId: 'cable-landing-stations'
  },
  {
    id: 'wireless-networking',
    number: 9,
    label: 'Wireless Networking',
    badge: 'COGNITIVE WIFI 7',
    tagline: 'AI-Native Spectrum Optimization & Dynamic Steering',
    description: 'Intelligent radio resource management optimizing channel width, transmit power, and client steering across ultra-dense enterprise environments.',
    capabilities: [
      'AI-RRM real-time RF tuning resolving interference autonomously',
      'Multi-Link Operation (MLO) aggregation for ultra-low wireless latency',
      'WPA3 Enterprise encryption with dynamic micro-segmentation'
    ],
    impactMetric: '70–80% autonomous RF remediation · 5x client density',
    icon: Wifi,
    href: '#cognitive-wifi-7',
    sectorId: 'campus-environments'
  },
  {
    id: 'iot-networking',
    number: 10,
    label: 'IoT Networking',
    badge: 'SECURE IOT FABRIC',
    tagline: 'Scalable Machine Telemetry & Sensor Integration',
    description: 'Secure, high-density machine-to-machine networks ingesting millions of telemetry streams from industrial and smart infrastructure sensors.',
    capabilities: [
      'Automated device fingerprinting and zero-trust onboarding',
      'Massive scale IoT protocol translation (MQTT, CoAP, Modbus)',
      'Continuous behavioral profiling isolating compromised sensor nodes'
    ],
    impactMetric: 'Sub-second sensor telemetry · 100% device visibility',
    icon: Radio,
    href: '#manufacturing-mission-critical',
    sectorId: 'manufacturing-mission-critical'
  },
  {
    id: 'storage-area-networking',
    number: 11,
    label: 'Storage Area Networking (SAN)',
    badge: 'GPUDIRECT NVME-OF',
    tagline: 'Ultra-Fast NVMe-oF & Direct Memory Interconnects',
    description: 'High-throughput, microsecond-latency storage networks engineered to feed massive datasets directly to GPU memory without CPU bottlenecks.',
    capabilities: [
      'GPUDirect Storage (GDS) over fabrics with RDMA acceleration',
      'Non-blocking storage fabric buffers preventing I/O queue stalls',
      'End-to-end data integrity validation with zero throughput penalty'
    ],
    impactMetric: '3.2 TB/s cluster read throughput · Zero CPU bottleneck',
    icon: Zap,
    href: '#hyperscale-datacenters',
    sectorId: 'hyperscale-datacenters'
  },
  {
    id: 'wide-area-networking',
    number: 12,
    label: 'Wide Area Networking (SD-WAN)',
    badge: 'SOVEREIGN SD-WAN',
    tagline: 'AI-Driven Adaptive SD-WAN Path Optimization',
    description: 'Self-optimizing wide-area networks that dynamically steer enterprise traffic across fiber, 5G, and satellite paths based on real-time SLA metrics.',
    capabilities: [
      'Application-aware path selection prioritizing mission-critical AI flows',
      'Sub-second link failover without session drops or packet loss',
      'Centralized cryptographic policy enforcement across all branch endpoints'
    ],
    impactMetric: '99.999% application SLA · Sub-second link failover',
    icon: Compass,
    href: '#enterprises',
    sectorId: 'enterprises'
  }
]

export const cybersecurityCategoriesData: CategoryDetailItem[] = [
  {
    id: 'threat-detection-prevention',
    number: 1,
    label: 'AI Threat Detection & Prevention',
    badge: 'SUB-3M CONTAINMENT',
    tagline: 'Cross-Layer Behavioral Threat Hunting & Blocking',
    description: 'Unified detection engine correlating network packet flows, host telemetry, and AI model tokens to neutralize active cyber intrusions in real time.',
    capabilities: [
      'Line-rate behavioral anomaly scoring across network and host layers',
      'Automated perimeter and micro-segmentation quarantine workflows',
      'Continuous MITRE ATT&CK and ATLAS adversarial mapping'
    ],
    impactMetric: '<3 minute Mean Time to Contain (MTTC) · Zero alert fatigue',
    icon: ShieldCheck,
    href: '#platform-offerings'
  },
  {
    id: 'anomaly-detection',
    number: 2,
    label: 'AI Anomaly Detection',
    badge: 'TELEMETRY BASELINING',
    tagline: 'Multi-Domain Telemetry Baselining & Drift Forensics',
    description: 'Unsupervised machine learning models continuously baselining normal network, user, and compute behavior to detect silent operational deviations.',
    capabilities: [
      'Microburst and silent packet drop detection under 100 milliseconds',
      'Model input drift and adversarial data poisoning early warning',
      'Cross-domain telemetry correlation identifying hidden failure modes'
    ],
    impactMetric: 'Sub-100ms silent drop alert · 98% lower false positives',
    icon: Activity,
    href: '#platform-offerings'
  },
  {
    id: 'malware-analysis',
    number: 3,
    label: 'AI Malware Analysis & Classification',
    badge: 'HEURISTIC SANDBOXING',
    tagline: 'Automated Reverse-Engineering & Zero-Day Heuristics',
    description: 'Deep-learning inspection engines analyzing unknown payloads, scripts, and binaries in isolated micro-virtual environments before execution.',
    capabilities: [
      'Zero-day behavioral signature synthesis without prior CVE knowledge',
      'Memory injection and process hollowing detection at runtime',
      'Automated disassembly and threat provenance attribution'
    ],
    impactMetric: 'Sub-second payload verdict · 100% air-gapped sandboxing',
    icon: ShieldAlert,
    href: '#platform-offerings'
  },
  {
    id: 'phishing-social-defense',
    number: 4,
    label: 'AI Phishing & Social Defense',
    badge: 'SEMANTIC SHIELDS',
    tagline: 'Contextual NLP Semantic Shields & Deception Traps',
    description: 'Natural language processing engines analyzing incoming communications, executive impersonation patterns, and credential harvesting attempts.',
    capabilities: [
      'Deepfake voice and video biometric anomaly detection',
      'Semantic invoice and business email compromise (BEC) inspection',
      'Dynamic decoy credential traps neutralizing credential harvesting'
    ],
    impactMetric: '99.8% executive spoof capture · Real-time user warnings',
    icon: Target,
    href: '#platform-offerings'
  },
  {
    id: 'network-intrusion-detection',
    number: 5,
    label: 'AI Network Intrusion (NIDS/NIPS)',
    badge: 'IN-BAND INSPECTION',
    tagline: 'Line-Rate In-Band Packet Inspection & Shunting',
    description: 'Line-rate hardware inspection engines inspecting 400G+ flows to detect lateral movement, command-and-control beacons, and exfiltration attempts.',
    capabilities: [
      'Hardware-accelerated Deep Packet Inspection (DPI) at line rate',
      'Automated adversary traffic shunting isolating attack vectors',
      'Encrypted traffic pattern analysis without breaking TLS confidentiality'
    ],
    impactMetric: 'Line-rate 400G–800G inspection · Zero latency penalty',
    icon: Network,
    href: '#platform-offerings'
  },
  {
    id: 'endpoint-protection',
    number: 6,
    label: 'AI Endpoint Protection',
    badge: 'RUNTIME SHIELDS',
    tagline: 'Agentic Runtime Behavioral Shields & Tamper Defense',
    description: 'Lightweight endpoint agents monitoring process executions, memory spaces, and container boundaries to prevent unauthorized privilege escalation.',
    capabilities: [
      'Process memory behavioral monitoring blocking in-memory exploits',
      'Autonomous ransomware kill-switch halting unauthorized encryption',
      'Kernel-level tamper defense with immutable cryptographic auditing'
    ],
    impactMetric: 'Sub-second agent isolation · Zero kernel tamper vulnerability',
    icon: Cpu,
    href: '#platform-offerings'
  },
  {
    id: 'ueba',
    number: 7,
    label: 'AI User & Entity Behavior (UEBA)',
    badge: 'CONTINUOUS PROFILING',
    tagline: 'Continuous Identity Profiling & Insider Threat Analytics',
    description: 'Machine learning models baselining normal work patterns for employees, contractors, and autonomous AI agents to spot credential misuse instantly.',
    capabilities: [
      'Dynamic peer group baseline modeling and anomaly scoring',
      'Autonomous agent behavioral containment upon workflow drift',
      'Real-time risk scoring dictating ephemeral access permissions'
    ],
    impactMetric: 'Continuous identity profiling · Sub-second lateral halt',
    icon: Users,
    href: '#platform-offerings'
  },
  {
    id: 'soar',
    number: 8,
    label: 'AI Security Orchestration (SOAR)',
    badge: 'AUTONOMOUS PLAYBOOKS',
    tagline: 'Autonomous Incident Playbooks & Self-Healing Security',
    description: 'Pre-engineered, closed-loop playbooks that triage alerts, execute forensic data collection, and isolate compromised assets without human delay.',
    capabilities: [
      'Automated multi-system playbook execution spanning network and IAM',
      'Cryptographic forensic artifact preservation for legal auditability',
      'Closed-loop change verification ensuring remediation success'
    ],
    impactMetric: '85% autonomous alert triage · Sub-5m end-to-end resolution',
    icon: Workflow,
    href: '#platform-offerings'
  },
  {
    id: 'vulnerability-management',
    number: 9,
    label: 'AI Vulnerability Management',
    badge: 'CONTINUOUS CBOM',
    tagline: 'Continuous CBOM Discovery & Exploitability Prioritization',
    description: 'Automated engines maintaining an exact Cryptographic and Software Bill of Materials (CBOM/SBOM) with proactive vulnerability prioritization.',
    capabilities: [
      'Real-time cryptographic asset inventory mapped for post-quantum risk',
      'Weaponized exploit correlation prioritizing actively targeted CVEs',
      'Automated patch orchestration with automated rollback verification'
    ],
    impactMetric: '100% CBOM visibility · Zero untracked cryptographic assets',
    icon: BarChart3,
    href: '#platform-offerings'
  },
  {
    id: 'fraud-detection',
    number: 10,
    label: 'AI Fraud Detection',
    badge: 'TRANSACTION INTELLIGENCE',
    tagline: 'Sub-Millisecond Transaction Intelligence & Ring Defense',
    description: 'High-speed inference models analyzing transaction graph topologies and user signals to stop synthetic identity theft and payment fraud rings.',
    capabilities: [
      'Graph neural network fraud detection discovering hidden syndicate rings',
      'Synthetic identity correlation identifying fraudulent account creation',
      'Account takeover (ATO) prevention with continuous behavioral checks'
    ],
    impactMetric: 'Sub-10ms scoring latency · 75% fraud loss reduction',
    icon: TrendingUp,
    href: '#platform-offerings'
  },
  {
    id: 'identity-access-management',
    number: 11,
    label: 'AI Identity & Access (Zero-Trust IAM)',
    badge: 'PQC SPIFFE/SPIRE',
    tagline: 'Cryptographic Ephemeral Identities & Least-Privilege IAM',
    description: 'Micro-segmented identity fabric issuing short-lived, verifiable credentials (SPIFFE/SPIRE) to every user, microservice, and autonomous agent.',
    capabilities: [
      'Cryptographic SPIFFE/SPIRE ephemeral workload identities',
      'NIST PQC hybrid key encapsulation protecting against quantum decryption',
      'Just-in-time least-privilege tool execution for autonomous AI workers'
    ],
    impactMetric: 'Zero static secret exposure · Continuous token attestation',
    icon: Lock,
    href: '#agent-identity-iam'
  },
  {
    id: 'predictive-threat-intelligence',
    number: 12,
    label: 'AI Predictive Threat Intelligence',
    badge: 'ADVERSARIAL RED-TEAMING',
    tagline: 'Global Threat Feed Synthesis & Adversarial Simulation',
    description: 'Autonomous threat modeling ingesting worldwide attacker telemetry and running continuous adversarial breach simulations across your attack surface.',
    capabilities: [
      'Autonomous LLM jailbreak simulation and prompt-injection testing',
      'MITRE ATLAS adversarial profiling tailored to your model weights',
      'Predictive threat shielding pushing defensive rules before zero-days hit'
    ],
    impactMetric: 'Continuous 24/7 automated red-teaming · Predictive shielding',
    icon: Sparkles,
    href: '#platform-offerings'
  }
]

