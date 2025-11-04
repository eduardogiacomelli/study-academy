"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Settings, 
  Layers,
  Code2,
  BookOpen,
  Terminal,
  Cpu
} from "lucide-react";

export default function DriversPage() {
  const mermaidRef1 = useRef<HTMLDivElement>(null);
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
    App[Aplicativo] -->|syscall| Kernel[Kernel]
    Kernel --> VFS[VFS Layer]
    VFS --> FS[File System]
    FS --> Block[Block Layer]
    Block --> Driver[Device Driver]
    Driver --> Controller[I/O Controller]
    Controller --> Device[Hardware Device]
    
    Driver -->|Interrupt| IRQ[Interrupt Handler]
    IRQ -->|Wake up| Block
      `;
          mermaid.default.contentLoaded();
        }
      }).catch((err) => {
        console.error('Erro ao carregar mermaid:', err);
      });
    }
  }, [mermaidLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Device Drivers</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text">
            Device Drivers
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            Camadas de software, abstração de hardware e implementação de drivers baseados em Tanenbaum
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="camadas" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="camadas">
              <Layers className="w-4 h-4 mr-2" />
              Camadas
            </TabsTrigger>
            <TabsTrigger value="implementacao">
              <Code2 className="w-4 h-4 mr-2" />
              Implementação
            </TabsTrigger>
            <TabsTrigger value="exemplos">
              <BookOpen className="w-4 h-4 mr-2" />
              Exemplos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camadas" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-400" />
                Camadas de Software I/O (Tanenbaum)
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-4 text-purple-300">Arquitetura em Camadas</h4>
                  
                  <div ref={mermaidRef1} className="mermaid bg-slate-900/50 rounded-lg p-4 min-h-[400px] mb-4" />
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">1. Aplicação</h5>
                      <p className="text-sm text-slate-300">
                        Programa de usuário faz chamadas de sistema (open, read, write, close).
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">2. Kernel / VFS</h5>
                      <p className="text-sm text-slate-300">
                        Virtual File System roteia chamadas para sistema de arquivos apropriado.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">3. File System</h5>
                      <p className="text-sm text-slate-300">
                        Sistema de arquivos (ext4, FAT, etc.) gerencia estrutura de dados e blocos.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">4. Block Layer</h5>
                      <p className="text-sm text-slate-300">
                        Gerencia buffer cache, I/O scheduling e agrupamento de requisições.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">5. Device Driver</h5>
                      <p className="text-sm text-slate-300">
                        Driver específico do dispositivo traduz comandos genéricos para hardware específico.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-purple-300">6. I/O Controller</h5>
                      <p className="text-sm text-slate-300">
                        Controlador de hardware executa operações físicas no dispositivo.
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-blue-300">Funções do Device Driver</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Abstração</h5>
                      <p className="text-xs text-slate-300">
                        Esconde detalhes de hardware específico, oferecendo interface uniforme
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Tradução</h5>
                      <p className="text-xs text-slate-300">
                        Converte comandos genéricos (read, write) em comandos específicos do hardware
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Gerenciamento</h5>
                      <p className="text-xs text-slate-300">
                        Gerencia estado do dispositivo, buffers e registradores
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Interrupções</h5>
                      <p className="text-xs text-slate-300">
                        Processa interrupções do dispositivo e sinaliza conclusão de I/O
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="implementacao" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Estrutura de um Device Driver</h3>
              
              <CodeBlock language="c" title="Estrutura Básica de Driver Linux">
{`// Estrutura de operações de dispositivo (block device)
struct block_device_operations {
    int (*open)(struct block_device *, fmode_t);
    void (*release)(struct gendisk *, fmode_t);
    int (*ioctl)(struct block_device *, fmode_t, unsigned, unsigned long);
    // ... outras operações
};

// Estrutura de operações de char device
struct file_operations {
    struct module *owner;
    ssize_t (*read)(struct file *, char __user *, size_t, loff_t *);
    ssize_t (*write)(struct file *, const char __user *, size_t, loff_t *);
    int (*open)(struct inode *, struct file *);
    int (*release)(struct inode *, struct file *);
    long (*unlocked_ioctl)(struct file *, unsigned int, unsigned long);
    // ... muitas outras operações
};

// Registro de dispositivo
static int __init mydriver_init(void) {
    // Registra dispositivo
    major = register_chrdev(0, "mydriver", &my_fops);
    if (major < 0) {
        printk(KERN_ERR "Falha ao registrar dispositivo\\n");
        return major;
    }
    
    printk(KERN_INFO "Driver registrado com major %d\\n", major);
    return 0;
}

// Remoção de dispositivo
static void __exit mydriver_exit(void) {
    unregister_chrdev(major, "mydriver");
    printk(KERN_INFO "Driver removido\\n");
}

module_init(mydriver_init);
module_exit(mydriver_exit);`}
              </CodeBlock>

              <Card className="bg-purple-950/30 border-purple-500/20 p-6 mt-6">
                <h4 className="font-semibold mb-4 text-purple-300">Funções Principais</h4>
                
                <div className="space-y-4">
                  <CodeBlock language="c" title="Função open() - Inicialização">
{`static int mydriver_open(struct inode *inode, struct file *file) {
    // Verifica se dispositivo já está aberto
    if (device_busy) {
        return -EBUSY;
    }
    
    // Incrementa contador de referências
    device_busy = 1;
    try_module_get(THIS_MODULE);
    
    // Inicializa dispositivo (se necessário)
    initialize_device();
    
    return 0;  // Sucesso
}`}
                  </CodeBlock>

                  <CodeBlock language="c" title="Função read() - Leitura">
{`static ssize_t mydriver_read(struct file *file, char __user *buf, 
                               size_t count, loff_t *pos) {
    char kernel_buf[256];
    int bytes_read = 0;
    
    // Verifica limites
    if (*pos >= device_size) {
        return 0;  // EOF
    }
    
    // Lê do dispositivo
    bytes_read = read_from_hardware(kernel_buf, count);
    
    // Copia para user space
    if (copy_to_user(buf, kernel_buf, bytes_read)) {
        return -EFAULT;  // Erro de acesso
    }
    
    *pos += bytes_read;
    return bytes_read;
}`}
                  </CodeBlock>

                  <CodeBlock language="c" title="Função write() - Escrita">
{`static ssize_t mydriver_write(struct file *file, const char __user *buf,
                                size_t count, loff_t *pos) {
    char kernel_buf[256];
    int bytes_written = 0;
    
    // Verifica limites
    if (*pos >= device_size) {
        return -ENOSPC;  // Sem espaço
    }
    
    // Copia de user space
    if (copy_from_user(kernel_buf, buf, count)) {
        return -EFAULT;
    }
    
    // Escreve no hardware
    bytes_written = write_to_hardware(kernel_buf, count);
    
    *pos += bytes_written;
    return bytes_written;
}`}
                  </CodeBlock>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="exemplos" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Exemplos de Drivers</h3>
              
              <div className="space-y-6">
                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-blue-300">Driver de Disco</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Driver de disco gerencia blocos físicos, geometria do disco e controlador IDE/SATA.
                  </p>
                  
                  <CodeBlock language="c" title="Exemplo Simplificado">
{`// Driver de disco simplificado
static int disk_read_sector(int sector, void *buffer) {
    // Calcula posição física (C/H/S)
    int cylinder = sector / (heads * sectors_per_track);
    int head = (sector / sectors_per_track) % heads;
    int sect = sector % sectors_per_track;
    
    // Envia comando para controlador
    outb(0x1F2, 1);  // Número de setores
    outb(0x1F3, sect);
    outb(0x1F4, cylinder & 0xFF);
    outb(0x1F5, (cylinder >> 8) & 0xFF);
    outb(0x1F6, 0xE0 | (head << 4));
    outb(0x1F7, 0x20);  // Comando READ
    
    // Aguarda interrupção
    wait_for_interrupt();
    
    // Lê dados do registrador de dados
    for (int i = 0; i < 256; i++) {
        ((uint16_t*)buffer)[i] = inw(0x1F0);
    }
    
    return 0;
}`}
                  </CodeBlock>
                </Card>

                <Card className="bg-green-950/30 border-green-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-green-300">Driver de Teclado</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Driver de teclado processa scancodes e converte para caracteres ASCII.
                  </p>
                  
                  <CodeBlock language="c" title="Handler de Interrupção de Teclado">
{`// Handler de interrupção IRQ 1 (teclado)
static irqreturn_t keyboard_interrupt(int irq, void *dev_id) {
    unsigned char scancode;
    
    // Lê scancode do teclado
    scancode = inb(0x60);
    
    // Processa scancode
    if (scancode & 0x80) {
        // Key release
        handle_key_release(scancode & 0x7F);
    } else {
        // Key press
        char ascii = scancode_to_ascii(scancode);
        if (ascii) {
            // Adiciona ao buffer circular
            keyboard_buffer_write(ascii);
            // Acorda thread esperando
            wake_up_interruptible(&keyboard_wait_queue);
        }
    }
    
    return IRQ_HANDLED;
}

// Função read() do driver de teclado
static ssize_t keyboard_read(struct file *file, char __user *buf,
                             size_t count, loff_t *pos) {
    char c;
    
    // Bloqueia até caractere disponível
    if (wait_event_interruptible(keyboard_wait_queue, 
                                 keyboard_buffer_read(&c))) {
        return -ERESTARTSYS;
    }
    
    // Copia para user space
    if (copy_to_user(buf, &c, 1)) {
        return -EFAULT;
    }
    
    return 1;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

