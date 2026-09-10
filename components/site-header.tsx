'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
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
  Activity,
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
  Radio,
  Satellite,
  KeyRound,
  Eye,
  Zap,
  Gauge
} from 'lucide-react'
import { logoUrl } from '@/lib/solutions'

// 1. AGENTIC ENTERPRISE (Group 1)
const agenticSubmenu = {
  groupTag: 'GROUP 1',
  title: 'AGENTIC ENTERPRISE',
  overviewDesc: 'Autonomous Agent Design, Multi-Agent Orchestration, Vertical Agent Fleets & Governed AgentOps',
  mainHref: '/solutions/ai-agentic-factory',
  solutionAreas: [
    {
      areaTag: '1A',
      areaTitle: 'AI AGENTIC + FACTORY',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Agentic System Architecture',
          offerings: [
            {
              name: 'Autonomous Agent Design',
              pills: ['Planning & Memory', 'Tool Use & MCP-native', 'ReAct & Graph-of-Thought', 'Test-time Compute']
            },
            {
              name: 'Multi-Agent Orchestration',
              pills: ['CrewAI / AutoGen / LangGraph', 'A2A Protocol', 'Swarm Intelligence', 'Persistent Memory Stores']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Vertical Agent Factories',
          offerings: [
            {
              name: 'Industry Agent Fleets',
              pills: ['Autonomous Finance Ops', 'Supply Chain Planning', 'SRE/DevOps', 'Customer Ops', 'Robotics / Physical AI']
            }
          ]
        },
        {
          eaTag: 'EA3',
          eaTitle: 'Agent Lifecycle & Governance',
          offerings: [
            {
              name: 'AgentOps Platform & Governance',
              pills: ['Agent Registry & Rollback', 'Human-in-the-Loop', 'Agent Audit Trail', 'Jidoka & Poka-Yoke Guardrails']
            }
          ]
        }
      ]
    },
    {
      areaTag: '1B',
      areaTitle: 'AI ENTERPRISE TRANSFORMATION',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Transformation Strategy',
          offerings: [
            {
              name: 'AI Transformation Roadmap',
              pills: ['Hoshin Kanri Deployment', 'Balanced Scorecard', 'OKR 90-Day Objectives', 'Maturity Assessment']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Foundation & Productionization',
          offerings: [
            {
              name: 'Rapid Build & Productionization',
              pills: ['LLMOps/MLOps Setup', 'Pilots → Governed Platform <6 mo', '90–180 Day Agent Workflows', 'CI/CD Integration']
            }
          ]
        },
        {
          eaTag: 'EA3',
          eaTitle: 'Operating Model & Culture',
          offerings: [
            {
              name: 'Agentic Operating Model',
              pills: ['BPR & BPM for AI', 'Kata Improvement Routines', 'Kaizen & Change Mgmt', 'AI Literacy', 'Shingo Model']
            }
          ]
        }
      ]
    }
  ]
}

