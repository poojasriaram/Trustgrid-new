'use client'

import React from 'react'
import {
  Layers,
  ArrowRight,
  Cpu,
  Network,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Workflow,
  ShieldCheck,
  Clock,
  Compass
} from 'lucide-react'

/* =========================================================================
   ARTICLE 01 DIAGRAMS
   ========================================================================= */

/**
 * Diagram 1A: East-West AllReduce Mesh vs Traditional North-South Traffic
 */
export function Diagram1A_TrafficPatterns() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">TECHNICAL DIAGRAM 1.1</span>
        <h4 className="tg-diagram-title">North-South Client-Server vs AI East-West AllReduce Mesh</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800">
        {/* Left: Traditional North-South */}
        <div className="flex flex-col bg-slate-900/80 p-5 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-amber-400">TRADITIONAL WEB ARCHITECTURE</span>
            <span className="text-[11px] text-slate-300 font-mono">North-South Traffic</span>
          </div>

          <div className="flex flex-col items-center gap-3 my-auto py-4">
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-center w-full max-w-[220px]">
              <span className="text-xs font-semibold text-slate-200">External Clients & APIs</span>
              <span className="block text-[10px] text-slate-300">Asynchronous HTTP / REST</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-500/60" />
              <span className="text-[10px] font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Millions of Independent &quot;Mice Flows&quot; (&lt;100 KB)
              </span>
              <div className="w-0.5 h-6 bg-amber-500/60" />
            </div>

            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-center w-full max-w-[220px]">
              <span className="text-xs font-semibold text-slate-200">Load Balancers & Ingress</span>
              <span className="block text-[10px] text-slate-300">ECMP Hash Balancing</span>
            </div>

            <div className="w-0.5 h-4 bg-slate-700" />

            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-[10px] font-mono text-slate-300">Web Pod 1</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-[10px] font-mono text-slate-300">Web Pod 2</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded text-center">
                <span className="text-[10px] font-mono text-slate-300">Web Pod N</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
            <strong className="text-slate-300">System Dynamics:</strong> Stateless, jitter-tolerant. Slow packets only impact individual end users; adjacent pods continue unaffected.
          </div>
        </div>

        {/* Right: AI East-West Mesh */}
        <div className="flex flex-col bg-slate-900/80 p-5 rounded-lg border border-blue-900/50 shadow-inner">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">DISTRIBUTED AI COMPUTE FABRIC</span>
            <span className="text-[11px] text-blue-300 font-mono">Synchronous East-West Mesh</span>
          </div>

          <div className="flex flex-col items-center gap-3 my-auto py-4">
            <div className="grid grid-cols-4 gap-2 w-full">
              {[0, 1, 2, 3].map((gpu) => (
                <div key={gpu} className="p-2 bg-blue-950/60 border border-blue-700/60 rounded text-center">
                  <span className="text-[11px] font-bold text-blue-300">GPU {gpu}</span>
                  <span className="block text-[9px] text-slate-300">400G NIC</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center w-full my-2">
              <div className="w-full h-8 flex items-center justify-center relative">
                <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse" />
                <span className="z-10 text-[10px] font-mono text-cyan-300 bg-slate-950 px-2.5 py-0.5 rounded border border-blue-800 shadow">
                  Multi-Gigabyte &quot;Elephant Flows&quot; (Ring/Tree AllReduce)
                </span>
              </div>
              <div className="text-[10px] font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/60 mt-1">
                ?? All 1,024 Nodes Bound by Synchronization Barrier
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full">
              {[4, 5, 6, 7].map((gpu) => (
                <div key={gpu} className="p-2 bg-blue-950/60 border border-blue-700/60 rounded text-center">
                  <span className="text-[11px] font-bold text-blue-300">GPU {gpu}</span>
                  <span className="block text-[9px] text-slate-300">400G NIC</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
            <strong className="text-slate-300">System Dynamics:</strong> Tightly coupled, zero jitter tolerance. A microsecond delay on one link halts the entire cluster backward pass.
          </div>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 1.1:</strong> Fundamental divergence in traffic topology. Traditional enterprise architectures rely on statistical multiplexing of millions of small asynchronous requests. Distributed AI workloads generate synchronized, high-bandwidth all-to-all transfers where the slowest single packet sets the execution time for all participating GPUs.
      </p>
    </div>
  )
}

/**
 * Diagram 1B: Tail Latency Barrier & MFU Degradation
 */
export function Diagram1B_TailLatencyBarrier() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">TECHNICAL DIAGRAM 1.2</span>
        <h4 className="tg-diagram-title">The Tail Latency Barrier: How Single-Packet Delays Stall 1,024 GPUs</h4>
      </div>

      <div className="p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 space-y-5">
        <div className="space-y-3 font-mono text-xs">
          {/* GPU 0 - Fast */}
          <div className="flex items-center gap-3">
            <span className="w-20 text-slate-300 font-semibold text-right">GPU 0 (Fast)</span>
            <div className="flex-1 h-7 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
              <div className="w-[35%] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                Compute Forward/Backward
              </div>
              <div className="w-[25%] bg-cyan-600 flex items-center justify-center text-[10px] text-white">
                AllReduce
              </div>
              <div className="flex-1 bg-rose-950/70 border-l border-rose-700/50 flex items-center justify-center text-[10px] text-rose-300 font-bold animate-pulse">
                ? IDLE SYNCHRONIZATION STALL (Waiting on Straggler)
              </div>
            </div>
          </div>

          {/* GPU 512 - Fast */}
          <div className="flex items-center gap-3">
            <span className="w-20 text-slate-300 font-semibold text-right">GPU 512</span>
            <div className="flex-1 h-7 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
              <div className="w-[35%] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                Compute Forward/Backward
              </div>
              <div className="w-[28%] bg-cyan-600 flex items-center justify-center text-[10px] text-white">
                AllReduce
              </div>
              <div className="flex-1 bg-rose-950/70 border-l border-rose-700/50 flex items-center justify-center text-[10px] text-rose-300 font-bold">
                ? IDLE SYNCHRONIZATION STALL
              </div>
            </div>
          </div>

          {/* GPU 1023 - Straggler Link */}
          <div className="flex items-center gap-3">
            <span className="w-20 text-rose-400 font-bold text-right">GPU 1023 ??</span>
            <div className="flex-1 h-7 bg-slate-900 rounded flex overflow-hidden border border-rose-900/60">
              <div className="w-[35%] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                Compute Forward/Backward
              </div>
              <div className="w-[62%] bg-amber-600/90 flex items-center justify-center text-[10px] text-slate-950 font-bold">
                AllReduce (Delayed by ECMP Hash Collision / Buffer Queue)
              </div>
              <div className="w-[3%] bg-emerald-600 flex items-center justify-center text-[8px] text-white">
                Sync
              </div>
            </div>
          </div>
        </div>

        {/* Metric Impact Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center">
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-[11px] text-slate-300 block">Measured GPU Active FLOPs</span>
            <span className="text-xl font-bold text-rose-400 font-mono">38.2% MFU</span>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-[11px] text-slate-300 block">Idle Barrier Overhead</span>
            <span className="text-xl font-bold text-amber-400 font-mono">41.8% Time Lost</span>
          </div>
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-[11px] text-slate-300 block">Amortized Idle Compute Waste</span>
            <span className="text-xl font-bold text-slate-200 font-mono">~$14,200 / hr</span>
          </div>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 1.2:</strong> Execution timeline trace illustrating the &quot;Last Packet Problem.&quot; In an all-reduce collective barrier across 1,024 GPUs, every compute engine is immobilized until the single slowest packet arrives. A 99.9th percentile network latency spike becomes the effective performance floor for 100% of the cluster.
      </p>
    </div>
  )
}

/**
 * Diagram 1C: 4-Tier Network Assessment Framework
 */
export function Diagram1C_NetworkAssessmentFramework() {
  const tiers = [
    {
      tier: 'TIER 1',
      title: 'Physical Fabric & Topology',
      metric: 'Bisection Bandwidth & Oversubscription',
      items: [
        'Non-blocking 1:1 Clos topology (no spine oversubscription)',
        'Rail-optimized leaf-spine multi-plane design',
        'Pre-commissioning optical Bit Error Rate (BER < 10^-13) qualification'
      ],
      color: 'border-blue-500'
    },
    {
      tier: 'TIER 2',
      title: 'Buffer Dimensioning & Flow Control',
      metric: 'PFC Headroom & Queue Depth',
      items: [
        'Deterministic PFC headroom calculated against fiber RTT',
        'Sub-microsecond ECN marking thresholds (Kmin / Kmax)',
        'Hardware PFC Watchdog timers (100-200us recovery window)'
      ],
      color: 'border-cyan-500'
    },
    {
      tier: 'TIER 3',
      title: 'Transport Layer & Multipathing',
      metric: 'Load Distribution & Congestion Control',
      items: [
        'Packet spraying or adaptive routing (eliminates ECMP polarization)',
        'DCQCN alpha/beta gain parameter calibration on host NICs',
        'Jumbo Frames (MTU 9000 or 4096) line-rate verification'
      ],
      color: 'border-indigo-500'
    },
    {
      tier: 'TIER 4',
      title: 'Collective Communication & Host Affinity',
      metric: 'NCCL Efficiency & Memory Locality',
      items: [
        'GPUDirect RDMA with BAR1 PCIe P2P direct mapping',
        'NUMA socket alignment between CPU, PCIe switch, and NICs',
        'NCCL algorithm tuning (Ring vs Tree thresholds by message size)'
      ],
      color: 'border-emerald-500'
    }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">TECHNICAL FRAMEWORK 1.3</span>
        <h4 className="tg-diagram-title">The TRUSTGRID.AI 4-Tier Network Assessment Framework</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-950 rounded-xl border border-slate-800">
        {tiers.map((t, idx) => (
          <div key={idx} className={`p-4 bg-slate-900 rounded-lg border-l-4 ${t.color} border-slate-800 space-y-2`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-blue-400">{t.tier}</span>
              <span className="text-[10px] text-slate-300 font-mono">{t.metric}</span>
            </div>
            <h5 className="text-sm font-bold text-slate-100">{t.title}</h5>
            <ul className="space-y-1.5 pt-1">
              {t.items.map((item, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 1.3:</strong> The TRUSTGRID.AI 4-Tier AI Network Assessment Framework. Diagnostic audits evaluate each tier sequentially from physical transceivers to NCCL collective communication runtime parameters.
      </p>
    </div>
  )
}

/* =========================================================================
   ARTICLE 02 DIAGRAMS
   ========================================================================= */

/**
 * Diagram 2A: InfiniBand Native vs RoCEv2 Protocol Stack
 */
export function Diagram2A_ProtocolStack() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">PROTOCOL SPECIFICATION 2.1</span>
        <h4 className="tg-diagram-title">InfiniBand Native Transport vs RoCEv2 Protocol Stacks</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800">
        {/* InfiniBand Stack */}
        <div className="space-y-3 p-4 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-blue-400">NATIVE INFINIBAND (IBTA)</span>
            <span className="text-[11px] text-slate-300 font-mono">Specialized HPC Fabric</span>
          </div>

          <div className="space-y-1.5 text-center font-mono text-xs">
            <div className="p-2.5 bg-blue-900/60 border border-blue-700/70 rounded text-blue-200 font-semibold">
              Upper Layer Protocol (MPI / NCCL / RDMA Verbs)
            </div>
            <div className="p-2.5 bg-blue-950 border border-blue-800/60 rounded text-blue-300">
              InfiniBand Transport Layer (Reliable Connected - RC)
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
              InfiniBand Network Layer (Local Routing via LIDs)
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
              InfiniBand Link Layer (Credit-Based Flow Control)
            </div>
            <div className="p-2.5 bg-slate-850 border border-slate-700 rounded text-slate-300">
              Physical Layer (QSFP / OSFP 400G NDR / 800G XDR)
            </div>
          </div>

          <div className="text-[11px] text-slate-300 pt-2 space-y-1">
            <p>Â <strong>Control Plane:</strong> Centralized Subnet Manager (OpenSM)</p>
            <p>Â <strong>Flow Control:</strong> Hardware credit exchange (no packet drops)</p>
            <p>Â <strong>Switching Latency:</strong> ~130-180 ns (cut-through)</p>
          </div>
        </div>

        {/* RoCEv2 Stack */}
        <div className="space-y-3 p-4 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400">RoCEv2 OVER CONVERGED ETHERNET</span>
            <span className="text-[11px] text-slate-300 font-mono">Standard IP/Ethernet Fabric</span>
          </div>

          <div className="space-y-1.5 text-center font-mono text-xs">
            <div className="p-2.5 bg-cyan-900/60 border border-cyan-700/70 rounded text-cyan-200 font-semibold">
              Upper Layer Protocol (MPI / NCCL / RDMA Verbs)
            </div>
            <div className="p-2.5 bg-cyan-950 border border-cyan-800/60 rounded text-cyan-300">
              InfiniBand Transport Layer (RoCEv2 Packet Header)
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
              UDP Layer (Port 4791 Encapsulation for ECMP)
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
              IP Layer (IPv4 / IPv6 with ECN Congestion Bits)
            </div>
            <div className="p-2.5 bg-slate-850 border border-slate-700 rounded text-slate-300">
              Standard Ethernet (IEEE 802.1Qbb PFC + 800G PHY)
            </div>
          </div>

          <div className="text-[11px] text-slate-300 pt-2 space-y-1">
            <p>Â <strong>Control Plane:</strong> Distributed BGP / EVPN routing</p>
            <p>Â <strong>Flow Control:</strong> Reactive PFC pause frames + DCQCN</p>
            <p>Â <strong>Switching Latency:</strong> ~400-600 ns (Ethernet ASIC cut-through)</p>
          </div>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 2.1:</strong> Protocol stack architecture comparing native InfiniBand against RoCEv2. RoCEv2 encapsulates the IB transport layer into standard UDP/IP datagrams to leverage ubiquitous multi-vendor Ethernet switching silicon, while InfiniBand relies on a specialized link layer with credit-based flow control.
      </p>
    </div>
  )
}

/**
 * Diagram 2B: Congestion Control Mechanisms (PFC/DCQCN vs Credit-Based)
 */
export function Diagram2B_CongestionControl() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">MECHANISM COMPARISON 2.2</span>
        <h4 className="tg-diagram-title">Congestion Feedback Loops: Credit-Based Flow Control vs PFC + DCQCN</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800">
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-blue-400">INFINIBAND: CREDIT-BASED (PROACTIVE)</span>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span>[Sender Node]</span>
              <span className="text-blue-400">? Credit Accounting</span>
              <span>[Switch Buffer]</span>
            </div>
            <p className="text-[11px] text-slate-300">
              1. Switch periodically advertises free buffer credits to sender.<br />
              2. Sender only transmits if receiver has confirmed available buffer credits.<br />
              3. Buffer overflow is mathematically impossible; zero dropped packets by design.
            </p>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono block">
            ? Turnkey simplicity; zero packet drops; no heuristic parameter tuning.
          </span>
        </div>

        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400">ROCEv2: PFC + DCQCN (REACTIVE CLOSED-LOOP)</span>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span>[Receiver NIC]</span>
              <span className="text-cyan-400">CNP Notification ?</span>
              <span>[Sender Rate-Limiter]</span>
            </div>
            <p className="text-[11px] text-slate-300">
              1. Switch buffer reaches ECN threshold (Kmin) and marks CE bits.<br />
              2. Receiver detects marked packets and returns Congestion Notification Packet (CNP).<br />
              3. Sender throttles transmission rate (DCQCN). If buffer fills, PFC pauses link.
            </p>
          </div>
          <span className="text-[11px] text-amber-400 font-mono block">
            ?? Requires careful tuning of 14+ parameters (Kmin, Kmax, Pmax, Alpha, Beta).
          </span>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 2.2:</strong> Contrast between InfiniBand proactive credit allocation and RoCEv2 reactive closed-loop rate throttling. Under extreme incast, misconfigured RoCEv2 networks can suffer PFC deadlocks, while InfiniBand gracefully pauses upstream transmission until credits refresh.
      </p>
    </div>
  )
}

/**
 * Diagram 2C: 10-Dimension Comparative Matrix Table
 */
export function Diagram2C_DecisionMatrix() {
  const comparisonData = [
    { dimension: 'Physical Layer', ib: 'Proprietary IB (400G NDR / 800G XDR)', roce: 'Standard 400G / 800G Ethernet' },
    { dimension: 'Switching Latency', ib: '130-180 ns (Ultra-low cut-through)', roce: '400-600 ns (Broadcom Tomahawk / Cisco Silicon)' },
    { dimension: 'Congestion Management', ib: 'Hardware Credit-Based (Zero drops)', roce: 'PFC + DCQCN / ECN (Requires tuning)' },
    { dimension: 'Multi-Vendor Sourcing', ib: 'Single Vendor (NVIDIA)', roce: 'Multi-Vendor (Arista, Cisco, Celestica, Broadcom)' },
    { dimension: 'Routing & Scalability', ib: 'Subnet Manager (Up to ~40k nodes)', roce: 'BGP / EVPN IP Fabric (Hyperscale scale)' },
    { dimension: 'Network Ops Skillset', ib: 'Specialized HPC Network Engineering', roce: 'Standard Enterprise NetOps & SRE' },
    { dimension: 'Tuning Complexity', ib: 'Low / Plug-and-Play', roce: 'High (Buffer headroom, DCQCN parameters)' },
    { dimension: 'Port Cost (CapEx)', ib: 'Premium ($$$)', roce: '15-30% Lower Port Hardware Cost ($$)' },
    { dimension: 'Lead Time & Supply', ib: 'Allocated / Single Vendor Supply Line', roce: 'Diversified Open Optical Supply Chain' },
    { dimension: 'Future Evolution', ib: 'Quantum-3 / XDR roadmap', roce: 'Ultra Ethernet Consortium (UEC 1.0)' }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">COMPARATIVE MATRIX 2.3</span>
        <h4 className="tg-diagram-title">InfiniBand vs RoCEv2: 10-Dimension Architectural Matrix</h4>
      </div>

      <div className="overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-300">
              <th className="py-2.5 px-3">Dimension</th>
              <th className="py-2.5 px-3 text-blue-400">InfiniBand (NVIDIA Quantum)</th>
              <th className="py-2.5 px-3 text-cyan-400">RoCEv2 (Enterprise Ethernet)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-slate-200">{row.dimension}</td>
                <td className="py-2.5 px-3">{row.ib}</td>
                <td className="py-2.5 px-3">{row.roce}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 2.3:</strong> Comprehensive systems comparison across all ten key engineering and procurement dimensions.
      </p>
    </div>
  )
}

/* =========================================================================
   ARTICLE 03 DIAGRAMS
   ========================================================================= */

/**
 * Diagram 3A: GPUDirect RDMA Zero-Copy Path
 */
export function Diagram3A_GPUDirectPath() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">MEMORY DATA PATH 3.1</span>
        <h4 className="tg-diagram-title">GPUDirect RDMA Zero-Copy Path vs Legacy Host-Memory Relaying</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800">
        {/* Legacy Path */}
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-rose-400">LEGACY HOST-RELAYED RDMA</span>
            <span className="text-[10px] text-slate-300 font-mono">4 Copies Â ~18us Latency</span>
          </div>

          <div className="space-y-2 text-center font-mono text-xs">
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">GPU High-Bandwidth Memory (HBM)</div>
            <div className="text-[10px] text-rose-400">? 1. Device-to-Host CUDA Copy</div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-amber-300">Host RAM Buffer (DRAM via CPU Socket)</div>
            <div className="text-[10px] text-rose-400">? 2. CPU Cache Snooping & Interrupt</div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">PCIe Host Root Complex</div>
            <div className="text-[10px] text-rose-400">? 3. Host-to-Device NIC DMA</div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">400G Network Interface Card (NIC)</div>
          </div>
          <span className="text-[10px] text-slate-300 font-mono block pt-1">
            ? Consumes host memory bandwidth, triggers CPU context switches, introduces high latency jitter.
          </span>
        </div>

        {/* GPUDirect RDMA Path */}
        <div className="p-4 bg-slate-900 rounded-lg border border-blue-900/60 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400">GPUDIRECT RDMA ZERO-COPY</span>
            <span className="text-[10px] text-emerald-400 font-mono">0 Copies Â &lt;1.8us Latency</span>
          </div>

          <div className="space-y-2 text-center font-mono text-xs">
            <div className="p-2.5 bg-blue-950 rounded border border-blue-700/60 text-blue-200 font-bold">
              GPU High-Bandwidth Memory (HBM)
            </div>
            <div className="py-2 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  ? Direct BAR1 P2P PCIe DMA Bypass
                </span>
                <span className="text-[9px] text-slate-300 mt-0.5">CPU & Host DRAM Completely Bypassed</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-950 rounded border border-blue-700/60 text-blue-200 font-bold">
              Dedicated PCIe Gen5 Switch / Root
            </div>
            <div className="py-1">
              <span className="text-[10px] text-emerald-400">? Line-Rate Hardware DMA</span>
            </div>
            <div className="p-2.5 bg-blue-950 rounded border border-blue-700/60 text-blue-200 font-bold">
              400G / 800G ConnectX NIC
            </div>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono block pt-1">
            ? Direct memory register access; 10x lower latency; zero CPU or host DRAM overhead.
          </span>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 3.1:</strong> Memory transfer path comparison. GPUDirect RDMA maps the GPU memory address space directly into the PCIe BAR1 space, allowing the network interface card to transfer tensors directly to and from HBM without traversing host system DRAM or interrupting CPU cores.
      </p>
    </div>
  )
}

/**
 * Diagram 3B: Rail-Optimized Leaf-Spine Architecture
 */
export function Diagram3B_RailOptimizedTopology() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">FABRIC TOPOLOGY 3.2</span>
        <h4 className="tg-diagram-title">Rail-Optimized Leaf-Spine Fabric Architecture for 8-GPU Nodes</h4>
      </div>

      <div className="p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 space-y-4">
        <div className="text-center pb-2 border-b border-slate-800 text-xs font-mono text-slate-300">
          8 Independent Rail Switching Planes (Each Plane Handles Single GPU Ordinal Across All Server Nodes)
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs font-mono">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((rail) => (
            <div key={rail} className="p-2.5 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-cyan-400 font-bold block">RAIL {rail}</span>
              <span className="text-[9px] text-slate-300">Leaf Switch</span>
              <div className="mt-2 py-1 bg-slate-950 rounded text-[9px] text-blue-300 font-semibold border border-slate-850">
                GPU {rail} of all nodes
              </div>
            </div>
          ))}
        </div>

        <div className="py-2 flex items-center justify-center">
          <div className="px-4 py-2 bg-blue-950/40 border border-blue-800/60 rounded text-center max-w-xl">
            <span className="text-xs font-semibold text-blue-300">Intra-Node NVLink Mesh (900 GB/s per GPU)</span>
            <p className="text-[11px] text-slate-300 mt-1">
              Tensor Parallelism (TP) executes entirely within node over NVLink. AllReduce across nodes for Data/Pipeline Parallelism operates strictly within isolated Rail planes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs font-mono pt-2 border-t border-slate-800">
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-300 text-[10px] block">Spine Cable Reduction</span>
            <span className="text-sm font-bold text-emerald-400">50% Fewer Cables</span>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-300 text-[10px] block">Spine Contention</span>
            <span className="text-sm font-bold text-emerald-400">Zero Cross-Rail Overlap</span>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-300 text-[10px] block">Effective Bisection</span>
            <span className="text-sm font-bold text-cyan-400">Full Non-Blocking 1:1</span>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-300 text-[10px] block">Failure Containment</span>
            <span className="text-sm font-bold text-emerald-400">Single Rail Isolated</span>
          </div>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 3.2:</strong> Rail-optimized multi-plane fabric. By mapping each GPU ordinal (0 through 7) across all servers to a dedicated, independent leaf switch rail, collective tensor communication traverses single-hop switches without contending for shared spine bandwidth.
      </p>
    </div>
  )
}

/**
 * Diagram 3C: Production Troubleshooting Workflow
 */
export function Diagram3C_TroubleshootingWorkflow() {
  const steps = [
    {
      step: '01',
      title: 'Inspect Link State & Physical Signal (FEC / BER)',
      cmd: 'ethtool -S <ethX> | grep -E "fec_corr|fec_uncorr|ber"',
      check: 'Verify zero uncorrectable FEC errors and stable optical signal levels (> -10 dBm).'
    },
    {
      step: '02',
      title: 'Verify PFC Watermarks & Pause Frames',
      cmd: 'ethtool -S <ethX> | grep -i pfc',
      check: 'Ensure rx_pfc_requests and tx_pfc_requests are minimal (< 0.01% of total packet volume).'
    },
    {
      step: '03',
      title: 'Audit ECN Marking & DCQCN CNP Packets',
      cmd: 'ethtool -S <ethX> | grep -E "cnp_sent|cnp_rcv|ecn"',
      check: 'Confirm switch ECN marking triggers rate throttling before switch queues hit PFC XOFF.'
    },
    {
      step: '04',
      title: 'Execute Synthetic Loopback Bandwidth Test',
      cmd: 'ib_write_bw -d mlx5_0 -F --report_gbits -q 8',
      check: 'Validate that RDMA write operations achieve >= 97% of physical line rate (e.g. 388 Gbps on 400G).'
    },
    {
      step: '05',
      title: 'Multi-Node NCCL Collective Validation',
      cmd: 'all_reduce_perf -b 8M -e 1G -f 2 -g 8 -n 100',
      check: 'Measure bus bandwidth (BusBw) consistency across all nodes; identify any slow outlier node.'
    },
    {
      step: '06',
      title: 'Production Job Gating & Slurm Integration',
      cmd: 'sbatch --constraint=qualified_fabric job.slurm',
      check: 'Only dispatch expensive multi-day training jobs to nodes that have passed pre-flight fabric health checks.'
    }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">DIAGNOSTIC PROTOCOL 3.3</span>
        <h4 className="tg-diagram-title">6-Step Production Troubleshooting Workflow for Lossless AI Networks</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5 bg-slate-950 rounded-xl border border-slate-800">
        {steps.map((s, idx) => (
          <div key={idx} className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 font-mono">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-blue-900/60 text-blue-300 font-bold text-xs rounded">
                STEP {s.step}
              </span>
              <span className="text-xs font-bold text-slate-200">{s.title}</span>
            </div>
            <div className="p-2 bg-slate-950 rounded text-[10px] text-cyan-300 border border-slate-850 truncate">
              $ {s.cmd}
            </div>
            <p className="text-[11px] text-slate-300 font-sans">{s.check}</p>
          </div>
        ))}
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 3.3:</strong> Systematic six-step diagnostic protocol for identifying optical errors, PFC deadlocks, DCQCN misconfigurations, and NCCL performance regressions in production clusters.
      </p>
    </div>
  )
}

/* =========================================================================
   ARTICLE 04 DIAGRAMS
   ========================================================================= */

/**
 * Diagram 4A: Execution Timeline Trace: Compute vs Communication Overlap
 */
export function Diagram4A_ExecutionTrace() {
  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">PROFILING TIMELINE 4.1</span>
        <h4 className="tg-diagram-title">Distributed Training Step Trace: Ideal Overlap vs Communication Stall Bubbles</h4>
      </div>

      <div className="p-6 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 space-y-6">
        {/* Scenario 1: Optimal Overlap */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-emerald-400 font-bold">SCENARIO A: OPTIMAL COMPUTE-COMMUNICATION OVERLAP (64% MFU)</span>
            <span className="text-slate-300 text-[11px]">Step Time: 284 ms</span>
          </div>

          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-24 text-slate-300 text-right">CUDA Compute:</span>
              <div className="flex-1 h-6 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
                <div className="w-[38%] bg-blue-600 flex items-center justify-center text-white font-bold">Forward Pass</div>
                <div className="w-[58%] bg-indigo-600 flex items-center justify-center text-white font-bold">Backward Pass & Gradients</div>
                <div className="w-[4%] bg-slate-800 flex items-center justify-center text-slate-300">Opt</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-slate-300 text-right">NCCL Stream:</span>
              <div className="flex-1 h-6 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
                <div className="w-[40%] bg-slate-950" />
                <div className="w-[55%] bg-cyan-600 flex items-center justify-center text-white font-bold">
                  AllReduce (Overlapped with Backward Compute)
                </div>
                <div className="w-[5%] bg-emerald-600 flex items-center justify-center text-white font-bold">Sync</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 2: Unoverlapped / Stalled */}
        <div className="space-y-2 pt-3 border-t border-slate-850">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-rose-400 font-bold">SCENARIO B: UNTUNED FABRIC WITH COMMUNICATION BUBBLE (39% MFU)</span>
            <span className="text-slate-300 text-[11px]">Step Time: 462 ms (+62% Slowdown)</span>
          </div>

          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-24 text-slate-300 text-right">CUDA Compute:</span>
              <div className="flex-1 h-6 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
                <div className="w-[24%] bg-blue-600 flex items-center justify-center text-white font-bold">Forward Pass</div>
                <div className="w-[36%] bg-indigo-600 flex items-center justify-center text-white font-bold">Backward Pass</div>
                <div className="w-[38%] bg-rose-950/80 border-l border-rose-700/50 flex items-center justify-center text-rose-300 font-bold animate-pulse">
                  ?? STALL BUBBLE (WAITING ON NETWORK)
                </div>
                <div className="w-[2%] bg-slate-800" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-slate-300 text-right">NCCL Stream:</span>
              <div className="flex-1 h-6 bg-slate-900 rounded flex overflow-hidden border border-slate-800">
                <div className="w-[60%] bg-slate-950" />
                <div className="w-[40%] bg-amber-600 flex items-center justify-center text-slate-950 font-bold">
                  Serialized AllReduce (Hash Collisions + Stalled Ring)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 4.1:</strong> Profiler timeline trace comparing optimal computation-communication overlap against a network-stalled pipeline. In Scenario B, backward pass gradients cannot be exchanged asynchronously due to network tail latency, creating a massive 38% &quot;bubble&quot; where GPUs sit completely idle waiting for peer synchronization.
      </p>
    </div>
  )
}

