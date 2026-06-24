"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { STATS } from "@/lib/data";

/* ── Animated counter for a single stat ── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // ms
    const start = performance.now();

    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    // honour stagger delay
    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center text-center"
    >
      {/* thin gold line */}
      <span className="mb-6 block h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <span className="font-luxury text-5xl md:text-6xl text-gold">
        {display}
        <span className="ml-1 text-3xl md:text-4xl">{suffix}</span>
      </span>

      <span className="mt-3 text-xs uppercase tracking-[0.25em] text-whisper">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Craftsmanship() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // parallax: background moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
        style={{ y: bgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=1080&fit=crop&q=80"
          alt="Jewelry craftsmanship"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-black/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-xs uppercase tracking-[0.3em] text-gold">
            The Atelier
          </span>
          <h2 className="font-luxury text-4xl md:text-5xl text-ivory leading-tight">
            Where Art Meets Precision
          </h2>
          <div className="luxury-divider mx-auto mt-6" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-24 max-w-2xl text-center text-base md:text-lg leading-relaxed text-whisper"
        >
          Each piece that leaves our atelier carries the weight of forty-one
          years of mastery. Our jewelers employ techniques refined over
          generations — from hand-setting each diamond to the final polish
          that brings gold to its legendary luster.
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {STATS.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.2}
            />
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-24 flex justify-center">
          <div className="luxury-divider-wide" />
        </div>
      </div>
    </section>
  );
}
