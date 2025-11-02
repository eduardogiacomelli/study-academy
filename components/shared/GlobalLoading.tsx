"use client";

import { useEffect, useState, Suspense, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

function GlobalLoadingContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Prefetch on mount to improve navigation
    startTransition(() => {
      router.prefetch(pathname);
    });
  }, [pathname, router]);

  useEffect(() => {
    setIsLoading(true);
    
    // Instant navigation feel with proper cleanup
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-os-primary via-cyan-500 to-db-primary z-[9999] origin-left"
          />
          
          {/* Center spinner overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9998] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <Loader2 className="size-8 animate-spin text-os-primary" />
              <p className="text-sm text-muted-foreground">Carregando...</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function GlobalLoading() {
  return (
    <Suspense fallback={null}>
      <GlobalLoadingContent />
    </Suspense>
  );
}

