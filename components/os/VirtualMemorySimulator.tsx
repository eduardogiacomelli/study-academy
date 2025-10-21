"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Play, RotateCcw, Plus, AlertCircle, CheckCircle2, HardDrive, Cpu } from "lucide-react";
import { ValidatedInput } from "@/components/shared/ValidatedInput";

interface PageTableEntry {
  virtualPage: number;
  physicalFrame: number | null;
  present: boolean;
  modified: boolean;
  referenced: boolean;
}

interface PageFaultEvent {
  time: number;
  virtualPage: number;
  action: "load" | "evict";
  frameNumber: number;
}

export function VirtualMemorySimulator() {
  const [numPages, setNumPages] = useState(8);
  const [numFrames, setNumFrames] = useState(4);
  const [pageTable, setPageTable] = useState<PageTableEntry[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [pageSize, setPageSize] = useState(4096); // 4 KB
  const [events, setEvents] = useState<PageFaultEvent[]>([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [totalAccesses, setTotalAccesses] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize page table
  const initializePageTable = useCallback(() => {
    const table: PageTableEntry[] = [];
    for (let i = 0; i < numPages; i++) {
      // Initially, only first few pages are loaded
      const isLoaded = i < Math.min(numFrames, 2);
      table.push({
        virtualPage: i,
        physicalFrame: isLoaded ? i : null,
        present: isLoaded,
        modified: false,
        referenced: false,
      });
    }
    setPageTable(table);
    setEvents([]);
    setPageFaults(0);
    setTotalAccesses(0);
    setInitialized(true);
    if (initialized) {
      toast.success("Tabela de páginas inicializada!");
    }
  }, [numPages, numFrames, initialized]);


  // Find free frame or select victim
  const findFreeFrame = useCallback((): number => {
    const usedFrames = pageTable
      .filter(entry => entry.present && entry.physicalFrame !== null)
      .map(entry => entry.physicalFrame as number);
    
    for (let i = 0; i < numFrames; i++) {
      if (!usedFrames.includes(i)) {
        return i;
      }
    }
    
    // No free frame - use FIFO for simplicity (first present page)
    const victim = pageTable.find(entry => entry.present);
    return victim?.physicalFrame ?? 0;
  }, [pageTable, numFrames]);

  // Handle page fault
  const handlePageFault = useCallback((virtualPage: number) => {
    setPageFaults(prev => prev + 1);
    
    const freeFrame = findFreeFrame();
    
    // Check if we need to evict
    const victimPage = pageTable.find(
      entry => entry.present && entry.physicalFrame === freeFrame
    );
    
    if (victimPage) {
      // Evict victim
      setEvents(prev => [
        ...prev,
        {
          time: Date.now(),
          virtualPage: victimPage.virtualPage,
          action: "evict",
          frameNumber: freeFrame,
        },
      ]);
      
      // Update page table - evict victim
      setPageTable(prev =>
        prev.map(entry =>
          entry.virtualPage === victimPage.virtualPage
            ? { ...entry, present: false, physicalFrame: null }
            : entry
        )
      );
      
      toast.warning(`Página ${victimPage.virtualPage} removida do quadro ${freeFrame}`);
    }
    
    // Load new page
    setTimeout(() => {
      setPageTable(prev =>
        prev.map(entry =>
          entry.virtualPage === virtualPage
            ? {
                ...entry,
                present: true,
                physicalFrame: freeFrame,
                referenced: true,
              }
            : entry
        )
      );
      
      setEvents(prev => [
        ...prev,
        {
          time: Date.now(),
          virtualPage,
          action: "load",
          frameNumber: freeFrame,
        },
      ]);
      
      toast.success(`Página ${virtualPage} carregada no quadro ${freeFrame}`);
    }, victimPage ? 300 : 0);
  }, [pageTable, findFreeFrame]);

  // Access memory address
  const accessAddress = useCallback((address: number) => {
    const virtualPage = Math.floor(address / pageSize);
    const offset = address % pageSize;
    
    if (virtualPage >= numPages || virtualPage < 0) {
      toast.error(`Endereço inválido! Página ${virtualPage} não existe.`);
      return;
    }
    
    setTotalAccesses(prev => prev + 1);
    setIsAnimating(true);
    
    const entry = pageTable[virtualPage];
    
    if (!entry.present) {
      // PAGE FAULT!
      toast.error(`⚠️ PAGE FAULT! Página ${virtualPage} não está na memória.`, {
        description: "Carregando do disco...",
      });
      handlePageFault(virtualPage);
    } else {
      // Page hit
      setPageTable(prev =>
        prev.map(e =>
          e.virtualPage === virtualPage ? { ...e, referenced: true } : e
        )
      );
      
      const physicalAddress = (entry.physicalFrame! * pageSize) + offset;
      toast.success(`✅ HIT! Página ${virtualPage} → Quadro ${entry.physicalFrame}`, {
        description: `Endereço físico: 0x${physicalAddress.toString(16).toUpperCase()}`,
      });
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [pageTable, pageSize, numPages, handlePageFault]);

  // Handle manual address input
  const handleAccessClick = () => {
    const address = parseInt(currentAddress);
    if (isNaN(address) || address < 0) {
      toast.error("Endereço inválido! Digite um número válido.");
      return;
    }
    accessAddress(address);
  };

  // Generate random access pattern
  const generateRandomAccess = () => {
    const randomAddress = Math.floor(Math.random() * (numPages * pageSize));
    setCurrentAddress(randomAddress.toString());
    accessAddress(randomAddress);
  };

  // Calculate metrics
  const pageFaultRate = totalAccesses > 0 ? (pageFaults / totalAccesses) * 100 : 0;
  const hitRate = 100 - pageFaultRate;

  // Initialize on mount
  useEffect(() => {
    if (!initialized) {
      initializePageTable();
    }
  }, [initialized, initializePageTable]);

  return (
    <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-os-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-os-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-os-primary relative z-10">
        Simulador de Memória Virtual (Demand Paging)
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Acesse endereços virtuais e observe os page faults em ação. Páginas são carregadas sob demanda.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="num-pages">Número de Páginas Virtuais</Label>
            <Input
              id="num-pages"
              type="number"
              min="4"
              max="16"
              value={numPages}
              onChange={(e) => setNumPages(parseInt(e.target.value) || 8)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="num-frames">Quadros Físicos (RAM)</Label>
            <Input
              id="num-frames"
              type="number"
              min="2"
              max="8"
              value={numFrames}
              onChange={(e) => setNumFrames(parseInt(e.target.value) || 4)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="page-size">Tamanho da Página (bytes)</Label>
            <Input
              id="page-size"
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value) || 4096)}
              className="w-full"
            />
          </div>

          <Button onClick={initializePageTable} className="w-full" variant="outline">
            <RotateCcw className="size-4 mr-2" /> Reinicializar
          </Button>

          <div className="space-y-2 pt-4 border-t border-border">
            <Label htmlFor="address-input">Endereço Virtual (decimal)</Label>
            <div className="flex gap-2">
              <Input
                id="address-input"
                type="number"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                placeholder="Ex: 8192"
                className="flex-1"
              />
              <Button onClick={handleAccessClick} size="icon">
                <Play className="size-4" />
              </Button>
            </div>
          </div>

          <Button onClick={generateRandomAccess} className="w-full" variant="secondary">
            <Plus className="size-4 mr-2" /> Acesso Aleatório
          </Button>

          {/* Metrics */}
          <div className="p-4 bg-background/50 rounded-lg space-y-3 mt-6">
            <h4 className="font-semibold text-foreground">Métricas</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de Acessos:</span>
                <span className="font-mono font-semibold">{totalAccesses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Page Faults:</span>
                <span className="font-mono font-semibold text-red-500">{pageFaults}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Hit Rate:</span>
                  <span className="font-mono text-green-500">{hitRate.toFixed(1)}%</span>
                </div>
                <Progress value={hitRate} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Page Fault Rate:</span>
                  <span className="font-mono text-red-500">{pageFaultRate.toFixed(1)}%</span>
                </div>
                <Progress value={pageFaultRate} className="h-2 bg-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Table Visualization */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Cpu className="size-5 text-os-primary" />
              Tabela de Páginas
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <AnimatePresence mode="popLayout">
                {pageTable.map((entry) => (
                  <motion.div
                    key={entry.virtualPage}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: isAnimating && entry.referenced ? -5 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      entry.present
                        ? "bg-green-500/20 border-green-500/50"
                        : "bg-gray-500/20 border-gray-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-foreground">
                        VP {entry.virtualPage}
                      </span>
                      {entry.present ? (
                        <CheckCircle2 className="size-3 text-green-500" />
                      ) : (
                        <AlertCircle className="size-3 text-gray-500" />
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      {entry.present ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Frame:</span>
                            <span className="font-mono font-semibold">
                              {entry.physicalFrame}
                            </span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {entry.modified && (
                              <Badge variant="secondary" className="text-xs px-1 py-0 bg-yellow-500/20 text-yellow-400">
                                M
                              </Badge>
                            )}
                            {entry.referenced && (
                              <Badge variant="secondary" className="text-xs px-1 py-0 bg-blue-500/20 text-blue-400">
                                R
                              </Badge>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <HardDrive className="size-3" />
                          <span>Em disco</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Physical Memory (Frames) */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Memória Física (RAM)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Array.from({ length: numFrames }).map((_, frameIdx) => {
                const occupyingPage = pageTable.find(
                  entry => entry.present && entry.physicalFrame === frameIdx
                );
                
                return (
                  <motion.div
                    key={frameIdx}
                    layout
                    className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center min-h-[80px] ${
                      occupyingPage
                        ? "bg-cyan-500/20 border-cyan-500/50"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <span className="text-xs font-semibold text-muted-foreground mb-1">
                      Frame {frameIdx}
                    </span>
                    {occupyingPage ? (
                      <span className="text-lg font-bold text-cyan-400">
                        P{occupyingPage.virtualPage}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Livre</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Event Log */}
          {events.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Log de Eventos</h4>
              <div className="max-h-40 overflow-y-auto bg-background/50 rounded-lg p-3 space-y-1">
                <AnimatePresence mode="popLayout">
                  {events.slice(-10).reverse().map((event, idx) => (
                    <motion.div
                      key={`${event.time}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`text-xs p-2 rounded ${
                        event.action === "load"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {event.action === "load" ? "📥" : "📤"} Página {event.virtualPage} {event.action === "load" ? "carregada em" : "removida de"} Quadro {event.frameNumber}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 relative z-10">
        <p className="text-sm text-blue-300">
          💡 <strong>Dica:</strong> Observe como as páginas são carregadas apenas quando acessadas (demand paging). 
          Se não houver quadros livres, uma página será removida (evicted) usando FIFO.
        </p>
      </div>
    </Card>
  );
}

