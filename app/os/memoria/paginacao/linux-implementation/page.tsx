"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { CodeBlock } from "@/components/shared/CodeBlock";
import {
  Terminal,
  FileCode,
  Layers,
  Cpu,
  HardDrive,
  Binary,
  Book,
  ExternalLink,
  Lightbulb,
  AlertCircle
} from "lucide-react";

export default function LinuxImplementationPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />

      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0">
          {/* Terminal grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-full inline-flex mb-4 bg-white/10 backdrop-blur-sm">
              <Terminal className="size-8" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🐧 Paginação no Linux
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Como o kernel Linux implementa gerenciamento de memória virtual
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/10 text-white">
                <FileCode className="size-3 mr-1" /> C
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white">
                <Cpu className="size-3 mr-1" /> x86-64
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white">
                <Layers className="size-3 mr-1" /> 4-Level PT
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white">
                <HardDrive className="size-3 mr-1" /> mm/
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Introdução */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Lightbulb className="size-6 text-blue-400" />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl font-bold">Visão Geral</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O Linux implementa um sistema sofisticado de memória virtual usando paginação em 4 níveis
                    (5 níveis em sistemas mais recentes com Intel 5-Level Paging). O código está principalmente
                    em <code className="bg-muted px-2 py-1 rounded text-sm">mm/memory.c</code>,{" "}
                    <code className="bg-muted px-2 py-1 rounded text-sm">mm/mmap.c</code> e{" "}
                    <code className="bg-muted px-2 py-1 rounded text-sm">arch/x86/mm/</code>.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-background/50 border">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Layers className="size-4 text-primary" />
                        Arquitetura x86-64
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• PGD - Page Global Directory</li>
                        <li>• P4D - Page 4th Directory</li>
                        <li>• PUD - Page Upper Directory</li>
                        <li>• PMD - Page Middle Directory</li>
                        <li>• PTE - Page Table Entry</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-background/50 border">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <HardDrive className="size-4 text-primary" />
                        Tamanhos Suportados
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• 4 KB - Padrão (normal pages)</li>
                        <li>• 2 MB - Huge pages (PMD)</li>
                        <li>• 1 GB - Huge pages (PUD)</li>
                        <li>• Transparent Huge Pages (THP)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Estruturas de Dados do Kernel */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Binary className="size-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Estruturas Principais do Kernel</h2>
                  <p className="text-muted-foreground">De <code>include/linux/mm_types.h</code></p>
                </div>
              </div>

              <div className="space-y-6">
                <Tabs defaultValue="mm_struct" className="w-full">
                  <TabsList className="grid w-full max-w-2xl grid-cols-3">
                    <TabsTrigger value="mm_struct">mm_struct</TabsTrigger>
                    <TabsTrigger value="vm_area">vm_area_struct</TabsTrigger>
                    <TabsTrigger value="page">struct page</TabsTrigger>
                  </TabsList>

                  <TabsContent value="mm_struct" className="space-y-4">
                    <div className="prose dark:prose-invert max-w-none mb-4">
                      <p>
                        Cada processo tem um <code>struct mm_struct</code> que descreve todo seu
                        espaço de endereçamento virtual. É o contexto de memória do processo.
                      </p>
                    </div>
                    
                    <CodeBlock
                      language="c"
                    >{`// include/linux/mm_types.h
struct mm_struct {
    struct {
        // VMA (Virtual Memory Areas) do processo
        struct vm_area_struct *mmap;     // Lista ligada de VMAs
        struct rb_root mm_rb;            // Red-Black tree de VMAs
        
        // Diretório de páginas de nível superior
        pgd_t *pgd;                      // Page Global Directory
        
        // Contadores
        atomic_t mm_users;               // Usuários ativos
        atomic_t mm_count;               // Contagem de referências
        
        // Estatísticas
        unsigned long total_vm;          // Total de páginas mapeadas
        unsigned long locked_vm;         // Páginas travadas (mlockall)
        unsigned long pinned_vm;         // Páginas "pinned"
        unsigned long data_vm;           // Páginas de dados
        unsigned long exec_vm;           // Páginas executáveis
        unsigned long stack_vm;          // Páginas de stack
        
        // Segmentos de memória
        unsigned long start_code;        // Início do segmento de código
        unsigned long end_code;          // Fim do segmento de código
        unsigned long start_data;        // Início do segmento de dados
        unsigned long end_data;          // Fim do segmento de dados
        unsigned long start_brk;         // Início do heap
        unsigned long brk;               // Fim atual do heap
        unsigned long start_stack;       // Início da stack
        
        // Argumentos e ambiente
        unsigned long arg_start;         // Início de argv
        unsigned long arg_end;           // Fim de argv
        unsigned long env_start;         // Início de envp
        unsigned long env_end;           // Fim de envp
        
        // Semáforo para sincronização
        struct rw_semaphore mmap_lock;   // Lock para VMAs
        
        // RSS (Resident Set Size) - páginas na RAM
        unsigned long rss_stat[NR_MM_COUNTERS];
        
        // TLB
        struct mm_rss_stat rss_cache;
        
        // Contexto de CPU
        mm_context_t context;            // Arquitetura-específico
        
        // Flags
        unsigned long flags;
        
        // Owner
        struct task_struct *owner;
    };
};

// Exemplo de uso no fork()
int copy_mm(unsigned long clone_flags, struct task_struct *tsk) {
    struct mm_struct *mm, *oldmm;
    
    oldmm = current->mm;
    if (!oldmm)
        return 0;
    
    // Se CLONE_VM, compartilhar mm
    if (clone_flags & CLONE_VM) {
        mmget(oldmm);
        tsk->mm = oldmm;
        return 0;
    }
    
    // Caso contrário, duplicar
    mm = dup_mm(tsk, oldmm);
    if (!mm)
        return -ENOMEM;
    
    tsk->mm = mm;
    return 0;
}`}</CodeBlock>
                  </TabsContent>

                  <TabsContent value="vm_area" className="space-y-4">
                    <div className="prose dark:prose-invert max-w-none mb-4">
                      <p>
                        Cada região contígua do espaço de endereçamento é representada por uma
                        <code>struct vm_area_struct</code> (VMA). Exemplos: código, dados, heap, stack, mmap.
                      </p>
                    </div>
                    
                    <CodeBlock
                      language="c"
                    >{`// include/linux/mm_types.h
struct vm_area_struct {
    // Início e fim do VMA (endereços virtuais)
    unsigned long vm_start;          // Endereço inicial (inclusivo)
    unsigned long vm_end;            // Endereço final (exclusivo)
    
    // Lista ligada de VMAs (ordenada por endereço)
    struct vm_area_struct *vm_next;
    struct vm_area_struct *vm_prev;
    
    // Red-Black tree para busca rápida
    struct rb_node vm_rb;
    
    // mm_struct dono deste VMA
    struct mm_struct *vm_mm;
    
    // Permissões e flags
    pgprot_t vm_page_prot;           // Proteção da página (RWX)
    unsigned long vm_flags;          // Flags (VM_READ, VM_WRITE, VM_EXEC, etc)
    
    // Arquivo mapeado (se houver)
    struct file *vm_file;            // NULL se anônimo
    unsigned long vm_pgoff;          // Offset no arquivo (em páginas)
    
    // Operações
    const struct vm_operations_struct *vm_ops;
    
    // Informação privada
    void *vm_private_data;
};

// Flags importantes
#define VM_READ         0x00000001  // Pode ler
#define VM_WRITE        0x00000002  // Pode escrever
#define VM_EXEC         0x00000004  // Pode executar
#define VM_SHARED       0x00000008  // Compartilhado entre processos
#define VM_MAYREAD      0x00000010  // Pode adicionar VM_READ
#define VM_MAYWRITE     0x00000020  // Pode adicionar VM_WRITE
#define VM_MAYEXEC      0x00000040  // Pode adicionar VM_EXEC
#define VM_MAYSHARE     0x00000080  // Pode adicionar VM_SHARED
#define VM_GROWSDOWN    0x00000100  // Stack que cresce para baixo
#define VM_LOCKED       0x00002000  // Páginas travadas (mlock)
#define VM_IO           0x00004000  // Região de I/O
#define VM_DONTCOPY     0x00020000  // Não copiar no fork()
#define VM_DONTEXPAND   0x00040000  // Não pode crescer com mremap()

// Encontrar VMA que contém um endereço
struct vm_area_struct *find_vma(struct mm_struct *mm, unsigned long addr) {
    struct vm_area_struct *vma = NULL;
    
    // Usar cache primeiro
    vma = mm->mmap_cache;
    if (vma && vma->vm_start <= addr && vma->vm_end > addr)
        return vma;
    
    // Buscar na RB-tree
    struct rb_node *rb_node = mm->mm_rb.rb_node;
    
    while (rb_node) {
        vma = rb_entry(rb_node, struct vm_area_struct, vm_rb);
        
        if (addr < vma->vm_start) {
            rb_node = rb_node->rb_left;
        } else if (addr >= vma->vm_end) {
            rb_node = rb_node->rb_right;
        } else {
            mm->mmap_cache = vma;  // Atualizar cache
            return vma;
        }
    }
    
    return NULL;
}`}</CodeBlock>
                  </TabsContent>

                  <TabsContent value="page" className="space-y-4">
                    <div className="prose dark:prose-invert max-w-none mb-4">
                      <p>
                        Cada quadro físico de memória tem um <code>struct page</code> correspondente.
                        É a estrutura mais importante para gerenciamento de memória física.
                      </p>
                    </div>
                    
                    <CodeBlock
                      language="c"
                    >{`// include/linux/mm_types.h
struct page {
    unsigned long flags;              // Flags de estado (PG_locked, PG_dirty, etc)
    
    // Contador de referências atômico
    atomic_t _refcount;               // Quantas referências à página
    
    // Contador de mapeamentos
    atomic_t _mapcount;               // Quantas PTEs apontam para esta página
    
    // União para economizar espaço
    union {
        // Para páginas normais
        struct {
            struct list_head lru;     // Lista LRU para page cache
            struct address_space *mapping;  // Mapeamento (para page cache)
            pgoff_t index;            // Offset no mapeamento
        };
        
        // Para páginas livres
        struct {
            struct list_head list;    // Lista de páginas livres
            unsigned long private;    // Dados privados
        };
        
        // Para slabs (alocador do kernel)
        struct {
            struct slab *slab_cache;
            void *freelist;
        };
    };
    
    // Zona de memória (ZONE_DMA, ZONE_NORMAL, ZONE_HIGHMEM)
    unsigned long zone_id;
    
    // Memcg (memory cgroup)
    struct mem_cgroup *mem_cgroup;
};

// Flags importantes
#define PG_locked           0   // Página está travada
#define PG_referenced       1   // Página foi referenciada
#define PG_uptodate         2   // Página está atualizada
#define PG_dirty            3   // Página foi modificada
#define PG_lru              4   // Página está na LRU list
#define PG_active           5   // Página está na lista ativa
#define PG_slab             6   // Página gerenciada pelo slab allocator
#define PG_reserved         7   // Página reservada
#define PG_private          8   // Página tem dados privados
#define PG_writeback        9   // Página sendo escrita em disco
#define PG_head            10   // Primeira página de compound page
#define PG_swapcache       11   // Página está no swap cache

// Obter struct page de um endereço virtual
struct page *virt_to_page(void *addr) {
    unsigned long pfn = __pa(addr) >> PAGE_SHIFT;
    return pfn_to_page(pfn);
}

// Obter struct page de um PFN (Page Frame Number)
struct page *pfn_to_page(unsigned long pfn) {
    return &mem_map[pfn];  // Simplificado
}

// Incrementar contagem de referências
void get_page(struct page *page) {
    atomic_inc(&page->_refcount);
}

// Decrementar e possivelmente liberar
void put_page(struct page *page) {
    if (atomic_dec_and_test(&page->_refcount)) {
        __free_page(page);
    }
}`}</CodeBlock>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.section>

          {/* Page Fault Handler */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-red-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <AlertCircle className="size-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Page Fault Handler</h2>
                  <p className="text-muted-foreground">Tratamento de falhas de página em <code>mm/memory.c</code></p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Quando um processo tenta acessar uma página não presente na memória, ocorre um
                    <strong> page fault</strong>. O kernel precisa decidir se é um acesso válido
                    (e carregar a página) ou inválido (e enviar SIGSEGV).
                  </p>
                </div>

                <CodeBlock
                  language="c"
                >{`// arch/x86/mm/fault.c
void do_page_fault(struct pt_regs *regs, unsigned long error_code) {
    struct mm_struct *mm;
    struct vm_area_struct *vma;
    unsigned long address;
    unsigned int flags = FAULT_FLAG_DEFAULT;
    
    // Obter endereço que causou o fault
    address = read_cr2();  // CR2 contém o endereço em x86
    
    // Obter mm_struct do processo atual
    mm = current->mm;
    
    // Se fault no kernel space, tratar diferente
    if (unlikely(address >= TASK_SIZE)) {
        do_kern_addr_fault(regs, error_code, address);
        return;
    }
    
    // Determinar tipo de acesso
    if (error_code & X86_PF_WRITE)
        flags |= FAULT_FLAG_WRITE;
    if (error_code & X86_PF_INSTR)
        flags |= FAULT_FLAG_INSTRUCTION;
    if (error_code & X86_PF_USER)
        flags |= FAULT_FLAG_USER;
    
    // Adquirir lock de leitura no mmap_lock
    mmap_read_lock(mm);
    
    // Encontrar VMA que contém o endereço
    vma = find_vma(mm, address);
    
    if (!vma) {
        // Endereço não está em nenhum VMA válido
        goto bad_area;
    }
    
    if (vma->vm_start <= address) {
        // Endereço está dentro do VMA
        goto good_area;
    }
    
    // Verificar se é stack crescendo
    if (!(vma->vm_flags & VM_GROWSDOWN)) {
        goto bad_area;
    }
    
    // Tentar expandir stack
    if (expand_stack(vma, address)) {
        goto bad_area;
    }
    
good_area:
    // Verificar permissões
    if (unlikely(access_error(error_code, vma))) {
        // Acesso violou permissões (ex: escrita em página read-only)
        goto bad_area_access;
    }
    
    // Chamar handler genérico
    handle_mm_fault(vma, address, flags);
    
    mmap_read_unlock(mm);
    return;
    
bad_area:
    mmap_read_unlock(mm);
    
bad_area_access:
    // Enviar SIGSEGV para o processo
    do_sigbus(regs, error_code, address);
}

// mm/memory.c - Handler genérico de page fault
vm_fault_t handle_mm_fault(struct vm_area_struct *vma, 
                           unsigned long address,
                           unsigned int flags) {
    struct mm_struct *mm = vma->vm_mm;
    pgd_t *pgd;
    p4d_t *p4d;
    pud_t *pud;
    pmd_t *pmd;
    pte_t *pte;
    
    // Caminhar pela hierarquia de tabelas de páginas
    pgd = pgd_offset(mm, address);
    p4d = p4d_alloc(mm, pgd, address);
    if (!p4d)
        return VM_FAULT_OOM;
    
    pud = pud_alloc(mm, p4d, address);
    if (!pud)
        return VM_FAULT_OOM;
    
    pmd = pmd_alloc(mm, pud, address);
    if (!pmd)
        return VM_FAULT_OOM;
    
    // Verificar se é huge page
    if (pmd_none(*pmd) && __transparent_hugepage_enabled(vma)) {
        return create_huge_pmd(vma, address, pmd, flags);
    }
    
    pte = pte_alloc(mm, pmd, address);
    if (!pte)
        return VM_FAULT_OOM;
    
    // Chamar handler de PTE
    return handle_pte_fault(vma, address, pte, pmd, flags);
}

// Tipos de page fault
enum {
    VM_FAULT_OOM        = 0x0001,  // Out of memory
    VM_FAULT_SIGBUS     = 0x0002,  // Bus error
    VM_FAULT_MAJOR      = 0x0004,  // Page não estava no page cache
    VM_FAULT_MINOR      = 0x0008,  // Page estava no page cache
    VM_FAULT_NOPAGE     = 0x0010,  // Página especial
    VM_FAULT_LOCKED     = 0x0020,  // Página já travada
    VM_FAULT_RETRY      = 0x0040,  // Tentar novamente
    VM_FAULT_FALLBACK   = 0x0080,  // Fallback para tamanho menor
};`}</CodeBlock>
              </div>
            </Card>
          </motion.section>

          {/* Recursos e Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Book className="size-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Recursos para Aprofundamento</h2>
                  <p className="text-muted-foreground">Links oficiais e documentação</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="https://github.com/torvalds/linux/tree/master/mm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileCode className="size-4 text-primary" />
                      Código-fonte mm/
                    </h4>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Diretório completo de gerenciamento de memória do Linux
                  </p>
                </a>

                <a 
                  href="https://www.kernel.org/doc/html/latest/admin-guide/mm/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Book className="size-4 text-primary" />
                      Documentação Oficial
                    </h4>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Guia oficial de gerenciamento de memória no kernel Linux
                  </p>
                </a>

                <a 
                  href="https://www.kernel.org/doc/gorman/html/understand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Book className="size-4 text-primary" />
                      Understanding the Linux VM
                    </h4>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Livro completo de Mel Gorman sobre VM do Linux
                  </p>
                </a>

                <a 
                  href="https://lwn.net/Kernel/Index/#Memory_management"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Terminal className="size-4 text-primary" />
                      LWN.net Articles
                    </h4>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Artigos técnicos sobre evolução do gerenciamento de memória
                  </p>
                </a>
              </div>
            </Card>
          </motion.section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <a href="/os/memoria/paginacao/estruturas-dados" className="text-primary hover:underline">
              ← Estruturas de Dados
            </a>
            <a href="/os/memoria/paginacao" className="text-primary hover:underline">
              Voltar para Paginação →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

