"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  Layers,
  HardDrive,
  Repeat,
  Zap,
  ArrowRight,
  BookOpen,
  Trophy,
  Sparkles,
} from "lucide-react";

const modules = [
  {
    title: "Paginação",
    description: "Tradução de endereços, TLB e visualização 3D interativa",
    icon: FileText,
    href: "/os/memoria/paginacao",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    features: ["3 Simuladores", "Visualizador 3D TLB", "Cálculos práticos"],
    difficulty: "Intermediário",
    badge: "3D"
  },
  {
    title: "Segmentação",
    description: "Tabelas de segmentos, alocação e proteção de memória",
    icon: Layers,
    href: "/os/memoria/segmentacao",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    features: ["Simulador completo", "Tabela de segmentos", "Proteção"],
    difficulty: "Intermediário",
  },
  {
    title: "Memória Virtual",
    description: "Demand paging, page faults, working set e thrashing",
    icon: HardDrive,
    href: "/os/memoria/virtual",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    features: ["6 Simuladores", "Working Set", "COW", "EAT"],
    difficulty: "Avançado",
    badge: "6"
  },
  {
    title: "Substituição de Página",
    description: "Algoritmos FIFO, LRU, Clock, Optimal e Anomalia de Belady",
    icon: Repeat,
    href: "/os/memoria/substituicao",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    features: ["4 Algoritmos", "Comparador", "Belady"],
    difficulty: "Avançado",
    badge: "4"
  },
  {
    title: "Exercícios",
    description: "40+ questões gamificadas com sistema de pontuação",
    icon: Zap,
    href: "/os/exercicios",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    features: ["40+ Questões", "Sistema de pontos", "Progresso"],
    difficulty: "Todos os níveis",
    badge: "40+"
  },
];

const stats = [
  { label: "Simuladores", value: "12", icon: Brain },
  { label: "Exercícios", value: "40+", icon: Trophy },
  { label: "Visualizadores 3D", value: "3", icon: Sparkles },
];

export default function OSPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-os-primary/90 via-cyan-600/90 to-os-secondary/90 border-b border-white/10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
                <BookOpen className="size-4 text-white" />
                <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
                  Sistemas Operacionais
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Gerenciamento de Memória
              </h1>
              
              <p className="text-base text-white/80 max-w-2xl mx-auto">
                Aprenda conceitos fundamentais através de simuladores interativos e exercícios práticos
              </p>

              {/* Stats - Compact */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
                    >
                      <Icon className="size-4 text-white" />
                      <div className="text-left">
                        <div className="text-xs text-white/70">{stat.label}</div>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content - Compact */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link href={module.href}>
                    <Card className={`group relative overflow-hidden border-2 border-border hover:border-os-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-os-primary/10 cursor-pointer h-full`}>
                      {/* Header with gradient */}
                      <div className={`p-4 bg-gradient-to-r ${module.color} relative`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              <Icon className="size-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{module.title}</h3>
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-[10px] mt-1">
                                {module.difficulty}
                              </Badge>
                            </div>
                          </div>
                          {module.badge && (
                            <Badge className="bg-white text-gray-900 font-bold">
                              {module.badge}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content - Compact */}
                      <div className="p-4 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {module.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5">
                          {module.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className={`${module.bgColor} border-border/50 text-xs`}
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* CTA */}
                        <Button
                          variant="ghost"
                          className="w-full justify-between group-hover:bg-os-primary/10 transition-colors text-sm"
                        >
                          <span>Explorar módulo</span>
                          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Info Card - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-os-primary/5 to-os-secondary/5 border-os-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-os-primary to-os-secondary rounded-xl">
                  <Brain className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">Sobre o Módulo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Este módulo cobre todos os aspectos de gerenciamento de memória em sistemas operacionais,
                    desde conceitos básicos até técnicas avançadas de memória virtual e algoritmos de substituição.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Baseado em Tanenbaum</Badge>
                    <Badge variant="outline" className="text-xs">100% Validado</Badge>
                    <Badge variant="outline" className="text-xs">Interativo</Badge>
                    <Badge variant="outline" className="text-xs">Gamificado</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
