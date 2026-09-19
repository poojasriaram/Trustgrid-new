/**
 * Live Jira Workspace Verification Test for project DFX
 */
require('dotenv').config({ path: '.env.local' });

async function verifyLiveJira() {
  const baseUrl = (process.env.JIRA_BASE_URL || 'https://trustworkz.atlassian.net').replace(/\/$/, '');
  const projectKey = process.env.JIRA_PROJECT_KEY || 'DFX';
  const email = process.env.JIRA_EMAIL || 'poojasri@trustgrid.ai';
  const token = process.env.JIRA_API_TOKEN;

  console.log('--- Testing Live Jira Authentication & Metadata ---');
  console.log('Base URL:', baseUrl);
  console.log('Project Key:', projectKey);
  console.log('User Email:', email);
  console.log('Token Length:', token ? token.length : 0);

  const authHeader = `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}`;

  // 1. Fetch current user
  const userRes = await fetch(`${baseUrl}/rest/api/2/myself`, {
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json'
    }
  });

  if (!userRes.ok) {
    console.error('❌ Authentication failed:', userRes.status, await userRes.text());
    process.exit(1);
  }

  const userData = await userRes.json();
  console.log('✅ Authenticated successfully as:', userData.displayName, `(${userData.emailAddress})`);

  // 2. Fetch Project DFX metadata
  const projRes = await fetch(`${baseUrl}/rest/api/2/project/${projectKey}`, {
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json'
    }
  });

  if (!projRes.ok) {
    console.error(`❌ Project ${projectKey} not accessible:`, projRes.status, await projRes.text());
    process.exit(1);
  }

  const projData = await projRes.json();
  console.log('✅ Found Project:', projData.name, `(${projData.key})`);
  console.log('Available Issue Types in Project:');
  const issueTypes = projData.issueTypes.map(it => ({ id: it.id, name: it.name, subtask: it.subtask }));
  console.table(issueTypes);

  // 3. Test Live Lead Creation via Jira Service
  const { normalizeLead } = require('../lib/lead-normalization');
  const { createJiraLead } = require('../lib/jira-service');

  const testLead = normalizeLead({
    form_type: 'AI_DIAGNOSTIC',
    name: 'TrustGrid Live Verification Test',
    email: 'poojasri@trustgrid.ai',
    phone: '+1 555-0199',
    company: 'TrustGrid Engineering Systems',
    requirement: 'Live end-to-end website lead capture verification to DealFlow (DFX) workspace.',
    selectedSolutions: ['AI Infrastructure & AI Data Center Engineering']
  });

  console.log('\n--- Creating Live Test Lead in Jira ---');
  const liveResult = await createJiraLead(testLead);
  console.log('Live Jira Creation Result:', JSON.stringify(liveResult, null, 2));

  if (liveResult.success && liveResult.issueKey) {
    console.log(`\n🎉 SUCCESS! Live Jira lead created at: ${liveResult.issueUrl}`);
  } else {
    console.error('\n❌ Lead creation failed:', liveResult.error);
  }
}

verifyLiveJira().catch(err => {
  console.error('Fatal live test error:', err);
  process.exit(1);
});
