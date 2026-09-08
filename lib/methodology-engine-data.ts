export interface StageData {
  number: string
  name: string
  subtitle: string
  whatIsUnique: string
  agentFleetName: string
  agents: { name: string; description: string }[]
  tables?: {
    title: string
    headers: string[]
    rows: string[][]
  }[]
  operatingAgents?: {
    name: string
    description: string
    features: string[]
    tagline: string
  }[]
  compoundingEffect?: string
  serviceOfferings?: {
    name: string
    duration: string
    description: string
  }[]
  outputTitle: string
  outputItems: string[]
  duration: string
  traditionalDuration: string
  uniqueSummary?: string
}

export interface IndustryApplication {
  id: string
  number: string
  name: string
  context: string
  priorityMethodologies: {
    number: string
    methodology: string
    application: string
    aiValue: string
  }[]
  agenticOpportunities: string[]
  timeline: {
    stage: string
    duration: string
  }[]
  totalToFirstValue: string
  complexity: string
}

export interface EngagementModelData {
  number: string
  title: string
  duration: string
  scope: string
  deliverables: string[]
  idealFor: string
}

export const coreConviction = {
  title: "The Core Conviction",
  lead: "Every management consulting firm in the world knows the 80 methodologies listed in our framework. Every systems integrator can spell 'Lean' and 'Six Sigma.' Every Big Four firm has a 'Digital Transformation' practice with polished slide decks and credentialed partners.",
  highlight: "None of them use AI and Agentic AI to implement, automate, continuously operate, and compound the value of these methodologies. That is what TrustGrid does. And no one else does it.",
  breakdown: [
    "The traditional approach to operational excellence transformation is a consulting engagement: consultants arrive, diagnose problems using manual workshops and spreadsheets, recommend methodology applications, deliver a report, maybe run a pilot, and leave.",
    "The historical result: 70% of operational excellence initiatives fail to sustain beyond 18 months. The methodology knowledge walks out the door with the consultants. The process improvements decay. The metrics stop being tracked. The organization reverts to old habits.",
    "TrustGrid's approach is fundamentally, structurally, and irreversibly different. We do not just recommend methodologies. We deploy AI systems and Agentic AI fleets that implement, execute, monitor, optimize, and continuously improve these methodologies — permanently, autonomously, and at a scale that human teams alone cannot achieve.",
    "The Kaizen event does not end when the workshop closes. The DMAIC project does not conclude when the report is delivered. The Balanced Scorecard does not decay between quarterly reviews. Because AI agents are continuously running them — detecting opportunities, analyzing data, simulating improvements, implementing changes, measuring results, and learning from outcomes."
  ],
  tagline: "Operational Excellence as a continuously operating AI system, not a one-time consulting engagement."
}

