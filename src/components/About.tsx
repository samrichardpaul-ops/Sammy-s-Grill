'use client'

import { motion } from 'framer-motion'
import { Flame, Leaf, Clock, Award, Users, ChefHat } from 'lucide-react'

const stats = [
  { val: '5+',   label: 'Years Open',      icon: <Clock size={20} /> },
  { val: '12k+', label: 'Guests Served',   icon: <Users size={20} /> },
  { val: '40+',  label: 'Grill Specials',  icon: <ChefHat size={20} /> },
  { val: '4.9★', label: 'Google Rating',   icon: <Award size={20} /> },
]

const features = [
  {
    icon: <Flame size={22} color="#e8501a" />,
    title: 'Live Wood-Fire Grill',
    desc: 'Cooked over real oak & hickory at 600°C for that authentic smoke.',
  },
  {
    icon: <Leaf size={22} color="#e8501a" />,
    title: 'Farm-Fresh Daily',
    desc: 'Ingredients sourced from local farms, delivered every morning.',
  },
  {
    icon: <Clock size={22} color="#e8501a" />,
    title: 'Slow-Smoked, Never Rushed',
    desc: 'Ribs smoked for 6 hours. Great food is worth the wait.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#fbf9f6] text-[#2c2825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top heading row */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-[#e8501a]" />
            <span
              className="text-xs uppercase tracking-widest text-[#e8501a]"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              Our Story
            </span>
            <div className="w-12 h-px bg-[#e8501a]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold heading-playfair text-[#2c2825]"
          >
            Passion for the <span className="text-[#e8501a] italic">Grill</span>
          </motion.h2>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — Story text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed text-lg text-dmsans">
              Founded in 2020, Sammy&apos;s Grill Cafe started with a simple mission — to serve
              the most delicious grilled food in a warm, welcoming atmosphere. Our secret lies
              in our signature marinades, fresh local produce, and an unwavering passion for
              getting it right every single time.
            </p>
            <p className="text-gray-600 leading-relaxed text-dmsans">
              Every cut of meat is hand-selected, every sauce is made from scratch, and every
              dish leaves our kitchen only when the chef is proud of it. Whether you&apos;re here
              for a quick weekday lunch, a romantic dinner, or a large celebration — we promise
              an unforgettable experience.
            </p>

            {/* Feature list */}
            <div className="space-y-4 pt-4">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-[#2c2825] mb-0.5"
                      style={{ fontFamily: "'Playfair Display',serif" }}
                    >
                      {feat.title}
                    </h4>
                    <p className="text-sm text-gray-500 text-dmsans leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <a
                href="#reservation"
                className="btn-ember inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold"
              >
                🍽 Reserve a Table
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main large image */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200"
                alt="Sammy's Grill Restaurant Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating inset image */}
            <div
              className="absolute -bottom-8 -left-8 w-48 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden md:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600"
                alt="Grilling at Sammy's"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Years badge */}
            <div className="absolute -top-5 -right-5 bg-[#e8501a] text-white p-5 rounded-2xl shadow-xl hidden md:flex flex-col items-center">
              <div className="text-3xl font-bold heading-playfair">5+</div>
              <div className="text-[10px] uppercase tracking-widest mt-0.5 opacity-90" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Years of<br />Excellence
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 group hover:border-[#e8501a]/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#e8501a]/10 transition-colors">
                <span className="text-[#e8501a]">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-[#e8501a] heading-playfair">{stat.val}</div>
              <div
                className="text-xs uppercase tracking-wider text-gray-500 mt-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
