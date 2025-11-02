"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  BookOpen,
  Cpu,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Star,
  Target
} from "lucide-react";
import Link from "next/link";

export default function ConclusaoPage() {
  const topics = [
    { title: "Endereçamento Virtual", icon: Cpu, status: "✅" },
    { title: "Tabela de Páginas", icon: BookOpen, status: "✅" },
    { title: "TLB", icon: TrendingUp, status: "✅" },
    { title: "Paginação Multinível", icon: Lightbulb, status: "✅" },
    { title: "Localidade de Referência", icon: Target, status: "✅" },
    { title: "Page Fault", icon: CheckCircle, status: "✅" },
    { title: "Swapping", icon: ArrowRight, status: "✅" },
    { title: "Huge Pages, COW, mmap, NUMA", icon: Star, status: "✅" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
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
              className="p-4 rounded-full inline-flex mb-6 bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <CheckCircle className="size-10" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Conclusão
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Recapitulação completa de Paginação - Do conceito à implementação real
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              <CheckCircle className="size-5" />
              <span className="font-semibold">16 Páginas Completas</span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Resumo Executivo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <BookOpen className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Resumo Executivo</h2>
                  <p className="text-muted-foreground">O que aprendemos sobre Paginação</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  A <strong className="text-green-600 dark:text-green-400">Paginação</strong> é o mecanismo
                  fundamental de <strong>memória virtual</strong> nos sistemas operacionais modernos,
                  permitindo que processos utilizem mais memória do que fisicamente disponível,
                  com isolamento, proteção e compartilhamento eficientes.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2">
                    <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                      <Cpu className="size-5 text-blue-500" />
                      Conceitos Fundamentais
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span><strong>Páginas:</strong> Blocos fixos de 4 KB (tipicamente)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span><strong>Frames:</strong> Blocos físicos equivalentes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span><strong>MMU:</strong> Hardware que traduz endereços</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span><strong>Page Table:</strong> Mapeamento virtual → físico</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2">
                    <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                      <Star className="size-5 text-purple-500" />
                      Vantagens Chave
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span><strong>Isolamento:</strong> Processos não se interferem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span><strong>Proteção:</strong> Bits R/W/X por página</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span><strong>Compartilhamento:</strong> Libs e código comum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span><strong>Memória Virtual:</strong> &gt; RAM física</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Tópicos Cobertos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <CheckCircle className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Tópicos Cobertos</h2>
                  <p className="text-muted-foreground">16 páginas de conteúdo premium</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topics.map((topic, idx) => {
                  const Icon = topic.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                    >
                      <Card className="p-4 h-full bg-gradient-to-br from-background to-muted/20 border-2 hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="size-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm leading-tight mb-1">{topic.title}</h4>
                            <Badge className="bg-green-500/20 text-green-600 text-xs">
                              {topic.status}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.section>

          {/* Comparação Final */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <TrendingUp className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Comparação de Técnicas</h2>
                  <p className="text-muted-foreground">Paginação vs Outras Abordagens</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold bg-muted/50">Aspecto</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Partição Fixa</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Partição Dinâmica</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Paginação</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Segmentação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Fragmentação Externa</td>
                        <td className="p-3">❌ Alta</td>
                        <td className="p-3">❌ Alta</td>
                        <td className="p-3">✅ Zero</td>
                        <td className="p-3">⚠️ Média</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Fragmentação Interna</td>
                        <td className="p-3">❌ Alta</td>
                        <td className="p-3">✅ Zero</td>
                        <td className="p-3">⚠️ Baixa (avg 2KB)</td>
                        <td className="p-3">✅ Zero</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Memória Virtual</td>
                        <td className="p-3">❌ Não</td>
                        <td className="p-3">❌ Não</td>
                        <td className="p-3">✅ Sim</td>
                        <td className="p-3">✅ Sim</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Proteção</td>
                        <td className="p-3">⚠️ Simples</td>
                        <td className="p-3">⚠️ Simples</td>
                        <td className="p-3">✅ Granular</td>
                        <td className="p-3">✅ Lógica</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Compartilhamento</td>
                        <td className="p-3">❌ Difícil</td>
                        <td className="p-3">❌ Difícil</td>
                        <td className="p-3">✅ Fácil</td>
                        <td className="p-3">✅ Natural</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Uso Moderno</td>
                        <td className="p-3">❌ Obsoleto</td>
                        <td className="p-3">❌ Raro</td>
                        <td className="p-3">✅ Padrão</td>
                        <td className="p-3">⚠️ Combinado</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 mt-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    Conclusão
                  </h4>
                  <p className="text-sm">
                    <strong>Paginação</strong> é a técnica dominante por equilibrar eficiência, simplicidade de implementação,
                    e suporte robusto a memória virtual. Sistemas modernos (Linux, Windows, macOS) usam
                    <strong> paginação multinível (4 níveis)</strong> com otimizações como TLB, Huge Pages, e COW.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Próximos Passos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <Lightbulb className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Próximos Passos</h2>
                  <p className="text-muted-foreground">Continue sua jornada de aprendizado</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/os/memoria/segmentacao">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800 cursor-pointer"
                  >
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ArrowRight className="size-5 text-blue-500" />
                      Segmentação
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Explore divisão lógica de memória por segmentos
                    </p>
                  </motion.div>
                </Link>

                <Link href="/os/memoria/virtual">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800 cursor-pointer"
                  >
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ArrowRight className="size-5 text-purple-500" />
                      Memória Virtual
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Aprofunde em working set, thrashing e otimizações
                    </p>
                  </motion.div>
                </Link>

                <Link href="/os/memoria/substituicao">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 cursor-pointer"
                  >
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ArrowRight className="size-5 text-green-500" />
                      Substituição
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Compare FIFO, LRU, Clock, Optimal e NRU
                    </p>
                  </motion.div>
                </Link>
              </div>
            </Card>
          </motion.section>

          {/* Estatísticas Finais */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Parabéns! 🎉</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Você completou o módulo de Paginação
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
                    <div className="text-3xl font-bold text-blue-600">16</div>
                    <div className="text-sm text-muted-foreground">Páginas</div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800">
                    <div className="text-3xl font-bold text-purple-600">6K+</div>
                    <div className="text-sm text-muted-foreground">Linhas</div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800">
                    <div className="text-3xl font-bold text-green-600">25+</div>
                    <div className="text-sm text-muted-foreground">Exercícios</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800">
                    <div className="text-3xl font-bold text-amber-600">8</div>
                    <div className="text-sm text-muted-foreground">Simuladores</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex justify-center pt-8">
            <Link href="/os/memoria/paginacao">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold flex items-center gap-2 shadow-lg"
              >
                Voltar ao Hub de Paginação
                <ArrowRight className="size-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