export const engineStages: StageData[] = [
  {
    number: "01",
    name: "DIAGNOSE",
    subtitle: "AI-Powered Enterprise Diagnostics",
    whatIsUnique: "Traditional diagnostics rely on workshops, interviews, surveys, and manual data analysis — limited by human cognitive capacity, time constraints, and bias. TrustGrid deploys Diagnostic AI Agents that autonomously discover, analyze, and assess the operational reality of the enterprise at a depth and speed that human consultants cannot match.",
    agentFleetName: "Diagnostic Swarm",
    agents: [
      {
        name: "Process Discovery Agents",
        description: "Automatically discover and map enterprise processes by analyzing system logs, ERP transactions, workflow data, application telemetry, and document flows. No manual process mapping workshops. The agents see what actually happens, not what people think happens."
      },
      {
        name: "Data Quality Agents",
        description: "Assess the completeness, accuracy, consistency, timeliness, and accessibility of enterprise data — the foundation upon which every AI capability depends. Data quality assessment across thousands of data elements, automatically."
      },
      {
        name: "Infrastructure Assessment Agents",
        description: "Analyze AI infrastructure utilization, performance, cost structure, and architectural fitness. GPU utilization profiling, inference cost analysis, network performance assessment, and capacity modeling — automated."
      },
      {
        name: "Maturity Assessment Agents",
        description: "Deploy the TrustGrid AI Maturity Model across the enterprise — scoring six dimensions (Strategy & Governance, Infrastructure & Platform, Data & Models, Agents & Automation, Trust & Security, Value & Outcomes) using automated data collection and AI-structured interviews."
      },
      {
        name: "Cultural Readiness Agents",
        description: "Assess organizational readiness for AI transformation — change capacity, leadership alignment, skill levels, resistance patterns, and adoption likelihood — using sentiment analysis, survey analytics, and organizational network analysis."
      },
      {
        name: "Value Opportunity Agents",
        description: "Scan the enterprise for high-value AI and methodology application opportunities — analyzing process costs, cycle times, error rates, customer impact, and revenue attribution to identify highest ROI potential."
      },
      {
        name: "Constraint Identification Agents",
        description: "Apply Theory of Constraints analysis to identify binding constraints on enterprise performance and AI value realization — technical, organizational, financial, and cultural."
      }
    ],
    outputTitle: "The AI-Generated Diagnostic Intelligence Report",
    outputItems: [
      "Complete process inventory with waste and opportunity mapping",
      "Full data quality assessment with remediation priorities",
      "Infrastructure economics with optimization opportunities",
      "Maturity scoring across all six dimensions with benchmarking",
      "Cultural readiness assessment with change strategy recommendations",
      "Prioritized value opportunity portfolio with projected ROI",
      "Constraint analysis with exploitation and elevation strategies",
      "Methodology Activation Roadmap: Which of the 80 methodologies to deploy, in what sequence, for maximum impact"
    ],
    duration: "4–8 weeks",
    traditionalDuration: "12–20 weeks (with lower analytical depth)",
    uniqueSummary: "No consulting firm in the world deploys autonomous AI agents to conduct enterprise diagnostics. The depth of analysis, the speed of delivery, the elimination of human bias, and continuous updating are categorically different."
  },
  {
    number: "02",
    name: "ARCHITECT",
    subtitle: "AI-Designed Transformation Architecture",
    whatIsUnique: "After diagnostics, TrustGrid's Architecture AI Agents design the complete transformation — selecting methodologies, designing implementations, modeling outcomes, and optimizing the transformation sequence using AI-powered scenario analysis.",
    agentFleetName: "Architecture Design Agents",
    agents: [
      {
        name: "Methodology Selection Agents",
        description: "Using the Diagnostic Intelligence Report, these agents map enterprise constraints, maturity, and goals to the optimal subset of the 80 methodologies tailored precisely to reality."
      },
      {
        name: "Implementation Design Agents",
        description: "Design specific implementation approaches for each selected methodology — adapting classical steps for AI-augmented execution, defining agent configs, data requirements, and integration points."
      },
      {
        name: "Sequencing Optimization Agents",
        description: "Apply dependency analysis, resource constraint modeling, value sequencing, and risk assessment to determine the optimal sequence and phasing of methodology activation for compounding value."
      },
      {
        name: "Agent Fleet Design Agents",
        description: "Design the specific Agentic AI fleet blueprint for each methodology to be automated — agent types, roles, communication protocols, toolsets, governance rules, and integration architecture."
      },
      {
        name: "Financial Modeling Agents",
        description: "Generate detailed TCO, ROI, NPV, and payback period models for the transformation program with sensitivity analysis, scenario modeling, and risk-adjusted projections."
      },
      {
        name: "Risk Modeling Agents",
        description: "Identify, assess, and model risks across technical, organizational, adoption, timing, and dependency dimensions with concrete mitigation strategies for each."
      }
    ],
    outputTitle: "The AI-Designed Transformation Blueprint",
    outputItems: [
      "Complete methodology activation plan with sequencing",
      "Detailed implementation designs for each methodology",
      "Agent fleet architecture for Agentic Automation layer",
      "Financial models and value projections",
      "Risk assessment and mitigation strategies",
      "Governance framework for the transformation program",
      "Resource requirements and organizational change plan"
    ],
    duration: "4–8 weeks",
    traditionalDuration: "8–16 weeks (with less analytical rigor)"
  },
  {
    number: "03",
    name: "IMPLEMENT",
    subtitle: "AI-Accelerated Methodology Deployment",
    whatIsUnique: "Traditional methodology implementation is slow, manual, and dependent on scarce expert practitioners. TrustGrid uses Implementation AI Agents to accelerate methodology deployment by 4–10x — automating analytical, data processing, and documentation work while human experts focus on judgment and stakeholder engagement.",
    agentFleetName: "Implementation Acceleration Agents",
    agents: [
      {
        name: "DMAIC Acceleration Team",
        description: "Compresses 18–36 weeks of manual Lean Six Sigma project cycles into 5–9 weeks with continuous telemetry ingestion, automated causal discovery, and live SPC control loops."
      },
      {
        name: "Value Stream Mapping Team",
        description: "Transforms 8–16 weeks of Gemba walks and manual sticky-note mapping into 3–4 weeks with automated log extraction, digital TIMWOODS waste scoring, and optimized future-state simulations."
      },
      {
        name: "FMEA & Risk Engineering Team",
        description: "Replaces annual audit checklists with continuous failure mode discovery and dynamic RPN recalculation across all live processes."
      }
    ],
    tables: [
      {
        title: "AI-Augmented DMAIC Implementation Comparison",
        headers: ["DMAIC Phase", "Traditional Approach", "TrustGrid AI-Augmented Approach"],
        rows: [
          ["Define", "2–4 weeks of workshops, stakeholder interviews, manual SIPOC creation", "AI agents auto-generate SIPOC from system data, analyze stakeholder inputs via NLP, create problem statements from data — 1 week"],
          ["Measure", "4–8 weeks of data collection, measurement system analysis, manual validation", "AI agents automatically extract, validate, and structure measurement data from enterprise systems, run continuous MSA — 1–2 weeks"],
          ["Analyze", "4–8 weeks of statistical analysis, hypothesis testing, root cause investigation", "AI agents process millions of data points, run causal inference models, generate Ishikawa diagrams from data, identify root causes — 1–2 weeks"],
          ["Improve", "4–8 weeks of solution design, DOE, pilot implementation", "AI agents simulate improvement scenarios, optimize solutions against multiple objectives, predict outcomes — 1–2 weeks"],
          ["Control", "4–8 weeks of control plan design, SPC implementation, training", "AI agents deploy continuous SPC monitoring, automated control actions, and real-time dashboards — 1–2 weeks"],
          ["Total", "18–36 weeks", "5–9 weeks (4x acceleration)"]
        ]
      },
      {
        title: "AI-Augmented Value Stream Mapping (VSM) Comparison",
        headers: ["VSM Step", "Traditional Approach", "TrustGrid AI-Augmented Approach"],
        rows: [
          ["Select product family", "1–2 weeks of analysis", "AI agents analyze product volume, revenue, and complexity data — 2 days"],
          ["Draw current state map", "2–4 weeks of Gemba walks, interviews, observation", "AI agents auto-map from system logs, ERP data, and workflow telemetry — 1 week"],
          ["Identify waste", "1–2 weeks of team analysis", "AI agents apply TIMWOODS analysis to mapped data — 3 days"],
          ["Draw future state map", "2–4 weeks of team design", "AI agents simulate future state options and optimize — 1 week"],
          ["Implementation plan", "2–4 weeks", "AI agents generate sequenced implementation plan with resource modeling — 3 days"],
          ["Total", "8–16 weeks", "3–4 weeks (3-4x acceleration)"]
        ]
      }
    ],
    outputTitle: "Deployed, Operational Methodologies",
    outputItems: [
      "Methodologies implemented with AI acceleration",
      "Agent fleets deployed and operational for each methodology",
      "Human practitioners trained and effective",
      "Measurement systems active and integrated",
      "Initial measurable business results tracked live"
    ],
    duration: "8–20 weeks (depending on scope)",
    traditionalDuration: "24–52 weeks"
  },
  {
    number: "04",
    name: "AUTOMATE",
    subtitle: "Agentic AI Continuous Operation",
    whatIsUnique: "This is the stage that no other organization in the world delivers. TrustGrid deploys Operational AI Agent Fleets that continuously execute activated methodologies — not as one-time projects, but as permanently operating intelligent systems. Traditional OpEx = temporary projects. TrustGrid OpEx = 24/7 operating systems.",
    agentFleetName: "Methodology Operating Agent Fleets",
    agents: [],
    operatingAgents: [
      {
        name: "Continuous Kaizen Agents",
        tagline: "24/7 Kaizen. Not annual Kaizen events.",
        description: "Continuously scan operational data across all systems to identify, quantify, prioritize, propose, and verify improvement initiatives.",
        features: [
          "Continuously scan operational data across enterprise systems",
          "Identify improvement opportunities via pattern recognition & anomaly detection",
          "Quantify economic value and prioritize via impact/effort scoring",
          "Generate data-backed proposals and verify actual delivered value"
        ]
      },
      {
        name: "Continuous DMAIC Agents",
        tagline: "DMAIC cycles that run continuously, not as quarterly projects.",
        description: "Monitor process performance against specifications in real time, auto-detect drift with SPC, and immediately run root cause investigations.",
        features: [
          "Continuous SPC monitoring against target specifications",
          "Auto-initiate root cause analysis immediately upon drift detection",
          "Recommend solutions based on historical patterns and update control baselines"
        ]
      },
      {
        name: "Continuous FMEA Agents",
        tagline: "FMEA that is always current, not updated annually before audits.",
        description: "Scan operational logs and incident streams in real time, recalculate Risk Priority Numbers (RPN), and trigger preventive actions.",
        features: [
          "Continuous failure mode discovery across incidents and telemetry",
          "Real-time severity, occurrence, and detection rating recalculation",
          "Automated threshold alerting and corrective action tracking"
        ]
      },
      {
        name: "Continuous Value Stream Monitoring Agents",
        tagline: "Value Stream Maps that are alive, not drawings on a wall.",
        description: "Real-time value stream mapping from live ERP/WMS feeds to detect waste accumulation (waiting, defects, overproduction) instantly.",
        features: [
          "Live value stream mapping from real-time ERP/WMS logs",
          "Instant detection of bottlenecks, wait times, and defect accumulation",
          "Continuous throughput cost calculation and waste elimination recommendations"
        ]
      },
      {
        name: "Continuous Balanced Scorecard Agents",
        tagline: "A Balanced Scorecard that thinks, not a quarterly reporting exercise.",
        description: "Continuously update all four BSC perspectives with predictive leading-to-lagging indicator correlation and early alerts.",
        features: [
          "Live metric feeds across financial, customer, process, and learning pillars",
          "Predictive modeling for lagging KPI trajectory from leading signals",
          "Automated strategy adjustment recommendations"
        ]
      },
      {
        name: "Continuous Hoshin Kanri Agents",
        tagline: "Policy deployment that is continuous, not annual.",
        description: "Monitor progress on annual strategic objectives continuously, detect alignment gaps, and cascade strategy adjustments automatically.",
        features: [
          "Continuous alignment gap detection between strategic goals and execution",
          "Catchball adjustment recommendations and automated strategy cascading"
        ]
      },
      {
        name: "Continuous OKR Agents",
        tagline: "OKRs actively managed by AI, not manually updated before meetings.",
        description: "Track key result progress, predict achievement probability with trajectory modeling, and surface cross-team dependencies.",
        features: [
          "Predictive trajectory scoring on all organizational Key Results",
          "Automated cross-team dependency and friction detection"
        ]
      },
      {
        name: "Continuous Benchmarking Agents",
        tagline: "Benchmarking that is continuous intelligence, not annual reports.",
        description: "Compare enterprise performance against industry peers in real time, identifying performance gaps and competitive responses.",
        features: [
          "Real-time competitive positioning and industry benchmarking",
          "Automated opportunity scanning and competitive response proposals"
        ]
      }
    ],
    compoundingEffect: "Each agent fleet improves over time. Continuous Kaizen Agents learn which opportunities yield highest ROI. Continuous DMAIC Agents build a cumulative institutional root-cause library. Continuous FMEA Agents refine failure mode prediction accuracy. Capability does not decay — it compounds autonomously.",
    outputTitle: "Permanently Operating Methodology Agent Fleets",
    outputItems: [
      "AI agent fleets continuously executing all activated methodologies",
      "Real-time dashboards and alerting for all operational domains",
      "Continuous improvement cycle running autonomously 24/7",
      "Compounding institutional knowledge base growing with every cycle",
      "Human teams augmented — focusing purely on executive judgment and strategic decisions"
    ],
    duration: "Ongoing (Deployment: 8–16 wks per cluster; Operation: Permanent)",
    traditionalDuration: "No traditional consulting equivalent exists (New Category)"
  },
  {
    number: "05",
    name: "ADOPT",
    subtitle: "AI-Guided Human Enablement & Cultural Transformation",
    whatIsUnique: "Technology deployment without human adoption is waste. TrustGrid uses Adoption AI Agents to personalize, accelerate, and sustain human adoption of AI-driven operational excellence — ensuring every employee builds the skills, mindset, and habits to work alongside AI agents.",
    agentFleetName: "Adoption & Enablement Agents",
    agents: [
      {
        name: "AI Literacy Agents",
        description: "Personalized AI literacy paths adapted to individual role, skill level, learning style, and pace — from executive awareness to practitioner tool proficiency."
      },
      {
        name: "Methodology Coaching Agents",
        description: "Always-available pocket coaches answering questions on DMAIC, explaining FMEA math, guiding A3 problem-solving, and providing just-in-time methodology support."
      },
      {
        name: "Kata Coaching Agents",
        description: "Guide employees through Improvement Kata & Coaching Kata daily (Direction → Current Condition → Next Target → Daily Experiment) to build scientific thinking habits at scale."
      },
      {
        name: "Change Readiness Monitoring Agents",
        description: "Continuously assess organizational sentiment, adoption metrics, resistance patterns, and skill gap trends to trigger targeted change management interventions."
      },
      {
        name: "Adoption Measurement Agents",
        description: "Track adoption metrics for every methodology and AI agent system — usage rates, proficiency, quality of application, and business outcome correlation."
      },
      {
        name: "Knowledge Management Agents",
        description: "Capture, organize, and disseminate methodology knowledge, case studies, and lessons learned into an enterprise institutional brain."
      }
    ],
    serviceOfferings: [
      {
        name: "AI-Guided Kata Implementation",
        duration: "8–16 weeks",
        description: "Full deployment of AI-augmented Kata coaching — developing scientific thinking and continuous improvement habits across the enterprise."
      },
      {
        name: "AI Literacy Acceleration Program",
        duration: "8–16 weeks",
        description: "Enterprise-wide AI literacy program with personalized, role-specific, AI-guided learning paths from executive level to operational frontline."
      },
      {
        name: "Change Management AI Platform",
        duration: "8–12 weeks",
        description: "Deployment of AI-powered change management — continuous readiness monitoring, adoption tracking, and resistance mitigation."
      },
      {
        name: "Methodology Certification AI Enhancement",
        duration: "12–20 weeks",
        description: "Enhanced Six Sigma, Lean, and operational excellence certification programs with AI-augmented training and continuous simulation."
      }
    ],
    outputTitle: "Institutionalized Human-AI Operational Culture",
    outputItems: [
      "Role-tailored AI proficiency across executive, managerial, and frontline staff",
      "Daily Kata scientific problem-solving practiced organization-wide",
      "Live adoption dashboards correlating tool usage with business outcomes",
      "Dynamic enterprise knowledge repository preserving organizational learning"
    ],
    duration: "8–16 weeks per program (Monitoring is continuous)",
    traditionalDuration: "Sporadic one-off training workshops that decay within 90 days"
  },
  {
    number: "06",
    name: "ACCELERATE",
    subtitle: "Continuous Value Compounding & Expansion",
    whatIsUnique: "The final stage is not a conclusion — it is an exponential launchpad. TrustGrid's Agentic AI engine continuously identifies adjacent opportunities to expand methodology scope, deepen automation, and compound value. Each improvement cycle fuels the next.",
    agentFleetName: "Acceleration & Expansion Agents",
    agents: [
      {
        name: "Value Tracking Agents",
        description: "Continuously measure and attribute business value from all implementations — connecting every operational improvement directly to audited financial outcomes in real time."
      },
      {
        name: "Opportunity Expansion Agents",
        description: "Identify adjacent processes, new use cases, and new methodology activations that deliver the next wave of value as earlier deployments mature."
      },
      {
        name: "Methodology Deepening Agents",
        description: "Elevate deployed methodologies from basic to advanced execution (e.g., standard DMAIC to autonomous multi-objective optimization)."
      },
      {
        name: "Agent Fleet Optimization Agents",
        description: "Monitor and optimize the performance of all deployed agent fleets — enhancing accuracy, reducing latency, and pruning compute costs."
      },
      {
        name: "Portfolio Optimization Agents",
        description: "Apply quantitative portfolio theory to the enterprise transformation portfolio — rebalancing resources and reprioritizing initiatives based on ROI."
      },
      {
        name: "Value Realization Office (VRO) AI Platform",
        description: "Permanent AI-powered executive platform for enterprise-wide value governance, continuous board reporting, and proactive acceleration."
      }
    ],
    outputTitle: "The Compounding Value Engine",
    outputItems: [
      "Real-time financial attribution connecting every AI agent action to balance sheet impact",
      "Organic transformation expansion into high-yield adjacent business units",
      "Self-improving agent fleet architecture with declining operational unit costs",
      "Permanent AI-driven Value Realization Office (VRO) governance"
    ],
    duration: "Ongoing (Continuous compounding measured quarterly)",
    traditionalDuration: "Diminishing returns after consultant departure"
  }
]

