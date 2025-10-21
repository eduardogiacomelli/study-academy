"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, RotateCcw, Info, CheckCircle2, XCircle, Shield } from "lucide-react";
import { toast } from "sonner";

interface SegmentEntry {
  segment: number;
  base: number;
  limit: number;
  type: string;
  protection: string;
  color: string;
}

export function SegmentationSimulator() {
  const [segmentNumber, setSegmentNumber] = useState(1);
  const [offset, setOffset] = useState(53);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Tabela de segmentos
  const segmentTable: SegmentEntry[] = [
    { segment: 0, base: 1400, limit: 1000, type: "Código", protection: "R-X", color: "#3b82f6" },
    { segment: 1, base: 6300, limit: 400, type: "Dados", protection: "RW-", color: "#10b981" },
    { segment: 2, base: 4300, limit: 400, type: "Pilha", protection: "RW-", color: "#a855f7" },
    { segment: 3, base: 3200, limit: 1100, type: "Heap", protection: "RW-", color: "#f59e0b" },
  ];

  // Cálculo da tradução
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const translation = useMemo(() => {
    const entry = segmentTable[segmentNumber];
    
    if (!entry) {
      return {
        valid: false,
        error: "Segmento inválido (fora dos limites)",
      };
    }

    if (offset >= entry.limit) {
      return {
        valid: false,
        error: `Segmentation Fault! Offset ${offset} excede o limite ${entry.limit}`,
        segmentNumber,
        offset,
        entry,
      };
    }

    const physicalAddress = entry.base + offset;

    return {
      valid: true,
      segmentNumber,
      offset,
      base: entry.base,
      limit: entry.limit,
      physicalAddress,
      entry,
    };
  }, [segmentNumber, offset]);

  const handleTranslate = () => {
    setIsTranslating(true);
    setShowResult(false);

    setTimeout(() => {
      setIsTranslating(false);
      setShowResult(true);
      
      if (translation.valid) {
        toast.success("Tradução realizada com sucesso!");
      } else {
        toast.error(translation.error || "Erro na tradução");
      }
    }, 1000);
  };

  const handleReset = () => {
    setSegmentNumber(1);
    setOffset(53);
    setShowResult(false);
    setIsTranslating(false);
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-os-primary/5 to-transparent">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Info className="size-4 text-os-primary" />
            Configuração
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="segmentNumber">Número do Segmento (s)</Label>
              <Input
                id="segmentNumber"
                type="number"
                value={segmentNumber}
                onChange={(e) => setSegmentNumber(Number(e.target.value))}
                min={0}
                max={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="offset">Deslocamento (d)</Label>
              <Input
                id="offset"
                type="number"
                value={offset}
                onChange={(e) => setOffset(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleTranslate} 
                disabled={isTranslating}
                className="gradient-os text-white flex-1"
              >
                <Play className="size-4 mr-2" />
                Traduzir
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent">
          <h3 className="font-bold mb-4">Cálculo Passo a Passo</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">1. Endereço Lógico:</span>
              <Badge variant="outline">
                ({segmentNumber}, {offset})
              </Badge>
            </div>
            {showResult && translation.valid && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">2. Base do Segmento:</span>
                  <Badge className="bg-os-primary text-white">
                    {translation.base}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">3. Verificar Limite:</span>
                  <Badge className="bg-green-500 text-white">
                    {offset} &lt; {translation.limit} ✓
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">4. Endereço Físico:</span>
                  <Badge className="bg-cyan-500 text-white">
                    {translation.base} + {offset} = {translation.physicalAddress}
                  </Badge>
                </div>
              </>
            )}
            {showResult && !translation.valid && translation.entry && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">2. Verificar Limite:</span>
                <Badge className="bg-red-500 text-white">
                  {offset} ≥ {translation.entry.limit} ✗
                </Badge>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Visualização dos Segmentos */}
      <Card className="p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Shield className="size-4 text-os-primary" />
          Segmentos em Memória
        </h3>
        <div className="space-y-4">
          {segmentTable.map((entry) => {
            const isActive = showResult && translation.segmentNumber === entry.segment;
            const endAddress = entry.base + entry.limit;
            
            return (
              <motion.div
                key={entry.segment}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive ? entry.color : "transparent",
                }}
                className={`p-4 rounded-lg border-2 ${
                  isActive ? "shadow-lg" : ""
                }`}
                style={{
                  backgroundColor: isActive 
                    ? `${entry.color}20` 
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="size-12 rounded-lg flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: entry.color }}
                    >
                      S{entry.segment}
                    </div>
                    <div>
                      <h4 className="font-bold">{entry.type}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Base: {entry.base}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Limit: {entry.limit}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          End: {endAddress}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-2">{entry.protection}</Badge>
                    <div className="text-xs text-muted-foreground">
                      {entry.base} - {endAddress}
                    </div>
                  </div>
                </div>

                {/* Barra visual do tamanho */}
                <div className="mt-4 relative">
                  <div className="h-8 bg-muted/30 rounded relative overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(entry.limit / 1200) * 100}%`,
                        backgroundColor: entry.color,
                        opacity: 0.3,
                      }}
                    />
                    {isActive && translation.valid && (
                      <motion.div
                        initial={{ left: 0 }}
                        animate={{ left: `${(offset / entry.limit) * 100}%` }}
                        className="absolute top-0 w-1 h-full bg-red-500"
                      >
                        <div className="absolute -top-8 -left-8 text-xs font-bold text-red-500">
                          Offset: {offset}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>{entry.limit}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Tabela de Segmentos */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Tabela de Segmentos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Segmento</th>
                <th className="text-left p-2">Base</th>
                <th className="text-left p-2">Limit</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-center p-2">Proteção</th>
              </tr>
            </thead>
            <tbody>
              {segmentTable.map((entry) => {
                const isHighlighted = showResult && translation.segmentNumber === entry.segment;
                return (
                  <motion.tr
                    key={entry.segment}
                    animate={{
                      backgroundColor: isHighlighted 
                        ? "rgba(59, 130, 246, 0.1)" 
                        : "transparent",
                    }}
                    className={`border-b ${isHighlighted ? "font-bold" : ""}`}
                  >
                    <td className="p-2">{entry.segment}</td>
                    <td className="p-2 font-mono">{entry.base}</td>
                    <td className="p-2 font-mono">{entry.limit}</td>
                    <td className="p-2">{entry.type}</td>
                    <td className="p-2 text-center">
                      <Badge variant="outline" className="text-xs">
                        {entry.protection}
                      </Badge>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Resultado */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {translation.valid ? (
              <Alert className="bg-green-500/5 border-green-500/20">
                <CheckCircle2 className="size-4 text-green-500" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      <strong>Tradução bem-sucedida!</strong>
                      <br />
                      Endereço Lógico <code className="bg-background px-2 py-1 rounded">({segmentNumber}, {offset})</code>
                      {" → "}
                      Endereço Físico <code className="bg-background px-2 py-1 rounded">{translation.physicalAddress}</code>
                    </span>
                    <div className="flex flex-col gap-1 text-xs">
                      <Badge variant="outline">Segmento: {translation.entry?.type}</Badge>
                      <Badge variant="outline">Base: {translation.base}</Badge>
                      <Badge variant="outline">Proteção: {translation.entry?.protection}</Badge>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-500/5 border-red-500/20">
                <XCircle className="size-4 text-red-500" />
                <AlertDescription>
                  <strong>Erro na tradução!</strong>
                  <br />
                  {translation.error}
                  {translation.entry && (
                    <div className="mt-2 text-xs">
                      <p>Segmento {translation.entry.type}: Limit = {translation.entry.limit}</p>
                      <p>Seu offset ({offset}) excede o limite permitido.</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legenda de Proteção */}
      <Card className="p-4 bg-gradient-to-br from-os-primary/5 to-transparent">
        <h4 className="font-bold text-sm mb-2">Legenda de Proteção:</h4>
        <div className="grid md:grid-cols-3 gap-2 text-xs">
          <div><strong>R:</strong> Read (Leitura)</div>
          <div><strong>W:</strong> Write (Escrita)</div>
          <div><strong>X:</strong> Execute (Execução)</div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <p><strong>Exemplos:</strong></p>
          <p>• R-X = Código (pode ler e executar, não pode escrever)</p>
          <p>• RW- = Dados/Pilha/Heap (pode ler e escrever, não pode executar)</p>
        </div>
      </Card>
    </div>
  );
}

