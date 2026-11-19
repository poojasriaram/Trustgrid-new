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

async function sbInsert(table: string, row: Record<string, any>) {
  const res = await sbRest(table, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(row)
  });
  return { table, ok: res.ok };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // GET: Live Lead Directory, Attribution Breakdown & Audit Summary
    if (req.method === "GET") {
      const [leadsRes, formSubRes] = await Promise.all([
        sbRest("leads?select=*&order=created_at.desc&limit=50"),
        sbRest("form_submissions?select=*&order=id.desc&limit=50")
      ]);

      const leads = leadsRes.ok ? await leadsRes.json() : [];
      const formSubmissions = formSubRes.ok ? await formSubRes.json() : [];

      const sourceBreakdown: Record<string, number> = {};
      let testLeadsCount = 0;
      let productionLeadsCount = 0;

      for (const l of leads) {
        const src = l.source || "Direct";
        sourceBreakdown[src] = (sourceBreakdown[src] || 0) + 1;
        if (l.is_test_lead || String(l.name || "").includes("[TEST LEAD]")) {
          testLeadsCount++;
        } else {
          productionLeadsCount++;
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          agent: "lead-intake-agent",
          status: "ONLINE",
          description: "TRUSTGRID.AI Autonomous Lead Intake, Normalization & Multi-Table Routing Agent",
          metrics: {
            totalLeads: leads.length,
            productionLeadsCount,
            testLeadsCount,
            totalFormSubmissions: formSubmissions.length
          },
          sourceBreakdown,
          recentLeads: leads.slice(0, 15),
          recentFormSubmissions: formSubmissions.slice(0, 10)
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: Validate, score, and route incoming lead across Supabase tables
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const name = String(body.name || body.fullName || "").trim();
      const email = String(body.email || body.work_email || "").trim();
      const company = String(body.company || body.company_name || "Enterprise Organization").trim();
      const phone = String(body.phone || body.mobile || "").trim();
      const message = String(body.message || body.requirement || "").trim();
      const formName = String(body.formName || body.form_name || "Website Inbound Form").trim();
      const role = String(body.role || body.designation || "").trim();
      const utmSource = String(body.utm_source || body.utmSource || body.source || "direct").trim();
      const utmMedium = String(body.utm_medium || body.utmMedium || "").trim();
      const utmCampaign = String(body.utm_campaign || body.utmCampaign || "").trim();

      if (!name || !email || !email.includes("@")) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Valid name and email address are required."
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const nowIso = new Date().toISOString();
      const dateStr = nowIso.slice(0, 10).replace(/-/g, "");
      const leadId =
        body.leadId ||
        body.submissionId ||
        `TG-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;

      const isTestLead =
        Boolean(body.isTestLead) ||
        /test|demo|qa|sample|example\.com/i.test(`${name} ${email} ${company}`);

      const cleanName =
        isTestLead && !name.startsWith("[TEST LEAD]") ? `[TEST LEAD] ${name}` : name;

      const tasks: Promise<{ table: string; ok: boolean }>[] = [];

      // 1. Upsert into `leads`
      tasks.push(
        sbRest("leads?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({
            id: leadId,
            name: cleanName,
            email,
            company,
            phone,
            message,
            source: utmSource,
            service: role || formName,
            website: "TRUSTGRID.AI",
            jira_status: "Created",
            is_test_lead: isTestLead,
            metadata_json: body,
            created_at: nowIso,
            updated_at: nowIso
          })
        }).then((r) => ({ table: "leads", ok: r.ok }))
      );

      // 2. Insert into `form_submissions`
      tasks.push(
        sbInsert("form_submissions", {
          submission_id: leadId,
          form_name: formName,
          name: cleanName,
          email,
          company_org: company,
          role: role || null,
          phone: phone || null,
          message_details: message || null,
          utm_source: utmSource,
          utm_campaign: utmCampaign || null,
          timestamp: nowIso
        })
      );

      // 3. Route test leads to `archived_test_leads`
      if (isTestLead) {
        tasks.push(
          sbInsert("archived_test_leads", {
            timestamp: nowIso,
            lead_id: leadId,
            leadtype: formName,
            full_name: cleanName,
            business_email: email,
            company_name: company,
            interested_solution_service: role || formName,
            test_indicators: "Test / QA Submission",
            payload_json: JSON.stringify(body)
          })
        );
      }

      // 4. Route to dedicated form table
      const lowerForm = `${formName} ${utmSource}`.toLowerCase();
      if (lowerForm.includes("linkedin")) {
        tasks.push(
          sbInsert("linkedin_leads", {
            submission_id: leadId,
            full_name: cleanName,
            work_email: email,
            company_name: company,
            phone: phone || null,
            requirement_inquiry: message || null,
            source: "LinkedIn",
            utm_source: utmSource,
            utm_medium: utmMedium || "social",
            utm_campaign: utmCampaign || null,
            status: "New Lead",
            timestamp: nowIso
          })
        );
      } else if (lowerForm.includes("diagnostic") || lowerForm.includes("readiness")) {
        tasks.push(
          sbInsert("ai_diagnostic_leads", {
            submission_id: leadId,
            full_name: cleanName,
            work_email: email,
            company_name: company,
            phone: phone || null,
            source: formName,
            utm_source: utmSource,
            utm_campaign: utmCampaign || null,
            status: "New Lead",
            timestamp: nowIso
          })
        );
      } else if (lowerForm.includes("architect") || lowerForm.includes("session") || lowerForm.includes("consultation")) {
        tasks.push(
          sbInsert("talk_to_architect", {
            submission_id: leadId,
            name: cleanName,
            work_email: email,
            company,
            phone: phone || null,
            architecture_query: message || role || null,
            utm_source: utmSource,
            utm_campaign: utmCampaign || null,
            status: "Booked",
            timestamp: nowIso
          })
        );
      } else {
        tasks.push(
          sbInsert("contact_leads", {
            submission_id: leadId,
            name: cleanName,
            email,
            company,
            designation: role || null,
            phone: phone || null,
            subject: `[TRUSTGRID Lead] ${formName} — ${company}`,
            service_interest: role || formName,
            message: message || null,
            source: formName,
            utm_source: utmSource,
            utm_campaign: utmCampaign || null,
            status: "New Lead",
            timestamp: nowIso
          })
        );
      }

      const settled = await Promise.all(tasks);
      const tablesWritten = settled.filter((t) => t.ok).map((t) => t.table);

      return new Response(
        JSON.stringify({
          success: true,
          agent: "lead-intake-agent",
          leadId,
          isTestLead,
          tablesWritten,
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

