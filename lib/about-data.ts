export interface TeamMember {
  name: string
  role: string
  category: 'leadership' | 'engineering' | 'advisory'
  badge?: string
  initials?: string
}

export interface MetricItem {
  value: string
  label: string
  sub?: string
  gradient?: string
}

export interface OfficeLocation {
  city: string
  region: string
  tag: string
  address: string
  phone?: string
  email: string
  contactPerson?: string
  note?: string
  whatsappUrl?: string
}

export interface CaseStudy {
  client: string
  industry: string
  situation: string
  intervention: string
  interventionItems: { label: string; detail: string }[]
  outcome: string
  link?: string
  linkText?: string
  subtitle?: string
  tags?: string[]
}

export const aboutHero = {
  eyebrow: "A Full-Spectrum AI Engineering Company",
  title: "Engineering the Resilient, Hyper-Optimized Backbone of the AI Economy",
  description: "TRUSTGRID.AI engineers production AI systems for the world's most demanding enterprises — from GPU clusters to autonomous agent fleets, across 20+ regulated industries."
}

export const missionVision = {
  mission: {
    title: "Our Mission",
    statement: "To engineer the resilient, hyper-optimized infrastructure that sustainably accelerates the AI revolution.",
    description: "We transform raw, power-hungry compute into trustworthy intelligence—empowering enterprises to scale AI without limits or compromise."
  },
  vision: {
    title: "Our Vision",
    statement: "To be the invisible, unbreakable architectural backbone of the global AI economy.",
    description: "We envision a future where massive GPU superclusters and autonomous agents deliver absolute reliability, driving human progress while respecting planetary boundaries."
  }
}

export const whatWeDoVerticals = [
  {
    number: "01",
    title: "GPU & Compute Optimization",
    description: "Custom CUDA kernels, multi-instance GPU scheduling, continuous batching, and mixed-precision quantization (FP8/INT4) to cut inference and training costs by 30–60%."
  },
  {
    number: "02",
    title: "LLM & AI Agent Engineering",
    description: "Architecting autonomous, deterministic agent fleets with dynamic memory architectures, tool-augmented verification, and enterprise-grade multi-agent swarm orchestration."
  },
  {
    number: "03",
    title: "AI Infrastructure Engineering",
    description: "Designing, building, and operating bare-metal and hybrid AI Factories with high-radix InfiniBand/RoCE fabrics, direct-to-chip liquid cooling, and Slurm/Kubernetes orchestration."
  },
  {
    number: "04",
    title: "AI Cybersecurity & Quantum Safe",
    description: "Zero-trust model enforcement, adversarial robustification, automated prompt-injection guardrails, and post-quantum cryptographic (PQC) transitions."
  },
  {
    number: "05",
    title: "Reliability & Trust Engineering",
    description: "Statistical process control (SPC) for model drift, failure modes analysis (FMEA) for agent workflows, and deterministic decision auditability in regulated environments."
  }
]

export const metricsFootprint: MetricItem[] = [
  { value: "30–60%", label: "Inference Cost Reduction", sub: "Delivered across production clusters" },
  { value: "4.2x", label: "Agent Throughput", sub: "Via hardware-aware orchestration" },
  { value: "99.999%", label: "Platform Availability", sub: "Mission-critical uptime standard" },
  { value: "48–88 wks", label: "To Compounding Value", sub: "From initial diagnostic to live self-improving fleet" }
]

export const societalValueAddition = [
  {
    title: "The Acceleration Multiplier",
    category: "Value to AI Progress",
    description: "The bottleneck to humanity's next great leap forward is physical, not algorithmic. TRUSTGRID.AI serves as the critical catalyst between theoretical research and scalable, real-world deployment."
  },
  {
    title: "The Sustainability Shield",
    category: "Value to the Planet",
    description: "The AI boom is an energy crisis in disguise. Through carbon-aware workload routing, dynamic voltage/frequency scaling (DVFS), and liquid cooling transitions, we drastically curtail AI's carbon footprint."
  },
  {
    title: "The Trust Anchor",
    category: "Value to Human Safety",
    description: "As autonomous agentic systems make high-stakes decisions, TRUSTGRID.AI provides verifiable guardrails, explainability traces, and quantum-safe cryptographic envelopes."
  },
  {
    title: "The Net Societal Outcome",
    category: "Real-World Impact",
    description: "We ensure enterprise AI capital translates into genuine societal goods—faster drug discovery, clean energy optimization, and resilient supply chains—rather than being lost to inefficiency."
  }
]

