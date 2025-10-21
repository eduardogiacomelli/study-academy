"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Play, Pause, RotateCcw, SkipForward, Zap } from "lucide-react";

interface AccessStep {
  pageNumber: number;
  isHit: boolean;
  framesState: (number | null)[];
  message: string;
}

export function PageFaultVisualizer() {
  const [referenceString, setReferenceString] = useState("7,0,1,2,0,3,0,4,2,3,0,3,2");
  const [numFrames, setNumFrames] = useState(3);
  const [steps, setSteps] = useState<AccessStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1000); // ms per step

  // Parse reference string
  const parseReferenceString = (str: string): number[] => {
    return str
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= 0);
  };

  // Simulate page faults using FIFO
  const simulatePageFaults = useCallback(() => {
    const references = parseReferenceString(referenceString);
    if (references.length === 0) {
      toast.error("String de referências inválida!");
      return;
    }

    const frames: (number | null)[] = Array(numFrames).fill(null);
    const simulatedSteps: AccessStep[] = [];
    const fifoQueue: number[] = [];

    for (const pageNum of references) {
      let isHit = false;
      let message = "";

      // Check if page is already in memory
      if (frames.includes(pageNum)) {
        isHit = true;
        message = `✅ HIT: Página ${pageNum} já está na memória`;
      } else {
        // Page fault
        if (frames.includes(null)) {
          // There's a free frame
          const freeIdx = frames.indexOf(null);
          frames[freeIdx] = pageNum;
          fifoQueue.push(pageNum);
          message = `📥 PAGE FAULT: Página ${pageNum} carregada no quadro ${freeIdx}`;
        } else {
          // Need to replace - use FIFO
          const victim = fifoQueue.shift()!;
          const victimIdx = frames.indexOf(victim);
          frames[victimIdx] = pageNum;
          fifoQueue.push(pageNum);
          message = `🔄 PAGE FAULT: Página ${pageNum} substitui página ${victim} no quadro ${victimIdx}`;
        }
      }

      simulatedSteps.push({
        pageNumber: pageNum,
        isHit,
        framesState: [...frames],
        message,
      });
    }

    setSteps(simulatedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    
    const totalFaults = simulatedSteps.filter(s => !s.isHit).length;
    const faultRate = (totalFaults / simulatedSteps.length) * 100;
    
    toast.success(`Simulação concluída!`, {
      description: `${totalFaults} page faults em ${simulatedSteps.length} acessos (${faultRate.toFixed(1)}%)`,
    });
  }, [referenceString, numFrames]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, playSpeed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, playSpeed]);

  // Controls
  const handlePlay = () => {
    if (steps.length === 0) {
      simulatePageFaults();
    }
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentStepData = steps[currentStep];
  const totalFaults = steps.slice(0, currentStep + 1).filter(s => !s.isHit).length;
  const totalAccesses = currentStep + 1;
  const faultRate = totalAccesses > 0 ? (totalFaults / totalAccesses) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden border-purple-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-purple-400 relative z-10">
        Visualizador de Page Faults (FIFO)
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Observe a ocorrência de page faults em tempo real conforme as páginas são acessadas.
      </p>

      <div className="space-y-6 relative z-10">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ref-string">String de Referências (separadas por vírgula ou espaço)</Label>
            <Input
              id="ref-string"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              placeholder="7,0,1,2,0,3,0,4,2,3,0,3,2"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="num-frames-viz">Número de Quadros</Label>
            <Input
              id="num-frames-viz"
              type="number"
              min="1"
              max="8"
              value={numFrames}
              onChange={(e) => setNumFrames(parseInt(e.target.value) || 3)}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap items-center">
          <Button onClick={simulatePageFaults} variant="outline">
            <Zap className="size-4 mr-2" /> Simular
          </Button>
          {steps.length > 0 && (
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
              <Button onClick={handleNext} variant="outline" disabled={currentStep >= steps.length - 1}>
                <SkipForward className="size-4 mr-2" /> Próximo
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="size-4 mr-2" /> Reiniciar
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <Label htmlFor="speed" className="text-sm">Velocidade:</Label>
                <Input
                  id="speed"
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(parseInt(e.target.value))}
                  className="w-32"
                />
                <span className="text-xs text-muted-foreground">{(2000 - playSpeed) / 100}x</span>
              </div>
            </>
          )}
        </div>

        {/* Visualization */}
        {steps.length > 0 && (
          <div className="space-y-4">
            {/* Current Step Info */}
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Passo {currentStep + 1} de {steps.length}
                </span>
                <Badge variant={currentStepData?.isHit ? "default" : "destructive"}>
                  Acessando: Página {currentStepData?.pageNumber}
                </Badge>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-sm font-medium ${currentStepData?.isHit ? "text-green-400" : "text-red-400"}`}
                >
                  {currentStepData?.message}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Memory Frames Visualization */}
            <div className="p-6 bg-background/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-4 text-center">Memória Física (Quadros)</h4>
              <div className="flex justify-center gap-4">
                <AnimatePresence mode="popLayout">
                  {currentStepData?.framesState.map((page, frameIdx) => (
                    <motion.div
                      key={frameIdx}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: page === currentStepData.pageNumber ? -10 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center ${
                        page === null
                          ? "bg-muted/30 border-border"
                          : page === currentStepData.pageNumber
                          ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500 shadow-lg shadow-purple-500/50"
                          : "bg-cyan-500/20 border-cyan-500/50"
                      }`}
                    >
                      <span className="text-xs text-muted-foreground mb-1">Quadro {frameIdx}</span>
                      {page !== null ? (
                        <motion.span
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-foreground"
                        >
                          {page}
                        </motion.span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Vazio</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Total de Acessos</p>
                <p className="text-2xl font-bold text-foreground">{totalAccesses}</p>
              </div>
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30 text-center">
                <p className="text-xs text-red-400 mb-1">Page Faults</p>
                <p className="text-2xl font-bold text-red-500">{totalFaults}</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
                <p className="text-xs text-green-400 mb-1">Taxa de Faults</p>
                <p className="text-2xl font-bold text-green-500">{faultRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground text-sm">Timeline de Acessos</h4>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {steps.map((step, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`flex-shrink-0 w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                      idx === currentStep
                        ? "bg-purple-500/30 border-purple-500 scale-110 shadow-lg"
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

