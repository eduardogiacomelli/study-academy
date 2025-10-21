"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Layers, 
  Info,
  Play,
  Code2,
  Lightbulb,
  Shield,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { SegmentationSimulator } from "@/components/os/SegmentationSimulator";

export default function SegmentacaoPage() {
  const [activeTab, setActiveTab] = useState("teoria");

  return (
    <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl gradient-os">
            <Layers className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Segmentação</h1>
            <p className="text-muted-foreground">
              Organização Lógica da Memória em Segmentos
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-os-primary/10 text-os-primary border-os-primary/20">
            Tanenbaum Cap. 3.2
          </Badge>
          <Badge className="bg-os-primary/10 text-os-primary border-os-primary/20">
            Silberschatz Cap. 8.2
          </Badge>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="teoria" className="flex items-center gap-2">
            <BookOpen className="size-4" />
            Teoria
          </TabsTrigger>
          <TabsTrigger value="simulador" className="flex items-center gap-2">
            <Play className="size-4" />
            Simulador
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
              O que é Segmentação?
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-lg leading-relaxed">
                A <span className="text-os-primary font-semibold">segmentação</span> é um esquema de
                gerenciamento de memória que suporta a visão do usuário/programador da memória. Um programa
                é uma coleção de segmentos, onde cada segmento é uma unidade lógica como:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                {[
                  {
                    title: "Código (Text)",
                    description: "Instruções do programa",
                    icon: Code2,
                    color: "bg-blue-500"
                  },
                  {
                    title: "Dados (Data)",
                    description: "Variáveis globais e estáticas",
                    icon: Shield,
                    color: "bg-green-500"
                  },
                  {
                    title: "Pilha (Stack)",
                    description: "Variáveis locais e chamadas de função",
                    icon: Layers,
                    color: "bg-purple-500"
                  },
                  {
                    title: "Heap",
                    description: "Memória alocada dinamicamente",
                    icon: AlertTriangle,
                    color: "bg-amber-500"
                  },
                ].map((seg, i) => (
                  <Card key={i} className="p-6 bg-gradient-to-br from-os-primary/5 to-transparent border-os-primary/20">
                    <div className={`size-10 rounded-lg ${seg.color} flex items-center justify-center mb-3`}>
                      <seg.icon className="size-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{seg.title}</h3>
                    <p className="text-sm text-muted-foreground">{seg.description}</p>
                  </Card>
                ))}
              </div>

              <Alert className="bg-os-primary/5 border-os-primary/20">
                <Info className="size-4" />
                <AlertDescription>
                  <strong>Diferença Chave:</strong> Na paginação, a memória é dividida em blocos de tamanho
                  fixo sem significado lógico. Na segmentação, cada segmento tem um significado lógico específico
                  e pode ter tamanho variável.
                </AlertDescription>
              </Alert>

              <h3 className="text-2xl font-bold mt-8 mb-4">Como Funciona?</h3>
              
              <p className="leading-relaxed">
                Cada segmento é identificado por um <strong>número de segmento</strong> e tem
                um <strong>comprimento</strong> (limit). O endereço lógico é composto de duas partes:
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
                      Número do Segmento (s)
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">índice na tabela de segmentos</p>
                  </div>
                  <div className="text-2xl">+</div>
                  <div className="text-center">
                    <div className="px-6 py-3 bg-cyan-500 border-2 border-cyan-500 rounded font-mono text-lg font-bold text-white">
                      Deslocamento (d)
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">posição dentro do segmento</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Tabela de Segmentos</h3>
              
              <p className="leading-relaxed">
                A <span className="text-os-primary font-semibold">Tabela de Segmentos</span> mapeia segmentos
                lógicos bidimensionais para endereços físicos unidimensionais. Cada entrada contém:
              </p>

              <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/20 mt-6">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-os-primary">Base:</strong> Endereço físico inicial do segmento
                  </div>
                  <div>
                    <strong className="text-os-primary">Limit:</strong> Tamanho do segmento
                  </div>
                  <div>
                    <strong className="text-os-primary">Present Bit:</strong> Segmento está na memória?
                  </div>
                  <div>
                    <strong className="text-os-primary">Protection Bits:</strong> Permissões (R/W/X)
                  </div>
                </div>
              </Card>

              <h3 className="text-2xl font-bold mt-8 mb-4">Processo de Tradução</h3>
              
              <div className="bg-gradient-to-r from-os-primary/10 to-cyan-500/10 p-6 rounded-lg mt-6">
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">1</Badge>
                    <div>
                      <strong>Extrair s e d:</strong> Do endereço lógico (s, d)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">2</Badge>
                    <div>
                      <strong>Verificar limite:</strong> Se d ≥ limit → Segmentation Fault
                      <Alert className="mt-2 bg-red-500/5 border-red-500/20">
                        <AlertTriangle className="size-3 text-red-500" />
                        <AlertDescription className="text-xs">
                          Proteção contra acesso inválido!
                        </AlertDescription>
                      </Alert>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge className="min-w-fit">3</Badge>
                    <div>
                      <strong>Calcular endereço físico:</strong> físico = base + d
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Vantagens da Segmentação</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: "Estrutura Lógica",
                    description: "Reflete a organização natural do programa"
                  },
                  {
                    title: "Proteção",
                    description: "Cada segmento pode ter permissões diferentes"
                  },
                  {
                    title: "Compartilhamento",
                    description: "Segmentos podem ser compartilhados entre processos"
                  },
                  {
                    title: "Crescimento Dinâmico",
                    description: "Segmentos podem crescer ou diminuir"
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
                    title: "Fragmentação Externa",
                    description: "Espaços livres pequenos entre segmentos podem não ser utilizáveis"
                  },
                  {
                    title: "Alocação Complexa",
                    description: "Precisa encontrar buraco grande o suficiente para o segmento"
                  },
                  {
                    title: "Compactação",
                    description: "Pode ser necessária para eliminar fragmentação (custosa)"
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-4 bg-amber-500/5 border-amber-500/20">
                    <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">⚠️ {item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Segmentação vs Paginação</h3>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border p-3 text-left">Característica</th>
                      <th className="border p-3 text-left">Segmentação</th>
                      <th className="border p-3 text-left">Paginação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Tamanho dos blocos",
                        seg: "Variável (cada segmento tem tamanho diferente)",
                        pag: "Fixo (todas as páginas têm mesmo tamanho)"
                      },
                      {
                        feature: "Visibilidade ao programador",
                        seg: "Visível (o programador trabalha com segmentos)",
                        pag: "Transparente (o programador não vê as páginas)"
                      },
                      {
                        feature: "Organização lógica",
                        seg: "Sim (código, dados, pilha são separados)",
                        pag: "Não (divisão arbitrária da memória)"
                      },
                      {
                        feature: "Fragmentação",
                        seg: "Externa (espaços entre segmentos)",
                        pag: "Interna (espaço não utilizado na última página)"
                      },
                      {
                        feature: "Proteção",
                        seg: "Natural (cada segmento tem permissões)",
                        pag: "Artificial (páginas não têm significado lógico)"
                      },
                      {
                        feature: "Compartilhamento",
                        seg: "Fácil (compartilhar código, bibliotecas)",
                        pag: "Mais difícil"
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="border p-3 font-semibold">{row.feature}</td>
                        <td className="border p-3">{row.seg}</td>
                        <td className="border p-3">{row.pag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Alert className="bg-green-500/5 border-green-500/20 mt-6">
                <Lightbulb className="size-4 text-green-500" />
                <AlertDescription>
                  <strong>Sistemas Modernos:</strong> Muitos SOs usam uma combinação de segmentação
                  e paginação (segmentação paginada) para obter as vantagens de ambas as técnicas.
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          {/* Exemplo Prático */}
          <Card className="p-8 bg-gradient-to-br from-os-primary/5 to-transparent">
            <h3 className="text-2xl font-bold mb-6">Exemplo Prático de Tradução</h3>
            
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Tabela de Segmentos:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Segmento</th>
                        <th className="text-left p-2">Base (Endereço Físico)</th>
                        <th className="text-left p-2">Limit (Tamanho)</th>
                        <th className="text-left p-2">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-mono">0</td>
                        <td className="p-2 font-mono">1400</td>
                        <td className="p-2 font-mono">1000</td>
                        <td className="p-2">Código</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">1</td>
                        <td className="p-2 font-mono">6300</td>
                        <td className="p-2 font-mono">400</td>
                        <td className="p-2">Dados</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">2</td>
                        <td className="p-2 font-mono">4300</td>
                        <td className="p-2 font-mono">400</td>
                        <td className="p-2">Pilha</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">3</td>
                        <td className="p-2 font-mono">3200</td>
                        <td className="p-2 font-mono">1100</td>
                        <td className="p-2">Heap</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Traduzir: (1, 53)</h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">1</Badge>
                    <div>
                      <div className="font-semibold mb-1">Segmento 1 (Dados):</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        Base = 6300, Limit = 400
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">2</Badge>
                    <div>
                      <div className="font-semibold mb-1">Verificar limite:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        53 &lt; 400 ✓ (válido)
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Badge className="min-w-fit h-fit">3</Badge>
                    <div>
                      <div className="font-semibold mb-1">Calcular endereço físico:</div>
                      <code className="text-sm bg-background px-3 py-1 rounded">
                        físico = 6300 + 53 = 6353
                      </code>
                    </div>
                  </li>
                </ol>
              </div>

              <Alert className="bg-green-500/5 border-green-500/20">
                <Lightbulb className="size-4 text-green-500" />
                <AlertDescription>
                  <strong>Resultado:</strong> O endereço lógico (1, 53) é mapeado para o endereço físico 6353
                </AlertDescription>
              </Alert>

              <div className="bg-red-500/5 p-6 rounded-lg border border-red-500/20 mt-6">
                <h4 className="font-bold mb-4 text-red-600 dark:text-red-400">Exemplo de Erro:</h4>
                <p className="mb-2">Traduzir: (1, 500)</p>
                <ol className="space-y-2 text-sm">
                  <li>Segmento 1 tem limit = 400</li>
                  <li>500 &gt; 400 ⚠️</li>
                  <li className="font-bold text-red-600 dark:text-red-400">
                    → SEGMENTATION FAULT! Acesso inválido
                  </li>
                </ol>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Simulador */}
        <TabsContent value="simulador" className="space-y-6">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Simulador de Segmentação</h2>
                <p className="text-muted-foreground">
                  Visualize o processo de tradução de endereços com segmentos
                </p>
              </div>
            </div>
            
            <SegmentationSimulator />
          </Card>
        </TabsContent>

        {/* Exemplos de Código */}
        <TabsContent value="exemplos" className="space-y-6">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Exemplos de Implementação</h2>
            
            <div className="space-y-6">
              {/* Exemplo 1 */}
              <div>
                <h3 className="text-xl font-bold mb-3">1. Estrutura da Tabela de Segmentos</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Estrutura de uma entrada na tabela de segmentos
struct SegmentTableEntry {
    unsigned int base;           // Endereço físico inicial
    unsigned int limit;          // Tamanho do segmento
    unsigned int present : 1;    // Está na memória?
    unsigned int protection : 3; // Bits de proteção (R/W/X)
    unsigned int valid : 1;      // Entrada válida?
};

// Tipos de segmentos
enum SegmentType {
    SEGMENT_CODE,    // Código (read + execute)
    SEGMENT_DATA,    // Dados (read + write)
    SEGMENT_STACK,   // Pilha (read + write)
    SEGMENT_HEAP     // Heap (read + write)
};

// Tabela de segmentos
struct SegmentTable {
    SegmentTableEntry *entries;
    unsigned int num_segments;
};`}</code>
                  </pre>
                </div>
              </div>

              {/* Exemplo 2 */}
              <div>
                <h3 className="text-xl font-bold mb-3">2. Tradução de Endereço Segmentado</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`unsigned int translate_segmented_address(
    unsigned int segment_number,
    unsigned int offset,
    SegmentTable *seg_table
) {
    // Verificar se o segmento é válido
    if (segment_number >= seg_table->num_segments) {
        printf("Erro: Número de segmento inválido!\\n");
        return -1;
    }
    
    SegmentTableEntry *entry = &seg_table->entries[segment_number];
    
    // Verificar se o segmento está presente
    if (!entry->present) {
        printf("Segmentation Fault! Segmento não está na memória.\\n");
        return -1;
    }
    
    // Verificar se o offset está dentro do limite
    if (offset >= entry->limit) {
        printf("Segmentation Fault! Offset %u excede o limite %u.\\n",
               offset, entry->limit);
        return -1;
    }
    
    // Calcular endereço físico
    unsigned int physical_address = entry->base + offset;
    
    return physical_address;
}

// Exemplo de uso
int main() {
    // Criar tabela de segmentos
    SegmentTable seg_table;
    seg_table.num_segments = 4;
    seg_table.entries = malloc(4 * sizeof(SegmentTableEntry));
    
    // Configurar segmentos
    seg_table.entries[0] = (SegmentTableEntry){
        .base = 1400, .limit = 1000, .present = 1, 
        .protection = 0b101, .valid = 1  // R-X
    };
    seg_table.entries[1] = (SegmentTableEntry){
        .base = 6300, .limit = 400, .present = 1,
        .protection = 0b110, .valid = 1  // RW-
    };
    
    // Traduzir endereço (1, 53)
    unsigned int physical = translate_segmented_address(1, 53, &seg_table);
    printf("Físico: %u\\n", physical);  // Output: 6353
    
    // Tentar acesso inválido (1, 500)
    physical = translate_segmented_address(1, 500, &seg_table);
    // Output: Segmentation Fault!
    
    return 0;
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Exemplo 3 */}
              <div>
                <h3 className="text-xl font-bold mb-3">3. Proteção de Segmentos</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`// Bits de proteção
#define PROT_READ    0b100  // 4
#define PROT_WRITE   0b010  // 2
#define PROT_EXECUTE 0b001  // 1

// Verificar permissão
bool check_permission(
    SegmentTableEntry *entry,
    unsigned int required_permission
) {
    return (entry->protection & required_permission) != 0;
}

// Acessar segmento com verificação de proteção
int access_segment(
    unsigned int segment_number,
    unsigned int offset,
    SegmentTable *seg_table,
    unsigned int access_type  // READ, WRITE ou EXECUTE
) {
    // Traduzir endereço
    unsigned int physical = translate_segmented_address(
        segment_number, offset, seg_table
    );
    
    if (physical == -1) {
        return -1;  // Erro na tradução
    }
    
    SegmentTableEntry *entry = &seg_table->entries[segment_number];
    
    // Verificar permissão
    if (!check_permission(entry, access_type)) {
        printf("Protection Fault! Acesso negado ao segmento %u.\\n",
               segment_number);
        printf("Permissões: R%sW%sX%s, Tentativa: %s\\n",
               (entry->protection & PROT_READ) ? "+" : "-",
               (entry->protection & PROT_WRITE) ? "+" : "-",
               (entry->protection & PROT_EXECUTE) ? "+" : "-",
               access_type == PROT_READ ? "READ" :
               access_type == PROT_WRITE ? "WRITE" : "EXECUTE");
        return -1;
    }
    
    // Acesso permitido
    return physical;
}

// Exemplo: Tentar escrever no segmento de código
int main() {
    SegmentTable seg_table = /* ... */;
    
    // Segmento 0 = Código (R-X, sem write)
    // Tentar escrever
    int result = access_segment(0, 100, &seg_table, PROT_WRITE);
    // Output: Protection Fault! Acesso negado...
    
    // Tentar executar (OK)
    result = access_segment(0, 100, &seg_table, PROT_EXECUTE);
    // Output: Sucesso
    
    return 0;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/os/memoria/paginacao">
            ← Anterior: Paginação
          </Link>
        </Button>
        <Button className="gradient-os text-white" asChild>
          <Link href="/os/memoria/virtual">
            Próximo: Memória Virtual →
          </Link>
        </Button>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
}

