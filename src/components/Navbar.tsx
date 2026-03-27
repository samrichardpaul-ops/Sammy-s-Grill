'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      // Track active section
      const sections = ['home', 'menu', 'offers', 'packages', 'gallery', 'reservation', 'about', 'contact']
      for (const id of sections.reverse()) {
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
          ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-white heading-playfair tracking-tight">
            Sammy&apos;s
          </span>
          <span className="text-2xl font-bold text-[#e8501a] heading-playfair tracking-tight">
            {' '}Grill
          </span>
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

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="hidden md:flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            <Phone size={14} className="text-[#e8501a]" />
            <span>+91 98765 43210</span>
          </a>
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
