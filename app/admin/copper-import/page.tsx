'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Database, Layers, ShieldCheck } from 'lucide-react'
import { CopperImportTab } from '@/components/analytics/tabs/copper-import-tab'

export default function CopperImportAdminPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#020617]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-cyan-600 text-white font-bold text-sm shadow-md">
              TG
            </span>
            <div>
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                TRUSTGRID.AI
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Data Pipeline Admin • Copper Stage
              </span>
            </div>
          </Link>

          <span className="hidden md:block h-5 w-px bg-slate-800 mx-2" />

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-md">
            <Database className="h-3.5 w-3.5 text-amber-400" />
            <span>COPPER → SILVER → GOLD → DIAMOND</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2.5 py-1 rounded-md">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Supabase Connected (WebMinning_DB_TG)</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Exit Admin</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Layers className="h-3.5 w-3.5 text-amber-400" />
          <span>ADMIN DATA PIPELINE</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">COPPER DATA IMPORT</span>
        </div>

        <CopperImportTab />
      </main>
    </div>
  )
}

