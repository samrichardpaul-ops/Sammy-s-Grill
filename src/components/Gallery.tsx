'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

const images = [
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    label: "Wood-Fired Ribeye",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80",
    label: "Signature Ribs",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&q=80",
    label: "Flame-Grilled Chicken",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    label: "Chef's Grill Board",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    label: "Restaurant Ambience",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    label: "Fine Dining Setup",
    span: "col-span-2 row-span-1",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null)

  return (
    <section id="gallery" className="py-24 bg-[#0f0f0e] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-[#e8501a]" />
            <span className="text-xs uppercase tracking-widest text-[#d4a853]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Visual Story
            </span>
            <div className="w-12 h-px bg-[#e8501a]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold heading-playfair text-white mb-4"
          >
            The <span className="text-[#e8501a] italic">Gallery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/50 text-dmsans max-w-xl mx-auto"
          >
            Every dish tells a story. Every flame leaves a mark. Explore the art of grilling at Sammy&apos;s.
          </motion.p>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`relative overflow-hidden cursor-pointer rounded-2xl group ${img.span}`}
              onClick={() => setSelectedImage(img)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-sm heading-playfair">{img.label}</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage.src}
            alt={selectedImage.label}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm heading-playfair">
            {selectedImage.label}
          </p>
        </motion.div>
      )}
    </section>
  )
}
