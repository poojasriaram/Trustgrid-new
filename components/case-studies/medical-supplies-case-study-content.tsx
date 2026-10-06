'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  ShieldCheck,
  Target,
  Cpu,
  Layers,
  Sparkles,
  FileText,
  Scan,
  AlertTriangle,
  ChevronRight,
  Eye,
  Server,
  Workflow,
  Camera,
  QrCode,
  FileCheck,
  ShieldAlert,
  Printer,
  Boxes,
  HelpCircle,
  Building2,
  BarChart3,
  Flame,
  Check,
  ArrowDown
} from 'lucide-react'
import { TrustGridForm } from '@/components/ui/trustgrid-form'

export function MedicalSuppliesCaseStudyContent() {
  const [activePillarTab, setActivePillarTab] = useState<number>(0)

  const impactMetrics = [
    {
      value: '3 Days',
      label: 'T&C LEAD TIME',
      subtext: 'VS 3–4 WEEKS',
      badge: '87% Reduction',
      icon: Clock,
      accent: '#1d5cff'
    },
    {
      value: '300%',
      label: 'DISTRIBUTION VELOCITY',
      subtext: 'INCREASE',
      badge: '4x Speedup',
      icon: Zap,
      accent: '#0284c7'
    },
    {
      value: '90%',
      label: 'RETURN & RECALL',
      subtext: 'REDUCTION',
      badge: '4.5% to 0.45%',
      icon: ShieldCheck,
      accent: '#10b981'
    },
    {
      value: '99.9%',
      label: 'LICENSE MISMATCH DEFECT',
      subtext: 'PREVENTION',
      badge: '0.001% Defect Rate',
      icon: Target,
      accent: '#8b5cf6'
    }
  ]

  const pillars = [
    {
      num: '01',
      title: 'Generative AI Compliance',
      shortDesc: 'Automated multi-jurisdiction warranty T&C generation grounded in legal knowledge bases with zero hallucination guardrails.',
      icon: Sparkles
    },
    {
      num: '02',
      title: 'Dynamic Regulatory Labeling',
      shortDesc: 'Direct factory inkjet synchronization embedding localized health disclaimers and verified country license numbers.',
      icon: Printer
    },
    {
      num: '03',
      title: 'Edge Computer Vision Inspection',
      shortDesc: 'Multi-node optical beam triggered vision verifying seal integrity, barcode legibility, and label alignment at factory and DC gates.',
      icon: Camera
    },
    {
      num: '04',
      title: 'Touchless Warranty Claim Automation',
      shortDesc: 'Agentic multimodal adjudication parsing defect photos, OCR batch numbers, and auto-approving 85% of claims in under 2 minutes.',
      icon: QrCode
    }
  ]

  const operationalFrictions = [
    {
      id: 1,
      title: 'Product Launch Bottlenecks',
      desc: '3 to 4 weeks of localized legal review per market created high administrative overhead and market launch delays.',
      metric: '3–4 Weeks per market',
      tag: 'Legal Latency'
    },
    {
      id: 2,
      title: 'Manual Node Inspection Failures',
      desc: 'Physical inspection of box seals, barcode legibility, and label alignment at factory gates and distribution centers relied on manual checks—leading to high energy consumption on idle conveyor lines and missed defects.',
      metric: '145 kWh / 10k pkgs',
      tag: 'Conveyor Waste'
    },
    {
      id: 3,
      title: 'Packaging & Returns Exposure',
      desc: 'Transit damage or minor label mismatches caused product return rates of ~4.5%, representing millions in discarded disposables.',
      metric: '4.5% Return Rate',
      tag: 'Scrap & Write-Off'
    },
    {
      id: 4,
      title: 'Disjointed Warranty Management',
      desc: 'Slow claims handling (10–14 days) and lack of traceability between packaging batch codes and regional terms led to unverified or fraudulent claims.',
      metric: '10–14 Days Handling',
      tag: 'Fraud & Latency'
    }
  ]

  const kpiTableData = [
    {
      metric: 'Market T&C Lead Time',
      before: '3–4 Weeks per market',
      after: '3 Days per market',
      impact: '~87% Time Savings',
      highlight: true
    },
    {
      metric: 'Distribution Velocity',
      before: '72 Hours turnaround',
      after: '18 Hours turnaround',
      impact: '300% Velocity Increase',
      highlight: true
    },
    {
      metric: 'Returns & Recalls Rate',
      before: '4.5% of total shipments',
      after: '0.45% of shipments',
      impact: '90% Reduction',
      highlight: true
    },
    {
      metric: 'License Placement Defect Rate',
      before: '2.1% manual mismatch',
      after: '0.001% error rate',
      impact: '99.9% Defect Prevention',
      highlight: true
    },
    {
      metric: 'Inspection Power Usage',
      before: '145 kWh / 10k pkgs',
      after: '38 kWh / 10k pkgs',
      impact: '74% Power Savings',
      highlight: false
    },
    {
      metric: 'Claim Settlement Speed',
      before: '10–14 Days average',
      after: '< 2 Minutes (STP)',
      impact: '99% Faster Processing',
      highlight: true
    },
    {
      metric: 'Claim Operational Cost',
      before: '~$45 per claim',
      after: '~$6 per claim',
      impact: '86% Cost Reduction',
      highlight: false
    }
  ]

  const strategicLessons = [
    {
      num: '01',
      title: 'Grounded GenAI is Essential for Regulated Industries',
      body: 'Generative AI serves as an accelerator when grounded in vetted knowledge bases. Unconstrained models introduce hallucination risks; RAG pipelines ensure legal and medical compliance across diverse international markets.',
      impact: '87% Time Savings',
      accent: '#1d5cff'
    },
    {
      num: '02',
      title: 'Bridge Digital Generation with Physical Execution',
      body: 'Generating legal copy is only half the battle. Linking LLM outputs directly into factory-floor packaging printers and downstream inspection nodes guarantees consistency between legal disclosures and physical product packaging.',
      impact: '99.9% Defect Prevention',
      accent: '#8b5cf6'
    },
    {
      num: '03',
      title: 'Multi-Node Edge Vision Protects Quality & Energy Budgets',
      body: 'Deploying event-driven vision AI across manufacturing and distribution nodes intercepts mislabeled or damaged goods before dispatch, driving down product returns while keeping operational energy footprints low.',
      impact: '74% Power Savings',
      accent: '#0284c7'
    },
    {
      num: '04',
      title: 'Touchless Claims Processing Unlocks Value',
      body: 'Connecting on-box dynamic QR codes to an agentic LLM claims adjudicator turns warranty management from a cost center into a streamlined customer experience tool.',
      impact: '99% Faster Processing | 86% Cost Reduction',
      accent: '#10b981'
    }
  ]

  return (
    <article className="case-study-detail-container" itemScope itemType="https://schema.org/Article">
      {/* BREADCRUMB & CONTEXT NAV */}
      <nav className="cs-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="cs-container">
          <div className="cs-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <Link href="/case-studies" className="crumb-link">Case Studies</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span className="crumb-current">Medical Supplies & Manufacturing</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="cs-hero-section" id="overview">
        <div className="cs-container">
          <div className="cs-hero-grid">
            <div className="cs-hero-copy">
              <div className="cs-eyebrow-badge">
                <span className="cs-pulse-dot" />
                <span itemProp="headline">GLOBAL CASE STUDY — MEDICAL SUPPLIES & MANUFACTURING</span>
              </div>

              <h1 className="cs-main-heading">
                End-to-End AI Automation in Medical Supplies Packaging, Regulatory Labeling, Supply Chain Inspection & Warranty Management
              </h1>

              <p className="cs-hero-subtext">
                Implemented by TRUSTGRID.AI | Transforming Global Compliance, Quality Verification, and Claim Adjudication for Disposable Hygiene & Sterile Supplies
              </p>

              <div className="cs-hero-actions">
                <a href="#architecture" className="button button-primary button-lg" id="btn-explore-architecture">
                  <span>Explore the AI Architecture</span>
                  <ArrowDown size={18} />
                </a>
                <a href="#kpi-matrix" className="button button-secondary button-lg" id="btn-view-business-impact">
                  <span>View Business Impact</span>
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="cs-hero-pills">
                <span className="pill-item">Generative AI</span>
                <span className="pill-item">Edge Computer Vision</span>
                <span className="pill-item">RAG Compliance</span>
                <span className="pill-item">Agentic Adjudication</span>
                <span className="pill-item">Supply Chain Quality</span>
              </div>
            </div>

            <div className="cs-hero-visual-card">
              <div className="cs-visual-frame">
                <img
                  src="/images/case-study-medical-packaging.jpg"
                  alt="Medical Supplies Manufacturing AI Packaging Inspection Line"
                  className="cs-hero-image"
                  itemProp="image"
                />
                <div className="cs-visual-overlay-gradient" />

                <div className="cs-floating-telemetry top-right">
                  <div className="telemetry-badge-pulse" />
                  <div>
                    <span className="telemetry-label">INSPECTION NODE 04</span>
                    <span className="telemetry-value">SEAL INTEGRITY: 99.98%</span>
                  </div>
                </div>

                <div className="cs-floating-telemetry bottom-left">
                  <Cpu size={16} className="text-blue-400" />
                  <div>
                    <span className="telemetry-label">DYNAMIC INKJET OCR</span>
                    <span className="telemetry-value">FDA • ANVISA • CDSCO SYNCED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* EXECUTIVE IMPACT METRICS */}
      <section className="cs-metrics-section" id="impact-metrics" aria-label="Executive Impact Metrics">
        <div className="cs-container">
          <div className="cs-metrics-grid">
            {impactMetrics.map((metric, idx) => {
              const IconComp = metric.icon
              return (
                <div key={idx} className="cs-metric-card animated-card reveal-up">
                  <div className="metric-header">
                    <div className="metric-icon-wrap" style={{ color: metric.accent }}>
                      <IconComp size={22} />
                    </div>
                    <span className="metric-delta-tag">{metric.badge}</span>
                  </div>
                  <div className="metric-number-display">{metric.value}</div>
                  <div className="metric-label-title">{metric.label}</div>
                  <div className="metric-subtext-note">{metric.subtext}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 1 — EXECUTIVE SUMMARY */}
      <section className="cs-section cs-summary-section" id="executive-summary">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">OVERVIEW & SCOPE</span>
            <h2 className="section-title">Executive Summary</h2>
            <div className="section-rule" />
          </div>

          <div className="cs-summary-lead-box animated-card">
            <p className="cs-lead-paragraph">
              A global manufacturer of medical hygiene products (specializing in adult incontinence disposables, surgical packs, and single-use medical supplies) deployed an enterprise AI ecosystem combining Generative AI (LLMs) and Edge Computer Vision (CV).
            </p>
            <p className="cs-lead-sub">
              The system automates four critical pillars:
            </p>
            <ol className="cs-lead-numbered-list">
              <li><strong>Multi-jurisdiction warranty T&C generation</strong> across 40+ global regulatory environments.</li>
              <li><strong>Dynamic labeling</strong> with verified Local Country License Numbers printed in-line on factory floors.</li>
              <li><strong>Multi-node packaging quality inspection</strong> preventing transit defect escalation and saving power.</li>
              <li><strong>Touchless warranty claim adjudication</strong> resolving customer hospital claims in under 2 minutes.</li>
            </ol>
          </div>

          <div className="cs-pillars-grid">
            {pillars.map((p, idx) => {
              const PIcon = p.icon
              return (
                <div key={idx} className="cs-pillar-card animated-card reveal-up">
                  <div className="pillar-top">
                    <span className="pillar-num">{p.num}</span>
                    <div className="pillar-icon-box">
                      <PIcon size={20} />
                    </div>
                  </div>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.shortDesc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2 — BUSINESS PROBLEM & REGULATORY CONTEXT */}
      <section className="cs-section cs-problem-section" id="business-context">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">REGULATORY COMPLEXITY</span>
            <h2 className="section-title">Business Problem & Regulatory Context</h2>
            <div className="section-rule" />
          </div>

          <div className="cs-problem-intro-panel animated-card">
            <p className="problem-lead">
              Distributing medical supplies across 40+ international and domestic markets presents strict regulatory and operational hurdles. Products cannot rely on single, uniform warranties or static packaging disclaimers due to overlapping regulatory frameworks.
            </p>
          </div>

          <div className="cs-dual-context-grid">
            {/* CARD 1 — Jurisdictional & Medical Regulations */}
            <div className="cs-context-card animated-card reveal-up">
              <div className="context-card-header">
                <div className="context-icon">
                  <ShieldCheck size={22} className="text-blue-500" />
                </div>
                <div>
                  <span className="context-eyebrow">CARD 1 — STATUTORY COMPLIANCE</span>
                  <h3>Jurisdictional & Medical Regulations</h3>
                </div>
              </div>
              <p className="context-body">
                Warranty terms must comply with country-level consumer acts (US Magnuson-Moss, EU Consumer Rights Directive, India CPA) while respecting localized medical device disclaimers regarding single-use hygiene, sterility expectations, and strict limitation-of-liability rules.
              </p>
              <div className="context-tags">
                <span className="ctx-pill">US Magnuson-Moss Act</span>
                <span className="ctx-pill">EU Consumer Rights Directive</span>
                <span className="ctx-pill">India Consumer Protection Act</span>
                <span className="ctx-pill">Single-Use Sterility Disclaimers</span>
              </div>
            </div>

            {/* CARD 2 — Local Country License Numbers */}
            <div className="cs-context-card animated-card reveal-up">
              <div className="context-card-header">
                <div className="context-icon">
                  <Printer size={22} className="text-emerald-500" />
                </div>
                <div>
                  <span className="context-eyebrow">CARD 2 — PACKAGING DISCLOSURES</span>
                  <h3>Local Country License Numbers</h3>
                </div>
              </div>
              <p className="context-body">
                Specific regional registrations (e.g., US FDA, Brazil ANVISA, India CDSCO, China NMPA) must be printed directly on physical boxes. Regulatory mismatch or label omission results in customs delays or immediate product rejections.
              </p>
              <div className="context-tags">
                <span className="ctx-pill">US FDA Registration</span>
                <span className="ctx-pill">Brazil ANVISA Cadastramento</span>
                <span className="ctx-pill">India CDSCO Medical Device</span>
                <span className="ctx-pill">China NMPA Filing Code</span>
              </div>
            </div>
          </div>

          {/* OPERATIONAL FRICTION */}
          <div className="cs-friction-wrapper">
            <div className="friction-header-bar">
              <div className="friction-badge">
                <AlertTriangle size={15} />
                <span>OBSERVED VULNERABILITIES</span>
              </div>
              <h3 className="friction-heading">Four Primary Dimensions of Operational Friction</h3>
              <p className="friction-sub">Prior to the deployment of the TRUSTGRID.AI ecosystem, manual interventions created high overhead and exposure across all four operational nodes.</p>
            </div>

            <div className="cs-friction-grid">
              {operationalFrictions.map((f) => (
                <div key={f.id} className="cs-friction-card animated-card reveal-up">
                  <div className="friction-top">
                    <span className="friction-idx">0{f.id}</span>
                    <span className="friction-metric-chip">{f.metric}</span>
                  </div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                  <div className="friction-footer-tag">
                    <span>Friction Vector:</span> {f.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTEGRATED AI SYSTEM ARCHITECTURE */}
      <section className="cs-section cs-architecture-section" id="architecture">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">FULL-STACK SYSTEM TOPOLOGY</span>
            <h2 className="section-title">Integrated AI System Architecture</h2>
            <p className="section-subtitle">Global Compliance & Inspection</p>
            <div className="section-rule" />
          </div>

          {/* INTERACTIVE / LAYERED ARCHITECTURE DIAGRAM */}
          <div className="cs-arch-diagram-card animated-card">
            <div className="diagram-header">
              <div className="diagram-status">
                <span className="live-pulse" />
                <span>PRODUCTION ARCHITECTURE TOPOLOGY — 4 TIERS</span>
              </div>
              <span className="diagram-caption">Deterministic Legal Grounding → High-Speed Physical Execution</span>
            </div>

            <div className="diagram-layers-stack">
              {/* LAYER 1 */}
              <div className="arch-layer-block layer-1">
                <div className="layer-tag-col">
                  <span className="layer-num">LAYER 1</span>
                  <span className="layer-name">GENERATIVE AI & COMPLIANCE CORE</span>
                </div>
                <div className="layer-content-col">
                  <div className="component-nodes-grid">
                    <div className="arch-node-chip">
                      <span className="node-title">Jurisdiction Rules DB</span>
                      <span className="node-detail">40+ Country Legal Schemas</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">Product Specs & Sterility Class</span>
                      <span className="node-detail">Hygiene & Class I/II Classifications</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">License Registry</span>
                      <span className="node-detail">FDA • ANVISA • CDSCO • NMPA</span>
                    </div>
                    <div className="arch-node-chip highlight-chip">
                      <span className="node-title">LLM Generation Engine</span>
                      <span className="node-detail">Grounded RAG Pipeline</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">Legal Knowledge Base Verification</span>
                      <span className="node-detail">Vector Embeddings & Provenance</span>
                    </div>
                    <div className="arch-node-chip alert-chip">
                      <span className="node-title">Zero Hallucination Guardrails</span>
                      <span className="node-detail">Deterministic Policy Bounds</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARROW 1 -> 2 */}
              <div className="arch-connector-row">
                <div className="connector-line" />
                <div className="connector-badge">
                  <ArrowDown size={14} />
                  <span>Synthesized Legal Text & Dynamic Disclosures</span>
                </div>
                <div className="connector-line" />
              </div>

              {/* LAYER 2 */}
              <div className="arch-layer-block layer-2">
                <div className="layer-tag-col">
                  <span className="layer-num">LAYER 2</span>
                  <span className="layer-name">DERIVED ARTIFACTS MATRIX</span>
                </div>
                <div className="layer-content-col">
                  <div className="component-nodes-grid">
                    <div className="arch-node-chip">
                      <span className="node-title">Full Legal T&Cs</span>
                      <span className="node-detail">40+ Jurisdictions Validated</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">Package Inserts</span>
                      <span className="node-detail">Regulatory Disclosures</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">Print Label Copy</span>
                      <span className="node-detail">Embedded License Numbers</span>
                    </div>
                    <div className="arch-node-chip">
                      <span className="node-title">WLM System Data</span>
                      <span className="node-detail">CRM Policy Rules</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARROW 2 -> 3 */}
              <div className="arch-connector-row">
                <div className="connector-line" />
                <div className="connector-badge">
                  <ArrowDown size={14} />
                  <span>Factory Floor Production Trigger (High-Speed Inkjet Stream)</span>
                </div>
                <div className="connector-line" />
              </div>

              {/* LAYER 3 */}
              <div className="arch-layer-block layer-3">
                <div className="layer-tag-col">
                  <span className="layer-num">LAYER 3</span>
                  <span className="layer-name">PRINTING & COMPUTER VISION INSPECTION PIPELINE</span>
                </div>
                <div className="layer-content-col">
                  <div className="pipeline-flow-steps">
                    <div className="flow-step-box">
                      <span className="step-num">Step 1</span>
                      <span className="step-name">Inline Dynamic Printing</span>
                      <span className="step-sub">Real-Time Queue</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step-box">
                      <span className="step-num">Step 2</span>
                      <span className="step-name">Variable T&Cs + Local License</span>
                      <span className="step-sub">ANVISA / CDSCO Injection</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step-box">
                      <span className="step-num">Step 3</span>
                      <span className="step-name">High-Speed Inkjet Integration</span>
                      <span className="step-sub">Direct Box Micro-Copy</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step-box highlight-step">
                      <span className="step-num">Step 4</span>
                      <span className="step-name">Edge CV Camera Nodes</span>
                      <span className="step-sub">Event-Triggered Beam</span>
                    </div>
                  </div>

                  <div className="inspection-sub-grid">
                    <div className="sub-inspect-item">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span><strong>Seal Check:</strong> Packaging integrity verification</span>
                    </div>
                    <div className="sub-inspect-item">
                      <CheckCircle2 size={15} className="text-blue-500" />
                      <span><strong>OCR License:</strong> Real-time alpha-numeric registration match</span>
                    </div>
                    <div className="sub-inspect-item">
                      <CheckCircle2 size={15} className="text-purple-500" />
                      <span><strong>Damage Scan:</strong> Transit puncture & crush detection</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARROW 3 -> 4 */}
              <div className="arch-connector-row">
                <div className="connector-line" />
                <div className="connector-badge">
                  <ArrowDown size={14} />
                  <span>Downstream Field Traceability & Dynamic On-Box QR</span>
                </div>
                <div className="connector-line" />
              </div>

              {/* LAYER 4 */}
              <div className="arch-layer-block layer-4">
                <div className="layer-tag-col">
                  <span className="layer-num">LAYER 4</span>
                  <span className="layer-name">TOUCHLESS LLM WARRANTY CLAIM AUTOMATION</span>
                </div>
                <div className="layer-content-col">
                  <div className="claims-pipeline-grid">
                    <div className="claim-stage-card">
                      <span className="stage-eyebrow">STAGE A: INTAKE</span>
                      <h4>Claim Intake</h4>
                      <ul>
                        <li>• On-Box QR Code Scan</li>
                        <li>• Photo Defect Upload</li>
                        <li>• Digital Invoice Parse</li>
                      </ul>
                    </div>

                    <div className="claim-stage-card highlight-stage">
                      <span className="stage-eyebrow">STAGE B: MULTIMODAL AI</span>
                      <h4>Agentic Adjudication</h4>
                      <ul>
                        <li>• Multimodal Sterility Inspection</li>
                        <li>• RAG Policy Rule Validation</li>
                        <li>• Anomaly & Fraud Scoring</li>
                      </ul>
                    </div>

                    <div className="claim-stage-card success-stage">
                      <span className="stage-eyebrow">STAGE C: RESOLUTION</span>
                      <h4>STP Resolution</h4>
                      <ul>
                        <li>• <strong>85% Auto-Approved</strong> (&lt;2 min)</li>
                        <li>• Instant Credit / Replacement Ship</li>
                        <li>• Risk Escalation Flagging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — END-TO-END AI ARCHITECTURE BREAKDOWN */}
      <section className="cs-section cs-breakdown-section" id="architecture-breakdown">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">DEEP ARCHITECTURAL PILLARS</span>
            <h2 className="section-title">End-to-End AI Architecture Breakdown</h2>
            <div className="section-rule" />
          </div>

          <div className="cs-pillars-breakdown-stack">
            {/* PILLAR 1 */}
            <div className="cs-pillar-deep-card animated-card reveal-up">
              <div className="pillar-deep-header">
                <span className="pillar-badge-num">PILLAR 01</span>
                <h3>Generative AI & Compliance Engine</h3>
              </div>
              <div className="pillar-deep-body">
                <p>
                  The core compliance engine uses a Retrieval-Augmented Generation (RAG) architecture that couples Large Language Models with a verified Legal Knowledge Base. By isolating legal parameters—such as mandatory warranty durations, return rights, hygiene exclusions, and localized health disclosures—the engine creates compliant legal text without hallucination risks.
                </p>

                <div className="pillar-sub-feature-box">
                  <div className="feature-col">
                    <span className="col-heading">Matrix-Driven Generation</span>
                    <p className="col-text">
                      The system maps content across three coordinates:
                    </p>
                    <div className="coordinate-pill">
                      Country × State/Province × Artifact Type
                    </div>
                  </div>

                  <div className="feature-col">
                    <span className="col-heading">Derived Deliverables</span>
                    <p className="col-text">Automatically creates:</p>
                    <ul className="derived-list">
                      <li><Check size={14} /> Long-form legal terms</li>
                      <li><Check size={14} /> Condensed packaging inserts</li>
                      <li><Check size={14} /> Micro-copy for packaging boxes</li>
                      <li><Check size={14} /> Warranty claim rules</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="cs-pillar-deep-card animated-card reveal-up">
              <div className="pillar-deep-header">
                <span className="pillar-badge-num">PILLAR 02</span>
                <h3>Dynamic Inline Label Printing</h3>
              </div>
              <div className="pillar-deep-body">
                <p>
                  Text strings generated by the LLM pipeline are routed directly into factory-floor packaging printers.
                </p>
                <p>
                  The system dynamically formats legal micro-copy alongside active Local Country License Numbers (e.g., ANVISA for Brazil, CDSCO for India).
                </p>
                <p className="pillar-highlight-text">
                  This guarantees that every box printed reflects the specific regulatory registrations required for its destination market.
                </p>
                <div className="factory-integration-badges">
                  <span className="f-badge">Industrial Ethernet / Modbus TCP Protocol</span>
                  <span className="f-badge">High-Speed Inkjet Continuous Queue</span>
                  <span className="f-badge">Sub-Second Dynamic Buffering</span>
                </div>
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="cs-pillar-deep-card animated-card reveal-up">
              <div className="pillar-deep-header">
                <span className="pillar-badge-num">PILLAR 03</span>
                <h3>Edge Computer Vision Package Inspection</h3>
              </div>
              <div className="pillar-deep-body">
                <p>
                  High-speed, event-triggered edge computer vision systems are deployed across key supply chain nodes:
                </p>
                <div className="node-locations-row">
                  <div className="node-loc-pill">
                    <Boxes size={15} />
                    <span>Production End-of-Line</span>
                  </div>
                  <div className="node-loc-pill">
                    <Server size={15} />
                    <span>Regional Distribution Centers</span>
                  </div>
                  <div className="node-loc-pill">
                    <Workflow size={15} />
                    <span>Delivery Hubs</span>
                  </div>
                </div>

                <div className="pillar-sub-feature-box">
                  <div className="feature-col">
                    <span className="col-heading">Optical Quality Verification</span>
                    <p className="col-text">
                      Cameras perform real-time Optical Character Recognition (OCR) on dynamic license numbers and barcodes while verifying seal integrity and sterile packaging wraps.
                    </p>
                  </div>

                  <div className="feature-col">
                    <span className="col-heading">Energy-Optimized Triggering</span>
                    <p className="col-text">
                      Instead of continuous-power video streaming, cameras utilize optical beam triggers on edge accelerators, reducing inspection power consumption by <strong>74% per 10,000 packages</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PILLAR 4 */}
            <div className="cs-pillar-deep-card animated-card reveal-up">
              <div className="pillar-deep-header">
                <span className="pillar-badge-num">PILLAR 04</span>
                <h3>Touchless LLM Warranty Claim Automation</h3>
              </div>
              <div className="pillar-deep-body">
                <p>
                  Customer and distributor claims are handled via an agentic LLM claim processing pipeline.
                </p>

                <div className="four-steps-grid">
                  <div className="step-card">
                    <span className="step-order">Step 1</span>
                    <h4>Intake & Extraction</h4>
                    <p>Hospital staff scan the on-box QR code and upload photos of damaged outer boxes or compromised sterile seals.</p>
                  </div>

                  <div className="step-card">
                    <span className="step-order">Step 2</span>
                    <h4>Multimodal Adjudication</h4>
                    <p>The LLM parses receipts, performs OCR on batch numbers, and analyzes images for seal integrity compromise or transit damage.</p>
                  </div>

                  <div className="step-card">
                    <span className="step-order">Step 3</span>
                    <h4>Policy Validation & Fraud Scoring</h4>
                    <p>The system cross-references claims against active regional terms and flags duplicate serial numbers or abnormal claim rates.</p>
                  </div>

                  <div className="step-card highlight-step-card">
                    <span className="step-order">Step 4</span>
                    <h4>Straight-Through Processing</h4>
                    <p>85% of standard claims are auto-approved in under 2 minutes, issuing credit notes or replacement orders automatically.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — KEY PERFORMANCE INDICATORS */}
      <section className="cs-section cs-kpi-section" id="kpi-matrix">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">MEASURED BENCHMARKS</span>
            <h2 className="section-title">Key Performance Indicators & Impact Matrix</h2>
            <div className="section-rule" />
          </div>

          <div className="cs-table-card animated-card">
            {/* DESKTOP TABLE */}
            <div className="table-responsive-wrapper">
              <table className="cs-kpi-table" aria-label="Key Performance Indicators Comparison">
                <thead>
                  <tr>
                    <th scope="col" className="th-metric">Operational Metric</th>
                    <th scope="col" className="th-before">Before AI Platform</th>
                    <th scope="col" className="th-after">After AI Platform</th>
                    <th scope="col" className="th-impact">Quantified Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiTableData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? 'row-highlight' : ''}>
                      <td className="td-metric">
                        <strong>{row.metric}</strong>
                      </td>
                      <td className="td-before">
                        <span className="state-tag before-tag">{row.before}</span>
                      </td>
                      <td className="td-after">
                        <span className="state-tag after-tag">{row.after}</span>
                      </td>
                      <td className="td-impact">
                        <span className="impact-pill">{row.impact}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE COMPARISON CARDS */}
            <div className="mobile-kpi-cards">
              {kpiTableData.map((row, idx) => (
                <div key={idx} className={`mobile-kpi-item ${row.highlight ? 'mobile-highlight' : ''}`}>
                  <div className="mobile-kpi-header">
                    <h4>{row.metric}</h4>
                    <span className="impact-pill">{row.impact}</span>
                  </div>
                  <div className="mobile-kpi-split">
                    <div className="kpi-side before-side">
                      <span className="side-label">Before:</span>
                      <span className="side-val">{row.before}</span>
                    </div>
                    <div className="kpi-side after-side">
                      <span className="side-label">After:</span>
                      <span className="side-val">{row.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — STRATEGIC LESSONS */}
      <section className="cs-section cs-lessons-section" id="strategic-lessons">
        <div className="cs-container">
          <div className="cs-section-intro">
            <span className="section-badge">ENGINEERING TAKEAWAYS</span>
            <h2 className="section-title">Strategic Lessons & Industry Takeaways</h2>
            <div className="section-rule" />
          </div>

          <div className="cs-lessons-grid">
            {strategicLessons.map((lesson, idx) => (
              <div key={idx} className="cs-lesson-card animated-card reveal-up">
                <div className="lesson-top-row">
                  <span className="lesson-num">{lesson.num}</span>
                  <div className="lesson-impact-chip">
                    <CheckCircle2 size={13} />
                    <span>{lesson.impact}</span>
                  </div>
                </div>
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-body">{lesson.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL BUSINESS IMPACT & CTA SECTION */}
      <section className="cs-section cs-cta-section" id="cta-consultation">
        <div className="cs-container">
          <div className="cs-cta-panel animated-card">
            <div className="cs-cta-grid">
              <div className="cs-cta-info">
                <div className="cta-badge">
                  <Sparkles size={14} />
                  <span>PRODUCTION ENTERPRISE AI</span>
                </div>

                <h2 className="cs-cta-heading">
                  Transform Complex Operations with Enterprise AI
                </h2>

                <p className="cs-cta-subtext">
                  TRUSTGRID.AI combines Generative AI, Computer Vision, RAG, Edge AI, and intelligent automation to connect digital intelligence with real-world enterprise operations.
                </p>

                <div className="cs-cta-button-group">
                  <Link
                    href="/book-ai-diagnostic#diagnostic-form-section"
                    className="button button-primary button-lg"
                    id="btn-book-ai-diagnostic"
                  >
                    <span>Book an AI Diagnostic</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/solutions/ai-agentic-factory"
                    className="button button-secondary button-lg"
                    id="btn-explore-solutions"
                  >
                    <span>Explore TRUSTGRID.AI Solutions</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <div className="cta-assurance-list">
                  <div className="assurance-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>48-Hour Technical & Architecture Assessment</span>
                  </div>
                  <div className="assurance-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Mutual Non-Disclosure Agreement (NDA) Protected</span>
                  </div>
                  <div className="assurance-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Conducted by Principal Systems & AI Architects</span>
                  </div>
                </div>
              </div>

              <div className="cs-cta-form-container">
                <div className="form-card-wrapper">
                  <div className="form-card-header">
                    <h3>Schedule an AI Architecture Diagnostic</h3>
                    <p>Discuss your manufacturing, vision, or RAG compliance requirements with our principal AI engineers.</p>
                  </div>
                  <TrustGridForm
                    variant="diagnostic"
                    formId="form_case_study_medical_ai"
                    formName="Medical Supplies Case Study Diagnostic Form"
                    ctaSource="medical_supplies_case_study"
                    defaultIndustry="Healthcare & Life Sciences"
                    defaultSolution="ai-agentic-factory"
                    compact={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
