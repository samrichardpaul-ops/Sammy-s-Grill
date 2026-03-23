'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuData = {
  Starters: [
    { name: "Smoked Brisket Bites", desc: "Slow-smoked brisket burnt ends with honey glaze", price: "Rs. 12" },
    { name: "Charred Eggplant Dip", desc: "Fire-roasted eggplant, tahini, warm pita", price: "Rs. 9" },
    { name: "Crispy Calamari", desc: "Lightly dusted, served with chili aioli", price: "Rs. 14" },
  ],
  Mains: [
    { name: "Sammy's Signature Ribs", desc: "Half rack of baby back ribs, house BBQ sauce", price: "Rs. 28" },
    { name: "Wood-Fired Ribeye", desc: "12oz prime cut, garlic herb butter, grilled asparagus", price: "Rs. 42" },
    { name: "Peri-Peri Chicken", desc: "Half chicken marinated 24hrs, flamed grilled", price: "Rs. 24" },
    { name: "Grilled Cauliflower Steak", desc: "Chimichurri, toasted almonds, sweet potato mash", price: "Rs. 18" },
  ],
  Desserts: [
    { name: "Charred Pineapple", desc: "Caramelized with rum, vanilla bean ice cream", price: "Rs. 10" },
    { name: "S'mores Skillet", desc: "Graham crackers, molten chocolate, toasted marshmallow", price: "Rs. 11" },
  ],
  Drinks: [
    { name: "Smoked Old Fashioned", desc: "Bourbon, bitters, hickory smoke", price: "Rs. 14" },
    { name: "Spicy Margarita", desc: "Jalapeno infused tequila, lime, agave", price: "Rs. 12" },
  ],
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>("Mains")
  
  return (
    <section id="menu" className="py-24 bg-[#fbf9f6]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold heading-playfair mb-4 text-[#2c2825]"
          >
            Our Menu
          </motion.h2>
          <div className="w-16 h-1 bg-[#e8501a] mx-auto rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12 overflow-x-auto pb-4">
          {(Object.keys(menuData) as Array<keyof typeof menuData>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium text-dmsans px-4 py-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-[#e8501a] text-[#e8501a]' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {menuData[activeTab].map((item, idx) => (
              <div key={idx} className="flex flex-col border-b border-gray-200 pb-6 group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold heading-playfair text-[#2c2825] group-hover:text-[#e8501a] transition-colors">{item.name}</h3>
                  <span className="text-lg font-bold text-[#e8501a]">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm text-dmsans">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
