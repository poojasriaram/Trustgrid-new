'use client'

import React, { useState } from 'react'
import {
  Plus,
  Search,
  Pin,
  PinOff,
  Pencil,
  Trash2,
  Check,
  X,
  MessageSquare,
  LogIn,
  LogOut,
  ShieldCheck,
  User,
  PanelLeftClose
} from 'lucide-react'
import type { Conversation, GroupedConversations, ChatUser } from '@/src/types/chat'

interface ChatSidebarProps {
  isOpenDesktop: boolean
  isOpenMobile: boolean
  onCloseMobile: () => void
  onToggleDesktop: () => void
  groupedConversations: GroupedConversations
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewConsultation: () => void
  onRenameConversation: (id: string, newTitle: string) => void
  onTogglePinConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  user: ChatUser
  onOpenAuthModal: () => void
  onSignOut: () => void
}

const BUCKET_LABELS: { key: keyof GroupedConversations; label: string }[] = [
  { key: 'pinned', label: '📌 Pinned' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'previous_7_days', label: 'Previous 7 Days' },
  { key: 'previous_30_days', label: 'Previous 30 Days' },
  { key: 'older', label: 'Older' }
]

export function ChatSidebar({
  isOpenDesktop,
  isOpenMobile,
  onCloseMobile,
  onToggleDesktop,
  groupedConversations,
  activeConversationId,
  onSelectConversation,
  onNewConsultation,
  onRenameConversation,
  onTogglePinConversation,
  onDeleteConversation,
  searchQuery,
  onSearchChange,
  user,
  onOpenAuthModal,
  onSignOut
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>('')

  const startEditing = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(conv.id)
    setEditingTitle(conv.title)
  }

  const saveEditing = (id: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation()
    if (editingTitle.trim()) {
      onRenameConversation(id, editingTitle.trim())
    }
    setEditingId(null)
  }

  const totalShown = BUCKET_LABELS.reduce(
    (sum, b) => sum + groupedConversations[b.key].length,
    0
  )

  const sidebarContent = (
    <div className="h-full w-72 bg-slate-950 border-r border-slate-800/90 flex flex-col justify-between select-none">
      {/* Top Action Header & Search */}
      <div className="p-3 space-y-2.5 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              onNewConsultation()
              onCloseMobile()
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Consultation</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleDesktop()
              onCloseMobile()
            }}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Debounced Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chat history..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/60 rounded-xl pl-8 pr-7 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Time-Bucketed Conversation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5">
        {totalShown === 0 ? (
          <div className="text-center py-10 px-4 space-y-2">
            <MessageSquare className="w-7 h-7 text-slate-700 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">
              {searchQuery ? 'No matching consultations found.' : 'No consultation history yet.'}
            </p>
            <p className="text-[11px] text-slate-500">
              Start a new consultation to evaluate GPU clusters, 800G fabrics, or agent swarms.
            </p>
          </div>
        ) : (
          BUCKET_LABELS.map(({ key, label }) => {
            const list = groupedConversations[key]
            if (!list || list.length === 0) return null

            return (
              <div key={key} className="space-y-1">
                <div className="px-2.5 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {label}
                </div>
                {list.map((conv) => {
                  const isActive = conv.id === activeConversationId
                  const isEditing = editingId === conv.id

                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        onSelectConversation(conv.id)
                        onCloseMobile()
                      }}
                      className={`group flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/25 to-cyan-500/10 text-white border border-blue-500/40 font-semibold'
                          : 'text-slate-300 hover:bg-slate-900/90 hover:text-slate-100 border border-transparent'
                      }`}
                    >
                      {isEditing ? (
                        <form
                          onSubmit={(e) => saveEditing(conv.id, e)}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 flex-1 min-w-0"
                        >
                          <input
                            type="text"
                            autoFocus
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="w-full bg-slate-950 border border-blue-500 rounded px-2 py-1 text-xs text-white focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                            title="Save Title"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {conv.pinned ? (
                              <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            ) : (
                              <MessageSquare
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isActive ? 'text-cyan-400' : 'text-slate-500'
                                }`}
                              />
                            )}
                            <span className="truncate">{conv.title}</span>
                          </div>

                          {/* Action Icons: Pin, Rename, Delete */}
                          <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onTogglePinConversation(conv.id)
                              }}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition cursor-pointer"
                              title={conv.pinned ? 'Unpin conversation' : 'Pin conversation'}
                            >
                              {conv.pinned ? (
                                <PinOff className="w-3 h-3" />
                              ) : (
                                <Pin className="w-3 h-3" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => startEditing(conv, e)}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
                              title="Rename conversation"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDeleteConversation(conv.id)
                              }}
                              className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                              title="Delete conversation"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })
        )}
      </div>

      {/* Footer User Profile Card */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-900/50">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName || 'User'}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-100 truncate">
                  {user.fullName || (user.isGuest ? 'Enterprise Guest' : 'Architect')}
                </span>
                {user.role === 'admin' && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-mono font-bold flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    ADMIN
                  </span>
                )}
                {user.isGuest && (
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[9px] font-mono">
                    GUEST
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
            </div>
          </div>

          {user.isGuest ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1 shrink-0 transition cursor-pointer"
              title="Sign In to Sync Chat History"
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignOut}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition shrink-0 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      {isOpenDesktop && <aside className="hidden lg:block shrink-0 h-full">{sidebarContent}</aside>}

      {/* Mobile Slide-Out Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="relative z-10 h-full">{sidebarContent}</div>
          <div
            className="flex-1 bg-black/70 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
        </div>
      )}
    </>
  )
}
