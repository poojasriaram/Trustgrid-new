export interface CrossPracticeArea {
  code: string
  title: string
  slug: string
  overview: string
  solutionAcceleration: string
  kpisBanked: string
  timeToValue: string
  valueAssurance: string
  buyer: string
  relatedIndustries: string[]
}

export interface CrossIndustryPractice {
  id: string
  code: string
  title: string
  shortTitle: string
  buyer: string
  budget: string
  attachVerticals: string[]
  medianTtv: string
  originator: boolean
  description: string
  practiceAreas: CrossPracticeArea[]
}

export interface IndustryPracticeArea {
  code: string
  title: string
  slug: string
  overview: string
  solutionAcceleration: string
  kpisBanked: string
  timeToValue: string
  valueAssurance: string
  targetStakeholder: string
  relatedCrossPractices: string[]
}

export interface SubVertical {
  code: string
  title: string
  practiceAreas: IndustryPracticeArea[]
}

export interface IndustryVertical {
  id: string
  code: string
  title: string
  shortTitle: string
  poolSize: string
  buyer: string
  bankedAgainst: string
  tier: 1 | 2 | 3
  medianTtv: string
  description: string
  subVerticals: SubVertical[]
}

/* ==========================================================================
   DIVISION 2 — CROSS-INDUSTRY PRACTICES (15 Horizontal Practices · 45 PAs)
   ========================================================================== */
