import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  Handshake,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Network,
  Globe2,
  Boxes
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TrustGridForm } from '@/components/ui/trustgrid-form'
import { PARTNERSHIP_TYPES } from '@/lib/form-submission'

export default function PartnersPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content">
        {/* ABOVE-THE-FOLD DEDICATED PARTNER APPLICATION SECTION */}
        <section className="section dedicated-form-hero-section" id="partner-top" style={{ paddingTop: '24px', paddingBottom: '50px' }}>
          <div className="diagnostic-grid-layout" style={{ alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: STRATEGIC ALLIANCE OVERVIEW */}
            <div className="diagnostic-intro-col">
              <div className="diagnostic-badge-wrap">
                <span className="section-label" style={{ color: '#1d5cff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Handshake size={13} />
                  <span>ECOSYSTEM &amp; STRATEGIC ALLIANCES</span>
                </span>
                <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, margin: '8px 0 14px' }}>
                  Accelerate the Frontier AI Economy with <span style={{ color: '#1d5cff' }}>Strategic Ecosystem Alliances.</span>
                </h1>
                <p className="diagnostic-hero-lead" style={{ fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
                  We collaborate with silicon manufacturers, cloud hyperscalers, global systems integrators, and academic research labs to co-engineer resilient, sovereign, and post-quantum AI operating fabrics.
                </p>
              </div>

              {/* CORE PARTNER PILLARS */}
              <div className="diagnostic-value-points" style={{ marginTop: '20px' }}>
                <div className="value-point">
                  <div className="value-point-icon">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <strong>Silicon &amp; Hardware Alliances</strong>
                    <p>Benchmarking, kernel tuning, liquid cooling validation, and bare-metal cluster optimization with leading chip designers.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong>Systems Integrators &amp; Co-Delivery</strong>
                    <p>Turnkey DBOT AI Factory co-delivery, high-risk compliance certifications, and global enterprise client deployments.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Globe2 size={16} />
                  </div>
                  <div>
                    <strong>Hyperscaler &amp; Sovereign Cloud Mesh</strong>
                    <p>Air-gapped confidential compute enclaves, multi-cloud interconnects, and zero-data-leakage compliance fabrics.</p>
                  </div>
                </div>

                <div className="value-point">
                  <div className="value-point-icon">
                    <Boxes size={16} />
                  </div>
                  <div>
                    <strong>Research Labs &amp; Academic Fellowships</strong>
                    <p>Joint hackathons, post-quantum cryptographic safety benchmarks, and grant sponsorships for AI systems research.</p>
                  </div>
                </div>
              </div>

              {/* PROGRAM TRACKS CHIPS */}
              <div style={{ marginTop: '24px', padding: '16px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ACTIVE ALLIANCE TRACKS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                  {PARTNERSHIP_TYPES.slice(0, 4).map((pt) => (
                    <span
                      key={pt}
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
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VERTICAL PARTNER FORM (IMMEDIATELY VISIBLE ABOVE THE FOLD) */}
            <div className="diagnostic-form-col">
              <TrustGridForm
                variant="partner"
                formId="form_partner_inquiry"
                formName="Partner Application Form"
                ctaSource="partners_page_primary"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: TECHNOLOGY ECOSYSTEM & PLATFORM INTEROPERABILITY */}
        <section className="section" id="technology-ecosystem" style={{ paddingTop: '40px', paddingBottom: '60px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div className="section-intro">
            <div className="intro-left">
              <span className="section-badge">INTEROPERABLE TECHNOLOGY STACK</span>
              <p className="section-label">Multi-Model, Cloud, Framework &amp; Acceleration Interoperability</p>
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
                <p className="text-xs text-slate-600 mb-4">Foundation, open-weights &amp; reasoning architectures</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['OpenAI', 'Anthropic', 'Google Gemini', 'Llama', 'Mistral'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Dynamic routing, fine-tuning &amp; model distillation interoperability.
              </p>
            </div>

            {/* 2. CLOUD PLATFORMS */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-cyan-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4 font-mono text-xs font-bold">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">Cloud</h3>
                <p className="text-xs text-slate-600 mb-4">Sovereign, hybrid &amp; multi-cloud hyperscaler fabrics</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['AWS', 'Microsoft Azure', 'Google Cloud'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Air-gapped enclaves &amp; multi-cloud confidential compute topologies.
              </p>
            </div>

            {/* 3. AI / ML ENGINEERING */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4 font-mono text-xs font-bold">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">AI / ML Engineering</h3>
                <p className="text-xs text-slate-600 mb-4">Distributed training, lifecycle &amp; serving engines</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['PyTorch', 'Ray', 'Kubeflow', 'MLflow', 'vLLM'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Distributed data-parallel DAGs &amp; dynamic KV cache optimization.
              </p>
            </div>

            {/* 4. CONTAINER & ORCHESTRATION */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 font-mono text-xs font-bold">
                  04
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">Containers</h3>
                <p className="text-xs text-slate-600 mb-4">Microservices orchestration &amp; GPU node scheduling</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['Kubernetes', 'Docker'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                K8s device plugins, DRA scheduling &amp; Slurm co-orchestration.
              </p>
            </div>

            {/* 5. GPU / ACCELERATION */}
            <div className="animated-card p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-purple-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-4 font-mono text-xs font-bold">
                  05
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-1">GPU Acceleration</h3>
                <p className="text-xs text-slate-600 mb-4">Kernel execution, collective comms &amp; compiler stack</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['NVIDIA', 'CUDA', 'TensorRT', 'NCCL', 'Triton'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200/90 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Hardware-level kernel tuning, FP8 precision &amp; RoCEv2 AllReduce.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center shadow-xs">
            <strong className="text-slate-800">Architecture Notice:</strong> Technologies and frameworks listed represent production platforms engineered and supported by TrustGrid systems architects. All trademarks belong to their respective owners and indicate interoperability capabilities.
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
