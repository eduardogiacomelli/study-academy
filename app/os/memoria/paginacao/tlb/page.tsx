"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TLBVisualizer3D } from "@/components/os/TLBVisualizer3D";
import {
  Zap,
  Clock,
  TrendingUp,
  Calculator,
  Box,
  Info,
  ArrowRight,
  Lightbulb
} from "lucide-react";

export default function TLBPage() {
  const [tlbTime, setTlbTime] = useState(10);
  const [memTime, setMemTime] = useState(100);
  const [hitRate, setHitRate] = useState(90);

  const eatWithTLB = useMemo(() => {
    const hit = hitRate / 100;
    return hit * (tlbTime + memTime) + (1 - hit) * (tlbTime + 2 * memTime);
  }, [tlbTime, memTime, hitRate]);

  const eatWithoutTLB = useMemo(() => memTime * 2, [memTime]);
  const speedup = useMemo(() => eatWithoutTLB / eatWithTLB, [eatWithTLB, eatWithoutTLB]);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm">
              <Zap className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              TLB - Translation Lookaside Buffer
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Cache de tradução de endereços para acelerar o acesso à memória
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Zap className="size-3 mr-1" /> Cache
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Clock className="size-3 mr-1" /> Performance
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <TrendingUp className="size-3 mr-1" /> Hit/Miss
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Box className="size-3 mr-1" /> 3D Visual
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Teoria */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <Lightbulb className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O que é TLB?</h2>
                  <p className="text-muted-foreground">Cache de alto desempenho</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">
                    O <strong>Translation Lookaside Buffer (TLB)</strong> é um cache de hardware
                    que armazena traduções recentes de endereços virtuais para físicos, evitando
                    acesso à tabela de páginas na memória.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Por que TLB existe?</h3>
                  
                  <div className="p-6 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">❌ Problema sem TLB</h4>
                    <p className="text-sm mb-3">Para CADA acesso à memória, são necessários 2 acessos:</p>
                    <ol className="text-sm space-y-2 list-decimal list-inside">
                      <li>Acessar tabela de páginas na memória (para traduzir endereço)</li>
                      <li>Acessar dado real na memória</li>
                    </ol>
                    <p className="text-sm mt-3 font-semibold">
                      Resultado: <span className="text-red-600 dark:text-red-400">Desempenho reduzido em 50%!</span>
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 mt-4">
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">✅ Solução com TLB</h4>
                    <p className="text-sm mb-3">TLB armazena traduções recentes no chip da CPU:</p>
                    <ul className="text-sm space-y-2 list-disc list-inside">
                      <li><strong>TLB Hit:</strong> Tradução no cache → apenas 1 acesso à memória</li>
                      <li><strong>TLB Miss:</strong> Busca na tabela → 2 acessos à memória</li>
                    </ul>
                    <p className="text-sm mt-3 font-semibold">
                      Com 90% hit rate: <span className="text-green-600 dark:text-green-400">Performance quase 2x melhor!</span>
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-3">Características</h3>

                  <div className="grid md:grid-cols-3 gap-4 not-prose">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">⚡ Muito Rápido</h4>
                      <p className="text-sm text-muted-foreground">
                        1 ciclo de clock (~0.3ns em CPU moderna)
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">📏 Pequeno</h4>
                      <p className="text-sm text-muted-foreground">
                        16-512 entradas (cache associativo)
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">🎯 Alto Hit Rate</h4>
                      <p className="text-sm text-muted-foreground">
                        Tipicamente 90-99% (princípio da localidade)
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Calculadora EAT */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <Calculator className="size-6 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Calculadora EAT</h2>
                  <p className="text-muted-foreground">Effective Access Time</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="mb-2 block">Tempo TLB (ns)</Label>
                    <Input
                      type="number"
                      value={tlbTime}
                      onChange={(e) => setTlbTime(Number(e.target.value))}
                      min="1"
                      max="100"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Tipicamente 1-10 ns</p>
                  </div>

                  <div>
                    <Label className="mb-2 block">Tempo Memória (ns)</Label>
                    <Input
                      type="number"
                      value={memTime}
                      onChange={(e) => setMemTime(Number(e.target.value))}
                      min="10"
                      max="500"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Tipicamente 100-200 ns</p>
                  </div>

                  <div>
                    <Label className="mb-2 block">TLB Hit Rate (%)</Label>
                    <Input
                      type="number"
                      value={hitRate}
                      onChange={(e) => setHitRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                      min="0"
                      max="100"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Tipicamente 90-99%</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">EAT com TLB</h4>
                        <Clock className="size-5 text-blue-500" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {eatWithTLB.toFixed(2)} ns
                      </div>
                      <p className="text-xs text-muted-foreground">
                        = {hitRate}% × ({tlbTime} + {memTime}) + {100 - hitRate}% × ({tlbTime} + 2×{memTime})
                      </p>
                    </Card>

                    <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">EAT sem TLB</h4>
                        <Clock className="size-5 text-red-500" />
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                        {eatWithoutTLB.toFixed(2)} ns
                      </div>
                      <p className="text-xs text-muted-foreground">
                        = 2 × {memTime} (sempre 2 acessos à memória)
                      </p>
                    </Card>
                  </div>

                  <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">Speedup</h4>
                        <p className="text-sm text-muted-foreground">
                          Quão mais rápido é com TLB?
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                          {speedup.toFixed(2)}x
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {((speedup - 1) * 100).toFixed(0)}% mais rápido
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="p-4 rounded-lg bg-info/10 border border-info/30">
                  <div className="flex items-start gap-3">
                    <Info className="size-5 text-info flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Fórmula EAT</p>
                      <p className="text-muted-foreground">
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          EAT = h × (T_tlb + T_mem) + (1-h) × (T_tlb + 2×T_mem)
                        </code>
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Onde <strong>h</strong> = hit rate, <strong>T_tlb</strong> = tempo TLB, <strong>T_mem</strong> = tempo memória
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Visualização 3D */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Box className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Simulador TLB 3D</h2>
                  <p className="text-muted-foreground">Visualize hits e misses em tempo real</p>
                </div>
              </div>

              <TLBVisualizer3D />
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/teoria" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Teoria
            </a>
            <a href="/os/memoria/paginacao/exercicios" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Exercícios <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

