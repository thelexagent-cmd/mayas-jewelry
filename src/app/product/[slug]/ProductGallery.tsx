"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductImage } from "@/lib/products";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: easeSmooth }}
    >
      {/* Main Image */}
      <div
        ref={imageRef}
        className="relative aspect-[3/4] overflow-hidden bg-charcoal cursor-crosshair mb-4"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
            className="w-full h-full object-cover"
            style={
              isZoomed
                ? {
                    transform: "scale(2)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: "transform-origin 0.1s ease",
                  }
                : {
                    transform: "scale(1)",
                    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }
            }
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-24 overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "ring-1 ring-gold ring-offset-2 ring-offset-obsidian"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={image.src}
                alt={`${name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
