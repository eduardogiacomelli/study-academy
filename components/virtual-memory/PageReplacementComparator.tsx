"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Trophy, TrendingDown, Zap } from "lucide-react";
import toast from "react-hot-toast";

// Algoritmos de substituição de página
type Algorithm = "FIFO" | "LRU" | "OPTIMAL" | "CLOCK" | "LFU" | "NRU" | "SECOND_CHANCE";

interface PageFrame {
  pageId: number | null;
  loadTime: number;
  lastAccess: number;
  accessCount: number;
  referenceBit: number;
  modifyBit: number;
}

interface AlgorithmStats {
  name: string;
  pageFaults: number;
  hits: number;
  hitRate: number;
  frames: PageFrame[];
  history: number[][];
}

interface AccessRequest {
  pageId: number;
  isWrite: boolean;
}

export function PageReplacementComparator() {
  const [numFrames, setNumFrames] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithms, setAlgorithms] = useState<Map<Algorithm, AlgorithmStats>>(new Map());
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>(["FIFO", "LRU", "OPTIMAL"]);

  // Sequência de acesso às páginas (com padrões realistas)
  const accessSequence: AccessRequest[] = useMemo(() => [
    // Fase 1: Loop local (localidade forte)
    ...Array(5).fill(null).flatMap(() => [
      { pageId: 0, isWrite: false },
      { pageId: 1, isWrite: false },
      { pageId: 2, isWrite: true },
      { pageId: 0, isWrite: false }
    ]),
    // Fase 2: Sequencial
    ...Array.from({ length: 8 }, (_, i) => ({ pageId: i + 3, isWrite: i % 2 === 0 })),
    // Fase 3: Random (teste difícil)
    { pageId: 15, isWrite: false },
    { pageId: 2, isWrite: true },
    { pageId: 12, isWrite: false },
    { pageId: 8, isWrite: false },
    { pageId: 2, isWrite: false },
    { pageId: 9, isWrite: true },
    // Fase 4: Belády's Anomaly demonstration
    { pageId: 1, isWrite: false },
    { pageId: 2, isWrite: false },
    { pageId: 3, isWrite: false },
    { pageId: 4, isWrite: false },
    { pageId: 1, isWrite: false },
    { pageId: 2, isWrite: false },
    { pageId: 5, isWrite: false },
    { pageId: 1, isWrite: false },
    { pageId: 2, isWrite: false },
    { pageId: 3, isWrite: false },
    { pageId: 4, isWrite: false },
    { pageId: 5, isWrite: false }
  ], []);

  // Inicializar algoritmos
  useEffect(() => {
    reset();
  }, [numFrames, selectedAlgorithms]);

  const reset = () => {
    const newAlgorithms = new Map<Algorithm, AlgorithmStats>();
    
    selectedAlgorithms.forEach(alg => {
      newAlgorithms.set(alg, {
        name: getAlgorithmName(alg),
        pageFaults: 0,
        hits: 0,
        hitRate: 0,
        frames: Array(numFrames).fill(null).map(() => ({
          pageId: null,
          loadTime: -1,
          lastAccess: -1,
          accessCount: 0,
          referenceBit: 0,
          modifyBit: 0
        })),
        history: []
      });
    });

    setAlgorithms(newAlgorithms);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getAlgorithmName = (alg: Algorithm): string => {
    const names = {
      FIFO: "FIFO (First-In-First-Out)",
      LRU: "LRU (Least Recently Used)",
      OPTIMAL: "Optimal (Belády)",
      CLOCK: "Clock (Second Chance)",
      LFU: "LFU (Least Frequently Used)",
      NRU: "NRU (Not Recently Used)",
      SECOND_CHANCE: "Second Chance"
    };
    return names[alg];
  };

  // Executar um passo da simulação
  const executeStep = () => {
    if (currentStep >= accessSequence.length) {
      setIsPlaying(false);
      toast.success("Simulação completa!");
      return;
    }

    const request = accessSequence[currentStep];
    const newAlgorithms = new Map(algorithms);

    selectedAlgorithms.forEach(alg => {
      const stats = newAlgorithms.get(alg)!;
      const frameIndex = stats.frames.findIndex(f => f.pageId === request.pageId);

      if (frameIndex !== -1) {
        // HIT
        stats.hits++;
        updateFrameOnHit(stats.frames[frameIndex], currentStep, request.isWrite);
      } else {
        // MISS (Page Fault)
        stats.pageFaults++;
        const victimIndex = selectVictim(alg, stats.frames, currentStep, accessSequence, request.pageId);
        replaceFrame(stats.frames[victimIndex], request.pageId, currentStep, request.isWrite);
      }

      stats.hitRate = (stats.hits / (currentStep + 1)) * 100;
      stats.history.push(stats.frames.map(f => f.pageId ?? -1));
    });

    setAlgorithms(newAlgorithms);
    setCurrentStep(prev => prev + 1);
  };

  const updateFrameOnHit = (frame: PageFrame, time: number, isWrite: boolean) => {
    frame.lastAccess = time;
    frame.accessCount++;
    frame.referenceBit = 1;
    if (isWrite) frame.modifyBit = 1;
  };

  const replaceFrame = (frame: PageFrame, pageId: number, time: number, isWrite: boolean) => {
    frame.pageId = pageId;
    frame.loadTime = time;
    frame.lastAccess = time;
    frame.accessCount = 1;
    frame.referenceBit = 1;
    frame.modifyBit = isWrite ? 1 : 0;
  };

  // Selecionar vítima baseado no algoritmo
  const selectVictim = (
    algorithm: Algorithm,
    frames: PageFrame[],
    currentTime: number,
    sequence: AccessRequest[],
    requestedPage: number
  ): number => {
    // Primeiro, verificar se há frame vazio
    const emptyIndex = frames.findIndex(f => f.pageId === null);
    if (emptyIndex !== -1) return emptyIndex;

    switch (algorithm) {
      case "FIFO":
        return selectFIFO(frames);
      
      case "LRU":
        return selectLRU(frames);
      
      case "OPTIMAL":
        return selectOptimal(frames, sequence, currentTime);
      
      case "CLOCK":
      case "SECOND_CHANCE":
        return selectClock(frames);
      
      case "LFU":
        return selectLFU(frames);
      
      case "NRU":
        return selectNRU(frames);
      
      default:
        return 0;
    }
  };

  const selectFIFO = (frames: PageFrame[]): number => {
    let oldestIndex = 0;
    let oldestTime = frames[0].loadTime;

    frames.forEach((frame, idx) => {
      if (frame.loadTime < oldestTime) {
        oldestTime = frame.loadTime;
        oldestIndex = idx;
      }
    });

    return oldestIndex;
  };

  const selectLRU = (frames: PageFrame[]): number => {
    let lruIndex = 0;
    let lruTime = frames[0].lastAccess;

    frames.forEach((frame, idx) => {
      if (frame.lastAccess < lruTime) {
        lruTime = frame.lastAccess;
        lruIndex = idx;
      }
    });

    return lruIndex;
  };

  const selectOptimal = (frames: PageFrame[], sequence: AccessRequest[], currentTime: number): number => {
    let victimIndex = 0;
    let farthestUse = -1;

    frames.forEach((frame, idx) => {
      // Procurar próximo uso desta página
      let nextUse = Infinity;
      for (let i = currentTime + 1; i < sequence.length; i++) {
        if (sequence[i].pageId === frame.pageId) {
          nextUse = i;
          break;
        }
      }

      if (nextUse > farthestUse) {
        farthestUse = nextUse;
        victimIndex = idx;
      }
    });

    return victimIndex;
  };

  const selectClock = (frames: PageFrame[]): number => {
    // Implementação simplificada do Clock
    for (let i = 0; i < frames.length * 2; i++) {
      const idx = i % frames.length;
      if (frames[idx].referenceBit === 0) {
        return idx;
      }
      frames[idx].referenceBit = 0; // Segunda chance
    }
    return 0; // Fallback
  };

  const selectLFU = (frames: PageFrame[]): number => {
    let lfuIndex = 0;
    let minCount = frames[0].accessCount;

    frames.forEach((frame, idx) => {
      if (frame.accessCount < minCount) {
        minCount = frame.accessCount;
        lfuIndex = idx;
      }
    });

    return lfuIndex;
  };

  const selectNRU = (frames: PageFrame[]): number => {
    // NRU: 4 classes baseadas em R e M bits
    // Classe 0: R=0, M=0 (não referenciada, não modificada) - melhor
    // Classe 1: R=0, M=1 (não referenciada, modificada)
    // Classe 2: R=1, M=0 (referenciada, não modificada)
    // Classe 3: R=1, M=1 (referenciada, modificada) - pior

    const classes: number[][] = [[], [], [], []];
    
    frames.forEach((frame, idx) => {
      const classNum = frame.referenceBit * 2 + frame.modifyBit;
      classes[classNum].push(idx);
    });

    // Selecionar da classe mais baixa disponível
    for (let i = 0; i < 4; i++) {
      if (classes[i].length > 0) {
        return classes[i][0];
      }
    }

    return 0; // Fallback
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      executeStep();
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const winner = useMemo(() => {
    if (currentStep === 0) return null;
    
    let minFaults = Infinity;
    let winnerAlg: Algorithm | null = null;

    algorithms.forEach((stats, alg) => {
      if (stats.pageFaults < minFaults) {
        minFaults = stats.pageFaults;
        winnerAlg = alg;
      }
    });

    return winnerAlg;
  }, [algorithms, currentStep]);

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Comparador de Algoritmos de Substituição
            </h3>
            <p className="text-slate-400">
              Comparação visual e estatística de {selectedAlgorithms.length} algoritmos
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-indigo-500 hover:bg-indigo-600"
              disabled={currentStep >= accessSequence.length}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {currentStep === 0 ? "Iniciar" : "Continuar"}
                </>
              )}
            </Button>
            
            <Button onClick={reset} variant="outline" className="border-slate-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="text-sm text-slate-400 mr-3">Frames:</span>
            <div className="inline-flex gap-2">
              {[3, 4, 5, 6].map(n => (
                <Button
                  key={n}
                  size="sm"
                  variant={numFrames === n ? "default" : "outline"}
                  onClick={() => {
                    setNumFrames(n);
                    reset();
                  }}
                  className={numFrames === n ? "bg-indigo-500" : ""}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <Badge variant="outline" className="text-sm">
              Passo: {currentStep} / {accessSequence.length}
            </Badge>
            {currentStep < accessSequence.length && (
              <Badge className="ml-2 bg-yellow-500">
                Próxima página: {accessSequence[currentStep].pageId}
                {accessSequence[currentStep].isWrite && " (Write)"}
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Comparação dos algoritmos */}
      <Tabs defaultValue={selectedAlgorithms[0]} className="space-y-6">
        <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
          {selectedAlgorithms.map(alg => {
            const stats = algorithms.get(alg);
            const isWinner = winner === alg && currentStep > 0;
            
            return (
              <TabsTrigger
                key={alg}
                value={alg}
                className={`data-[state=active]:bg-indigo-500 ${isWinner ? 'ring-2 ring-yellow-500' : ''}`}
              >
                {isWinner && <Trophy className="w-4 h-4 mr-2 text-yellow-400" />}
                {getAlgorithmName(alg).split(" ")[0]}
                {stats && (
                  <Badge className="ml-2 bg-slate-700">
                    PF: {stats.pageFaults}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {selectedAlgorithms.map(alg => {
          const stats = algorithms.get(alg);
          if (!stats) return null;

          return (
            <TabsContent key={alg} value={alg} className="space-y-6">
              {/* Estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-red-950/30 backdrop-blur-sm border-red-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-slate-400">Page Faults</span>
                  </div>
                  <div className="text-3xl font-bold text-red-400">
                    {stats.pageFaults}
                  </div>
                </Card>

                <Card className="bg-green-950/30 backdrop-blur-sm border-green-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400">Hits</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400">
                    {stats.hits}
                  </div>
                </Card>

                <Card className="bg-blue-950/30 backdrop-blur-sm border-blue-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-400">Hit Rate</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {stats.hitRate.toFixed(1)}%
                  </div>
                </Card>

                <Card className="bg-purple-950/30 backdrop-blur-sm border-purple-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-400">Eficiência</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-400">
                    {currentStep > 0 ? ((1 - stats.pageFaults / currentStep) * 100).toFixed(1) : "0"}%
                  </div>
                </Card>
              </div>

              {/* Estado atual dos frames */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Estado Atual dos Frames</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.frames.map((frame, idx) => (
                    <Card
                      key={idx}
                      className={`p-4 ${
                        frame.pageId === null
                          ? "bg-slate-800/50 border-slate-600/20"
                          : "bg-indigo-950/50 border-indigo-500/30"
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-2">Frame {idx}</div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {frame.pageId !== null ? `P${frame.pageId}` : "Empty"}
                      </div>
                      {frame.pageId !== null && (
                        <div className="space-y-1 text-xs text-slate-400">
                          <div>Load: t={frame.loadTime}</div>
                          <div>Last: t={frame.lastAccess}</div>
                          <div>Count: {frame.accessCount}</div>
                          <div className="flex gap-2 mt-2">
                            <Badge className={frame.referenceBit ? "bg-green-500" : "bg-slate-600"}>
                              R={frame.referenceBit}
                            </Badge>
                            <Badge className={frame.modifyBit ? "bg-yellow-500" : "bg-slate-600"}>
                              M={frame.modifyBit}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>

              {/* História (últimos 10 passos) */}
              {stats.history.length > 0 && (
                <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">História (últimos 10 passos)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left text-slate-400 p-2">Passo</th>
                          {stats.frames.map((_, idx) => (
                            <th key={idx} className="text-center text-slate-400 p-2">
                              Frame {idx}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {stats.history.slice(-10).map((snapshot, step) => (
                          <tr key={step} className="border-b border-slate-800/50">
                            <td className="text-slate-400 p-2">{stats.history.length - 10 + step}</td>
                            {snapshot.map((pageId, frameIdx) => (
                              <td key={frameIdx} className="text-center p-2">
                                <Badge
                                  className={
                                    pageId === -1
                                      ? "bg-slate-700"
                                      : "bg-indigo-500"
                                  }
                                >
                                  {pageId === -1 ? "-" : `P${pageId}`}
                                </Badge>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Ranking final */}
      {currentStep > 0 && (
        <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-sm border-indigo-500/20 p-6">
          <h4 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Ranking de Performance
          </h4>
          
          <div className="space-y-3">
            {Array.from(algorithms.entries())
              .sort(([, a], [, b]) => a.pageFaults - b.pageFaults)
              .map(([alg, stats], idx) => (
                <div
                  key={alg}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    idx === 0
                      ? "bg-yellow-500/20 border-2 border-yellow-500/50"
                      : "bg-slate-800/30 border border-slate-700/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-2xl font-bold ${
                        idx === 0 ? "text-yellow-400" : "text-slate-400"
                      }`}
                    >
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{stats.name}</div>
                      <div className="text-sm text-slate-400">
                        Hit Rate: {stats.hitRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Page Faults</div>
                      <div className="text-xl font-bold text-red-400">{stats.pageFaults}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Hits</div>
                      <div className="text-xl font-bold text-green-400">{stats.hits}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
}

