require('dotenv').config({ path: '.env.local' });
const { normalizeLead } = require('../lib/lead-normalization');
const { createJiraLead } = require('../lib/jira-service');

async function testFloatingLead() {
  console.log('Testing Floating Quick Lead Creation in Live Jira...');

  const floatingLead = normalizeLead({
    form_type: 'FLOATING_LEAD',
    formId: 'form_floating_quick_lead',
    formName: 'Quick Inquiry Floating Form',
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.com',
    phone: '+1 555-7721',
    company: 'Cyberdyne Systems AI',
    message: 'Requesting quick consultation on high-density liquid cooling clusters.',
    ctaSource: 'floating_quick_cta'
  });

  console.log('Normalized Lead Summary:', floatingLead.jiraSummary);
  console.log('Lead ID:', floatingLead.leadId);

  const res = await createJiraLead(floatingLead);
  console.log('Result:', JSON.stringify(res, null, 2));

  if (res.success && res.issueKey) {
    console.log(`\n🎉 SUCCESS! Floating lead created in live Jira: ${res.issueUrl}`);
    console.log(`Created ${res.subtasks ? res.subtasks.length : 0} follow-up subtasks!`);
  }
}

testFloatingLead().catch(console.error);
