"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { 
  Cpu, 
  HardDrive,
  Network,
  Terminal,
  Settings,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Database
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HardwareIOPage() {
  const mermaidRef1 = useRef<HTMLDivElement>(null);
  const mermaidRef2 = useRef<HTMLDivElement>(null);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import do mermaid apenas no client
    if (typeof window !== 'undefined' && !mermaidLoaded) {
      import('mermaid').then((mermaid) => {
        mermaid.default.initialize({ startOnLoad: true, theme: 'dark' });
        setMermaidLoaded(true);
    
        // Renderizar diagramas após mermaid carregar
        if (mermaidRef1.current) {
          mermaidRef1.current.innerHTML = `
graph TB
    CPU[CPU] -->|Instruções I/O| IOBus[Barramento I/O]
    IOBus --> Controller1[Controlador de Disco]
    IOBus --> Controller2[Controlador de Rede]
    IOBus --> Controller3[Controlador de Vídeo]
    Controller1 --> Disk[Disco Rígido]
    Controller2 --> Network[Placa de Rede]
    Controller3 --> Monitor[Monitor]
    CPU -->|Interrupção| InterruptController[Controlador de Interrupções]
    Disk -->|IRQ| InterruptController
    Network -->|IRQ| InterruptController
      `;
          mermaid.default.contentLoaded();
        }

        if (mermaidRef2.current) {
          mermaidRef2.current.innerHTML = `
sequenceDiagram
    participant CPU
    participant Driver
    participant Controller
    participant Device
    
    CPU->>Driver: write(data)
    Driver->>Controller: Comando I/O
    Controller->>Device: Executa operação
    Device-->>Controller: Dados/Status
    Controller-->>Driver: Interrupção (IRQ)
    Driver-->>CPU: Handler de interrupção
    CPU->>Driver: Processa resultado
      `;
          mermaid.default.contentLoaded();
        }
      }).catch((err) => {
        console.error('Erro ao carregar mermaid:', err);
      });
    }
  }, [mermaidLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
              <Cpu className="w-8 h-8 text-blue-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Hardware de I/O</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
            Hardware de Entrada e Saída
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            Dispositivos, controladores e mecanismos de interrupção baseados em Tanenbaum
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="dispositivos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dispositivos">
              <HardDrive className="w-4 h-4 mr-2" />
              Dispositivos
            </TabsTrigger>
            <TabsTrigger value="controladores">
              <Settings className="w-4 h-4 mr-2" />
              Controladores
            </TabsTrigger>
            <TabsTrigger value="interrupcoes">
              <AlertCircle className="w-4 h-4 mr-2" />
              Interrupções
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dispositivos" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <HardDrive className="w-6 h-6 text-blue-400" />
                Tipos de Dispositivos (Tanenbaum)
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-950/30 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold mb-4 text-blue-300 flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Dispositivos de Bloco
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Armazenam dados em blocos de tamanho fixo (geralmente 512 bytes ou 4KB)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Permitem acesso aleatório (qualquer bloco pode ser acessado diretamente)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Exemplos: discos rígidos (HDD), SSDs, pendrives, CDs/DVDs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Operações: read_block(n), write_block(n, data)</span>
                      </li>
                    </ul>
                    
                    <CodeBlock language="c" title="Exemplo: Leitura de Bloco">
{`// Ler bloco 42 de um disco
int read_disk_block(int block_number, void *buffer) {
    // Calcula posição física no disco
    off_t offset = block_number * BLOCK_SIZE;
    
    // Move cabeçote para posição (se necessário)
    seek_disk(offset);
    
    // Lê bloco completo
    return read_from_disk(buffer, BLOCK_SIZE);
}

// Exemplo de uso
char buffer[4096];
read_disk_block(42, buffer);  // Lê bloco 42 (4KB)`}
                    </CodeBlock>
                  </div>

                  <div className="p-6 bg-purple-950/30 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      Dispositivos de Caractere
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300 mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Transferem dados como stream de caracteres/bytes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Acesso sequencial (não é possível pular para posição arbitrária)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Exemplos: teclado, mouse, impressora, modem, terminal serial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Operações: read_char(), write_char(c)</span>
                      </li>
                    </ul>
                    
                    <CodeBlock language="c" title="Exemplo: Leitura de Caractere">
{`// Ler caractere do teclado
char read_keyboard() {
    // Aguarda até um caractere estar disponível
    while (!keyboard_has_data()) {
        // Busy wait ou bloqueia thread
    }
    
    // Lê caractere do buffer do teclado
    return keyboard_buffer_pop();
}

// Exemplo de uso
char c = read_keyboard();  // Lê próximo caractere digitado`}
                    </CodeBlock>
                  </div>
                </div>

                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-indigo-300">Comparação</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-indigo-500/30">
                          <th className="text-left p-3 text-indigo-300">Característica</th>
                          <th className="text-left p-3 text-indigo-300">Bloco</th>
                          <th className="text-left p-3 text-indigo-300">Caractere</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-indigo-500/20">
                          <td className="p-3">Unidade de transferência</td>
                          <td className="p-3 text-blue-300">Blocos (512B - 4KB)</td>
                          <td className="p-3 text-purple-300">Caracteres/Bytes</td>
                        </tr>
                        <tr className="border-b border-indigo-500/20">
                          <td className="p-3">Tipo de acesso</td>
                          <td className="p-3 text-blue-300">Aleatório</td>
                          <td className="p-3 text-purple-300">Sequencial</td>
                        </tr>
                        <tr className="border-b border-indigo-500/20">
                          <td className="p-3">Buffering</td>
                          <td className="p-3 text-blue-300">Cache do SO</td>
                          <td className="p-3 text-purple-300">Buffer pequeno</td>
                        </tr>
                        <tr>
                          <td className="p-3">Exemplos</td>
                          <td className="p-3 text-blue-300">HDD, SSD, USB</td>
                          <td className="p-3 text-purple-300">Teclado, Mouse, Impressora</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="controladores" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-400" />
                Controladores de I/O (Tanenbaum)
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-4 text-blue-300">Função dos Controladores</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Controladores são circuitos eletrônicos que fazem interface entre o barramento do sistema
                    e os dispositivos físicos. Eles abstraem detalhes de hardware específicos.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Responsabilidades:</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Conversão de sinais elétricos</li>
                        <li>Gerenciamento de buffers locais</li>
                        <li>Controle de erro e correção</li>
                        <li>Geração de interrupções</li>
                        <li>DMA (Direct Memory Access)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Registradores:</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Data Register: dados a transferir</li>
                        <li>Status Register: estado do dispositivo</li>
                        <li>Control Register: comandos e configuração</li>
                        <li>Address Register: endereço de memória (DMA)</li>
                      </ul>
                    </div>
                  </div>

                  <div ref={mermaidRef1} className="mermaid bg-slate-900/50 rounded-lg p-4" />
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Programmed I/O (PIO)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    CPU executa loop de polling, verificando continuamente o status do dispositivo.
                  </p>
                  
                  <CodeBlock language="c" title="Exemplo: Polling I/O">
{`// CPU verifica status continuamente
void write_char_pio(char c) {
    // Escreve caractere no data register
    outb(IO_DATA_REG, c);
    
    // Aguarda dispositivo ficar pronto (polling)
    while (inb(IO_STATUS_REG) & BUSY) {
        // CPU fica ocupada esperando
        // Desperdício de ciclos!
    }
    
    // Dispositivo processou
    // Continua execução
}

// Problema: CPU fica bloqueada esperando
// Solução: Usar interrupções`}
                  </CodeBlock>
                </Card>

                <Card className="bg-green-950/30 border-green-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-green-300">Interrupt-Driven I/O</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Dispositivo gera interrupção quando pronto, liberando CPU para outras tarefas.
                  </p>
                  
                  <div ref={mermaidRef2} className="mermaid bg-slate-900/50 rounded-lg p-4 mb-4" />
                  
                  <CodeBlock language="c" title="Exemplo: I/O com Interrupção">
{`// CPU inicia I/O e continua executando
void write_char_interrupt(char c) {
    // Escreve caractere
    outb(IO_DATA_REG, c);
    
    // Habilita interrupção
    enable_interrupt(IO_IRQ);
    
    // CPU continua executando outras tarefas
    // Não fica bloqueada!
}

// Handler de interrupção (executado quando dispositivo pronto)
void io_interrupt_handler(int irq) {
    // Processa dados recebidos
    char data = inb(IO_DATA_REG);
    
    // Sinaliza thread que estava esperando
    wake_up_waiting_thread();
    
    // Retorna para execução normal
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="interrupcoes" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-400" />
                Mecanismo de Interrupções (Tanenbaum)
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-4 text-blue-300">Conceito Fundamental</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Interrupções permitem que dispositivos notifiquem a CPU quando uma operação I/O é completada,
                    evitando que a CPU fique bloqueada em polling.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">1. Dispositivo Completa I/O</h5>
                      <p className="text-xs text-slate-300">
                        Dispositivo termina operação e envia sinal IRQ (Interrupt Request) para CPU
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">2. CPU Salva Contexto</h5>
                      <p className="text-xs text-slate-300">
                        CPU salva estado atual (registradores, PC) e chama handler de interrupção
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">3. Handler Executa</h5>
                      <p className="text-xs text-slate-300">
                        Handler processa interrupção, lê dados, sinaliza threads esperando
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Interrupt Descriptor Table (IDT)</h4>
                  
                  <CodeBlock language="c" title="Estrutura IDT (x86)">
{`// Entrada na IDT
struct idt_entry {
    uint16_t offset_low;    // Bits 0-15 do endereço do handler
    uint16_t selector;      // Segment selector (CS)
    uint8_t zero;
    uint8_t type_attr;      // Tipo e atributos
    uint16_t offset_high;   // Bits 16-31 do endereço
};

// IDT: array de 256 entradas
struct idt_entry idt[256];

// Registrar handler de interrupção
void register_interrupt_handler(int irq, void (*handler)(void)) {
    idt[irq].offset_low = (uint32_t)handler & 0xFFFF;
    idt[irq].offset_high = ((uint32_t)handler >> 16) & 0xFFFF;
    idt[irq].selector = KERNEL_CS;
    idt[irq].type_attr = 0x8E;  // Interrupt gate, Ring 0
}

// Exemplo: IRQ 14 = Disco IDE
register_interrupt_handler(14, disk_interrupt_handler);`}
                  </CodeBlock>
                </Card>

                <Card className="bg-green-950/30 border-green-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-green-300">Tipos de Interrupções</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-green-300">Hardware Interrupts (IRQ)</h5>
                      <p className="text-xs text-slate-300 mb-2">
                        Geradas por dispositivos físicos quando completam operação I/O.
                      </p>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>IRQ 0: Timer</li>
                        <li>IRQ 1: Teclado</li>
                        <li>IRQ 14: Disco IDE primário</li>
                        <li>IRQ 15: Disco IDE secundário</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-green-300">Software Interrupts (System Calls)</h5>
                      <p className="text-xs text-slate-300 mb-2">
                        Geradas por software através de instruções especiais (INT, SYSCALL).
                      </p>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>INT 0x80 (x86): System call Linux</li>
                        <li>SYSCALL (x86-64): System call otimizado</li>
                        <li>SVC (ARM): Supervisor call</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-green-300">Exceptions</h5>
                      <p className="text-xs text-slate-300 mb-2">
                        Geradas pela CPU quando ocorre erro ou condição especial.
                      </p>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>Page Fault (#PF)</li>
                        <li>General Protection Fault (#GP)</li>
                        <li>Division by Zero (#DE)</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

