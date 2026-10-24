import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Zap,
  Network,
  Globe2,
  Terminal,
  MapPin,
  Clock,
  Compass,
  FileText,
  Layers,
  Scale,
  DollarSign,
  Users,
  Target,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { CAREER_ROLES } from '@/lib/form-submission'

export const metadata: Metadata = {
  title: 'Build Your Career at TRUSTGRID.AI | AI Careers, Fellowships & Internships',
  description:
    'Accelerate your career in AI Value Engineering, Future-Driven Engineering (FDE), Swarm Intelligence, and Enterprise Transformation at TRUSTGRID.AI. Explore Full-Time Roles, FDE Research Fellowships, and 12-Month Internships.',
  keywords: [
    'AI Careers',
    'AI Fellowship',
    'Research Fellowship',
    'Industrial AI Internship',
    'Future Driven Engineering',
    'AI Value Engineering',
    'AI Research Program',
    'Industrial Automation Careers',
    'Governance Risk Compliance Careers',
    'Digital Twin Engineering',
    'TRUSTGRID.AI Careers'
  ],
  openGraph: {
    title: 'Build Your Career at TRUSTGRID.AI | AI Careers, Fellowships & Internships',
    description:
      'Join elite systems architects, bare-metal GPU researchers, and multi-agent engineers solving the hardest problems in distributed compute economics, lossless fabrics, and post-quantum defense.',
    url: 'https://trustgrid.ai/careers',
    type: 'website'
  }
}

const LINKEDIN_FELLOWSHIP_URL =
  'https://www.linkedin.com/posts/trustgridai_researchfellowship-aiinmanufacturing-swarmintelligence-activity-7519587879505907713-qJw1'
const LINKEDIN_JOBS_URL = 'https://www.linkedin.com/company/trustgrid-ai/jobs/'

// Full-Time Roles Synchronized with TRUSTGRID.AI LinkedIn
interface FullTimeJob {
  id: string
  title: string
  department: string
  practice: string
  location: string
  workplace: 'Hybrid' | 'Remote' | 'On-Site'
  experience: string
  description: string
  tags: string[]
  responsibilities: string[]
  qualifications: string[]
}

