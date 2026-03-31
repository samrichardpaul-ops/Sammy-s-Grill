'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Clock, Mail, Phone, LogOut, Search, X } from 'lucide-react'
import Link from 'next/link'

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
    // Simple password check for demonstration (in production, use secure auth)
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
    } finally {
      setLoading(false)
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
          className="w-full max-w-md p-8 rounded-2xl bg-[#141414] border border-[#2a2a2a]"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white heading-playfair mb-2">Admin Login</h1>
            <p className="text-white/50 text-sm">Sign in to manage reservations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] mb-2 font-medium">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e8501a] transition-colors"
                placeholder="Enter admin password (hint: admin123)"
              />
            </div>
            {error && <p className="text-[#e8501a] text-sm">{error}</p>}
            <button 
              type="submit" 
              className="w-full btn-ember py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
            >
              Sign In
            </button>
            <div className="text-center mt-4">
              <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">
                ← Back to main site
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Admin Navbar */}
      <nav className="bg-[#141414] border-b border-[#2a2a2a] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-white heading-playfair">
              Sammy&apos;s<span className="text-[#e8501a]"> Grill</span>
            </Link>
            <span className="text-[#2a2a2a]">|</span>
            <span className="text-white/80 font-medium">Admin Dashboard</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-[#e8501a] transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white heading-playfair mb-2">Reservations</h2>
            <p className="text-white/50 text-sm">Manage all incoming bookings and guest requests.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guests..."
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#e8501a] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <button 
              onClick={fetchReservations}
              disabled={loading}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-sm text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap">Guest</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap">Contact</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap">Date & Time</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap">Details</th>
                  <th className="px-6 py-4 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {loading && reservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                      Loading reservations...
                    </td>
                  </tr>
                ) : filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res: Reservation) => {
                    const date = new Date(res.reservation_date)
                    const isToday = date.toDateString() === new Date().toDateString()
                    
                    return (
                      <tr key={res.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="px-6 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#e8501a]/10 flex items-center justify-center text-[#e8501a] font-bold shrink-0">
                              {res.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{res.full_name}</p>
                              <div className="flex items-center gap-1.5 text-xs text-white/40 mt-1">
                                <Users size={12} />
                                {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Mail size={14} className="text-[#e8501a]/70" />
                              <a href={`mailto:${res.email}`} className="hover:text-white transition-colors">{res.email}</a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Phone size={14} className="text-[#e8501a]/70" />
                              <a href={`tel:${res.phone}`} className="hover:text-white transition-colors">{res.phone}</a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="space-y-1.5">
                            <div className={`flex items-center gap-2 text-sm ${isToday ? 'text-[#e8501a] font-medium' : 'text-white/70'}`}>
                              <Calendar size={14} />
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              {isToday && <span className="text-[10px] bg-[#e8501a]/20 px-1.5 py-0.5 rounded text-[#e8501a] ml-1">Today</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Clock size={14} className="text-[#e8501a]/70" />
                              {res.reservation_time}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top max-w-xs">
                          {res.special_requests ? (
                            <p className="text-sm text-white/60 line-clamp-2" title={res.special_requests}>
                              {res.special_requests}
                            </p>
                          ) : (
                            <span className="text-sm text-white/30 italic">No special requests</span>
                          )}
                        </td>
                        <td className="px-6 py-4 align-top text-right">
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                            Confirmed
                          </span>
                          <div className="text-[10px] text-white/30 mt-2">
                            Booked: {new Date(res.created_at).toLocaleDateString()}
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
    </div>
  )
}
