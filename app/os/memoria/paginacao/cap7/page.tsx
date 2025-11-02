"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  BookOpen,
  Zap,
  ArrowRight,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Sparkles
} from "lucide-react";

export default function Capitulo7Page() {
  const [showLocalityDemo, setShowLocalityDemo] = useState(false);
  const [demandPagingStep, setDemandPagingStep] = useState(0);

  const demandPagingSteps = [
    "Processo inicia (nenhuma página carregada)",
    "Acessa instrução em página 0 → Page Fault",
    "SO carrega página 0 do disco",
    "Executa instruções da página 0",
    "Acessa dados em página 5 → Page Fault",
    "SO carrega página 5 do disco",
    "Continua execução normalmente"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Capítulo 7
            </h1>
            
            <p className="text-2xl text-white/90 mb-2">
              Memória Virtual
            </p>
            
            <p className="text-lg text-white/80 mb-6">
              Prof. Dr. Eduardo Camilo Inacio - INE5611
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Demand Paging
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Activity className="size-3 mr-1" /> Localidade
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="size-3 mr-1" /> Vantagens
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Motivação */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-violet-500/5 border-2 border-violet-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-violet-500/10 border-2 border-violet-500/20">
                  <BookOpen className="size-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Motivação</h2>
                  <p className="text-muted-foreground">Por que Memória Virtual?</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800"
                  >
                    <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                      <AlertCircle className="size-5 text-red-500" />
                      ❌ Problemas Sem Memória Virtual
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">1.</span>
                        <span><strong>Tamanho limitado:</strong> Programa não pode ser maior que a RAM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">2.</span>
                        <span><strong>Desperdício:</strong> Código não usado fica em memória (ex: erro handlers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">3.</span>
                        <span><strong>Todo espaço mapeado:</strong> Memória lógica = memória física</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">4.</span>
                        <span><strong>Poucos processos:</strong> Memória cheia rapidamente</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800"
                  >
                    <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                      <CheckCircle className="size-5 text-green-500" />
                      ✅ Solução: Memória Virtual
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0">1.</span>
                        <span><strong>Tamanho ilimitado:</strong> Programa pode ser maior que RAM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0">2.</span>
                        <span><strong>Economia:</strong> Carrega apenas código necessário</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0">3.</span>
                        <span><strong>Separação:</strong> Lógico desvinculado do físico</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0">4.</span>
                        <span><strong>Mais processos:</strong> Maior multiprogramação</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="size-5 text-violet-500" />
                    Objetivo Principal
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Permitir que um processo <strong>execute sem estar completamente em memória</strong>,
                    carregando páginas/segmentos <strong>apenas quando necessário</strong>, economizando
                    RAM e permitindo executar programas <strong>maiores que a memória física</strong>.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Conceito */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <Zap className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Memória Virtual: Conceito</h2>
                  <p className="text-muted-foreground">A técnica fundamental</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  <strong className="text-blue-600 dark:text-blue-400">Memória Virtual</strong> é a técnica
                  que permite a <strong>execução de um processo sem que ele esteja completamente em memória</strong>.
                </p>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800 my-6">
                  <h4 className="font-semibold mb-4">Princípios Básicos:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Paginação/Segmentação por Demanda</p>
                        <p className="text-sm text-muted-foreground">
                          Carregar página/segmento na RAM <strong>apenas quando necessário</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-cyan-600">2</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Manter Apenas o Necessário</p>
                        <p className="text-sm text-muted-foreground">
                          Memória contém apenas páginas/segmentos <strong>ativamente usados</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600">3</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Separação Lógico/Físico</p>
                        <p className="text-sm text-muted-foreground">
                          Endereço lógico <strong>desvinculado</strong> do endereço físico
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Representação Visual:</h4>
                  <div className="p-6 rounded-xl bg-background border-2">
                    <div className="flex items-center justify-between gap-8 flex-wrap md:flex-nowrap">
                      <div className="flex-1 min-w-[200px]">
                        <h5 className="font-semibold mb-4 text-center">Memória Lógica (Processo)</h5>
                        <div className="space-y-2">
                          {["P0", "P1", "P2", "P3", "P4", "P5", "Pn"].map((page, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center font-mono text-sm"
                            >
                              {page}
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-xs text-center mt-3 text-muted-foreground">
                          n &gt; k (mais páginas que frames!)
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <ArrowRight className="size-8 text-primary" />
                        <span className="text-xs font-semibold">Mapeamento</span>
                        <ArrowRight className="size-8 text-primary rotate-180" />
                      </div>

                      <div className="flex-1 min-w-[200px]">
                        <h5 className="font-semibold mb-4 text-center">Memória Física (RAM)</h5>
                        <div className="space-y-2">
                          {["F0 (P0)", "F1 (P2)", "F2 (P5)", "FK (Pn)"].map((frame, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 + 0.3 }}
                              className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center font-mono text-sm"
                            >
                              {frame}
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-xs text-center mt-3 text-muted-foreground">
                          Apenas algumas páginas carregadas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Paginação por Demanda */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <Activity className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Paginação por Demanda</h2>
                  <p className="text-muted-foreground">Lazy Loading de páginas</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">
                    Na <strong className="text-green-600 dark:text-green-400">Paginação por Demanda</strong>,
                    páginas são carregadas <strong>apenas quando acessadas</strong>, não no início do processo.
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <Button
                    onClick={() => setDemandPagingStep(0)}
                    variant="outline"
                    size="sm"
                  >
                    ⏮️ Reiniciar
                  </Button>
                  <Button
                    onClick={() => setDemandPagingStep((prev) => Math.min(prev + 1, demandPagingSteps.length - 1))}
                    disabled={demandPagingStep >= demandPagingSteps.length - 1}
                    size="sm"
                  >
                    ▶️ Próximo Passo
                  </Button>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                  <div className="space-y-4">
                    {demandPagingSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0.3, x: -10 }}
                        animate={{
                          opacity: idx <= demandPagingStep ? 1 : 0.3,
                          x: idx === demandPagingStep ? 5 : 0,
                          scale: idx === demandPagingStep ? 1.02 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-lg ${
                          idx === demandPagingStep
                            ? "bg-green-500/20 border-2 border-green-500"
                            : idx < demandPagingStep
                            ? "bg-background/50 border"
                            : "bg-background/30 border border-dashed"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            idx === demandPagingStep
                              ? "bg-green-500 text-white"
                              : idx < demandPagingStep
                              ? "bg-green-500/50 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {idx < demandPagingStep ? "✓" : idx + 1}
                          </div>
                          <p className="text-sm font-medium">{step}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-3">💡 Vantagens da Paginação por Demanda:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Menos I/O inicial:</strong> Não precisa carregar tudo antes de executar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Menos memória usada:</strong> Apenas o necessário está carregado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Mais processos simultâneos:</strong> Aumenta multiprogramação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Resposta mais rápida:</strong> Processo inicia antes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Princípio da Localidade */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <Target className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Princípio da Localidade</h2>
                  <p className="text-muted-foreground">Base do funcionamento</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  O <strong className="text-purple-600 dark:text-purple-400">Princípio da Localidade</strong> afirma
                  que acessos a instruções e dados são <strong>limitados a um trecho específico</strong> em um
                  determinado instante.
                </p>

                <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 my-6">
                  <h4 className="font-semibold mb-3">🎯 Implicação Prática:</h4>
                  <p className="text-sm">
                    Em qualquer momento, <strong>apenas um pequeno subconjunto</strong> das páginas do processo
                    precisa estar em memória. O resto pode ficar no disco até ser necessário.
                  </p>
                </div>

                <Button
                  onClick={() => setShowLocalityDemo(!showLocalityDemo)}
                  className="w-full md:w-auto mb-6"
                >
                  {showLocalityDemo ? "Ocultar" : "▶️ Demonstrar"} Localidade
                </Button>

                {showLocalityDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
                      <h5 className="font-semibold mb-4">Exemplos de Localidade:</h5>

                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-background/50 border">
                          <p className="font-semibold mb-2">1. Execução Sequencial</p>
                          <CodeBlock language="c">{`// Instruções executam uma após a outra
int main() {
    int a = 10;        // Instrução i
    int b = 20;        // Instrução i+1
    int c = a + b;     // Instrução i+2
    return c;          // Instrução i+3
}
// Localidade ESPACIAL: instruções próximas`}</CodeBlock>
                        </div>

                        <div className="p-4 rounded-lg bg-background/50 border">
                          <p className="font-semibold mb-2">2. Loops</p>
                          <CodeBlock language="c">{`for (int i = 0; i < 1000; i++) {
    sum += array[i];
}
// Localidade TEMPORAL: mesmas instruções
// Localidade ESPACIAL: elementos adjacentes`}</CodeBlock>
                        </div>

                        <div className="p-4 rounded-lg bg-background/50 border">
                          <p className="font-semibold mb-2">3. Funções</p>
                          <CodeBlock language="c">{`void process_data() {
    // Código da função usado repetidamente
}

for (int i = 0; i < 100; i++) {
    process_data();  // Mesma função 100x
}
// Localidade TEMPORAL: código reutilizado`}</CodeBlock>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 mt-6">
                  <h4 className="font-semibold mb-3">🔮 Previsibilidade:</h4>
                  <p className="text-sm">
                    A localidade permite <strong>&ldquo;adivinhar&rdquo;</strong> quais páginas serão necessárias
                    em seguida, possibilitando <strong>prefetching</strong> e minimizando page faults.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Vantagens */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <TrendingUp className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Vantagens da Memória Virtual</h2>
                  <p className="text-muted-foreground">Por que é revolucionária</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    color: "blue",
                    title: "Maior Multiprogramação",
                    desc: "Mais processos simultâneos, pois cada um usa menos memória física"
                  },
                  {
                    icon: Zap,
                    color: "green",
                    title: "Menos I/O",
                    desc: "Reduz operações de carga/swap, carregando apenas o necessário"
                  },
                  {
                    icon: Sparkles,
                    color: "purple",
                    title: "Programas Maiores",
                    desc: "Executa programas maiores que a RAM disponível"
                  }
                ].map((advantage, idx) => {
                  const Icon = advantage.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Card className={`p-6 h-full bg-gradient-to-br from-${advantage.color}-50 to-${advantage.color}-100/50 dark:from-${advantage.color}-950/20 dark:to-${advantage.color}-900/20 border-2 border-${advantage.color}-200 dark:border-${advantage.color}-800`}>
                        <div className={`w-12 h-12 rounded-full bg-${advantage.color}-500/20 flex items-center justify-center mb-4`}>
                          <Icon className={`size-6 text-${advantage.color}-600`} />
                        </div>
                        <h4 className="font-semibold mb-2">{advantage.title}</h4>
                        <p className="text-sm text-muted-foreground">{advantage.desc}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.section>

          {/* Conclusão Cap 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">🎉 Capítulo 7 Completo!</h3>
                <p className="text-muted-foreground mb-6">
                  Você dominou os conceitos de Memória Virtual
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                  <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-950/20 border">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-xs font-semibold">Conceito</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-xs font-semibold">Demand Paging</div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-xs font-semibold">Localidade</div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border">
                    <div className="text-2xl mb-2">🚀</div>
                    <div className="text-xs font-semibold">Vantagens</div>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg"
                >
                  <CheckCircle className="size-6" />
                  PAGINAÇÃO 100% COMPLETA!
                </motion.div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/cap6" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Capítulo 6
            </a>
            <a href="/os/memoria/paginacao/conclusao" className="text-primary hover:underline flex items-center gap-2">
              Ver Conclusão Final <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

