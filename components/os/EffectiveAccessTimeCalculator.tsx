"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, TrendingUp, Zap } from "lucide-react";

export function EffectiveAccessTimeCalculator() {
  const [memoryAccessTime, setMemoryAccessTime] = useState(100); // ns
  const [pageFaultTime, setPageFaultTime] = useState(8000000); // ns (8ms)
  const [pageFaultRate, setPageFaultRate] = useState(1); // percentage
  const [tlbHitRate, setTlbHitRate] = useState(98); // percentage
  const [tlbAccessTime, setTlbAccessTime] = useState(1); // ns

  // Calculate EAT
  const calculateEAT = () => {
    const p = pageFaultRate / 100;
    const tlbHit = tlbHitRate / 100;
    const tlbMiss = 1 - tlbHit;
    
    // Without TLB: EAT = memory_access + p * page_fault_overhead
    // (quando não há TLB, sempre precisamos acessar a tabela de páginas na memória)
    const eatWithoutTlb = memoryAccessTime + p * pageFaultTime;
    
    // With TLB (fórmula correta):
    // EAT = TLB_access + TLB_miss * memory_access + p * page_fault_overhead
    // TLB hit: TLB_access + memory_access (1 acesso total à memória)
    // TLB miss: TLB_access + memory_access (tabela) + memory_access (dado) = TLB + 2*memory
    const eatWithTlb = tlbAccessTime + 
                       tlbHit * memoryAccessTime + 
                       tlbMiss * (memoryAccessTime * 2) + 
                       p * pageFaultTime;
    
    return {
      withoutTlb: eatWithoutTlb,
      withTlb: eatWithTlb,
      slowdown: eatWithoutTlb / memoryAccessTime,
      tlbBenefit: ((eatWithoutTlb - eatWithTlb) / eatWithoutTlb) * 100,
    };
  };

  const result = calculateEAT();

  const formatTime = (ns: number): string => {
    if (ns < 1000) return `${ns.toFixed(2)} ns`;
    if (ns < 1000000) return `${(ns / 1000).toFixed(2)} μs`;
    return `${(ns / 1000000).toFixed(2)} ms`;
  };

  const getPerformanceColor = (rate: number): string => {
    if (rate < 1) return "text-green-500";
    if (rate < 5) return "text-yellow-500";
    if (rate < 20) return "text-orange-500";
    return "text-red-500";
  };

  const getPerformanceLabel = (rate: number): string => {
    if (rate < 1) return "Excelente";
    if (rate < 5) return "Bom";
    if (rate < 20) return "Regular";
    return "Crítico (Thrashing!)";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 relative overflow-hidden border-cyan-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-cyan-400 relative z-10 flex items-center gap-2">
        <Calculator className="size-6" />
        Calculadora de Effective Access Time (EAT)
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Calcule o impacto dos page faults e do TLB no tempo de acesso à memória.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="memory-time">Tempo de Acesso à RAM (ns)</Label>
            <Input
              id="memory-time"
              type="number"
              value={memoryAccessTime}
              onChange={(e) => setMemoryAccessTime(parseInt(e.target.value) || 100)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">Típico: 100ns (DDR4)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pf-time">Tempo de Page Fault (ns)</Label>
            <Input
              id="pf-time"
              type="number"
              value={pageFaultTime}
              onChange={(e) => setPageFaultTime(parseInt(e.target.value) || 8000000)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              HDD: 8ms (8,000,000ns) | SSD: 100μs (100,000ns)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pf-rate">
              Page Fault Rate: <span className={getPerformanceColor(pageFaultRate)}>
                {pageFaultRate.toFixed(1)}%
              </span>
            </Label>
            <Slider
              id="pf-rate"
              min={0}
              max={50}
              step={0.1}
              value={[pageFaultRate]}
              onValueChange={(v) => setPageFaultRate(v[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className={getPerformanceColor(pageFaultRate)}>
                {getPerformanceLabel(pageFaultRate)}
              </span>
              <span>50%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tlb-time">Tempo de Acesso ao TLB (ns)</Label>
            <Input
              id="tlb-time"
              type="number"
              value={tlbAccessTime}
              onChange={(e) => setTlbAccessTime(parseInt(e.target.value) || 1)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">Típico: 1-2ns (cache L1)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tlb-hit">
              TLB Hit Rate: <span className="text-green-500">{tlbHitRate}%</span>
            </Label>
            <Slider
              id="tlb-hit"
              min={50}
              max={100}
              step={1}
              value={[tlbHitRate]}
              onValueChange={(v) => setTlbHitRate(v[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50%</span>
              <span className="text-green-500">Típico: 95-99%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="p-6 bg-background/50 rounded-lg border-2 border-cyan-500/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">Effective Access Time</h4>
              <Badge variant="outline" className="bg-cyan-500/20 border-cyan-500/50">
                Sem TLB
              </Badge>
            </div>
            <motion.p
              key={result.withoutTlb}
              initial={{ scale: 1.2, color: "#06b6d4" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold text-cyan-400"
            >
              {formatTime(result.withoutTlb)}
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">
              {result.slowdown.toFixed(1)}x mais lento que acesso direto à RAM
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border-2 border-green-500/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="size-4 text-yellow-500" />
                Com TLB
              </h4>
              <Badge variant="outline" className="bg-green-500/20 border-green-500/50">
                Otimizado
              </Badge>
            </div>
            <motion.p
              key={result.withTlb}
              initial={{ scale: 1.2, color: "#10b981" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold text-green-400"
            >
              {formatTime(result.withTlb)}
            </motion.p>
            <p className="text-sm text-green-300 mt-2">
              {result.tlbBenefit.toFixed(1)}% mais rápido com TLB!
            </p>
          </div>

          {/* Formula */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2 text-sm">Fórmula:</h4>
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <p>EAT = (1 - p) × RAM + p × PF_time</p>
              <p>EAT = (1 - {(pageFaultRate / 100).toFixed(4)}) × {memoryAccessTime} + {(pageFaultRate / 100).toFixed(4)} × {pageFaultTime.toLocaleString()}</p>
              <p className="text-cyan-400 font-bold">EAT = {formatTime(result.withoutTlb)}</p>
            </div>
          </div>

          {/* Performance Analysis */}
          <Alert className={`${
            pageFaultRate < 1 
              ? "bg-green-500/10 border-green-500/50" 
              : pageFaultRate < 10
              ? "bg-yellow-500/10 border-yellow-500/50"
              : "bg-red-500/10 border-red-500/50"
          }`}>
            <TrendingUp className={`size-4 ${getPerformanceColor(pageFaultRate)}`} />
            <AlertDescription className={getPerformanceColor(pageFaultRate)}>
              {pageFaultRate < 1 ? (
                <span>✅ <strong>Sistema Saudável:</strong> Taxa de page faults muito baixa. Performance excelente!</span>
              ) : pageFaultRate < 10 ? (
                <span>⚠️ <strong>Atenção:</strong> Taxa de page faults moderada. Considere adicionar mais RAM.</span>
              ) : (
                <span>🔥 <strong>THRASHING!</strong> Sistema gasta {(result.slowdown * 100 - 100).toFixed(0)}% mais tempo com page faults. Adicione RAM urgentemente!</span>
              )}
            </AlertDescription>
          </Alert>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left">Cenário</th>
                  <th className="p-2 text-right">EAT</th>
                  <th className="p-2 text-right">Slowdown</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="p-2">0% PF (ideal)</td>
                  <td className="p-2 text-right font-mono">{formatTime(memoryAccessTime)}</td>
                  <td className="p-2 text-right text-green-500">1.0x</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-2">0.1% PF (ótimo)</td>
                  <td className="p-2 text-right font-mono">{formatTime(0.999 * memoryAccessTime + 0.001 * pageFaultTime)}</td>
                  <td className="p-2 text-right text-green-500">
                    {((0.999 * memoryAccessTime + 0.001 * pageFaultTime) / memoryAccessTime).toFixed(1)}x
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-2">1% PF (bom)</td>
                  <td className="p-2 text-right font-mono">{formatTime(0.99 * memoryAccessTime + 0.01 * pageFaultTime)}</td>
                  <td className="p-2 text-right text-yellow-500">
                    {((0.99 * memoryAccessTime + 0.01 * pageFaultTime) / memoryAccessTime).toFixed(1)}x
                  </td>
                </tr>
                <tr className="border-t border-border bg-cyan-500/10">
                  <td className="p-2 font-bold">Atual ({pageFaultRate.toFixed(1)}% PF)</td>
                  <td className="p-2 text-right font-mono font-bold text-cyan-400">
                    {formatTime(result.withoutTlb)}
                  </td>
                  <td className={`p-2 text-right font-bold ${getPerformanceColor(pageFaultRate)}`}>
                    {result.slowdown.toFixed(1)}x
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-2">50% PF (thrashing)</td>
                  <td className="p-2 text-right font-mono text-red-500">
                    {formatTime(0.5 * memoryAccessTime + 0.5 * pageFaultTime)}
                  </td>
                  <td className="p-2 text-right text-red-500 font-bold">
                    {((0.5 * memoryAccessTime + 0.5 * pageFaultTime) / memoryAccessTime).toFixed(0)}x ⚠️
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 relative z-10">
        <p className="text-sm text-blue-300">
          💡 <strong>Interpretação:</strong> EAT = Effective Access Time é o tempo médio real de acesso à memória 
          considerando page faults. Um único page fault (8ms) equivale a <strong>80.000 acessos normais à RAM (100ns)</strong>!
        </p>
      </div>
    </Card>
  );
}

