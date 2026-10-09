import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Award,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Layers,
  Network,
  Globe2,
  Terminal,
  Zap
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { CAREER_ROLES } from '@/lib/form-submission'
import { HeroCanvas } from '@/components/ui/hero-canvas'

export default function CareersPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* ABOVE-THE-FOLD DEDICATED CAREERS APPLICATION SECTION */}
        <section className="section dedicated-form-hero-section" id="careers-top" style={{ paddingTop: '24px', paddingBottom: '50px' }}>
          <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: CAREERS OVERVIEW & VALUE PROPOSITION */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} />
                  <span>CAREERS &amp; RESEARCH FELLOWSHIPS</span>
                </span>
                <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                  Build the Frontier Operating System for <span style={{ color: '#1d5cff' }}>Enterprise AI Fleets.</span>
                </h1>
                <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                  Join elite systems architects, bare-metal GPU researchers, and multi-agent engineers solving the hardest problems in distributed compute economics, lossless fabrics, and post-quantum defense.
                </p>
              </div>

              {/* CORE CULTURE PILLARS */}
              <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Bare-Metal GPU &amp; Cluster Research</strong>
                    <p>Direct access to H100/B200 testbeds, custom ROCm/CUDA kernel optimization, and liquid immersion facilities.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Bot size={16} />
                  </div>
                  <div>
                    <strong>Deterministic Agent Swarms &amp; DAGs</strong>
                    <p>Architect autonomous multi-agent systems with mathematical safety bounds, MCP protocols, and formal verification.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Award size={16} />
                  </div>
                  <div>
                    <strong>Open Innovation &amp; Research Grants</strong>
                    <p>Participate in sponsored hackathons, grant fellowships, and co-publish research in post-quantum cryptography &amp; AI economics.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Globe2 size={16} />
                  </div>
                  <div>
                    <strong>Global High-Density R&amp;D Labs</strong>
                    <p>Engineering centers in Tampa (USA HQ), Singapore (APAC Hub), and Bengaluru &amp; Mumbai R&amp;D Labs.</p>
                  </div>
                </div>
              </div>

              {/* QUICK ROLES DIRECTORY CHIPS */}
              <div style={{ marginTop: '24px', padding: '16px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  FEATURED ACTIVE PRACTICE AREAS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                  {CAREER_ROLES.slice(0, 5).map((role) => (
                    <span
                      key={role}
                      style={{
                        fontSize: '11.5px',
                        padding: '4px 10px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#334155',
                        fontWeight: 500
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VERTICAL APPLICATION FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="career"
                formId="form_career_application"
                formName="Career Application Form"
                ctaSource="careers_page_primary"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: OPEN ROLES & ENGINEERING DOMAINS COMPENDIUM */}
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '60px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">PRACTICE DOMAINS</span>
              <p className="section-label">Full-Stack Systems Engineering &amp; AI Research</p>
            </div>
            <span className="section-index">OPEN ROLES</span>
          </div>

          <div className="showcase-header">
            <h2>
              Where engineering rigor meets <span>production AI scale.</span>
            </h2>
            <p>
              We operate across 6 specialized core engineering practices. Each team works directly on production enterprise workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">AI Infrastructure &amp; GPU Ops</h3>
              <p className="text-xs text-slate-600 mb-4">
                High-density GPU cluster design (30–100kW/rack), liquid cooling, NVLink/InfiniBand topologies, and bare-metal Slurm orchestration.
              </p>
              <span className="text-[11px] font-semibold text-blue-600">Active Roles: Senior Architect, Infrastructure Lead</span>
            </div>

            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
                <Bot size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Agentic Enterprise Systems</h3>
              <p className="text-xs text-slate-600 mb-4">
                Deterministic multi-agent swarms, Model Context Protocol (MCP) integrations, persistent memory fabrics, and autonomous AgentOps.
              </p>
              <span className="text-[11px] font-semibold text-indigo-600">Active Roles: Swarm Architect, AgentOps Engineer</span>
            </div>

            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4">
                <Network size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Lossless AI Networking</h3>
              <p className="text-xs text-slate-600 mb-4">
                400G/800G RoCEv2 and InfiniBand fabric engineering, NCCL collective comms tuning, and hardware congestion control algorithms.
              </p>
              <span className="text-[11px] font-semibold text-cyan-600">Active Roles: AI Fabric Architect, NOC Specialist</span>
            </div>

            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Quantum-Safe AI Cybersecurity</h3>
              <p className="text-xs text-slate-600 mb-4">
                L1–L7 Post-Quantum Cryptography (PQC / CBOM), runtime agent guardrails, prompt injection firewalls, and air-gapped enclaves.
              </p>
              <span className="text-[11px] font-semibold text-purple-600">Active Roles: PQC Security Engineer, Red-Team Lead</span>
            </div>

            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">AI Value Engineering &amp; FinOps</h3>
              <p className="text-xs text-slate-600 mb-4">
                Token cost economics, Lean/TOC operational waste elimination, KV-cache optimization, and CFO-grade balance sheet proof.
              </p>
              <span className="text-[11px] font-semibold text-emerald-600">Active Roles: FinOps Specialist, Systems Analyst</span>
            </div>

            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Terminal size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Industrial AI &amp; MES</h3>
              <p className="text-xs text-slate-600 mb-4">
                Shop-floor IIoT edge gateways, real-time computer vision quality inspection, digital twins, and autonomous shop-floor routing.
              </p>
              <span className="text-[11px] font-semibold text-amber-600">Active Roles: MES Automation Lead, CV Engineer</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
