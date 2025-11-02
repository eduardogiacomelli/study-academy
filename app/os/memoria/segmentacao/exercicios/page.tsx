"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { animate, stagger } from "animejs";
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Calculator,
  Code,
  BookOpen,
  Target,
  Award
} from "lucide-react";

const EXERCISES = [
  {
    id: 1,
    level: "Básico",
    category: "Conceitos",
    q: "O que é um segmento na segmentação de memória?",
    a: "Um segmento é uma região contígua de memória que representa uma unidade lógica do programa (código, dados, stack, heap). Cada segmento tem base, limite e permissões próprias.",
    hint: "Pense em como os programas são organizados logicamente.",
    tutorial: "Segmentos dividem o programa em partes funcionais: Code (instruções), Data (variáveis globais/estáticas), Stack (variáveis locais, chamadas de função), Heap (alocação dinâmica)."
  },
  {
    id: 2,
    level: "Básico",
    category: "Conceitos",
    q: "Qual a principal vantagem da segmentação em relação à paginação pura?",
    a: "Divisão lógica natural do programa, facilitando proteção (R/W/X por segmento) e compartilhamento de código entre processos.",
    hint: "Compare como proteção é feita em cada técnica.",
    tutorial: "Paginação: proteção por página (4KB). Segmentação: proteção por função lógica (todo o código, todos os dados). Exemplo: código read-only, dados read-write."
  },
  {
    id: 3,
    level: "Intermediário",
    category: "Cálculo",
    q: "Dado: Seg[2].base=0x4000, Seg[2].limit=0x2000, offset=0x100. Calcule o endereço físico e verifique se é válido.",
    a: "Endereço físico = 0x4000 + 0x100 = 0x4100. Válido porque offset (0x100) < limit (0x2000).",
    hint: "Fórmula: Físico = base + offset. Depois verifique: offset < limite?",
    tutorial: "Passo 1: Somar base + offset. Passo 2: Verificar se offset < limit. Se sim, válido. Se não, Segmentation Fault!"
  },
  {
    id: 4,
    level: "Intermediário",
    category: "Proteção",
    q: "Explique o que são os bits R/W/X e dê um exemplo de uso.",
    a: "R (Read), W (Write), X (Execute). Exemplo: Segmento Code tem R=1, W=0, X=1 (pode ler e executar, mas não escrever). Isso previne self-modifying code malicioso.",
    hint: "Cada bit controla uma operação permitida.",
    tutorial: "Code: R/X (pode ler instruções e executá-las). Data: R/W (pode ler e escrever variáveis). Stack: R/W (não executa, previne stack overflow exploits)."
  },
  {
    id: 5,
    level: "Avançado",
    category: "Problema",
    q: "Por que segmentação pura causa fragmentação externa? Como resolver?",
    a: "Segmentos têm tamanhos variáveis. Ao alocar/desalocar, criam-se 'buracos' inutilizáveis. Solução: Compactação (custosa) ou Segmentação Paginada (híbrido).",
    hint: "Pense em alocar 100KB, liberar 50KB, alocar 80KB. Onde fica o buraco?",
    tutorial: "Exemplo: [A:100KB][Livre:50KB][B:200KB]. Se tentar alocar C:100KB, não cabe no buraco de 50KB! Memória desperdiçada. Compactar: mover B para cima, juntar espaço livre."
  },
  {
    id: 6,
    level: "Avançado",
    category: "Híbrido",
    q: "Como funciona segmentação paginada? Qual problema resolve?",
    a: "Cada segmento é dividido em páginas fixas (ex: 4KB). Resolve fragmentação externa (páginas fixas) mantendo divisão lógica (segmentos). Usado no x86.",
    hint: "Combine as vantagens de ambas as técnicas.",
    tutorial: "Endereço lógico: (Segmento, Página, Offset). Tabela de Segmentos → Tabela de Páginas → Frame físico. Dupla tradução, mas sem fragmentação externa!"
  },
  {
    id: 7,
    level: "Intermediário",
    category: "Cálculo",
    q: "Sistema com 8 segmentos, cada entrada de 8 bytes. Quanto espaço ocupa a Tabela de Segmentos?",
    a: "8 segmentos × 8 bytes = 64 bytes.",
    hint: "Multiplicação simples: número de entradas × tamanho de cada entrada.",
    tutorial: "Tabela de Segmentos é um array. Cada entrada guarda: base (4 bytes), limit (4 bytes). Total: 8 bytes/entrada."
  },
  {
    id: 8,
    level: "Básico",
    category: "Arquitetura",
    q: "Qual a diferença entre GDT e LDT no x86?",
    a: "GDT (Global Descriptor Table) é única e global ao sistema. LDT (Local Descriptor Table) é privada de cada processo. GDT em GDTR, LDT em LDTR.",
    hint: "Pense em 'global' vs 'local'.",
    tutorial: "GDT: segmentos do kernel, compartilhados. LDT: segmentos específicos do processo, isolados. Modernamente, LDT é raramente usada (Linux usa só GDT)."
  },
  {
    id: 9,
    level: "Avançado",
    category: "Sistema Operacional",
    q: "Por que Linux usa segmentação 'flat' (base=0, limite=4GB)?",
    a: "Simplifica o SO. Todos os segmentos cobrem todo o espaço, efetivamente desabilitando segmentação. Paginação faz o gerenciamento real. Compatibilidade com x86 obrigatória.",
    hint: "Qual técnica moderna substitui segmentação?",
    tutorial: "Flat model: CS, DS, SS, ES todos com base=0, limit=0xFFFFF (4GB). Segmentação vira identity mapping. Paginação controla proteção, isolamento, memória virtual."
  },
  {
    id: 10,
    level: "Intermediário",
    category: "Conceito",
    q: "O que é compactação de memória e quando é necessária?",
    a: "Mover segmentos em memória para eliminar fragmentação externa, criando uma região contígua livre. Necessária quando há espaço total suficiente, mas fragmentado.",
    hint: "Como juntar vários buracos pequenos em um grande?",
    tutorial: "Antes: [A][Livre:10KB][B][Livre:20KB][C]. Depois: [A][B][C][Livre:30KB]. Custoso (copiar dados, atualizar base), mas recupera memória."
  },
  {
    id: 11,
    level: "Avançado",
    category: "Cálculo",
    q: "Sistema x86: Seletor 0x1B. Decodifique: Índice, TI, RPL.",
    a: "0x1B = 0b0000000000011011. Índice = bits[15:3] = 0b011 = 3. TI = bit[2] = 1 (LDT). RPL = bits[1:0] = 11 = Ring 3.",
    hint: "Seletor: [Index:13bits][TI:1bit][RPL:2bits]. Converta hex para binário.",
    tutorial: "0x1B = 0b 00000000 00011011. Index = 00000000 00011 = 3. TI = 0 = GDT, 1 = LDT. Aqui TI=1 → LDT. RPL = 11 = Ring 3 (user)."
  },
  {
    id: 12,
    level: "Intermediário",
    category: "Proteção",
    q: "Um processo Ring 3 tenta acessar segmento com DPL=0. O que acontece?",
    a: "General Protection Fault (#GP). CPU verifica: CPL (Ring 3) <= DPL (Ring 0)? Falso! Acesso negado.",
    hint: "Regra: CPL (current) deve ser <= DPL (descriptor) para acessar.",
    tutorial: "DPL=0: apenas kernel (Ring 0). DPL=3: todos podem acessar. Proteção baseada em rings previne user space de acessar kernel memory."
  },
  {
    id: 13,
    level: "Básico",
    category: "Conceito",
    q: "O que é o TSS (Task State Segment)?",
    a: "Estrutura que guarda estado do processo: registradores, stack pointers, etc. Usado em context switch (IA-32) ou ring transitions (x86-64).",
    hint: "Pense em 'salvar/restaurar estado'.",
    tutorial: "IA-32: TSS guarda tudo (EIP, EFLAGS, EAX, ...). x86-64: TSS simplificado, apenas RSP0 (kernel stack). Carregado via LTR instruction."
  },
  {
    id: 14,
    level: "Avançado",
    category: "Código",
    q: "Escreva uma função C que cria um descritor de segmento x86 (base, limit, flags).",
    a: "uint64_t create_descriptor(uint32_t base, uint32_t limit, uint16_t flags) { return ((uint64_t)base << 16) | limit | ((uint64_t)flags << 40); }",
    hint: "Descritor de 8 bytes: campos espalhados em posições específicas.",
    tutorial: "Bits: [base_low:16][limit_low:16][base_mid:8][access:8][granularity:8][base_high:8]. Use bitwise shifts e ORs para montar."
  },
  {
    id: 15,
    level: "Intermediário",
    category: "Cálculo",
    q: "Segmento com G=1 (granularidade 4KB), limit=0xFFFFF. Qual o tamanho real?",
    a: "0xFFFFF × 4KB = 1.048.575 × 4.096 = 4.294.967.295 bytes = 4GB - 1 byte.",
    hint: "G=1 significa: limit é em páginas de 4KB, não bytes.",
    tutorial: "G=0: limit em bytes (máx 1MB). G=1: limit em 4KB (máx 4GB). 0xFFFFF = 1.048.575. Multiplica por 4096 → ~4GB."
  },
  {
    id: 16,
    level: "Avançado",
    category: "Sistema Operacional",
    q: "Por que Call Gates foram abandonados em favor de SYSCALL/SYSRET?",
    a: "Call Gates são lentos (múltiplos checks, troca de stack via TSS). SYSCALL é uma instrução dedicada, otimizada, que faz transition em 1 ciclo.",
    hint: "Performance: hardware dedicado vs mecanismo genérico.",
    tutorial: "Call Gate: ~50 ciclos. SYSCALL: ~5 ciclos. Intel/AMD adicionaram instruções específicas (SYSENTER/SYSEXIT, SYSCALL/SYSRET) para otimizar syscalls."
  },
  {
    id: 17,
    level: "Básico",
    category: "Conceito",
    q: "Quais são os 4 Privilege Rings do x86?",
    a: "Ring 0 (kernel/supervisor), Ring 1 (device drivers), Ring 2 (device drivers), Ring 3 (user applications).",
    hint: "0 = mais privilegiado, 3 = menos privilegiado.",
    tutorial: "Na prática, só Ring 0 e 3 são usados. Rings 1 e 2 foram ignorados por complexidade. Windows e Linux: kernel=0, user=3."
  },
  {
    id: 18,
    level: "Intermediário",
    category: "Proteção",
    q: "Como compartilhar código (biblioteca) entre processos com segmentação?",
    a: "Criar um segmento read-only (R=1, W=0, X=1) e apontá-lo para a mesma base física em múltiplos processos. Economia de memória.",
    hint: "Mesma base física, diferentes tabelas de segmentos.",
    tutorial: "Exemplo: libc.so. Processo A: Seg[5].base=0x40000000. Processo B: Seg[3].base=0x40000000. Ambos read-only, apontam para mesma memória física."
  },
  {
    id: 19,
    level: "Avançado",
    category: "Cálculo",
    q: "Sistema com 4GB RAM, páginas 4KB, cada segmento dividido em páginas. Quantas entradas na tabela de páginas de 1 segmento de 16MB?",
    a: "16MB / 4KB = 4.096 páginas. Tabela de páginas desse segmento: 4.096 entradas.",
    hint: "Tamanho do segmento / tamanho da página = número de páginas.",
    tutorial: "16MB = 16.777.216 bytes. 4KB = 4.096 bytes. 16.777.216 / 4.096 = 4.096 páginas. Cada página → 1 entrada na tabela."
  },
  {
    id: 20,
    level: "Avançado",
    category: "Conceito",
    q: "Explique o modo 'Long' (64-bit) do x86-64 em relação à segmentação.",
    a: "Segmentação é simplificada: apenas CS usado para modo (user/kernel). Base forçado a 0 para CS, DS, SS, ES. FS/GS podem ter base custom. Foco total em paginação.",
    hint: "64-bit quebrou compatibilidade com segmentação clássica.",
    tutorial: "x86-64 long mode: CS distingue Ring 0/3. Base de DS, SS, ES ignorado (sempre 0). FS/GS usados para Thread-Local Storage (TLS). Segmentação praticamente morta."
  }
];