// 2. AI INFRA & DATA CENTER (Group 2)
const infraSubmenu = {
  groupTag: 'GROUP 2',
  title: 'AI INFRASTRUCTURE & AI DATA CENTER ENGINEERING',
  overviewDesc: 'Strategic Due Diligence, 30–100+ kW Facilities, GPU/LLM Acceleration, InfiniBand/RoCE Fabric & Managed AI Factory',
  mainHref: '/solutions/ai-infra-engineering',
  columns: [
    {
      colTitle: 'Strategic & Facility Architecture',
      colTag: 'FACILITY & STRATEGY',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Strategic & Commercial Engineering',
          offerings: [
            {
              name: 'Site Selection & Due Diligence',
              pills: ['Power Grid & Substation', 'Fiber Route & Latency', 'Seismic / Water Risk', 'Sovereignty & ESG']
            },
            {
              name: 'Investment & Demand Assessment',
              pills: ['Colo / Hyperscale / Build-to-Suit', 'AI Factory-as-a-Service', 'TCO / IRR Board Deck', 'Workload Forecasting']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'High-Density Facility Engineering',
          offerings: [
            {
              name: 'High-Density & Sovereign Design',
              pills: ['30–100+ kW/rack Liquid Cooling', 'Direct-to-Chip & Immersion', 'PUE <1.2 / WUE', 'Air-Gapped Sovereign Design']
            }
          ]
        }
      ]
    },
    {
      colTitle: 'GPU, LLM & Performance Optimization',
      colTag: 'CORE OPTIMIZATION',
      isCore: true,
      engineeringAreas: [
        {
          eaTag: 'EA3',
          eaTitle: 'GPU, LLM & Performance Engineering',
          offerings: [
            {
              name: 'GPU Utilization & Acceleration',
              pills: ['Idle Capacity Elimination', 'Multi-GPU Scheduling', 'CUDA / TensorRT / NIM', 'Blackwell / Rubin / Hopper']
            },
            {
              name: 'LLM & Inference Optimization',
              pills: ['Latency & Throughput Engineering', 'Quantization & Speculative Decoding', 'Continuous Batching', '30–60% Cost/Token Cut']
            },
            {
              name: 'AI Cluster Performance',
              pills: ['Cluster-Level Tuning', 'DMAIC & SPC for Infra Quality', 'Real-time Telemetry']
            }
          ]
        },
        {
          eaTag: 'EA4',
          eaTitle: 'AI Fabric Engineering',
          offerings: [
            {
              name: 'High-Performance AI Fabric',
              pills: ['InfiniBand NDR/XDR', 'RoCE v2', 'NVLink & NVSwitch', 'Ultra Ethernet', 'SMED Deployment']
            }
          ]
        }
      ]
    },
    {
      colTitle: 'Deployment & Industry Solutions',
      colTag: 'OPERATIONS & USE CASES',
      engineeringAreas: [
        {
          eaTag: 'EA5',
          eaTitle: 'Deployment & Managed Operations',
          offerings: [
            {
              name: 'Managed AI Factory',
              pills: ['Build & Commissioning', 'Continuous GPU/LLM Optimization', 'AI NOC Integration', 'AIOps & Digital Twin']
            }
          ]
        },
        {
          eaTag: 'EA6',
          eaTitle: 'Industry Data Center Deployments',
          offerings: [
            {
              name: 'Vertical Deployments',
              pills: ['BFSI Sovereign AI Factory', 'Healthcare HIPAA Genomics', 'Manufacturing Edge Robotics', 'Defense Sovereign DC']
            }
          ]
        }
      ]
    }
  ]
}

// 3. AI NETWORKING (Group 3)
const networkingSubmenu = {
  groupTag: 'GROUP 3',
  title: 'AI NETWORKING',
  overviewDesc: 'Enterprise & DC Fabrics, Non-Terrestrial Networks (NTN / Satellite / Laser / FSO) & Autonomous AI NOC',
  mainHref: '/solutions/ai-networking',
  solutionAreas: [
    {
      areaTag: '3A',
      areaTitle: 'ENTERPRISE & DATA CENTER NETWORKING',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'AI-Optimized Enterprise Networking',
          offerings: [
            {
              name: 'AI WAN & Multicloud Interconnect',
              pills: ['SD-WAN with AI Routing', 'Multi-Cloud Interconnect', 'Value Stream Mapping for Data']
            },
            {
              name: 'Data Center Networking & Fabric',
              pills: ['GPU Cluster Fabrics', 'Leaf-Spine / Clos Architectures', 'Ultra-low Latency Design']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Next-Gen Wireless & Edge',
          offerings: [
            {
              name: 'Wireless & Edge AI',
              pills: ['Private 5G for AI Factory', 'Edge Inference Backhaul', 'WiFi 7/8 for GPU Clusters', '6G AI-Native Interface']
            }
          ]
        }
      ]
    },
    {
      areaTag: '3B',
      areaTitle: 'NON-TERRESTRIAL NETWORKS (NTN) & SATELLITE',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Satellite Connectivity for AI',
          offerings: [
            {
              name: 'Satellite ISL & LEO Broadband',
              pills: ['Laser & RF Inter-Satellite Links (ISL)', 'Starlink / OneWeb / Kuiper Backhaul', 'Autonomous Constellation Mgmt']
            },
            {
              name: 'Free Space Optics & Quantum Satellite',
              pills: ['Ground-to-Satellite FSO', 'Terrestrial FSO for DCI', 'QKD via Satellite (BB84/E91)', 'QBER Optimization']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'AI-Driven NTN Operations',
          offerings: [
            {
              name: 'Intelligent NTN Management',
              pills: ['AI Doppler Correction', 'Beam Steering', 'Predictive Link Degradation']
            }
          ]
        }
      ]
    },
    {
      areaTag: '3C',
      areaTitle: 'AI NETWORK OPERATIONS CENTER (AI NOC) & TELECOM',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Intelligent Network Operations',
          offerings: [
            {
              name: 'AI NOC Capabilities & Telecom',
              pills: ['Self-Healing AI Networks', 'Intent-Based Networking', 'Digital Twin for Network', 'Telecom Carrier SLAs']
            }
          ]
        }
      ]
    }
  ]
}

