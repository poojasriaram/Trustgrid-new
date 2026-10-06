/**
 * Test script to verify LinkedIn OAuth flow, Leads validation, SQLite storage,
 * and service integrations.
 */

require('dotenv').config({ path: '.env.local' })
const { getDatabase } = require('../lib/db/index.ts')
const {
  getLinkedInAuthorizationUrl,
  getLinkedInStatus,
  saveLinkedInConnection,
  disconnectLinkedIn
} = require('../lib/services/linkedin.ts')
const { validateLeadSubmission } = require('../lib/validation.ts')
const { insertLeadDb, getAllLeadsDb, saveOAuthStateDb, verifyAndConsumeOAuthStateDb } = require('../lib/db/leads.ts')

async function runTests() {
  console.log('=== Starting TRUSTGRID.AI LinkedIn Integration Verification ===\n')

  // 1. Database Initialization
  console.log('1. Checking SQLite Database schema & tables...')
  const db = getDatabase()
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  const tableNames = tables.map(t => t.name)
  console.log('Found tables:', tableNames.filter(t => ['leads', 'linkedin_connections', 'oauth_states'].includes(t)))

  if (!tableNames.includes('leads') || !tableNames.includes('linkedin_connections') || !tableNames.includes('oauth_states')) {
    throw new Error('Required tables missing in SQLite database!')
  }
  console.log('✓ SQLite tables verified.\n')

  // 2. OAuth State Generation & CSRF Validation
  console.log('2. Testing OAuth CSRF State generation & verification...')
  const testState = 'test_state_' + Date.now()
  saveOAuthStateDb(testState, 'linkedin')
  const isValidFirst = verifyAndConsumeOAuthStateDb(testState, 'linkedin')
  const isValidSecond = verifyAndConsumeOAuthStateDb(testState, 'linkedin') // should be false (consumed)

  console.log(`State valid on first check: ${isValidFirst} (Expected: true)`)
  console.log(`State valid on second check (replay prevention): ${isValidSecond} (Expected: false)`)
  if (!isValidFirst || isValidSecond) {
    throw new Error('CSRF State validation logic failed!')
  }
  console.log('✓ OAuth CSRF protection verified.\n')

  // 3. OAuth Authorization URL Generation
  console.log('3. Testing LinkedIn Authorization URL generator...')
  const authUrl = getLinkedInAuthorizationUrl('state_test_123', 'https://trustgrid.ai/auth/linkedin/callback')
  console.log('Generated URL:', authUrl)
  if (!authUrl.includes('response_type=code') || !authUrl.includes('client_id=77yqll4e8pup2c') || !authUrl.includes('openid')) {
    throw new Error('Authorization URL generation failed!')
  }
  console.log('✓ LinkedIn OAuth URL properly formatted with current modern scopes.\n')

  // 4. Server-Side Lead Validation
  console.log('4. Testing Server-Side Lead Validation...')
  const invalid1 = validateLeadSubmission({ email: 'bademail', company: '' })
  console.log('Missing name & company rejected:', !invalid1.valid, invalid1.errors)

  const invalid2 = validateLeadSubmission({ name: 'John Doe', email: 'john@invalid', company: 'Acme' })
  console.log('Invalid email format rejected:', !invalid2.valid, invalid2.errors)

  const validLead = validateLeadSubmission({
    name: 'Sarah Connor',
    email: 'sarah@cyberdyne.com',
    company: 'Cyberdyne Systems',
    phone: '+1 415 555 2671',
    message: 'Interested in LinkedIn lead routing for GPU clusters',
    source: 'LinkedIn',
    service: 'LinkedIn API Integration'
  })
  console.log('Valid lead accepted:', validLead.valid, validLead.data)
  if (!validLead.valid || validLead.data.source !== 'LinkedIn') {
    throw new Error('Validation failed for valid lead!')
  }
  console.log('✓ Server-side validation verified.\n')

  // 5. Database Insertion & Retrieval
  console.log('5. Testing Database Insertion of LinkedIn Lead...')
  const testLeadId = 'TG-TEST-' + Date.now()
  insertLeadDb({
    id: testLeadId,
    name: validLead.data.name,
    email: validLead.data.email,
    company: validLead.data.company,
    phone: validLead.data.phone,
    message: validLead.data.message,
    source: validLead.data.source,
    service: validLead.data.service,
    website: 'TRUSTGRID.AI',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const allLeads = getAllLeadsDb()
  const foundLead = allLeads.find(l => l.id === testLeadId)
  if (!foundLead) {
    throw new Error('Lead was not found in SQLite database!')
  }
  console.log('Retrieved Lead from SQLite:', {
    id: foundLead.id,
    name: foundLead.name,
    email: foundLead.email,
    company: foundLead.company,
    source: foundLead.source,
    service: foundLead.service
  })
  console.log('✓ SQLite lead persistence verified.\n')

  // 6. LinkedIn Token Storage & Status
  console.log('6. Testing LinkedIn Token Storage & Status Retrieval...')
  await saveLinkedInConnection({
    accessToken: 'test_token_secret',
    refreshToken: 'test_refresh',
    expiresIn: 3600,
    accountId: 'admin',
    accountName: 'Pooja Sri',
    accountEmail: 'poojasri@trustgrid.ai'
  })

  const statusConnected = await getLinkedInStatus('admin')
  console.log('Connection status:', statusConnected)
  if (!statusConnected.connected || statusConnected.accountName !== 'Pooja Sri') {
    throw new Error('LinkedIn status check failed!')
  }

  await disconnectLinkedIn('admin')
  const statusDisconnected = await getLinkedInStatus('admin')
  console.log('Status after disconnect:', statusDisconnected)
  if (statusDisconnected.connected) {
    throw new Error('Disconnect failed!')
  }
  console.log('✓ LinkedIn token security & status cycle verified.\n')

  console.log('=== ALL TESTS PASSED SUCCESSFULLY ===')
}

runTests().catch(err => {
  console.error('Test failed with error:', err)
  process.exit(1)
})
