'use client'

import React from 'react'
import Link from 'next/link'
import {
  Lock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Cpu,
  Building2,
  Target,
  FileSpreadsheet,
  Layers,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Globe2
} from 'lucide-react'

export function AICybersecurityCapabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      {/* SECTION 1: L1-L7 POST-QUANTUM CRYPTOGRAPHY & CBOM */}
      <section id="pqc-cbom" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            01 / Quantum-Safe Cryptography
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            L1–L7 Post-Quantum Cryptography &amp; Automated CBOM
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Immunity against Harvest Now Decrypt Later (HNDL) attacks through automated Cryptographic Bill of Materials (CBOM) discovery and NIST-standardized PQC migration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Lock size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Automated CBOM Discovery</h4>
            <p className="text-xs text-slate-600 mb-4">Continuous scanning of application code, TLS endpoints, SSH keys, and data pipelines to catalog all vulnerable RSA/ECC algorithms.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Full inventory of asymmetric cryptographic keys</li>
              <li className="flex items-center gap-2">• Automated risk prioritization based on data shelf-life</li>
              <li className="flex items-center gap-2">• CycloneDX and SPDX standard CBOM export</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">NIST PQC Migration</h4>
            <p className="text-xs text-slate-600 mb-4">Drop-in migration to standardized lattice-based algorithms: ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for digital signatures.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Hybrid Classical + Quantum TLS 1.3 handshakes</li>
              <li className="flex items-center gap-2">• Post-quantum code signing and artifact verification</li>
              <li className="flex items-center gap-2">• Zero performance degradation on hardware accelerators</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              <Layers size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Crypto-Agility Architecture</h4>
            <p className="text-xs text-slate-600 mb-4">Decoupling cryptographic algorithms from application logic, allowing dynamic algorithm swapping via centralized policy.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Dynamic cipher-suite negotiation without re-compilation</li>
              <li className="flex items-center gap-2">• Centralized enterprise KMS with PQC roots of trust</li>
              <li className="flex items-center gap-2">• Board-level quantum readiness compliance tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROMPT FIREWALLS & MODEL HIJACK DEFENSE */}
      <section id="prompt-firewalls" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200/60 inline-block mb-3">
            02 / Runtime Defense
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prompt Firewalls &amp; Model Hijacking Defense
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Real-time, in-line input/output sanitization defending against prompt injection, jailbreaks, indirect data payload attacks, and unauthorized tool invocation.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <ShieldAlert size={20} className="text-red-400 mb-2" />
              <h4 className="text-lg font-bold text-white mb-2">Prompt Injection Shields</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sub-5ms semantic token analysis isolating adversarial prompt payloads, delimiter hijacks, and base64/rot13 obfuscation attempts.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <Lock size={20} className="text-cyan-400 mb-2" />
              <h4 className="text-lg font-bold text-white mb-2">Indirect Document Sanitization</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deep inspection of third-party documents, emails, and web scrapes parsed by RAG pipelines to neutralize invisible font or zero-width injection attacks.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <Target size={20} className="text-teal-400 mb-2" />
              <h4 className="text-lg font-bold text-white mb-2">Model Extraction Defense</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Statistical rate-limiting and query perturbation thwarting automated black-box model distillation, weight inversion, and membership inference probes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ZERO-TRUST IDENTITY FOR AGENTS */}
      <section id="agent-identity-iam" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            03 / Agent Identity &amp; IAM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Zero-Trust Workload Identity &amp; Ephemeral IAM for Agents
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Treating autonomous AI agents as first-class cryptographic workload identities with dynamic, step-scoped permissions and zero long-lived credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Cryptographic SPIFFE/SPIRE Identity</h4>
            <p className="text-xs text-slate-600 mb-4">Every running agent instance receives an ephemeral cryptographic x509 SVID token tied to its container attestation.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Automated mTLS communication between agents</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Continuous hardware-level node attestation</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Zero hardcoded API keys or static credentials</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Ephemeral Least-Privilege Scoping</h4>
            <p className="text-xs text-slate-600 mb-4">Dynamic token minting that grants access to a specific database table or API endpoint for exactly one execution turn.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> 60-second maximum token lifetime for tool calls</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Read-only by default with human-gated elevation</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Complete revocation of rogue agent tokens in &lt;100ms</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: MODEL PROVENANCE & DATA POISONING DEFENSE */}
      <section id="training-security" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            04 / Pipeline Integrity
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Model Weight Provenance &amp; Data Poisoning Defense
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Ensuring that models and fine-tuning datasets cannot be secretly backdoored, tampered with, or poisoned during data ingestion or checkpoint serialization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Cryptographic Model Signing</h4>
            <p className="text-xs text-slate-600 mb-3">Every weights file is signed with post-quantum digital signatures (ML-DSA) and verified at inference boot time.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Tamper-Proof Model Checkpoints</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Dataset Anomaly Scanning</h4>
            <p className="text-xs text-slate-600 mb-3">Statistical outlier detection and clean-label poisoning filters identifying malicious triggers planted in training corpora.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Zero Trojan Backdoors</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Neural Watermarking</h4>
            <p className="text-xs text-slate-600 mb-3">Embedded cryptographic watermarks in model weights enabling enterprise verification if proprietary weights are leaked.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Verifiable Model Ownership</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: 24/7 MANAGED AI SOC & THREAT HUNTING */}
      <section id="managed-ai-soc" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            05 / Autonomous Defense
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            24/7 Managed AI SOC &amp; Threat Hunting
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Continuous enterprise monitoring correlating AI SIEM logs, agent execution anomalies, prompt injection telemetry, and infrastructure intrusions.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">AI SIEM Correlation</span>
              <span className="text-2xl font-extrabold text-blue-600 block my-1">Cross-Layer</span>
              <span className="text-[11px] text-slate-600 block">Correlates LLM prompt telemetry with cloud IAM and network flow logs.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Threat Hunting SLA</span>
              <span className="text-2xl font-extrabold text-emerald-600 block my-1">&lt;15 Mins</span>
              <span className="text-[11px] text-slate-600 block">Sub-15-minute containment of rogue agent behaviors and injection attempts.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Synthetic Attack Testing</span>
              <span className="text-2xl font-extrabold text-indigo-600 block my-1">Continuous</span>
              <span className="text-[11px] text-slate-600 block">Daily synthetic payload probes validating that guardrails remain impenetrable.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Automated Isolation</span>
              <span className="text-2xl font-extrabold text-red-600 block my-1">Sub-Second</span>
              <span className="text-[11px] text-slate-600 block">Instant hardware network isolation of compromised inference worker nodes.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONFIDENTIAL COMPUTE & HARDWARE ENCLAVES */}
      <section id="confidential-compute" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            06 / Hardware Enclaves
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Confidential Compute &amp; Hardware TEEs
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Executing model training and inference inside Trusted Execution Environments (TEEs) where memory is encrypted in hardware, protecting data from cloud operators and hypervisors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">NVIDIA H100/B200 Confidential AI</h4>
            <p className="text-xs text-slate-600 mb-4">Hardware-accelerated AES-256 memory encryption isolating GPU calculations from host CPUs and unauthorized system administrators.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Hardware root of trust cryptographic attestation</li>
              <li className="flex items-center gap-2">• Line-rate encryption of PCIe and NVLink transfers</li>
              <li className="flex items-center gap-2">• Protection against physical memory bus snooping</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Confidential Multi-Party Analytics</h4>
            <p className="text-xs text-slate-600 mb-4">Enabling multiple enterprises to train joint models on proprietary datasets without either party exposing raw training records.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Cryptographically sealed computation enclaves</li>
              <li className="flex items-center gap-2">• Zero data visibility even to the host cloud provider</li>
              <li className="flex items-center gap-2">• Fully auditable cryptographic proof of execution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: AIR-GAPPED SOVEREIGN AI ENCLAVES */}
      <section id="air-gapped-sovereign" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 inline-block mb-3">
            07 / Sovereign Defense
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Air-Gapped Sovereign AI Enclaves
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Defense-grade, classified on-premises data center enclaves with zero outbound internet telemetry for national security and sovereign enterprise workloads.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Building2 size={20} className="text-cyan-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Zero Outbound Telemetry</h4>
              <p className="text-xs text-slate-300">Complete physical and optical isolation preventing any background diagnostics, license checks, or model telemetry from leaking outside.</p>
            </div>
            <div>
              <ShieldCheck size={20} className="text-blue-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">TEMPEST &amp; SCIF Compliant</h4>
              <p className="text-xs text-slate-300">Electromagnetic shielding, biometric multi-factor physical access control, and acoustic containment rated for top-secret environments.</p>
            </div>
            <div>
              <Lock size={20} className="text-teal-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">Local Identity Governance</h4>
              <p className="text-xs text-slate-300">Dedicated local Active Directory and HSM key storage isolated completely from external public identity providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: AUTOMATED RED-TEAMING & STRESS TESTING */}
      <section id="ai-red-teaming" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200/60 inline-block mb-3">
            08 / Adversarial Stress Testing
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Automated Red-Teaming &amp; Attack Simulation
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Continuous adversarial testing using autonomous red-team agents that simulate state-sponsored attackers, zero-day jailbreaks, and data extraction campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Automated Attack Fuzzing</h4>
            <p className="text-xs text-slate-600 mb-3">Generating tens of thousands of semantic attack mutations, multi-lingual jailbreaks, and indirect payload variations.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Automated Tree-of-Attacks Jailbreak (TAP) scanning</li>
              <li className="flex items-center gap-2">• RAG context extraction and document exfiltration tests</li>
              <li className="flex items-center gap-2">• Automated vulnerability scoring mapped to MITRE ATLAS</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Human-Led Expert Red-Teaming</h4>
            <p className="text-xs text-slate-600 mb-3">Elite cybersecurity researchers conducting deep penetration testing on model boundaries, agent tools, and infrastructure APIs.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Business logic circumvention and privilege escalation</li>
              <li className="flex items-center gap-2">• Lateral movement testing between connected enterprise systems</li>
              <li className="flex items-center gap-2">• Comprehensive executive remediation report &amp; hardening scripts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 9: EU AI ACT & ISO 42001 COMPLIANCE */}
      <section id="regulatory-compliance" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            09 / Regulatory Assurance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            EU AI Act, ISO 42001 &amp; NIST AI RMF Conformity
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Automated conformity gateways producing audit-ready evidence packs that guarantee compliance with strict international AI risk management regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <FileSpreadsheet size={20} className="text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-2">EU AI Act Conformity</h4>
            <p className="text-xs text-slate-600 mb-3">Classification of high-risk AI systems, technical documentation compilation, and post-market monitoring workflows.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Audit-Ready Documentation</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <ShieldCheck size={20} className="text-indigo-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-2">ISO/IEC 42001 AIMS</h4>
            <p className="text-xs text-slate-600 mb-3">Enterprise Artificial Intelligence Management System (AIMS) policies, risk assessment registers, and governance frameworks.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Full ISO 42001 Certification</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Target size={20} className="text-teal-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-2">NIST AI RMF 1.0</h4>
            <p className="text-xs text-slate-600 mb-3">Governance matrices mapping Govern, Map, Measure, and Manage functions directly into automated CI/CD pipeline tests.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">Continuous Risk Tracking</span>
          </div>
        </div>
      </section>

      {/* SECTION 10: CRYPTOGRAPHIC DECISION PROVENANCE */}
      <section id="immutable-audit" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            10 / Legal Provenance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cryptographic Decision Provenance &amp; Replay
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Tamper-proof cryptographic audit ledgers that record every model prompt, retrieval context chunk, reasoning step, and tool action for legal and regulatory defense.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Layer 01</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Immutable Merkle Trees</h4>
              <p className="text-xs text-slate-600">Every decision record is hashed into an append-only cryptographic Merkle ledger, making post-hoc log alteration mathematically impossible.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Layer 02</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Deterministic Replay</h4>
              <p className="text-xs text-slate-600">A deterministic sandbox environment capable of exactly reproducing any past agent decision state for court evidence or compliance audits.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Layer 03</span>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">Causal Lineage Graphs</h4>
              <p className="text-xs text-slate-600">Visual lineage graphs mapping which training data point, system prompt rule, or external API response directly triggered an agent action.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: QUANTUM & CYBER RESILIENCE METRICS */}
      <section id="cyber-posture-kpis" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            11 / Security Posture Metrics
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quantum &amp; Cyber Resilience Benchmarks
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Board-level visibility into cryptographic health, prompt injection vulnerability rates, and automated incident containment speed.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">CBOM Cryptographic Visibility</span>
              <span className="text-3xl font-extrabold text-blue-600 block my-1">100%</span>
              <span className="text-[11px] text-slate-600 block">Real-time inventory of all cryptographic algorithms across training, APIs, and data storage.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Jailbreak Containment Rate</span>
              <span className="text-3xl font-extrabold text-emerald-600 block my-1">99.8%</span>
              <span className="text-[11px] text-slate-600 block">In-line filtering stopping adversarial prompts before reaching frontier model weights.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Mean Time to Contain (MTTC)</span>
              <span className="text-3xl font-extrabold text-indigo-600 block my-1">&lt;3 Mins</span>
              <span className="text-[11px] text-slate-600 block">Sub-3-minute automated token revocation and quarantine for anomalous agent instances.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: QUANTUM & AI SECURITY DIAGNOSTIC CTA */}
      <section id="cyber-audit-cta" className="scroll-mt-32">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-xl border border-blue-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 inline-block mb-3">
              12 / Executive Diagnostic
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Book Your Quantum-Safe &amp; AI Security Audit
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Receive a comprehensive assessment of your post-quantum vulnerability exposure, automated CBOM scan, agent penetration test, and a verified migration roadmap.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-ai-diagnostic?solution=ai-cybersecurity-quantum-safe"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg transition-all"
              >
                <span>Schedule Cybersecurity Audit</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                <span>Consult Security Architects</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
