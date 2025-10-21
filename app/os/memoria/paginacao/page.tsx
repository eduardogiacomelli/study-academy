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
  RotateCcw,
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl gradient-os">
            <MemoryStick className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Paginação</h1>
            <p className="text-muted-foreground">
              Gerenciamento de Memória através de Páginas e Quadros
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-os-primary/10 text-os-primary border-os-primary/20">
            Tanenbaum Cap. 3.3
          </Badge>
          <Badge className="bg-os-primary/10 text-os-primary border-os-primary/20">
            Silberschatz Cap. 9.3
          </Badge>
        </div>
      </motion.div>

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

        {/* Teoria */}
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

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card className="p-6 bg-gradient-to-br from-os-primary/5 to-transparent border-os-primary/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Cpu className="size-5 text-os-primary" />
                    Memória Lógica
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-os-primary mt-2" />
                      <span>Dividida em blocos de tamanho fixo chamados <strong>páginas</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-os-primary mt-2" />
                      <span>Tamanho típico: 4KB, 8KB ou 16KB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-os-primary mt-2" />
                      <span>Vista pelo processo/programa</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <MemoryStick className="size-5 text-cyan-500" />
                    Memória Física
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-cyan-500 mt-2" />
                      <span>Dividida em blocos de tamanho fixo chamados <strong>quadros (frames)</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-cyan-500 mt-2" />
                      <span>Mesmo tamanho das páginas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="size-2 rounded-full bg-cyan-500 mt-2" />
                      <span>RAM real do computador</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Como Funciona?</h3>
              
              <p className="leading-relaxed">
                Quando um programa precisa acessar a memória, ele usa um <strong>endereço lógico</strong>
                que é dividido em duas partes:
              </p>

              <div className="bg-muted/30 p-6 rounded-lg my-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="px-6 py-3 bg-os-primary/20 border-2 border-os-primary rounded font-mono text-lg font-bold">
                      Endereço Lógico
                    </div>
                  </div>
                  <div className="text-2xl">=</div>
                  <div className="text-center">
                    <div className="px-6 py-3 bg-os-primary border-2 border-os-primary rounded font-mono text-lg font-bold text-white">
                      Número da Página
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">índice na tabela de páginas</p>
                  </div>
                  <div className="text-2xl">+</div>
                  <div className="text-center">
                    <div className="px-6 py-3 bg-cyan-500 border-2 border-cyan-500 rounded font-mono text-lg font-bold text-white">
                      Deslocamento
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">posição dentro da página</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Tabela de Páginas</h3>
              
              <p className="leading-relaxed">
                A <span className="text-os-primary font-semibold">Tabela de Páginas</span> (Page Table)
                é a estrutura de dados que mapeia páginas lógicas para quadros físicos. Cada processo
                tem sua própria tabela de páginas.
              </p>

              <Card className="p-6 bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/20 mt-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Info className="size-4 text-amber-500" />
                  Estrutura de uma Entrada na Tabela
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-os-primary">Frame Number:</strong> Número do quadro físico
                  </div>
                  <div>
                    <strong className="text-os-primary">Present Bit:</strong> Página está na memória?
                  </div>
                  <div>
                    <strong className="text-os-primary">Modified Bit:</strong> Página foi modificada?
                  </div>
                  <div>
                    <strong className="text-os-primary">Referenced Bit:</strong> Página foi acessada?
                  </div>
                  <div>
                    <strong className="text-os-primary">Protection Bits:</strong> Permissões (R/W/X)
                  </div>
                  <div>
                    <strong className="text-os-primary">Valid Bit:</strong> Entrada é válida?
                  </div>
                </div>
              </Card>

              <h3 className="text-2xl font-bold mt-8 mb-4">TLB - Translation Lookaside Buffer</h3>
              
              <p className="leading-relaxed">
                Para acelerar a tradução de endereços, os processadores modernos usam um cache especial
                chamado <span className="text-os-primary font-semibold">TLB</span>. Ele armazena as traduções
                mais recentemente usadas.
              </p>

              <div className="bg-gradient-to-r from-os-primary/10 to-cyan-500/10 p-6 rounded-lg mt-6">
                <h4 className="font-bold mb-3">Funcionamento do TLB:</h4>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">1</Badge>
                    <div>
                      <strong>TLB Hit:</strong> Se a tradução está no TLB, usa-se diretamente
                      <span className="text-green-500 ml-2">⚡ Muito rápido (~1 ciclo)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">2</Badge>
                    <div>
                      <strong>TLB Miss:</strong> Busca na tabela de páginas na memória
                      <span className="text-amber-500 ml-2">⏱️ Mais lento (~100 ciclos)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">3</Badge>
                    <div>
                      <strong>Atualização:</strong> Adiciona a tradução no TLB para próximos acessos
                    </div>
                  </li>
                </ol>
              </div>

              <Alert className="bg-green-500/5 border-green-500/20 mt-6">
                <Lightbulb className="size-4 text-green-500" />
                <AlertDescription>
                  <strong>Taxa de Acerto do TLB:</strong> Em sistemas modernos, o TLB tem uma taxa de
                  acerto (hit rate) de 95-99%, tornando a tradução de endereços extremamente eficiente.
                </AlertDescription>
              </Alert>

              <h3 className="text-2xl font-bold mt-8 mb-4">Vantagens da Paginação</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: "Sem Fragmentação Externa",
                    description: "Qualquer quadro pode ser alocado para qualquer página"
                  },
                  {
                    title: "Compartilhamento Simples",
                    description: "Múltiplos processos podem compartilhar páginas (ex: bibliotecas)"
                  },
                  {
                    title: "Proteção",
                    description: "Cada página pode ter permissões independentes (R/W/X)"
                  },
                  {
                    title: "Memória Virtual",
                    description: "Base para implementação de memória virtual e swap"
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-4 bg-os-primary/5 border-os-primary/20">
                    <h4 className="font-bold mb-2 text-os-primary">✓ {item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Desvantagens e Desafios</h3>
              
              <div className="space-y-3 mt-4">
                {[
                  {
                    title: "Fragmentação Interna",
                    description: "Última página de um processo pode não usar todo o quadro"
                  },
                  {
                    title: "Overhead da Tabela",
                    description: "Tabela de páginas pode ocupar muita memória para processos grandes"
                  },
                  {
                    title: "Tempo de Tradução",
                    description: "Cada acesso à memória requer tradução de endereço (mitigado pelo TLB)"
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-4 bg-amber-500/5 border-amber-500/20">
                    <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">⚠️ {item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {/* Exemplo de Cálculo */}
          <Card className="p-8 bg-gradient-to-br from-os-primary/5 to-transparent">
            <h3 className="text-2xl font-bold mb-6">Exemplo Prático de Tradução</h3>
            
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Configuração do Sistema:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-background rounded border">
                    <div className="text-muted-foreground mb-1">Tamanho da Página</div>
                    <div className="text-2xl font-bold text-os-primary">4 KB</div>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <div className="text-muted-foreground mb-1">Endereço Lógico</div>
                    <div className="text-2xl font-bold text-os-primary">8196</div>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <div className="text-muted-foreground mb-1">Quadro na Tabela</div>
                    <div className="text-2xl font-bold text-os-primary">3</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Passo a Passo:</h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">1</Badge>
                    <div>
                      <div className="font-semibold mb-1">Calcular número da página:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        página = 8196 / 4096 = 2
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">2</Badge>
                    <div>
                      <div className="font-semibold mb-1">Calcular deslocamento:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        offset = 8196 % 4096 = 4
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">3</Badge>
                    <div>
                      <div className="font-semibold mb-1">Buscar quadro na tabela:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        Página 2 → Quadro 3
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">4</Badge>
                    <div>
                      <div className="font-semibold mb-1">Calcular endereço físico:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        físico = (3 × 4096) + 4 = 12292
                      </code>
                    </div>
                  </li>
                </ol>
              </div>

              <Alert className="bg-green-500/5 border-green-500/20">
                <Lightbulb className="size-4 text-green-500" />
                <AlertDescription>
                  <strong>Resultado:</strong> O endereço lógico 8196 é mapeado para o endereço físico 12292
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </TabsContent>

        {/* Simulador 2D */}
        <TabsContent value="simulador" className="space-y-6">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Simulador de Paginação 2D</h2>
                <p className="text-muted-foreground">
                  Visualize o processo de tradução de endereços em tempo real
                </p>
              </div>
            </div>
            
            <PagingSimulator />
          </Card>
        </TabsContent>

        {/* Visualização 3D */}
        <TabsContent value="3d" className="space-y-6">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Visualização 3D</h2>
                <p className="text-muted-foreground">
                  Explore a memória física e lógica em uma perspectiva tridimensional
                </p>
              </div>
            </div>
            
            <PagingVisualizer3D />
          </Card>

          <TLBVisualizer3D />
        </TabsContent>

        {/* Exemplos de Código */}
        <TabsContent value="exemplos" className="space-y-6">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Exemplos de Implementação</h2>
            
            <div className="space-y-6">
              {/* Exemplo 1 */}
              <div>
                <h3 className="text-xl font-bold mb-3">1. Estrutura da Tabela de Páginas</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Estrutura de uma entrada na tabela de páginas
struct PageTableEntry {
    unsigned int frame_number : 20;  // Número do quadro físico
    unsigned int present : 1;        // Página está na memória?
    unsigned int modified : 1;       // Página foi modificada (dirty bit)?
    unsigned int referenced : 1;     // Página foi acessada recentemente?
    unsigned int protection : 3;     // Bits de proteção (R/W/X)
    unsigned int valid : 1;          // Entrada é válida?
};

// Tabela de páginas completa
struct PageTable {
    PageTableEntry *entries;         // Array de entradas
    unsigned int size;                // Número de páginas
};`}</code>
                  </pre>
                </div>
              </div>

              {/* Exemplo 2 */}
              <div>
                <h3 className="text-xl font-bold mb-3">2. Tradução de Endereço Lógico para Físico</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`unsigned int translate_address(
    unsigned int logical_address, 
    PageTable *page_table,
    unsigned int page_size
) {
    // Extrair número da página e offset
    unsigned int page_number = logical_address / page_size;
    unsigned int offset = logical_address % page_size;
    
    // Verificar se a página é válida
    if (page_number >= page_table->size) {
        printf("Erro: Página inválida!\\n");
        return -1;
    }
    
    PageTableEntry *entry = &page_table->entries[page_number];
    
    // Verificar se a página está presente na memória
    if (!entry->present) {
        printf("Page Fault! Página %u não está na memória.\\n", page_number);
        // Aqui seria feito o page fault handling
        return -1;
    }
    
    // Calcular endereço físico
    unsigned int physical_address = (entry->frame_number * page_size) + offset;
    
    // Atualizar bit de referência
    entry->referenced = 1;
    
    return physical_address;
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Exemplo 3 */}
              <div>
                <h3 className="text-xl font-bold mb-3">3. Simulação de TLB</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`#define TLB_SIZE 16

struct TLBEntry {
    unsigned int page_number;
    unsigned int frame_number;
    bool valid;
};

struct TLB {
    TLBEntry entries[TLB_SIZE];
    int next_replace;  // Índice para substituição (FIFO)
};

// Buscar tradução no TLB
int tlb_lookup(TLB *tlb, unsigned int page_number) {
    for (int i = 0; i < TLB_SIZE; i++) {
        if (tlb->entries[i].valid && 
            tlb->entries[i].page_number == page_number) {
            printf("TLB HIT para página %u\\n", page_number);
            return tlb->entries[i].frame_number;
        }
    }
    printf("TLB MISS para página %u\\n", page_number);
    return -1;  // TLB miss
}

// Adicionar entrada no TLB
void tlb_add(TLB *tlb, unsigned int page_number, unsigned int frame_number) {
    // Substituição FIFO
    int index = tlb->next_replace;
    tlb->entries[index].page_number = page_number;
    tlb->entries[index].frame_number = frame_number;
    tlb->entries[index].valid = true;
    
    tlb->next_replace = (tlb->next_replace + 1) % TLB_SIZE;
    printf("TLB atualizado: página %u → quadro %u\\n", 
           page_number, frame_number);
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Exemplo 4 */}
              <div>
                <h3 className="text-xl font-bold mb-3">4. Tradução com TLB (Completo)</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`unsigned int translate_with_tlb(
    unsigned int logical_address,
    PageTable *page_table,
    TLB *tlb,
    unsigned int page_size
) {
    unsigned int page_number = logical_address / page_size;
    unsigned int offset = logical_address % page_size;
    
    // 1. Tentar buscar no TLB primeiro
    int frame_number = tlb_lookup(tlb, page_number);
    
    // 2. Se TLB miss, buscar na tabela de páginas
    if (frame_number == -1) {
        PageTableEntry *entry = &page_table->entries[page_number];
        
        if (!entry->present) {
            // Page fault - seria tratado aqui
            return -1;
        }
        
        frame_number = entry->frame_number;
        
        // 3. Adicionar no TLB para próximos acessos
        tlb_add(tlb, page_number, frame_number);
    }
    
    // 4. Calcular e retornar endereço físico
    return (frame_number * page_size) + offset;
}

// Exemplo de uso
int main() {
    PageTable pt = create_page_table(1024);  // 1024 páginas
    TLB tlb = create_tlb();
    unsigned int page_size = 4096;  // 4 KB
    
    // Testar tradução
    unsigned int logical = 8196;
    unsigned int physical = translate_with_tlb(logical, &pt, &tlb, page_size);
    
    printf("Lógico: %u → Físico: %u\\n", logical, physical);
    
    return 0;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Exercícios Rápidos */}
          <Card className="p-8 bg-gradient-to-br from-os-primary/5 to-transparent">
            <h3 className="text-2xl font-bold mb-6">Exercícios de Fixação</h3>
            
            <div className="space-y-4">
              {[
                {
                  question: "Dado tamanho de página de 2KB e endereço lógico 5120, qual o número da página e o offset?",
                  answer: "Página 2, Offset 1024"
                },
                {
                  question: "Se uma tabela de páginas tem 1024 entradas e cada entrada ocupa 4 bytes, qual o tamanho total da tabela?",
                  answer: "4096 bytes (4 KB)"
                },
                {
                  question: "Por que o TLB é importante para o desempenho do sistema?",
                  answer: "Reduz drasticamente o tempo de tradução de endereços, evitando acessos à memória principal"
                },
              ].map((item, i) => (
                <Card key={i} className="p-4 bg-muted/30">
                  <h4 className="font-bold mb-2">Exercício {i + 1}:</h4>
                  <p className="mb-3 text-sm">{item.question}</p>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-os-primary font-semibold">Ver Resposta</summary>
                    <p className="mt-2 p-3 bg-os-primary/10 rounded">{item.answer}</p>
                  </details>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" disabled>
          ← Anterior
        </Button>
        <Button className="gradient-os text-white" asChild>
          <Link href="/os/memoria/segmentacao">
            Próximo: Segmentação →
          </Link>
        </Button>
      </div>
    </div>
  );
}

