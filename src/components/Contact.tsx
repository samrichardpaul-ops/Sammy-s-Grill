'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'

const INFO = [
  { icon: '📍', label: 'Address',       value: '123 Food Street, Downtown\nKanakapura, Bangalore — 560 111' },
  { icon: '📞', label: 'Phone',          value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email',          value: 'hello@sammyscafe.com' },
  { icon: '🕐', label: 'Opening Hours',  value: 'Mon – Sun: 11:00 AM – 11:00 PM' },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.errors?.[0] ?? d.error) }
      toast.success("Message sent! We'll get back to you soon 🙌")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const lbl = (text: string) => (
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium"
      style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}>
      {text} <span style={{ color: '#e8501a' }}>*</span>
    </label>
  )

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32" style={{ background: '#1a1a1a' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Sans',sans-serif", color: '#d4a853' }}>
              Get In Touch
            </span>
            <div className="section-divider" />
          </div>
          <h2 className="section-title">
            Contact <span style={{ color: '#e8501a', fontStyle: 'italic' }}>Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {INFO.map(info => (
                <div
                  key={info.label}
                  className="p-5 rounded-xl"
                  style={{ background: '#242424', border: '1px solid #2e2e2e' }}
                >
                  <span className="text-2xl">{info.icon}</span>
                  <p className="mt-3 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans',sans-serif", color: '#8a8a8a' }}>
                    {info.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: '#faf8f4', whiteSpace: 'pre-line' }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #2e2e2e' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sammy&apos;s Grill Cafe Location"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8"
            style={{ background: '#242424', border: '1px solid #2e2e2e' }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Playfair Display',serif", color: '#faf8f4' }}>
              Send a Message
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                {lbl('Your Name')}
                <input className="form-field" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" />
              </div>
              <div>
                {lbl('Email')}
                <input className="form-field" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@email.com" />
              </div>
            </div>
            <div className="mb-4">
              {lbl('Subject')}
              <input className="form-field" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Feedback, inquiry, event booking..." />
            </div>
            <div className="mb-6">
              {lbl('Message')}
              <textarea className="form-field" rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Write your message here..." />
            </div>
            <button type="submit" disabled={loading} className="btn-ember w-full justify-center">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
                  </svg>
                  Sending…
                </span>
              ) : '📨 Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
