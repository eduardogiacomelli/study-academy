"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger } from "animejs";
import {
  Layers,
  Grid3x3,
  Combine,
  Cpu,
  ArrowRight,
  BookOpen,
  Zap,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Binary,
  MemoryStick
} from "lucide-react";

interface HybridDemo {
  step: number;
  title: string;
  description: string;
  visual: string;
  color: string;
}

const TRANSLATION_STEPS: HybridDemo[] = [
  {
    step: 1,
    title: "Endereço Lógico",
    description: "(Segmento: 2, Página: 5, Offset: 0x123)",
    visual: "Seg:2 | Page:5 | Offset:0x123",
    color: "cyan"
  },
  {
    step: 2,
    title: "Tabela de Segmentos",
    description: "Seg[2] → Base da Tabela de Páginas",
    visual: "Seg[2].page_table_base = 0x8000",
    color: "purple"
  },
  {
    step: 3,
    title: "Tabela de Páginas",
    description: "Page[5] → Frame físico",
    visual: "Page[5].frame = 0x1A",
    color: "blue"
  },
  {
    step: 4,
    title: "Endereço Físico",
    description: "(Frame × 4KB) + Offset",
    visual: "(0x1A × 4096) + 0x123 = 0x1A123",
    color: "green"
  }
];

