"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { getFeaturedProducts, formatPrice, type Product } from "@/lib/products";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const BADGE_STYLES: Record<string, string> = {
  new: "bg-gold text-obsidian",
  sale: "bg-red-600 text-ivory",
  bestseller: "bg-gold/90 text-obsidian",
  limited: "bg-ivory text-obsidian",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: easeSmooth }}
      className="group min-w-[280px] flex-shrink-0 snap-start cursor-pointer"
    >
      {/* Image */}
      <div className="image-zoom-container aspect-[3/4] relative overflow-hidden bg-charcoal">
        <img
          src={product.images[0]?.src}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium ${BADGE_STYLES[product.badge] || "bg-gold text-obsidian"}`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-all duration-700" />
      </div>

      {/* Info */}
      <div className="pt-5 pb-2">
        <h3 className="font-luxury text-ivory text-lg mb-1 transition-colors duration-300 group-hover:text-gold">
          {product.name}
        </h3>
        <p className="text-gold text-sm font-light mb-3">
          {formatPrice(product.price)}
        </p>
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-whisper group-hover:text-gold transition-colors duration-300">
          Shop Now
          <HiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
}

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const products = getFeaturedProducts();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return 1;
    return (
      (el.firstElementChild as HTMLElement).offsetWidth +
      parseFloat(getComputedStyle(el).gap || "0")
    );
  }, []);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, [getCardWidth]);

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = getCardWidth();
      el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    },
    [getCardWidth]
  );

  const scrollPrev = useCallback(() => {
    scrollTo(Math.max(0, activeIndex - 1));
  }, [activeIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    scrollTo(Math.min(products.length - 1, activeIndex + 1));
  }, [activeIndex, products.length, scrollTo]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => updateActiveIndex();
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [updateActiveIndex]);

  return (
    <section id="bestsellers" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: easeSmooth }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
            Curated for You
          </p>
          <h2 className="font-luxury text-4xl md:text-5xl text-ivory mb-6">
            Best Sellers
          </h2>
          <div className="luxury-divider mx-auto" />
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Scroll arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Scroll left"
          className="absolute left-4 md:left-8 top-[40%] z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
        >
          <HiArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Scroll right"
          className="absolute right-4 md:right-8 top-[40%] z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
        >
          <HiArrowRight className="w-5 h-5" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-16 md:px-24 pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to product ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-gold"
                : "w-2 bg-gold/30 hover:bg-gold/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
