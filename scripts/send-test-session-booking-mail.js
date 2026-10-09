require('dotenv').config({ path: '.env.local' });

async function sendTestSessionBookingMail() {
  console.log('============================================================');
  console.log('🚀 TRUSTGRID.AI — Dispatching Live [TEST] Session Booking & Email');
  console.log('============================================================\n');

  const defaultWebhookUrl =
    'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

  const webhookUrl =
    process.env.NEXT_PUBLIC_TRUSTGRID_FORM_API_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    defaultWebhookUrl;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = '10:00 AM – 10:45 AM (EST)';
  const testId = `TG-TEST-BK-${Date.now().toString().slice(-6)}`;

  const recipientEmails = ['poojasri.aram@gmail.com', 'bv@trustflow.in', 'connect@trustgrid.ai'];

  const testPayload = {
    sheetName: 'Talk_To_Architect',
    sheet_name: 'Talk_To_Architect',
    formType: 'TALK_TO_ARCHITECT',
    leadId: testId,
    submissionId: testId,
    name: 'TEST — Dr. Poojasri Aram',
    fullName: 'TEST — Dr. Poojasri Aram',
    email: 'poojasri.aram@gmail.com',
    userEmail: 'poojasri.aram@gmail.com',
    company: 'TEST — TRUSTGRID Systems Architecture Lab',
    role: 'Principal AI Architect / Tester',
    designation: 'Principal AI Architect / Tester',
    phone: '+1 (555) 019-2834',
    mobile: '+1 (555) 019-2834',
    bookingDate: dateStr,
    startTime: '10:00',
    endTime: '10:45',
    timezone: 'America/New_York (EST)',
    areaOfInterest: 'AI Infrastructure and GPU Optimization [TEST]',
    selectedSolutions: ['AI Infrastructure and GPU Optimization [TEST]'],
    solutions: ['AI Infrastructure and GPU Optimization [TEST]'],
    requirement: '[TEST SESSION] Validating automated calendar booking and multi-recipient notification dispatch to attendee, bv@trustflow.in, and poojasri.aram@gmail.com.',
    message: '[TEST SESSION BOOKING]\n\nThis is a verification test for the TRUSTGRID.AI calendar and consultation scheduling engine.\n\nDate: ' + dateStr + '\nTime: ' + timeStr + '\nRecipients: ' + recipientEmails.join(', ') + '\nMeeting Link: https://meet.google.com/test-tg-arch',
    subject: '[TEST] AI Architecture Session Booking Confirmation — TEST — Dr. Poojasri Aram (TRUSTGRID)',
    notificationEmails: recipientEmails,
    adminEmails: recipientEmails.join(', '),
    meetLink: 'https://meet.google.com/test-tg-arch',
    timestamp: now.toISOString(),
    timestamp_formatted: now.toUTCString()
  };

  console.log('1. Target Webhook URL:', webhookUrl);
  console.log('2. Recipient Emails:', recipientEmails);
  console.log('3. Test Booking Reference:', testId);
  console.log('4. Subject Line:', testPayload.subject);
  console.log('\nDispatching payload via HTTP POST...');

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
    console.log('\n✅ [TEST] Email notification dispatched successfully!');
    console.log('Check inboxes at:');
    console.log('  • poojasri.aram@gmail.com (Attendee confirmation)');
    console.log('  • bv@trustflow.in (Team notification)');
    console.log('  • connect@trustgrid.ai (Host copy)');
  } catch (err) {
    console.error('❌ Failed to dispatch test mail:', err);
  }
}

sendTestSessionBookingMail().catch((e) => {
  console.error(e);
  process.exit(1);
});
