"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/80 backdrop-blur-xl border-b border-gold/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative z-10"
            >
              <span
                className="font-serif text-2xl font-bold tracking-[0.3em] text-gold-gradient"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                MAYA&apos;S
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-ivory/60 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-6">
              {/* Book Appointment - Desktop */}
              <a
                href="#visit"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#visit");
                }}
                className="hidden lg:inline-flex items-center px-6 py-2.5 border border-gold/40 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-obsidian transition-all duration-500"
              >
                Book Appointment
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 ${
                    mobileOpen
                      ? "rotate-45 translate-y-[4.5px]"
                      : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 ${
                    mobileOpen
                      ? "-rotate-45 -translate-y-[4.5px]"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-2xl font-serif uppercase tracking-[0.25em] text-ivory/70 hover:text-gold transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="#visit"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: NAV_LINKS.length * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#visit");
                }}
                className="mt-4 inline-flex items-center px-8 py-3 border border-gold/40 text-sm uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-obsidian transition-all duration-500"
              >
                Book Appointment
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
