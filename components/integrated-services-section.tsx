'use client'

import React, { useState, useEffect } from 'react'
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Check,
  Send,
  ExternalLink,
  RefreshCw,
  LogOut,
  Building2,
  Mail,
  User,
  Phone,
  MessageSquare
} from 'lucide-react'

// Official LinkedIn Monogram SVG
function LinkedInIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export function IntegratedServicesSection() {
  // LinkedIn Connection State
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [accountName, setAccountName] = useState<string>('')
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true)
  const [statusBanner, setStatusBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [showManageModal, setShowManageModal] = useState<boolean>(false)
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false)

  // Lead Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('')

  // 1. Check URL parameters for OAuth Callback feedback on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const linkedinStatus = params.get('linkedin_status')
      const msgParam = params.get('message')

      if (linkedinStatus === 'success') {
        setStatusBanner({
          type: 'success',
          message: 'LinkedIn connection successful.'
        })
        // Clean URL params without reload
        const newUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, '', newUrl)
      } else if (linkedinStatus === 'error') {
        setStatusBanner({
          type: 'error',
          message: msgParam ? decodeURIComponent(msgParam) : 'LinkedIn connection failed. Please try again.'
        })
        const newUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [])

  // 2. Fetch server-side LinkedIn connection status
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/services/linkedin/status')
        if (res.ok) {
          const data = await res.json()
          setIsConnected(Boolean(data.connected))
          if (data.accountName) setAccountName(data.accountName)
        }
      } catch (e) {
        console.warn('[Integrated Services] Failed to query status:', e)
      } finally {
        setIsLoadingStatus(false)
      }
    }
    checkStatus()
  }, [])

  // 3. Initiate LinkedIn OAuth Flow
  const handleConnectLinkedIn = () => {
    window.location.href = '/auth/linkedin'
  }

  // 4. Disconnect LinkedIn Connection
  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    try {
      const res = await fetch('/api/services/linkedin/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disconnect' })
      })
      if (res.ok) {
        setIsConnected(false)
        setAccountName('')
        setShowManageModal(false)
        setStatusBanner({
          type: 'success',
          message: 'LinkedIn connection removed.'
        })
      }
    } catch (e) {
      setStatusBanner({
        type: 'error',
        message: 'Unable to disconnect. Please try again.'
      })
    } finally {
      setIsDisconnecting(false)
    }
  }

  // 5. Submit Lead Capture Form
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Client-side quick check
    if (!name.trim()) {
      setFormError('Full Name is required.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('A valid work email is required.')
      return
    }
    if (!company.trim()) {
      setFormError('Company is required.')
      return
    }

    setFormLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          phone: phone.trim() || undefined,
          message: message.trim() || undefined,
          source: 'LinkedIn',
          service: 'LinkedIn API Integration',
          website: 'TRUSTGRID.AI'
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setFormSuccess(true)
        setSubmittedLeadId(data.leadId || 'TG-RECORD')
        setName('')
        setEmail('')
        setCompany('')
        setPhone('')
        setMessage('')
      } else {
        setFormError(data.message || 'Unable to submit your request. Please try again.')
      }
    } catch (err) {
      setFormError('Unable to submit your request. Please try again.')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <section className="section integrated-services-section" id="integrated-services">
      {/* SECTION INTRO */}
      <div className="section-intro">
        <div className="intro-left">
          <span className="section-badge">INTEGRATED SERVICES</span>
          <p className="section-label">Enterprise Platform Ecosystem</p>
        </div>
        <span className="section-index">SERVICES</span>
      </div>

      {/* SECTION HEADING */}
      <div style={{ maxWidth: '820px', marginBottom: '44px' }}>
        <h2
          style={{
            fontSize: 'clamp(30px, 3.8vw, 54px)',
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            fontWeight: 600,
            color: '#07143d',
            margin: '0 0 16px 0'
          }}
        >
          Integrated <span style={{ color: '#0052cc' }}>Services</span>
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#475467',
            margin: 0
          }}
        >
          Connect authorized enterprise platforms directly with TRUSTGRID.AI. Streamline identity, social presence, and automated lead capture pipelines into unified dealflow records.
        </p>
      </div>

      {/* STATUS BANNER FEEDBACK */}
      {statusBanner && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: '10px',
            marginBottom: '32px',
            backgroundColor: statusBanner.type === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${statusBanner.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
            color: statusBanner.type === 'success' ? '#166534' : '#991b1b',
            fontSize: '14.5px',
            fontWeight: 500
          }}
        >
          {statusBanner.type === 'success' ? (
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-red-600" />
          )}
          <span>{statusBanner.message}</span>
          <button
            onClick={() => setStatusBanner(null)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              fontSize: '18px',
              padding: '0 4px'
            }}
            aria-label="Dismiss alert"
          >
            ×
          </button>
        </div>
      )}

      {/* INTEGRATION CARD & FORM GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {/* LINKEDIN SERVICE CARD */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e4e7ec',
            borderRadius: '14px',
            padding: '36px 32px',
            boxShadow: '0 4px 20px -2px rgba(16, 24, 40, 0.06)',
            position: 'relative'
          }}
        >
          {/* Card Top: Brand & Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#0a66c2',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(10, 102, 194, 0.25)'
              }}
            >
              <LinkedInIcon className="w-6 h-6" />
            </div>

            {/* Connection Status Badge */}
            {isLoadingStatus ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: '#f2f4f7',
                  color: '#475467'
                }}
              >
                <Loader2 size={12} className="animate-spin" />
                Checking...
              </span>
            ) : isConnected ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  backgroundColor: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0'
                }}
              >
                <Check size={14} />
                ✓ Connected
              </span>
            ) : (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: '#f2f4f7',
                  color: '#475467'
                }}
              >
                Ready to Connect
              </span>
            )}
          </div>

          {/* Card Title & Description */}
          <h3
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#07143d',
              margin: '0 0 10px 0',
              letterSpacing: '-0.02em'
            }}
          >
            LinkedIn
          </h3>

          <p
            style={{
              fontSize: '14.5px',
              lineHeight: 1.55,
              color: '#475467',
              margin: '0 0 24px 0'
            }}
          >
            Connect LinkedIn to TRUSTGRID.AI for secure lead and social integration.
          </p>

          {/* Connected Details Info */}
          {isConnected && accountName && (
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                fontSize: '13px',
                color: '#334155'
              }}
            >
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>
                Active Connection
              </div>
              <div style={{ color: '#64748b' }}>Account: {accountName}</div>
            </div>
          )}

          {/* Action Button */}
          {!isConnected ? (
            <button
              onClick={handleConnectLinkedIn}
              type="button"
              id="connect-linkedin-button"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '13px 22px',
                backgroundColor: '#0a66c2',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxShadow: '0 2px 6px rgba(10, 102, 194, 0.2)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#004182')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0a66c2')}
            >
              <LinkedInIcon className="w-4 h-4" />
              <span>Connect LinkedIn</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowManageModal(true)}
                type="button"
                id="manage-linkedin-button"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  backgroundColor: '#ffffff',
                  color: '#07143d',
                  border: '1px solid #d0d5dd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              >
                <span>Manage Connection</span>
              </button>
            </div>
          )}

          {/* Security Assurance Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              fontSize: '12px',
              color: '#667085'
            }}
          >
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>Server-side OAuth 2.0 • Secrets never exposed to client</span>
          </div>

          {/* MANAGE MODAL / POPUP */}
          {showManageModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  maxWidth: '460px',
                  width: '100%',
                  padding: '28px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <LinkedInIcon className="w-5 h-5 text-blue-600" />
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#07143d' }}>
                    LinkedIn Connection Status
                  </h4>
                </div>
                <p style={{ fontSize: '14px', color: '#475467', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                  Your LinkedIn integration is active. Outbound dealflow records and social lead capture are authorized.
                </p>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '14px',
                    marginBottom: '24px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ color: '#64748b', marginBottom: '4px' }}>Authorized Account:</div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{accountName || 'LinkedIn Account'}</div>
                  <div style={{ color: '#047857', fontWeight: 600, marginTop: '6px' }}>✓ Token Active</div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setShowManageModal(false)}
                    type="button"
                    style={{
                      padding: '10px 16px',
                      borderRadius: '6px',
                      border: '1px solid #d0d5dd',
                      background: '#fff',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleDisconnect}
                    disabled={isDisconnecting}
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      border: '1px solid #fecaca',
                      backgroundColor: '#fee2e2',
                      color: '#b91c1c',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {isDisconnecting ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LEAD CAPTURE FORM CARD */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e4e7ec',
            borderRadius: '14px',
            padding: '36px 32px',
            boxShadow: '0 4px 20px -2px rgba(16, 24, 40, 0.06)'
          }}
        >
          <div style={{ marginBottom: '22px' }}>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#07143d',
                margin: '0 0 8px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Get Started with LinkedIn Integration
            </h3>
            <p
              style={{
                fontSize: '14.5px',
                lineHeight: 1.55,
                color: '#475467',
                margin: 0
              }}
            >
              Connect your LinkedIn presence with TRUSTGRID.AI and explore automated lead capture and workflow integration.
            </p>
          </div>

          {/* SUCCESS CONFIRMATION STATE */}
          {formSuccess ? (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-3" />
              <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: 700, color: '#166534' }}>
                Your request has been submitted successfully.
              </h4>
              <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#15803d' }}>
                Our enterprise integrations team will activate your LinkedIn lead automation pipeline.
              </p>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#ffffff',
                  border: '1px solid #86efac',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '12.5px',
                  color: '#166534',
                  marginBottom: '18px'
                }}
              >
                Lead ID: {submittedLeadId}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    border: '1px solid #d0d5dd',
                    backgroundColor: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#344054',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} noValidate>
              {/* Form Validation Error Alert */}
              {formError && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    fontSize: '13.5px',
                    marginBottom: '18px'
                  }}
                >
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Full Name */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="linkedin-lead-name"
                  style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#344054',
                    marginBottom: '6px'
                  }}
                >
                  Full Name <span style={{ color: '#d92d20' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="linkedin-lead-name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Vance"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d0d5dd',
                      fontSize: '14px',
                      color: '#101828',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                    onBlur={(e) => (e.target.style.borderColor = '#d0d5dd')}
                  />
                  <User
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#98a2b3'
                    }}
                  />
                </div>
              </div>

              {/* Work Email */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="linkedin-lead-email"
                  style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#344054',
                    marginBottom: '6px'
                  }}
                >
                  Work Email <span style={{ color: '#d92d20' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="linkedin-lead-email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david@enterprise.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d0d5dd',
                      fontSize: '14px',
                      color: '#101828',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                    onBlur={(e) => (e.target.style.borderColor = '#d0d5dd')}
                  />
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#98a2b3'
                    }}
                  />
                </div>
              </div>

              {/* Company */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="linkedin-lead-company"
                  style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#344054',
                    marginBottom: '6px'
                  }}
                >
                  Company <span style={{ color: '#d92d20' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="linkedin-lead-company"
                    name="company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Global Systems"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d0d5dd',
                      fontSize: '14px',
                      color: '#101828',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                    onBlur={(e) => (e.target.style.borderColor = '#d0d5dd')}
                  />
                  <Building2
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#98a2b3'
                    }}
                  />
                </div>
              </div>

              {/* Phone Number (optional) */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="linkedin-lead-phone"
                  style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#344054',
                    marginBottom: '6px'
                  }}
                >
                  Phone Number <span style={{ color: '#667085', fontWeight: 400 }}>(optional)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    id="linkedin-lead-phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #d0d5dd',
                      fontSize: '14px',
                      color: '#101828',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                    onBlur={(e) => (e.target.style.borderColor = '#d0d5dd')}
                  />
                  <Phone
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#98a2b3'
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  htmlFor="linkedin-lead-message"
                  style={{
                    display: 'block',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#344054',
                    marginBottom: '6px'
                  }}
                >
                  Message
                </label>
                <textarea
                  id="linkedin-lead-message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details on your LinkedIn integration or workflow automation needs..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d0d5dd',
                    fontSize: '14px',
                    color: '#101828',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                  onBlur={(e) => (e.target.style.borderColor = '#d0d5dd')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-linkedin-lead"
                disabled={formLoading}
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  backgroundColor: '#07143d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!formLoading) e.currentTarget.style.backgroundColor = '#0052cc'
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) e.currentTarget.style.backgroundColor = '#07143d'
                }}
              >
                {formLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
