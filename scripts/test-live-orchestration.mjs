import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.TRUSTGRID_SHEET1_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
  'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || 'https://trustworkz.atlassian.net').replace(/\/$/, '');
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'DFX';
const JIRA_EMAIL = process.env.JIRA_EMAIL || 'poojasri@trustgrid.ai';
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN || '';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndalgvpvpzwrqoikkpyb.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv';

async function runAudit() {
  console.log('=================================================================');
  console.log(' TRUSTGRID.AI — LIVE INTEGRATIONS, CAPTURING & QUALITY AUDIT     ');
  console.log('=================================================================\n');

  const testTimestamp = new Date().toISOString();
  const testLeadId = `TG-TEST-${Date.now()}`;
  const results = {
    googleSheets: false,
    jiraAuth: false,
    jiraCreate: false,
    supabase: false
  };

  // 1. Google Sheets Webhook Test
  console.log('--- 1. Testing Google Sheet Webhook Sync (Sheet #1) ---');
  console.log(`Endpoint: ${GOOGLE_SHEET_WEBHOOK_URL.slice(0, 50)}...`);
  try {
    const sheetPayload = {
      sheetName: 'Archived_Test_Leads',
      sheet_name: 'Archived_Test_Leads',
      formType: 'Archived_Test_Leads',
      leadId: testLeadId,
      submissionId: testLeadId,
      isTestLead: true,
      timestamp: testTimestamp,
      Lead_ID: testLeadId,
      Capture_Date: testTimestamp.slice(0, 10),
      Capture_Time: testTimestamp.slice(11, 19),
      Full_Name: '[TG-TEST] System Quality Audit',
      Business_Email: 'audit@example.com',
      Phone_Number: '+1 555-0199',
      Company: 'TrustGrid Engineering Systems',
      Service_Interest: 'Enterprise AI Infrastructure',
      Message: 'Automated end-to-end integration and dual-write test',
      Source: 'Quality Audit Test',
      Lead_Status: 'TEST',
      Lead_Score: 95,
      Assigned_To: 'Principal Solutions Architect',
      Notes: 'Live verification test'
    };

    const sheetRes = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetPayload)
    });

    const sheetText = await sheetRes.text();
    console.log(`HTTP Status: ${sheetRes.status}`);
    console.log(`Response: ${sheetText.slice(0, 150)}`);
    if (sheetRes.ok) {
      results.googleSheets = true;
      console.log('✅ Google Sheets Webhook: SUCCESS');
    } else {
      console.error('❌ Google Sheets Webhook failed:', sheetText);
    }
  } catch (err) {
    console.error('❌ Google Sheets Webhook Exception:', err.message);
  }

  // 2. Jira Cloud REST API Test
  console.log('\n--- 2. Testing Jira Cloud CRM Integration (DFX Workspace) ---');
  console.log(`Jira URL: ${JIRA_BASE_URL} | Project: ${JIRA_PROJECT_KEY} | User: ${JIRA_EMAIL}`);
  if (!JIRA_API_TOKEN) {
    console.error('❌ JIRA_API_TOKEN is missing');
  } else {
    const authHeader = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`;
    try {
      // 2a. Verify Authentication
      const userRes = await fetch(`${JIRA_BASE_URL}/rest/api/3/myself`, {
        headers: { Authorization: authHeader, Accept: 'application/json' }
      });
      if (!userRes.ok) {
        console.error('❌ Jira Authentication failed:', userRes.status, await userRes.text());
      } else {
        const userData = await userRes.json();
        results.jiraAuth = true;
        console.log(`✅ Jira Authenticated as: ${userData.displayName} (${userData.emailAddress})`);

        // 2b. Check Project & Issue Types
        const projRes = await fetch(`${JIRA_BASE_URL}/rest/api/3/project/${JIRA_PROJECT_KEY}`, {
          headers: { Authorization: authHeader, Accept: 'application/json' }
        });
        if (projRes.ok) {
          const projData = await projRes.json();
          console.log(`✅ Jira Project Verified: ${projData.name} (${projData.key})`);
        }

        // 2c. Test Issue Creation in DFX with Lead_Record
        const createPayload = {
          fields: {
            project: { key: JIRA_PROJECT_KEY },
            summary: `[TG-TEST] Lead - System Quality Audit - ${testLeadId}`,
            description: {
              type: 'doc',
              version: 1,
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: `[AUTOMATED TEST LEAD]\nLead ID: ${testLeadId}\nEmail: audit@example.com\nCompany: TrustGrid QA\nRequirement: End-to-end CRM lead capture verification.`
                    }
                  ]
                }
              ]
            },
            issuetype: { name: 'Lead_Record' }
          }
        };

        const createRes = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(createPayload)
        });

        if (createRes.ok) {
          const newIssue = await createRes.json();
          results.jiraCreate = true;
          console.log(`✅ Jira Lead Ticket Created: ${newIssue.key} (${JIRA_BASE_URL}/browse/${newIssue.key})`);
        } else {
          const errText = await createRes.text();
          console.error(`❌ Jira Issue Creation failed (${createRes.status}):`, errText);
        }
      }
    } catch (err) {
      console.error('❌ Jira Request Exception:', err.message);
    }
  }

  // 3. Supabase REST API Test
  console.log('\n--- 3. Testing Supabase Dual-Write Pipeline ---');
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  try {
    const supaPayload = {
      timestamp: testTimestamp,
      lead_id: testLeadId,
      leadtype: 'AUDIT_VERIFICATION',
      full_name: '[TG-TEST] System Quality Audit',
      business_email: 'audit@example.com',
      company_name: 'TrustGrid Engineering Systems',
      interested_solution_service: 'Enterprise AI Architecture & Dual-Write Sync',
      test_indicators: 'Automated Pipeline Audit',
      payload_json: JSON.stringify({ leadId: testLeadId, auditAt: testTimestamp })
    };

    const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/archived_test_leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify(supaPayload)
    });

    if (supaRes.ok) {
      const supaData = await supaRes.json();
      results.supabase = true;
      console.log(`✅ Supabase Direct Sync: SUCCESS (Row ID: ${supaData[0]?.id || 'created'})`);
    } else {
      const errText = await supaRes.text();
      console.error('❌ Supabase Direct Sync failed:', supaRes.status, errText);
    }
  } catch (err) {
    console.error('❌ Supabase Exception:', err.message);
  }

  console.log('\n=================================================================');
  console.log(' FINAL AUDIT SUMMARY:');
  console.log(`  1. Google Sheets Webhook: ${results.googleSheets ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  2. Jira Cloud Auth:       ${results.jiraAuth ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  3. Jira Ticket Creation:  ${results.jiraCreate ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  4. Supabase Dual-Write:   ${results.supabase ? '✅ PASSED' : '❌ FAILED'}`);
  console.log('=================================================================\n');

  if (results.googleSheets && results.jiraAuth && results.jiraCreate && results.supabase) {
    console.log('🎉 ALL CAPTURING PIPELINES VERIFIED 100% OPERATIONAL!');
    process.exit(0);
  } else {
    console.error('⚠️ SOME INTEGRATION TESTS FAILED');
    process.exit(1);
  }
}

runAudit();
