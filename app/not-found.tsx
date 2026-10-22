import Link from 'next/link'
import {
  Cpu,
  Layers,
  Workflow,
  ShieldCheck,
  Building2,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Home,
  Mail
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ClientPathRedirector } from '@/components/client-path-redirector'

export default function NotFound() {
  const solutions = [
    {
      title: 'AI Infra Engineering',
      desc: 'High-density GPU clusters, liquid immersion cooling, and bare-metal HPC performance.',
      href: '/solutions/ai-infra-engineering',
      badge: 'Compute & DCIM',
      icon: Cpu
    },
    {
      title: 'AI Agentic Factory',
      desc: 'Production-grade deterministic multi-agent swarms, DAG orchestration, and semantic tool use.',
      href: '/solutions/ai-agentic-factory',
      badge: 'Orchestration',
      icon: Workflow
    },
    {
      title: 'AI Networking & Cyber Defense',
      desc: '400G/800G lossless fabrics (RoCEv2), quantum-safe encryption, and self-healing cyber mesh.',
      href: '/solutions/ai-networking-cybersecurity',
      badge: 'Zero-Drop & Security',
      icon: ShieldCheck
    },
    {
      title: 'AI Value Engineering',
      desc: '5-Stage proof framework, 4-engineer pods, and CFO-audited ROI realization.',
      href: '/practice-areas/ai-value-engineering',
      badge: 'Delivery Practice',
      icon: TrendingUp
    }
  ]

  const practiceAreas = [
    {
      title: 'High-Density Compute & DCIM',
      href: '/practice-areas/ai-infrastructure-high-density-compute',
      category: 'Infrastructure'
    },
    {
      title: 'Lossless AI Networking Fabrics',
      href: '/practice-areas/ai-native-networking-systems-integration',
      category: 'Fabric & Network'
    },
    {
      title: 'Distributed Agent Swarms & Mesh',
      href: '/practice-areas/agentic-ai-multi-agent-orchestration',
      category: 'Autonomous Agents'
    },
    {
      title: 'Quantum-Safe & Sovereign Cyber Defense',
      href: '/practice-areas/ai-cybersecurity-quantum-safe-defense',
      category: 'Sovereign Enclaves'
    },
    {
      title: 'AI Governance, Risk & EU AI Act GRC',
      href: '/practice-areas/ai-governance-risk-compliance',
      category: 'Compliance & Audit'
    },
    {
      title: 'Enterprise LLM & Context Engineering',
      href: '/practice-areas/enterprise-llm-rag-context-engineering',
      category: 'Knowledge Graph'
    }
  ]

  const industryVerticals = [
    {
      title: 'Banking & Financial Services (BFSI)',
      href: '/industries/banking-financial-services'
    },
    {
      title: 'Healthcare & Life Sciences',
      href: '/industries/healthcare-life-sciences'
    },
    {
      title: 'Manufacturing & Industrial AI',
      href: '/industries/manufacturing-discrete'
    },
    {
      title: 'Energy & Smart Utilities',
      href: '/industries/energy-utilities'
    },
    {
      title: 'Telecommunications & Cloud',
      href: '/industries/telecommunications'
    },
    {
      title: 'Government & Public Sector',
      href: '/industries/government-public-sector'
    }
  ]

  return (
    <div className="page-shell min-h-screen flex flex-col justify-between bg-[#0b1220] text-slate-100">
      <SiteHeader />
      <ClientPathRedirector />

      <main className="flex-1 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Enterprise Architecture Navigator
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Explore TRUSTGRID.AI Systems &amp; Solutions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Access the complete blueprint catalog across high-density AI infrastructure, autonomous agent factories, sovereign cybersecurity meshes, and industry-specific deployment practices.
            </p>
          </div>

          {/* Core Engineering Solutions Grid */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Flagship Engineering Solutions</h2>
                <p className="text-xs text-slate-400">Core turnkey operational platforms</p>
              </div>
              <Link
                href="/solutions/ai-infra-engineering"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold transition-colors"
              >
                <span>View all solutions</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {solutions.map((sol, i) => {
                const IconComponent = sol.icon
                return (
                  <Link
                    key={i}
                    href={sol.href}
                    className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <IconComponent size={18} />
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {sol.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                        {sol.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                      <span>Explore Architecture</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Two-Column Directory: Practice Areas & Industries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Practice Areas */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Workflow size={18} className="text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Engineering Practice Areas</h3>
                </div>
                <Link
                  href="/practice-areas"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Directory →
                </Link>
              </div>
              <div className="divide-y divide-slate-800">
                {practiceAreas.map((pa, idx) => (
                  <Link
                    key={idx}
                    href={pa.href}
                    className="py-3 flex items-center justify-between group hover:text-cyan-300 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 block">
                        {pa.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{pa.category}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Industry Verticals */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Industry Vertical Blueprints</h3>
                </div>
                <Link
                  href="/industries"
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  All 12 Verticals →
                </Link>
              </div>
              <div className="divide-y divide-slate-800">
                {industryVerticals.map((ind, idx) => (
                  <Link
                    key={idx}
                    href={ind.href}
                    className="py-3 flex items-center justify-between group hover:text-blue-300 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300">
                      {ind.title}
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-slate-900/80 to-cyan-900/20 border border-blue-500/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Need an architectural feasibility review or custom engagement?
              </h4>
              <p className="text-xs text-slate-400">
                Our forward-deployed systems engineers evaluate workloads within 72 hours.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/book-ai-diagnostic"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
              >
                Book AI Diagnostic
              </Link>
              <Link
                href="/talk-to-ai-architect"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                Talk to AI Architect
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

