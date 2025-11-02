"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  Layers,
  Zap,
  Users,
  TrendingUp,
  Cpu,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Info,
  Lightbulb,
  HardDrive,
  AlertTriangle
} from "lucide-react";

export default function PaginacaoAvancadaPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Subtle animated gradient blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
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
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Layers className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Paginação Avançada
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Huge Pages, Copy-on-Write, Memory-Mapped Files, NUMA e mais
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Huge Pages
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="size-3 mr-1" /> Copy-on-Write
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <HardDrive className="size-3 mr-1" /> mmap
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Cpu className="size-3 mr-1" /> NUMA
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* 1. Huge Pages / Transparent Huge Pages */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-orange-500/5 border-2 border-orange-500/10 relative overflow-hidden">
              {/* Subtle glow effect */}
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-orange-500/10 border-2 border-orange-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap className="size-6 text-orange-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Huge Pages & THP</h2>
                    <p className="text-muted-foreground">Páginas grandes para reduzir overhead</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-orange-600 dark:text-orange-400">Huge Pages</strong> são páginas de memória
                      muito maiores que os 4 KB padrão (geralmente 2 MB ou 1 GB), reduzindo drasticamente
                      o número de entradas na tabela de páginas e TLB misses.
                    </p>

                    <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 my-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referências Acadêmicas:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Gorman, M. - <em>&ldquo;Understanding the Linux Virtual Memory Manager&rdquo;</em> (2004)</li>
                        <li>• Navarro, J. et al. - <em>&ldquo;Practical Transparent Operating System Support for Superpages&rdquo;</em> (2002)</li>
                        <li>• Linux Kernel Documentation - <code className="text-xs">Documentation/vm/hugetlbpage.rst</code></li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
                      <TrendingUp className="size-5 text-orange-500" />
                      Comparação: Normal vs Huge Pages
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left p-3 font-semibold bg-muted/50">Métrica</th>
                            <th className="text-left p-3 font-semibold bg-blue-100 dark:bg-blue-950/30">Páginas 4 KB</th>
                            <th className="text-left p-3 font-semibold bg-orange-100 dark:bg-orange-950/30">Huge Pages 2 MB</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-medium">Memória 1 GB</td>
                            <td className="p-3">262.144 páginas</td>
                            <td className="p-3 text-green-600 dark:text-green-400 font-semibold">512 páginas</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-medium">Entradas na Tabela</td>
                            <td className="p-3">262.144 × 8 B = 2 MB</td>
                            <td className="p-3 text-green-600 dark:text-green-400 font-semibold">512 × 8 B = 4 KB</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-medium">TLB Entries</td>
                            <td className="p-3">~64 (cobre 256 KB)</td>
                            <td className="p-3 text-green-600 dark:text-green-400 font-semibold">~64 (cobre 128 MB!)</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-medium">TLB Miss Rate</td>
                            <td className="p-3">Alto (~10-20%)</td>
                            <td className="p-3 text-green-600 dark:text-green-400 font-semibold">Baixo (~1-2%)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Transparent Huge Pages (THP)</h3>

                    <p className="leading-relaxed">
                      O Linux implementa <strong>THP</strong> para automaticamente promover páginas
                      de 4 KB para 2 MB quando possível, sem modificação nas aplicações.
                    </p>

                    <div className="mt-4">
                      <CodeBlock language="bash">{`# Verificar status THP
cat /sys/kernel/mm/transparent_hugepage/enabled
# [always] madvise never

# Estatísticas THP
cat /proc/meminfo | grep -i huge
AnonHugePages:    204800 kB
ShmemHugePages:        0 kB
HugePages_Total:       0
HugePages_Free:        0`}</CodeBlock>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6 not-prose">
                      <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                        <Card className="p-5 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle className="size-5" />
                            Vantagens
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>Reduz TLB misses em 512x</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>Menos overhead de tabela</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>Melhor para workloads grandes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>Transparente para apps</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                        <Card className="p-5 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
                            <Info className="size-5" />
                            Desvantagens
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              <span>Fragmentação interna maior</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              <span>Alocação mais difícil</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              <span>Swap pode ser mais lento</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              <span>Não ideal para apps pequenos</span>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 2. Copy-on-Write (COW) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5 border-2 border-cyan-500/10 relative overflow-hidden">
              <motion.div
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/20"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Users className="size-6 text-cyan-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Copy-on-Write (COW)</h2>
                    <p className="text-muted-foreground">Otimização de fork() e memória compartilhada</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-cyan-600 dark:text-cyan-400">Copy-on-Write</strong> é uma técnica
                      de otimização onde páginas são compartilhadas até que um processo tente modificá-las,
                      momento em que uma cópia é feita.
                    </p>

                    <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 my-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referências Acadêmicas:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (4th ed.), Cap. 3.3.3</li>
                        <li>• Silberschatz, A. et al. - <em>Operating System Concepts</em> (10th ed.), Cap. 9.4</li>
                        <li>• McKusick, M. K. - <em>&ldquo;The Design and Implementation of the FreeBSD OS&rdquo;</em></li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Fluxo COW em fork()</h3>

                    <div className="space-y-4">
                      {[
                        {
                          step: 1,
                          title: "Fork Inicial",
                          desc: "Pai e filho compartilham todas as páginas, marcadas como read-only",
                          code: `parent: page 0 → frame 100 (R)
child:  page 0 → frame 100 (R)
// Mesma frame, ambos read-only`
                        },
                        {
                          step: 2,
                          title: "Tentativa de Escrita",
                          desc: "Filho tenta escrever → page fault (proteção violada)",
                          code: `child writes to page 0
→ Page Fault (write to read-only)`
                        },
                        {
                          step: 3,
                          title: "Copy-on-Write",
                          desc: "SO copia página, atualiza tabelas, ambos agora RW",
                          code: `// SO duplica página
parent: page 0 → frame 100 (RW)
child:  page 0 → frame 250 (RW)
// Agora separadas`
                        }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.step}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Card className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                                  {item.step}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                                <pre className="text-xs bg-background/50 p-3 rounded border overflow-x-auto"><code>{item.code}</code></pre>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 mt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="size-5 text-green-500" />
                        Benefício Real
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Se após <code className="bg-muted px-2 py-0.5 rounded text-xs">fork()</code> o filho
                        chamar <code className="bg-muted px-2 py-0.5 rounded text-xs">exec()</code>,
                        <strong> nenhuma página é copiada</strong>, economizando tempo e memória.
                        Apenas páginas realmente modificadas são duplicadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 3. Memory-Mapped Files (mmap) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-teal-500/5 border-2 border-teal-500/10 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"
                animate={{ 
                  x: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-teal-500/10 border-2 border-teal-500/20"
                    whileHover={{ scale: 1.05, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <HardDrive className="size-6 text-teal-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">Memory-Mapped Files (mmap)</h2>
                    <p className="text-muted-foreground">Mapear arquivos diretamente na memória virtual</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-teal-600 dark:text-teal-400">Memory-mapped files</strong> permitem
                      acessar arquivos como se fossem parte da memória virtual, eliminando chamadas read()/write()
                      e melhorando performance.
                    </p>

                    <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 my-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referências Acadêmicas:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em>, Cap. 3.3.5</li>
                        <li>• McKusick, M. K. - <em>&ldquo;The Design and Implementation of BSD OS&rdquo;</em></li>
                        <li>• POSIX.1-2017 - <code className="text-xs">mmap(2)</code> specification</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Como Funciona</h3>

                    <div className="space-y-4">
                      {[
                        {
                          num: 1,
                          title: "mmap() Syscall",
                          desc: "Processo chama mmap(), SO reserva região virtual",
                          code: `void *addr = mmap(NULL, size, PROT_READ|PROT_WRITE,
                 MAP_SHARED, fd, 0);
// Retorna endereço virtual, páginas não carregadas ainda`
                        },
                        {
                          num: 2,
                          title: "Lazy Loading",
                          desc: "Páginas não são carregadas imediatamente (demand paging)",
                          code: `// Primeira leitura de página → Page Fault
char c = addr[0];
// SO carrega página do arquivo para RAM`
                        },
                        {
                          num: 3,
                          title: "Acesso Direto",
                          desc: "Leitura/escrita via ponteiro, sem read()/write()",
                          code: `// Leitura direta
int value = *((int*)addr);

// Escrita direta (MAP_SHARED → persiste no arquivo)
*((int*)addr) = 42;`
                        },
                        {
                          num: 4,
                          title: "Sync & Unmap",
                          desc: "msync() para forçar escrita, munmap() para liberar",
                          code: `// Forçar flush para disco
msync(addr, size, MS_SYNC);

// Liberar mapeamento
munmap(addr, size);`
                        }
                      ].map((step, idx) => (
                        <motion.div
                          key={step.num}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <Card className="p-5 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-teal-200 dark:border-teal-800">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                                  {step.num}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2">{step.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
                                <CodeBlock language="c">{step.code}</CodeBlock>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Vantagens vs read()/write()</h3>

                    <div className="grid md:grid-cols-2 gap-6 not-prose">
                      <motion.div whileHover={{ scale: 1.02, y: -3 }} transition={{ duration: 0.2 }}>
                        <Card className="p-6 h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
                            <CheckCircle className="size-5" />
                            mmap()
                          </h4>
                          <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                              <Zap className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <strong>Zero-copy:</strong> Dados vão do disco direto para página
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <Zap className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <strong>Demand paging:</strong> Carrega apenas páginas acessadas
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <Zap className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <strong>Compartilhamento:</strong> Múltiplos processos, uma cópia
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <Zap className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <strong>Simplifica código:</strong> Acesso via ponteiro
                              </div>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02, y: -3 }} transition={{ duration: 0.2 }}>
                        <Card className="p-6 h-full bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-2 border-orange-200 dark:border-orange-800">
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-orange-700 dark:text-orange-400">
                            <Info className="size-5" />
                            read()/write()
                          </h4>
                          <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <div>
                                <strong>Cópia dupla:</strong> Disco → Buffer kernel → User space
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <div>
                                <strong>Eager loading:</strong> Lê tudo que você pediu
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <div>
                                <strong>Não compartilha:</strong> Cada processo tem cópia
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <div>
                                <strong>Syscalls overhead:</strong> Muitas chamadas ao kernel
                              </div>
                            </li>
                          </ul>
                        </Card>
                      </motion.div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-2 border-teal-500/30 mt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="size-5 text-teal-500" />
                        Performance Real
                      </h4>
                      <p className="text-sm leading-relaxed mb-3">
                        Em testes com arquivos grandes (1 GB+), <strong>mmap() pode ser 2-5x mais rápido</strong> que
                        read()/write(), especialmente em acessos aleatórios e quando múltiplos processos acessam o mesmo arquivo.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Use cases ideais:</strong> Bancos de dados, editores de imagem/vídeo, compiladores,
                        servidores web (servir arquivos estáticos).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 4. NUMA (Non-Uniform Memory Access) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-pink-500/5 border-2 border-pink-500/10 relative overflow-hidden">
              <motion.div
                className="absolute -bottom-10 right-1/4 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl"
                animate={{ 
                  y: [-10, 10, -10],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="p-3 rounded-xl bg-pink-500/10 border-2 border-pink-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Cpu className="size-6 text-pink-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">NUMA (Non-Uniform Memory Access)</h2>
                    <p className="text-muted-foreground">Arquiteturas multiprocessador modernas</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      Em sistemas <strong className="text-pink-600 dark:text-pink-400">NUMA</strong>, cada CPU
                      tem memória RAM &ldquo;local&rdquo; de acesso rápido, mas pode acessar memória &ldquo;remota&rdquo;
                      de outras CPUs (mais lento).
                    </p>

                    <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 my-6">
                      <p className="text-sm mb-2">
                        <strong className="flex items-center gap-2">
                          <BookOpen className="size-4" />
                          Referências Acadêmicas:
                        </strong>
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Lameter, C. - <em>&ldquo;NUMA (Non-Uniform Memory Access): An Overview&rdquo;</em> (2013)</li>
                        <li>• Dashti, M. et al. - <em>&ldquo;Traffic Management: A Holistic Approach to Memory Placement on NUMA Systems&rdquo;</em> (ASPLOS 2013)</li>
                        <li>• Linux Kernel Documentation - <code className="text-xs">Documentation/vm/numa.rst</code></li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Arquitetura NUMA</h3>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-2 border-pink-200 dark:border-pink-800">
                      <pre className="text-sm font-mono leading-relaxed"><code>{`        [Node 0]              [Node 1]
        ┌─────────┐           ┌─────────┐
        │ CPU 0-7 │           │ CPU 8-15│
        └────┬────┘           └────┬────┘
             │                     │
        ┌────▼────┐           ┌───▼─────┐
        │ RAM 0   │           │ RAM 1   │
        │ 64 GB   │◄─────────►│ 64 GB   │
        └─────────┘  Intercon. └─────────┘
           Local                 Remote
         (100ns)                (200ns)`}</code></pre>
                      <p className="text-sm text-muted-foreground mt-4">
                        CPU 0 acessa RAM 0 em <strong>100 ns</strong> (local),
                        mas RAM 1 em <strong>200 ns</strong> (remoto via interconnect).
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">NUMA-aware Page Placement</h3>

                    <p className="leading-relaxed">
                      O SO deve alocar páginas no <strong>nó NUMA mais próximo</strong> da CPU que as usa,
                      minimizando acessos remotos.
                    </p>

                    <div className="overflow-x-auto mt-4">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left p-3 font-semibold bg-muted/50">Política</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Descrição</th>
                            <th className="text-left p-3 font-semibold bg-muted/50">Quando Usar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">LOCAL</td>
                            <td className="p-3">Aloca no nó atual</td>
                            <td className="p-3">Thread sempre na mesma CPU</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">INTERLEAVE</td>
                            <td className="p-3">Distribui entre nós</td>
                            <td className="p-3">Acesso uniforme, múltiplas CPUs</td>
                          </tr>
                          <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">BIND</td>
                            <td className="p-3">Força nó específico</td>
                            <td className="p-3">Controle manual</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="p-3 font-mono">PREFERRED</td>
                            <td className="p-3">Preferir nó, fallback ok</td>
                            <td className="p-3">Sugestão, não obrigatória</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6">
                      <CodeBlock language="bash">{`# Ver topologia NUMA
numactl --hardware
available: 2 nodes (0-1)
node 0 cpus: 0 1 2 3 4 5 6 7
node 0 size: 65536 MB
node 1 cpus: 8 9 10 11 12 13 14 15
node 1 size: 65536 MB
node distances:
node   0   1 
  0:  10  20
  1:  20  10

# Executar com política
numactl --cpunodebind=0 --membind=0 ./app
# CPU e memória no nó 0`}</CodeBlock>
                    </div>

                    <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mt-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="size-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">Impacto na Performance</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <strong>Má colocação NUMA</strong> pode degradar performance em <strong>30-50%</strong>!
                            Aplicações de alto desempenho (HPC, bancos de dados) devem ser NUMA-aware.
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Solução:</strong> Use <code className="bg-muted px-2 py-0.5 rounded text-xs">numactl</code>,
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">mbind()</code>,
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">set_mempolicy()</code> para controle fino.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao" className="text-primary hover:underline flex items-center gap-2 group">
              <motion.span
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              Voltar para Paginação
            </a>
            <a href="/os/memoria/paginacao/exercicios" className="text-primary hover:underline flex items-center gap-2 group">
              Exercícios
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