export const consultingComparisonMatrix = [
  { dimension: "Diagnostic Speed", traditional: "12–20 weeks, manual", trustgrid: "4–8 weeks, AI-agent-powered" },
  { dimension: "Diagnostic Depth", traditional: "Limited by human capacity & sampling", trustgrid: "Unlimited — AI processes 100% of telemetry" },
  { dimension: "Methodology Implementation", traditional: "Manual, consultant-dependent", trustgrid: "AI-accelerated, 4–10x faster deployment" },
  { dimension: "Sustainability", traditional: "70% decay after consultants leave", trustgrid: "Compounds permanently via autonomous AI agents" },
  { dimension: "Continuous Improvement", traditional: "Periodic workshops (quarterly/annual)", trustgrid: "Continuous (24/7/365 AI agent operation)" },
  { dimension: "Scale & Capacity", traditional: "Constrained by human billable hours", trustgrid: "Infinite — agent fleets scale horizontally" },
  { dimension: "Cost Trajectory", traditional: "High, recurring, hourly consulting fees", trustgrid: "Front-loaded investment, declining unit cost" },
  { dimension: "Knowledge Retention", traditional: "Leaves with the consulting firm", trustgrid: "Compounds permanently in institutional memory" },
  { dimension: "Measurement & Attribution", traditional: "Manual, periodic, easily disputed", trustgrid: "Automated, continuous, ledger-auditable" },
  { dimension: "Adoption & Culture", traditional: "Passive slide deck presentations", trustgrid: "AI-guided, personalized, continuously tracked" },
  { dimension: "Value Trajectory", traditional: "Diminishing returns over time", trustgrid: "Exponentially compounding returns" },
  { dimension: "Organizational Learning", traditional: "Slow, siloed, individual", trustgrid: "Rapid, systemic, collective intelligence" }
]

