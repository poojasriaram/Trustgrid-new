// TRUSTGRID.AI COMPREHENSIVE & COMPLETE SITE MAP v14.0
// Final Expert Content Model — 5 Levels Deep
// Structure: L1 Group > L2 Solution Area > L3 Engineering Area > L4 Offering > L5 Sub-Offering / Deliverables / Tech Stack

export interface L5SubOffering {
  id: string
  title: string
  deliverables: string[]
  techStack?: string[]
}

export interface L4Offering {
  id: string
  title: string
  tagline?: string
  subOfferings: string[]
  deliverables?: string[]
  techStack?: string[]
  duration?: string
  industryMappings?: string[]
}

export interface L3EngineeringArea {
  id: string
  code: string // e.g. "EA1", "EA2"
  title: string
  description?: string
  offerings: L4Offering[]
}

export interface L2SolutionArea {
  id: string
  code: string // e.g. "1A", "1B", "2A"
  title: string
  subtitle?: string
  slug: string
  engineeringAreas: L3EngineeringArea[]
}

export interface L1Group {
  id: string
  number: string
  title: string
  mapping?: string
  description?: string
  solutionAreas: L2SolutionArea[]
}

export interface CommonFoundation {
  industries: string[]
  methodologyDomains: {
    domain: string
    methods: string[]
  }[]
  keyMetrics: {
    name: string
    benchmarkOrImpact: string
    category: string
  }[]
  engagementModels: {
    title: string
    duration: string
    description: string
  }[]
  diagnosticTaxonomy: {
    steps: string[]
  }
}

