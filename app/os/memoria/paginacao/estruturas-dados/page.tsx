"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { 
  Database, 
  Table2, 
  FileCode,
  Box,
  Layers,
  Binary,
  Hash,
  ListTree,
  ArrowRight,
  Lightbulb
} from "lucide-react";

export default function EstruturasDadosPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
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
              <Database className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Estruturas de Dados em Paginação
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Implementações completas em TypeScript e C
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <FileCode className="size-3 mr-1" /> TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Binary className="size-3 mr-1" /> C
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Box className="size-3 mr-1" /> Estruturas
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Hash className="size-3 mr-1" /> Algoritmos
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Tabela de Páginas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Table2 className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Tabela de Páginas (Page Table)</h2>
                  <p className="text-muted-foreground">Array simples mapeando página → quadro</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    A estrutura mais fundamental em paginação. Cada processo tem sua própria tabela
                    de páginas que mapeia páginas lógicas (virtuais) para quadros físicos.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
                    <Lightbulb className="size-5 text-yellow-500" />
                    Características
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✅ <strong>Acesso O(1)</strong> - indexação direta por número da página</li>
                    <li>✅ <strong>Simples</strong> - array estático ou alocado dinamicamente</li>
                    <li>⚠️ <strong>Overhead</strong> - cresce linearmente com espaço de endereçamento</li>
                    <li>⚠️ <strong>Desperdício</strong> - aloca entradas mesmo para páginas não usadas</li>
                  </ul>
                </div>

                <Tabs defaultValue="typescript" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="c">C</TabsTrigger>
                  </TabsList>

                  <TabsContent value="typescript" className="space-y-4">
                    <CodeBlock
                      language="typescript"
                      children={`// Estrutura básica da Tabela de Páginas
interface PageTableEntry {
  frameNumber: number;     // Número do quadro físico
  present: boolean;        // Página está na memória?
  dirty: boolean;          // Página foi modificada?
  referenced: boolean;     // Página foi acessada?
  permissions: number;     // RWX (Read/Write/Execute)
}

class PageTable {
  private entries: PageTableEntry[];
  
  constructor(pagesCount: number) {
    this.entries = Array(pagesCount).fill(null).map(() => ({
      frameNumber: -1,
      present: false,
      dirty: false,
      referenced: false,
      permissions: 0b111, // RWX
    }));
  }
  
  // Traduzir endereço virtual → físico
  translate(virtualAddress: number, pageSize: number): number | null {
    const pageIndex = Math.floor(virtualAddress / pageSize);
    const offset = virtualAddress % pageSize;
    
    if (pageIndex >= this.entries.length) {
      throw new Error("Segmentation fault: página fora dos limites");
    }
    
    const entry = this.entries[pageIndex];
    
    if (!entry.present) {
      throw new Error("Page fault: página não está na memória");
    }
    
    // Marcar como referenciada (para LRU)
    entry.referenced = true;
    
    // Endereço físico = frame * pageSize + offset
    return entry.frameNumber * pageSize + offset;
  }
  
  // Mapear página → quadro
  map(pageIndex: number, frameNumber: number): void {
    if (pageIndex >= this.entries.length) {
      throw new Error("Índice de página inválido");
    }
    
    this.entries[pageIndex] = {
      frameNumber,
      present: true,
      dirty: false,
      referenced: false,
      permissions: 0b111,
    };
  }
  
  // Desalocar página
  unmap(pageIndex: number): void {
    if (pageIndex < this.entries.length) {
      this.entries[pageIndex].present = false;
      this.entries[pageIndex].frameNumber = -1;
    }
  }
  
  // Obter entrada
  getEntry(pageIndex: number): PageTableEntry | null {
    return pageIndex < this.entries.length ? this.entries[pageIndex] : null;
  }
}

// Exemplo de uso
const pageTable = new PageTable(16); // 16 páginas
pageTable.map(0, 5);  // Página 0 → Quadro 5
pageTable.map(1, 12); // Página 1 → Quadro 12

const physicalAddr = pageTable.translate(512, 256); // offset 0 na página 2
console.log(\`Endereço físico: \${physicalAddr}\`);`}
                    />
                  </TabsContent>

                  <TabsContent value="c" className="space-y-4">
                    <CodeBlock
                      language="c"
                      children={`// page_table.h
#ifndef PAGE_TABLE_H
#define PAGE_TABLE_H

#include <stdint.h>
#include <stdbool.h>

// Entrada da tabela de páginas
typedef struct {
    uint32_t frame_number;    // Número do quadro físico
    bool present;             // Página está na memória?
    bool dirty;               // Página foi modificada?
    bool referenced;          // Página foi acessada?
    uint8_t permissions;      // RWX (3 bits)
} page_table_entry_t;

// Tabela de páginas
typedef struct {
    page_table_entry_t *entries;
    size_t size;              // Número de entradas
} page_table_t;

// Funções públicas
page_table_t* page_table_create(size_t pages_count);
void page_table_destroy(page_table_t *pt);
int page_table_translate(page_table_t *pt, uint64_t virtual_addr, 
                         uint32_t page_size, uint64_t *physical_addr);
void page_table_map(page_table_t *pt, uint32_t page_index, uint32_t frame_number);
void page_table_unmap(page_table_t *pt, uint32_t page_index);
page_table_entry_t* page_table_get_entry(page_table_t *pt, uint32_t page_index);

#endif // PAGE_TABLE_H

// page_table.c
#include "page_table.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

page_table_t* page_table_create(size_t pages_count) {
    page_table_t *pt = malloc(sizeof(page_table_t));
    if (!pt) return NULL;
    
    pt->entries = calloc(pages_count, sizeof(page_table_entry_t));
    if (!pt->entries) {
        free(pt);
        return NULL;
    }
    
    pt->size = pages_count;
    
    // Inicializar entradas
    for (size_t i = 0; i < pages_count; i++) {
        pt->entries[i].frame_number = 0;
        pt->entries[i].present = false;
        pt->entries[i].dirty = false;
        pt->entries[i].referenced = false;
        pt->entries[i].permissions = 0b111; // RWX
    }
    
    return pt;
}

void page_table_destroy(page_table_t *pt) {
    if (pt) {
        free(pt->entries);
        free(pt);
    }
}

int page_table_translate(page_table_t *pt, uint64_t virtual_addr, 
                         uint32_t page_size, uint64_t *physical_addr) {
    uint32_t page_index = virtual_addr / page_size;
    uint32_t offset = virtual_addr % page_size;
    
    // Verificar limites
    if (page_index >= pt->size) {
        fprintf(stderr, "Segmentation fault: página %u fora dos limites\\n", page_index);
        return -1;
    }
    
    page_table_entry_t *entry = &pt->entries[page_index];
    
    // Verificar se página está presente
    if (!entry->present) {
        fprintf(stderr, "Page fault: página %u não está na memória\\n", page_index);
        return -2;
    }
    
    // Marcar como referenciada (para algoritmos LRU)
    entry->referenced = true;
    
    // Calcular endereço físico
    *physical_addr = (uint64_t)entry->frame_number * page_size + offset;
    
    return 0;
}

void page_table_map(page_table_t *pt, uint32_t page_index, uint32_t frame_number) {
    if (page_index >= pt->size) {
        fprintf(stderr, "Erro: índice de página inválido\\n");
        return;
    }
    
    pt->entries[page_index].frame_number = frame_number;
    pt->entries[page_index].present = true;
    pt->entries[page_index].dirty = false;
    pt->entries[page_index].referenced = false;
}

void page_table_unmap(page_table_t *pt, uint32_t page_index) {
    if (page_index < pt->size) {
        pt->entries[page_index].present = false;
        pt->entries[page_index].frame_number = 0;
    }
}

page_table_entry_t* page_table_get_entry(page_table_t *pt, uint32_t page_index) {
    return (page_index < pt->size) ? &pt->entries[page_index] : NULL;
}

// Exemplo de uso
int main() {
    page_table_t *pt = page_table_create(16);
    
    page_table_map(pt, 0, 5);
    page_table_map(pt, 1, 12);
    
    uint64_t physical;
    if (page_table_translate(pt, 512, 256, &physical) == 0) {
        printf("Endereço físico: %lu\\n", physical);
    }
    
    page_table_destroy(pt);
    return 0;
}`}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.section>

          {/* Bitmap de Frames Livres */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Box className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Bitmap de Quadros Livres</h2>
                  <p className="text-muted-foreground">Estrutura compacta para rastrear memória livre</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Usa bits individuais para representar o estado de cada quadro (livre ou ocupado).
                    Muito eficiente em termos de espaço - apenas 1 bit por quadro.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
                    <Lightbulb className="size-5 text-yellow-500" />
                    Características
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✅ <strong>Compacto</strong> - 1 bit por quadro (32 quadros = 4 bytes)</li>
                    <li>✅ <strong>Rápido</strong> - operações bitwise são muito eficientes</li>
                    <li>✅ <strong>Cache-friendly</strong> - dados contíguos na memória</li>
                    <li>⚠️ <strong>Busca linear</strong> - encontrar N quadros contíguos pode ser O(n)</li>
                  </ul>
                </div>

                <Tabs defaultValue="typescript" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="c">C</TabsTrigger>
                  </TabsList>

                  <TabsContent value="typescript" className="space-y-4">
                    <CodeBlock
                      language="typescript"
                      children={`class FrameBitmap {
  private bitmap: Uint32Array; // 32 bits por elemento
  private framesCount: number;
  
  constructor(framesCount: number) {
    this.framesCount = framesCount;
    // Calcular quantos uint32 são necessários
    const arraySize = Math.ceil(framesCount / 32);
    this.bitmap = new Uint32Array(arraySize);
    // Iniciar tudo livre (0 = livre, 1 = ocupado)
  }
  
  // Marcar quadro como ocupado
  allocate(frameIndex: number): void {
    if (frameIndex >= this.framesCount) {
      throw new Error(\`Frame \${frameIndex} fora dos limites\`);
    }
    
    const wordIndex = Math.floor(frameIndex / 32);
    const bitIndex = frameIndex % 32;
    
    this.bitmap[wordIndex] |= (1 << bitIndex);
  }
  
  // Liberar quadro
  free(frameIndex: number): void {
    if (frameIndex >= this.framesCount) return;
    
    const wordIndex = Math.floor(frameIndex / 32);
    const bitIndex = frameIndex % 32;
    
    this.bitmap[wordIndex] &= ~(1 << bitIndex);
  }
  
  // Verificar se quadro está livre
  isFree(frameIndex: number): boolean {
    if (frameIndex >= this.framesCount) return false;
    
    const wordIndex = Math.floor(frameIndex / 32);
    const bitIndex = frameIndex % 32;
    
    return (this.bitmap[wordIndex] & (1 << bitIndex)) === 0;
  }
  
  // Encontrar primeiro quadro livre (First Fit)
  findFree(): number {
    for (let i = 0; i < this.bitmap.length; i++) {
      // Se palavra não está cheia (!=0xFFFFFFFF), tem bit livre
      if (this.bitmap[i] !== 0xFFFFFFFF) {
        // Encontrar primeiro bit 0
        for (let bit = 0; bit < 32; bit++) {
          const frameIndex = i * 32 + bit;
          if (frameIndex >= this.framesCount) break;
          
          if (this.isFree(frameIndex)) {
            return frameIndex;
          }
        }
      }
    }
    return -1; // Sem quadros livres
  }
  
  // Encontrar N quadros livres contíguos
  findContiguous(count: number): number[] {
    const frames: number[] = [];
    
    for (let i = 0; i < this.framesCount; i++) {
      if (this.isFree(i)) {
        frames.push(i);
        if (frames.length === count) {
          return frames;
        }
      } else {
        frames.length = 0; // Resetar se encontrar ocupado
      }
    }
    
    return []; // Não encontrou suficientes contíguos
  }
  
  // Contar quadros livres
  countFree(): number {
    let count = 0;
    for (let i = 0; i < this.framesCount; i++) {
      if (this.isFree(i)) count++;
    }
    return count;
  }
}

// Uso
const bitmap = new FrameBitmap(128); // 128 quadros = 4 uint32
const frame = bitmap.findFree();
if (frame !== -1) {
  bitmap.allocate(frame);
  console.log(\`Alocado quadro \${frame}\`);
}

// Alocar 4 quadros contíguos
const frames = bitmap.findContiguous(4);
frames.forEach(f => bitmap.allocate(f));`}
                    />
                  </TabsContent>

                  <TabsContent value="c" className="space-y-4">
                    <CodeBlock
                      language="c"
                      children={`// frame_bitmap.h
#ifndef FRAME_BITMAP_H
#define FRAME_BITMAP_H

#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint32_t *bitmap;
    size_t frames_count;
    size_t bitmap_size;  // Tamanho em words (uint32)
} frame_bitmap_t;

frame_bitmap_t* frame_bitmap_create(size_t frames_count);
void frame_bitmap_destroy(frame_bitmap_t *fb);
void frame_bitmap_allocate(frame_bitmap_t *fb, uint32_t frame_index);
void frame_bitmap_free(frame_bitmap_t *fb, uint32_t frame_index);
bool frame_bitmap_is_free(frame_bitmap_t *fb, uint32_t frame_index);
int frame_bitmap_find_free(frame_bitmap_t *fb);
size_t frame_bitmap_count_free(frame_bitmap_t *fb);

#endif

// frame_bitmap.c
#include "frame_bitmap.h"
#include <stdlib.h>
#include <string.h>

frame_bitmap_t* frame_bitmap_create(size_t frames_count) {
    frame_bitmap_t *fb = malloc(sizeof(frame_bitmap_t));
    if (!fb) return NULL;
    
    fb->frames_count = frames_count;
    fb->bitmap_size = (frames_count + 31) / 32; // Arredondar para cima
    
    fb->bitmap = calloc(fb->bitmap_size, sizeof(uint32_t));
    if (!fb->bitmap) {
        free(fb);
        return NULL;
    }
    
    return fb;
}

void frame_bitmap_destroy(frame_bitmap_t *fb) {
    if (fb) {
        free(fb->bitmap);
        free(fb);
    }
}

void frame_bitmap_allocate(frame_bitmap_t *fb, uint32_t frame_index) {
    if (frame_index >= fb->frames_count) return;
    
    uint32_t word_index = frame_index / 32;
    uint32_t bit_index = frame_index % 32;
    
    fb->bitmap[word_index] |= (1U << bit_index);
}

void frame_bitmap_free(frame_bitmap_t *fb, uint32_t frame_index) {
    if (frame_index >= fb->frames_count) return;
    
    uint32_t word_index = frame_index / 32;
    uint32_t bit_index = frame_index % 32;
    
    fb->bitmap[word_index] &= ~(1U << bit_index);
}

bool frame_bitmap_is_free(frame_bitmap_t *fb, uint32_t frame_index) {
    if (frame_index >= fb->frames_count) return false;
    
    uint32_t word_index = frame_index / 32;
    uint32_t bit_index = frame_index % 32;
    
    return (fb->bitmap[word_index] & (1U << bit_index)) == 0;
}

int frame_bitmap_find_free(frame_bitmap_t *fb) {
    for (size_t i = 0; i < fb->bitmap_size; i++) {
        // Se palavra não está cheia, tem bit livre
        if (fb->bitmap[i] != 0xFFFFFFFF) {
            // Usar __builtin_ffs (GCC) ou loop
            #ifdef __GNUC__
            uint32_t free_mask = ~fb->bitmap[i];
            int bit = __builtin_ffs(free_mask) - 1; // ffs retorna 1-based
            uint32_t frame_index = i * 32 + bit;
            if (frame_index < fb->frames_count) {
                return frame_index;
            }
            #else
            for (int bit = 0; bit < 32; bit++) {
                uint32_t frame_index = i * 32 + bit;
                if (frame_index >= fb->frames_count) break;
                
                if (frame_bitmap_is_free(fb, frame_index)) {
                    return frame_index;
                }
            }
            #endif
        }
    }
    return -1;
}

size_t frame_bitmap_count_free(frame_bitmap_t *fb) {
    size_t count = 0;
    for (size_t i = 0; i < fb->frames_count; i++) {
        if (frame_bitmap_is_free(fb, i)) {
            count++;
        }
    }
    return count;
}

// Uso
int main() {
    frame_bitmap_t *fb = frame_bitmap_create(128);
    
    int frame = frame_bitmap_find_free(fb);
    if (frame != -1) {
        frame_bitmap_allocate(fb, frame);
        printf("Alocado quadro %d\\n", frame);
    }
    
    printf("Quadros livres: %zu\\n", frame_bitmap_count_free(fb));
    
    frame_bitmap_destroy(fb);
    return 0;
}`}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.section>

          {/* Comparação de Performance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <Layers className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Comparação de Performance</h2>
                  <p className="text-muted-foreground">Trade-offs entre estruturas</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Estrutura</th>
                      <th className="text-left p-4 font-semibold">Acesso</th>
                      <th className="text-left p-4 font-semibold">Busca</th>
                      <th className="text-left p-4 font-semibold">Espaço</th>
                      <th className="text-left p-4 font-semibold">Uso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-4 font-mono">PageTable</td>
                      <td className="p-4"><Badge variant="secondary">O(1)</Badge></td>
                      <td className="p-4"><Badge variant="secondary">N/A</Badge></td>
                      <td className="p-4"><Badge variant="outline">4-8 bytes/página</Badge></td>
                      <td className="p-4">Tradução de endereços</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-4 font-mono">Bitmap</td>
                      <td className="p-4"><Badge variant="secondary">O(1)</Badge></td>
                      <td className="p-4"><Badge variant="outline">O(n)</Badge></td>
                      <td className="p-4"><Badge variant="secondary">1 bit/quadro</Badge></td>
                      <td className="p-4">Gerenciamento de frames</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-4 font-mono">Lista Livre</td>
                      <td className="p-4"><Badge variant="outline">O(n)</Badge></td>
                      <td className="p-4"><Badge variant="secondary">O(1)</Badge></td>
                      <td className="p-4"><Badge variant="outline">Variável</Badge></td>
                      <td className="p-4">Alocação rápida</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono">Buddy System</td>
                      <td className="p-4"><Badge variant="secondary">O(log n)</Badge></td>
                      <td className="p-4"><Badge variant="secondary">O(log n)</Badge></td>
                      <td className="p-4"><Badge variant="secondary">Médio</Badge></td>
                      <td className="p-4">Blocos potência de 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <a href="/os/memoria/paginacao/simulador-interativo" className="text-primary hover:underline flex items-center gap-2">
              ← Simulador Interativo
            </a>
            <a href="/os/memoria/paginacao/linux-implementation" className="text-primary hover:underline flex items-center gap-2">
              Implementação Linux <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

