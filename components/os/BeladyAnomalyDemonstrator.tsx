"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { AlertTriangle, TrendingUp, Zap, BarChart3 } from "lucide-react";

interface SimulationResult {
  frames: number;
  pageFaults: number;
  sequence: string;
}

export function BeladyAnomalyDemonstrator() {
  const [referenceString, setReferenceString] = useState("1,2,3,4,1,2,5,1,2,3,4,5");
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [anomalyDetected, setAnomalyDetected] = useState(false);

  // Simulate FIFO for given number of frames
  const simulateFIFO = (references: number[], numFrames: number): number => {
    const memory: (number | null)[] = Array(numFrames).fill(null);
    let pageFaults = 0;
    let nextToReplace = 0;

    for (const page of references) {
      if (!memory.includes(page)) {
        pageFaults++;
        memory[nextToReplace] = page;
        nextToReplace = (nextToReplace + 1) % numFrames;
      }
    }

    return pageFaults;
  };

  // Run simulation
  const runSimulation = useCallback(() => {
    const references = referenceString
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= 0);

    if (references.length === 0) {
      toast.error("String de referências inválida!");
      return;
    }

    const simulationResults: SimulationResult[] = [];
    let hasAnomaly = false;

    // Test with 1 to 8 frames
    for (let frames = 1; frames <= 8; frames++) {
      const pageFaults = simulateFIFO(references, frames);
      simulationResults.push({
        frames,
        pageFaults,
        sequence: referenceString,
      });
    }

    // Check for Belady's Anomaly
    for (let i = 1; i < simulationResults.length; i++) {
      if (simulationResults[i].pageFaults > simulationResults[i - 1].pageFaults) {
        hasAnomaly = true;
        break;
      }
    }

    setResults(simulationResults);
    setAnomalyDetected(hasAnomaly);

    if (hasAnomaly) {
      toast.error("⚠️ Anomalia de Belady Detectada!", {
        description: "Aumentar quadros causou MAIS page faults!",
      });
    } else {
      toast.success("Simulação concluída", {
        description: "Nenhuma anomalia detectada nesta sequência.",
      });
    }
  }, [referenceString]);

  // Get preset examples
  const loadPreset = (preset: "anomaly" | "normal") => {
    if (preset === "anomaly") {
      setReferenceString("1,2,3,4,1,2,5,1,2,3,4,5");
      toast.info("Carregado: Sequência com Anomalia de Belady");
    } else {
      setReferenceString("7,0,1,2,0,3,0,4,2,3,0,3,2");
      toast.info("Carregado: Sequência Normal");
    }
  };

  const maxPageFaults = Math.max(...results.map(r => r.pageFaults), 1);

  return (
    <Card className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 relative overflow-hidden border-red-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-red-400 relative z-10 flex items-center gap-2">
        <AlertTriangle className="size-6" />
        Demonstrador da Anomalia de Belady
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        A anomalia de Belady mostra que, paradoxalmente, aumentar o número de quadros pode causar MAIS page faults no FIFO!
      </p>

      <div className="space-y-6 relative z-10">
        {/* Configuration */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ref-string-belady">String de Referências</Label>
            <Input
              id="ref-string-belady"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              placeholder="1,2,3,4,1,2,5,1,2,3,4,5"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={runSimulation} variant="default">
              <Zap className="size-4 mr-2" /> Executar Simulação
            </Button>
            <Button onClick={() => loadPreset("anomaly")} variant="outline">
              📉 Carregar Exemplo com Anomalia
            </Button>
            <Button onClick={() => loadPreset("normal")} variant="outline">
              📈 Carregar Exemplo Normal
            </Button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {/* Chart */}
            <div className="p-6 bg-background/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="size-4" />
                Page Faults vs Número de Quadros
              </h4>
              
              <div className="space-y-2">
                {results.map((result, idx) => {
                  const isAnomaly =
                    idx > 0 && result.pageFaults > results[idx - 1].pageFaults;
                  const barWidth = (result.pageFaults / maxPageFaults) * 100;

                  return (
                    <div key={result.frames} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-mono text-muted-foreground">
                          {result.frames} {result.frames === 1 ? "quadro" : "quadros"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold">
                            {result.pageFaults} faults
                          </span>
                          {isAnomaly && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="size-3 mr-1" />
                              ANOMALIA!
                            </Badge>
                          )}
                        </div>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className={`h-8 rounded flex items-center px-3 ${
                          isAnomaly
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">
                          {result.pageFaults}
                        </span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Anomaly Alert */}
            {anomalyDetected ? (
              <Alert className="bg-red-500/10 border-red-500/50">
                <AlertTriangle className="size-4 text-red-500" />
                <AlertDescription className="text-red-400">
                  <strong>⚠️ ANOMALIA DE BELADY DETECTADA!</strong>
                  <p className="mt-2">
                    Esta sequência demonstra que o FIFO <strong>NÃO é um algoritmo stack</strong>.
                    Aumentar o número de quadros causou MAIS page faults em alguns casos, o que é 
                    contra-intuitivo! Por isso, algoritmos como LRU e Clock são preferidos.
                  </p>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-500/10 border-green-500/50">
                <TrendingUp className="size-4 text-green-500" />
                <AlertDescription className="text-green-400">
                  <strong>✅ Nenhuma anomalia detectada</strong>
                  <p className="mt-2">
                    Nesta sequência, aumentar o número de quadros consistentemente reduziu ou manteve 
                    o número de page faults, como esperado.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {/* Statistics Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left">Quadros</th>
                    <th className="p-3 text-right">Page Faults</th>
                    <th className="p-3 text-right">Variação</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {results.map((result, idx) => {
                    const prevFaults = idx > 0 ? results[idx - 1].pageFaults : 0;
                    const change = idx > 0 ? result.pageFaults - prevFaults : 0;
                    const isAnomaly = change > 0;

                    return (
                      <tr
                        key={result.frames}
                        className={`border-t border-border ${
                          isAnomaly ? "bg-red-500/5" : ""
                        }`}
                      >
                        <td className="p-3 font-mono">{result.frames}</td>
                        <td className="p-3 text-right font-mono font-bold">
                          {result.pageFaults}
                        </td>
                        <td className="p-3 text-right font-mono">
                          {idx > 0 && (
                            <span
                              className={
                                change > 0
                                  ? "text-red-500"
                                  : change < 0
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                              }
                            >
                              {change > 0 ? "+" : ""}
                              {change}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {isAnomaly ? (
                            <Badge variant="destructive" className="text-xs">
                              Anomalia
                            </Badge>
                          ) : change < 0 ? (
                            <Badge variant="default" className="text-xs bg-green-500">
                              Melhora
                            </Badge>
                          ) : idx > 0 ? (
                            <Badge variant="secondary" className="text-xs">
                              Igual
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Base
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  Por que acontece?
                </h4>
                <p className="text-sm text-muted-foreground">
                  No FIFO, páginas são substituídas na ordem de chegada, sem considerar uso futuro.
                  Às vezes, com mais quadros, uma página importante é substituída cedo demais, causando 
                  mais faults depois. Isso não acontece com algoritmos &quot;stack&quot; como LRU.
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Exemplo Clássico:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Sequência: 1,2,3,4,1,2,5,1,2,3,4,5
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Com 3 quadros: 9 page faults</li>
                  <li>• Com 4 quadros: 10 page faults ⚠️</li>
                  <li>• Mais quadros = mais faults!</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Curiosidade:</strong> A anomalia de Belady foi descoberta em 1969 e só ocorre 
            em algoritmos que não são &quot;stack&quot;, como FIFO. Algoritmos stack (LRU, Optimal) NUNCA sofrem 
            desta anomalia, pois o conjunto de páginas com n+1 quadros sempre contém o conjunto de n quadros.
          </p>
        </div>
      </div>
    </Card>
  );
}

