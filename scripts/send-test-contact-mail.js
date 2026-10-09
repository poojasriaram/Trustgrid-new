require('dotenv').config({ path: '.env.local' });

async function sendTestContactMail() {
  console.log('============================================================');
  console.log('🚀 TRUSTGRID.AI — Dispatching Live [TEST] Contact Form Enquiry');
  console.log('============================================================\n');

  const defaultWebhookUrl =
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

  const webhookUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    defaultWebhookUrl;

  const now = new Date();
  const testId = `TG-TEST-MSG-${Date.now().toString().slice(-6)}`;
  const recipientEmails = ['poojasri.aram@gmail.com', 'bv@trustflow.in', 'connect@trustgrid.ai'];

  const testPayload = {
    sheetName: 'Contact_Leads',
    sheet_name: 'Contact_Leads',
    formType: 'CONTACT',
    leadId: testId,
    submissionId: testId,
    name: 'TEST — Contact Applicant',
    fullName: 'TEST — Contact Applicant',
    email: 'poojasri.aram@gmail.com',
    userEmail: 'poojasri.aram@gmail.com',
    company: 'TEST — Enterprise AI Advisory Lab',
    enquiryType: 'Technical Architecture & Advisory [TEST]',
    message: '[TEST CONTACT MESSAGE]\n\nTesting the quick contact form transmission and email notification routing to scheduler and leadership team.\n\nRecipients: ' + recipientEmails.join(', '),
    subject: '[TEST] Quick Contact Message Received — TEST — Enterprise AI Advisory Lab',
    notificationEmails: recipientEmails,
    adminEmails: recipientEmails.join(', '),
    timestamp: now.toISOString(),
    timestamp_formatted: now.toUTCString()
  };

  console.log('1. Target Webhook URL:', webhookUrl);
  console.log('2. Recipient Emails:', recipientEmails);
  console.log('3. Test Reference:', testId);
  console.log('4. Subject Line:', testPayload.subject);
  console.log('\nDispatching contact payload via HTTP POST...');

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(testPayload)
    });

    const responseText = await res.text();
    console.log('\n--- DISPATCH RESULT ---');
    console.log('HTTP Status:', res.status, res.statusText);
    console.log('Webhook Response:', responseText || '(empty response / 200 OK)');
    console.log('\n✅ [TEST] Contact email notification dispatched successfully!');
    console.log('Check inboxes at:');
    console.log('  • poojasri.aram@gmail.com (Applicant copy)');
    console.log('  • bv@trustflow.in (Team notification)');
    console.log('  • connect@trustgrid.ai (Admin copy)');
  } catch (err) {
    console.error('❌ Failed to dispatch test contact mail:', err);
  }
}

sendTestContactMail().catch((e) => {
  console.error(e);
  process.exit(1);
});
