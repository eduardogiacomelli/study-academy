"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { animate, stagger } from "animejs";
import { 
  CheckCircle, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  TrendingUp,
  Clock,
  Cpu,
  Globe,
  Zap,
  Target,
  Award,
  BarChart3,
  Code
} from "lucide-react";

const TIMELINE = [
  { year: 1978, event: "Intel 8086", desc: "Primeira segmentação (16-bit, 4 segmentos)" },
  { year: 1982, event: "Intel 80286", desc: "Protected mode, GDT/LDT, 4 rings" },
  { year: 1985, event: "Intel 80386", desc: "32-bit, paginação, segmentação paginada" },
  { year: 1991, event: "Linux 0.01", desc: "Usa paginação, segmentação flat" },
  { year: 2003, event: "x86-64", desc: "Long mode, segmentação simplificada" },
  { year: 2024, event: "Hoje", desc: "Segmentação legada, foco em paginação" }
];

const QUIZ_QUESTIONS = [
  { q: "Segmentação elimina fragmentação externa?", a: false, explain: "Segmentos têm tamanhos variáveis, causando fragmentação externa. Apenas paginação elimina isso." },
  { q: "GDT é única por sistema?", a: true, explain: "Sim! GDT (Global Descriptor Table) é compartilhada por todos os processos." },
  { q: "Linux usa Rings 0, 1, 2 e 3?", a: false, explain: "Apenas Ring 0 (kernel) e Ring 3 (user). Rings 1 e 2 são ignorados." },
  { q: "TSS armazena contexto completo em x86-64?", a: false, explain: "Em x86-64, TSS é simplificado: apenas RSP0 e ISTs. Contexto completo era no IA-32." }
];