export const industryApplications: IndustryApplication[] = [
  {
    id: "banking",
    number: "01",
    name: "Banking & Financial Services",
    context: "Banking operates under extreme regulatory pressure, thin margins, legacy mainframe complexity, and rapid fintech competition. Operational excellence is the difference between profitable growth and margin erosion. AI adoption is accelerating, but governance, trust, and compliance are hard constraints.",
    priorityMethodologies: [
      { number: "1", methodology: "DMAIC (#31)", application: "Credit process defect reduction, loan processing error elimination", aiValue: "AI agents continuously monitor credit decision quality, auto-detect drift, and initiate root cause analysis" },
      { number: "2", methodology: "FMEA (#36)", application: "Regulatory compliance risk, operational risk, model risk management", aiValue: "Continuous AI-FMEA across all banking processes with real-time RPN monitoring and alerts" },
      { number: "3", methodology: "Value Stream Mapping (#24)", application: "End-to-end loan origination, account opening, claims processing", aiValue: "AI agents auto-map from core banking system logs into live, dynamic VSM telemetry" },
      { number: "4", methodology: "Lean Thinking (#2)", application: "Eliminate waste in branch operations, back-office processing", aiValue: "Digital waste detection agents scanning transaction data 24/7" },
      { number: "5", methodology: "Balanced Scorecard (#68)", application: "Enterprise performance management across financial, customer, process, learning", aiValue: "AI-powered BSC with real-time metric feeds and predictive analytics" },
      { number: "6", methodology: "TOC (#6)", application: "Identify bottlenecks in digital transformation and branch throughput", aiValue: "AI constraint identification across all operational core processes" },
      { number: "7", methodology: "BPM (#47)", application: "Process automation for KYC, AML, regulatory reporting", aiValue: "AI-enhanced BPM with continuous closed-loop optimization" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Model risk management, explainability for credit decisions, regulatory compliance", aiValue: "Continuous trust monitoring for all AI models in regulated banking processes" }
    ],
    agenticOpportunities: [
      "Autonomous compliance monitoring agents (AML, KYC, regulatory reporting)",
      "Credit decision quality monitoring agents (continuous SPC on model outputs)",
      "Customer experience optimization agents (NPS, CSAT, effort score tracking and intervention)",
      "Cost-to-serve optimization agents (per-product, per-channel, per-segment cost tracking)"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1 — 3 methodologies)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt (Literacy + Kata)", duration: "16 weeks" },
      { stage: "Stage 6: Accelerate (Continuous)", duration: "Ongoing (quarterly compounding)" }
    ],
    totalToFirstValue: "48–56 weeks",
    complexity: "High"
  },
  {
    id: "insurance",
    number: "02",
    name: "Insurance",
    context: "Insurance is characterized by complex actuarial risk models, lengthy claims lifecycles, and margin pressure. Underwriting accuracy, claims efficiency, and fraud detection are primary operational battlegrounds where governance and trust are paramount.",
    priorityMethodologies: [
      { number: "1", methodology: "DMAIC (#31)", application: "Claims processing defect reduction, underwriting accuracy improvement", aiValue: "Continuous quality monitoring of claims decisions and underwriting outcomes" },
      { number: "2", methodology: "FMEA (#36)", application: "Policy administration failure modes, claims leakage risk", aiValue: "AI-FMEA across all insurance operations with predictive failure detection" },
      { number: "3", methodology: "Six Sigma (#3)", application: "Variation reduction in claims settlement times, premium pricing", aiValue: "AI-powered SPC on settlement cycles and pricing consistency" },
      { number: "4", methodology: "TOC (#6)", application: "Claims processing throughput, underwriting queue management", aiValue: "Real-time constraint identification and underwriting queue exploitation" },
      { number: "5", methodology: "Lean (#2)", application: "Waste elimination in policy issuance, renewal, endorsements", aiValue: "Digital VSM and waste detection from policy admin system data" },
      { number: "6", methodology: "BPR (#46)", application: "End-to-end claims journey redesign with AI agents", aiValue: "AI-BPR redesigning claims for autonomous agent straight-through execution" },
      { number: "7", methodology: "Activity Based Costing (#58)", application: "True cost per policy, per claim, per customer interaction", aiValue: "AI-ABC from operational system data — real-time unit economics" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Explainable underwriting decisions, fair claims outcomes", aiValue: "Continuous trust monitoring for all insurance actuarial and claims models" }
    ],
    agenticOpportunities: [
      "Autonomous claims triage and settlement agents (straight-through processing)",
      "Fraud detection and investigation agent fleets",
      "Underwriting recommendation agents with complete explainability trails",
      "Customer retention and cross-sell optimization agents",
      "Regulatory reporting automation agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt", duration: "16 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "48–56 weeks",
    complexity: "High"
  },
  {
    id: "healthcare",
    number: "03",
    name: "Healthcare & Life Sciences",
    context: "Healthcare faces patient safety imperatives, clinical variability, regulatory rigor, workforce shortages, and cost pressures. Life sciences adds drug discovery, clinical trial validation, and GMP manufacturing. Every methodology application must be safety-critical, validated, and auditable.",
    priorityMethodologies: [
      { number: "1", methodology: "FMEA (#36)", application: "Clinical process failure modes, medical device risks, pharma manufacturing", aiValue: "Continuous AI-FMEA across clinical and manufacturing workflows — proactive safety" },
      { number: "2", methodology: "DMAIC (#31)", application: "Patient flow optimization, clinical pathway standardization, yield improvement", aiValue: "AI-powered clinical process improvement with real-time outcome tracking" },
      { number: "3", methodology: "TQM (#5)", application: "Organization-wide clinical quality culture and compliance", aiValue: "AI-augmented quality management systems with continuous monitoring" },
      { number: "4", methodology: "Lean (#2)", application: "Patient wait time reduction, OR utilization, medical supply chain waste", aiValue: "AI-VSM from EHR, scheduling, and hospital ERP data" },
      { number: "5", methodology: "SPC (#41)", application: "Manufacturing process control (GMP), clinical outcome monitoring", aiValue: "AI-powered SPC across biopharma batches and clinical care quality" },
      { number: "6", methodology: "Poka-Yoke (#18)", application: "Medication error prevention, clinical workflow mistake-proofing", aiValue: "AI-powered error detection and automated prevention in EHR/e-prescribing" },
      { number: "7", methodology: "PDCA (#30)", application: "Continuous clinical quality improvement cycles", aiValue: "AI-accelerated PDCA cycles with automated telemetry ingestion" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Explainable clinical decision support, equitable health outcomes", aiValue: "Full explainability, audit trails, and fairness verification for health AI" }
    ],
    agenticOpportunities: [
      "Clinical pathway monitoring and optimization agents",
      "Patient flow and operating room capacity management agents",
      "Clinical trial data quality and protocol monitoring agents",
      "Manufacturing quality monitoring agents (GMP compliance & batch release)",
      "Drug adverse event detection and pharmacovigilance reporting agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "8 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "20 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "16 weeks" },
      { stage: "Stage 5: Adopt", duration: "20 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "60–72 weeks",
    complexity: "Very High"
  },
  {
    id: "discrete-manufacturing",
    number: "04",
    name: "Manufacturing (Discrete)",
    context: "The birthplace of operational excellence (TPS, Lean, Six Sigma, TPM). The new challenge is integrating AI and autonomous agents into production floors optimized for decades using classical tools to unlock an additional 30–50% yield.",
    priorityMethodologies: [
      { number: "1", methodology: "TPS (#8)", application: "Full Toyota Production System implementation with AI augmentation", aiValue: "AI agents operating JIT, Jidoka, Heijunka, and continuous improvement 24/7" },
      { number: "2", methodology: "TPM (#44)", application: "Total Productive Maintenance with predictive AI", aiValue: "AI agents predicting equipment failures, optimizing maintenance, maximizing OEE" },
      { number: "3", methodology: "Six Sigma (#3)", application: "Quality optimization across all machining and assembly lines", aiValue: "AI-powered SPC, continuous FMEA, and automated root cause analysis" },
      { number: "4", methodology: "VSM (#24)", application: "End-to-end value stream optimization from raw materials to delivery", aiValue: "Live AI-VSM from IoT sensors, MES, ERP, and supply chain telemetry" },
      { number: "5", methodology: "5S + 6S (#13, #14)", application: "Workplace organization and safety with computer vision monitoring", aiValue: "AI agents monitoring shop floor standards and triggering proactive corrective actions" },
      { number: "6", methodology: "SMED (#25)", application: "Single-Minute Exchange of Die with AI sequence optimization", aiValue: "AI analyzing changeover telemetry and simulating optimized changeover paths" },
      { number: "7", methodology: "TOC (#6)", application: "Assembly line bottleneck identification and throughput maximization", aiValue: "Real-time constraint analysis from production telemetry — AI-optimized pacing" },
      { number: "8", methodology: "OEE (#45)", application: "Overall Equipment Effectiveness with AI-driven loss analysis", aiValue: "Continuous AI-OEE monitoring with automated Six Big Losses classification" }
    ],
    agenticOpportunities: [
      "Predictive maintenance agent fleets (detect → diagnose → schedule → validate)",
      "Production scheduling optimization agents",
      "Automated optical quality inspection and defect classification agents",
      "Supply chain part shortage disruption response agents",
      "Energy consumption and sustainability optimization agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt", duration: "16 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "48–56 weeks",
    complexity: "High"
  },
  {
    id: "process-manufacturing",
    number: "05",
    name: "Process Manufacturing (Chemicals, Pharma, F&B)",
    context: "Operates under the most stringent quality and regulatory frameworks (GMP, FDA validation, batch traceability). Variability is the enemy. Every physical process parameter must be deterministic and validated.",
    priorityMethodologies: [
      { number: "1", methodology: "SPC (#41)", application: "Critical process parameter monitoring and closed-loop control", aiValue: "AI-powered multivariate SPC across all critical reactor and recipe parameters" },
      { number: "2", methodology: "DMAIC (#31)", application: "Yield improvement, deviation reduction, batch cycle time optimization", aiValue: "AI-accelerated DMAIC with automated process historian data extraction" },
      { number: "3", methodology: "FMEA (#36)", application: "Process failure mode management for validated production lines", aiValue: "Continuous AI-FMEA with real-time chemical reaction risk assessment" },
      { number: "4", methodology: "Lean (#2)", application: "Batch cycle time reduction, clean-in-place optimization, WIP reduction", aiValue: "AI-VSM from DCS, MES, LIMS, and ERP data" },
      { number: "5", methodology: "TQM (#5)", application: "Organization-wide quality culture and regulatory readiness", aiValue: "AI-augmented quality management with continuous monitoring and compliance" },
      { number: "6", methodology: "Design of Experiments (DOE)", application: "Formulation optimization and process window robustness", aiValue: "AI-accelerated DOE exploring hyper-dimensional parameter spaces in silico" },
      { number: "7", methodology: "Life Cycle Costing (#65)", application: "Total cost of recipe/product lifecycle from pilot to commercialization", aiValue: "AI-powered lifecycle cost modeling from lab to high-volume manufacturing" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Validated AI systems, explainable quality decisions", aiValue: "Meets 21 CFR Part 11 and GAMP 5 validation requirements" }
    ],
    agenticOpportunities: [
      "Continuous chemical reactor monitoring and recipe optimization agents",
      "Deviation investigation and CAPA automation agents",
      "Batch record review and automated electronic release agents",
      "Environmental compliance and emissions monitoring agents",
      "Raw material quality spectroscopy assessment agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "8 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "20 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "16 weeks" },
      { stage: "Stage 5: Adopt", duration: "20 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "60–72 weeks",
    complexity: "Very High"
  },
  {
    id: "energy-utilities",
    number: "06",
    name: "Energy & Utilities",
    context: "Dual challenge: optimizing existing generation, transmission, and distribution assets while transforming for the renewable transition, grid modernization, and ESG mandates.",
    priorityMethodologies: [
      { number: "1", methodology: "TPM (#44)", application: "Asset reliability for generation, transmission, substations, distribution", aiValue: "AI-predictive maintenance across critical grid assets — preventing catastrophic outages" },
      { number: "2", methodology: "Lean (#2)", application: "Work order efficiency, field crew dispatch utilization, service restoration", aiValue: "AI-VSM from work management, GIS, and field mobility telemetry" },
      { number: "3", methodology: "FMEA (#36)", application: "Grid reliability, substation safety, wildfire/environmental risk", aiValue: "Continuous AI-FMEA across infrastructure with weather and sensor fusion" },
      { number: "4", methodology: "TOC (#6)", application: "Grid transmission capacity constraints, generation dispatch bottlenecks", aiValue: "Real-time constraint analysis and dynamic line rating optimization" },
      { number: "5", methodology: "Hoshin Kanri (#23)", application: "Strategic alignment of multi-billion capital energy transition investments", aiValue: "AI-powered policy deployment tracking decarbonization milestones" },
      { number: "6", methodology: "Balanced Scorecard (#68)", application: "Enterprise performance across SAIDI/SAIFI, financial, customer, ESG", aiValue: "AI-BSC with live grid SCADA and operational telemetry feeds" },
      { number: "7", methodology: "Life Cycle Costing (#65)", application: "Asset replacement planning and total lifecycle cost optimization", aiValue: "AI-powered lifecycle models for 30-50 year grid assets" },
      { number: "8", methodology: "TQM (#5)", application: "Safety culture, field crew protocol adherence, environmental stewardship", aiValue: "AI-augmented safety and quality assurance systems" }
    ],
    agenticOpportunities: [
      "Predictive asset maintenance agent fleets (generation, T&D, wind/solar)",
      "Grid load optimization and renewable demand forecasting agents",
      "Storm outage management and restoration sequence optimization agents",
      "Regulatory compliance and rate-case filing automation agents",
      "Carbon footprint monitoring and ESG compliance agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "8 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "20 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "16 weeks" },
      { stage: "Stage 5: Adopt", duration: "20 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "60–72 weeks",
    complexity: "Very High"
  },
  {
    id: "telecom",
    number: "07",
    name: "Telecommunications",
    context: "Operating massive infrastructure spanning millions of endpoints with intense margin pressure and rapid cloud/5G/edge services rollout. Network uptime and customer experience are critical.",
    priorityMethodologies: [
      { number: "1", methodology: "Lean (#2)", application: "Network operations efficiency, fiber rollout speed, field force dispatch", aiValue: "AI-VSM from network management, OSS/BSS, and field ticketing systems" },
      { number: "2", methodology: "Six Sigma (#3)", application: "Service quality variation reduction, call drop rate, packet jitter", aiValue: "AI-powered continuous SPC on all radio access and core network metrics" },
      { number: "3", methodology: "TOC (#6)", application: "Backhaul capacity constraints, service activation bottlenecks", aiValue: "Real-time bandwidth constraint identification across topology" },
      { number: "4", methodology: "BPM (#47)", application: "Service order provisioning, trouble ticket resolution, onboarding", aiValue: "AI-enhanced BPM with continuous closed-loop ticket triage and resolution" },
      { number: "5", methodology: "BPR (#46)", application: "OSS/BSS process redesign for autonomous AI-native operations", aiValue: "AI-BPR architecting zero-touch customer provisioning" },
      { number: "6", methodology: "OKR (#69)", application: "5G coverage targets, churn reduction, customer effort score", aiValue: "AI-powered OKR tracking with predictive achievement trajectory modeling" },
      { number: "7", methodology: "Agile (#7)", application: "Network function virtualization (NFV), cloud-native service delivery", aiValue: "AI-augmented Agile for continuous network software rollout" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Explainable traffic routing, fair bandwidth shaping, privacy compliance", aiValue: "Auditable trust monitoring for autonomous network orchestration" }
    ],
    agenticOpportunities: [
      "Network fault detection, diagnosis, and auto-healing remediation agents",
      "Customer experience monitoring and proactive churn intervention agents",
      "Automated service provisioning and SIM/eSIM activation agents",
      "Dynamic cell tower capacity planning and energy reduction agents",
      "Revenue assurance and billing leakage audit agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt", duration: "16 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "48–56 weeks",
    complexity: "High"
  },
  {
    id: "retail",
    number: "08",
    name: "Retail & Consumer Goods",
    context: "Thin margins, omnichannel complexity, volatile consumer tastes, and intensive logistics. Demand forecasting, real-time pricing, and seamless fulfillment dictate winners.",
    priorityMethodologies: [
      { number: "1", methodology: "Lean (#2)", application: "Store operations, fulfillment center efficiency, omnichannel waste elimination", aiValue: "AI-VSM across store, warehouse, and last-mile delivery operations" },
      { number: "2", methodology: "JIT (#15)", application: "Inventory optimization, demand-driven shelf replenishment", aiValue: "AI-powered JIT sensing POS, weather, foot traffic, and social trends" },
      { number: "3", methodology: "Kanban (#16)", application: "Visual replenishment, fulfillment pick-pack flow management", aiValue: "AI-enhanced dynamic Kanban for store backrooms and micro-fulfillment centers" },
      { number: "4", methodology: "DMAIC (#31)", application: "Customer checkout experience, order pick accuracy, returns reduction", aiValue: "Continuous quality monitoring with AI-powered return root cause analysis" },
      { number: "5", methodology: "Value Engineering (#42)", application: "Private label product cost engineering, packaging optimization", aiValue: "AI-powered function-cost analysis maximizing private brand margins" },
      { number: "6", methodology: "Blue Ocean Strategy (#66)", application: "White space category discovery and niche brand creation", aiValue: "AI scanning consumer search trends and market gaps" },
      { number: "7", methodology: "JTBD (#80)", application: "Jobs-to-be-Done consumer behavioral analysis for new merchandising", aiValue: "AI consumer sentiment and purchase basket decomposition" },
      { number: "8", methodology: "Target Costing (#60)", application: "Product design to price-point margin targets", aiValue: "AI-powered target costing from sourcing to shelf" }
    ],
    agenticOpportunities: [
      "Omnichannel demand forecasting and store inventory rebalancing agents",
      "Dynamic pricing and margin optimization agents",
      "Customer experience sentiment monitoring and instant recovery agents",
      "Supply chain stockout disruption detection and substitute routing agents",
      "Store labor scheduling and front-of-house replenishment agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt", duration: "12 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "44–52 weeks",
    complexity: "Medium-High"
  },
  {
    id: "supply-chain",
    number: "09",
    name: "Supply Chain & Logistics",
    context: "The circulatory system of global business. Geopolitical shocks, climate disruptions, and freight volatility demand predictive, resilient, self-healing supply networks.",
    priorityMethodologies: [
      { number: "1", methodology: "Lean (#2)", application: "Warehouse slotting, dock cross-docking, empty-mile elimination", aiValue: "AI-VSM across all logistics nodes with real-time waste and dwell-time scoring" },
      { number: "2", methodology: "TOC (#6)", application: "Global port congestion, distribution center bottleneck elimination", aiValue: "Real-time global constraint analysis across container modes and routes" },
      { number: "3", methodology: "JIT (#15)", application: "Demand-driven supply network synchronization", aiValue: "AI-powered JIT with tier-1/tier-2 supplier risk monitoring" },
      { number: "4", methodology: "TOC + DBR", application: "Drum-Buffer-Rope transportation scheduling & throughput pacing", aiValue: "AI-orchestrated DBR across intermodal transport legs" },
      { number: "5", methodology: "FMEA (#36)", application: "Supplier solvency risk, geopolitical choke points, single-source failure", aiValue: "Continuous AI-FMEA across suppliers, shipping lanes, and tariff changes" },
      { number: "6", methodology: "Six Sigma (#3)", application: "On-Time-In-Full (OTIF) delivery quality, cargo damage minimization", aiValue: "AI-powered SPC on carrier SLA compliance and transit temperature" },
      { number: "7", methodology: "Value Stream Costing (#64)", application: "True cost-to-serve by lane, mode, customer, and SKU", aiValue: "AI-powered value stream costing from TMS, WMS, and telematics data" },
      { number: "8", methodology: "Hoshin Kanri (#23)", application: "Supply network resilience strategy deployment", aiValue: "AI-powered cascading of dual-sourcing and nearshoring objectives" }
    ],
    agenticOpportunities: [
      "Supply chain disruption prediction and autonomous multi-modal re-routing agents",
      "Warehouse automated picking route and slotting optimization agents",
      "Fleet dynamic dispatch and fuel minimization agents",
      "Demand-supply allocation and stock prioritization agents",
      "Supplier scorecards and automated tier-n risk assessment agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "8 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "16 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "12 weeks" },
      { stage: "Stage 5: Adopt", duration: "16 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "48–56 weeks",
    complexity: "High"
  },
  {
    id: "government",
    number: "10",
    name: "Government & Public Sector",
    context: "Public expectations rising faster than budgets. Legacy systems, strict procurement, data sovereignty, and the imperative for absolute fairness and taxpayer value transparency.",
    priorityMethodologies: [
      { number: "1", methodology: "Lean (#2)", application: "Citizen benefits processing, license renewal, permit approval flow", aiValue: "AI-VSM across public service pipelines to eliminate citizen backlog" },
      { number: "2", methodology: "BPR (#46)", application: "Digital government transformation, legacy paper process modernization", aiValue: "AI-BPR architecting automated citizen service self-service workflows" },
      { number: "3", methodology: "TQM (#5)", application: "Agency-wide service delivery quality and consistency", aiValue: "AI-augmented quality management systems across inter-agency operations" },
      { number: "4", methodology: "Balanced Scorecard (#68)", application: "Public mission outcomes, taxpayer efficiency, trust metrics", aiValue: "AI-powered BSC linking budget allocations to verified citizen outcomes" },
      { number: "5", methodology: "BPM (#47)", application: "Standardization across federal, state, and local agencies", aiValue: "AI-enhanced BPM for cross-jurisdictional compliance and case management" },
      { number: "6", methodology: "DMAIC (#31)", application: "Permit approval cycle reduction, tax filing defect reduction", aiValue: "AI-powered continuous improvement reducing public wait times" },
      { number: "7", methodology: "Activity Based Costing (#58)", application: "Defensible cost-per-service attribution for legislative audit", aiValue: "AI-ABC transparently measuring cost-per-case across departments" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Equitable public decisions, zero bias, complete transparency", aiValue: "Mandatory compliance with federal AI ethics, EO mandates, and FOIA audits" }
    ],
    agenticOpportunities: [
      "Citizen case processing and eligibility verification agents",
      "Public procurement optimization and vendor compliance agents",
      "Regulatory policy impact modeling and automated comment review agents",
      "Emergency response dispatch and inter-agency coordination agents",
      "Transparency audit and open-records reporting automation agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "12 weeks" },
      { stage: "Stage 2: Architect", duration: "8 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "20 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "16 weeks" },
      { stage: "Stage 5: Adopt", duration: "20 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "64–80 weeks",
    complexity: "Very High"
  },
  {
    id: "tech-software",
    number: "11",
    name: "Technology & Software",
    context: "SaaS, enterprise software, and cloud providers operate in rapid continuous deployment environments. Focus is on engineering velocity, system reliability, developer experience, and product-led growth.",
    priorityMethodologies: [
      { number: "1", methodology: "Agile / Scrum (#48)", application: "Engineering velocity, sprint capacity, release quality", aiValue: "AI-augmented sprint management predicting velocity bottlenecks and blockers" },
      { number: "2", methodology: "DevOps / CI/CD (#50)", application: "Deployment frequency, lead time for changes, MTTR, change failure rate", aiValue: "AI-powered DevOps with autonomous test generation and canary rollouts" },
      { number: "3", methodology: "Kanban (Software) (#49)", application: "Pull-system engineering flow, WIP limits, cycle time optimization", aiValue: "AI-enhanced Kanban dynamically throttling PR queues and code review flow" },
      { number: "4", methodology: "Lean Startup (#52)", application: "Rapid hypothesis validation, feature telemetry, market fit", aiValue: "AI-powered Build-Measure-Learn analyzing live user session telemetry" },
      { number: "5", methodology: "SRE / TPM (#44)", application: "Platform uptime, SLO/SLA management, automated incident triage", aiValue: "AI-augmented SRE predicting cascading microservice outages" },
      { number: "6", methodology: "DMAIC (#31)", application: "Customer onboarding churn reduction, support ticket resolution", aiValue: "AI-powered quality improvements for customer success workflows" },
      { number: "7", methodology: "OKR (#69)", application: "Product roadmap alignment, cross-functional sprint goals", aiValue: "AI-powered OKR dashboard linking git commits to strategic objectives" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Model safety, LLM red-teaming, data privacy, IP governance", aiValue: "Continuous trust telemetry and guardrails for commercial AI applications" }
    ],
    agenticOpportunities: [
      "Autonomous software defect detection, patch synthesis, and test runner agents",
      "Predictive cloud infrastructure auto-scaling and FinOps optimization agents",
      "Customer support triage, auto-response, and escalation agents",
      "Technical debt identification and automated refactoring agents",
      "Continuous vulnerability scanning and automated remediation agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "4 weeks" },
      { stage: "Stage 2: Architect", duration: "4 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "12 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "8 weeks" },
      { stage: "Stage 5: Adopt", duration: "12 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "32–40 weeks",
    complexity: "Medium"
  },
  {
    id: "aerospace-defense",
    number: "12",
    name: "Aerospace & Defense",
    context: "Extreme safety, zero-defect tolerance, multi-decade program lifecycles, and classified security. Every component must be traceable, validated to AS9100/DO-178C, and auditable.",
    priorityMethodologies: [
      { number: "1", methodology: "FMEA (#36)", application: "Mission-critical design failure modes, flight hardware risks, maintenance", aiValue: "AI-FMEA across systems engineering models — continuous risk management" },
      { number: "2", methodology: "Six Sigma (#3)", application: "Precision machining for flight-critical propulsion and avionics", aiValue: "AI-powered sub-micron SPC on flight-rated manufacturing lines" },
      { number: "3", methodology: "TPM (#44)", application: "Test stand availability, high-value CNC and cleanroom equipment", aiValue: "AI-predictive maintenance for aerospace manufacturing and test rigs" },
      { number: "4", methodology: "Lean (#2)", application: "Major defense program cost management, lead time compression", aiValue: "AI-VSM across multi-tier defense prime and subcontractor workflows" },
      { number: "5", methodology: "TOC (#6)", application: "Program milestone critical-chain constraints, assembly bottlenecks", aiValue: "Real-time constraint analysis across complex defense assembly schedules" },
      { number: "6", methodology: "Configuration Management", application: "Engineering change orders, avionics software version control", aiValue: "AI-enhanced configuration audit tracking millions of flight components" },
      { number: "7", methodology: "Value Engineering (#42)", application: "Design-to-cost and should-cost modeling for defense programs", aiValue: "AI-powered function-cost analysis for major weapons system components" },
      { number: "8", methodology: "TRUSTED AI Engineering", application: "Safety-critical autonomous systems, formal verification, airworthiness", aiValue: "Meets stringent DO-178C / DO-254 and MIL-STD airworthiness certification" }
    ],
    agenticOpportunities: [
      "Predictive flight telemetry anomaly detection and preventive maintenance agents",
      "Classified/ITAR compliant supply chain risk tracking agents",
      "Defense program master schedule critical path optimization agents",
      "Engineering change proposal impact synthesis agents",
      "Airworthiness certification compliance documentation automation agents"
    ],
    timeline: [
      { stage: "Stage 1: Diagnose", duration: "12 weeks" },
      { stage: "Stage 2: Architect", duration: "8 weeks" },
      { stage: "Stage 3: Implement (Phase 1)", duration: "24 weeks" },
      { stage: "Stage 4: Automate (Phase 1 agent fleets)", duration: "20 weeks" },
      { stage: "Stage 5: Adopt", duration: "24 weeks" },
      { stage: "Stage 6: Accelerate", duration: "Ongoing" }
    ],
    totalToFirstValue: "76–88 weeks",
    complexity: "Extreme"
  }
]

export const consolidatedTimelineMatrix = [
  { industry: "Banking & Financial Services", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "16 wks", totalToFirstValue: "48–56 wks", complexity: "High" },
  { industry: "Insurance", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "16 wks", totalToFirstValue: "48–56 wks", complexity: "High" },
  { industry: "Healthcare & Life Sciences", diagnose: "8 wks", architect: "8 wks", implement: "20 wks", automate: "16 wks", adopt: "20 wks", totalToFirstValue: "60–72 wks", complexity: "Very High" },
  { industry: "Manufacturing (Discrete)", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "16 wks", totalToFirstValue: "48–56 wks", complexity: "High" },
  { industry: "Process Manufacturing", diagnose: "8 wks", architect: "8 wks", implement: "20 wks", automate: "16 wks", adopt: "20 wks", totalToFirstValue: "60–72 wks", complexity: "Very High" },
  { industry: "Energy & Utilities", diagnose: "8 wks", architect: "8 wks", implement: "20 wks", automate: "16 wks", adopt: "20 wks", totalToFirstValue: "60–72 wks", complexity: "Very High" },
  { industry: "Telecommunications", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "16 wks", totalToFirstValue: "48–56 wks", complexity: "High" },
  { industry: "Retail & Consumer Goods", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "12 wks", totalToFirstValue: "44–52 wks", complexity: "Medium-High" },
  { industry: "Supply Chain & Logistics", diagnose: "8 wks", architect: "4 wks", implement: "16 wks", automate: "12 wks", adopt: "16 wks", totalToFirstValue: "48–56 wks", complexity: "High" },
  { industry: "Government & Public Sector", diagnose: "12 wks", architect: "8 wks", implement: "20 wks", automate: "16 wks", adopt: "20 wks", totalToFirstValue: "64–80 wks", complexity: "Very High" },
  { industry: "Technology & Software", diagnose: "4 wks", architect: "4 wks", implement: "12 wks", automate: "8 wks", adopt: "12 wks", totalToFirstValue: "32–40 wks", complexity: "Medium" },
  { industry: "Aerospace & Defense", diagnose: "12 wks", architect: "8 wks", implement: "24 wks", automate: "20 wks", adopt: "24 wks", totalToFirstValue: "76–88 wks", complexity: "Extreme" }
]

export const engagementModels: EngagementModelData[] = [
  {
    number: "01",
    title: "AI-Driven Diagnostic",
    duration: "4–8 weeks",
    scope: "Full Stage 1 (Diagnose) — AI agent fleet deployment for enterprise-wide diagnostics, maturity assessment, constraint analysis, value opportunity identification, and methodology activation roadmap generation.",
    deliverables: [
      "AI-Generated Diagnostic Intelligence Report",
      "AI Maturity Assessment across six dimensions",
      "Constraint Analysis with exploitation strategies",
      "Prioritized Value Opportunity Portfolio",
      "Methodology Activation Roadmap",
      "Preliminary Financial Models",
      "Organizational Readiness Assessment"
    ],
    idealFor: "Any enterprise beginning its AI-driven operational excellence journey; enterprises that have attempted traditional transformation and failed; organizations seeking a data-driven, unbiased assessment."
  },
  {
    number: "02",
    title: "AI-Driven Rapid Value Sprint",
    duration: "12–16 weeks",
    scope: "Stages 1–3 for a focused scope — diagnose, architect, and implement 2–3 highest-priority methodologies with AI acceleration, including initial agent fleet deployment.",
    deliverables: [
      "Diagnostic Intelligence Report (focused scope)",
      "Transformation Architecture for 2–3 methodologies",
      "AI-Accelerated Methodology Implementation",
      "Initial Agent Fleet Deployment",
      "First Measurable Value Results",
      "Adoption Program Launch"
    ],
    idealFor: "Enterprises that want to demonstrate measurable ROI quickly before scaling; executive teams seeking proof-of-concept; specific business units with urgent improvement needs."
  },
  {
    number: "03",
    title: "Full AI-Driven Enterprise Transformation",
    duration: "48–88 weeks to first compounding value, then ongoing",
    scope: "All six stages — full Diagnose, Architect, Implement, Automate, Adopt, and Accelerate — across the entire enterprise with the complete TrustGrid AI-Driven Methodology Engine.",
    deliverables: [
      "Everything in Diagnostic and Rapid Value Sprint",
      "Full methodology activation across all priority operational domains",
      "Complete Agentic AI agent fleet deployment",
      "Enterprise-wide cultural adoption program & Kata coaching",
      "Value Realization Office (VRO) establishment",
      "Continuous compounding value operation 24/7"
    ],
    idealFor: "Enterprises committed to becoming AI-native operational excellence organizations; industries facing existential competitive pressure; leaders building sustained competitive advantage."
  },
  {
    number: "04",
    title: "Value Realization Office (VRO) as a Service",
    duration: "16 weeks setup, then ongoing",
    scope: "Design, build, and operate the permanent organizational function for AI value governance — continuous tracking, reporting, portfolio optimization, and proactive value acceleration.",
    deliverables: [
      "VRO organizational design and staffing plan",
      "AI-powered VRO platform deployment",
      "Value tracking frameworks and live dashboards",
      "Executive reporting and board governance processes",
      "Continuous portfolio optimization",
      "Ongoing value acceleration recommendations"
    ],
    idealFor: "Enterprises with significant AI investments requiring permanent value governance; organizations where AI spend is growing faster than value; boards demanding visibility into returns."
  },
  {
    number: "05",
    title: "Managed Methodology Operations",
    duration: "Ongoing",
    scope: "TrustGrid operates the complete AI-Driven Methodology Engine on behalf of the enterprise — agent fleet management, methodology execution, continuous improvement, and value tracking.",
    deliverables: [
      "Continuous operation of all methodology agent fleets 24/7",
      "Monthly value realization reporting",
      "Quarterly methodology expansion recommendations",
      "Continuous agent fleet optimization & retraining",
      "Ongoing training and capability development",
      "Annual strategic review and roadmap refresh"
    ],
    idealFor: "Enterprises that want the benefits of AI-driven operational excellence without building and maintaining large internal specialized teams; organizations focusing on core business."
  },
  {
    number: "06",
    title: "Industry-Specific Transformation Package",
    duration: "44–88 weeks",
    scope: "Complete end-to-end transformation tailored to a specific industry — pre-configured with industry-specific methodology selections, relevant agent fleets, benchmarking data, and compliant governance frameworks.",
    deliverables: [
      "Pre-configured industry methodology blueprint",
      "Industry-specific agent fleets (e.g. GMP batch review, AML monitoring, flight SPC)",
      "Sector benchmarking and regulatory compliance mapping",
      "Full 6-stage execution with accelerated time-to-value"
    ],
    idealFor: "Organizations in regulated or specialized sectors (Banking, Healthcare, Pharma, Discrete Mfg, Utilities, Aerospace) seeking battle-tested, domain-tailored AI operational excellence."
  }
]

export const trustgridPromise = {
  headline: "Compounding Value, Continuous Improvement, Permanent Capability",
  subheadline: "We do not deliver projects. We deploy operating systems.",
  lead: "The traditional model of operational excellence — hire consultants, run a project, deliver results, move on — is fundamentally broken. The results decay. The capability dissipates. The value was never as large as projected because it depended on sustained human effort that never materialized.",
  coreAssertion: "TrustGrid's AI-Driven Methodology Engine is a permanent, self-improving, continuously operating system for enterprise operational excellence. AI agents do not get tired. They do not leave for other jobs. They do not forget what they learned. They do not stop monitoring because it is Friday afternoon. They operate 24/7/365, and they get better every day.",
  timelineMilestones: [
    {
      year: "Year 1",
      title: "Foundation",
      desc: "The agent fleets are deployed. The methodologies are activated. The first measurable value is delivered across initial operational domains."
    },
    {
      year: "Year 2",
      title: "Acceleration",
      desc: "The agent fleets have learned. They find more opportunities. They operate more efficiently. The organization has adopted. The culture has shifted. Value accelerates."
    },
    {
      year: "Year 3",
      title: "Compounding",
      desc: "The agent fleets are deeply integrated. They are self-improving. New methodologies are activated based on agent recommendations. Operational excellence is a core competitive moat."
    },
    {
      year: "Year N",
      title: "Dominance",
      desc: "The enterprise operates at a level of efficiency, quality, agility, and intelligence that competitors cannot match — running a self-improving AI engine that has compounded for years."
    }
  ],
  footerNote: "© TrustGrid.AI — The AI-Driven Methodology Engine. From Diagnostics to Compounding Value. Permanently."
}
