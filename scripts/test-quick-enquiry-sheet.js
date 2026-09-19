// test-quick-enquiry-sheet.js
const https = require('https');

const webhookUrl = 'https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec';

const payload = {
  sheetName: "Quick_Enquiry_Leads",
  formType: "FLOATING_LEAD",
  submissionId: "TG-" + new Date().toISOString().slice(0, 10).replace(/-/g, '') + "-8899",
  name: "Devendra Verma",
  fullName: "Devendra Verma",
  email: "devendra@cloudscale.ai",
  work_email: "devendra@cloudscale.ai",
  phone: "+91 98844 11223",
  company: "CloudScale AI Enterprise",
  requirement: "Need urgent multi-agent governance architecture audit & guardrail integration.",
  source: "Quick Floating Form",
  utm_source: "website_floating_pill",
  utm_medium: "quick_inquiry",
  utm_campaign: "website_lead_capture",
  status: "New Lead",
  timestamp: new Date().toISOString()
};

console.log("Sending Quick Enquiry payload to Google Apps Script Sheet 1 Webhook...");
console.log("Payload:", JSON.stringify(payload, null, 2));

const url = new URL(webhookUrl);
const req = https.request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Response Body: ${data}`);
  });
});

req.on('error', (err) => {
  console.error('Request failed:', err.message);
});

req.write(JSON.stringify(payload));
req.end();
