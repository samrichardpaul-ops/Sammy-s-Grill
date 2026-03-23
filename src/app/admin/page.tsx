'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import type { Reservation } from '@/lib/types'

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState('')
  const [dateFilter,   setDateFilter]   = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [deleting,     setDeleting]     = useState<string | null>(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search)       params.set('q',      search)
      if (dateFilter)   params.set('date',   dateFilter)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/reservations?${params}`)
      const data = await res.json()
      setReservations(data.reservations ?? [])
    } catch { toast.error('Failed to load reservations') }
    finally { setLoading(false) }
  }, [search, dateFilter, statusFilter])

  useEffect(() => { fetchReservations() }, [fetchReservations])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete reservation for ${name}?`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setReservations(prev => prev.filter(r => r.id !== id))
      toast.success('Reservation deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  async function handleStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      const { reservation } = await res.json()
      setReservations(prev => prev.map(r => r.id === id ? reservation : r))
      toast.success(`Status updated to ${status}`)
    } catch { toast.error('Failed to update status') }
  }

  const stats = {
    total:     reservations.length,
    pending:   reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    guests:    reservations.reduce((s, r) => s + r.guests, 0),
  }

  return (
    <div className="min-h-screen" style={{ background: '#111', color: '#faf8f4', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="border-b px-8 py-5 flex items-center justify-between" style={{ borderColor: '#2e2e2e', background: '#1a1a1a' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm" style={{ color: '#8a8a8a' }}>← Back to site</a>
          <span style={{ color: '#3a3a3a' }}>|</span>
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sammy&apos;s <span style={{ color: '#e8501a' }}>Admin</span>
          </h1>
        </div>
        <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(232,80,26,0.15)', color: '#e8501a', border: '1px solid rgba(232,80,26,0.3)' }}>
          Reservations Panel
        </span>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings',  value: stats.total,     color: '#e8501a' },
            { label: 'Pending',         value: stats.pending,   color: '#d4a853' },
            { label: 'Confirmed',       value: stats.confirmed, color: '#4ade80' },
            { label: 'Total Guests',    value: stats.guests,    color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid #2e2e2e' }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8a8a8a' }}>{s.label}</p>
              <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display',serif", color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="flex-1 min-w-[220px] rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{ background: '#1a1a1a', border: '1px solid #3a3a3a', color: '#faf8f4' }}
            onKeyDown={e => e.key === 'Enter' && fetchReservations()}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{ background: '#1a1a1a', border: '1px solid #3a3a3a', color: '#faf8f4' }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{ background: '#1a1a1a', border: '1px solid #3a3a3a', color: '#faf8f4' }}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={fetchReservations}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: '#e8501a', color: 'white' }}
          >
            Search
          </button>
          <button
            onClick={() => { setSearch(''); setDateFilter(''); setStatusFilter('') }}
            className="px-5 py-2.5 rounded-lg text-sm"
            style={{ background: '#2e2e2e', color: '#8a8a8a' }}
          >
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #2e2e2e', background: '#1a1a1a' }}>
          {loading ? (
            <div className="flex items-center justify-center py-20 text-sm" style={{ color: '#8a8a8a' }}>
              Loading reservations…
            </div>
          ) : reservations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-4xl">📋</span>
              <p style={{ color: '#8a8a8a' }}>No reservations found</p>
            </div>
          ) : (
            <table className="w-full admin-table">
              <thead>
                <tr style={{ background: '#242424' }}>
                  <th className="text-left">Guest</th>
                  <th className="text-left">Contact</th>
                  <th className="text-left">Date & Time</th>
                  <th className="text-left">Guests</th>
                  <th className="text-left">Special Requests</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {reservations.map(r => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <td>
                        <div className="font-semibold" style={{ color: '#faf8f4' }}>{r.full_name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#8a8a8a' }}>
                          {new Date(r.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                        </div>
                      </td>
                      <td>
                        <div>{r.email}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#8a8a8a' }}>{r.phone}</div>
                      </td>
                      <td>
                        <div>{new Date(r.reservation_date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#8a8a8a' }}>{r.reservation_time}</div>
                      </td>
                      <td>{r.guests} {r.guests === 1 ? 'Guest' : 'Guests'}</td>
                      <td>
                        <span className="text-xs" style={{ color: '#8a8a8a' }}>
                          {r.special_requests ?? '—'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${r.status}`}>{r.status}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <select
                            value={r.status}
                            onChange={e => handleStatus(r.id, e.target.value)}
                            className="text-xs rounded px-2 py-1 outline-none"
                            style={{ background: '#2e2e2e', border: '1px solid #3a3a3a', color: '#faf8f4' }}
                          >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                          <button
                            onClick={() => handleDelete(r.id, r.full_name)}
                            disabled={deleting === r.id}
                            className="text-xs px-3 py-1 rounded transition-all"
                            style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
                          >
                            {deleting === r.id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-xs text-center" style={{ color: '#3a3a3a' }}>
          {reservations.length} record{reservations.length !== 1 ? 's' : ''} found
        </p>
      </div>
    </div>
  )
}
