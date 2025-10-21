"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Play, Pause, RotateCcw, SkipForward, Zap, Trophy } from "lucide-react";

interface AlgorithmResult {
  name: string;
  color: string;
  steps: {
    pageNumber: number;
    isHit: boolean;
    framesState: (number | null)[];
    victim: number | null;
    reason: string;
  }[];
  pageFaults: number;
  hits: number;
}

type AlgorithmName = "FIFO" | "LRU" | "Clock" | "Optimal";

export function PageReplacementComparator() {
  const [referenceString, setReferenceString] = useState("7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1");
  const [numFrames, setNumFrames] = useState(3);
  const [results, setResults] = useState<Record<AlgorithmName, AlgorithmResult> | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>("FIFO");

  // Parse reference string
  const parseReferenceString = (str: string): number[] => {
    return str
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= 0);
  };

  // FIFO Algorithm
  const simulateFIFO = useCallback((references: number[], frames: number): AlgorithmResult => {
    const memory: (number | null)[] = Array(frames).fill(null);
    const steps: AlgorithmResult["steps"] = [];
    let pageFaults = 0;
    let hits = 0;
    let nextToReplace = 0;

    for (const page of references) {
      if (memory.includes(page)) {
        hits++;
        steps.push({
          pageNumber: page,
          isHit: true,
          framesState: [...memory],
          victim: null,
          reason: "Página já está na memória",
        });
      } else {
        pageFaults++;
        const victim = memory[nextToReplace];
        memory[nextToReplace] = page;
        steps.push({
          pageNumber: page,
          isHit: false,
          framesState: [...memory],
          victim,
          reason: victim !== null ? `Substituiu página ${victim} (FIFO: primeira a entrar)` : `Carregou no quadro ${nextToReplace}`,
        });
        nextToReplace = (nextToReplace + 1) % frames;
      }
    }

    return {
      name: "FIFO",
      color: "from-red-500 to-orange-500",
      steps,
      pageFaults,
      hits,
    };
  }, []);

  // LRU Algorithm
  const simulateLRU = useCallback((references: number[], frames: number): AlgorithmResult => {
    const memory: (number | null)[] = Array(frames).fill(null);
    const lastUsed: number[] = Array(frames).fill(-1);
    const steps: AlgorithmResult["steps"] = [];
    let pageFaults = 0;
    let hits = 0;
    let timestamp = 0;

    for (const page of references) {
      timestamp++;
      const idx = memory.indexOf(page);

      if (idx !== -1) {
        hits++;
        lastUsed[idx] = timestamp;
        steps.push({
          pageNumber: page,
          isHit: true,
          framesState: [...memory],
          victim: null,
          reason: "Página já está na memória",
        });
      } else {
        pageFaults++;
        let victimIdx = memory.indexOf(null);
        let victim: number | null = null;

        if (victimIdx === -1) {
          // Find LRU
          victimIdx = 0;
          for (let i = 1; i < frames; i++) {
            if (lastUsed[i] < lastUsed[victimIdx]) {
              victimIdx = i;
            }
          }
          victim = memory[victimIdx];
        }

        memory[victimIdx] = page;
        lastUsed[victimIdx] = timestamp;

        steps.push({
          pageNumber: page,
          isHit: false,
          framesState: [...memory],
          victim,
          reason: victim !== null ? `Substituiu página ${victim} (LRU: menos recentemente usada)` : `Carregou no quadro ${victimIdx}`,
        });
      }
    }

    return {
      name: "LRU",
      color: "from-blue-500 to-cyan-500",
      steps,
      pageFaults,
      hits,
    };
  }, []);

  // Clock Algorithm
  const simulateClock = useCallback((references: number[], frames: number): AlgorithmResult => {
    const memory: (number | null)[] = Array(frames).fill(null);
    const refBit: number[] = Array(frames).fill(0);
    const steps: AlgorithmResult["steps"] = [];
    let pageFaults = 0;
    let hits = 0;
    let clockHand = 0;

    for (const page of references) {
      const idx = memory.indexOf(page);

      if (idx !== -1) {
        hits++;
        refBit[idx] = 1;
        steps.push({
          pageNumber: page,
          isHit: true,
          framesState: [...memory],
          victim: null,
          reason: "Página já está na memória (R=1)",
        });
      } else {
        pageFaults++;
        let victimIdx = memory.indexOf(null);
        let victim: number | null = null;

        if (victimIdx === -1) {
          // Clock algorithm
          while (refBit[clockHand] === 1) {
            refBit[clockHand] = 0; // Second chance
            clockHand = (clockHand + 1) % frames;
          }
          victimIdx = clockHand;
          victim = memory[victimIdx];
          clockHand = (clockHand + 1) % frames;
        }

        memory[victimIdx] = page;
        refBit[victimIdx] = 1;

        steps.push({
          pageNumber: page,
          isHit: false,
          framesState: [...memory],
          victim,
          reason: victim !== null ? `Substituiu página ${victim} (Clock: R=0)` : `Carregou no quadro ${victimIdx}`,
        });
      }
    }

    return {
      name: "Clock",
      color: "from-purple-500 to-pink-500",
      steps,
      pageFaults,
      hits,
    };
  }, []);

  // Optimal Algorithm
  const simulateOptimal = useCallback((references: number[], frames: number): AlgorithmResult => {
    const memory: (number | null)[] = Array(frames).fill(null);
    const steps: AlgorithmResult["steps"] = [];
    let pageFaults = 0;
    let hits = 0;

    for (let i = 0; i < references.length; i++) {
      const page = references[i];

      if (memory.includes(page)) {
        hits++;
        steps.push({
          pageNumber: page,
          isHit: true,
          framesState: [...memory],
          victim: null,
          reason: "Página já está na memória",
        });
      } else {
        pageFaults++;
        let victimIdx = memory.indexOf(null);
        let victim: number | null = null;

        if (victimIdx === -1) {
          // Find page used farthest in future
          let farthest = -1;
          for (let j = 0; j < frames; j++) {
            let nextUse = Infinity;
            for (let k = i + 1; k < references.length; k++) {
              if (references[k] === memory[j]) {
                nextUse = k;
                break;
              }
            }
            if (nextUse > farthest) {
              farthest = nextUse;
              victimIdx = j;
            }
          }
          victim = memory[victimIdx];
        }

        memory[victimIdx] = page;

        steps.push({
          pageNumber: page,
          isHit: false,
          framesState: [...memory],
          victim,
          reason: victim !== null ? `Substituiu página ${victim} (Optimal: usada mais tarde)` : `Carregou no quadro ${victimIdx}`,
        });
      }
    }

    return {
      name: "Optimal",
      color: "from-green-500 to-emerald-500",
      steps,
      pageFaults,
      hits,
    };
  }, []);

  // Run all simulations
  const runSimulations = () => {
    const references = parseReferenceString(referenceString);
    if (references.length === 0) {
      toast.error("String de referências inválida!");
      return;
    }

    if (numFrames < 1 || numFrames > 10) {
      toast.error("Número de quadros deve estar entre 1 e 10");
      return;
    }

    const fifo = simulateFIFO(references, numFrames);
    const lru = simulateLRU(references, numFrames);
    const clock = simulateClock(references, numFrames);
    const optimal = simulateOptimal(references, numFrames);

    setResults({
      FIFO: fifo,
      LRU: lru,
      Clock: clock,
      Optimal: optimal,
    });

    setCurrentStep(0);
    setIsPlaying(false);

    // Find winner
    const algorithms = [fifo, lru, clock, optimal];
    const winner = algorithms.reduce((prev, current) => 
      current.pageFaults < prev.pageFaults ? current : prev
    );

    toast.success(`Simulação concluída!`, {
      description: `${winner.name} teve melhor performance com ${winner.pageFaults} page faults`,
    });
  };

  // Controls
  const handlePlay = () => {
    if (!results) {
      runSimulations();
      return;
    }
    if (currentStep >= results.FIFO.steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (results && currentStep < results.FIFO.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isPlaying || !results || currentStep >= results.FIFO.steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, results]);

  // Current step data
  const currentStepData = results ? {
    FIFO: results.FIFO.steps[currentStep],
    LRU: results.LRU.steps[currentStep],
    Clock: results.Clock.steps[currentStep],
    Optimal: results.Optimal.steps[currentStep],
  } : null;

  // Winner calculation
  const winner = useMemo(() => {
    if (!results) return null;
    const algorithms: AlgorithmName[] = ["FIFO", "LRU", "Clock", "Optimal"];
    return algorithms.reduce((prev, current) => 
      results[current].pageFaults < results[prev].pageFaults ? current : prev
    );
  }, [results]);

  return (
    <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-os-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-os-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-os-primary relative z-10">
        Comparador de Algoritmos de Substituição
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Compare FIFO, LRU, Clock e Optimal lado a lado com a mesma string de referências.
      </p>

      <div className="space-y-6 relative z-10">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ref-string-comp">String de Referências</Label>
            <Input
              id="ref-string-comp"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              placeholder="7,0,1,2,0,3,0,4,2,3,0,3,2"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="num-frames-comp">Número de Quadros</Label>
            <Input
              id="num-frames-comp"
              type="number"
              min="1"
              max="10"
              value={numFrames}
              onChange={(e) => setNumFrames(parseInt(e.target.value) || 3)}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap items-center">
          <Button onClick={runSimulations} variant="default">
            <Zap className="size-4 mr-2" /> Simular Todos
          </Button>
          {results && (
            <>
              {isPlaying ? (
                <Button onClick={handlePause} variant="secondary">
                  <Pause className="size-4 mr-2" /> Pausar
                </Button>
              ) : (
                <Button onClick={handlePlay}>
                  <Play className="size-4 mr-2" /> {currentStep === 0 ? "Iniciar" : "Continuar"}
                </Button>
              )}
              <Button onClick={handleNext} variant="outline" disabled={currentStep >= results.FIFO.steps.length - 1}>
                <SkipForward className="size-4 mr-2" /> Próximo
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="size-4 mr-2" /> Reiniciar
              </Button>
              {winner && (
                <Badge variant="outline" className="ml-auto bg-green-500/20 border-green-500/50 text-green-400 flex items-center gap-2">
                  <Trophy className="size-4" />
                  Vencedor: {winner}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["FIFO", "LRU", "Clock", "Optimal"] as AlgorithmName[]).map((algo) => {
                const result = results[algo];
                const totalRefs = result.steps.length;
                const faultRate = (result.pageFaults / totalRefs) * 100;
                const isWinner = algo === winner;

                return (
                  <motion.div
                    key={algo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg border-2 ${
                      isWinner ? "border-green-500 bg-green-500/10" : "border-border bg-background/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{algo}</h4>
                      {isWinner && <Trophy className="size-4 text-green-500" />}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Page Faults:</span>
                        <span className="font-mono font-bold text-red-500">{result.pageFaults}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hits:</span>
                        <span className="font-mono font-bold text-green-500">{result.hits}</span>
                      </div>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Taxa de Faults:</span>
                          <span className="font-mono">{faultRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={100 - faultRate} className="h-2" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Step Information */}
            {currentStepData && (
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    Passo {currentStep + 1} de {results.FIFO.steps.length}
                  </span>
                  <Badge variant="secondary">
                    Acessando: Página {currentStepData.FIFO.pageNumber}
                  </Badge>
                </div>

                <Tabs value={selectedAlgorithm} onValueChange={(v) => setSelectedAlgorithm(v as AlgorithmName)}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="FIFO">FIFO</TabsTrigger>
                    <TabsTrigger value="LRU">LRU</TabsTrigger>
                    <TabsTrigger value="Clock">Clock</TabsTrigger>
                    <TabsTrigger value="Optimal">Optimal</TabsTrigger>
                  </TabsList>
                  {(["FIFO", "LRU", "Clock", "Optimal"] as AlgorithmName[]).map((algo) => (
                    <TabsContent key={algo} value={algo} className="space-y-4">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${algo}-${currentStep}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-sm font-medium ${
                            currentStepData[algo].isHit ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {currentStepData[algo].isHit ? "✅ HIT" : "❌ PAGE FAULT"}: {currentStepData[algo].reason}
                        </motion.p>
                      </AnimatePresence>

                      {/* Memory Visualization */}
                      <div className="flex justify-center gap-3">
                        <AnimatePresence mode="popLayout">
                          {currentStepData[algo].framesState.map((page, frameIdx) => (
                            <motion.div
                              key={`${algo}-${frameIdx}`}
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                y: page === currentStepData[algo].pageNumber ? -10 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center ${
                                page === null
                                  ? "bg-muted/30 border-border"
                                  : page === currentStepData[algo].pageNumber
                                  ? `bg-gradient-to-br ${results[algo].color}/30 border-${algo === "FIFO" ? "red" : algo === "LRU" ? "blue" : algo === "Clock" ? "purple" : "green"}-500 shadow-lg`
                                  : "bg-cyan-500/20 border-cyan-500/50"
                              }`}
                            >
                              <span className="text-xs text-muted-foreground mb-1">Q{frameIdx}</span>
                              {page !== null ? (
                                <motion.span
                                  initial={{ scale: 0.5 }}
                                  animate={{ scale: 1 }}
                                  className="text-xl font-bold text-foreground"
                                >
                                  {page}
                                </motion.span>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground text-sm">Timeline de Acessos</h4>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {results.FIFO.steps.map((step, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`flex-shrink-0 w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                      idx === currentStep
                        ? "bg-os-primary/30 border-os-primary scale-110 shadow-lg"
                        : idx < currentStep
                        ? step.isHit
                          ? "bg-green-500/20 border-green-500/50"
                          : "bg-red-500/20 border-red-500/50"
                        : "bg-muted/30 border-border"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.pageNumber}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

