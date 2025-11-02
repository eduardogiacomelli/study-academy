"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Barra de progresso VERTICAL premium com efeito glowing
 * Posicionada na lateral esquerda, do topo ao fim da página
 */
export function VerticalProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.01); // Aparece após 1% de scroll
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <>
      {/* Track (trilha de fundo) */}
      <div className="fixed left-4 top-20 bottom-20 w-1 z-50 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-muted/30 backdrop-blur-sm border-l border-border/50" />
        
        {/* Barra de progresso com glow */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full"
          style={{ 
            scaleY,
            background: "linear-gradient(180deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)"
          }}
        >
          {/* Glow effect múltiplas camadas */}
          <div className="absolute inset-0 rounded-full blur-sm opacity-60"
            style={{
              background: "linear-gradient(180deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)"
            }}
          />
          <div className="absolute inset-0 rounded-full blur-md opacity-40"
            style={{
              background: "linear-gradient(180deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)"
            }}
          />
          
          {/* Ponto brilhante no fim (head) */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 70%, transparent 100%)",
              boxShadow: "0 0 10px #06b6d4, 0 0 20px #3b82f6"
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Percentage badge (opcional - pode remover se não quiser) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="fixed left-8 top-12 z-50 pointer-events-none"
      >
        <div className="px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-mono font-bold shadow-lg border border-primary/20">
          {Math.round(scrollYProgress.get() * 100)}%
        </div>
      </motion.div>
    </>
  );
}