// 4. AI CYBERSECURITY (Group 4)
const cybersecuritySubmenu = {
  groupTag: 'GROUP 4',
  title: 'AI CYBERSECURITY & QUANTUM-SAFE NETWORKING',
  overviewDesc: 'L1–L7 Post-Quantum Cryptography (PQC / CBOM), Agent Guardrails, Zero-Trust Architecture & Managed AI SOC',
  mainHref: '/solutions/ai-cybersecurity-quantum-safe',
  solutionAreas: [
    {
      areaTag: '4A',
      areaTitle: 'QUANTUM-SAFE ENCRYPTION (L1–L7)',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Transport to Application Layer (L1–L7)',
          offerings: [
            {
              name: 'L1–L2 Physical & Link Encryption',
              pills: ['MACsec with PQC (CRYSTALS-Kyber)', 'Quantum-Safe OTNsec for DCI & FSO', 'FSO Link Layer Security']
            },
            {
              name: 'L3–L4 Network & Transport Security',
              pills: ['IPsec PQC Hybrid', 'TLS 1.3 + PQC (Kyber + Dilithium)', 'QUIC + PQC for AI Inference', 'Quantum SD-WAN']
            },
            {
              name: 'L7 Application & Agent Security',
              pills: ['Quantum-Safe mTLS for A2A', 'API Gateway PQC', 'Homomorphic Encryption', 'Confidential Computing']
            },
            {
              name: 'Cryptographic Agility & Management',
              pills: ['CBOM Generation & Discovery', 'PQC Migration Roadmap (8–16 wks)', 'Harvest Now Decrypt Later (HNDL)']
            }
          ]
        }
      ]
    },
    {
      areaTag: '4B & 4C',
      areaTitle: 'AI SYSTEM SECURITY & ZERO-TRUST SOC',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'AI Factory & Agent Security',
          offerings: [
            {
              name: 'Core Security Controls',
              pills: ['LLM & Agent Guardrails', 'Jailbreak Protection', 'Model IP Watermarking', 'Adversarial Robustness', 'FMEA']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Zero-Trust for AI & Agents',
          offerings: [
            {
              name: 'Zero-Trust Architecture',
              pills: ['Identity-Aware Agent Mesh (8–12 wks)', 'Agent IAM', 'Micro-Segmentation for GPU Clusters']
            }
          ]
        },
        {
          eaTag: 'EA3',
          eaTitle: 'Managed AI Security Operations',
          offerings: [
            {
              name: 'AI SOC (24/7 Managed)',
              pills: ['AI-Driven Threat Detection', 'Automated Incident Response', 'AI SOC + NOC Integration', 'SPC for Security']
            }
          ]
        }
      ]
    }
  ]
}

