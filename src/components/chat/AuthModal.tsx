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
    signInWithOAuth,
    resetPasswordForEmail,
    continueAsGuest
  } = useAuth()

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [email, setEmail] = useState('')
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
        const res = await signInWithEmail(email, password)
        if (!res.success) setErrorMsg(res.error || 'Sign in failed.')
      } else if (activeTab === 'signup') {
        const res = await signUpWithEmail(email, password, fullName)
        if (!res.success) {
          setErrorMsg(res.error || 'Sign up failed.')
        } else if (res.message) {
          setSuccessMsg(res.message)
        }
      } else {
        const res = await resetPasswordForEmail(email)
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

        {/* OAuth Providers (Google & GitHub) */}
        {activeTab !== 'reset' && (
          <div className="space-y-2.5 mb-5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => signInWithOAuth('google')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.5 1.18-4.22 1.18-3.25 0-6-2.2-6.98-5.15H1.01v3.14C3.02 21.15 7.2 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.02 14.02c-.25-.74-.39-1.53-.39-2.35s.14-1.61.39-2.35V6.18H1.01C.37 7.46 0 8.9 0 12s.37 4.54 1.01 5.82l4.01-3.8z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.8 0 3.41.62 4.68 1.84l3.5-3.5C18.07 1.14 15.3 0 12 0 7.2 0 3.02 2.85 1.01 6.84l4.01 3.14c.98-2.95 3.73-5.23 6.98-5.23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => signInWithOAuth('github')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <div className="h-px flex-1 bg-slate-800" />
              <span>or continue with corporate email</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>
          </div>
        )}

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

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
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
            <label className="text-slate-300 block mb-1">Work Email *</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@enterprise.com"
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
                  minLength={6}
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
