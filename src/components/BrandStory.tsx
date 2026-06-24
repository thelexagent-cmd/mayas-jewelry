"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Founded", value: 1985, suffix: "" },
  { label: "Years", value: 41, suffix: "+" },
  { label: "Families", value: 5000, suffix: "+" },
];

export default function BrandStory() {
  return (
    <section
      id="heritage"
      className="py-32 bg-charcoal border-t border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left Column - Images (45%) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative -rotate-2 shadow-2xl shadow-black/40">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=1000&fit=crop&q=80"
                    alt="Maya's jewelry atelier and craftsmanship"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
              </div>

              {/* Accent Image - Gold Framed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: easeSmooth, delay: 0.3 }}
                className="absolute -bottom-8 -right-4 lg:-right-8 w-36 h-44 lg:w-44 lg:h-56 border-2 border-gold/40 p-1.5 bg-charcoal shadow-xl shadow-black/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=500&fit=crop&q=80"
                  alt="Jewelry craftsmanship detail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Text (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center pt-8 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.1 }}
              className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
            >
              Our Heritage
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
              className="font-luxury text-4xl md:text-5xl text-ivory mb-6 leading-tight"
            >
              A Legacy Written in Gold
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.3 }}
              className="luxury-divider-wide mb-10 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.4 }}
              className="text-whisper text-sm leading-relaxed mb-6"
            >
              In 1985, the Badell family opened the doors of a small jewelry
              shop on a sun-drenched corner of Little Havana. What began as a
              modest atelier has, over four decades, become Miami&apos;s most
              trusted name in fine jewelry.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.5 }}
              className="text-whisper text-sm leading-relaxed mb-6"
            >
              Every piece in our collection tells a story &mdash; of master
              craftsmanship passed through generations, of ethically sourced
              precious metals and gemstones, and of the deeply personal moments
              our jewelry has been chosen to commemorate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.6 }}
              className="text-whisper text-sm leading-relaxed mb-8"
            >
              Today, Maya&apos;s continues the tradition of treating every
              client like family. We believe luxury is not merely about price
              &mdash; it is about the care, expertise, and passion poured into
              every creation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.7 }}
              className="font-luxury italic text-gold text-lg mb-12"
            >
              &mdash; The Badell Family
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeSmooth, delay: 0.8 }}
              className="flex items-center gap-4 flex-wrap"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-whisper">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />{" "}
                      &middot; {stat.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
