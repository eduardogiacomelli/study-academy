"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, HelpCircle, Trophy } from "lucide-react";
import { useState } from "react";

export default function ExerciciosPage() {
  const [respostasVisiveis, setRespostasVisiveis] = useState<Set<number>>(new Set());

  const toggleResposta = (id: number) => {
    const novas = new Set(respostasVisiveis);
    if (novas.has(id)) {
      novas.delete(id);
    } else {
      novas.add(id);
    }
    setRespostasVisiveis(novas);
  };

  const exercicios = [
    {
      id: 1,
      categoria: "Conceitual",
      dificuldade: "Fácil",
      questao: "Explique a diferença entre memória virtual e memória física. Por que a memória virtual é necessária?",
      resposta: "Memória física (RAM) é a memória real instalada no computador. Memória virtual é uma abstração que dá a cada processo a ilusão de ter um espaço de endereçamento contínuo e privado, independente da RAM disponível. É necessária para: (1) Permitir programas maiores que a RAM, (2) Isolar processos, (3) Facilitar multiprogramação, (4) Simplificar desenvolvimento."
    },
    {
      id: 2,
      categoria: "Cálculo",
      dificuldade: "Médio",
      questao: "Um sistema tem 4 GB de RAM e usa páginas de 4 KB. Quantos frames físicos existem? Se usa paginação de 2 níveis com 10 bits por nível, quantas entradas há em cada tabela?",
      resposta: "Frames = 4GB / 4KB = (2^32) / (2^12) = 2^20 = 1.048.576 frames\n\nPara 2 níveis com 10 bits cada:\n- Page Directory: 2^10 = 1024 entradas\n- Page Tables: 1024 entradas cada\n- Offset: 32 - 10 - 10 = 12 bits (confirma 4KB pages)"
    },
    {
      id: 3,
      categoria: "Working Set",
      dificuldade: "Médio",
      questao: "Dada a sequência de referências: 1,2,3,4,1,2,5,1,2,3,4,5. Calcule W(10,4) e W(10,6).",
      resposta: "W(10,4) = páginas em [6,10] = {5,1,2,3,4} → |W| = 5 páginas\n\nW(10,6) = páginas em [4,10] = {1,2,5,3,4} → |W| = 5 páginas\n\nNeste caso, Δ=4 e Δ=6 dão o mesmo resultado, mas geralmente Δ maior captura mais páginas."
    },
    {
      id: 4,
      categoria: "EAT",
      dificuldade: "Difícil",
      questao: "Calcule o EAT para: TLB hit = 98%, TLB time = 1ns, Memory time = 100ns, 4-level paging, Page fault = 0.01%, PF time = 10ms.",
      resposta: "TLB hit: 1ns + 100ns = 101ns\nTLB miss: 4×100ns + 100ns = 500ns\n\nEAT sem PF = 0.98×101 + 0.02×500 = 98.98 + 10 = 108.98ns\n\nEAT total = 0.9999×108.98 + 0.0001×10,000,000 = 108.97 + 1000 = 1108.97ns ≈ 1.1µs\n\nOverhead: 1108.97/100 = 11.09x"
    },
    {
      id: 5,
      categoria: "Page Replacement",
      dificuldade: "Médio",
      questao: "Para a sequência 1,2,3,4,1,2,5,1,2,3,4,5 com 3 frames, quantos page faults ocorrem com FIFO? E com LRU?",
      resposta: "FIFO: [1] [1,2] [1,2,3] [2,3,4] [3,4,1] [4,1,2] [1,2,5] [2,5,1] [5,1,2] [1,2,3] [2,3,4] [3,4,5]\nPage Faults = 9\n\nLRU: [1] [1,2] [1,2,3] [1,2,4] (3 saiu) [1,2,4] (1 usado) [1,2,4] (2 usado) [1,2,5] (4 saiu) [1,2,5] [1,2,5] [1,2,3] (5 saiu) [1,2,4] (3 saiu) [2,4,5] (1 saiu)\nPage Faults = 8 (LRU melhor!)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Exercícios</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
            Exercícios Práticos
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            {exercicios.length} questões sobre memória virtual, do básico ao avançado.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { label: "Conceituais", value: "10" },
              { label: "Cálculos", value: "8" },
              { label: "Algoritmos", value: "7" }
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Exercícios */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-6">
          {exercicios.map((ex) => (
            <Card key={ex.id} className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-500 text-white text-lg px-3 py-1">
                  {ex.id}
                </Badge>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{ex.categoria}</Badge>
                    <Badge className={
                      ex.dificuldade === "Fácil" ? "bg-green-500" :
                      ex.dificuldade === "Médio" ? "bg-yellow-500" :
                      "bg-red-500"
                    }>
                      {ex.dificuldade}
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-slate-300 mb-4">{ex.questao}</p>
                  
                  <Button
                    onClick={() => toggleResposta(ex.id)}
                    variant="outline"
                    size="sm"
                    className="mb-4"
                  >
                    {respostasVisiveis.has(ex.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Ocultar Resposta
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Ver Resposta
                      </>
                    )}
                  </Button>
                  
                  {respostasVisiveis.has(ex.id) && (
                    <div className="bg-green-950/20 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-green-400">Resposta:</span>
                      </div>
                      <pre className="text-slate-300 whitespace-pre-wrap text-sm">
                        {ex.resposta}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border-blue-500/20 p-8 mt-12">
          <div className="flex items-center gap-4 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">Parabéns!</h3>
              <p className="text-slate-300">
                Continue praticando para dominar memória virtual!
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            💡 Dica: Tente resolver sem ver a resposta primeiro!
          </div>
        </Card>
      </div>
    </div>
  );
}

