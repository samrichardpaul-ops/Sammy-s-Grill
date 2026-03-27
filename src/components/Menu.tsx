'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuData = {
  Starters: [
    {
      name: "Smoked Brisket Bites",
      desc: "Slow-smoked brisket burnt ends with honey glaze and pickled jalapeños",
      price: "Rs. 960",
      tag: "Chef's Pick",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    },
    {
      name: "Charred Eggplant Dip",
      desc: "Fire-roasted eggplant, tahini, pomegranate, warm pita triangles",
      price: "Rs. 720",
      tag: "Vegan",
      image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=600&q=80",
    },
    {
      name: "Crispy Calamari",
      desc: "Lightly dusted in spiced flour, served with chili aioli & lemon",
      price: "Rs. 1120",
      tag: "Popular",
      image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&q=80",
    },
    {
      name: "Loaded Nachos",
      desc: "Corn tortilla chips, smoked pulled pork, cheddar, guacamole, sour cream",
      price: "Rs. 880",
      tag: "Sharing",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80",
    },
  ],
  Mains: [
    {
      name: "Sammy's Signature Ribs",
      desc: "Half rack of baby back ribs, slow-cooked 6 hrs, slathered in house BBQ",
      price: "Rs. 2240",
      tag: "Signature",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
    },
    {
      name: "Wood-Fired Ribeye",
      desc: "12oz prime cut, garlic herb butter, grilled asparagus, truffle fries",
      price: "Rs. 3360",
      tag: "Premium",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    },
    {
      name: "Peri-Peri Chicken",
      desc: "Half chicken marinated 24hrs in peri-peri, flame grilled with charred corn",
      price: "Rs. 1920",
      tag: "Spicy",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=600&q=80",
    },
    {
      name: "Grilled Cauliflower Steak",
      desc: "Chimichurri, toasted almonds, roasted red pepper, sweet potato mash",
      price: "Rs. 1440",
      tag: "Vegan",
      image: "https://images.unsplash.com/photo-1568600891618-a0ecb2a5bd60?w=600&q=80",
    },
  ],
  Desserts: [
    {
      name: "Charred Pineapple",
      desc: "Caramelized with dark rum, vanilla bean ice cream, toasted coconut",
      price: "Rs. 800",
      tag: "Seasonal",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    },
    {
      name: "S'mores Skillet",
      desc: "Graham crackers, molten dark chocolate, torch-toasted marshmallow",
      price: "Rs. 880",
      tag: "Fan-Fave",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    },
    {
      name: "Lava Cake",
      desc: "Warm Belgian chocolate cake, molten centre, vanilla gelato",
      price: "Rs. 760",
      tag: "Popular",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
    },
  ],
  Drinks: [
    {
      name: "Smoked Old Fashioned",
      desc: "Bourbon, bitters, demerara, hickory smoke dome",
      price: "Rs. 1120",
      tag: "Craft",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    },
    {
      name: "Spicy Margarita",
      desc: "Jalapeño-infused tequila, fresh lime, agave, tajín rim",
      price: "Rs. 960",
      tag: "Signature",
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
    },
    {
      name: "Charcoal Lemonade",
      desc: "Activated charcoal, fresh lemon, mint, ginger beer — non-alcoholic",
      price: "Rs. 480",
      tag: "Non-Alcoholic",
      image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&q=80",
    },
  ],
}

const TAG_COLORS: Record<string, string> = {
  "Chef's Pick": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Vegan": "bg-green-500/20 text-green-400 border-green-500/30",
  "Popular": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Sharing": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Signature": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Premium": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Spicy": "bg-red-500/20 text-red-400 border-red-500/30",
  "Seasonal": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Fan-Fave": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Craft": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Non-Alcoholic": "bg-sky-500/20 text-sky-400 border-sky-500/30",
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>("Mains")

  return (
    <section id="menu" className="py-24 bg-[#0f0f0e]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-[#e8501a]" />
            <span className="text-xs uppercase tracking-widest text-[#d4a853]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Crafted with Fire
            </span>
            <div className="w-12 h-px bg-[#e8501a]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold heading-playfair text-white mb-4"
          >
            Our <span className="text-[#e8501a] italic">Menu</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/50 text-dmsans max-w-xl mx-auto"
          >
            Every dish is slow-cooked, fire-kissed and made with ingredients sourced fresh daily.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-14 overflow-x-auto pb-2 scrollbar-hide">
          {(Object.keys(menuData) as Array<keyof typeof menuData>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                activeTab === tab
                  ? 'bg-[#e8501a] text-white border-[#e8501a] shadow-lg shadow-orange-900/30'
                  : 'border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-white/5'
              }`}
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuData[activeTab].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="group relative bg-[#1a1a18] rounded-2xl overflow-hidden border border-white/5 hover:border-[#e8501a]/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/10 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a18] via-transparent to-transparent" />
                  {/* Tag */}
                  <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${TAG_COLORS[item.tag] || 'bg-white/10 text-white'}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#e8501a] transition-colors heading-playfair leading-tight pr-2">
                      {item.name}
                    </h3>
                    <span className="text-[#e8501a] font-bold text-base whitespace-nowrap" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {item.price}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm text-dmsans leading-relaxed flex-1">{item.desc}</p>
                  <a
                    href="#reservation"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e8501a] hover:text-white transition-colors uppercase tracking-wider"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Book to Try
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a href="#reservation" className="btn-ember inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold">
            🍽 Reserve Your Table
          </a>
        </motion.div>

      </div>
    </section>
  )
}
