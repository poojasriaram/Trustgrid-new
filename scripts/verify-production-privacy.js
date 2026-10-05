const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Fetching https://trustgridnew.vercel.app/privacy-policy ...');
  const res = await fetchUrl('https://trustgridnew.vercel.app/privacy-policy');
  console.log('HTTP Status:', res.statusCode);

  const checks = [
    { name: 'Title has Privacy Notice | TRUSTGRID.AI', pass: res.body.includes('<title>Privacy Notice | TRUSTGRID.AI</title>') },
    { name: 'Canonical URL is https://trustgrid.ai/privacy-policy', pass: res.body.includes('https://trustgrid.ai/privacy-policy') },
    { name: 'Brand TRUSTGRID.AI displayed', pass: res.body.includes('TRUSTGRID.AI') },
    { name: 'Legal entity TRUSTGRID AI INNOVATIONS PRIVATE LIMITED', pass: res.body.includes('TRUSTGRID AI INNOVATIONS PRIVATE LIMITED') },
    { name: 'CIN U72900KA2021PTC144782', pass: res.body.includes('U72900KA2021PTC144782') },
    { name: 'Registered Office 235, 2nd & 3rd Floor...', pass: res.body.includes('235, 2nd &amp; 3rd Floor, 13th Cross Rd, Indiranagar, Bengaluru, Karnataka 560038, India') || res.body.includes('235, 2nd & 3rd Floor, 13th Cross Rd, Indiranagar, Bengaluru, Karnataka 560038, India') },
    { name: 'Contact compliance@trustgrid.ai', pass: res.body.includes('compliance@trustgrid.ai') },
    { name: 'Effective Date 5 October 2026', pass: res.body.includes('5 October 2026') },
    { name: 'AI Disclaimers (12.1 - 12.6)', pass: res.body.includes('12. AI-Specific Disclaimers and Safe Harbours') && res.body.includes('AI-Generated Outputs') && res.body.includes('Model-Training Safe Harbour') },
    { name: 'Blockchain / NFT / IoT Disclaimers', pass: res.body.includes('Blockchain, NFT and IoT Disclaimer') },
    { name: 'Limitation of Liability & Safe Harbour', pass: res.body.includes('14. Limitation of Liability and General Disclaimers') },
    { name: 'Legal review note present', pass: res.body.includes('Legal review note:') },
    { name: 'No old address (SAI CHARAN)', pass: !res.body.includes('SAI CHARAN') },
    { name: 'No placeholder [Insert Date]', pass: !res.body.includes('[Insert Date]') },
    { name: 'Footer Privacy Policy link', pass: res.body.includes('href="/privacy-policy"') },
  ];

  let allPassed = true;
  checks.forEach(c => {
    console.log(`[${c.pass ? 'PASS' : 'FAIL'}] ${c.name}`);
    if (!c.pass) allPassed = false;
  });

  console.log('\nChecking homepage footer link on https://trustgridnew.vercel.app/ ...');
  const homeRes = await fetchUrl('https://trustgridnew.vercel.app/');
  const homeFooterLink = homeRes.body.includes('href="/privacy-policy"');
  console.log(`[${homeFooterLink ? 'PASS' : 'FAIL'}] Homepage footer links to /privacy-policy`);

  if (!allPassed || !homeFooterLink) {
    process.exit(1);
  }
  console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
