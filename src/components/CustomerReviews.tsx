"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { REVIEWS } from "@/lib/data";

/* ── Star icon ── */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "#C6A55C" : "none"}
      stroke={filled ? "#C6A55C" : "#555"}
      strokeWidth={1.2}
      className="h-4 w-4"
    >
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7l.94-5.49-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

/* ── Arrow icon ── */
function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {direction === "left" ? (
        <path d="M15 19l-7-7 7-7" />
      ) : (
        <path d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

/* ── Review card ── */
function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass min-w-[300px] flex-shrink-0 snap-start border-t border-gold/20 p-8 md:min-w-[380px] md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
    >
      {/* Decorative quote mark */}
      <span className="font-luxury block text-6xl leading-none text-gold/30 select-none">
        &ldquo;
      </span>

      {/* Review text */}
      <p className="mt-2 text-base md:text-lg leading-relaxed text-ivory italic">
        {review.text}
      </p>

      {/* Bottom info */}
      <div className="mt-8 space-y-3">
        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < review.rating} />
          ))}
        </div>

        <p className="font-medium text-ivory">{review.name}</p>
        <p className="text-sm text-whisper">{review.location}</p>
        <p className="text-xs text-smoke">{review.date}</p>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(REVIEWS.length);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Calculate which "page" we're on based on scroll position */
  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const childWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth +
        parseFloat(getComputedStyle(el).gap || "0")
      : 1;
    setActiveIndex(Math.round(scrollLeft / childWidth));
  }, []);

  /* Scroll to a specific card */
  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const childWidth =
      (el.firstElementChild as HTMLElement).offsetWidth +
      parseFloat(getComputedStyle(el).gap || "0");
    el.scrollTo({ left: childWidth * index, behavior: "smooth" });
  }, []);

  const scrollPrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    scrollTo(next);
  }, [activeIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    const next = Math.min(REVIEWS.length - 1, activeIndex + 1);
    scrollTo(next);
  }, [activeIndex, scrollTo]);

  /* Listen for scroll events to update dots */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => updateActiveIndex();
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [updateActiveIndex]);

  /* Auto-play every 5 seconds */
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= REVIEWS.length - 1 ? 0 : prev + 1;
        scrollTo(next);
        return next;
      });
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [scrollTo]);

  /* Pause auto-play on hover */
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= REVIEWS.length - 1 ? 0 : prev + 1;
        scrollTo(next);
        return next;
      });
    }, 5000);
  };

  return (
    <section id="reviews" className="relative bg-obsidian py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center px-6"
      >
        <span className="mb-4 inline-block text-xs uppercase tracking-[0.3em] text-gold">
          Client Stories
        </span>
        <h2 className="font-luxury text-4xl md:text-5xl text-ivory leading-tight">
          Words That Inspire Us
        </h2>
        <div className="luxury-divider mx-auto mt-6" />
      </motion.div>

      {/* Carousel wrapper */}
      <div
        className="relative"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous review"
          className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next review"
          className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
        >
          <ArrowIcon direction="right" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-16 md:px-24 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to review ${i + 1}`}
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
