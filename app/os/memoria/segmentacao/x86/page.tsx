"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger } from "animejs";
import {
  Cpu,
  Shield,
  Lock,
  Binary,
  ArrowRight,
  BookOpen,
  Code,
  Layers,
  AlertTriangle,
  CheckCircle,
  Zap,
  MemoryStick,
  Settings,
  Database,
  Terminal
} from "lucide-react";

export default function X86Page() {
  const [activeTab, setActiveTab] = useState("gdt");

  useEffect(() => {
    animate('.x86-card', {
      translateY: [50, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 700,
      ease: 'outExpo'
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6" whileHover={{ scale: 1.05 }}>
              <Cpu className="size-5" />
              <span className="text-sm font-semibold">Intel IA-32/x86-64 Architecture</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Intel x86 Real</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">GDT, LDT, Seletores, TSS, Call Gates e Privilege Rings</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Binary className="size-4 mr-2" />GDT/LDT
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Shield className="size-4 mr-2" />4 Rings
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Settings className="size-4 mr-2" />TSS
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* 1. Arquitetura x86 */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-blue-500/5 border-2 border-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-500/20" whileHover={{ scale: 1.05 }}>
                  <Cpu className="size-6 text-blue-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Arquitetura x86 - Evolução</h2>
                  <p className="text-muted-foreground">De 1978 até hoje</p>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">A arquitetura <strong>Intel x86</strong> implementa segmentação desde o 8086 (1978), evoluindo significativamente:</p>
                
                <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
                  <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200">
                    <h4 className="font-bold mb-2">8086 (1978)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 16-bit real mode</li>
                      <li>• 4 segmentos (CS, DS, SS, ES)</li>
                      <li>• 1 MB address space</li>
                      <li>• Sem proteção</li>
                    </ul>
                  </Card>
                  <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200">
                    <h4 className="font-bold mb-2">80286 (1982)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Protected mode</li>
                      <li>• GDT/LDT</li>
                      <li>• 4 privilege rings</li>
                      <li>• 16 MB address space</li>
                    </ul>
                  </Card>
                  <Card className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200">
                    <h4 className="font-bold mb-2">x86-64 (2003)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 64-bit long mode</li>
                      <li>• Flat segmentation</li>
                      <li>• 128 TB virtual</li>
                      <li>• 4-level paging</li>
                    </ul>
                  </Card>
                </div>

                <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto mt-4">
                  <pre className="text-sm"><code>{`// Descritor de Segmento (8 bytes) - IA-32
struct segment_descriptor {
    uint16_t limit_low;      // Bits 0-15 do limite
    uint16_t base_low;       // Bits 0-15 da base
    uint8_t  base_mid;       // Bits 16-23 da base
    uint8_t  access;         // Byte de acesso (type, DPL, P)
    uint8_t  granularity;    // G, D/B, L, AVL, limite[19:16]
    uint8_t  base_high;      // Bits 24-31 da base
} __attribute__((packed));

// Byte de acesso decodificado
// Bit 7:     Present (1 = válido, 0 = inválido)
// Bits 6-5:  DPL (Descriptor Privilege Level: 0-3)
// Bit 4:     S (0 = system, 1 = code/data)
// Bits 3-0:  Type (executable, writable, etc)

// Byte de granularidade
// Bit 7:     G (0 = bytes, 1 = 4KB pages)
// Bit 6:     D/B (default operation size)
// Bit 5:     L (64-bit code segment)
// Bit 4:     AVL (available for system use)
// Bits 3-0:  Limit[19:16]`}</code></pre>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* 2. GDT vs LDT */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">GDT vs LDT - Detalhado</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="x86-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <CheckCircle className="size-6 text-green-600" />GDT (Global Descriptor Table)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ <strong>Uma por sistema</strong></li>
                    <li>✓ Compartilhada por todos os processos</li>
                    <li>✓ Contém segmentos do kernel</li>
                    <li>✓ Endereço armazenado em GDTR (48 bits)</li>
                    <li>✓ Máximo: 8192 descritores (13 bits índice)</li>
                    <li>✓ Primeira entrada sempre NULL</li>
                  </ul>
                  <Card className="p-4 bg-green-100 dark:bg-green-900/30 mt-4">
                    <pre className="text-xs font-mono">{`// Carregar GDT
struct {
    uint16_t limit;
    uint32_t base;
} __attribute__((packed)) gdtr;

gdtr.limit = sizeof(gdt) - 1;
gdtr.base = (uint32_t)&gdt;
asm volatile("lgdt %0" :: "m"(gdtr));`}</pre>
                  </Card>
                </Card>

                <Card className="x86-card p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-2 border-purple-200">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Layers className="size-6 text-purple-600" />LDT (Local Descriptor Table)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ <strong>Uma por processo</strong> (opcional)</li>
                    <li>✓ Privada de cada tarefa</li>
                    <li>✓ Segmentos específicos do processo</li>
                    <li>✓ Endereço em LDTR (16 bits selector)</li>
                    <li>✓ Máximo: 8192 descritores</li>
                    <li>✓ Entrada na GDT aponta para LDT</li>
                  </ul>
                  <Card className="p-4 bg-purple-100 dark:bg-purple-900/30 mt-4">
                    <pre className="text-xs font-mono">{`// Carregar LDT (selector)
uint16_t ldt_selector = 0x28; // GDT[5]
asm volatile("lldt %0" :: "r"(ldt_selector));

// Linux raramente usa LDT
// Windows 32-bit usava para TEB/TIB`}</pre>
                  </Card>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* 3. Seletores de Segmento */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-cyan-500/5 border-2 border-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/20" whileHover={{ scale: 1.05 }}>
                  <Binary className="size-6 text-cyan-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Seletores de Segmento (16 bits)</h2>
                  <p className="text-muted-foreground">Estrutura dos registradores CS, DS, SS, ES, FS, GS</p>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-2 border-cyan-200">
                  <pre className="text-sm font-mono text-center mb-4"><code>{`15                3   2   1   0
┌─────────────────┬───┬─────┐
│     Index       │ TI│ RPL │
└─────────────────┴───┴─────┘
  13 bits        1 bit 2 bits`}</code></pre>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded">
                      <h4 className="font-semibold mb-2">Index (13 bits)</h4>
                      <p className="text-sm text-muted-foreground">
                        Índice do descritor na GDT/LDT (0-8191)
                      </p>
                    </div>
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded">
                      <h4 className="font-semibold mb-2">TI (1 bit)</h4>
                      <p className="text-sm text-muted-foreground">
                        0 = GDT, 1 = LDT
                      </p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded">
                      <h4 className="font-semibold mb-2">RPL (2 bits)</h4>
                      <p className="text-sm text-muted-foreground">
                        Requested Privilege Level (0-3)
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                  <pre className="text-sm"><code>{`// Exemplo: Criar selector
// GDT[3], TI=0 (GDT), RPL=0 (kernel)
uint16_t selector = (3 << 3) | (0 << 2) | 0;
// = 0x0018 (24 decimal)

// Carregar em CS (code segment)
asm volatile("ljmp $0x08, $1f\\n1:");

// Carregar em DS (data segment)
asm volatile("mov %0, %%ds" :: "r"((uint16_t)0x10));

// Verificar privilege level
uint16_t cs;
asm volatile("mov %%cs, %0" : "=r"(cs));
uint8_t cpl = cs & 0x3; // Current Privilege Level`}</code></pre>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* 4. Privilege Rings */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Privilege Rings (Anéis de Proteção)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { ring: 0, name: "Kernel", desc: "Modo supervisor", color: "red", usage: "Linux/Windows kernel" },
                  { ring: 1, name: "Device Drivers", desc: "Raramente usado", color: "orange", usage: "OS/2 apenas" },
                  { ring: 2, name: "Device Drivers", desc: "Raramente usado", color: "yellow", usage: "OS/2 apenas" },
                  { ring: 3, name: "User Apps", desc: "Modo usuário", color: "green", usage: "Todas aplicações" }
                ].map((r) => (
                  <motion.div key={r.ring} className="x86-card" whileHover={{ scale: 1.05 }}>
                    <Card className={`p-6 text-center border-2 ${
                      r.color === 'red' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' :
                      r.color === 'orange' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' :
                      r.color === 'yellow' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                      'border-green-500 bg-green-50 dark:bg-green-950/20'
                    }`}>
                      <div className={`text-3xl font-bold mb-2 ${
                        r.color === 'red' ? 'text-red-600' :
                        r.color === 'orange' ? 'text-orange-600' :
                        r.color === 'yellow' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>Ring {r.ring}</div>
                      <p className="font-semibold text-sm mb-1">{r.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{r.desc}</p>
                      <Badge className="text-xs">{r.usage}</Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
                <p className="text-sm"><strong>💡 Realidade:</strong> Linux e Windows modernos usam apenas Ring 0 (kernel) e Ring 3 (user). Rings 1 e 2 foram ignorados por complexidade e falta de benefício prático.</p>
              </div>

              <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto mt-6">
                <pre className="text-sm"><code>{`// Transição Ring 3 → Ring 0 (syscall)
// 1. User space (Ring 3)
int main() {
    write(1, "Hello\\n", 6); // Syscall
}

// 2. SYSCALL instruction (x86-64)
// CPU automaticamente:
// - Salva RIP, RSP em MSRs
// - Troca para Ring 0
// - Carrega novo RIP (kernel)
// - Carrega novo RSP (kernel stack)

// 3. Kernel (Ring 0)
SYSCALL_DEFINE3(write, fd, buf, count) {
    // ... código do kernel ...
}

// 4. SYSRET instruction
// Retorna para Ring 3`}</code></pre>
              </Card>
            </Card>
          </motion.section>

          {/* 5. TSS (Task State Segment) */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-indigo-500/5 border-2 border-indigo-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20" whileHover={{ scale: 1.05 }}>
                  <Settings className="size-6 text-indigo-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">TSS (Task State Segment)</h2>
                  <p className="text-muted-foreground">Estrutura de estado do processo</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-lg">O TSS armazena o estado de um processo durante troca de contexto (IA-32) ou stack pointers para ring switches (x86-64).</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200">
                    <h4 className="font-bold mb-3">IA-32 TSS (104 bytes)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Link to previous TSS</li>
                      <li>• ESP0, SS0 (Ring 0 stack)</li>
                      <li>• ESP1, SS1 (Ring 1 stack)</li>
                      <li>• ESP2, SS2 (Ring 2 stack)</li>
                      <li>• CR3 (Page directory)</li>
                      <li>• EIP, EFLAGS</li>
                      <li>• EAX, ECX, EDX, EBX...</li>
                      <li>• CS, DS, SS, ES, FS, GS</li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200">
                    <h4 className="font-bold mb-3">x86-64 TSS (104 bytes)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Reserved (4 bytes)</li>
                      <li>• RSP0 (Ring 0 stack)</li>
                      <li>• RSP1 (Ring 1 stack)</li>
                      <li>• RSP2 (Ring 2 stack)</li>
                      <li>• Reserved</li>
                      <li>• IST1-7 (Interrupt stacks)</li>
                      <li>• Reserved</li>
                      <li>• IOPB offset</li>
                    </ul>
                  </Card>
                </div>

                <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                  <pre className="text-sm"><code>{`// TSS em x86-64 (Linux)
struct tss_struct {
    uint32_t reserved1;
    uint64_t rsp0;  // Kernel stack pointer
    uint64_t rsp1;
    uint64_t rsp2;
    uint64_t reserved2;
    uint64_t ist[7]; // Interrupt Stack Table
    uint64_t reserved3;
    uint16_t reserved4;
    uint16_t io_bitmap_base;
} __attribute__((packed));

// Configurar TSS
tss.rsp0 = (uint64_t)kernel_stack_top;
tss.ist[0] = (uint64_t)double_fault_stack; // #DF
tss.ist[1] = (uint64_t)nmi_stack;          // NMI

// Carregar TSS
uint16_t tss_selector = 0x28; // GDT[5]
asm volatile("ltr %0" :: "r"(tss_selector));`}</code></pre>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* 6. Call Gates */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-purple-500/5 border-2 border-purple-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-purple-500/10 border-2 border-purple-500/20" whileHover={{ scale: 1.05 }}>
                  <Zap className="size-6 text-purple-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Call Gates</h2>
                  <p className="text-muted-foreground">Chamadas controladas entre rings</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-lg">Call Gates permitem que código de menor privilégio chame rotinas de maior privilégio de forma controlada.</p>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200">
                  <h4 className="font-semibold mb-4">Estrutura do Call Gate (8 bytes)</h4>
                  <pre className="text-xs font-mono bg-background/50 p-4 rounded"><code>{`  Offset 31:16 | P DPL 0 Type | Offset 15:0
     16 bits   |    8 bits    |   16 bits
                |              |
   Segment Sel  | Count |  Reserved
     16 bits    | 5 bits|  3 bits`}</code></pre>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <p><strong>Offset:</strong> Endereço da função destino</p>
                    <p><strong>Segment:</strong> Seletor do segmento de código</p>
                    <p><strong>DPL:</strong> Mínimo privilégio necessário (0-3)</p>
                    <p><strong>Count:</strong> Parâmetros a copiar da stack</p>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                  <pre className="text-sm"><code>{`// Exemplo: Call Gate para syscall (IA-32 legacy)
struct call_gate {
    uint16_t offset_low;
    uint16_t segment_selector;
    uint8_t  param_count : 5;
    uint8_t  reserved : 3;
    uint8_t  type : 4;    // 0xC = 32-bit call gate
    uint8_t  zero : 1;
    uint8_t  dpl : 2;     // 3 = user can call
    uint8_t  present : 1;
    uint16_t offset_high;
} __attribute__((packed));

// Criar call gate para syscall
call_gate gate;
gate.offset_low = (uint32_t)syscall_handler & 0xFFFF;
gate.offset_high = ((uint32_t)syscall_handler >> 16) & 0xFFFF;
gate.segment_selector = KERNEL_CS; // 0x08
gate.param_count = 0;
gate.type = 0xC; // 32-bit call gate
gate.dpl = 3;    // Ring 3 pode chamar
gate.present = 1;

// User space chama via CALL FAR
// CPU automaticamente:
// 1. Verifica DPL
// 2. Troca para Ring 0
// 3. Troca stack (via TSS)
// 4. Empilha SS, ESP, CS, EIP antigos
// 5. Salta para syscall_handler`}</code></pre>
                </Card>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
                  <p className="text-sm"><strong>⚠️ Obsoleto:</strong> Call Gates foram substituídos por <code className="bg-muted px-2 py-0.5 rounded text-xs">SYSENTER/SYSEXIT</code> (IA-32) e <code className="bg-muted px-2 py-0.5 rounded text-xs">SYSCALL/SYSRET</code> (x86-64), que são muito mais rápidos.</p>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* 7. Flat Segmentation (Linux/Windows) */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-green-500/5 border-2 border-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="p-3 rounded-xl bg-green-500/10 border-2 border-green-500/20" whileHover={{ scale: 1.05 }}>
                  <Terminal className="size-6 text-green-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Flat Segmentation (Moderno)</h2>
                  <p className="text-muted-foreground">Linux e Windows simplificam a segmentação</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-lg">Sistemas operacionais modernos usam <strong>&quot;Flat Model&quot;</strong>: todos os segmentos cobrem todo o espaço de endereçamento, efetivamente desabilitando a segmentação.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Terminal className="size-5 text-blue-600" />
                      Linux x86-64 GDT
                    </h4>
                    <pre className="text-xs font-mono bg-background/50 p-3 rounded"><code>{`GDT[0] = NULL
GDT[1] = __KERNEL_CS   (base=0, limit=4GB)
GDT[2] = __KERNEL_DS   (base=0, limit=4GB)
GDT[3] = __USER_CS     (base=0, limit=4GB)
GDT[4] = __USER_DS     (base=0, limit=4GB)
GDT[5] = TSS           (Task State Segment)

// Todos segmentos: base=0, limit=0xFFFFF
// G=1 (granularidade 4KB) → 4GB total
// Segmentação efetivamente desabilitada!`}</code></pre>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200">
                    <h4 className="font-bold mb-3">Por quê Flat Model?</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ <strong>Simplicidade:</strong> SO mais fácil de implementar</li>
                      <li>✓ <strong>Performance:</strong> Menos overhead</li>
                      <li>✓ <strong>Paginação:</strong> Já fornece proteção</li>
                      <li>✓ <strong>Portabilidade:</strong> Outras arquiteturas sem segmentação</li>
                      <li>✓ <strong>x86-64:</strong> Modo long simplifica ainda mais</li>
                    </ul>
                  </Card>
                </div>

                <Card className="p-6 bg-slate-950 text-slate-50 overflow-x-auto">
                  <pre className="text-sm"><code>{`// Linux: setup_gdt (arch/x86/kernel/cpu/common.c)
static const struct gdt_page gdt_page = {
    .gdt = {
        [GDT_ENTRY_KERNEL_CS]  = GDT_ENTRY(0xc09b, 0, 0xfffff),
        [GDT_ENTRY_KERNEL_DS]  = GDT_ENTRY(0xc093, 0, 0xfffff),
        [GDT_ENTRY_USER_CS]    = GDT_ENTRY(0xc0fb, 0, 0xfffff),
        [GDT_ENTRY_USER_DS]    = GDT_ENTRY(0xc0f3, 0, 0xfffff),
        [GDT_ENTRY_TSS]        = { 0 }, // Preenchido depois
    }
};

// Macro GDT_ENTRY:
// base = 0, limit = 0xFFFFF, flags = G|L|P|DPL|S|Type
// G=1 (4KB granularity) → 0xFFFFF × 4KB = 4GB
// L=0/1 (32/64-bit)
// P=1 (present)
// DPL=0 (kernel) ou 3 (user)
// S=1 (code/data)
// Type: code/data, executable, writable

// Resultado: Todo virtual address space é válido
// Segmentação não faz nada, paginação gerencia tudo!`}</code></pre>
                </Card>
              </div>
            </Card>
          </motion.section>

          {/* 8. Referências */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-8 bg-gradient-to-br from-background to-amber-500/5 border-2 border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="size-8 text-amber-500" />
                <h2 className="text-3xl font-bold">Referências Técnicas</h2>
              </div>
              <div className="space-y-3 text-sm">
                <p>• <strong>Intel® 64 and IA-32 Architectures Software Developer&apos;s Manual</strong> - Volume 3A: System Programming Guide (Chapters 3-7)</p>
                <p>• <strong>AMD64 Architecture Programmer&apos;s Manual</strong> - Volume 2: System Programming</p>
                <p>• <strong>Linux Kernel Source</strong> - <code className="bg-muted px-2 py-0.5 rounded text-xs">arch/x86/kernel/cpu/common.c</code></p>
                <p>• <strong>OSDev Wiki</strong> - <a href="https://wiki.osdev.org/GDT" className="text-primary hover:underline">GDT Tutorial</a></p>
                <p>• Tanenbaum - <em>&quot;Modern Operating Systems&quot;</em> (Chapter 3.3: Segmentation)</p>
              </div>
            </Card>
          </motion.section>

          <div className="flex justify-between pt-8">
            <a href="/os/memoria/segmentacao/combinado" className="text-primary hover:underline">← Anterior: Seg + Paginação</a>
            <a href="/os/memoria/segmentacao/exercicios" className="text-primary hover:underline flex items-center gap-2">
              Próximo: Exercícios <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
