"use client";

import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

function getAspectHeight(aspect: string) {
  switch (aspect) {
    case "tall":
      return "h-[500px]";
    case "wide":
      return "h-[300px]";
    case "square":
      return "h-[400px]";
    default:
      return "h-[400px]";
  }
}

export default function LifestyleGallery() {
  return (
    <section className="py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            THE WORLD OF MAYA&apos;S
          </p>
          <h2 className="font-luxury text-ivory text-4xl md:text-5xl mb-6">
            A Life of Elegance
          </h2>
          <div className="luxury-divider mx-auto" />
        </div>

        {/* Masonry Grid */}
        <motion.div
          className="masonry-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`image-zoom-container rounded-none overflow-hidden relative group ${getAspectHeight(image.aspect)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-all duration-700 flex items-end justify-start p-6">
                <p className="text-ivory text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
