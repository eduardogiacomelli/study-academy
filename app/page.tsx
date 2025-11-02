"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, ArrowRight, Zap, Target, 
  Sparkles, Play, CheckCircle2, Code2, Brain, Rocket,
  Monitor, Activity, Layers
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      damping: 10
    }
  }
};

const features = [
  {
    icon: <Brain className="size-6" />,
    title: "Aprendizado Visual",
    description: "Simuladores 2D e 3D para visualizar conceitos complexos",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Code2 className="size-6" />,
    title: "Código Real",
    description: "Exemplos práticos em C, TypeScript e SQL",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Activity className="size-6" />,
    title: "Exercícios Interativos",
    description: "Pratique com feedback instantâneo",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Layers className="size-6" />,
    title: "Teoria Completa",
    description: "Baseado em Tanenbaum, Silberschatz e Elmasri",
    color: "from-orange-500 to-red-500",
  },
];

const stats = [
  { value: "6+", label: "Simuladores", icon: <Monitor className="size-5" /> },
  { value: "50+", label: "Exercícios", icon: <Target className="size-5" /> },
  { value: "100%", label: "Interativo", icon: <Zap className="size-5" /> },
  { value: "∞", label: "Exemplos", icon: <Code2 className="size-5" /> },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Animated Blur Orbs */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-os-primary/30 blur-[100px] -top-48 -left-48"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-db-primary/30 blur-[100px] -bottom-48 -right-48"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-os-primary/10 to-db-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="size-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium">Plataforma Educacional de Nova Geração</span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-os-primary to-cyan-500 bg-clip-text text-transparent">
                OS Academy
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Domine <span className="text-os-primary font-semibold">Sistemas Operacionais</span> através de{" "}
              <span className="relative">
                <span className="relative z-10">simuladores visuais interativos</span>
                <motion.span 
                  className="absolute inset-x-0 bottom-1 h-3 bg-gradient-to-r from-os-primary/30 to-db-primary/30 -rotate-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.p>
            
            <motion.div 
              className="flex gap-4 justify-center flex-wrap mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="bg-gradient-to-r from-os-primary to-os-secondary text-white shadow-lg shadow-os-primary/50 hover:shadow-xl hover:shadow-os-primary/50 transition-all">
                  <Link href="/os">
                    <Cpu className="mr-2 size-5" />
                    Explorar Sistemas Operacionais
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild className="border-2 backdrop-blur-sm">
                  <Link href="/os/memoria/paginacao">
                    <Play className="mr-2 size-5" />
                    Ver Demonstração
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-os-primary to-cyan-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Rocket className="size-3 mr-2" />
              Recursos Exclusivos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Aprendizado{" "}
              <span className="bg-gradient-to-r from-os-primary to-db-primary bg-clip-text text-transparent">
                Revolucionário
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combinamos teoria acadêmica com tecnologia de ponta para criar a melhor experiência de aprendizado
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="p-6 h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Main Cards Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            {/* OS Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href="/os">
                <Card className="group relative overflow-hidden p-8 h-full bg-gradient-to-br from-os-primary/10 to-os-secondary/10 border-2 border-os-primary/20 hover:border-os-primary/50 transition-all hover:shadow-2xl hover:shadow-os-primary/20">
                  {/* Animated background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-os-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-os-primary to-os-secondary flex items-center justify-center text-white mb-6 shadow-lg shadow-os-primary/50"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Cpu className="size-8" />
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-os-primary transition-colors">
                      Sistemas Operacionais
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      Explore processos, threads, gerenciamento de memória, paginação, segmentação e muito mais através de simuladores interativos 2D e 3D.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Paginação", "Segmentação", "Virtual Memory", "Page Replacement"].map((topic) => (
                        <Badge key={topic} variant="secondary" className="bg-os-primary/20 text-os-primary">
                          <CheckCircle2 className="size-3 mr-1" />
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-os-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                      Começar agora
                      <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-os-primary via-cyan-600 to-blue-700 p-12 text-center text-white"
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <Rocket className="size-10" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já estão dominando conceitos complexos de forma visual e interativa
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="bg-white text-os-primary hover:bg-white/90 shadow-2xl shadow-black/20">
                  <Link href="/os">
                    <Cpu className="mr-2 size-5" />
                    Começar Agora Gratuitamente
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
