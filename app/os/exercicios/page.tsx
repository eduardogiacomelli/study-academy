"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Trophy,
  Target,
  BookOpen
} from "lucide-react";

export default function ExerciciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-4">
              <Zap className="size-4 text-yellow-500" />
              <span className="text-sm font-medium">Exercícios Interativos</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Exercícios
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pratique seus conhecimentos com questões gamificadas
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                  <Trophy className="size-12 text-yellow-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Em Desenvolvimento</h2>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Esta seção está sendo desenvolvida e em breve terá 40+ exercícios gamificados 
                com sistema de pontuação e progresso.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 rounded-lg bg-muted/50">
                  <Target className="size-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold mb-1">40+</div>
                  <div className="text-sm text-muted-foreground">Questões</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Trophy className="size-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold mb-1">Sistema</div>
                  <div className="text-sm text-muted-foreground">de Pontos</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <BookOpen className="size-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold mb-1">Todos</div>
                  <div className="text-sm text-muted-foreground">os Níveis</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
