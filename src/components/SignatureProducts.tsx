"use client";

import { motion } from "framer-motion";
import { SIGNATURE_PRODUCTS } from "@/lib/data";

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function SignatureProducts() {
  return (
    <section id="pieces" className="py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
          >
            Signature Pieces
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.1 }}
            className="font-luxury text-4xl md:text-5xl text-ivory mb-6"
          >
            Artistry in Every Detail
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.2 }}
            className="luxury-divider mx-auto"
          />
        </div>

        {/* Products */}
        <div className="flex flex-col gap-[120px]">
          {SIGNATURE_PRODUCTS.map((product, index) => {
            const isOdd = index % 2 === 0; // 0-indexed: first item is "odd" (image left)

            return (
              <div key={product.id}>
                <div
                  className={`flex flex-col ${
                    isOdd ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-0`}
                >
                  {/* Image Side (60%) */}
                  <motion.div
                    initial={{ opacity: 0, x: isOdd ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: easeSmooth }}
                    className="w-full lg:w-[60%]"
                  >
                    <div className="image-zoom-container aspect-[3/4] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Text Side (40%) */}
                  <div className="w-full lg:w-[40%] flex items-center">
                    <div className="px-8 lg:px-14 py-12 lg:py-0">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.2,
                        }}
                        className="text-gold uppercase tracking-[0.3em] text-xs mb-4"
                      >
                        {product.collection}
                      </motion.p>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.3,
                        }}
                        className="font-luxury text-3xl md:text-4xl text-ivory mb-5"
                      >
                        {product.name}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.4,
                        }}
                        className="text-whisper text-sm leading-relaxed mb-8"
                      >
                        {product.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.5,
                        }}
                        className="grid grid-cols-2 gap-3 mb-8"
                      >
                        {product.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            <span className="text-xs uppercase tracking-wider text-whisper">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.6,
                        }}
                        className="text-2xl text-gold font-light mb-8"
                      >
                        {product.price}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.8,
                          ease: easeSmooth,
                          delay: 0.7,
                        }}
                      >
                        <button className="btn-luxury">
                          <span>View Details</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Gold Divider Between Products */}
                {index < SIGNATURE_PRODUCTS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: easeSmooth }}
                    className="mt-[120px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
