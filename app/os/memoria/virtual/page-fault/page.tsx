"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { 
  AlertTriangle, Cpu, HardDrive, Clock, 
  Code2, BookOpen, Zap, Activity 
} from "lucide-react";

export default function PageFaultHandling() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-red-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Page Fault Handling
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
            Page Fault: O Mecanismo Fundamental
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Quando a página não está na memória: exception, kernel handler, disk I/O, retry. 
            O processo mais crítico da memória virtual em 8 passos detalhados.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: AlertTriangle, label: "Exception", value: "#14 (x86)", color: "text-red-400" },
              { icon: Cpu, label: "Handler", value: "do_page_fault()", color: "text-orange-400" },
              { icon: HardDrive, label: "I/O Time", value: "5-10 ms", color: "text-yellow-400" },
              { icon: Clock, label: "Overhead", value: "10,000x RAM", color: "text-pink-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-red-500/20 p-4">
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
        <Tabs defaultValue="8steps" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="8steps" className="data-[state=active]:bg-red-500">
              <Activity className="w-4 h-4 mr-2" />
              8 Passos
            </TabsTrigger>
            <TabsTrigger value="linux" className="data-[state=active]:bg-red-500">
              Linux Handler
            </TabsTrigger>
            <TabsTrigger value="windows" className="data-[state=active]:bg-red-500">
              Windows Handler
            </TabsTrigger>
            <TabsTrigger value="tipos" className="data-[state=active]:bg-red-500">
              Tipos de Faults
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-red-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* 8 PASSOS */}
          <TabsContent value="8steps" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Anatomia de um Page Fault: 8 Passos Detalhados</h2>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Quando a CPU tenta acessar uma página não presente na memória física, ocorre uma sequência 
                complexa de eventos envolvendo hardware e software.
              </p>

              <div className="space-y-6">
                {[
                  {
                    num: 1,
                    title: "Instruction Fetch & Execute Attempt",
                    icon: Cpu,
                    color: "bg-blue-500",
                    desc: "CPU busca e tenta executar uma instrução que acessa memória virtual",
                    details: [
                      "CPU: Fetch instruction from RIP (Instruction Pointer)",
                      "Decode: Identifica acesso à memória (ex: MOV rax, [rbx])",
                      "Execute: Tenta acessar endereço virtual em [rbx]",
                      "MMU: É ativado para traduzir virtual → físico"
                    ],
                    example: "mov rax, [0x00401000]  ; Tentar ler da página virtual 0x401"
                  },
                  {
                    num: 2,
                    title: "MMU Translation & TLB Lookup",
                    icon: Zap,
                    color: "bg-cyan-500",
                    desc: "Memory Management Unit verifica TLB e depois page tables",
                    details: [
                      "TLB Lookup: Busca tradução em cache (64-512 entries)",
                      "TLB Miss: Não encontrado → Page Table Walk",
                      "Page Table Walk: Percorre 4 níveis (PML4→PDPT→PD→PT)",
                      "Cada nível: 1 acesso à memória = 4 acessos total!"
                    ],
                    example: "Virtual 0x00401ABC → PML4[0] → PDPT[1] → PD[0] → PT[1]"
                  },
                  {
                    num: 3,
                    title: "Present Bit Check",
                    icon: AlertTriangle,
                    color: "bg-yellow-500",
                    desc: "MMU verifica o bit 'Present' na Page Table Entry (PTE)",
                    details: [
                      "PTE encontrado: Verificar bit 0 (Present)",
                      "Present = 1: ✅ Página na RAM → Continue normalmente",
                      "Present = 0: ❌ PAGE FAULT! → Trigger exception",
                      "Outros checks: R/W permissions, U/S bit, NX bit"
                    ],
                    example: `PTE bits: [NX:1][...][PFN:40bits][...][D:?][A:?][U/S:1][R/W:1][P:0]
                                                                                      ↑
                                                                              FAULT HERE!`
                  },
                  {
                    num: 4,
                    title: "Exception Trigger (Hardware)",
                    icon: AlertTriangle,
                    color: "bg-red-500",
                    desc: "CPU dispara exceção de hardware, salvando contexto",
                    details: [
                      "Interrupt #14 (Page Fault) em x86-64",
                      "Save: RIP (instruction pointer), RFLAGS, CS",
                      "Push error code (5 bits: P/W/U/R/I)",
                      "CR2 register ← faulting virtual address",
                      "IDT[14] → Jump to page fault handler"
                    ],
                    example: `Error code: 0x07 = 0b00111
  bit 0 (P): 1 = protection fault (não present)
  bit 1 (W): 1 = write access
  bit 2 (U): 1 = user mode
  bit 3 (R): 0 = not reserved
  bit 4 (I): 0 = not instruction fetch`
                  },
                  {
                    num: 5,
                    title: "Kernel Handler Entry",
                    icon: Code2,
                    color: "bg-purple-500",
                    desc: "Sistema operacional assume controle e analisa o fault",
                    details: [
                      "Linux: do_page_fault() (arch/x86/mm/fault.c)",
                      "Windows: MmAccessFault()",
                      "Read CR2: Get faulting virtual address",
                      "Read error code: Determine fault type",
                      "Find VMA (vm_area_struct): Which region?",
                      "Check permissions: Valid access?"
                    ],
                    example: `do_page_fault(struct pt_regs *regs, unsigned long error_code) {
    unsigned long address = read_cr2();
    struct vm_area_struct *vma = find_vma(current->mm, address);
    // ... handle fault
}`
                  },
                  {
                    num: 6,
                    title: "Allocate Physical Frame",
                    icon: HardDrive,
                    color: "bg-green-500",
                    desc: "SO aloca um frame físico para a página",
                    details: [
                      "Buddy allocator: Encontrar frame livre",
                      "Se RAM cheia: Page replacement algorithm",
                      "Select victim: FIFO/LRU/Clock",
                      "If victim dirty: Write to swap first",
                      "Frame agora disponível para nova página"
                    ],
                    example: `frame = alloc_page(GFP_KERNEL);
if (!frame) {
    // Out of memory! Run OOM killer or swap
    victim = select_victim_page();
    free_page(victim);
    frame = victim->frame;
}`
                  },
                  {
                    num: 7,
                    title: "Load Page from Disk/Zero-fill",
                    icon: HardDrive,
                    color: "bg-orange-500",
                    desc: "Carregar conteúdo da página (I/O mais lento!)",
                    details: [
                      "File-backed: Read from file (executável, .so)",
                      "Anonymous: Zero-fill (heap, stack)",
                      "Swap-backed: Read from swap partition",
                      "I/O time: 5-10 ms (SSD) ou 10-20 ms (HDD)",
                      "10,000x mais lento que RAM access!"
                    ],
                    example: `if (vma->vm_file) {
    read_page_from_file(frame, vma->vm_file, offset);
} else {
    memset(frame, 0, PAGE_SIZE);  // Zero-fill
}`
                  },
                  {
                    num: 8,
                    title: "Update PTE & Resume",
                    icon: Zap,
                    color: "bg-indigo-500",
                    desc: "Atualizar tabela de páginas e retornar à user space",
                    details: [
                      "Update PTE: Set Present=1, PFN=allocated_frame",
                      "Set permissions: R/W, U/S, NX conforme VMA",
                      "Flush TLB: Invalidar entrada antiga",
                      "Return to user space: IRET instruction",
                      "Retry instruction: CPU executa novamente (agora OK!)"
                    ],
                    example: `pte.present = 1;
pte.pfn = frame_number;
pte.rw = (vma->vm_flags & VM_WRITE) ? 1 : 0;
flush_tlb_page(address);
return;  // IRET → retry instruction`
                  }
                ].map((step) => (
                  <Card key={step.num} className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-red-500/20 p-6">
                    <div className="flex items-start gap-6">
                      <div className={`${step.color} text-white rounded-full p-4 flex-shrink-0`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={`${step.color} text-white text-lg px-3 py-1`}>
                            Passo {step.num}
                          </Badge>
                          <h3 className="text-2xl font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                        
                        <p className="text-slate-300 mb-4">{step.desc}</p>
                        
                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-semibold text-slate-400 mb-2">Detalhes:</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-slate-950/50 rounded p-3 font-mono text-xs text-green-400">
                          {step.example}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border-red-500/30 p-8 mt-8">
                <h3 className="text-2xl font-semibold text-red-300 mb-4">⏱️ Tempo Total de um Page Fault</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">Minor Fault (sem I/O):</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Exception overhead:</span>
                        <Badge className="bg-red-500">~1 µs</Badge>
                      </div>
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Handler + allocation:</span>
                        <Badge className="bg-orange-500">~2 µs</Badge>
                      </div>
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Zero-fill (4KB):</span>
                        <Badge className="bg-yellow-500">~1 µs</Badge>
                      </div>
                      <div className="flex justify-between bg-green-950/30 p-2 rounded border-t-2 border-green-500 mt-2">
                        <strong>Total:</strong>
                        <Badge className="bg-green-500">~5 µs</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">Major Fault (com I/O):</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Exception + handler:</span>
                        <Badge className="bg-red-500">~3 µs</Badge>
                      </div>
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Disk I/O (SSD):</span>
                        <Badge className="bg-red-600">~8 ms</Badge>
                      </div>
                      <div className="flex justify-between bg-black/30 p-2 rounded">
                        <span>Update PTE + TLB:</span>
                        <Badge className="bg-orange-500">~1 µs</Badge>
                      </div>
                      <div className="flex justify-between bg-red-950/30 p-2 rounded border-t-2 border-red-500 mt-2">
                        <strong>Total:</strong>
                        <Badge className="bg-red-600">~8-10 ms</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    10,000x Slower!
                  </div>
                  <div className="text-slate-300">
                    Major fault (8ms) vs RAM access (100ns) = 80,000x diferença!
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          {/* Placeholder para outras tabs */}
          {["linux", "windows", "tipos", "codigo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-red-500/20 p-8">
                <h2 className="text-3xl font-bold mb-6 capitalize">{tab} Handler</h2>
                <div className="text-center text-slate-400 py-12">
                  <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Conteúdo detalhado de {tab} será expandido...</p>
                  <Badge className="mt-4">Parte da estrutura épica de 1250+ linhas</Badge>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-red-950/50 to-orange-950/50 backdrop-blur-sm border-red-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-red-400" />
            Referências
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-red-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-red-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems</div>
                  <div className="text-xs text-slate-500">Chapter 3.3: Page Faults</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-300 mb-4">🔗 Código Fonte</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-orange-400">Linux Kernel</div>
                  <div>arch/x86/mm/fault.c</div>
                  <div className="text-xs text-slate-500">do_page_fault() implementation</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

