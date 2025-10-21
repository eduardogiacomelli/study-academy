"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Play, RotateCcw, AlertTriangle, Activity } from "lucide-react";

interface AccessEvent {
  time: number;
  page: number;
  workingSetSize: number;
  workingSet: Set<number>;
  isThrashing: boolean;
}

export function WorkingSetVisualizer() {
  const [referenceString, setReferenceString] = useState("1,2,3,4,1,2,5,1,2,3,4,5,6,7,8,7,8,7,8,7,8");
  const [windowSize, setWindowSize] = useState(4);
  const [availableFrames, setAvailableFrames] = useState(3);
  const [events, setEvents] = useState<AccessEvent[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Parse reference string
  const parseReferenceString = (str: string): number[] => {
    return str
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= 0);
  };

  // Calculate working set
  const calculateWorkingSet = useCallback(() => {
    const references = parseReferenceString(referenceString);
    if (references.length === 0) {
      toast.error("String de referências inválida!");
      return;
    }

    const simulatedEvents: AccessEvent[] = [];
    
    for (let i = 0; i < references.length; i++) {
      const currentPage = references[i];
      
      // Calculate working set: pages in the last windowSize accesses
      const workingSet = new Set<number>();
      const start = Math.max(0, i - windowSize + 1);
      for (let j = start; j <= i; j++) {
        workingSet.add(references[j]);
      }

      const workingSetSize = workingSet.size;
      const isThrashing = workingSetSize > availableFrames;

      simulatedEvents.push({
        time: i,
        page: currentPage,
        workingSetSize,
        workingSet: new Set(workingSet),
        isThrashing,
      });
    }

    setEvents(simulatedEvents);
    setCurrentStep(0);
    setIsRunning(false);

    const thrashingCount = simulatedEvents.filter(e => e.isThrashing).length;
    const thrashingRate = (thrashingCount / simulatedEvents.length) * 100;
    const maxWorkingSet = Math.max(...simulatedEvents.map(e => e.workingSetSize));

    if (thrashingRate > 50) {
      toast.error(`⚠️ Sistema em THRASHING!`, {
        description: `${thrashingRate.toFixed(1)}% dos acessos estão em thrashing. Working Set máximo: ${maxWorkingSet}`,
      });
    } else {
      toast.success(`Análise concluída!`, {
        description: `Working Set máximo: ${maxWorkingSet}. Taxa de thrashing: ${thrashingRate.toFixed(1)}%`,
      });
    }
  }, [referenceString, windowSize, availableFrames]);

  // Auto-play
  useEffect(() => {
    if (!isRunning || currentStep >= events.length - 1) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, events.length]);

  const handlePlay = () => {
    if (events.length === 0) {
      calculateWorkingSet();
    }
    if (currentStep >= events.length - 1) {
      setCurrentStep(0);
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const currentEvent = events[currentStep];
  const thrashingEvents = events.slice(0, currentStep + 1).filter(e => e.isThrashing).length;
  const thrashingRate = currentStep >= 0 ? (thrashingEvents / (currentStep + 1)) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 relative overflow-hidden border-amber-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-amber-400 relative z-10 flex items-center gap-2">
        <Activity className="size-6" />
        Visualizador de Working Set e Thrashing
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Observe o working set crescer e diminuir. Quando excede os quadros disponíveis, ocorre thrashing!
      </p>

      <div className="space-y-6 relative z-10">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ref-string-ws">String de Referências</Label>
            <Input
              id="ref-string-ws"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              placeholder="1,2,3,4,1,2,5..."
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="window-size">Janela Temporal (Δ)</Label>
            <Input
              id="window-size"
              type="number"
              min="2"
              max="10"
              value={windowSize}
              onChange={(e) => setWindowSize(parseInt(e.target.value) || 4)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frames-available">Quadros Disponíveis</Label>
            <Input
              id="frames-available"
              type="number"
              min="1"
              max="10"
              value={availableFrames}
              onChange={(e) => setAvailableFrames(parseInt(e.target.value) || 3)}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateWorkingSet} variant="outline">
            <Activity className="size-4 mr-2" /> Analisar
          </Button>
          {events.length > 0 && (
            <>
              <Button onClick={handlePlay} disabled={isRunning}>
                <Play className="size-4 mr-2" /> {currentStep === 0 ? "Iniciar" : "Continuar"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="size-4 mr-2" /> Reiniciar
              </Button>
            </>
          )}
        </div>

        {/* Visualization */}
        {events.length > 0 && currentEvent && (
          <div className="space-y-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Passo</p>
                <p className="text-2xl font-bold">{currentStep + 1} / {events.length}</p>
              </div>
              <div className={`p-4 rounded-lg border ${
                currentEvent.isThrashing 
                  ? "bg-red-500/10 border-red-500/30" 
                  : "bg-green-500/10 border-green-500/30"
              }`}>
                <p className="text-xs text-muted-foreground mb-1">Working Set Atual</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  {currentEvent.workingSetSize}
                  {currentEvent.isThrashing && (
                    <AlertTriangle className="size-5 text-red-500" />
                  )}
                </p>
                <p className="text-xs mt-1">
                  {currentEvent.isThrashing ? "⚠️ Thrashing!" : "✅ OK"}
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Taxa de Thrashing</p>
                <p className="text-2xl font-bold text-red-500">{thrashingRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Working Set Visualization */}
            <div className="p-6 bg-background/30 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">
                  Páginas no Working Set (Janela Δ = {windowSize})
                </h4>
                <Badge variant={currentEvent.isThrashing ? "destructive" : "default"}>
                  Acessando: {currentEvent.page}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-muted/30 rounded-lg">
                <AnimatePresence mode="popLayout">
                  {Array.from(currentEvent.workingSet).map((page) => (
                    <motion.div
                      key={page}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: 1, 
                        scale: page === currentEvent.page ? 1.2 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xl font-bold ${
                        page === currentEvent.page
                          ? "bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-amber-500 shadow-lg"
                          : "bg-cyan-500/20 border-cyan-500/50"
                      }`}
                    >
                      {page}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Utilização de Memória</span>
                    <span>{currentEvent.workingSetSize} / {availableFrames} quadros</span>
                  </div>
                  <Progress 
                    value={(currentEvent.workingSetSize / availableFrames) * 100} 
                    className={`h-3 ${
                      currentEvent.isThrashing ? "bg-red-500/20" : "bg-green-500/20"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Thrashing Alert */}
            {currentEvent.isThrashing && (
              <Alert className="bg-red-500/10 border-red-500/50">
                <AlertTriangle className="size-4 text-red-500" />
                <AlertDescription className="text-red-400">
                  <strong>THRASHING DETECTADO!</strong> O working set ({currentEvent.workingSetSize} páginas) 
                  excede os quadros disponíveis ({availableFrames}). O sistema está gastando mais tempo 
                  com page faults do que executando!
                </AlertDescription>
              </Alert>
            )}

            {/* Timeline Graph */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground text-sm">Evolução do Working Set</h4>
              <div className="h-32 bg-background/30 rounded-lg p-4 relative">
                <div className="absolute inset-x-4 bottom-4 top-4 flex items-end gap-1">
                  {events.slice(0, currentStep + 1).map((event, idx) => {
                    const height = (event.workingSetSize / Math.max(...events.map(e => e.workingSetSize))) * 100;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        className={`flex-1 rounded-t transition-colors ${
                          event.isThrashing ? "bg-red-500" : "bg-green-500"
                        }`}
                        title={`Passo ${idx + 1}: WS=${event.workingSetSize}`}
                      />
                    );
                  })}
                </div>
                {/* Threshold line */}
                <div 
                  className="absolute inset-x-4 border-t-2 border-dashed border-amber-500 pointer-events-none"
                  style={{ 
                    top: `${100 - (availableFrames / Math.max(...events.map(e => e.workingSetSize))) * 100}%`
                  }}
                >
                  <span className="text-xs text-amber-400 bg-background px-2 rounded">
                    Limite: {availableFrames} quadros
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-background/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">WS Máximo</p>
                <p className="text-xl font-bold text-foreground">
                  {Math.max(...events.slice(0, currentStep + 1).map(e => e.workingSetSize))}
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">WS Mínimo</p>
                <p className="text-xl font-bold text-foreground">
                  {Math.min(...events.slice(0, currentStep + 1).map(e => e.workingSetSize))}
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">WS Médio</p>
                <p className="text-xl font-bold text-foreground">
                  {(events.slice(0, currentStep + 1).reduce((sum, e) => sum + e.workingSetSize, 0) / (currentStep + 1)).toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30 text-center">
                <p className="text-xs text-red-400">Eventos Thrashing</p>
                <p className="text-xl font-bold text-red-500">{thrashingEvents}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Working Set Model:</strong> O working set WS(t, Δ) é o conjunto de páginas 
            referenciadas nos últimos Δ acessos. Thrashing ocorre quando Σ WS(processos) &gt; RAM disponível.
          </p>
        </div>
      </div>
    </Card>
  );
}

