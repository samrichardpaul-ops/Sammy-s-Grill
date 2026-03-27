'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, CreditCard, CheckCircle, ShieldCheck, Calendar, User } from 'lucide-react'
import toast from 'react-hot-toast'

export interface PaymentItem {
  name: string
  description: string
  price: string
  priceNum: number
  image?: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  item: PaymentItem
}

type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown'
type Step = 'form' | 'processing' | 'success'

function detectCardType(num: string): CardType {
  const n = num.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  return 'unknown'
}

function CardLogo({ type }: { type: CardType }) {
  if (type === 'visa')
    return (
      <span className="text-[10px] font-black italic tracking-tight" style={{ color: '#1a1f71', fontFamily: 'sans-serif', background: '#fff', padding: '1px 4px', borderRadius: 2 }}>
        VISA
      </span>
    )
  if (type === 'mastercard')
    return (
      <span className="flex gap-0.5 items-center">
        <span className="w-4 h-4 rounded-full" style={{ background: '#eb001b', opacity: 0.9 }} />
        <span className="w-4 h-4 rounded-full -ml-2" style={{ background: '#f79e1b', opacity: 0.9 }} />
      </span>
    )
  if (type === 'amex')
    return (
      <span className="text-[9px] font-black tracking-widest" style={{ color: '#007bc1', background: '#fff', padding: '1px 3px', borderRadius: 2 }}>
        AMEX
      </span>
    )
  return null
}

function generateOrderId() {
  return 'SG-' + Math.floor(100000 + Math.random() * 900000)
}

