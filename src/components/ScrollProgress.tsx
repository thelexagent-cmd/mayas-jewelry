"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-[100] origin-left h-[2px]"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #A8883E 0%, #C6A55C 40%, #D4BC7C 70%, #C6A55C 100%)",
      }}
    />
  );
}