export const siteMapV14: {
  version: string
  title: string
  home: {
    tagline: string
    domains: string
    industries: string
    delivery: string
  }
  groups: L1Group[]
  commonFoundation: CommonFoundation
} = {
  version: '14.0',
  title: 'TRUSTGRID.AI Comprehensive & Complete Site Map v14.0',
  home: {
    tagline: 'From Infrastructure to Intelligence',
    domains: '8 AI Engineering Domains',
    industries: '20+ Regulated Industries',
    delivery: 'Global Enterprise Delivery'
  },
  groups: [
    // GROUP 1 — AGENTIC ENTERPRISE
    {
      id: 'group-1',
      number: 'GROUP 1',
      title: 'AGENTIC ENTERPRISE',
      mapping: 'Agent Layer + Operations Layer',
      description: 'Architecting, industrializing, and orchestrating multi-agent systems and enterprise transformation into an autonomous operating system.',
      solutionAreas: [
        {
          id: 'sol-1a',
          code: '1A',
          title: 'AI AGENTIC + FACTORY',
          subtitle: 'Autonomous Agent Architecture, Multi-Agent Fleets & Governed AgentOps',
          slug: 'ai-agentic-factory',
          engineeringAreas: [
            {
              id: 'g1-1a-ea1',
              code: 'EA1',
              title: 'Agentic System Architecture',
              description: 'Foundational multi-agent cognitive architecture, planning hierarchies, memory fabrics, and tool execution boundaries.',
              offerings: [
                {
                  id: 'g1-1a-ea1-o1',
                  title: 'Autonomous Agent Design',
                  subOfferings: [
                    'Planning, Reasoning & Memory Architecture',
                    'Tool Use & Function Calling (MCP-native)',
                    'ReAct, Tree-of-Thought & Graph-of-Thought Patterns',
                    'Long-horizon test-time compute'
                  ],
                  deliverables: [
                    'Cognitive Architecture Blueprint',
                    'MCP Server & Tool Integration Manifest',
                    'Hierarchical Reasoning Engine Configuration',
                    'Test-Time Compute Budget Allocation Matrix'
                  ],
                  techStack: ['Model Context Protocol (MCP)', 'Tree-of-Thought (ToT)', 'Graph-of-Thought (GoT)', 'ReAct Framework', 'DSPy']
                },
                {
                  id: 'g1-1a-ea1-o2',
                  title: 'Multi-Agent Orchestration',
                  subOfferings: [
                    'CrewAI / AutoGen / LangGraph / NVIDIA Agent Toolkit',
                    'Agent-to-Agent (A2A) Protocol',
                    'Swarm Intelligence & Consensus Engines',
                    'Persistent Agent Memory Stores'
                  ],
                  deliverables: [
                    'Multi-Agent DAG Execution Graphs',
                    'A2A Encrypted Message Protocol Spec',
                    'Distributed Consensus & Conflict Resolution Engine',
                    'Hierarchical Episodic/Semantic Memory Architecture'
                  ],
                  techStack: ['LangGraph', 'CrewAI', 'Microsoft AutoGen', 'NVIDIA Agent Toolkit', 'Qdrant / Milvus', 'Redis Semantics']
                }
              ]
            },
            {
              id: 'g1-1a-ea2',
              code: 'EA2',
              title: 'Vertical Agent Factories',
              description: 'Domain-tailored agent fleets equipped with enterprise connectors, industry benchmarks, and operational autonomy.',
              offerings: [
                {
                  id: 'g1-1a-ea2-o1',
                  title: 'Industry Agent Fleets',
                  subOfferings: [
                    'Finance Ops Agents (Autonomous Finance)',
                    'Supply Chain Planning Agents',
                    'SRE / DevOps Agents',
                    'Customer Ops Agent Fleets',
                    'Knowledge-Work Automation',
                    'Physical AI / Robotics Agents',
                    'Cross-Functional Agent Workflows'
                  ],
                  deliverables: [
                    'Autonomous Billing & Reconciliation Fleet',
                    'Dynamic Multi-Tier Inventory Rebalancer',
                    'Autonomous Incident Detect-Diagnose-Remediate Loop',
                    'Omnichannel Resolution Swarm (Intake → QA)',
                    'Multi-Agent Research & Synthesis Workflows',
                    'Deterministic Edge Robot Control Agents'
                  ],
                  techStack: ['Enterprise ERP/ITSM Connectors', 'ROS 2 / NVIDIA Isaac', 'Claude 3.7 Sonnet / GPT-4o / DeepSeek-R1', 'SAP/Oracle Integrations']
                }
              ]
            },
            {
              id: 'g1-1a-ea3',
              code: 'EA3',
              title: 'Agent Lifecycle & Governance',
              description: 'Operational control plane for agent registry, versioning, runtime guardrails, and compliance assurance.',
              offerings: [
                {
                  id: 'g1-1a-ea3-o1',
                  title: 'AgentOps Platform',
                  subOfferings: [
                    'Agent Registry & Catalog',
                    'Versioning & Rollback (Canary & Blue/Green)',
                    'Monitoring & Evaluation (Eval Benchmarks)',
                    'Human-in-the-Loop Approval Gates'
                  ],
                  deliverables: [
                    'Centralized Agent Artifact Registry',
                    'Canary Deployment & Automated Rollback System',
                    'Real-Time Eval Telemetry & Drift Scoring',
                    'Multi-Tier Escalation Approval Dashboard'
                  ],
                  techStack: ['AgentOps', 'LangSmith', 'Arize AI', 'OpenTelemetry', 'Temporal.io']
                },
                {
                  id: 'g1-1a-ea3-o2',
                  title: 'Governance & Mistake-Proofing',
                  subOfferings: [
                    'Agent Audit Trail & Replay',
                    'Policy Enforcement & Boundary Checks',
                    'Jidoka & Poka-Yoke for Agents',
                    'Guardrails & Jailbreak Protection'
                  ],
                  deliverables: [
                    'Cryptographic Action Audit Ledger',
                    'Runtime Sandbox Security Rules',
                    'Jidoka Auto-Stop Thresholds on Low Confidence',
                    'Llama Guard / NeMo Guardrails Production Integration'
                  ],
                  techStack: ['NVIDIA NeMo Guardrails', 'Llama Guard', 'AWS Bedrock Guardrails', 'OpenPolicyAgent (OPA)']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-1b',
          code: '1B',
          title: 'AI ENTERPRISE TRANSFORMATION',
          subtitle: 'Strategy, Rapid Foundation Building, Operating Model & AI Literacy',
          slug: 'trusted-ai-transformation',
          engineeringAreas: [
            {
              id: 'g1-1b-ea1',
              code: 'EA1',
              title: 'Transformation Strategy',
              description: 'Executive alignment, strategic roadmapping, and enterprise AI maturity benchmarking.',
              offerings: [
                {
                  id: 'g1-1b-ea1-o1',
                  title: 'AI Transformation Roadmap',
                  subOfferings: [
                    'Hoshin Kanri Deployment',
                    'Balanced Scorecard Alignment',
                    'OKR 90-day Objectives',
                    'Maturity Assessment & Capability Gap Analysis'
                  ],
                  deliverables: [
                    'Hoshin Kanri X-Matrix Strategy Blueprint',
                    '4-Pillar AI Balanced Scorecard',
                    '90-Day Tactical OKR Cadence Plan',
                    'Enterprise AI Maturity Assessment Report'
                  ],
                  techStack: ['Hoshin Kanri X-Matrix', 'BSC Framework', 'OKR Management Systems']
                }
              ]
            },
            {
              id: 'g1-1b-ea2',
              code: 'EA2',
              title: 'Foundation & Productionization',
              description: 'Standing up governed enterprise platforms and converting experimental pilots into hardened production workflows in record time.',
              offerings: [
                {
                  id: 'g1-1b-ea2-o1',
                  title: 'Rapid Foundation Build',
                  subOfferings: [
                    'LLMOps / MLOps / AgentOps Setup',
                    'Data & Model Pipeline Modernization',
                    'Disconnected Pilots → Governed Platform <6 months'
                  ],
                  deliverables: [
                    'Enterprise AI Foundation Architecture',
                    'Unified Data & Feature Ingestion Pipeline',
                    'Consolidated Platform Migration Plan'
                  ],
                  techStack: ['MLflow', 'Kubeflow', 'Ray on Kubernetes', 'Feast Feature Store']
                },
                {
                  id: 'g1-1b-ea2-o2',
                  title: 'Accelerated Productionization',
                  subOfferings: [
                    '90–180 Day Production Agentic Workflows',
                    'TRUSTED AI from Day One',
                    'DevOps / CI/CD Integration'
                  ],
                  deliverables: [
                    'Production Hardened Agent Workflows',
                    'Automated Policy Gate CI/CD Integration',
                    'Initial ROI & Value Verification Report'
                  ],
                  techStack: ['GitHub Actions / GitLab CI', 'Argo CD', 'Terraform', 'Helm']
                }
              ]
            },
            {
              id: 'g1-1b-ea3',
              code: 'EA3',
              title: 'Operating Model & Culture',
              description: 'Redesigning organizational processes for human-agent collaboration and sustainable capability compounding.',
              offerings: [
                {
                  id: 'g1-1b-ea3-o1',
                  title: 'Agentic Operating Model',
                  subOfferings: [
                    'BPR & BPM for AI',
                    'Kata Improvement Routines',
                    'Kaizen & Change Management',
                    'AI Literacy Programs',
                    'Shingo Model Operational Culture'
                  ],
                  deliverables: [
                    'AI-Native Business Process Blueprints',
                    'Daily Toyota Kata Coaching Routines',
                    'Enterprise AI Literacy & Champion Curriculum',
                    'Shingo Model Assessment & Principles Guide'
                  ],
                  techStack: ['BPMN 2.0', 'Kata Coaching Rhythms', 'LMS Enterprise Modules']
                }
              ]
            }
          ]
        }
      ]
    },

    // GROUP 2 — AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING
    {
      id: 'group-2',
      number: 'GROUP 2',
      title: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
      mapping: 'Compute Layer + Facility Layer + Inference Optimization Layer',
      description: 'Turnkey AI Data Center engineering, high-density GPU cluster deployment, liquid cooling, power engineering, and radical inference cost reduction.',
      solutionAreas: [
        {
          id: 'sol-2a',
          code: '2A',
          title: 'AI INFRA & AI DATA CENTER ENGINEERING',
          subtitle: 'Strategic Site Due Diligence, High-Density Facilities, GPU Acceleration & Cluster Fabric',
          slug: 'ai-infra-engineering',
          engineeringAreas: [
            {
              id: 'g2-2a-ea1',
              code: 'EA1',
              title: 'Strategic & Commercial Engineering',
              description: 'Commercial validation, site due diligence, business case engineering, and tenant acquisition for AI data centers.',
              offerings: [
                {
                  id: 'g2-2a-ea1-o1',
                  title: 'Site Selection & Due Diligence',
                  subOfferings: [
                    'Power Grid & Substation Proximity Analysis',
                    'Fiber Route & Latency Modeling',
                    'Seismic / Flood / Water Risk Scoring',
                    'ESG & Regulatory Mapping',
                    'Sovereignty & Data Residency Analysis'
                  ],
                  deliverables: [
                    'Site Feasibility & Due Diligence Dossier',
                    'Substation Interconnect & Capacity Analysis',
                    'Dark Fiber & Carrier Diversity Assessment',
                    'Jurisdictional Sovereign Compliance Report'
                  ],
                  techStack: ['GIS Mapping Tools', 'Power Grid Telemetry', 'Substation Modeling', 'Risk Heatmaps']
                },
                {
                  id: 'g2-2a-ea1-o2',
                  title: 'Business Model Creation & Investment Engineering',
                  subOfferings: [
                    'Colo / Hyperscale / Build-to-Suit Models',
                    'AI Factory-as-a-Service Business Case',
                    'TCO / LCC / Throughput Accounting',
                    'IRR / ROI Board Deck',
                    'Funding & PPA Strategy'
                  ],
                  deliverables: [
                    '20-Year Financial Model (CapEx/OpEx/IRR/NPV)',
                    'AI Factory-as-a-Service Offering Blueprint',
                    'PPA (Power Purchase Agreement) Structuring Report',
                    'CFO/Board Investment Decision Package'
                  ],
                  techStack: ['Throughput Accounting', 'Life Cycle Costing (LCC)', 'Monte Carlo Financial Simulators']
                },
                {
                  id: 'g2-2a-ea1-o3',
                  title: 'Demand Assessment & Market Intelligence',
                  subOfferings: [
                    'AI Workload Forecasting (Training vs Inference vs Agentic)',
                    'Anchor Tenant Analysis',
                    'Industry Vertical Demand Mapping',
                    'Competitive Benchmarking'
                  ],
                  deliverables: [
                    '5-Year AI Workload Compute Demand Forecast',
                    'Hyperscale & Enterprise Anchor Tenant Target Matrix',
                    'Regional Megawatt Supply/Demand Dynamics Report'
                  ],
                  techStack: ['Predictive Workload Modeling', 'Market Intelligence Databases']
                },
                {
                  id: 'g2-2a-ea1-o4',
                  title: 'Sales Acceleration of Data Center Offerings',
                  subOfferings: [
                    'Offer Structuring (Rack / MW / Token-as-a-Service / GPU-as-a-Service)',
                    'GTM & Anchor Tenant Acquisition',
                    'Channel & Ecosystem Sales'
                  ],
                  deliverables: [
                    'Tiered Commercial Pricing & SLA Catalog',
                    'GPUaaS Commercial Term Sheets',
                    'Anchor Tenant Pipeline Acceleration Playbook'
                  ],
                  techStack: ['GPU-as-a-Service Billing', 'Token-as-a-Service Metering Platforms']
                }
              ]
            },
            {
              id: 'g2-2a-ea2',
              code: 'EA2',
              title: 'Facility & High-Density Engineering',
              description: 'Thermal, power, structural, and resilience engineering for extreme density AI compute facilities.',
              offerings: [
                {
                  id: 'g2-2a-ea2-o1',
                  title: 'High-Density Data Center Architecture',
                  subOfferings: [
                    '30–100+ kW/rack Design',
                    'Direct-to-Chip & Immersion Liquid Cooling',
                    'PUE <1.2 / WUE / CUE Optimization',
                    '5S/6S & TPM for Data Center'
                  ],
                  deliverables: [
                    'High-Density Mechanical/Electrical Schematics (CDU/Coolant Distribution)',
                    'CFD Thermal Simulation & Airflow Analysis',
                    'PUE/WUE Continuous Optimization Protocol',
                    'Data Center 6S Hygiene & Maintenance Framework'
                  ],
                  techStack: ['Direct-to-Chip (DLC)', 'Two-Phase Immersion', 'Cooling Distribution Units (CDUs)', 'CFD Fluid Simulators']
                },
                {
                  id: 'g2-2a-ea2-o2',
                  title: 'Power & Sustainability Engineering',
                  subOfferings: [
                    'Renewable Co-location (Solar/Wind/Nuclear/BESS)',
                    'Digital Twin for Energy',
                    'Carbon-Aware Scheduling',
                    'OEE for Facility'
                  ],
                  deliverables: [
                    'Renewable Microgrid Interconnect Blueprint',
                    'Facility Digital Twin Thermodynamic Model',
                    'Carbon-Aware Workload Orchestrator Config',
                    'Facility OEE Real-Time Telemetry Dashboard'
                  ],
                  techStack: ['BESS Integration', 'Digital Twin IoT Gateways', 'Carbon API Workload Shifters']
                },
                {
                  id: 'g2-2a-ea2-o3',
                  title: 'Sovereign & Resilient Design',
                  subOfferings: [
                    'Air-Gapped Architecture',
                    'Hybrid Multi-Cloud & On-Prem',
                    'Hybrid Classical–Quantum Readiness'
                  ],
                  deliverables: [
                    'Classified Air-Gap Physical/Logical Isolation Blueprint',
                    'Hybrid Control Plane Architecture',
                    'Quantum Co-Processor Interface Specification'
                  ],
                  techStack: ['Hardware Security Modules (HSM)', 'Optical Diodes', 'QPU Interconnect Interfaces']
                }
              ]
            },
            {
              id: 'g2-2a-ea3',
              code: 'EA3',
              title: 'GPU, LLM & PERFORMANCE OPTIMIZATION ENGINEERING',
              description: 'Core hardware acceleration, kernel tuning, inference pipeline optimization, and cluster-wide throughput engineering.',
              offerings: [
                {
                  id: 'g2-2a-ea3-o1',
                  title: 'GPU Acceleration & Utilization Engineering',
                  subOfferings: [
                    'GPU Utilization Optimization',
                    'Idle Capacity Elimination',
                    'Multi-GPU / Multi-Node Scheduling',
                    'NVIDIA CUDA / TensorRT / NIM',
                    'Blackwell / Rubin / Hopper Optimization',
                    'Cost per GPU-hour reduction'
                  ],
                  deliverables: [
                    'GPU Utilization Audit & Kernel Profiling Report',
                    'Multi-Node Slurm / Kubernetes GPU Scheduler Configuration',
                    'Custom CUDA/Triton Kernel Acceleration Packages',
                    'GPU-Hour Cost Reduction Roadmap (20–40% immediate)'
                  ],
                  techStack: ['NVIDIA CUDA 12.x', 'TensorRT-LLM', 'NVIDIA NIM', 'Triton Inference Server', 'NVLink 5', 'PyTorch 2.x']
                },
                {
                  id: 'g2-2a-ea3-o2',
                  title: 'LLM & Inference Optimization Engineering',
                  subOfferings: [
                    'LLM Inference Pipeline Optimization',
                    'Latency & Throughput Engineering',
                    'Quantization / Speculative Decoding / Continuous Batching',
                    'Cost per Token / Cost per Inference reduction (30–60%)',
                    'Distributed Inference Frameworks'
                  ],
                  deliverables: [
                    'Quantized Model Weights (FP8/INT4/AWQ/GPTQ)',
                    'Speculative Decoding Drafting Model Config (Medusa/Eagle)',
                    'PagedAttention & Chunked Prefill Serving Setup',
                    '30–60% Cost-per-Token Reduction Audit'
                  ],
                  techStack: ['vLLM', 'SGLang', 'TensorRT-LLM', 'FlashAttention-3', 'AutoAWQ', 'Marlin Kernel']
                },
                {
                  id: 'g2-2a-ea3-o3',
                  title: 'AI Cluster Performance Engineering',
                  subOfferings: [
                    'Cluster-level Performance Tuning',
                    'End-to-end AI Workload Optimization',
                    'DMAIC & SPC for Infra Quality',
                    'Real-time Performance Monitoring'
                  ],
                  deliverables: [
                    'End-to-End Workload Trace & Profiling Report',
                    'Statistical Process Control (SPC) Latency Dashboards',
                    'Automated Straggler Node Detection & Remediation Engine'
                  ],
                  techStack: ['PyTorch Profiler', 'NVIDIA Nsight Systems', 'Prometheus', 'Grafana AI Dashboards']
                }
              ]
            },
            {
              id: 'g2-2a-ea4',
              code: 'EA4',
              title: 'AI Fabric Engineering',
              description: 'Ultra-low latency non-blocking interconnects for multi-thousand GPU collective communications.',
              offerings: [
                {
                  id: 'g2-2a-ea4-o1',
                  title: 'High-Performance AI Fabric',
                  subOfferings: [
                    'InfiniBand NDR/XDR',
                    'RoCE v2',
                    'NVLink & NVSwitch',
                    'Ultra Ethernet',
                    'SMED for Fabric Deployment'
                  ],
                  deliverables: [
                    'Rail-Optimized Non-Blocking Fat-Tree Topology',
                    'GPUDirect RDMA & Storage Benchmark Dossier',
                    'NCCL Parameter Tuning & Collective Communication Optimization',
                    'SMED Fabric Fast-Changeover Deployment Guide'
                  ],
                  techStack: ['NVIDIA Quantum-2 / Quantum-X800 InfiniBand', 'RoCEv2 with PFC/ECN', 'NVLink Switch System', 'Ultra Ethernet Consortium (UEC)']
                }
              ]
            },
            {
              id: 'g2-2a-ea5',
              code: 'EA5',
              title: 'Deployment & Operations Engineering',
              description: 'Turnkey construction management, continuous operations, and AIOps for production AI factories.',
              offerings: [
                {
                  id: 'g2-2a-ea5-o1',
                  title: 'Build & Commissioning',
                  subOfferings: [
                    'Construction Management',
                    'Retrofit & Expansion',
                    'Rapid Productionization of Experimental AI'
                  ],
                  deliverables: [
                    'Factory Commissioning (Level 1–5 Testing) Sign-Off',
                    'Brownfield AI Retrofit Engineering Plan',
                    'Experimental AI Sandbox to Production Gate Protocol'
                  ],
                  techStack: ['BIM 360', 'Commissioning Test Harnesses', 'Kubernetes Bare-Metal']
                },
                {
                  id: 'g2-2a-ea5-o2',
                  title: 'Managed Operations',
                  subOfferings: [
                    'Managed AI Factory',
                    'Continuous GPU & LLM Optimization',
                    'AI NOC Integration',
                    'AIOps & Digital Twin',
                    'Continuous Kaizen Optimization'
                  ],
                  deliverables: [
                    '24/7 Managed AI Operations SLA (99.99% Availability)',
                    'Quarterly GPU/LLM Efficiency Optimization Reports',
                    'AI NOC Incident Response Playbooks',
                    'Continuous Kaizen Unit-Cost Reduction Log'
                  ],
                  techStack: ['TrustGrid AI NOC', 'AIOps Event Correlator', 'Kaizen Tracker']
                }
              ]
            },
            {
              id: 'g2-2a-ea6',
              code: 'EA6',
              title: 'Industry Use Cases',
              description: 'Pre-architected, sector-validated AI Data Center and compute deployments.',
              offerings: [
                {
                  id: 'g2-2a-ea6-o1',
                  title: 'Banking & Financial Services',
                  subOfferings: ['Sovereign BFSI AI Factory', 'Real-Time Fraud Inference', 'Low-Latency Trading Compute']
                },
                {
                  id: 'g2-2a-ea6-o2',
                  title: 'Healthcare & Life Sciences',
                  subOfferings: ['HIPAA Air-Gapped Genomics', 'Medical Imaging Inference', 'GPU-as-a-Service for Drug Discovery']
                },
                {
                  id: 'g2-2a-ea6-o3',
                  title: 'Manufacturing & Energy',
                  subOfferings: ['Edge AI Data Center for Physical AI & Robotics', 'Renewable-Co-located Factory', 'Digital Twin Factory']
                },
                {
                  id: 'g2-2a-ea6-o4',
                  title: 'Government & Aerospace & Defense',
                  subOfferings: ['Classified Sovereign Data Center', 'Ruggedized Edge AI', 'Satellite + FSO Resilient Backhaul']
                }
              ]
            }
          ]
        }
      ]
    },

    // GROUP 3 — AI NETWORKING
    {
      id: 'group-3',
      number: 'GROUP 3',
      title: 'AI NETWORKING',
      mapping: 'Enterprise Networking + Data Center Networking + Satellite Communication + Telecom NOC',
      description: 'Ultra-low latency InfiniBand/RoCEv2 fabrics, non-terrestrial satellite networks (NTN/FSO/QKD), and autonomous AI NOC operations.',
      solutionAreas: [
        {
          id: 'sol-3a',
          code: '3A',
          title: 'ENTERPRISE & DATA CENTER NETWORKING',
          subtitle: 'AI-Optimized WAN, Multicloud Interconnect, GPU Fabrics & Next-Gen Wireless',
          slug: 'ai-networking',
          engineeringAreas: [
            {
              id: 'g3-3a-ea1',
              code: 'EA1',
              title: 'AI-Optimized Enterprise Networking',
              description: 'Optimizing wide-area and data center fabrics for distributed multi-site and multi-cloud AI workloads.',
              offerings: [
                {
                  id: 'g3-3a-ea1-o1',
                  title: 'AI-Optimized WAN & Multicloud',
                  subOfferings: [
                    'SD-WAN with AI Routing',
                    'Multi-Cloud Interconnect',
                    'Value Stream Mapping for Data Traffic'
                  ],
                  deliverables: [
                    'AI-Aware SD-WAN Topology & Policy Engine',
                    'Multi-Cloud Direct Interconnect Fabric (AWS/Azure/GCP/CoreWeave)',
                    'Data Movement Value Stream Map & Egress Cost Optimization'
                  ],
                  techStack: ['Cisco / Arista / Juniper SD-WAN', 'Megaport / Equinix Fabric', 'AI Path Optimizers']
                },
                {
                  id: 'g3-3a-ea1-o2',
                  title: 'Data Center Networking & Fabric',
                  subOfferings: [
                    'High-Performance GPU Cluster Fabrics',
                    'Leaf-Spine / Clos Architectures for AI',
                    'Ultra-low latency design'
                  ],
                  deliverables: [
                    '800G/1.6T Clos Network Architecture',
                    'PFC (Priority Flow Control) & ECN Tuning Specifications',
                    'Sub-Microsecond Zero-Loss Network Baseline'
                  ],
                  techStack: ['Arista 7800R3 / 7060X5', 'NVIDIA Spectrum-4 / Quantum-2', 'Broadcom Tomahawk 5']
                }
              ]
            },
            {
              id: 'g3-3a-ea2',
              code: 'EA2',
              title: 'Next-Generation Wireless & Edge',
              description: 'Private 5G, mmWave, and next-gen WiFi engineering for physical AI, robotics, and high-density compute.',
              offerings: [
                {
                  id: 'g3-3a-ea2-o1',
                  title: 'Wide Area Wireless Networking (WAWN)',
                  subOfferings: [
                    'Private 5G for AI Factory',
                    'Private 5G + Edge Inference',
                    'CBRS & mmWave Engineering'
                  ],
                  deliverables: [
                    'Private 5G Standalone (SA) Core Architecture',
                    'URLLC (<5ms Latency) RF Propagation Model',
                    'CBRS Spectrum Allocation & Edge Compute Placement'
                  ],
                  techStack: ['OpenRAN', 'Private 5G SA Core', 'Qualcomm Snapdragon Edge', 'CBRS Band 48']
                },
                {
                  id: 'g3-3a-ea2-o2',
                  title: 'Next-Gen Wireless',
                  subOfferings: [
                    'WiFi 7 / WiFi 8 Design for High-Density GPU Clusters',
                    '6G Readiness & AI-Native Air Interface',
                    'TOC for Network Bottleneck Analysis'
                  ],
                  deliverables: [
                    'WiFi 7 Multi-Link Operation (MLO) Deployment Plan',
                    '6G AI-Native Radio Interface Readiness Paper',
                    'Network Throughput Constraint Elimination Map'
                  ],
                  techStack: ['IEEE 802.11be (WiFi 7)', 'WiFi 8 Draft Standard', 'Theory of Constraints (TOC)']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-3b',
          code: '3B',
          title: 'NON-TERRESTRIAL NETWORKS (NTN) & SATELLITE COMMUNICATION',
          subtitle: 'Inter-Satellite Links, LEO Broadband, Free Space Optics & Quantum Satellite Keys',
          slug: 'satellite-ntn-networking',
          engineeringAreas: [
            {
              id: 'g3-3b-ea1',
              code: 'EA1',
              title: 'Satellite Connectivity for AI',
              description: 'Space-to-space and space-to-ground high-bandwidth connectivity for global AI distribution and resilience.',
              offerings: [
                {
                  id: 'g3-3b-ea1-o1',
                  title: 'Satellite-to-Satellite (ISL) Communication',
                  subOfferings: [
                    'GEO-to-LEO Relay',
                    'LEO-to-LEO Laser ISL',
                    'MEO-to-LEO RF ISL',
                    'AI-Driven Orbit & Link Switching',
                    'Autonomous Constellation Management'
                  ],
                  deliverables: [
                    'Laser Optical Inter-Satellite Link (OISL) Architecture',
                    'Dynamic Orbit Switching Algorithm Spec',
                    'Constellation Autonomous Routing Mesh'
                  ],
                  techStack: ['Optical ISL (100 Gbps+)', 'Dynamic Space Routing Protocols', 'SDR Ground Station Interfaces']
                },
                {
                  id: 'g3-3b-ea1-o2',
                  title: 'LEO Broadband Network for AI',
                  subOfferings: [
                    'Starlink / OneWeb / Kuiper Integration',
                    'AI Factory Backhaul via LEO',
                    'Edge AI in Remote / Maritime Sites',
                    'Latency-Aware Workload Placement'
                  ],
                  deliverables: [
                    'Direct LEO Gateway Integration Architecture',
                    'Multi-Constellation Resilient SD-WAN Hybrid',
                    'Remote Maritime/Defense Edge Inference Nodes'
                  ],
                  techStack: ['Starlink Business / Direct-to-Cell', 'Eutelsat OneWeb', 'Amazon Kuiper', 'Ruggedized LEO Terminals']
                },
                {
                  id: 'g3-3b-ea1-o3',
                  title: 'Free Space Optics (FSO) & Laser Communication',
                  subOfferings: [
                    'Ground-to-Satellite FSO',
                    'Terrestrial FSO for Data Center Interconnect (DCI)',
                    'Weather-Aware FSO/RF Failover',
                    'Optical Ground Station Engineering'
                  ],
                  deliverables: [
                    '100 Gbps Terrestrial FSO Interconnect Blueprint',
                    'Weather-Predictive Hybrid FSO/mmWave Auto-Switching System',
                    'Optical Ground Station (OGS) Siting & Atmospheric Analysis'
                  ],
                  techStack: ['Terrestrial FSO Laser Heads', 'Adaptive Optics Subsystems', 'Predictive Weather Telemetry']
                },
                {
                  id: 'g3-3b-ea1-o4',
                  title: 'Quantum Communication over Satellite',
                  subOfferings: [
                    'QKD via Satellite (BB84 / E91 Protocol)',
                    'Entanglement Distribution for AI Clusters',
                    'Quantum Internet Readiness',
                    'AI-Driven QBER Optimization'
                  ],
                  deliverables: [
                    'Satellite QKD Optical Payload Specification',
                    'Quantum Key Distribution Station Interface',
                    'Real-Time Quantum Bit Error Rate (QBER) AI Optimizer'
                  ],
                  techStack: ['BB84 / E91 Quantum Protocols', 'Single Photon Detectors', 'Entanglement Sources']
                }
              ]
            },
            {
              id: 'g3-3b-ea2',
              code: 'EA2',
              title: 'AI-Driven NTN Operations',
              description: 'AI algorithms optimizing orbital mechanics, Doppler shifting, and space-to-ground link budgets.',
              offerings: [
                {
                  id: 'g3-3b-ea2-o1',
                  title: 'Intelligent NTN Management',
                  subOfferings: [
                    'AI-Based Doppler Correction & Beam Steering',
                    'Link Budget Optimization',
                    'Predictive Link Degradation'
                  ],
                  deliverables: [
                    'Real-Time Doppler Shift Neural Compensator',
                    'Dynamic Phased-Array Beam Tracking Controller',
                    'Predictive Atmospheric Fade Model'
                  ],
                  techStack: ['Phased Array Beamforming DSP', 'Predictive Orbital Models', 'TensorFlow Lite for SDR']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-3c',
          code: '3C',
          title: 'AI NETWORK OPERATIONS CENTER (AI NOC) & TELECOM',
          subtitle: 'Self-Healing Fabrics, Intent-Based Operations & Carrier-Grade Telecommunications',
          slug: 'ai-noc-telecom',
          engineeringAreas: [
            {
              id: 'g3-3c-ea1',
              code: 'EA1',
              title: 'Intelligent Network Operations',
              description: 'Closed-loop autonomous network operations, per-flow telemetry, and telecom carrier integration.',
              offerings: [
                {
                  id: 'g3-3c-ea1-o1',
                  title: 'AI NOC Capabilities',
                  subOfferings: [
                    'Self-Healing AI Networks',
                    'Intent-Based Networking',
                    'Digital Twin for Network',
                    'Kanban for Network Change',
                    'Real-Time Agentic Workflow Optimization',
                    'Low-Latency for Physical AI'
                  ],
                  deliverables: [
                    'Autonomous Microburst Remediation Engine',
                    'Intent-Based Network Policy Translator',
                    'Digital Twin Network Emulation Environment',
                    'Kanban Network Change Governance Board'
                  ],
                  techStack: ['TrustGrid AI NOC', 'gNMI / OpenConfig Telemetry', 'Batfish Network Emulation']
                },
                {
                  id: 'g3-3c-ea1-o2',
                  title: 'Telecom & Carrier-Grade Operations',
                  subOfferings: [
                    'Telecom NOC Integration',
                    'Carrier-grade SLAs for AI Workloads',
                    'Multi-domain Orchestration'
                  ],
                  deliverables: [
                    'Carrier OSS/BSS Integration Architecture',
                    'Five-Nines (99.999%) AI Workload SLA Verification Suite',
                    'End-to-End Multi-Domain Network Slice Orchestrator'
                  ],
                  techStack: ['TMF Open APIs', 'ETSI NFV Orchestration', '3GPP Network Slicing']
                }
              ]
            }
          ]
        }
      ]
    },

    // GROUP 4 — AI CYBERSECURITY & QUANTUM-SAFE NETWORKING
    {
      id: 'group-4',
      number: 'GROUP 4',
      title: 'AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
      mapping: 'Security Layer + Post-Quantum Cryptography Layer + Zero-Trust Layer',
      description: 'L1–L7 Quantum-Safe Encryption (PQC/CBOM), adversarial agent defense, zero-trust microsegmentation, and 24/7 Managed AI SOC.',
      solutionAreas: [
        {
          id: 'sol-4a',
          code: '4A',
          title: 'QUANTUM-SAFE ENCRYPTION',
          subtitle: 'L1–L7 Post-Quantum Cryptography, CBOM Discovery & Harvest Now Decrypt Later Defense',
          slug: 'quantum-safe-encryption',
          engineeringAreas: [
            {
              id: 'g4-4a-ea1',
              code: 'EA1',
              title: 'Transport to Application Layer (L1–L7)',
              description: 'Full OSI stack post-quantum migration engineering protecting critical data from future quantum decryption.',
              offerings: [
                {
                  id: 'g4-4a-ea1-o1',
                  title: 'L1–L2 Encryption (Physical / Data Link)',
                  subOfferings: [
                    'MACsec with PQC (CRYSTALS-Kyber)',
                    'Quantum-Safe OTNsec for DCI & FSO',
                    'FSO Link Layer Quantum Encryption'
                  ],
                  deliverables: [
                    '800G Line-Rate PQC MACsec Hardware Deployment',
                    'Quantum-Safe Optical Transport Network (OTN) Specification',
                    'FSO Photonic Link Layer Key Integration'
                  ],
                  techStack: ['CRYSTALS-Kyber (ML-KEM)', 'MACsec IEEE 802.1AE', 'OTNsec Hardware ASICs']
                },
                {
                  id: 'g4-4a-ea1-o2',
                  title: 'L3–L4 Encryption (Network / Transport)',
                  subOfferings: [
                    'IPsec with PQC Hybrid',
                    'TLS 1.3 + PQC (Kyber + Dilithium)',
                    'QUIC + PQC for AI Inference',
                    'Quantum-Secured SD-WAN',
                    'Satellite Link IPsec with QKD Keys'
                  ],
                  deliverables: [
                    'Hybrid PQC-IPsec Gateway Configuration',
                    'Post-Quantum TLS 1.3 Enterprise Termination',
                    'Ultra-Low Latency PQC-QUIC Serving Endpoint',
                    'QKD-Keyed Satellite Encryption Gateway'
                  ],
                  techStack: ['CRYSTALS-Dilithium (ML-DSA)', 'IETF PQC-TLS 1.3', 'OpenSSL 3.x / OQS-Provider', 'WireGuard PQC Hybrid']
                },
                {
                  id: 'g4-4a-ea1-o3',
                  title: 'L7 Encryption (Application Layer)',
                  subOfferings: [
                    'Quantum-Safe mTLS for Agent-to-Agent (A2A)',
                    'API Gateway with PQC',
                    'QKD-Protected AI Inference APIs',
                    'Homomorphic Encryption & Confidential Computing',
                    'Application-Layer Token Encryption'
                  ],
                  deliverables: [
                    'A2A Quantum-Safe Identity & mTLS Mesh',
                    'PQC-Secured Envoy API Gateway',
                    'Confidential Computing AMD SEV-SNP / Intel SGX Enclave Architecture',
                    'Field-Level PQC Token Encryption Library'
                  ],
                  techStack: ['Envoy Gateway with PQC', 'Microsoft SEAL (Homomorphic)', 'AMD SEV-SNP / Intel SGX / NVIDIA H100 Confidential']
                },
                {
                  id: 'g4-4a-ea1-o4',
                  title: 'Cryptographic Agility & Management',
                  subOfferings: [
                    'CBOM Generation & Discovery',
                    'PQC Migration Roadmap (8–16 wks)',
                    'Crypto-Agility Framework',
                    'Harvest Now Decrypt Later (HNDL) Protection',
                    'Life Cycle Costing for Crypto Transition'
                  ],
                  deliverables: [
                    'Enterprise Cryptographic Bill of Materials (CBOM)',
                    'Executive PQC Transition Roadmap & Risk Scoring',
                    'Crypto-Agility Software Abstraction SDK',
                    'HNDL Vulnerability Exposure Matrix'
                  ],
                  techStack: ['CycloneDX CBOM standard', 'Automated Static Code & Network Crypto Scanners', 'NIST FIPS 203/204/205']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-4b',
          code: '4B',
          title: 'AI SYSTEM & AGENT SECURITY',
          subtitle: 'LLM Guardrails, Model IP Watermarking, Jailbreak Defense & Adversarial Hardening',
          slug: 'ai-cybersecurity-quantum-safe',
          engineeringAreas: [
            {
              id: 'g4-4b-ea1',
              code: 'EA1',
              title: 'AI Factory & Agent Fleet Security',
              description: 'Hardening models, weights, prompts, and autonomous agent executions against adversarial attacks.',
              offerings: [
                {
                  id: 'g4-4b-ea1-o1',
                  title: 'Core Security Controls',
                  subOfferings: [
                    'LLM / Agent Guardrails & Jailbreak Protection',
                    'Model IP Protection & Watermarking',
                    'Adversarial Robustness Testing',
                    'FMEA for Security Failure Modes',
                    '8D & 5 Whys for Incident Response'
                  ],
                  deliverables: [
                    'Real-Time Prompt Injection Interceptor',
                    'Model Weight Cryptographic Fingerprinting & Watermarking',
                    'Automated Adversarial Red-Teaming Benchmark Report',
                    'Security Failure Mode & Effects Analysis (FMEA) Matrix'
                  ],
                  techStack: ['NVIDIA NeMo Guardrails', 'Garak LLM Vulnerability Scanner', 'Llama Guard 3', 'PyRIT (Python Risk Identification Tool)']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-4c',
          code: '4C',
          title: 'ZERO-TRUST & AI SECURITY OPERATIONS',
          subtitle: 'Identity-Aware Agent Mesh, Micro-Segmentation & 24/7 Managed AI SOC',
          slug: 'zero-trust-ai-soc',
          engineeringAreas: [
            {
              id: 'g4-4c-ea1',
              code: 'EA1',
              title: 'Zero-Trust for AI & Agents',
              description: 'Enforcing cryptographic identities, least-privilege tool access, and dynamic micro-segmentation for AI.',
              offerings: [
                {
                  id: 'g4-4c-ea1-o1',
                  title: 'Zero-Trust Architecture',
                  subOfferings: [
                    'Identity-Aware Agent Mesh',
                    'Zero-Trust Architecture (8–12 wks)',
                    'Agent Identity & Access Management (IAM)',
                    'Micro-Segmentation for GPU Clusters'
                  ],
                  deliverables: [
                    'SPIFFE/SPIRE Dynamic Agent Workload Identity Blueprint',
                    'Agent IAM Least-Privilege Policy Engine',
                    'Calico / Cilium eBPF GPU Micro-Segmentation Manifest'
                  ],
                  techStack: ['SPIFFE / SPIRE', 'Cilium eBPF', 'Tetragon Security Observability', 'HashiCorp Vault']
                }
              ]
            },
            {
              id: 'g4-4c-ea2',
              code: 'EA2',
              title: 'AI Security Operations Center (AI SOC)',
              description: 'Specialized 24/7 security monitoring, telemetry correlation, and autonomous incident response for AI systems.',
              offerings: [
                {
                  id: 'g4-4c-ea2-o1',
                  title: 'Managed AI Security',
                  subOfferings: [
                    'AI-Driven Threat Detection for AI Workloads',
                    'Automated Incident Response Playbooks',
                    '24/7 Managed AI Security Operations',
                    'AI SOC + AI NOC Integration',
                    'SPC for Security Metrics'
                  ],
                  deliverables: [
                    '24/7 Managed AI SOC Service SLA',
                    'Automated Agent Hijacking Containment Playbook',
                    'Integrated AI SOC / AI NOC Telemetry Correlation Dashboard',
                    'SPC Threat Rate Statistical Process Control Charts'
                  ],
                  techStack: ['TrustGrid AI SOC', 'Wazuh / Elastic SIEM for AI', 'Cortex XSOAR / Tines Automation']
                }
              ]
            }
          ]
        }
      ]
    },

    // GROUP 5 — TRUSTED AI ENGINEERING
    {
      id: 'group-5',
      number: 'GROUP 5',
      title: 'TRUSTED AI ENGINEERING',
      mapping: 'Trust Layer + Governance & Assurance Layer',
      description: 'Mathematical explainability (SHAP/LIME), decision traceability, formal robustness, continuous SPC monitoring, and EU AI Act compliance.',
      solutionAreas: [
        {
          id: 'sol-5a',
          code: '5A',
          title: 'TRUSTWORTHY AI ARCHITECTURE',
          subtitle: 'Explainability, Decision Traceability, Robustness Verification & Poka-Yoke Safeguards',
          slug: 'trusted-ai-architecture',
          engineeringAreas: [
            {
              id: 'g5-5a-ea1',
              code: 'EA1',
              title: 'Explainability, Robustness & Safety',
              description: 'Engineering interpretability, fault containment, and formal safety properties directly into AI pipelines.',
              offerings: [
                {
                  id: 'g5-5a-ea1-o1',
                  title: 'Explainability & Transparency',
                  subOfferings: [
                    'SHAP / LIME Engineering',
                    'Decision Traceability & Causal Provenance',
                    'Auditability Logs & Visual Justifications'
                  ],
                  deliverables: [
                    'Real-Time Feature Attribution Service (SHAP/LIME/Integrated Gradients)',
                    'Immutable Causal Decision Graph Architecture',
                    'Regulator & Auditor Explanation Portal'
                  ],
                  techStack: ['SHAP', 'Captum', 'LIME', 'Alibi Explain', 'TrustGrid Decision Ledger']
                },
                {
                  id: 'g5-5a-ea1-o2',
                  title: 'Robustness & Safety',
                  subOfferings: [
                    'Adversarial Testing & Boundary Verification',
                    'FMEA for AI Failure',
                    'Poka-Yoke for AI Decisions',
                    'Jidoka for Auto-Stop on Failure'
                  ],
                  deliverables: [
                    'Distribution Shift & Out-of-Distribution (OOD) Detector',
                    'AI Failure Modes & Effects Analysis (FMEA)',
                    'Poka-Yoke Schema & Logic Mistake-Proofing Guards',
                    'Jidoka Autonomous Execution Halting Service'
                  ],
                  techStack: ['Cleanlab', 'Great Expectations', 'FMEA Matrices', 'Jidoka Interlock Triggers']
                }
              ]
            }
          ]
        },
        {
          id: 'sol-5b',
          code: '5B',
          title: 'GOVERNANCE & ASSURANCE',
          subtitle: 'Responsible AI, Statistical Process Control (SPC), Regulatory Audit & Root Cause Analysis',
          slug: 'governance-assurance',
          engineeringAreas: [
            {
              id: 'g5-5b-ea1',
              code: 'EA1',
              title: 'Responsible AI & Continuous Monitoring',
              description: 'Continuous compliance assurance against EU AI Act, NIST AI RMF, ISO 42001, and production drift telemetry.',
              offerings: [
                {
                  id: 'g5-5b-ea1-o1',
                  title: 'Responsible AI Governance',
                  subOfferings: [
                    'Policy Framework Implementation',
                    'Regulatory Audit Prep (EU AI Act, NIST AI RMF, ISO 42001)',
                    'Balanced Scorecard for Trust',
                    'TQM & PDCA for Trust'
                  ],
                  deliverables: [
                    'Enterprise AI Governance Policy & Control Framework',
                    'EU AI Act Conformity Assessment Dossier',
                    'Trust Balanced Scorecard & Board Risk Dashboard',
                    'PDCA Continuous Trust Review Cadence'
                  ],
                  techStack: ['ISO/IEC 42001 Audit Toolkits', 'NIST AI RMF 1.0 Controls', 'EU AI Act Compliance Templates']
                },
                {
                  id: 'g5-5b-ea1-o2',
                  title: 'Continuous Trust Monitoring',
                  subOfferings: [
                    'Production Trust Monitoring',
                    'SPC for Model Drift',
                    '5 Whys & Ishikawa for Bias Root Cause',
                    'A3 for Trust Problem Solving'
                  ],
                  deliverables: [
                    'Production Model & Agent Drift Telemetry Feed',
                    'Statistical Process Control (SPC) Charts for Fairness & Accuracy',
                    'Ishikawa Cause-and-Effect Bias Root Cause Reports',
                    'A3 Problem Solving Action Sheets'
                  ],
                  techStack: ['Evidently AI', 'WhyLabs', 'Prometheus Trust Exporters', 'SPC Control Limit Engines']
                }
              ]
            }
          ]
        }
      ]
    },

    // GROUP 6 — AI VALUE ENGINEERING & ACCELERATION
    {
      id: 'group-6',
      number: 'GROUP 6',
      title: 'AI VALUE ENGINEERING & ACCELERATION',
      mapping: 'Economics Layer + Strategy Layer + Value Realization Office',
      description: 'Bridging technical compute metrics directly to CFO P&L impact, AI FinOps, Theory of Constraints (TOC), and permanent VRO governance.',
      solutionAreas: [
        {
          id: 'sol-6a',
          code: '6A',
          title: 'AI VALUE ENGINEERING',
          subtitle: 'Value Discovery, FinOps Unit Economics, Acceleration Sprints & Strategic Enterprise OS',
          slug: 'ai-value-engineering',
          engineeringAreas: [
            {
              id: 'g6-6a-ea1',
              code: 'EA1',
              title: 'Value Discovery & Business Case',
              description: 'Board-ready financial engineering, TCO/ROI modeling, and value stream mapping.',
              offerings: [
                {
                  id: 'g6-6a-ea1-o1',
                  title: 'AI Value Discovery Workshop (1–2 wks)',
                  subOfferings: [
                    'Hoshin Kanri for Strategic Objectives',
                    'OKR for Value',
                    'Value Stream Mapping for Economics',
                    'Board-Ready Business Case',
                    'Maturity Assessment & Opportunity Prioritization'
                  ],
                  deliverables: [
                    'AI Opportunity Value-vs-Effort Prioritization Matrix',
                    'CFO-Grade Financial Model (CapEx, OpEx, NPV, Payback)',
                    'Economic Value Stream Map across Core Business Units'
                  ],
                  techStack: ['Hoshin Kanri X-Matrix', 'Throughput Accounting', 'NPV/IRR Financial Models']
                }
              ]
            },
            {
              id: 'g6-6a-ea2',
              code: 'EA2',
              title: 'Economics & FinOps',
              description: 'Engineering the unit economics of intelligence: cost-per-token, cost-per-workflow, and lean cost accounting.',
              offerings: [
                {
                  id: 'g6-6a-ea2-o1',
                  title: 'AI Economics & FinOps',
                  subOfferings: [
                    'Cost of Intelligence Reduction (30–60% in 12 wks)',
                    'Throughput Accounting (tokens / GPU-hours / workflow outcomes)',
                    'Activity Based Costing',
                    'Target Costing & Kaizen Costing',
                    'Value Stream Costing & Lean Accounting',
                    'Life Cycle Costing',
                    'DMAIC for Value Improvement'
                  ],
                  deliverables: [
                    'Granular Cost-per-Token & Cost-per-Inference Showback/Chargeback System',
                    '12-Week 30–60% Cost of Intelligence Reduction Roadmap',
                    'DMAIC Value Improvement Project Charters'
                  ],
                  techStack: ['FinOps Foundation Principles', 'Kubecost AI Allocator', 'Cloud Carbon & Cost Arbitrators']
                }
              ]
            },
            {
              id: 'g6-6a-ea3',
              code: 'EA3',
              title: 'Acceleration & Realization',
              description: 'Breaking operational bottlenecks and establishing the permanent Value Realization Office (VRO).',
              offerings: [
                {
                  id: 'g6-6a-ea3-o1',
                  title: 'AI Value Acceleration Sprint (8–12 wks)',
                  subOfferings: [
                    'Rescuing Stalled Initiatives',
                    'TOC for AI Value Bottlenecks',
                    'Benchmarking vs Best-in-Class',
                    'Value Engineering (Value = Function / Cost)',
                    'Lean Thinking',
                    'Kata Daily Improvement'
                  ],
                  deliverables: [
                    'Bottleneck Identification & TOC Intervention Plan',
                    'Function-to-Cost Optimization Re-Engineering Report',
                    'Daily Value Kata Coaching Routine Deployment'
                  ],
                  techStack: ['Theory of Constraints (TOC)', 'Kaizen Event Frameworks', 'Toyota Kata']
                },
                {
                  id: 'g6-6a-ea3-o2',
                  title: 'Value Realization Office (VRO)',
                  subOfferings: [
                    'VRO Setup (16–24 wks + Ongoing)',
                    'Portfolio Optimization (BSC + OKR + Hoshin)',
                    'Enterprise AI Operating System (24–40 wks)',
                    'Continuous Benefits Tracking & Realization Audits'
                  ],
                  deliverables: [
                    'Permanent VRO Operating Charter & Staffing Model',
                    'Executive AI Portfolio Real-Time Value Dashboard',
                    'Quarterly Benefits Realization Audit Protocols'
                  ],
                  techStack: ['TrustGrid VRO Dashboard', 'Balanced Scorecard BI Tools', 'Hoshin Deployment Engines']
                }
              ]
            },
            {
              id: 'g6-6a-ea4',
              code: 'EA4',
              title: 'Strategic Portfolio & Operating System',
              description: 'Enterprise-wide AI capital allocation, decision rights, and autonomous operating rhythms.',
              offerings: [
                {
                  id: 'g6-6a-ea4-o1',
                  title: 'Strategic AI Portfolio Management',
                  subOfferings: [
                    'Cross-domain prioritization & kill criteria',
                    'Decision rights & funding models',
                    'Integration with finance, risk & strategy'
                  ],
                  deliverables: [
                    'AI Stage-Gate Capital Allocation Framework',
                    'Hard Kill-Criteria & Initiative Pivoting Rules',
                    'Finance & Enterprise Risk Committee Integration Plan'
                  ],
                  techStack: ['Portfolio Optimization Algorithms', 'RACI Decision Rights Matrix']
                },
                {
                  id: 'g6-6a-ea4-o2',
                  title: 'Enterprise AI Operating System',
                  subOfferings: [
                    'End-to-end operating rhythms',
                    'Governance cadence',
                    'Value realization loops',
                    'AI-Native enterprise processes'
                  ],
                  deliverables: [
                    'Enterprise AI Operating System Manual (Rhythms & Cadences)',
                    'Closed-Loop Value Feedback Workflow Blueprints',
                    'Autonomous Enterprise Operational Governance Charter'
                  ],
                  techStack: ['Enterprise AI OS Framework', 'Operational Cadence Playbooks']
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  // COMMON FOUNDATION
  commonFoundation: {
    industries: [
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
      'Aerospace & Defense'
    ],
    methodologyDomains: [
      {
        domain: 'Value Engineering Domain',
        methods: [
          'Hoshin Kanri',
          'Balanced Scorecard',
          'OKR',
          'TOC',
          'Throughput Accounting',
          'Activity Based Costing',
          'Target Costing',
          'Kaizen Costing',
          'Value Stream Costing',
          'Life Cycle Costing',
          'Lean Accounting',
          'DMAIC',
          'Kaizen',
          'Benchmarking',
          'Value Engineering',
          'Lean Thinking',
          'Kata',
          'Portfolio Optimization'
        ]
      },
      {
        domain: 'Infrastructure & Data Center Domain',
        methods: [
          'Lean Thinking',
          'Value Stream Mapping',
          'Theory of Constraints (TOC)',
          'OEE (Overall Equipment Effectiveness)',
          'TPM (Total Productive Maintenance)',
          'SMED (Single-Minute Exchange of Die)',
          '5S / 6S',
          'DMAIC',
          'Kaizen',
          'Life Cycle Costing',
          'Target Costing'
        ]
      },
      {
        domain: 'Agentic Systems Domain',
        methods: [
          'Lean Thinking',
          'Kanban (Software)',
          'Value Stream Mapping',
          'Agile / Scrum',
          'DevOps / CI / CD',
          'Design Thinking',
          'BPM',
          'DMAIC',
          'FMEA',
          'Poka-Yoke',
          'Jidoka',
          'Kata',
          'Theory of Constraints (TOC)',
          'OKR'
        ]
      },
      {
        domain: 'Trust & Transformation Domain',
        methods: [
          'FMEA',
          'SPC',
          'DMAIC',
          'PDCA / PDSA',
          '5 Whys',
          'Ishikawa (Fishbone)',
          'A3 Problem Solving',
          'Poka-Yoke',
          'Benchmarking',
          'TQM',
          'Hoshin Kanri',
          'Balanced Scorecard',
          'OKR',
          'BPR',
          'BPM',
          'Kata',
          'Kaizen',
          'Design Thinking',
          'Shingo Model',
          'Deming 14 Points',
          'Baldrige Framework'
        ]
      },
      {
        domain: 'Cybersecurity & Quantum-Safe Domain',
        methods: [
          'FMEA',
          'DMAIC',
          '8D Problem Solving',
          '5 Whys',
          'Ishikawa',
          'SPC',
          'Benchmarking',
          'PDCA',
          'Kaizen',
          'Hoshin Kanri',
          'Life Cycle Costing',
          'Theory of Constraints (TOC)'
        ]
      },
      {
        domain: 'Networking & Fabric Domain',
        methods: [
          'Value Stream Mapping',
          'TOC',
          'Lean Thinking',
          'OEE',
          'TPM',
          'DMAIC',
          'SPC',
          'Kanban',
          'FMEA',
          'Benchmarking',
          'Kaizen',
          'SMED'
        ]
      }
    ],
    keyMetrics: [
      { name: 'Cost per Token / Inference / Workflow', benchmarkOrImpact: '30–60% reduction in production costs', category: 'Cost of Intelligence' },
      { name: 'GPU Utilization % & Idle Cost Elimination', benchmarkOrImpact: 'Increased to 70–85% utilization', category: 'Infrastructure Efficiency' },
      { name: 'Cost of Intelligence Reduction (12 Weeks)', benchmarkOrImpact: 'Target 30–60% within first cycle', category: 'FinOps ROI' },
      { name: 'Value Realization Rate', benchmarkOrImpact: '>85% of prioritized portfolio items', category: 'Value Delivery' },
      { name: 'Time-to-Value', benchmarkOrImpact: '90–180 days for hardened production agentic workflows', category: 'Speed & Scale' },
      { name: 'Portfolio ROI / IRR / Throughput Contribution', benchmarkOrImpact: '3–10x measured ROI across production stacks', category: 'Financial Impact' },
      { name: '% of AI Spend under VRO Governance', benchmarkOrImpact: '100% of major enterprise compute initiatives', category: 'Governance Rigor' },
      { name: 'PUE / WUE / CUE (AI Data Center)', benchmarkOrImpact: 'PUE <1.2 with direct liquid cooling', category: 'Sustainability' },
      { name: 'Cluster OEE (Overall Equipment Effectiveness)', benchmarkOrImpact: '>92% effective compute availability', category: 'Operational Rigor' },
      { name: 'Trust Score (SPC)', benchmarkOrImpact: '>99.5% statistically controlled output bounds', category: 'Reliability' },
      { name: 'Security Metrics (SPC / MTTD / MTTR)', benchmarkOrImpact: '60–80% faster detection and zero unauthorized agent actions', category: 'Cyber Defense' }
    ],
    engagementModels: [
      {
        title: 'Workshops & Diagnostic Audits',
        duration: '1–4 Weeks',
        description: 'Rapid, intensive diagnostic assessments across compute infrastructure, inference economics, agentic readiness, quantum vulnerability (CBOM), or value discovery.'
      },
      {
        title: 'Value Acceleration Sprints & Pilots',
        duration: '8–12 Weeks',
        description: 'Focused engineering sprints applying TOC, DMAIC, and Kaizen to rescue stalled projects, engineer cost-per-token down, or deploy production pilots.'
      },
      {
        title: 'Full Design & Build Programs',
        duration: '16–32 Weeks',
        description: 'Comprehensive turnkey engineering of production AI Factories, vertical multi-agent platforms, quantum-safe migration, and zero-trust security fabrics.'
      },
      {
        title: 'Enterprise Transformation Programs',
        duration: '24–72 Weeks',
        description: 'Multi-year operating model redesign, standing up internal AI & Agent Factories, cross-functional workforce literacy, and organizational compounding.'
      },
      {
        title: 'Managed AI Factory & 24/7 Operations',
        duration: 'Ongoing',
        description: 'Standing 24/7 operational management, AI NOC/SOC monitoring, continuous inference tuning, trust assurance, and permanent VRO governance.'
      }
    ],
    diagnosticTaxonomy: {
      steps: [
        'Select Group (Group 1–6)',
        'Select Solution Area (1A, 1B, 2A, 3A, 3B, 3C, 4A, 4B, 4C, 5A, 5B, 6A)',
        'Select Engineering Area (EA1–EA6)',
        'Select Industry (12 Sectors)',
        'Describe Current State & Workload Constraints',
        'Select Engagement Model (Audit, Sprint, Build, Transformation, Managed)',
        'Submit for Executive Engineering Review'
      ]
    }
  }
}
