require('dotenv').config({ path: '.env.local' });
const { normalizeLead } = require('../lib/lead-normalization');

async function testSheetDispatch() {
  const defaultWebhookUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

  console.log('Testing Google Sheet Webhook Dispatch to:', defaultWebhookUrl);

  const quickLead = normalizeLead({
    form_type: 'FLOATING_LEAD',
    formId: 'form_floating_quick_lead',
    formName: 'Quick Inquiry Floating Form',
    name: 'Robert Langdon',
    email: 'robert@harvard-ai.edu',
    phone: '+1 555-4920',
    company: 'Harvard Applied AI Labs',
    message: 'Quick inquiry regarding liquid cooled GPU cluster benchmark.',
    ctaSource: 'floating_quick_cta'
  });

  const payload = {
    ...quickLead.rawPayload,
    sheetName: 'Contact_Leads',
    sheet_name: 'Contact_Leads',
    formType: 'Contact_Leads',
    lead_id: quickLead.leadId,
    submissionId: quickLead.leadId,
    leadId: quickLead.leadId,
    form_type: quickLead.leadType,
    form_id: quickLead.formId,
    form_name: quickLead.formName,
    fullName: quickLead.name,
    name: quickLead.name,
    email: quickLead.email,
    work_email: quickLead.email,
    phone: quickLead.phone,
    company: quickLead.company,
    role: quickLead.jobTitle,
    designation: quickLead.jobTitle,
    requirement: quickLead.requirement,
    message: quickLead.message,
    subject: `[TG] Quick Inquiry - ${quickLead.company}`,
    timestamp: quickLead.timestampIso
  };

  try {
    const res = await fetch(defaultWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    console.log('Webhook Response Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Webhook Response Body:', text.slice(0, 300));
    console.log('✅ Google Sheet Webhook successfully received the quick enquiry!');
  } catch (err) {
    console.error('❌ Webhook error:', err);
  }
}

testSheetDispatch().catch(console.error);
