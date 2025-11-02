"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/bytes";
import { Trash2, Activity, FileText } from "lucide-react";
import { toast } from "sonner";
import { usePagingStore } from "@/store/paging.store";

// Mesmas cores do MemoryGrid
function getPidColor(pid: number) {
  const colors = [
    { bg: "bg-blue-500", border: "border-blue-600", text: "text-blue-950 dark:text-blue-50" },
    { bg: "bg-green-500", border: "border-green-600", text: "text-green-950 dark:text-green-50" },
    { bg: "bg-purple-500", border: "border-purple-600", text: "text-purple-950 dark:text-purple-50" },
    { bg: "bg-orange-500", border: "border-orange-600", text: "text-orange-950 dark:text-orange-50" },
    { bg: "bg-pink-500", border: "border-pink-600", text: "text-pink-950 dark:text-pink-50" },
    { bg: "bg-cyan-500", border: "border-cyan-600", text: "text-cyan-950 dark:text-cyan-50" },
    { bg: "bg-amber-500", border: "border-amber-600", text: "text-amber-950 dark:text-amber-50" },
    { bg: "bg-emerald-500", border: "border-emerald-600", text: "text-emerald-950 dark:text-emerald-50" },
  ];
  return colors[pid % colors.length];
}

export function ProcessList() {
  const processes = usePagingStore((s) => s.processes);
  const removeProcess = usePagingStore((s) => s.removeProcess);

  const list = Object.values(processes).sort((a, b) => a.pid - b.pid);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/5 border-2">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Activity className="size-4 text-primary" />
            </div>
            <h3 className="font-semibold">Processos Ativos</h3>
          </div>
          <Badge variant="secondary" className="font-mono">{list.length}</Badge>
        </div>

        {/* Lista */}
        <AnimatePresence mode="popLayout">
          {list.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-3">
                <FileText className="size-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Nenhum processo ativo
              </p>
            </motion.div>
          ) : (
            <ul className="space-y-2">
              {list.map((p, idx) => {
                const color = getPidColor(p.pid);
                return (
                  <motion.li
                    key={p.pid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-background to-secondary/5 p-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.2s' }} />
                      
                      <div className="relative flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${color.bg} ${color.text} border-2 ${color.border}`}>
                            PID {p.pid}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{formatBytes(p.sizeBytes)}</span>
                            <span className="text-xs text-muted-foreground">{p.pagesCount} páginas</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            removeProcess(p.pid);
                            toast.success(`Processo ${p.pid} removido`);
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

