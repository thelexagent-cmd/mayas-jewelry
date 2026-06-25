"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineXMark,
  HiBars3,
} from "react-icons/hi2";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";

// ─── Data ───────────────────────────────────────────────

const ANNOUNCEMENT_MESSAGES = [
  "Complimentary Shipping on Orders Over $500",
  "Visit Our Miami Showroom \u2014 542 SW 12th Ave",
  "Financing Available \u2014 As Low As 0% APR",
];

const COLLECTIONS_MENU = [
  {
    name: "Heritage Gold",
    slug: "heritage-gold",
    description: "Timeless 18k & 24k gold masterpieces",
    image:
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Diamond Edit",
    slug: "diamond-edit",
    description: "Meticulously sourced brilliant cuts",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Miami Luxe",
    slug: "miami-luxe",
    description: "Bold contemporary spirit",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Bespoke Atelier",
    slug: "bespoke-atelier",
    description: "One-of-a-kind commissions",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop&q=80",
  },
];

const JEWELRY_CATEGORIES = [
  { name: "Chains", slug: "chains" },
  { name: "Necklaces", slug: "necklaces" },
  { name: "Bracelets", slug: "bracelets" },
  { name: "Rings", slug: "rings" },
  { name: "Earrings", slug: "earrings" },
  { name: "Pendants", slug: "pendants" },
];

const FEATURED_PRODUCT = {
  name: "Cuban Link Heritage Chain",
  price: "$4,800",
  image:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop&q=80",
};

type MegaMenuKey = "collections" | "jewelry" | null;

// ─── Component ──────────────────────────────────────────

