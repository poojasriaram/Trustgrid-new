import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ShieldCheck, Mail, MapPin, Building2, Calendar, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Notice | TRUSTGRID.AI',
  description: 'Official Privacy Notice of TRUSTGRID AI INNOVATIONS PRIVATE LIMITED (TRUSTGRID.AI). Details personal data processing, enterprise security controls, AI disclaimers, and data subject rights under DPDP Act 2023, GDPR, and CCPA/CPRA.',
  alternates: {
    canonical: 'https://trustgrid.ai/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="main-content" id="main-content">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                Legal & Enterprise Compliance
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/80">
                <Building2 className="w-3.5 h-3.5" />
                TRUSTGRID.AI
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Privacy Notice
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-6">
              This Privacy Notice describes how <strong>TRUSTGRID AI INNOVATIONS PRIVATE LIMITED</strong> (“TRUSTGRID.AI”, “we”, “us” or “our”) collects, uses, protects, and handles personal data in connection with our website and generative AI enterprise platforms.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span><strong>Effective Date:</strong> 5 October 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span><strong>Last Updated:</strong> 5 October 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-sky-400" />
                <span><strong>Contact:</strong> compliance@trustgrid.ai</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-12 md:py-16 bg-slate-950 text-slate-300">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            {/* MAIN BODY OF PRIVACY NOTICE */}
            <article className="space-y-10 leading-relaxed text-slate-300">
                
                {/* PREAMBLE */}
                <div id="company-entity" className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
                  <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                    TRUSTGRID.AI — Official Notice
                  </div>
                  <div className="text-xs text-slate-400">
                    <p><strong>Effective Date:</strong> 5 October 2026</p>
                    <p><strong>Last Updated:</strong> 5 October 2026</p>
                  </div>
                  <p>
                    This Privacy Notice is issued by <strong>TRUSTGRID AI INNOVATIONS PRIVATE LIMITED</strong> (CIN: U72900KA2021PTC144782), a company incorporated under the Companies Act, 2013, having its registered office at:
                  </p>
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-sm text-cyan-200">
                    <strong>235, 2nd &amp; 3rd Floor, 13th Cross Rd, Indiranagar, Bengaluru, Karnataka 560038, India</strong>
                  </div>
                  <p>
                    (hereinafter “TRUSTGRID.AI”, “we”, “us” or “our”).
                  </p>
                  <p>
                    This Notice describes the personal data we process in connection with our website at <a href="https://trustgrid.ai/" className="text-cyan-400 hover:underline">https://trustgrid.ai/</a> and our generative AI-powered Software-as-a-Service platforms and related services, including Global Warranty Chain Management (AI + Blockchain/NFTs), Global Supply Chain Financing (AI + Blockchain + IoT), AI-Powered Accounting and Auditing Co-Pilot, Gen AI Industrial Optimisation, Gen AI + AI Ops solutions (including for Manufacturing, Customer Experience, Knowledge Process Outsourcing and Lean Sigma), Enterprise Smart Agents, and associated AI engineering and video workflow tools (collectively, the “Services”).
                  </p>
                  <p>
                    We process personal data in accordance with applicable law, including the Digital Personal Data Protection Act, 2023 (India) (“DPDP Act”), the Digital Personal Data Protection Rules, 2025, the General Data Protection Regulation (EU) 2016/679 (“GDPR”), the California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”), and other applicable data protection legislation, to the extent applicable.
                  </p>
                </div>

                {/* SECTION 1 */}
                <section id="section-1" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    1. Data Controller and Contact
                  </h2>
                  <p>
                    TRUSTGRID.AI is the data controller in respect of personal data collected via our website and for our own marketing and operational purposes. Where an enterprise customer uses our Services to process personal data of its employees, customers or suppliers, that customer may be the data controller and TRUSTGRID.AI may act as a data processor pursuant to the applicable agreement.
                  </p>
                  <p>
                    For any queries regarding this Notice or to exercise applicable rights, contact:
                  </p>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> <a href="mailto:compliance@trustgrid.ai" className="text-cyan-400 hover:underline">compliance@trustgrid.ai</a>
                    </p>
                    <p>
                      <strong>Postal address:</strong> 235, 2nd &amp; 3rd Floor, 13th Cross Rd, Indiranagar, Bengaluru, Karnataka 560038, India
                    </p>
                  </div>
                </section>

                {/* SECTION 2 */}
                <section id="section-2" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    2. Categories of Personal Data Processed
                  </h2>
                  <p>
                    We may process the following categories of personal data:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>Identity and contact data, such as name, email address, telephone number, company name and job title.</li>
                    <li>Account and transactional data, such as login credentials and billing information processed through third-party payment processors.</li>
                    <li>Communications data, including correspondence, support requests, enquiries and feedback.</li>
                    <li>Usage and technical data, including IP address, device identifiers, browser type, pages visited, session data, cookies and similar technologies.</li>
                    <li>Service-related data uploaded or inputted by customers into the Platforms, which may include personal data of third parties.</li>
                    <li>In limited cases, sensitive or special-category personal data only where expressly provided by the data principal and processed on a lawful basis under applicable law.</li>
                  </ul>
                  <p className="text-slate-400 text-sm">
                    We do not intentionally collect personal data of children under 18 years of age.
                  </p>
                </section>

                {/* SECTION 3 */}
                <section id="section-3" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    3. Purposes of Processing and Lawful Bases
                  </h2>
                  <p>
                    We process personal data for purposes including:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>Providing, maintaining and supporting the Services.</li>
                    <li>Account administration, billing and customer support.</li>
                    <li>Improving Services, product performance and user experience.</li>
                    <li>Security, fraud prevention, abuse detection and access control.</li>
                    <li>Analytics and service performance measurement.</li>
                    <li>Non-intrusive marketing and communications where permitted by law.</li>
                    <li>Marketing communications, optional cookies and optional AI model improvement where consent is required and obtained.</li>
                    <li>Compliance with legal, regulatory, tax, accounting and reporting obligations.</li>
                    <li>Establishing, exercising or defending legal claims.</li>
                  </ul>
                  <p>
                    Where applicable, processing may rely on performance of a contract, consent, legitimate uses/interests, compliance with legal obligations, or another lawful basis recognised by applicable law.
                  </p>
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-sm text-cyan-200">
                    Customer data uploaded to the Services is processed according to the documented instructions of the relevant customer where TRUSTGRID.AI acts as a processor and is not used to train our foundational generative AI models unless the customer provides explicit opt-in consent.
                  </div>
                </section>

                {/* SECTION 4 */}
                <section id="section-4" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    4. Disclosure of Personal Data
                  </h2>
                  <p>
                    We do not sell personal data.
                  </p>
                  <p>
                    We may disclose personal data:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>To processors and sub-processors providing hosting, analytics, payment, communication, security and related services under appropriate contractual protections.</li>
                    <li>To professional advisers, auditors and consultants subject to confidentiality obligations.</li>
                    <li>Where required by law, regulation, court order or valid legal process.</li>
                    <li>In connection with a merger, acquisition, financing, restructuring or sale of assets, subject to appropriate safeguards.</li>
                    <li>With the data principal’s consent or as otherwise permitted by applicable law.</li>
                  </ul>
                  <p className="text-sm text-slate-400">
                    A current list of material sub-processors may be made available upon reasonable request, subject to confidentiality and security considerations.
                  </p>
                </section>

                {/* SECTION 5 */}
                <section id="section-5" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    5. International Transfers
                  </h2>
                  <p>
                    Personal data may be transferred to and processed in jurisdictions outside the data principal’s country of residence, including India and other countries where TRUSTGRID.AI or its service providers operate.
                  </p>
                  <p>
                    Where required by applicable law, including for transfers from the EEA or UK, we implement appropriate safeguards such as Standard Contractual Clauses or other recognised transfer mechanisms.
                  </p>
                  <p>
                    Where data is transferred to third parties, TRUSTGRID.AI seeks to use reasonable contractual, organisational and technical safeguards appropriate to the nature of the processing.
                  </p>
                </section>

                {/* SECTION 6 */}
                <section id="section-6" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    6. Data Security
                  </h2>
                  <p>
                    We implement reasonable and appropriate technical and organisational measures designed to protect personal data, including, where appropriate:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>Encryption in transit and at rest.</li>
                    <li>Access controls and authentication mechanisms.</li>
                    <li>Multi-factor authentication where supported.</li>
                    <li>Monitoring and security controls.</li>
                    <li>Regular security assessments and reviews.</li>
                    <li>Measures designed to prevent unauthorised access, disclosure, alteration or destruction.</li>
                  </ul>

                  <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 p-5 space-y-2">
                    <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Disclaimer on Absolute Security
                    </h3>
                    <p className="text-sm text-amber-100/90 leading-relaxed">
                      No method of transmission over the Internet or method of electronic storage is completely secure.
                    </p>
                    <p className="text-sm text-amber-100/90 leading-relaxed">
                      While TRUSTGRID.AI takes reasonable measures to protect personal data, we do not warrant or guarantee absolute security against every possible threat, including sophisticated cyber-attacks, zero-day vulnerabilities, failures of third-party infrastructure, telecommunications failures, or other events beyond our reasonable control.
                    </p>
                  </div>
                </section>

                {/* SECTION 7 */}
                <section id="section-7" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    7. Retention
                  </h2>
                  <p>
                    We retain personal data only for as long as reasonably necessary to fulfil the purposes for which it was collected, comply with legal, accounting or reporting obligations, resolve disputes, enforce agreements, or establish, exercise or defend legal claims.
                  </p>
                  <p>
                    When personal data is no longer required, it will be securely deleted, anonymised or otherwise handled in accordance with applicable law and our retention procedures.
                  </p>
                </section>

                {/* SECTION 8 */}
                <section id="section-8" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    8. Data Principal Rights
                  </h2>
                  <p>
                    Subject to applicable law, individuals may have rights including:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>Access to personal data.</li>
                    <li>Correction and completion of inaccurate or incomplete data.</li>
                    <li>Erasure/deletion where legally applicable.</li>
                    <li>Withdrawal of consent where processing is based on consent.</li>
                    <li>Data portability where applicable.</li>
                    <li>Restriction of or objection to certain processing where applicable.</li>
                    <li>Rights relating to sale or sharing of personal information under applicable CCPA/CPRA requirements.</li>
                    <li>The right to lodge a complaint with a competent supervisory authority or the Data Protection Board of India, where applicable.</li>
                  </ul>
                  <p>
                    Requests may be submitted to <a href="mailto:compliance@trustgrid.ai" className="text-cyan-400 font-semibold hover:underline">compliance@trustgrid.ai</a>.
                  </p>
                  <p className="text-sm text-slate-400">
                    We may verify the identity and authority of a requester and may refuse or limit requests where permitted by applicable law, including requests that are manifestly unfounded, excessive or repetitive.
                  </p>
                </section>

                {/* SECTION 9 */}
                <section id="section-9" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    9. Cookies and Similar Technologies
                  </h2>
                  <p>
                    We may use strictly necessary cookies and, where applicable, analytics, performance, functionality and other similar technologies.
                  </p>
                  <p>
                    Where consent is required, we will seek consent before using non-essential cookies or similar technologies.
                  </p>
                  <p>
                    Users may manage cookie preferences through our cookie-management mechanisms where available and through browser settings.
                  </p>
                </section>

                {/* SECTION 10 */}
                <section id="section-10" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    10. Children's Data
                  </h2>
                  <p>
                    Our Services are not directed to individuals under 18 years of age.
                  </p>
                  <p>
                    We do not knowingly process children's personal data except where permitted and appropriately authorised under applicable law. If we become aware that personal data has been collected from a child in circumstances where it should not have been collected, we will take reasonable steps to delete it or otherwise handle it as required by applicable law.
                  </p>
                </section>

                {/* SECTION 11 */}
                <section id="section-11" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    11. Personal Data Breach
                  </h2>
                  <p>
                    We maintain processes intended to detect, assess, respond to and, where legally required, notify relevant authorities and affected individuals regarding personal data breaches.
                  </p>
                  <p>
                    Any notification will be made within the timeframes and through the channels required by applicable law.
                  </p>
                  <p>
                    TRUSTGRID.AI shall not be liable for delays caused by circumstances beyond its reasonable control, provided that we continue to take legally required and reasonably practicable steps.
                  </p>
                </section>

                {/* SECTION 12 */}
                <section id="section-12" className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    12. AI-Specific Disclaimers and Safe Harbours
                  </h2>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.1 AI-Generated Outputs
                    </h3>
                    <p>
                      Generative AI outputs, including outputs from Smart Agents, Accounting/Auditing Co-Pilot, Industrial Optimisation and related tools, may contain inaccuracies, hallucinations, omissions, incomplete information or biases.
                    </p>
                    <p>
                      AI-generated outputs are provided for informational and operational assistance only and do not constitute professional, legal, financial, accounting, auditing, engineering, medical or other professional advice.
                    </p>
                    <p>
                      Users remain responsible for independently reviewing and verifying outputs before relying on them or using them to make decisions.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.2 No Guarantee of Accuracy
                    </h3>
                    <p>
                      TRUSTGRID.AI does not warrant that AI-generated content will always be accurate, complete, current, reliable, unbiased or suitable for a particular purpose.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.3 Customer-Provided Data
                    </h3>
                    <p>
                      Customers and users are responsible for the lawfulness, accuracy, completeness and appropriateness of data they upload, input or process through the Services.
                    </p>
                    <p>
                      Where TRUSTGRID.AI acts as a processor, processing is performed according to the customer's documented instructions and applicable agreement.
                    </p>
                    <p>
                      TRUSTGRID.AI does not accept responsibility for unlawful processing, infringement of third-party rights, or violations of applicable law resulting from customer-provided instructions or data, to the extent permitted by applicable law.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.4 Model-Training Safe Harbour
                    </h3>
                    <p>
                      Customer data will not be used to train foundational generative AI models without explicit opt-in consent where such consent is required.
                    </p>
                    <p>
                      Where consent is provided, processing will be limited to the relevant consented purposes and subject to applicable data protection requirements.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.5 Blockchain, NFT and IoT Disclaimer
                    </h3>
                    <p>
                      Where blockchain or NFT functionality is used, information committed to a blockchain may become publicly visible and may be permanent or difficult to modify or delete.
                    </p>
                    <p>
                      Users and customers are responsible for determining whether information should be committed to a blockchain or otherwise made publicly accessible.
                    </p>
                    <p>
                      TRUSTGRID.AI is not responsible for the inherent characteristics of third-party blockchain networks, including immutability, public visibility, network availability, transaction finality, fees or third-party protocol changes.
                    </p>
                    <p>
                      IoT and connected-device data may depend on third-party devices, networks and infrastructure. TRUSTGRID.AI does not guarantee uninterrupted availability or accuracy of third-party device data.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-100">
                      12.6 “As Is” and “As Available”
                    </h3>
                    <p>
                      To the maximum extent permitted by applicable law, the Services are provided on an “as is” and “as available” basis.
                    </p>
                    <p>
                      We disclaim warranties to the extent legally permitted, including implied warranties of merchantability, fitness for a particular purpose, non-infringement and accuracy.
                    </p>
                    <p>
                      Nothing in this Notice excludes or limits rights or liabilities that cannot lawfully be excluded or limited.
                    </p>
                  </div>
                </section>

                {/* SECTION 13 */}
                <section id="section-13" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    13. Third-Party Services, Links and Content
                  </h2>
                  <p>
                    Our Services and website may contain links to, or integrations with, third-party websites, applications, payment providers, analytics services, cloud infrastructure, blockchain networks, IoT platforms and other services.
                  </p>
                  <p>
                    TRUSTGRID.AI does not control third-party privacy practices, content, security or availability and is not responsible for third-party processing.
                  </p>
                  <p>
                    Users should review the applicable privacy notices and terms of third-party providers before using their services.
                  </p>
                </section>

                {/* SECTION 14 */}
                <section id="section-14" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    14. Limitation of Liability and General Disclaimers
                  </h2>
                  <p>
                    To the fullest extent permitted by applicable law:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2 text-slate-300">
                    <li>
                      TRUSTGRID.AI, its directors, officers, employees, agents and affiliates shall not be liable for indirect, incidental, special, consequential, punitive or exemplary damages arising from or relating to this Notice or the processing of personal data.
                    </li>
                    <li>
                      Subject to mandatory law and applicable contractual terms, TRUSTGRID.AI's aggregate liability arising from or relating to this Notice or data processing shall not exceed the fees actually paid by the relevant customer to TRUSTGRID.AI during the twelve (12) months preceding the event giving rise to the claim, or INR 1,00,000, whichever is lower.
                    </li>
                    <li>
                      Nothing in this Notice excludes liability that cannot lawfully be excluded or limited.
                    </li>
                    <li>
                      This Notice is primarily provided for transparency regarding privacy and data processing and does not by itself create contractual rights beyond those provided by applicable law or incorporated contractual documents.
                    </li>
                    <li>
                      TRUSTGRID.AI shall not be liable for acts or omissions undertaken in good faith to comply with applicable law, regulatory guidance or lawful directions of competent authorities, except to the extent liability cannot legally be excluded.
                    </li>
                    <li>
                      TRUSTGRID.AI shall not be responsible for failures or delays caused by events beyond its reasonable control, including natural disasters, war, terrorism, civil disturbances, government action, fire, flood, accidents, pandemics, strikes, shortages, telecommunications failures, cloud infrastructure failures or Internet outages.
                    </li>
                  </ul>
                </section>

                {/* SECTION 15 */}
                <section id="section-15" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    15. Changes to this Notice
                  </h2>
                  <p>
                    We may update this Privacy Notice from time to time.
                  </p>
                  <p>
                    Material changes may be communicated by posting the revised Notice on our website and, where appropriate, by email, in-product notification or another reasonable method.
                  </p>
                  <p>
                    The “Last Updated” date at the top of this Notice indicates when it was most recently revised.
                  </p>
                </section>

                {/* SECTION 16 */}
                <section id="section-16" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    16. Governing Law and Jurisdiction
                  </h2>
                  <p>
                    This Notice is governed by the laws of India.
                  </p>
                  <p>
                    Subject to mandatory data protection and consumer rights, disputes arising out of or in connection with this Notice shall be subject to the jurisdiction of the competent courts in Bengaluru, Karnataka.
                  </p>
                </section>

                {/* SECTION 17 */}
                <section id="section-17" className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    17. Severability and Related Documents
                  </h2>
                  <p>
                    If any provision of this Notice is held to be invalid or unenforceable, the remaining provisions will continue to apply to the fullest extent permitted by law.
                  </p>
                  <p>
                    This Notice should be read together with applicable Terms of Service, Data Processing Agreements, Cookie Notice, consent mechanisms and other contractual or legal documents governing the Services.
                  </p>
                </section>

                {/* CONTACT */}
                <section id="contact" className="space-y-4 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    Contact
                  </h2>
                  <p>
                    For privacy questions, rights requests or complaints:
                  </p>
                  <div className="space-y-1.5 text-slate-200">
                    <p className="font-semibold text-white">TRUSTGRID.AI</p>
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:compliance@trustgrid.ai" className="text-cyan-400 hover:underline">
                        compliance@trustgrid.ai
                      </a>
                    </p>
                    <p>
                      <strong>Registered Office:</strong> 235, 2nd &amp; 3rd Floor, 13th Cross Rd, Indiranagar, Bengaluru, Karnataka 560038, India
                    </p>
                  </div>
                </section>

                {/* LEGAL REVIEW NOTE */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-xs text-slate-500 leading-relaxed">
                  <p>
                    <strong>Legal review note:</strong> This notice is based on the supplied TRUSTGRID.AI draft and has been updated with the address provided in this request. It should be reviewed by qualified privacy counsel before publication, particularly for the exact applicability and implementation of the DPDP Act/Rules, GDPR, CCPA/CPRA, sector-specific requirements, retention schedules, cookie/consent implementation, processor/sub-processor arrangements, and any contractual liability caps.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Homepage
                  </Link>
                  <a
                    href="#main-content"
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Back to top ↑
                  </a>
                </div>

              </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
