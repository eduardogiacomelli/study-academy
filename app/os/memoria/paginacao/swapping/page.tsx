"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  ArrowRight,
  BookOpen,
  HardDrive,
  RefreshCw,
  TrendingDown,
  AlertCircle,
  Activity
} from "lucide-react";

export default function SwappingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute -top-10 right-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
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
              whileHover={{ scale: 1.05 }}
            >
              <RefreshCw className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Swapping
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Mover processos entre RAM e disco para gerenciar memória
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <HardDrive className="size-3 mr-1" /> Swap Space
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Activity className="size-3 mr-1" /> Context Switch
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingDown className="size-3 mr-1" /> Performance
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Conceito */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5 border-2 border-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/20">
                  <BookOpen className="size-6 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O que é Swapping?</h2>
                  <p className="text-muted-foreground">Técnica clássica de gerência de memória</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  <strong className="text-cyan-600 dark:text-cyan-400">Swapping</strong> é a técnica
                  de remover <strong>processos inteiros</strong> da memória RAM para o disco
                  (swap out) e trazê-los de volta quando necessário (swap in).
                </p>

                <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 my-6">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Referências:
                    </strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (3ª ed.), Cap. 3.2</li>
                    <li>• Silberschatz et al. - <em>Operating System Concepts</em> (10ª ed.), Cap. 9</li>
                    <li>• Material da Professora (PDF 01 - Gerência de Memória)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Swapping vs Paginação:</h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold bg-muted/50">Aspecto</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Swapping</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Paginação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Unidade</td>
                        <td className="p-3">Processo inteiro</td>
                        <td className="p-3">Páginas individuais</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Granularidade</td>
                        <td className="p-3">Grossa (MB)</td>
                        <td className="p-3">Fina (4 KB)</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Overhead</td>
                        <td className="p-3">Alto (I/O grande)</td>
                        <td className="p-3">Baixo (I/O pequeno)</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Uso Moderno</td>
                        <td className="p-3">Raro (emergência)</td>
                        <td className="p-3">Padrão (sempre)</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Contexto</td>
                        <td className="p-3">Context switch pesado</td>
                        <td className="p-3">Transparente</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mt-6">
                  <h4 className="font-semibold mb-2">🎯 Objetivo:</h4>
                  <p className="text-sm">
                    Aumentar o <strong>grau de multiprogramação</strong>, permitindo mais processos
                    ativos do que a RAM suporta, movendo processos bloqueados ou inativos para o disco.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Como Funciona */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <RefreshCw className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Como Funciona</h2>
                  <p className="text-muted-foreground">Swap Out e Swap In</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <ArrowRight className="size-5 text-red-500 rotate-90" />
                        Swap Out (RAM → Disco)
                      </h4>
                      <ol className="space-y-3 text-sm list-decimal list-inside">
                        <li>SO seleciona processo inativo</li>
                        <li>Salva contexto (PCB, registradores)</li>
                        <li>Copia todo espaço de endereçamento para swap</li>
                        <li>Libera memória física</li>
                        <li>Marca processo como "swapped out"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-background/50 rounded text-xs">
                        <strong>Critério:</strong> Processo bloqueado em I/O, baixa prioridade, ou suspenso.
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <ArrowRight className="size-5 text-green-500 -rotate-90" />
                        Swap In (Disco → RAM)
                      </h4>
                      <ol className="space-y-3 text-sm list-decimal list-inside">
                        <li>SO detecta processo precisa executar</li>
                        <li>Aloca memória física (pode swap out outro)</li>
                        <li>Copia todo espaço de endereçamento do swap</li>
                        <li>Restaura contexto (PCB, registradores)</li>
                        <li>Marca processo como "pronto"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-background/50 rounded text-xs">
                        <strong>Trigger:</strong> I/O completou, alta prioridade, ou schedulado.
                      </div>
                    </Card>
                  </motion.div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Exemplo Visual:</h4>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                    <pre className="text-sm font-mono leading-relaxed"><code>{`┌─────────────────────┐          ┌─────────────────────┐
│   RAM (Física)      │          │   Disco (Swap)      │
├─────────────────────┤          ├─────────────────────┤
│ Processo A (4 MB)   │ ◄─────── │ Swap Area (128 MB)  │
│ Processo B (8 MB)   │          │                     │
│ Processo C (6 MB)   │ ───────► │ Processo D (10 MB)  │
│ [ LIVRE ] (2 MB)    │          │ Processo E (12 MB)  │
│ ...                 │          │ ...                 │
└─────────────────────┘          └─────────────────────┘
    Total: 20 MB                    Total: 128 MB

Processo D precisa executar → Swap In
Swap Out C (6 MB) → Swap In D (10 MB) → Requer 4 MB extras!`}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Swap Space */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <HardDrive className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Swap Space</h2>
                  <p className="text-muted-foreground">Área dedicada no disco</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  O <strong>Swap Space</strong> é uma partição ou arquivo dedicado
                  no disco para armazenar páginas/processos removidos da RAM.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Tipos de Swap:</h3>

                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold mb-3">1. Swap Partition (Linux)</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`# Ver swap ativo
