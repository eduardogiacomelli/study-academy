"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  HardDrive,
  Network,
  Terminal,
  Settings,
  Database,
  Zap,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const modules = [
  {
    title: "Hardware de I/O",
    description: "Dispositivos de bloco vs caractere, controladores e interrupções",
    icon: Cpu,
    href: "/os/io/hardware",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    features: ["Dispositivos", "Controladores", "Interrupções"],
    difficulty: "Intermediário",
  },
  {
    title: "Device Drivers",
    description: "Camadas de software, drivers de dispositivos e abstração",
    icon: Settings,
    href: "/os/io/drivers",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    features: ["Camadas", "Abstração", "Interfaces"],
    difficulty: "Intermediário",
  },
  {
    title: "I/O Scheduling",
    description: "Algoritmos FCFS, SSTF, SCAN, C-SCAN e LOOK",
    icon: Database,
    href: "/os/io/scheduling",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    features: ["FCFS", "SSTF", "SCAN", "C-SCAN"],
    difficulty: "Avançado",
    badge: "4"
  },
  {
    title: "Buffering",
    description: "Single, double e circular buffering para I/O",
    icon: Zap,
    href: "/os/io/buffering",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    features: ["Single", "Double", "Circular"],
    difficulty: "Intermediário",
  },
  {
    title: "Disco",
    description: "HDD, SSD, geometria de disco e algoritmos de scheduling",
    icon: HardDrive,
    href: "/os/io/disco",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    features: ["HDD/SSD", "Geometria", "Scheduling"],
    difficulty: "Avançado",
  },
  {
    title: "Exercícios",
    description: "Questões práticas sobre entrada e saída",
    icon: BookOpen,
    href: "/os/io/exercicios",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    features: ["20+ Questões", "Práticas", "Cálculos"],
    difficulty: "Todos os níveis",
  },
];

export default function IOPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-600/90 border-b border-white/10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
                <Cpu className="size-4 text-white" />
                <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
                  Entrada e Saída
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Sistema de I/O
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Hardware de I/O, device drivers, scheduling de disco e técnicas de buffering
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <Link href={module.href}>
                    <Card className={`group relative overflow-hidden border-2 border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer h-full`}>
                      {/* Header with gradient */}
                      <div className={`p-6 bg-gradient-to-r ${module.color} relative`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              <Icon className="size-6 text-white" />
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

                      {/* Content */}
                      <div className="p-6 space-y-4">
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
                          className="w-full justify-between group-hover:bg-blue-500/10 transition-colors text-sm"
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

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <BookOpen className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Sobre o Módulo de I/O</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Este módulo cobre todos os aspectos de entrada e saída em sistemas operacionais,
                    desde hardware de I/O até algoritmos avançados de scheduling de disco. Baseado em
                    Tanenbaum - Modern Operating Systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Baseado em Tanenbaum</Badge>
                    <Badge variant="outline" className="text-xs">4 Algoritmos de Scheduling</Badge>
                    <Badge variant="outline" className="text-xs">Simuladores Interativos</Badge>
                    <Badge variant="outline" className="text-xs">20+ Exercícios</Badge>
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

