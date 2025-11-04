"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { BeladyAnomalyDemonstrator } from "@/components/os/BeladyAnomalyDemonstrator";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  BookOpen, 
  Calculator, 
  TrendingDown, 
  Lightbulb,
  Code2,
  Brain,
  Zap,
  BarChart3
} from "lucide-react";

export default function BeladyAnomalyPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm">
              <AlertTriangle className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Anomalia de Belady
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              O Paradoxo dos Algoritmos de Substituição de Páginas
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Brain className="size-3 mr-1" /> Paradoxo
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <TrendingDown className="size-3 mr-1" /> FIFO
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <BarChart3 className="size-3 mr-1" /> Performance
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Code2 className="size-3 mr-1" /> Algoritmos
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Introdução */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-red-500/5 border-2 border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <AlertTriangle className="size-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O que é a Anomalia de Belady?</h2>
                  <p className="text-muted-foreground">Descoberta por László A. Belády em 1966</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  A <strong className="text-red-600 dark:text-red-400">Anomalia de Belady</strong> é um fenômeno 
                  contra-intuitivo onde <strong>aumentar o número de quadros de memória disponíveis pode resultar 
                  em MAIS page faults</strong>, ao invés de menos. Esta anomalia desafia a lógica comum de que 
                  mais memória sempre melhora o desempenho.
                </p>

                <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-300">
                    <Lightbulb className="size-5" />
                    Definição Formal
                  </h3>
                  <p className="text-red-800 dark:text-red-200">
                    Dado um algoritmo de substituição <strong>A</strong> e uma string de referências <strong>σ</strong>, 
                    a anomalia de Belady ocorre quando existe uma situação onde:
                  </p>
                  <div className="bg-white dark:bg-black/30 rounded p-4 mt-4 font-mono text-center">
                    <div className="text-2xl font-bold text-red-600">
                      F<sub>A</sub>(σ, m+1) &gt; F<sub>A</sub>(σ, m)
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      onde F<sub>A</sub>(σ, m) é o número de page faults com m quadros
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      ✅ Intuição Esperada
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Mais memória = Menos page faults = Melhor performance
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                      ⚠️ Realidade com FIFO
                    </h4>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Mais memória = Mais page faults = Pior performance!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Exemplo Detalhado */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-orange-500/5 border-2 border-orange-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <Calculator className="size-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Exemplo Numérico Completo</h2>
                  <p className="text-muted-foreground">Sequência clássica: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Cenário 1: 3 Quadros (FIFO)</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-orange-300 dark:border-orange-700">
                          <th className="p-2 text-left">Referência</th>
                          <th className="p-2 text-center">Quadro 0</th>
                          <th className="p-2 text-center">Quadro 1</th>
                          <th className="p-2 text-center">Quadro 2</th>
                          <th className="p-2 text-center">Page Fault?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { ref: 1, frames: [1, null, null], fault: true },
                          { ref: 2, frames: [1, 2, null], fault: true },
                          { ref: 3, frames: [1, 2, 3], fault: true },
                          { ref: 4, frames: [4, 2, 3], fault: true },
                          { ref: 1, frames: [4, 2, 3], fault: true },
                          { ref: 2, frames: [4, 2, 3], fault: false },
                          { ref: 5, frames: [4, 5, 3], fault: true },
                          { ref: 1, frames: [4, 5, 1], fault: true },
                          { ref: 2, frames: [2, 5, 1], fault: true },
                          { ref: 3, frames: [2, 3, 1], fault: true },
                          { ref: 4, frames: [2, 3, 4], fault: true },
                          { ref: 5, frames: [5, 3, 4], fault: true },
                        ].map((step, i) => (
                          <tr key={i} className="border-b border-orange-200/50 dark:border-orange-800/50">
                            <td className="p-2 font-mono font-bold">{step.ref}</td>
                            <td className="p-2 text-center">{step.frames[0] || '-'}</td>
                            <td className="p-2 text-center">{step.frames[1] || '-'}</td>
                            <td className="p-2 text-center">{step.frames[2] || '-'}</td>
                            <td className="p-2 text-center">
                              {step.fault ? (
                                <Badge variant="destructive" className="text-xs">❌ PF</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">✅ Hit</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                    <strong>Total: 9 Page Faults</strong>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Cenário 2: 4 Quadros (FIFO) ⚠️</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-red-300 dark:border-red-700">
                          <th className="p-2 text-left">Referência</th>
                          <th className="p-2 text-center">Quadro 0</th>
                          <th className="p-2 text-center">Quadro 1</th>
                          <th className="p-2 text-center">Quadro 2</th>
                          <th className="p-2 text-center">Quadro 3</th>
                          <th className="p-2 text-center">Page Fault?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { ref: 1, frames: [1, null, null, null], fault: true },
                          { ref: 2, frames: [1, 2, null, null], fault: true },
                          { ref: 3, frames: [1, 2, 3, null], fault: true },
                          { ref: 4, frames: [1, 2, 3, 4], fault: true },
                          { ref: 1, frames: [1, 2, 3, 4], fault: false },
                          { ref: 2, frames: [1, 2, 3, 4], fault: false },
                          { ref: 5, frames: [5, 2, 3, 4], fault: true },
                          { ref: 1, frames: [5, 1, 3, 4], fault: true },
                          { ref: 2, frames: [5, 1, 2, 4], fault: true },
                          { ref: 3, frames: [5, 1, 2, 3], fault: true },
                          { ref: 4, frames: [4, 1, 2, 3], fault: true },
                          { ref: 5, frames: [4, 5, 2, 3], fault: true },
                        ].map((step, i) => (
                          <tr key={i} className="border-b border-red-200/50 dark:border-red-800/50">
                            <td className="p-2 font-mono font-bold">{step.ref}</td>
                            <td className="p-2 text-center">{step.frames[0] || '-'}</td>
                            <td className="p-2 text-center">{step.frames[1] || '-'}</td>
                            <td className="p-2 text-center">{step.frames[2] || '-'}</td>
                            <td className="p-2 text-center">{step.frames[3] || '-'}</td>
                            <td className="p-2 text-center">
                              {step.fault ? (
                                <Badge variant="destructive" className="text-xs">❌ PF</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">✅ Hit</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded">
                    <strong className="text-red-700 dark:text-red-300">Total: 10 Page Faults ⚠️ ANOMALIA!</strong>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      10 &gt; 9 → Mais quadros causaram MAIS page faults!
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Análise: Por que acontece?</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Com 3 quadros:</strong> A página 1 é substituída na posição 0, mas depois é 
                      recarregada quando necessário. A ordem de substituição FIFO funciona "bem" com 3 quadros.
                    </p>
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Com 4 quadros:</strong> A página 1 permanece mais tempo na memória, mas quando 
                      a página 5 chega, ela substitui a página 1 na posição 0. Depois, quando a página 1 é 
                      novamente referenciada, ela já foi substituída e precisa ser recarregada, causando um 
                      page fault adicional que não ocorreria com 3 quadros.
                    </p>
                    <p className="text-green-800 dark:text-green-200 font-semibold">
                      <strong>Raiz do problema:</strong> FIFO não considera uso futuro nem recente. Com mais quadros, 
                      páginas importantes podem ser substituídas "prematuramente" antes de serem usadas novamente.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Demonstrador Interativo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BeladyAnomalyDemonstrator />
          </motion.section>

          {/* Algoritmos Stack Property */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Zap className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Propriedade Stack</h2>
                  <p className="text-muted-foreground">Por que alguns algoritmos são imunes à anomalia</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Um algoritmo de substituição possui a <strong className="text-blue-600 dark:text-blue-400">
                  Propriedade Stack</strong> se, para qualquer string de referências σ e qualquer número de 
                  quadros m, o conjunto de páginas na memória com m+1 quadros <strong>contém</strong> o conjunto 
                  de páginas com m quadros.
                </p>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Definição Matemática</h3>
                  <div className="bg-white dark:bg-black/30 rounded p-4 font-mono text-center">
                    <div className="text-lg mb-2">
                      S<sub>m+1</sub>(σ) ⊇ S<sub>m</sub>(σ)
                    </div>
                    <p className="text-sm text-muted-foreground">
                      onde S<sub>m</sub>(σ) é o conjunto de páginas na memória com m quadros
                    </p>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-4">
                    <strong>Consequência:</strong> Se S<sub>m+1</sub> ⊇ S<sub>m</sub>, então F(σ, m+1) ≤ F(σ, m). 
                    Ou seja, mais quadros sempre resulta em menos ou igual page faults.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
                      ✅ Algoritmos com Stack Property
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <li>• <strong>LRU (Least Recently Used)</strong> - Nunca sofre anomalia</li>
                      <li>• <strong>Optimal (Belady)</strong> - Teórico, nunca sofre</li>
                      <li>• <strong>LFU (Least Frequently Used)</strong> - Com implementação correta</li>
                      <li>• <strong>MRU (Most Recently Used)</strong> - Raro, mas possui stack</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">
                      ❌ Algoritmos SEM Stack Property
                    </h4>
                    <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                      <li>• <strong>FIFO</strong> - Pode sofrer anomalia de Belady</li>
                      <li>• <strong>Random</strong> - Substituição aleatória</li>
                      <li>• <strong>Clock (implementação simples)</strong> - Depende da implementação</li>
                      <li>• <strong>FIFO com segunda chance</strong> - Pode ter anomalia</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3">
                    💡 Por que LRU tem Stack Property?
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    Com LRU, se uma página está na memória com m quadros, ela também estará com m+1 quadros 
                    (a menos que seja a menos recentemente usada, mas mesmo assim, com mais memória, a página 
                    menos recente de m quadros continuará sendo menos recente que a nova página adicionada).
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Intuição:</strong> LRU mantém as páginas mais recentes. Com mais quadros, você simplesmente 
                    adiciona mais páginas ao conjunto, nunca remove páginas que já estavam lá.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Implementação e Código */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Code2 className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Implementação em C</h2>
                  <p className="text-muted-foreground">Código completo para detectar anomalia de Belady</p>
                </div>
              </div>

              <CodeBlock language="c">
{`// belady_anomaly.c
// Detecção e análise da Anomalia de Belady

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_FRAMES 10
#define MAX_REFERENCES 100

// Estrutura FIFO
typedef struct {
    int frames[MAX_FRAMES];
    int num_frames;
    int next_to_replace;
    int page_faults;
} FIFO;

void fifo_init(FIFO* fifo, int num_frames) {
    fifo->num_frames = num_frames;
    fifo->next_to_replace = 0;
    fifo->page_faults = 0;
    for (int i = 0; i < num_frames; i++) {
        fifo->frames[i] = -1; // -1 = vazio
    }
}

bool fifo_access(FIFO* fifo, int page) {
    // Verifica se página já está na memória (HIT)
    for (int i = 0; i < fifo->num_frames; i++) {
        if (fifo->frames[i] == page) {
            return false; // HIT
        }
    }
    
    // PAGE FAULT - página não encontrada
    fifo->page_faults++;
    
    // Substitui página na posição circular
    fifo->frames[fifo->next_to_replace] = page;
    fifo->next_to_replace = (fifo->next_to_replace + 1) % fifo->num_frames;
    
    return true; // PAGE FAULT
}

// Testa FIFO com diferentes números de quadros
void test_belady_anomaly(int* references, int n_refs) {
    printf("=== Teste de Anomalia de Belady ===\\n");
    printf("Sequência: ");
    for (int i = 0; i < n_refs; i++) {
        printf("%d ", references[i]);
    }
    printf("\\n\\n");
    
    int results[MAX_FRAMES];
    
    // Testa de 1 a MAX_FRAMES quadros
    for (int frames = 1; frames <= MAX_FRAMES; frames++) {
        FIFO fifo;
        fifo_init(&fifo, frames);
        
        for (int i = 0; i < n_refs; i++) {
            fifo_access(&fifo, references[i]);
        }
        
        results[frames - 1] = fifo.page_faults;
        printf("FIFO com %d quadros: %d page faults\\n", 
               frames, fifo.page_faults);
    }
    
    // Verifica se há anomalia
    printf("\\n=== Análise ===\\n");
    bool anomaly_detected = false;
    for (int i = 1; i < MAX_FRAMES; i++) {
        if (results[i] > results[i - 1]) {
            printf("⚠️  ANOMALIA DETECTADA: %d quadros (%d PF) > %d quadros (%d PF)\\n",
                   i + 1, results[i], i, results[i - 1]);
            anomaly_detected = true;
        }
    }
    
    if (!anomaly_detected) {
        printf("✅ Nenhuma anomalia detectada nesta sequência.\\n");
    }
}

// Exemplo clássico que causa anomalia
int main() {
    // Sequência clássica que causa anomalia com FIFO
    int references1[] = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    int n1 = sizeof(references1) / sizeof(references1[0]);
    
    test_belady_anomaly(references1, n1);
    
    printf("\\n\\n");
    
    // Sequência que NÃO causa anomalia
    int references2[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int n2 = sizeof(references2) / sizeof(references2[0]);
    
    test_belady_anomaly(references2, n2);
    
    return 0;
}

/* 
 * Saída esperada para a primeira sequência:
 * 
 * === Teste de Anomalia de Belady ===
 * Sequência: 1 2 3 4 1 2 5 1 2 3 4 5 
 * 
 * FIFO com 3 quadros: 9 page faults
 * FIFO com 4 quadros: 10 page faults  ⚠️ ANOMALIA!
 * FIFO com 5 quadros: 6 page faults
 * ...
 * 
 * === Análise ===
 * ⚠️  ANOMALIA DETECTADA: 4 quadros (10 PF) > 3 quadros (9 PF)
 */
`}
              </CodeBlock>
            </Card>
          </motion.section>

          {/* Condições para Anomalia */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5 border-2 border-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <Brain className="size-6 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Condições para Ocorrência</h2>
                  <p className="text-muted-foreground">Quando a anomalia pode acontecer</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Requisitos Necessários</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">1</Badge>
                      <div>
                        <strong>Algoritmo sem Stack Property:</strong> O algoritmo deve ser não-stack. 
                        FIFO é o exemplo clássico, mas outros algoritmos também podem sofrer.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">2</Badge>
                      <div>
                        <strong>String de referências específica:</strong> Nem toda sequência causa anomalia. 
                        A sequência precisa ter padrões particulares que explorem a falha do algoritmo.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">3</Badge>
                      <div>
                        <strong>Número de quadros específico:</strong> A anomalia geralmente ocorre em 
                        transições específicas (ex: de 3 para 4 quadros), não em todas.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">4</Badge>
                      <div>
                        <strong>Timing de referências:</strong> Referências futuras devem "punir" a decisão 
                        de manter páginas que pareciam boas com menos quadros.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Por que FIFO é Vulnerável?</h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>FIFO ignora:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Uso futuro das páginas</li>
                      <li>Frequência de acesso</li>
                      <li>Recência de uso</li>
                      <li>Qualquer informação sobre o padrão de acesso</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Decisão baseada apenas em:</strong> Ordem de chegada (First-In, First-Out)
                    </p>
                    <p className="mt-3 font-semibold text-indigo-700 dark:text-indigo-300">
                      Isso significa que FIFO pode substituir uma página que será usada em breve, 
                      simplesmente porque ela chegou primeiro, independentemente de sua importância futura.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Impacto Prático */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-emerald-500/5 border-2 border-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <TrendingDown className="size-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Impacto Prático</h2>
                  <p className="text-muted-foreground">Por que isso importa em sistemas reais</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">
                      ⚠️ Problemas Reais
                    </h4>
                    <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                      <li>• Sistemas podem ter performance pior após upgrade de memória</li>
                      <li>• Alocação dinâmica de frames pode causar degradação</li>
                      <li>• Dificulta previsão de performance</li>
                      <li>• Pode mascarar problemas de thrashing</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
                      ✅ Soluções
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <li>• Usar LRU ou algoritmos stack</li>
                      <li>• Monitorar page fault rate após mudanças</li>
                      <li>• Testar com workloads reais</li>
                      <li>• Implementar detecção de anomalia</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    📊 Sistemas Operacionais Modernos
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    <strong>Linux:</strong> Usa principalmente LRU e suas variações (Clock, WSClock), 
                    que são imunes à anomalia de Belady.
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    <strong>Windows:</strong> Usa algoritmos baseados em LRU e working set, também imunes.
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Conclusão:</strong> Sistemas modernos evitam FIFO puro exatamente por causa da 
                    anomalia de Belady e outros problemas de performance.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Referências */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <BookOpen className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Referências</h2>
                  <p className="text-muted-foreground">Fontes acadêmicas e técnicas</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    Paper Original
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Belády, L. A. (1966).</strong> &quot;A Study of Replacement Algorithms for 
                    Virtual-Storage Computer.&quot; <em>IBM Systems Journal</em>, 5(2), 78-101.
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    Livros de Referência
                  </h4>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                    <li>• Tanenbaum - <em>Modern Operating Systems</em> (Cap. 3.4)</li>
                    <li>• Silberschatz - <em>Operating System Concepts</em> (Cap. 9.4)</li>
                    <li>• Stallings - <em>Operating Systems</em> (Cap. 8)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <a href="/os/memoria/substituicao" className="text-primary hover:underline flex items-center gap-2">
              ← Algoritmos de Substituição
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