const FULL_TIME_JOBS: FullTimeJob[] = [
  {
    id: 'job-ai-infra-architect',
    title: 'AI Systems & Infrastructure Architect',
    department: 'AI Infrastructure & High-Density Compute',
    practice: 'Future Driven Engineering (FDE)',
    location: 'Tampa, FL / Bengaluru',
    workplace: 'Hybrid',
    experience: '5+ Years',
    description:
      'Architect 30–100kW/rack high-density GPU clusters, direct-to-chip liquid cooling systems, and bare-metal Slurm orchestration for enterprise frontier model scale.',
    tags: ['Full-Time', 'Hybrid', 'AI Infrastructure', 'GPU Clusters'],
    responsibilities: [
      'Design high-density NVLink & InfiniBand topologies across H100/B200 clusters',
      'Optimize bare-metal kernel orchestration and Slurm job scheduler policies',
      'Oversee thermodynamic liquid cooling and power delivery telemetry'
    ],
    qualifications: [
      'B.S./M.S. in Computer Science, Electrical Engineering, or related field',
      'Deep expertise in distributed GPU fabrics, RoCEv2/IB, and CUDA profiling',
      'Proven production experience deploying enterprise AI training/inference infrastructure'
    ]
  },
  {
    id: 'job-multi-agent-engineer',
    title: 'Multi-Agent Systems & Swarm Orchestration Engineer',
    department: 'Agentic Enterprise Factory',
    practice: 'Autonomous Intelligence Systems',
    location: 'Bengaluru / Singapore / Remote',
    workplace: 'Remote',
    experience: '3+ Years',
    description:
      'Architect deterministic multi-agent swarms, Model Context Protocol (MCP) integrations, persistent memory vector DAGs, and autonomous enterprise workflows with formal verification.',
    tags: ['Full-Time', 'Remote', 'Agentic AI', 'Swarm Intelligence'],
    responsibilities: [
      'Implement multi-agent routing DAGs and Model Context Protocol (MCP) servers',
      'Build persistent stateful vector memories and low-latency cache fabrics',
      'Engineer deterministic guardrails and mathematical safety boundaries'
    ],
    qualifications: [
      'Strong proficiency in Python, Rust, or Go with asynchronous concurrency',
      'Production experience with multi-agent frameworks, LangGraph, or custom DAG engines',
      'Background in distributed systems, vector retrieval, and AgentOps'
    ]
  },
  {
    id: 'job-lossless-network-engineer',
    title: 'Lossless AI Fabric & Network Engineer (RoCEv2 / IB)',
    department: 'Distributed AI Networking',
    practice: 'AI Fabric Architecture',
    location: 'Tampa, FL / Bengaluru',
    workplace: 'Hybrid',
    experience: '4+ Years',
    description:
      'Engineer 400G/800G lossless RoCEv2 and InfiniBand fabrics, NCCL collective comms tuning, and hardware PFC/ECN congestion control algorithms for high-throughput model training.',
    tags: ['Full-Time', 'Hybrid', 'Lossless Fabric', 'RoCEv2 / IB'],
    responsibilities: [
      'Tune hardware Priority-based Flow Control (PFC) and Explicit Congestion Notification (ECN)',
      'Profile NCCL collective communication primitives (AllReduce, AlltoAll) at scale',
      'Monitor telemetry for zero-packet-drop distributed training fabrics'
    ],
    qualifications: [
      'In-depth knowledge of RoCEv2, InfiniBand, BGP EVPN, and Spine-Leaf architectures',
      'Hands-on experience with NVIDIA Quantum/Spectrum switches or equivalent fabric silicon',
      'Expertise in Linux network namespaces, DPDK, and kernel networking stack tuning'
    ]
  },
  {
    id: 'job-pqc-security-lead',
    title: 'Post-Quantum Cryptography & AI Security Lead',
    department: 'Quantum-Safe Cybersecurity',
    practice: 'AI Security & Governance',
    location: 'Tampa, FL / Singapore',
    workplace: 'Hybrid',
    experience: '5+ Years',
    description:
      'Deploy L1–L7 Post-Quantum Cryptography (PQC), Cryptographic Bill of Materials (CBOM), agent runtime safety firewalls, and air-gapped enclaves for enterprise AI assets.',
    tags: ['Full-Time', 'Hybrid', 'PQC Cybersecurity', 'Quantum-Safe'],
    responsibilities: [
      'Implement NIST-standardized PQC algorithms across enterprise communications channels',
      'Build automated Cryptographic Bill of Materials (CBOM) scanning pipelines',
      'Defend agentic ecosystems against prompt injection, memory poisoning, and exfiltration'
    ],
    qualifications: [
      'Deep theoretical and practical foundation in modern cryptography and lattice-based algorithms',
      'Familiarity with NIST PQC standards (ML-KEM, ML-DSA, SLH-DSA)',
      'Experience in zero-trust architecture, hardware security modules (HSMs), and enclave isolation'
    ]
  },
  {
    id: 'job-industrial-ai-digital-twin',
    title: 'Industrial AI & Digital Twin Engineer (FDE)',
    department: 'Future Driven Engineering & Robotics',
    practice: 'Industry 5.0 & Cyber-Physical Systems',
    location: 'Bengaluru / Pune',
    workplace: 'Hybrid',
    experience: '3+ Years',
    description:
      'Build shop-floor edge AI models, real-time computer vision inspection, robotic kinematic digital twins, and autonomous shop-floor routing for Industry 5.0 smart factories.',
    tags: ['Full-Time', 'Hybrid', 'Digital Twins', 'Industrial Automation'],
    responsibilities: [
      'Deploy real-time computer vision quality inspection models on edge industrial IPCs',
      'Build high-fidelity digital twin simulation environments with real-time PLC/SCADA bindings',
      'Develop robotic trajectory planning and swarm coordination algorithms'
    ],
    qualifications: [
      'B.S./M.S. in Mechatronics, Robotics, Electrical, or Mechanical Engineering',
      'Proficiency in ROS2, Isaac Sim/Gazebo, OpenCV, and PyTorch/TensorRT',
      'Experience with industrial communication protocols (OPC-UA, Modbus, MQTT)'
    ]
  },
  {
    id: 'job-ai-value-finops',
    title: 'AI Value Engineer & FinOps Specialist',
    department: 'AI Value Engineering & Governance',
    practice: 'Value Engineering & Economics',
    location: 'Tampa, FL / Bengaluru / Remote',
    workplace: 'Remote',
    experience: '4+ Years',
    description:
      'Conduct unit-cost economics, Lean/TOC operational bottleneck removal, KV-cache cost optimization, and CFO-grade balance sheet value realization scorecards.',
    tags: ['Full-Time', 'Remote', 'AI Value Engineering', 'FinOps'],
    responsibilities: [
      'Model activity-based token costing and GPU cluster utilization efficiency',
      'Implement difference-in-differences value attribution and financial line-item bindings',
      'Collaborate with enterprise CFOs and CIOs to establish sustainable AI operating models'
    ],
    qualifications: [
      'Background in Technology Consulting, Enterprise Architecture, or FinOps Engineering',
      'Deep quantitative modeling abilities with statistical rigor and financial attribution',
      'Comprehensive understanding of LLM serving economics, batching, and KV-cache architectures'
    ]
  }
]