export const crossIndustryPractices: CrossIndustryPractice[] = [
  {
    id: 'grc',
    code: '5.1',
    title: 'Governance, Risk & Compliance (GRC)',
    shortTitle: 'GRC',
    buyer: 'CRO / General Counsel / Chief Compliance Officer',
    budget: 'Compliance, Legal, Internal Audit',
    attachVerticals: ['6.2', '6.4', '6.8'],
    medianTtv: '11 wk',
    originator: true,
    description: 'Automated policy-as-code controls, continuous regulatory horizon scanning, and immutable audit ledgers.',
    practiceAreas: [
      {
        code: '5.1.1',
        title: 'Policy Automation Agents',
        slug: 'policy-automation-agents',
        overview: 'Automates manual control interpretation into executable policy-as-code rules across AI systems.',
        solutionAcceleration: 'Policy-as-code control library with three-way crosswalk (AI Act, NIST AI RMF, ISO 42001), automated control tests; compliance owns text.',
        kpisBanked: 'Obligations mapped, control test pass rate, exceptions ageing.',
        timeToValue: '8–14 wk',
        valueAssurance: 'ISO 37301, ISO 27001, AI Act Art 9–15 where high-risk.',
        buyer: 'Chief Compliance Officer',
        relatedIndustries: ['Financial Services', 'Healthcare & Life Sciences', 'Public Sector']
      },
      {
        code: '5.1.2',
        title: 'Regulatory Change Monitoring',
        slug: 'regulatory-change-monitoring',
        overview: 'Tracks dynamic regulatory updates globally and maps new statutory duties to internal controls.',
        solutionAcceleration: 'Horizon-scanning pipeline per regulator, obligation-to-control graph, remediation tracker; legal owns determinations.',
        kpisBanked: 'Time from publication to assessment, obligations unmapped, overdue actions.',
        timeToValue: '6–12 wk',
        valueAssurance: 'Versioned obligation register, legal review record, traceability to source text.',
        buyer: 'General Counsel',
        relatedIndustries: ['Financial Services', 'Energy & Utilities', 'Healthcare & Life Sciences']
      },
      {
        code: '5.1.3',
        title: 'Immutable Audit Fabric',
        slug: 'immutable-audit-fabric',
        overview: 'Provides mathematically verifiable, tamper-evident audit evidence for automated decision agents.',
        solutionAcceleration: 'Append-only logging with hash chaining, WORM archive, evidence-pack generator; internal audit owns queries.',
        kpisBanked: 'Log completeness, evidence retrieval time, findings per audit.',
        timeToValue: '10–20 wk',
        valueAssurance: 'AI Act Art 12 record-keeping, SEC 17a-4 / FINRA 4511, ISO 27001 A.8, chain of custody.',
        buyer: 'Head of Internal Audit',
        relatedIndustries: ['Banking & Insurance', 'Life Sciences', 'Defense & Aerospace']
      }
    ]
  },
  {
    id: 'esg',
    code: '5.2',
    title: 'ESG & Sustainability',
    shortTitle: 'ESG & Sustainability',
    buyer: 'CSO / CFO (disclosure)',
    budget: 'Sustainability Programme, Regulatory Reporting, Energy Transition',
    attachVerticals: ['6.1', '6.2', '6.3', '6.5'],
    medianTtv: '14 wk',
    originator: true,
    description: 'Automated Scope 1–3 calculations, double-materiality disclosure evidence, and supply-chain ESG due diligence.',
    practiceAreas: [
      {
        code: '5.2.1',
        title: 'Carbon Accounting & MRV Agents',
        slug: 'carbon-accounting-mrv-agents',
        overview: 'Automates greenhouse gas emissions accounting and monitoring, reporting, and verification workflows.',
        solutionAcceleration: 'Scope 1–3 calculation library, emissions-factor catalogue, evidence pipeline; sustainability team owns factors.',
        kpisBanked: 'Emissions per unit, data coverage, assurance findings.',
        timeToValue: '10–18 wk',
        valueAssurance: 'GHG Protocol, ISO 14064, EU ETS MRV, CSRD/ESRS E1.',
        buyer: 'Chief Sustainability Officer',
        relatedIndustries: ['Manufacturing', 'Energy & Utilities', 'Transportation']
      },
      {
        code: '5.2.2',
        title: 'Disclosure & Double-Materiality Automation',
        slug: 'disclosure-double-materiality-automation',
        overview: 'Accelerates CSRD, ISSB, and TCFD compliance with automated double-materiality evidence synthesis.',
        solutionAcceleration: 'Disclosure templates per regime (CSRD, ISSB, TCFD), materiality workflow, evidence packs; reporting team owns narrative.',
        kpisBanked: 'Disclosure cycle time, restatements, auditor queries.',
        timeToValue: '8–16 wk',
        valueAssurance: 'CSRD/ESRS, ISSB IFRS S1/S2, limited-assurance readiness.',
        buyer: 'CFO / Sustainability Controller',
        relatedIndustries: ['Financial Services', 'Consumer Durables', 'Public Equities']
      },
      {
        code: '5.2.3',
        title: 'Supply-Chain Due Diligence & Social Compliance',
        slug: 'supply-chain-due-diligence-compliance',
        overview: 'Verifies tier-n supplier labor conditions, environmental standards, and regulatory compliance.',
        solutionAcceleration: 'Supplier ESG graph, audit-evidence verification, grievance intake and remediation tracking; procurement owns remediation.',
        kpisBanked: 'Suppliers assessed, high-risk findings closed, grievance resolution time.',
        timeToValue: '12–20 wk',
        valueAssurance: 'CSDDD 2024/1760, UFLPA, OECD due-diligence guidance, Modern Slavery Acts.',
        buyer: 'Chief Procurement Officer',
        relatedIndustries: ['Apparel & Retail', 'Electronics Manufacturing', 'Automotive']
      }
    ]
  },
  {
    id: 'workforce',
    code: '5.3',
    title: 'Workforce Transformation',
    shortTitle: 'Workforce Transformation',
    buyer: 'CHRO / COO',
    budget: 'L&D, Change Management, Productivity',
    attachVerticals: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8'],
    medianTtv: '9 wk',
    originator: false,
    description: 'Enables enterprise staff through role-tailored AI upskilling, role copilots, and work redesign.',
    practiceAreas: [
      {
        code: '5.3.1',
        title: 'AI Upskilling & Enablement',
        slug: 'ai-upskilling-enablement',
        overview: 'Structures role-based AI literacy and technical competence programs for organizational autonomy.',
        solutionAcceleration: 'Role-based curriculum, sandbox tenant with safe data, competency assessment and badging; L&D owns delivery after cohort one.',
        kpisBanked: 'Certified staff, time-to-competence, tasks completed unaided.',
        timeToValue: '8–16 wk',
        valueAssurance: 'AI Act Art 4 AI literacy, competence records, works-council consultation.',
        buyer: 'Chief Human Resources Officer',
        relatedIndustries: ['All Enterprise Verticals']
      },
      {
        code: '5.3.2',
        title: 'Workforce Co-Pilots',
        slug: 'workforce-co-pilots',
        overview: 'Deploys role-specific copilots for HR, customer care, and operations over enterprise knowledge.',
        solutionAcceleration: 'Role copilot kit for HR, service desk and engineering; retrieval over policy, tickets and repositories; function owns content.',
        kpisBanked: 'Handle time, first-contact resolution, answer accuracy, review latency.',
        timeToValue: '6–12 wk',
        valueAssurance: 'GDPR employee data, works council, Art 50 disclosure, role-based access.',
        buyer: 'Head of Operations / Service Desk',
        relatedIndustries: ['Customer Service', 'Healthcare', 'Financial Services']
      },
      {
        code: '5.3.3',
        title: 'Work Redesign & Adoption',
        slug: 'work-redesign-adoption',
        overview: 'Re-engineers job roles and processes to ensure banked AI benefits translate into measurable productivity.',
        solutionAcceleration: 'Task-level role impact map, redeployment plan, champion network, monthly value review; client leads run it.',
        kpisBanked: 'Tasks removed, roles redesigned, activated users, benefit realization rate.',
        timeToValue: '4–10 wk',
        valueAssurance: 'Worker consultation duties, equality impact assessment, documented change control.',
        buyer: 'Chief Operating Officer',
        relatedIndustries: ['All Enterprise Verticals']
      }
    ]
  },
  {
    id: 'finops',
    code: '5.4',
    title: 'AI FinOps & Finance Command',
    shortTitle: 'AI FinOps',
    buyer: 'CFO / VP Finance',
    budget: 'Technology Spend, Cloud and AI Run Cost',
    attachVerticals: ['6.7', '6.1', '6.2'],
    medianTtv: '8 wk',
    originator: true,
    description: 'Granular telemetry, unit-cost attribution per transaction, and board-level AI ROI reporting.',
    practiceAreas: [
      {
        code: '5.4.1',
        title: 'Spend Telemetry & Chargeback',
        slug: 'spend-telemetry-chargeback',
        overview: 'Captures and attributes enterprise cloud and GPU compute costs directly to consuming business units.',
        solutionAcceleration: 'TBM-aligned taxonomy, tagging schema, chargeback engine, dispute workflow; FinOps owns allocation.',
        kpisBanked: 'Untagged spend, allocation accuracy, cost per business unit.',
        timeToValue: '6–10 wk',
        valueAssurance: 'SOX controls over allocation, IAS 38 capitalisation, audit trail.',
        buyer: 'VP Finance / FinOps Lead',
        relatedIndustries: ['TMT', 'Financial Services', 'Enterprise Software']
      },
      {
        code: '5.4.2',
        title: 'Model Cost Attribution',
        slug: 'model-cost-attribution',
        overview: 'Instruments per-token, per-call inference metering to measure true unit economics per accepted outcome.',
        solutionAcceleration: 'Per-call metering, cost-per-accepted-outcome model, routing and caching levers; platform owns instrumentation.',
        kpisBanked: 'Cost per accepted outcome, GPU utilisation, cost per transaction.',
        timeToValue: '8–12 wk',
        valueAssurance: 'Metering accuracy audit, vendor invoice reconciliation, data residency.',
        buyer: 'Head of Infrastructure / AI Platform',
        relatedIndustries: ['Cloud Platforms', 'Banking', 'Digital Commerce']
      },
      {
        code: '5.4.3',
        title: 'CFO-Ready AI Investment Reporting',
        slug: 'cfo-ready-investment-reporting',
        overview: 'Translates technical AI milestones into auditable balance sheet savings, payback, and hurdle spreads.',
        solutionAcceleration: 'Investment register, business-case standard, benefit-ledger link with banked and in-flight states; FP&A owns number.',
        kpisBanked: 'Benefits banked vs committed, payback, hurdle spread.',
        timeToValue: '4–8 wk',
        valueAssurance: 'Audit committee evidence, disclosure controls, IAS 38 impairment testing.',
        buyer: 'Chief Financial Officer',
        relatedIndustries: ['All Capital-Allocating Enterprises']
      }
    ]
  },
  {
    id: 'revops',
    code: '5.5',
    title: 'Revenue Operations (RevOps)',
    shortTitle: 'RevOps',
    buyer: 'CRO / CCO',
    budget: 'Sales and Marketing OpEx, Gross Margin',
    attachVerticals: ['6.1', '6.2', '6.3', '6.7'],
    medianTtv: '10 wk',
    originator: false,
    description: 'Machinery of enterprise revenue: deal scoring, algorithmic pricing, and GTM agent swarms.',
    practiceAreas: [
      {
        code: '5.5.1',
        title: 'Pipeline Intelligence & Deal Scoring',
        slug: 'pipeline-intelligence-deal-scoring',
        overview: 'Applies historical conversion models to rank opportunities, detect deal slippage, and automate hygiene.',
        solutionAcceleration: 'Scoring models on CRM history, forecast roll-up, enrichment and deduplication agents; RevOps owns cadence.',
        kpisBanked: 'Forecast accuracy, win rate, stage conversion, CRM completeness.',
        timeToValue: '6–10 wk',
        valueAssurance: 'GDPR on prospect data, CRM audit trail, model monitoring.',
        buyer: 'Head of Revenue Operations',
        relatedIndustries: ['Enterprise Tech', 'Financial Services', 'Manufacturing']
      },
      {
        code: '5.5.2',
        title: 'Pricing & Margin Optimization',
        slug: 'pricing-margin-optimization',
        overview: 'Models willingness-to-pay and price elasticity to prevent discount leakage at the deal desk.',
        solutionAcceleration: 'Elasticity library, willingness-to-pay models, deal-desk guardrails and exception flow; pricing owns conclusions.',
        kpisBanked: 'Price realisation, discount leakage, gross margin.',
        timeToValue: '8–16 wk',
        valueAssurance: 'Competition law on information exchange, consumer law, transfer pricing, ASC 606 / IFRS 15.',
        buyer: 'VP Commercial / Chief Commercial Officer',
        relatedIndustries: ['Wholesale Distribution', 'Software', 'Manufacturing']
      },
      {
        code: '5.5.3',
        title: 'GTM Agent Fleets',
        slug: 'gtm-agent-fleets',
        overview: 'Autonomous research and inbound/outbound lead triage agents with strict guardrails and human handoff.',
        solutionAcceleration: 'Research and outreach fleets, guardrails, eval sets, human-handoff SLAs; marketing ops owns prompts and sources.',
        kpisBanked: 'Cost per qualified opportunity, speed to lead, pipeline created.',
        timeToValue: '6–14 wk',
        valueAssurance: 'ePrivacy and consent, AI-interaction disclosure, suppression lists, brand review.',
        buyer: 'VP Marketing / Growth',
        relatedIndustries: ['B2B Technology', 'Commercial Services', 'Logistics']
      }
    ]
  },
  {
    id: 'growth',
    code: '5.6',
    title: 'Growth & Sales Acceleration',
    shortTitle: 'Growth & Sales',
    buyer: 'CRO / VP Channel & Alliances',
    budget: 'Channel Programme, Distributor Incentives, Sales Enablement',
    attachVerticals: ['6.1', '6.3', '6.7'],
    medianTtv: '12 wk',
    originator: false,
    description: 'Routes to market: distributor scorecards, rebate engines, partner co-selling, and rep deal copilots.',
    practiceAreas: [
      {
        code: '5.6.1',
        title: 'Sales Productivity & Deal Acceleration',
        slug: 'sales-productivity-deal-acceleration',
        overview: 'Empowers direct sales reps with automated RFP parsing, competitive intelligence, and proposal generation.',
        solutionAcceleration: 'Deal copilot kit, RFP and proposal automation, call intelligence, rep onboarding path; sales enablement owns content.',
        kpisBanked: 'Selling time per rep, ramp time, proposal cycle, win rate on pursued deals.',
        timeToValue: '6–12 wk',
        valueAssurance: 'GDPR on prospect and call data, AI-interaction disclosure, CRM audit trail.',
        buyer: 'Head of Sales Enablement',
        relatedIndustries: ['Telecom', 'Manufacturing', 'Technology']
      },
      {
        code: '5.6.2',
        title: 'Distributor & Channel Management',
        slug: 'distributor-channel-management',
        overview: 'Reconciles sell-in and sell-out data across dealer networks and calculates performance rebates.',
        solutionAcceleration: 'Distributor scorecards, sell-in/sell-out reconciliation, rebate and incentive engine, channel-inventory view; channel finance owns rebates.',
        kpisBanked: 'Channel sell-out, distributor ROI, rebate accuracy, channel inventory days.',
        timeToValue: '10–18 wk',
        valueAssurance: 'Competition law, transfer pricing, ISO 37001 anti-bribery for incentives, ASC 606.',
        buyer: 'VP Channel Sales / Global Distribution',
        relatedIndustries: ['Automotive', 'Consumer Goods', 'Industrial Equipment']
      },
      {
        code: '5.6.3',
        title: 'Partner Ecosystem & Co-Sell Orchestration',
        slug: 'partner-ecosystem-cosell-orchestration',
        overview: 'Orchestrates multi-party alliance pipelines, marketplace listings, and shared deal attribution.',
        solutionAcceleration: 'Partner segmentation, co-sell matching, marketplace listings, alliance value tracking; alliances team owns programme.',
        kpisBanked: 'Partner-sourced revenue, co-sell attach rate, partner activation, marketplace GMV.',
        timeToValue: '10–18 wk',
        valueAssurance: 'Channel-conflict policy, competition law, controller/processor terms, audit rights.',
        buyer: 'Head of Global Alliances',
        relatedIndustries: ['Cloud & Platforms', 'Telecom', 'Financial Services']
      }
    ]
  },
  {
    id: 'supply-chain',
    code: '5.7',
    title: 'Supply Chain Acceleration',
    shortTitle: 'Supply Chain',
    buyer: 'COO / CSCO',
    budget: 'Procurement, Supply-Chain OpEx, Expedite & Premium Freight',
    attachVerticals: ['6.1', '6.3', '6.5', '6.6'],
    medianTtv: '14 wk',
    originator: false,
    description: 'Upstream operations: tier-n supplier graphs, should-cost sourcing models, and freight network twins.',
    practiceAreas: [
      {
        code: '5.7.1',
        title: 'Supplier Risk & Resilience Intelligence',
        slug: 'supplier-risk-resilience-intelligence',
        overview: 'Discovers sub-tier supply dependencies, financial distress, and geopolitical disruption threats.',
        solutionAcceleration: 'Supplier graph with tier-n discovery, distress and adverse-media signals, scenario simulator; procurement owns records.',
        kpisBanked: 'Tier-n visibility, single-source exposure, time to detect, recovery time.',
        timeToValue: '8–16 wk',
        valueAssurance: 'CSDDD 2024/1760, UFLPA, conflict-minerals diligence, origin rules.',
        buyer: 'Chief Supply Chain Officer',
        relatedIndustries: ['Manufacturing', 'Automotive', 'Electronics']
      },
      {
        code: '5.7.2',
        title: 'Procurement & Sourcing Intelligence',
        slug: 'procurement-sourcing-intelligence',
        overview: 'Automates RFQ drafting, supplier bid comparison, spend category cubes, and should-cost modeling.',
        solutionAcceleration: 'Spend cube, should-cost models, RFQ drafting and bid analysis; category managers own awards.',
        kpisBanked: 'Savings realised, sourcing cycle time, maverick spend.',
        timeToValue: '10–18 wk',
        valueAssurance: 'Public procurement rules where applicable, conflict-of-interest controls, award audit.',
        buyer: 'Chief Procurement Officer',
        relatedIndustries: ['Industrial Equipment', 'Energy', 'Consumer Goods']
      },
      {
        code: '5.7.3',
        title: 'Logistics & Network Optimization',
        slug: 'logistics-network-optimization',
        overview: 'Simulates freight lanes, optimizes multimodal transport mix, and cuts empty miles and emissions.',
        solutionAcceleration: 'Network twin, lane-cost model, routing and mode-mix optimizers, GLEC emissions factors; logistics owns execution.',
        kpisBanked: 'Cost per shipment, empty miles, OTIF, emissions per tonne-km.',
        timeToValue: '12–22 wk',
        valueAssurance: 'Customs and AEO rules, driver hours, dangerous goods, ISO 14083.',
        buyer: 'VP Global Logistics',
        relatedIndustries: ['Ports & Logistics', 'Retail Wholesale', 'Chemicals']
      }
    ]
  },
  {
    id: 'demand-chain',
    code: '5.8',
    title: 'Demand Chain Management',
    shortTitle: 'Demand Chain',
    buyer: 'COO / VP Planning',
    budget: 'Planning, Inventory Carrying Cost, Markdown and Expedite',
    attachVerticals: ['6.1', '6.3', '6.6'],
    medianTtv: '14 wk',
    originator: false,
    description: 'Downstream operations: demand sensing, multi-echelon S&OP orchestration, and ATP order promising.',
    practiceAreas: [
      {
        code: '5.8.1',
        title: 'Demand Sensing & Forecasting',
        slug: 'demand-sensing-forecasting',
        overview: 'Ingests external signals (weather, promo, macro) to reduce forecast bias and inventory obsolescence.',
        solutionAcceleration: 'Feature library (promo, weather, price, macro), signal pipeline, exception-triage agent; planning owns overrides.',
        kpisBanked: 'Forecast bias, forecast accuracy, exception volume.',
        timeToValue: '10–18 wk',
        valueAssurance: 'S&OP governance, override audit trail, SOX where listed.',
        buyer: 'VP Demand Planning',
        relatedIndustries: ['Retail Grocery', 'Consumer Durables', 'Automotive']
      },
      {
        code: '5.8.2',
        title: 'Inventory & S&OP Orchestration',
        slug: 'inventory-sop-orchestration',
        overview: 'Dynamically optimizes buffer stock across distribution centers to free working capital.',
        solutionAcceleration: 'Multi-echelon inventory model, scenario planner, S&OP pack automation; supply planning owns parameters.',
        kpisBanked: 'Inventory days, service level, working capital released.',
        timeToValue: '12–20 wk',
        valueAssurance: 'Finance sign-off on working capital, model documentation, planning policy.',
        buyer: 'Head of Integrated Planning',
        relatedIndustries: ['Branded Consumer Goods', 'Manufacturing', 'Logistics']
      },
      {
        code: '5.8.3',
        title: 'Fulfilment & Order Promising',
        slug: 'fulfilment-order-promising',
        overview: 'Real-time available-to-promise and dynamic order routing minimizing split deliveries.',
        solutionAcceleration: 'Available-to-promise engine, promise-date logic, allocation rules; fulfilment owns execution.',
        kpisBanked: 'On-time-in-full, promise accuracy, split shipments.',
        timeToValue: '8–14 wk',
        valueAssurance: 'Consumer distance-selling rules, SLA evidence, allocation fairness.',
        buyer: 'Director of Fulfilment',
        relatedIndustries: ['Omnichannel Retail', 'Distribution Hubs', 'Wholesale']
      }
    ]
  },
  {
    id: 'crm',
    code: '5.9',
    title: 'Customer Relationship Management (CRM)',
    shortTitle: 'CRM',
    buyer: 'CCO / CXO / Head of Service',
    budget: 'Service OpEx, Customer Retention, Field Operations',
    attachVerticals: ['6.3', '6.4', '6.7'],
    medianTtv: '12 wk',
    originator: false,
    description: 'Customer lifecycle: autonomous service journey agents, churn prevention, and field technician dispatch.',
    practiceAreas: [
      {
        code: '5.9.1',
        title: 'Journey Agents (Service, Onboarding, Success)',
        slug: 'journey-agents-service-onboarding',
        overview: 'Automates customer onboarding, tier-1 service containment, and proactive account health checkups.',
        solutionAcceleration: 'Journey blueprint, agent kit with handoff design, onboarding capture, QA sampling; service ops owns content.',
        kpisBanked: 'Cost per contact, containment, CSAT, time to onboard.',
        timeToValue: '8–14 wk',
        valueAssurance: 'GDPR, consumer law, accessibility (EAA/WCAG), KYC where regulated.',
        buyer: 'Chief Customer Officer',
        relatedIndustries: ['Banking', 'Telecom', 'Healthcare Payers']
      },
      {
        code: '5.9.2',
        title: 'Loyalty & Churn Intelligence',
        slug: 'loyalty-churn-intelligence',
        overview: 'Identifies accounts with declining engagement and calculates highest-ROI retention offers.',
        solutionAcceleration: 'Churn model library, value-at-risk scoring, save-offer engine, loyalty liability models; CRM and Finance co-own.',
        kpisBanked: 'Churn rate, save rate, net revenue retention, breakage.',
        timeToValue: '8–16 wk',
        valueAssurance: 'GDPR profiling and Art 22, fairness testing, IFRS 15 loyalty liability.',
        buyer: 'VP Customer Retention',
        relatedIndustries: ['Telecom', 'Digital Subscriptions', 'Retail Loyalty']
      },
      {
        code: '5.9.3',
        title: 'Field Service & Aftermarket Agents',
        slug: 'field-service-aftermarket-agents',
        overview: 'Predicts required replacement parts, schedules field engineers, and triages warranty coverage.',
        solutionAcceleration: 'Scheduling and dispatch optimizer, parts prediction, warranty triage; service operations owns the workflow.',
        kpisBanked: 'First-time-fix, truck rolls avoided, SLA attainment, warranty cycle time.',
        timeToValue: '8–14 wk',
        valueAssurance: 'Service records and consumer warranty law, technician data under GDPR, on-site safety rules.',
        buyer: 'Head of Field Operations',
        relatedIndustries: ['Capital Machinery', 'Utilities', 'Commercial HVAC']
      }
    ]
  },
  {
    id: 'brand',
    code: '5.10',
    title: 'Brand Reputation Management & Acceleration',
    shortTitle: 'Brand Reputation',
    buyer: 'CMO / Chief Communications Officer',
    budget: 'Brand and Communications, Crisis Response, Media',
    attachVerticals: ['6.3', '6.7', '6.8'],
    medianTtv: '6 wk',
    originator: false,
    description: 'Public sentiment monitoring, early anomaly crisis detection, and executive brand visibility analytics.',
    practiceAreas: [
      {
        code: '5.10.1',
        title: 'Social & Media Listening Agents',
        slug: 'social-media-listening-agents',
        overview: 'Monitors news feeds, forums, and regulatory channels for emergent sentiment trends and brand threats.',
        solutionAcceleration: 'Source connectors, sentiment and narrative models, alert routing by severity; communications team owns response.',
        kpisBanked: 'Share of voice, sentiment trend, time to detect.',
        timeToValue: '4–8 wk',
        valueAssurance: 'Platform terms of service, GDPR, defamation review.',
        buyer: 'Chief Communications Officer',
        relatedIndustries: ['Consumer Brands', 'Airlines', 'Public Entities']
      },
      {
        code: '5.10.2',
        title: 'Crisis Detection & Response Orchestration',
        slug: 'crisis-detection-response-orchestration',
        overview: 'Detects narrative velocity spikes and prepares verified spokesperson briefing packs in minutes.',
        solutionAcceleration: 'Volume and sentiment anomaly detection, playbook triggers, spokesperson briefing packs; crisis team owns decisions.',
        kpisBanked: 'Time to detect, time to first response, escalation accuracy.',
        timeToValue: '2–6 wk',
        valueAssurance: 'Pre-approved messaging, legal review, disclosure duties (MAR if listed).',
        buyer: 'VP Corporate Affairs / Crisis Response',
        relatedIndustries: ['Publicly Listed Companies', 'Airlines', 'Pharma']
      },
      {
        code: '5.10.3',
        title: 'Reputation Analytics & Share-of-Voice',
        slug: 'reputation-analytics-share-of-voice',
        overview: 'Quantifies narrative pull-through against competitors and measures marketing campaign effectiveness.',
        solutionAcceleration: 'Benchmark models, executive visibility dashboards, message-effectiveness tracking; CMO owns the narrative.',
        kpisBanked: 'Reputation index, share of voice, message pull-through.',
        timeToValue: '6–12 wk',
        valueAssurance: 'Measurement methodology disclosure, third-party data licensing.',
        buyer: 'Chief Marketing Officer',
        relatedIndustries: ['Global Consumer Brands', 'Telecom', 'Financial Services']
      }
    ]
  },
  {
    id: 'cybersecurity',
    code: '5.11',
    title: 'Cybersecurity & AI Security',
    shortTitle: 'Cyber & AI Security',
    buyer: 'CISO / CTO',
    budget: 'Security Operations, Cyber Insurance, Resilience Programmes',
    attachVerticals: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8'],
    medianTtv: '10 wk',
    originator: true,
    description: 'SOC triage augmentation, adversarial AI red-teaming, prompt firewalls, and non-human identity security.',
    practiceAreas: [
      {
        code: '5.11.1',
        title: 'SOC Augmentation & Alert Triage',
        slug: 'soc-augmentation-alert-triage',
        overview: 'Correlates distributed telemetry and automates false-positive triage to relieve analyst burnout.',
        solutionAcceleration: 'Detection-engineering library, alert-triage agent with analyst sign-off, investigation timelines; SOC lead owns playbooks.',
        kpisBanked: 'Mean time to detect, mean time to respond, false-positive rate, cases per analyst.',
        timeToValue: '8–14 wk',
        valueAssurance: 'NIST CSF 2.0, ISO 27001, NIS2, DORA resilience testing.',
        buyer: 'Chief Information Security Officer',
        relatedIndustries: ['All Critical Infrastructure Verticals']
      },
      {
        code: '5.11.2',
        title: 'AI Red-Teaming & Guardrail Assurance',
        slug: 'ai-red-teaming-guardrail-assurance',
        overview: 'Executes automated jailbreak, prompt-injection, data exfiltration, and model poisoning attacks.',
        solutionAcceleration: 'Prompt-injection and exfiltration test suites, poisoning checks, guardrail configuration; AI product owner owns fixes.',
        kpisBanked: 'AI systems tested, high-severity findings closed, guardrail bypass rate.',
        timeToValue: '6–12 wk',
        valueAssurance: 'OWASP LLM Top 10, MITRE ATLAS, ISO 42001 Annex A, AI Act Art 15 robustness.',
        buyer: 'VP AI Safety / Head of AppSec',
        relatedIndustries: ['Agentic Enterprise', 'Banking', 'Healthcare']
      },
      {
        code: '5.11.3',
        title: 'Non-Human Identity & Agent Access',
        slug: 'non-human-identity-agent-access',
        overview: 'Governs service accounts, API tokens, and autonomous agent credentials under strict least-privilege policies.',
        solutionAcceleration: 'Agent identity inventory, credential brokerage, least-privilege policies; IAM team owns enforcement.',
        kpisBanked: 'Orphaned identities, privilege creep, time to deprovision, agent actions audited.',
        timeToValue: '10–16 wk',
        valueAssurance: 'Zero-trust architecture (NIST SP 800-207), ISO 27001 A.9, SOX ITGC.',
        buyer: 'Director of Identity & Access Management',
        relatedIndustries: ['Cloud Estates', 'Financial Services', 'Defense']
      }
    ]
  },
  {
    id: 'knowledge',
    code: '5.12',
    title: 'Enterprise Knowledge & Semantic Fabric',
    shortTitle: 'Knowledge & Semantics',
    buyer: 'CDO / CIO',
    budget: 'Knowledge Management, Search and Retrieval, Content Operations',
    attachVerticals: ['6.2', '6.4', '6.8'],
    medianTtv: '15 wk',
    originator: false,
    description: 'Knowledge graphs, enterprise RAG governance, and high-accuracy unstructured document intelligence.',
    practiceAreas: [
      {
        code: '5.12.1',
        title: 'Semantic Layer & Knowledge Graph',
        slug: 'semantic-layer-knowledge-graph',
        overview: 'Unifies siloed definitions into an enterprise ontology and queryable entity relationship graph.',
        solutionAcceleration: 'Ontology starter kits by domain, metric definitions, graph modelling; data office owns definitions.',
        kpisBanked: 'Definition reuse, query accuracy, time to onboard a source.',
        timeToValue: '10–24 wk',
        valueAssurance: 'Lineage documentation, design authority, BCBS 239 where financial.',
        buyer: 'Chief Data Officer',
        relatedIndustries: ['Financial Services', 'Life Sciences', 'Public Sector']
      },
      {
        code: '5.12.2',
        title: 'RAG Governance & Content Pipelines',
        slug: 'rag-governance-content-pipelines',
        overview: 'Establishes chunking, citation evaluation, vector indexing, and freshness controls over enterprise retrieval.',
        solutionAcceleration: 'Ingestion and chunking standards, freshness and poisoning checks, groundedness evaluation; knowledge team owns the corpus.',
        kpisBanked: 'Grounded answer rate, stale-document rate, retrieval hit rate.',
        timeToValue: '8–14 wk',
        valueAssurance: 'Source licensing and copyright, version control, AI Act transparency.',
        buyer: 'Head of Knowledge Engineering',
        relatedIndustries: ['Legal & Compliance', 'Customer Operations', 'R&D']
      },
      {
        code: '5.12.3',
        title: 'Unstructured Content Intelligence',
        slug: 'unstructured-content-intelligence',
        overview: 'Extracts tables, clauses, and entities from complex PDFs, scans, and technical schematics at scale.',
        solutionAcceleration: 'Extraction and classification pipeline for documents, contracts and scans; taxonomy and indexing; knowledge team owns it.',
        kpisBanked: 'Extraction accuracy, straight-through processing, documents indexed.',
        timeToValue: '8–16 wk',
        valueAssurance: 'Retention and privacy rules, source licensing, audit sampling of extractions.',
        buyer: 'Director of Content Operations',
        relatedIndustries: ['Insurance Claims', 'Mortgage Lending', 'Engineering EPC']
      }
    ]
  },
  {
    id: 'data-integration',
    code: '5.13',
    title: 'End-to-End Data Integration & Management',
    shortTitle: 'Data Integration',
    buyer: 'CDO / Head of Data Engineering',
    budget: 'Data Platform, Integration, Master-Data Programmes',
    attachVerticals: ['6.2', '6.4', '6.1'],
    medianTtv: '14 wk',
    originator: false,
    description: 'Data movement and integrity: high-throughput pipelines, master data matching, and data lifecycle retention.',
    practiceAreas: [
      {
        code: '5.13.1',
        title: 'Data Integration & Pipeline Engineering',
        slug: 'data-integration-pipeline-engineering',
        overview: 'Engineers robust CDC, batch, and streaming connectors feeding production AI inference workloads.',
        solutionAcceleration: 'Connector library (CDC, API, file, stream), orchestration templates, pipeline observability; data engineering owns the platform.',
        kpisBanked: 'Data freshness, pipeline SLA attainment, failure rate, cost per pipeline.',
        timeToValue: '10–20 wk',
        valueAssurance: 'Lineage per dataset, access control, GDPR Art 28 processor terms, SOX ITGC.',
        buyer: 'Head of Data Engineering',
        relatedIndustries: ['All Data-Driven Enterprises']
      },
      {
        code: '5.13.2',
        title: 'Master Data & Data Quality Management',
        slug: 'master-data-quality-management',
        overview: 'Resolves duplicate entities, enforces golden records, and runs automated data quality hygiene rules.',
        solutionAcceleration: 'Entity-resolution toolkit, golden-record rules, DQ rule library, stewardship workflow; data owners sign off records.',
        kpisBanked: 'Match rate, duplicate rate, DQ score, stewardship coverage, certified datasets.',
        timeToValue: '10–18 wk',
        valueAssurance: 'ISO 8000, BCBS 239 where financial, audit trail of merges, certification evidence.',
        buyer: 'Head of Enterprise Master Data',
        relatedIndustries: ['Banking', 'Healthcare', 'Global Supply Chain']
      },
      {
        code: '5.13.3',
        title: 'Data Catalog, Lineage & Lifecycle',
        slug: 'data-catalog-lineage-lifecycle',
        overview: 'Automates data asset classification, column-level lineage tracking, and compliance-driven archival/deletion.',
        solutionAcceleration: 'Catalog and lineage tooling, classification and retention rules, archival and deletion evidence; records management owns policy.',
        kpisBanked: 'Catalog coverage, lineage completeness, retention breaches, storage cost per terabyte.',
        timeToValue: '8–16 wk',
        valueAssurance: 'GDPR records and DPIAs, legal hold, sector retention rules, deletion certificates.',
        buyer: 'Director of Data Governance',
        relatedIndustries: ['Financial Services', 'Life Sciences', 'Public Sector']
      }
    ]
  },
  {
    id: 'cio-ops',
    code: '5.14',
    title: 'CIO & Technology Operations',
    shortTitle: 'CIO & Tech Ops',
    buyer: 'CIO / CTO',
    budget: 'Run-the-Business IT, Infrastructure, Application Portfolio',
    attachVerticals: ['6.7', '6.1', '6.2'],
    medianTtv: '10 wk',
    originator: false,
    description: 'Optimizing and reducing the IT estate: cloud workload placement, ITSM ticket deflection, and portfolio rationalization.',
    practiceAreas: [
      {
        code: '5.14.1',
        title: 'Infrastructure & Cloud Optimization',
        slug: 'infrastructure-cloud-optimization',
        overview: 'Rightsizes cloud compute instances, consolidates licenses, and optimizes hybrid workload placement.',
        solutionAcceleration: 'Rightsizing and commitment models, workload placement, observability stack; platform engineering owns changes.',
        kpisBanked: 'Cost per workload, utilisation, availability, energy per transaction.',
        timeToValue: '6–12 wk',
        valueAssurance: 'Change control and resilience testing (DORA, NIS2), ISO 27001, exit and portability plans.',
        buyer: 'Head of Cloud & Infrastructure',
        relatedIndustries: ['Telecommunications', 'Cloud Software', 'Financial Services']
      },
      {
        code: '5.14.2',
        title: 'IT Service Management & Asset Lifecycle',
        slug: 'it-service-management-asset-lifecycle',
        overview: 'Deploys autonomous ticket-resolution agents and predictive hardware/software patch lifecycle workflows.',
        solutionAcceleration: 'Ticket-deflection agents, incident and problem analytics, asset and patch automation; service management owns the process.',
        kpisBanked: 'Mean time to restore, tickets per user, patch compliance, asset-record accuracy.',
        timeToValue: '6–12 wk',
        valueAssurance: 'ITIL practices, ISO/IEC 20000, SOX ITGC, licence compliance.',
        buyer: 'Head of IT Service Operations',
        relatedIndustries: ['Large Enterprise IT', 'Healthcare', 'Government']
      },
      {
        code: '5.14.3',
        title: 'Application Portfolio & Platform Engineering',
        slug: 'app-portfolio-platform-engineering',
        overview: 'Identifies redundant applications for decommissioning and standardizes internal developer platforms.',
        solutionAcceleration: 'Portfolio rationalisation analysis, tech-debt register, developer platform and release pipelines; architecture board owns decisions.',
        kpisBanked: 'Applications retired, change failure rate, deployment frequency, cost per application.',
        timeToValue: '10–20 wk',
        valueAssurance: 'Architecture governance, licence and exit plans, ISO 27001 change management.',
        buyer: 'VP Enterprise Architecture',
        relatedIndustries: ['Financial Conglomerates', 'Manufacturing', 'Retail']
      }
    ]
  },
  {
    id: 'legal',
    code: '5.15',
    title: 'Legal & Contract Operations',
    shortTitle: 'Legal Operations',
    buyer: 'General Counsel / Head of Legal Operations',
    budget: 'Legal Spend, Outside Counsel, Contract Administration',
    attachVerticals: ['6.2', '6.6'],
    medianTtv: '12 wk',
    originator: false,
    description: 'Contract obligation extraction, automated e-discovery privilege review, and statutory corporate secretarial management.',
    practiceAreas: [
      {
        code: '5.15.1',
        title: 'Contract Intelligence & Lifecycle',
        slug: 'contract-intelligence-lifecycle',
        overview: 'Extracts non-standard indemnities, auto-renewal dates, and payment milestones across legacy contracts.',
        solutionAcceleration: 'Clause library, obligation extraction, renewal and expiry tracking; legal ops owns the playbook.',
        kpisBanked: 'Contract cycle time, obligation compliance, value leakage recovered.',
        timeToValue: '8–14 wk',
        valueAssurance: 'eIDAS / ESIGN execution, privilege controls, retention rules.',
        buyer: 'Director of Legal Operations',
        relatedIndustries: ['Commercial Real Estate', 'Banking', 'Corporate Procurement']
      },
      {
        code: '5.15.2',
        title: 'Litigation & E-Discovery Review',
        slug: 'litigation-ediscovery-review',
        overview: 'Accelerates legal document review with high-recall privilege filtering and chronological event reconstruction.',
        solutionAcceleration: 'Review platform with privilege screening, issue coding, chronology building; counsel owns calls.',
        kpisBanked: 'Review cost per gigabyte, recall and precision, time to production.',
        timeToValue: '10–18 wk',
        valueAssurance: 'Disclosure and civil-procedure rules, privilege, GDPR.',
        buyer: 'Head of Litigation',
        relatedIndustries: ['Financial Services', 'Pharma', 'Infrastructure']
      },
      {
        code: '5.15.3',
        title: 'Entity & Corporate Secretarial Management',
        slug: 'entity-corporate-secretarial-management',
        overview: 'Maintains subsidiary registries, manages mandatory officer filings, and automates board package synthesis.',
        solutionAcceleration: 'Entity register, filing calendar, board-pack assembly; company secretary owns statutory records.',
        kpisBanked: 'Filing timeliness, entity-data accuracy, subsidiary compliance.',
        timeToValue: '8–14 wk',
        valueAssurance: 'Statutory filing duties, UBO registers, SOX entity-level controls.',
        buyer: 'Corporate Secretary / General Counsel',
        relatedIndustries: ['Multinational Corporations', 'Holding Companies']
      }
    ]
  }
]

