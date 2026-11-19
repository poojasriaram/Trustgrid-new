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

async function sbRest(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // GET: Return LinkedIn connection status, scheduled queue, and post history
    if (req.method === "GET") {
      const [connRes, postsRes] = await Promise.all([
        sbRest("linkedin_connections?select=id,account_id,account_name,account_email,organization_id,organization_name,expires_at,updated_at&limit=5"),
        sbRest("linkedin_posts?select=*&order=created_at.desc&limit=50")
      ]);

      const connections = connRes.ok ? await connRes.json() : [];
      const posts = postsRes.ok ? await postsRes.json() : [];
      const activeConn = connections[0] || null;

      return new Response(
        JSON.stringify({
          success: true,
          agent: "linkedin-publisher-agent",
          status: "ONLINE",
          description: "TRUSTGRID.AI Autonomous LinkedIn Organization Publishing & Scheduling Agent",
          connected: Boolean(activeConn),
          connectionSummary: activeConn,
          totalPosts: posts.length,
          scheduledQueueCount: posts.filter((p: any) => p.status === "SCHEDULED").length,
          posts
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: Save draft, schedule post, or publish post
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const text = String(body.text || "").trim();
      const visibility = body.visibility === "CONNECTIONS" ? "CONNECTIONS" : "PUBLIC";
      const action = String(body.action || (body.scheduledAt ? "schedule" : "draft")).toLowerCase();
      const organizationId = String(body.organizationId || "TRUSTGRID_AI");

      if (!text) {
        return new Response(
          JSON.stringify({ success: false, error: "Post text is required." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const nowIso = new Date().toISOString();
      const postId = body.id || `tg_post_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      const status =
        action === "publish"
          ? "PUBLISHED"
          : action === "schedule" || body.scheduledAt
          ? "SCHEDULED"
          : "DRAFT";

      const postRecord = {
        id: postId,
        text,
        visibility,
        organization_id: organizationId,
        status,
        scheduled_at: body.scheduledAt || null,
        published_at: status === "PUBLISHED" ? nowIso : null,
        created_at: nowIso,
        updated_at: nowIso
      };

      await sbRest("linkedin_posts?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify(postRecord)
      });

      return new Response(
        JSON.stringify({
          success: true,
          agent: "linkedin-publisher-agent",
          post: postRecord,
          message: `Post ${status.toLowerCase()} in Supabase.`
        }),
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

