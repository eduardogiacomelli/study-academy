"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import Link from "next/link";
import {
  Play,
  Database,
  Terminal,
  FileCode,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Zap,
  Cpu,
  Layers,
  Binary,
  Activity,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  CheckCircle
} from "lucide-react";

const sections = [
  {
    id: "simulador",
    title: "Simulador Interativo",
    description: "Configure memória, crie processos e visualize em tempo real com animações premium 2D e 3D",
    icon: Play,
    href: "/os/memoria/paginacao/simulador-interativo",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Visual 2D Animado", "3D com Shaders", "Tabela de Páginas", "Score & Achievements"],
    badge: "Interativo",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: "estruturas",
    title: "Estruturas de Dados",
    description: "Implementações completas em TypeScript e C: Page Table, Bitmap, Lista Livre e mais",
    icon: Database,
    href: "/os/memoria/paginacao/estruturas-dados",
    gradient: "from-purple-500 to-indigo-500",
    features: ["TypeScript", "C", "Comparação Performance", "Bitwise Ops"],
    badge: "Código",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "linux",
    title: "Implementação Linux",
    description: "Como o kernel Linux implementa paginação: mm_struct, VMAs, page fault handler e mais",
    icon: Terminal,
    href: "/os/memoria/paginacao/linux-implementation",
    gradient: "from-slate-700 to-slate-900",
    features: ["Kernel Code", "mm_struct", "Page Fault", "Links Oficiais"],
    badge: "Bonus 🐧",
    badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30"
  },
  {
    id: "teoria",
    title: "Teoria Completa",
    description: "Conceitos fundamentais, exemplos práticos, vantagens e desvantagens da paginação",
    icon: BookOpen,
    href: "/os/memoria/paginacao/teoria",
    gradient: "from-green-500 to-emerald-500",
    features: ["Conceitos", "Exemplos", "Diagramas", "Fragmentação"],
    badge: "Teoria",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    id: "tlb",
    title: "TLB (Translation Lookaside Buffer)",
    description: "Cache de tradução de endereços, hit/miss ratio e visualização 3D interativa",
    icon: Zap,
    href: "/os/memoria/paginacao/tlb",
    gradient: "from-amber-500 to-orange-500",
    features: ["Cache", "Hit/Miss", "Visualização 3D", "Performance"],
    badge: "Avançado",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  {
    id: "exercicios",
    title: "Exercícios",
    description: "30+ exercícios variados com tutoriais explicativos, desde básico até avançado",
    icon: GraduationCap,
    href: "/os/memoria/paginacao/exercicios",
    gradient: "from-pink-500 to-rose-500",
    features: ["30+ Exercícios", "Tutoriais", "Passo-a-Passo", "Resoluções"],
    badge: "Prática",
    badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30"
  },
  {
    id: "avancado",
    title: "Conceitos Avançados",
    description: "Huge Pages, COW, Memory-Mapped Files, NUMA e otimizações modernas",
    icon: Zap,
    href: "/os/memoria/paginacao/avancado",
    gradient: "from-purple-500 to-indigo-500",
    features: ["Huge Pages", "Copy-on-Write", "mmap", "NUMA"],
    badge: "Expert",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "multinivel",
    title: "Paginação Multinível",
    description: "Tabelas hierárquicas 2/3/4 níveis, x86-64 real, calculadora interativa",
    icon: Layers,
    href: "/os/memoria/paginacao/multinivel",
    gradient: "from-indigo-500 to-purple-500",
    features: ["2 Níveis", "x86-64", "Calculadora", "Economia"],
    badge: "Novo",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
  },
  {
    id: "localidade",
    title: "Localidade de Referência",
    description: "Princípio fundamental - Temporal, Espacial, Working Set e simulador",
    icon: Activity,
    href: "/os/memoria/paginacao/localidade",
    gradient: "from-emerald-500 to-teal-500",
    features: ["Temporal", "Espacial", "Working Set", "Simulador"],
    badge: "Novo",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "page-fault",
    title: "Page Fault Handler",
    description: "8 passos do tratamento, Major vs Minor, código Linux kernel",
    icon: AlertTriangle,
    href: "/os/memoria/paginacao/page-fault",
    gradient: "from-red-500 to-orange-500",
    features: ["8 Passos", "Animação", "Major/Minor", "Kernel"],
    badge: "Novo",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    id: "swapping",
    title: "Swapping",
    description: "Swap Space, Swap In/Out, Performance e comando vmstat",
    icon: RefreshCw,
    href: "/os/memoria/paginacao/swapping",
    gradient: "from-cyan-500 to-blue-500",
    features: ["Swap Space", "In/Out", "Performance", "vmstat"],
    badge: "Novo",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    id: "cap6",
    title: "Capítulo 6 - Gerência de Memória",
    description: "Fundamentos, MMU, Memória Lógica vs Física, Técnicas",
    icon: BookOpen,
    href: "/os/memoria/paginacao/cap6",
    gradient: "from-blue-500 to-indigo-500",
    features: ["MMU Animado", "Lógico/Físico", "Técnicas", "Histórico"],
    badge: "Professor",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: "cap7",
    title: "Capítulo 7 - Memória Virtual",
    description: "Demand Paging, Localidade, Vantagens, Conceito",
    icon: Sparkles,
    href: "/os/memoria/paginacao/cap7",
    gradient: "from-violet-500 to-purple-500",
    features: ["Demand Paging", "Localidade", "Demos", "Motivação"],
    badge: "Professor",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  },
  {
    id: "conclusao-final",
    title: "Conclusão",
    description: "Resumo completo, comparações, estatísticas e próximos passos",
    icon: CheckCircle,
    href: "/os/memoria/paginacao/conclusao",
    gradient: "from-green-500 to-emerald-500",
    features: ["Resumo", "Comparações", "Stats", "Next Steps"],
    badge: "Completo",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  }
];

export default function PaginacaoHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Layers className="size-5" />
              <span className="text-sm font-semibold">Gerenciamento de Memória</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Paginação
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Explore o sistema de memória virtual por páginas: teoria completa,
              simuladores interativos e código real do Linux
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Cpu className="size-4 mr-2" />
                4 KB - 2 MB - 1 GB
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Binary className="size-4 mr-2" />
                MMU + TLB
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <FileCode className="size-4 mr-2" />
                TS + C + Linux
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore por Seção
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada seção oferece uma perspectiva única sobre paginação, desde simulações
              interativas até implementação real do kernel Linux
            </p>
          </motion.div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                >
                  <Link href={section.href}>
                    <Card className="group relative h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      
                      {/* Content */}
                      <div className="relative p-6 space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}>
                            <Icon className="size-6 text-white" />
                          </div>
                          <Badge className={section.badgeColor}>
                            {section.badge}
                          </Badge>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {section.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {section.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {section.features.map((feature) => (
                            <span
                              key={feature}
                              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary pt-2">
                          <span className="group-hover:translate-x-1 transition-transform">
                            Explorar
                          </span>
                          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} blur-3xl opacity-20`} />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-cyan-500/5 border-primary/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">🚀 Comece Agora!</h3>
                  <p className="text-muted-foreground">
                    Recomendamos começar pelo <strong>Simulador Interativo</strong> para
                    ver a paginação em ação, depois explorar as <strong>Estruturas de Dados</strong>
                    para entender a implementação.
                  </p>
                </div>
                <Link href="/os/memoria/paginacao/simulador-interativo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center gap-2"
                  >
                    <Play className="size-5" />
                    Iniciar Simulador
                  </motion.button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
