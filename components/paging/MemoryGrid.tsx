"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePagingStore } from "@/store/paging.store";
import { Zap } from "lucide-react";

// Gera cor consistente baseada no PID
function getPidColor(pid: number) {
  const colors = [
    { bg: "bg-blue-500", border: "border-blue-600", text: "text-blue-950 dark:text-blue-50", label: "Blue" },
    { bg: "bg-green-500", border: "border-green-600", text: "text-green-950 dark:text-green-50", label: "Green" },
    { bg: "bg-purple-500", border: "border-purple-600", text: "text-purple-950 dark:text-purple-50", label: "Purple" },
    { bg: "bg-orange-500", border: "border-orange-600", text: "text-orange-950 dark:text-orange-50", label: "Orange" },
    { bg: "bg-pink-500", border: "border-pink-600", text: "text-pink-950 dark:text-pink-50", label: "Pink" },
    { bg: "bg-cyan-500", border: "border-cyan-600", text: "text-cyan-950 dark:text-cyan-50", label: "Cyan" },
    { bg: "bg-amber-500", border: "border-amber-600", text: "text-amber-950 dark:text-amber-50", label: "Amber" },
    { bg: "bg-emerald-500", border: "border-emerald-600", text: "text-emerald-950 dark:text-emerald-50", label: "Emerald" },
  ];
  return colors[pid % colors.length];
}

export function MemoryGrid() {
  const frameOccupancy = usePagingStore((s) => s.frameOccupancy);
  const processes = usePagingStore((s) => s.processes);
  const lastEvent = usePagingStore((s) => s.lastEvent);
  const mmuFocus = usePagingStore((s) => s.mmuFocusFrame);

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

  // Legenda de processos ativos
  const activeProcesses = useMemo(() => Object.values(processes), [processes]);

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-background to-secondary/5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Zap className="size-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Memória Física</h3>
            <p className="text-xs text-muted-foreground">Grid de quadros</p>
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
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Utilização da memória</span>
          <span className="font-mono font-bold">{100 - freePercent}% usado</span>
        </div>
        <Progress value={100 - freePercent} className="h-2" />
      </div>

      {/* Legenda de Processos */}
      {activeProcesses.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-secondary/10 border">
          <span className="text-xs font-semibold text-muted-foreground">Processos:</span>
          {activeProcesses.map((proc) => {
            const color = getPidColor(proc.pid);
            return (
              <div key={proc.pid} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded ${color.bg} border-2 ${color.border}`} />
                <span className="text-xs font-mono">
                  PID {proc.pid}
                </span>
              </div>
            );
          })}
          <div className="h-4 w-px bg-border mx-1" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-muted border-2 border-border" />
            <span className="text-xs">Livre</span>
          </div>
        </div>
      )}

      {/* Grid - SUPER SIMPLIFICADO */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {frameOccupancy.map((occ, i) => {
          const used = occ !== null;
          const isFx = highlight.has(i);
          
          if (!used) {
            // Frame livre - cinza simples
            return (
              <div
                key={i}
                className={`
                  rounded border-2 border-border bg-muted p-1.5 text-center
                  ${isFx ? "ring-2 ring-amber-500 ring-offset-1 ring-offset-background" : ""}
                `}
              >
                <span className="font-mono text-[10px] text-muted-foreground">F{i}</span>
              </div>
            );
          }

          // Frame ocupado - cor do processo
          const color = getPidColor(occ.pid);
          return (
            <div
              key={i}
              className={`
                rounded border-2 ${color.border} ${color.bg} p-1.5
                ${isFx ? "ring-2 ring-amber-500 ring-offset-1 ring-offset-background" : ""}
              `}
            >
              <div className={`text-center ${color.text}`}>
                <div className="font-mono text-[10px] font-bold">P{occ.pid}</div>
                <div className="font-mono text-[9px] opacity-80">F{i}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

