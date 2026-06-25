"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineHeart, HiTrash } from "react-icons/hi2";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function WishlistContent() {
  const { items, clearWishlist, itemCount } = useWishlist();

  return (
    <section className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] mb-10">
          <Link
            href="/"
            className="text-smoke hover:text-gold transition-colors duration-300"
          >
            Home
          </Link>
          <span className="text-smoke/30">/</span>
          <span className="text-ivory">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Saved Pieces
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.1 }}
            className="font-luxury text-4xl md:text-5xl text-ivory mb-6"
          >
            Your Wishlist
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
            className="luxury-divider mx-auto"
          />
        </div>

        {/* Content */}
        {itemCount === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.3 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full border border-white/10">
              <HiOutlineHeart className="w-8 h-8 text-smoke" />
            </div>
            <h2 className="font-luxury text-2xl text-ivory/50 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-smoke mb-10 max-w-md mx-auto leading-relaxed">
              Discover our curated collections and save the pieces that speak to
              you. Your wishlist will be waiting when you are ready.
            </p>
            <Link href="/collections" className="btn-luxury">
              <span>Explore Collections</span>
            </Link>
          </motion.div>
        ) : (
          /* Wishlist Items */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: easeSmooth, delay: 0.3 }}
          >
            {/* Clear Button */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-sm text-smoke">
                {itemCount} {itemCount === 1 ? "piece" : "pieces"} saved
              </span>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ivory/50 hover:text-red-400 transition-colors duration-300"
              >
                <HiTrash className="w-3.5 h-3.5" />
                Clear Wishlist
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {items.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