export default function CareersPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* QUICK CATEGORY NAVIGATION STRIP */}
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '8px' }}>
          <nav className="careers-cat-nav-bar" aria-label="Careers Navigation">
            <a href="#about-careers" className="careers-cat-pill active">
              <Sparkles size={14} />
              <span>Overview</span>
            </a>
            <a href="#fellowships" className="careers-cat-pill">
              <GraduationCap size={14} />
              <span>Research Fellowships</span>
            </a>
            <a href="#current-opportunities" className="careers-cat-pill">
              <Briefcase size={14} />
              <span>Current Opportunities</span>
            </a>
            <a href="#internships" className="careers-cat-pill">
              <BookOpen size={14} />
              <span>12-Month Internships</span>
            </a>
            <a href="#apply-now" className="careers-cat-pill">
              <FileText size={14} />
              <span>Apply Online</span>
            </a>
          </nav>
        </div>

        {/* HERO SECTION: BUILD YOUR CAREER AT TRUSTGRID.AI & INSTANT APPLICATION PORTAL */}
        <section
          className="section dedicated-form-hero-section"
          id="about-careers"
          style={{ paddingTop: '16px', paddingBottom: '48px' }}
        >
          <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: INTRODUCTION & VALUE PROPOSITION */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span
                  className="section-label"
                  style={{ color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Sparkles size={13} />
                  <span>CAREERS &amp; RESEARCH FELLOWSHIPS</span>
                </span>
                <h1
                  style={{
                    fontSize: 'clamp(30px, 4vw, 46px)',
                    fontWeight: 800,
                    color: '#111827',
                    lineHeight: 1.15,
                    margin: '8px 0 16px',
                    letterSpacing: '-0.03em'
                  }}
                >
                  Build Your Career at <span style={{ color: '#2563eb' }}>TRUSTGRID.AI</span>
                </h1>
                <p
                  className="diagnostic-hero-lead"
                  style={{ fontSize: '15.5px', color: '#374151', lineHeight: 1.65, marginBottom: '22px' }}
                >
                  At TRUSTGRID.AI, we accelerate talent in AI Value Engineering, Future-Driven Engineering (FDE),
                  Industrial AI, Cybersecurity, Governance, and Enterprise Transformation.
                </p>
                <p
                  style={{
                    fontSize: '14.5px',
                    color: '#4b5563',
                    lineHeight: 1.6,
                    marginBottom: '26px',
                    fontWeight: 450
                  }}
                >
                  We build professionals who can design, develop, secure, and operate intelligent systems at enterprise
                  scale while solving real-world business challenges.
                </p>
              </div>

              {/* WHY JOIN TRUSTGRID.AI? */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  marginBottom: '28px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Award size={18} style={{ color: '#2563eb' }} />
                  <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Why Join TRUSTGRID.AI?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      Enterprise-scale AI projects
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      Real-world implementation experience
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      AI governance &amp; cybersecurity exposure
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      Research and innovation opportunities
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      Industry mentorship
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>
                      Future technology leadership development
                    </span>
                  </div>
                </div>
              </div>

              {/* THREE OPPORTUNITY PATHWAYS CALLOUT */}
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="#current-opportunities"
                  style={{
                    padding: '12px 14px',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>
                    Path 01
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginTop: '2px' }}>
                    Full-Time Roles
                  </div>
                  <span style={{ fontSize: '11px', color: '#4b5563' }}>FDE Engineering</span>
                </a>

                <a
                  href="#fellowships"
                  style={{
                    padding: '12px 14px',
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7e22ce', textTransform: 'uppercase' }}>
                    Path 02
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginTop: '2px' }}>
                    FDE Fellowship
                  </div>
                  <span style={{ fontSize: '11px', color: '#4b5563' }}>Frontier Research</span>
                </a>

                <a
                  href="#internships"
                  style={{
                    padding: '12px 14px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                    Path 03
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginTop: '2px' }}>
                    12M Internships
                  </div>
                  <span style={{ fontSize: '11px', color: '#4b5563' }}>Engineering &amp; Fin</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: APPLICATION FORM (VISIBLE ABOVE THE FOLD) */}
            <div className="diagnostic-form-col" id="apply-now">
              <TrustGridForm
                variant="career"
                formId="form_career_application"
                formName="Career Application Form"
                ctaSource="careers_page_primary"
              />
            </div>
          </div>
        </section>

        {/* SECTION 1: FELLOWSHIPS & RESEARCH PROGRAMS (PLACED PROMINENTLY ABOVE INTERNSHIPS) */}
        <section
          className="section"
          id="fellowships"
          style={{ paddingTop: '56px', paddingBottom: '64px', borderTop: '1px solid #e5e7eb', background: '#ffffff' }}
        >
          <div className="container">
            <div className="section-intro" style={{ marginBottom: '24px' }}>
              <div className="intro-left">
                <span className="section-badge badge-fellowship">RESEARCH INITIATIVE</span>
                <p className="section-label" style={{ color: '#2563eb' }}>
                  Advanced Frontier Engineering Programs
                </p>
              </div>
              <span className="section-index">CATEGORY 01</span>
            </div>

            <div className="showcase-header" style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 800, color: '#111827' }}>
                Fellowships &amp; <span>Research Programs</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#4b5563', maxWidth: '780px' }}>
                Join TRUSTGRID.AI&apos;s advanced research initiatives in autonomous intelligence, swarm robotics, digital
                twins, and mathematical governance. Collaborate directly with global research labs and industry experts.
              </p>
            </div>

            {/* FEATURED HIGHLIGHT CARD: FUTURE DRIVEN ENGINEERING (FDE) RESEARCH FELLOWSHIP */}
            <div className="fellowship-highlight-card">
              <div className="fellowship-card-accent-bar" />

              <div style={{ padding: 'clamp(24px, 3.5vw, 40px)' }}>
                {/* CARD TOP META ROW */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge-tag-base badge-fellowship">
                      <GraduationCap size={13} />
                      <span>Research Fellowship</span>
                    </span>
                    <span className="badge-tag-base badge-research">
                      <Cpu size={13} />
                      <span>Future Driven Engineering</span>
                    </span>
                    <span className="badge-tag-base badge-hybrid">
                      <Globe2 size={13} />
                      <span>Global R&amp;D Labs / Hybrid</span>
                    </span>
                  </div>

                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
                    Source: Official TRUSTGRID.AI LinkedIn
                  </span>
                </div>

                {/* FELLOWSHIP TITLE & LEAD */}
                <h3
                  style={{
                    fontSize: 'clamp(22px, 2.6vw, 30px)',
                    fontWeight: 800,
                    color: '#111827',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Future Driven Engineering (FDE) Research Fellowship
                </h3>
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6, maxWidth: '900px', marginBottom: '28px' }}>
                  Join TRUSTGRID.AI&apos;s advanced research initiative engineered to bridge academic rigor with
                  enterprise-scale autonomous intelligence. Fellows conduct foundational and applied research on
                  shop-floor cyber-physical systems, multi-agent swarms, and mathematical governance.
                </p>

                {/* 3-COLUMN STRUCTURED SPECIFICATIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: '32px' }}>
                  {/* COLUMN 1: RESEARCH FOCUS AREAS (9 ITEMS) */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '20px',
                      borderTop: '3px solid #2563eb'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <Terminal size={17} style={{ color: '#2563eb' }} />
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                        Research Focus Areas
                      </h4>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        'AI in Manufacturing',
                        'Swarm Intelligence',
                        'Robotics & Industrial Automation',
                        'Digital Twins',
                        'Autonomous Systems',
                        'Industry 5.0',
                        'Agentic AI',
                        'Autonomous Vehicles',
                        'Smart Factory Technologies'
                      ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                          <CheckCircle2 size={14} style={{ color: '#2563eb', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* COLUMN 2: ELIGIBILITY (5 ITEMS) */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '20px',
                      borderTop: '3px solid #7c3aed'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <Users size={17} style={{ color: '#7c3aed' }} />
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                        Program Eligibility
                      </h4>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        'Engineering Graduates',
                        'Postgraduates',
                        'Researchers',
                        'Working Professionals',
                        'AI Enthusiasts'
                      ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed', flexShrink: 0 }} />
                          <span style={{ fontWeight: 500 }}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: '22px', padding: '12px 14px', background: '#faf5ff', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                      <span style={{ fontSize: '11.5px', color: '#6b21a8', lineHeight: 1.45, display: 'block' }}>
                        Ideal for candidates with strong foundational mathematics, systems programming, and applied engineering interest.
                      </span>
                    </div>
                  </div>

                  {/* COLUMN 3: FELLOW BENEFITS (6 ITEMS) */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '20px',
                      borderTop: '3px solid #10b981'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <Award size={17} style={{ color: '#10b981' }} />
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                        Fellowship Benefits
                      </h4>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {[
                        'Real-world research exposure',
                        'Industry expert mentorship',
                        'Fellowship certification',
                        'Publication opportunities',
                        'AI innovation ecosystem access',
                        'Future career pathway opportunities'
                      ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#374151' }}>
                          <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: '18px', padding: '12px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                      <span style={{ fontSize: '11.5px', color: '#166534', lineHeight: 1.45, display: 'block' }}>
                        Graduates of the FDE Fellowship are given priority consideration for full-time research and engineering roles.
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION FOOTER: DUAL CTAS */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '1px solid #e5e7eb',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="#apply-now" className="button button-secondary button-sm">
                      <FileText size={15} />
                      <span>Learn More</span>
                    </a>

                    <a
                      href={LINKEDIN_FELLOWSHIP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-primary button-sm"
                      style={{ background: '#0077b5', borderColor: '#0077b5' }}
                    >
                      <span>Apply via LinkedIn</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <span style={{ fontSize: '12.5px', color: '#6b7280', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>Cohort Applications Currently Active • Synchronized with LinkedIn</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CURRENT OPPORTUNITIES (FULL-TIME JOBS) */}
        <section
          className="section"
          id="current-opportunities"
          style={{ paddingTop: '56px', paddingBottom: '64px', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}
        >
          <div className="container">
            <div className="section-intro" style={{ marginBottom: '24px' }}>
              <div className="intro-left">
                <span className="section-badge badge-full-time">FULL-TIME POSITIONS</span>
                <p className="section-label" style={{ color: '#2563eb' }}>
                  Future Driven Engineering Careers
                </p>
              </div>
              <span className="section-index">CATEGORY 02</span>
            </div>

            <div className="showcase-header" style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 800, color: '#111827' }}>
                Current <span>Opportunities</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#4b5563', maxWidth: '820px' }}>
                All Future Driven Engineering (FDE) positions and official opportunities published through TRUSTGRID.AI
                LinkedIn are surfaced through this Careers page as a single source of truth.
              </p>
            </div>

            {/* LINKEDIN SYNCHRONIZED NOTICE BANNER */}
            <div className="careers-linkedin-notice">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#0077b5',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Briefcase size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>
                    Single Source of Truth: Synchronized with TRUSTGRID.AI LinkedIn
                  </strong>
                  <p style={{ fontSize: '12.5px', color: '#334155', margin: '2px 0 0', lineHeight: 1.45 }}>
                    All roles listed below accept applications directly via the on-page portal or through our verified
                    LinkedIn job postings.
                  </p>
                </div>
              </div>

              <a
                href={LINKEDIN_JOBS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary button-sm"
                style={{ background: '#ffffff', borderColor: '#bfdbfe', color: '#0077b5' }}
              >
                <span>View on LinkedIn Jobs</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* JOB CARDS GRID (3x2 ON DESKTOP, EQUAL HEIGHTS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FULL_TIME_JOBS.map((job) => (
                <div key={job.id} className="careers-job-card">
                  <div>
                    {/* TOP META ROW */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                      <span className="badge-tag-base badge-full-time">Full-Time</span>
                      <span className={`badge-tag-base ${job.workplace === 'Remote' ? 'badge-remote' : 'badge-hybrid'}`}>
                        {job.workplace}
                      </span>
                    </div>

                    {/* ROLE TITLE & DEPARTMENT */}
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        color: '#111827',
                        lineHeight: 1.3,
                        marginBottom: '6px',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {job.title}
                    </h3>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb', marginBottom: '14px' }}>
                      {job.department}
                    </p>

                    {/* LOCATION & EXPERIENCE */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6b7280' }}>
                        <MapPin size={13} style={{ color: '#2563eb' }} />
                        <span>{job.location}</span>
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6b7280' }}>
                        <Clock size={13} style={{ color: '#2563eb' }} />
                        <span>{job.experience}</span>
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.55, marginBottom: '18px' }}>
                      {job.description}
                    </p>

                    {/* TAGS */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                      {job.tags.slice(2).map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            borderRadius: '4px',
                            color: '#475569',
                            fontWeight: 500
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACTION FOOTER */}
                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <a
                      href="#apply-now"
                      className="button button-primary button-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={14} />
                    </a>

                    <a
                      href={LINKEDIN_JOBS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-ghost button-sm"
                      title="View on LinkedIn"
                      style={{ padding: '8px 10px', color: '#0077b5' }}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERNSHIP PROGRAMS */}
        <section
          className="section"
          id="internships"
          style={{ paddingTop: '56px', paddingBottom: '70px', borderTop: '1px solid #e5e7eb', background: '#ffffff' }}
        >
          <div className="container">
            <div className="section-intro" style={{ marginBottom: '24px' }}>
              <div className="intro-left">
                <span className="section-badge badge-internship">12-MONTH PROGRAMS</span>
                <p className="section-label" style={{ color: '#166534' }}>
                  Accelerated Industry Immersion
                </p>
              </div>
              <span className="section-index">CATEGORY 03</span>
            </div>

            <div className="showcase-header" style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 800, color: '#111827' }}>
                Internship <span>Programs</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#4b5563', maxWidth: '820px' }}>
                Rigorous 12-month foundational internships bridging advanced engineering, industrial automation, and
                financial governance with tier-1 enterprise implementation.
              </p>
            </div>

            {/* TWO DEDICATED INTERNSHIP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* INTERNSHIP CARD 1: ENGINEERING INTERNSHIP PROGRAM */}
              <div className="careers-intern-card" style={{ borderTop: '4px solid #2563eb' }}>
                <div>
                  {/* TOP BADGE STRIP */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
                    <span className="badge-tag-base badge-internship">
                      <GraduationCap size={13} />
                      <span>Internship Program</span>
                    </span>
                    <span className="badge-tag-base badge-full-time">
                      <Clock size={13} />
                      <span>Duration: 12 Months</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    Engineering Internship Program
                  </h3>
                  <p style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, marginBottom: '20px' }}>
                    Future Driven Engineering, Robotics &amp; Industrial Systems
                  </p>

                  {/* ELIGIBILITY BLOCK */}
                  <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                      Target Disciplines &amp; Eligibility
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {[
                        'Mechanical Engineering',
                        'Electrical Engineering',
                        'Instrumentation Engineering',
                        'Mechatronics',
                        'Robotics'
                      ].map((disc, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '12px',
                            padding: '4px 10px',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            color: '#334155',
                            fontWeight: 500
                          }}
                        >
                          {disc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FOCUS AREAS */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                      Key Focus Areas
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        'Industrial Automation',
                        'Robotics',
                        'AI-Driven Manufacturing',
                        'Digital Twins',
                        'Smart Systems',
                        'Autonomous Technologies'
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: '#374151' }}>
                          <CheckCircle2 size={13} style={{ color: '#2563eb', flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REQUIREMENTS */}
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                      Program Requirements
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        'Strong programming fundamentals',
                        'Computer science understanding',
                        'Engineering problem solving',
                        'Automation and AI interest'
                      ].map((req, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#4b5563' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ACTION FOOTER */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #e5e7eb' }}>
                  <a
                    href="#apply-now"
                    className="button button-primary button-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Apply for Engineering Internship</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* INTERNSHIP CARD 2: FINANCE & GOVERNANCE INTERNSHIP PROGRAM */}
              <div className="careers-intern-card" style={{ borderTop: '4px solid #10b981' }}>
                <div>
                  {/* TOP BADGE STRIP */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
                    <span className="badge-tag-base badge-internship">
                      <GraduationCap size={13} />
                      <span>Internship Program</span>
                    </span>
                    <span className="badge-tag-base badge-full-time">
                      <Clock size={13} />
                      <span>Duration: 12 Months</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    Finance &amp; Governance Internship Program
                  </h3>
                  <p style={{ fontSize: '13px', color: '#166534', fontWeight: 600, marginBottom: '20px' }}>
                    AI Governance, Financial Controls &amp; Risk Analytics
                  </p>

                  {/* ELIGIBILITY BLOCK (CLEANED UP: "with B.Com") */}
                  <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                      Target Disciplines &amp; Eligibility
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['CA Inter', 'with B.Com', 'MBA Finance'].map((disc, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '12px',
                            padding: '4px 10px',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            color: '#334155',
                            fontWeight: 500
                          }}
                        >
                          {disc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FOCUS AREAS */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                      Key Focus Areas
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        'AI Governance Risk & Compliance',
                        'Financial Controls',
                        'Supply Chain Finance',
                        'Risk Analytics',
                        'AI-Driven Decision Making'
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: '#374151' }}>
                          <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REQUIREMENTS */}
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                      Program Requirements
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        'Analytical mindset',
                        'Finance fundamentals',
                        'Technology interest',
                        'AI business transformation awareness'
                      ].map((req, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#4b5563' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ACTION FOOTER */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #e5e7eb' }}>
                  <a
                    href="#apply-now"
                    className="button button-primary button-sm"
                    style={{ width: '100%', justifyContent: 'center', background: '#10b981', borderColor: '#10b981' }}
                  >
                    <span>Apply for Finance &amp; Governance Internship</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM GLOBAL CALLOUT BANNER */}
        <section style={{ padding: '48px 0', background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="badge-tag-base badge-full-time" style={{ marginBottom: '12px' }}>
              JOIN THE FRONTIER FLEET
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '8px 0 10px' }}>
              Don&apos;t See Your Exact Role?
            </h3>
            <p style={{ fontSize: '14.5px', color: '#4b5563', maxWidth: '640px', margin: '0 auto 20px', lineHeight: 1.55 }}>
              We are constantly seeking outstanding systems architects, kernel researchers, and AI quantitative
              economists. Submit an open inquiry or connect with our talent team on LinkedIn.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#apply-now" className="button button-primary button-sm">
                <span>Submit Open Application</span>
                <ArrowRight size={14} />
              </a>
              <a
                href={LINKEDIN_JOBS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary button-sm"
                style={{ color: '#0077b5' }}
              >
                <span>Follow TRUSTGRID.AI on LinkedIn</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
