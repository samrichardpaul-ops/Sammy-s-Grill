'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import type { ReservationInsert } from '@/lib/types'

const EMPTY: ReservationInsert = {
  full_name: '', email: '', phone: '',
  reservation_date: '', reservation_time: '', guests: 1,
  special_requests: '',
}

const TIME_SLOTS = [
  '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
  '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00',
]

const GUEST_OPTIONS = [1,2,3,4,5,6,7,8,9,10,12,15,20]

export default function Reservation() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form,    setForm]    = useState<ReservationInsert>(EMPTY)
  const [errors,  setErrors]  = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: keyof ReservationInsert, value: string | number) {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => { const n = { ...p }; delete n[field]; return n })
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.full_name.trim())       e.full_name = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim())           e.phone = 'Phone number is required'
    if (!form.reservation_date)       e.reservation_date = 'Date is required'
    if (!form.reservation_time)       e.reservation_time = 'Time slot is required'
    if (!form.guests || form.guests < 1) e.guests = 'Number of guests required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        const msg = data.errors?.[0] ?? data.error ?? 'Something went wrong'
        toast.error(msg)
        return
      }
      setSuccess(true)
      setForm(EMPTY)
      toast.success('Table booked! We look forward to seeing you 🎉')
    } catch {
      toast.error('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  const lbl = (text: string, req?: boolean) => (
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium"
      style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}>
      {text}{req && <span style={{ color: '#e8501a' }}> *</span>}
    </label>
  )

  const errMsg = (field: string) => errors[field] ? (
    <p className="mt-1 text-xs" style={{ color: '#e8501a', fontFamily: "'DM Sans',sans-serif" }}>
      {errors[field]}
    </p>
  ) : null

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reservation" ref={ref} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#242424' }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Sans',sans-serif", color: '#d4a853' }}>
              Reservations
            </span>
            <div className="section-divider" />
          </div>
          <h2 className="section-title mb-3">
            Make a <span style={{ color: '#e8501a', fontStyle: 'italic' }}>Reservation</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a', fontSize: '0.95rem' }}>
            Book your table now and enjoy a wonderful dining experience
          </p>
        </motion.div>

        {/* Success state */}
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 rounded-2xl"
            style={{ background: '#1a1a1a', border: '1px solid #2e2e2e' }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif", color: '#faf8f4' }}>
              Reservation Confirmed!
            </h3>
            <p className="mb-6" style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}>
              We&apos;ve received your booking. See you soon at Sammy&apos;s!
            </p>
            <button onClick={() => setSuccess(false)} className="btn-ember">
              Make Another Booking
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 lg:p-10"
            style={{ background: '#1a1a1a', border: '1px solid #2e2e2e' }}
          >
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Full Name', true)}
                <input className="form-field" value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="John Smith" />
                {errMsg('full_name')}
              </div>
              <div>
                {lbl('Email Address', true)}
                <input className="form-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@example.com" />
                {errMsg('email')}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Phone Number', true)}
                <input className="form-field" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
                {errMsg('phone')}
              </div>
              <div>
                {lbl('Number of Guests', true)}
                <select className="form-field" value={form.guests} onChange={e => set('guests', Number(e.target.value))}>
                  {GUEST_OPTIONS.map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
                {errMsg('guests')}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Reservation Date', true)}
                <input
                  className="form-field"
                  type="date"
                  min={today}
                  value={form.reservation_date}
                  onChange={e => set('reservation_date', e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
                {errMsg('reservation_date')}
              </div>
              <div>
                {lbl('Time Slot', true)}
                <select className="form-field" value={form.reservation_time} onChange={e => set('reservation_time', e.target.value)}>
                  <option value="">Select a time...</option>
                  <optgroup label="Lunch (11:00 – 14:30)">
                    {TIME_SLOTS.slice(0,8).map(t => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                  <optgroup label="Dinner (18:00 – 22:00)">
                    {TIME_SLOTS.slice(8).map(t => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                </select>
                {errMsg('reservation_time')}
              </div>
            </div>

            {/* Special requests */}
            <div className="mb-8">
              {lbl('Special Requests')}
              <textarea
                className="form-field"
                rows={3}
                value={form.special_requests}
                onChange={e => set('special_requests', e.target.value)}
                placeholder="Allergies, special occasions, seating preferences..."
              />
            </div>

            <button type="submit" disabled={loading} className="btn-ember w-full justify-center text-base" style={{ borderRadius: '8px', padding: '1rem' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
                  </svg>
                  Booking…
                </span>
              ) : (
                '🍽 Book Now'
              )}
            </button>

            <p className="text-center mt-4 text-xs" style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}>
              We&apos;ll confirm your reservation within 30 minutes via email.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
