"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

function ServiceIcon({ icon }: { icon: string }) {
  const iconClass = "w-12 h-12 text-gold";

  switch (icon) {
    case "appraisal":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4L30 16L44 18L34 28L36 42L24 36L12 42L14 28L4 18L18 16L24 4Z" />
          <path d="M24 14L27 20L33 21L28.5 25.5L29.5 31.5L24 28.5L18.5 31.5L19.5 25.5L15 21L21 20L24 14Z" />
        </svg>
      );
    case "custom":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M34 6L42 14L16 40L4 44L8 32L34 6Z" />
          <path d="M30 10L38 18" />
          <path d="M8 32L16 40" />
          <line x1="12" y1="36" x2="16" y2="40" />
        </svg>
      );
    case "restore":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 24C8 15.16 15.16 8 24 8C32.84 8 40 15.16 40 24C40 32.84 32.84 40 24 40C18.48 40 13.68 37.04 11 32.64" />
          <path d="M8 14V24H18" />
        </svg>
      );
    case "trade":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 16H36" />
          <path d="M30 10L36 16L30 22" />
          <path d="M42 32H12" />
          <path d="M18 26L12 32L18 38" />
        </svg>
      );
    case "care":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 42S6 30 6 18C6 12 10 8 16 8C19.6 8 22.4 10 24 12.8C25.6 10 28.4 8 32 8C38 8 42 12 42 18C42 30 24 42 24 42Z" />
        </svg>
      );
    case "private":
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="12" y="22" width="24" height="20" rx="2" />
          <path d="M16 22V16C16 11.58 19.58 8 24 8C28.42 8 32 11.58 32 16V22" />
          <circle cx="24" cy="33" r="3" />
          <line x1="24" y1="36" x2="24" y2="38" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhyChooseUs() {
  return (
    <section id="visit" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            THE MAYA&apos;S PROMISE
          </p>
          <h2 className="font-luxury text-ivory text-4xl md:text-5xl mb-6">
            Why Discerning Collectors Choose Us
          </h2>
          <div className="luxury-divider mx-auto" />
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group pb-8 border-b border-gold/10 hover:border-gold/30 transition-colors duration-500"
            >
              <div className="mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(198,165,92,0.3)]">
                <ServiceIcon icon={service.icon} />
              </div>
              <h3 className="font-luxury text-ivory text-xl mb-3">
                {service.title}
              </h3>
              <p className="text-whisper text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