export const culturePrinciples = [
  {
    title: "Systems-Level Thinking",
    description: "We do not patch symptoms. Our engineers look at the entire stack—from the power grid and NVLink interconnects, through Kubernetes orchestration, up to the attention mechanisms of an LLM."
  },
  {
    title: "Relentless Optimization",
    description: "Every cycle of compute and every watt of power matters. We push silicon, kernels, and agent workflows to the physical limit of efficiency."
  },
  {
    title: "Truth Over Trend",
    description: "While the market chases hype, we are anchored in physics, mathematics, and empirical data. We prioritize deterministic outcomes over flashy demos."
  },
  {
    title: "High-Trust, High-Ownership",
    description: "We operate with radical transparency, rigorous peer review, and deep responsibility for the mission-critical systems entrusted to us."
  },
  {
    title: "Impact-Driven Focus",
    description: "Every line of code and every cooling loop is viewed through the lens of global impact, building the sustainable foundation for the next century of enterprise progress."
  }
]

export const teamMembers: TeamMember[] = [
  // Leadership & Product
  { name: "Shaji Namath", role: "Managing Partner - GCC Practice", category: "leadership", badge: "Product Leadership", initials: "SN" },
  { name: "Pranav PR", role: "Director & Chief Operating Officer", category: "leadership", badge: "Director", initials: "PR" },
  { name: "Balaji Venkatraman", role: "Director Growth & Head FDE Practice", category: "leadership", badge: "Growth & Acceleration", initials: "BV" },
  { name: "Kumar V", role: "Global Head - AI Infra & Cybersecurity Practice", category: "leadership", badge: "AI Cybersecurity & FDE Cybersecurity", initials: "KV" },
  { name: "Lavanya Seshadri", role: "Head - FDE Practice (AJPC)", category: "leadership", badge: "AI Value Engineering", initials: "LS" },
  { name: "Vignesh KS", role: "Product Lead (FinTech & Escrow Platforms)", category: "leadership", badge: "Product Lead", initials: "VK" },
  { name: "Hemalata Niyogi", role: "Lead Architect - AI FDE Practice (Mfg)", category: "leadership", badge: "Lead AI Architect", initials: "H" },
  { name: "Prithivin L", role: "Project Lead - EscrowChain Platform", category: "leadership", badge: "Systems Lead", initials: "PL" },
  { name: "Shiva Kumar", role: "Managing Partner & Advisor - Mfg Domain", category: "leadership", badge: "Product Architecture", initials: "SK" },
  { name: "Mahadaven Ramasumbramanian", role: "Managing Partner - FDE (Energy & Telecom)", category: "leadership", badge: "Practice Leader (Energy & Telecom)", initials: "MR" },
  { name: "Sonu Priyadharshini", role: "Chief Financial Controller (Acting)", category: "leadership", badge: "Finance", initials: "SP" },

  // AI & Systems Engineering
  { name: "Dinesh Kumar", role: "Senior AI FDE (Finance & Healthcare)", category: "engineering", badge: "Senior AI FDE", initials: "DK" },
  { name: "Risihi Kumar", role: "AI/ML Engineer", category: "engineering", badge: "AI Architecture", initials: "R" },
  { name: "Ritin", role: "Senior AI Architect", category: "engineering", badge: "AI Architecture", initials: "R" },
  { name: "Natarajan", role: "Sr Blockchain Architect", category: "engineering", badge: "Blockchain", initials: "N" },
  { name: "Viswanath", role: "Sr DevOps Engineer", category: "engineering", badge: "DevOps & Cloud", initials: "V" },
  { name: "Subashini Kaushik", role: "Lead AI FDE Practice (GRC / FinTech)", category: "engineering", badge: "GRC / FinTech", initials: "SK" },
  { name: "Neha Hebber", role: "FDE Practice (Finance & GRC)", category: "engineering", badge: "IIT Bombay", initials: "NH" },
  { name: "Annapoorani", role: "Lead AI FDE Practice (GRC / FinTech)", category: "engineering", badge: "Automation", initials: "A" },

  // Advisory, Strategy, Legal & Operations
  { name: "Swathi Iyer", role: "Lead Investor & Strategic Advisor", category: "advisory", badge: "IIT Madras", initials: "SI" },
  { name: "Aiswhwarya LN Bhatt", role: "AI Performance Marketing & Strategy", category: "advisory", badge: "Strategy", initials: "AL" },
  { name: "Chintiya Liu", role: "Lead Consultant (China)", category: "advisory", badge: "Consultant", initials: "CL" },
  { name: "Kallol Pal", role: "Technology Advisor & CTO", category: "advisory", badge: "Advisor", initials: "KP" },
  { name: "Soumya Sommiah", role: "Company Secretary & Advisor", category: "advisory", badge: "Corporate Governance", initials: "SS" },
  { name: "Soumya S", role: "Corporate Counsel", category: "advisory", badge: "Legal Counsel", initials: "SS" },
  { name: "Aswathi Nair", role: "Corporate Counsel", category: "advisory", badge: "Legal Counsel", initials: "AN" },
  { name: "Sonu Priyadharshini", role: "Sr Manager - (Talent Acceleration & General Admin)", category: "advisory", badge: "Talent Mgmt & Acceleration", initials: "SP" },
  { name: "To Be Hired", role: "HR Manager", category: "advisory", badge: "Talent Acquisition", initials: "TBH" },

  // Engineering Talent & Global Network (Last Row)
  { name: "Poojasri", role: "AI/ML Engineer", category: "engineering", badge: "AI/ML Engineer", initials: "P" },
  { name: "+30 Global Team Members", role: "Distributed Systems, R&D & Field Deployment Network", category: "engineering", badge: "Global Engineering & Operations", initials: "30+" }
]