/**
 * Diagram 4B: Diagnostic Decision Matrix Table
 */
export function Diagram4B_DiagnosticMatrix() {
  const diagnosticRows = [
    {
      symptom: 'nvidia-smi shows 100% GPU, but Tokens/Sec is 40% below target',
      rootCause: 'Thread warps spinning in CUDA synchronization wait loops awaiting network data.',
      command: 'nsys profile -t cuda,nvtx,osrt python train.py',
      remediation: 'Inspect communication stream overlap; check NCCL_NET_GDR_LEVEL=5.'
    },
    {
      symptom: 'Spontaneous NCCL WARN: Remote peer hung up / Call to connect failed',
      rootCause: 'PFC pause storm or dropped packet triggering Go-Back-N timeout collapse.',
      command: 'dmesg -T | grep -i pfc; ethtool -S <ethX> | grep drop',
      remediation: 'Calibrate switch ECN thresholds lower; verify PFC headroom buffer formulas.'
    },
    {
      symptom: 'Low GPU utilization during first 15 seconds of every training step',
      rootCause: 'Host CPU dataloader starvation or shared storage read latency (disk bottleneck).',
      command: 'iostat -xz 1; sar -u 1; perf top',
      remediation: 'Increase PyTorch DataLoader num_workers; pin memory; cache dataset in local NVMe.'
    },
    {
      symptom: 'Asymmetric step times across identically configured worker nodes',
      rootCause: 'Suboptimal NUMA socket affinity or GPU throttling due to thermal degradation.',
      command: 'numactl -H; nvidia-smi -q -d PERFORMANCE,TEMPERATURE',
      remediation: 'Pin worker processes to local NUMA node with numactl --cpunodebind; clean thermal filters.'
    }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">DIAGNOSTIC MATRIX 4.2</span>
        <h4 className="tg-diagram-title">Distributed AI Symptom-to-Remediation Diagnostic Matrix</h4>
      </div>

      <div className="overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-300">
              <th className="py-2 px-3 w-[25%]">Observed Symptom</th>
              <th className="py-2 px-3 w-[25%] text-amber-400">Probable Root Cause</th>
              <th className="py-2 px-3 w-[25%] text-cyan-400">Diagnostic Command</th>
              <th className="py-2 px-3 w-[25%] text-emerald-400">Remediation Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {diagnosticRows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-slate-200">{r.symptom}</td>
                <td className="py-2.5 px-3 text-slate-300">{r.rootCause}</td>
                <td className="py-2.5 px-3 text-cyan-300 bg-slate-900/50 rounded">{r.command}</td>
                <td className="py-2.5 px-3 text-emerald-300">{r.remediation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 4.2:</strong> Comprehensive symptom-to-remediation decision matrix for cluster operators and AI infrastructure engineers.
      </p>
    </div>
  )
}

/**
 * Diagram 4C: Multi-Layer GPU Bottleneck Isolation Pipeline
 */
export function Diagram4C_NcclPipeline() {
  const stages = [
    { name: '1. STORAGE I/O', detail: 'NVMe / Ceph / NFS Read Throughput', check: 'Verify dataloader > 8 GB/s per node' },
    { name: '2. HOST CPU & RAM', detail: 'NUMA Locality & Python GIL Contention', check: 'Pin processes to NUMA socket' },
    { name: '3. PCIe ROOT COMPLEX', detail: 'Gen5 Bus Saturation & P2P Bandwidth', check: 'Verify BAR1 direct P2P mapping' },
    { name: '4. NIC DMA REGISTERS', detail: 'Interrupts, Descriptors & MTU Sizing', check: 'MTU 9000 & Jumbo Frames enabled' },
    { name: '5. NETWORK SWITCH FABRIC', detail: 'Bisection Bandwidth, ECN & Buffer Headroom', check: 'PFC pause count = 0, ECN active' },
    { name: '6. NCCL COLLECTIVES', detail: 'Ring/Tree Algorithm & Buffer Size Tuning', check: 'NCCL_BUFFSIZE=4MB, GDR_LEVEL=5' }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">ISOLATION PIPELINE 4.3</span>
        <h4 className="tg-diagram-title">End-to-End Multi-Layer Bottleneck Isolation Pipeline</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-5 bg-slate-950 rounded-xl border border-slate-800">
        {stages.map((st, idx) => (
          <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 font-mono text-xs">
            <span className="text-cyan-400 font-bold text-[11px] block">{st.name}</span>
            <span className="text-slate-300 font-semibold text-[11px] block">{st.detail}</span>
            <p className="text-[10px] text-slate-300 pt-1 border-t border-slate-800/80">
              ? {st.check}
            </p>
          </div>
        ))}
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 4.3:</strong> Systematic six-stage isolation pipeline. Profiling must proceed strictly from storage ingestion to collective communication to definitively isolate network bottlenecks from host and storage limits.
      </p>
    </div>
  )
}

/* =========================================================================
   ARTICLE 05 DIAGRAMS
   ========================================================================= */

/**
 * Diagram 5A: 5-Pillar Enterprise AI Network Readiness Architecture Radar
 */
export function Diagram5A_ReadinessRadar() {
  const pillars = [
    {
      num: '01',
      title: 'Workload Profiling',
      desc: 'Characterize tensor parallelism, sequence length, batch sizing, and communication-to-compute ratio before ordering silicon.'
    },
    {
      num: '02',
      title: 'Power & Thermal Density',
      desc: 'Verify 40kW-100kW rack electrical distribution (415V 3-phase) and direct-to-chip liquid cooling (DLC) infrastructure.'
    },
    {
      num: '03',
      title: 'Fabric Topology & Optics',
      desc: 'Engineer non-blocking Clos or rail-optimized fabrics; qualify 400G/800G optical transceivers for pre-flight Bit Error Rates.'
    },
    {
      num: '04',
      title: 'Telemetry & Health Gating',
      desc: 'Automate cluster validation scripts (NVLink, RDMA loopback, NCCL benchmarks) prior to Slurm scheduler job submission.'
    },
    {
      num: '05',
      title: 'Security & Lifecycle TCO',
      desc: 'Enforce air-gapped sovereign isolation, post-quantum crypto roadmaps, and 3-year multi-million dollar optical reserve TCO modeling.'
    }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">STRATEGIC ARCHITECTURE 5.1</span>
        <h4 className="tg-diagram-title">The 5-Pillar Enterprise AI Network Readiness Framework</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-5 bg-slate-950 rounded-xl border border-slate-800">
        {pillars.map((p, idx) => (
          <div key={idx} className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xl font-mono font-bold text-blue-500 block mb-1">{p.num}</span>
              <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider">{p.title}</h5>
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{p.desc}</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
              Ready-Gate G0-G4
            </div>
          </div>
        ))}
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 5.1:</strong> The 5-Pillar Enterprise AI Network Readiness Framework. Infrastructure teams must satisfy gating criteria across all five pillars prior to cluster hardware acceptance.
      </p>
    </div>
  )
}

/**
 * Diagram 5B: Interconnect & Optical Transceiver Scaling Roadmap
 */
export function Diagram5B_ScalingRoadmap() {
  const roadmap = [
    { scale: '64 GPUs (8 Nodes)', fabric: 'Single-Tier Leaf Fabric', optics: 'Direct Attach Copper (DAC) / 400G QSFP112', switchRadix: '1-2 Top-of-Rack Switches' },
    { scale: '512 GPUs (64 Nodes)', fabric: '2-Tier Rail-Optimized Spine-Leaf', optics: '400G / 800G Active Optical Cables (AOC)', switchRadix: '8 Leaf Rails + 4 Spine Switches' },
    { scale: '2,048 GPUs (256 Nodes)', fabric: '2-Tier Non-Blocking Clos (Full 1:1)', optics: '800G OSFP 2xFR4 / DR8 Single-Mode Optics', switchRadix: '32 Leaf Switches + 16 High-Radix Spines' },
    { scale: '16,384+ GPUs (2,048 Nodes)', fabric: '3-Tier Supercomputing AI Factory', optics: '800G / 1.6T Co-Packaged / LPO Optical Transceivers', switchRadix: 'Multi-Core SuperSpine Fabric' }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">SCALING SPECIFICATION 5.2</span>
        <h4 className="tg-diagram-title">Interconnect & Optical Transceiver Scaling Roadmap</h4>
      </div>

      <div className="overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-300">
              <th className="py-2.5 px-3">Cluster Size</th>
              <th className="py-2.5 px-3 text-blue-400">Fabric Architecture</th>
              <th className="py-2.5 px-3 text-cyan-400">Optics & Interconnect Type</th>
              <th className="py-2.5 px-3 text-emerald-400">Switch Radix & Tiering</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {roadmap.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-slate-100">{row.scale}</td>
                <td className="py-2.5 px-3">{row.fabric}</td>
                <td className="py-2.5 px-3 text-cyan-300">{row.optics}</td>
                <td className="py-2.5 px-3">{row.switchRadix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 5.2:</strong> Physical cabling and optics evolution path as clusters scale from pilot pods (64 GPUs) to gigawatt-scale sovereign AI factories (16,384+ GPUs).
      </p>
    </div>
  )
}

/**
 * Diagram 5C: 20-Point Cluster Readiness Scorecard Table
 */
export function Diagram5C_ReadinessScorecard() {
  const criteria = [
    { id: 'R01', category: 'Physical & Facility', test: 'Rack Power Density & 415V 3-Phase Verification', passCriteria: '>= 45kW sustained load per rack under 100% burn-in' },
    { id: 'R02', category: 'Physical & Facility', test: 'Direct-to-Chip Liquid Cooling Flow & Pressure', passCriteria: 'Flow rate >= 1.5 LPM/kW, supply temp <= 32Â°C, PUE < 1.12' },
    { id: 'R03', category: 'Fabric & Optics', test: 'Optical Fiber Bit Error Rate (BER) Validation', passCriteria: 'Pre-FEC BER <= 10^-6, Post-FEC BER <= 10^-15 on all links' },
    { id: 'R04', category: 'Fabric & Optics', test: 'Non-Blocking Bisection Bandwidth Test', passCriteria: '1:1 Clos topology with zero oversubscription across rails' },
    { id: 'R05', category: 'Congestion & Lossless', test: 'PFC Headroom Buffer & Watchdog Audit', passCriteria: 'Headroom sized for 2x RTT fiber flight time; watchdog <= 200us' },
    { id: 'R06', category: 'Congestion & Lossless', test: 'ECN / DCQCN Closed-Loop Calibration', passCriteria: 'Kmin threshold marks packets prior to buffer overflow' },
    { id: 'R07', category: 'GPU Host & NUMA', test: 'PCIe Gen5 BAR1 GPUDirect RDMA Mapping', passCriteria: 'Zero-copy direct transfer confirmed on all NIC-to-GPU pairs' },
    { id: 'R08', category: 'GPU Host & NUMA', test: 'NUMA Socket CPU Core Affinity Alignment', passCriteria: 'NIC, PCIe root, and GPU pinned to identical NUMA domain' },
    { id: 'R09', category: 'Software & Telemetry', test: 'Multi-Node NCCL Benchmark Bus Bandwidth', passCriteria: 'BusBw >= 360 GB/s on 400G NDR / RoCEv2 (all_reduce_perf)' },
    { id: 'R10', category: 'Software & Telemetry', test: 'Slurm Pre-Job Automated Health Gating', passCriteria: 'Failing or degraded nodes automatically cordoned & drained' }
  ]

  return (
    <div className="tg-diagram-container">
      <div className="tg-diagram-header">
        <span className="tg-diagram-badge">AUDIT SCORECARD 5.3</span>
        <h4 className="tg-diagram-title">The Enterprise AI Network Readiness Audit Scorecard (Sample Criteria)</h4>
      </div>

      <div className="overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-300">
              <th className="py-2 px-3 w-16">ID</th>
              <th className="py-2 px-3 w-40 text-blue-400">Audit Category</th>
              <th className="py-2 px-3 text-slate-200">Readiness Verification Test</th>
              <th className="py-2 px-3 text-emerald-400">Mandatory Acceptance Criteria</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {criteria.map((c) => (
              <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-300">{c.id}</td>
                <td className="py-2 px-3 text-cyan-300">{c.category}</td>
                <td className="py-2 px-3 font-semibold text-slate-200">{c.test}</td>
                <td className="py-2 px-3 text-emerald-300">{c.passCriteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="tg-diagram-caption">
        <strong>Figure 5.3:</strong> Extract from the TRUSTGRID.AI 20-Point AI Network Readiness Audit Scorecard. Passing these criteria certifies that an AI cluster is mathematically primed for sustained, zero-downtime training operations.
      </p>
    </div>
  )
}
