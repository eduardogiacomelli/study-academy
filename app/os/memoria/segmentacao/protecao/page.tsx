"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger } from "animejs";
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  Edit,
  Play,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  Zap
} from "lucide-react";

interface ProtectionDemo {
  id: string;
  segment: string;
  operation: string;
  hasRead: boolean;
  hasWrite: boolean;
  hasExecute: boolean;
  attempting: "read" | "write" | "execute";
  success: boolean;
  message: string;
}

const PROTECTION_EXAMPLES: ProtectionDemo[] = [
  {
    id: "1",
    segment: "Code",
    operation: "Executar",
    hasRead: true,
    hasWrite: false,
    hasExecute: true,
    attempting: "execute",
    success: true,
    message: "✅ Execução permitida (X ativo)"
  },
  {
    id: "2",
    segment: "Code",
    operation: "Escrever",
    hasRead: true,
    hasWrite: false,
    hasExecute: true,
    attempting: "write",
    success: false,
    message: "❌ Violação de proteção! Segmento CODE é R-X"
  },
  {
    id: "3",
    segment: "Data",
    operation: "Ler",
    hasRead: true,
    hasWrite: true,
    hasExecute: false,
    attempting: "read",
    success: true,
    message: "✅ Leitura permitida (R ativo)"
  },
  {
    id: "4",
    segment: "Data",
    operation: "Executar",
    hasRead: true,
    hasWrite: true,
    hasExecute: false,
    attempting: "execute",
    success: false,
    message: "❌ Violação! DATA não pode ser executado (sem X)"
  },
  {
    id: "5",
    segment: "Stack",
    operation: "Escrever",
    hasRead: true,
    hasWrite: true,
    hasExecute: false,
    attempting: "write",
    success: true,
    message: "✅ Escrita permitida (W ativo)"
  }
];

