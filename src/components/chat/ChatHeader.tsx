'use client'

import React from 'react'
import Link from 'next/link'
import {
  Menu,
  PanelLeftOpen,
  Bot,
  Calendar,
  MessageSquare,
  FileText,
  LogIn
} from 'lucide-react'
import type { ChatUser } from '@/src/types/chat'

interface ChatHeaderProps {
  isSidebarOpenDesktop: boolean
  onToggleDesktopSidebar: () => void
  onOpenMobileSidebar: () => void
  onOpenRequestQuoteModal: () => void
  onOpenAuthModal: () => void
  user: ChatUser
}

export function ChatHeader({
  isSidebarOpenDesktop,
  onToggleDesktopSidebar,
  onOpenMobileSidebar,
  onOpenRequestQuoteModal,
  onOpenAuthModal,
  user
}: ChatHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800/90 bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-2.5">
        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          aria-label="Open Chat History Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Expand Button (shown when collapsed) */}
        {!isSidebarOpenDesktop && (
          <button
            type="button"
            onClick={onToggleDesktopSidebar}
            className="hidden lg:flex p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Expand Chat History Sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* AI Agent Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">
                Aegis • TRUSTGRID.AI Principal Systems Architect
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              50–500MW GPU Factories • PUE 1.15 Liquid Cooling • 800G RoCEv2 • Autonomous Agent Swarms
            </p>
          </div>
        </div>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenRequestQuoteModal}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Request Quote</span>
        </button>

        <Link
          href="/whatsapp"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-sm no-underline"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp Escalation</span>
        </Link>

        <Link
          href="/booking"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm no-underline"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Book Session</span>
        </Link>

        {user.isGuest && (
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  )
}
