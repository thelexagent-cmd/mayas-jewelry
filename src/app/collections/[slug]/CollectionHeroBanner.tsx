"use client";

import { motion } from "framer-motion";
import type { Collection } from "@/lib/products";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function CollectionHeroBanner({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="relative overflow-hidden rounded-none">
      {/* Background Image */}
      <div className="relative h-[300px] sm:h-[400px]">
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-8 sm:px-14">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeSmooth }}
              className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
            >
              The Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.1 }}
              className="font-luxury text-4xl sm:text-5xl md:text-6xl text-ivory mb-4"
            >
              {collection.name}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
              className="luxury-divider mb-4 origin-left"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.3 }}
              className="text-whisper text-sm leading-relaxed"
            >
              {collection.longDescription}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
