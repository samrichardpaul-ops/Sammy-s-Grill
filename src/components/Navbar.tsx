'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Phone, LogIn, LogOut, ChevronDown, User, Shield } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const { user, logout, openAuth } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ['home', 'menu', 'offers', 'packages', 'gallery', 'reservation', 'about', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Offers', href: '#offers' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0d0d]/96 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-1 group">
          <span
            className="text-2xl font-bold text-white heading-playfair tracking-tight transition-colors group-hover:text-white"
          >
            Sammy&apos;s
          </span>
          <span className="text-2xl font-bold text-[#e8501a] heading-playfair tracking-tight"> Grill</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-7 items-center">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#e8501a] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
                }`}
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* CTA + Auth + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="hidden md:flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            <Phone size={14} className="text-[#e8501a]" />
            <span>+91 98765 43210</span>
          </a>

          {/* Auth section */}
          {user ? (
            /* User Avatar + Dropdown */
            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e8501a]/50"
                />
                <span
                  className="text-sm text-white/80 font-medium hidden lg:block"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl"
                    style={{ background: '#141414', border: '1px solid #262626' }}
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-white/5">
                      <p
                        className="text-white text-sm font-semibold truncate"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-white/40 text-xs truncate"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        {user.email}
                      </p>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      <a
                        href="#reservation"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        <User size={16} className="text-[#e8501a]" />
                        My Reservations
                      </a>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-[#e8501a] hover:bg-[#e8501a]/5 transition-all"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Sign In button */
            <button
              onClick={() => openAuth()}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all border border-white/15 text-white/70 hover:text-white hover:border-[#e8501a]/50 hover:bg-[#e8501a]/8"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              <LogIn size={15} />
              Sign In
            </button>
          )}

          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all border border-transparent text-white/60 hover:text-white hover:bg-[#e8501a]/10"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
            title="Admin Login"
          >
            <Shield size={16} />
          </Link>

          <a
            href="#reservation"
            className="hidden md:inline-flex btn-ember items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-lg"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            🍽 Book a Table
          </a>

          <button
            className="lg:hidden text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0d0d0d] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col py-5 px-6 gap-1">
              {/* Mobile user row */}
              {user ? (
                <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl" style={{ background: '#1a1a1a' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full ring-2 ring-[#e8501a]/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "'DM Sans',sans-serif" }}>{user.name}</p>
                    <p className="text-white/40 text-xs truncate" style={{ fontFamily: "'DM Sans',sans-serif" }}>{user.email}</p>
                  </div>
                  <button onClick={logout} className="text-white/40 hover:text-[#e8501a] transition-colors p-1">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { openAuth(); setIsOpen(false) }}
                  className="flex items-center gap-2 px-3 py-3 mb-2 text-sm font-semibold text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  <LogIn size={16} className="text-[#e8501a]" />
                  Sign In / Create Account
                </button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white hover:bg-white/5 uppercase tracking-wider text-sm p-3 rounded-lg transition-all"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5 uppercase tracking-wider text-sm p-3 rounded-lg transition-all"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                <Shield size={16} /> Admin Panel
              </Link>
              <a
                href="#reservation"
                onClick={() => setIsOpen(false)}
                className="mt-3 btn-ember text-center text-sm font-semibold py-3 rounded-lg"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                🍽 Book a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
