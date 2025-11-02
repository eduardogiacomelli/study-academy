"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  Layers,
  ArrowRight,
  BookOpen,
  Cpu,
  Binary,
  Calculator,
  TrendingDown
} from "lucide-react";

export default function PaginacaoMultinivelPage() {
  const [bits, setBits] = useState(32);
  const [pageSize, setPageSize] = useState(4096);
  const [levels, setLevels] = useState(2);

  const offsetBits = Math.log2(pageSize);
  const totalPageBits = bits - offsetBits;
  const bitsPerLevel = Math.floor(totalPageBits / levels);
  const entriesPerLevel = Math.pow(2, bitsPerLevel);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute -top-20 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 10 }}
            >
              <Layers className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Paginação Multinível
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Tabelas de páginas hierárquicas - 2, 3 e 4 níveis
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Layers className="size-3 mr-1" /> 2 Níveis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Cpu className="size-3 mr-1" /> x86-64
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingDown className="size-3 mr-1" /> Economia de Memória
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Problema: Tabela Única Muito Grande */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-red-500/5 border-2 border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 border-2 border-red-500/20">
                  <Binary className="size-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O Problema</h2>
                  <p className="text-muted-foreground">Tabela de páginas única é ENORME</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-500/30">
                  <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Exemplo Real (32-bit, 4KB páginas):</h4>
                  <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`Endereço: 32 bits
Página: 4 KB = 2¹² bytes → 12 bits de offset
Páginas possíveis: 2³²⁻¹² = 2²⁰ = 1.048.576 páginas

Tabela de páginas (4 bytes/entrada):
1.048.576 × 4 = 4.194.304 bytes = 4 MB POR PROCESSO! 😱

Com 100 processos = 400 MB só de tabelas!
Pior: A tabela é SEMPRE alocada, mesmo que o processo use poucas páginas.`}</code></pre>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mt-6">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Referências:
                    </strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (3ª ed.), Cap. 3.3.3</li>
                    <li>• Silberschatz, A. et al. - <em>Operating System Concepts</em> (10ª ed.), Cap. 9.3</li>
                    <li>• Material da Professora (PDF 02 - Paginação e Segmentação)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Solução: Paginação em 2 Níveis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <Layers className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Paginação em 2 Níveis</h2>
                  <p className="text-muted-foreground">Divide a tabela em pequenos pedaços</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">
                    A ideia é simples: <strong>paginar a própria tabela de páginas!</strong>
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-4">Estrutura:</h3>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Endereço Virtual (32-bit, 4KB páginas):</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 text-center">
                            <div className="font-mono font-bold text-lg">10 bits</div>
                            <div className="text-xs mt-1">Nível 1</div>
                            <div className="text-xs text-muted-foreground">2¹⁰ = 1024</div>
                          </div>
                          <ArrowRight className="size-6 flex-shrink-0" />
                          <div className="flex-1 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 text-center">
                            <div className="font-mono font-bold text-lg">10 bits</div>
                            <div className="text-xs mt-1">Nível 2</div>
                            <div className="text-xs text-muted-foreground">2¹⁰ = 1024</div>
                          </div>
                          <ArrowRight className="size-6 flex-shrink-0" />
                          <div className="flex-1 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border-2 text-center">
                            <div className="font-mono font-bold text-lg">12 bits</div>
                            <div className="text-xs mt-1">Offset</div>
                            <div className="text-xs text-muted-foreground">4096 bytes</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-background/50 rounded border">
                        <p className="text-sm font-semibold mb-2">Tradução Passo-a-Passo:</p>
                        <ol className="text-sm space-y-2 list-decimal list-inside">
                          <li>Extrair <strong>10 bits nível 1</strong> (índice na tabela externa)</li>
                          <li>Acessar entrada na <strong>tabela externa</strong> → obtém endereço da tabela interna</li>
                          <li>Extrair <strong>10 bits nível 2</strong> (índice na tabela interna)</li>
                          <li>Acessar entrada na <strong>tabela interna</strong> → obtém frame físico</li>
                          <li>Extrair <strong>12 bits offset</strong></li>
                          <li>Calcular endereço físico: <code>(frame &lt;&lt; 12) | offset</code></li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Vantagem ENORME:</h3>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
                    <p className="font-semibold mb-3">Processo usando apenas 4 MB de memória:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border-2 border-red-500/30">
                        <p className="font-semibold mb-2 text-red-700 dark:text-red-400">❌ Tabela Única:</p>
                        <p className="font-mono">4 MB tabela (sempre)</p>
                        <p className="text-xs text-muted-foreground mt-2">Desperdício de memória</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded border-2 border-green-500/30">
                        <p className="font-semibold mb-2 text-green-700 dark:text-green-400">✅ 2 Níveis:</p>
                        <p className="font-mono">4 KB externa + 4 KB interna</p>
                        <p className="font-mono font-bold text-green-600">= 8 KB total!</p>
                        <p className="text-xs text-muted-foreground mt-2">512x menor! 🎉</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Código TypeScript:</h4>
                    <CodeBlock language="typescript">{`type PageTableEntry = {
  frameNumber: number;  // Número do quadro físico
  present: boolean;     // Está na memória?
  modified: boolean;    // Foi modificado?
};

// Tabela de 2 níveis
type OuterPageTable = PageTableEntry[];       // 1024 entradas
type InnerPageTable = PageTableEntry[];       // 1024 entradas

function translateAddress2Level(
  virtual: number,
  outerTable: OuterPageTable,
  innerTables: InnerPageTable[]
): number {
  // Decompor endereço: [10 bits outer][10 bits inner][12 bits offset]
  const offset = virtual & 0xFFF;                   // 12 bits menos significativos
  const innerIndex = (virtual >> 12) & 0x3FF;       // Próximos 10 bits
  const outerIndex = (virtual >> 22) & 0x3FF;       // 10 bits mais significativos

  // 1. Acessar tabela externa
  const outerEntry = outerTable[outerIndex];
  if (!outerEntry.present) throw new Error("Page fault - outer");

  // 2. Acessar tabela interna
  const innerTable = innerTables[outerEntry.frameNumber];
  const innerEntry = innerTable[innerIndex];
  if (!innerEntry.present) throw new Error("Page fault - inner");

  // 3. Calcular endereço físico
  return (innerEntry.frameNumber << 12) | offset;
}`}</CodeBlock>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Calculadora Interativa */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <Calculator className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Calculadora Multinível</h2>
                  <p className="text-muted-foreground">Configure e veja os bits</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="mb-2 block">Bits de Endereço</Label>
                    <Input
                      type="number"
                      value={bits}
                      onChange={(e) => setBits(Math.max(16, Math.min(64, Number(e.target.value))))}
                      min="16"
                      max="64"
                    />
                    <p className="text-xs text-muted-foreground mt-1">16-64 bits</p>
                  </div>

                  <div>
                    <Label className="mb-2 block">Tamanho Página (bytes)</Label>
                    <select 
                      className="w-full p-2 rounded border bg-background"
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      <option value="512">512 B</option>
                      <option value="1024">1 KB</option>
                      <option value="2048">2 KB</option>
                      <option value="4096">4 KB</option>
                      <option value="8192">8 KB</option>
                      <option value="16384">16 KB</option>
                    </select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Níveis</Label>
                    <select 
                      className="w-full p-2 rounded border bg-background"
                      value={levels}
                      onChange={(e) => setLevels(Number(e.target.value))}
                    >
                      <option value="2">2 Níveis</option>
                      <option value="3">3 Níveis</option>
                      <option value="4">4 Níveis</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-4">Resultado:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-background/50 rounded border">
                      <div className="text-2xl font-bold text-blue-600">{offsetBits}</div>
                      <div className="text-xs text-muted-foreground">bits offset</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded border">
                      <div className="text-2xl font-bold text-green-600">{bitsPerLevel}</div>
                      <div className="text-xs text-muted-foreground">bits/nível</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded border">
                      <div className="text-2xl font-bold text-purple-600">{entriesPerLevel.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">entradas/nível</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded border">
                      <div className="text-2xl font-bold text-amber-600">{levels}</div>
                      <div className="text-xs text-muted-foreground">acessos memória</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* x86-64: 4 Níveis! */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <Cpu className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">x86-64: 4 Níveis</h2>
                  <p className="text-muted-foreground">Arquitetura moderna real</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  Processadores x86-64 modernos usam <strong>4 níveis de paginação</strong> para gerenciar
                  espaços de endereçamento de 48 bits.
                </p>

                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800 my-6">
                  <h4 className="font-semibold mb-4">Estrutura x86-64 (48 bits):</h4>
                  <div className="space-y-3">
                    {[
                      { name: "PML4 (Level 4)", bits: 9, desc: "Page Map Level 4" },
                      { name: "PDPT (Level 3)", bits: 9, desc: "Page Directory Pointer Table" },
                      { name: "PDT (Level 2)", bits: 9, desc: "Page Directory Table" },
                      { name: "PT (Level 1)", bits: 9, desc: "Page Table" },
                      { name: "Offset", bits: 12, desc: "4 KB página" }
                    ].map((level, idx) => (
                      <div key={idx} className="p-3 bg-background/50 rounded border flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{level.name}</div>
                          <div className="text-xs text-muted-foreground">{level.desc}</div>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-600">
                          {level.bits} bits = {Math.pow(2, level.bits)} {idx === 4 ? "bytes" : "entries"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-4 text-center font-mono">
                    Total: 9 + 9 + 9 + 9 + 12 = 48 bits
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold mb-2">Trade-off:</h4>
                  <div className="text-sm space-y-2">
                    <p>✅ <strong>Economia de memória:</strong> Apenas páginas usadas são alocadas</p>
                    <p>✅ <strong>Flexibilidade:</strong> Suporta espaços gigantes (256 TB)</p>
                    <p>⚠️ <strong>Overhead:</strong> 4 acessos à memória (mitigado pelo TLB!)</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Paginação
            </a>
            <a href="/os/memoria/paginacao/localidade" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Localidade <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