// 5. AI VALUE ENGINEERING (Group 6 + Group 5 Trusted AI)
const valueSubmenu = {
  groupTag: 'GROUP 6 & GROUP 5',
  title: 'AI VALUE ENGINEERING & TRUSTED AI',
  overviewDesc: '30–60% Cost of Intelligence Reduction, FinOps Unit Economics, Value Realization Office (VRO) & Mathematical Trust',
  mainHref: '/solutions/ai-value-engineering',
  solutionAreas: [
    {
      areaTag: '6A',
      areaTitle: 'AI VALUE ENGINEERING & ACCELERATION',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Value Discovery & Business Case',
          offerings: [
            {
              name: 'AI Value Discovery Workshop (1–2 wks)',
              pills: ['Hoshin Kanri Strategic Alignment', 'OKR for Value', 'Value Stream Mapping', 'Board-Ready Business Case']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Economics & FinOps',
          offerings: [
            {
              name: 'AI Economics & FinOps (12 wks)',
              pills: ['Cost of Intelligence (-30–60%)', 'Throughput Accounting', 'Activity Based Costing', 'Target & Kaizen Costing']
            }
          ]
        },
        {
          eaTag: 'EA3',
          eaTitle: 'Acceleration & Realization',
          offerings: [
            {
              name: 'AI Value Acceleration Sprint (8–12 wks)',
              pills: ['Rescuing Stalled Pilots', 'TOC Bottleneck Removal', 'Value Realization Office (VRO)', 'Continuous Benefits Tracking']
            },
            {
              name: 'Enterprise AI Operating System',
              pills: ['24–40 Wks Operating System', 'Strategic Portfolio Management', 'Cross-Domain Prioritization', 'Governance Cadence']
            }
          ]
        }
      ]
    },
    {
      areaTag: '5A/5B',
      areaTitle: 'TRUSTED AI ENGINEERING (GROUP 5)',
      engineeringAreas: [
        {
          eaTag: 'EA1',
          eaTitle: 'Trustworthy AI Architecture',
          offerings: [
            {
              name: 'Explainability & Robustness',
              pills: ['SHAP / LIME Decision Traceability', 'Adversarial Robustness', 'Poka-Yoke & Jidoka Auto-Stop']
            }
          ]
        },
        {
          eaTag: 'EA2',
          eaTitle: 'Governance & Assurance',
          offerings: [
            {
              name: 'Responsible AI & Monitoring',
              pills: ['Regulatory Audit Preparation', 'Balanced Scorecard for Trust', 'SPC for Model Drift', '5 Whys Root Cause']
            }
          ]
        }
      ]
    }
  ]
}

