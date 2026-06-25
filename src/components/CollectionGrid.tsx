"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiAdjustmentsHorizontal,
  HiSquares2X2,
  HiListBullet,
  HiXMark,
  HiChevronDown,
} from "react-icons/hi2";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, type Product } from "@/lib/products";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "best-selling";
type PriceRange = "all" | "under-1000" | "1000-3000" | "3000-5000" | "5000-plus";
type ViewMode = "grid" | "list";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
];

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under-1000", label: "Under $1,000" },
  { value: "1000-3000", label: "$1,000 - $3,000" },
  { value: "3000-5000", label: "$3,000 - $5,000" },
  { value: "5000-plus", label: "$5,000+" },
];

interface CollectionGridProps {
  products: Product[];
  showCategoryFilter?: boolean;
}

export default function CollectionGrid({
  products,
  showCategoryFilter = true,
}: CollectionGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [category, setCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Derive available categories from the products
  const availableCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return CATEGORIES.filter((c) => cats.has(c.slug));
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price range filter
    switch (priceRange) {
      case "under-1000":
        result = result.filter((p) => p.price < 1000);
        break;
      case "1000-3000":
        result = result.filter((p) => p.price >= 1000 && p.price <= 3000);
        break;
      case "3000-5000":
        result = result.filter((p) => p.price >= 3000 && p.price <= 5000);
        break;
      case "5000-plus":
        result = result.filter((p) => p.price >= 5000);
        break;
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.badge === "new" ? -1 : b.badge === "new" ? 1 : 0));
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, category, priceRange, sortBy]);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) + (priceRange !== "all" ? 1 : 0);

  return (
    <div>
      {/* Filter Bar */}
      <div className="border-b border-white/5 pb-6 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side - Filter toggle + count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ivory/70 hover:text-gold transition-colors duration-300"
            >
              <HiAdjustmentsHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gold text-obsidian text-[10px] font-medium">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-[11px] tracking-[0.1em] text-smoke">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Right side - Sort + View toggle */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ivory/70 hover:text-gold transition-colors duration-300"
              >
                Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                <HiChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: easeSmooth }}
                    className="absolute right-0 top-full mt-2 w-52 bg-charcoal border border-white/10 z-50"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                          sortBy === option.value
                            ? "text-gold bg-gold/5"
                            : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-gold/10 text-gold"
                    : "text-ivory/40 hover:text-ivory/70"
                }`}
                aria-label="Grid view"
              >
                <HiSquares2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-gold/10 text-gold"
                    : "text-ivory/40 hover:text-ivory/70"
                }`}
                aria-label="List view"
              >
                <HiListBullet className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeSmooth }}
              className="overflow-hidden"
            >
              <div className="pt-6 flex flex-col sm:flex-row gap-8">
                {/* Category Filter */}
                {showCategoryFilter && availableCategories.length > 1 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-smoke mb-3">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCategory("all")}
                        className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] border transition-all duration-300 ${
                          category === "all"
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 text-ivory/50 hover:border-gold/30 hover:text-ivory"
                        }`}
                      >
                        All
                      </button>
                      {availableCategories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => setCategory(cat.slug)}
                          className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] border transition-all duration-300 ${
                            category === cat.slug
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-white/10 text-ivory/50 hover:border-gold/30 hover:text-ivory"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range Filter */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-smoke mb-3">
                    Price Range
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setPriceRange(range.value)}
                        className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] border transition-all duration-300 ${
                          priceRange === range.value
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 text-ivory/50 hover:border-gold/30 hover:text-ivory"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setCategory("all");
                    setPriceRange("all");
                  }}
                  className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-gold hover:text-gold-light transition-colors duration-300"
                >
                  <HiXMark className="w-3.5 h-3.5" />
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
              : "grid grid-cols-1 gap-y-8"
          }
        >
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeSmooth }}
          className="text-center py-20"
        >
          <p className="font-luxury text-2xl text-ivory/50 mb-4">
            No pieces found
          </p>
          <p className="text-sm text-smoke mb-8">
            Try adjusting your filters to discover more.
          </p>
          <button
            onClick={() => {
              setCategory("all");
              setPriceRange("all");
            }}
            className="btn-luxury"
          >
            <span>Clear Filters</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
