import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Cpu, Compass, Mail, Home } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <div className="page-shell min-h-screen flex flex-col justify-between bg-[#0b1220] text-slate-100">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* 404 Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            HTTP Status: 404
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight mb-4">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            The architectural blueprint or resource you are looking for does not exist, has been permanently relocated, or is undergoing enterprise upgrade.
          </p>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/25 transition-all"
            >
              <Home size={16} />
              <span>Go Home</span>
            </Link>

            <Link
              href="/solutions/ai-infra-engineering"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 transition-all"
            >
              <Cpu size={16} />
              <span>Explore Solutions</span>
              <ArrowUpRight size={14} className="text-slate-400" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700/60 transition-all"
            >
              <Mail size={16} />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Quick Helpful Destinations */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <Link href="/sitemap" className="hover:text-cyan-400 transition-colors">
              Site Map v14.0 →
            </Link>
            <Link href="/methodology-engine" className="hover:text-cyan-400 transition-colors">
              Methodology Engine →
            </Link>
            <Link href="/industries" className="hover:text-cyan-400 transition-colors">
              Industry Verticals →
            </Link>
            <Link href="/insights" className="hover:text-cyan-400 transition-colors">
              AI Insights →
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
