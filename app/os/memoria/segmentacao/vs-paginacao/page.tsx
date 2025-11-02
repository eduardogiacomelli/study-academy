"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger } from "animejs";
import {
  GitCompare,
  Layers,
  Grid3x3,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Link as LinkIcon,
  Zap,
  Scale,
  Info,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface ComparisonMetric {
  aspect: string;
  paging: {
    value: string;
    isGood: boolean;
    description: string;
  };
  segmentation: {
    value: string;
    isGood: boolean;
    description: string;
  };
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    aspect: "Tamanho dos Blocos",
    paging: {
      value: "Fixo (4 KB típico)",
      isGood: true,
      description: "Simplifica gerenciamento"
    },
    segmentation: {
      value: "Variável",
      isGood: true,
      description: "Flexibilidade total"
    }
  },
  {
    aspect: "Fragmentação Externa",
    paging: {
      value: "Não ocorre",
      isGood: true,
      description: "Blocos sempre alocáveis"
    },
    segmentation: {
      value: "Sim, ocorre",
      isGood: false,
      description: "Requer compactação"
    }
  },
  {
    aspect: "Fragmentação Interna",
    paging: {
      value: "Sim (~2 KB médio)",
      isGood: false,
      description: "Última página desperdiça"
    },
    segmentation: {
      value: "Não ocorre",
      isGood: true,
      description: "Tamanho exato"
    }
  },
  {
    aspect: "Divisão Lógica",
    paging: {
      value: "Não",
      isGood: false,
      description: "Divisão física apenas"
    },
    segmentation: {
      value: "Sim",
      isGood: true,
      description: "Código, dados, stack separados"
    }
  },
  {
    aspect: "Proteção",
    paging: {
      value: "Por página (4 KB)",
      isGood: true,
      description: "Granularidade boa"
    },
    segmentation: {
      value: "Por segmento inteiro",
      isGood: true,
      description: "Mais natural"
    }
  },
  {
    aspect: "Compartilhamento",
    paging: {
      value: "Possível (complexo)",
      isGood: false,
      description: "Requer mapeamento"
    },
    segmentation: {
      value: "Natural",
      isGood: true,
      description: "Segmento compartilhado"
    }
  },
  {
    aspect: "Tamanho da Tabela",
    paging: {
      value: "Grande (1M+ entradas)",
      isGood: false,
      description: "Overhead alto"
    },
    segmentation: {
      value: "Pequena (<10 entradas)",
      isGood: true,
      description: "Overhead baixo"
    }
  },
  {
    aspect: "Endereçamento",
    paging: {
      value: "Linear simples",
      isGood: true,
      description: "Transparente"
    },
    segmentation: {
      value: "(segmento, offset)",
      isGood: false,
      description: "Mais complexo"
    }
  }
];

