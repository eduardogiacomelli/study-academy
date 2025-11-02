"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  CheckCircle,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  difficulty: "básico" | "intermediário" | "avançado";
  question: string;
  hints: string[];
  solution: {
    answer: string;
    explanation: string;
  };
}

const exercises: Exercise[] = [
  // BÁSICOS (10)
  {
    id: 1,
    title: "Calcular Número de Páginas",
    difficulty: "básico",
    question: "Um processo precisa de 64 KB de memória. Se o tamanho da página é 4 KB, quantas páginas são necessárias?",
    hints: [
      "Divida o tamanho total do processo pelo tamanho da página",
      "64 KB ÷ 4 KB = ?",
    ],
    solution: {
      answer: "16 páginas",
      explanation: "64 KB ÷ 4 KB = 16 páginas. Como o tamanho é exato, não há desperdício."
    }
  },
  {
    id: 2,
    title: "Tradução de Endereço Virtual",
    difficulty: "básico",
    question: "Dado um endereço virtual 0x2A3F (hexadecimal) com páginas de 1 KB (1024 bytes), determine: (a) número da página, (b) offset.",
    hints: [
      "1 KB = 1024 = 2¹⁰, então offset tem 10 bits",
      "Converta 0x2A3F para binário",
      "Os 10 bits menos significativos são o offset",
    ],
    solution: {
      answer: "(a) Página 10, (b) Offset 575",
      explanation: `0x2A3F = 10879 decimal = 0010101000111111 binário
Offset (10 bits): 1000111111 = 575
Página: 10879 ÷ 1024 = 10`
    }
  },
  {
    id: 3,
    title: "Fragmentação Interna",
    difficulty: "básico",
    question: "Um processo de 13 KB usa páginas de 4 KB. Qual é a fragmentação interna total?",
    hints: [
      "Calcule quantas páginas são necessárias (arredondar para cima)",
      "Calcule o espaço desperdiçado na última página",
    ],
    solution: {
      answer: "3 KB",
      explanation: "13 KB ÷ 4 KB = 3.25 → 4 páginas necessárias. Espaço usado: 4 × 4 KB = 16 KB. Fragmentação: 16 - 13 = 3 KB."
    }
  },
  {
    id: 4,
    title: "Bits para Página e Offset",
    difficulty: "básico",
    question: "Sistema com endereços de 32 bits e páginas de 8 KB. Quantos bits para: (a) offset, (b) número da página?",
    hints: [
      "8 KB = 8192 = 2¹³",
      "Offset precisa endereçar cada byte da página",
      "Bits restantes são para o número da página",
    ],
    solution: {
      answer: "(a) 13 bits, (b) 19 bits",
      explanation: "8 KB = 2¹³, então offset = 13 bits. Número da página = 32 - 13 = 19 bits."
    }
  },
  {
    id: 5,
    title: "Tamanho da Tabela de Páginas",
    difficulty: "básico",
    question: "Sistema 32-bit, páginas 4 KB, cada entrada da tabela ocupa 4 bytes. Qual o tamanho máximo da tabela de páginas por processo?",
    hints: [
      "Calcule quantas páginas possíveis: 2³² ÷ 2¹² = ?",
      "Multiplique pelo tamanho de cada entrada",
    ],
    solution: {
      answer: "4 MB",
      explanation: "Páginas possíveis: 2³² ÷ 2¹² = 2²⁰ = 1.048.576. Tamanho: 2²⁰ × 4 bytes = 4 MB."
    }
  },
  {
    id: 6,
    title: "Endereço Físico",
    difficulty: "básico",
    question: "Endereço virtual 8196, página de 4 KB mapeada para frame 5. Qual o endereço físico?",
    hints: [
      "8196 = 2 × 4096 + 4",
      "Página 2 → Frame 5",
      "Endereço físico = frame × tamanho_página + offset",
    ],
    solution: {
      answer: "20484",
      explanation: "Página: 8196 ÷ 4096 = 2, Offset: 8196 % 4096 = 4. Físico: 5 × 4096 + 4 = 20484."
    }
  },
  {
    id: 7,
    title: "Espaço de Endereçamento",
    difficulty: "básico",
    question: "Quantas páginas de 2 KB cabem em um espaço de endereçamento de 16 bits?",
    hints: [
      "2¹⁶ = 65536 bytes total",
      "Divida pelo tamanho da página",
    ],
    solution: {
      answer: "32 páginas",
      explanation: "2¹⁶ = 65536 bytes. 65536 ÷ 2048 = 32 páginas."
    }
  },
  {
    id: 8,
    title: "Page Fault Simples",
    difficulty: "básico",
    question: "Se uma página não tem o bit 'present' marcado, o que acontece ao tentar acessá-la?",
    hints: [
      "Bit 'present' indica se a página está na RAM",
      "Ausência causa exceção",
    ],
    solution: {
      answer: "Page Fault",
      explanation: "Ocorre um Page Fault. O SO carrega a página do disco para a RAM e atualiza a tabela."
    }
  },
  {
    id: 9,
    title: "Overhead da Tabela",
    difficulty: "básico",
    question: "Processo de 1 MB, páginas 1 KB, entrada 4 bytes. Qual % de overhead da tabela de páginas?",
    hints: [
      "Páginas: 1 MB ÷ 1 KB = 1024",
      "Tamanho da tabela: 1024 × 4 bytes",
      "Overhead %: (tabela ÷ processo) × 100",
    ],
    solution: {
      answer: "0.39%",
      explanation: "Tabela: 1024 × 4 = 4096 bytes = 4 KB. Overhead: (4 ÷ 1024) × 100 = 0.39%."
    }
  },
  {
    id: 10,
    title: "Proteção R/W/X",
    difficulty: "básico",
    question: "Qual combinação de bits (Read/Write/Execute) é apropriada para: (a) código, (b) dados, (c) stack?",
    hints: [
      "Código deve ser executável mas não modificável",
      "Dados e stack precisam leitura e escrita",
    ],
    solution: {
      answer: "(a) R-X, (b) RW-, (c) RW-",
      explanation: "Código: R-X (101). Dados/Stack: RW- (110). Stack não deve ser executável (proteção contra exploits)."
    }
  },

  // INTERMEDIÁRIOS (10)
  {
    id: 11,
    title: "Paginação Multinível (2 níveis)",
    difficulty: "intermediário",
    question: "Sistema 32-bit, páginas 4 KB, paginação em 2 níveis. Se cada entrada ocupa 4 bytes, quantos bits para cada nível?",
    hints: [
      "Offset = 12 bits (4 KB = 2¹²)",
      "Restam 20 bits para os 2 níveis",
      "Divida igualmente para otimizar",
    ],
    solution: {
      answer: "10 bits cada nível",
      explanation: "32 - 12 = 20 bits. Dividido em 2: 10 bits nível 1 + 10 bits nível 2 + 12 bits offset."
    }
  },
  {
    id: 12,
    title: "TLB Hit Rate",
    difficulty: "intermediário",
    question: "TLB com 80% hit rate. Tempo TLB = 1ns, memória = 100ns. Qual o EAT (Effective Access Time)?",
    hints: [
      "EAT = hit% × (TLB + mem) + miss% × (TLB + 2×mem)",
      "Hit: tradução no TLB + 1 acesso memória",
      "Miss: busca TLB + busca tabela + acesso dado",
    ],
    solution: {
      answer: "121 ns",
      explanation: "EAT = 0.8 × (1+100) + 0.2 × (1+200) = 80.8 + 40.2 = 121 ns."
    }
  },
  {
    id: 13,
    title: "Comparação: Paginação vs Segmentação",
    difficulty: "intermediário",
    question: "Cite 2 vantagens da paginação sobre segmentação e 2 desvantagens.",
    hints: [
      "Pense em fragmentação",
      "Pense em compartilhamento",
      "Pense em overhead",
    ],
    solution: {
      answer: "Vantagens: sem fragmentação externa, alocação simples. Desvantagens: fragmentação interna, overhead da tabela",
      explanation: "Paginação elimina fragmentação externa mas tem fragmentação interna (última página). Alocação é O(1) mas tabela de páginas consome memória."
    }
  },
  {
    id: 14,
    title: "Copy-on-Write Scenario",
    difficulty: "intermediário",
    question: "Após fork(), pai e filho compartilham 100 páginas COW. Filho escreve em 10 páginas. Quantas páginas físicas no total?",
    hints: [
      "Inicialmente: 100 páginas compartilhadas",
      "Escrita causa cópia",
      "10 páginas duplicadas",
    ],
    solution: {
      answer: "110 páginas",
      explanation: "90 páginas compartilhadas + 10 originais do pai + 10 cópias do filho = 110 páginas físicas."
    }
  },
  {
    id: 15,
    title: "Shared Pages",
    difficulty: "intermediário",
    question: "3 processos compartilham biblioteca de 20 páginas. Quantas páginas físicas e quantas entradas em tabelas de páginas?",
    hints: [
      "Física: uma cópia compartilhada",
      "Lógica: cada processo mapeia",
    ],
    solution: {
      answer: "20 físicas, 60 entradas",
      explanation: "Físicas: 20 (uma cópia). Entradas: 3 processos × 20 páginas = 60 entradas (apontam para mesmos 20 frames)."
    }
  },
  {
    id: 16,
    title: "Huge Pages vs Normal",
    difficulty: "intermediário",
    question: "Sistema com 1 GB RAM. Compare overhead de tabelas: (a) páginas 4 KB, (b) páginas 2 MB.",
    hints: [
      "Páginas: RAM ÷ tamanho_página",
      "Entrada: 8 bytes cada",
      "(a) 262144 páginas, (b) 512 páginas",
    ],
    solution: {
      answer: "(a) 2 MB, (b) 4 KB",
      explanation: "(a) 1GB ÷ 4KB = 262144 × 8B = 2MB. (b) 1GB ÷ 2MB = 512 × 8B = 4KB. Huge pages reduzem overhead 512x!"
    }
  },
  {
    id: 17,
    title: "Working Set Calculation",
    difficulty: "intermediário",
    question: "Processo acessa páginas: 1,2,3,2,1,5,6,1,5,6 (janela=3). Qual o tamanho do working set ao final?",
    hints: [
      "Working set = páginas únicas na janela",
      "Últimas 3 referências: 1,5,6",
    ],
    solution: {
      answer: "3 páginas {1,5,6}",
      explanation: "Janela de 3: últimas referências são 1,5,6. Working set = {1,5,6} = 3 páginas."
    }
  },
  {
    id: 18,
    title: "Page Replacement Selection",
    difficulty: "intermediário",
    question: "String de referência: 1,2,3,4,1,2,5,1,2,3,4,5. Com 3 frames, qual algoritmo gera menos page faults: FIFO ou LRU?",
    hints: [
      "Simule FIFO: fila circular",
      "Simule LRU: remove menos recentemente usado",
      "Conte page faults em cada",
    ],
    solution: {
      answer: "LRU (9 faults) < FIFO (10 faults)",
      explanation: "FIFO: 10 faults. LRU: 9 faults. LRU performa melhor neste caso (geralmente é melhor)."
    }
  },
  {
    id: 19,
    title: "Thrashing Detection",
    difficulty: "intermediário",
    question: "Se Page Fault Rate > 80% e CPU utilization < 20%, o que está acontecendo? Como resolver?",
    hints: [
      "Alto PFR + baixa CPU = ?",
      "Processos gastam tempo esperando I/O",
      "Solução: reduzir multiprogramação",
    ],
    solution: {
      answer: "Thrashing. Solução: suspender processos ou aumentar RAM",
      explanation: "Thrashing: sistema gasta mais tempo com page faults do que executando. Solução: reduzir degree of multiprogramming ou adicionar RAM."
    }
  },
  {
    id: 20,
    title: "Demand Paging Performance",
    difficulty: "intermediário",
    question: "Page fault service time = 10ms. Processo causa 1 PF a cada 1000 instruções. Tempo por instrução = 1μs. Qual o slowdown?",
    hints: [
      "Tempo sem PF: 1000 × 1μs = 1ms",
      "Tempo com PF: 1ms + 10ms = 11ms",
      "Slowdown: tempo_com ÷ tempo_sem",
    ],
    solution: {
      answer: "11x slowdown",
      explanation: "Sem PF: 1ms. Com PF: 1ms + 10ms = 11ms. Slowdown: 11 ÷ 1 = 11x mais lento!"
    }
  },

  // AVANÇADOS (10+)
  {
    id: 21,
    title: "4-Level Paging (x86-64)",
    difficulty: "avançado",
    question: "x86-64 usa 48-bit endereços e 4 níveis de paginação (4 KB páginas). Quantos bits por nível e quantos níveis de tabela uma página requer?",
    hints: [
      "48 bits - 12 offset = 36 bits para níveis",
      "36 ÷ 4 níveis = 9 bits cada",
      "Cada nível tem 2⁹ = 512 entradas",
    ],
    solution: {
      answer: "9 bits/nível, 4 níveis de tabela",
      explanation: "PGD: 9 bits, PUD: 9 bits, PMD: 9 bits, PTE: 9 bits, Offset: 12 bits. Total: 9+9+9+9+12 = 48 bits."
    }
  },
  {
    id: 22,
    title: "Inverted Page Table Design",
    difficulty: "avançado",
    question: "Sistema com 4 GB RAM física, páginas 4 KB. Qual o tamanho da inverted page table (8 bytes/entrada)?",
    hints: [
      "IPT tem uma entrada por FRAME (não por página)",
      "Frames: 4 GB ÷ 4 KB",
    ],
    solution: {
      answer: "8 MB",
      explanation: "Frames: 4GB ÷ 4KB = 1M frames. IPT: 1M × 8 bytes = 8 MB. Muito menor que tabela normal!"
    }
  },
  {
    id: 23,
    title: "NUMA Page Placement",
    difficulty: "avançado",
    question: "Node 0 (local): 100ns, Node 1 (remoto): 200ns. Processo acessa 70% local, 30% remoto. Qual o tempo médio?",
    hints: [
      "Tempo médio = soma (probabilidade × tempo)",
    ],
    solution: {
      answer: "130 ns",
      explanation: "Tempo = 0.7 × 100 + 0.3 × 200 = 70 + 60 = 130 ns. NUMA-aware allocation é crucial!"
    }
  },
  {
    id: 24,
    title: "THP (Transparent Huge Pages)",
    difficulty: "avançado",
    question: "Processo aloca 512 MB. Com THP (2 MB páginas), quantos TLB entries vs páginas normais (4 KB)?",
    hints: [
      "THP: 512 MB ÷ 2 MB",
      "Normal: 512 MB ÷ 4 KB",
    ],
    solution: {
      answer: "THP: 256 entries, Normal: 131072 entries",
      explanation: "THP: 512MB ÷ 2MB = 256. Normal: 512MB ÷ 4KB = 131072. THP reduz TLB misses drasticamente (512x menos entradas)!"
    }
  },
  {
    id: 25,
    title: "Memory-Mapped File Performance",
    difficulty: "avançado",
    question: "Arquivo 1 GB mmap'd com páginas 4 KB. Processo acessa sequencialmente (readahead 32 páginas). Quantos page faults?",
    hints: [
      "Total de páginas: 1 GB ÷ 4 KB = 262144",
      "Readahead traz 32 por vez",
      "Page faults: páginas ÷ readahead",
    ],
    solution: {
      answer: "8192 page faults",
      explanation: "262144 ÷ 32 = 8192 page faults. Readahead reduz PF em 32x!"
    }
  },
];

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const difficultyColor = {
    "básico": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
    "intermediário": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    "avançado": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={difficultyColor[exercise.difficulty]}>
                {exercise.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground">#{exercise.id}</span>
            </div>
            <h3 className="text-lg font-semibold">{exercise.title}</h3>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">{exercise.question}</p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHints(!showHints)}
          >
            <Lightbulb className="size-4 mr-2" />
            {showHints ? "Esconder" : "Ver"} Dicas
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronUp className="size-4 mr-2" /> : <ChevronDown className="size-4 mr-2" />}
            {isOpen ? "Esconder" : "Ver"} Solução
          </Button>
        </div>

        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
          >
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="size-4" />
              Dicas
            </h4>
            <ul className="space-y-2">
              {exercise.hints.map((hint, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 font-bold">{idx + 1}.</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
          >
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              Solução
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Resposta:</p>
                <p className="text-sm font-mono bg-background p-2 rounded">{exercise.solution.answer}</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Explicação:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{exercise.solution.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

export default function ExerciciosPage() {
  const [filter, setFilter] = useState<"todos" | "básico" | "intermediário" | "avançado">("todos");

  const filtered = filter === "todos" ? exercises : exercises.filter(e => e.difficulty === filter);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white">
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
              <GraduationCap className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Exercícios de Paginação
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              25 exercícios com dicas e soluções detalhadas
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                10 Básicos
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                10 Intermediários
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                5+ Avançados
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Filters */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Filtrar por Dificuldade</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={filter === "todos" ? "default" : "outline"}
                onClick={() => setFilter("todos")}
              >
                Todos ({exercises.length})
              </Button>
              <Button
                variant={filter === "básico" ? "default" : "outline"}
                onClick={() => setFilter("básico")}
                className={filter === "básico" ? "" : "border-green-500/30"}
              >
                Básicos (10)
              </Button>
              <Button
                variant={filter === "intermediário" ? "default" : "outline"}
                onClick={() => setFilter("intermediário")}
                className={filter === "intermediário" ? "" : "border-yellow-500/30"}
              >
                Intermediários (10)
              </Button>
              <Button
                variant={filter === "avançado" ? "default" : "outline"}
                onClick={() => setFilter("avançado")}
                className={filter === "avançado" ? "" : "border-red-500/30"}
              >
                Avançados (5)
              </Button>
            </div>
          </Card>

          {/* Exercises List */}
          <div className="space-y-4">
            {filtered.map((ex, idx) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ExerciseCard exercise={ex} />
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/tlb" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para TLB
            </a>
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2">
              Voltar para Paginação <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

