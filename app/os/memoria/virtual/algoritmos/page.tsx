"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { PageReplacementComparator } from "@/components/virtual-memory/PageReplacementComparator";
import { 
  RotateCcw, Clock, TrendingDown, Zap, Activity, 
  Brain, Award, Code2, BookOpen, AlertTriangle 
} from "lucide-react";

export default function AlgoritmosSubstituicao() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-xl backdrop-blur-sm">
              <RotateCcw className="w-8 h-8 text-indigo-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Algoritmos de Substituição de Página
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Page Replacement Algorithms
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Quando a RAM está cheia, qual página remover? A escolha do algoritmo pode impactar o desempenho 
            em até 10x! Comparação detalhada de 10 algoritmos clássicos e modernos.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: TrendingDown, label: "Objetivo", value: "Min. Page Faults", color: "text-red-400" },
              { icon: Clock, label: "Complexidade", value: "O(1) - O(n)", color: "text-yellow-400" },
              { icon: Brain, label: "Optimal", value: "Belády (teórico)", color: "text-purple-400" },
              { icon: Award, label: "Prático", value: "LRU/Clock", color: "text-green-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-4">
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
        <Tabs defaultValue="intro" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="intro" className="data-[state=active]:bg-indigo-500">
              <BookOpen className="w-4 h-4 mr-2" />
              Introdução
            </TabsTrigger>
            <TabsTrigger value="fifo" className="data-[state=active]:bg-indigo-500">
              FIFO
            </TabsTrigger>
            <TabsTrigger value="optimal" className="data-[state=active]:bg-indigo-500">
              Optimal
            </TabsTrigger>
            <TabsTrigger value="lru" className="data-[state=active]:bg-indigo-500">
              LRU
            </TabsTrigger>
            <TabsTrigger value="clock" className="data-[state=active]:bg-indigo-500">
              <Clock className="w-4 h-4 mr-2" />
              Clock
            </TabsTrigger>
            <TabsTrigger value="outros" className="data-[state=active]:bg-indigo-500">
              Outros
            </TabsTrigger>
            <TabsTrigger value="belady" className="data-[state=active]:bg-indigo-500">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Belády
            </TabsTrigger>
            <TabsTrigger value="comparador" className="data-[state=active]:bg-indigo-500">
              <Activity className="w-4 h-4 mr-2" />
              Comparador
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-indigo-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* INTRODUÇÃO */}
          <TabsContent value="intro" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">O Problema da Substituição de Página</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  Em um sistema com memória virtual, quando ocorre um <strong className="text-indigo-400">page fault</strong> 
                  e todos os frames físicos estão ocupados, o sistema operacional precisa escolher uma página vítima para 
                  ser removida e dar lugar à nova página.
                </p>

                <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">🎯 Objetivo Central</h3>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-indigo-400 mb-3">
                      Minimizar Page Faults
                    </div>
                    <div className="text-slate-300">
                      Quanto menos page faults, melhor o desempenho do sistema
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-green-950/30 border-green-500/20 p-6">
                    <h4 className="text-lg font-semibold text-green-300 mb-3">✅ Boa Escolha</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Remover página que <strong>NÃO</strong> será usada em breve
                    </p>
                    <div className="bg-black/30 p-3 rounded text-xs">
                      <div className="text-green-400 mb-2">Exemplo:</div>
                      <div className="text-slate-300">
                        Páginas: [A, B, C, D] na RAM<br />
                        Próximos acessos: A, B, C, A, B<br />
                        Remover: <strong className="text-green-400">D</strong> ✅ (não será usada)
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-red-950/30 border-red-500/20 p-6">
                    <h4 className="text-lg font-semibold text-red-300 mb-3">❌ Má Escolha</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Remover página que <strong>SERÁ</strong> usada logo em seguida
                    </p>
                    <div className="bg-black/30 p-3 rounded text-xs">
                      <div className="text-red-400 mb-2">Exemplo:</div>
                      <div className="text-slate-300">
                        Páginas: [A, B, C, D] na RAM<br />
                        Próximos acessos: A, B, C, A, B<br />
                        Remover: <strong className="text-red-400">A</strong> ❌ (será usada logo!)<br />
                        Resultado: Page fault imediato 💀
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="bg-yellow-950/30 border-yellow-500/20 p-6">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-4">⚖️ Trade-offs dos Algoritmos</h3>
                  
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-yellow-500">1</Badge>
                      <div>
                        <strong className="text-yellow-400">Simplicidade vs Eficiência:</strong><br />
                        Algoritmos simples (FIFO) são rápidos mas podem ter muitos page faults.<br />
                        Algoritmos complexos (LRU perfeito) são mais eficientes mas custosos computacionalmente.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-yellow-500">2</Badge>
                      <div>
                        <strong className="text-yellow-400">Overhead vs Precisão:</strong><br />
                        Tracking de acesso perfeito (LRU) requer hardware ou estruturas de dados caras.<br />
                        Aproximações (Clock, Second Chance) usam apenas reference bits.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-yellow-500">3</Badge>
                      <div>
                        <strong className="text-yellow-400">Teórico vs Prático:</strong><br />
                        Optimal (Belády) é impossível de implementar (precisa do futuro).<br />
                        Serve como benchmark teórico para comparação.
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">📊 Métricas de Avaliação</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-indigo-400 font-semibold mb-2">Page Fault Rate</div>
                      <div className="text-xs text-slate-300">
                        Número de page faults por referência<br />
                        <strong>Menor é melhor</strong> ✅
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-purple-400 font-semibold mb-2">Hit Rate</div>
                      <div className="text-xs text-slate-300">
                        % de acessos que encontram página na RAM<br />
                        <strong>Maior é melhor</strong> ✅
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-pink-400 font-semibold mb-2">Overhead</div>
                      <div className="text-xs text-slate-300">
                        Tempo/memória para decidir vítima<br />
                        <strong>Menor é melhor</strong> ✅
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* FIFO */}
          <TabsContent value="fifo" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Badge className="bg-blue-500 text-2xl px-4 py-2">1</Badge>
                FIFO (First-In, First-Out)
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  O algoritmo mais simples: <strong className="text-blue-400">remove a página mais antiga</strong> na memória,
                  independente de quando foi acessada pela última vez.
                </p>

                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">💡 Como Funciona</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-blue-400 mb-2">Estrutura de Dados:</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Uma <strong>fila (queue)</strong> mantém a ordem de chegada das páginas.
                      </p>
                      <CodeBlock language="text">
                        {`Queue: [A] → [B] → [C] → [D]
                ^head          ^tail

Nova página E chega:
1. Remove head (A) - mais antiga
2. Adiciona E no tail
Queue: [B] → [C] → [D] → [E]`}
                      </CodeBlock>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-950/20 border border-green-500/20 p-4 rounded">
                        <h4 className="font-semibold text-green-400 mb-2">✅ Vantagens:</h4>
                        <ul className="space-y-1 text-sm text-slate-300">
                          <li>• <strong>Simples</strong> de implementar</li>
                          <li>• <strong>Overhead baixo</strong> (apenas queue)</li>
                          <li>• <strong>Justo</strong>: todas as páginas têm mesmo tempo</li>
                          <li>• <strong>O(1)</strong> para seleção de vítima</li>
                        </ul>
                      </div>

                      <div className="bg-red-950/20 border border-red-500/20 p-4 rounded">
                        <h4 className="font-semibold text-red-400 mb-2">❌ Desvantagens:</h4>
                        <ul className="space-y-1 text-sm text-slate-300">
                          <li>• <strong>Ignora frequência</strong> de uso</li>
                          <li>• <strong>Ignora recentidade</strong> de acesso</li>
                          <li>• <strong>Belády&apos;s Anomaly</strong> (mais frames = mais PF!)</li>
                          <li>• <strong>Pior caso</strong>: remove página usada constantemente</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">📝 Exemplo Passo a Passo</h3>
                  
                  <div className="bg-black/30 p-6 rounded font-mono text-sm overflow-x-auto">
                    <div className="mb-4 text-indigo-400">Sequência de acesso: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</div>
                    <div className="mb-4 text-slate-400">3 frames disponíveis</div>
                    
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="p-2">Passo</th>
                          <th className="p-2">Página</th>
                          <th className="p-2">Frame 0</th>
                          <th className="p-2">Frame 1</th>
                          <th className="p-2">Frame 2</th>
                          <th className="p-2">Evento</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-slate-800"><td className="p-2">1</td><td className="p-2 text-yellow-400">1</td><td className="p-2 text-green-400">1</td><td className="p-2">-</td><td className="p-2">-</td><td className="p-2 text-red-400">PF (cold start)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">2</td><td className="p-2 text-yellow-400">2</td><td className="p-2">1</td><td className="p-2 text-green-400">2</td><td className="p-2">-</td><td className="p-2 text-red-400">PF (cold start)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">3</td><td className="p-2 text-yellow-400">3</td><td className="p-2">1</td><td className="p-2">2</td><td className="p-2 text-green-400">3</td><td className="p-2 text-red-400">PF (cold start)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">4</td><td className="p-2 text-yellow-400">4</td><td className="p-2 text-red-500">4</td><td className="p-2">2</td><td className="p-2">3</td><td className="p-2 text-red-400">PF (remove 1)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">5</td><td className="p-2 text-yellow-400">1</td><td className="p-2">4</td><td className="p-2 text-red-500">1</td><td className="p-2">3</td><td className="p-2 text-red-400">PF (remove 2)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">6</td><td className="p-2 text-yellow-400">2</td><td className="p-2">4</td><td className="p-2">1</td><td className="p-2 text-red-500">2</td><td className="p-2 text-red-400">PF (remove 3)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">7</td><td className="p-2 text-yellow-400">5</td><td className="p-2 text-red-500">5</td><td className="p-2">1</td><td className="p-2">2</td><td className="p-2 text-red-400">PF (remove 4)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">8</td><td className="p-2 text-yellow-400">1</td><td className="p-2">5</td><td className="p-2">1</td><td className="p-2">2</td><td className="p-2 text-green-400">HIT ✓</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">9</td><td className="p-2 text-yellow-400">2</td><td className="p-2">5</td><td className="p-2">1</td><td className="p-2">2</td><td className="p-2 text-green-400">HIT ✓</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">10</td><td className="p-2 text-yellow-400">3</td><td className="p-2">5</td><td className="p-2 text-red-500">3</td><td className="p-2">2</td><td className="p-2 text-red-400">PF (remove 1)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">11</td><td className="p-2 text-yellow-400">4</td><td className="p-2">5</td><td className="p-2">3</td><td className="p-2 text-red-500">4</td><td className="p-2 text-red-400">PF (remove 2)</td></tr>
                        <tr className="border-b border-slate-800"><td className="p-2">12</td><td className="p-2 text-yellow-400">5</td><td className="p-2">5</td><td className="p-2">3</td><td className="p-2">4</td><td className="p-2 text-green-400">HIT ✓</td></tr>
                      </tbody>
                    </table>
                    
                    <div className="mt-4 p-4 bg-red-950/30 border border-red-500/20 rounded">
                      <div className="text-red-400 font-bold">Resultado Final:</div>
                      <div className="text-slate-300 mt-2">
                        Total de acessos: 12<br />
                        Page Faults: 9 (75%!)<br />
                        Hits: 3 (25%)
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">💻 Implementação em C</h3>
                  
                  <CodeBlock language="c">
                    {`#include <stdio.h>
#include <stdbool.h>

#define MAX_FRAMES 10
#define MAX_PAGES 100

typedef struct {
    int pages[MAX_FRAMES];  // Páginas nos frames
    int head;               // Próximo frame a ser substituído
    int count;              // Número de frames ocupados
    int capacity;           // Capacidade máxima
} FIFO_Queue;

void init_fifo(FIFO_Queue *q, int capacity) {
    for (int i = 0; i < MAX_FRAMES; i++) {
        q->pages[i] = -1;
    }
    q->head = 0;
    q->count = 0;
    q->capacity = capacity;
}

bool is_in_memory(FIFO_Queue *q, int page) {
    for (int i = 0; i < q->capacity; i++) {
        if (q->pages[i] == page) return true;
    }
    return false;
}

void fifo_replace(FIFO_Queue *q, int page) {
    if (q->count < q->capacity) {
        // Frames ainda disponíveis
        q->pages[q->count++] = page;
    } else {
        // Substituir página mais antiga (head)
        printf("  Substituindo página %d (head=%d)\\n", 
               q->pages[q->head], q->head);
        q->pages[q->head] = page;
        q->head = (q->head + 1) % q->capacity;
    }
}

int simulate_fifo(int *reference_string, int length, int num_frames) {
    FIFO_Queue queue;
    init_fifo(&queue, num_frames);
    int page_faults = 0;
    
    printf("\\n=== FIFO Simulation ===\\n");
    printf("Frames: %d\\n", num_frames);
    printf("Reference string: ");
    for (int i = 0; i < length; i++) printf("%d ", reference_string[i]);
    printf("\\n\\n");
    
    for (int i = 0; i < length; i++) {
        int page = reference_string[i];
        printf("Acesso %d: Página %d -> ", i+1, page);
        
        if (is_in_memory(&queue, page)) {
            printf("HIT\\n");
        } else {
            printf("PAGE FAULT\\n");
            page_faults++;
            fifo_replace(&queue, page);
            
            // Mostrar estado dos frames
            printf("  Frames: [");
            for (int j = 0; j < queue.capacity; j++) {
                if (queue.pages[j] != -1) {
                    printf("%d", queue.pages[j]);
                } else {
                    printf("-");
                }
                if (j < queue.capacity - 1) printf(", ");
            }
            printf("]\\n");
        }
    }
    
    printf("\\n=== Resultado ===\\n");
    printf("Total de acessos: %d\\n", length);
    printf("Page Faults: %d (%.1f%%)\\n", 
           page_faults, (page_faults * 100.0) / length);
    printf("Hits: %d (%.1f%%)\\n", 
           length - page_faults, ((length - page_faults) * 100.0) / length);
    
    return page_faults;
}

int main() {
    int ref_string[] = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    int length = sizeof(ref_string) / sizeof(ref_string[0]);
    
    simulate_fifo(ref_string, length, 3);
    return 0;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* OPTIMAL continua nos próximos... */}
          
          {/* COMPARADOR */}
          <TabsContent value="comparador" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Comparador Interativo 3D</h2>
              <p className="text-lg text-slate-300 mb-8">
                Compare até 7 algoritmos simultaneamente com visualização em tempo real e estatísticas detalhadas.
              </p>
              
              <PageReplacementComparator />
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["optimal", "lru", "clock", "outros", "belady", "codigo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab}</h2>
                <div className="text-center text-slate-400 py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Em desenvolvimento - Parte da estrutura épica de 1400+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-sm border-indigo-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-indigo-300 mb-4">📄 Papers Clássicos</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-indigo-400">László A. Belády (1966)</div>
                  <div className="italic">&quot;A Study of Replacement Algorithms for Virtual-Storage Computer&quot;</div>
                  <div className="text-xs text-slate-500">IBM Systems Journal, Vol. 5, No. 2</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems</div>
                  <div className="text-xs text-slate-500">Chapter 3.4: Page Replacement Algorithms</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

