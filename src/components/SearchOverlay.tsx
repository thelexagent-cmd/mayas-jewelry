"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/contexts/UIContext";
import { searchProducts, formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import {
  HiXMark,
  HiMagnifyingGlass,
} from "react-icons/hi2";

const POPULAR_SEARCHES = [
  "Gold Chains",
  "Diamond Rings",
  "Cuban Link",
  "Watches",
  "Emerald",
  "Platinum",
];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // ESC key closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Lock body scroll
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Live filtering
  useEffect(() => {
    if (query.trim().length > 0) {
      const matched = searchProducts(query).slice(0, 6);
      setResults(matched);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleChipClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeSearch}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-10 w-12 h-12 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-300"
            aria-label="Close search"
          >
            <HiXMark className="w-7 h-7" />
          </button>

          <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-40 pb-20">
            {/* Search Input */}
            <div className="relative border-b border-whisper/20 pb-4">
              <HiMagnifyingGlass className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-gold/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search our collection..."
                className="w-full bg-transparent text-3xl md:text-5xl font-luxury text-ivory pl-12 md:pl-16 pr-4 outline-none placeholder:text-whisper/30 caret-gold"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              />
            </div>

            {/* Popular Searches */}
            {query.trim().length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-10"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-whisper/60 mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleChipClick(term)}
                      className="px-5 py-2.5 border border-whisper/20 text-sm text-ivory/70 hover:border-gold/50 hover:text-gold transition-all duration-300 tracking-wide"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Search Results */}
            {query.trim().length > 0 && (
              <div className="mt-10">
                {results.length > 0 ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-whisper/60 mb-6">
                      {results.length} result{results.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="grid gap-4">
                      {results.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-5 p-4 border border-whisper/10 hover:border-gold/30 bg-charcoal/30 hover:bg-charcoal/60 transition-all duration-300 group"
                          >
                            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-charcoal">
                              <Image
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs uppercase tracking-[0.15em] text-gold/70 mb-1">
                                {product.category}
                              </p>
                              <p className="text-ivory font-luxury text-lg truncate"
                                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                              >
                                {product.name}
                              </p>
                            </div>
                            <p className="text-gold font-medium text-lg flex-shrink-0">
                              {formatPrice(product.price)}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-whisper/60 text-lg">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-whisper/40 text-sm mt-2">
                      Try searching for a different term
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
