import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://ndalgvpvpzwrqoikkpyb.supabase.co";
const SUPABASE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  Deno.env.get("SUPABASE_ANON_KEY") ||
  "sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv";

const KNOWLEDGE_CORPUS: Record<string, {
  tag: string;
  answer: string;
  pageLink: { label: string; href: string };
  followUps: string[];
}> = {
  gpu_infrastructure: {
    tag: "AI Infrastructure & GPU Clusters",
    answer:
      "TRUSTGRID.AI engineers high-density GPU compute clusters with 20%+ assured performance optimization. We eliminate GPU memory stalls, thermal throttling, and orchestration bottlenecks across liquid-cooled H100/H200/B200 pods, Kubernetes/Slurm schedulers, and high-throughput vLLM/SGLang inference engines.",
    pageLink: { label: "Explore AI Infrastructure Engineering", href: "/solutions/ai-infra-engineering" },
    followUps: [
      "How do you achieve 20% GPU performance optimization?",
      "What networking fabric do you use for GPU clusters?",
      "Book a 45-min GPU architecture consultation"
    ]
  },
  lossless_networking: {
    tag: "AI Networking & Lossless Fabric",
    answer:
      "Our AI-Native Networking practice designs non-blocking 400G/800G RoCEv2 and InfiniBand rail-optimized spine-leaf fabrics. We configure PFC (Priority Flow Control), ECN congestion management, and GPUDirect RDMA to guarantee zero packet loss during distributed collective operations (AllReduce/AllToAll).",
    pageLink: { label: "Explore AI Networking & Cybersecurity", href: "/solutions/ai-networking-cybersecurity" },
    followUps: [
      "RoCEv2 vs InfiniBand for enterprise AI clusters?",
      "How do you prevent congestion in 800G fabrics?",
      "Schedule an AI network readiness review"
    ]
  },
  agentic_swarms: {
    tag: "Agentic AI & Multi-Agent Factory",
    answer:
      "TRUSTGRID.AI builds production multi-agent swarms with deterministic guardrails, enterprise RAG memory stores, tool-calling governance, and real-time observability. Our turnkey DBOT (Design-Build-Operate-Transfer) AI Factory deploys domain-specialized agents across manufacturing, BFSI, healthcare, and telecom.",
    pageLink: { label: "Explore Practice Areas", href: "/practice-areas" },
    followUps: [
      "How does the Turnkey DBOT AI Factory model work?",
      "How do you secure enterprise RAG and agent tool calls?",
      "Request a Use-Case Workshop"
    ]
  },
  quantum_security: {
    tag: "AI Cybersecurity & Quantum-Safe Defense",
    answer:
      "We secure AI infrastructure and model weights using NIST-standardized Post-Quantum Cryptography (PQC), zero-trust micro-segmentation, air-gapped sovereign enclaves, and continuous red-teaming against prompt injection and model exfiltration.",
    pageLink: { label: "Explore AI Cybersecurity", href: "/solutions/ai-networking-cybersecurity" },
    followUps: [
      "What NIST PQC standards do you implement?",
      "How do you secure air-gapped enterprise LLMs?",
      "Book a Security Architecture Session"
    ]
  },
  ai_value_engineering: {
    tag: "AI Value Engineering & FinOps",
    answer:
      "Using Lean AI Value Engineering and Theory of Constraints (TOC), we audit compute waste, optimize token/watt economics, and reduce GPU CapEx/OpEx by 30-40% while tying every AI deployment to measurable P&L impact.",
    pageLink: { label: "Explore AI Value Engineering", href: "/solutions/ai-value-engineering" },
    followUps: [
      "Run the AI Readiness Diagnostic Scorecard",
      "How do you reduce GPU compute waste by 30-40%?",
      "Book an Executive FinOps Consultation"
    ]
  }
};

function detectTopic(message: string): { topic: string; isConsultationIntent: boolean } {
  const m = message.toLowerCase();
  const isConsultationIntent = /book|schedule|call|meeting|consult|architect|pricing|quote|contact/.test(m);
  if (/roce|infiniband|network|fabric|800g|400g|rdma|packet|latency/.test(m)) {
    return { topic: "lossless_networking", isConsultationIntent };
  }
  if (/agent|swarm|rag|llm|copilot|workflow|dbot|factory/.test(m)) {
    return { topic: "agentic_swarms", isConsultationIntent };
  }
  if (/security|quantum|pqc|cyber|zero-trust|compliance|nist|governance/.test(m)) {
    return { topic: "quantum_security", isConsultationIntent };
  }
  if (/cost|roi|value|finops|budget|waste|lean|diagnostic/.test(m)) {
    return { topic: "ai_value_engineering", isConsultationIntent };
  }
  return { topic: "gpu_infrastructure", isConsultationIntent };
}

