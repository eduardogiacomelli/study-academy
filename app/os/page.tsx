"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Cpu, HardDrive, Folder, Lock, GitFork, CheckCircle2, Clock, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const osSections = [
  {
    title: "Gerenciamento de Memória",
    description: "Explore paginação, segmentação, memória virtual e algoritmos de substituição.",
    icon: <HardDrive className="size-8" />,
    href: "/os/memoria/paginacao",
    color: "from-cyan-500 to-blue-500",
    progress: 100, // 4 de 4 seções completas
    topics: ["Paginação", "Segmentação", "Virtual Memory", "Page Replacement"],
    difficulty: "Intermediário",
    duration: "~4 horas",
  },
  {
    title: "Processos e Threads",
    description: "Entenda como os processos são criados, gerenciados e como as threads funcionam.",
    icon: <Cpu className="size-8" />,
    href: "/os/processos",
    color: "from-blue-500 to-indigo-500",
    progress: 0,
    topics: ["PCB", "Context Switch", "Multithreading", "IPC"],
    difficulty: "Básico",
    duration: "~3 horas",
  },
  {
    title: "Sincronização e Concorrência",
    description: "Aprenda sobre mutex, semáforos e problemas clássicos de concorrência.",
    icon: <GitFork className="size-8" />,
    href: "/os/sincronizacao",
    color: "from-teal-500 to-green-500",
    progress: 0,
    topics: ["Mutex", "Semáforos", "Deadlock", "Race Conditions"],
    difficulty: "Avançado",
    duration: "~5 horas",
  },
  {
    title: "Deadlock",
    description: "Descubra as condições para deadlock e estratégias de prevenção/detecção.",
    icon: <Lock className="size-8" />,
    href: "/os/deadlock",
    color: "from-red-500 to-pink-500",
    progress: 0,
    topics: ["Condições", "Prevenção", "Detecção", "Recuperação"],
    difficulty: "Avançado",
    duration: "~3 horas",
  },
  {
    title: "Sistemas de Arquivos",
    description: "Entenda FAT, i-nodes e como os arquivos são armazenados e organizados.",
    icon: <Folder className="size-8" />,
    href: "/os/arquivos",
    color: "from-amber-500 to-orange-500",
    progress: 0,
    topics: ["FAT", "i-nodes", "Estruturas", "Fragmentação"],
    difficulty: "Intermediário",
    duration: "~3 horas",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    }
  }
};

export default function OSDashboardPage() {
  const totalProgress = Math.round(
    osSections.reduce((acc, section) => acc + section.progress, 0) / osSections.length
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-os-primary via-blue-600 to-os-secondary p-8 md:p-12 text-white"
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <Cpu className="size-10" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bem-vindo à OS Academy!
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-8">
            Domine os fundamentos dos Sistemas Operacionais através de módulos interativos, 
            simuladores visuais e exercícios práticos baseados em Tanenbaum e Silberschatz.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="size-5 text-yellow-300" />
                <span className="text-sm font-medium">Progresso Geral</span>
              </div>
              <div className="text-3xl font-bold">{totalProgress}%</div>
              <Progress value={totalProgress} className="h-2 mt-2 bg-white/20" />
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-5 text-green-300" />
                <span className="text-sm font-medium">Módulos</span>
              </div>
              <div className="text-3xl font-bold">
                {osSections.filter(s => s.progress === 100).length}/{osSections.length}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-5 text-blue-300" />
                <span className="text-sm font-medium">Simuladores</span>
              </div>
              <div className="text-3xl font-bold">6+</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-purple-300" />
                <span className="text-sm font-medium">Tempo Estimado</span>
              </div>
              <div className="text-3xl font-bold">20h</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Módulos de Aprendizado</h2>
            <p className="text-muted-foreground mt-1">Escolha um módulo para começar sua jornada</p>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {osSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={section.href}>
                <Card className={`h-full group relative overflow-hidden transition-all duration-300 ${
                  section.progress === 100 
                    ? "border-2 border-green-500/50 bg-green-500/5" 
                    : "border-2 border-border hover:border-os-primary/50"
                } hover:shadow-xl hover:shadow-os-primary/10`}>
                  {/* Animated gradient background */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  
                  {section.progress === 100 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-green-500 text-white border-0">
                        <CheckCircle2 className="size-3 mr-1" />
                        Completo
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} text-white shadow-lg shrink-0`}
                        whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {section.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-2xl mb-2 group-hover:text-os-primary transition-colors">
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                      {section.topics.map((topic) => (
                        <Badge 
                          key={topic} 
                          variant="secondary" 
                          className="bg-background/50 hover:bg-os-primary/20 transition-colors"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{section.duration}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          section.difficulty === "Básico" 
                            ? "border-green-500/50 text-green-600" 
                            : section.difficulty === "Intermediário" 
                            ? "border-yellow-500/50 text-yellow-600" 
                            : "border-red-500/50 text-red-600"
                        }
                      >
                        {section.difficulty}
                      </Badge>
                    </div>

                    {/* Progress bar */}
                    {section.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-semibold text-os-primary">{section.progress}%</span>
                        </div>
                        <Progress value={section.progress} className="h-2" />
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-os-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        {section.progress === 100 ? "Revisar módulo" : section.progress > 0 ? "Continuar" : "Começar agora"}
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="size-6 text-blue-500" />
              Dica de Aprendizado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p className="text-lg">
              <strong className="text-foreground">Sugestão:</strong> Comece pelo módulo de <strong className="text-os-primary">Gerenciamento de Memória</strong> 
              para entender os conceitos fundamentais de paginação, segmentação e memória virtual. 
              Estes conceitos são essenciais para compreender os demais módulos.
            </p>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                <CheckCircle2 className="size-3 mr-1" />
                4 Seções completas
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                6 Simuladores interativos
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
