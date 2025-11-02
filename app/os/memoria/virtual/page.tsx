"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { animate, stagger } from "animejs";
import { useEffect } from "react";
import {
  BookOpen,
  Cpu,
  HardDrive,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Code,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Layers,
  Activity,
  Database,
  Timer,
  Eye
} from "lucide-react";

const sections = [
  {
    id: "teoria",
    title: "Teoria Completa",
    description: "Conceitos fundamentais, arquitetura MMU/TLB e espaço virtual vs físico",
    icon: BookOpen,
    href: "/os/memoria/virtual/teoria",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Conceitos", "Arquitetura", "MMU/TLB", "Diagramas"],
    badge: "Essencial",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: "visualizacoes",
    title: "Visualizações Interativas",
    description: "Address Translation bit-a-bit, Heat Map de acessos, comparações visuais",
    icon: Eye,
    href: "/os/memoria/virtual/visualizacoes",
    gradient: "from-purple-500 to-fuchsia-500",
    features: ["Translation", "Heat Map", "Interactive", "3D"],
    badge: "✨ NEW",
    badgeColor: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
  },
  {
    id: "localidade",
    title: "Localidade de Referência",
    description: "Temporal, espacial, working set e heatmap interativo",
    icon: Target,
    href: "/os/memoria/virtual/localidade",
    gradient: "from-purple-500 to-pink-500",
    features: ["Temporal", "Espacial", "Working Set", "Heatmap"],
    badge: "Interativo",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "demand-paging",
    title: "Paginação sob Demanda",
    description: "Lazy loading, prepaging e simulador visual de carregamento",
    icon: Layers,
    href: "/os/memoria/virtual/demand-paging",
    gradient: "from-green-500 to-emerald-500",
    features: ["Demand", "Lazy Load", "Prepaging", "Animação"],
    badge: "Visual",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    id: "page-fault",
    title: "Page Fault Handling",
    description: "8 etapas detalhadas, major vs minor, código Linux kernel",
    icon: Activity,
    href: "/os/memoria/virtual/page-fault",
    gradient: "from-red-500 to-orange-500",
    features: ["8 Etapas", "Major/Minor", "Kernel", "Step-by-step"],
    badge: "Técnico",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    id: "algoritmos",
    title: "Algoritmos de Substituição",
    description: "FIFO, LRU, Clock, LFU, Optimal e Belady's Anomaly",
    icon: BarChart3,
    href: "/os/memoria/virtual/algoritmos",
    gradient: "from-amber-500 to-yellow-500",
    features: ["FIFO/LRU", "Clock/LFU", "Comparador", "Belady"],
    badge: "Comparativo",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  {
    id: "working-set",
    title: "Working Set & Thrashing",
    description: "Conjunto ativo, janela de tempo e prevenção de thrashing",
    icon: TrendingUp,
    href: "/os/memoria/virtual/working-set",
    gradient: "from-cyan-500 to-blue-500",
    features: ["Working Set", "Thrashing", "PFF", "Gráficos"],
    badge: "Crítico",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    id: "performance",
    title: "Performance & EAT",
    description: "Effective Access Time, TLB miss, calculadora interativa",
    icon: Zap,
    href: "/os/memoria/virtual/performance",
    gradient: "from-indigo-500 to-purple-500",
    features: ["EAT", "TLB Cost", "Calculadora", "Otimizações"],
    badge: "Performance",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
  },
  {
    id: "linux",
    title: "Implementação Linux",
    description: "vm_area_struct, do_page_fault, código C do kernel",
    icon: Code,
    href: "/os/memoria/virtual/linux",
    gradient: "from-teal-500 to-green-500",
    features: ["Kernel", "C Code", "Structs", "vmstat"],
    badge: "Real World",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30"
  },
  {
    id: "exercicios",
    title: "Exercícios",
    description: "20+ questões práticas, cálculos EAT, simulações",
    icon: GraduationCap,
    href: "/os/memoria/virtual/exercicios",
    gradient: "from-rose-500 to-pink-500",
    features: ["20+ Questões", "Cálculos", "Tutoriais", "Hints"],
    badge: "Prática",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
  },
  {
    id: "conclusao",
    title: "Conclusão",
    description: "Resumo, timeline, quiz final e badge épico",
    icon: CheckCircle,
    href: "/os/memoria/virtual/conclusao",
    gradient: "from-violet-500 to-fuchsia-500",
    features: ["Resumo", "Timeline", "Quiz", "Stats"],
    badge: "Final",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  }
];

export default function MemoriaVirtualHubPage() {
  useEffect(() => {
    // Animate cards on mount
    animate('.hub-card', {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 800,
      ease: 'outExpo'
    });

    // Animate stats
    animate('.stat-card', {
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: stagger(120, { start: 400 }),
      duration: 600,
      ease: 'outBack(1.5)'
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HardDrive className="size-5" />
              <span className="text-sm font-semibold">Gerenciamento de Memória Avançado</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Memória Virtual
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Execução de programas maiores que a RAM física através de paginação sob demanda e swap space
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Cpu className="size-4 mr-2" />
                Demand Paging
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Database className="size-4 mr-2" />
                Swap Space
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Activity className="size-4 mr-2" />
                Page Fault
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: "Páginas", value: "10", icon: BookOpen },
              { label: "Simuladores", value: "6", icon: Zap },
              { label: "Exercícios", value: "20+", icon: GraduationCap },
              { label: "Animações 3D", value: "4", icon: Layers }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="stat-card">
                  <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-background to-indigo-500/5">
                    <Icon className="size-8 mx-auto mb-3 text-indigo-500" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </div>
              );
            })}
          </motion.div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="hub-card">
                  <Link href={section.href}>
                    <Card className="group p-6 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden border-2 hover:border-indigo-500/30">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <motion.div 
                            className={`p-3 rounded-xl bg-gradient-to-br ${section.gradient}`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="size-6 text-white" />
                          </motion.div>
                          <Badge className={section.badgeColor}>
                            {section.badge}
                          </Badge>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {section.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {section.features.map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform">
                          Explorar
                          <ArrowRight className="size-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Key Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16"
          >
            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-2 border-indigo-200 dark:border-indigo-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Timer className="size-7 text-indigo-600" />
                Por que Memória Virtual?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Programas Grandes</p>
                    <p className="text-sm text-muted-foreground">Executar programas maiores que a RAM disponível</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Multiprogramação</p>
                    <p className="text-sm text-muted-foreground">Mais processos simultâneos na memória</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Eficiência</p>
                    <p className="text-sm text-muted-foreground">Apenas código necessário carregado (demand paging)</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bottom Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t"
          >
            <Link href="/os/memoria/segmentacao" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Segmentação
            </Link>
            <Link href="/os/memoria/substituicao" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Substituição de Páginas <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
