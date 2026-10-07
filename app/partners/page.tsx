import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Handshake,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { PageBannerHero } from '@/components/ui/page-banner-hero'

export default function PartnersPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* STANDARD PAGE BANNER HERO */}
        <PageBannerHero
          badge="ECOSYSTEM ALLIANCES"
          badgeTag="STRATEGIC PARTNERSHIPS"
          title="Accelerating the Frontier AI Economy with"
          titleHighlight="Strategic Enterprise Partners"
          description="Join our global network of GPU compute providers, systems integrators, academic research labs, and enterprise technology innovators."
          thesisHighlight="Hyperscaler Alliances • Silicon & Hardware Partners • Global Systems Integrators"
          image="/images/offering-security.jpg"
          primaryCta={{
            label: "Join Partner Ecosystem",
            href: "#partner-form-section"
          }}
          secondaryCta={{
            label: "Explore Offerings",
            href: "/#offerings"
          }}
          quickNavItems={[
            { label: "1. Technology Ecosystem", href: "#technology-ecosystem" },
            { label: "2. Partner Application", href: "#partner-form-section" },
            { label: "3. Strategic Alliances", href: "/about#footprint" },
            { label: "4. Contact Team", href: "/contact" }
          ]}
          metrics={{
            statValue: "Ecosystem",
            statLabel: "Strategic Alliances",
            icon: Handshake,
            features: [
              "Multi-Model & Multi-Cloud Interop",
              "Silicon & GPU Acceleration Stack",
              "Distributed Orchestration & MLflow"
            ]
          }}
        />

        {/* SECTION 9: TECHNOLOGY ECOSYSTEM & PLATFORM INTEROPERABILITY */}
        <section className="section" id="technology-ecosystem" style={{ paddingTop: '40px', paddingBottom: '30px' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">INTEROPERABLE TECHNOLOGY STACK</span>
              <p className="section-label">Multi-Model, Cloud, Framework & Acceleration Interoperability</p>
            </div>
            <span className="section-index">ECOSYSTEM</span>
          </div>

          <div className="showcase-header">
            <h2>
              Engineered across <span>the frontier AI stack.</span>
            </h2>
            <p>
              TrustGrid engineers, benchmarks, and orchestrates production systems across leading foundation model architectures, hyperscale clouds, distributed ML runtimes, and bare-metal GPU acceleration frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {/* 1. AI MODELS */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4 font-mono text-xs font-bold">
                  01
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">AI Models</h3>
                <p className="text-xs text-slate-600 mb-4">Foundation, open-weights & reasoning architectures</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['OpenAI', 'Anthropic', 'Google Gemini', 'Llama', 'Mistral'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Dynamic routing, fine-tuning & model distillation interoperability.
              </p>
            </div>

            {/* 2. CLOUD PLATFORMS */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-cyan-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4 font-mono text-xs font-bold">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">Cloud</h3>
                <p className="text-xs text-slate-600 mb-4">Sovereign, hybrid & multi-cloud hyperscaler fabrics</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['AWS', 'Microsoft Azure', 'Google Cloud'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Air-gapped enclaves & multi-cloud confidential compute topologies.
              </p>
            </div>

            {/* 3. AI / ML ENGINEERING */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4 font-mono text-xs font-bold">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">AI / ML Engineering</h3>
                <p className="text-xs text-slate-600 mb-4">Distributed training, lifecycle & serving engines</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['PyTorch', 'Ray', 'Kubeflow', 'MLflow', 'vLLM'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Distributed data-parallel DAGs & dynamic KV cache optimization.
              </p>
            </div>

            {/* 4. CONTAINER & ORCHESTRATION */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 font-mono text-xs font-bold">
                  04
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">Containers</h3>
                <p className="text-xs text-slate-600 mb-4">Microservices orchestration & GPU node scheduling</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['Kubernetes', 'Docker'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                K8s device plugins, DRA scheduling & Slurm co-orchestration.
              </p>
            </div>

            {/* 5. GPU / ACCELERATION */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-purple-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-4 font-mono text-xs font-bold">
                  05
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">GPU Acceleration</h3>
                <p className="text-xs text-slate-600 mb-4">Kernel execution, collective comms & compiler stack</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['NVIDIA', 'CUDA', 'TensorRT', 'NCCL', 'Triton'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Hardware-level kernel tuning, FP8 precision & RoCEv2 AllReduce.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center shadow-xs">
            <strong className="text-slate-800">Architecture Notice:</strong> Technologies and frameworks listed represent production platforms engineered and supported by TrustGrid systems architects. All trademarks belong to their respective owners and indicate interoperability capabilities.
          </div>
        </section>

        {/* CONTENT & FORM */}
        <section className="section" id="partner-form-section" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
          <div className="diagnostic-grid-layout">
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff' }}>
                  ECOSYSTEM PROGRAM
                </span>
                <h2>Co-Engineering the Frontier AI Economy</h2>
                <p className="diagnostic-hero-lead">
                  We collaborate with hardware designers, hyperscalers, multi-agent frameworks, and enterprise consultants to deploy trusted AI operating systems.
                </p>
              </div>

              <div className="diagnostic-value-points">
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Compute & Hardware Alliances</strong>
                    <p>Benchmarking, token cost optimization, and bare-metal cluster engineering.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong>Systems Integration</strong>
                    <p>Co-delivery of high-risk enterprise AI platforms and compliance audits.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Handshake size={16} />
                  </div>
                  <div>
                    <strong>Research & Innovation Labs</strong>
                    <p>Joint hackathons, post-quantum cryptographic safety, and grant fellowships.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="partner"
                formId="form_partner_inquiry"
                formName="Partner Application Form"
                ctaSource="partners_page"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