export default function CombinadoPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Animate cards on mount
    animate('.hybrid-card', {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 800,
      ease: 'outExpo'
    });
  }, []);

  async function demonstrateTranslation() {
    if (animating) return;
    setAnimating(true);

    for (let i = 0; i < TRANSLATION_STEPS.length; i++) {
      setCurrentStep(i);

      // Animate current step
      await animate(`#step-${i}`, {
        scale: [1, 1.08, 1],
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0)',
          '0 0 40px 15px rgba(59, 130, 246, 0.6)',
          '0 0 0 0 rgba(59, 130, 246, 0)'
        ],
        duration: 1000
      });

      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    toast.success("Tradução completa! 🎉", {
      icon: "✅",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #10b981, #059669)",
        color: "#fff"
      }
    });

    setAnimating(false);
    setCurrentStep(0);
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
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
              <Combine className="size-5" />
              <span className="text-sm font-semibold">Sistema Híbrido</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Segmentação Paginada
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Combinando as vantagens de ambas as técnicas
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Layers className="size-4 mr-2" />
                Segmentação
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Grid3x3 className="size-4 mr-2" />
                Paginação
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Cpu className="size-4 mr-2" />
                Intel x86
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* 1. Conceito */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-violet-500/5 border-2 border-violet-500/10 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-violet-500/10 border-2 border-violet-500/20"
                    whileHover={{ scale: 1.05, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Combine className="size-6 text-violet-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">O Melhor dos Dois Mundos</h2>
                    <p className="text-muted-foreground">Elimina fragmentação externa E mantém divisão lógica</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-violet-600 dark:text-violet-400">Segmentação Paginada</strong> combina
                      segmentação (visão lógica) com paginação (gerenciamento físico):
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
                      <motion.div className="hybrid-card" whileHover={{ y: -5 }}>
                        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <CheckCircle className="size-8 text-green-600" />
                            <h3 className="font-bold text-lg">Vantagens Mantidas</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <Layers className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Divisão Lógica:</strong> Code, Data, Stack separados</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Shield className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Proteção Natural:</strong> R/W/X por segmento</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Grid3x3 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Sem Fragmentação:</strong> Páginas de tamanho fixo</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <MemoryStick className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Memória Virtual:</strong> Swapping por página</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>

                      <motion.div className="hybrid-card" whileHover={{ y: -5 }}>
                        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800 h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <XCircle className="size-8 text-red-600" />
                            <h3 className="font-bold text-lg">Desvantagens</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Complexidade:</strong> 2 níveis de tradução</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Overhead:</strong> 2 acessos à memória (sem TLB)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Hardware:</strong> Mais caro de implementar</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Tabelas:</strong> 2 estruturas para gerenciar</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Como Funciona</h3>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-2 border-violet-200 dark:border-violet-800">
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                          <p><strong>Cada segmento</strong> é dividido em <strong>páginas</strong> de tamanho fixo (ex: 4 KB)</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                          <p><strong>Tabela de Segmentos</strong> aponta para <strong>Tabela de Páginas</strong> daquele segmento</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                          <p><strong>Tabela de Páginas</strong> mapeia página lógica → frame físico</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                          <p><strong>Endereço lógico:</strong> (Segmento, Página, Offset)</p>
                        </li>
                      </ol>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mt-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referência Acadêmica:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Tanenbaum - <em>&quot;Modern Operating Systems&quot;</em> (Cap. 3.3.4 - &quot;Paged Segmentation&quot;)</li>
                        <li>• Intel - <em>&quot;IA-32 Architecture Manual&quot;</em> (Vol. 3A, Cap. 3)</li>
                        <li>• PDF 02 - Paginação e Segmentação (Slides 45-47)</li>
                      </ul>
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
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="size-6 text-blue-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Demonstração de Tradução</h2>
                  <p className="text-muted-foreground">Observe os 4 passos animados</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {TRANSLATION_STEPS.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    id={`step-${idx}`}
                    className={`hybrid-card p-6 rounded-xl border-2 transition-all ${
                      currentStep === idx
                        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border-blue-400'
                        : 'bg-muted/30 border-border'
                    }`}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        step.color === 'cyan' ? 'bg-cyan-500' :
                        step.color === 'purple' ? 'bg-purple-500' :
                        step.color === 'blue' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}>
                        {step.step}
                      </div>
                      <h3 className="font-bold text-sm">{step.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <div className="p-2 rounded bg-slate-950 text-slate-50">
                      <code className="text-xs font-mono">{step.visual}</code>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={demonstrateTranslation}
                  disabled={animating}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                  size="lg"
                >
                  <Zap className="size-4 mr-2" />
                  {animating ? "Traduzindo..." : "Demonstrar Tradução"}
                </Button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800">
                <p className="text-sm flex items-start gap-2">
                  <AlertTriangle className="size-5 text-violet-500 flex-shrink-0" />
                  <span>
                    <strong>Observação:</strong> Na prática, o hardware usa <strong>TLB (Translation Lookaside Buffer)</strong>
                    para cachear traduções recentes, reduzindo para 1 acesso à memória na maioria dos casos.
                  </span>
                </p>
              </div>
            </Card>
          </motion.section>

          {/* 3. Estruturas de Dados */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Binary className="size-6 text-purple-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Implementação em TypeScript</h2>
                  <p className="text-muted-foreground">Sistema híbrido completo</p>
                </div>
              </div>

              <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                <pre className="text-sm leading-relaxed"><code>{`interface PageTableEntry {
  frame: number;      // Frame físico
  present: boolean;   // Na RAM?
  modified: boolean;  // Dirty bit
  referenced: boolean; // LRU
}

interface SegmentTableEntry {
  pageTableBase: number;      // Endereço da tabela de páginas
  pageTableLength: number;    // Número de páginas no segmento
  protection: {
    read: boolean;
    write: boolean;
    execute: boolean;
  };
  valid: boolean;
}

class SegmentedPagingSystem {
  private segmentTable: SegmentTableEntry[];
  private pageTables: Map<number, PageTableEntry[]>;
  private pageSize: number = 4096; // 4 KB
  
  constructor(maxSegments: number) {
    this.segmentTable = new Array(maxSegments);
    this.pageTables = new Map();
  }
  
  // Traduzir (segmento, página, offset) → endereço físico
  translate(
    segmentNumber: number,
    pageNumber: number,
    offset: number
  ): number {
    // Passo 1: Acessar tabela de segmentos
    const segEntry = this.segmentTable[segmentNumber];
    if (!segEntry.valid) {
      throw new Error("Segmentation fault: Invalid segment");
    }
    
    // Passo 2: Verificar permissões (exemplo: leitura)
    if (!segEntry.protection.read) {
      throw new Error("Protection violation: Read not allowed");
    }
    
    // Passo 3: Verificar limite do segmento
    if (pageNumber >= segEntry.pageTableLength) {
      throw new Error("Segmentation fault: Page exceeds segment");
    }
    
    // Passo 4: Acessar tabela de páginas
    const pageTable = this.pageTables.get(segEntry.pageTableBase);
    if (!pageTable) {
      throw new Error("Page table not found");
    }
    
    const pageEntry = pageTable[pageNumber];
    if (!pageEntry.present) {
      throw new Error("Page fault: Page not in memory");
    }
    
    // Passo 5: Calcular endereço físico
    const physicalAddress = (pageEntry.frame * this.pageSize) + offset;
    
    return physicalAddress;
  }
  
  // Criar novo segmento com N páginas
  createSegment(
    segmentNumber: number,
    numPages: number,
    protection: { read: boolean; write: boolean; execute: boolean }
  ): void {
    // Alocar tabela de páginas
    const pageTableBase = this.allocatePageTable(numPages);
    
    this.segmentTable[segmentNumber] = {
      pageTableBase,
      pageTableLength: numPages,
      protection,
      valid: true
    };
  }
  
  private allocatePageTable(numPages: number): number {
    const tableId = this.pageTables.size;
    const pageTable: PageTableEntry[] = [];
    
    for (let i = 0; i < numPages; i++) {
      pageTable.push({
        frame: 0, // Será alocado sob demanda (demand paging)
        present: false,
        modified: false,
        referenced: false
      });
    }
    
    this.pageTables.set(tableId, pageTable);
    return tableId;
  }
}`}</code></pre>
              </Card>
            </Card>
          </motion.section>

          {/* 4. Exemplo Real: Intel x86 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-indigo-500/5 border-2 border-indigo-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Cpu className="size-6 text-indigo-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Intel x86 - Caso Real</h2>
                  <p className="text-muted-foreground">Segmentação + Paginação em produção</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    A arquitetura <strong className="text-indigo-600 dark:text-indigo-400">Intel x86 (IA-32)</strong> implementa
                    segmentação paginada desde o 386:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
                    <Card className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-200 dark:border-indigo-800">
                      <h4 className="font-bold mb-3">Modo Protegido (32-bit)</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Segmentação <strong>obrigatória</strong></li>
                        <li>✓ Paginação <strong>opcional</strong> (ativada via CR0.PG)</li>
                        <li>✓ GDT/LDT para descritores</li>
                        <li>✓ Seletores de segmento (16 bits)</li>
                      </ul>
                    </Card>

                    <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                      <h4 className="font-bold mb-3">Modo Long (64-bit)</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Segmentação <strong>simplificada</strong></li>
                        <li>✓ Apenas CS, DS, SS usados</li>
                        <li>✓ Paginação de 4 níveis</li>
                        <li>✓ 48 bits de espaço virtual</li>
                      </ul>
                    </Card>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-300 dark:border-indigo-700">
                    <h4 className="font-semibold mb-3">Sequência de Tradução (x86):</h4>
                    <pre className="text-sm font-mono leading-relaxed overflow-x-auto"><code>{`Endereço Lógico (48 bits x86-64)
    ↓
1. Segmentação: Logical → Linear
   Linear = Segment.Base + Offset
    ↓
2. Paginação (4 níveis):
   PML4 → PDPT → PD → PT → Frame
    ↓
Endereço Físico (40-52 bits)`}</code></pre>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mt-6">
                    <p className="text-sm">
                      <strong>💡 Curiosidade:</strong> Linux e Windows modernos usam segmentação <strong>flat</strong>
                      (todos os segmentos base=0, limite=4GB), usando apenas a paginação na prática.
                      Isso simplifica o SO mas mantém compatibilidade com x86.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao/tabela" className="text-primary hover:underline flex items-center gap-2">
              ← Anterior: Tabela de Segmentos
            </a>
            <a href="/os/memoria/segmentacao/x86" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Intel x86 Real <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

