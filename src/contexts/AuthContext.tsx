'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ChatUser } from '@/src/types/chat'
import { getSupabaseClientConfig } from '@/src/services/storageService'
import { syncGuestConversationsToUser, generateUuid } from '@/src/services/chatService'
import { insertLeadToSupabase } from '@/lib/services/supabase-leads'
import { dispatchDirectToGoogleSheets } from '@/lib/form-submission'

interface AuthContextValue {
  user: ChatUser
  accessToken: string | null
  isLoading: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  signInWithEmail: (
    emailOrUsername: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  signUpWithEmail: (
    emailOrUsername: string,
    password: string,
    fullName: string
  ) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  continueAsGuest: () => void
}

const SESSION_STORAGE_KEY = 'tg_supabase_auth_session_v2'
const GUEST_USER_KEY = 'tg_chat_guest_user_v2'
const LOCAL_ACCOUNTS_KEY = 'tg_chat_registered_accounts_v2'

function getOrCreateGuestUser(): ChatUser {
  if (typeof window === 'undefined') {
    return {
      id: 'guest-server',
      email: 'guest@trustgrid.ai',
      fullName: 'Enterprise Guest',
      role: 'user',
      isGuest: true
    }
  }
  try {
    const raw = localStorage.getItem(GUEST_USER_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}

  const guest: ChatUser = {
    id: `guest-${generateUuid().slice(0, 8)}`,
    email: 'Guest Session (Unauthenticated)',
    fullName: 'Enterprise Guest',
    role: 'user',
    isGuest: true
  }
  try {
    localStorage.setItem(GUEST_USER_KEY, JSON.stringify(guest))
  } catch {}
  return guest
}

/**
 * Captures every Chat Sign-In / Sign-Up user's details in BOTH Supabase and Google Sheet #1
 */
async function captureChatAuthInSupabaseAndSheets(params: {
  action: 'SIGN_IN' | 'SIGN_UP'
  userId: string
  fullName: string
  email: string
  rawIdentifier: string
}) {
  const leadId = `TG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(
    1000 + Math.random() * 9000
  )}`

  const payload = {
    submissionId: leadId,
    leadId,
    name: params.fullName || params.rawIdentifier,
    email: params.email,
    company: 'TRUSTGRID.AI Chat Portal User',
    role: params.action === 'SIGN_UP' ? 'New Chat Portal Account' : 'Returning Chat Portal User',
    message: `Authenticated on AI Architect Chat Desk (/chat) via ${params.action} | Identifier: ${params.rawIdentifier} | User ID: ${params.userId}`,
    source: 'AI Architect Chat Desk (/chat)',
    formName: 'AI Architect Chat Auth',
    leadType: 'CHATBOT_LEAD',
    service: 'AI Architect Chat Desk Access',
    website: 'TRUSTGRID.AI',
    directDispatched: true
  }

  await Promise.allSettled([
    insertLeadToSupabase(payload),
    dispatchDirectToGoogleSheets(payload),
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  ])
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ChatUser>(() => getOrCreateGuestUser())
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.user) {
          setUser(parsed.user)
          setAccessToken(parsed.access_token || null)
          setIsLoading(false)
          return
        }
      }
    } catch {}

    setUser(getOrCreateGuestUser())
    setIsLoading(false)
  }, [])

  const completeInstantLogin = useCallback(
    async (params: {
      action: 'SIGN_IN' | 'SIGN_UP'
      rawIdentifier: string
      fullName?: string
    }) => {
      const { anonKey } = getSupabaseClientConfig()
      const cleanId = params.rawIdentifier.trim()
      const normalizedEmail = cleanId.includes('@')
        ? cleanId.toLowerCase()
        : `${cleanId.toLowerCase().replace(/[^a-z0-9._-]/g, '')}@trustgrid.ai`

      // Reuse existing account ID if previously registered on this browser
      let storedAccount: any = null
      if (typeof window !== 'undefined') {
        try {
          const accountsMap = JSON.parse(localStorage.getItem(LOCAL_ACCOUNTS_KEY) || '{}')
          storedAccount = accountsMap[normalizedEmail]
        } catch {}
      }

      const resolvedName =
        params.fullName?.trim() ||
        storedAccount?.fullName ||
        (cleanId.includes('@') ? cleanId.split('@')[0] : cleanId)

      const isAdminUser =
        cleanId.toLowerCase() === 'admin' ||
        normalizedEmail === 'poojasri@trustgrid.ai' ||
        normalizedEmail === 'connect@trustgrid.ai'

      const authedUser: ChatUser = {
        id: storedAccount?.id || generateUuid(),
        email: normalizedEmail,
        fullName: resolvedName,
        role: isAdminUser ? 'admin' : 'user',
        isGuest: false
      }

      if (typeof window !== 'undefined') {
        try {
          const accountsMap = JSON.parse(localStorage.getItem(LOCAL_ACCOUNTS_KEY) || '{}')
          accountsMap[normalizedEmail] = authedUser
          localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accountsMap))
          localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify({
              access_token: anonKey,
              user: authedUser,
              saved_at: Date.now()
            })
          )
        } catch {}
      }

      setUser(authedUser)
      setAccessToken(anonKey)
      setIsAuthModalOpen(false)

      // Sync guest conversations & capture user details in BOTH Supabase and Google Sheets
      await Promise.allSettled([
        syncGuestConversationsToUser(authedUser.id, anonKey),
        captureChatAuthInSupabaseAndSheets({
          action: params.action,
          userId: authedUser.id,
          fullName: resolvedName,
          email: normalizedEmail,
          rawIdentifier: cleanId
        })
      ])
    },
    []
  )

  const signInWithEmail = async (
    emailOrUsername: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!emailOrUsername.trim() || !password) {
      return { success: false, error: 'Please enter your email/username and password.' }
    }

    await completeInstantLogin({
      action: 'SIGN_IN',
      rawIdentifier: emailOrUsername
    })
    return { success: true }
  }

  const signUpWithEmail = async (
    emailOrUsername: string,
    password: string,
    fullName: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!emailOrUsername.trim() || !password) {
      return { success: false, error: 'Please enter your name, email/username, and password.' }
    }

    await completeInstantLogin({
      action: 'SIGN_UP',
      rawIdentifier: emailOrUsername,
      fullName
    })
    return { success: true }
  }

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    }
    setAccessToken(null)
    setUser(getOrCreateGuestUser())
  }

  const continueAsGuest = () => {
    setUser(getOrCreateGuestUser())
    setIsAuthModalOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        signInWithEmail,
        signUpWithEmail,
        signOut,
        continueAsGuest
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return ctx
}
