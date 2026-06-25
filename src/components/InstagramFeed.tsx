"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiHeart } from "react-icons/hi2";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const INSTAGRAM_POSTS = [
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80",
    alt: "Cuban link chain close-up",
    likes: 842,
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&q=80",
    alt: "Diamond ring on display",
    likes: 1203,
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80",
    alt: "Gold bracelet styling",
    likes: 967,
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80",
    alt: "Earring collection flat lay",
    likes: 1456,
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&q=80",
    alt: "Jeweler at work",
    likes: 734,
  },
  {
    src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=600&fit=crop&q=80",
    alt: "Pearl necklace detail",
    likes: 1089,
  },
];

/* Instagram-style icon */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};

export default function InstagramFeed() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-charcoal-light">
      {/* Header */}
      <motion.div
        ref={headerRef}
        className="text-center mb-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={
          isHeaderInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 30 }
        }
        transition={{ duration: 0.8, ease: easeSmooth }}
      >
        <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">
          Follow @MAYAS.JEWELRY
        </p>
        <h2 className="font-luxury text-3xl md:text-4xl text-ivory">
          Join Our World
        </h2>
      </motion.div>

      {/* Image Grid — edge to edge */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {INSTAGRAM_POSTS.map((post, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group relative aspect-square overflow-hidden cursor-pointer"
          >
            <img
              src={post.src}
              alt={post.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-500 flex flex-col items-center justify-center gap-3">
              <InstagramIcon className="w-7 h-7 text-ivory opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" />
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-2 group-hover:translate-y-0">
                <HiHeart className="w-4 h-4 text-ivory" />
                <span className="text-ivory text-xs font-medium">
                  {post.likes.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Follow Button */}
      <motion.div
        className="text-center mt-12 px-6"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeSmooth, delay: 0.3 }}
      >
        <a
          href="https://instagram.com/mayas.jewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury inline-flex items-center gap-3"
        >
          <InstagramIcon className="w-4 h-4 relative z-[1]" />
          <span>Follow Us on Instagram</span>
        </a>
      </motion.div>
    </section>
  );
}
