"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { HiHeart, HiOutlineHeart, HiShoppingBag, HiEye } from "react-icons/hi2";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useUI } from "@/contexts/UIContext";
import { formatPrice, type Product } from "@/lib/products";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? "#C6A55C" : "none"}
            stroke="#C6A55C"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-[10px] text-smoke">({count})</span>
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  new: "bg-gold text-obsidian",
  sale: "bg-rose-500 text-white",
  bestseller: "bg-ivory text-obsidian",
  limited: "bg-red-600 text-white",
};

const BADGE_LABELS: Record<string, string> = {
  new: "New",
  sale: "Sale",
  bestseller: "Bestseller",
  limited: "Limited",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { openQuickView } = useUI();

  const wishlisted = isInWishlist(product.id);
  const hasSecondImage = product.images.length > 1;
  const collectionName = product.collection
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: easeSmooth,
      }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4">
        <Link href={`/product/${product.slug}`}>
          {/* Primary Image */}
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          />

          {/* Secondary Image (crossfade on hover) */}
          {hasSecondImage && (
            <img
              src={product.images[1].src}
              alt={product.images[1].alt}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium ${BADGE_STYLES[product.badge]}`}
          >
            {BADGE_LABELS[product.badge]}
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-obsidian/50 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-obsidian/80 hover:border-gold/30 z-10"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? (
            <HiHeart className="w-4 h-4 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-4 h-4 text-ivory/70 transition-colors group-hover:text-ivory" />
          )}
        </button>

        {/* Quick View Button (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="pointer-events-auto px-5 py-2.5 bg-obsidian/80 backdrop-blur-sm border border-gold/30 text-ivory text-[11px] uppercase tracking-[0.15em] flex items-center gap-2 transition-all duration-300 hover:bg-gold hover:text-obsidian hover:border-gold translate-y-3 group-hover:translate-y-0"
          >
            <HiEye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Collection name */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
          {collectionName}
        </p>

        {/* Product name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-luxury text-lg text-ivory leading-tight transition-colors duration-300 hover:text-gold">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              product.compareAtPrice ? "text-gold" : "text-ivory"
            }`}
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-smoke line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}

        {/* Add to Bag button (appears on hover) */}
        <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
          <button
            onClick={() => addItem(product)}
            className="w-full mt-2 h-10 flex items-center justify-center gap-2 bg-transparent border border-gold/50 text-ivory text-[11px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-gold hover:text-obsidian hover:border-gold"
          >
            <HiShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
