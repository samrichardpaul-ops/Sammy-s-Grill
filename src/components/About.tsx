'use client'

import { motion } from 'framer-motion'
import { Flame, Leaf, Clock } from 'lucide-react'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const features = [
    { icon: <Flame color="#e8501a" size={32} />, title: "Premium Grills" },
    { icon: <Leaf color="#e8501a" size={32} />, title: "Fresh Ingredients" },
    { icon: <Clock color="#e8501a" size={32} />, title: "Quick Service" },
  ]

  return (
    <section id="about" className="py-24 bg-white text-[#2c2825]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold heading-playfair">
              Our Story
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-dmsans">
              Founded in 2020, Sammy&apos;s Grill Cafe started with a simple mission - to serve the most delicious grilled food in a warm, welcoming environment. Our secret lies in our signature marinades, fresh ingredients, and passion for perfection.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-dmsans">
              Every dish is prepared with love and grilled to perfection. Whether you&apos;re here for a quick lunch, family dinner, or special celebration, we promise an unforgettable dining experience.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-8 pt-8 pt-6 border-t border-gray-100 flex-wrap">
              {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 text-center w-28">
                  <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap">{feat.title}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200"
                alt="Sammy&apos;s Grill Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
              <div className="text-4xl font-bold text-[#e8501a] heading-playfair mb-1">5+</div>
              <div className="text-sm uppercase tracking-wider text-gray-500 font-semibold text-dmsans">Years Exerience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