export default function PaymentModal({ isOpen, onClose, onSuccess, item }: PaymentModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [orderId, setOrderId] = useState('')

  // Card fields
  const [cardNum, setCardNum] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cvvFocused, setCvvFocused] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cardType = detectCardType(cardNum)
  const maskedDisplay = cardNum
    ? cardNum.replace(/\d(?=(?:\D*\d){4})/g, '•').padEnd(19, ' ')
    : '•••• •••• •••• ••••'

  void maskedDisplay

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form')
        setCardNum(''); setCardName(''); setExpiry(''); setCvv('')
        setErrors({}); setCvvFocused(false)
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && step !== 'processing') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, step])

  function formatCardNum(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  function validate() {
    const errs: Record<string, string> = {}
    const rawNum = cardNum.replace(/\s/g, '')
    if (rawNum.length < 16) errs.cardNum = 'Enter a valid 16-digit card number'
    if (!cardName.trim()) errs.cardName = 'Cardholder name is required'
    const [m, y] = expiry.split('/')
    if (!m || !y || parseInt(m) > 12 || parseInt(m) < 1 || y.length < 2)
      errs.expiry = 'Enter a valid expiry (MM/YY)'
    if (cvv.replace(/\D/g, '').length < 3) errs.cvv = 'Enter a valid CVV'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStep('processing')
    await new Promise(r => setTimeout(r, 2200))
    const id = generateOrderId()
    setOrderId(id)
    // Save to localStorage orders
    try {
      const orders = JSON.parse(localStorage.getItem('sg_orders') || '[]')
      orders.push({
        orderId: id,
        item: item.name,
        price: item.price,
        date: new Date().toISOString(),
        last4: cardNum.slice(-4),
      })
      localStorage.setItem('sg_orders', JSON.stringify(orders))
    } catch { /* */ }
    setStep('success')
    toast.success(`Payment confirmed! Order ${id} 🎉`)
  }

  const OVERLAY_ANIM = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }
  const PANEL_ANIM = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 240, damping: 28 } },
    exit: { opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={OVERLAY_ANIM}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
          onClick={() => step !== 'processing' && onClose()}
        >
          <motion.div
            variants={PANEL_ANIM}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md overflow-hidden rounded-3xl"
            style={{ background: '#141414', border: '1px solid #262626', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            {step !== 'processing' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X size={18} />
              </button>
            )}

            {/* ============ STEP: FORM ============ */}
            {step === 'form' && (
              <form onSubmit={handlePay}>
                {/* Order Summary */}
                <div className="relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1a0a04, #2a0f06)' }}
                  />
                  {item.image && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                      />
                    </>
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(20,10,4,0.6), rgba(20,10,4,0.95))' }}
                  />
                  <div className="relative z-10 p-6 pb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock size={12} className="text-[#e8501a]" />
                      <span
                        className="text-[10px] uppercase tracking-widest"
                        style={{ fontFamily: "'DM Sans',sans-serif", color: '#e8501a' }}
                      >
                        Secure Payment
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Playfair Display',serif" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-white/50 text-xs mb-4"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      {item.description}
                    </p>
                    <div className="flex items-end justify-between">
                      <span
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Playfair Display',serif", color: '#e8501a' }}
                      >
                        {item.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green-400" />
                        <span
                          className="text-green-400 text-xs font-semibold"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}
                        >
                          SSL Secured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Preview */}
                <div className="px-6 pt-5">
                  <div
                    className="relative rounded-2xl p-5 mb-5 overflow-hidden"
                    style={{
                      background: cvvFocused
                        ? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'
                        : 'linear-gradient(135deg, #1c0e06, #2d1808)',
                      border: '1px solid rgba(232,80,26,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      transition: 'background 0.4s ease',
                      minHeight: 120,
                    }}
                  >
                    {/* Chip */}
                    {!cvvFocused && (
                      <div
                        className="absolute top-5 left-5 w-8 h-6 rounded"
                        style={{ background: 'linear-gradient(135deg, #d4a853, #b8901d)', opacity: 0.9 }}
                      />
                    )}

                    {cvvFocused ? (
                      /* Card Back */
                      <div className="flex flex-col justify-center h-full py-2">
                        <div className="w-full h-6 mb-4" style={{ background: '#333' }} />
                        <div className="flex justify-end items-center gap-3">
                          <span
                            className="text-white/40 text-xs"
                            style={{ fontFamily: "'DM Sans',sans-serif" }}
                          >
                            CVV
                          </span>
                          <div
                            className="px-3 py-1 rounded"
                            style={{ background: '#fff', minWidth: 48 }}
                          >
                            <span
                              className="text-[#1a1a1a] text-sm font-bold tracking-widest"
                              style={{ fontFamily: 'monospace' }}
                            >
                              {cvv || '•••'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Card Front */
                      <div>
                        <div className="flex justify-between items-start mb-4 mt-1">
                          <div className="w-8 h-6" /> {/* chip placeholder */}
                          <div className="mt-1">
                            <CardLogo type={cardType} />
                          </div>
                        </div>
                        <p
                          className="text-white/80 text-sm tracking-[0.18em] mb-3"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {cardNum || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p
                              className="text-white/30 text-[8px] uppercase tracking-widest mb-0.5"
                              style={{ fontFamily: "'DM Sans',sans-serif" }}
                            >
                              Card Holder
                            </p>
                            <p
                              className="text-white/70 text-xs tracking-wider"
                              style={{ fontFamily: "'DM Sans',sans-serif" }}
                            >
                              {cardName.toUpperCase() || 'YOUR NAME'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className="text-white/30 text-[8px] uppercase tracking-widest mb-0.5"
                              style={{ fontFamily: "'DM Sans',sans-serif" }}
                            >
                              Expires
                            </p>
                            <p
                              className="text-white/70 text-xs tracking-wider"
                              style={{ fontFamily: "'DM Sans',sans-serif" }}
                            >
                              {expiry || 'MM/YY'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="mb-4">
                    <label className="pay-label">Card Number</label>
                    <div className="relative">
                      <CreditCard size={15} className="pay-icon" />
                      <input
                        className="pay-input"
                        placeholder="1234 5678 9012 3456"
                        value={cardNum}
                        maxLength={19}
                        onChange={e => {
                          setCardNum(formatCardNum(e.target.value))
                          setErrors(prev => { const n = { ...prev }; delete n.cardNum; return n })
                        }}
                        style={{
                          background: '#1e1e1e',
                          border: `1px solid ${errors.cardNum ? '#e8501a' : '#2e2e2e'}`,
                          letterSpacing: '0.08em',
                        }}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CardLogo type={cardType} />
                      </div>
                    </div>
                    {errors.cardNum && <p className="pay-error">{errors.cardNum}</p>}
                  </div>

                  {/* Card Name */}
                  <div className="mb-4">
                    <label className="pay-label">Name on Card</label>
                    <div className="relative">
                      <User size={15} className="pay-icon" />
                      <input
                        className="pay-input"
                        placeholder="As it appears on your card"
                        value={cardName}
                        onChange={e => {
                          setCardName(e.target.value)
                          setErrors(prev => { const n = { ...prev }; delete n.cardName; return n })
                        }}
                        style={{
                          background: '#1e1e1e',
                          border: `1px solid ${errors.cardName ? '#e8501a' : '#2e2e2e'}`,
                          textTransform: 'uppercase',
                        }}
                      />
                    </div>
                    {errors.cardName && <p className="pay-error">{errors.cardName}</p>}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div>
                      <label className="pay-label">Expiry</label>
                      <div className="relative">
                        <Calendar size={14} className="pay-icon" />
                        <input
                          className="pay-input"
                          placeholder="MM/YY"
                          value={expiry}
                          maxLength={5}
                          onChange={e => {
                            setExpiry(formatExpiry(e.target.value))
                            setErrors(prev => { const n = { ...prev }; delete n.expiry; return n })
                          }}
                          style={{
                            background: '#1e1e1e',
                            border: `1px solid ${errors.expiry ? '#e8501a' : '#2e2e2e'}`,
                          }}
                        />
                      </div>
                      {errors.expiry && <p className="pay-error">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="pay-label">CVV</label>
                      <div className="relative">
                        <Lock size={14} className="pay-icon" />
                        <input
                          className="pay-input"
                          placeholder="•••"
                          value={cvv}
                          maxLength={4}
                          type="password"
                          onFocus={() => setCvvFocused(true)}
                          onBlur={() => setCvvFocused(false)}
                          onChange={e => {
                            setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                            setErrors(prev => { const n = { ...prev }; delete n.cvv; return n })
                          }}
                          style={{
                            background: '#1e1e1e',
                            border: `1px solid ${errors.cvv ? '#e8501a' : '#2e2e2e'}`,
                          }}
                        />
                      </div>
                      {errors.cvv && <p className="pay-error">{errors.cvv}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 mb-4 transition-all hover:brightness-110"
                    style={{
                      background: 'linear-gradient(135deg, #e8501a, #c03d10)',
                      fontFamily: "'DM Sans',sans-serif",
                      boxShadow: '0 6px 30px rgba(232,80,26,0.45)',
                    }}
                  >
                    <Lock size={16} />
                    Pay {item.price}
                  </button>

                  <div
                    className="flex items-center justify-center gap-4 pb-5 text-xs"
                    style={{ color: 'rgba(250,248,244,0.25)', fontFamily: "'DM Sans',sans-serif" }}
                  >
                    {['🔒 256-bit SSL', '✅ Verified & Secure', '🔄 Instant Confirmation'].map((b, i) => (
                      <span key={i}>{b}</span>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {/* ============ STEP: PROCESSING ============ */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center min-h-[360px]">
                <div className="relative mb-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(232,80,26,0.1)',
                      border: '2px solid rgba(232,80,26,0.3)',
                      animation: 'glowPulse 1.2s ease-in-out infinite',
                    }}
                  >
                    <svg
                      className="animate-spin w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#e8501a"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-80"
                        fill="#e8501a"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display',serif" }}
                >
                  Processing Payment
                </h3>
                <p
                  className="text-white/40 text-sm"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  Please don&apos;t close this window...
                </p>
                <div className="mt-6 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: '#e8501a',
                        animation: `bounce 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ============ STEP: SUCCESS ============ */}
            {step === 'success' && (
              <div className="flex flex-col items-center text-center py-12 px-8">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="mb-6"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.4)' }}
                  >
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
                    style={{
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      color: '#4ade80',
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Payment Successful
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display',serif" }}
                  >
                    Booking Confirmed! 🎉
                  </h3>
                  <p
                    className="text-white/50 text-sm mb-6"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Thank you for your purchase. Your table at Sammy&apos;s Grill is confirmed.
                  </p>

                  <div
                    className="rounded-2xl p-5 mb-6 text-left"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        Order ID
                      </span>
                      <span
                        className="text-[#e8501a] font-bold text-sm"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        {orderId}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        Package
                      </span>
                      <span className="text-white text-sm font-medium" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {item.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 text-xs" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        Amount Paid
                      </span>
                      <span className="text-white text-sm font-bold" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-xl mb-6 text-xs"
                    style={{
                      background: 'rgba(212,168,83,0.1)',
                      border: '1px solid rgba(212,168,83,0.25)',
                      color: '#d4a853',
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    📧 A confirmation has been sent to your registered email
                  </div>

                  <button
                    onClick={() => { onSuccess(); onClose() }}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
                    style={{
                      background: 'linear-gradient(135deg, #e8501a, #c03d10)',
                      fontFamily: "'DM Sans',sans-serif",
                      boxShadow: '0 4px 20px rgba(232,80,26,0.4)',
                    }}
                  >
                    🍽 View My Booking
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
