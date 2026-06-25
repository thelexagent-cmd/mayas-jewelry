"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import {
  HiXMark,
  HiPlus,
  HiMinus,
  HiShoppingBag,
  HiArrowRight,
} from "react-icons/hi2";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setTimeout(() => setPromoApplied(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-obsidian/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 z-[101] w-full max-w-md h-full bg-charcoal flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-whisper/10">
              <div className="flex items-center gap-3">
                <h2
                  className="text-sm uppercase tracking-[0.25em] text-ivory font-medium"
                >
                  Your Bag
                </h2>
                {itemCount > 0 && (
                  <span className="w-6 h-6 flex items-center justify-center bg-gold text-obsidian text-xs font-bold rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Close cart"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <HiShoppingBag className="w-16 h-16 text-whisper/20 mb-6" />
                <p
                  className="font-luxury text-xl text-ivory mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Your bag is empty
                </p>
                <p className="text-whisper/50 text-sm mb-8 max-w-[260px]">
                  Discover our curated collection of fine jewelry and timepieces.
                </p>
                <button
                  onClick={closeCart}
                  className="btn-luxury"
                >
                  <span>Continue Shopping</span>
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 py-4 border-b border-whisper/10 last:border-b-0"
                    >
                      {/* Image */}
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-charcoal-light">
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.images[0].alt}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p
                              className="text-ivory text-sm font-medium truncate font-luxury"
                              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                            >
                              {item.product.name}
                            </p>
                            {item.size && (
                              <p className="text-whisper/50 text-xs mt-0.5">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-whisper/40 hover:text-red-400 transition-colors duration-300"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <HiXMark className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-whisper/20">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-ivory text-xs border-x border-whisper/20">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-gold text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-whisper/10 px-6 py-5 space-y-4">
                  {/* Promo Code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 bg-transparent border-b border-whisper/20 text-ivory text-sm py-2 outline-none placeholder:text-whisper/30 focus:border-gold transition-colors duration-300"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="text-xs uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors duration-300 px-3"
                    >
                      {promoApplied ? "Applied!" : "Apply"}
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-ivory/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ivory/70">
                      <span>Estimated Tax (7%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-ivory/70">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-gold/60">
                        Free shipping on orders over $500
                      </p>
                    )}
                    <div className="flex justify-between text-ivory font-medium pt-3 border-t border-whisper/10">
                      <span className="uppercase tracking-[0.1em] text-xs">Total</span>
                      <span className="text-gold text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-luxury w-full justify-center"
                  >
                    <span className="flex items-center gap-2">
                      Proceed to Checkout
                      <HiArrowRight className="w-4 h-4" />
                    </span>
                  </Link>

                  {/* Continue Shopping */}
                  <button
                    onClick={closeCart}
                    className="w-full text-center text-xs uppercase tracking-[0.15em] text-whisper/50 hover:text-gold transition-colors duration-300 py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