export default function ProtecaoPage() {
  const [selectedDemo, setSelectedDemo] = useState<ProtectionDemo | null>(null);
  const [animating, setAnimating] = useState(false);
  const [sharedProgress, setSharedProgress] = useState(0);

  useEffect(() => {
    // Animate cards on mount
    animate('.protection-card', {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(80),
      duration: 600,
      ease: 'outCubic'
    });
  }, []);

  async function demonstrateProtection(demo: ProtectionDemo) {
    if (animating) return;
    
    setAnimating(true);
    setSelectedDemo(demo);

    // Phase 1: Highlight segment
    await animate(`#demo-${demo.id}`, {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 30px 10px rgba(59, 130, 246, 0.6)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ],
      duration: 800
    });

    // Phase 2: Check permissions with animation
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (demo.success) {
      // Success animation - green pulse
      await animate(`#demo-${demo.id}`, {
        backgroundColor: ['#ffffff', '#10b981', '#ffffff'],
        duration: 600
      });
      
      toast.success(demo.message, {
        icon: "✅",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #10b981, #059669)",
          color: "#fff"
        }
      });
    } else {
      // Failure animation - shake + red
      await animate(`#demo-${demo.id}`, {
        translateX: [-10, 10, -10, 10, 0],
        backgroundColor: ['#ffffff', '#ef4444', '#ffffff'],
        duration: 800
      });
      
      toast.error(demo.message, {
        icon: "🚫",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          color: "#fff"
        }
      });
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setAnimating(false);
  }

  useEffect(() => {
    // Animate shared memory progress
    const interval = setInterval(() => {
      setSharedProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="size-5" />
              <span className="text-sm font-semibold">Proteção e Compartilhamento</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Segurança em Segmentação
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Bits R/W/X, compartilhamento de código e proteção de memória
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Lock className="size-4 mr-2" />
                Proteção
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Users className="size-4 mr-2" />
                Compartilhamento
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Zap className="size-4 mr-2" />
                Interativo
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* 1. Bits de Proteção R/W/X */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  x: [0, 40, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="size-6 text-blue-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Bits de Proteção (R/W/X)</h2>
                    <p className="text-muted-foreground">Controle de acesso por segmento</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      Cada segmento possui <strong className="text-blue-600 dark:text-blue-400">3 bits de proteção</strong> na
                      Tabela de Segmentos que controlam as operações permitidas:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
                      <motion.div 
                        className="protection-card"
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.3)" }}
                      >
                        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <Eye className="size-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-xl">R (Read)</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Permite <strong>leitura</strong> dos dados</p>
                          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-xs font-mono">
                            if (R == 1) allow_read();
                          </div>
                        </Card>
                      </motion.div>

                      <motion.div 
                        className="protection-card"
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(234, 179, 8, 0.3)" }}
                      >
                        <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-200 dark:border-amber-800">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-amber-500/20">
                              <Edit className="size-6 text-amber-600" />
                            </div>
                            <h3 className="font-bold text-xl">W (Write)</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Permite <strong>escrita</strong> nos dados</p>
                          <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-xs font-mono">
                            if (W == 1) allow_write();
                          </div>
                        </Card>
                      </motion.div>

                      <motion.div 
                        className="protection-card"
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.3)" }}
                      >
                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-2 border-purple-200 dark:border-purple-800">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-purple-500/20">
                              <Play className="size-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-xl">X (Execute)</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Permite <strong>execução</strong> como código</p>
                          <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-xs font-mono">
                            if (X == 1) allow_exec();
                          </div>
                        </Card>
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Combinações Típicas</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left p-3 font-semibold bg-muted/50">Segmento</th>
                            <th className="text-center p-3 font-semibold bg-muted/50">R</th>
                            <th className="text-center p-3 font-semibold bg-muted/50">W</th>
                            <th className="text-center p-3 font-semibold bg-muted/50">X</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-semibold">Code</td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><XCircle className="size-4 text-red-500 inline" /></td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3">Read + Execute (R-X) - Código é somente leitura</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-semibold">Data</td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><XCircle className="size-4 text-red-500 inline" /></td>
                            <td className="p-3">Read + Write (RW-) - Dados nunca executam</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-semibold">Stack</td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><XCircle className="size-4 text-red-500 inline" /></td>
                            <td className="p-3">Read + Write (RW-) - Pilha não executa</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-semibold">Heap</td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><CheckCircle className="size-4 text-green-500 inline" /></td>
                            <td className="p-3 text-center"><XCircle className="size-4 text-red-500 inline" /></td>
                            <td className="p-3">Read + Write (RW-) - Heap dinâmico</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 2. Demonstração Interativa */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="size-6 text-purple-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Demonstração Interativa</h2>
                  <p className="text-muted-foreground">Clique para simular violações de proteção</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROTECTION_EXAMPLES.map((demo) => (
                  <motion.div
                    key={demo.id}
                    id={`demo-${demo.id}`}
                    className="protection-card cursor-pointer"
                    onClick={() => demonstrateProtection(demo)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="p-6 h-full hover:shadow-xl transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${
                          demo.segment === 'Code' ? 'bg-orange-500/20' :
                          demo.segment === 'Data' ? 'bg-pink-500/20' :
                          'bg-cyan-500/20'
                        }`}>
                          <Code className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-bold">{demo.segment}</h3>
                          <p className="text-xs text-muted-foreground">{demo.operation}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          {demo.hasRead ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <XCircle className="size-4 text-red-500" />
                          )}
                          <span>Read (R)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {demo.hasWrite ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <XCircle className="size-4 text-red-500" />
                          )}
                          <span>Write (W)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {demo.hasExecute ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <XCircle className="size-4 text-red-500" />
                          )}
                          <span>Execute (X)</span>
                        </div>
                      </div>

                      <Badge className={`w-full justify-center ${
                        demo.success 
                          ? 'bg-green-500/20 text-green-700 dark:text-green-400' 
                          : 'bg-red-500/20 text-red-700 dark:text-red-400'
                      }`}>
                        {demo.success ? "✅ Permitido" : "❌ Violação"}
                      </Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm flex items-start gap-2">
                  <AlertTriangle className="size-5 text-blue-500 flex-shrink-0" />
                  <span>
                    <strong>Como funciona:</strong> Quando um processo tenta acessar memória, o hardware verifica
                    os bits R/W/X da entrada correspondente na Tabela de Segmentos. Se a operação não for permitida,
                    uma <strong>interrupção de violação de proteção</strong> (segmentation fault) é gerada.
                  </span>
                </p>
              </div>
            </Card>
          </motion.section>

          {/* 3. Compartilhamento de Código */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10 relative overflow-hidden">
              <motion.div
                className="absolute -bottom-10 right-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
                animate={{
                  x: [-10, 10, -10],
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="size-6 text-green-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Compartilhamento de Código</h2>
                    <p className="text-muted-foreground">Economia de memória e segurança</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      Na segmentação, é natural compartilhar o <strong className="text-green-600 dark:text-green-400">segmento
                      de código</strong> entre múltiplos processos, já que código é somente leitura (R-X).
                    </p>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 my-6">
                      <h4 className="font-semibold mb-4 text-lg">Exemplo: Biblioteca Compartilhada (libc.so)</h4>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700">
                            <p className="font-semibold text-sm mb-2">Processo A</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-2">
                                <Code className="size-3" />
                                <span className="font-mono">Code: 0x1000 → 0x2000</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="size-3" />
                                <span className="font-mono">Data: 0x3000 → 0x3500</span>
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="size-6 flex-shrink-0" />

                          <div className="flex-1 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700">
                            <p className="font-semibold text-sm mb-2">Memória Física</p>
                            <div className="space-y-1 text-xs">
                              <div className="p-2 rounded bg-green-200 dark:bg-green-800">
                                <span className="font-mono">libc.so (Code)</span>
                                <p className="text-[10px] mt-1">Frame: 0x1000-0x2000</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700">
                            <p className="font-semibold text-sm mb-2">Processo B</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-2">
                                <Code className="size-3" />
                                <span className="font-mono">Code: 0x1000 → 0x2000</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="size-3" />
                                <span className="font-mono">Data: 0x4000 → 0x4500</span>
                              </div>
                            </div>
                          </div>

                          <ArrowRight className="size-6 flex-shrink-0" />

                          <div className="flex-1 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700">
                            <div className="space-y-1 text-xs">
                              <div className="p-2 rounded bg-green-200 dark:bg-green-800">
                                <span className="font-mono">MESMO libc.so!</span>
                                <p className="text-[10px] mt-1">Frame: 0x1000-0x2000</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-green-200 dark:bg-green-800 text-sm">
                        <p className="font-semibold mb-1">✅ Economia de Memória:</p>
                        <p className="text-xs">
                          Se libc.so tem 1 MB e 100 processos usam, ao invés de 100 MB,
                          usamos apenas <strong>1 MB + 100 × (dados privados)</strong>!
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Condições para Compartilhamento</h3>

                    <div className="grid md:grid-cols-2 gap-4 not-prose">
                      <Card className="p-5 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-2">Código Puro (R-X)</h4>
                            <p className="text-sm text-muted-foreground">
                              Código nunca modifica a si mesmo, então pode ser compartilhado com segurança.
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-5 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-2">Dados Privados (RW-)</h4>
                            <p className="text-sm text-muted-foreground">
                              Cada processo precisa de sua própria cópia de dados, stack e heap.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referência Acadêmica:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Tanenbaum - <em>&quot;Modern Operating Systems&quot;</em> (Cap. 3.3)</li>
                        <li>• Silberschatz - <em>&quot;Operating System Concepts&quot;</em> (Cap. 9)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Progress Indicator */}
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-2 border-purple-300 dark:border-purple-700 backdrop-blur-md">
              <p className="text-xs font-semibold mb-2">Shared Memory Demo</p>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${sharedProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao/vs-paginacao" className="text-primary hover:underline flex items-center gap-2">
              ← Anterior: Comparativo
            </a>
            <a href="/os/memoria/segmentacao/tabela" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Tabela de Segmentos <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

