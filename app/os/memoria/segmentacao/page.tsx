"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Play,
  GitCompare,
  Shield,
  Table,
  Combine,
  Cpu,
  GraduationCap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const sections = [
  {
    id: "teoria",
    title: "Teoria Completa",
    description: "Conceitos fundamentais, motivação, divisão lógica e tabela de segmentos",
    icon: BookOpen,
    href: "/os/memoria/segmentacao/teoria",
    gradient: "from-purple-500 to-pink-500",
    features: ["Conceitos", "Motivação", "Divisão Lógica", "Proteção"],
    badge: "Essencial",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "simulador",
    title: "Simulador 2D",
    description: "Visualize alocação de segmentos, fragmentação externa e compactação",
    icon: Play,
    href: "/os/memoria/segmentacao/simulador",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Alocação", "Fragmentação", "Compactação", "Interativo"],
    badge: "Interativo",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: "vs-paginacao",
    title: "vs Paginação",
    description: "Comparação detalhada: vantagens, desvantagens e casos de uso",
    icon: GitCompare,
    href: "/os/memoria/segmentacao/vs-paginacao",
    gradient: "from-amber-500 to-orange-500",
    features: ["Comparação", "Tabelas", "Diagramas", "Análise"],
    badge: "Comparativo",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  {
    id: "protecao",
    title: "Proteção e Compartilhamento",
    description: "Bits R/W/X, SEGFAULT, bibliotecas compartilhadas e Copy-on-Write",
    icon: Shield,
    href: "/os/memoria/segmentacao/protecao",
    gradient: "from-green-500 to-emerald-500",
    features: ["R/W/X", "SEGFAULT", "Compartilhamento", "COW"],
    badge: "Segurança",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    id: "tabela",
    title: "Tabela de Segmentos",
    description: "Estrutura STE, base + limite, tradução de endereços passo-a-passo",
    icon: Table,
    href: "/os/memoria/segmentacao/tabela",
    gradient: "from-indigo-500 to-purple-500",
    features: ["STE", "Base/Limite", "Tradução", "STBR/STLR"],
    badge: "Técnico",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
  },
  {
    id: "combinado",
    title: "Segmentação + Paginação",
    description: "Sistema híbrido, dupla tradução, vantagens e arquitetura x86",
    icon: Combine,
    href: "/os/memoria/segmentacao/combinado",
    gradient: "from-violet-500 to-fuchsia-500",
    features: ["Híbrido", "Dupla Tradução", "x86", "GDT/LDT"],
    badge: "Avançado",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  },
  {
    id: "x86",
    title: "Intel x86 Real",
    description: "Segment registers, descriptors, privilege levels e flat model",
    icon: Cpu,
    href: "/os/memoria/segmentacao/x86",
    gradient: "from-red-500 to-rose-500",
    features: ["CS/DS/SS/ES", "Ring 0-3", "Flat Model", "Assembly"],
    badge: "Hardware",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    id: "exercicios",
    title: "Exercícios",
    description: "20+ questões práticas com tutoriais e resoluções detalhadas",
    icon: GraduationCap,
    href: "/os/memoria/segmentacao/exercicios",
    gradient: "from-teal-500 to-cyan-500",
    features: ["20+ Questões", "Tutoriais", "Resoluções", "Hints"],
    badge: "Prática",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30"
  },
  {
    id: "conclusao",
    title: "Conclusão",
    description: "Resumo, comparações finais, uso moderno e próximos passos",
    icon: CheckCircle,
    href: "/os/memoria/segmentacao/conclusao",
    gradient: "from-green-500 to-lime-500",
    features: ["Resumo", "Comparações", "Moderno", "Stats"],
    badge: "Final",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  }
];

export default function SegmentacaoHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600">
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
              Segmentação
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Divisão lógica da memória em segmentos de tamanhos variáveis:
              código, dados, pilha e heap
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Layers className="size-4 mr-2" />
                Tamanhos Variáveis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Shield className="size-4 mr-2" />
                Proteção Granular
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Combine className="size-4 mr-2" />
                Compartilhamento
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
              { label: "Simuladores", value: "2", icon: Play },
              { label: "Exercícios", value: "10+", icon: GraduationCap },
              { label: "Tópicos", value: "15+", icon: Layers }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <Icon className="size-8 mx-auto mb-3 text-purple-500" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <Link href={section.href}>
                    <Card className="group p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden border-2 hover:border-purple-500/30">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${section.gradient} opacity-90 group-hover:scale-110 transition-transform`}>
                            <Icon className="size-6 text-white" />
                          </div>
                          <Badge className={section.badgeColor}>
                            {section.badge}
                          </Badge>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                        <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                          Explorar
                          <ArrowRight className="size-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t"
          >
            <Link href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Paginação
            </Link>
            <Link href="/os/memoria/virtual" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Memória Virtual <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
