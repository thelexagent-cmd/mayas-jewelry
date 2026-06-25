"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi2";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const FAQ_ITEMS = [
  {
    question: "Do you offer free appraisals?",
    answer:
      "Yes, we provide complimentary professional jewelry appraisals. Our certified gemologists have decades of experience evaluating gold, diamonds, and precious stones. Walk-ins are welcome, or schedule a private appointment for a more detailed assessment.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all unworn pieces in their original condition with proof of purchase. Custom and bespoke pieces are final sale. Exchanges are always welcome, and we are happy to work with you to find the perfect piece.",
  },
  {
    question: "Do you buy gold and precious metals?",
    answer:
      "Yes, we offer competitive prices for gold, silver, and platinum. Every item is weighed and tested transparently before your eyes using professional-grade equipment. We pride ourselves on fair market valuations and instant payment.",
  },
  {
    question: "Can I design a custom piece?",
    answer:
      "Absolutely! Our Bespoke Atelier service allows you to work directly with our master jewelers to create a one-of-a-kind piece. From the initial sketch to selecting stones and metals, we guide you through every step. Custom pieces typically take 4-6 weeks.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes, we offer flexible financing options with rates as low as 0% APR for qualified buyers. We work with multiple financing partners to find the best terms for your budget. Apply in-store or online with no impact to your credit score.",
  },
  {
    question: "Is shipping insured?",
    answer:
      "Every shipment is fully insured and requires signature upon delivery. We use discreet, tamper-proof packaging with no external branding. Domestic orders over $500 ship free via FedEx Priority with real-time tracking.",
  },
  {
    question: "Do you offer jewelry repair?",
    answer:
      "Yes, our master jewelers provide expert repair and restoration services for all types of jewelry. From simple clasp replacements to complete restorations of heirloom pieces, we treat every item with the utmost care. Free estimates are provided on all repairs.",
  },
  {
    question: "How do I schedule a private viewing?",
    answer:
      "Contact us at (305) 392-1461 or book online through our website. Private viewings are available during and after regular business hours by appointment. We curate a personalized selection based on your preferences and budget.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: easeSmooth }}
      className="border-b border-gold/15"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-ivory text-sm md:text-base pr-8 transition-colors duration-300 group-hover:text-gold">
          {item.question}
        </span>
        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gold/20 text-gold transition-all duration-300 group-hover:border-gold/50">
          {isOpen ? (
            <HiMinus className="w-4 h-4" />
          ) : (
            <HiPlus className="w-4 h-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
            className="overflow-hidden"
          >
            <p className="text-whisper text-sm leading-relaxed pb-6 pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="py-32 bg-obsidian">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: easeSmooth }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
            Need Help?
          </p>
          <h2 className="font-luxury text-4xl md:text-5xl text-ivory mb-6">
            Frequently Asked Questions
          </h2>
          <div className="luxury-divider mx-auto" />
        </motion.div>

        {/* Accordion */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