$ swapon --show
NAME      TYPE      SIZE   USED PRIO
/dev/sda2 partition 8G     1.2G    -2

# Criar nova partição swap
$ sudo mkswap /dev/sdb1
$ sudo swapon /dev/sdb1

# /etc/fstab (permanente)
/dev/sdb1  none  swap  sw  0  0`}</code></pre>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Vantagem:</strong> Mais rápido (sem overhead de filesystem)
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800">
                    <h4 className="font-semibold mb-3">2. Swap File (Windows/Linux)</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`# Linux: Criar arquivo swap de 4GB
$ sudo fallocate -l 4G /swapfile
$ sudo chmod 600 /swapfile
$ sudo mkswap /swapfile
$ sudo swapon /swapfile

# Windows: pagefile.sys (configurado automaticamente)
C:\\pagefile.sys  (16 GB típico)`}</code></pre>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Vantagem:</strong> Flexível, fácil redimensionar
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="size-5 text-amber-500" />
                    Tamanho Recomendado
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>RAM &lt; 2 GB:</strong> Swap = 2× RAM</li>
                    <li>• <strong>RAM 2-8 GB:</strong> Swap = RAM</li>
                    <li>• <strong>RAM &gt; 8 GB:</strong> Swap = 4-8 GB (ou hibernação = RAM)</li>
                    <li>• <strong>Servidores:</strong> 4-8 GB (emergência apenas)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Performance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <TrendingDown className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Impacto na Performance</h2>
                  <p className="text-muted-foreground">Por que swap é lento</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Custos de Swapping:</h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold bg-muted/50">Operação</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Tamanho</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">HDD</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">SSD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">Swap Out</td>
                        <td className="p-3 font-mono">10 MB</td>
                        <td className="p-3 font-mono">~100 ms</td>
                        <td className="p-3 font-mono">~10 ms</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">Swap In</td>
                        <td className="p-3 font-mono">10 MB</td>
                        <td className="p-3 font-mono">~100 ms</td>
                        <td className="p-3 font-mono">~10 ms</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-semibold">Total (Round-trip)</td>
                        <td className="p-3 font-mono">10 MB</td>
                        <td className="p-3 font-mono text-red-600">~200 ms</td>
                        <td className="p-3 font-mono text-amber-600">~20 ms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-amber-500/10 border-2 border-red-500/30 mt-6">
                  <h4 className="font-semibold mb-3">🐌 Problema:</h4>
                  <p className="text-sm">
                    Um único swap in/out de <strong>10 MB</strong> leva <strong>200 ms</strong> (HDD),
                    o tempo de <strong>200.000</strong> acessos à RAM! 
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Solução Moderna:</strong> Paginação sob demanda (swap apenas páginas, não processos inteiros).
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Código: Monitorar Swap (Linux)</h4>
                  <CodeBlock language="bash">{`# Ver uso de swap em tempo real
$ vmstat 1
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 3891024  52992 1058428   0    0     0     0  142  289  1  0 99  0  0

# si = swap in (KB/s)
# so = swap out (KB/s)

# Se si/so > 0 constantemente → THRASHING! 🔥`}</CodeBlock>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/page-fault" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Page Fault
            </a>
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2">
              Voltar ao Hub <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

