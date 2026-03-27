'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Flame, Mail, Lock, User as UserIcon, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

const OVERLAY = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}
const PANEL = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 26 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
}

type Tab = 'login' | 'register'

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login, register } = useAuth()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')

  // Register fields
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regConfirm, setRegConfirm] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAuth() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeAuth])

  // Lock body scroll when open
  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isAuthOpen])

  function resetFields() {
    setLoginEmail(''); setLoginPass('')
    setRegName(''); setRegEmail(''); setRegPass(''); setRegConfirm('')
    setErrors({}); setShowPass(false); setShowConfirm(false)
  }

  function switchTab(t: Tab) {
    setTab(t)
    resetFields()
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!loginEmail.trim()) errs.loginEmail = 'Email is required'
    if (!loginPass.trim()) errs.loginPass = 'Password is required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const res = await login(loginEmail.trim(), loginPass)
    setLoading(false)
    if (res.ok) {
      toast.success('Welcome back! 🔥')
      resetFields()
    } else {
      setErrors({ loginGeneral: res.error || 'Login failed.' })
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!regName.trim()) errs.regName = 'Name is required'
    if (!regEmail.trim() || !/\S+@\S+\.\S+/.test(regEmail)) errs.regEmail = 'Valid email required'
    if (regPass.length < 6) errs.regPass = 'Password must be at least 6 characters'
    if (regPass !== regConfirm) errs.regConfirm = 'Passwords do not match'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const res = await register(regName.trim(), regEmail.trim(), regPass)
    setLoading(false)
    if (res.ok) {
      toast.success("Account created! Welcome to Sammy's 🔥")
      resetFields()
    } else {
      setErrors({ regGeneral: res.error || 'Registration failed.' })
    }
  }

  const inputStyle = (err?: string) => ({
    background: '#1e1e1e',
    border: `1px solid ${err ? '#e8501a' : '#2e2e2e'}`,
    boxShadow: err ? '0 0 0 3px rgba(232,80,26,0.12)' : undefined,
  })

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          variants={OVERLAY}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={closeAuth}
        >
          <motion.div
            variants={PANEL}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl flex shadow-2xl"
            style={{ background: '#141414', border: '1px solid #2a2a2a', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeAuth}
              className="absolute top-4 right-4 z-30 text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={20} />
            </button>

            {/* Left Panel — Image + Branding */}
            <div
              className="hidden lg:flex w-[42%] flex-col justify-end relative overflow-hidden"
              style={{ minHeight: 560 }}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85"
                alt="Sammy's Grill"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(10,6,3,0.3) 0%, rgba(10,6,3,0.85) 70%, rgba(10,6,3,0.98) 100%)',
                }}
              />
              {/* Ember particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 rounded-full"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      width: 2 + i % 4,
                      height: 3 + i % 4,
                      background: ['#e8501a', '#ff6b35', '#d4a853', '#ff9945'][i % 4],
                      boxShadow: `0 0 8px ${['#e8501a', '#ff6b35', '#d4a853', '#ff9945'][i % 4]}`,
                      animation: `emberRise ${2.5 + (i * 0.4)}s ${i * 0.35}s infinite ease-out`,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 pb-10">
                <div className="flex items-center gap-2 mb-6">
                  <Flame size={20} className="text-[#e8501a]" />
                  <span
                    className="text-xs uppercase tracking-[0.2em] text-[#d4a853]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Est. 2020 · Kanakapura
                  </span>
                </div>
                <h2
                  className="text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display',serif", lineHeight: 1.2 }}
                >
                  Where Fire<br />Meets <span className="text-[#e8501a] italic">Flavour</span>
                </h2>
                <p
                  className="text-white/55 text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  Sign in to book tables, manage reservations, and unlock exclusive member offers.
                </p>

                {/* Trust badges */}
                <div className="mt-8 space-y-2">
                  {[
                    '🍽 Instant table booking confirmation',
                    '💳 Secure checkout powered by SSL',
                    '🎁 Member-only exclusive deals',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-[#e8501a] flex-shrink-0" />
                      <span
                        className="text-white/50 text-xs"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex-1 flex flex-col overflow-y-auto" style={{ maxHeight: '90vh' }}>
              <div className="p-8 lg:p-10 flex-1">
                {/* Logo (mobile) */}
                <div className="lg:hidden mb-6 flex items-center gap-2">
                  <Flame size={18} className="text-[#e8501a]" />
                  <span
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display',serif" }}
                  >
                    Sammy&apos;s <span className="text-[#e8501a]">Grill</span>
                  </span>
                </div>

                {/* Tabs */}
                <div
                  className="flex gap-1 p-1 rounded-xl mb-8"
                  style={{ background: '#1e1e1e', border: '1px solid #2a2a2a' }}
                >
                  {(['login', 'register'] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: tab === t ? '#e8501a' : 'transparent',
                        color: tab === t ? '#fff' : 'rgba(250,248,244,0.45)',
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {t === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {tab === 'login' ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="space-y-5"
                    >
                      <div>
                        <p
                          className="text-white text-xl font-bold mb-1"
                          style={{ fontFamily: "'Playfair Display',serif" }}
                        >
                          Welcome back
                        </p>
                        <p
                          className="text-white/40 text-sm"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          Sign in to your Sammy&apos;s Grill account
                        </p>
                      </div>

                      {errors.loginGeneral && (
                        <div
                          className="px-4 py-3 rounded-xl text-sm"
                          style={{
                            background: 'rgba(232,80,26,0.1)',
                            border: '1px solid rgba(232,80,26,0.3)',
                            color: '#e8501a',
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          {errors.loginGeneral}
                        </div>
                      )}

                      <div>
                        <label className="auth-label">Email Address</label>
                        <div className="relative">
                          <Mail size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            type="email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onChange={(e) => { setLoginEmail(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.loginEmail)}
                          />
                        </div>
                        {errors.loginEmail && <p className="auth-error">{errors.loginEmail}</p>}
                      </div>

                      <div>
                        <label className="auth-label">Password</label>
                        <div className="relative">
                          <Lock size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            type={showPass ? 'text' : 'password'}
                            placeholder="Your password"
                            value={loginPass}
                            onChange={(e) => { setLoginPass(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.loginPass)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {errors.loginPass && <p className="auth-error">{errors.loginPass}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                        style={{
                          background: loading ? '#c03d10' : '#e8501a',
                          color: '#fff',
                          fontFamily: "'DM Sans',sans-serif",
                          boxShadow: '0 4px 24px rgba(232,80,26,0.4)',
                        }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Signing in...
                          </>
                        ) : (
                          '🔥 Sign In'
                        )}
                      </button>

                      <p
                        className="text-center text-xs"
                        style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(250,248,244,0.35)' }}
                      >
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          onClick={() => switchTab('register')}
                          className="text-[#e8501a] hover:text-[#ff6b35] transition-colors font-semibold"
                        >
                          Create one free →
                        </button>
                      </p>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="register"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleRegister}
                      className="space-y-4"
                    >
                      <div>
                        <p
                          className="text-white text-xl font-bold mb-1"
                          style={{ fontFamily: "'Playfair Display',serif" }}
                        >
                          Create your account
                        </p>
                        <p
                          className="text-white/40 text-sm"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          Join thousands of guests who love Sammy&apos;s
                        </p>
                      </div>

                      {errors.regGeneral && (
                        <div
                          className="px-4 py-3 rounded-xl text-sm"
                          style={{
                            background: 'rgba(232,80,26,0.1)',
                            border: '1px solid rgba(232,80,26,0.3)',
                            color: '#e8501a',
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          {errors.regGeneral}
                        </div>
                      )}

                      <div>
                        <label className="auth-label">Full Name</label>
                        <div className="relative">
                          <UserIcon size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            placeholder="John Smith"
                            value={regName}
                            onChange={(e) => { setRegName(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.regName)}
                          />
                        </div>
                        {errors.regName && <p className="auth-error">{errors.regName}</p>}
                      </div>

                      <div>
                        <label className="auth-label">Email Address</label>
                        <div className="relative">
                          <Mail size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            type="email"
                            placeholder="you@example.com"
                            value={regEmail}
                            onChange={(e) => { setRegEmail(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.regEmail)}
                          />
                        </div>
                        {errors.regEmail && <p className="auth-error">{errors.regEmail}</p>}
                      </div>

                      <div>
                        <label className="auth-label">Password</label>
                        <div className="relative">
                          <Lock size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            type={showPass ? 'text' : 'password'}
                            placeholder="Minimum 6 characters"
                            value={regPass}
                            onChange={(e) => { setRegPass(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.regPass)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {errors.regPass && <p className="auth-error">{errors.regPass}</p>}
                      </div>

                      <div>
                        <label className="auth-label">Confirm Password</label>
                        <div className="relative">
                          <Lock size={16} className="auth-icon" />
                          <input
                            className="auth-input"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Repeat your password"
                            value={regConfirm}
                            onChange={(e) => { setRegConfirm(e.target.value); setErrors({}) }}
                            style={inputStyle(errors.regConfirm)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {errors.regConfirm && <p className="auth-error">{errors.regConfirm}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                        style={{
                          background: loading ? '#c03d10' : '#e8501a',
                          color: '#fff',
                          fontFamily: "'DM Sans',sans-serif",
                          boxShadow: '0 4px 24px rgba(232,80,26,0.4)',
                        }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Creating Account...
                          </>
                        ) : (
                          '🔥 Create My Account'
                        )}
                      </button>

                      <p
                        className="text-center text-xs"
                        style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(250,248,244,0.35)' }}
                      >
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => switchTab('login')}
                          className="text-[#e8501a] hover:text-[#ff6b35] transition-colors font-semibold"
                        >
                          Sign in →
                        </button>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Security note */}
                <div
                  className="mt-6 flex items-center justify-center gap-2 text-xs"
                  style={{ color: 'rgba(250,248,244,0.25)', fontFamily: "'DM Sans',sans-serif" }}
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M6 0L1 2.5V7C1 10.25 3.2 13.15 6 14C8.8 13.15 11 10.25 11 7V2.5L6 0Z" fill="rgba(232,80,26,0.6)" />
                  </svg>
                  256-bit SSL Encryption · Your data is safe with us
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