export default function VsPaginacaoPage() {
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);
  const [showSplit, setShowSplit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Animate on mount
  useEffect(() => {
    animate('.comparison-card', {
      translateY: [50, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 800,
      ease: 'outExpo'
    });

    animate('.metric-row', {
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: stagger(50, { start: 500 }),
      duration: 600,
      ease: 'outQuad'
    });
  }, []);

  // Animate split view
  useEffect(() => {
    if (showSplit) {
      animate('.split-panel', {
        scaleX: [0, 1],
        duration: 800,
        ease: 'outExpo'
      });
    }
  }, [showSplit]);

  function handleMetricClick(aspect: string) {
    setSelectedAspect(aspect);
    
    // Animate highlight - visual feedback only
    animate(`[data-aspect="${aspect}"]`, {
      scale: [1, 1.02, 1],
      duration: 400,
      ease: 'inOutQuad'
    });
  }

  function calculateWinner(): { paging: number; segmentation: number; tie: number } {
    let paging = 0;
    let segmentation = 0;
    let tie = 0;

    COMPARISON_METRICS.forEach(metric => {
      if (metric.paging.isGood && !metric.segmentation.isGood) {
        paging++;
      } else if (!metric.paging.isGood && metric.segmentation.isGood) {
        segmentation++;
      } else if (metric.paging.isGood && metric.segmentation.isGood) {
        tie++;
      }
    });

    return { paging, segmentation, tie };
  }

  const winner = calculateWinner();

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
          y: backgroundY
        }}
      />

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
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
              <GitCompare className="size-5" />
              <span className="text-sm font-semibold">Comparativo Técnico</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Segmentação
              <span className="text-white/80 mx-4">vs</span>
              Paginação
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Análise detalhada de vantagens, desvantagens e casos de uso
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Scale className="size-4 mr-2" />
                8 Aspectos
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Zap className="size-4 mr-2" />
                Interativo
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Shield className="size-4 mr-2" />
                Análise Profunda
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <Card className="comparison-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{winner.paging}</div>
              <div className="text-sm text-muted-foreground">Vantagens Paginação</div>
            </Card>
            <Card className="comparison-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">{winner.segmentation}</div>
              <div className="text-sm text-muted-foreground">Vantagens Segmentação</div>
            </Card>
            <Card className="comparison-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">{winner.tie}</div>
              <div className="text-sm text-muted-foreground">Empates</div>
            </Card>
            <Card className="comparison-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-amber-600 mb-2">{COMPARISON_METRICS.length}</div>
              <div className="text-sm text-muted-foreground">Total Aspectos</div>
            </Card>
          </motion.div>

          {/* Split View Toggle */}
          <div className="flex justify-center">
            <Button
              onClick={() => setShowSplit(!showSplit)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <GitCompare className="size-4 mr-2" />
              {showSplit ? "Ver Tabela" : "Ver Split Screen"}
            </Button>
          </div>

          {/* Split Screen View */}
          {showSplit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Paginação */}
              <Card className="split-panel p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-300 dark:border-blue-800 origin-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Grid3x3 className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Paginação</h3>
                    <p className="text-sm text-muted-foreground">Blocos de tamanho fixo</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {COMPARISON_METRICS.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-white/50 dark:bg-black/20"
                    >
                      <div className="flex items-start gap-3">
                        {metric.paging.isGood ? (
                          <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-sm mb-1">{metric.aspect}</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">{metric.paging.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{metric.paging.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Segmentação */}
              <Card className="split-panel p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-800 origin-right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Layers className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Segmentação</h3>
                    <p className="text-sm text-muted-foreground">Blocos de tamanho variável</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {COMPARISON_METRICS.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-white/50 dark:bg-black/20"
                    >
                      <div className="flex items-start gap-3">
                        {metric.segmentation.isGood ? (
                          <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-sm mb-1">{metric.aspect}</p>
                          <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">{metric.segmentation.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{metric.segmentation.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Comparison Table */}
          {!showSplit && (
            <Card className="comparison-card p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Scale className="size-8 text-purple-500" />
                Comparação Detalhada
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-4 font-bold text-lg">Aspecto</th>
                      <th className="text-left p-4 font-bold text-lg">
                        <div className="flex items-center gap-2">
                          <Grid3x3 className="size-5 text-blue-500" />
                          Paginação
                        </div>
                      </th>
                      <th className="text-left p-4 font-bold text-lg">
                        <div className="flex items-center gap-2">
                          <Layers className="size-5 text-purple-500" />
                          Segmentação
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_METRICS.map((metric, idx) => (
                      <motion.tr
                        key={idx}
                        className="metric-row border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        data-aspect={metric.aspect}
                        onClick={() => handleMetricClick(metric.aspect)}
                        whileHover={{ scale: 1.01 }}
                      >
                        <td className="p-4">
                          <p className="font-semibold">{metric.aspect}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            {metric.paging.isGood ? (
                              <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="size-5 text-red-500 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium text-blue-700 dark:text-blue-300">{metric.paging.value}</p>
                              <p className="text-sm text-muted-foreground">{metric.paging.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            {metric.segmentation.isGood ? (
                              <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="size-5 text-red-500 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium text-purple-700 dark:text-purple-300">{metric.segmentation.value}</p>
                              <p className="text-sm text-muted-foreground">{metric.segmentation.description}</p>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Conclusion Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <TrendingUp className="size-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Quando Usar Paginação</h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Sistema operacional moderno (Linux, Windows)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Memória virtual necessária</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proteção por página suficiente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Hardware com MMU/TLB</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Simplicidade de gerenciamento</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700">
                  <p className="text-sm font-semibold">✨ Padrão atual</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Todos os SOs modernos usam paginação como base
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <TrendingDown className="size-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Quando Usar Segmentação</h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Divisão lógica importante (código/dados)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Compartilhamento natural de código</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Proteção por função (código R-X)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Sistemas embarcados simples</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Raramente usado puro (fragmentação!)</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700">
                  <p className="text-sm font-semibold">🔀 Híbrido comum</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Intel x86: Segmentação + Paginação combinados
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Final Verdict */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-300 dark:border-green-800 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle className="size-12 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Veredito Final</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  <strong className="text-green-700 dark:text-green-400">Paginação</strong> é o padrão moderno
                  devido à <strong>ausência de fragmentação externa</strong> e suporte nativo a <strong>memória virtual</strong>.
                  Segmentação pura é raramente usada, mas <strong>sistemas híbridos</strong> (Seg + Paginação)
                  combinam as vantagens de ambos.
                </p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <p className="font-semibold mb-1">🥇 Paginação</p>
                    <p className="text-xs text-muted-foreground">90% dos SOs modernos</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <p className="font-semibold mb-1">🥈 Híbrido</p>
                    <p className="text-xs text-muted-foreground">Intel x86, alguns RISC</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <p className="font-semibold mb-1">🥉 Segmentação</p>
                    <p className="text-xs text-muted-foreground">Sistemas embarcados</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao/simulador" className="text-primary hover:underline flex items-center gap-2">
              ← Anterior: Simulador
            </a>
            <a href="/os/memoria/segmentacao/protecao" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Proteção <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

