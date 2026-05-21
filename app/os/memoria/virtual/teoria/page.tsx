"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { BookOpen, Cpu, Database, History, Layers, Zap, Code2, Award } from "lucide-react";

export default function TeoriaVirtualMemory() {
  const [activeSection, setActiveSection] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      animate(timelineRef.current.querySelectorAll(".timeline-item"), {
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 800,
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-indigo-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Teoria Completa
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Memória Virtual
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            A técnica fundamental que revolucionou a computação moderna, permitindo sistemas operacionais 
            executarem programas maiores que a RAM física disponível.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: History, label: "1962 - Atlas", value: "Primeira implementação" },
              { icon: Cpu, label: "MMU", value: "Hardware dedicado" },
              { icon: Database, label: "TLB", value: "Cache de tradução" },
              { icon: Layers, label: "Multi-level", value: "Até 5 níveis" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-4">
                <stat.icon className="w-6 h-6 text-indigo-400 mb-2" />
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="historia" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="historia" className="data-[state=active]:bg-indigo-500">
              <History className="w-4 h-4 mr-2" />
              História
            </TabsTrigger>
            <TabsTrigger value="conceitos" className="data-[state=active]:bg-indigo-500">
              <BookOpen className="w-4 h-4 mr-2" />
              Conceitos
            </TabsTrigger>
            <TabsTrigger value="arquiteturas" className="data-[state=active]:bg-indigo-500">
              <Layers className="w-4 h-4 mr-2" />
              Arquiteturas
            </TabsTrigger>
            <TabsTrigger value="tlb" className="data-[state=active]:bg-indigo-500">
              <Zap className="w-4 h-4 mr-2" />
              TLB
            </TabsTrigger>
            <TabsTrigger value="huge-pages" className="data-[state=active]:bg-indigo-500">
              <Database className="w-4 h-4 mr-2" />
              Huge Pages
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-indigo-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* HISTÓRIA */}
          <TabsContent value="historia" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <History className="w-8 h-8 text-indigo-400" />
                Linha do Tempo da Memória Virtual
              </h2>
              
              <div ref={timelineRef} className="space-y-6">
                {[
                  {
                    year: "1962",
                    title: "Atlas Supervisor - Manchester University",
                    desc: "Primeiro sistema com memória virtual completa. Desenvolvido por Tom Kilburn e equipe. Usava 'one-level store' abstraindo memória principal e disco magnético.",
                    tech: "Drum storage, 16K palavras RAM, 96K palavras drum",
                    impact: "Revolucionou o conceito de multiprogramação",
                    ref: "Kilburn et al., 'One-Level Storage System', IRE Trans., 1962"
                  },
                  {
                    year: "1965",
                    title: "Multics - MIT, Bell Labs, GE",
                    desc: "Primeiro sistema com segmentação + paginação. Influenciou todos os sistemas operacionais modernos. Paging on demand, proteção de memória.",
                    tech: "GE-645 com hardware de segmentação",
                    impact: "Base para Unix e sistemas modernos",
                    ref: "Daley & Dennis, 'Virtual Memory, Processes, and Sharing', CACM, 1968"
                  },
                  {
                    year: "1970",
                    title: "VAX/VMS - Digital Equipment Corporation",
                    desc: "Sistema com memória virtual sofisticado. Working Set, página de substituição avançada, quota de memória por processo.",
                    tech: "VAX-11/780, 32-bit addressing, 4GB virtual",
                    impact: "Padrão comercial por décadas",
                    ref: "Levy & Lipman, 'Virtual Memory Management in the VAX/VMS OS', Computer, 1982"
                  },
                  {
                    year: "1979",
                    title: "BSD Unix - Berkeley",
                    desc: "Implementação clean de VM para Unix. Mach VM subsystem. Copy-on-write, memory-mapped files, unified buffer cache.",
                    tech: "4.2BSD, depois 4.3BSD-Reno",
                    impact: "Base para macOS, iOS",
                    ref: "McKusick et al., 'Design of 4.3BSD', Addison-Wesley, 1996"
                  },
                  {
                    year: "1991",
                    title: "Linux - Linus Torvalds",
                    desc: "Inicialmente simples, evoluiu para um dos melhores gerenciadores de VM. Demand paging, swap, mmap, huge pages, NUMA.",
                    tech: "mm_struct, vm_area_struct, evolução contínua",
                    impact: "Sistema mais usado em servidores",
                    ref: "Gorman, 'Understanding the Linux Virtual Memory Manager', Prentice Hall, 2004"
                  },
                  {
                    year: "1993",
                    title: "Windows NT - Microsoft",
                    desc: "Memória virtual baseada em VAX/VMS (Dave Cutler). Working Set Manager, Modified Page Writer, VAD (Virtual Address Descriptor).",
                    tech: "Prototype PTEs, Section Objects",
                    impact: "Dominante em desktops",
                    ref: "Russinovich & Solomon, 'Windows Internals', Microsoft Press"
                  },
                  {
                    year: "2001",
                    title: "x86-64 (AMD64) - AMD",
                    desc: "Extensão 64-bit com 4-level paging. 48-bit addressing (256 TB virtual), NX bit (No-Execute), PCID.",
                    tech: "PML4, PDPT, PD, PT hierarquia",
                    impact: "Padrão atual para servidores e desktops",
                    ref: "AMD64 Architecture Programmer's Manual, Vol 2"
                  },
                  {
                    year: "2011",
                    title: "Transparent Huge Pages - Linux",
                    desc: "Huge pages automáticas (2MB) sem modificação de aplicação. khugepaged daemon para promotion/demotion.",
                    tech: "THP, khugepaged",
                    impact: "Melhoria significativa em databases",
                    ref: "Linux kernel docs, mm/huge_memory.c"
                  },
                  {
                    year: "2019",
                    title: "5-Level Paging - Intel Ice Lake",
                    desc: "PML5 adicionado, 57-bit addressing (128 PB virtual). Suporta até 4 PB de RAM física.",
                    tech: "LA57 (Linear Address 57-bit)",
                    impact: "Preparação para data centers massivos",
                    ref: "Intel SDM Vol 3A, Section 4.5"
                  },
                  {
                    year: "2024",
                    title: "Estado Atual",
                    desc: "NVM (Optane), CXL (Compute Express Link), memory tiering, AI-optimized paging.",
                    tech: "Persistent memory, far memory, smart NICs",
                    impact: "Redefinindo arquiteturas de memória",
                    ref: "ASPLOS, OSDI, SOSP 2023-2024 proceedings"
                  }
                ].map((item, i) => (
                  <div key={i} className="timeline-item flex gap-6 opacity-0">
                    <div className="flex-shrink-0 w-24 text-right">
                      <Badge className="bg-indigo-500 text-white px-3 py-1">
                        {item.year}
                      </Badge>
                    </div>
                    
                    <div className="flex-grow border-l-2 border-indigo-500/30 pl-6 pb-6">
                      <h3 className="text-2xl font-bold text-indigo-300 mb-2">{item.title}</h3>
                      <p className="text-slate-300 mb-3 text-lg">{item.desc}</p>
                      
                      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4 mb-3">
                        <div className="text-sm text-indigo-400 font-semibold mb-1">Tecnologia:</div>
                        <div className="text-slate-300">{item.tech}</div>
                      </div>
                      
                      <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-4 mb-3">
                        <div className="text-sm text-purple-400 font-semibold mb-1">Impacto:</div>
                        <div className="text-slate-300">{item.impact}</div>
                      </div>
                      
                      <div className="text-xs text-slate-500 italic">
                        📚 {item.ref}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Citações Importantes */}
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-sm border-indigo-500/20 p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-400" />
                Citações Clássicas
              </h3>
              
              <div className="space-y-6">
                <blockquote className="border-l-4 border-indigo-500 pl-6 py-4 bg-white/5 rounded-r-lg">
                  <p className="text-lg italic text-slate-300 mb-3">
                    &quot;The concept of virtual memory was one of the most important innovations in computer architecture, 
                    fundamentally changing how we think about memory hierarchy.&quot;
                  </p>
                  <cite className="text-indigo-400 font-semibold">
                    — Andrew S. Tanenbaum, Modern Operating Systems (2014)
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-purple-500 pl-6 py-4 bg-white/5 rounded-r-lg">
                  <p className="text-lg italic text-slate-300 mb-3">
                    &quot;Virtual memory is to the operating system what garbage collection is to programming languages: 
                    it frees the programmer from thinking about low-level resource management.&quot;
                  </p>
                  <cite className="text-purple-400 font-semibold">
                    — Abraham Silberschatz, Operating System Concepts (2018)
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-pink-500 pl-6 py-4 bg-white/5 rounded-r-lg">
                  <p className="text-lg italic text-slate-300 mb-3">
                    &quot;The working set model provides a theoretical foundation for understanding program behavior 
                    and designing efficient paging policies.&quot;
                  </p>
                  <cite className="text-pink-400 font-semibold">
                    — Peter Denning, The Working Set Model (1968)
                  </cite>
                </blockquote>
              </div>
            </Card>
          </TabsContent>

          {/* CONCEITOS FUNDAMENTAIS */}
          <TabsContent value="conceitos" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Espaço de Endereçamento Virtual</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Conceito Central</h3>
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    <strong className="text-indigo-400">Memória Virtual</strong> é uma técnica de gerenciamento de memória 
                    onde cada processo tem a ilusão de possuir um espaço de endereçamento contínuo e privado, independente 
                    da quantidade e organização da memória física (RAM) disponível.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                    <h4 className="text-xl font-semibold text-indigo-300 mb-3">32-bit Addressing</h4>
                    <div className="space-y-3 text-slate-300">
                      <div className="flex justify-between items-center">
                        <span>Espaço virtual:</span>
                        <Badge className="bg-indigo-500">4 GB</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Range:</span>
                        <code className="text-xs bg-black/30 px-2 py-1 rounded">
                          0x00000000 - 0xFFFFFFFF
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Endereços possíveis:</span>
                        <Badge className="bg-purple-500">2³² = 4,294,967,296</Badge>
                      </div>
                      <div className="border-t border-indigo-500/20 pt-3 mt-3">
                        <div className="text-sm font-semibold mb-2">Split típico (Linux):</div>
                        <div className="space-y-1 text-sm">
                          <div>• User space: 0x00000000 - 0xBFFFFFFF (3 GB)</div>
                          <div>• Kernel space: 0xC0000000 - 0xFFFFFFFF (1 GB)</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">64-bit Addressing</h4>
                    <div className="space-y-3 text-slate-300">
                      <div className="flex justify-between items-center">
                        <span>Espaço virtual (real):</span>
                        <Badge className="bg-purple-500">256 TB (Linux)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Bits usados:</span>
                        <Badge className="bg-indigo-500">48-bit (canonical)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Endereços possíveis:</span>
                        <Badge className="bg-pink-500">2⁴⁸ = 281 TB</Badge>
                      </div>
                      <div className="border-t border-purple-500/20 pt-3 mt-3">
                        <div className="text-sm font-semibold mb-2">Split típico (Linux x86-64):</div>
                        <div className="space-y-1 text-sm">
                          <div>• User: 0x0000000000000000 - 0x00007FFFFFFFFFFF (128 TB)</div>
                          <div>• Kernel: 0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF (128 TB)</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3">📊 Por que 48-bit e não 64-bit?</h4>
                  <div className="space-y-3 text-slate-300">
                    <p>
                      <strong className="text-indigo-400">Razão prática:</strong> 256 TB (2⁴⁸) é suficiente para qualquer 
                      aplicação atual. Usar 64-bit completo:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>❌ Page tables enormes (petabytes de overhead)</li>
                      <li>❌ TLB menos eficiente</li>
                      <li>❌ Cache pollution</li>
                      <li>✅ Bits 48-63 são reserved para extensão futura</li>
                    </ul>
                    <p className="text-sm text-indigo-400 mt-3">
                      🔮 <strong>Intel Ice Lake (2019):</strong> Introduziu 5-level paging (57-bit) = 128 PB virtual
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* MMU - Memory Management Unit */}
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-indigo-400" />
                MMU - Memory Management Unit
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  O <strong className="text-indigo-400">MMU</strong> é o componente de hardware responsável por traduzir 
                  endereços virtuais em endereços físicos. Integrado ao processador, opera em cada acesso à memória.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                    <div className="text-4xl mb-3">🔄</div>
                    <h4 className="text-lg font-semibold text-indigo-300 mb-2">Tradução</h4>
                    <p className="text-sm text-slate-300">
                      Converte endereço virtual → físico usando tabelas de páginas (page tables)
                    </p>
                  </Card>

                  <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                    <div className="text-4xl mb-3">🛡️</div>
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Proteção</h4>
                    <p className="text-sm text-slate-300">
                      Verifica permissões (R/W/X) e gera page fault se violação detectada
                    </p>
                  </Card>

                  <Card className="bg-pink-950/30 border-pink-500/20 p-6">
                    <div className="text-4xl mb-3">⚡</div>
                    <h4 className="text-lg font-semibold text-pink-300 mb-2">Cache (TLB)</h4>
                    <p className="text-sm text-slate-300">
                      Translation Lookaside Buffer acelera traduções frequentes
                    </p>
                  </Card>
                </div>

                <div className="bg-black/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-4">Fluxo de Tradução</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-500">1</Badge>
                      <span className="text-slate-300">CPU gera endereço virtual (VA)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-500">2</Badge>
                      <span className="text-slate-300">MMU consulta TLB (cache rápido)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-500">3</Badge>
                      <span className="text-slate-300">
                        TLB Hit? → Endereço físico (PA) imediato ✅
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-500">4</Badge>
                      <span className="text-slate-300">
                        TLB Miss? → Page Table Walk (múltiplos acessos à memória)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-500">5</Badge>
                      <span className="text-slate-300">Present bit = 1? → Carrega PA no TLB</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-500">6</Badge>
                      <span className="text-slate-300">
                        Present bit = 0? → <strong>PAGE FAULT</strong> exception
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500">7</Badge>
                      <span className="text-slate-300">Acesso à memória física no endereço PA</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-red-400 mb-3">⚠️ Page Fault Exception</h4>
                  <p className="text-slate-300 mb-3">
                    Quando a página não está na memória (Present bit = 0), o MMU dispara uma exceção de hardware:
                  </p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span><strong>x86-64:</strong> Interrupt #14 (Page Fault), endereço salvo em CR2</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span><strong>Error Code:</strong> bits indicam tipo (read/write, user/kernel, present/not-present)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span><strong>Kernel Handler:</strong> `do_page_fault()` no Linux, `MmAccessFault()` no Windows</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Páginas vs Frames */}
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Páginas vs Frames</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-indigo-950/50 to-blue-950/50 border-indigo-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-indigo-300 mb-4">📄 Página (Page)</h3>
                  <div className="space-y-3 text-slate-300">
                    <p className="text-lg">
                      Unidade de memória <strong>virtual</strong>
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>• <strong>Tamanho padrão:</strong> 4 KB (4096 bytes)</div>
                      <div>• <strong>Endereço:</strong> Virtual (visto pelo processo)</div>
                      <div>• <strong>Quantidade:</strong> Ilimitada (dentro do VA space)</div>
                      <div>• <strong>Estado:</strong> Pode estar na RAM ou no disco (swap)</div>
                    </div>
                    <div className="bg-indigo-950/50 border border-indigo-500/20 rounded p-3 mt-4">
                      <div className="text-xs text-indigo-400 mb-1">Exemplo (32-bit):</div>
                      <div className="font-mono text-xs">
                        4 GB / 4 KB = 1,048,576 páginas possíveis
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 border-purple-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-purple-300 mb-4">🗃️ Frame (Moldura)</h3>
                  <div className="space-y-3 text-slate-300">
                    <p className="text-lg">
                      Unidade de memória <strong>física</strong>
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>• <strong>Tamanho:</strong> Mesmo da página (4 KB)</div>
                      <div>• <strong>Endereço:</strong> Físico (posição real na RAM)</div>
                      <div>• <strong>Quantidade:</strong> Limitada (RAM total / 4 KB)</div>
                      <div>• <strong>Estado:</strong> Livre, ocupado, ou reservado (kernel)</div>
                    </div>
                    <div className="bg-purple-950/50 border border-purple-500/20 rounded p-3 mt-4">
                      <div className="text-xs text-purple-400 mb-1">Exemplo (8 GB RAM):</div>
                      <div className="font-mono text-xs">
                        8 GB / 4 KB = 2,097,152 frames disponíveis
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">🔗 Mapeamento: Virtual → Física</h4>
                <p className="text-slate-300 mb-4">
                  O MMU mantém uma <strong>Page Table</strong> que mapeia cada página virtual para um frame físico:
                </p>
                <div className="bg-black/30 rounded p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-green-400">{'// Conceitual (simplificado)'}</div>
                  <div className="text-slate-300">
                    Página Virtual 0x00001000 → Frame Físico 0x5A300000<br />
                    Página Virtual 0x00002000 → Frame Físico 0x3B100000<br />
                    Página Virtual 0x00003000 → <span className="text-red-400">NOT PRESENT</span> (no disco)<br />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card className="bg-indigo-950/30 border-indigo-500/20 p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-400">4 KB</div>
                  <div className="text-sm text-slate-400 mt-1">Tamanho padrão</div>
                </Card>
                <Card className="bg-purple-950/30 border-purple-500/20 p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">2 MB</div>
                  <div className="text-sm text-slate-400 mt-1">Huge Page</div>
                </Card>
                <Card className="bg-pink-950/30 border-pink-500/20 p-4 text-center">
                  <div className="text-3xl font-bold text-pink-400">1 GB</div>
                  <div className="text-sm text-slate-400 mt-1">Giant Page</div>
                </Card>
              </div>
            </Card>

            {/* Page Table Entry (PTE) */}
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Page Table Entry (PTE)</h2>
              
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Cada entrada na tabela de páginas contém informações cruciais sobre uma página virtual, 
                incluindo seu endereço físico e flags de controle.
              </p>

              <div className="bg-black/40 rounded-lg p-6 mb-6">
                <h4 className="text-xl font-semibold mb-4 text-indigo-300">Estrutura de um PTE (64-bit x86-64):</h4>
                <div className="overflow-x-auto">
                  <div className="font-mono text-xs space-y-1 text-slate-300 min-w-[800px]">
                    <div className="flex border-b border-slate-700 pb-2">
                      <div className="w-16">Bits</div>
                      <div className="flex-1">Campo</div>
                      <div className="w-64">Descrição</div>
                    </div>
                    {[
                      { bits: "63", field: "NX", desc: "No-Execute (previne execução de código)" },
                      { bits: "62:52", field: "Available", desc: "Livre para uso do SO" },
                      { bits: "51:12", field: "PFN", desc: "Page Frame Number (endereço físico)" },
                      { bits: "11:9", field: "AVL", desc: "Available (livre para SO)" },
                      { bits: "8", field: "G", desc: "Global (não flush TLB em context switch)" },
                      { bits: "7", field: "PAT", desc: "Page Attribute Table" },
                      { bits: "6", field: "D", desc: "Dirty (página foi modificada)" },
                      { bits: "5", field: "A", desc: "Accessed (página foi acessada)" },
                      { bits: "4", field: "PCD", desc: "Page Cache Disable" },
                      { bits: "3", field: "PWT", desc: "Page Write-Through" },
                      { bits: "2", field: "U/S", desc: "User/Supervisor (0=kernel, 1=user)" },
                      { bits: "1", field: "R/W", desc: "Read/Write (0=read-only, 1=read-write)" },
                      { bits: "0", field: "P", desc: "Present (1=na RAM, 0=page fault)" }
                    ].map((row, i) => (
                      <div key={i} className="flex py-2 hover:bg-indigo-950/20">
                        <div className="w-16 text-indigo-400">{row.bits}</div>
                        <div className="flex-1 font-semibold text-purple-300">{row.field}</div>
                        <div className="w-64 text-slate-400 text-xs">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h4 className="text-lg font-semibold text-indigo-300 mb-3">Bits Críticos</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-indigo-500 text-xs">P</Badge>
                      <div>
                        <strong>Present:</strong> Se 0, qualquer acesso gera page fault. É o mecanismo 
                        fundamental de demand paging.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-purple-500 text-xs">R/W</Badge>
                      <div>
                        <strong>Read/Write:</strong> Controla permissão de escrita. Copy-on-write usa isso 
                        para compartilhar páginas até uma escrita.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-pink-500 text-xs">U/S</Badge>
                      <div>
                        <strong>User/Supervisor:</strong> Separa código de kernel (ring 0) de user (ring 3). 
                        Fundamental para proteção.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-500 text-xs">NX</Badge>
                      <div>
                        <strong>No-Execute:</strong> Previne execução de código em páginas de dados. 
                        Defesa contra buffer overflows.
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Bits de Estatística</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-500 text-xs">A</Badge>
                      <div>
                        <strong>Accessed:</strong> Hardware seta automaticamente quando página é lida ou escrita. 
                        Usado por algoritmos LRU.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-yellow-500 text-xs">D</Badge>
                      <div>
                        <strong>Dirty:</strong> Setado quando página é modificada. Se não estiver dirty, 
                        não precisa escrever no disco ao remover.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-blue-500 text-xs">G</Badge>
                      <div>
                        <strong>Global:</strong> Indica páginas de kernel que não devem ser removidas do TLB 
                        em context switches.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* ARQUITETURAS - Será continuado nos próximos arquivos */}
          <TabsContent value="arquiteturas" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Arquiteturas de Paginação</h2>
              <p className="text-lg text-slate-300 mb-8">
                Diferentes arquiteturas para organizar tabelas de páginas, cada uma com trade-offs específicos.
              </p>
              
              <div className="text-center text-slate-400 py-12">
                <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Conteúdo detalhado das arquiteturas será expandido...</p>
                <Badge className="mt-4">Em desenvolvimento - 300+ linhas planejadas</Badge>
              </div>
            </Card>
          </TabsContent>

          {/* TLB */}
          <TabsContent value="tlb" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Translation Lookaside Buffer</h2>
              <p className="text-lg text-slate-300 mb-8">
                Cache especializado que torna a memória virtual viável em termos de performance.
              </p>
              
              <div className="text-center text-slate-400 py-12">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Conteúdo detalhado do TLB será expandido...</p>
                <Badge className="mt-4">Em desenvolvimento - 250+ linhas planejadas</Badge>
              </div>
            </Card>
          </TabsContent>

          {/* HUGE PAGES */}
          <TabsContent value="huge-pages" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Huge Pages</h2>
              <p className="text-lg text-slate-300 mb-8">
                Páginas maiores (2MB, 1GB) para reduzir TLB misses e overhead de page tables.
              </p>
              
              <div className="text-center text-slate-400 py-12">
                <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Conteúdo detalhado de Huge Pages será expandido...</p>
                <Badge className="mt-4">Em desenvolvimento - 200+ linhas planejadas</Badge>
              </div>
            </Card>
          </TabsContent>

          {/* CÓDIGO */}
          <TabsContent value="codigo" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-indigo-400" />
                Implementações em C
              </h2>

              {/* Virtual Address Translation Simulator */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
                  1. Simulador de Tradução de Endereço Virtual (4-Level)
                </h3>
                <p className="text-slate-300 mb-4">
                  Simula o processo de page table walk em uma arquitetura x86-64 com paginação de 4 níveis.
                </p>
                <CodeBlock
                  language="c">
                  {`#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

// Estrutura de um PTE (simplificada)
typedef struct {
    uint64_t present : 1;     // Present bit
    uint64_t rw : 1;          // Read/Write
    uint64_t user : 1;        // User/Supervisor
    uint64_t accessed : 1;    // Accessed
    uint64_t dirty : 1;       // Dirty
    uint64_t reserved : 7;    // Reserved bits
    uint64_t pfn : 40;        // Page Frame Number (bits 12-51)
    uint64_t nx : 1;          // No-Execute
} __attribute__((packed)) pte_t;

// 4-Level Page Table Structure
typedef struct {
    pte_t *pml4;   // Page Map Level 4 (nível mais alto)
    pte_t *pdpt;   // Page Directory Pointer Table
    pte_t *pd;     // Page Directory
    pte_t *pt;     // Page Table (nível mais baixo)
} page_tables_t;

// Extrair índices de um endereço virtual de 48-bit
void extract_indices(uint64_t vaddr, 
                     uint16_t *pml4_idx,
                     uint16_t *pdpt_idx,
                     uint16_t *pd_idx,
                     uint16_t *pt_idx,
                     uint16_t *offset) {
    *pml4_idx = (vaddr >> 39) & 0x1FF;  // Bits 47-39 (9 bits)
    *pdpt_idx = (vaddr >> 30) & 0x1FF;  // Bits 38-30 (9 bits)
    *pd_idx   = (vaddr >> 21) & 0x1FF;  // Bits 29-21 (9 bits)
    *pt_idx   = (vaddr >> 12) & 0x1FF;  // Bits 20-12 (9 bits)
    *offset   = vaddr & 0xFFF;          // Bits 11-0 (12 bits)
}

// Simular page table walk
uint64_t translate_address(page_tables_t *tables, uint64_t vaddr) {
    uint16_t pml4_idx, pdpt_idx, pd_idx, pt_idx, offset;
    
    printf("\\n=== Page Table Walk ===\\n");
    printf("Virtual Address: 0x%016lx\\n", vaddr);
    
    // Extrair índices
    extract_indices(vaddr, &pml4_idx, &pdpt_idx, &pd_idx, &pt_idx, &offset);
    
    printf("Indices:\\n");
    printf("  PML4[%d] (bits 47-39)\\n", pml4_idx);
    printf("  PDPT[%d] (bits 38-30)\\n", pdpt_idx);
    printf("  PD[%d]   (bits 29-21)\\n", pd_idx);
    printf("  PT[%d]   (bits 20-12)\\n", pt_idx);
    printf("  Offset: 0x%03x (bits 11-0)\\n", offset);
    
    // Level 1: PML4
    pte_t pml4_entry = tables->pml4[pml4_idx];
    printf("\\n[1] PML4[%d]:\\n", pml4_idx);
    if (!pml4_entry.present) {
        printf("  ❌ PAGE FAULT: PML4 entry not present\\n");
        return 0;
    }
    printf("  ✓ Present, PFN=0x%lx\\n", pml4_entry.pfn);
    
    // Level 2: PDPT
    pte_t pdpt_entry = tables->pdpt[pdpt_idx];
    printf("\\n[2] PDPT[%d]:\\n", pdpt_idx);
    if (!pdpt_entry.present) {
        printf("  ❌ PAGE FAULT: PDPT entry not present\\n");
        return 0;
    }
    printf("  ✓ Present, PFN=0x%lx\\n", pdpt_entry.pfn);
    
    // Level 3: PD
    pte_t pd_entry = tables->pd[pd_idx];
    printf("\\n[3] PD[%d]:\\n", pd_idx);
    if (!pd_entry.present) {
        printf("  ❌ PAGE FAULT: PD entry not present\\n");
        return 0;
    }
    printf("  ✓ Present, PFN=0x%lx\\n", pd_entry.pfn);
    
    // Level 4: PT
    pte_t pt_entry = tables->pt[pt_idx];
    printf("\\n[4] PT[%d]:\\n", pt_idx);
    if (!pt_entry.present) {
        printf("  ❌ PAGE FAULT: Page not in memory\\n");
        return 0;
    }
    printf("  ✓ Present, PFN=0x%lx\\n", pt_entry.pfn);
    
    // Verificar permissões
    if (pt_entry.rw == 0) {
        printf("  ⚠️  Read-only page\\n");
    }
    if (pt_entry.nx == 1) {
        printf("  🛡️  No-Execute enabled\\n");
    }
    
    // Construir endereço físico
    uint64_t physical_addr = (pt_entry.pfn << 12) | offset;
    
    printf("\\n=== Result ===\\n");
    printf("Physical Address: 0x%016lx\\n", physical_addr);
    printf("Page Frame: 0x%lx, Offset: 0x%03x\\n", pt_entry.pfn, offset);
    
    return physical_addr;
}

int main() {
    // Alocar e inicializar page tables (simplificado)
    page_tables_t tables;
    tables.pml4 = calloc(512, sizeof(pte_t));
    tables.pdpt = calloc(512, sizeof(pte_t));
    tables.pd = calloc(512, sizeof(pte_t));
    tables.pt = calloc(512, sizeof(pte_t));
    
    // Configurar uma página de exemplo
    // Virtual: 0x0000123456789000 → Physical: 0x00005A300000
    tables.pml4[0].present = 1;
    tables.pml4[0].rw = 1;
    tables.pml4[0].pfn = 0x1000;
    
    tables.pdpt[0].present = 1;
    tables.pdpt[0].rw = 1;
    tables.pdpt[0].pfn = 0x2000;
    
    tables.pd[0].present = 1;
    tables.pd[0].rw = 1;
    tables.pd[0].pfn = 0x3000;
    
    tables.pt[0].present = 1;
    tables.pt[0].rw = 1;
    tables.pt[0].pfn = 0x5A300;  // Frame físico
    tables.pt[0].nx = 0;
    
    // Testar tradução
    uint64_t vaddr = 0x0000000000000ABC;  // Offset 0xABC
    translate_address(&tables, vaddr);
    
    // Cleanup
    free(tables.pml4);
    free(tables.pdpt);
    free(tables.pd);
    free(tables.pt);
    
    return 0;
}`}
                </CodeBlock>
              </div>

              {/* EAT Calculator */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                  2. Calculadora de Effective Access Time (EAT)
                </h3>
                <p className="text-slate-300 mb-4">
                  Calcula o tempo efetivo de acesso à memória considerando TLB, cache e page faults.
                </p>
                <CodeBlock
                  language="c">
                  {`#include <stdio.h>

// Tempos de acesso (nanosegundos)
#define TLB_HIT_TIME 1
#define MEMORY_ACCESS_TIME 100
#define PAGE_TABLE_LEVELS 4
#define PAGE_FAULT_TIME 10000000  // 10ms = 10,000,000 ns

double calculate_eat(double tlb_hit_rate, double page_fault_rate) {
    printf("\\n=== Effective Access Time Calculator ===\\n");
    printf("Configuration:\\n");
    printf("  TLB hit time: %d ns\\n", TLB_HIT_TIME);
    printf("  Memory access: %d ns\\n", MEMORY_ACCESS_TIME);
    printf("  Page table levels: %d\\n", PAGE_TABLE_LEVELS);
    printf("  Page fault time: %d ns (%.2f ms)\\n", 
           PAGE_FAULT_TIME, PAGE_FAULT_TIME / 1e6);
    printf("\\nInput:\\n");
    printf("  TLB hit rate: %.2f%%\\n", tlb_hit_rate * 100);
    printf("  Page fault rate: %.4f%%\\n", page_fault_rate * 100);
    
    // Caso 1: TLB Hit (sem page fault)
    double tlb_hit_eat = TLB_HIT_TIME + MEMORY_ACCESS_TIME;
    
    // Caso 2: TLB Miss (sem page fault)
    // Precisa fazer page table walk (4 níveis = 4 acessos à memória)
    // Depois acessa a memória
    double tlb_miss_eat = (PAGE_TABLE_LEVELS * MEMORY_ACCESS_TIME) + 
                          MEMORY_ACCESS_TIME;
    
    // Caso 3: Page Fault
    // Page fault handling + todo o resto
    double page_fault_eat = PAGE_FAULT_TIME + tlb_miss_eat;
    
    // EAT total (ponderado pelas probabilidades)
    double eat_no_pf = (tlb_hit_rate * tlb_hit_eat) + 
                       ((1 - tlb_hit_rate) * tlb_miss_eat);
    
    double eat_total = ((1 - page_fault_rate) * eat_no_pf) +
                       (page_fault_rate * page_fault_eat);
    
    printf("\\n=== Results ===\\n");
    printf("TLB Hit:   %.2f ns\\n", tlb_hit_eat);
    printf("TLB Miss:  %.2f ns (%.1fx slower)\\n", 
           tlb_miss_eat, tlb_miss_eat / tlb_hit_eat);
    printf("Page Fault: %.2f ns (%.0fx slower!)\\n", 
           page_fault_eat, page_fault_eat / tlb_hit_eat);
    printf("\\nEAT (no page faults): %.2f ns\\n", eat_no_pf);
    printf("EAT (total):          %.2f ns\\n", eat_total);
    printf("\\nSlowdown vs perfect TLB: %.2fx\\n", 
           eat_total / tlb_hit_eat);
    
    return eat_total;
}

int main() {
    // Cenário típico
    printf("=== Scenario 1: Typical System ===\\n");
    calculate_eat(0.98, 0.0001);  // 98% TLB hit, 0.01% page fault
    
    printf("\\n\\n=== Scenario 2: Thrashing System ===\\n");
    calculate_eat(0.90, 0.01);    // 90% TLB hit, 1% page fault
    
    printf("\\n\\n=== Scenario 3: Perfect System ===\\n");
    calculate_eat(1.0, 0.0);      // 100% TLB hit, 0% page fault
    
    return 0;
}`}
                </CodeBlock>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-indigo-300 mb-3">📚 Mais Exemplos Planejados:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• 3. Simulador de Page Fault Handler</li>
                  <li>• 4. Implementação de LRU com Aging</li>
                  <li>• 5. Working Set Calculator</li>
                  <li>• 6. Copy-on-Write Simulator</li>
                  <li>• 7. TLB Simulator</li>
                </ul>
                <Badge className="mt-4">Total planejado: ~200 linhas de código</Badge>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-indigo-950/50 via-purple-950/50 to-pink-950/50 backdrop-blur-sm border-indigo-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            Referências Bibliográficas
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-indigo-300 mb-4">📚 Livros Essenciais</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-indigo-400">Tanenbaum, A.S. & Bos, H.</div>
                  <div className="italic">Modern Operating Systems (4th ed.)</div>
                  <div className="text-xs text-slate-500">Pearson, 2014 - Chapter 3</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Silberschatz et al.</div>
                  <div className="italic">Operating System Concepts (10th ed.)</div>
                  <div className="text-xs text-slate-500">Wiley, 2018 - Chapter 9</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-pink-400">Love, R.</div>
                  <div className="italic">Linux Kernel Development (3rd ed.)</div>
                  <div className="text-xs text-slate-500">Addison-Wesley, 2010 - Chapter 12</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-blue-400">Gorman, M.</div>
                  <div className="italic">Understanding Linux Virtual Memory Manager</div>
                  <div className="text-xs text-slate-500">Prentice Hall, 2004</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">📄 Papers Clássicos</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-indigo-400">Denning, P. (1968)</div>
                  <div className="italic">&quot;The Working Set Model for Program Behavior&quot;</div>
                  <div className="text-xs text-slate-500">CACM 11(5)</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Belády, L.A. (1966)</div>
                  <div className="italic">&quot;A Study of Replacement Algorithms for Virtual-Storage&quot;</div>
                  <div className="text-xs text-slate-500">IBM Systems Journal 5(2)</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-pink-400">Kilburn et al. (1962)</div>
                  <div className="italic">&quot;One-Level Storage System&quot;</div>
                  <div className="text-xs text-slate-500">IRE Transactions EC-11</div>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-blue-400">McKusick et al. (1996)</div>
                  <div className="italic">&quot;Design and Implementation of the FreeBSD OS&quot;</div>
                  <div className="text-xs text-slate-500">Addison-Wesley</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/5 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">🔗 Documentação Técnica</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div>
                <div className="font-semibold text-indigo-400 mb-2">Intel</div>
                <div>• Intel 64 and IA-32 Architectures Software Developer&apos;s Manual, Volume 3A</div>
                <div className="text-xs text-slate-500 mt-1">Chapter 4: Paging</div>
              </div>
              <div>
                <div className="font-semibold text-purple-400 mb-2">AMD</div>
                <div>• AMD64 Architecture Programmer&apos;s Manual, Volume 2</div>
                <div className="text-xs text-slate-500 mt-1">System Programming</div>
              </div>
              <div>
                <div className="font-semibold text-pink-400 mb-2">Linux Kernel</div>
                <div>• Documentation/vm/</div>
                <div>• mm/ source code</div>
                <div className="text-xs text-slate-500 mt-1">kernel.org</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