/* ==========================================================================
   DIVISION 3 — INDUSTRY VERTICAL PRACTICES (8 Industries · 34 Sub-v · 103 PAs)
   ========================================================================== */
export const industryVerticalPractices: IndustryVertical[] = [
  {
    id: 'manufacturing',
    code: '6.1',
    title: 'Manufacturing & Industrial Production',
    shortTitle: 'Manufacturing',
    poolSize: '~$16T VA (~$40–45T output)',
    buyer: 'COO, VP Manufacturing, Plant Director, Quality Head',
    bankedAgainst: 'COGS, Scrap, Capex Deferral, Warranty',
    tier: 1,
    medianTtv: '12 wk',
    description: 'Computer vision quality inspection, OEE optimization, field service copilots, and end-to-end line traceability.',
    subVerticals: [
      {
        code: '6.1.1',
        title: 'Automotive & Mobility Manufacturing',
        practiceAreas: [
          {
            code: '6.1.1.1',
            title: 'Body Shop & Paint Vision QC + Andon Agents',
            slug: 'body-shop-paint-vision-qc',
            overview: 'Autonomous computer vision defect detection on vehicle body panels, welds, and paint finishes.',
            solutionAcceleration: 'Vision-retrofit kit, defect taxonomy library, retraining loop; plant QC owns it.',
            kpisBanked: 'Defects per unit, rework hours.',
            timeToValue: '10–14 wk',
            valueAssurance: 'IATF 16949, VDA 6.3, PPAP; ISO 21448 (SOTIF).',
            targetStakeholder: 'Plant Quality Director',
            relatedCrossPractices: ['5.7 Supply Chain', '5.13 Data Integration']
          },
          {
            code: '6.1.1.2',
            title: 'Line-Side Supply & Traceability',
            slug: 'line-side-supply-traceability',
            overview: 'Real-time parts containment and MES/ERP integration preventing assembly line stoppages.',
            solutionAcceleration: 'MES/ERP traceability connectors, containment playbook; quality team runs audits.',
            kpisBanked: 'Line-stoppage minutes, containment cost, warranty recovery.',
            timeToValue: '14–20 wk',
            valueAssurance: 'IATF 16949 traceability, UNECE R155.',
            targetStakeholder: 'VP Operations',
            relatedCrossPractices: ['5.7 Supply Chain', '5.8 Demand Chain']
          },
          {
            code: '6.1.1.3',
            title: 'Connected Vehicle & Fleet Intelligence',
            slug: 'connected-vehicle-fleet-intelligence',
            overview: 'In-vehicle edge telemetry models identifying warranty anomalies and optimizing fleet reliability.',
            solutionAcceleration: 'Telemetry reference stack, on-device inference template; client data team owns models.',
            kpisBanked: 'Warranty cost per vehicle, uptime, service conversion.',
            timeToValue: '16–24 wk',
            valueAssurance: 'UNECE R155/R156, ISO/SAE 21434, GDPR; Annex I high-risk 2028.',
            targetStakeholder: 'VP Connected Vehicle',
            relatedCrossPractices: ['5.11 Cybersecurity', '5.9 CRM']
          }
        ]
      },
      {
        code: '6.1.2',
        title: 'Electronics & Semiconductor Manufacturing',
        practiceAreas: [
          {
            code: '6.1.2.1',
            title: 'SMT Line Vision QC',
            slug: 'smt-line-vision-qc',
            overview: 'Sub-10ms AOI vision inspection eliminating false calls and component misalignments on SMT boards.',
            solutionAcceleration: 'AOI augmentation kit, golden-board library; line engineers tune thresholds.',
            kpisBanked: 'False-call rate, scrap, rework minutes.',
            timeToValue: '8–12 wk',
            valueAssurance: 'IPC-A-610, ISO 9001, PPAP.',
            targetStakeholder: 'Plant Operations Lead',
            relatedCrossPractices: ['5.13 Data Integration', '5.14 CIO Ops']
          },
          {
            code: '6.1.2.2',
            title: 'FPY / OEE Optimization',
            slug: 'fpy-oee-optimization',
            overview: 'Continuous statistical process control (SPC) optimization across fab tools to maximize First Pass Yield.',
            solutionAcceleration: 'Tool-state connector pack, SPC guardrail templates; process engineers own loops.',
            kpisBanked: 'FPY points, OEE, scrap cost.',
            timeToValue: '12–18 wk',
            valueAssurance: 'SPC control plans, ISO 9001 change control.',
            targetStakeholder: 'VP Manufacturing Engineering',
            relatedCrossPractices: ['5.4 AI FinOps', '5.14 Tech Ops']
          },
          {
            code: '6.1.2.3',
            title: 'Fab IP Protection & Secure Process Control',
            slug: 'fab-ip-protection-secure-process-control',
            overview: 'Air-gapped and sovereign model execution protecting proprietary silicon lithography and recipe IP.',
            solutionAcceleration: 'Air-gapped inference blueprint, attestation toolkit; fab IT owns key custody.',
            kpisBanked: 'IP-loss exposure, audit findings closed, data sharing enabled.',
            timeToValue: '14–20 wk',
            valueAssurance: 'SEMI E187, ISO 27001, EAR/ECCN, NIST 800-171.',
            targetStakeholder: 'CISO / Fab IT Director',
            relatedCrossPractices: ['5.11 Cybersecurity', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.1.3',
        title: 'Industrial Machinery & Capital Equipment',
        practiceAreas: [
          {
            code: '6.1.3.1',
            title: 'Configure-to-Order Engineering Copilot',
            slug: 'configure-to-order-engineering-copilot',
            overview: 'Accelerates custom equipment design quoting by validating BOM rules and PLM compatibility.',
            solutionAcceleration: 'Configuration-rules RAG kit, BOM connector; engineering owns rule curation.',
            kpisBanked: 'Engineering hours per quote, quote cycle, rework.',
            timeToValue: '10–14 wk',
            valueAssurance: 'ISO 9001 design control, Machinery Reg 2023/1230, PLM audit.',
            targetStakeholder: 'VP Engineering',
            relatedCrossPractices: ['5.5 RevOps', '5.12 Knowledge Fabric']
          },
          {
            code: '6.1.3.2',
            title: 'Field Service & Warranty Intelligence',
            slug: 'field-service-warranty-intelligence',
            overview: 'Provides offline-capable diagnostic assistance for heavy equipment technicians in remote field sites.',
            solutionAcceleration: 'Case-reasoning library, offline copilot app; service ops owns content.',
            kpisBanked: 'First-time-fix, truck rolls avoided, warranty leakage.',
            timeToValue: '12–18 wk',
            valueAssurance: 'ISO 9001 service records, on-site safety, GDPR.',
            targetStakeholder: 'VP Aftermarket Services',
            relatedCrossPractices: ['5.9 CRM', '5.6 Growth']
          },
          {
            code: '6.1.3.3',
            title: 'Supplier Quality & Incoming Inspection',
            slug: 'supplier-quality-incoming-inspection',
            overview: 'Automates certificate of conformance (CoC) verification and PPAP documentation extraction.',
            solutionAcceleration: 'CoC/PPAP extraction pack, sampling templates; supplier QA owns scorecards.',
            kpisBanked: 'Inspection cost per lot, escapes, chargeback recovery.',
            timeToValue: '8–12 wk',
            valueAssurance: 'ISO 9001 / IATF supplier control, PPAP.',
            targetStakeholder: 'Head of Quality Assurance',
            relatedCrossPractices: ['5.7 Supply Chain', '5.2 ESG']
          }
        ]
      },
      {
        code: '6.1.4',
        title: 'White Goods, HVAC & Consumer Durables',
        practiceAreas: [
          {
            code: '6.1.4.1',
            title: 'Appearance & Function Test Vision',
            slug: 'appearance-function-test-vision',
            overview: 'Multimodal vision inspection for surface scratches, paint blemishes, and functional acoustic hum test.',
            solutionAcceleration: 'Cosmetic-defect library by finish, test-signature models; QA owns limits.',
            kpisBanked: 'Scrap, rework, dead-on-arrival rate.',
            timeToValue: '8–12 wk',
            valueAssurance: 'IEC 60335 evidence, ISO 9001, energy label 2017/1369.',
            targetStakeholder: 'Plant Quality Manager',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.1.4.2',
            title: 'Demand Sensing & Mix Planning',
            slug: 'demand-sensing-mix-planning',
            overview: 'Granular SKU forecasting predicting consumer appetite for specific appliance finishes and capacities.',
            solutionAcceleration: 'Demand-sensing notebooks, promo feature library; planning owns overrides.',
            kpisBanked: 'Forecast bias, inventory days, obsolete stock.',
            timeToValue: '12–16 wk',
            valueAssurance: 'Model documentation, competition-law care, GDPR.',
            targetStakeholder: 'VP Demand Planning',
            relatedCrossPractices: ['5.8 Demand Chain', '5.5 RevOps']
          },
          {
            code: '6.1.4.3',
            title: 'Eco-Design & Energy-Label Dossier',
            slug: 'eco-design-energy-label-dossier',
            overview: 'Automates energy efficiency calculations and regulatory dossier preparation for global appliance sales.',
            solutionAcceleration: 'Per-market rule base, dossier templates; compliance owns updates.',
            kpisBanked: 'Compliance hours per SKU, time-to-market.',
            timeToValue: '10–14 wk',
            valueAssurance: 'ESPR 2024/1781, 2017/1369, F-gas 2024/573, CSRD.',
            targetStakeholder: 'Head of Regulatory Affairs',
            relatedCrossPractices: ['5.2 ESG', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.1.5',
        title: 'Textiles, Apparel & Footwear',
        practiceAreas: [
          {
            code: '6.1.5.1',
            title: 'Fabric Defect & Shade-Band Vision',
            slug: 'fabric-defect-shade-band-vision',
            overview: 'High-speed roll inspection identifying weaving flaws, yarn snags, and subtle color shade variances.',
            solutionAcceleration: 'Fabric-defect library, four-point scoring kit; mill QA owns grading.',
            kpisBanked: 'Inspection cost per metre, cut waste.',
            timeToValue: '8–12 wk',
            valueAssurance: 'ISO 9001, four-point standard, buyer QA manuals.',
            targetStakeholder: 'Mill Operations Director',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.1.5.2',
            title: 'Cut-Plan & Marker Optimization',
            slug: 'cut-plan-marker-optimization',
            overview: 'Nesting algorithms maximizing fabric utilization and minimizing scrap per garment cut plan.',
            solutionAcceleration: 'Marker optimizer, defect-map integration; CAD team owns nesting.',
            kpisBanked: 'Fabric utilisation, waste kg, cost per garment.',
            timeToValue: '6–10 wk',
            valueAssurance: 'Lot traceability, buyer compliance evidence.',
            targetStakeholder: 'Production Planning Lead',
            relatedCrossPractices: ['5.4 AI FinOps']
          },
          {
            code: '6.1.5.3',
            title: 'Traceability & Forced-Labour Compliance',
            slug: 'traceability-forced-labour-compliance',
            overview: 'Verifies cotton origin and farm-to-garment custody documents to clear border detention hurdles.',
            solutionAcceleration: 'Supplier document graph, audit-pack templates; sourcing owns evidence.',
            kpisBanked: 'Audit hours, detention risk, order qualification.',
            timeToValue: '12–20 wk',
            valueAssurance: 'CSDDD 2024/1760, UFLPA, OECD guidance, EUDR.',
            targetStakeholder: 'VP Ethical Sourcing',
            relatedCrossPractices: ['5.2 ESG', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.1.6',
        title: 'Metals, Precision Components & Fabrication',
        practiceAreas: [
          {
            code: '6.1.6.1',
            title: 'Furnace, Mill & Caster Anomaly Detection',
            slug: 'furnace-mill-caster-anomaly-detection',
            overview: 'Monitors thermal profiles and vibration telemetry in blast furnaces and continuous casting machines.',
            solutionAcceleration: 'Physics-informed model library, historian connectors; metallurgists own limits.',
            kpisBanked: 'Downtime hours, yield, energy per tonne.',
            timeToValue: '14–20 wk',
            valueAssurance: 'ISO 55000, IEC 61508/61511, ISO 45001.',
            targetStakeholder: 'VP Steel Operations',
            relatedCrossPractices: ['5.14 CIO Ops', '5.4 FinOps']
          },
          {
            code: '6.1.6.2',
            title: 'Dimensional & NDT Vision',
            slug: 'dimensional-ndt-vision',
            overview: 'Sub-millimeter laser profile and radiographic vision inspection for forged aerospace and industrial parts.',
            solutionAcceleration: 'NDT vision kit, acceptance-criteria config; Level II staff own calls.',
            kpisBanked: 'Scrap, rework, inspection throughput, escapes.',
            timeToValue: '8–12 wk',
            valueAssurance: 'ISO 9712, ASME/ASTM criteria, customer specs.',
            targetStakeholder: 'NDT Level III Quality Head',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.1.6.3',
            title: 'Energy per Tonne & Emissions Accounting',
            slug: 'energy-tonne-emissions-accounting',
            overview: 'Tracks kilowatt-hour and coke consumption per produced coil to minimize EU ETS carbon taxes.',
            solutionAcceleration: 'Metering reconciliation pack, ETS report templates; energy team owns data.',
            kpisBanked: 'Energy cost per tonne, ETS allowance exposure.',
            timeToValue: '10–16 wk',
            valueAssurance: 'EU ETS MRV, ISO 14064, CSRD/ESRS E1, ISO 50001.',
            targetStakeholder: 'Chief Sustainability Officer',
            relatedCrossPractices: ['5.2 ESG', '5.4 FinOps']
          }
        ]
      }
    ]
  },
  {
    id: 'financial-services',
    code: '6.2',
    title: 'Financial Services & Insurance',
    shortTitle: 'Financial Services',
    poolSize: '~$15T revenue',
    buyer: 'COO, CRO, Chief Underwriting Officer',
    bankedAgainst: 'Operations, Loss Provisions, Regulatory Change',
    tier: 1,
    medianTtv: '14 wk',
    description: 'Autonomous AML alert triage, explainable credit scoring, claims subrogation, and automated regulatory filings.',
    subVerticals: [
      {
        code: '6.2.1',
        title: 'Banking',
        practiceAreas: [
          {
            code: '6.2.1.1',
            title: 'Agentic KYC / AML Operations',
            slug: 'agentic-kyc-aml-operations',
            overview: 'Performs multi-source transaction anomaly triage, PEP matching, and false-positive reduction.',
            solutionAcceleration: 'Alert-triage agent kit, typology library; AML ops owns rule tuning.',
            kpisBanked: 'Alerts per analyst per day, false positives, onboarding time.',
            timeToValue: '12–18 wk',
            valueAssurance: 'FATF, AMLD6, model risk (SR 11-7 style).',
            targetStakeholder: 'Head of AML Compliance',
            relatedCrossPractices: ['5.1 GRC', '5.11 Cybersecurity']
          },
          {
            code: '6.2.1.2',
            title: 'Credit & Risk Intelligence',
            slug: 'credit-risk-intelligence',
            overview: 'Generates mathematically compliant risk scorecards with deterministic adverse action reason codes.',
            solutionAcceleration: 'Scorecard challenge harness, reason-code templates; risk owns validation.',
            kpisBanked: 'Cost per decision, turnaround, loss rate.',
            timeToValue: '16–24 wk',
            valueAssurance: 'AI Act Annex III high-risk (2 Dec 2027), Basel IRB, IFRS 9, ECOA, GDPR Art 22.',
            targetStakeholder: 'Chief Risk Officer',
            relatedCrossPractices: ['5.1 GRC', '5.12 Knowledge Fabric']
          },
          {
            code: '6.2.1.3',
            title: 'Reg-Reporting & Disclosure Automation',
            slug: 'reg-reporting-disclosure-automation',
            overview: 'Aggregates multi-entity balance sheets into XBRL-compliant filings for central banks and supervisory authorities.',
            solutionAcceleration: 'Report templates per regime, XBRL mapper; reporting team owns close.',
            kpisBanked: 'Reporting hours, rejection rate, cycle time.',
            timeToValue: '10–16 wk',
            valueAssurance: 'COREP/FINREP, Basel III, DORA, BCBS 239.',
            targetStakeholder: 'Head of Regulatory Reporting',
            relatedCrossPractices: ['5.13 Data Integration', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.2.2',
        title: 'Insurance',
        practiceAreas: [
          {
            code: '6.2.2.1',
            title: 'Claims Triage, Fraud & Subrogation',
            slug: 'claims-triage-fraud-subrogation',
            overview: 'Parses first-notice-of-loss documents, detects organized fraud rings, and automates insurer subrogation recovery.',
            solutionAcceleration: 'FNOL intake pack, fraud-network features; claims ops owns referrals.',
            kpisBanked: 'Cycle time, LAE ratio, leakage, recovery.',
            timeToValue: '10–16 wk',
            valueAssurance: 'Solvency II, IFRS 17, Consumer Duty, GDPR.',
            targetStakeholder: 'Chief Claims Officer',
            relatedCrossPractices: ['5.15 Legal Ops', '5.11 Cybersecurity']
          },
          {
            code: '6.2.2.2',
            title: 'Underwriting Co-Pilots',
            slug: 'underwriting-co-pilots',
            overview: 'Synthesizes complex broker slips and commercial submission portfolios against underwriter appetite rules.',
            solutionAcceleration: 'Submission parser, appetite rules engine; underwriting owns referrals.',
            kpisBanked: 'Quote turnaround, hit rate, expense ratio.',
            timeToValue: '12–18 wk',
            valueAssurance: 'AI Act Annex III (life and health, 2 Dec 2027), delegated authority.',
            targetStakeholder: 'Chief Underwriting Officer',
            relatedCrossPractices: ['5.12 Knowledge Fabric', '5.5 RevOps']
          },
          {
            code: '6.2.2.3',
            title: 'Actuarial Model Assurance',
            slug: 'actuarial-model-assurance',
            overview: 'Automates challenger model backtesting, reserving assumptions verification, and sensitivity stress runs.',
            solutionAcceleration: 'Validation harness, challenger benchmark suite; model risk owns sign-off.',
            kpisBanked: 'Validation cycle, audit findings, capital efficiency.',
            timeToValue: '12–20 wk',
            valueAssurance: 'SR 11-7, PRA SS1/23, Solvency II Pillar 2, ISO 42001.',
            targetStakeholder: 'Chief Actuary / Model Risk Head',
            relatedCrossPractices: ['5.1 GRC', '5.4 FinOps']
          }
        ]
      },
      {
        code: '6.2.3',
        title: 'Capital Markets & Asset Management',
        practiceAreas: [
          {
            code: '6.2.3.1',
            title: 'Research & Diligence Agents',
            slug: 'research-diligence-agents',
            overview: 'Synthesizes earnings transcripts, financial filings, and industry datasets with verifiable citation audit trails.',
            solutionAcceleration: 'Citation-layer diligence kit, comparables library; analysts own conclusions.',
            kpisBanked: 'Analyst hours per deal, coverage.',
            timeToValue: '8–12 wk',
            valueAssurance: 'MAR, MNPI controls, research independence.',
            targetStakeholder: 'Head of Equity / Credit Research',
            relatedCrossPractices: ['5.12 Knowledge Fabric']
          },
          {
            code: '6.2.3.2',
            title: 'Trade Surveillance & Conduct Analytics',
            slug: 'trade-surveillance-conduct-analytics',
            overview: 'Correlates trade order books with communications logs to flag spoofing, front-running, and market abuse.',
            solutionAcceleration: 'Surveillance lexicon and model library; compliance owns dispositions.',
            kpisBanked: 'False positives, closure time, coverage.',
            timeToValue: '12–18 wk',
            valueAssurance: 'MAR, MiFID II, CFTC/FCA, record-keeping.',
            targetStakeholder: 'Head of Market Conduct Compliance',
            relatedCrossPractices: ['5.1 GRC', '5.11 Cyber']
          },
          {
            code: '6.2.3.3',
            title: 'Model Risk & Valuation Oversight',
            slug: 'model-risk-valuation-oversight',
            overview: 'Verifies pricing algorithms, VaR models, and illiquid Level 3 asset valuations for audit defense.',
            solutionAcceleration: 'Model inventory schema, backtest automation; validation owns findings.',
            kpisBanked: 'Validation throughput, exceptions closed.',
            timeToValue: '10–16 wk',
            valueAssurance: 'SR 11-7, PRA SS1/23, IFRS 13.',
            targetStakeholder: 'Head of Model Risk Governance',
            relatedCrossPractices: ['5.1 GRC', '5.4 FinOps']
          }
        ]
      },
      {
        code: '6.2.4',
        title: 'Payments & Specialty Finance',
        practiceAreas: [
          {
            code: '6.2.4.1',
            title: 'Dispute & Chargeback Automation',
            slug: 'dispute-chargeback-automation',
            overview: 'Automates card scheme representment packages and gathers compelling evidence to recover revenue.',
            solutionAcceleration: 'Evidence templates per scheme, representment agent; disputes team owns cases.',
            kpisBanked: 'Cost per dispute, win rate, resolution time.',
            timeToValue: '8–12 wk',
            valueAssurance: 'Scheme rules, PSD2/PSD3, Reg E/Z.',
            targetStakeholder: 'VP Payment Operations',
            relatedCrossPractices: ['5.15 Legal Ops', '5.9 CRM']
          },
          {
            code: '6.2.4.2',
            title: 'APP Fraud & Scam Detection',
            slug: 'app-fraud-scam-detection',
            overview: 'Interdicts Authorised Push Payment (APP) scams and money mule accounts prior to irrevocable transfers.',
            solutionAcceleration: 'Mule-graph feature store, interdiction playbook; fraud ops owns thresholds.',
            kpisBanked: 'Fraud loss bps, false declines, reimbursement cost.',
            timeToValue: '12–16 wk',
            valueAssurance: 'UK APP rules, PSD2, GDPR, DORA.',
            targetStakeholder: 'Head of Fraud Prevention',
            relatedCrossPractices: ['5.11 Cybersecurity', '5.1 GRC']
          },
          {
            code: '6.2.4.3',
            title: 'Scheme Compliance & Interchange Optimization',
            slug: 'scheme-compliance-interchange-optimization',
            overview: 'Optimizes interchange routing and ensures compliance with Visa, Mastercard, and national payment rails.',
            solutionAcceleration: 'Rule tracker, fee reconciliation kit; finance ops owns recovery.',
            kpisBanked: 'Interchange leakage, penalties avoided.',
            timeToValue: '10–14 wk',
            valueAssurance: 'Scheme mandates, ISO 8583 / 20022.',
            targetStakeholder: 'Head of Settlement & Clearing',
            relatedCrossPractices: ['5.4 FinOps', '5.13 Data Integration']
          }
        ]
      }
    ]
  },
  {
    id: 'retail',
    code: '6.3',
    title: 'Retail, Wholesale & Consumer',
    shortTitle: 'Retail & Consumer',
    poolSize: '~$25–28T retail; ~$10T agrifood',
    buyer: 'COO, Chief Commercial Officer, Supply Chain Director',
    bankedAgainst: 'Gross Margin, Shrink, Markdown',
    tier: 2,
    medianTtv: '10 wk',
    description: 'Dynamic assortment and markdown optimization, store shelf vision, trade promotion ROI, and farm traceability.',
    subVerticals: [
      {
        code: '6.3.1',
        title: 'Grocery & Omnichannel Retail',
        practiceAreas: [
          {
            code: '6.3.1.1',
            title: 'Assortment, Price & Markdown Agents',
            slug: 'assortment-price-markdown-agents',
            overview: 'Optimizes store-level price elasticity and dynamic clearance markdowns to maximize gross margin.',
            solutionAcceleration: 'Elasticity library, price guardrail templates; commercial owns ladders.',
            kpisBanked: 'Gross margin, sell-through, markdown %.',
            timeToValue: '8–12 wk',
            valueAssurance: 'Competition law on pricing algorithms, consumer law, GDPR.',
            targetStakeholder: 'Chief Commercial Officer',
            relatedCrossPractices: ['5.5 RevOps', '5.8 Demand Chain']
          },
          {
            code: '6.3.1.2',
            title: 'Shelf & Store Ops Vision',
            slug: 'shelf-store-ops-vision',
            overview: 'Computer vision cameras and robot scanners detecting out-of-stocks and planogram compliance breaches.',
            solutionAcceleration: 'Shelf-vision kit, planogram parser; store ops owns corrective actions.',
            kpisBanked: 'On-shelf availability, audit hours.',
            timeToValue: '8–12 wk',
            valueAssurance: 'GDPR/CCTV law, works council, monitoring rules.',
            targetStakeholder: 'VP Retail Operations',
            relatedCrossPractices: ['5.13 Data Integration', '5.3 Workforce']
          },
          {
            code: '6.3.1.3',
            title: 'Fulfilment & Last-Mile Orchestration',
            slug: 'fulfilment-last-mile-orchestration',
            overview: 'Dynamic micro-fulfilment slotting, vehicle routing, and delivery promise scheduling.',
            solutionAcceleration: 'Routing and slotting optimizers, re-plan playbook; fulfilment owns execution.',
            kpisBanked: 'Cost per order, on-time, substitution rate.',
            timeToValue: '10–14 wk',
            valueAssurance: 'Driver hours rules, GDPR, distance-selling rights.',
            targetStakeholder: 'Head of Omnichannel Logistics',
            relatedCrossPractices: ['5.7 Supply Chain', '5.8 Demand Chain']
          }
        ]
      },
      {
        code: '6.3.2',
        title: 'Branded Consumer Goods',
        practiceAreas: [
          {
            code: '6.3.2.1',
            title: 'Trade Promotion ROI & RGM',
            slug: 'trade-promotion-roi-rgm',
            overview: 'Quantifies post-promotion volume lift and aligns retailer co-op funding with net brand revenue.',
            solutionAcceleration: 'Promo-lift measurement kit, funding guardrails; RGM owns spend decisions.',
            kpisBanked: 'Trade efficiency, promo ROI, price realisation.',
            timeToValue: '10–14 wk',
            valueAssurance: 'Revenue recognition, competition-law limits.',
            targetStakeholder: 'VP Revenue Growth Management',
            relatedCrossPractices: ['5.5 RevOps', '5.6 Growth']
          },
          {
            code: '6.3.2.2',
            title: 'Demand Forecasting & Supply Planning',
            slug: 'cpg-demand-forecasting-supply-planning',
            overview: 'Multi-horizon demand sensing integrating promotional calendars, store POS data, and distributor inventory.',
            solutionAcceleration: 'Forecast pipeline, promo feature library; planning owns overrides.',
            kpisBanked: 'Forecast accuracy, inventory days, OTIF.',
            timeToValue: '12–18 wk',
            valueAssurance: 'S&OP governance, SOX, override audit.',
            targetStakeholder: 'Head of Supply Planning',
            relatedCrossPractices: ['5.8 Demand Chain', '5.7 Supply Chain']
          },
          {
            code: '6.3.2.3',
            title: 'Packaging & Label Compliance',
            slug: 'packaging-label-compliance',
            overview: 'Verifies multilingual ingredient declarations, allergen warnings, and recyclable packaging claims.',
            solutionAcceleration: 'Per-market label rule base, artwork checker; regulatory owns sign-off.',
            kpisBanked: 'Artwork cycle, right-first-time, recall risk.',
            timeToValue: '8–12 wk',
            valueAssurance: 'FIC 1169/2011, FDA labelling, HFSS, e-labelling.',
            targetStakeholder: 'VP Regulatory Compliance',
            relatedCrossPractices: ['5.2 ESG', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.3.3',
        title: 'Agrifood & Food Processing',
        practiceAreas: [
          {
            code: '6.3.3.1',
            title: 'Yield & Input Optimization',
            slug: 'yield-input-optimization',
            overview: 'Fuses soil sensor data, weather forecasts, and satellite imagery to optimize irrigation and fertilizer usage.',
            solutionAcceleration: 'Agronomic feature library, field-data connectors; agronomy owns advice.',
            kpisBanked: 'Yield per hectare, input cost, water use.',
            timeToValue: '20–30 wk',
            valueAssurance: 'Equipment safety, CAP rules, data ownership.',
            targetStakeholder: 'VP Agronomy / Agricultural Operations',
            relatedCrossPractices: ['5.2 ESG', '5.13 Data Integration']
          },
          {
            code: '6.3.3.2',
            title: 'Grading & Quality Vision',
            slug: 'grading-quality-vision',
            overview: 'High-throughput optical sorting classifying produce ripeness, defects, and USDA/EU market grades.',
            solutionAcceleration: 'Optical grading kit, defect library; QA owns grade standards.',
            kpisBanked: 'Grade-out yield, waste, throughput.',
            timeToValue: '8–12 wk',
            valueAssurance: 'HACCP, ISO 22000 / FSSC 22000, customer specs.',
            targetStakeholder: 'Plant Quality Director',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.3.3.3',
            title: 'Farm-to-Fork Traceability',
            slug: 'farm-to-fork-traceability',
            overview: 'Maintains batch custody records across harvesters, processing plants, and cold chain distribution.',
            solutionAcceleration: 'Lot-custody graph, recall simulator; QA owns traceability records.',
            kpisBanked: 'Recall scope and time, audit cost.',
            timeToValue: '14–20 wk',
            valueAssurance: 'FSMA 204, EU 178/2002, EUDR, GFSI.',
            targetStakeholder: 'Chief Food Safety Officer',
            relatedCrossPractices: ['5.7 Supply Chain', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.3.4',
        title: 'Hospitality, Travel & QSR',
        practiceAreas: [
          {
            code: '6.3.4.1',
            title: 'Revenue & Dynamic Pricing Agents',
            slug: 'hospitality-revenue-dynamic-pricing',
            overview: 'Dynamic rate fences and length-of-stay pricing across room inventories and flight seats.',
            solutionAcceleration: 'Demand models per property, fence-rule templates; revenue team owns overrides.',
            kpisBanked: 'RevPAR / RASK, occupancy, ADR.',
            timeToValue: '8–12 wk',
            valueAssurance: 'Consumer protection, price transparency, RMS audit.',
            targetStakeholder: 'VP Revenue Management',
            relatedCrossPractices: ['5.5 RevOps']
          },
          {
            code: '6.3.4.2',
            title: 'Guest Service & Recovery Agents',
            slug: 'guest-service-recovery-agents',
            overview: 'Omnichannel virtual concierge handling booking amendments, dietary preferences, and instant service recovery vouchers.',
            solutionAcceleration: 'Service-agent kit with escalation design; contact centre owns content.',
            kpisBanked: 'Cost per contact, CSAT, resolution time.',
            timeToValue: '6–10 wk',
            valueAssurance: 'GDPR, accessibility (EAA), PCI DSS.',
            targetStakeholder: 'Head of Guest Experience',
            relatedCrossPractices: ['5.9 CRM', '5.10 Brand Reputation']
          },
          {
            code: '6.3.4.3',
            title: 'Food Safety & Brand Standards',
            slug: 'food-safety-brand-standards',
            overview: 'Vision verification of food prep hygiene, holding temperature logs, and franchisee audit compliance.',
            solutionAcceleration: 'Vision audit kit, checklist engine; operations owns corrective actions.',
            kpisBanked: 'Audit score, incidents, franchise compliance.',
            timeToValue: '8–12 wk',
            valueAssurance: 'HACCP, local health codes, franchise agreements.',
            targetStakeholder: 'VP Operations & Franchise Standards',
            relatedCrossPractices: ['5.1 GRC', '5.6 Growth']
          }
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    code: '6.4',
    title: 'Healthcare & Life Sciences',
    shortTitle: 'Healthcare & Life Sciences',
    poolSize: '~$10T spend',
    buyer: 'CMO / CMIO, CIO, Quality & Regulatory Heads',
    bankedAgainst: 'Clinical Operations, R&D, Regulatory Compliance',
    tier: 1,
    medianTtv: '15 wk',
    description: 'Ambient clinical documentation, pharmacovigilance signal detection, diagnostic imaging triage, and prior authorization.',
    subVerticals: [
      {
        code: '6.4.1',
        title: 'Hospitals & Health Systems',
        practiceAreas: [
          {
            code: '6.4.1.1',
            title: 'Clinical Documentation Agents',
            slug: 'clinical-documentation-agents',
            overview: 'Ambient listening extracting structured EHR clinical notes with mandatory clinician sign-off.',
            solutionAcceleration: 'Ambient-capture kit, specialty note templates; clinicians own sign-off.',
            kpisBanked: 'Minutes per encounter, coding accuracy, denial rate.',
            timeToValue: '12–16 wk',
            valueAssurance: 'HIPAA/GDPR, clinician sign-off, AI Act transparency, MDR if device function.',
            targetStakeholder: 'Chief Medical Information Officer',
            relatedCrossPractices: ['5.3 Workforce', '5.12 Knowledge Fabric']
          },
          {
            code: '6.4.1.2',
            title: 'Capacity, Flow & OR Scheduling',
            slug: 'capacity-flow-or-scheduling',
            overview: 'Predicts inpatient discharge velocity, boarding bottlenecks, and optimizes operating theater block scheduling.',
            solutionAcceleration: 'Discharge models, OR block optimizer; operations owns the daily plan.',
            kpisBanked: 'Length of stay, boarding hours, theatre utilisation.',
            timeToValue: '14–20 wk',
            valueAssurance: 'Clinical governance, GDPR, documented validation.',
            targetStakeholder: 'Chief Operating Officer / VP Surgical Services',
            relatedCrossPractices: ['5.14 CIO Ops']
          },
          {
            code: '6.4.1.3',
            title: 'Clinical AI Safety & Surveillance',
            slug: 'clinical-ai-safety-surveillance',
            overview: 'Continuous monitoring of in-hospital diagnostic algorithms for demographic bias and performance drift.',
            solutionAcceleration: 'Monitoring harness, model inventory schema; clinical engineering owns review.',
            kpisBanked: 'Adverse events avoided, audit readiness.',
            timeToValue: '10–16 wk',
            valueAssurance: 'FDA SaMD; ONC HTI-1; MDR/IEC 62304/ISO 14971.',
            targetStakeholder: 'Director of Clinical Safety & Governance',
            relatedCrossPractices: ['5.1 GRC', '5.11 Cyber']
          }
        ]
      },
      {
        code: '6.4.2',
        title: 'Pharma & Biotech',
        practiceAreas: [
          {
            code: '6.4.2.1',
            title: 'Pharmacovigilance & Signal Detection',
            slug: 'pharmacovigilance-signal-detection',
            overview: 'Automates intake of Individual Case Safety Reports (ICSRs) and screens medical literature for adverse events.',
            solutionAcceleration: 'ICSR intake pack, literature screeners; PV team owns case decisions.',
            kpisBanked: 'Cost per case, on-time compliance, signal lead time.',
            timeToValue: '12–18 wk',
            valueAssurance: 'ICH E2B(R3)/E2D, GVP, 21 CFR 314.80.',
            targetStakeholder: 'Head of Pharmacovigilance & Safety',
            relatedCrossPractices: ['5.1 GRC', '5.12 Knowledge Fabric']
          },
          {
            code: '6.4.2.2',
            title: 'GxP Deviation & Batch Review',
            slug: 'gxp-deviation-batch-review',
            overview: 'Reviews pharmaceutical manufacturing electronic batch records to triage deviations and speed product release.',
            solutionAcceleration: 'Batch-review agent, deviation taxonomy; QA owns release.',
            kpisBanked: 'Batch release cycle, right-first-time, backlog.',
            timeToValue: '16–24 wk',
            valueAssurance: 'EU GMP Annex 11, 21 CFR Part 11, ICH Q10, ALCOA+.',
            targetStakeholder: 'VP Quality Assurance (Manufacturing)',
            relatedCrossPractices: ['5.13 Data Integration', '5.1 GRC']
          },
          {
            code: '6.4.2.3',
            title: 'Trial Feasibility & Site Selection',
            slug: 'trial-feasibility-site-selection',
            overview: 'Models real-world patient populations to select investigative trial sites with high recruitment success.',
            solutionAcceleration: 'Feasibility models, site-score library; clinical ops owns selection.',
            kpisBanked: 'Enrolment rate, start-up time, screen failures.',
            timeToValue: '10–16 wk',
            valueAssurance: 'ICH E6(R3), GDPR and consent, 21 CFR Part 11.',
            targetStakeholder: 'VP Clinical Development Operations',
            relatedCrossPractices: ['5.13 Data Integration', '5.5 RevOps']
          }
        ]
      },
      {
        code: '6.4.3',
        title: 'MedTech & Diagnostics',
        practiceAreas: [
          {
            code: '6.4.3.1',
            title: 'Diagnostic Imaging Triage',
            slug: 'diagnostic-imaging-triage',
            overview: 'Triages radiological worklists to flag suspected intracranial hemorrhages, pulmonary embolisms, and fractures.',
            solutionAcceleration: 'Imaging triage kit, worklist connectors; radiology owns prioritisation.',
            kpisBanked: 'Time to report critical findings, throughput.',
            timeToValue: '16–26 wk',
            valueAssurance: 'MDR/FDA clearance, IEC 62304, ISO 14971, clinical evaluation.',
            targetStakeholder: 'Chief of Radiology',
            relatedCrossPractices: ['5.11 Cyber', '5.1 GRC']
          },
          {
            code: '6.4.3.2',
            title: 'Regulatory Dossier Assembly',
            slug: 'medtech-regulatory-dossier-assembly',
            overview: 'Automates literature searches, predicate device comparisons, and 510(k)/PMA and EU MDR technical documentation.',
            solutionAcceleration: 'Dossier templates, predicate-search tools; regulatory affairs owns filings.',
            kpisBanked: 'Submission cycle, regulator questions, cost per file.',
            timeToValue: '12–20 wk',
            valueAssurance: 'FDA QSR/QMSR, MDR Annex II/III, ISO 13485.',
            targetStakeholder: 'VP Regulatory Affairs',
            relatedCrossPractices: ['5.1 GRC', '5.12 Knowledge Fabric']
          },
          {
            code: '6.4.3.3',
            title: 'QMS & Post-Market Surveillance',
            slug: 'qms-post-market-surveillance',
            overview: 'Extracts complaint adverse codes and auto-generates Periodic Safety Update Reports (PSUR).',
            solutionAcceleration: 'Complaint coding pack, PSUR templates; QA/RA owns filings.',
            kpisBanked: 'Complaint closure, audit findings, PMS cost.',
            timeToValue: '10–16 wk',
            valueAssurance: 'ISO 13485, MDR Chapter VII, 21 CFR 803.',
            targetStakeholder: 'Head of Quality Assurance & Vigilance',
            relatedCrossPractices: ['5.1 GRC']
          }
        ]
      },
      {
        code: '6.4.4',
        title: 'Payers & Public Health',
        practiceAreas: [
          {
            code: '6.4.4.1',
            title: 'Prior Auth & Utilization Review Agents',
            slug: 'prior-auth-utilization-review-agents',
            overview: 'Verifies clinical justification against payer medical policies to speed turnaround and eliminate improper denials.',
            solutionAcceleration: 'Criteria library, appeal templates; UM nurses own determinations.',
            kpisBanked: 'Turnaround, admin cost, avoidable denials.',
            timeToValue: '12–18 wk',
            valueAssurance: 'CMS rules, state insurance law, NCQA/URAC.',
            targetStakeholder: 'Chief Medical Officer / VP Utilization Management',
            relatedCrossPractices: ['5.9 CRM', '5.1 GRC']
          },
          {
            code: '6.4.4.2',
            title: 'Claims Integrity & Payment Accuracy',
            slug: 'claims-integrity-payment-accuracy',
            overview: 'Detects billing anomalies, upcoding, and unbundled claim submissions before funds disbursement.',
            solutionAcceleration: 'Anomaly library, provider profiling kit; SIU owns investigations.',
            kpisBanked: 'Improper payment rate, recovery.',
            timeToValue: '12–18 wk',
            valueAssurance: 'CMS programme integrity, FCA exposure, SOX.',
            targetStakeholder: 'Head of Special Investigations Unit (SIU)',
            relatedCrossPractices: ['5.11 Cyber', '5.4 FinOps']
          },
          {
            code: '6.4.4.3',
            title: 'Population Health & Benefits Navigation',
            slug: 'population-health-benefits-navigation',
            overview: 'Stratifies members by clinical risk profile to orchestrate preventative care interventions and close care gaps.',
            solutionAcceleration: 'Risk models, outreach content kit; care managers own engagement.',
            kpisBanked: 'HEDIS gap closure, cost per member, engagement.',
            timeToValue: '14–20 wk',
            valueAssurance: 'HIPAA, consent, fairness testing.',
            targetStakeholder: 'VP Population Health',
            relatedCrossPractices: ['5.9 CRM', '5.13 Data Integration']
          }
        ]
      }
    ]
  },
  {
    id: 'energy',
    code: '6.5',
    title: 'Energy, Utilities & Natural Resources',
    shortTitle: 'Energy & Utilities',
    poolSize: '~$9T revenue',
    buyer: 'COO, Chief Asset Officer, HSE Director',
    bankedAgainst: 'Reliability OpEx, Turnaround, Safety, Emissions',
    tier: 2,
    medianTtv: '18 wk',
    description: 'Grid dispatch and load balancing, refinery yield optimization, predictive pipeline asset integrity, and leak detection.',
    subVerticals: [
      {
        code: '6.5.1',
        title: 'Power Generation, Transmission & Distribution',
        practiceAreas: [
          {
            code: '6.5.1.1',
            title: 'Grid Load Balancing Agents',
            slug: 'grid-load-balancing-agents',
            overview: 'Forecasts renewable wind/solar swings and optimizes unit dispatch to stabilize high-voltage transmission grids.',
            solutionAcceleration: 'Forecast and dispatch toolkit, historian connectors; control room owns dispatch.',
            kpisBanked: 'Balancing cost, curtailment, forecast error.',
            timeToValue: '20–28 wk',
            valueAssurance: 'NERC CIP, IEC 61850/62351, EU EBGL.',
            targetStakeholder: 'Director of Grid Operations',
            relatedCrossPractices: ['5.11 Cyber', '5.14 CIO Ops']
          },
          {
            code: '6.5.1.2',
            title: 'Fault Location, Isolation & Restoration',
            slug: 'fault-location-isolation-restoration',
            overview: 'Automates distribution network fault detection and switching to minimize customer outage minutes (SAIDI/SAIFI).',
            solutionAcceleration: 'Fault-signature library, switching templates; network ops owns switching.',
            kpisBanked: 'SAIDI/SAIFI, customer minutes lost.',
            timeToValue: '20–30 wk',
            valueAssurance: 'Switching authority, IEC 61508, outage records.',
            targetStakeholder: 'Head of Distribution Network Ops',
            relatedCrossPractices: ['5.14 CIO Ops']
          },
          {
            code: '6.5.1.3',
            title: 'DER Orchestration & VPP',
            slug: 'der-orchestration-vpp',
            overview: 'Aggregates commercial batteries, solar arrays, and EV fleets into a unified Virtual Power Plant (VPP).',
            solutionAcceleration: 'Aggregation platform, market-bid toolkit; flexibility team owns bids.',
            kpisBanked: 'Flexibility revenue, peak shaving, deferral value.',
            timeToValue: '18–26 wk',
            valueAssurance: 'IEEE 1547, FERC 2222, EU market design.',
            targetStakeholder: 'Head of Energy Trading & Flexibility',
            relatedCrossPractices: ['5.4 FinOps', '5.5 RevOps']
          }
        ]
      },
      {
        code: '6.5.2',
        title: 'Oil, Gas & Chemicals',
        practiceAreas: [
          {
            code: '6.5.2.1',
            title: 'Process Safety & Anomaly Detection',
            slug: 'process-safety-anomaly-detection',
            overview: 'Continuous early-warning detection on chemical reactors to prevent safety upsets and unscheduled trips.',
            solutionAcceleration: 'Early-warning model library, alarm-rationalisation kit; console operators own response.',
            kpisBanked: 'Unplanned shutdowns, near-misses, alarm load.',
            timeToValue: '16–24 wk',
            valueAssurance: 'IEC 61511, OSHA PSM, Seveso III, API 754.',
            targetStakeholder: 'VP Operations & Process Safety',
            relatedCrossPractices: ['5.1 GRC', '5.14 CIO Ops']
          },
          {
            code: '6.5.2.2',
            title: 'Predictive Asset Integrity',
            slug: 'predictive-asset-integrity',
            overview: 'Risk-based inspection (RBI) modeling corrosion rates on pipelines, pressure vessels, and offshore structures.',
            solutionAcceleration: 'RBI integration pack, inspection ingestion; integrity team owns plans.',
            kpisBanked: 'Inspection cost, failure rate, turnaround scope.',
            timeToValue: '16–24 wk',
            valueAssurance: 'API 580/581, API 570, ISO 55000, PED.',
            targetStakeholder: 'Head of Asset Integrity',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.5.2.3',
            title: 'Refinery & Olefins Optimization',
            slug: 'refinery-olefins-optimization',
            overview: 'Digital unit twins adjusting reactor distillation cut points and energy intensity to maximize gross margin.',
            solutionAcceleration: 'Unit twins, LP advisory layer; process engineers own setpoints.',
            kpisBanked: 'Margin per barrel, energy intensity, give-away.',
            timeToValue: '20–30 wk',
            valueAssurance: 'Operating envelopes, custody metering, EU ETS.',
            targetStakeholder: 'Refinery General Manager',
            relatedCrossPractices: ['5.4 FinOps', '5.2 ESG']
          }
        ]
      },
      {
        code: '6.5.3',
        title: 'Mining & Metals',
        practiceAreas: [
          {
            code: '6.5.3.1',
            title: 'Autonomous Haulage & Dispatch',
            slug: 'autonomous-haulage-dispatch',
            overview: 'Supervises autonomous haul truck fleets and shovel loading to maximize tonnes moved per liter of fuel.',
            solutionAcceleration: 'Dispatch optimizer, autonomy supervision console; mine ops owns traffic.',
            kpisBanked: 'Tonnes per hour, cost per tonne, fuel per tonne.',
            timeToValue: '24–36 wk',
            valueAssurance: 'ISO 17757, MSHA, traffic management.',
            targetStakeholder: 'VP Mining Operations',
            relatedCrossPractices: ['5.7 Supply Chain', '5.14 CIO Ops']
          },
          {
            code: '6.5.3.2',
            title: 'Ore Grade & Recovery Prediction',
            slug: 'ore-grade-recovery-prediction',
            overview: 'Applies sensor fusion to mineral conveyors and flotation circuits to optimize metallurgical recovery yield.',
            solutionAcceleration: 'Grade models, sorter integration kit; metallurgy owns recovery calls.',
            kpisBanked: 'Recovery %, dilution, concentrate quality.',
            timeToValue: '16–24 wk',
            valueAssurance: 'JORC / NI 43-101, assay QA/QC.',
            targetStakeholder: 'Chief Metallurgist',
            relatedCrossPractices: ['5.13 Data Integration']
          },
          {
            code: '6.5.3.3',
            title: 'Tailings & Geotechnical Monitoring',
            slug: 'tailings-geotechnical-monitoring',
            overview: 'Analyzes satellite InSAR interferometry and piezometer sensors to detect early dam displacement and slope instability.',
            solutionAcceleration: 'InSAR pipeline, trigger-logic templates; geotech team owns evacuation.',
            kpisBanked: 'Risk exposure, monitoring cost.',
            timeToValue: '12–20 wk',
            valueAssurance: 'GISTM, dam safety law, independent review.',
            targetStakeholder: 'Head of Geotechnical Safety',
            relatedCrossPractices: ['5.1 GRC', '5.2 ESG']
          }
        ]
      },
      {
        code: '6.5.4',
        title: 'Water & Environmental Services',
        practiceAreas: [
          {
            code: '6.5.4.1',
            title: 'Leak Detection (NRW)',
            slug: 'leak-detection-nrw',
            overview: 'Pinpoints underground distribution pipe leaks using acoustic sensors and district metered area (DMA) flow anomalies.',
            solutionAcceleration: 'Acoustic and flow fusion kit, DMA templates; leakage team owns repair.',
            kpisBanked: 'Non-revenue water %, litres lost per day.',
            timeToValue: '10–16 wk',
            valueAssurance: 'Drinking water regulation, asset records, ISO 55000.',
            targetStakeholder: 'Head of Network Leakage',
            relatedCrossPractices: ['5.14 CIO Ops']
          },
          {
            code: '6.5.4.2',
            title: 'Treatment Dosing & Energy Optimization',
            slug: 'treatment-dosing-energy-optimization',
            overview: 'Adjusts chemical coagulant dosing and aeration blower energy in wastewater treatment plants.',
            solutionAcceleration: 'Dosing advisory, aeration control pack; plant ops owns setpoints.',
            kpisBanked: 'Chemical cost, kWh per megalitre, compliance margin.',
            timeToValue: '12–18 wk',
            valueAssurance: 'Water quality standards, IEC 61508, permit limits.',
            targetStakeholder: 'Operations Director',
            relatedCrossPractices: ['5.4 FinOps', '5.2 ESG']
          },
          {
            code: '6.5.4.3',
            title: 'Quality & Regulatory Reporting',
            slug: 'water-quality-regulatory-reporting',
            overview: 'Aggregates laboratory chemical assay tests and automates drinking water quality compliance filings.',
            solutionAcceleration: 'Sample ingestion, exceedance models; compliance team owns returns.',
            kpisBanked: 'Compliance hours, exceedances.',
            timeToValue: '8–14 wk',
            valueAssurance: 'SDWA, EU DWD 2020/2184, PFAS limits.',
            targetStakeholder: 'Environmental Compliance Officer',
            relatedCrossPractices: ['5.1 GRC', '5.2 ESG']
          }
        ]
      }
    ]
  },
  {
    id: 'mobility',
    code: '6.6',
    title: 'Mobility, Logistics & Infrastructure',
    shortTitle: 'Mobility & Logistics',
    poolSize: '~$13–15T construction; ~$6T logistics',
    buyer: 'COO, Network Director, Project Director',
    bankedAgainst: 'Cost per Move, Project Contingency, Delay Claims',
    tier: 2,
    medianTtv: '15 wk',
    description: 'Autonomous port gantry cranes, rail rolling stock maintenance, BIM 4D progress verification, and ANPR tolling.',
    subVerticals: [
      {
        code: '6.6.1',
        title: 'Ports, Airports & Logistics Hubs',
        practiceAreas: [
          {
            code: '6.6.1.1',
            title: 'Gantry Crane & AGV Autonomy',
            slug: 'gantry-crane-agv-autonomy',
            overview: 'Computer vision and perception retrofits for automated container handling in global maritime terminals.',
            solutionAcceleration: 'Perception-retrofit kit, yard twin, TOS event connector; terminal engineering owns maintenance.',
            kpisBanked: 'Moves per hour, idle %, safety incidents.',
            timeToValue: '20–28 wk',
            valueAssurance: 'EN 15011/13135, ISO 3691-4, ISPS, IEC 62443.',
            targetStakeholder: 'Terminal Engineering Director',
            relatedCrossPractices: ['5.7 Supply Chain', '5.14 CIO Ops']
          },
          {
            code: '6.6.1.2',
            title: 'TOS Integration & Berth Planning',
            slug: 'tos-integration-berth-planning',
            overview: 'Coordinates vessel berthing allocations with Terminal Operating Systems (TOS) to cut demurrage penalties.',
            solutionAcceleration: 'Event backbone templates, berth optimizer; planning owns allocations.',
            kpisBanked: 'Berth productivity, vessel turnaround, demurrage.',
            timeToValue: '16–24 wk',
            valueAssurance: 'ISO 28000, AEO, customs data integrity.',
            targetStakeholder: 'Head of Marine Operations',
            relatedCrossPractices: ['5.13 Data Integration', '5.7 Supply Chain']
          },
          {
            code: '6.6.1.3',
            title: 'Turnaround & Ground Handling Optimization',
            slug: 'turnaround-ground-handling-optimization',
            overview: 'Schedules airport airside baggage handlers, fueling trucks, and catering to prevent flight departure delays.',
            solutionAcceleration: 'Turnaround orchestrator, resource model; ops control owns decisions.',
            kpisBanked: 'On-time performance, turnaround minutes.',
            timeToValue: '14–20 wk',
            valueAssurance: 'ICAO Annex 14/19, EASA airside, SMS.',
            targetStakeholder: 'Airside Operations Director',
            relatedCrossPractices: ['5.3 Workforce', '5.14 CIO Ops']
          }
        ]
      },
      {
        code: '6.6.2',
        title: 'Rail & Urban Mass Transit',
        practiceAreas: [
          {
            code: '6.6.2.1',
            title: 'Predictive Maintenance on Rolling Stock',
            slug: 'predictive-maintenance-rolling-stock',
            overview: 'Monitors bogey bearing temperatures, pantograph wear, and wheel profiles to prevent trackside failures.',
            solutionAcceleration: 'Component model library, depot planner; fleet engineering owns work orders.',
            kpisBanked: 'Unscheduled maintenance, availability, cost per km.',
            timeToValue: '16–24 wk',
            valueAssurance: 'EN 50126/50128/50129, CSM-RA, ECM.',
            targetStakeholder: 'Head of Fleet Maintenance',
            relatedCrossPractices: ['5.13 Data Integration', '5.9 CRM']
          },
          {
            code: '6.6.2.2',
            title: 'Trackside Vision & Clearance Agents',
            slug: 'trackside-vision-clearance-agents',
            overview: 'Wayside optical cameras inspecting rail ballast, track switches, and overhead catenary clearances.',
            solutionAcceleration: 'Wayside vision kit, SIL-ready safety case; signalling owns alarms.',
            kpisBanked: 'Delay minutes, incidents, inspection cost.',
            timeToValue: '14–20 wk',
            valueAssurance: 'EN 50126 with SIL allocation, clearance rules.',
            targetStakeholder: 'Chief Track & Signalling Engineer',
            relatedCrossPractices: ['5.14 CIO Ops']
          },
          {
            code: '6.6.2.3',
            title: 'Schedule Adherence & Timetable Recovery',
            slug: 'schedule-adherence-timetable-recovery',
            overview: 'Dynamically re-regulates train headways and schedules recovery dispatch during transit disruptions.',
            solutionAcceleration: 'Prediction service, recovery playbooks; control centre owns regulation.',
            kpisBanked: 'Punctuality, delay minutes, recovery time.',
            timeToValue: '10–16 wk',
            valueAssurance: 'Capacity allocation, PRM accessibility.',
            targetStakeholder: 'Director of Rail Network Operations',
            relatedCrossPractices: ['5.3 Workforce', '5.9 CRM']
          }
        ]
      },
      {
        code: '6.6.3',
        title: 'Construction, Engineering & Real Assets',
        practiceAreas: [
          {
            code: '6.6.3.1',
            title: 'BIM / 4D Progress Verification',
            slug: 'bim-4d-progress-verification',
            overview: 'Compares drone 3D point-cloud scans against architectural BIM schedules to verify real physical progress.',
            solutionAcceleration: 'Scan-to-BIM pipeline, progress templates; site team owns certification.',
            kpisBanked: 'Progress accuracy, rework, dispute value.',
            timeToValue: '10–16 wk',
            valueAssurance: 'FIDIC/NEC/JCT measurement, ISO 19650.',
            targetStakeholder: 'Project Director / Commercial Lead',
            relatedCrossPractices: ['5.15 Legal Ops', '5.4 FinOps']
          },
          {
            code: '6.6.3.2',
            title: 'Site Safety Vision',
            slug: 'site-safety-vision',
            overview: 'Real-time jobsite cameras detecting missing PPE (helmets, vests), heavy machinery proximity, and trench hazards.',
            solutionAcceleration: 'Safety vision kit, zone config tools; HSE owns investigations.',
            kpisBanked: 'LTIFR, near-miss volume.',
            timeToValue: '6–10 wk',
            valueAssurance: 'OSHA 1926, ISO 45001, worker consultation.',
            targetStakeholder: 'Head of Health, Safety & Environment',
            relatedCrossPractices: ['5.1 GRC', '5.3 Workforce']
          },
          {
            code: '6.6.3.3',
            title: 'Claims, Variations & Contract Intelligence',
            slug: 'claims-variations-contract-intelligence',
            overview: 'Cross-checks project delay logs against FIDIC/NEC contract clauses to substantiate variation claims.',
            solutionAcceleration: 'Clause library, notice tracker; commercial team owns claims.',
            kpisBanked: 'Claims recovered, dispute cost, settlement time.',
            timeToValue: '8–12 wk',
            valueAssurance: 'FIDIC/NEC/JCT notices, privilege, limitation.',
            targetStakeholder: 'Commercial Director',
            relatedCrossPractices: ['5.15 Legal Ops']
          }
        ]
      },
      {
        code: '6.6.4',
        title: 'Road, Highway & Toll Operations',
        practiceAreas: [
          {
            code: '6.6.4.1',
            title: 'Pavement & Asset Condition Survey',
            slug: 'pavement-asset-condition-survey',
            overview: 'Vehicle-mounted LiDAR and high-res vision detecting road cracks, potholes, and rutting to prioritize resurfacing.',
            solutionAcceleration: 'Survey pipeline, deterioration models; asset team owns works programme.',
            kpisBanked: 'Survey cost per km, intervention timing.',
            timeToValue: '8–14 wk',
            valueAssurance: 'AASHTO and national manuals, value-for-money rules.',
            targetStakeholder: 'Highway Asset Director',
            relatedCrossPractices: ['5.14 CIO Ops']
          },
          {
            code: '6.6.4.2',
            title: 'Tolling, ANPR & Revenue Assurance',
            slug: 'tolling-anpr-revenue-assurance',
            overview: 'High-speed automatic number-plate recognition (ANPR) and vehicle classification minimizing toll evasion.',
            solutionAcceleration: 'ANPR stack, reconciliation kit; revenue assurance owns recovery.',
            kpisBanked: 'Revenue leakage, evasion rate.',
            timeToValue: '12–18 wk',
            valueAssurance: 'Vehicle-data rules, interoperability, audit.',
            targetStakeholder: 'Chief Toll Revenue Officer',
            relatedCrossPractices: ['5.5 RevOps', '5.1 GRC']
          },
          {
            code: '6.6.4.3',
            title: 'Incident Detection & Traffic Management',
            slug: 'incident-detection-traffic-management',
            overview: 'Fuses highway CCTV feeds with speed loop sensors to automatically trigger lane closures and emergency response.',
            solutionAcceleration: 'Fusion kit, incident playbooks; control room owns response.',
            kpisBanked: 'Detection time, clearance time, secondary incidents.',
            timeToValue: '10–14 wk',
            valueAssurance: 'Road safety law, DPIA, procurement rules.',
            targetStakeholder: 'Head of Traffic Management Operations',
            relatedCrossPractices: ['5.14 CIO Ops']
          }
        ]
      }
    ]
  },
  {
    id: 'tmt',
    code: '6.7',
    title: 'Technology, Media & Telecom',
    shortTitle: 'Tech, Media & Telecom',
    poolSize: '~$6T revenue',
    buyer: 'CTO, CIO, Head of Content Operations',
    bankedAgainst: 'Network OpEx, Infrastructure Efficiency, Content Cost',
    tier: 3,
    medianTtv: '12 wk',
    description: 'RAN intelligence and SON, GPU fleet scheduling, media content localization, and AI code review copilots.',
    subVerticals: [
      {
        code: '6.7.1',
        title: 'Telecom Operators & Networks',
        practiceAreas: [
          {
            code: '6.7.1.1',
            title: 'MEC / Edge AI Deployment',
            slug: 'mec-edge-ai-deployment',
            overview: 'Deploys low-latency microservices across Multi-Access Edge Computing (MEC) cellular towers.',
            solutionAcceleration: 'Edge inference blueprint, rollout automation; client platform team owns the fleet.',
            kpisBanked: 'Cost per inference, latency, new edge revenue.',
            timeToValue: '20–30 wk',
            valueAssurance: 'ETSI MEC, 3GPP, NIS2, GDPR.',
            targetStakeholder: 'VP Network Architecture & Edge',
            relatedCrossPractices: ['5.14 CIO Ops', '5.11 Cyber']
          },
          {
            code: '6.7.1.2',
            title: 'RAN Intelligence & SON',
            slug: 'ran-intelligence-son',
            overview: 'Self-Organizing Network (SON) algorithms dynamically tuning cell tower antenna tilts and power states.',
            solutionAcceleration: 'KPI model library, SON policy templates; network ops owns policies.',
            kpisBanked: 'Energy per GB, dropped calls, capacity headroom.',
            timeToValue: '16–24 wk',
            valueAssurance: '3GPP / O-RAN RIC, spectrum conditions, IEC 62443.',
            targetStakeholder: 'Head of Radio Access Network (RAN)',
            relatedCrossPractices: ['5.4 FinOps']
          },
          {
            code: '6.7.1.3',
            title: 'Dynamic Network Slicing',
            slug: 'dynamic-network-slicing',
            overview: 'Automates 5G core network slice provisioning with guaranteed latency and bandwidth SLAs.',
            solutionAcceleration: 'Slice templates, SLA assurance harness; service ops owns activation.',
            kpisBanked: 'Slice margin, penalties avoided.',
            timeToValue: '20–30 wk',
            valueAssurance: '3GPP slices, ETSI ZSM, NIS2.',
            targetStakeholder: 'VP 5G Core & Service Management',
            relatedCrossPractices: ['5.5 RevOps', '5.11 Cyber']
          }
        ]
      },
      {
        code: '6.7.2',
        title: 'Cloud, Data Centre & Platforms',
        practiceAreas: [
          {
            code: '6.7.2.1',
            title: 'Capacity & PUE Optimization',
            slug: 'capacity-pue-optimization',
            overview: 'Controls chiller loops and airflow baffles in high-density AI data centers to achieve sub-1.1 PUE.',
            solutionAcceleration: 'Thermal models, placement advisor; facilities owns setpoints.',
            kpisBanked: 'PUE, kWh per rack, capacity released.',
            timeToValue: '8–12 wk',
            valueAssurance: 'ASHRAE TC 9.9, ISO 50001, grid permits.',
            targetStakeholder: 'VP Data Center Operations',
            relatedCrossPractices: ['5.4 FinOps', '5.2 ESG']
          },
          {
            code: '6.7.2.2',
            title: 'GPU Fleet Scheduling & Utilization',
            slug: 'gpu-fleet-scheduling-utilization',
            overview: 'Fair-share scheduler matching training and inference workloads to GPU clusters to eliminate idle cycles.',
            solutionAcceleration: 'Scheduler, chargeback schema; platform team owns quotas.',
            kpisBanked: 'GPU utilisation, cost per run, queue time.',
            timeToValue: '8–12 wk',
            valueAssurance: 'Chargeback audit, residency, export screening.',
            targetStakeholder: 'Head of Platform Infrastructure',
            relatedCrossPractices: ['5.4 FinOps', '5.14 CIO Ops']
          },
          {
            code: '6.7.2.3',
            title: 'Physical Security & Access Assurance',
            slug: 'physical-security-access-assurance',
            overview: 'Computer vision auditing white-space server hall access, mantrap tailgating, and badge authorizations.',
            solutionAcceleration: 'Vision kit, audit-pack generator; security owns investigations.',
            kpisBanked: 'Incidents, audit findings, guard cost.',
            timeToValue: '6–10 wk',
            valueAssurance: 'ISO 27001 physical, SOC 2, right-to-audit.',
            targetStakeholder: 'Head of Physical Security & Compliance',
            relatedCrossPractices: ['5.11 Cyber', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.7.3',
        title: 'Media, Entertainment & Sports',
        practiceAreas: [
          {
            code: '6.7.3.1',
            title: 'Content Localization & Versioning',
            slug: 'content-localization-versioning',
            overview: 'Automates subtitling, synthetic voice dubbing, and video aspect-ratio reframing for global streaming release.',
            solutionAcceleration: 'Localization pipeline, QC templates; content ops owns releases.',
            kpisBanked: 'Cost per finished minute, time-to-market.',
            timeToValue: '8–12 wk',
            valueAssurance: 'Rights windows, accessibility, Art 50 disclosure.',
            targetStakeholder: 'VP Post-Production Operations',
            relatedCrossPractices: ['5.12 Knowledge Fabric']
          },
          {
            code: '6.7.3.2',
            title: 'Rights, Royalty & Clearance Agents',
            slug: 'rights-royalty-clearance-agents',
            overview: 'Parses complex multi-territory talent contracts and automates royalty accounting across streaming platforms.',
            solutionAcceleration: 'Contract parser, royalty audit kit; rights team owns clearances.',
            kpisBanked: 'Royalty leakage, payment accuracy.',
            timeToValue: '10–16 wk',
            valueAssurance: 'Contract and audit rights, collective licensing.',
            targetStakeholder: 'Head of Business Affairs & Rights',
            relatedCrossPractices: ['5.15 Legal Ops', '5.4 FinOps']
          },
          {
            code: '6.7.3.3',
            title: 'Provenance & Synthetic Content Labeling',
            slug: 'provenance-synthetic-content-labeling',
            overview: 'Embeds C2PA cryptographic watermarks into synthetic media assets to prevent deepfake exploitation.',
            solutionAcceleration: 'C2PA signing toolkit, detection feed; trust and safety owns takedowns.',
            kpisBanked: 'Brand risk, compliance cost, takedown time.',
            timeToValue: '6–10 wk',
            valueAssurance: 'AI Act Art 50 (2 Aug 2026; 50(2) to 2 Dec 2026), C2PA.',
            targetStakeholder: 'Chief Trust & Safety Officer',
            relatedCrossPractices: ['5.10 Brand Reputation', '5.1 GRC']
          }
        ]
      },
      {
        code: '6.7.4',
        title: 'Software & Digital Platforms',
        practiceAreas: [
          {
            code: '6.7.4.1',
            title: 'SDLC Copilots & Code Review',
            slug: 'sdlc-copilots-code-review',
            overview: 'Automates pull request code reviews, vulnerability static analysis, and test harness generation in CI/CD.',
            solutionAcceleration: 'Eval harness in CI, review agents; platform team owns policy.',
            kpisBanked: 'Cycle time, defect escape, developer hours.',
            timeToValue: '6–10 wk',
            valueAssurance: 'SBOM and licence, secure development, ISO 27001.',
            targetStakeholder: 'VP Engineering / Chief Architect',
            relatedCrossPractices: ['5.14 CIO Ops', '5.11 Cyber']
          },
          {
            code: '6.7.4.2',
            title: 'Customer Support Automation',
            slug: 'software-customer-support-automation',
            overview: 'Autonomous troubleshooting agents resolving complex developer API and SaaS product queries.',
            solutionAcceleration: 'Agent kit with escalation design; support ops owns content.',
            kpisBanked: 'Cost per contact, containment, CSAT.',
            timeToValue: '8–12 wk',
            valueAssurance: 'GDPR, consumer law, accessibility.',
            targetStakeholder: 'Head of Customer Support',
            relatedCrossPractices: ['5.9 CRM', '5.3 Workforce']
          },
          {
            code: '6.7.4.3',
            title: 'AI Feature Safety & Model Documentation',
            slug: 'ai-feature-safety-model-documentation',
            overview: 'Automates model card generation, safety benchmark testing, and EU AI Act GPAI technical file compliance.',
            solutionAcceleration: 'Model-card generator, red-team suite; product team owns releases.',
            kpisBanked: 'Incident rate, release velocity, assurance cost.',
            timeToValue: '8–14 wk',
            valueAssurance: 'AI Act GPAI, NIST AI RMF, ISO 42001.',
            targetStakeholder: 'VP AI Product / Governance Lead',
            relatedCrossPractices: ['5.1 GRC', '5.11 Cyber']
          }
        ]
      }
    ]
  },
  {
    id: 'public-sector',
    code: '6.8',
    title: 'Public Sector, Defense & Aerospace',
    shortTitle: 'Public Sector & Defense',
    poolSize: '~$30T public spend, ~$5T addressable',
    buyer: 'CIO or Accounting Officer, Programme Executive',
    bankedAgainst: 'Operational Delivery, Compliance-Mandated Programmes',
    tier: 3,
    medianTtv: '20 wk',
    description: 'Sovereign citizen services, MRO defense predictive maintenance, ITAR compliance, and border verification.',
    subVerticals: [
      {
        code: '6.8.1',
        title: 'Government, Cities & Citizen Services',
        practiceAreas: [
          {
            code: '6.8.1.1',
            title: 'Citizen Service Agents',
            slug: 'citizen-service-agents',
            overview: 'Multilingual conversational portals guiding residents through municipal permits and tax filings.',
            solutionAcceleration: 'Service-catalogue connectors, FRIA template; service owner owns content.',
            kpisBanked: 'Cost per contact, first-contact resolution, channel shift.',
            timeToValue: '16–24 wk',
            valueAssurance: 'AI Act Annex III, GDPR, WCAG/EAA, FRIA Art 27.',
            targetStakeholder: 'Chief Digital Officer (City / State)',
            relatedCrossPractices: ['5.9 CRM', '5.1 GRC']
          },
          {
            code: '6.8.1.2',
            title: 'Smart City Operations',
            slug: 'smart-city-operations',
            overview: 'Coordinates municipal sensor fusion, adaptive street lighting, waste routing, and water networks.',
            solutionAcceleration: 'Sensor fusion kit, work-order connectors; city ops owns response.',
            kpisBanked: 'Response time, lighting energy, cost per resident.',
            timeToValue: '20–30 wk',
            valueAssurance: 'Video law and DPIA, Art 5 prohibitions, procurement transparency.',
            targetStakeholder: 'Director of City Operations',
            relatedCrossPractices: ['5.14 CIO Ops', '5.2 ESG']
          },
          {
            code: '6.8.1.3',
            title: 'Casework Triage & Benefits Integrity',
            slug: 'casework-triage-benefits-integrity',
            overview: 'Triages social support applications, extracts applicant income records, and flags overpayment risks.',
            solutionAcceleration: 'Extraction pack, explanation templates; caseworkers own decisions.',
            kpisBanked: 'Processing time, error rate, overpayment recovered.',
            timeToValue: '16–26 wk',
            valueAssurance: 'Due process, GDPR Art 22, audit trail, appeal rights.',
            targetStakeholder: 'Director of Social Services / Welfare Administration',
            relatedCrossPractices: ['5.12 Knowledge Fabric', '5.1 GRC']
          },
          {
            code: '6.8.1.4',
            title: 'Sovereign / Air-Gapped AI',
            slug: 'sovereign-air-gapped-ai',
            overview: 'Deploying secure, isolated LLMs and computer vision workloads in sovereign data centers with zero data egress.',
            solutionAcceleration: 'Air-gapped blueprint, attestation kit; sovereign team owns accreditation.',
            kpisBanked: 'Cost per workload versus cloud, accreditation time.',
            timeToValue: '20–32 wk',
            valueAssurance: 'National security rules, NIS2, ISO 27001, BSI C5.',
            targetStakeholder: 'Head of Sovereign Cloud / National Security IT',
            relatedCrossPractices: ['5.11 Cyber', '5.14 CIO Ops']
          }
        ]
      },
      {
        code: '6.8.2',
        title: 'Defense & Aerospace',
        practiceAreas: [
          {
            code: '6.8.2.1',
            title: 'MRO Predictive Maintenance',
            slug: 'mro-defense-predictive-maintenance',
            overview: 'Forecasts maintenance needs on military aircraft, naval vessels, and armored ground fleets to minimize Aircraft On Ground (AOG).',
            solutionAcceleration: 'Prognostic models, records automation; engineering owns airworthiness.',
            kpisBanked: 'Availability, cost per flight hour, AOG events.',
            timeToValue: '20–30 wk',
            valueAssurance: 'EASA Part-145/Part-M, AS9100, ITAR.',
            targetStakeholder: 'Chief of Fleet Maintenance / Airworthiness',
            relatedCrossPractices: ['5.7 Supply Chain', '5.13 Data Integration']
          },
          {
            code: '6.8.2.2',
            title: 'Mission-Secure / Air-Gapped AI',
            slug: 'mission-secure-air-gapped-ai',
            overview: 'Tactical edge and air-gapped compute pods operating with cryptographic update verification in classified enclaves.',
            solutionAcceleration: 'Ruggedised inference kit, signed-update chain; programme team owns accreditation.',
            kpisBanked: 'Readiness, field latency, update cycle.',
            timeToValue: '24–36 wk',
            valueAssurance: 'NIST 800-53 and STIG, IL5/IL6, CMMC, DO-178C.',
            targetStakeholder: 'Defense Programme Director',
            relatedCrossPractices: ['5.11 Cyber', '5.1 GRC']
          },
          {
            code: '6.8.2.3',
            title: 'ITAR / Export-Control Compliance Agents',
            slug: 'itar-export-control-compliance-agents',
            overview: 'Screens engineering schematics, software repositories, and supplier lists for ITAR/EAR export-controlled articles.',
            solutionAcceleration: 'Classification models, screening connectors; trade compliance owns determinations.',
            kpisBanked: 'Licence cycle, violations caught.',
            timeToValue: '10–16 wk',
            valueAssurance: 'ITAR 22 CFR 120–130, EAR, DFARS.',
            targetStakeholder: 'VP Trade & Export Compliance',
            relatedCrossPractices: ['5.1 GRC', '5.15 Legal Ops']
          }
        ]
      },
      {
        code: '6.8.3',
        title: 'Public Safety, Justice & Borders',
        practiceAreas: [
          {
            code: '6.8.3.1',
            title: 'Evidence & Case-File Intelligence',
            slug: 'evidence-case-file-intelligence',
            overview: 'Indexes body-worn camera footage, transcripts, and witness depositions into privileged legal disclosure briefs.',
            solutionAcceleration: 'Disclosure review kit, provenance layer; case team owns disclosure.',
            kpisBanked: 'Review hours per case, time to charge.',
            timeToValue: '14–22 wk',
            valueAssurance: 'Disclosure duties, chain of custody, fair trial.',
            targetStakeholder: 'Chief Prosecutor / Senior Investigating Officer',
            relatedCrossPractices: ['5.15 Legal Ops', '5.12 Knowledge Fabric']
          },
          {
            code: '6.8.3.2',
            title: 'Border & Biometric Screening',
            slug: 'border-biometric-screening',
            overview: 'Verifies travel documents and screens international passenger manifests against high-risk border alerts.',
            solutionAcceleration: 'Document-verification kit, FRIA template; officers own decisions.',
            kpisBanked: 'Clearance time, interception rate, false positives.',
            timeToValue: '24–36 wk',
            valueAssurance: 'AI Act Annex III and Art 5 limits, EES, GDPR Art 9, FRIA.',
            targetStakeholder: 'Director of Border & Immigration Agency',
            relatedCrossPractices: ['5.11 Cyber', '5.1 GRC']
          },
          {
            code: '6.8.3.3',
            title: 'Public Space CCTV & Incident Response',
            slug: 'public-space-cctv-incident-response',
            overview: 'Detects public safety hazards, perimeter breaches, and crowd stampede dynamics with strict FRIA controls.',
            solutionAcceleration: 'Analytics kit, evidence-export templates; control room owns response.',
            kpisBanked: 'Response time, patrol efficiency, evidence yield.',
            timeToValue: '16–24 wk',
            valueAssurance: 'AI Act Art 5 (real-time RBI), FRIA, DPIA, local law.',
            targetStakeholder: 'Head of Public Safety Operations',
            relatedCrossPractices: ['5.1 GRC']
          }
        ]
      },
      {
        code: '6.8.4',
        title: 'Education & Workforce',
        practiceAreas: [
          {
            code: '6.8.4.1',
            title: 'Learner Support & Tutoring Agents',
            slug: 'learner-support-tutoring-agents',
            overview: 'Provides curriculum-grounded, multimodal tutoring with student data protection and pedagogical controls.',
            solutionAcceleration: 'Curriculum-grounded kit, accessibility layer; faculty owns content.',
            kpisBanked: 'Attainment, teacher hours saved, engagement.',
            timeToValue: '12–20 wk',
            valueAssurance: 'AI Act Annex III (education), GDPR/COPPA, accessibility.',
            targetStakeholder: 'Dean of Academic Technology',
            relatedCrossPractices: ['5.3 Workforce']
          },
          {
            code: '6.8.4.2',
            title: 'Assessment Integrity & Marking',
            slug: 'assessment-integrity-marking',
            overview: 'Assists examiners with rubric-aligned essay marking, plagiarism detection, and bias moderation workflows.',
            solutionAcceleration: 'Rubric-aligned marker, moderation workflow; exams office owns results.',
            kpisBanked: 'Marking hours, consistency, appeals rate.',
            timeToValue: '10–16 wk',
            valueAssurance: 'Exam board standards, bias testing, due process.',
            targetStakeholder: 'Head of Examinations & Assessment',
            relatedCrossPractices: ['5.1 GRC', '5.3 Workforce']
          },
          {
            code: '6.8.4.3',
            title: 'Institutional Analytics & Retention',
            slug: 'institutional-analytics-retention',
            overview: 'Early warning predictive models identifying students at risk of course withdrawal to trigger advisor support.',
            solutionAcceleration: 'Early-warning models, adviser workflow; student services owns interventions.',
            kpisBanked: 'Retention, time to credential, equity gaps.',
            timeToValue: '14–22 wk',
            valueAssurance: 'Fairness testing, GDPR and consent, ethics review.',
            targetStakeholder: 'VP Student Success & Enrollment Management',
            relatedCrossPractices: ['5.9 CRM', '5.13 Data Integration']
          }
        ]
      }
    ]
  }
]

/* Helper Lookup Functions */
export function getAllIndustryPracticeAreas(): (IndustryPracticeArea & { industryTitle: string; subVerticalTitle: string })[] {
  const result: (IndustryPracticeArea & { industryTitle: string; subVerticalTitle: string })[] = []
  for (const ind of industryVerticalPractices) {
    for (const sub of ind.subVerticals) {
      for (const pa of sub.practiceAreas) {
        result.push({
          ...pa,
          industryTitle: ind.title,
          subVerticalTitle: sub.title
        })
      }
    }
  }
  return result
}

export function getAllCrossPracticeAreas(): (CrossPracticeArea & { practiceTitle: string })[] {
  const result: (CrossPracticeArea & { practiceTitle: string })[] = []
  for (const cp of crossIndustryPractices) {
    for (const pa of cp.practiceAreas) {
      result.push({
        ...pa,
        practiceTitle: cp.title
      })
    }
  }
  return result
}

export function getComprehensivePracticeBySlug(slug: string): 
  | { type: 'cross'; practice: CrossIndustryPractice; area: CrossPracticeArea }
  | { type: 'industry'; industry: IndustryVertical; subVertical: SubVertical; area: IndustryPracticeArea }
  | undefined {
  for (const cp of crossIndustryPractices) {
    for (const pa of cp.practiceAreas) {
      if (pa.slug === slug) {
        return { type: 'cross', practice: cp, area: pa }
      }
    }
  }
  for (const ind of industryVerticalPractices) {
    for (const sub of ind.subVerticals) {
      for (const pa of sub.practiceAreas) {
        if (pa.slug === slug) {
          return { type: 'industry', industry: ind, subVertical: sub, area: pa }
        }
      }
    }
  }
  return undefined
}

export function getAllComprehensivePracticeSlugs(): string[] {
  const slugs: string[] = []
  for (const cp of crossIndustryPractices) {
    for (const pa of cp.practiceAreas) {
      slugs.push(pa.slug)
    }
  }
  for (const ind of industryVerticalPractices) {
    for (const sub of ind.subVerticals) {
      for (const pa of sub.practiceAreas) {
        slugs.push(pa.slug)
      }
    }
  }
  return slugs
}
