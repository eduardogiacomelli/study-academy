"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { TLBPerformanceVisualizer } from "@/components/virtual-memory/TLBPerformanceVisualizer";
import { 
  Zap, TrendingUp, Clock, Cpu, 
  Code2, BookOpen, Activity, BarChart3
} from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function PerformancePage() {
  const [tlbHitRate, setTlbHitRate] = useState([98]);
  const [pageFaultRate, setPageFaultRate] = useState([0.01]);
  const [memAccessTime] = useState(100); // ns
  const [tlbAccessTime] = useState(1); // ns
  const [pageFaultTime] = useState(10000000); // 10ms = 10,000,000 ns

  const calculateEAT = () => {
    const tlbHit = tlbHitRate[0] / 100;
    const pfRate = pageFaultRate[0] / 100;
    
    // TLB hit: 1 access (TLB + memory)
    const tlbHitEAT = tlbAccessTime + memAccessTime;
    
    // TLB miss: 4 accesses (page table walk) + 1 access (memory)
    const tlbMissEAT = (4 * memAccessTime) + memAccessTime;
    
    // Without page faults
    const eatNoPF = (tlbHit * tlbHitEAT) + ((1 - tlbHit) * tlbMissEAT);
    
    // With page faults
    const eatTotal = ((1 - pfRate) * eatNoPF) + (pfRate * (pageFaultTime + tlbMissEAT));
    
    return {
      tlbHitEAT,
      tlbMissEAT,
      eatNoPF,
      eatTotal,
      slowdown: eatTotal / memAccessTime
    };
  };

  const eat = calculateEAT();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-green-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl backdrop-blur-sm">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Performance & EAT
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text">
            Performance Analysis
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Análise de desempenho de memória virtual: Effective Access Time (EAT), impacto do TLB, 
            page faults e benchmarks reais.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Clock, label: "EAT", value: `${eat.eatTotal.toFixed(0)} ns`, color: "text-green-400" },
              { icon: Zap, label: "TLB Hit", value: "1-2 ns", color: "text-emerald-400" },
              { icon: TrendingUp, label: "Speedup", value: `${(500/eat.slowdown).toFixed(1)}x`, color: "text-teal-400" },
              { icon: BarChart3, label: "Overhead", value: `${eat.slowdown.toFixed(1)}x`, color: "text-yellow-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-green-500/20 p-4">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="eat" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="eat" className="data-[state=active]:bg-green-500">
              <Clock className="w-4 h-4 mr-2" />
              EAT Calculator
            </TabsTrigger>
            <TabsTrigger value="tlb" className="data-[state=active]:bg-green-500">
              <Zap className="w-4 h-4 mr-2" />
              TLB Impact
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="data-[state=active]:bg-green-500">
              <BarChart3 className="w-4 h-4 mr-2" />
              Benchmarks
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-green-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* EAT CALCULATOR */}
          <TabsContent value="eat" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Effective Access Time (EAT) Calculator</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  O <strong className="text-green-400">Effective Access Time (EAT)</strong> é o tempo médio real 
                  para acessar a memória, considerando todos os overheads: TLB misses, page table walks, e page faults.
                </p>

                <Card className="bg-green-950/30 border-green-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-green-300 mb-4">📐 Fórmula do EAT</h3>
                  
                  <div className="bg-black/40 rounded-lg p-6 mb-4">
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-green-400">
                        EAT = (1 - p) × T<sub>mem</sub> + p × T<sub>page_fault</sub>
                      </div>
                      <div className="text-sm text-slate-400">
                        Onde:<br />
                        p = page fault rate<br />
                        T<sub>mem</sub> = tempo de acesso à memória (com TLB)<br />
                        T<sub>page_fault</sub> = tempo de page fault handling
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-300">
                    <strong className="text-green-400">Considerando TLB:</strong>
                    <CodeBlock language="text">
                      {`T_mem = (h × T_tlb_hit) + ((1-h) × T_tlb_miss)

Onde:
h = TLB hit rate
T_tlb_hit = T_tlb + T_memory = 1ns + 100ns = 101ns
T_tlb_miss = (4 × T_memory) + T_memory = 500ns + 100ns = 600ns
            ↑ page table walk (4 níveis)`}
                    </CodeBlock>
                  </div>
                </Card>

                {/* Calculator Interativo */}
                <Card className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-500/30 p-8">
                  <h3 className="text-2xl font-semibold text-green-300 mb-6">🧮 Calculadora Interativa</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">TLB Hit Rate:</span>
                        <Badge variant="outline">{tlbHitRate[0]}%</Badge>
                      </div>
                      <Slider
                        value={tlbHitRate}
                        onValueChange={setTlbHitRate}
                        min={50}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">Page Fault Rate:</span>
                        <Badge variant="outline">{pageFaultRate[0]}%</Badge>
                      </div>
                      <Slider
                        value={pageFaultRate}
                        onValueChange={setPageFaultRate}
                        min={0}
                        max={5}
                        step={0.01}
                        className="w-full"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <Card className="bg-green-900/30 p-4">
                        <div className="text-xs text-slate-400 mb-1">TLB Hit</div>
                        <div className="text-2xl font-bold text-green-400">
                          {eat.tlbHitEAT.toFixed(0)} ns
                        </div>
                      </Card>

                      <Card className="bg-yellow-900/30 p-4">
                        <div className="text-xs text-slate-400 mb-1">TLB Miss</div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {eat.tlbMissEAT.toFixed(0)} ns
                        </div>
                      </Card>

                      <Card className="bg-red-900/30 p-4">
                        <div className="text-xs text-slate-400 mb-1">Page Fault</div>
                        <div className="text-2xl font-bold text-red-400">
                          {(pageFaultTime / 1000000).toFixed(1)} ms
                        </div>
                      </Card>
                    </div>

                    <div className="border-t border-green-500/20 pt-6 mt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/30 rounded-lg p-6">
                          <div className="text-sm text-slate-400 mb-2">EAT (sem page faults):</div>
                          <div className="text-4xl font-bold text-green-400 mb-2">
                            {eat.eatNoPF.toFixed(1)} ns
                          </div>
                          <div className="text-xs text-slate-500">
                            {(eat.eatNoPF / memAccessTime).toFixed(2)}x overhead
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-6">
                          <div className="text-sm text-slate-400 mb-2">EAT (total):</div>
                          <div className="text-4xl font-bold text-yellow-400 mb-2">
                            {eat.eatTotal >= 1000 ? `${(eat.eatTotal/1000).toFixed(1)} µs` : `${eat.eatTotal.toFixed(0)} ns`}
                          </div>
                          <div className="text-xs text-slate-500">
                            {eat.slowdown.toFixed(1)}x overhead
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-lg p-6 ${eat.slowdown > 10 ? 'bg-red-950/30 border-2 border-red-500' : 'bg-green-950/30 border border-green-500/20'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        {eat.slowdown > 10 ? (
                          <>
                            <Activity className="w-6 h-6 text-red-400" />
                            <span className="text-xl font-bold text-red-400">Performance Crítico!</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-6 h-6 text-green-400" />
                            <span className="text-xl font-bold text-green-400">Performance Bom!</span>
                          </>
                        )}
                      </div>
                      <div className="text-sm text-slate-300">
                        {eat.slowdown > 10 
                          ? `Sistema está ${eat.slowdown.toFixed(1)}x mais lento! Considere aumentar RAM ou reduzir page fault rate.`
                          : `Sistema operando eficientemente com overhead de apenas ${eat.slowdown.toFixed(1)}x.`
                        }
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">📊 Exemplos Reais</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        scenario: "Sistema Ideal",
                        tlb: "99%",
                        pf: "0.001%",
                        eat: "~102 ns",
                        overhead: "1.02x",
                        color: "green"
                      },
                      {
                        scenario: "Sistema Típico",
                        tlb: "98%",
                        pf: "0.01%",
                        eat: "~110 ns",
                        overhead: "1.1x",
                        color: "green"
                      },
                      {
                        scenario: "Sistema Carregado",
                        tlb: "95%",
                        pf: "0.1%",
                        eat: "~150 ns",
                        overhead: "1.5x",
                        color: "yellow"
                      },
                      {
                        scenario: "Thrashing",
                        tlb: "90%",
                        pf: "1%",
                        eat: "~100 µs",
                        overhead: "1000x",
                        color: "red"
                      }
                    ].map((ex, i) => (
                      <div key={i} className={`bg-${ex.color}-950/20 border border-${ex.color}-500/20 rounded p-4`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold text-${ex.color}-400`}>{ex.scenario}</span>
                          <Badge className={`bg-${ex.color}-500`}>{ex.overhead}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-slate-300">
                          <div>TLB: {ex.tlb}</div>
                          <div>PF: {ex.pf}</div>
                          <div>EAT: {ex.eat}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["tlb", "benchmarks", "codigo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab}</h2>
                <div className="text-center text-slate-400 py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Parte da estrutura épica de 1100+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-green-950/50 to-emerald-950/50 backdrop-blur-sm border-green-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-green-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-green-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems</div>
                  <div className="text-xs text-slate-500">Chapter 3.6: Performance</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">🔗 Benchmarks</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-emerald-400">SPEC CPU</div>
                  <div>Standard Performance Evaluation Corporation</div>
                  <div className="text-xs text-slate-500">www.spec.org</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

