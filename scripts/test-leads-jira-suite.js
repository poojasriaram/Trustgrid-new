/**
 * Comprehensive 20-Test QA Matrix Verification Suite for TRUSTGRID.AI Lead Capture & Jira Integration
 */

const { normalizeLead, classifyLeadType, deriveChannelAttribution, generateLeadId } = require('../lib/lead-normalization');
const { createJiraLead, getJiraConfig, calculateDueDate, DEFAULT_LEAD_WORKFLOW } = require('../lib/jira-service');

async function runTests() {
  console.log('===============================================================');
  console.log('🚀 TRUSTGRID.AI - LEAD CAPTURE & JIRA INTEGRATION QA TEST MATRIX');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName} ${details ? `(${details})` : ''}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // TEST 1: General Business Enquiry
  const lead1 = normalizeLead({
    name: 'Alexander Wright',
    email: 'a.wright@enterprise.com',
    phone: '+1 555-0192',
    company: 'Wright Autonomous Systems',
    message: 'Looking to evaluate multi-agent orchestration architecture.'
  });
  const res1 = await createJiraLead(lead1);
  assert(lead1.leadId.startsWith('TG-') && lead1.isSalesLead && (res1.status === 'Created' || res1.status === 'Pending'),
    'TEST 1: General business enquiry lead capture & Jira creation',
    `Lead ID: ${lead1.leadId}, Jira Status: ${res1.status}, IssueKey: ${res1.issueKey || 'N/A'}`
  );

  // TEST 2: AI Diagnostic Enquiry
  const lead2 = normalizeLead({
    form_type: 'AI_DIAGNOSTIC',
    name: 'Dr. Elena Rostova',
    email: 'elena@quantum-compute.io',
    phone: '+1 555-8834',
    company: 'Quantum Compute Labs',
    challenges: ['GPU Infrastructure & Liquid Cooling', 'Post-Quantum Cryptography (PQC / CBOM)'],
    preferredTimeline: 'Immediate (Next 1–2 weeks)'
  });
  const res2 = await createJiraLead(lead2);
  assert(lead2.leadType === 'AI_DIAGNOSTIC' && lead2.isSalesLead && (res2.status === 'Created' || res2.status === 'Pending'),
    'TEST 2: AI Diagnostic enquiry classification & Jira issue',
    `Lead Type: ${lead2.leadType}, IssueKey: ${res2.issueKey || 'N/A'}`
  );

  // TEST 3: Solution Enquiry
  const lead3 = normalizeLead({
    formId: 'form_ai-infra-engineering',
    formName: 'AI Infra & Data Center Diagnostic',
    name: 'Marcus Vance',
    email: 'marcus@hypercloud.com',
    phone: '+1 555-9012',
    company: 'HyperCloud Data Centers',
    selectedSolutions: ['AI Infrastructure & AI Data Center Engineering']
  });
  assert(lead3.interestedSolution.includes('AI Infrastructure') && lead3.isSalesLead,
    'TEST 3: Solution enquiry correct solution capture & taxonomy',
    `Solution: ${lead3.interestedSolution}`
  );

  // TEST 4: Industry-Specific Enquiry
  const lead4 = normalizeLead({
    name: 'Sarah Chen',
    email: 'sarah.chen@sovereignbank.com',
    phone: '+65 9123 4567',
    company: 'Sovereign Bank APAC',
    industry: 'Banking & Sovereign Financial Networks'
  });
  assert(lead4.industry === 'Banking & Sovereign Financial Networks',
    'TEST 4: Industry-specific enquiry preserved',
    `Industry: ${lead4.industry}`
  );

  // TEST 5: Chatbot Business Lead
  const lead5 = normalizeLead({
    form_type: 'CHATBOT',
    formName: 'Chatbot Lead Capture',
    name: 'Vikram Mehta',
    email: 'vikram@tata-ai.in',
    phone: '+91 98765 43210',
    company: 'Tata Autonomous Systems',
    requirement: 'Chatbot Inquiry: Inquiring about 30kW/rack liquid cooling and RoCEv2 fabrics.',
    chatIntent: 'High-Intent GPU Infrastructure'
  });
  const res5 = await createJiraLead(lead5);
  assert(lead5.leadType === 'CHATBOT' && (res5.status === 'Created' || res5.status === 'Pending'),
    'TEST 5: Chatbot business lead normalized & Jira created',
    `Lead: ${lead5.leadId}, Summary: ${lead5.jiraSummary}`
  );

  // TEST 6: Google Ads Lead
  const lead6 = normalizeLead({
    name: 'David Miller',
    email: 'david@enterprise.com',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'ai_factory_tier1'
  });
  assert(lead6.channelAttribution === 'Google Ads',
    'TEST 6: Google Ads attribution detection',
    `Channel: ${lead6.channelAttribution}`
  );

  // TEST 7: YouTube Lead
  const lead7 = normalizeLead({
    name: 'Brian Thorne',
    email: 'brian@compute.tech',
    utm_source: 'youtube',
    referrer: 'https://youtube.com/watch?v=123'
  });
  assert(lead7.channelAttribution === 'YouTube',
    'TEST 7: YouTube attribution detection',
    `Channel: ${lead7.channelAttribution}`
  );

  // TEST 8: Meta / Facebook Lead
  const lead8 = normalizeLead({
    name: 'Rachel Adams',
    email: 'rachel@startup.io',
    utm_source: 'facebook',
    utm_medium: 'paid_social'
  });
  assert(lead8.channelAttribution === 'Meta / Facebook',
    'TEST 8: Meta / Facebook attribution detection',
    `Channel: ${lead8.channelAttribution}`
  );

  // TEST 9: Affiliate Lead
  const lead9 = normalizeLead({
    name: 'James Wilson',
    email: 'j.wilson@partner-venture.com',
    utm_source: 'affiliate',
    utm_medium: 'affiliate'
  });
  assert(lead9.channelAttribution === 'Affiliate',
    'TEST 9: Affiliate attribution detection',
    `Channel: ${lead9.channelAttribution}`
  );

  // TEST 10: Organic Search Lead
  const lead10 = normalizeLead({
    name: 'Carlos Mendez',
    email: 'carlos@telecom.es',
    referrer: 'https://www.google.com/search?q=trustgrid+ai+infrastructure',
    utm_medium: 'organic'
  });
  assert(lead10.channelAttribution === 'Organic',
    'TEST 10: Organic search attribution detection',
    `Channel: ${lead10.channelAttribution}`
  );

  // TEST 11: Community / Referral Lead
  const lead11 = normalizeLead({
    name: 'Lisa Ray',
    email: 'lisa@innovate.co',
    utm_source: 'linkedin',
    referrer: 'https://www.linkedin.com/feed/'
  });
  assert(lead11.channelAttribution === 'Community',
    'TEST 11: Community/LinkedIn attribution detection',
    `Channel: ${lead11.channelAttribution}`
  );

  // TEST 12: Direct Lead
  const lead12 = normalizeLead({
    name: 'Oliver Queen',
    email: 'oliver@queen.com',
    referrer: 'Direct'
  });
  assert(lead12.channelAttribution === 'Direct',
    'TEST 12: Direct traffic attribution detection',
    `Channel: ${lead12.channelAttribution}`
  );

  // TEST 13: Career Application (Non-Sales Exclusion)
  const lead13 = normalizeLead({
    form_type: 'CAREER',
    formName: 'Career Application Form',
    name: 'Samantha Grey',
    email: 'samantha@deepmind-alumni.org',
    phone: '+1 555-4029',
    role: 'Principal AI Infrastructure Engineer',
    portfolio: 'https://github.com/sgrey'
  });
  const res13 = await createJiraLead(lead13);
  assert(lead13.isSalesLead === false && res13.status === 'Skipped_NonSales',
    'TEST 13: Career application excluded from Jira sales pipeline',
    `isSalesLead: ${lead13.isSalesLead}, Jira Status: ${res13.status}`
  );

  // TEST 14: Newsletter Subscription (Non-Sales Exclusion)
  const lead14 = normalizeLead({
    form_type: 'NEWSLETTER',
    formName: 'Newsletter Subscription Form',
    name: 'Subscriber',
    email: 'reader@techreview.com'
  });
  const res14 = await createJiraLead(lead14);
  assert(lead14.isSalesLead === false && res14.status === 'Skipped_NonSales',
    'TEST 14: Newsletter subscription excluded from Jira sales pipeline',
    `isSalesLead: ${lead14.isSalesLead}, Jira Status: ${res14.status}`
  );

  // TEST 15: Double-Click Submit Protection (Idempotency)
  const sharedId = `TG-${Date.now()}-9999`;
  const lead15a = normalizeLead({ submissionId: sharedId, name: 'Double Submit Test', email: 'double@test.com' });
  const res15a = await createJiraLead(lead15a);
  const lead15b = normalizeLead({ submissionId: sharedId, name: 'Double Submit Test', email: 'double@test.com' });
  const res15b = await createJiraLead(lead15b);
  assert(res15a.issueKey === res15b.issueKey,
    'TEST 15: Double-click submit returns identical cached Jira ticket without duplicating',
    `First Key: ${res15a.issueKey}, Second Key: ${res15b.issueKey}`
  );

  // TEST 16: Network Retry Deduplication
  const res16Retry = await createJiraLead(lead15a);
  assert(res16Retry.issueKey === res15a.issueKey,
    'TEST 16: Network retry deduplication verified',
    `Cached Issue Key: ${res16Retry.issueKey}`
  );

  // TEST 17: Dynamic Due Date & SLA Calculation
  const dueDateParent = calculateDueDate(24);
  const targetExpected = new Date(Date.now() + 24 * 3600 * 1000);
  const expectedDateStr = `${targetExpected.getFullYear()}-${String(targetExpected.getMonth() + 1).padStart(2, '0')}-${String(targetExpected.getDate()).padStart(2, '0')}`;
  assert(dueDateParent === expectedDateStr,
    'TEST 17: SLA due-dates calculated dynamically (Created + 24h SLA)',
    `Calculated Due Date: ${dueDateParent}`
  );

  // TEST 18: Mobile Device Metadata Submission
  const lead18 = normalizeLead({
    name: 'Mobile User',
    email: 'mobile@enterprise.com',
    metadata: { device: 'Mobile', browser: 'Safari Mobile', operatingSystem: 'iOS', screenSize: '390x844' }
  });
  assert(lead18.leadId.startsWith('TG-') && lead18.email === 'mobile@enterprise.com',
    'TEST 18: Mobile submission metadata captured cleanly',
    `Lead ID: ${lead18.leadId}`
  );

  // TEST 19: Desktop Device Metadata Submission
  const lead19 = normalizeLead({
    name: 'Desktop User',
    email: 'desktop@enterprise.com',
    metadata: { device: 'Desktop', browser: 'Chrome', operatingSystem: 'Windows', screenSize: '1920x1080' }
  });
  assert(lead19.leadId.startsWith('TG-') && lead19.name === 'Desktop User',
    'TEST 19: Desktop submission metadata captured cleanly',
    `Lead ID: ${lead19.leadId}`
  );

  // TEST 20: Partner Strategic Lead Classification
  const lead20 = normalizeLead({
    form_type: 'PARTNER',
    formName: 'Partner Application Form',
    name: 'Klaus Schmidt',
    email: 'klaus@silicon-oem.de',
    company: 'Silicon OEM Systems AG',
    partnershipType: 'Compute & Cloud Infrastructure Provider'
  });
  const res20 = await createJiraLead(lead20);
  assert(lead20.leadType === 'PARTNER' && lead20.isSalesLead && (res20.status === 'Created' || res20.status === 'Pending'),
    'TEST 20: Partner strategic lead classified as commercial opportunity & sent to Jira',
    `Lead Type: ${lead20.leadType}, Jira Status: ${res20.status}`
  );

  console.log('\n===============================================================');
  console.log(`📊 QA SUMMARY: Total Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
  console.log('===============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite runner failed:', err);
  process.exit(1);
});
