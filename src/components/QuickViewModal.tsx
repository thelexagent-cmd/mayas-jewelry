"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/contexts/UIContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import {
  HiXMark,
  HiPlus,
  HiMinus,
  HiHeart,
  HiStar,
  HiShoppingBag,
  HiArrowRight,
} from "react-icons/hi2";

const RING_SIZES = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
const BRACELET_SIZES = ['6.5"', '7"', '7.5"', '8"', '8.5"'];

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, showNotification } = useUI();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const product = quickViewProduct;

  // Reset state when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setSelectedSize(undefined);
  }, [product]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // ESC key closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        closeQuickView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, closeQuickView]);

  if (!product) return null;

  const needsSize =
    product.category === "rings" ||
    product.category === "bracelets";

  const sizeOptions =
    product.category === "rings"
      ? RING_SIZES
      : product.category === "bracelets"
        ? BRACELET_SIZES
        : [];

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      showNotification("Please select a size.", "error");
      return;
    }
    addItem(product, quantity, selectedSize);
    showNotification(`${product.name} added to your bag.`, "success");
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    if (inWishlist) {
      showNotification(`${product.name} removed from wishlist.`, "info");
    } else {
      showNotification(`${product.name} added to wishlist.`, "success");
    }
  };

  // Render rating stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <HiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? "text-gold" : "text-whisper/20"
        }`}
      />
    ));
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-obsidian/70 backdrop-blur-sm"
            onClick={closeQuickView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
          >
            <div
              className="relative w-full max-w-4xl bg-charcoal border border-whisper/10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-ivory/50 hover:text-gold transition-colors duration-300 bg-charcoal/80 backdrop-blur-sm"
                aria-label="Close quick view"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Image Gallery */}
                <div className="p-6 md:p-8">
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-light mb-4">
                    <Image
                      src={product.images[selectedImageIndex].src}
                      alt={product.images[selectedImageIndex].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-[0.15em] font-medium ${
                          product.badge === "sale"
                            ? "bg-red-600 text-white"
                            : product.badge === "new"
                              ? "bg-gold text-obsidian"
                              : product.badge === "limited"
                                ? "bg-obsidian/80 text-gold border border-gold/40"
                                : "bg-charcoal-light text-ivory border border-whisper/20"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-3">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImageIndex(i)}
                          className={`relative w-16 h-16 overflow-hidden transition-all duration-300 ${
                            i === selectedImageIndex
                              ? "border-2 border-gold"
                              : "border border-whisper/10 hover:border-whisper/30"
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info */}
                <div className="p-6 md:p-8 md:pl-2 flex flex-col">
                  {/* Collection */}
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                    {product.collection.replace(/-/g, " ")}
                  </p>

                  {/* Name */}
                  <h2
                    className="font-luxury text-2xl text-ivory mb-3"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gold text-xl font-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-whisper/50 line-through text-sm">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-whisper/50 text-xs">
                      ({product.reviewCount} review{product.reviewCount !== 1 ? "s" : ""})
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-ivory/70 text-sm leading-relaxed mb-5">
                    {product.shortDescription}
                  </p>

                  {/* Material & Weight */}
                  <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-y border-whisper/10">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-whisper/50 mb-1">
                        Material
                      </p>
                      <p className="text-ivory text-sm">{product.material}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-whisper/50 mb-1">
                        Weight
                      </p>
                      <p className="text-ivory text-sm">{product.weight}</p>
                    </div>
                  </div>

                  {/* Size Selector */}
                  {needsSize && sizeOptions.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-[0.15em] text-whisper/60 mb-3">
                        Select Size
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sizeOptions.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 flex items-center justify-center text-xs transition-all duration-300 ${
                              selectedSize === size
                                ? "bg-gold text-obsidian font-medium"
                                : "border border-whisper/20 text-ivory/70 hover:border-gold/40"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.15em] text-whisper/60 mb-3">
                      Quantity
                    </p>
                    <div className="flex items-center border border-whisper/20 w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <HiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center text-ivory text-sm border-x border-whisper/20">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <HiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mt-auto">
                    {/* Add to Bag */}
                    <button
                      onClick={handleAddToCart}
                      className="btn-luxury w-full justify-center"
                    >
                      <span className="flex items-center gap-2">
                        <HiShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </span>
                    </button>

                    {/* Add to Wishlist */}
                    <button
                      onClick={handleToggleWishlist}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 border text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                        inWishlist
                          ? "border-gold/40 text-gold"
                          : "border-whisper/20 text-ivory/70 hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      <HiHeart
                        className={`w-4 h-4 ${inWishlist ? "fill-gold" : ""}`}
                      />
                      {inWishlist ? "In Your Wishlist" : "Add to Wishlist"}
                    </button>

                    {/* View Full Details */}
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeQuickView}
                      className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.15em] text-whisper/50 hover:text-gold transition-colors duration-300"
                    >
                      View Full Details
                      <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
