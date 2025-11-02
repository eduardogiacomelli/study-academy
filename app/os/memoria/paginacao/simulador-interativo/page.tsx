"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ConfigPanel } from "@/components/paging/ConfigPanel";
import { ProcessList } from "@/components/paging/ProcessList";
import { CreateProcessDialog } from "@/components/paging/CreateProcessDialog";
import { PageTableViewer } from "@/components/paging/PageTableViewer";
import { MemoryGridAnimated } from "@/components/paging/MemoryGridAnimated";
import { Memory3DEnhanced } from "@/components/paging/Memory3DEnhanced";
import { 
  Play, 
  Box, 
  Grid3x3, 
  Table2, 
  Info,
  Lightbulb,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function SimuladorInterativoPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Header */}
      <header className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-os-primary via-cyan-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm">
              <Play className="size-6 md:size-8" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Simulador Interativo de Paginação
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Configure a memória, crie processos e visualize o sistema de paginação em tempo real
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Tempo Real
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Grid3x3 className="size-3 mr-1" /> Visual 2D
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Box className="size-3 mr-1" /> Visual 3D
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Table2 className="size-3 mr-1" /> Tabela de Páginas
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-blue-500/20">
                  <Lightbulb className="size-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Como usar este simulador</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>1.</strong> Configure o tamanho da memória física e das páginas abaixo
                    </p>
                    <p>
                      <strong>2.</strong> Crie processos e veja a alocação em tempo real nas visualizações 2D e 3D
                    </p>
                    <p>
                      <strong>3.</strong> Selecione um processo para ver sua tabela de páginas completa
                    </p>
                    <p>
                      <strong>💡 Dica:</strong> Experimente diferentes tamanhos de página para ver como afeta a fragmentação!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Configuração + Gerenciamento */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ConfigPanel />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Criar Processo */}
              <Card className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-green-500/10">
                    <Play className="size-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Gerenciar Processos</h3>
                    <p className="text-xs text-muted-foreground">Criar e remover processos</p>
                  </div>
                </div>
                <CreateProcessDialog />
              </Card>

              {/* Lista de Processos */}
              <ProcessList />
            </motion.div>
          </div>

          <Separator className="my-8" />

          {/* Visualização da Memória */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-background to-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Box className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Visualização da Memória Física</h2>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe a alocação de quadros em tempo real
                  </p>
                </div>
              </div>

              <Tabs defaultValue="2d" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
                  <TabsTrigger value="2d" className="text-base flex items-center gap-2">
                    <Grid3x3 className="size-4" />
                    <span className="hidden sm:inline">Visual 2D Animado</span>
                    <span className="sm:hidden">2D</span>
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="text-base flex items-center gap-2">
                    <Box className="size-4" />
                    <span className="hidden sm:inline">Visual 3D Premium</span>
                    <span className="sm:hidden">3D</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="2d" className="mt-6">
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <MemoryGridAnimated />
                  </Suspense>
                </TabsContent>

                <TabsContent value="3d" className="mt-6">
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <Memory3DEnhanced />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Tabela de Páginas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PageTableViewer />
          </motion.div>

          {/* Info adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-amber-500/20">
                  <Info className="size-6 text-amber-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold">Entendendo as visualizações</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-foreground">Visual 2D:</strong>
                      <p className="text-muted-foreground">
                        Grid interativo com animações staggered. Cada bloco representa um quadro da memória física.
                        Quadros ocupados mostram o PID do processo e são coloridos por processo.
                      </p>
                    </div>
                    
                    <div>
                      <strong className="text-foreground">Visual 3D:</strong>
                      <p className="text-muted-foreground">
                        Visualização tridimensional premium com shaders, sombras e efeitos de glow.
                        Use o mouse para rotacionar, zoom e explorar a memória de todos os ângulos.
                      </p>
                    </div>
                    
                    <div>
                      <strong className="text-foreground">Tabela de Páginas:</strong>
                      <p className="text-muted-foreground">
                        Mostra o mapeamento completo de páginas lógicas para quadros físicos de cada processo.
                        Fundamental para entender como funciona a tradução de endereços.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-500/20">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Dica Pro:</strong> Combine diferentes tamanhos de memória e página para ver
                      o trade-off entre fragmentação interna e overhead da tabela de páginas!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <Link href="/os/memoria/paginacao" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                ← Voltar para Paginação
              </motion.button>
            </Link>
            
            <Link href="/os/memoria/paginacao/estruturas-dados" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-os-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-os-primary/50 transition-all"
              >
                Próximo: Estruturas de Dados →
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="h-[500px] rounded-2xl border bg-muted/20 flex items-center justify-center">
      <div className="text-center space-y-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Box className="size-12 text-primary" />
        </motion.div>
        <p className="text-sm text-muted-foreground">Carregando visualização...</p>
      </div>
    </div>
  );
}

