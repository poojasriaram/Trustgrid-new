/**
 * Comprehensive Automated Form Validation & Integration Test Suite
 * Tests all form validation rules, career/partner/sales scenarios,
 * API integration, and edge cases.
 */

import { validateLeadSubmission, isValidName, isValidEmail, isValidPhone, isValidResumeFormat } from '../lib/validation.js'

let totalPassed = 0
let totalFailed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`)
    totalPassed++
  } else {
    console.error(`  ❌ FAIL: ${message}`)
    totalFailed++
  }
}

console.log('\n=============================================================')
console.log(' TRUSTGRID.AI FORM VALIDATION & INTEGRATION TEST SUITE')
console.log('=============================================================\n')

// 1. Mandatory Name Validation Tests
console.log('--- 1. Name Validation Tests ---')
assert(!isValidName(''), 'Rejects empty name')
assert(!isValidName('   '), 'Rejects whitespace-only name')
assert(!isValidName('A'), 'Rejects single character name')
assert(isValidName('David Vance'), 'Accepts standard name')
assert(isValidName('Dr. Alex Vance-Smith'), 'Accepts name with title and hyphen')
assert(isValidName("Jean-Luc O'Connor"), 'Accepts hyphen and apostrophe')
assert(isValidName('Renée Müller'), 'Accepts accented international characters')
assert(isValidName('田中 太郎'), 'Accepts non-Latin characters')

// 2. Mandatory Email Validation Tests
console.log('\n--- 2. Email Validation Tests ---')
assert(!isValidEmail(''), 'Rejects empty email')
assert(!isValidEmail('invalid-email'), 'Rejects invalid string')
assert(!isValidEmail('name@'), 'Rejects missing domain')
assert(!isValidEmail('name@domain'), 'Rejects missing TLD')
assert(!isValidEmail('@domain.com'), 'Rejects missing user')
assert(isValidEmail('alex@trustgrid.ai'), 'Accepts standard email')
assert(isValidEmail('elena.rostova+ai@enterprise.co.uk'), 'Accepts complex subdomains and tags')

// 3. Mandatory Phone Validation Tests
console.log('\n--- 3. Phone Validation Tests ---')
assert(!isValidPhone('', true), 'Rejects empty phone when required')
assert(!isValidPhone('123', true), 'Rejects too short phone (< 7 digits)')
assert(!isValidPhone('abcdefghij', true), 'Rejects alphabetical string')
assert(isValidPhone('+919876543210', true), 'Accepts Indian +91 format')
assert(isValidPhone('+1 555-019-2834', true), 'Accepts US format with spaces & hyphens')
assert(isValidPhone('+65 9123 4567', true), 'Accepts Singapore format')
assert(isValidPhone('9876543210', true), 'Accepts standard 10-digit number')

// 4. Resume Format & Size Validation Tests
console.log('\n--- 4. Resume Format Validation Tests ---')
assert(isValidResumeFormat(''), 'Optional resume can be empty')
assert(isValidResumeFormat(undefined), 'Optional resume can be undefined')
assert(isValidResumeFormat('resume.pdf'), 'Accepts .pdf file')
assert(isValidResumeFormat('cv.docx'), 'Accepts .docx file')
assert(isValidResumeFormat('document.doc'), 'Accepts .doc file')
assert(isValidResumeFormat('data:application/pdf;base64,JVBERi0xLjc...'), 'Accepts Base64 PDF Data URL')
assert(!isValidResumeFormat('script.exe'), 'Rejects .exe file')
assert(!isValidResumeFormat('image.png'), 'Rejects .png file')
assert(!isValidResumeFormat('virus.bat'), 'Rejects .bat file')

// 5. Career Form Submission Validation
console.log('\n--- 5. Career Form Submission Validation ---')
const validCareerPayload = {
  form_type: 'CAREER',
  name: 'Alex Vance',
  email: 'alex@enterprise.com',
  phone: '+1 555-019-2834',
  role: 'AI Systems & Infrastructure Architect',
  resume: 'alex_vance_resume.pdf'
}
const careerResult = validateLeadSubmission(validCareerPayload)
assert(careerResult.valid === true, 'Valid career submission passes validation')
assert(careerResult.data?.role === 'AI Systems & Infrastructure Architect', 'Preserves role applied for')

const careerMissingRole = {
  form_type: 'CAREER',
  name: 'Alex Vance',
  email: 'alex@enterprise.com',
  phone: '+1 555-019-2834',
  role: ''
}
const careerMissingRoleResult = validateLeadSubmission(careerMissingRole)
assert(careerMissingRoleResult.valid === false, 'Career form rejects submission missing required role')

const careerNoResume = {
  form_type: 'CAREER',
  name: 'Alex Vance',
  email: 'alex@enterprise.com',
  phone: '+1 555-019-2834',
  role: 'High-Density GPU Cluster & Cooling Engineer',
  resume: ''
}
const careerNoResumeResult = validateLeadSubmission(careerNoResume)
assert(careerNoResumeResult.valid === true, 'Career form accepts submission without resume (resume is optional)')

// 6. Partner Form Submission Validation
console.log('\n--- 6. Partner Form Submission Validation ---')
const validPartnerPayload = {
  form_type: 'PARTNER',
  name: 'Elena Rostova',
  email: 'elena@silicon-labs.com',
  phone: '+65 9123 4567',
  company: 'Silicon Labs APAC',
  partnershipType: 'GPU Compute & Bare-Metal Silicon Alliances'
}
const partnerResult = validateLeadSubmission(validPartnerPayload)
assert(partnerResult.valid === true, 'Valid partner submission passes validation')
assert(partnerResult.data?.partnershipType === 'GPU Compute & Bare-Metal Silicon Alliances', 'Preserves partnership interest')

const partnerNoCompany = {
  form_type: 'PARTNER',
  name: 'Elena Rostova',
  email: 'elena@silicon-labs.com',
  phone: '+65 9123 4567',
  company: ''
}
const partnerNoCompanyResult = validateLeadSubmission(partnerNoCompany)
assert(partnerNoCompanyResult.valid === true, 'Partner form accepts submission without company (company is optional)')

// 7. Sales Enquiry Form Submission Validation
console.log('\n--- 7. Sales Enquiry Form Submission Validation ---')
const validSalesPayload = {
  form_type: 'CONTACT',
  name: 'David Smith',
  email: 'david@enterprise.com',
  phone: '+1 415-555-2671',
  company: 'Global Fintech Corp',
  selectedSolutions: 'AI Infrastructure & GPU Cluster Engineering',
  message: 'Exploring 100kW rack liquid cooling deployment.'
}
const salesResult = validateLeadSubmission(validSalesPayload)
assert(salesResult.valid === true, 'Valid sales enquiry passes validation')
assert(salesResult.data?.service === 'AI Infrastructure & GPU Cluster Engineering', 'Preserves selected service interest')

const salesGeneralPayload = {
  form_type: 'CONTACT',
  name: 'David Smith',
  email: 'david@enterprise.com',
  phone: '+1 415-555-2671',
  company: '',
  message: 'General inquiry about enterprise AI architecture.'
}
const salesGeneralResult = validateLeadSubmission(salesGeneralPayload)
assert(salesGeneralResult.valid === true, 'Sales form allows general enquiry without optional company and service')

// 8. Mandatory Field Rejection Tests
console.log('\n--- 8. Mandatory Field Rejection Tests ---')
assert(!validateLeadSubmission({ name: '', email: 'a@b.com', phone: '+1234567890' }).valid, 'Rejects missing name')
assert(!validateLeadSubmission({ name: 'Alex', email: '', phone: '+1234567890' }).valid, 'Rejects missing email')
assert(!validateLeadSubmission({ name: 'Alex', email: 'a@b.com', phone: '' }).valid, 'Rejects missing phone')

console.log('\n=============================================================')
console.log(` SUMMARY: ${totalPassed} Passed, ${totalFailed} Failed`)
console.log('=============================================================\n')

if (totalFailed > 0) {
  process.exit(1)
}
