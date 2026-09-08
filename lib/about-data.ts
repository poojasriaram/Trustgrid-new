export interface TeamMember {
  name: string
  role: string
  category: 'leadership' | 'engineering' | 'advisory'
  badge?: string
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
}

export interface CaseStudy {
  client: string
  industry: string
  situation: string
  intervention: string
  interventionItems: { label: string; detail: string }[]
  outcome: string
}

export const aboutHero = {
  eyebrow: "A Full-Spectrum AI Engineering Company",
  title: "Engineering the Resilient, Hyper-Optimized Backbone of the AI Economy",
  description: "TrustGrid.AI engineers production AI systems for the world's most demanding enterprises — from GPU clusters to autonomous agent fleets, across 20+ regulated industries."
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
    description: "The bottleneck to humanity's next great leap forward is physical, not algorithmic. TrustGrid.AI serves as the critical catalyst between theoretical research and scalable, real-world deployment."
  },
  {
    title: "The Sustainability Shield",
    category: "Value to the Planet",
    description: "The AI boom is an energy crisis in disguise. Through carbon-aware workload routing, dynamic voltage/frequency scaling (DVFS), and liquid cooling transitions, we drastically curtail AI's carbon footprint."
  },
  {
    title: "The Trust Anchor",
    category: "Value to Human Safety",
    description: "As autonomous agentic systems make high-stakes decisions, TrustGrid provides verifiable guardrails, explainability traces, and quantum-safe cryptographic envelopes."
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
  { name: "Hemalata", role: "AI Engineer & Tech Lead", category: "leadership", badge: "Engineering Lead" },
  { name: "Prithivin L", role: "Project Lead - EscrowChain", category: "leadership", badge: "Systems Lead" },
  { name: "Shiva Kumar", role: "Senior Product Architect", category: "leadership", badge: "Product Architecture" },
  { name: "Natarajan", role: "Sr Blockchain Architect", category: "engineering" },
  { name: "Ritin", role: "Senior AI Architect", category: "engineering", badge: "AI Architecture" },
  { name: "Viswanath", role: "Sr DevOps Engineer", category: "engineering" },
  { name: "Subashini Kaushik", role: "AI Engineer - LLM / RAG", category: "engineering" },
  { name: "Sonu Priyadharshini", role: "Chief Financial Controller", category: "leadership" },
  { name: "Neha Hebber", role: "FinTech Platform Engineer (IIT Bombay)", category: "engineering", badge: "IIT Bombay" },
  { name: "Swathi Iyer", role: "Systems Engineer (IIT Madras - BTech)", category: "engineering", badge: "IIT Madras" },
  { name: "Aishwarya L Bhatt", role: "AI Performance Marketing & Strategy", category: "advisory" },
  { name: "Chintiya Liu", role: "Industry Consultant", category: "advisory" },
  { name: "Kallol Pal", role: "Technology Advisor", category: "advisory", badge: "Advisor" },
  { name: "Soumya S", role: "Company Secretary & Advisor", category: "advisory" },
  { name: "Aswathi Nair", role: "Corporate Counsel", category: "advisory" },
  { name: "Poojasri", role: "AI/ML Engineer", category: "engineering" }
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
      "Fast-track hiring into TrustGrid Labs"
    ],
    linkText: "Sponsor or Join Next Hackathon",
    url: "/book-ai-diagnostic",
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
    url: "/book-ai-diagnostic",
    isExternal: false
  }
]

export const caseStudiesList: CaseStudy[] = [
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
    city: "Tampa, Florida",
    region: "United States (Americas HQ)",
    tag: "US Executive Office",
    address: "TrustGrid.AI Americas Operations, Tampa, FL, USA",
    phone: "+91 9513288612",
    email: "connect@trustgrid.ai"
  },
  {
    city: "Singapore",
    region: "Asia-Pacific (APAC HQ)",
    tag: "APAC Operations",
    address: "TrustGrid.AI APAC Pte. Ltd., Marina Bay Financial Centre, Singapore",
    phone: "+65 6050 5235",
    email: "connect@trustgrid.ai"
  },
  {
    city: "Bengaluru (Indiranagar)",
    region: "India (R&D Center & Innovation Labs)",
    tag: "Primary R&D Center",
    address: "TRUSTGRID.AI INNOVATION PVT LTD, Indiranagar, Bengaluru, Karnataka, India",
    phone: "+91 9513088612",
    email: "cs@trustgrid.in"
  },
  {
    city: "Bengaluru (Tin Factory)",
    region: "India (Hardware & Systems Lab)",
    tag: "AI Systems Engineering Lab",
    address: "TRUSTGRID.AI Systems Lab, Tin Factory Hub, Bengaluru, Karnataka, India",
    phone: "+91 9513088612",
    email: "cs@trustgrid.in"
  }
]

export const aboutNavMenu = [
  { label: "About TrustGrid.AI", href: "/about" },
  { label: "Leadership & Teams", href: "/about#teams" },
  { label: "Careers & Hackathons", href: "/about#careers-hackathons" },
  { label: "Global Presence", href: "/about#presence" },
  { label: "Case Studies", href: "/about#case-studies" },
  { label: "Insights & Research", href: "/about#insights" },
  { label: "Book AI Diagnostic", href: "/book-ai-diagnostic" }
]
