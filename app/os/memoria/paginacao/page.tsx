"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Cpu, 
  MemoryStick, 
  Info,
  Play,
  Eye,
  Code2,
  Lightbulb
} from "lucide-react";
import { PagingSimulator } from "@/components/os/PagingSimulator";
import { PagingVisualizer3D } from "@/components/os/PagingVisualizer3D";
import { TLBVisualizer3D } from "@/components/os/TLBVisualizer3D";

export default function PaginacaoPage() {
  const [activeTab, setActiveTab] = useState("teoria");

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-os-primary/90 via-cyan-600/90 to-os-secondary/90 border-b border-white/10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <MemoryStick className="size-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Paginação</h1>
                  <p className="text-sm text-white/80">
                    Gerenciamento de Memória através de Páginas e Quadros
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-xs">
                  Tanenbaum Cap. 3.3
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-xs">
                  Silberschatz Cap. 9.3
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content - WRAPPED in container max-w-6xl */}
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="teoria" className="flex items-center gap-2">
                <BookOpen className="size-4" />
                Teoria
              </TabsTrigger>
              <TabsTrigger value="simulador" className="flex items-center gap-2">
                <Play className="size-4" />
                Simulador 2D
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center gap-2">
                <Eye className="size-4" />
                Visualização 3D
              </TabsTrigger>
              <TabsTrigger value="exemplos" className="flex items-center gap-2">
                <Code2 className="size-4" />
                Exemplos
              </TabsTrigger>
            </TabsList>

            {/* Teoria - TODO O CONTEÚDO MANTIDO */}
            <TabsContent value="teoria" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Lightbulb className="size-8 text-os-primary" />
                  O que é Paginação?
                </h2>
                
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                  <p className="text-lg leading-relaxed">
                    A <span className="text-os-primary font-semibold">paginação</span> é um esquema de
                    gerenciamento de memória que elimina a necessidade de alocação contígua da memória
                    física. Ela permite que o espaço de endereçamento físico de um processo seja não-contíguo.
                  </p>

                  <Alert className="bg-os-primary/5 border-os-primary/20">
                    <Info className="size-4" />
                    <AlertDescription>
                      A paginação é uma das técnicas mais importantes em sistemas operacionais modernos,
                      sendo fundamental para a implementação de memória virtual.
                    </AlertDescription>
                  </Alert>

                  <h3 className="text-2xl font-bold mt-8 mb-4">Conceitos Fundamentais</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Cpu className="size-5 text-blue-500" />
                        Páginas (Lógicas)
                      </h4>
                      <ul className="space-y-2 text-base">
                        <li>• Blocos de tamanho fixo do espaço lógico</li>
                        <li>• Tamanho típico: 4 KB (4096 bytes)</li>
                        <li>• Numeradas sequencialmente (0, 1, 2, ...)</li>
                        <li>• Visão do processo/programador</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-500/20">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <MemoryStick className="size-5 text-cyan-500" />
                        Quadros (Físicos)
                      </h4>
                      <ul className="space-y-2 text-base">
                        <li>• Blocos de tamanho fixo da memória física</li>
                        <li>• Mesmo tamanho das páginas</li>
                        <li>• Numerados sequencialmente</li>
                        <li>• Visão do hardware/sistema</li>
                      </ul>
                    </Card>
                  </div>

                  <h3 className="text-2xl font-bold mt-8 mb-4">Tradução de Endereços</h3>
                  
                  <p>
                    Cada endereço lógico gerado pela CPU é dividido em duas partes:
                  </p>

                  <Card className="p-6 bg-muted/50 border-border">
                    <div className="space-y-4 font-mono text-sm">
                      <div>
                        <strong>Endereço Lógico</strong> = Número da Página (p) + Deslocamento (d)
                      </div>
                      <div className="pl-4">
                        → p = índice na tabela de páginas<br/>
                        → d = offset dentro da página/quadro
                      </div>
                      <div className="mt-4">
                        <strong>Endereço Físico</strong> = Número do Quadro (f) + Deslocamento (d)
                      </div>
                      <div className="pl-4">
                        → f = obtido da tabela de páginas[p]<br/>
                        → d = mantém-se igual (mesmo offset)
                      </div>
                    </div>
                  </Card>

                  <h3 className="text-2xl font-bold mt-8 mb-4">Tabela de Páginas</h3>
                  
                  <p>
                    A tabela de páginas é mantida pelo sistema operacional para mapear páginas lógicas
                    em quadros físicos. Cada processo tem sua própria tabela de páginas.
                  </p>

                  <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <h4 className="font-bold mb-3">Estrutura de uma Entrada (PTE - Page Table Entry):</h4>
                    <ul className="space-y-2">
                      <li><strong>Número do Quadro:</strong> Indica qual quadro físico contém a página</li>
                      <li><strong>Bit de Presença:</strong> Indica se a página está na memória física</li>
                      <li><strong>Bit de Modificação (Dirty):</strong> Indica se a página foi modificada</li>
                      <li><strong>Bit de Referência:</strong> Usado por algoritmos de substituição</li>
                      <li><strong>Bits de Proteção:</strong> Permissões (leitura/escrita/execução)</li>
                    </ul>
                  </Card>

                  <h3 className="text-2xl font-bold mt-8 mb-4">TLB (Translation Lookaside Buffer)</h3>
                  
                  <p>
                    A TLB é um cache associativo de alta velocidade que armazena traduções recentes
                    de páginas para quadros, reduzindo drasticamente o tempo de tradução de endereços.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <Card className="p-4 text-center bg-green-500/10 border-green-500/20">
                      <div className="text-sm text-muted-foreground">Hit Rate Típico</div>
                      <div className="text-3xl font-bold text-green-500">95-99%</div>
                    </Card>
                    <Card className="p-4 text-center bg-blue-500/10 border-blue-500/20">
                      <div className="text-sm text-muted-foreground">Tempo de Acesso</div>
                      <div className="text-3xl font-bold text-blue-500">~1-5 ns</div>
                    </Card>
                    <Card className="p-4 text-center bg-purple-500/10 border-purple-500/20">
                      <div className="text-sm text-muted-foreground">Entradas Típicas</div>
                      <div className="text-3xl font-bold text-purple-500">64-1024</div>
                    </Card>
                  </div>

                  <Alert className="mt-6 bg-yellow-500/10 border-yellow-500/20">
                    <Lightbulb className="size-4" />
                    <AlertDescription>
                      <strong>Importante:</strong> Com a TLB, a maioria dos acessos à memória (95-99%)
                      requer apenas um acesso à memória física. Sem TLB, seriam necessários dois acessos:
                      um para a tabela de páginas e outro para os dados.
                    </AlertDescription>
                  </Alert>

                  <h3 className="text-2xl font-bold mt-8 mb-4">Vantagens da Paginação</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-green-500/5 border-green-500/20">
                      <h4 className="font-bold mb-2 text-green-500">✓ Vantagens</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Elimina fragmentação externa</li>
                        <li>• Não requer alocação contígua</li>
                        <li>• Facilita compartilhamento de memória</li>
                        <li>• Base para memória virtual</li>
                        <li>• Proteção entre processos</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-red-500/5 border-red-500/20">
                      <h4 className="font-bold mb-2 text-red-500">✗ Desvantagens</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Fragmentação interna (metade da última página em média)</li>
                        <li>• Overhead da tabela de páginas</li>
                        <li>• Tempo adicional de tradução</li>
                        <li>• Complexidade de gerenciamento</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Simulador 2D - TODO O CONTEÚDO MANTIDO */}
            <TabsContent value="simulador" className="space-y-6">
              <PagingSimulator />
            </TabsContent>

            {/* Visualização 3D - TODO O CONTEÚDO MANTIDO */}
            <TabsContent value="3d" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Visualizador 3D - TLB</h2>
                <p className="text-muted-foreground mb-6">
                  Explore a Translation Lookaside Buffer em 3D. Clique nos blocos para simular acessos
                  e veja como a TLB acelera a tradução de endereços.
                </p>
                <TLBVisualizer3D />
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Visualizador 3D - Paginação</h2>
                <p className="text-muted-foreground mb-6">
                  Visualize o mapeamento entre páginas lógicas (azul) e quadros físicos (ciano) em 3D interativo.
                </p>
                <PagingVisualizer3D />
              </Card>
            </TabsContent>

            {/* Exemplos - TODO O CONTEÚDO MANTIDO */}
            <TabsContent value="exemplos" className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Exemplos Práticos</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Exemplo 1: Tradução Básica</h3>
                    <div className="bg-muted p-6 rounded-lg space-y-3">
                      <p><strong>Dados:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tamanho da página: 4 KB = 2¹² = 4096 bytes</li>
                        <li>Endereço lógico: 0x12345 (74565 decimal)</li>
                        <li>Tabela de páginas indica: página 18 → quadro 7</li>
                      </ul>
                      
                      <p className="mt-4"><strong>Cálculo:</strong></p>
                      <div className="font-mono text-sm space-y-1 bg-background/50 p-4 rounded">
                        <div>Número da página = 74565 ÷ 4096 = <strong className="text-os-primary">18</strong></div>
                        <div>Offset = 74565 % 4096 = <strong className="text-os-primary">885</strong> (0x375)</div>
                        <div>Quadro físico = tabela[18] = <strong className="text-cyan-500">7</strong></div>
                        <div>Endereço físico = 7 × 4096 + 885 = <strong className="text-green-500">29557</strong> (0x7375)</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Exemplo 2: Cálculo de Bits</h3>
                    <div className="bg-muted p-6 rounded-lg space-y-3">
                      <p><strong>Dados:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Espaço lógico: 1 MB = 2²⁰ bytes</li>
                        <li>Tamanho da página: 4 KB = 2¹² bytes</li>
                        <li>Memória física: 32 MB = 2²⁵ bytes</li>
                      </ul>
                      
                      <p className="mt-4"><strong>Cálculo:</strong></p>
                      <div className="font-mono text-sm space-y-1 bg-background/50 p-4 rounded">
                        <div>Número de páginas = 2²⁰ ÷ 2¹² = <strong>2⁸ = 256</strong> páginas</div>
                        <div>Bits para página (p) = <strong>8 bits</strong></div>
                        <div>Bits para offset (d) = <strong>12 bits</strong></div>
                        <div>Endereço lógico = <strong>20 bits</strong> (8 + 12)</div>
                        <div className="mt-2"></div>
                        <div>Número de quadros = 2²⁵ ÷ 2¹² = <strong>2¹³ = 8192</strong> quadros</div>
                        <div>Bits para quadro (f) = <strong>13 bits</strong></div>
                        <div>Endereço físico = <strong>25 bits</strong> (13 + 12)</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Exemplo 3: Tempo de Acesso com TLB</h3>
                    <div className="bg-muted p-6 rounded-lg space-y-3">
                      <p><strong>Dados:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tempo de acesso à TLB: 1 ns</li>
                        <li>Tempo de acesso à memória: 100 ns</li>
                        <li>TLB hit rate: 98%</li>
                      </ul>
                      
                      <p className="mt-4"><strong>Cálculo do EAT (Effective Access Time):</strong></p>
                      <div className="font-mono text-sm space-y-2 bg-background/50 p-4 rounded">
                        <div>Caso 1: TLB HIT (98% dos casos)</div>
                        <div className="ml-4">Tempo = TLB + memória = 1 + 100 = <strong className="text-green-500">101 ns</strong></div>
                        
                        <div className="mt-2">Caso 2: TLB MISS (2% dos casos)</div>
                        <div className="ml-4">Tempo = TLB + tabela + memória = 1 + 100 + 100 = <strong className="text-red-500">201 ns</strong></div>
                        
                        <div className="mt-2">EAT = 0.98 × 101 + 0.02 × 201</div>
                        <div className="ml-4">= 98.98 + 4.02 = <strong className="text-os-primary">103 ns</strong></div>
                        
                        <div className="mt-2 text-muted-foreground">
                          (Apenas 3% mais lento que acesso direto graças à TLB!)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
