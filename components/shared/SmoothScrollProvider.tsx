"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Provider para scroll ultra suave (butter smooth) usando Lenis
 * Integrado com GSAP ScrollTrigger para animações sincronizadas
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configuração otimizada para máxima suavidade
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical" as const,
      gestureOrientation: "vertical" as const,
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Desabilitar em touch para melhor performance mobile
      touchMultiplier: 2,
      infinite: false,
    });

    // Sincronizar Lenis com GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // RAF loop para buttery smooth
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desabilitar lag smoothing do GSAP
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return <>{children}</>;
}

