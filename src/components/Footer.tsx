import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/50 text-dmsans border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="#home" className="block mb-4">
            <span className="text-2xl font-bold text-white heading-playfair">
              Sammy&apos;s<span className="text-[#e8501a]"> Grill</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-5 text-white/40">
            Authentic fire-grilled cuisine crafted with passion and served with warmth. Est. 2020, Kanakapura, Bangalore.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
              { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
              { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#e8501a] hover:bg-[#e8501a]/10 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Explore</h4>
          <ul className="space-y-3">
            {[
              { label: 'Home', href: '/#home' },
              { label: 'Menu', href: '/#menu' },
              { label: 'Special Offers', href: '/#offers' },
              { label: 'Packages', href: '/#packages' },
              { label: 'Gallery', href: '/#gallery' },
              { label: 'Reservation', href: '/#reservation' },
              { label: 'About Us', href: '/#about' },
              { label: 'Admin Panel', href: '/admin' },
            ].map((l, i) => (
              <li key={i}>
                <Link href={l.href} className="text-sm text-white/50 hover:text-[#e8501a] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Opening Hours</h4>
          <ul className="space-y-3 text-sm">
            {[
              { day: 'Mon – Thu', time: '11:00 AM – 10:00 PM' },
              { day: 'Fri – Sat', time: '11:00 AM – 11:30 PM' },
              { day: 'Sunday', time: '10:00 AM – 9:00 PM' },
            ].map((h, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-white/40">{h.day}</span>
                <span className="text-white/70">{h.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 p-3 rounded-xl flex items-center gap-2" style={{ background: '#e8501a15', border: '1px solid #e8501a30' }}>
            <Clock size={14} className="text-[#e8501a] flex-shrink-0" />
            <span className="text-xs text-[#e8501a]">Kitchen closes 30 mins before closing</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#e8501a] mt-0.5 flex-shrink-0" />
              <span className="text-white/60">12, Kanakapura Road, Bangalore – 560062, Karnataka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#e8501a] flex-shrink-0" />
              <a href="tel:+919876543210" className="text-white/60 hover:text-white transition-colors">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#e8501a] flex-shrink-0" />
              <a href="mailto:hello@sammysgrill.in" className="text-white/60 hover:text-white transition-colors">
                hello@sammysgrill.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/25">
          <span>© {new Date().getFullYear()} Sammy&apos;s Grill Cafe. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
