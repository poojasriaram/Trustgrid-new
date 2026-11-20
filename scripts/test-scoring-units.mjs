import { calculateLeadScore } from '../lib/lead-scoring.js';
import { isValidEmail, isValidPhone } from '../lib/validation.js';

console.log('--- Testing Lead Scoring & Validation ---');

// 1. Validation tests
console.log('Valid corporate email:', isValidEmail('architect@nvidia.com') === true ? '✅ PASS' : '❌ FAIL');
console.log('Invalid email rejected:', isValidEmail('invalid-email') === false ? '✅ PASS' : '❌ FAIL');
console.log('Disposable email rejected:', isValidEmail('fake@mailinator.com') === false ? '✅ PASS' : '❌ FAIL');

console.log('Valid E.164 phone:', isValidPhone('+14155552671', false) === true ? '✅ PASS' : '❌ FAIL');
console.log('Valid Indian phone:', isValidPhone('+919876543210', false) === true ? '✅ PASS' : '❌ FAIL');
console.log('Short bad phone rejected:', isValidPhone('123', false) === false ? '✅ PASS' : '❌ FAIL');

// 2. Lead scoring tests
const highLead = calculateLeadScore({
  email: 'cto@jpmorgan.com',
  company: 'JPMorgan Chase',
  designation: 'Chief Technology Officer',
  requirement: '1000 GPU cluster deployment and low-latency inference architecture',
  phone: '+14155550199',
  pageUrl: 'https://trustgrid.ai/solutions/ai-infra-engineering',
  source: 'Book AI Diagnostic'
});

console.log(`High-value Enterprise Lead Score: ${highLead.score} / 100 (Tier: ${highLead.tier}, Priority: ${highLead.priority})`);
if (highLead.score >= 80 && highLead.priority === 'HIGH') {
  console.log('✅ Enterprise Lead Scoring: PASSED');
} else {
  console.error('❌ Enterprise Lead Scoring FAILED');
}

const midLead = calculateLeadScore({
  email: 'john.doe@gmail.com',
  company: 'Startup Lab',
  requirement: 'Looking for advice',
  source: 'Website Contact'
});

console.log(`Generic Inbound Lead Score: ${midLead.score} / 100 (Tier: ${midLead.tier}, Priority: ${midLead.priority})`);
if (midLead.score < 50) {
  console.log('✅ Generic Lead Scoring: PASSED');
} else {
  console.error('❌ Generic Lead Scoring FAILED');
}
