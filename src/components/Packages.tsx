'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const packages = [
  {
    name: "Grill Experience",
    subtitle: "Perfect for individuals & couples",
    price: "Rs. 1,999",
    unit: "per person",
    badge: null,
    color: "#e8501a",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80",
    features: [
      "Starter of your choice",
      "Signature grilled main course",
      "Soft beverage included",
      "Dessert of the day",
      "Priority seating",
      "Complimentary bread basket",
    ],
    cta: "Book This Package",
  },
  {
    name: "Celebration",
    subtitle: "Birthdays, anniversaries & milestones",
    price: "Rs. 3,499",
    unit: "per couple",
    badge: "Most Popular",
    color: "#d4a853",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    features: [
      "Welcome mocktail / cocktail",
      "2-course dinner for two",
      "Bottle of house wine",
      "Personalised cake (on request)",
      "Candlelit table setup",
      "Dedicated server",
      "Complimentary photo print",
      "Priority reservation slot",
    ],
    cta: "Reserve This Package",
  },
  {
    name: "Corporate",
    subtitle: "Team lunches, client dinners & events",
    price: "Rs. 999",
    unit: "per head (min. 10)",
    badge: null,
    color: "#7b9cda",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    features: [
      "Buffet-style grill spread",
      "Dedicated banquet section",
      "Mocktail welcome drinks",
      "Customised menu options",
      "AV setup on request",
      "Complimentary valet parking",
      "Dedicated event coordinator",
      "Flexible timing & layout",
    ],
    cta: "Plan My Event",
  },
]

export default function Packages() {
  return (
    <section id="packages" className="py-24 bg-[#fbf9f6] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e8501a' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='23' cy='23' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-[#e8501a]" />
            <span className="text-xs uppercase tracking-widest text-[#e8501a]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Tailored for You
            </span>
            <div className="w-12 h-px bg-[#e8501a]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold heading-playfair text-[#2c2825] mb-4"
          >
            Dining <span className="text-[#e8501a] italic">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-dmsans max-w-xl mx-auto"
          >
            Curated experiences for every occasion — from a quiet dinner to a grand corporate affair.
          </motion.p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden flex flex-col shadow-xl group border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                pkg.badge
                  ? 'border-[#d4a853] ring-2 ring-[#d4a853]/20'
                  : 'border-transparent hover:border-[#e8501a]/30'
              } bg-white`}
            >
              {/* Most Popular Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-[#d4a853] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                  <Star size={10} fill="white" />
                  {pkg.badge}
                </div>
              )}

              {/* Image Header */}
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-2xl font-bold text-white heading-playfair">{pkg.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>{pkg.subtitle}</p>
                </div>
              </div>

              {/* Pricing */}
              <div
                className="px-6 py-5 flex items-end justify-between border-b"
                style={{ borderColor: `${pkg.color}22` }}
              >
                <div>
                  <p className="text-3xl font-bold heading-playfair" style={{ color: pkg.color }}>
                    {pkg.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    {pkg.unit}
                  </p>
                </div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    background: `${pkg.color}15`,
                    color: pkg.color,
                    border: `1px solid ${pkg.color}30`,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {idx === 0 ? 'Dining' : idx === 1 ? 'Celebration' : 'Corporate'}
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-5 flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-600 text-dmsans">
                      <span
                        className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: `${pkg.color}15` }}
                      >
                        <Check size={10} style={{ color: pkg.color }} strokeWidth={3} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <a
                  href="#reservation"
                  className="block text-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: pkg.badge ? `linear-gradient(135deg, ${pkg.color}, ${pkg.color}cc)` : 'transparent',
                    color: pkg.badge ? 'white' : pkg.color,
                    border: `2px solid ${pkg.color}`,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.badge) {
                      (e.currentTarget as HTMLElement).style.background = pkg.color
                      ;(e.currentTarget as HTMLElement).style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.badge) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = pkg.color
                    }
                  }}
                >
                  {pkg.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-10 text-dmsans"
        >
          All packages can be customised. Reach out via the reservation form or call us directly.
        </motion.p>
      </div>
    </section>
  )
}
