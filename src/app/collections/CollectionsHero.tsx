"use client";

import { motion } from "framer-motion";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function CollectionsHero() {
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeSmooth }}
        className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
      >
        The Collections
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeSmooth, delay: 0.1 }}
        className="font-luxury text-5xl md:text-6xl text-ivory mb-6"
      >
        Our Collections
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
        className="luxury-divider mx-auto mb-6"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeSmooth, delay: 0.3 }}
        className="text-whisper text-sm leading-relaxed max-w-lg mx-auto"
      >
        Four decades of curatorial excellence, distilled into collections that
        celebrate the art of fine jewelry.
      </motion.p>
    </div>
  );
}
