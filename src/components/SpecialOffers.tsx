'use client'

import { motion } from 'framer-motion'
import { Clock, Tag, Users, Star } from 'lucide-react'

const offers = [
  {
    icon: <Clock size={28} />,
    badge: "Daily Special",
    title: "Happy Hour",
    subtitle: "Mon – Fri · 5 PM to 7 PM",
    description: "All cocktails and signature mocktails at 30% off. Perfect for winding down after a long day.",
    highlight: "30% OFF Drinks",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    badgeColor: "bg-amber-500",
    gradient: "from-amber-900/60 to-black/80",
  },
  {
    icon: <Users size={28} />,
    badge: "Weekend Deal",
    title: "Family Feast",
    subtitle: "Saturdays & Sundays",
    description: "Tables of 4 or more get a complimentary starter platter and a dessert on us. Weekends are made for family.",
    highlight: "Free Starter + Dessert",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    badgeColor: "bg-green-500",
    gradient: "from-green-900/60 to-black/80",
  },
  {
    icon: <Tag size={28} />,
    badge: "Date Night",
    title: "Couple's Special",
    subtitle: "Fridays & Saturdays · 7 PM onwards",
    description: "2-course dinner for two with a bottle of house wine — candlelit table guaranteed. Romance included.",
    highlight: "₹3,499 for Two",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    badgeColor: "bg-pink-500",
    gradient: "from-pink-900/60 to-black/80",
  },
  {
    icon: <Star size={28} />,
    badge: "Loyalty Perk",
    title: "Chef's Table",
    subtitle: "By Reservation Only",
    description: "An exclusive 6-course tasting menu designed fresh every week. Reserve early — only 8 seats available.",
    highlight: "Limited Seats",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    badgeColor: "bg-purple-500",
    gradient: "from-purple-900/60 to-black/80",
  },
]

export default function SpecialOffers() {
  return (
    <section id="offers" className="py-24 bg-[#111111] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-[#e8501a]" />
            <span className="text-xs uppercase tracking-widest text-[#d4a853]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Limited Time
            </span>
            <div className="w-12 h-px bg-[#e8501a]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold heading-playfair text-white mb-4"
          >
            Special <span className="text-[#e8501a] italic">Offers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/50 text-dmsans max-w-xl mx-auto"
          >
            Hand-picked deals that make every visit to Sammy&apos;s even more rewarding.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-[#e8501a]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-1 flex flex-col"
              style={{ minHeight: 380 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient}`} />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                {/* Badge */}
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${offer.badgeColor} mb-4`}>
                  {offer.badge}
                </span>

                <div className="mt-auto">
                  <div className="text-white/70 mb-2">{offer.icon}</div>
                  <h3 className="text-xl font-bold text-white heading-playfair mb-1">{offer.title}</h3>
                  <p className="text-[#d4a853] text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    {offer.subtitle}
                  </p>
                  <p className="text-white/70 text-sm text-dmsans leading-relaxed mb-4">{offer.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-[#e8501a] font-bold text-sm" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {offer.highlight}
                    </span>
                    <a
                      href="#reservation"
                      className="text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/60 px-3 py-1.5 rounded-full transition-all"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      Book Now →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
