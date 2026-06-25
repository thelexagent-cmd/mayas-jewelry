"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiMapPin, HiPhone, HiClock, HiArrowTopRightOnSquare } from "react-icons/hi2";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const INFO_ITEMS = [
  {
    icon: HiMapPin,
    label: "Address",
    value: "542 SW 12th Ave, Miami, FL 33130",
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: "(305) 392-1461",
  },
  {
    icon: HiClock,
    label: "Hours",
    value: "Mon-Fri 10AM-6PM\nSat 10AM-5PM\nSun Closed",
  },
];

const BADGES = [
  "Latino-Owned",
  "LGBTQ+ Friendly",
  "Since 1985",
];

export default function StoreLocation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="location" className="py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* LEFT — Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="relative aspect-[4/3] bg-obsidian border border-gold/10 overflow-hidden"
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(198,165,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(198,165,92,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Decorative roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-gold/10" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-gold/10" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gold/10" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gold/10" />
            </div>

            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
              {/* Glow */}
              <div className="absolute -top-2 w-16 h-16 rounded-full bg-gold/10 blur-xl" />
              <HiMapPin className="w-10 h-10 text-gold relative z-10 drop-shadow-[0_0_12px_rgba(198,165,92,0.5)]" />
              {/* Shadow dot */}
              <div className="w-3 h-1 rounded-full bg-gold/30 mt-1 blur-[1px]" />
            </div>

            {/* Address overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent">
              <p className="text-gold text-xs uppercase tracking-[0.2em] mb-1">
                Maya&apos;s Cash &amp; Gold
              </p>
              <p className="text-ivory/70 text-sm">
                542 SW 12th Ave, Miami, FL 33130
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
          >
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
              Visit Our Showroom
            </p>
            <h2 className="font-luxury text-3xl md:text-4xl text-ivory mb-8">
              Experience Maya&apos;s In Person
            </h2>

            {/* Contact details */}
            <div className="space-y-6 mb-10">
              {INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: easeSmooth,
                    delay: 0.3 + i * 0.1,
                  }}
                  className="flex items-start gap-4"
                >
                  <item.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-ivory/50 text-xs uppercase tracking-[0.15em] mb-1">
                      {item.label}
                    </p>
                    <p className="text-ivory text-sm leading-relaxed whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeSmooth, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href="https://maps.google.com/?q=542+SW+12th+Ave+Miami+FL+33130"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury"
              >
                <span>Get Directions</span>
                <HiArrowTopRightOnSquare className="w-3.5 h-3.5 relative z-[1]" />
              </a>
              <a href="tel:+13053921461" className="btn-luxury">
                <span>Book Appointment</span>
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeSmooth, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 border border-gold/20 text-[10px] uppercase tracking-[0.15em] text-gold/80"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
