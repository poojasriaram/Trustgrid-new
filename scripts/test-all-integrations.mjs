// Comprehensive Integrations & Quality Audit Test Suite
const BASE_URL = 'http://localhost:3000';

async function testEndpoint(name, url, options, validator) {
  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => null);
    const pass = validator(res.status, data);
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${name} (Status: ${res.status})`);
    if (!pass) {
      console.error('  Response:', data);
    }
    return pass;
  } catch (err) {
    console.error(`[FAIL] ${name} - Network/Runtime Error:`, err.message);
    return false;
  }
}

async function runTests() {
  console.log('========================================================');
  console.log('   TRUSTGRID.AI — INTEGRATIONS & LEAD PIPELINE AUDIT   ');
  console.log('========================================================\n');

  let total = 0;
  let passed = 0;

  // 1. GET /api/leads - Lead Directory
  total++;
  if (await testEndpoint('GET /api/leads (Retrieve Leads)', `${BASE_URL}/api/leads`, { method: 'GET' }, (s, d) => s === 200 && d?.success === true)) passed++;

  // 2. POST /api/leads - Contact Form
  total++;
  if (await testEndpoint('POST /api/leads - Enterprise Contact Lead', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Sarah Lin',
      email: 'sarah.lin@novartis-example.com',
      phone: '+14155552671',
      company: 'Novartis Bio',
      form_type: 'CONTACT',
      requirement: 'Enterprise Bio-Informatics Cluster Scoping',
      interestedSolution: 'BioPharma Computing'
    })
  }, (s, d) => s === 200 && d?.success === true && d?.leadId && d?.jiraStatus)) passed++;

  // 3. POST /api/leads - AI Diagnostic Assessment
  total++;
  if (await testEndpoint('POST /api/leads - AI Diagnostic Assessment', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Marcus Vance',
      email: 'mvance@fintech-alpha.io',
      phone: '+442079460912',
      company: 'Alpha FinTech',
      form_type: 'AI_DIAGNOSTIC',
      requirement: 'Low Latency Inference Benchmark',
      challenges: 'GPU utilization bottleneck'
    })
  }, (s, d) => s === 200 && d?.success === true && d?.leadId)) passed++;

  // 4. POST /api/leads - Proposal / RFP Request
  total++;
  if (await testEndpoint('POST /api/leads - RFP / Proposal Submission', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Elena Rostova',
      email: 'elena@quantum-grid.eu',
      phone: '+493012345678',
      company: 'Quantum Grid GmbH',
      form_type: 'PROPOSAL',
      requirement: 'Turnkey Enterprise Agentic Platform RFP'
    })
  }, (s, d) => s === 200 && d?.success === true && d?.leadId)) passed++;

  // 5. POST /api/leads - Workshop Request
  total++;
  if (await testEndpoint('POST /api/leads - Executive Workshop', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rajesh Sharma',
      email: 'rajesh.s@tata-tech-example.in',
      phone: '+919988776655',
      company: 'Tata Technologies Partner',
      form_type: 'WORKSHOP',
      requirement: 'Boardroom AI Readiness 2-Day Workshop'
    })
  }, (s, d) => s === 200 && d?.success === true && d?.leadId)) passed++;

  // 6. POST /api/leads - LinkedIn Lead Pipeline
  total++;
  if (await testEndpoint('POST /api/leads - LinkedIn API Lead Integration', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'David Chen',
      email: 'dchen@silicon-foundry.com',
      phone: '+16505550199',
      company: 'Silicon Foundry',
      source: 'LinkedIn',
      service: 'LinkedIn API Integration',
      message: 'Inbound message from LinkedIn outreach campaign'
    })
  }, (s, d) => s === 200 && d?.success === true && d?.leadId && d?.source === 'LinkedIn')) passed++;

  // 7. POST /api/leads - Validation Failure Handling (Must reject cleanly with 400, not 500)
  total++;
  if (await testEndpoint('POST /api/leads - Validation Rejection (Bad Email)', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bad Lead',
      email: 'not-an-email',
      phone: '+123456789'
    })
  }, (s, d) => s === 400 && d?.success === false && d?.errors?.email)) passed++;

  // 8. POST /api/leads - Missing Name Rejection
  total++;
  if (await testEndpoint('POST /api/leads - Validation Rejection (Missing Name)', `${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@valid-domain.com',
      phone: '+123456789'
    })
  }, (s, d) => s === 400 && d?.success === false && d?.errors?.name)) passed++;

  console.log(`\nAudit Results: ${passed} / ${total} tests passed.`);
  if (passed === total) {
    console.log('✅ ALL INTEGRATION AUDIT TESTS PASSED FLAWLESSLY!\n');
  } else {
    console.error('❌ SOME TESTS FAILED!\n');
    process.exit(1);
  }
}

runTests();