export const openInnovationInitiatives = [
  {
    title: "Crowd Safety Predictor",
    badge: "AI Hackathon Innovation",
    description: "An AI-powered computer vision & crowd telemetry application designed during our AI Hackathon series to predict overcrowding, thermal stress, and emergency safety hazards in real time.",
    highlights: [
      "Real-time Density & Spatial Telemetry",
      "Early Incident & Stampede Prevention",
      "Live Multi-Camera Stream Analytics"
    ],
    linkText: "Launch Crowd Safety Predictor App",
    url: "https://crowd-safety-predictor.vercel.app/",
    isExternal: true
  },
  {
    title: "Enterprise AI Hackathons",
    badge: "Open Research & Talent",
    description: "We sponsor and host frontier AI hackathons across premier institutions (IITs, global tech hubs) to push the boundaries of computer vision, GPU kernels, and autonomous LLM agents.",
    highlights: [
      "$50,000+ Prize Pools & Industry Grants",
      "Mentorship from Principal AI Architects",
      "Fast-track hiring into TRUSTGRID.AI Labs"
    ],
    linkText: "Sponsor or Join Next Hackathon",
    url: "/book-ai-diagnostic#diagnostic-form-section",
    isExternal: false
  },
  {
    title: "Careers & Research Fellowships",
    badge: "We Are Hiring",
    description: "We are hiring elite engineers, researchers, and systems architects passionate about building zero-trust AI infrastructure, optical networks, and high-throughput GPU clusters.",
    highlights: [
      "AI/ML Systems & CUDA Engineers",
      "Distributed Systems & HPC Leads",
      "Zero-Trust & Quantum Security Researchers"
    ],
    linkText: "Explore Open Engineering Roles",
    url: "/book-ai-diagnostic#diagnostic-form-section",
    isExternal: false
  }
]

