"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Clock,
  Grid3x3,
  RefreshCw
} from "lucide-react";

export default function LocalidadePage() {
  const [accessPattern, setAccessPattern] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Simular acessos sequenciais (localidade espacial)
  const simulateSequential = () => {
    setIsRunning(true);
    const pattern: number[] = [];
    for (let i = 0; i < 20; i++) {
      pattern.push(i);
    }
    setAccessPattern(pattern);
    setTimeout(() => setIsRunning(false), 100);
  };

  // Simular loop (localidade temporal)
  const simulateLoop = () => {
    setIsRunning(true);
    const pattern: number[] = [];
    for (let i = 0; i < 10; i++) {
      pattern.push(5, 6, 7, 8); // Mesmo conjunto repetido
    }
    setAccessPattern(pattern);
    setTimeout(() => setIsRunning(false), 100);
  };

  // Simular acesso aleatório (SEM localidade)
  const simulateRandom = () => {
    setIsRunning(true);
    const pattern: number[] = [];
    for (let i = 0; i < 20; i++) {
      pattern.push(Math.floor(Math.random() * 100));
    }
    setAccessPattern(pattern);
    setTimeout(() => setIsRunning(false), 100);
  };

  // Calcular working set (páginas únicas nos últimos N acessos)
  const workingSetWindow = 8;
  const workingSet = useMemo(() => {
    if (accessPattern.length === 0) return new Set<number>();
    const lastN = accessPattern.slice(-workingSetWindow);
    return new Set<number>(lastN);
  }, [accessPattern]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute -bottom-20 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 20,
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
              whileHover={{ scale: 1.05, rotate: -10 }}
            >
              <Activity className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Localidade de Referência
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Princípio fundamental para performance: temporal e espacial
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Clock className="size-3 mr-1" /> Temporal
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Grid3x3 className="size-3 mr-1" /> Espacial
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="size-3 mr-1" /> Working Set
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Princípio da Localidade */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-emerald-500/5 border-2 border-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20">
                  <BookOpen className="size-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O Princípio</h2>
                  <p className="text-muted-foreground">Base para cache, memória virtual e performance</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Em <strong>determinados momentos</strong>, os acessos a instruções e dados
                  se <strong>concentram em uma região</strong> do espaço de endereçamento.
                  Este fenômeno é chamado de <strong className="text-emerald-600 dark:text-emerald-400">Localidade de Referência</strong>.
                </p>

                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 my-6">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Referências:
                    </strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (3ª ed.), Cap. 3.4</li>
                    <li>• Denning, P. J. - &ldquo;Working Sets Past and Present&rdquo; (IEEE Trans., 1980)</li>
                    <li>• Material da Professora (PDF 03 - Memória Virtual)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Por que isso acontece?</h3>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold mb-3 text-lg">📋 Estrutura dos Programas</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span><strong>Loops:</strong> Executam mesmas instruções repetidamente</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span><strong>Funções:</strong> Chamadas frequentes a rotinas comuns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span><strong>Sequências:</strong> Instruções uma após a outra</span>
                        </li>
                      </ul>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold mb-3 text-lg">💾 Estrutura dos Dados</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500">•</span>
                          <span><strong>Arrays:</strong> Elementos adjacentes na memória</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500">•</span>
                          <span><strong>Structs:</strong> Campos próximos fisicamente</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500">•</span>
                          <span><strong>Stack:</strong> Variáveis locais juntas</span>
                        </li>
                      </ul>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Localidade Temporal */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
                  <Clock className="size-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Localidade Temporal</h2>
                  <p className="text-muted-foreground">Se foi acessado agora, será acessado novamente em breve</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  <strong>Definição:</strong> Se um item foi referenciado, há grande probabilidade
                  de ser referenciado novamente em um futuro próximo.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Exemplos Clássicos:</h3>

                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-3">1. Loop Simples</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`for (int i = 0; i < 1000; i++) {
    sum += array[i];  // Instrução 'sum += array[i]' executada 1000x
}
// Variável 'sum' acessada 1000 vezes!
// Variável 'i' acessada 1000 vezes!`}</code></pre>
                    <p className="text-sm mt-3 text-muted-foreground">
                      As mesmas instruções e variáveis são referenciadas repetidamente.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
                    <h4 className="font-semibold mb-3">2. Função Frequente</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`int factorial(int n) {  // Função recursiva
    if (n <= 1) return 1;
    return n * factorial(n-1);  // Chama a si mesma múltiplas vezes
}

factorial(10);  // 10 chamadas à mesma função!`}</code></pre>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Código da função é carregado uma vez e usado múltiplas vezes.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="size-5 text-blue-500" />
                    Impacto na Performance
                  </h4>
                  <p className="text-sm">
                    <strong>Cache L1/L2/L3</strong> explora localidade temporal mantendo dados
                    recentemente acessados. <strong>Hit rate típico: 95-99%!</strong>
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Localidade Espacial */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <Grid3x3 className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Localidade Espacial</h2>
                  <p className="text-muted-foreground">Se acessou X, provavelmente acessará X+1, X+2...</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">
                  <strong>Definição:</strong> Se um item foi referenciado, há grande probabilidade
                  de referenciar itens <strong>próximos</strong> na memória.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Exemplos Clássicos:</h3>

                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold mb-3">1. Percorrer Array</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`int arr[100];
