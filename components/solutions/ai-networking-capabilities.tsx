'use client'

import React from 'react'
import Link from 'next/link'
import {
  Network,
  Layers,
  Cpu,
  Zap,
  Workflow,
  SlidersHorizontal,
  Satellite,
  Cable,
  Building2,
  Globe2,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Activity,
  Lock
} from 'lucide-react'

export function AINetworkingCapabilities() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
      {/* SECTION 1: LOSSLESS ROCEV2 & INFINIBAND */}
      <section id="lossless-fabrics" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            01 / Lossless Fabric
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lossless RoCEv2 &amp; Quantum-2 InfiniBand Fabrics
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Engineering non-blocking, sub-microsecond interconnects that eliminate packet drops, prevent buffer exhaustion, and maximize collective GPU synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Network size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Zero Packet Drop Guarantee</h4>
            <p className="text-xs text-slate-600 mb-4">Priority Flow Control (PFC) paired with fine-grained Explicit Congestion Notification (ECN) to guarantee zero loss under saturation.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Hardware PFC deadlock prevention watchdogs</li>
              <li className="flex items-center gap-2">• DCQCN congestion notification tuning</li>
              <li className="flex items-center gap-2">• Sub-microsecond switch hop latency</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <Cpu size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Quantum-2 InfiniBand</h4>
            <p className="text-xs text-slate-600 mb-4">NDR 400G and XDR 800G InfiniBand topologies featuring hardware adaptive routing and in-network computing acceleration.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• NVIDIA SHARP in-network aggregation engines</li>
              <li className="flex items-center gap-2">• Ultra-dense 64-port OSFP 800G directors</li>
              <li className="flex items-center gap-2">• Direct copper &amp; active optical hybrid links</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              <Layers size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Spectrum-X RoCEv2 Ethernet</h4>
            <p className="text-xs text-slate-600 mb-4">Enterprise-standardized Ethernet fabrics delivering 95%+ effective throughput efficiency comparable to dedicated InfiniBand.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Packet pacing &amp; fine-grained flow control</li>
              <li className="flex items-center gap-2">• Adaptive routing avoiding micro-burst congestion</li>
              <li className="flex items-center gap-2">• Native multi-tenant isolation with EVPN-VXLAN</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: RAIL-OPTIMIZED & DRAGONFLY+ TOPOLOGIES */}
      <section id="rail-topologies" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            02 / Cluster Topologies
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rail-Optimized &amp; Dragonfly+ Topologies
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Eliminating cross-chassis oversubscription through symmetrical rail alignment where every GPU ordinal connects to dedicated non-blocking spine planes.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">Rail-Aligned Architecture</span>
              <h4 className="text-lg font-bold text-white mb-2">8-Rail Orthogonal Fabrics</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                GPU 0 in every server connects to Rail 0 switch fabric, GPU 1 to Rail 1, isolating collective communication streams and eliminating hash collisions.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">Dragonfly+ &amp; Fat-Tree</span>
              <h4 className="text-lg font-bold text-white mb-2">Non-Blocking Bisection Bandwidth</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full 1:1 non-oversubscribed bisection bandwidth across thousands of accelerator nodes with minimal switch hop count and lower cabling complexity.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-2">Resilient Dual-Homed Links</span>
              <h4 className="text-lg font-bold text-white mb-2">Sub-Second Link Failover</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hardware-level fast reroute (FRR) that seamlessly diverts traffic away from degraded optical transceivers without crashing distributed training runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COLLECTIVE COMMUNICATIONS & NCCL */}
      <section id="collective-tuning" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            03 / Collective Acceleration
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Collective Communications &amp; NCCL/RCCL Tuning
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Low-level kernel tuning for AllReduce, AlltoAll, and ReduceScatter primitives to prevent synchronization barriers from stalling GPU execution pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">NCCL Kernel Algorithm Selection</h4>
            <p className="text-xs text-slate-600 mb-4">Benchmarking Ring vs. Tree algorithms dynamically according to message payload size, cluster diameter, and GPU node count.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Ring AllReduce for large gradient tensors (&gt;100MB)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Double-Binary Tree for low-latency synchronization</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> NVLink-to-Network SHARP protocol handoff tuning</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Straggler Node Isolation</h4>
            <p className="text-xs text-slate-600 mb-4">Continuous telemetry profiling that detects anomalous GPU synchronization delays and isolates thermal or memory stragglers.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Sub-millisecond barrier sync delay detection</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> Automated traffic rerouting around throttled links</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-blue-600" /> 15–35% faster distributed training epochs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: 400G / 800G / 1.6T CO-PACKAGED OPTICS */}
      <section id="optics-transceivers" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            04 / High-Speed Physical Layer
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            400G / 800G / 1.6T Co-Packaged Optics &amp; Transceivers
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Flawless optical signal integrity engineered across OSFP, QSFP-DD, and Active Optical Cables (AOC) with continuous bit error rate (BER) monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-blue-600 uppercase block mb-1">800G DR8 / 2xFR4</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">High-Density OSFP Optics</h4>
            <p className="text-xs text-slate-600 mb-3">Single-mode fiber transceivers engineered for spine-to-leaf runs up to 2km with forward error correction (FEC).</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">&lt;1e-15 Post-FEC BER</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-cyan-600 uppercase block mb-1">Co-Packaged Optics (CPO)</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">Next-Gen 1.6T Interconnects</h4>
            <p className="text-xs text-slate-600 mb-3">Optics mounted directly adjacent to switch silicon, slashing power consumption by 30% and eliminating trace loss.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">30% Power Reduction</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-extrabold text-indigo-600 uppercase block mb-1">Structured Cabling</span>
            <h4 className="font-bold text-slate-900 text-base mb-2">MPO-16 / MPO-24 Trunks</h4>
            <p className="text-xs text-slate-600 mb-3">Factory-tested, ultra-low insertion loss trunk assemblies organized in overhead raceways for rapid deployment.</p>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">&lt;0.2dB Loss per Splice</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: AUTONOMOUS AI NOC & TELEMETRY */}
      <section id="autonomous-ai-noc" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            05 / Autonomous Operations
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Autonomous AI NOC &amp; In-Band Telemetry (INT)
          </h2>
          <p className="text-base text-slate-600 mt-2">
            24/7 self-healing network operations powered by packet-level telemetry that diagnoses silent packet drops and microbursts before they impact model convergence.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Packet Telemetry</span>
              <span className="text-2xl font-extrabold text-blue-600 block my-1">In-Band INT</span>
              <span className="text-[11px] text-slate-600 block">Hop-by-hop latency and queue depth embedded in packet headers at line rate.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Silent Drop Detection</span>
              <span className="text-2xl font-extrabold text-cyan-600 block my-1">&lt;100ms</span>
              <span className="text-[11px] text-slate-600 block">Instant detection of corrupted packets, CRC errors, and buffer overflows.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Self-Healing Reroute</span>
              <span className="text-2xl font-extrabold text-emerald-600 block my-1">Automated</span>
              <span className="text-[11px] text-slate-600 block">Dynamic flow redirection around degraded optical links without job interruption.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">NOC Root-Cause SLA</span>
              <span className="text-2xl font-extrabold text-indigo-600 block my-1">&lt;5 Mins</span>
              <span className="text-[11px] text-slate-600 block">Automated correlation engine pinpointing faulty transceiver, fiber, or port.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HARDWARE CONGESTION CONTROL */}
      <section id="congestion-control" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            06 / Congestion Avoidance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hardware Congestion Control (DCQCN &amp; PFC)
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Fine-tuned congestion management algorithms designed to balance network buffer utilization, eliminate incast collapse, and minimize tail latency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">DCQCN Rate Limiting Parameter Tuning</h4>
            <p className="text-xs text-slate-600 mb-4">Precise mathematical calibration of alpha recovery rates, byte counters, and timer parameters preventing queue oscillations.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• ECN marking thresholds tailored to GPU buffer capacities</li>
              <li className="flex items-center gap-2">• Rapid recovery mechanisms during temporary burst phases</li>
              <li className="flex items-center gap-2">• Elimination of PFC storm propagation across switches</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Adaptive Dynamic Packet Routing</h4>
            <p className="text-xs text-slate-600 mb-4">Hardware packet scattering across multiple equal-cost paths (ECMP) with packet re-ordering handled by NIC silicon.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• 98%+ effective bandwidth utilization under heavy load</li>
              <li className="flex items-center gap-2">• Zero flow collision hot-spots across spine uplinks</li>
              <li className="flex items-center gap-2">• Transparent integration with standard Linux RDMA drivers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: NON-TERRESTRIAL NETWORKS (NTN) & SPACE RELAY */}
      <section id="ntn-satellite" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/60 inline-block mb-3">
            07 / Space-to-Ground Telemetry
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Non-Terrestrial Networks (NTN) &amp; Satellite Ground Links
          </h2>
          <p className="text-base text-slate-600 mt-2">
            9 Tbps satellite landing capacity integrated directly with AI data centers for real-time earth observation, defense intelligence, and remote edge telemetry.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Satellite size={20} className="text-cyan-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">9 Tbps Landing Capacity</h4>
              <p className="text-xs text-slate-300">High-throughput optical and Ka/Ku-band feeder links downlinking orbital payload data directly into GPU cluster storage.</p>
            </div>
            <div>
              <Activity size={20} className="text-blue-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">LEO / MEO Tracking</h4>
              <p className="text-xs text-slate-300">Precision multi-satellite automated tracking radomes providing uninterrupted constellation data handoffs with zero packet loss.</p>
            </div>
            <div>
              <Zap size={20} className="text-teal-400 mb-2" />
              <h4 className="font-bold text-white text-base mb-1">In-Orbit Edge AI Ingestion</h4>
              <p className="text-xs text-slate-300">Direct pipeline feeding satellite imagery and radar into real-time geospatial foundation models for sub-minute inference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: COHERENT DATA CENTER INTERCONNECT (DCI) */}
      <section id="dci-interconnect" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            08 / Metro Interconnects
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Coherent Data Center Interconnect (DCI) &amp; DWDM
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Sub-millisecond optical backbones linking multi-campus AI facilities into unified virtual supercomputing clusters with dark fiber and coherent DWDM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Cable size={20} className="text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Coherent 800G ZR+ Optics</h4>
            <p className="text-xs text-slate-600 mb-3">IP-over-DWDM pluggable optics eliminating standalone transponder chassis, reducing metro DCI CapEx by 45%.</p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Metro Reach up to 120km</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Network size={20} className="text-indigo-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Diverse Physical Routing</h4>
            <p className="text-xs text-slate-600 mb-3">Redundant dark fiber paths engineered along separate utility rights-of-way ensuring uninterrupted synchronicity.</p>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">99.999% Link Availability</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Lock size={20} className="text-teal-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Wire-Speed MACsec Encryption</h4>
            <p className="text-xs text-slate-600 mb-3">Hardware Layer 2 cryptographic protection safeguarding inter-cluster model weights and training datasets in transit.</p>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Quantum-Ready PQC Key Exch</span>
          </div>
        </div>
      </section>

      {/* SECTION 9: NVME-O-F & GPUDIRECT STORAGE */}
      <section id="storage-fabrics" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60 inline-block mb-3">
            09 / Storage Interconnect
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            NVMe-over-Fabrics &amp; GPUDirect Storage (GDS)
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Direct DMA data paths from all-flash NVMe storage arrays directly into GPU HBM memory, bypassing CPU bottlenecks and feeding training pipelines at line rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">GPUDirect Storage (GDS) Integration</h4>
            <p className="text-xs text-slate-600 mb-4">Direct RDMA data transport from parallel file systems into GPU memory, reducing IO latency by up to 10x.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• Sub-microsecond end-to-end I/O latency</li>
              <li className="flex items-center gap-2">• Zero CPU bounce-buffering and cache thrashing</li>
              <li className="flex items-center gap-2">• Support for WekaFS, VAST Data, Lustre &amp; BeeGFS</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-900 text-base mb-2">Parallel Checkpointing Acceleration</h4>
            <p className="text-xs text-slate-600 mb-4">Distributed checkpointing protocols dumping terabyte-scale training weights in seconds rather than stalling compute for minutes.</p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">• 100+ GB/sec read/write throughput per GPU node</li>
              <li className="flex items-center gap-2">• Asynchronous non-blocking checkpoint snapshotting</li>
              <li className="flex items-center gap-2">• Instant training resumption after single-node faults</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 10: HYBRID SOVEREIGN CLOUD FABRIC */}
      <section id="hybrid-multicloud-mesh" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60 inline-block mb-3">
            10 / Hybrid Mesh
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hybrid Sovereign Cloud Interconnect Mesh
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Secure, private peering fabrics connecting on-premise private AI Factories with hyperscale sovereign cloud regions under unified network policy.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-cyan-50 to-white border border-blue-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Globe2 size={20} className="text-blue-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Direct Cloud On-Ramps</h4>
              <p className="text-xs text-slate-600">Dedicated AWS Direct Connect, Azure ExpressRoute, and Google Cloud Interconnect with BGP multi-pathing.</p>
            </div>
            <div>
              <ShieldCheck size={20} className="text-indigo-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Zero-Trust Network Segmentation</h4>
              <p className="text-xs text-slate-600">Micro-segmented VRFs isolating training environments, inference serving pipelines, and management networks.</p>
            </div>
            <div>
              <Building2 size={20} className="text-teal-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Sovereign Data Perimeter</h4>
              <p className="text-xs text-slate-600">Strict geolocation routing rules ensuring proprietary corporate training data never crosses designated international borders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FABRIC THROUGHPUT & OEE METRICS */}
      <section id="network-yield-kpis" className="scroll-mt-32">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
            11 / Network Performance Metrics
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fabric Throughput &amp; Network OEE Benchmarks
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Real-world performance metrics validating that network infrastructure delivers maximum effective bandwidth with zero packet drop.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Effective Fabric Bandwidth</span>
              <span className="text-3xl font-extrabold text-blue-600 block my-1">&gt;96%</span>
              <span className="text-[11px] text-slate-600 block">Sustained line-rate throughput across 800G collective all-reduce operations.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Packet Loss Rate</span>
              <span className="text-3xl font-extrabold text-emerald-600 block my-1">0.000%</span>
              <span className="text-[11px] text-slate-600 block">Absolute zero packet drop verified under continuous 100% fabric saturation.</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Tail Latency (p99.9)</span>
              <span className="text-3xl font-extrabold text-indigo-600 block my-1">&lt;1.2µs</span>
              <span className="text-[11px] text-slate-600 block">Sub-microsecond switch hop tail latency eliminating collective jitter.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: AI NETWORK DIAGNOSTIC & AUDIT */}
      <section id="network-diagnostic" className="scroll-mt-32">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-xl border border-blue-800">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 inline-block mb-3">
              12 / Executive Diagnostic
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Book Your AI Network Architecture Diagnostic
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Benchmark your current cluster fabric against lossless standards, discover hidden congestion bottlenecks, profile NCCL collective delays, and receive an engineering blueprint.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/book-ai-diagnostic?solution=ai-networking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg transition-all"
              >
                <span>Schedule Network Diagnostic</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
              >
                <span>Consult Network Architects</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
