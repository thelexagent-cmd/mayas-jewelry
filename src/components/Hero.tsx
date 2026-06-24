"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1920&h=1080&fit=crop&q=80";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={HERO_IMAGE}
          alt="Luxury jewelry display"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/20"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-transparent" />

      {/* Shimmer particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-gold/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -60],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Subtitle with lines */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="h-px w-8 bg-gold/60 sm:w-12" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold">
            Established 1985 &middot; Miami
          </span>
          <span className="h-px w-8 bg-gold/60 sm:w-12" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-luxury text-8xl md:text-9xl font-light text-gold-gradient leading-none mb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          MAYA&apos;S
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-luxury text-3xl md:text-5xl text-ivory font-light italic mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Fine Jewelry
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm text-whisper max-w-md tracking-wide leading-relaxed mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          Four decades of curating exquisite jewelry in the heart of Miami
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <a href="#collections" className="btn-luxury">
            <span>Explore Collections</span>
          </a>
          <a
            href="#visit"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-obsidian text-xs tracking-[0.2em] uppercase font-sans cursor-pointer transition-all duration-500 hover:bg-gold-light"
          >
            <span>Book Appointment</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-whisper/60">
          Scroll to Discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold/60"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
