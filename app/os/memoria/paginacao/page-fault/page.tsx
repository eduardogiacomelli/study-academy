"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock,
  HardDrive,
  RefreshCw,
  Zap
} from "lucide-react";

export default function PageFaultPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const pageFaultSteps = [
    {
      title: "1. Instrução Causa Fault",
      desc: "CPU tenta acessar página não presente (bit P=0)",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      title: "2. Hardware Gera Trap",
      desc: "MMU detecta P=0 e gera exceção para SO",
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "3. SO Salva Contexto",
      desc: "Estado do processo é preservado",
      icon: HardDrive,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "4. Identifica Página",
      desc: "SO analisa endereço virtual e tabela de páginas",
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "5. Busca no Disco",
      desc: "Localiza página no swap ou arquivo",
      icon: HardDrive,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "6. Encontra Quadro Livre",
      desc: "Aloca frame físico (ou substitui página)",
      icon: RefreshCw,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      title: "7. Carrega Página",
      desc: "DMA copia dados do disco para RAM",
      icon: ArrowRight,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
    {
      title: "8. Atualiza PTE e Reinicia",
      desc: "Bit P=1, reinicia instrução que causou fault",
      icon: Zap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= pageFaultSteps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setCurrentStep(step);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
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
              whileHover={{ scale: 1.05, rotate: 15 }}
            >
              <AlertTriangle className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Page Fault
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Como o SO trata acessos a páginas não presentes na memória
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Clock className="size-3 mr-1" /> 8 Passos
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <HardDrive className="size-3 mr-1" /> Demand Paging
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Major vs Minor
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* O que é Page Fault */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-red-500/5 border-2 border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 border-2 border-red-500/20">
                  <BookOpen className="size-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">O que é Page Fault?</h2>
                  <p className="text-muted-foreground">Exceção gerada quando página não está na RAM</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Um <strong className="text-red-600 dark:text-red-400">Page Fault</strong> ocorre quando
                  a CPU tenta acessar uma página virtual que <strong>não está</strong> mapeada na memória física.
                </p>

                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 my-6">
                  <p className="text-sm mb-2">
                    <strong className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      Referências:
                    </strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tanenbaum, A. S. - <em>Modern Operating Systems</em> (3ª ed.), Cap. 3.4</li>
                    <li>• Silberschatz et al. - <em>Operating System Concepts</em> (10ª ed.), Cap. 10</li>
                    <li>• Material da Professora (PDF 03 - Memória Virtual)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Tipos de Page Fault:</h3>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <HardDrive className="size-5 text-amber-500" />
                        Minor Page Fault
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          <span>Página já está na memória física</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          <span>Apenas atualizar tabela de páginas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          <span><strong>Rápido:</strong> ~1 µs</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-background/50 rounded text-xs">
                        <strong>Exemplo:</strong> Página compartilhada entre processos, ou cache de disco.
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <AlertTriangle className="size-5 text-red-500" />
                        Major Page Fault
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span>Página está no disco (swap ou arquivo)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span>Requer I/O lento do disco</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span><strong>Lento:</strong> ~5-10 ms (HDD) ou ~0.1 ms (SSD)</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-background/50 rounded text-xs">
                        <strong>Exemplo:</strong> Primeira vez acessando página, ou página foi swapped out.
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Animação dos 8 Passos */}
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
                  <h2 className="text-3xl font-bold">Tratamento Passo-a-Passo</h2>
                  <p className="text-muted-foreground">Os 8 passos do Page Fault Handler</p>
                </div>
              </div>

              <div className="space-y-6">
                <Button onClick={animate} disabled={isAnimating} className="w-full md:w-auto">
                  <RefreshCw className={`size-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
                  {isAnimating ? "Animando..." : "Animar Sequência"}
                </Button>

                <div className="grid gap-4">
                  {pageFaultSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx === currentStep && isAnimating;
                    const isPast = idx < currentStep || !isAnimating;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0.5, scale: 0.98 }}
                        animate={{
                          opacity: isActive ? 1 : isPast ? 0.8 : 0.5,
                          scale: isActive ? 1.02 : 1,
                          borderColor: isActive ? `rgb(59 130 246)` : undefined
                        }}
                        transition={{ duration: 0.3 }}
                        className={`p-6 rounded-xl border-2 ${
                          isActive
                            ? "border-blue-500 shadow-lg"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${step.bgColor} flex-shrink-0`}>
                            <Icon className={`size-6 ${step.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex-shrink-0"
                            >
                              <Badge className="bg-blue-500 text-white">EXECUTANDO</Badge>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Código do Handler */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20">
                  <BookOpen className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Código do Handler (Linux)</h2>
                  <p className="text-muted-foreground">Simplificado do kernel Linux</p>
                </div>
              </div>

              <div className="space-y-4">
                <CodeBlock language="c">{`// mm/memory.c - Tratamento de page fault no Linux (simplificado)

static vm_fault_t do_page_fault(struct vm_fault *vmf) {
    struct vm_area_struct *vma = vmf->vma;
    struct page *page;
    unsigned long address = vmf->address;
    
    // 1. Verificar permissões
    if (vmf->flags & FAULT_FLAG_WRITE) {
        if (!(vma->vm_flags & VM_WRITE))
            return VM_FAULT_SIGSEGV;  // Segmentation fault
    }
    
    // 2. Tentar alocar página física
    page = alloc_page(GFP_HIGHUSER_MOVABLE);
    if (!page)
        return VM_FAULT_OOM;  // Out of memory
    
    // 3. Copy-on-Write (se necessário)
    if (vmf->flags & FAULT_FLAG_WRITE && vma_is_anonymous(vma)) {
        // Copiar página compartilhada
        copy_user_highpage(page, vmf->orig_pte_page, address, vma);
    } else {
        // 4. Carregar do disco (swap ou arquivo)
        if (vma->vm_file) {
            // Memory-mapped file
            vma->vm_ops->fault(vmf);
        } else if (PageSwapCache(vmf->orig_pte_page)) {
            // Swap in
            swap_readpage(page, false);
        } else {
            // Página zerada (BSS, stack, heap)
            clear_user_highpage(page, address);
        }
    }
    
    // 5. Atualizar tabela de páginas
    set_pte_at(vma->vm_mm, address, vmf->pte, 
               mk_pte(page, vma->vm_page_prot));
    
    // 6. Adicionar ao LRU (algoritmo substituição)
    lru_cache_add_active_or_unevictable(page, vma);
    
    return 0;  // Sucesso
}`}</CodeBlock>

                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold mb-2">Pontos-Chave:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <code>VM_FAULT_SIGSEGV</code>: Acesso inválido → SEGFAULT</li>
                    <li>• <code>VM_FAULT_OOM</code>: Memória esgotada → OOM Killer</li>
                    <li>• <code>copy_user_highpage</code>: Copy-on-Write</li>
                    <li>• <code>swap_readpage</code>: Carrega do swap (I/O síncrono)</li>
                    <li>• <code>lru_cache_add</code>: Adiciona à fila LRU</li>
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
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20">
                  <Zap className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Impacto na Performance</h2>
                  <p className="text-muted-foreground">Custos reais de page faults</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left p-3 font-semibold bg-muted/50">Evento</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Latência</th>
                        <th className="text-left p-3 font-semibold bg-muted/50">Impacto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">Acesso RAM (cache hit)</td>
                        <td className="p-3 font-mono">~1-10 ns</td>
                        <td className="p-3">✅ Ideal</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">TLB miss + RAM</td>
                        <td className="p-3 font-mono">~100-200 ns</td>
                        <td className="p-3">✅ OK</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">Minor page fault</td>
                        <td className="p-3 font-mono">~1 µs</td>
                        <td className="p-3">⚠️ Aceitável</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3">Major page fault (SSD)</td>
                        <td className="p-3 font-mono">~100 µs</td>
                        <td className="p-3">🐌 Lento</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3">Major page fault (HDD)</td>
                        <td className="p-3 font-mono">~5-10 ms</td>
                        <td className="p-3">❌ MUITO Lento</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border-2 border-amber-500/30 mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="size-5 text-amber-500" />
                    Cálculo de Overhead
                  </h4>
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Exemplo:</strong> Programa com 1000 acessos à memória
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• 995 hits (99.5%): 995 × 10 ns = <strong>10 µs</strong></li>
                      <li>• 5 major faults (0.5%): 5 × 5 ms = <strong>25 ms</strong></li>
                      <li>• <strong>Total: 25 ms</strong> (2500x mais lento!)</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Conclusão:</strong> Mesmo poucos page faults <strong>destroem</strong> a performance!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/paginacao/localidade" className="text-primary hover:underline flex items-center gap-2">
              ← Voltar para Localidade
            </a>
            <a href="/os/memoria/paginacao/swapping" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Swapping <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