for (int i = 0; i < 100; i++) {
    arr[i] = i * 2;  // Acessa arr[0], arr[1], arr[2]... sequencialmente
}
// Elementos adjacentes na memória!`}</code></pre>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Se <code>arr[5]</code> está na memória, <code>arr[6]</code> e <code>arr[7]</code> provavelmente também estão.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800">
                    <h4 className="font-semibold mb-3">2. Instruções Sequenciais</h4>
                    <pre className="text-sm bg-background/50 p-4 rounded border overflow-x-auto"><code>{`int x = 10;       // Endereço 0x1000
int y = 20;       // Endereço 0x1004
int z = x + y;    // Endereço 0x1008
return z;         // Endereço 0x100C

// Instruções próximas fisicamente na memória!`}</code></pre>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Execução sequencial → busca próximas instruções antecipadamente (prefetching).
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="size-5 text-purple-500" />
                    Impacto na Performance
                  </h4>
                  <p className="text-sm">
                    <strong>Cache lines</strong> (64 bytes) trazem múltiplos dados adjacentes de uma vez.
                    <strong>Prefetching de hardware</strong> detecta padrões sequenciais e antecipa acessos.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Simulador Interativo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/20">
                  <Activity className="size-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Simulador de Acessos</h2>
                  <p className="text-muted-foreground">Visualize diferentes padrões</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={simulateSequential} disabled={isRunning} className="flex-1 sm:flex-none">
                    <Grid3x3 className="size-4 mr-2" />
                    Sequencial (Espacial)
                  </Button>
                  <Button onClick={simulateLoop} disabled={isRunning} className="flex-1 sm:flex-none">
                    <RefreshCw className="size-4 mr-2" />
                    Loop (Temporal)
                  </Button>
                  <Button onClick={simulateRandom} disabled={isRunning} variant="outline" className="flex-1 sm:flex-none">
                    Aleatório (Sem Localidade)
                  </Button>
                </div>

                {accessPattern.length > 0 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold mb-3">Padrão de Acesso:</h4>
                      <div className="flex flex-wrap gap-2">
                        {accessPattern.map((page, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm"
                          >
                            {page}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-background border">
                        <h4 className="font-semibold mb-2">Working Set (Δ={workingSetWindow}):</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(workingSet).sort((a, b) => a - b).map((page: number) => (
                            <Badge key={page} className="bg-green-500/20 text-green-600">
                              {page}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {workingSet.size} páginas únicas nos últimos {workingSetWindow} acessos
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background border">
                        <h4 className="font-semibold mb-2">Estatísticas:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total de Acessos:</span>
                            <Badge>{accessPattern.length}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Páginas Únicas:</span>
                            <Badge>{new Set(accessPattern).size}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de Reúso:</span>
                            <Badge className="bg-blue-500/20 text-blue-600">
                              {((1 - new Set(accessPattern).size / accessPattern.length) * 100).toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/multinivel" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Multinível
            </a>
            <a href="/os/memoria/paginacao/page-fault" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Page Fault <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