// 6. ABOUT US MENU
const aboutMenuItems = [
  {
    label: 'About TrustGrid.AI',
    href: '/about',
    icon: Building2,
    desc: 'Our mission, vision, and full-spectrum engineering verticals'
  },
  {
    label: 'Leadership & Teams',
    href: '/about#teams',
    icon: Users,
    desc: 'World-class AI architects, systems leads, and advisory board'
  },
  {
    label: 'Careers & Hackathons',
    href: '/about#careers-hackathons',
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
    href: '/about#case-studies',
    icon: FileText,
    desc: 'Production outcomes across defense, banking, and enterprise AI'
  },
  {
    label: 'Methodology Engine',
    href: '/methodology-engine',
    icon: Sparkles,
    desc: 'Proprietary AI-driven methodology implementation framework'
  },
  {
    label: 'Site Map v14.0',
    href: '/sitemap',
    icon: Layers,
    desc: 'Complete 5-level expert content model across 6 Groups & 18 Engineering Areas'
  },
  {
    label: 'Book AI Diagnostic',
    href: '/book-ai-diagnostic',
    icon: Zap,
    desc: 'Fast-track engineering readiness audit & architecture consultation'
  }
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

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
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => {
    setActiveMenu(null)
    setOpen(false)
  }

  const toggleMenu = (menuName: string) => {
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
      <Link className="brand" href="/" aria-label="TrustGrid.ai home" onClick={closeAll}>
        <img src={logoUrl} alt="TrustGrid.ai" />
      </Link>

      <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {/* 1. HOME */}
        <Link href="/" className="nav-link" onClick={closeAll}>
          Home
        </Link>

        {/* 2. AGENTIC ENTERPRISE (Group 1) */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'agentic' ? 'active' : ''}`}
            onClick={() => toggleMenu('agentic')}
            aria-expanded={activeMenu === 'agentic'}
          >
            <span>Agentic Enterprise</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'agentic' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'agentic' && (
            <div className="mega-menu agentic-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">{agenticSubmenu.groupTag}</span>
                  <p>{agenticSubmenu.overviewDesc}</p>
                </div>
                <Link href={agenticSubmenu.mainHref} className="mega-header-link" onClick={closeAll}>
                  <span>Explore Agentic Solutions</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="domain-mega-grid-2">
                {agenticSubmenu.solutionAreas.map((sa, idx) => (
                  <div key={idx} className="ea-group-card">
                    <div className="ea-group-header">
                      <span className="ea-group-tag">{sa.areaTag}</span>
                      <span className="ea-group-title">{sa.areaTitle}</span>
                    </div>
                    {sa.engineeringAreas.map((ea, eIdx) => (
                      <div key={eIdx} className="offering-row">
                        <div className="offering-row-title">
                          <span className="text-blue font-mono text-[11px] font-bold">[{ea.eaTag}]</span>
                          <span>{ea.eaTitle}</span>
                        </div>
                        {ea.offerings.map((off, oIdx) => (
                          <div key={oIdx} className="mt-1">
                            <span className="text-[11.5px] font-semibold text-foreground block">{off.name}</span>
                            <div className="l5-pill-list">
                              {off.pills.map((pill, pIdx) => (
                                <span key={pIdx} className="l5-pill">{pill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href={agenticSubmenu.mainHref} className="mega-footer-link" onClick={closeAll}>
                  <Bot size={14} />
                  <span>Explore Autonomous Agent Design, Swarm Architecture & Governed AgentOps Pipelines</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. AI INFRA & DATA CENTER (Group 2) */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'infra' ? 'active' : ''}`}
            onClick={() => toggleMenu('infra')}
            aria-expanded={activeMenu === 'infra'}
          >
            <span>AI Infra & Data Center</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'infra' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'infra' && (
            <div className="mega-menu infra-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">{infraSubmenu.groupTag}</span>
                  <p>{infraSubmenu.overviewDesc}</p>
                </div>
                <Link href={infraSubmenu.mainHref} className="mega-header-link" onClick={closeAll}>
                  <span>Explore AI Data Centers</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="domain-mega-grid-3">
                {infraSubmenu.columns.map((col, idx) => (
                  <div key={idx} className={`ea-group-card ${col.isCore ? 'border-blue-300 shadow-sm' : ''}`}>
                    <div className="ea-group-header">
                      <span className="ea-group-tag">{col.colTag}</span>
                      <span className="ea-group-title">{col.colTitle}</span>
                    </div>
                    {col.engineeringAreas.map((ea, eIdx) => (
                      <div key={eIdx} className="offering-row">
                        <div className="offering-row-title">
                          <span className="text-blue font-mono text-[11px] font-bold">[{ea.eaTag}]</span>
                          <span>{ea.eaTitle}</span>
                        </div>
                        {ea.offerings.map((off, oIdx) => (
                          <div key={oIdx} className="mt-1">
                            <span className="text-[11.5px] font-semibold text-foreground block">{off.name}</span>
                            <div className="l5-pill-list">
                              {off.pills.map((pill, pIdx) => (
                                <span key={pIdx} className={`l5-pill ${col.isCore && pIdx === 0 ? 'highlight' : ''}`}>{pill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href={infraSubmenu.mainHref} className="mega-footer-link" onClick={closeAll}>
                  <Cpu size={14} />
                  <span>Explore High-Density Facilities, GPU/LLM Inference Optimization (-30–60% Cost) & InfiniBand Fabrics</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 4. AI NETWORKING (Group 3) */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'networking' ? 'active' : ''}`}
            onClick={() => toggleMenu('networking')}
            aria-expanded={activeMenu === 'networking'}
          >
            <span>AI Networking</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'networking' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'networking' && (
            <div className="mega-menu networking-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">{networkingSubmenu.groupTag}</span>
                  <p>{networkingSubmenu.overviewDesc}</p>
                </div>
                <Link href={networkingSubmenu.mainHref} className="mega-header-link" onClick={closeAll}>
                  <span>Explore AI Networking</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="domain-mega-grid-3">
                {networkingSubmenu.solutionAreas.map((sa, idx) => (
                  <div key={idx} className="ea-group-card">
                    <div className="ea-group-header">
                      <span className="ea-group-tag">{sa.areaTag}</span>
                      <span className="ea-group-title">{sa.areaTitle}</span>
                    </div>
                    {sa.engineeringAreas.map((ea, eIdx) => (
                      <div key={eIdx} className="offering-row">
                        <div className="offering-row-title">
                          <span className="text-blue font-mono text-[11px] font-bold">[{ea.eaTag}]</span>
                          <span>{ea.eaTitle}</span>
                        </div>
                        {ea.offerings.map((off, oIdx) => (
                          <div key={oIdx} className="mt-1">
                            <span className="text-[11.5px] font-semibold text-foreground block">{off.name}</span>
                            <div className="l5-pill-list">
                              {off.pills.map((pill, pIdx) => (
                                <span key={pIdx} className="l5-pill">{pill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href={networkingSubmenu.mainHref} className="mega-footer-link" onClick={closeAll}>
                  <Network size={14} />
                  <span>Explore Satellite NTN, Laser ISL, Private 5G & Autonomous Self-Healing AI NOC</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 5. AI CYBERSECURITY (Group 4) */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'cybersecurity' ? 'active' : ''}`}
            onClick={() => toggleMenu('cybersecurity')}
            aria-expanded={activeMenu === 'cybersecurity'}
          >
            <span>AI Cybersecurity</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'cybersecurity' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'cybersecurity' && (
            <div className="mega-menu cybersecurity-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">{cybersecuritySubmenu.groupTag}</span>
                  <p>{cybersecuritySubmenu.overviewDesc}</p>
                </div>
                <Link href={cybersecuritySubmenu.mainHref} className="mega-header-link" onClick={closeAll}>
                  <span>Explore Quantum-Safe Security</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="domain-mega-grid-2">
                {cybersecuritySubmenu.solutionAreas.map((sa, idx) => (
                  <div key={idx} className="ea-group-card">
                    <div className="ea-group-header">
                      <span className="ea-group-tag">{sa.areaTag}</span>
                      <span className="ea-group-title">{sa.areaTitle}</span>
                    </div>
                    {sa.engineeringAreas.map((ea, eIdx) => (
                      <div key={eIdx} className="offering-row">
                        <div className="offering-row-title">
                          <span className="text-blue font-mono text-[11px] font-bold">[{ea.eaTag}]</span>
                          <span>{ea.eaTitle}</span>
                        </div>
                        {ea.offerings.map((off, oIdx) => (
                          <div key={oIdx} className="mt-1">
                            <span className="text-[11.5px] font-semibold text-foreground block">{off.name}</span>
                            <div className="l5-pill-list">
                              {off.pills.map((pill, pIdx) => (
                                <span key={pIdx} className="l5-pill">{pill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href={cybersecuritySubmenu.mainHref} className="mega-footer-link" onClick={closeAll}>
                  <Lock size={14} />
                  <span>Explore L1–L7 Post-Quantum Cryptography (PQC), Agent Guardrails & 24/7 Managed AI SOC</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 6. AI VALUE ENGINEERING (Group 6 + Group 5) */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'value' ? 'active' : ''}`}
            onClick={() => toggleMenu('value')}
            aria-expanded={activeMenu === 'value'}
          >
            <span>AI Value Engineering</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'value' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'value' && (
            <div className="mega-menu value-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">{valueSubmenu.groupTag}</span>
                  <p>{valueSubmenu.overviewDesc}</p>
                </div>
                <Link href={valueSubmenu.mainHref} className="mega-header-link" onClick={closeAll}>
                  <span>Explore Value & Trust</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="domain-mega-grid-2">
                {valueSubmenu.solutionAreas.map((sa, idx) => (
                  <div key={idx} className="ea-group-card">
                    <div className="ea-group-header">
                      <span className="ea-group-tag">{sa.areaTag}</span>
                      <span className="ea-group-title">{sa.areaTitle}</span>
                    </div>
                    {sa.engineeringAreas.map((ea, eIdx) => (
                      <div key={eIdx} className="offering-row">
                        <div className="offering-row-title">
                          <span className="text-blue font-mono text-[11px] font-bold">[{ea.eaTag}]</span>
                          <span>{ea.eaTitle}</span>
                        </div>
                        {ea.offerings.map((off, oIdx) => (
                          <div key={oIdx} className="mt-1">
                            <span className="text-[11.5px] font-semibold text-foreground block">{off.name}</span>
                            <div className="l5-pill-list">
                              {off.pills.map((pill, pIdx) => (
                                <span key={pIdx} className="l5-pill">{pill}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mega-menu-footer">
                <Link href={valueSubmenu.mainHref} className="mega-footer-link" onClick={closeAll}>
                  <TrendingUp size={14} />
                  <span>Explore FinOps Unit Economics, Value Realization Office (VRO) & Mathematical Trust (SHAP/LIME)</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 7. ABOUT US */}
        <div className="nav-dropdown-wrapper">
          <button
            className={`nav-menu-trigger ${activeMenu === 'about' ? 'active' : ''}`}
            onClick={() => toggleMenu('about')}
            aria-expanded={activeMenu === 'about'}
          >
            <span>About Us</span>
            <ChevronDown size={14} className={`chevron-icon ${activeMenu === 'about' ? 'rotate-180' : ''}`} />
          </button>

          {activeMenu === 'about' && (
            <div className="mega-menu about-mega-menu" onMouseLeave={() => setActiveMenu(null)}>
              <div className="mega-menu-header">
                <div>
                  <span className="mega-menu-badge">COMPANY & TALENT</span>
                  <p>Full-Spectrum AI Engineering Company for the Global AI Economy</p>
                </div>
                <Link href="/about" className="mega-header-link" onClick={closeAll}>
                  <span>Explore Full Profile</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="mega-menu-grid about-menu-grid">
                {aboutMenuItems.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="about-item-card"
                      onClick={closeAll}
                    >
                      <div className="about-item-icon">
                        <Icon size={16} />
                      </div>
                      <div className="about-item-text">
                        <div className="about-item-heading">
                          <span>{item.label}</span>
                          <ArrowUpRight size={12} className="ml-auto opacity-40 hover-show" />
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mega-menu-footer">
                <Link href="/about" className="mega-footer-link" onClick={closeAll}>
                  <Building2 size={14} />
                  <span>Explore mission, vision, executive leadership, global offices, and research labs</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 8. PRIMARY CTA: CONTACT US */}
        <Link
          href="/contact"
          className="nav-cta"
          onClick={closeAll}
        >
          <span>Contact Us</span>
          <ArrowUpRight size={15} />
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

            {/* Mobile: Agentic Enterprise Accordion */}
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
                  <Link href={agenticSubmenu.mainHref} className="mobile-sublink font-semibold text-blue" onClick={closeAll}>
                    <span>Explore Agentic Enterprise Overview →</span>
                  </Link>
                  {agenticSubmenu.solutionAreas.map((sa, i) => (
                    <div key={i} className="mobile-method-block">
                      <span className="mob-num">{sa.areaTag}</span>
                      <strong className="text-xs ml-1">{sa.areaTitle}</strong>
                      <div className="mt-1 flex flex-col gap-1">
                        {sa.engineeringAreas.map((ea, j) => (
                          <div key={j} className="text-[12px] text-ink-soft pl-2">
                            • <span className="font-medium text-foreground">{ea.eaTitle}:</span> {ea.offerings.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: AI Infra & Data Center Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('infra')}
              >
                <span>AI Infra & Data Center</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'infra' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'infra' && (
                <div className="mobile-accordion-body">
                  <Link href={infraSubmenu.mainHref} className="mobile-sublink font-semibold text-blue" onClick={closeAll}>
                    <span>Explore AI Data Center Overview →</span>
                  </Link>
                  {infraSubmenu.columns.map((col, i) => (
                    <div key={i} className="mobile-method-block">
                      <span className="mob-num">{col.colTag}</span>
                      <strong className="text-xs ml-1">{col.colTitle}</strong>
                      <div className="mt-1 flex flex-col gap-1">
                        {col.engineeringAreas.map((ea, j) => (
                          <div key={j} className="text-[12px] text-ink-soft pl-2">
                            • <span className="font-medium text-foreground">{ea.eaTitle}:</span> {ea.offerings.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: AI Networking Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('networking')}
              >
                <span>AI Networking</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'networking' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'networking' && (
                <div className="mobile-accordion-body">
                  <Link href={networkingSubmenu.mainHref} className="mobile-sublink font-semibold text-blue" onClick={closeAll}>
                    <span>Explore AI Networking Overview →</span>
                  </Link>
                  {networkingSubmenu.solutionAreas.map((sa, i) => (
                    <div key={i} className="mobile-method-block">
                      <span className="mob-num">{sa.areaTag}</span>
                      <strong className="text-xs ml-1">{sa.areaTitle}</strong>
                      <div className="mt-1 flex flex-col gap-1">
                        {sa.engineeringAreas.map((ea, j) => (
                          <div key={j} className="text-[12px] text-ink-soft pl-2">
                            • <span className="font-medium text-foreground">{ea.eaTitle}:</span> {ea.offerings.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: AI Cybersecurity Accordion */}
            <div className="mobile-accordion">
              <button
                className="mobile-accordion-btn"
                onClick={() => toggleMobileSection('cybersecurity')}
              >
                <span>AI Cybersecurity</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileSection === 'cybersecurity' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'cybersecurity' && (
                <div className="mobile-accordion-body">
                  <Link href={cybersecuritySubmenu.mainHref} className="mobile-sublink font-semibold text-blue" onClick={closeAll}>
                    <span>Explore AI Cybersecurity Overview →</span>
                  </Link>
                  {cybersecuritySubmenu.solutionAreas.map((sa, i) => (
                    <div key={i} className="mobile-method-block">
                      <span className="mob-num">{sa.areaTag}</span>
                      <strong className="text-xs ml-1">{sa.areaTitle}</strong>
                      <div className="mt-1 flex flex-col gap-1">
                        {sa.engineeringAreas.map((ea, j) => (
                          <div key={j} className="text-[12px] text-ink-soft pl-2">
                            • <span className="font-medium text-foreground">{ea.eaTitle}:</span> {ea.offerings.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: AI Value Engineering Accordion */}
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
                  <Link href={valueSubmenu.mainHref} className="mobile-sublink font-semibold text-blue" onClick={closeAll}>
                    <span>Explore AI Value & Trusted AI Overview →</span>
                  </Link>
                  {valueSubmenu.solutionAreas.map((sa, i) => (
                    <div key={i} className="mobile-method-block">
                      <span className="mob-num">{sa.areaTag}</span>
                      <strong className="text-xs ml-1">{sa.areaTitle}</strong>
                      <div className="mt-1 flex flex-col gap-1">
                        {sa.engineeringAreas.map((ea, j) => (
                          <div key={j} className="text-[12px] text-ink-soft pl-2">
                            • <span className="font-medium text-foreground">{ea.eaTitle}:</span> {ea.offerings.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: About Us Accordion */}
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
                    <span>About TrustGrid.AI Overview →</span>
                  </Link>
                  {aboutMenuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="mobile-sublink"
                      onClick={closeAll}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-cta-wrapper">
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