export const caseStudiesList: CaseStudy[] = [
  {
    client: "Global Medical Supplies & Manufacturing Enterprise",
    industry: "Medical Supplies & Manufacturing",
    subtitle: "End-to-End AI Automation in Medical Supplies Packaging, Regulatory Labeling, Supply Chain Inspection & Warranty Management",
    situation: "Distributing disposable hygiene and sterile surgical supplies across 40+ international markets required 3–4 weeks of localized legal review per market, manual conveyor seal inspection with 4.5% returns, and slow 10–14 day warranty claim processing.",
    intervention: "Generative AI RAG legal matrix, dynamic inline packaging labeling with verified license numbers, edge computer vision inspection, and agentic touchless claims adjudication.",
    interventionItems: [
      { label: "Generative AI Compliance", detail: "Automated multi-jurisdiction warranty T&C generation across 40+ countries in 3 days vs 3-4 weeks." },
      { label: "Dynamic Regulatory Labeling", detail: "Direct factory inkjet integration printing verified regional registrations (FDA, ANVISA, CDSCO)." },
      { label: "Edge Computer Vision", detail: "Optical beam-triggered OCR and seal integrity checks with 74% inspection power reduction." },
      { label: "Touchless Claim Adjudication", detail: "85% auto-approval straight-through processing in under 2 minutes." }
    ],
    outcome: "3-day T&C turnaround, 300% distribution velocity increase, 90% return/recall reduction, and 99.9% license placement defect prevention.",
    tags: ["Generative AI", "Computer Vision", "Regulatory AI", "Supply Chain", "Warranty Automation"],
    link: "/case-studies/medical-supplies-ai",
    linkText: "View Case Study →"
  },
  {
    client: "Government Defense & Intelligence Agency",
    industry: "Public Sector / Air-Gapped",
    situation: "Air-gapped 200-GPU A100 network processing 50K intelligence docs/day. Mission required doubling throughput with zero new hardware during an 18-month procurement cycle.",
    intervention: "Kernel optimization, continuous batching, and speculative decoding.",
    interventionItems: [
      { label: "Quantization", detail: "GPTQ INT4 with defense-domain calibration; <0.8% accuracy loss." },
      { label: "Continuous Batching", detail: "Migrated to vLLM; average batch size jumped from 1.2 to 8.4." },
      { label: "Speculative Decoding", detail: "7B draft model paired with 70B target — 2.1x speedup on long document summarization." }
    ],
    outcome: "2.4x throughput increase, zero hardware expansion cost, full air-gap compliance maintained."
  },
  {
    client: "Tier-1 Global Investment Bank",
    industry: "Banking & Financial Services",
    situation: "Autonomous fraud detection and credit risk models experiencing high latency and escalating cloud inference costs.",
    intervention: "FP8 engine quantization, TensorRT-LLM migration, and deterministic audit trail logging.",
    interventionItems: [
      { label: "Inference Optimization", detail: "Engineered sub-25ms response latency under 50,000 TPS peak load." },
      { label: "Auditability Layer", detail: "Cryptographic decision traceability verifying zero regulatory non-compliance." }
    ],
    outcome: "54% reduction in monthly cloud compute spend with audited sub-30ms execution."
  }
]