export default function ExerciciosPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [hints, setHints] = useState<Record<number, boolean>>({});
  const [tutorials, setTutorials] = useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    animate('.exercise-card', {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(80),
      duration: 600,
      ease: 'outExpo'
    });
  }, [activeCategory]);

  const categories = ["all", ...Array.from(new Set(EXERCISES.map(e => e.category)))];
  const filteredExercises = activeCategory === "all" 
    ? EXERCISES 
    : EXERCISES.filter(e => e.category === activeCategory);

  const stats = {
    total: EXERCISES.length,
    basico: EXERCISES.filter(e => e.level === "Básico").length,
    intermediario: EXERCISES.filter(e => e.level === "Intermediário").length,
    avancado: EXERCISES.filter(e => e.level === "Avançado").length,
    answered: Object.keys(answers).filter(k => answers[parseInt(k)]).length
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <GraduationCap className="size-16 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Exercícios</h1>
            <p className="text-xl mb-8">20 questões para consolidar o conhecimento</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-3xl font-bold">{stats.basico}</div>
                <div className="text-sm">Básico</div>
              </Card>
              <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-3xl font-bold">{stats.intermediario}</div>
                <div className="text-sm">Intermediário</div>
              </Card>
              <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-3xl font-bold">{stats.avancado}</div>
                <div className="text-sm">Avançado</div>
              </Card>
              <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-3xl font-bold">{stats.answered}/{stats.total}</div>
                <div className="text-sm">Resolvidos</div>
              </Card>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl">
        {/* Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                >
                  {cat === "all" ? "Todos" : cat}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        <div className="space-y-6">
          {filteredExercises.map((ex, idx) => (
            <motion.div
              key={ex.id}
              className="exercise-card"
            >
              <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-emerald-500/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 text-white flex items-center justify-center font-bold text-lg">
                    {ex.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={
                        ex.level === 'Básico' ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30' :
                        ex.level === 'Intermediário' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30'
                      }>{ex.level}</Badge>
                      <Badge variant="outline">
                        {ex.category === "Cálculo" && <Calculator className="size-3 mr-1" />}
                        {ex.category === "Código" && <Code className="size-3 mr-1" />}
                        {ex.category === "Conceitos" && <BookOpen className="size-3 mr-1" />}
                        {ex.category}
                      </Badge>
                    </div>
                    
                    <p className="font-semibold mb-4 text-lg">{ex.q}</p>

                    {/* Hint */}
                    {hints[ex.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mb-3"
                      >
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="size-5 text-amber-600 flex-shrink-0" />
                          <span><strong>Dica:</strong> {ex.hint}</span>
                        </p>
                      </motion.div>
                    )}

                    {/* Tutorial */}
                    {tutorials[ex.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mb-3"
                      >
                        <p className="text-sm flex items-start gap-2">
                          <Target className="size-5 text-blue-600 flex-shrink-0" />
                          <span><strong>Tutorial:</strong> {ex.tutorial}</span>
                        </p>
                      </motion.div>
                    )}

                    {/* Answer */}
                    {answers[ex.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 mb-3"
                      >
                        <p className="text-sm flex items-start gap-2">
                          <CheckCircle className="size-5 text-emerald-600 flex-shrink-0" />
                          <span><strong>Resposta:</strong> {ex.a}</span>
                        </p>
                      </motion.div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        onClick={() => setHints(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        variant="outline"
                        size="sm"
                      >
                        <Lightbulb className="size-4 mr-1" />
                        {hints[ex.id] ? "Ocultar" : "Ver"} Dica
                      </Button>
                      <Button
                        onClick={() => setTutorials(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        variant="outline"
                        size="sm"
                      >
                        <Target className="size-4 mr-1" />
                        {tutorials[ex.id] ? "Ocultar" : "Ver"} Tutorial
                      </Button>
                      <Button
                        onClick={() => setAnswers(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        variant={answers[ex.id] ? "secondary" : "default"}
                        size="sm"
                      >
                        <CheckCircle className="size-4 mr-1" />
                        {answers[ex.id] ? "Ocultar" : "Ver"} Resposta
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Completion Badge */}
        {stats.answered === stats.total && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-2 border-emerald-500">
              <Award className="size-16 mx-auto mb-4 text-emerald-600" />
              <h3 className="text-2xl font-bold mb-2">Parabéns! 🎉</h3>
              <p className="text-muted-foreground">
                Você visualizou todas as respostas! Agora tente resolver sozinho para fixar o conhecimento.
              </p>
            </Card>
          </motion.div>
        )}

        <div className="flex justify-between pt-12">
          <a href="/os/memoria/segmentacao/x86" className="text-primary hover:underline">← Anterior: Intel x86</a>
          <a href="/os/memoria/segmentacao/conclusao" className="text-primary hover:underline flex items-center gap-2">
            Próximo: Conclusão <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
