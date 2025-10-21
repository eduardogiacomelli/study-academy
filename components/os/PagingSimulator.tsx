"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, RotateCcw, Info, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ValidatedInput } from "@/components/shared/ValidatedInput";

interface PageTableEntry {
  pageNumber: number;
  frameNumber: number;
  present: boolean;
  modified: boolean;
  referenced: boolean;
}

export function PagingSimulator() {
  const [pageSize, setPageSize] = useState(4096); // 4 KB
  const [logicalAddress, setLogicalAddress] = useState(8196);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Tabela de páginas simulada (8 páginas)
  const pageTable: PageTableEntry[] = [
    { pageNumber: 0, frameNumber: 5, present: true, modified: false, referenced: true },
    { pageNumber: 1, frameNumber: 2, present: true, modified: true, referenced: false },
    { pageNumber: 2, frameNumber: 3, present: true, modified: false, referenced: true },
    { pageNumber: 3, frameNumber: 7, present: true, modified: false, referenced: false },
    { pageNumber: 4, frameNumber: 1, present: true, modified: true, referenced: true },
    { pageNumber: 5, frameNumber: 4, present: false, modified: false, referenced: false },
    { pageNumber: 6, frameNumber: 6, present: true, modified: false, referenced: false },
    { pageNumber: 7, frameNumber: 0, present: true, modified: false, referenced: true },
  ];

  // Cálculo da tradução
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const translation = useMemo(() => {
    const pageNumber = Math.floor(logicalAddress / pageSize);
    const offset = logicalAddress % pageSize;
    
    const entry = pageTable[pageNumber];
    
    if (!entry || pageNumber >= pageTable.length) {
      return {
        pageNumber,
        offset,
        valid: false,
        physicalAddress: 0,
        error: "Página inválida (fora dos limites)",
      };
    }

    if (!entry.present) {
      return {
        pageNumber,
        offset,
        valid: false,
        physicalAddress: 0,
        error: "Page Fault! Página não está na memória",
      };
    }

    const physicalAddress = entry.frameNumber * pageSize + offset;

    return {
      pageNumber,
      offset,
      frameNumber: entry.frameNumber,
      physicalAddress,
      valid: true,
      entry,
    };
  }, [logicalAddress, pageSize]);

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
    setLogicalAddress(8196);
    setPageSize(4096);
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
            <ValidatedInput
              id="pageSize"
              label="Tamanho da Página"
              value={pageSize}
              onChange={(v) => setPageSize(v as number)}
              min={1024}
              max={65536}
              step={1024}
              unit="B"
              helpText={`${(pageSize / 1024).toFixed(0)} KB por página/quadro`}
              tooltip="Tamanho fixo de cada página e quadro. Potência de 2 típica: 4KB, 8KB, 16KB"
              examples={["4096", "8192", "16384"]}
            />
            
            <ValidatedInput
              id="logicalAddress"
              label="Endereço Lógico"
              value={logicalAddress}
              onChange={(v) => setLogicalAddress(v as number)}
              min={0}
              max={pageTable.length * pageSize - 1}
              placeholder="Ex: 8196"
              helpText={`Range: 0 a ${(pageTable.length * pageSize - 1).toLocaleString()}`}
              tooltip="Endereço virtual que será traduzido para endereço físico"
              examples={["0", "4096", "8192", "16384"]}
            />
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
              <span className="text-muted-foreground">1. Número da Página:</span>
              <Badge variant="outline">
                {logicalAddress} ÷ {pageSize} = {translation.pageNumber}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">2. Deslocamento (Offset):</span>
              <Badge variant="outline">
                {logicalAddress} mod {pageSize} = {translation.offset}
              </Badge>
            </div>
            {showResult && translation.valid && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">3. Quadro na Tabela:</span>
                  <Badge className="bg-os-primary text-white">
                    Página {translation.pageNumber} → Quadro {translation.frameNumber}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">4. Endereço Físico:</span>
                  <Badge className="bg-cyan-500 text-white">
                    ({translation.frameNumber} × {pageSize}) + {translation.offset} = {translation.physicalAddress}
                  </Badge>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Visualização */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Memória Lógica */}
        <Card className="p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <div className="size-3 rounded-full bg-os-primary" />
            Memória Lógica (Páginas)
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {pageTable.map((entry) => (
              <motion.div
                key={entry.pageNumber}
                animate={{
                  scale: showResult && translation.pageNumber === entry.pageNumber ? 1.05 : 1,
                  borderColor: showResult && translation.pageNumber === entry.pageNumber 
                    ? "rgb(59, 130, 246)" 
                    : "transparent",
                }}
                className={`p-3 rounded-lg border-2 text-center ${
                  showResult && translation.pageNumber === entry.pageNumber
                    ? "bg-os-primary/20 border-os-primary"
                    : "bg-muted/30"
                }`}
              >
                <div className="text-xs text-muted-foreground mb-1">Página</div>
                <div className="text-2xl font-bold">{entry.pageNumber}</div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Memória Física */}
        <Card className="p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <div className="size-3 rounded-full bg-cyan-500" />
            Memória Física (Quadros)
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }, (_, i) => {
              const isActive = showResult && translation.valid && translation.frameNumber === i;
              const entry = pageTable.find(e => e.frameNumber === i && e.present);
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    borderColor: isActive ? "rgb(6, 182, 212)" : "transparent",
                  }}
                  className={`p-3 rounded-lg border-2 text-center ${
                    isActive
                      ? "bg-cyan-500/20 border-cyan-500"
                      : entry
                      ? "bg-green-500/10"
                      : "bg-muted/30"
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">Quadro</div>
                  <div className="text-2xl font-bold">{i}</div>
                  {entry && (
                    <div className="text-xs text-muted-foreground mt-1">
                      (P{entry.pageNumber})
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tabela de Páginas */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Tabela de Páginas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Página</th>
                <th className="text-left p-2">Quadro</th>
                <th className="text-center p-2">Present</th>
                <th className="text-center p-2">Modified</th>
                <th className="text-center p-2">Referenced</th>
              </tr>
            </thead>
            <tbody>
              {pageTable.map((entry) => {
                const isHighlighted = showResult && translation.pageNumber === entry.pageNumber;
                return (
                  <motion.tr
                    key={entry.pageNumber}
                    animate={{
                      backgroundColor: isHighlighted 
                        ? "rgba(59, 130, 246, 0.1)" 
                        : "transparent",
                    }}
                    className={`border-b ${isHighlighted ? "font-bold" : ""}`}
                  >
                    <td className="p-2">{entry.pageNumber}</td>
                    <td className="p-2">{entry.frameNumber}</td>
                    <td className="p-2 text-center">
                      {entry.present ? (
                        <CheckCircle2 className="size-4 text-green-500 inline" />
                      ) : (
                        <XCircle className="size-4 text-red-500 inline" />
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {entry.modified ? (
                        <CheckCircle2 className="size-4 text-amber-500 inline" />
                      ) : (
                        <XCircle className="size-4 text-muted-foreground inline" />
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {entry.referenced ? (
                        <CheckCircle2 className="size-4 text-blue-500 inline" />
                      ) : (
                        <XCircle className="size-4 text-muted-foreground inline" />
                      )}
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
                      Endereço Lógico <code className="bg-background px-2 py-1 rounded">{logicalAddress}</code>
                      {" → "}
                      Endereço Físico <code className="bg-background px-2 py-1 rounded">{translation.physicalAddress}</code>
                    </span>
                    <div className="flex flex-col gap-1 text-xs">
                      <Badge variant="outline">Página: {translation.pageNumber}</Badge>
                      <Badge variant="outline">Quadro: {translation.frameNumber}</Badge>
                      <Badge variant="outline">Offset: {translation.offset}</Badge>
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
                </AlertDescription>
              </Alert>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

