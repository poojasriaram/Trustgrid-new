import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

  const url = new URL(req.url);

  try {
    // GET: Live Analytics & Security Intelligence Summary from Supabase
    if (req.method === "GET") {
      const [sessionsRes, eventsRes, snapshotsRes, netRes, secRes] = await Promise.all([
        sbRest("analytics_sessions?select=*&order=last_activity_utc.desc&limit=50"),
        sbRest("analytics_events?select=*&order=timestamp_utc.desc&limit=50"),
        sbRest("daily_traffic_snapshots?select=*&order=id.desc&limit=15"),
        sbRest("network_intelligence?select=*&order=total_requests.desc&limit=20"),
        sbRest("security_events?select=*&order=timestamp_utc.desc&limit=20")
      ]);

      const sessions = sessionsRes.ok ? await sessionsRes.json() : [];
      const events = eventsRes.ok ? await eventsRes.json() : [];
      const snapshots = snapshotsRes.ok ? await snapshotsRes.json() : [];
      const networks = netRes.ok ? await netRes.json() : [];
      const securityEvents = secRes.ok ? await secRes.json() : [];

      const channelBreakdown: Record<string, number> = {};
      const countryBreakdown: Record<string, number> = {};
      for (const s of sessions) {
        const ch = s.traffic_source || "Direct";
        const co = s.country || "Unknown";
        channelBreakdown[ch] = (channelBreakdown[ch] || 0) + 1;
        countryBreakdown[co] = (countryBreakdown[co] || 0) + 1;
      }

      return new Response(
        JSON.stringify({
          success: true,
          agent: "analytics-intel-agent",
          status: "ONLINE",
          description: "TRUSTGRID.AI 95-Column Behavioral Telemetry, Geo/ASN & Security Intelligence Agent",
          kpis: {
            sampledSessionsCount: sessions.length,
            sampledEventsCount: events.length,
            dailySnapshotsCount: snapshots.length,
            trackedNetworksCount: networks.length,
            securityIncidentsCount: securityEvents.length
          },
          channelBreakdown,
          countryBreakdown,
          dailySnapshots: snapshots,
          networkIntelligence: networks,
          securityEvents,
          recentSessions: sessions.slice(0, 10),
          recentEvents: events.slice(0, 10)
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: Ingest telemetry events or privacy consent preferences into Supabase
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const nowIso = new Date().toISOString();

      if (body.action === "consent" || body.consentStatus) {
        const userId = String(body.userId || `usr_${Date.now()}`);
        await sbRest("privacy_consent?on_conflict=user_id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({
            user_id: userId,
            consent_status: body.consentStatus || "granted",
            analytics_allowed: body.analyticsAllowed !== false ? 1 : 0,
            marketing_allowed: body.marketingAllowed === true ? 1 : 0,
            ip_masked: "0.0.***.***",
            updated_at: nowIso
          })
        });

        return new Response(
          JSON.stringify({ success: true, agent: "analytics-intel-agent", action: "consent_updated", userId }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const events = Array.isArray(body.events) ? body.events : [body];
      let ingested = 0;

      for (const ev of events) {
        const eventId = ev.event_id || `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const sessionId = ev.session_id || `sess_${Date.now()}`;
        const userId = ev.user_id || `usr_${Date.now()}`;
        const eventName = ev.event_name || "page_view";
        const pagePath = ev.page_path || ev.page || "/";

        await Promise.all([
          sbRest("analytics_events?on_conflict=event_id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify({
              event_id: eventId,
              event_name: eventName,
              event_category: ev.event_category || "telemetry",
              event_action: ev.event_action || "interaction",
              session_id: sessionId,
              user_id: userId,
              timestamp_utc: nowIso,
              page_path: pagePath,
              page_title: ev.page_title || "",
              referrer: ev.referrer || "",
              traffic_source: ev.traffic_source || "Direct",
              utm_source: ev.utm_source || "",
              utm_medium: ev.utm_medium || "",
              utm_campaign: ev.utm_campaign || "",
              device_type: ev.device_type || "Desktop",
              operating_system: ev.operating_system || "Unknown",
              browser: ev.browser || "Unknown",
              country: ev.country || ev.geo_country || "Unknown",
              city: ev.city || ev.geo_city || "Unknown",
              created_at: nowIso
            })
          }),
          sbRest("analytics_sessions?on_conflict=session_id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify({
              session_id: sessionId,
              user_id: userId,
              start_time_utc: nowIso,
              last_activity_utc: nowIso,
              entry_page: pagePath,
              exit_page: pagePath,
              traffic_source: ev.traffic_source || "Direct",
              country: ev.country || ev.geo_country || "Unknown",
              city: ev.city || ev.geo_city || "Unknown"
            })
          })
        ]);
        ingested++;
      }

      return new Response(
        JSON.stringify({
          success: true,
          agent: "analytics-intel-agent",
          processed: ingested,
          timestamp: nowIso
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

