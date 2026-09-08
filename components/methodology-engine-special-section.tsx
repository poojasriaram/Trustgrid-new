'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Bot,
  Zap,
  RefreshCw,
  Building2,
  Activity,
  Workflow,
  Target,
  BarChart3,
  HelpCircle,
  Compass,
  FileText,
  Boxes,
  Briefcase
} from 'lucide-react'
import {
  coreConviction,
  engineStages,
  consultingComparisonMatrix,
  industryApplications,
  consolidatedTimelineMatrix,
  engagementModels,
  trustgridPromise,
} from '@/lib/methodology-engine-data'

export function MethodologyEngineSpecialSection() {
  const [activeStage, setActiveStage] = useState(0)
  const [activeIndustryId, setActiveIndustryId] = useState('banking')
  const [activeTab, setActiveTab] = useState<'stages' | 'industries' | 'comparison' | 'models'>('stages')

  const currentIndustry = industryApplications.find((ind) => ind.id === activeIndustryId) || industryApplications[0]

  return (
    <div className="methodology-engine-container">
      {/* SECTION HEADER */}
      <div className="engine-hero-badge-wrap">
        <span className="section-badge">SPECIAL SECTION • PROPRIETARY OPERATING IP</span>
        <span className="hero-badge-tag">FROM DIAGNOSTICS TO COMPOUNDING VALUE</span>
      </div>

      <div className="engine-main-title">
        <h2>
          The AI-Driven Methodology Engine: <span>From Diagnostics to Compounding Value</span>
        </h2>
        <p className="engine-subtitle">
          TrustGrid's Proprietary Approach to Implementing, Automating, and Sustaining Operational Excellence Through Agentic AI.
        </p>
      </div>

      {/* THE CORE CONVICTION BANNER */}
      <div className="core-conviction-card">
        <div className="conviction-header">
          <div className="conviction-badge">
            <Sparkles size={16} />
            <span>THE TRUSTGRID DIFFERENTIATOR: WHY THIS IS UNIQUE IN THE MARKET</span>
          </div>
          <h3>{coreConviction.title}</h3>
        </div>

        <p className="conviction-lead">{coreConviction.lead}</p>

        <div className="conviction-highlight-box">
          <p>{coreConviction.highlight}</p>
        </div>

        <div className="conviction-breakdown-grid">
          {coreConviction.breakdown.map((text, idx) => (
            <div key={idx} className="conviction-point">
              <div className="conviction-num">{idx + 1}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="conviction-tagline-bar">
          <CheckCircle2 size={18} className="text-blue-400" />
          <span>{coreConviction.tagline}</span>
        </div>
      </div>

      {/* INTERACTIVE ARCHITECTURE ENGINE DIAGRAM */}
      <div className="engine-diagram-box">
        <div className="diagram-top-label">
          <Workflow size={16} />
          <span>TRUSTGRID AI-DRIVEN METHODOLOGY IMPLEMENTATION ENGINE</span>
        </div>

        <div className="diagram-flow-grid">
          {engineStages.map((stg, i) => (
            <button
              key={stg.number}
              className={`flow-card ${activeStage === i ? 'flow-card-active' : ''}`}
              onClick={() => {
                setActiveStage(i)
                setActiveTab('stages')
              }}
            >
              <div className="flow-card-header">
                <span className="flow-num">{stg.number}</span>
                <span className="flow-name">{stg.name}</span>
              </div>
              <p className="flow-sub">({stg.subtitle.split('—')[0]})</p>
              <div className="flow-fleet-tag">{stg.agentFleetName}</div>
              {i < engineStages.length - 1 && <span className="flow-arrow">→</span>}
            </button>
          ))}
        </div>

        {/* COMPOUNDING VALUE LOOP BADGE */}
        <div className="diagram-loop-banner">
          <RefreshCw size={20} className="animate-spin-slow" />
          <div>
            <strong>COMPOUNDING VALUE LOOP</strong>
            <p>Agentic AI Continuously Operates, Measures, Learns, Self-Improves & Expands 24/7/365</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="engine-nav-tabs">
        <button
          className={`engine-tab-btn ${activeTab === 'stages' ? 'active' : ''}`}
          onClick={() => setActiveTab('stages')}
        >
          <Layers size={16} />
          <span>The 6 Implementation Stages</span>
        </button>
        <button
          className={`engine-tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <BarChart3 size={16} />
          <span>Consulting vs. TrustGrid Matrix</span>
        </button>
        <button
          className={`engine-tab-btn ${activeTab === 'industries' ? 'active' : ''}`}
          onClick={() => setActiveTab('industries')}
        >
          <Building2 size={16} />
          <span>12 Industry Applications</span>
        </button>
        <button
          className={`engine-tab-btn ${activeTab === 'models' ? 'active' : ''}`}
          onClick={() => setActiveTab('models')}
        >
          <Briefcase size={16} />
          <span>6 Engagement Models</span>
        </button>
      </div>

      {/* TAB 1: THE 6 STAGES */}
      {activeTab === 'stages' && (
        <div className="engine-stage-detail-wrapper">
          {/* Stage Selector Pills */}
          <div className="stage-pills-bar">
            {engineStages.map((stage, idx) => (
              <button
                key={stage.number}
                className={`stage-pill ${activeStage === idx ? 'stage-pill-active' : ''}`}
                onClick={() => setActiveStage(idx)}
              >
                <span className="pill-num">{stage.number}</span>
                <span className="pill-name">{stage.name}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Content Card */}
          <div className="stage-content-card">
            <div className="stage-card-header">
              <div>
                <span className="stage-sub-badge">STAGE {engineStages[activeStage].number}</span>
                <h3>{engineStages[activeStage].name} — <em>{engineStages[activeStage].subtitle}</em></h3>
              </div>
              <div className="stage-duration-tag">
                <Clock size={16} />
                <span><strong>Duration:</strong> {engineStages[activeStage].duration}</span>
                <span className="stage-trad-time">Traditional: {engineStages[activeStage].traditionalDuration}</span>
              </div>
            </div>

            <div className="stage-unique-callout">
              <strong>What Is Unique:</strong>
              <p>{engineStages[activeStage].whatIsUnique}</p>
            </div>

            {/* Agent Fleet Details */}
            <div className="stage-fleet-section">
              <div className="fleet-header">
                <Bot size={18} />
                <h4>AI Agent Fleet: {engineStages[activeStage].agentFleetName}</h4>
              </div>

              {engineStages[activeStage].agents.length > 0 && (
                <div className="agent-cards-grid">
                  {engineStages[activeStage].agents.map((ag, aIdx) => (
                    <div key={aIdx} className="agent-spec-card">
                      <h5>{ag.name}</h5>
                      <p>{ag.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Stage 4 Operating Agents Detail */}
              {engineStages[activeStage].operatingAgents && (
                <div className="operating-agents-grid">
                  {engineStages[activeStage].operatingAgents!.map((opAgent, opIdx) => (
                    <div key={opIdx} className="op-agent-card">
                      <div className="op-agent-top">
                        <h5>{opAgent.name}</h5>
                        <span className="op-tagline">{opAgent.tagline}</span>
                      </div>
                      <p className="op-desc">{opAgent.description}</p>
                      <ul className="op-features">
                        {opAgent.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <CheckCircle2 size={14} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Compounding Effect Banner if present */}
              {engineStages[activeStage].compoundingEffect && (
                <div className="compounding-effect-box">
                  <div className="comp-title">
                    <TrendingUp size={18} />
                    <strong>The Compounding Effect</strong>
                  </div>
                  <p>{engineStages[activeStage].compoundingEffect}</p>
                </div>
              )}
            </div>

            {/* Tables (e.g. DMAIC / VSM comparison in Stage 3) */}
            {engineStages[activeStage].tables && engineStages[activeStage].tables!.map((tbl, tIdx) => (
              <div key={tIdx} className="stage-comparison-table-wrap">
                <h4>{tbl.title}</h4>
                <div className="table-responsive">
                  <table className="engine-table">
                    <thead>
                      <tr>
                        {tbl.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tbl.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="font-semibold text-slate-900">{row[0]}</td>
                          <td className="text-slate-600">{row[1]}</td>
                          <td className="trustgrid-cell font-medium">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Service Offerings (Stage 5) */}
            {engineStages[activeStage].serviceOfferings && (
              <div className="service-offerings-wrap">
                <h4>Stage 5 Service Offerings</h4>
                <div className="offerings-grid">
                  {engineStages[activeStage].serviceOfferings!.map((offering, oIdx) => (
                    <div key={oIdx} className="offering-card">
                      <div className="offering-top">
                        <h5>{offering.name}</h5>
                        <span className="offering-dur">{offering.duration}</span>
                      </div>
                      <p>{offering.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 6 Compounding Formula */}
            {engineStages[activeStage].number === '06' && (
              <div className="compounding-formula-card">
                <div className="formula-header">
                  <BarChart3 size={18} />
                  <h4>The Compounding Value Equation</h4>
                </div>
                <div className="formula-code-box">
                  <pre>
{`Year 1 Value = Initial Methodology Deployment Value
              + Automation Efficiency Gains
              + Waste Elimination Savings

Year 2 Value = Year 1 Value (maintained by AI agents)
              + New Methodology Applications
              + Deepened Automation
              + Agent Fleet Self-Improvement
              + Organizational Capability Growth

Year 3 Value = Year 2 Value (maintained and grown)
              + Further Expansion
              + Compounding Efficiency Gains
              + Network Effects Across Value Streams
              + Emergent Capabilities from AI Learning

Year N Value = Year (N-1) Value × Compounding Factor`}
                  </pre>
                </div>
                <p className="formula-caption">
                  The compounding factor is what makes TrustGrid categorically different. Traditional operational excellence delivers diminishing returns over time. AI-driven operational excellence delivers accelerating returns as AI agents learn, expand, and compound.
                </p>
              </div>
            )}

            {/* Stage Deliverables Output Box */}
            <div className="stage-outputs-box">
              <div className="outputs-header">
                <FileText size={16} />
                <h4>Output: {engineStages[activeStage].outputTitle}</h4>
              </div>
              <ul className="outputs-list">
                {engineStages[activeStage].outputItems.map((item, itIdx) => (
                  <li key={itIdx}>
                    <CheckCircle2 size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONSULTING VS TRUSTGRID COMPARISON MATRIX */}
      {activeTab === 'comparison' && (
        <div className="engine-comparison-wrapper">
          <div className="comp-matrix-intro">
            <h3>Traditional Consulting vs. TrustGrid AI-Driven Approach</h3>
            <p>Why AI-driven methodology delivery represents a permanent, self-improving new category.</p>
          </div>
          <div className="table-responsive">
            <table className="engine-table matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Dimension</th>
                  <th style={{ width: '38%' }}>Traditional Consulting</th>
                  <th style={{ width: '40%' }}>TrustGrid AI-Driven Engine</th>
                </tr>
              </thead>
              <tbody>
                {consultingComparisonMatrix.map((item, idx) => (
                  <tr key={idx}>
                    <td className="dimension-title">{item.dimension}</td>
                    <td className="traditional-cell">{item.traditional}</td>
                    <td className="trustgrid-matrix-cell">
                      <CheckCircle2 size={15} />
                      <span>{item.trustgrid}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: 12 INDUSTRY APPLICATIONS */}
      {activeTab === 'industries' && (
        <div className="engine-industries-wrapper">
          <div className="industries-intro">
            <h3>12 Industry Applications: AI-Driven Methodology in Every Sector</h3>
            <p>Select an industry to explore tailored priority methodologies, agentic automation opportunities, and timelines.</p>
          </div>

          {/* Industry Pills Selector */}
          <div className="industry-selector-grid">
            {industryApplications.map((ind) => (
              <button
                key={ind.id}
                className={`industry-select-btn ${activeIndustryId === ind.id ? 'active' : ''}`}
                onClick={() => setActiveIndustryId(ind.id)}
              >
                <span className="ind-num">{ind.number}</span>
                <span className="ind-name">{ind.name}</span>
              </button>
            ))}
          </div>

          {/* Active Industry Detail Card */}
          <div className="active-industry-card">
            <div className="ind-card-header">
              <div>
                <span className="stage-sub-badge">INDUSTRY {currentIndustry.number}</span>
                <h3>{currentIndustry.name}</h3>
              </div>
              <div className="ind-meta-tags">
                <span className="ind-time-tag">Time to First Value: <strong>{currentIndustry.totalToFirstValue}</strong></span>
                <span className="ind-comp-tag">Complexity: <strong>{currentIndustry.complexity}</strong></span>
              </div>
            </div>

            <div className="ind-context-box">
              <strong>Industry Context:</strong>
              <p>{currentIndustry.context}</p>
            </div>

            {/* Priority Methodologies Table */}
            <div className="ind-methodologies-table-wrap">
              <h4>Priority Methodologies for AI-Driven Activation</h4>
              <div className="table-responsive">
                <table className="engine-table">
                  <thead>
                    <tr>
                      <th style={{ width: '6%' }}>#</th>
                      <th style={{ width: '22%' }}>Methodology</th>
                      <th style={{ width: '36%' }}>Application in {currentIndustry.name}</th>
                      <th style={{ width: '36%' }}>AI-Driven Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentIndustry.priorityMethodologies.map((pm, pIdx) => (
                      <tr key={pIdx}>
                        <td className="text-center font-bold text-slate-500">{pm.number}</td>
                        <td className="font-semibold text-blue-700">{pm.methodology}</td>
                        <td className="text-slate-700">{pm.application}</td>
                        <td className="trustgrid-cell">{pm.aiValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agentic Automation Opportunities & Timeline Grid */}
            <div className="ind-bottom-split">
              <div className="ind-agent-opps">
                <h4>Agentic Automation Opportunities</h4>
                <ul>
                  {currentIndustry.agenticOpportunities.map((opp, opIdx) => (
                    <li key={opIdx}>
                      <Bot size={15} />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ind-timeline-box">
                <h4>Typical Engagement Timeline</h4>
                <div className="timeline-stages-list">
                  {currentIndustry.timeline.map((tItem, tIdx) => (
                    <div key={tIdx} className="ind-timeline-row">
                      <span className="t-stage">{tItem.stage}</span>
                      <span className="t-dur">{tItem.duration}</span>
                    </div>
                  ))}
                  <div className="ind-timeline-total">
                    <span>Total to First Compounding Value:</span>
                    <strong>{currentIndustry.totalToFirstValue}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consolidated 12-Industry Matrix */}
          <div className="consolidated-matrix-card">
            <h4>Consolidated Industry Engagement Timeline Matrix</h4>
            <div className="table-responsive">
              <table className="engine-table matrix-table">
                <thead>
                  <tr>
                    <th>Industry</th>
                    <th>Diagnose</th>
                    <th>Architect</th>
                    <th>Implement</th>
                    <th>Automate</th>
                    <th>Adopt</th>
                    <th>Total to First Value</th>
                    <th>Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  {consolidatedTimelineMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold text-slate-900">{row.industry}</td>
                      <td>{row.diagnose}</td>
                      <td>{row.architect}</td>
                      <td>{row.implement}</td>
                      <td>{row.automate}</td>
                      <td>{row.adopt}</td>
                      <td className="trustgrid-cell font-bold">{row.totalToFirstValue}</td>
                      <td><span className={`comp-badge comp-${row.complexity.toLowerCase().replace(' ', '-')}`}>{row.complexity}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="consolidated-note">
              <strong>Note:</strong> Timelines represent the path to First Compounding Value — the milestone at which AI agent fleets are live and the self-improving loop is active. Stage 6 (Accelerate) continues permanently.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: 6 ENGAGEMENT MODELS */}
      {activeTab === 'models' && (
        <div className="engine-models-wrapper">
          <div className="models-intro">
            <h3>Engagement Models for AI-Driven Methodology Implementation</h3>
            <p>From rapid diagnostic assessments to complete enterprise operating systems.</p>
          </div>

          <div className="models-grid">
            {engagementModels.map((model) => (
              <div key={model.number} className="eng-model-card">
                <div className="model-top">
                  <span className="model-num">{model.number}</span>
                  <span className="model-dur">{model.duration}</span>
                </div>
                <h4>{model.title}</h4>
                <p className="model-scope"><strong>Scope:</strong> {model.scope}</p>

                <div className="model-deliverables">
                  <strong>Key Deliverables:</strong>
                  <ul>
                    {model.deliverables.map((del, dIdx) => (
                      <li key={dIdx}>
                        <CheckCircle2 size={14} />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="model-ideal-for">
                  <strong>Ideal For:</strong>
                  <p>{model.idealFor}</p>
                </div>

                <div className="model-action">
                  <Link href={`/book-ai-diagnostic?engagement=${model.number}`} className="button button-ghost button-sm">
                    Select This Model <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* THE TRUSTGRID PROMISE & MULTI-YEAR COMPOUNDING MILESTONES */}
      <div className="trustgrid-promise-section">
        <div className="promise-header">
          <span className="section-badge">THE TRUSTGRID PROMISE</span>
          <h3>{trustgridPromise.headline}</h3>
          <p className="promise-lead-bold">{trustgridPromise.subheadline}</p>
        </div>

        <p className="promise-text">{trustgridPromise.lead}</p>
        <div className="promise-assertion-box">
          <p>{trustgridPromise.coreAssertion}</p>
        </div>

        {/* Multi-Year Progression */}
        <div className="milestones-progression-grid">
          {trustgridPromise.timelineMilestones.map((m, mIdx) => (
            <div key={mIdx} className="milestone-card">
              <div className="milestone-year">{m.year}</div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="promise-footer-note">
          <p>{trustgridPromise.footerNote}</p>
          <Link href="/book-ai-diagnostic" className="button button-primary">
            Begin with an AI Diagnostic Assessment <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
