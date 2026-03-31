'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Clock, Mail, Phone, LogOut, Search, X, Edit2, Trash2, CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

interface Reservation {
  id: string
  full_name: string
  email: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
  special_requests?: string
  created_at: string
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  
  // Edit State
  const [editingRes, setEditingRes] = useState<Reservation | null>(null)
  const [editForm, setEditForm] = useState<Partial<Reservation>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Check login state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('sg_admin_auth')
      if (auth === 'true') {
        setIsLoggedIn(true)
        fetchReservations()
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123' || password === 'owner') {
      setIsLoggedIn(true)
      localStorage.setItem('sg_admin_auth', 'true')
      setError('')
      fetchReservations()
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword('')
    localStorage.removeItem('sg_admin_auth')
    setReservations([])
  }

  const fetchReservations = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reservations')
      const data = await res.json()
      if (res.ok) {
        setReservations(data.reservations || [])
      }
    } catch (err) {
      console.error('Failed to fetch reservations', err)
      toast.error('Failed to fetch reservations')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Reservation deleted')
      fetchReservations()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete reservation')
    }
  }

  const handleEditClick = (reservation: Reservation) => {
    setEditingRes(reservation)
    setEditForm(reservation)
  }

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingRes) return
    setIsSaving(true)
    try {
      const res = await fetch(`/api/reservations/${editingRes.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Reservation updated successfully')
      setEditingRes(null)
      fetchReservations()
    } catch (err) {
      console.error(err)
      toast.error('Failed to update reservation')
    } finally {
      setIsSaving(false)
    }
  }

  const filteredReservations = reservations.filter(r => 
    r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.phone?.includes(search)
  )

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-[#141414] border border-[#2a2a2a] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e8501a] to-[#d4a853]"></div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white heading-playfair mb-2">Admin Portal</h1>
            <p className="text-white/50 text-sm">Sign in to manage Sammy&apos;s Grill operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] mb-2 font-medium">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e8501a] transition-colors"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-[#e8501a] text-sm font-medium">{error}</p>}
            <button 
              type="submit" 
              className="w-full btn-ember py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-[#e8501a]/20"
            >
              Sign In
            </button>
            <div className="text-center mt-6">
              <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1">
                <ChevronRight size={14} className="rotate-180" /> Return to website
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e1e1e', color: '#fff', border: '1px solid #2a2a2a' } }} />
      
      {/* Admin Navbar */}
      <nav className="bg-[#141414] border-b border-[#2a2a2a] sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-white heading-playfair hover:opacity-80 transition-opacity">
              Sammy&apos;s<span className="text-[#e8501a]"> Grill</span>
            </Link>
            <span className="text-[#2a2a2a]">|</span>
            <span className="text-white/90 font-semibold tracking-wide flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10b981]" /> Admin Dashboard
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white heading-playfair mb-2">Reservations Overview</h2>
            <p className="text-white/50 text-sm">View, edit, or remove incoming guest bookings in real-time.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8501a] transition-all focus:ring-1 focus:ring-[#e8501a]/50 shadow-inner"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
            <button 
              onClick={fetchReservations}
              disabled={loading}
              className="px-5 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-[#252525] transition-all flex items-center gap-2 shadow-sm"
            >
              {loading ? <span className="animate-spin text-[#e8501a]">●</span> : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-[#141414] p-5 rounded-2xl border border-[#2a2a2a]">
             <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Total Bookings</p>
             <p className="text-3xl font-bold text-white heading-playfair">{reservations.length}</p>
           </div>
           <div className="bg-[#141414] p-5 rounded-2xl border border-[#2a2a2a]">
             <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Today&apos;s Guests</p>
             <p className="text-3xl font-bold text-[#e8501a] heading-playfair">
               {reservations.filter(r => new Date(r.reservation_date).toDateString() === new Date().toDateString()).reduce((acc, curr) => acc + curr.guests, 0)}
             </p>
           </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap">Guest Info</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap">Contact</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap">Schedule</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap">Requests</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {loading && reservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-white/50 bg-[#141414]">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <span className="animate-spin text-[#e8501a]">⟳</span>
                        Loading reservations...
                      </div>
                    </td>
                  </tr>
                ) : filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-white/50 bg-[#141414]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={32} className="text-white/10" />
                        No reservations found matching &quot;{search}&quot;.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res: Reservation) => {
                    const date = new Date(res.reservation_date)
                    const isToday = date.toDateString() === new Date().toDateString()
                    
                    return (
                      <tr key={res.id} className="hover:bg-[#1e1e1e] transition-colors group">
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8501a]/20 to-[#e8501a]/5 border border-[#e8501a]/20 flex items-center justify-center text-[#e8501a] font-bold shrink-0 shadow-inner">
                              {res.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">{res.full_name}</p>
                              <div className="flex items-center gap-1.5 text-xs text-white/40 mt-1.5 font-medium">
                                <Users size={12} className="text-white/30" />
                                {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Mail size={14} className="text-white/30" />
                              <a href={`mailto:${res.email}`} className="hover:text-white hover:underline transition-all truncate max-w-[150px] inline-block">{res.email}</a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Phone size={14} className="text-white/30" />
                              <a href={`tel:${res.phone}`} className="hover:text-white hover:underline transition-all">{res.phone}</a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="space-y-2">
                            <div className={`flex items-center gap-2 text-sm ${isToday ? 'text-[#e8501a] font-bold' : 'text-white/80 font-medium'}`}>
                              <Calendar size={14} className={isToday ? "text-[#e8501a]" : "text-white/40"} />
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              {isToday && <span className="text-[9px] uppercase tracking-wider bg-[#e8501a]/10 border border-[#e8501a]/30 px-1.5 py-0.5 rounded text-[#e8501a] ml-1">Today</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <Clock size={14} className="text-white/30" />
                              {res.reservation_time}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top max-w-[200px]">
                          {res.special_requests ? (
                            <p className="text-sm text-white/60 line-clamp-3 leading-relaxed" title={res.special_requests}>
                              {res.special_requests}
                            </p>
                          ) : (
                            <span className="text-sm text-white/20 italic">None</span>
                          )}
                        </td>
                        <td className="px-6 py-5 align-top text-right">
                          <div className="flex flex-col items-end justify-between h-full gap-3">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditClick(res)}
                                className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg border border-transparent hover:border-white/10 transition-all shadow-sm"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(res.id)}
                                className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-500 rounded-lg border border-transparent hover:border-red-500/20 transition-all shadow-sm"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="text-[10px] text-white/20 font-medium tracking-wide">
                              Booked: {new Date(res.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setEditingRes(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#141414] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#1a1a1a]">
                <h3 className="text-lg font-bold text-white heading-playfair flex items-center gap-2">
                  <Edit2 size={18} className="text-[#e8501a]" /> Edit Reservation
                </h3>
                <button onClick={() => setEditingRes(null)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Name</label>
                    <input type="text" value={editForm.full_name || ''} onChange={e => setEditForm({...editForm, full_name: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Guests</label>
                    <input type="number" min="1" max="20" value={editForm.guests || 1} onChange={e => setEditForm({...editForm, guests: parseInt(e.target.value)})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Email</label>
                    <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Phone</label>
                    <input type="text" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Date</label>
                    <input type="date" value={editForm.reservation_date || ''} onChange={e => setEditForm({...editForm, reservation_date: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" style={{ colorScheme: 'dark'}} required />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Time</label>
                    <input type="time" value={editForm.reservation_time || ''} onChange={e => setEditForm({...editForm, reservation_time: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" style={{ colorScheme: 'dark'}} required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-white/40 mb-1.5 font-medium">Special Requests</label>
                  <textarea rows={3} value={editForm.special_requests || ''} onChange={e => setEditForm({...editForm, special_requests: e.target.value})} className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#e8501a] focus:outline-none" />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a2a] mt-6">
                  <button type="button" onClick={() => setEditingRes(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg text-sm font-medium text-white btn-ember flex items-center gap-2">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
