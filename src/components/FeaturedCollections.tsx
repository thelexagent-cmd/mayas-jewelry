"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLLECTIONS } from "@/lib/data";

interface Collection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
}

function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
        {/* Subtitle */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
          {collection.subtitle}
        </span>

        {/* Title */}
        <h3 className="font-luxury text-2xl sm:text-3xl text-ivory font-light mb-3">
          {collection.title}
        </h3>

        {/* Description - hidden, revealed on hover */}
        <div className="overflow-hidden">
          <p className="text-sm text-whisper/80 leading-relaxed max-w-xs translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
            {collection.description}
          </p>
        </div>

        {/* Item count + Explore link */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-[11px] tracking-[0.2em] uppercase text-whisper/50 translate-y-4 opacity-0 transition-all duration-700 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
            {collection.itemCount} Pieces
          </span>

          <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gold translate-y-4 opacity-0 transition-all duration-700 delay-150 group-hover:translate-y-0 group-hover:opacity-100">
            Explore
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Top-right gold accent line */}
      <div className="absolute top-0 right-0 w-0 h-px bg-gold transition-all duration-700 group-hover:w-full" />
      <div className="absolute top-0 right-0 h-0 w-px bg-gold transition-all duration-700 delay-200 group-hover:h-full" />
    </motion.div>
  );
}

export default function FeaturedCollections() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="collections" className="relative py-32 px-6 bg-obsidian">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        className="max-w-7xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={
          isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
        }
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 block">
          The Collections
        </span>
        <h2 className="font-luxury text-4xl md:text-5xl text-ivory font-light mt-4 mb-6">
          Curated for the Discerning
        </h2>
        <div className="luxury-divider mx-auto" />
      </motion.div>

      {/* Collection grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {COLLECTIONS.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
