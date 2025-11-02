"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Suavização do progresso
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Mostra após rolar 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm" />
      
      {/* Progress bar */}
      <motion.div
        className="h-full bg-gradient-to-r from-os-primary via-cyan-500 to-blue-600 shadow-lg shadow-os-primary/50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-transparent to-os-primary/20 blur-xl"
        style={{ x: scaleX }}
      />
    </motion.div>
  );
}

