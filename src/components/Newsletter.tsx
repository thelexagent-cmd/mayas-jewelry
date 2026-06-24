"use client";

import { motion } from "framer-motion";
import { type FormEvent } from "react";

export default function Newsletter() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="py-24 bg-charcoal relative">
      {/* Gold gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {/* Gold gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      >
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
          INNER CIRCLE
        </p>
        <h2 className="font-luxury text-ivory text-3xl md:text-4xl mb-6">
          Be the First to Know
        </h2>
        <p className="text-whisper text-sm leading-relaxed mb-10 max-w-lg mx-auto">
          Receive exclusive previews of new collections, private event
          invitations, and curated selections before they reach the showroom
          floor.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch gap-4"
        >
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent border-b border-whisper/30 focus:border-gold text-ivory py-3 text-sm outline-none transition-colors duration-500 placeholder:text-smoke"
            />
            {/* Shimmer line on focus */}
            <div className="absolute bottom-0 left-0 right-0 h-px shimmer opacity-0 focus-within:opacity-100 pointer-events-none" />
          </div>
          <button type="submit" className="btn-luxury whitespace-nowrap">
            <span>Subscribe</span>
          </button>
        </form>

        <p className="text-smoke text-xs mt-4">
          Your privacy is sacred to us. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
