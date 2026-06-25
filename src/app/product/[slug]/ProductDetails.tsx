"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHeart,
  HiOutlineHeart,
  HiShoppingBag,
  HiPlus,
  HiMinus,
  HiChevronDown,
  HiStar,
  HiTruck,
  HiArrowPath,
  HiShieldCheck,
} from "react-icons/hi2";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useUI } from "@/contexts/UIContext";
import { formatPrice, type Product } from "@/lib/products";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <HiStar
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating) ? "text-gold" : "text-white/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-smoke">({count} reviews)</span>
      <button className="text-xs text-gold hover:text-gold-light transition-colors duration-300 ml-2">
        Write a Review
      </button>
    </div>
  );
}

interface AccordionTabProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionTab({ title, isOpen, onToggle, children }: AccordionTabProps) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-sm uppercase tracking-[0.15em] text-ivory group-hover:text-gold transition-colors duration-300">
          {title}
        </span>
        <HiChevronDown
          className={`w-4 h-4 text-smoke transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-whisper leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductDetailsProps {
  product: Product;
  collectionName: string;
}

export default function ProductDetails({
  product,
  collectionName,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState<string | null>("description");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showNotification } = useUI();

  const wishlisted = isInWishlist(product.id);

  const handleAddToBag = () => {
    addItem(product, quantity);
    showNotification(`${product.name} added to your bag`, "success");
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    showNotification(
      wishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      "success"
    );
  };

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
      className="lg:sticky lg:top-32"
    >
      {/* Collection Name */}
      <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">
        {collectionName}
      </p>

      {/* Product Name */}
      <h1 className="font-luxury text-3xl md:text-4xl text-ivory mb-4">
        {product.name}
      </h1>

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="mb-5">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-2xl text-gold font-light">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-base text-smoke line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
      {product.financing && (
        <p className="text-xs text-smoke mb-6">{product.financing}</p>
      )}
      {!product.financing && <div className="mb-6" />}

      {/* Description */}
      <p className="text-sm text-whisper leading-relaxed mb-8">
        {product.shortDescription}
      </p>

      {/* Specs Mini Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 p-4 border border-white/5 bg-charcoal/30">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-smoke mb-1">
            Material
          </p>
          <p className="text-xs text-ivory">{product.material}</p>
        </div>
        <div className="text-center border-x border-white/5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-smoke mb-1">
            Weight
          </p>
          <p className="text-xs text-ivory">{product.weight}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.15em] text-smoke mb-1">
            SKU
          </p>
          <p className="text-xs text-ivory">{product.sku}</p>
        </div>
      </div>

      {/* Quantity Selector + Add to Bag */}
      <div className="flex items-center gap-4 mb-4">
        {/* Quantity */}
        <div className="flex items-center border border-white/10">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-12 flex items-center justify-center text-ivory/50 hover:text-ivory transition-colors duration-200"
            aria-label="Decrease quantity"
          >
            <HiMinus className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 h-12 flex items-center justify-center text-sm text-ivory border-x border-white/10">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
            className="w-10 h-12 flex items-center justify-center text-ivory/50 hover:text-ivory transition-colors duration-200"
            aria-label="Increase quantity"
          >
            <HiPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Bag */}
        <button
          onClick={handleAddToBag}
          disabled={!product.inStock}
          className="flex-1 btn-luxury !py-3 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <HiShoppingBag className="w-4 h-4 relative z-10" />
          <span>{product.inStock ? "Add to Bag" : "Out of Stock"}</span>
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ivory/60 hover:text-gold transition-colors duration-300 mb-8"
      >
        {wishlisted ? (
          <HiHeart className="w-4 h-4 text-red-500" />
        ) : (
          <HiOutlineHeart className="w-4 h-4" />
        )}
        {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-smoke">
          <HiTruck className="w-4 h-4 text-gold" />
          Free Shipping
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-smoke">
          <HiArrowPath className="w-4 h-4 text-gold" />
          30-Day Returns
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-smoke">
          <HiShieldCheck className="w-4 h-4 text-gold" />
          Authenticated
        </div>
      </div>

      {/* Accordion Tabs */}
      <div>
        <AccordionTab
          title="Description"
          isOpen={openTab === "description"}
          onToggle={() => toggleTab("description")}
        >
          <p>{product.description}</p>
          {product.details.length > 0 && (
            <ul className="mt-4 space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </AccordionTab>

        <AccordionTab
          title="Specifications"
          isOpen={openTab === "specifications"}
          onToggle={() => toggleTab("specifications")}
        >
          <div className="space-y-2.5">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-smoke">{key}</span>
                <span className="text-ivory">{value}</span>
              </div>
            ))}
          </div>
        </AccordionTab>

        <AccordionTab
          title="Shipping & Returns"
          isOpen={openTab === "shipping"}
          onToggle={() => toggleTab("shipping")}
        >
          <div className="space-y-3">
            <p>
              <strong className="text-ivory">Free Shipping:</strong> Complimentary
              insured shipping on all orders over $500 within the continental United
              States.
            </p>
            <p>
              <strong className="text-ivory">International:</strong> We ship
              worldwide. International orders are fully insured and tracked.
            </p>
            <p>
              <strong className="text-ivory">Returns:</strong> We offer a 30-day
              return policy on all unworn, unaltered pieces in their original
              packaging. Custom and engraved items are final sale.
            </p>
          </div>
        </AccordionTab>

        <AccordionTab
          title={`Reviews (${product.reviewCount})`}
          isOpen={openTab === "reviews"}
          onToggle={() => toggleTab("reviews")}
        >
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-white/5 pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating ? "text-gold" : "text-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-ivory font-medium">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="text-[10px] text-gold uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ivory font-medium mb-1">
                    {review.title}
                  </p>
                  <p className="text-xs text-whisper">{review.text}</p>
                  <p className="text-[10px] text-smoke mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-smoke">
              No reviews yet. Be the first to review this piece.
            </p>
          )}
        </AccordionTab>
      </div>
    </motion.div>
  );
}