async function sbRest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  return res;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);

  try {
    // GET: Restore conversation or inspect live AI Architect agent state
    if (req.method === "GET") {
      const conversationId = url.searchParams.get("conversationId");

      if (conversationId) {
        const [sessRes, msgRes] = await Promise.all([
          sbRest(`chat_sessions?conversation_id=eq.${encodeURIComponent(conversationId)}&limit=1`),
          sbRest(`chat_messages?conversation_id=eq.${encodeURIComponent(conversationId)}&order=created_at.asc&limit=50`)
        ]);
        const sessions = sessRes.ok ? await sessRes.json() : [];
        const messages = msgRes.ok ? await msgRes.json() : [];

        return new Response(
          JSON.stringify({
            success: true,
            agent: "chat-architect-agent",
            conversationId,
            session: sessions[0] || null,
            history: messages
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Default GET (when opened directly in browser): return agent overview + recent sessions
      const [sessRes, msgRes] = await Promise.all([
        sbRest("chat_sessions?select=*&order=updated_at.desc&limit=10"),
        sbRest("chat_messages?select=*&order=created_at.desc&limit=10")
      ]);
      const recentSessions = sessRes.ok ? await sessRes.json() : [];
      const recentMessages = msgRes.ok ? await msgRes.json() : [];

      return new Response(
        JSON.stringify({
          success: true,
          agent: "chat-architect-agent",
          status: "ONLINE",
          description: "TRUSTGRID.AI Autonomous AI Systems Architect RAG & Memory Agent",
          endpoints: {
            inspectOrRestore: "GET /functions/v1/chat-architect-agent?conversationId=<id>",
            chatTurn: "POST /functions/v1/chat-architect-agent { message, conversationId }",
            resetSession: "DELETE /functions/v1/chat-architect-agent?conversationId=<id>"
          },
          knowledgeDomains: Object.keys(KNOWLEDGE_CORPUS),
          activeSessionsSampleCount: recentSessions.length,
          recentSessions,
          recentMessages
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: Execute conversational turn and persist to Supabase `chat_sessions` & `chat_messages`
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const message = String(body.message || "").trim();
      if (!message) {
        return new Response(
          JSON.stringify({ success: false, error: "Message text is required." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const conversationId =
        body.conversationId ||
        `tg_conv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      const nowIso = new Date().toISOString();
      const timeLabel = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      const { topic, isConsultationIntent } = detectTopic(message);
      const kb = KNOWLEDGE_CORPUS[topic] || KNOWLEDGE_CORPUS.gpu_infrastructure;

      // 1. Fetch existing session if present
      const existingRes = await sbRest(
        `chat_sessions?conversation_id=eq.${encodeURIComponent(conversationId)}&limit=1`
      );
      const existingRows = existingRes.ok ? await existingRes.json() : [];
      const existing = existingRows[0];

      const topicsDiscussed = Array.from(
        new Set([...(Array.isArray(existing?.topics_discussed) ? existing.topics_discussed : []), topic])
      );
      const turnCount = Number(existing?.turn_count || 0) + 1;
      const taskStage = isConsultationIntent ? "consultation_seeking" : "solution_evaluating";

      // 2. Upsert `chat_sessions`
      await sbRest("chat_sessions?on_conflict=conversation_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({
          conversation_id: conversationId,
          topics_discussed: topicsDiscussed,
          current_task_stage: taskStage,
          consultation_intent_detected: Boolean(existing?.consultation_intent_detected || isConsultationIntent),
          turn_count: turnCount,
          rolling_summary: `User exploring ${topicsDiscussed.join(", ")}. Latest query: ${message.slice(0, 120)}`,
          updated_at: nowIso
        })
      });

      const userMsgId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const botMsgId = `bot_${Date.now() + 1}_${Math.random().toString(36).slice(2, 6)}`;

      // 3. Insert user and assistant messages into `chat_messages`
      await sbRest("chat_messages?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([
          {
            id: userMsgId,
            conversation_id: conversationId,
            sender: "user",
            text: message,
            timestamp_label: timeLabel,
            topics: [topic],
            created_at: nowIso
          },
          {
            id: botMsgId,
            conversation_id: conversationId,
            sender: "assistant",
            text: kb.answer,
            timestamp_label: timeLabel,
            topics: [topic],
            offering_tag: kb.tag,
            page_link: kb.pageLink,
            suggested_follow_ups: kb.followUps,
            is_lead_prompt: isConsultationIntent,
            created_at: new Date(Date.now() + 10).toISOString()
          }
        ])
      });

      return new Response(
        JSON.stringify({
          success: true,
          agent: "chat-architect-agent",
          conversationId,
          message: {
            id: botMsgId,
            sender: "assistant",
            text: kb.answer,
            timestamp: timeLabel,
            offeringTag: kb.tag,
            pageLink: kb.pageLink,
            suggestedFollowUps: kb.followUps,
            isLeadPrompt: isConsultationIntent
          },
          session: {
            turnCount,
            activeTopic: topic,
            taskStage,
            topicsDiscussed
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DELETE: Clear session
    if (req.method === "DELETE") {
      const conversationId = url.searchParams.get("conversationId");
      if (!conversationId) {
        return new Response(
          JSON.stringify({ success: false, error: "conversationId query parameter required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      await sbRest(`chat_messages?conversation_id=eq.${encodeURIComponent(conversationId)}`, { method: "DELETE" });
      await sbRest(`chat_sessions?conversation_id=eq.${encodeURIComponent(conversationId)}`, { method: "DELETE" });

      return new Response(
        JSON.stringify({ success: true, message: "Conversation cleared in Supabase." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: `Method ${req.method} not supported` }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Internal agent error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

