"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Cpu,
  Layers,
  Shield,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Binary,
  HardDrive,
  TrendingUp,
  Clock,
  Activity
} from "lucide-react";

export default function TeoriaPaginacaoPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Subtle animated blob */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm">
              <BookOpen className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Teoria Completa de Paginação
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Todos os conceitos fundamentais e avançados de memória virtual por páginas
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Layers className="size-3 mr-1" /> Conceitos Base
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Shield className="size-3 mr-1" /> Proteção
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="size-3 mr-1" /> Compartilhamento
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Performance
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* 1. Endereçamento Virtual */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10 relative overflow-hidden">
              {/* Subtle glow blob */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20"
                    whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Binary className="size-6 text-blue-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Endereçamento Virtual</h2>
                    <p className="text-muted-foreground">Abstração de memória</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      A paginação cria uma <strong className="text-blue-600 dark:text-blue-400">abstração</strong> entre o endereço que o programa vê
                      (endereço virtual/lógico) e o endereço real na memória física.
                    </p>

                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 my-6">
                      <p className="text-sm mb-2">
                        <strong>Referências Acadêmicas:</strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (4th ed.), Cap. 3.3</li>
                        <li>• Silberschatz, A. et al. - <em>Operating System Concepts</em> (10th ed.), Cap. 9.2</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
                      <Layers className="size-5 text-blue-500" />
                      Espaço de Endereçamento
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 not-prose">
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-6 h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                            <Cpu className="size-5 text-blue-500" />
                            Espaço Virtual
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Visto pelo processo</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Contíguo e uniforme</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Começa do zero</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Isolado de outros processos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Pode ser ENORME (64-bit = 16 EB)</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                            <HardDrive className="size-5 text-purple-500" />
                            Espaço Físico
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Memória RAM real</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Fragmentado</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Limitado pelo hardware</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Compartilhado entre processos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Gerenciado pelo SO</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Decomposição de Endereço Virtual</h3>
                    
                    <motion.div 
                      className="p-6 rounded-xl bg-muted/50 border-2 border-border"
                      whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="font-mono text-sm mb-3 font-semibold">Endereço Virtual (32-bit, página 4KB):</p>
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="flex-1 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-700 text-center"
                              whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.8)" }}
                            >
                              <div className="font-mono font-bold text-lg">20 bits</div>
                              <div className="text-xs mt-1">Número da Página</div>
                              <div className="text-xs text-muted-foreground mt-1">2²⁰ = 1M páginas</div>
                            </motion.div>
                            <ArrowRight className="size-6 text-muted-foreground flex-shrink-0" />
                            <motion.div 
                              className="flex-1 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-700 text-center"
                              whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.8)" }}
                            >
                              <div className="font-mono font-bold text-lg">12 bits</div>
                              <div className="text-xs mt-1">Offset</div>
                              <div className="text-xs text-muted-foreground mt-1">2¹² = 4096 bytes</div>
                            </motion.div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="font-mono text-sm mb-3 font-semibold flex items-center gap-2">
                            <Info className="size-4 text-blue-500" />
                            Cálculo Passo-a-Passo:
                          </p>
                          <pre className="bg-background p-4 rounded-lg border text-xs overflow-x-auto font-mono leading-relaxed"><code>{`página_size = 4096 bytes (4 KB = 2¹²)
offset_bits = log₂(4096) = 12 bits
página_bits = 32 - 12 = 20 bits

Número de páginas possíveis = 2²⁰ = 1.048.576 páginas
Espaço virtual total = 2³² = 4 GB`}</code></pre>
                        </div>

                        <div>
                          <p className="font-mono text-sm mb-3 font-semibold flex items-center gap-2">
                            <Zap className="size-4 text-amber-500" />
                            Tradução Virtual → Físico:
                          </p>
                          <pre className="bg-background p-4 rounded-lg border text-xs overflow-x-auto font-mono leading-relaxed"><code>{`1. Extrair número da página: virtual_addr >> 12
2. Extrair offset: virtual_addr & 0xFFF
3. Consultar tabela: frame = page_table[página]
4. Calcular físico: (frame << 12) | offset`}</code></pre>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 2. Demand Paging & Working Set (NOVO!) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-emerald-500/5 border-2 border-emerald-500/10 relative overflow-hidden">
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Activity className="size-6 text-emerald-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Demand Paging & Working Set</h2>
                    <p className="text-muted-foreground">Paginação sob demanda e conjunto de trabalho</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      <strong>Demand Paging</strong> carrega páginas na memória apenas quando são realmente acessadas,
                      reduzindo tempo de inicialização e economizando memória.
                    </p>

                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 my-6">
                      <p className="text-sm mb-2">
                        <strong>Referências Acadêmicas:</strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Denning, P. J. - &ldquo;Working Sets Past and Present&rdquo; (IEEE Trans., 1980)</li>
                        <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em>, Cap. 3.4</li>
                        <li>• Silberschatz, A. et al. - <em>Operating System Concepts</em>, Cap. 10.2</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Fluxo de Demand Paging</h3>

                    <div className="grid md:grid-cols-3 gap-4 not-prose">
                      {[
                        { num: 1, title: "Acesso", desc: "Processo tenta acessar página não presente", color: "blue" },
                        { num: 2, title: "Page Fault", desc: "MMU gera exceção, SO toma controle", color: "amber" },
                        { num: 3, title: "Carregar", desc: "SO carrega página do disco para RAM", color: "green" }
                      ].map((step, idx) => (
                        <motion.div
                          key={step.num}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className={`p-5 h-full border-2 border-${step.color}-200 dark:border-${step.color}-800 bg-${step.color}-50/50 dark:bg-${step.color}-950/20`}>
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-${step.color}-500/20 text-${step.color}-600 dark:text-${step.color}-400 font-bold mb-3`}>
                              {step.num}
                            </div>
                            <h4 className="font-semibold mb-2">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Working Set Model</h3>

                    <p className="leading-relaxed">
                      O <strong>Working Set</strong> é o conjunto de páginas que um processo está usando ativamente
                      em um determinado intervalo de tempo. Proposto por Peter Denning em 1968.
                    </p>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-200 dark:border-emerald-800 my-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="size-5 text-emerald-500" />
                        Definição Formal
                      </h4>
                      <p className="text-sm mb-3 font-mono bg-background/50 p-3 rounded">
                        WS(t, Δ) = {`{páginas referenciadas entre (t-Δ) e t}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Onde <strong>t</strong> = tempo atual, <strong>Δ</strong> = janela de tempo (working set window)
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Thrashing</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Quando o sistema não consegue manter o working set de todos os processos na memória,
                            ocorre <strong>thrashing</strong>: o sistema gasta mais tempo fazendo page faults
                            do que executando código útil.
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Solução:</strong> Reduzir grau de multiprogramação (suspender processos)
                            ou aumentar memória física.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 4. Tabela de Páginas - Estrutura Detalhada */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
                animate={{ 
                  x: [0, 30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <HardDrive className="size-6 text-purple-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Tabela de Páginas</h2>
                    <p className="text-muted-foreground">Estrutura fundamental do mapeamento</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-purple-600 dark:text-purple-400">Tabela de Páginas</strong> é a estrutura
                      de dados central da paginação, mantendo o mapeamento entre páginas virtuais e frames físicos.
                    </p>

                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 my-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Fonte: Material da Professora (PDF 02 - Paginação e Segmentação)
                        </strong>
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Estrutura da Tabela</h3>

                    <p className="leading-relaxed mb-4">
                      <strong>Cada processo</strong> tem sua própria tabela de páginas. O SO mantém um ponteiro para
                      a tabela do processo atual no <strong>registrador PTBR (Page Table Base Register)</strong>.
                    </p>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold mb-4">Entrada da Tabela (PTE - Page Table Entry)</h4>
                      
                      <div className="space-y-3">
                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">Frame Number</Badge>
                            </div>
                            <p className="text-sm">Número do quadro físico (20 bits para 4GB memória, 4KB páginas)</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">Present (P)</Badge>
                            </div>
                            <p className="text-sm">1 = página na RAM, 0 = página no disco (page fault)</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-red-500/20 text-red-600 dark:text-red-400">Modified (M)</Badge>
                            </div>
                            <p className="text-sm">Dirty bit - 1 = página modificada (deve ser salva no swap)</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Referenced (R)</Badge>
                            </div>
                            <p className="text-sm">1 = página acessada recentemente (usado por LRU)</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400">Protection</Badge>
                            </div>
                            <p className="text-sm">Bits R/W/X (3 bits) - permissões de acesso</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">Valid (V)</Badge>
                            </div>
                            <p className="text-sm">1 = entrada válida, 0 = entrada não usada</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-teal-500/20 text-teal-600 dark:text-teal-400">Caching</Badge>
                            </div>
                            <p className="text-sm">Cache disable bit - para I/O mapeado em memória</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Tamanhos Típicos</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left p-3 font-semibold bg-muted/50">Arquitetura</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Tamanho Página</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Bits Offset</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Entradas PTE</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">x86 (32-bit)</td>
                            <td className="p-3">4 KB</td>
                            <td className="p-3">12 bits</td>
                            <td className="p-3">2²⁰ = 1.048.576</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">x86-64</td>
                            <td className="p-3">4 KB</td>
                            <td className="p-3">12 bits</td>
                            <td className="p-3">2³⁶ (multi-nível)</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">ARM64</td>
                            <td className="p-3">4 KB / 16 KB / 64 KB</td>
                            <td className="p-3">12-16 bits</td>
                            <td className="p-3">Variável</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">RISC-V</td>
                            <td className="p-3">4 KB</td>
                            <td className="p-3">12 bits</td>
                            <td className="p-3">2³⁰ (multi-nível)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Problema: Overhead da Tabela</h3>

                    <div className="p-5 rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-500/30">
                      <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Exemplo Prático</h4>
                      <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`Sistema: 32-bit, páginas 4KB, PTE = 4 bytes

Páginas possíveis: 2³² / 2¹² = 2²⁰ = 1.048.576 páginas
Tamanho tabela: 1.048.576 × 4 bytes = 4 MB POR PROCESSO!

Com 100 processos = 400 MB só de tabelas! 😱`}</code></pre>
                      <p className="text-sm mt-3 text-muted-foreground">
                        <strong>Solução:</strong> Paginação Multi-Nível (2, 3 ou 4 níveis)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 5. Fragmentação na Paginação */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10 relative overflow-hidden">
              <motion.div
                className="absolute -bottom-10 right-1/3 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl"
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.25, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AlertTriangle className="size-6 text-amber-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Fragmentação</h2>
                    <p className="text-muted-foreground">Interna vs Externa</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="grid md:grid-cols-2 gap-6 not-prose">
                      <motion.div whileHover={{ scale: 1.02, y: -3 }} transition={{ duration: 0.2 }}>
                        <Card className="p-6 h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
                            <CheckCircle className="size-5" />
                            Sem Fragmentação Externa
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Como todos os blocos têm tamanho fixo (páginas/frames), <strong>qualquer frame livre
                            pode ser alocado para qualquer página</strong>. Não há &ldquo;buracos&rdquo; inutilizáveis.
                          </p>
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                            <p className="text-xs font-mono">
                              Frame 0: Processo A, página 5<br />
                              Frame 1: Processo B, página 2<br />
                              Frame 2: LIVRE ← pode alocar!<br />
                              Frame 3: Processo A, página 1
                            </p>
                          </div>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02, y: -3 }} transition={{ duration: 0.2 }}>
                        <Card className="p-6 h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
                            <AlertTriangle className="size-5" />
                            Fragmentação Interna
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Processo pode não usar completamente a <strong>última página</strong>. O espaço
                            não usado dentro do frame é desperdiçado.
                          </p>
                          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded">
                            <p className="text-xs font-mono">
                              Processo: 13 KB<br />
                              Páginas 4KB: precisa 4 páginas<br />
                              Uso: 3×4KB + 1KB = 13KB<br />
                              Desperdício: <strong className="text-amber-600">3KB</strong> na última
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            <strong>Média:</strong> Metade do tamanho da página por processo
                          </p>
                        </Card>
                      </motion.div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 mt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Info className="size-5 text-blue-500" />
                        Trade-off do Tamanho da Página
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold mb-2">Páginas Pequenas (512B, 1KB):</p>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>✓ Menos fragmentação interna</li>
                            <li>✗ Mais entradas na tabela</li>
                            <li>✗ Mais page faults</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-2">Páginas Grandes (16KB, 64KB):</p>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>✓ Menos entradas na tabela</li>
                            <li>✓ Menos page faults</li>
                            <li>✗ Mais fragmentação interna</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm mt-4 text-center font-semibold">
                        <strong>Padrão Moderno:</strong> 4 KB (bom equilíbrio)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2 group">
              <motion.span
                className="inline-block"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              Voltar para Paginação
            </a>
            <a href="/os/memoria/paginacao/tlb" className="text-primary hover:underline flex items-center gap-2 group">
              Próximo: TLB
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
