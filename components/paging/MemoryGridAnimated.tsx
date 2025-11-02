"use client";

import { useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePagingStore } from "@/store/paging.store";
import { Zap } from "lucide-react";

// Cores melhoradas com mais contraste e brilho
function getPidColor(pid: number) {
  const colors = [
    { 
      bg: "bg-blue-500", 
      border: "border-blue-600", 
      text: "text-blue-950 dark:text-blue-50",
      glow: "shadow-blue-500/50",
      hex: "#3b82f6"
    },
    { 
      bg: "bg-green-500", 
      border: "border-green-600", 
      text: "text-green-950 dark:text-green-50",
      glow: "shadow-green-500/50",
      hex: "#22c55e"
    },
    { 
      bg: "bg-purple-500", 
      border: "border-purple-600", 
      text: "text-purple-950 dark:text-purple-50",
      glow: "shadow-purple-500/50",
      hex: "#a855f7"
    },
    { 
      bg: "bg-orange-500", 
      border: "border-orange-600", 
      text: "text-orange-950 dark:text-orange-50",
      glow: "shadow-orange-500/50",
      hex: "#f97316"
    },
    { 
      bg: "bg-pink-500", 
      border: "border-pink-600", 
      text: "text-pink-950 dark:text-pink-50",
      glow: "shadow-pink-500/50",
      hex: "#ec4899"
    },
    { 
      bg: "bg-cyan-500", 
      border: "border-cyan-600", 
      text: "text-cyan-950 dark:text-cyan-50",
      glow: "shadow-cyan-500/50",
      hex: "#06b6d4"
    },
    { 
      bg: "bg-amber-500", 
      border: "border-amber-600", 
      text: "text-amber-950 dark:text-amber-50",
      glow: "shadow-amber-500/50",
      hex: "#f59e0b"
    },
    { 
      bg: "bg-emerald-500", 
      border: "border-emerald-600", 
      text: "text-emerald-950 dark:text-emerald-50",
      glow: "shadow-emerald-500/50",
      hex: "#10b981"
    },
  ];
  return colors[pid % colors.length];
}

export function MemoryGridAnimated() {
  const frameOccupancy = usePagingStore((s) => s.frameOccupancy);
  const processes = usePagingStore((s) => s.processes);
  const lastEvent = usePagingStore((s) => s.lastEvent);
  const mmuFocus = usePagingStore((s) => s.mmuFocusFrame);
  const prevFramesCount = useRef(0);

  const highlight = useMemo(
    () => new Set([...(lastEvent?.frames ?? []), ...(mmuFocus !== null ? [mmuFocus] : [])]),
    [lastEvent, mmuFocus]
  );

  const framesCount = useMemo(() => frameOccupancy.length, [frameOccupancy]);
  const usedFrames = useMemo(() => frameOccupancy.filter((f) => f !== null).length, [frameOccupancy]);
  const freePercent = useMemo(() => {
    const free = frameOccupancy.filter((f) => f === null).length;
    const total = frameOccupancy.length;
    return total === 0 ? 0 : Math.round((free / total) * 100);
  }, [frameOccupancy]);

  const cols = useMemo(() => {
    const total = framesCount;
    if (total >= 128) return 16;
    if (total >= 64) return 12;
    if (total >= 32) return 8;
    return 6;
  }, [framesCount]);

  // Detecta quando memória foi redimensionada
  const isNewMemory = prevFramesCount.current !== framesCount;
  useEffect(() => {
    prevFramesCount.current = framesCount;
  }, [framesCount]);

  // Legenda de processos ativos
  const activeProcesses = useMemo(() => Object.values(processes), [processes]);

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-background to-secondary/5 p-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-4 pb-4 border-b"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Zap className="size-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Memória Física</h3>
            <p className="text-xs text-muted-foreground">Grid de quadros animado</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            Ocupados: <strong className="text-foreground">{usedFrames}</strong>
          </span>
          <span className="text-muted-foreground">
            Livres: <strong className="text-foreground">{framesCount - usedFrames}</strong>
          </span>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div 
        className="mb-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Utilização da memória</span>
          <motion.span 
            className="font-mono font-bold text-primary"
            key={100 - freePercent}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {100 - freePercent}% usado
          </motion.span>
        </div>
        <Progress value={100 - freePercent} className="h-2" />
      </motion.div>

      {/* Legenda de Processos */}
      <AnimatePresence mode="wait">
        {activeProcesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-secondary/10 border">
              <span className="text-xs font-semibold text-muted-foreground">Processos:</span>
              {activeProcesses.map((proc, idx) => {
                const color = getPidColor(proc.pid);
                return (
                  <motion.div
                    key={proc.pid}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-5 h-5 rounded ${color.bg} border-2 ${color.border} shadow-lg ${color.glow}`} />
                    <span className="text-xs font-mono">
                      PID {proc.pid}
                    </span>
                  </motion.div>
                );
              })}
              <div className="h-4 w-px bg-border mx-1" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-muted border-2 border-border" />
                <span className="text-xs">Livre</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid - ANIMADO COM STAGGER - Responsivo Mobile */}
      <div className="grid gap-1 md:gap-1.5" style={{ 
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}>
        <AnimatePresence mode="sync">
          {frameOccupancy.map((occ, i) => {
            const used = occ !== null;
            const isFx = highlight.has(i);
            
            // Animação de entrada staggered quando memória é criada
            const entryDelay = isNewMemory ? i * 0.003 : 0;
            
            if (!used) {
            // Frame livre - cinza simples
            return (
              <motion.div
                key={`frame-${i}`}
                initial={isNewMemory ? { opacity: 0, scale: 0.5, rotateY: -90 } : false}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ 
                  duration: 0.3,
                  delay: entryDelay,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={`
                  rounded border-2 border-border bg-muted p-1 md:p-1.5 text-center
                  transition-all duration-200 aspect-square flex items-center justify-center
                  ${isFx ? "ring-2 ring-amber-500 ring-offset-1 ring-offset-background shadow-lg shadow-amber-500/50" : ""}
                `}
              >
                <span className="font-mono text-[8px] md:text-[10px] text-muted-foreground">F{i}</span>
              </motion.div>
            );
            }

            // Frame ocupado - cor do processo
            const color = getPidColor(occ.pid);
            return (
              <motion.div
                key={`frame-${i}-pid-${occ.pid}`}
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 10,
                  transition: { duration: 0.2 }
                }}
                className={`
                  rounded border-2 ${color.border} ${color.bg} p-1 md:p-1.5
                  cursor-pointer aspect-square flex flex-col items-center justify-center
                  shadow-md ${color.glow}
                  ${isFx ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-background shadow-xl shadow-amber-500/50" : ""}
                `}
              >
                <div className={`text-center ${color.text}`}>
                  <div className="font-mono text-[8px] md:text-[10px] font-bold">P{occ.pid}</div>
                  <div className="font-mono text-[7px] md:text-[9px] opacity-80">F{i}</div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Info sobre animação */}
      {isNewMemory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4 p-2 rounded-lg bg-primary/5 border border-primary/20 text-xs text-center text-primary"
        >
          ✨ Memória inicializada com animação staggered
        </motion.div>
      )}
    </div>
  );
}