export default function ConclusaoPage() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    animate('.conclusion-card', {
      translateY: [60, 0],
      opacity: [0, 1],
      delay: stagger(150),
      duration: 900,
      ease: 'outExpo'
    });
  }, []);

  const correctAnswers = Object.keys(quizAnswers).filter((k) => 
    quizAnswers[parseInt(k)] === QUIZ_QUESTIONS[parseInt(k)].a
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <Trophy className="size-20 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Conclusão</h1>
            <p className="text-xl">Segmentação: Conceitos, Prática e Aplicações</p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
        <div className="space-y-12">

          {/* O que Aprendemos */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="size-8 text-green-500" />
                <h2 className="text-3xl font-bold">O que Aprendemos</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Conceito de segmentação e divisão lógica",
                  "Tabela de Segmentos (base + limite)",
                  "Proteção R/W/X por segmento",
                  "Compartilhamento de código entre processos",
                  "Fragmentação externa e compactação",
                  "Segmentação paginada (híbrido)",
                  "Intel x86: GDT, LDT, Seletores",
                  "TSS, Call Gates, Privilege Rings",
                  "Flat Segmentation (Linux/Windows)",
                  "20 exercícios práticos"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 hover:scale-105 transition-transform"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Timeline Histórico */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="size-8 text-blue-500" />
                <h2 className="text-3xl font-bold">Timeline Histórico</h2>
              </div>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                
                {TIMELINE.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className={`relative mb-8 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`}
                  >
                    <div className={`flex items-center gap-4 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      <div className="flex-1">
                        <Card className="p-4 hover:shadow-lg transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-500 text-white">{item.year}</Badge>
                            <span className="font-bold">{item.event}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </Card>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-blue-500 border-4 border-background relative z-10" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Comparação Final */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="size-8 text-purple-500" />
                <h2 className="text-3xl font-bold">Comparação Final</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-3 bg-muted/50">Aspecto</th>
                      <th className="text-left p-3 bg-muted/50">Segmentação Pura</th>
                      <th className="text-left p-3 bg-muted/50">Paginação Pura</th>
                      <th className="text-left p-3 bg-muted/50">Seg. Paginada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asp: "Divisão Lógica", seg: "✅ Natural", pag: "❌ Não", hyb: "✅ Natural" },
                      { asp: "Frag. Externa", seg: "❌ Sim", pag: "✅ Não", hyb: "✅ Não" },
                      { asp: "Frag. Interna", seg: "✅ Não", pag: "❌ Sim (~2KB)", hyb: "❌ Sim (~2KB)" },
                      { asp: "Compartilhamento", seg: "✅ Fácil", pag: "⚠️ Complexo", hyb: "✅ Fácil" },
                      { asp: "Proteção", seg: "✅ Granular", pag: "⚠️ Por página", hyb: "✅ Granular" },
                      { asp: "Overhead", seg: "✅ Baixo", pag: "⚠️ Médio", hyb: "❌ Alto" },
                      { asp: "Complexidade HW", seg: "✅ Simples", pag: "⚠️ Média", hyb: "❌ Alta" },
                      { asp: "Uso Moderno", seg: "❌ Raro", pag: "✅ Dominante", hyb: "⚠️ x86 legado" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-semibold">{row.asp}</td>
                        <td className="p-3">{row.seg}</td>
                        <td className="p-3">{row.pag}</td>
                        <td className="p-3">{row.hyb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.section>

          {/* Casos Reais */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8 bg-gradient-to-br from-background to-indigo-500/5 border-2 border-indigo-500/10">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="size-8 text-indigo-500" />
                <h2 className="text-3xl font-bold">Casos Reais</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="size-8 text-blue-600" />
                    <h4 className="font-bold text-lg">Linux</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Flat segmentation (base=0)</li>
                    <li>✓ GDT mínima (5 entradas)</li>
                    <li>✓ Apenas Ring 0 e 3</li>
                    <li>✓ Foco total em paginação</li>
                    <li>✓ FS/GS para TLS</li>
                  </ul>
                  <Badge className="mt-4">arch/x86/kernel/</Badge>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="size-8 text-cyan-600" />
                    <h4 className="font-bold text-lg">Windows</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Flat model (32/64-bit)</li>
                    <li>✓ LDT para TEB/TIB (32-bit)</li>
                    <li>✓ GS para TLS (64-bit)</li>
                    <li>✓ Paginação hierárquica</li>
                    <li>✓ ASLR, DEP, CFG</li>
                  </ul>
                  <Badge className="mt-4">ntoskrnl.exe</Badge>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="size-8 text-green-600" />
                    <h4 className="font-bold text-lg">MINIX 3</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Segmentação por processo</li>
                    <li>✓ Isolamento de drivers</li>
                    <li>✓ Microkernel design</li>
                    <li>✓ Proteção granular</li>
                    <li>✓ Educacional</li>
                  </ul>
                  <Badge className="mt-4">Tanenbaum</Badge>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* Quando Usar */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-300">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="size-8 text-blue-600" />
                Quando Usar Segmentação?
              </h2>
              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <p className="font-semibold mb-2 text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle className="size-5" />
                    Use Segmentação quando:
                  </p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Divisão lógica é importante (código/dados/stack separados)</li>
                    <li>• Compartilhamento de código é frequente (bibliotecas)</li>
                    <li>• Proteção por função lógica é necessária (R/W/X)</li>
                    <li>• Sistema embarcado simples sem MMU completa</li>
                    <li>• Projeto educacional ou microkernel</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <p className="font-semibold mb-2 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <TrendingUp className="size-5" />
                    Evite quando:
                  </p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Fragmentação externa é crítica</li>
                    <li>• Memória virtual com swapping é necessária</li>
                    <li>• Sistema operacional moderno de propósito geral</li>
                    <li>• Performance máxima é prioridade</li>
                    <li>• Portabilidade entre arquiteturas</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <p className="font-semibold mb-2 text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <Zap className="size-5" />
                    Melhor dos dois mundos:
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Segmentação Paginada</strong> (Intel x86) combina divisão lógica com gerenciamento
                    físico eficiente, mas requer hardware mais complexo. Modernamente, paginação pura domina
                    por simplicidade e performance.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Quiz Final */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="conclusion-card p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <Target className="size-8 text-purple-500" />
                <h2 className="text-3xl font-bold">Quiz Final</h2>
              </div>
              <div className="space-y-4">
                {QUIZ_QUESTIONS.map((quiz, idx) => (
                  <Card key={idx} className="p-5">
                    <p className="font-semibold mb-3">{idx + 1}. {quiz.q}</p>
                    <div className="flex gap-3 mb-3">
                      <Button
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [idx]: true }))}
                        variant={quizAnswers[idx] === true ? "default" : "outline"}
                        size="sm"
                      >
                        Verdadeiro
                      </Button>
                      <Button
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [idx]: false }))}
                        variant={quizAnswers[idx] === false ? "default" : "outline"}
                        size="sm"
                      >
                        Falso
                      </Button>
                    </div>
                    {quizAnswers[idx] !== undefined && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`p-3 rounded-lg ${
                          quizAnswers[idx] === quiz.a 
                            ? 'bg-green-50 dark:bg-green-950/20 border border-green-200' 
                            : 'bg-red-50 dark:bg-red-950/20 border border-red-200'
                        }`}
                      >
                        <p className="text-sm flex items-start gap-2">
                          {quizAnswers[idx] === quiz.a ? (
                            <CheckCircle className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span><strong>Resposta correta:</strong> {quiz.a ? "Verdadeiro" : "Falso"}. {quiz.explain}</span>
                        </p>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
              {Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 text-center"
                >
                  <Card className={`p-6 ${
                    correctAnswers === QUIZ_QUESTIONS.length 
                      ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500' 
                      : 'bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-500'
                  }`}>
                    <p className="text-lg font-bold">
                      Resultado: {correctAnswers}/{QUIZ_QUESTIONS.length} corretas
                    </p>
                    {correctAnswers === QUIZ_QUESTIONS.length && (
                      <p className="text-sm mt-2 text-green-600">🎉 Perfeito! Você dominou o tema!</p>
                    )}
                  </Card>
                </motion.div>
              )}
            </Card>
          </motion.section>

          {/* Badge Final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="conclusion-card text-center py-12"
          >
            <Trophy className="size-24 mx-auto mb-6 text-amber-500" />
            <h2 className="text-4xl font-bold mb-4">Parabéns! 🎉</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Você completou o módulo de <strong>Segmentação</strong>!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-500 text-white px-6 py-3 text-lg">
                <CheckCircle className="size-5 mr-2" />
                10 Páginas Completas
              </Badge>
              <Badge className="bg-blue-500 text-white px-6 py-3 text-lg">
                <Code className="size-5 mr-2" />
                5.500+ Linhas
              </Badge>
              <Badge className="bg-purple-500 text-white px-6 py-3 text-lg">
                <Award className="size-5 mr-2" />
                Nível Awwwards
              </Badge>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">10</div>
                <p className="text-sm text-muted-foreground">Páginas criadas</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Exercícios práticos</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Conceitos cobertos</p>
              </Card>
            </div>
          </motion.div>

          <div className="flex justify-between pt-8">
            <a href="/os/memoria/segmentacao/exercicios" className="text-primary hover:underline">← Anterior: Exercícios</a>
            <a href="/os/memoria/virtual" className="text-primary hover:underline flex items-center gap-2">
              Próximo Módulo: Memória Virtual <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
