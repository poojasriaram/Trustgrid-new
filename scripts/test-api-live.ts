/**
 * Live /api/leads Integration Test Script
 * Tests live Next.js API endpoints for Career, Partner, Sales, and Consultation submissions.
 */

async function testApi() {
  const BASE_URL = process.env.TEST_URL || 'http://localhost:3001'
  let passed = 0
  let failed = 0

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`)
      passed++
    } else {
      console.error(`  ❌ FAIL: ${msg}`)
      failed++
    }
  }

  console.log(`\nTesting API endpoints against ${BASE_URL}/api/leads...\n`)

  // Test 1: Career Form Live Submission
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'CAREER',
        name: 'Alex Vance',
        email: 'alex.vance@enterprise-test.com',
        phone: '+1 555-019-2834',
        role: 'AI Systems & Infrastructure Architect',
        resume: 'alex_resume.pdf',
        message: 'Applying for AI Systems Architect role.'
      })
    })
    const json = await res.json()
    assert(res.ok && json.success === true, 'Career application accepted by /api/leads')
    assert(!!json.leadId, `Career lead ID returned: ${json.leadId}`)
  } catch (err: any) {
    assert(false, `Career API test error: ${err.message}`)
  }

  // Test 2: Partner Form Live Submission
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'PARTNER',
        name: 'Elena Rostova',
        email: 'elena@silicon-labs-test.com',
        phone: '+65 9123 4567',
        company: 'Silicon Labs APAC',
        partnershipType: 'GPU Compute & Bare-Metal Silicon Alliances',
        message: 'Inquiring about cluster benchmarking alliance.'
      })
    })
    const json = await res.json()
    assert(res.ok && json.success === true, 'Partner application accepted by /api/leads')
    assert(!!json.leadId, `Partner lead ID returned: ${json.leadId}`)
  } catch (err: any) {
    assert(false, `Partner API test error: ${err.message}`)
  }

  // Test 3: Sales Enquiry Live Submission
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'CONTACT',
        name: 'David Smith',
        email: 'david@fintech-global-test.com',
        phone: '+1 415-555-2671',
        company: 'Global Fintech Corp',
        selectedSolutions: 'AI Infrastructure & GPU Cluster Engineering',
        message: 'Interested in 100kW rack liquid cooling audit.'
      })
    })
    const json = await res.json()
    assert(res.ok && json.success === true, 'Sales enquiry accepted by /api/leads')
    assert(!!json.leadId, `Sales lead ID returned: ${json.leadId}`)
  } catch (err: any) {
    assert(false, `Sales API test error: ${err.message}`)
  }

  // Test 4: Missing Mandatory Field Rejection Test (missing email)
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'CONTACT',
        name: 'David Smith',
        email: '',
        phone: '+1 415-555-2671'
      })
    })
    const json = await res.json()
    assert(res.status === 400 && json.success === false, 'API rejects submission with missing email (400 Bad Request)')
  } catch (err: any) {
    assert(false, `Validation rejection error: ${err.message}`)
  }

  // Test 5: Missing Mandatory Phone Rejection Test
  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'CONTACT',
        name: 'David Smith',
        email: 'david@test.com',
        phone: ''
      })
    })
    const json = await res.json()
    assert(res.status === 400 && json.success === false, 'API rejects submission with missing phone (400 Bad Request)')
  } catch (err: any) {
    assert(false, `Validation rejection error: ${err.message}`)
  }

  console.log(`\nSummary: ${passed} Passed, ${failed} Failed\n`)
  if (failed > 0) process.exit(1)
}

testApi()
