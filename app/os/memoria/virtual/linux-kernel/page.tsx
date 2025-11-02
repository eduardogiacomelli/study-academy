"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { 
  Code2, Cpu, Database, Layers, Terminal, 
  BookOpen, Zap, Activity, FileCode, Settings
} from "lucide-react";
import { useState } from "react";

export default function LinuxKernelPage() {
  const [activeTab, setActiveTab] = useState("mm_struct");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-teal-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-500/20 rounded-xl backdrop-blur-sm">
              <Code2 className="w-8 h-8 text-teal-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Linux Kernel Implementation
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Linux Memory Management
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Deep dive no código real do kernel Linux: estruturas de dados, algoritmos, 
            handlers de page fault, e syscalls de memória. Do <code className="text-teal-400">mm_struct</code> ao <code className="text-teal-400">do_page_fault()</code>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Database, label: "mm_struct", value: "Task MM", color: "text-teal-400" },
              { icon: Layers, label: "VMA", value: "vm_area", color: "text-cyan-400" },
              { icon: Activity, label: "Page Fault", value: "Handler", color: "text-blue-400" },
              { icon: Terminal, label: "Syscalls", value: "mmap/brk", color: "text-emerald-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-teal-500/20 p-4">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="mm_struct" className="data-[state=active]:bg-teal-500">
              <Database className="w-4 h-4 mr-2" />
              mm_struct
            </TabsTrigger>
            <TabsTrigger value="vma" className="data-[state=active]:bg-cyan-500">
              <Layers className="w-4 h-4 mr-2" />
              VMA
            </TabsTrigger>
            <TabsTrigger value="page" className="data-[state=active]:bg-blue-500">
              <FileCode className="w-4 h-4 mr-2" />
              struct page
            </TabsTrigger>
            <TabsTrigger value="fault" className="data-[state=active]:bg-emerald-500">
              <Activity className="w-4 h-4 mr-2" />
              Page Fault
            </TabsTrigger>
            <TabsTrigger value="syscalls" className="data-[state=active]:bg-indigo-500">
              <Terminal className="w-4 h-4 mr-2" />
              Syscalls
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-500">
              <Settings className="w-4 h-4 mr-2" />
              Tools
            </TabsTrigger>
          </TabsList>

          {/* mm_struct TAB */}
          <TabsContent value="mm_struct" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-teal-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-teal-400" />
                mm_struct - Task Memory Descriptor
              </h2>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                A estrutura <code className="text-teal-400">mm_struct</code> é o coração da gerência de memória por processo no Linux.
                Cada tarefa (task) tem um ponteiro para seu <code className="text-teal-400">mm_struct</code>, que descreve todo o espaço
                de endereçamento virtual do processo.
              </p>

              {/* Struct Definition */}
              <Card className="bg-teal-950/30 border-teal-500/20 p-6 mb-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-4">📝 Definição (linux/mm_types.h)</h3>
                <CodeBlock language="c">
{`struct mm_struct {
    struct {
        struct vm_area_struct *mmap;        /* list of VMAs */
        struct rb_root mm_rb;               /* VMA tree (red-black) */
        unsigned long mmap_base;            /* base of mmap area */
        unsigned long task_size;            /* size of task vm space */
        
        pgd_t *pgd;                         /* page global directory */
        
        atomic_t mm_users;                  /* users count */
        atomic_t mm_count;                  /* reference count */
        
        unsigned long start_code;           /* start of code segment */
        unsigned long end_code;             /* end of code segment */
        unsigned long start_data;           /* start of data segment */
        unsigned long end_data;             /* end of data segment */
        unsigned long start_brk;            /* start of heap */
        unsigned long brk;                  /* current heap end */
        unsigned long start_stack;          /* start of stack */
        
        unsigned long total_vm;             /* total pages mapped */
        unsigned long locked_vm;            /* pages with VM_LOCKED */
        unsigned long pinned_vm;            /* refcount > 1 pages */
        unsigned long data_vm;              /* data segment pages */
        unsigned long exec_vm;              /* executable pages */
        unsigned long stack_vm;             /* stack pages */
        
        /* Statistics */
        unsigned long hiwater_rss;          /* High-water RSS usage */
        unsigned long hiwater_vm;           /* High-water VM usage */
        
        /* Memory management */
        struct list_head mmlist;            /* list of all mm_structs */
        
        /* Special counters */
        mm_counter_t rss_stat;              /* resident set size */
        
        /* Architecture-specific MM context */
        mm_context_t context;
        
        /* Locks */
        spinlock_t page_table_lock;         /* protects page tables */
        struct rw_semaphore mmap_lock;      /* protects VMA list */
        
    } __randomize_layout;
};`}
                </CodeBlock>
              </Card>

              {/* Key Fields Explanation */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-teal-950/30 to-cyan-950/30 border-teal-500/20 p-6">
                  <h3 className="text-xl font-semibold text-teal-300 mb-4">🗺️ Address Space Layout</h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <strong className="text-teal-400">start_code / end_code:</strong>
                      <div className="text-xs text-slate-400 mt-1">Text segment (código executável)</div>
                    </div>
                    <div>
                      <strong className="text-cyan-400">start_data / end_data:</strong>
                      <div className="text-xs text-slate-400 mt-1">Data segment (variáveis globais)</div>
                    </div>
                    <div>
                      <strong className="text-blue-400">start_brk / brk:</strong>
                      <div className="text-xs text-slate-400 mt-1">Heap (malloc usa brk/sbrk)</div>
                    </div>
                    <div>
                      <strong className="text-emerald-400">start_stack:</strong>
                      <div className="text-xs text-slate-400 mt-1">Stack (cresce para baixo)</div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border-blue-500/20 p-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">📊 Statistics & Counters</h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <strong className="text-blue-400">total_vm:</strong>
                      <div className="text-xs text-slate-400 mt-1">Total de páginas mapeadas (VSZ)</div>
                    </div>
                    <div>
                      <strong className="text-indigo-400">rss_stat:</strong>
                      <div className="text-xs text-slate-400 mt-1">Resident Set Size (RSS) - páginas em RAM</div>
                    </div>
                    <div>
                      <strong className="text-purple-400">locked_vm:</strong>
                      <div className="text-xs text-slate-400 mt-1">Páginas com VM_LOCKED (mlock)</div>
                    </div>
                    <div>
                      <strong className="text-pink-400">hiwater_rss/vm:</strong>
                      <div className="text-xs text-slate-400 mt-1">Pico de uso de memória</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Code Example */}
              <Card className="bg-black/30 border-teal-500/20 p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-4">💻 Acessando mm_struct do Processo Atual</h3>
                <CodeBlock language="c">
{`// Em kernel mode, acessar mm_struct da tarefa atual
struct task_struct *task = current;  // Processo atual
struct mm_struct *mm = task->mm;     // Memory descriptor

if (mm) {
    printk(KERN_INFO "Process %s (PID %d)\\n", task->comm, task->pid);
    printk(KERN_INFO "  Code:  0x%lx - 0x%lx\\n", mm->start_code, mm->end_code);
    printk(KERN_INFO "  Data:  0x%lx - 0x%lx\\n", mm->start_data, mm->end_data);
    printk(KERN_INFO "  Heap:  0x%lx - 0x%lx\\n", mm->start_brk, mm->brk);
    printk(KERN_INFO "  Stack: 0x%lx\\n", mm->start_stack);
    printk(KERN_INFO "  Total VM: %lu pages (%lu MB)\\n", 
           mm->total_vm, (mm->total_vm * PAGE_SIZE) >> 20);
    
    // Percorrer VMAs
    struct vm_area_struct *vma;
    int count = 0;
    for (vma = mm->mmap; vma; vma = vma->vm_next) {
        count++;
        printk(KERN_INFO "  VMA %d: 0x%lx - 0x%lx (flags: 0x%lx)\\n",
               count, vma->vm_start, vma->vm_end, vma->vm_flags);
    }
}

// Incrementar referência antes de usar
mmget(mm);  // Atomic increment mm_users

// ... usar mm ...

// Decrementar quando terminar
mmput(mm);  // Atomic decrement, pode liberar se chegou a 0`}
                </CodeBlock>
              </Card>

              {/* Memory Layout Diagram */}
              <Card className="bg-gradient-to-r from-teal-950/30 to-blue-950/30 border-teal-500/20 p-6 mt-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-4">🗺️ Typical Process Memory Layout</h3>
                <div className="bg-black/40 rounded-lg p-6 font-mono text-sm">
                  <div className="space-y-1 text-slate-300">
                    <div className="text-red-400">0xFFFFFFFFFFFFFFFF ┌─────────────────────┐</div>
                    <div className="text-red-400">                   │   Kernel Space      │</div>
                    <div className="text-red-400">0xFFFF800000000000 └─────────────────────┘</div>
                    <div className="text-slate-600">                   ┌─────────────────────┐</div>
                    <div className="text-slate-600">                   │   (unmapped)        │</div>
                    <div className="text-slate-600">                   └─────────────────────┘</div>
                    <div className="text-emerald-400">0x7FFFFFFFFFFF   ┌─────────────────────┐ ← start_stack</div>
                    <div className="text-emerald-400">                   │   Stack (↓)         │</div>
                    <div className="text-emerald-400">                   ├─────────────────────┤</div>
                    <div className="text-yellow-400">                   │   mmap area         │</div>
                    <div className="text-yellow-400">                   │   (libs, mmap)      │</div>
                    <div className="text-cyan-400">                   ├─────────────────────┤</div>
                    <div className="text-cyan-400">                   │   Heap (↑)          │ ← brk</div>
                    <div className="text-cyan-400">                   │                     │ ← start_brk</div>
                    <div className="text-blue-400">                   ├─────────────────────┤</div>
                    <div className="text-blue-400">                   │   BSS (uninit data) │ ← end_data</div>
                    <div className="text-blue-400">                   ├─────────────────────┤</div>
                    <div className="text-blue-400">                   │   Data (init data)  │ ← start_data</div>
                    <div className="text-purple-400">                   ├─────────────────────┤</div>
                    <div className="text-purple-400">                   │   Text (code)       │ ← end_code</div>
                    <div className="text-purple-400">0x400000         │                     │ ← start_code</div>
                    <div className="text-purple-400">                   └─────────────────────┘</div>
                    <div className="text-slate-600">0x0000000000000000 (NULL)</div>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          {/* VMA TAB */}
          <TabsContent value="vma" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Layers className="w-8 h-8 text-cyan-400" />
                vm_area_struct - Virtual Memory Area
              </h2>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Cada região contígua de memória virtual é representada por uma <code className="text-cyan-400">vm_area_struct</code> (VMA).
                O kernel mantém uma lista encadeada e uma árvore red-black de VMAs por processo.
              </p>

              <Card className="bg-cyan-950/30 border-cyan-500/20 p-6 mb-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">📝 Definição (linux/mm_types.h)</h3>
                <CodeBlock language="c">
{`struct vm_area_struct {
    /* Links para organização */
    struct vm_area_struct *vm_next, *vm_prev;  /* lista encadeada */
    struct rb_node vm_rb;                      /* nó da árvore R-B */
    
    /* Address range [vm_start, vm_end) */
    unsigned long vm_start;     /* início (inclusive) */
    unsigned long vm_end;       /* fim (exclusive) */
    
    /* Back-pointer para mm_struct */
    struct mm_struct *vm_mm;    /* address space we belong to */
    
    /* Protection e flags */
    pgprot_t vm_page_prot;      /* access permissions */
    unsigned long vm_flags;     /* flags (VM_READ, VM_WRITE, etc) */
    
    /* File mapping (se for mmap de arquivo) */
    struct file *vm_file;       /* file we map to (can be NULL) */
    unsigned long vm_pgoff;     /* offset in PAGE_SIZE units */
    
    /* Operations */
    const struct vm_operations_struct *vm_ops;
    
    /* Private data */
    void *vm_private_data;      /* for driver use */
};

/* VM Flags (bits em vm_flags) */
#define VM_READ         0x00000001  /* Pode ler */
#define VM_WRITE        0x00000002  /* Pode escrever */
#define VM_EXEC         0x00000004  /* Pode executar */
#define VM_SHARED       0x00000008  /* Mapeamento compartilhado */
#define VM_MAYREAD      0x00000010  /* Pode adicionar VM_READ */
#define VM_MAYWRITE     0x00000020  /* Pode adicionar VM_WRITE */
#define VM_MAYEXEC      0x00000040  /* Pode adicionar VM_EXEC */
#define VM_GROWSDOWN    0x00000100  /* Stack (cresce para baixo) */
#define VM_GROWSUP      0x00000200  /* Heap (cresce para cima) */
#define VM_LOCKED       0x00002000  /* Páginas locked (mlock) */
#define VM_IO           0x00004000  /* Mapeamento de I/O */
#define VM_DONTCOPY     0x00020000  /* Não copiar no fork */
#define VM_DONTEXPAND   0x00040000  /* Não expandir com mremap */
#define VM_ACCOUNT      0x00100000  /* Contar em committed */
#define VM_HUGETLB      0x00400000  /* Huge TLB pages */`}
                </CodeBlock>
              </Card>

              {/* VMA Operations */}
              <Card className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border-cyan-500/20 p-6 mb-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">⚙️ vm_operations_struct</h3>
                <CodeBlock language="c">
{`struct vm_operations_struct {
    void (*open)(struct vm_area_struct *area);
    void (*close)(struct vm_area_struct *area);
    
    /* Page fault handler */
    vm_fault_t (*fault)(struct vm_fault *vmf);
    
    /* Called by mremap() */
    vm_fault_t (*mremap)(struct vm_area_struct *area);
    
    /* Access notification */
    vm_fault_t (*page_mkwrite)(struct vm_fault *vmf);
    
    /* ... outros callbacks ... */
};`}
                </CodeBlock>
              </Card>

              {/* Code Example */}
              <Card className="bg-black/30 border-cyan-500/20 p-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">💻 Encontrando VMA para um Endereço</h3>
                <CodeBlock language="c">
{`// Encontrar VMA que contém um endereço virtual
struct vm_area_struct *find_vma_example(struct mm_struct *mm, 
                                        unsigned long addr)
{
    struct vm_area_struct *vma;
    
    // O kernel usa find_vma() que faz busca na árvore R-B
    // Aqui mostramos busca linear na lista para clareza
    
    vma = mm->mmap;  // Primeira VMA
    
    while (vma) {
        // VMA cobre [vm_start, vm_end)
        if (addr >= vma->vm_start && addr < vma->vm_end) {
            return vma;  // Encontrou!
        }
        vma = vma->vm_next;
    }
    
    return NULL;  // Não encontrado (endereço inválido)
}

// Exemplo de uso
void print_vma_info(struct mm_struct *mm, unsigned long addr)
{
    struct vm_area_struct *vma = find_vma(mm, addr);
    
    if (!vma) {
        printk("Address 0x%lx is not mapped\\n", addr);
        return;
    }
    
    printk("VMA for address 0x%lx:\\n", addr);
    printk("  Range: 0x%lx - 0x%lx (%lu KB)\\n",
           vma->vm_start, vma->vm_end,
           (vma->vm_end - vma->vm_start) >> 10);
    
    printk("  Permissions: %c%c%c\\n",
           (vma->vm_flags & VM_READ)  ? 'r' : '-',
           (vma->vm_flags & VM_WRITE) ? 'w' : '-',
           (vma->vm_flags & VM_EXEC)  ? 'x' : '-');
    
    if (vma->vm_file) {
        printk("  File: %s (offset: 0x%lx)\\n",
               vma->vm_file->f_path.dentry->d_name.name,
               vma->vm_pgoff << PAGE_SHIFT);
    } else {
        printk("  Anonymous mapping\\n");
    }
}`}
                </CodeBlock>
              </Card>
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["page", "fault", "syscalls", "tools"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-teal-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab}</h2>
                <div className="text-center text-slate-400 py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Parte da expansão épica de 1300+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-teal-950/50 to-cyan-950/50 backdrop-blur-sm border-teal-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-teal-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-teal-300 mb-4">📚 Código Kernel</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-teal-400">include/linux/mm_types.h</div>
                  <div className="text-xs text-slate-500">Definições de mm_struct, vm_area_struct</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-cyan-400">mm/memory.c</div>
                  <div className="text-xs text-slate-500">Page fault handling</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-blue-400">mm/mmap.c</div>
                  <div className="text-xs text-slate-500">VMA management, do_mmap()</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">📖 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-teal-400">Robert Love</div>
                  <div className="italic">Linux Kernel Development (3rd ed)</div>
                  <div className="text-xs text-slate-500">Chapter 15: Memory Management</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-cyan-400">Mel Gorman</div>
                  <div className="italic">Understanding the Linux Virtual Memory Manager</div>
                  <div className="text-xs text-slate-500">Free online book</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