export default function Navbar() {
  // Contexts
  const { toggleCart, itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated, openLogin } = useAuth();
  const { openSearch } = useUI();

  // State
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<MegaMenuKey>(null);

  // Refs
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Announcement rotation ──
  useEffect(() => {
    if (!announcementVisible) return;
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcementVisible]);

  // ── Lock body scroll on mobile menu ──
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

  // ── Mega menu hover handlers ──
  const handleMegaEnter = useCallback((key: MegaMenuKey) => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(key);
    }, 150);
  }, []);

  const handleMegaLeave = useCallback(() => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  }, []);

  const handleMegaPanelEnter = useCallback(() => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
  }, []);

  const handleMegaPanelLeave = useCallback(() => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  }, []);

  // ── Mobile accordion toggle ──
  const toggleAccordion = useCallback((key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  }, []);

  // ── Close mobile menu on link click ──
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  // ── Announcement bar height offset ──
  const announcementHeight = announcementVisible ? 36 : 0;

  return (
    <>
      {/* ════════════════════════════════════════════════════
          1. ANNOUNCEMENT BAR
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 36, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-[60] bg-charcoal-light overflow-hidden"
          >
            <div className="relative flex items-center justify-center h-9 px-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={announcementIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs tracking-[0.15em] text-gold text-center"
                >
                  {ANNOUNCEMENT_MESSAGES[announcementIndex]}
                </motion.p>
              </AnimatePresence>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory transition-colors"
                aria-label="Close announcement"
              >
                <HiOutlineXMark className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          2. MAIN NAVIGATION BAR
          ════════════════════════════════════════════════════ */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
        style={{ top: announcementHeight }}
        className={`fixed left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-gold/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* ── Logo ── */}
            <Link href="/" className="relative z-10 shrink-0">
              <span
                className="font-luxury text-2xl font-bold tracking-[0.3em] text-gold-gradient"
              >
                MAYA&apos;S
              </span>
            </Link>

            {/* ── Desktop Center Nav Links ── */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Collections - with mega menu */}
              <div
                onMouseEnter={() => handleMegaEnter("collections")}
                onMouseLeave={handleMegaLeave}
                className="relative"
              >
                <Link
                  href="/collections"
                  className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeMega === "collections"
                      ? "text-gold"
                      : "text-ivory/60 hover:text-gold"
                  }`}
                >
                  Collections
                </Link>
              </div>

              {/* Jewelry - with mega menu */}
              <div
                onMouseEnter={() => handleMegaEnter("jewelry")}
                onMouseLeave={handleMegaLeave}
                className="relative"
              >
                <span
                  className={`text-xs uppercase tracking-[0.2em] cursor-default transition-colors duration-300 ${
                    activeMega === "jewelry"
                      ? "text-gold"
                      : "text-ivory/60 hover:text-gold"
                  }`}
                >
                  Jewelry
                </span>
              </div>

              {/* Watches */}
              <Link
                href="/collections?category=watches"
                className="text-xs uppercase tracking-[0.2em] text-ivory/60 hover:text-gold transition-colors duration-300"
              >
                Watches
              </Link>

              {/* Heritage */}
              <Link
                href="/#heritage"
                className="text-xs uppercase tracking-[0.2em] text-ivory/60 hover:text-gold transition-colors duration-300"
              >
                Heritage
              </Link>

              {/* Atelier */}
              <Link
                href="/#atelier"
                className="text-xs uppercase tracking-[0.2em] text-ivory/60 hover:text-gold transition-colors duration-300"
              >
                Atelier
              </Link>
            </div>

            {/* ── Right Icon Row ── */}
            <div className="flex items-center gap-5">
              {/* Search */}
              <button
                onClick={openSearch}
                className="text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <HiOutlineMagnifyingGlass className="w-5 h-5" />
              </button>

              {/* Account */}
              <button
                onClick={() => {
                  if (!isAuthenticated) openLogin();
                }}
                className="text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Account"
              >
                {isAuthenticated && user ? (
                  <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[10px] font-medium text-gold uppercase">
                    {user.name.charAt(0)}
                  </span>
                ) : (
                  <HiOutlineUser className="w-5 h-5" />
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Wishlist"
              >
                <HiOutlineHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-obsidian text-[9px] font-semibold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Shopping bag"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-obsidian text-[9px] font-semibold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative z-[70] ml-1 w-10 h-10 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <HiOutlineXMark className="w-6 h-6" />
                ) : (
                  <HiBars3 className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            4. MEGA MENUS (Desktop)
            ════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {activeMega === "collections" && (
            <motion.div
              key="mega-collections"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={handleMegaPanelEnter}
              onMouseLeave={handleMegaPanelLeave}
              className="absolute left-0 w-full glass border-t border-gold/10 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                <div className="grid grid-cols-4 gap-6">
                  {COLLECTIONS_MENU.map((col) => (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      onClick={() => setActiveMega(null)}
                      className="group block"
                    >
                      <div className="image-zoom-container aspect-[4/3] mb-4 overflow-hidden">
                        <img
                          src={col.image}
                          alt={col.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-luxury text-sm tracking-[0.15em] text-ivory group-hover:text-gold transition-colors duration-300">
                        {col.name}
                      </h4>
                      <p className="text-xs text-smoke mt-1">
                        {col.description}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gold/10 flex justify-center">
                  <Link
                    href="/collections"
                    onClick={() => setActiveMega(null)}
                    className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors duration-300"
                  >
                    View All Collections
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeMega === "jewelry" && (
            <motion.div
              key="mega-jewelry"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={handleMegaPanelEnter}
              onMouseLeave={handleMegaPanelLeave}
              className="absolute left-0 w-full glass border-t border-gold/10 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                <div className="grid grid-cols-12 gap-10">
                  {/* Categories */}
                  <div className="col-span-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-smoke mb-6">
                      Shop by Category
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {JEWELRY_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/collections?category=${cat.slug}`}
                          onClick={() => setActiveMega(null)}
                          className="text-sm text-ivory/70 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-gold/40" />
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-px h-full bg-gold/10" />
                  </div>

                  {/* Featured Product */}
                  <div className="col-span-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-smoke mb-6">
                      Featured
                    </p>
                    <div className="flex gap-6">
                      <div className="image-zoom-container w-40 aspect-[4/5] overflow-hidden shrink-0">
                        <img
                          src={FEATURED_PRODUCT.image}
                          alt={FEATURED_PRODUCT.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-luxury text-sm tracking-[0.1em] text-ivory">
                          {FEATURED_PRODUCT.name}
                        </h4>
                        <p className="text-gold text-sm mt-2">
                          {FEATURED_PRODUCT.price}
                        </p>
                        <Link
                          href="/collections?category=chains"
                          onClick={() => setActiveMega(null)}
                          className="mt-4 text-xs uppercase tracking-[0.15em] text-ivory/50 hover:text-gold transition-colors duration-300"
                        >
                          Shop Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════════════════════════════════════════════════
          3. MOBILE NAVIGATION
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-obsidian/98 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col h-full pt-32 pb-10 px-8 overflow-y-auto">
              {/* Collections Accordion */}
              <div className="border-b border-gold/10">
                <button
                  onClick={() => toggleAccordion("collections")}
                  className="w-full flex items-center justify-between py-5"
                >
                  <span className="font-luxury text-lg tracking-[0.2em] text-ivory">
                    Collections
                  </span>
                  <motion.span
                    animate={{ rotate: mobileAccordion === "collections" ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold text-xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileAccordion === "collections" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-4 flex flex-col gap-4">
                        {COLLECTIONS_MENU.map((col) => (
                          <Link
                            key={col.slug}
                            href={`/collections/${col.slug}`}
                            onClick={closeMobile}
                            className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                          >
                            {col.name}
                          </Link>
                        ))}
                        <Link
                          href="/collections"
                          onClick={closeMobile}
                          className="text-xs uppercase tracking-[0.15em] text-gold mt-2"
                        >
                          View All
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Jewelry Accordion */}
              <div className="border-b border-gold/10">
                <button
                  onClick={() => toggleAccordion("jewelry")}
                  className="w-full flex items-center justify-between py-5"
                >
                  <span className="font-luxury text-lg tracking-[0.2em] text-ivory">
                    Jewelry
                  </span>
                  <motion.span
                    animate={{ rotate: mobileAccordion === "jewelry" ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold text-xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileAccordion === "jewelry" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-4 flex flex-col gap-4">
                        {JEWELRY_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/collections?category=${cat.slug}`}
                            onClick={closeMobile}
                            className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Links */}
              <Link
                href="/collections?category=watches"
                onClick={closeMobile}
                className="border-b border-gold/10 py-5 font-luxury text-lg tracking-[0.2em] text-ivory hover:text-gold transition-colors duration-300"
              >
                Watches
              </Link>
              <Link
                href="/#heritage"
                onClick={closeMobile}
                className="border-b border-gold/10 py-5 font-luxury text-lg tracking-[0.2em] text-ivory hover:text-gold transition-colors duration-300"
              >
                Heritage
              </Link>
              <Link
                href="/#atelier"
                onClick={closeMobile}
                className="border-b border-gold/10 py-5 font-luxury text-lg tracking-[0.2em] text-ivory hover:text-gold transition-colors duration-300"
              >
                Atelier
              </Link>

              {/* Bottom section */}
              <div className="mt-auto pt-8 flex flex-col gap-4">
                <div className="luxury-divider mx-auto mb-4" />
                <Link
                  href="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-3 text-sm text-ivory/50 hover:text-gold transition-colors"
                >
                  <HiOutlineHeart className="w-5 h-5" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto text-xs text-gold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    closeMobile();
                    if (!isAuthenticated) openLogin();
                  }}
                  className="flex items-center gap-3 text-sm text-ivory/50 hover:text-gold transition-colors text-left"
                >
                  <HiOutlineUser className="w-5 h-5" />
                  {isAuthenticated ? `Hi, ${user?.name}` : "Sign In"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
