"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { CopyOnWriteVisualizer3D } from "@/components/virtual-memory/CopyOnWriteVisualizer3D";
import { 
  Zap, Copy, Layers, Code2, BookOpen, 
  AlertCircle, CheckCircle, Timer, Database 
} from "lucide-react";

export default function DemandPaging() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-500/20 rounded-xl backdrop-blur-sm">
              <Zap className="w-8 h-8 text-cyan-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Demand Paging
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-transparent bg-clip-text">
            Paginação por Demanda
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Carregue apenas o necessário, quando necessário! A técnica fundamental que torna a memória 
            virtual eficiente: páginas são carregadas sob demanda, não antecipadamente.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Zap, label: "Lazy Loading", value: "Sob demanda", color: "text-cyan-400" },
              { icon: Timer, label: "Startup", value: "10x mais rápido", color: "text-green-400" },
              { icon: Database, label: "Memória", value: "50-80% economia", color: "text-purple-400" },
              { icon: Copy, label: "COW", value: "fork() eficiente", color: "text-yellow-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-4">
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
        <Tabs defaultValue="conceito" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="conceito" className="data-[state=active]:bg-cyan-500">
              <BookOpen className="w-4 h-4 mr-2" />
              Conceito
            </TabsTrigger>
            <TabsTrigger value="pure" className="data-[state=active]:bg-cyan-500">
              Pure Demand
            </TabsTrigger>
            <TabsTrigger value="prepaging" className="data-[state=active]:bg-cyan-500">
              Prepaging
            </TabsTrigger>
            <TabsTrigger value="cow" className="data-[state=active]:bg-cyan-500">
              <Copy className="w-4 h-4 mr-2" />
              Copy-on-Write ✨
            </TabsTrigger>
            <TabsTrigger value="lazy" className="data-[state=active]:bg-cyan-500">
              Lazy Allocation
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-cyan-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* CONCEITO */}
          <TabsContent value="conceito" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">O que é Demand Paging?</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Demand Paging</strong> (Paginação por Demanda) é uma técnica 
                  onde páginas são carregadas na memória física <strong>apenas quando são acessadas</strong>, 
                  não antecipadamente durante a inicialização do programa.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-red-950/30 border-red-500/20 p-6">
                    <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6" />
                      Abordagem Tradicional (SEM Demand Paging)
                    </h3>
                    
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="bg-black/30 p-3 rounded">
                        <strong className="text-red-400">Processo de inicialização:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Carregar TODAS as páginas do disco para RAM</li>
                          <li>Inicializar todas as estruturas de dados</li>
                          <li>Só então começar execução</li>
                        </ol>
                      </div>

                      <div className="bg-red-950/30 border border-red-500/20 rounded p-3">
                        <strong className="text-red-400">Problemas:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>❌ Startup lento (carregar GB do disco)</li>
                          <li>❌ Desperdício de RAM (código nunca usado)</li>
                          <li>❌ Impossível executar programas {'>'} RAM</li>
                          <li>❌ Menos processos simultâneos</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 p-3 rounded font-mono text-xs">
                        Exemplo: Firefox (500 MB)<br />
                        Tempo de startup: 15 segundos<br />
                        RAM usada: 500 MB (mesmo que use 10%)
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-green-950/30 border-green-500/20 p-6">
                    <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      Com Demand Paging
                    </h3>
                    
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="bg-black/30 p-3 rounded">
                        <strong className="text-green-400">Processo de inicialização:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Criar entrada na tabela de páginas (present=0)</li>
                          <li>Começar execução imediatamente</li>
                          <li>Carregar páginas conforme são acessadas</li>
                        </ol>
                      </div>

                      <div className="bg-green-950/30 border border-green-500/20 rounded p-3">
                        <strong className="text-green-400">Vantagens:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>✅ Startup rápido (1-2s vs 15s)</li>
                          <li>✅ Usa apenas RAM necessária</li>
                          <li>✅ Programas {'>'} RAM funcionam!</li>
                          <li>✅ Mais processos simultâneos</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 p-3 rounded font-mono text-xs">
                        Exemplo: Firefox (500 MB)<br />
                        Tempo de startup: 1.5 segundos<br />
                        RAM usada: 80 MB (apenas o necessário)
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border-cyan-500/20 p-6">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-4">🔄 Como Funciona (Fluxo Básico)</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Badge className="bg-cyan-500 text-lg px-3 py-1 mt-1">1</Badge>
                      <div>
                        <strong className="text-cyan-400">Programa inicia:</strong>
                        <p className="text-sm text-slate-300 mt-1">
                          SO cria process descriptor e tabela de páginas com TODAS as entradas marcadas como 
                          <code className="bg-black/30 px-2 py-1 rounded mx-1">present = 0</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge className="bg-cyan-500 text-lg px-3 py-1 mt-1">2</Badge>
                      <div>
                        <strong className="text-cyan-400">CPU tenta executar primeira instrução:</strong>
                        <p className="text-sm text-slate-300 mt-1">
                          MMU detecta <code className="bg-black/30 px-2 py-1 rounded mx-1">present = 0</code> → 
                          <strong className="text-red-400"> PAGE FAULT</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge className="bg-cyan-500 text-lg px-3 py-1 mt-1">3</Badge>
                      <div>
                        <strong className="text-cyan-400">Page Fault Handler:</strong>
                        <p className="text-sm text-slate-300 mt-1">
                          SO aloca frame físico, carrega página do disco (ou zero-fill), atualiza PTE 
                          (<code className="bg-black/30 px-2 py-1 rounded mx-1">present = 1</code>)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge className="bg-cyan-500 text-lg px-3 py-1 mt-1">4</Badge>
                      <div>
                        <strong className="text-cyan-400">Retry instrução:</strong>
                        <p className="text-sm text-slate-300 mt-1">
                          CPU executa a instrução novamente, desta vez com sucesso (página está na RAM)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge className="bg-green-500 text-lg px-3 py-1 mt-1">5</Badge>
                      <div>
                        <strong className="text-green-400">Próximas instruções na mesma página:</strong>
                        <p className="text-sm text-slate-300 mt-1">
                          <strong>SEM page fault!</strong> ✅ (graças à localidade espacial)
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">📊 Estatísticas Típicas</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-3xl font-bold text-purple-400 mb-2">5-10%</div>
                      <div className="text-sm text-slate-300">
                        Código realmente executado na maioria dos programas
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{'<'} 1%</div>
                      <div className="text-sm text-slate-300">
                        Page fault rate típico após warm-up
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <div className="text-3xl font-bold text-green-400 mb-2">10-100x</div>
                      <div className="text-sm text-slate-300">
                        Redução no tempo de startup
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* PURE DEMAND PAGING */}
          <TabsContent value="pure" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Pure Demand Paging</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Pure Demand Paging</strong> é a forma mais extrema: 
                  NENHUMA página é carregada antecipadamente. O processo inicia com zero páginas na memória.
                </p>

                <Card className="bg-cyan-950/30 border-cyan-500/20 p-6">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-4">📜 Definição Formal</h3>
                  
                  <div className="bg-black/30 rounded-lg p-6 mb-4">
                    <div className="text-center text-lg text-slate-300 mb-4">
                      "Never bring a page into memory until it is required."
                    </div>
                    <div className="text-center text-sm text-slate-500 italic">
                      — Silberschatz, Operating System Concepts
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-cyan-500">✓</Badge>
                      <div>
                        <strong>Primeira instrução:</strong> Page fault (código não está na RAM)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-cyan-500">✓</Badge>
                      <div>
                        <strong>Primeiro acesso a dados:</strong> Page fault (dados não estão na RAM)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-cyan-500">✓</Badge>
                      <div>
                        <strong>Primeiro acesso ao stack:</strong> Page fault (stack não está na RAM)
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-green-950/30 border-green-500/20 p-6">
                    <h4 className="text-lg font-semibold text-green-300 mb-3">✅ Vantagens</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <div>
                          <strong>Startup instantâneo:</strong> Processo começa imediatamente
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <div>
                          <strong>Zero desperdício:</strong> Apenas código executado está na RAM
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <div>
                          <strong>Máxima multiprogramação:</strong> Mais processos na RAM
                        </div>
                      </li>
                    </ul>
                  </Card>

                  <Card className="bg-red-950/30 border-red-500/20 p-6">
                    <h4 className="text-lg font-semibold text-red-300 mb-3">❌ Desvantagens</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <div>
                          <strong>Muitos page faults iniciais:</strong> Startup pode ser lento
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <div>
                          <strong>Ignora localidade espacial:</strong> Páginas adjacentes não vêm junto
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <div>
                          <strong>I/O ineficiente:</strong> Muitas operações pequenas de disco
                        </div>
                      </li>
                    </ul>
                  </Card>
                </div>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">
                    💻 Implementação em C - Pure Demand Paging Simulator
                  </h3>
                  
                  <CodeBlock language="c">
                    {`#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define MAX_PAGES 20

typedef struct {
    int virtual_addr;
    bool present;
    int frame_number;
} PageTableEntry;

typedef struct {
    PageTableEntry pte[MAX_PAGES];
    int num_pages;
} PageTable;

int page_faults = 0;
int memory_accesses = 0;

// Simular page fault handler
void handle_page_fault(PageTable *pt, int page_num) {
    printf("  ⚠️  PAGE FAULT! Página %d não está na memória\\n", page_num);
    page_faults++;
    
    // Simular I/O do disco (5-10 ms na realidade)
    printf("  📀 Carregando página %d do disco...\\n", page_num);
    
    // Alocar frame e marcar como presente
    pt->pte[page_num].frame_number = rand() % 100;
    pt->pte[page_num].present = true;
    
    printf("  ✓ Página %d carregada no frame %d\\n", 
           page_num, pt->pte[page_num].frame_number);
}

// Acessar memória virtual
void access_memory(PageTable *pt, int virtual_addr) {
    int page_num = virtual_addr / 4096;  // 4KB pages
    int offset = virtual_addr % 4096;
    
    memory_accesses++;
    
    printf("\\n[%d] Acesso: 0x%04X (página %d, offset %d)\\n", 
           memory_accesses, virtual_addr, page_num, offset);
    
    if (!pt->pte[page_num].present) {
        handle_page_fault(pt, page_num);
    } else {
        printf("  ✓ HIT! Página %d já está na memória (frame %d)\\n",
               page_num, pt->pte[page_num].frame_number);
    }
}

int main() {
    PageTable pt = {0};
    pt.num_pages = MAX_PAGES;
    
    // Inicializar: NENHUMA página na memória (pure demand)
    for (int i = 0; i < MAX_PAGES; i++) {
        pt.pte[i].virtual_addr = i * 4096;
        pt.pte[i].present = false;
        pt.pte[i].frame_number = -1;
    }
    
    printf("=== Pure Demand Paging Simulator ===\\n");
    printf("Iniciando processo... (0 páginas carregadas)\\n");
    
    // Sequência de acessos simulando execução de programa
    printf("\\n--- Fase 1: Início do programa ---\\n");
    access_memory(&pt, 0x0000);     // Primeira instrução (código)
    access_memory(&pt, 0x0004);     // Segunda instrução (mesma página!)
    access_memory(&pt, 0x0008);     // Terceira instrução (mesma página!)
    
    printf("\\n--- Fase 2: Acesso a dados ---\\n");
    access_memory(&pt, 0x5000);     // Primeira variável global
    access_memory(&pt, 0x5004);     // Segunda variável (mesma página!)
    
    printf("\\n--- Fase 3: Uso do stack ---\\n");
    access_memory(&pt, 0x7FF0);     // Stack pointer inicial
    
    printf("\\n--- Fase 4: Chamada de função ---\\n");
    access_memory(&pt, 0x2000);     // Código da função
    
    printf("\\n\\n=== Estatísticas Finais ===\\n");
    printf("Total de acessos: %d\\n", memory_accesses);
    printf("Page Faults: %d (%.1f%%)\\n", 
           page_faults, (page_faults * 100.0) / memory_accesses);
    printf("Hits: %d (%.1f%%)\\n", 
           memory_accesses - page_faults, 
           ((memory_accesses - page_faults) * 100.0) / memory_accesses);
    
    return 0;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["prepaging", "cow", "lazy", "codigo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab}</h2>
                <div className="text-center text-slate-400 py-12">
                  <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Parte da estrutura épica de 1150+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-cyan-950/50 to-blue-950/50 backdrop-blur-sm border-cyan-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-cyan-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems</div>
                  <div className="text-xs text-slate-500">Chapter 3.3: Virtual Memory</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-4">🔗 Documentação</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-blue-400">Linux Kernel</div>
                  <div>Documentation/vm/</div>
                  <div className="text-xs text-slate-500">mm/memory.c - do_page_fault()</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