export const officeLocations: OfficeLocation[] = [
  {
    city: "San Mateo / Mountain View, California",
    region: "United States (West Coast AI Center)",
    tag: "Silicon Valley Office",
    address: "Suite 21, 400 Concar Dr, San Mateo, CA 94402, United States",
    contactPerson: "Lavanya Seshadri",
    phone: "+1 650 772 4145",
    whatsappUrl: "https://wa.me/16507724145?text=Hi%20TrustGrid%20California%20team%2C%20I%20would%20like%20to%20connect%20with%20Lavanya",
    email: "lavanya@trustgrid.ai"
  },
  {
    city: "New York, New York",
    region: "United States (East Coast AI Center)",
    tag: "New York Office",
    address: "33 Irving Pl, New York, NY 10003, United States",
    contactPerson: "Murali",
    email: "Murali@trustgrid.ai"
  },
  {
    city: "Tampa, Florida",
    region: "United States (Americas HQ)",
    tag: "US Americas Headquarters",
    address: "501 E Kennedy Blvd Suite 1400, Tampa, FL 33602, United States (Mailing: 400 N Ashley Dr, Suite 1900, Tampa, FL 33602, USA)",
    contactPerson: "Murali",
    phone: "+1 650 772 4145",
    whatsappUrl: "https://wa.me/16507724145?text=Hi%20TrustGrid%20USA%20team",
    email: "Murali@trustgrid.ai"
  },
  {
    city: "Toronto, Ontario",
    region: "Canada (North America Hub)",
    tag: "Canada Office",
    address: "1050 King St W, Toronto, Ontario M6K 0A5, Canada",
    contactPerson: "Ravindar Pal Singh",
    email: "connect@trustgrid.ai"
  },
  {
    city: "Melbourne, Victoria",
    region: "Australia (ANZ Regional Office)",
    tag: "Australia Operations",
    address: "120 Spencer St, Melbourne VIC 3000, Australia",
    contactPerson: "Sabriram RK",
    email: "connect@trustgrid.ai"
  },
  {
    city: "Osaka",
    region: "Japan (East Asia Hub)",
    tag: "Japan Center",
    address: "〒530-0002 Osaka, Kita Ward, Sonezakishinchi, 1 Chome−13−22 WeWork 御堂筋フロンティア, Japan",
    contactPerson: "Hemalata Niyogi",
    email: "Hemalata@trustgrid.ai"
  },
  {
    city: "Singapore",
    region: "Asia-Pacific (APAC HQ)",
    tag: "APAC Operations",
    address: "5 Temasek Boulevard, 17th Floor, Singapore 038985",
    phone: "+65 6050 5235",
    whatsappUrl: "https://wa.me/6560505235?text=Hi%20TrustGrid%20Singapore%20team",
    email: "connect@trustgrid.ai"
  },
  {
    city: "Bengaluru (Indiranagar HQ)",
    region: "India (Global R&D Center)",
    tag: "India Headquarters",
    address: "TRUSTGRID.AI INNOVATION PVT LTD, Suite : 32 , 235, BINNAMANGALA, 2nd Floor, 13th Cross Road, Indira Nagar 2nd Stage, Hoysala Nagar, Bengaluru – 560038 , India",
    phone: "+91 9513088612",
    whatsappUrl: "https://wa.me/919513088612?text=Hi%20TrustGrid%20India%20team",
    email: "cs@trustgrid.in"
  },
  {
    city: "Mumbai",
    region: "India (Western Operations)",
    tag: "Mumbai Office",
    address: "WeWork, Raheja Platinum, Road, off Andheri - Kurla Road, Sag Baug, Marol, Andheri East, Mumbai, Maharashtra 400059",
    phone: "+91 9513088612",
    whatsappUrl: "https://wa.me/919513088612?text=Hi%20TrustGrid%20Mumbai%20team",
    email: "cs@trustgrid.in"
  },
  {
    city: "Bengaluru (Tin Factory)",
    region: "India (Hardware & Systems Lab)",
    tag: "AI Systems Engineering Lab",
    address: "WeWork, 13th floor, Tin Factory, Salarpuria Magnificia, 78, Old Madras Rd, next to KR Puram, Mahadevapura, Bengaluru, Karnataka 560016",
    phone: "+91 9513088612",
    whatsappUrl: "https://wa.me/919513088612?text=Hi%20TrustGrid%20Lab%20team",
    email: "cs@trustgrid.in"
  }
]

export const aboutNavMenu = [
  { label: "About TRUSTGRID.AI", href: "/about" },
  { label: "Leadership & Teams", href: "/about#teams" },
  { label: "Careers & Hackathons", href: "/about#careers-hackathons" },
  { label: "Global Presence", href: "/about#presence" },
  { label: "Case Studies", href: "/about#case-studies" },
  { label: "Insights & Research", href: "/about#insights" },
  { label: "Book AI Diagnostic", href: "/book-ai-diagnostic#diagnostic-form-section" }
]
