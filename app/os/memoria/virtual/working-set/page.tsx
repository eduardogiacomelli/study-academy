"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { WorkingSetSimulator3D } from "@/components/virtual-memory/WorkingSetSimulator3D";
import { 
  Brain, TrendingUp, Clock, AlertTriangle,
  Code2, BookOpen, Activity, Cpu
} from "lucide-react";

export default function WorkingSetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Working Set
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
            Working Set Model
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            O modelo matemático que define quais páginas um processo está ativamente usando. 
            Fundamental para prevenir thrashing e otimizar a alocação de memória.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Brain, label: "W(t,Δ)", value: "Modelo formal", color: "text-purple-400" },
              { icon: TrendingUp, label: "PFF", value: "Self-adjusting", color: "text-pink-400" },
              { icon: Clock, label: "WSClock", value: "Implementação", color: "text-indigo-400" },
              { icon: AlertTriangle, label: "Thrashing", value: "Prevenção", color: "text-red-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-4">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="modelo" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="modelo" className="data-[state=active]:bg-purple-500">
              <Brain className="w-4 h-4 mr-2" />
              Modelo
            </TabsTrigger>
            <TabsTrigger value="pff" className="data-[state=active]:bg-purple-500">
              PFF
            </TabsTrigger>
            <TabsTrigger value="wsclock" className="data-[state=active]:bg-purple-500">
              <Clock className="w-4 h-4 mr-2" />
              WSClock
            </TabsTrigger>
            <TabsTrigger value="implementacao" className="data-[state=active]:bg-purple-500">
              Implementação
            </TabsTrigger>
            <TabsTrigger value="simulador" className="data-[state=active]:bg-purple-500">
              <Activity className="w-4 h-4 mr-2" />
              Simulador 3D
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-purple-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* MODELO */}
          <TabsContent value="modelo" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Working Set Model (Peter Denning, 1968)</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  O <strong className="text-purple-400">Working Set Model</strong> é uma teoria fundamental 
                  que descreve o comportamento de programas em termos de suas necessidades de memória ao longo do tempo.
                </p>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-purple-300 mb-4">📐 Definição Matemática</h3>
                  
                  <div className="bg-black/40 rounded-lg p-8 mb-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-purple-400 mb-4">
                        W(t, Δ) = {`{ páginas referenciadas em [t - Δ, t] }`}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-purple-950/30 p-4 rounded">
                        <div className="font-semibold text-purple-400 mb-2">t (tempo)</div>
                        <div className="text-slate-300">
                          Tempo virtual atual do processo (CPU time, não wall-clock)
                        </div>
                      </div>
                      
                      <div className="bg-pink-950/30 p-4 rounded">
                        <div className="font-semibold text-pink-400 mb-2">Δ (delta)</div>
                        <div className="text-slate-300">
                          Janela de working set (working set window) em unidades de tempo
                        </div>
                      </div>
                      
                      <div className="bg-indigo-950/30 p-4 rounded">
                        <div className="font-semibold text-indigo-400 mb-2">W(t,Δ)</div>
                        <div className="text-slate-300">
                          Conjunto de páginas únicas acessadas no intervalo [t-Δ, t]
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-300">Exemplo Numérico:</h4>
                    
                    <CodeBlock language="text">
                      {`Sequência de referências (page numbers):
t:  0   1   2   3   4   5   6   7   8   9   10
p:  1   2   3   1   2   4   5   1   2   3   4

Com Δ = 4:

W(4, 4) = páginas em [0, 4] = {1, 2, 3}
        |W(4,4)| = 3 páginas

W(7, 4) = páginas em [3, 7] = {1, 2, 4, 5}
        |W(7,4)| = 4 páginas

W(10, 4) = páginas em [6, 10] = {1, 2, 3, 4, 5}
         |W(10,4)| = 5 páginas (cresceu!)

Com Δ = 6:

W(10, 6) = páginas em [4, 10] = {1, 2, 3, 4, 5}
         |W(10,6)| = 5 páginas (mesmo resultado)

Observação: Δ maior captura mais páginas, mas pode incluir páginas não necessárias.`}
                    </CodeBlock>
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 border-purple-500/20 p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">
                    🎯 Política de Gerenciamento Baseada em Working Set
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-400 mb-2">Princípio Fundamental:</h4>
                      <div className="text-lg text-slate-300 italic border-l-4 border-purple-500 pl-4">
                        "Um processo só deve ser executado se seu working set completo 
                        estiver disponível na memória física."
                      </div>
                      <div className="text-sm text-slate-500 mt-2">
                        — Peter Denning, "The Working Set Model for Program Behavior" (1968)
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-950/20 border border-green-500/20 rounded p-4">
                        <h4 className="font-semibold text-green-400 mb-2">✅ Condição Ideal:</h4>
                        <CodeBlock language="text">
                          {`Σ |W_i(t, Δ)| ≤ RAM disponível
  i=1..n

n = número de processos ativos

Se TRUE:
→ Todos os processos podem executar
→ Sistema estável
→ Page fault rate baixo`}
                        </CodeBlock>
                      </div>

                      <div className="bg-red-950/20 border border-red-500/20 rounded p-4">
                        <h4 className="font-semibold text-red-400 mb-2">❌ Sobrecarga (Thrashing):</h4>
                        <CodeBlock language="text">
                          {`Σ |W_i(t, Δ)| > RAM disponível
  i=1..n

Se TRUE:
→ SUSPENDER alguns processos
→ Escolher qual suspender:
  • Menor prioridade
  • Maior |W_i|
  • Menos CPU-bound
→ Previne thrashing!`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">
                    📊 Propriedades do Working Set
                  </h3>
                  
                  <div className="space-y-4 text-slate-300">
                    {[
                      {
                        title: "1. Varia com Δ",
                        content: "Δ pequeno → WS pequeno (apenas muito recente)\nΔ grande → WS grande (histórico longo)\nNecessário tuning para cada workload"
                      },
                      {
                        title: "2. Phase Behavior",
                        content: "Programas têm fases com diferentes WS:\n• Inicialização: pequeno\n• Processamento: grande\n• I/O: pequeno\nTransições = picos de page faults"
                      },
                      {
                        title: "3. Steady-State vs Transient",
                        content: "Steady-state: WS estável (loops)\nTransient: WS mudando (transição de fase)\nSistema deve adaptar frames alocados"
                      },
                      {
                        title: "4. Localidade Temporal",
                        content: "WS captura localidade temporal naturalmente\nPáginas em W(t,Δ) = usadas recentemente\nMaior chance de uso futuro"
                      }
                    ].map((prop, i) => (
                      <div key={i} className="bg-black/30 rounded p-4">
                        <h4 className="font-semibold text-indigo-400 mb-2">{prop.title}</h4>
                        <pre className="text-sm text-slate-300 whitespace-pre-line">
                          {prop.content}
                        </pre>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* SIMULADOR 3D */}
          <TabsContent value="simulador" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Simulador 3D - Working Set em Ação</h2>
              <p className="text-lg text-slate-300 mb-8">
                Visualização interativa do Working Set Model com detecção de thrashing e análise de fases.
              </p>
              
              <WorkingSetSimulator3D />
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["pff", "wsclock", "implementacao", "codigo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab}</h2>
                <div className="text-center text-slate-400 py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Parte da estrutura épica de 1150+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-sm border-purple-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">📄 Paper Original</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Peter J. Denning (1968)</div>
                  <div className="italic">"The Working Set Model for Program Behavior"</div>
                  <div className="text-xs text-slate-500">Communications of the ACM, Vol. 11, No. 5</div>
                  <div className="mt-2 text-xs">
                    🏆 Paper seminal que definiu o modelo de Working Set
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-pink-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems</div>
                  <div className="text-xs text-slate-500">Chapter 3.5: The Working Set Model</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

