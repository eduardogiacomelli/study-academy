"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger, createTimeline } from "animejs";
import {
  Table,
  Database,
  Cpu,
  MemoryStick,
  Hash,
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Eye,
  CheckCircle,
  AlertTriangle,
  Binary
} from "lucide-react";

interface SegmentTableEntry {
  id: number;
  name: string;
  base: string;
  limit: string;
  read: boolean;
  write: boolean;
  execute: boolean;
  valid: boolean;
}

const EXAMPLE_TABLE: SegmentTableEntry[] = [
  { id: 0, name: "Code", base: "0x0000", limit: "0x1000", read: true, write: false, execute: true, valid: true },
  { id: 1, name: "Data", base: "0x4000", limit: "0x0800", read: true, write: true, execute: false, valid: true },
  { id: 2, name: "Stack", base: "0x7000", limit: "0x0400", read: true, write: true, execute: false, valid: true },
  { id: 3, name: "Heap", base: "0x9000", limit: "0x0600", read: true, write: true, execute: false, valid: true },
  { id: 4, name: "-", base: "0x0000", limit: "0x0000", read: false, write: false, execute: false, valid: false },
];

export default function TabelaSegmentosPage() {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [translating, setTranslating] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    // Animate table rows on mount
    animate('.table-row', {
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 600,
      ease: 'outCubic'
    });

    // Animate diagram elements
    animate('.diagram-element', {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(150, { start: 800 }),
      duration: 800,
      ease: 'outElastic(1, 0.6)'
    });
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  async function demonstrateTranslation(segmentId: number, offset: number) {
    if (translating) return;
    setTranslating(true);
    setSelectedEntry(segmentId);

    const entry = EXAMPLE_TABLE[segmentId];
    if (!entry.valid) {
      toast.error("Segmento inválido!", { icon: "❌" });
      setTranslating(false);
      return;
    }

    const tl = createTimeline();

    // Step 1: Highlight segment number
    tl.add(animate(`#seg-${segmentId}`, {
      scale: [1, 1.15, 1],
      backgroundColor: ['#ffffff', '#3b82f6', '#ffffff'],
      duration: 600
    }));

    await new Promise(resolve => setTimeout(resolve, 700));

    // Step 2: Access table entry
    tl.add(animate(`#entry-${segmentId}`, {
      scale: [1, 1.08, 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 30px 10px rgba(59, 130, 246, 0.8)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ],
      duration: 800
    }));

    await new Promise(resolve => setTimeout(resolve, 900));

    // Step 3: Calculate physical address
    const baseAddr = parseInt(entry.base, 16);
    const physicalAddr = baseAddr + offset;

    toast.success(
      `Endereço Físico: 0x${physicalAddr.toString(16).toUpperCase().padStart(4, '0')}`,
      {
        icon: "✅",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #10b981, #059669)",
          color: "#fff"
        }
      }
    );

    await new Promise(resolve => setTimeout(resolve, 1000));
    setTranslating(false);
    setSelectedEntry(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Table className="size-5" />
              <span className="text-sm font-semibold">Estrutura de Dados</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tabela de Segmentos
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Estrutura central da segmentação: Base, Limite e Proteção
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Database className="size-4 mr-2" />
                Estrutura
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Cpu className="size-4 mr-2" />
                Hardware
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Zap className="size-4 mr-2" />
                Tradução
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* 1. Estrutura da Tabela */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5 border-2 border-cyan-500/10 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Database className="size-6 text-cyan-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Estrutura da Tabela de Segmentos</h2>
                    <p className="text-muted-foreground">Cada processo tem sua própria tabela</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      A <strong className="text-cyan-600 dark:text-cyan-400">Tabela de Segmentos</strong> mapeia
                      número de segmento lógico para endereço físico base e tamanho.
                    </p>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-2 border-cyan-200 dark:border-cyan-800 my-6">
                      <h4 className="font-semibold mb-4 text-lg">Entrada da Tabela (Segment Table Entry)</h4>

                      <div className="space-y-3">
                        <motion.div
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">Base</Badge>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-1">Endereço físico inicial</p>
                              <p className="text-xs text-muted-foreground">
                                Onde o segmento começa na memória física (ex: 0x4000)
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400">Limit</Badge>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-1">Tamanho do segmento</p>
                              <p className="text-xs text-muted-foreground">
                                Comprimento em bytes (ex: 4096 = 4 KB)
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">Protection</Badge>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-1">Bits R/W/X</p>
                              <p className="text-xs text-muted-foreground">
                                Permissões de leitura, escrita e execução (3 bits)
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-background/50 rounded-lg border"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-32 flex-shrink-0">
                              <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Valid</Badge>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-1">Bit de validade</p>
                              <p className="text-xs text-muted-foreground">
                                1 = entrada usada, 0 = entrada livre
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Representação em TypeScript</h3>

                    <div className="not-prose">
                      <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                        <pre className="text-sm leading-relaxed"><code>{`interface SegmentTableEntry {
  base: number;        // Endereço físico inicial
  limit: number;       // Tamanho do segmento
  protection: {
    read: boolean;     // R bit
    write: boolean;    // W bit
    execute: boolean;  // X bit
  };
  valid: boolean;      // Entrada válida?
}

class SegmentTable {
  private entries: SegmentTableEntry[];
  
  constructor(maxSegments: number) {
    this.entries = new Array(maxSegments);
    // Inicializar todas como inválidas
    for (let i = 0; i < maxSegments; i++) {
      this.entries[i] = {
        base: 0,
        limit: 0,
        protection: { read: false, write: false, execute: false },
        valid: false
      };
    }
  }
  
  // Traduzir endereço lógico (segmento, offset) para físico
  translate(segment: number, offset: number): number {
    const entry = this.entries[segment];
    
    // Verificar validade
    if (!entry.valid) {
      throw new Error("Segment fault: Invalid segment");
    }
    
    // Verificar limite
    if (offset >= entry.limit) {
      throw new Error("Segment fault: Offset exceeds limit");
    }
    
    // Calcular endereço físico
    return entry.base + offset;
  }
}`}</code></pre>
                      </Card>
                    </div>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Representação em C (Linux Kernel)</h3>

                    <div className="not-prose">
                      <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                        <pre className="text-sm leading-relaxed"><code>{`// Entrada da tabela de segmentos no x86
struct segment_descriptor {
    uint32_t base_low:  24;  // Bits 0-23 do endereço base
    uint32_t base_high:  8;  // Bits 24-31 do endereço base
    uint32_t limit_low: 16;  // Bits 0-15 do limite
    uint32_t limit_high: 4;  // Bits 16-19 do limite
    uint32_t type:       4;  // Tipo do segmento
    uint32_t s:          1;  // System bit
    uint32_t dpl:        2;  // Descriptor Privilege Level
    uint32_t present:    1;  // Present bit
    uint32_t avl:        1;  // Available for system use
    uint32_t l:          1;  // 64-bit code segment (IA-32e)
    uint32_t db:         1;  // Default operation size
    uint32_t g:          1;  // Granularity
} __attribute__((packed));

// GDT (Global Descriptor Table)
struct segment_descriptor gdt[8192];

// Registrador GDTR armazena endereço da GDT
struct {
    uint16_t limit;
    uint32_t base;
} __attribute__((packed)) gdtr;`}</code></pre>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 2. Tabela Interativa */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="size-6 text-blue-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Tabela de Segmentos - Exemplo</h2>
                  <p className="text-muted-foreground">Clique em uma entrada para demonstrar tradução</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-3 font-semibold bg-muted/50">Seg #</th>
                      <th className="text-left p-3 font-semibold bg-muted/50">Nome</th>
                      <th className="text-left p-3 font-semibold bg-muted/50">Base</th>
                      <th className="text-left p-3 font-semibold bg-muted/50">Limite</th>
                      <th className="text-center p-3 font-semibold bg-muted/50">R</th>
                      <th className="text-center p-3 font-semibold bg-muted/50">W</th>
                      <th className="text-center p-3 font-semibold bg-muted/50">X</th>
                      <th className="text-center p-3 font-semibold bg-muted/50">Valid</th>
                      <th className="text-center p-3 font-semibold bg-muted/50">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLE_TABLE.map((entry) => (
                      <motion.tr
                        key={entry.id}
                        id={`entry-${entry.id}`}
                        className={`table-row border-b transition-colors ${
                          entry.valid 
                            ? 'hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer' 
                            : 'opacity-40'
                        } ${selectedEntry === entry.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
                        whileHover={entry.valid ? { x: 3 } : {}}
                      >
                        <td className="p-3">
                          <span id={`seg-${entry.id}`} className="font-mono font-bold">
                            {entry.id}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">{entry.name}</td>
                        <td className="p-3 font-mono">{entry.base}</td>
                        <td className="p-3 font-mono">{entry.limit}</td>
                        <td className="p-3 text-center">
                          {entry.read ? (
                            <CheckCircle className="size-4 text-green-500 inline" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {entry.write ? (
                            <CheckCircle className="size-4 text-green-500 inline" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {entry.execute ? (
                            <CheckCircle className="size-4 text-green-500 inline" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {entry.valid ? (
                            <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">✓</Badge>
                          ) : (
                            <Badge variant="secondary">✗</Badge>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {entry.valid && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => demonstrateTranslation(entry.id, 0x100)}
                              disabled={translating}
                            >
                              <Zap className="size-4" />
                            </Button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm flex items-start gap-2">
                  <AlertTriangle className="size-5 text-blue-500 flex-shrink-0" />
                  <span>
                    <strong>Como usar:</strong> Clique no botão <Zap className="size-3 inline" /> para simular
                    a tradução do endereço lógico (Seg, Offset=0x100) para endereço físico.
                    Observe as animações indicando as etapas!
                  </span>
                </p>
              </div>
            </Card>
          </motion.section>

          {/* 3. Diagrama 3D Interativo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card 
              className="p-8 bg-gradient-to-br from-background to-indigo-500/5 border-2 border-indigo-500/10 relative overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Binary className="size-6 text-indigo-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Diagrama de Tradução 3D</h2>
                  <p className="text-muted-foreground">Mova o mouse para interagir</p>
                </div>
              </div>

              <motion.div
                className="relative h-[500px] rounded-xl bg-gradient-to-br from-slate-950 to-indigo-950 p-8 overflow-hidden"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Endereço Lógico */}
                <motion.div
                  className="diagram-element absolute top-20 left-20 p-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-2xl"
                  style={{ transform: "translateZ(50px)" }}
                  whileHover={{ scale: 1.05, translateZ: 80 }}
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Hash className="size-5" />
                    Endereço Lógico
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-mono">(Segmento: 1, Offset: 0x100)</p>
                  </div>
                </motion.div>

                {/* Tabela */}
                <motion.div
                  className="diagram-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl"
                  style={{ transform: "translateZ(100px)" }}
                  whileHover={{ scale: 1.05, translateZ: 130 }}
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Table className="size-5" />
                    Tabela de Segmentos
                  </h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p>Entry[1].base = 0x4000</p>
                    <p>Entry[1].limit = 0x0800</p>
                  </div>
                </motion.div>

                {/* Endereço Físico */}
                <motion.div
                  className="diagram-element absolute bottom-20 right-20 p-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-2xl"
                  style={{ transform: "translateZ(50px)" }}
                  whileHover={{ scale: 1.05, translateZ: 80 }}
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <MemoryStick className="size-5" />
                    Endereço Físico
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-mono">0x4100</p>
                    <p className="text-xs">(0x4000 + 0x100)</p>
                  </div>
                </motion.div>

                {/* Arrows */}
                <svg className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(25px)" }}>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.5)" />
                    </marker>
                  </defs>
                  <line
                    x1="25%"
                    y1="30%"
                    x2="45%"
                    y2="45%"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="55%"
                    y1="55%"
                    x2="75%"
                    y2="70%"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>

                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </motion.div>

              <div className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
                <p className="text-sm">
                  <strong>💡 Dica:</strong> Este diagrama 3D mostra visualmente como o endereço lógico
                  é traduzido usando a Tabela de Segmentos. O hardware realiza isso em <strong>1 ciclo</strong>!
                </p>
              </div>
            </Card>
          </motion.section>

          {/* 4. Registradores */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Cpu className="size-6 text-purple-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Registradores de Segmentação</h2>
                  <p className="text-muted-foreground">Hardware específico</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    O hardware mantém <strong className="text-purple-600 dark:text-purple-400">registradores especiais</strong> para
                    tornar a tradução extremamente rápida:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-2 border-purple-200 dark:border-purple-800">
                      <h4 className="font-bold mb-3 text-lg">STBR (Segment Table Base Register)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Aponta para o <strong>início da tabela</strong> de segmentos na memória física.
                      </p>
                      <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-xs font-mono">
                        STBR = 0x00100000  // Endereço da tabela
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-2 border-pink-200 dark:border-pink-800">
                      <h4 className="font-bold mb-3 text-lg">STLR (Segment Table Length Register)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Indica o <strong>número de entradas</strong> válidas na tabela.
                      </p>
                      <div className="p-3 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-xs font-mono">
                        STLR = 5  // 5 segmentos (0-4)
                      </div>
                    </Card>
                  </div>

                  <h3 className="text-2xl font-semibold mt-8 mb-4">Fórmula de Tradução</h3>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-300 dark:border-blue-700">
                    <pre className="text-lg font-mono text-center mb-4"><code>
Physical_Address = Segment_Table[seg_number].base + offset
                    </code></pre>

                    <div className="space-y-2 text-sm mt-6">
                      <p><strong>Passo 1:</strong> Verificar se seg_number &lt; STLR</p>
                      <p><strong>Passo 2:</strong> Verificar se offset &lt; Segment_Table[seg_number].limit</p>
                      <p><strong>Passo 3:</strong> Calcular: base + offset</p>
                      <p className="text-xs text-muted-foreground mt-4">
                        ⚠️ Violação em qualquer passo gera <strong>Segmentation Fault</strong>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mt-6">
                    <p className="text-sm mb-2">
                      <strong className="flex items-center gap-2">
                        <BookOpen className="size-4" />
                        Referência Acadêmica:
                      </strong>
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Tanenbaum - <em>&quot;Modern Operating Systems&quot;</em> (Cap. 3.3.2)</li>
                      <li>• Silberschatz - <em>&quot;Operating System Concepts&quot;</em> (Cap. 9.2)</li>
                      <li>• PDF 02 - Paginação e Segmentação (Slides 35-40)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao/protecao" className="text-primary hover:underline flex items-center gap-2">
              ← Anterior: Proteção
            </a>
            <a href="/os/memoria/segmentacao/combinado" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Seg + Paginação <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

