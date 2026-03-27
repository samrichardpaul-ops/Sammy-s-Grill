'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'
import type { ReservationInsert } from '@/lib/types'
import { Calendar, Clock, Users, ChefHat, Gift } from 'lucide-react'

const EMPTY: ReservationInsert = {
  full_name: '',
  email: '',
  phone: '',
  reservation_date: '',
  reservation_time: '',
  guests: 1,
  special_requests: '',
}

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]

const BOOKING_TYPES = [
  {
    id: 'regular',
    label: 'Regular Dining',
    icon: <ChefHat size={18} />,
    desc: 'A simple, great meal',
    color: '#e8501a',
  },
  {
    id: 'celebration',
    label: 'Celebration',
    icon: <Gift size={18} />,
    desc: 'Birthday, anniversary & more',
    color: '#d4a853',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: <Users size={18} />,
    desc: 'Team lunches & events',
    color: '#7b9cda',
  },
]

function ConfirmationCard({
  form,
  bookingType,
  onReset,
}: {
  form: ReservationInsert
  bookingType: string
  onReset: () => void
}) {
  const selectedType = BOOKING_TYPES.find((t) => t.id === bookingType)

  const formattedDate = form.reservation_date
    ? new Date(form.reservation_date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid #2e2e2e', background: '#1a1a1a' }}
    >
      {/* Top Banner */}
      <div
        className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #e8501a 0%, #c03d10 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="text-center z-10 px-4">
          <div className="text-4xl mb-2">🎉</div>
          <h3
            className="text-white text-2xl font-bold heading-playfair"
          >
            Booking Confirmed!
          </h3>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            We can&apos;t wait to welcome you to Sammy&apos;s Grill
          </p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{
            background: `${selectedType?.color ?? '#e8501a'}20`,
            color: selectedType?.color ?? '#e8501a',
            border: `1px solid ${selectedType?.color ?? '#e8501a'}40`,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {selectedType?.icon}
          {selectedType?.label}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { icon: <Users size={16} />, label: 'Guest Name', value: form.full_name },
            { icon: <ChefHat size={16} />, label: 'Email', value: form.email },
            { icon: <Calendar size={16} />, label: 'Date', value: formattedDate },
            { icon: <Clock size={16} />, label: 'Time', value: form.reservation_time },
            {
              icon: <Users size={16} />,
              label: 'Guests',
              value: `${form.guests} ${Number(form.guests) === 1 ? 'Guest' : 'Guests'}`,
            },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#242424' }}>
              <span style={{ color: '#e8501a', marginTop: 2 }}>{row.icon}</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {row.label}
                </p>
                <p className="text-sm text-white font-medium" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {row.value}
                </p>
              </div>
            </div>
          ))}
          {form.special_requests && (
            <div className="sm:col-span-2 flex items-start gap-3 p-3 rounded-xl" style={{ background: '#242424' }}>
              <span style={{ color: '#e8501a', marginTop: 2 }}>
                <Gift size={16} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Special Requests
                </p>
                <p className="text-sm text-white/80" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {form.special_requests}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl mb-6" style={{ background: '#d4a85315', border: '1px solid #d4a85330' }}>
          <p className="text-[#d4a853] text-sm text-center" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            📧 A confirmation email has been sent to <strong>{form.email}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all btn-ember"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            Make Another Booking
          </button>
          <a
            href="#menu"
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-center transition-all"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              border: '1px solid #3a3a3a',
              color: '#8a8a8a',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8a8a8a')}
          >
            Browse Menu
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reservation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState<ReservationInsert>(EMPTY)
  const [bookingType, setBookingType] = useState('regular')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submittedForm, setSubmittedForm] = useState<ReservationInsert>(EMPTY)

  function set(field: keyof ReservationInsert, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    if (!form.full_name.trim()) nextErrors.full_name = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Valid email required'
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required'
    if (!form.reservation_date) nextErrors.reservation_date = 'Date is required'
    if (!form.reservation_time) nextErrors.reservation_time = 'Time slot is required'
    if (!form.guests || form.guests < 1) nextErrors.guests = 'Number of guests required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = {
        ...form,
        booking_type: bookingType,
        special_requests: `[${BOOKING_TYPES.find((t) => t.id === bookingType)?.label}] ${form.special_requests}`,
      }
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) {
        const message = data?.errors?.[0] || data?.error || 'Booking failed. Please try again.'
        throw new Error(message)
      }
      if (data?.databaseSaved === false) {
        toast('Owner notified, but dashboard save failed.', { icon: '⚠️' })
      }
      setSubmittedForm({ ...form })
      setSuccess(true)
      setForm(EMPTY)
      toast.success('Reservation sent! Check your email for confirmation.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Booking failed. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const lbl = (text: string, req?: boolean) => (
    <label
      className="block text-xs uppercase tracking-widest mb-1.5 font-medium"
      style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}
    >
      {text}
      {req && <span style={{ color: '#e8501a' }}> *</span>}
    </label>
  )

  const errMsg = (field: string) =>
    errors[field] ? (
      <p className="mt-1 text-xs" style={{ color: '#e8501a', fontFamily: "'DM Sans',sans-serif" }}>
        {errors[field]}
      </p>
    ) : null

  const today = new Date().toISOString().split('T')[0]

  return (
    <section
      id="reservation"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#242424' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans',sans-serif", color: '#d4a853' }}
            >
              Reservations
            </span>
            <div className="section-divider" />
          </div>
          <h2 className="section-title mb-3 text-white heading-playfair text-4xl md:text-5xl font-bold">
            Make a <span style={{ color: '#e8501a', fontStyle: 'italic' }}>Reservation</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a', fontSize: '0.95rem' }}>
            Book your table now and enjoy a wonderful dining experience
          </p>
        </motion.div>

        {success ? (
          <ConfirmationCard
            form={submittedForm}
            bookingType={bookingType}
            onReset={() => {
              setSuccess(false)
              setBookingType('regular')
            }}
          />
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 lg:p-10"
            style={{ background: '#1a1a1a', border: '1px solid #2e2e2e' }}
          >
            {/* Booking Type Selector */}
            <div className="mb-7">
              <p
                className="text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}
              >
                Booking Type <span style={{ color: '#e8501a' }}>*</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BOOKING_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setBookingType(type.id)}
                    className="flex flex-col items-start gap-1.5 p-4 rounded-xl border transition-all text-left"
                    style={{
                      background: bookingType === type.id ? `${type.color}15` : '#242424',
                      borderColor: bookingType === type.id ? type.color : '#3a3a3a',
                      boxShadow: bookingType === type.id ? `0 0 0 1px ${type.color}40` : 'none',
                    }}
                  >
                    <span style={{ color: bookingType === type.id ? type.color : '#8a8a8a' }}>
                      {type.icon}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: bookingType === type.id ? type.color : '#faf8f4',
                      }}
                    >
                      {type.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}
                    >
                      {type.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Full Name', true)}
                <input
                  className="form-field"
                  value={form.full_name}
                  onChange={(e) => set('full_name', e.target.value)}
                  placeholder="John Smith"
                />
                {errMsg('full_name')}
              </div>
              <div>
                {lbl('Email Address', true)}
                <input
                  className="form-field"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="john@example.com"
                />
                {errMsg('email')}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Phone Number', true)}
                <input
                  className="form-field"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
                {errMsg('phone')}
              </div>
              <div>
                {lbl('Number of Guests', true)}
                <select
                  className="form-field"
                  value={form.guests}
                  onChange={(e) => set('guests', Number(e.target.value))}
                >
                  {GUEST_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errMsg('guests')}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                {lbl('Reservation Date', true)}
                <input
                  className="form-field"
                  type="date"
                  min={today}
                  value={form.reservation_date}
                  onChange={(e) => set('reservation_date', e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
                {errMsg('reservation_date')}
              </div>
              <div>
                {lbl('Time Slot', true)}
                <select
                  className="form-field"
                  value={form.reservation_time}
                  onChange={(e) => set('reservation_time', e.target.value)}
                >
                  <option value="">Select a time...</option>
                  <optgroup label="Lunch (11:00 - 14:30)">
                    {TIME_SLOTS.slice(0, 8).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Dinner (18:00 - 22:00)">
                    {TIME_SLOTS.slice(8).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errMsg('reservation_time')}
              </div>
            </div>

            <div className="mb-8">
              {lbl('Special Requests')}
              <textarea
                className="form-field"
                rows={3}
                value={form.special_requests}
                onChange={(e) => set('special_requests', e.target.value)}
                placeholder="Allergies, special occasions, seating preferences, dietary needs..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-ember w-full justify-center text-base flex items-center gap-2"
              style={{ borderRadius: '8px', padding: '1rem' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Reservation'
              )}
            </button>

            <p
              className="text-center mt-4 text-xs"
              style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}
            >
              You&apos;ll receive a confirmation email with your booking details.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
