"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  BookOpen,
  Layers,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  Shield,
  Link as LinkIcon,
  Binary,
  Cpu,
  Zap,
  Target
} from "lucide-react";

export default function TeoriaSegmentacaoPage() {
  const [showAddressTranslation, setShowAddressTranslation] = useState(false);
  const [translationStep, setTranslationStep] = useState(0);

  const translationSteps = [
    "CPU gera endereço lógico (s, d)",
    "Acessa entrada s da Tabela de Segmentos",
    "Verifica se d < limite",
    "Calcula: endereço físico = base + d",
    "Acessa memória física"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Layers className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Segmentação - Teoria Completa
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Divisão lógica da memória em segmentos de tamanhos variáveis
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <BookOpen className="size-3 mr-1" /> Tanenbaum Cap. 3.2
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Binary className="size-3 mr-1" /> Silberschatz Cap. 9.2
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* O que é Segmentação? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <Info className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O que é Segmentação?</h2>
                  <p className="text-muted-foreground">Conceito fundamental</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  <strong className="text-purple-600 dark:text-purple-400">Segmentação</strong> é um esquema de
                  gerenciamento de memória que <strong>reflete a visão lógica do programador</strong> sobre a
                  memória, dividindo o espaço de endereçamento em <strong>segmentos de tamanhos variáveis</strong>.
                </p>

                <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 my-6">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Fonte: Material da Professora (PDF 02)
                    </strong>
                  </p>
                  <blockquote className="text-sm italic border-l-4 border-purple-500 pl-4">
                    &ldquo;A segmentação permite que programas sejam divididos em partes lógicas como código,
                    dados, pilha e heap, cada uma com seu próprio espaço de endereçamento.&rdquo;
                  </blockquote>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Motivação: Fragmentação Externa</h3>

                <p className="leading-relaxed">
                  Na <strong>alocação particionada dinâmica</strong>, processos ocupam <strong>áreas contíguas</strong>
                  de memória. Com o tempo, alocações e liberações criam &ldquo;buracos&rdquo; na memória,
                  desperdiçando espaço.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <AlertCircle className="size-5 text-red-500" />
                        ❌ Problema: Fragmentação Externa
                      </h4>
                      <p className="text-sm mb-4">
                        Áreas livres pequenas demais para novos processos, mesmo que a soma seja suficiente.
                      </p>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex gap-1">
                          <div className="flex-1 p-2 bg-blue-500/30 rounded text-center">P1</div>
                          <div className="w-8 p-2 bg-muted rounded text-center">□</div>
                          <div className="flex-1 p-2 bg-green-500/30 rounded text-center">P2</div>
                          <div className="w-12 p-2 bg-muted rounded text-center">□</div>
                          <div className="flex-1 p-2 bg-purple-500/30 rounded text-center">P3</div>
                        </div>
                        <p className="text-red-500 text-center">3 buracos pequenos = DESPERDÍCIO</p>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <CheckCircle className="size-5 text-green-500" />
                        ✅ Solução: Alocação Não Contígua
                      </h4>
                      <p className="text-sm mb-4">
                        Processo pode ocupar múltiplos segmentos <strong>não adjacentes</strong>.
                      </p>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex gap-1">
                          <div className="flex-1 p-2 bg-blue-500/50 rounded text-center">P1-code</div>
                          <div className="flex-1 p-2 bg-blue-500/30 rounded text-center">P1-data</div>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex-1 p-2 bg-green-500/50 rounded text-center">P2-code</div>
                          <div className="flex-1 p-2 bg-purple-500/50 rounded text-center">P3-stack</div>
                        </div>
                        <p className="text-green-500 text-center">FLEXÍVEL!</p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Divisão Lógica */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <Layers className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Divisão Lógica</h2>
                  <p className="text-muted-foreground">Segmentos típicos de um processo</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  Um programa é naturalmente dividido em <strong>unidades lógicas</strong>:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                  {[
                    {
                      name: "Código (Text)",
                      icon: Binary,
                      color: "blue",
                      desc: "Instruções do programa",
                      size: "Fixo após compilação",
                      protection: "R-X (Read + Execute)",
                      share: "Compartilhável entre processos"
                    },
                    {
                      name: "Dados (Data)",
                      icon: Target,
                      color: "green",
                      desc: "Variáveis globais e estáticas",
                      size: "Fixo (inicializadas) ou dinâmico (BSS)",
                      protection: "RW- (Read + Write)",
                      share: "Privado por processo"
                    },
                    {
                      name: "Pilha (Stack)",
                      icon: Layers,
                      color: "purple",
                      desc: "Variáveis locais, chamadas de função",
                      size: "Cresce para baixo",
                      protection: "RW- (Read + Write)",
                      share: "Privado por thread"
                    },
                    {
                      name: "Heap",
                      icon: Zap,
                      color: "amber",
                      desc: "Alocação dinâmica (malloc, new)",
                      size: "Cresce para cima",
                      protection: "RW- (Read + Write)",
                      share: "Privado, mas pode compartilhar via shmem"
                    }
                  ].map((seg, idx) => {
                    const Icon = seg.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.03, y: -3 }}
                      >
                        <Card className={`p-6 h-full bg-gradient-to-br from-${seg.color}-50 to-${seg.color}-100/50 dark:from-${seg.color}-950/20 dark:to-${seg.color}-900/20 border-2 border-${seg.color}-200 dark:border-${seg.color}-800`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg bg-${seg.color}-500/20`}>
                              <Icon className={`size-5 text-${seg.color}-600`} />
                            </div>
                            <h4 className="font-semibold">{seg.name}</h4>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">{seg.desc}</p>
                            <div className="space-y-1 text-xs">
                              <p><strong>Tamanho:</strong> {seg.size}</p>
                              <p><strong>Proteção:</strong> <code className="bg-muted px-1.5 py-0.5 rounded">{seg.protection}</code></p>
                              <p><strong>Compartilhamento:</strong> {seg.share}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800 mt-6">
                  <h4 className="font-semibold mb-4">Representação Visual:</h4>
                  <div className="space-y-3">
                    {[
                      { label: "0x0000 - Text", color: "bg-blue-500", size: "flex-[2]" },
                      { label: "0x1000 - Data", color: "bg-green-500", size: "flex-[1]" },
                      { label: "0x2000 - Heap →", color: "bg-amber-500", size: "flex-[3]" },
                      { label: "↓ Stack", color: "bg-purple-500", size: "flex-[2]" },
                      { label: "0xFFFF", color: "bg-muted", size: "flex-[1]" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`${item.size} p-3 ${item.color} rounded text-white text-sm font-mono text-center`}
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Tabela de Segmentos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <Cpu className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Tabela de Segmentos</h2>
                  <p className="text-muted-foreground">Mapeamento lógico → físico</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  Cada processo possui uma <strong className="text-green-600 dark:text-green-400">Tabela de Segmentos</strong> que
                  mapeia números de segmento para endereços físicos.
                </p>

                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 my-6">
                  <h4 className="font-semibold mb-4">Estrutura da Entrada (Segment Table Entry):</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-24 flex-shrink-0">
                        <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">Base</Badge>
                      </div>
                      <p>Endereço físico inicial do segmento</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-24 flex-shrink-0">
                        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">Limit</Badge>
                      </div>
                      <p>Tamanho do segmento (em bytes)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-24 flex-shrink-0">
                        <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400">Protection</Badge>
                      </div>
                      <p>Bits R/W/X (permissões de acesso)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-24 flex-shrink-0">
                        <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Valid</Badge>
                      </div>
                      <p>1 = segmento alocado, 0 = inválido</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Código Exemplo:</h3>

                <CodeBlock language="typescript">{`interface SegmentTableEntry {
  base: number;      // Endereço físico inicial
  limit: number;     // Tamanho do segmento (bytes)
  protection: {
    read: boolean;   // Permissão de leitura
    write: boolean;  // Permissão de escrita
    execute: boolean; // Permissão de execução
  };
  valid: boolean;    // Segmento está alocado?
  shared: boolean;   // Compartilhado entre processos?
}

// Exemplo: processo com 4 segmentos
const segmentTable: SegmentTableEntry[] = [
  // Segmento 0: Código
  {
    base: 0x10000,
    limit: 0x4000,  // 16 KB
    protection: { read: true, write: false, execute: true },
    valid: true,
    shared: true  // Código pode ser compartilhado
  },
  // Segmento 1: Dados
  {
    base: 0x20000,
    limit: 0x2000,  // 8 KB
    protection: { read: true, write: true, execute: false },
    valid: true,
    shared: false
  },
  // Segmento 2: Stack
  {
    base: 0x30000,
    limit: 0x1000,  // 4 KB
    protection: { read: true, write: true, execute: false },
    valid: true,
    shared: false
  },
  // Segmento 3: Heap
  {
    base: 0x40000,
    limit: 0x8000,  // 32 KB
    protection: { read: true, write: true, execute: false },
    valid: true,
    shared: false
  }
];`}</CodeBlock>

                <div className="mt-6">
                  <CodeBlock language="c">{`// Estrutura em C
typedef struct {
    uint32_t base;       // Endereço físico base
    uint32_t limit;      // Tamanho do segmento
    uint8_t  protection; // R=0x4, W=0x2, X=0x1
    uint8_t  valid;      // 1 = válido, 0 = inválido
    uint8_t  shared;     // 1 = compartilhado
} segment_table_entry_t;

// Exemplo de uso
segment_table_entry_t seg_table[4] = {
    { .base = 0x10000, .limit = 0x4000, .protection = 0x5, .valid = 1, .shared = 1 }, // R-X
    { .base = 0x20000, .limit = 0x2000, .protection = 0x6, .valid = 1, .shared = 0 }, // RW-
    { .base = 0x30000, .limit = 0x1000, .protection = 0x6, .valid = 1, .shared = 0 }, // RW-
    { .base = 0x40000, .limit = 0x8000, .protection = 0x6, .valid = 1, .shared = 0 }  // RW-
};`}</CodeBlock>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Tradução de Endereço */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <Binary className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Tradução de Endereço</h2>
                  <p className="text-muted-foreground">Endereço lógico (s, d) → Endereço físico</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">
                    Na segmentação, um <strong>endereço lógico</strong> é um par <code>(s, d)</code>:
                  </p>
                  <ul>
                    <li><strong>s</strong> = número do segmento</li>
                    <li><strong>d</strong> = deslocamento (offset) dentro do segmento</li>
                  </ul>
                </div>

                <Button
                  onClick={() => {
                    setShowAddressTranslation(!showAddressTranslation);
                    setTranslationStep(0);
                  }}
                  className="w-full md:w-auto"
                >
                  {showAddressTranslation ? "Ocultar" : "▶️ Demonstrar"} Tradução
                </Button>

                {showAddressTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4"
                  >
                    <div className="flex gap-4 mb-4">
                      <Button
                        onClick={() => setTranslationStep(0)}
                        variant="outline"
                        size="sm"
                      >
                        ⏮️ Reiniciar
                      </Button>
                      <Button
                        onClick={() => setTranslationStep((prev) => Math.min(prev + 1, translationSteps.length - 1))}
                        disabled={translationStep >= translationSteps.length - 1}
                        size="sm"
                      >
                        ▶️ Próximo
                      </Button>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold mb-4">Exemplo: Acessar (s=1, d=0x500)</h4>
                      
                      <div className="space-y-3">
                        {translationSteps.map((step, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0.3, x: -10 }}
                            animate={{
                              opacity: idx <= translationStep ? 1 : 0.3,
                              x: idx === translationStep ? 5 : 0,
                              scale: idx === translationStep ? 1.02 : 1
                            }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-lg ${
                              idx === translationStep
                                ? "bg-amber-500/20 border-2 border-amber-500"
                                : idx < translationStep
                                ? "bg-background/50 border"
                                : "bg-background/30 border border-dashed"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                idx === translationStep
                                  ? "bg-amber-500 text-white"
                                  : idx < translationStep
                                  ? "bg-amber-500/50 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {idx < translationStep ? "✓" : idx + 1}
                              </div>
                              <p className="text-sm font-medium">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-background/50 rounded border">
                        <p className="text-sm font-mono">
                          <strong>Resultado:</strong> Endereço Físico = 0x20000 + 0x500 = <span className="text-green-600">0x20500</span>
                        </p>
                      </div>
                    </div>

                    <CodeBlock language="typescript">{`function translateAddress(
  segment: number,
  offset: number,
  segmentTable: SegmentTableEntry[]
): number {
  const entry = segmentTable[segment];
  
  // 1. Verificar se segmento é válido
  if (!entry.valid) {
    throw new Error("Invalid segment");
  }
  
  // 2. Verificar limite (proteção)
  if (offset >= entry.limit) {
    throw new Error(\`Segmentation fault: offset \${offset} >= limit \${entry.limit}\`);
  }
  
  // 3. Calcular endereço físico
  const physicalAddress = entry.base + offset;
  
  return physicalAddress;
}

// Exemplo:
const physical = translateAddress(1, 0x500, segmentTable);
console.log(\`Físico: 0x\${physical.toString(16)}\`); // 0x20500`}</CodeBlock>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Hub de Segmentação
            </a>
            <a href="/os/memoria/segmentacao/simulador" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Simulador 2D <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

