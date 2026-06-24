"use client";

import { motion } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/data";

const serviceLinks = [
  { label: "Appraisals", href: "#visit" },
  { label: "Custom Design", href: "#atelier" },
  { label: "Restoration", href: "#visit" },
  { label: "Trade-In", href: "#visit" },
];

export default function Footer() {
  return (
    <motion.footer
      className="bg-obsidian border-t border-gold/10 pt-20 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section - 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-luxury text-2xl text-gold-gradient">
              MAYA&apos;S
            </h3>
            <p className="text-whisper text-xs tracking-widest mt-2">
              {BRAND.tagline}
            </p>
            <p className="text-smoke text-xs mt-4 leading-relaxed">
              {BRAND.address}
            </p>
            <p className="text-gold text-sm mt-2">{BRAND.phone}</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-gold text-xs tracking-widest mb-6">EXPLORE</h4>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-whisper text-sm mb-3 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-gold text-xs tracking-widest mb-6">
              SERVICES
            </h4>
            <nav className="flex flex-col">
              {serviceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-whisper text-sm mb-3 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Visit Us */}
          <div>
            <h4 className="text-gold text-xs tracking-widest mb-6">
              VISIT US
            </h4>
            <div className="space-y-3 text-whisper text-sm">
              <p>{BRAND.address}</p>
              <div>
                <p>{BRAND.hours.weekday}</p>
                <p>{BRAND.hours.weekend}</p>
              </div>
              <p>{BRAND.phone}</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Divider */}
        <div className="flex justify-center my-12">
          <div className="luxury-divider-wide" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-smoke text-xs">
            &copy; 2024 Maya&apos;s Cash &amp; Gold, Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href={BRAND.social.instagram}
              aria-label="Instagram"
              className="text-whisper hover:text-gold transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={BRAND.social.facebook}
              aria-label="Facebook"
              className="text-whisper hover:text-gold transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2H15C13.34 2 12 3.34 12 5V8H9V12H12V22H16V12H19L20 8H16V5C16 4.45 16.45 4 17 4H20V2H18Z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href={BRAND.social.pinterest}
              aria-label="Pinterest"
              className="text-whisper hover:text-gold transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6C9.24 6 7 8.24 7 11C7 12.76 7.88 14.3 9.24 15.2L10 12L9.5 10.5C9.5 9.12 10.62 8 12 8C13.38 8 14.5 9.12 14.5 10.5C14.5 11.88 13.38 13 12 13C11.44 13 10.94 12.8 10.54 12.46L9.5 16.5C10.3 16.82 11.12 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 6 12 6Z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-smoke/50 text-xs text-center mt-4">
          Crafted with excellence in Miami, Florida
        </p>
      </div>
    </motion.footer>
  );
}
