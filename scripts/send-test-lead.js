require('dotenv').config({ path: '.env.local' });
const { insertLeadDb, getAllLeadsDb } = require('../lib/db/leads.ts');
const { appendLeadToGoogleSheets } = require('../lib/services/google-sheets.ts');
const { createLinkedInJiraLead } = require('../lib/services/jira.ts');
const { validateLeadSubmission } = require('../lib/validation.ts');

async function sendTestLead() {
  console.log('--- Submitting Live Test LinkedIn Lead ---');
  const rawInput = {
    name: 'Marcus Vance',
    email: 'marcus.vance@vanguard-ai.io',
    company: 'Vanguard Autonomous Systems',
    phone: '+1 (415) 890-4421',
    message: 'Seeking enterprise LinkedIn pipeline sync and automated DealFlow ticket routing for AI agent deployments.',
    source: 'LinkedIn',
    service: 'LinkedIn API Integration'
  };

  const validation = validateLeadSubmission(rawInput);
  if (!validation.valid) {
    throw new Error('Validation failed: ' + validation.errorMessage);
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const leadId = `TG-${dateStr}-${randomSuffix}`;

  const leadRecord = {
    id: leadId,
    name: validation.data.name,
    email: validation.data.email,
    company: validation.data.company,
    phone: validation.data.phone || '',
    message: validation.data.message || '',
    source: 'LinkedIn',
    service: 'LinkedIn API Integration',
    website: 'TRUSTGRID.AI',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  // 1. Store in SQLite Database
  console.log('1. Saving in SQLite database...');
  insertLeadDb(leadRecord);

  // 2. Dispatch to Google Sheets
  console.log('2. Forwarding to Google Sheets Webhook...');
  const sheetResult = await appendLeadToGoogleSheets({
    leadId,
    name: leadRecord.name,
    email: leadRecord.email,
    company: leadRecord.company,
    phone: leadRecord.phone,
    message: leadRecord.message,
    source: 'LinkedIn',
    service: 'LinkedIn API Integration',
    createdAt: leadRecord.createdAt
  });

  // 3. Dispatch to Jira
  console.log('3. Creating DealFlow Jira Issue...');
  const jiraResult = await createLinkedInJiraLead({
    leadId,
    name: leadRecord.name,
    email: leadRecord.email,
    company: leadRecord.company,
    phone: leadRecord.phone,
    message: leadRecord.message,
    source: 'LinkedIn',
    service: 'LinkedIn API Integration',
    website: 'TRUSTGRID.AI'
  });

  // 4. Retrieve back from SQLite to verify storage
  const allLeads = getAllLeadsDb();
  const savedInDb = allLeads.find(l => l.id === leadId);

  console.log('\n--- CAPTURED RECORD SUMMARY ---');
  console.log('Lead ID:', leadId);
  console.log('Database Persistence Status:', savedInDb ? 'VERIFIED_IN_SQLITE' : 'FAILED');
  console.log('Google Sheets Sync Status:', sheetResult);
  console.log('Jira Issue Status:', jiraResult);
  console.log('Full Captured Record:', JSON.stringify(savedInDb, null, 2));
}

sendTestLead().catch(err => {
  console.error('Execution Error:', err);
  process.exit(1);
});
