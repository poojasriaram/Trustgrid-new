/**
 * ============================================================================
 * TRUSTGRID.AI — SUPABASE PERSISTENCE & TABLE VERIFICATION SCRIPT
 * ============================================================================
 * Verifies Supabase PostgREST connectivity, checks existence and row count
 * for all 31 Sheet 1 tables, all 10 CRM tables, and Edge Functions.
 * ============================================================================
 */

// Node 18+ has native fetch built-in

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndalgvpvpzwrqoikkpyb.supabase.co';
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv';

const SHEET_TABLES = [
  'live_traffic_events',
  'daily_traffic_snapshots',
  'consulting_sessions',
  'contact_leads',
  'ai_diagnostic_leads',
  'ai_readiness_leads',
  'workshop_requests',
  'rfp_proposals',
  'talk_to_architect',
  'form_consultation_bookings',
  'form_diagnostic_assessments',
  'form_inbound_leads',
  'partner_applications',
  'form_partner_applications',
  'career_applications',
  'form_career_applications',
  'chatbot_leads',
  'form_chatbot_conversations',
  'quick_enquiry_leads',
  'linkedin_leads',
  'newsletter_subscribers',
  'google_ad_leads',
  'page_views',
  'sessions',
  'cta_clicks',
  'sessions_intelligence',
  'traffic_attribution',
  'geo_intelligence',
  'network_security_log',
  'archived_test_leads',
  'form_submissions'
];

const CRM_TABLES = [
  'leads',
  'session_bookings',
  'chat_sessions',
  'chat_messages',
  'analytics_events',
  'users',
  'companies',
  'contacts',
  'campaigns',
  'activities',
  'tasks',
  'website_events',
  'jira_sync_logs',
  'google_sheet_sync_logs',
  'audit_logs'
];

async function checkTable(tableName) {
  const start = Date.now();
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?select=*&limit=1`, {
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        Prefer: 'count=exact'
      }
    });
    const latencyMs = Date.now() - start;

    if (res.status === 200 || res.status === 206) {
      const contentRange = res.headers.get('content-range') || '';
      const totalCount = contentRange.includes('/') ? parseInt(contentRange.split('/')[1], 10) : 0;
      return { status: 200, exists: true, count: isNaN(totalCount) ? 0 : totalCount, latencyMs };
    }
    return { status: res.status, exists: false, count: 0, latencyMs };
  } catch (err) {
    return { status: 500, exists: false, error: err.message, latencyMs: Date.now() - start };
  }
}

async function verifyEdgeFunction(slug) {
  const start = Date.now();
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${slug}`, { method: 'GET' });
    const latencyMs = Date.now() - start;
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return { status: res.status, online: true, agent: data.agent || slug, latencyMs };
    }
    return { status: res.status, online: false, latencyMs };
  } catch (err) {
    return { status: 500, online: false, error: err.message, latencyMs: Date.now() - start };
  }
}

async function main() {
  console.log('====================================================================');
  console.log('🚀 TRUSTGRID.AI — SUPABASE ARCHITECTURE & TABLE VERIFICATION');
  console.log(`Endpoint: ${SUPABASE_URL}`);
  console.log('====================================================================\n');

  console.log('--- 1. VERIFYING 31 SHEET 1 & INGESTION TABLES ---');
  let sheetActiveCount = 0;
  let sheetTotalRows = 0;
  for (const t of SHEET_TABLES) {
    const info = await checkTable(t);
    if (info.exists) {
      sheetActiveCount++;
      sheetTotalRows += info.count;
      console.log(`  ✅ [200 OK] Table "${t.padEnd(28)}" -> ${String(info.count).padStart(6)} rows (${info.latencyMs}ms)`);
    } else {
      console.log(`  ❌ [${info.status}] Table "${t.padEnd(28)}" -> NOT FOUND`);
    }
  }

  console.log(`\n📊 Sheet Tables Summary: ${sheetActiveCount}/${SHEET_TABLES.length} tables active (${sheetTotalRows.toLocaleString()} total rows)\n`);

  console.log('--- 2. VERIFYING CORE CRM & ANALYTICS TABLES ---');
  let crmActiveCount = 0;
  for (const t of CRM_TABLES) {
    const info = await checkTable(t);
    if (info.exists) {
      crmActiveCount++;
      console.log(`  ✅ [200 OK] Table "${t.padEnd(24)}" -> ${String(info.count).padStart(5)} rows (${info.latencyMs}ms)`);
    } else {
      console.log(`  ⚠️ [${info.status}] Table "${t.padEnd(24)}" -> Pending DDL execution`);
    }
  }
  console.log(`\n📊 CRM Tables Summary: ${crmActiveCount}/${CRM_TABLES.length} tables active\n`);

  console.log('--- 3. VERIFYING DEPLOYED SUPABASE EDGE FUNCTIONS ---');
  const edgeFunctions = ['lead-intake-agent', 'calendar-booking-agent', 'chat-architect-agent'];
  for (const fn of edgeFunctions) {
    const info = await verifyEdgeFunction(fn);
    if (info.online) {
      console.log(`  ✅ [ONLINE] Edge Function "${fn.padEnd(24)}" (${info.latencyMs}ms)`);
    } else {
      console.log(`  ❌ [OFFLINE] Edge Function "${fn.padEnd(24)}" (${info.status})`);
    }
  }

  console.log('\n====================================================================');
  console.log('🏁 Verification Complete');
  console.log('====================================================================\n');
}

main();
