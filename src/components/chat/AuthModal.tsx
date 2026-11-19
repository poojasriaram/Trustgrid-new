'use client'

import React, { useState } from 'react'
import { X, Mail, Lock, User, Loader2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/src/contexts/AuthContext'

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithEmail,
    signUpWithEmail,
    resetPasswordForEmail,
    continueAsGuest
  } = useAuth()

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  if (!isAuthModalOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)
    setIsSubmitting(true)

    try {
      if (activeTab === 'signin') {
        const res = await signInWithEmail(identifier, password)
        if (!res.success) setErrorMsg(res.error || 'Sign in failed.')
      } else if (activeTab === 'signup') {
        const res = await signUpWithEmail(identifier, password, fullName)
        if (!res.success) {
          setErrorMsg(res.error || 'Sign up failed.')
        } else if (res.message) {
          setSuccessMsg(res.message)
        }
      } else {
        const res = await resetPasswordForEmail(identifier)
        if (!res.success) {
          setErrorMsg(res.error || 'Reset password request failed.')
        } else {
          setSuccessMsg('Password recovery instructions have been sent to your email.')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closeAuthModal}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-base mx-auto shadow-lg shadow-blue-500/20">
            TG
          </div>
          <h2 className="text-lg font-bold text-white">
            {activeTab === 'signin'
              ? 'Sign in to TRUSTGRID.AI Architect Desk'
              : activeTab === 'signup'
              ? 'Create Your Enterprise Architect Account'
              : 'Reset Your Account Password'}
          </h2>
          <p className="text-xs text-slate-400">
            Sync your consultation history, architecture files, and voice briefings across devices.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-5 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin')
              setErrorMsg(null)
              setSuccessMsg(null)
            }}
            className={`py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'signin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup')
              setErrorMsg(null)
              setSuccessMsg(null)
            }}
            className={`py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('reset')
              setErrorMsg(null)
              setSuccessMsg(null)
            }}
            className={`py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeTab === 'reset'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reset
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email or Username & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {activeTab === 'signup' && (
            <div>
              <label className="text-slate-300 block mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Vikramaditya Sen"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 block mb-1">
              {activeTab === 'reset' ? 'Email Address *' : 'Email or Username *'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={activeTab === 'reset' ? 'email' : 'text'}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={activeTab === 'reset' ? 'name@enterprise.com' : 'name@enterprise.com or username'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {activeTab !== 'reset' && (
            <div>
              <label className="text-slate-300 block mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={4}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>
                  {activeTab === 'signin'
                    ? 'Sign In & Sync History'
                    : activeTab === 'signup'
                    ? 'Create Enterprise Account'
                    : 'Send Recovery Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Continue as Guest Fallback */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center space-y-2">
          <button
            type="button"
            onClick={continueAsGuest}
            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition cursor-pointer"
          >
            Continue in Guest Mode (Auto-Syncs Later)
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Supabase Auth • End-to-End Encrypted Enterprise Session</span>
          </div>
        </div>
      </div>
    </div>
  )
}
