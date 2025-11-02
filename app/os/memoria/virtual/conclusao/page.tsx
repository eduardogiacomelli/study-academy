"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Rocket, TrendingUp, Zap, Award, CheckCircle } from "lucide-react";

export default function ConclusaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-xl backdrop-blur-sm">
              <Award className="w-8 h-8 text-indigo-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Conclusão</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Conclusão do Módulo
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl">
            Memória Virtual: uma das inovações mais importantes da computação moderna.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Resumo */}
          <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
            <h2 className="text-3xl font-bold mb-6">📚 O Que Aprendemos</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Fundamentos",
                  items: ["Virtual vs Physical Memory", "MMU e TLB", "Page Tables (4-level)", "PTE structure"]
                },
                {
                  icon: TrendingUp,
                  title: "Localidade",
                  items: ["Temporal & Espacial", "Working Set Model", "Thrashing", "PFF"]
                },
                {
                  icon: Zap,
                  title: "Algoritmos",
                  items: ["FIFO, LRU, Clock", "Optimal (Belády)", "Comparações", "Trade-offs"]
                },
                {
                  icon: Rocket,
                  title: "Avançado",
                  items: ["Demand Paging", "Copy-on-Write", "Page Fault (8 steps)", "Performance (EAT)"]
                }
              ].map((section, i) => (
                <Card key={i} className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border-indigo-500/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <section.icon className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-semibold text-indigo-300">{section.title}</h3>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Card>

          {/* Conquistas */}
          <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/20 p-8">
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-12 h-12 text-yellow-400" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Parabéns!</h2>
                <p className="text-lg text-slate-300">
                  Você completou o módulo de Memória Virtual!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: "Páginas Estudadas", value: "10" },
                { label: "Conceitos", value: "50+" },
                { label: "Algoritmos", value: "7" },
                { label: "Exercícios", value: "25+" }
              ].map((stat, i) => (
                <Card key={i} className="bg-white/5 p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Futuro */}
          <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
            <h2 className="text-3xl font-bold mb-6">🚀 O Futuro da Memória Virtual</h2>
            
            <div className="space-y-4 text-slate-300">
              <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">NVM (Non-Volatile Memory)</h3>
                <p>
                  Intel Optane e outras tecnologias NVM estão mudando o jogo: memória persistente 
                  com velocidades próximas à RAM, eliminando a linha entre RAM e armazenamento.
                </p>
              </div>

              <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">CXL (Compute Express Link)</h3>
                <p>
                  Novo padrão de interconexão que permite memória compartilhada entre CPUs, GPUs 
                  e aceleradores, revolucionando arquiteturas de data center.
                </p>
              </div>

              <div className="bg-pink-950/30 border border-pink-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-pink-300 mb-3">AI-Optimized Paging</h3>
                <p>
                  Machine learning para prever padrões de acesso e otimizar page replacement, 
                  potencialmente reduzindo page faults em 50%+.
                </p>
              </div>
            </div>
          </Card>

          {/* Próximos Passos */}
          <Card className="bg-gradient-to-br from-indigo-950/50 to-pink-950/50 border-indigo-500/20 p-8">
            <h2 className="text-3xl font-bold mb-6">📖 Continue Aprendendo</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">Próximos Tópicos:</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• File Systems</li>
                  <li>• I/O Management</li>
                  <li>• Distributed Operating Systems</li>
                  <li>• Security</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Recursos Adicionais:</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Linux Kernel Source (mm/)</li>
                  <li>• OSTEP Book (Free online)</li>
                  <li>• LWN.net articles</li>
                  <li>• ASPLOS/OSDI papers</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

