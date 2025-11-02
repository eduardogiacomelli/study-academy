"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  BookOpen,
  Cpu,
  ArrowRight,
  Binary,
  Layers,
  Info,
  Zap,
  AlertCircle,
  TrendingUp
} from "lucide-react";

export default function Capitulo6Page() {
  const [highlightedConcept, setHighlightedConcept] = useState<string | null>(null);
  const [showMMUAnimation, setShowMMUAnimation] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute top-0 right-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Capítulo 6
            </h1>
            
            <p className="text-2xl text-white/90 mb-2">
              Gerência de Memória
            </p>
            
            <p className="text-lg text-white/80 mb-6">
              Prof. Dr. Eduardo Camilo Inacio - INE5611
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Cpu className="size-3 mr-1" /> MMU
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Binary className="size-3 mr-1" /> Lógico vs Físico
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Layers className="size-3 mr-1" /> Técnicas
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Introdução */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <Info className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Introdução</h2>
                  <p className="text-muted-foreground">Por que gerenciar memória?</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-4">💡 Conceitos-Chave:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 3 }}
                      onHoverStart={() => setHighlightedConcept("multi")}
                      onHoverEnd={() => setHighlightedConcept(null)}
                      className={`p-4 rounded-lg transition-colors ${
                        highlightedConcept === "multi" 
                          ? "bg-primary/20 border-2 border-primary" 
                          : "bg-background/50 border"
                      }`}
                    >
                      <p className="font-semibold mb-2">🔄 Multiprogramação</p>
                      <p className="text-xs text-muted-foreground">
                        Manter vários processos em memória simultaneamente
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 3 }}
                      onHoverStart={() => setHighlightedConcept("eficiencia")}
                      onHoverEnd={() => setHighlightedConcept(null)}
                      className={`p-4 rounded-lg transition-colors ${
                        highlightedConcept === "eficiencia"
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-background/50 border"
                      }`}
                    >
                      <p className="font-semibold mb-2">⚡ Eficiência</p>
                      <p className="text-xs text-muted-foreground">
                        Alocar memória de forma eficiente para maximizar processos
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 3 }}
                      onHoverStart={() => setHighlightedConcept("hardware")}
                      onHoverEnd={() => setHighlightedConcept(null)}
                      className={`p-4 rounded-lg transition-colors ${
                        highlightedConcept === "hardware"
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-background/50 border"
                      }`}
                    >
                      <p className="font-semibold mb-2">🔧 Hardware</p>
                      <p className="text-xs text-muted-foreground">
                        Algoritmos dependem de facilidades do processador
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 3 }}
                      onHoverStart={() => setHighlightedConcept("niveis")}
                      onHoverEnd={() => setHighlightedConcept(null)}
                      className={`p-4 rounded-lg transition-colors ${
                        highlightedConcept === "niveis"
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-background/50 border"
                      }`}
                    >
                      <p className="font-semibold mb-2">📊 Dois Níveis</p>
                      <p className="text-xs text-muted-foreground">
                        Memória principal (RAM) + Memória secundária (Disco)
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <AlertCircle className="size-4" />
                      Importante:
                    </strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Executar um programa significa <strong>transferi-lo da memória secundária (disco)
                    para a memória principal (RAM)</strong>. A gerência de memória determina
                    <strong> como</strong> e <strong>onde</strong> esse programa será colocado.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Memória Lógica vs Física */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <Binary className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Memória Lógica vs Física</h2>
                  <p className="text-muted-foreground">Abstração fundamental</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-6 h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <Binary className="size-5 text-blue-500" />
                        Memória Lógica (Virtual)
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">👁️</span>
                          <span><strong>Visão do Processo:</strong> É o que o processo &ldquo;enxerga&rdquo;</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">📍</span>
                          <span><strong>Endereços Lógicos:</strong> Gerados pela CPU durante execução</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">🎭</span>
                          <span><strong>Abstração:</strong> Processo não sabe onde está na RAM</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">🔒</span>
                          <span><strong>Isolamento:</strong> Cada processo tem seu próprio espaço</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-xs font-mono">
                        Exemplo: <code>0x00401000</code> (endereço virtual)
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-6 h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <Cpu className="size-5 text-green-500" />
                        Memória Física (Real)
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">⚡</span>
                          <span><strong>Hardware Real:</strong> Circuitos integrados de memória (RAM)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">📌</span>
                          <span><strong>Endereços Físicos:</strong> Posições reais na memória</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">🎯</span>
                          <span><strong>Concreto:</strong> Único espaço compartilhado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">🔓</span>
                          <span><strong>SO Gerencia:</strong> Alocação e proteção</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded text-xs font-mono">
                        Exemplo: <code>0x10FF4A00</code> (endereço físico)
                      </div>
                    </Card>
                  </motion.div>
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="size-5 text-purple-500" />
                    Ponto-Chave
                  </h4>
                  <p className="text-sm leading-relaxed">
                    <strong>Programas de usuário</strong> manipulam apenas <strong>endereços lógicos</strong>.
                    A <strong>tradução</strong> para endereços físicos é feita pelo <strong>hardware (MMU)</strong>
                    em <strong>tempo de execução</strong>, de forma <strong>transparente</strong> para o processo.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* MMU - Memory Management Unit */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <Cpu className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">MMU - Memory Management Unit</h2>
                  <p className="text-muted-foreground">Hardware de tradução de endereços</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">
                    A <strong className="text-green-600 dark:text-green-400">MMU</strong> é o circuito
                    de hardware responsável por mapear <strong>endereços lógicos</strong> em
                    <strong> endereços físicos</strong> em tempo real.
                  </p>
                </div>

                <Button
                  onClick={() => setShowMMUAnimation(!showMMUAnimation)}
                  className="w-full md:w-auto"
                >
                  {showMMUAnimation ? "Pausar Animação" : "▶️ Animar Tradução"}
                </Button>

                <div className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between gap-8 flex-wrap md:flex-nowrap">
                    {/* CPU */}
                    <motion.div
                      className="flex-1 min-w-[150px]"
                      animate={{
                        scale: showMMUAnimation ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: showMMUAnimation ? Infinity : 0
                      }}
                    >
                      <div className="p-6 rounded-xl bg-blue-500/20 border-2 border-blue-500 text-center">
                        <Cpu className="size-12 mx-auto mb-3 text-blue-600" />
                        <h4 className="font-semibold mb-2">CPU</h4>
                        <p className="text-xs text-muted-foreground mb-3">Gera endereço lógico</p>
                        <Badge className="bg-blue-500/30 text-blue-700">0x0040</Badge>
                      </div>
                    </motion.div>

                    {/* Seta */}
                    <motion.div
                      animate={{
                        x: showMMUAnimation ? [0, 10, 0] : 0,
                        opacity: showMMUAnimation ? [0.5, 1, 0.5] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: showMMUAnimation ? Infinity : 0
                      }}
                    >
                      <ArrowRight className="size-8 text-green-500" />
                    </motion.div>

                    {/* MMU */}
                    <motion.div
                      className="flex-1 min-w-[150px]"
                      animate={{
                        scale: showMMUAnimation ? [1, 1.1, 1] : 1,
                        rotate: showMMUAnimation ? [0, 5, -5, 0] : 0
                      }}
                      transition={{
                        duration: 1,
                        repeat: showMMUAnimation ? Infinity : 0
                      }}
                    >
                      <div className="p-6 rounded-xl bg-green-500/20 border-2 border-green-500 text-center">
                        <Zap className="size-12 mx-auto mb-3 text-green-600" />
                        <h4 className="font-semibold mb-2">MMU</h4>
                        <p className="text-xs text-muted-foreground mb-3">Traduz endereço</p>
                        <div className="space-y-1">
                          <Badge className="bg-blue-500/30 text-blue-700 text-xs">Lógico: 0x0040</Badge>
                          <div className="text-green-600 font-semibold">+</div>
                          <Badge className="bg-green-500/30 text-green-700 text-xs">Base: 0x1000</Badge>
                          <div className="text-green-600 font-semibold">=</div>
                          <Badge className="bg-purple-500/30 text-purple-700">Físico: 0x1040</Badge>
                        </div>
                      </div>
                    </motion.div>

                    {/* Seta */}
                    <motion.div
                      animate={{
                        x: showMMUAnimation ? [0, 10, 0] : 0,
                        opacity: showMMUAnimation ? [0.5, 1, 0.5] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: showMMUAnimation ? Infinity : 0,
                        delay: 0.3
                      }}
                    >
                      <ArrowRight className="size-8 text-purple-500" />
                    </motion.div>

                    {/* RAM */}
                    <motion.div
                      className="flex-1 min-w-[150px]"
                      animate={{
                        scale: showMMUAnimation ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        duration: 1,
                        repeat: showMMUAnimation ? Infinity : 0,
                        delay: 0.6
                      }}
                    >
                      <div className="p-6 rounded-xl bg-purple-500/20 border-2 border-purple-500 text-center">
                        <Layers className="size-12 mx-auto mb-3 text-purple-600" />
                        <h4 className="font-semibold mb-2">RAM</h4>
                        <p className="text-xs text-muted-foreground mb-3">Acessa posição física</p>
                        <Badge className="bg-purple-500/30 text-purple-700">0x1040</Badge>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 p-4 bg-background/50 rounded-lg border">
                    <p className="text-sm text-center">
                      <strong>Fórmula:</strong> <code className="bg-muted px-2 py-1 rounded">Endereço Físico = Endereço Lógico + Registrador Base</code>
                    </p>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mt-8 mb-4">Características da MMU:</h3>
                  <ul className="space-y-2">
                    <li>✅ <strong>Hardware dedicado</strong> - Tradução em velocidade do processador</li>
                    <li>✅ <strong>Transparente</strong> - Processo não sabe que está acontecendo</li>
                    <li>✅ <strong>Proteção</strong> - Verifica limites de acesso</li>
                    <li>✅ <strong>Cache (TLB)</strong> - Acelera traduções frequentes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Técnicas de Gerência */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <TrendingUp className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Técnicas de Gerência de Memória</h2>
                  <p className="text-muted-foreground">Evolução histórica</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold bg-muted/50">Técnica</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Época</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Vantagens</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Desvantagens</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Partição Fixa</td>
                        <td className="p-3 text-muted-foreground">Anos 60</td>
                        <td className="p-3 text-xs">Simples, rápida</td>
                        <td className="p-3 text-xs">Fragmentação interna alta</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Partição Dinâmica</td>
                        <td className="p-3 text-muted-foreground">Anos 60-70</td>
                        <td className="p-3 text-xs">Sem fragmentação interna</td>
                        <td className="p-3 text-xs">Fragmentação externa, compactação</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Paginação</td>
                        <td className="p-3 text-muted-foreground">Anos 70+</td>
                        <td className="p-3 text-xs">Sem frag. externa, memória virtual</td>
                        <td className="p-3 text-xs">Overhead tabela, frag. interna baixa</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Segmentação</td>
                        <td className="p-3 text-muted-foreground">Anos 70-80</td>
                        <td className="p-3 text-xs">Proteção lógica, compartilhamento</td>
                        <td className="p-3 text-xs">Fragmentação externa</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Seg. + Paginação</td>
                        <td className="p-3 text-muted-foreground">Anos 80+</td>
                        <td className="p-3 text-xs">Combina vantagens</td>
                        <td className="p-3 text-xs">Complexidade alta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
                  <h4 className="font-semibold mb-3">🎯 Padrão Moderno:</h4>
                  <p className="text-sm">
                    <strong>Paginação multinível (4 níveis)</strong> é o padrão em processadores modernos (x86-64, ARM64).
                    Sistemas como Linux, Windows e macOS usam paginação como base, com segmentação apenas para
                    compatibilidade legacy.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Código Exemplo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-indigo-500/5 border-2 border-indigo-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20">
                  <BookOpen className="size-6 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Exemplo: Tradução Simples</h2>
                  <p className="text-muted-foreground">Registrador Base + Limite</p>
                </div>
              </div>

              <div className="space-y-4">
                <CodeBlock language="c">{`// Gerência de memória simples com Base + Limite
// Usado em sistemas mais antigos (não mais comum hoje)

typedef struct {
    uint32_t base;    // Endereço físico inicial
    uint32_t limit;   // Tamanho do processo
} MemoryContext;

// Tradução de endereço lógico para físico
uint32_t translate_address(uint32_t logical_addr, MemoryContext* ctx) {
    // 1. Verificar se está dentro dos limites
    if (logical_addr >= ctx->limit) {
        // Violação de segmentação!
        raise_segfault();
        return 0;
    }
    
    // 2. Traduzir: físico = lógico + base
    uint32_t physical_addr = ctx->base + logical_addr;
    
    return physical_addr;
}

// Exemplo de uso
int main() {
    MemoryContext process_A = {
        .base = 0x10000,    // Começa em 64KB
        .limit = 0x4000     // Tamanho: 16KB
    };
    
    uint32_t logical = 0x1000;  // Acesso ao offset 4KB
    uint32_t physical = translate_address(logical, &process_A);
    
    // Resultado: 0x11000 (64KB + 4KB)
    printf("Lógico: 0x%X -> Físico: 0x%X\\n", logical, physical);
    
    // Tentativa de acesso inválido
    logical = 0x5000;  // Além do limite (16KB)
    translate_address(logical, &process_A);  // SEGFAULT!
    
    return 0;
}`}</CodeBlock>

                <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold mb-2">💡 Observações:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <code>base</code>: Onde o processo está na RAM</li>
                    <li>• <code>limit</code>: Tamanho máximo permitido</li>
                    <li>• Verificação de limites protege de acessos inválidos</li>
                    <li>• MMU faz isso em <strong>hardware</strong> (muito mais rápido!)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Conclusão Cap 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">✅ Capítulo 6 Completo!</h3>
                <p className="text-muted-foreground mb-6">
                  Você aprendeu os fundamentos da gerência de memória
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="text-xs font-semibold">Memória Lógica</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-xs font-semibold">Memória Física</div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border">
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="text-xs font-semibold">MMU</div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-xs font-semibold">Técnicas</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Paginação
            </a>
            <a href="/os/memoria/paginacao/cap7" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Capítulo 7 (Memória Virtual) <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

