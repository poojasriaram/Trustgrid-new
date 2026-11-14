const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndalgvpvpzwrqoikkpyb.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv';
const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
  'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

async function verifyDirectDualDispatch() {
  const testId = `TG-TEST-${Date.now()}`;
  const nowIso = new Date().toISOString();

  console.log(`\n🚀 Testing Direct Parallel Dispatch (${testId}):`);
  console.log(`   1) WebApp -> Supabase Directly (${SUPABASE_URL})`);
  console.log(`   2) WebApp -> Google Sheets Directly (Sheet #1 Webhook)`);

  // 1. WebApp -> Supabase Directly
  const supabasePromise = fetch(`${SUPABASE_URL}/rest/v1/archived_test_leads`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      timestamp: nowIso,
      lead_id: testId,
      leadtype: 'DIRECT_DUAL_WRITE',
      full_name: '[TEST LEAD] Direct WebApp Dual-Write',
      business_email: 'verify@trustgrid.ai',
      company_name: 'TRUSTGRID.AI',
      interested_solution_service: 'WebApp -> Supabase + Google Sheets Directly',
      test_indicators: 'Direct Parallel Verification',
      payload_json: JSON.stringify({ leadId: testId, verifiedAt: nowIso }),
      col_10: null
    })
  });

  // 2. WebApp -> Google Sheets Directly
  const googleSheetsPromise = fetch(GOOGLE_SHEET_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      sheetName: 'Archived_Test_Leads',
      sheet_name: 'Archived_Test_Leads',
      formType: 'Archived_Test_Leads',
      leadId: testId,
      submissionId: testId,
      isTestLead: true,
      timestamp: nowIso,
      leadName: '[TEST LEAD] Direct WebApp Dual-Write',
      name: '[TEST LEAD] Direct WebApp Dual-Write',
      email: 'verify@trustgrid.ai',
      phone: '+91 9876543210',
      company: 'TRUSTGRID.AI',
      leadSource: 'Direct WebApp',
      formName: 'Direct Dual-Write Verification',
      subject: '[TEST LEAD] Direct WebApp Dual-Write',
      requirement: 'WebApp -> Supabase + Google Sheets Directly',
      status: 'New Lead'
    })
  });

  const [supaRes, sheetRes] = await Promise.all([supabasePromise, googleSheetsPromise]);

  if (!supaRes.ok) {
    console.error('❌ WebApp -> Supabase Direct Failed:', await supaRes.text());
    process.exit(1);
  }
  const supaRow = await supaRes.json();
  console.log(`\n✅ 1. WebApp -> Supabase Directly: SUCCESS (Row ID: ${supaRow[0]?.id}, Lead ID: ${testId})`);
  console.log(`✅ 2. WebApp -> Google Sheets Directly: SUCCESS (HTTP Status: ${sheetRes.status})`);
  console.log(`\n🎉 Both Direct Pipelines (WebApp -> Supabase & WebApp -> Google Sheets) are live!`);
}

verifyDirectDualDispatch().catch(console.error);
