"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { VirtualMemorySimulator } from "@/components/os/VirtualMemorySimulator";
import { PageFaultVisualizer } from "@/components/os/PageFaultVisualizer";
import { WorkingSetVisualizer } from "@/components/os/WorkingSetVisualizer";
import { CopyOnWriteVisualizer } from "@/components/os/CopyOnWriteVisualizer";
import { EffectiveAccessTimeCalculator } from "@/components/os/EffectiveAccessTimeCalculator";
import { MemoryHierarchyDiagram } from "@/components/os/MemoryHierarchyDiagram";
import { AlertCircle, CheckCircle2, Info, Lightbulb } from "lucide-react";

const demandPagingCode = `
// Estrutura de uma entrada na tabela de páginas
struct PageTableEntry {
    unsigned int frame_number : 20;  // Número do quadro físico
    unsigned int present : 1;        // Bit de presença (0 = página não está na RAM)
    unsigned int modified : 1;       // Bit de modificação (dirty bit)
    unsigned int referenced : 1;     // Bit de referência
    unsigned int protection : 2;     // Proteção (R/W/X)
    unsigned int reserved : 7;       // Bits reservados
};

// Função de tradução com suporte a page fault
int translate_virtual_address(int virtual_address, PageTableEntry* page_table, int* page_faults) {
    int page_number = virtual_address / PAGE_SIZE;
    int offset = virtual_address % PAGE_SIZE;
    
    PageTableEntry* entry = &page_table[page_number];
    
    // Verifica se a página está presente na memória física
    if (entry->present == 0) {
        // PAGE FAULT!
        (*page_faults)++;
        handle_page_fault(page_number, entry);
    }
    
    // Atualiza bit de referência
    entry->referenced = 1;
    
    // Retorna endereço físico
    return (entry->frame_number * PAGE_SIZE) + offset;
}

// Handler de Page Fault
void handle_page_fault(int page_number, PageTableEntry* entry) {
    printf("⚠️  PAGE FAULT: Página %d não está na memória RAM\\n", page_number);
    
    // 1. Encontrar quadro livre (ou substituir uma página)
    int free_frame = find_free_frame();
    if (free_frame == -1) {
        // Não há quadros livres - precisa substituir
        free_frame = select_victim_page(); // Usa algoritmo de substituição
        evict_page(free_frame);            // Remove página antiga
    }
    
    // 2. Carregar página do disco para a memória
    load_page_from_disk(page_number, free_frame);
    
    // 3. Atualizar tabela de páginas
    entry->frame_number = free_frame;
    entry->present = 1;
    entry->modified = 0;
    entry->referenced = 1;
    
              printf(&quot;✅ Página %d carregada no quadro %d\\n&quot;, page_number, free_frame);
}
`;

const copyOnWriteCode = `
// Copy-on-Write (COW) - Otimização para fork()
// Processo pai e filho compartilham páginas até que uma seja modificada

struct PageTableEntry {
    unsigned int frame_number : 20;
    unsigned int present : 1;
    unsigned int modified : 1;
    unsigned int referenced : 1;
    unsigned int cow : 1;        // Copy-on-Write bit
    unsigned int writable : 1;   // Originalmente gravável?
    unsigned int reserved : 7;
};

// Quando ocorre fork()
void fork_process(Process* parent, Process* child) {
    for (int i = 0; i < NUM_PAGES; i++) {
        PageTableEntry* parent_entry = &parent->page_table[i];
        PageTableEntry* child_entry = &child->page_table[i];
        
        // Ambos apontam para o mesmo quadro físico
        child_entry->frame_number = parent_entry->frame_number;
        child_entry->present = parent_entry->present;
        
        // Marca como COW e remove permissão de escrita
        if (parent_entry->writable) {
            parent_entry->cow = 1;
            child_entry->cow = 1;
            parent_entry->modified = 0; // Remove W temporariamente
            child_entry->modified = 0;
        }
        
        // Incrementa contador de referência do quadro
        increment_frame_ref_count(parent_entry->frame_number);
    }
}

// Quando ocorre tentativa de escrita em página COW
void handle_cow_fault(int page_number, PageTableEntry* entry) {
    printf("🔄 COW FAULT: Copiando página %d\\n", page_number);
    
    // 1. Aloca novo quadro
    int new_frame = allocate_frame();
    
    // 2. Copia conteúdo do quadro original
    copy_frame(entry->frame_number, new_frame);
    
    // 3. Atualiza entrada da tabela de páginas
    decrement_frame_ref_count(entry->frame_number);
    entry->frame_number = new_frame;
    entry->cow = 0;
    entry->modified = 1; // Restaura permissão de escrita
    
    printf("✅ Página %d agora está no quadro privado %d\\n", page_number, new_frame);
}
`;

const workingSetCode = `
// Working Set e Thrashing

struct WorkingSet {
    int* pages;           // Páginas no working set
    int size;             // Tamanho atual
    int window_size;      // Janela de tempo (delta)
    long last_access[MAX_PAGES]; // Timestamp do último acesso
};

// Calcula o working set de um processo
void calculate_working_set(Process* proc, long current_time) {
    WorkingSet* ws = &proc->working_set;
    ws->size = 0;
    
    for (int i = 0; i < MAX_PAGES; i++) {
        // Página foi acessada na janela de tempo?
        if (current_time - ws->last_access[i] <= ws->window_size) {
            ws->pages[ws->size++] = i;
        }
    }
}

// Detecção de Thrashing
bool is_thrashing(Process* proc) {
    // Thrashing: page fault rate muito alta
    float page_fault_rate = (float)proc->page_faults / proc->total_references;
    
    // Se mais de 50% dos acessos causam page fault, está em thrashing
    if (page_fault_rate > 0.5) {
        printf("⚠️  THRASHING DETECTADO!\\n");
        printf("   - Page Fault Rate: %.2f%%\\n", page_fault_rate * 100);
        printf("   - Working Set: %d páginas\\n", proc->working_set.size);
        printf("   - Quadros alocados: %d\\n", proc->allocated_frames);
        
        // Processo precisa de mais quadros
        return true;
    }
    
    return false;
}

// Prevenção de Thrashing: ajuste de multiprogramação
void prevent_thrashing() {
    int total_frames = get_total_frames();
    int sum_working_sets = 0;
    
    for (Process* proc : all_processes) {
        sum_working_sets += proc->working_set.size;
    }
    
    // Se soma dos working sets > memória disponível
    if (sum_working_sets > total_frames) {
        // Reduzir grau de multiprogramação
        // Suspender alguns processos (swap out)
        suspend_processes();
    }
}
`;

const thrashingMetricsCode = `
// Métricas de Performance e Thrashing

struct MemoryMetrics {
    int page_faults;
    int total_references;
    float page_fault_rate;
    float effective_access_time;
    int thrashing_count;
};

// Calcula tempo efetivo de acesso à memória (simplificado, sem TLB)
float calculate_effective_access_time(MemoryMetrics* metrics) {
    const float MEMORY_ACCESS_TIME = 100;  // nanossegundos
    const float PAGE_FAULT_TIME = 8000000; // nanossegundos (8ms)
    
    float pf_rate = metrics->page_fault_rate;
    
    // Fórmula simplificada (assumindo TLB com hit rate ~100%):
    // EAT = (1 - p) * memory_access + p * page_fault_overhead
    // 
    // Fórmula completa com TLB:
    // EAT = TLB_time + TLB_hit_rate * mem_access + 
    //       TLB_miss_rate * 2 * mem_access + p * page_fault_time
    float eat = (1 - pf_rate) * MEMORY_ACCESS_TIME + 
                pf_rate * PAGE_FAULT_TIME;
    
    return eat;
}

// Exemplo de cálculo
void example_eat() {
    MemoryMetrics metrics;
    
    // Cenário 1: Sistema saudável (1% de page faults)
    metrics.page_fault_rate = 0.01;
    printf("Cenário 1 (1%% PF): EAT = %.2f ns\\n", 
           calculate_effective_access_time(&metrics));
    // Resultado: ~80,099 ns
    
    // Cenário 2: Thrashing (50% de page faults)
    metrics.page_fault_rate = 0.50;
    printf("Cenário 2 (50%% PF): EAT = %.2f ns\\n", 
           calculate_effective_access_time(&metrics));
    // Resultado: ~4,000,050 ns (50x mais lento!)
}
`;

export default function VirtualMemoryPage() {
  return (
    <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-os-primary">Gerenciamento de Memória: Memória Virtual</h1>
        <p className="text-lg text-muted-foreground max-w-4xl">
          A memória virtual é uma técnica que permite executar processos que requerem mais memória do que a RAM física disponível. 
          Ela cria a ilusão de um espaço de endereçamento contíguo e potencialmente maior do que a memória física real.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-os-primary/20 text-os-primary">Demand Paging</Badge>
          <Badge variant="secondary" className="bg-os-primary/20 text-os-primary">Page Faults</Badge>
          <Badge variant="secondary" className="bg-os-primary/20 text-os-primary">Copy-on-Write</Badge>
          <Badge variant="secondary" className="bg-os-primary/20 text-os-primary">Working Set</Badge>
          <Badge variant="secondary" className="bg-os-primary/20 text-os-primary">Thrashing</Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <MemoryHierarchyDiagram />
      </motion.div>

      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-os-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-os-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl text-os-primary">Conceitos Fundamentais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground relative z-10">
          <h4 className="font-semibold text-foreground text-lg">Por que Memória Virtual?</h4>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <strong>Isolamento:</strong> Cada processo tem seu próprio espaço de endereçamento virtual, protegido de outros processos.
            </li>
            <li>
              <strong>Memória Maior que RAM:</strong> Processos podem usar mais memória do que fisicamente disponível (usando disco como backup).
            </li>
            <li>
              <strong>Eficiência:</strong> Apenas as páginas realmente necessárias (working set) ficam na RAM.
            </li>
            <li>
              <strong>Compartilhamento:</strong> Páginas podem ser compartilhadas entre processos (ex: bibliotecas).
            </li>
          </ul>

          <Separator className="my-6" />

          <h4 className="font-semibold text-foreground text-lg">Demand Paging (Paginação sob Demanda)</h4>
          <p>
            Em vez de carregar o programa inteiro na memória ao iniciar, o sistema carrega páginas apenas quando necessário. 
            Quando o processo tenta acessar uma página que não está na RAM, ocorre um <strong>page fault</strong>.
          </p>

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Info className="size-4 text-blue-500" />
            <AlertTitle className="text-blue-400">Processo de Page Fault</AlertTitle>
            <AlertDescription className="text-blue-300/90">
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>MMU detecta que o bit Present = 0</li>
                <li>Gera trap (interrupção) para o kernel</li>
                <li>Kernel verifica se o acesso é válido</li>
                <li>Encontra quadro livre (ou substitui página)</li>
                <li>Carrega página do disco para RAM</li>
                <li>Atualiza tabela de páginas (Present = 1)</li>
                <li>Reinicia a instrução que causou o fault</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Implementação de Page Fault</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock language="c" title="Tradução de Endereços com Demand Paging">
            {demandPagingCode}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Copy-on-Write (COW)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Copy-on-Write é uma otimização usada principalmente na chamada de sistema <code className="bg-muted px-1 py-0.5 rounded">fork()</code>. 
            Quando um processo pai cria um processo filho, em vez de copiar todas as páginas imediatamente, ambos compartilham as mesmas páginas físicas.
          </p>
          <p>
            As páginas são marcadas como <strong>read-only</strong>. Se qualquer um dos processos tentar <strong>escrever</strong> em uma página, 
            ocorre um <strong>page fault</strong>, e o kernel copia a página naquele momento (daí o nome &quot;copy-on-write&quot;).
          </p>

          <Alert className="border-green-500/50 bg-green-500/10 mt-4">
            <CheckCircle2 className="size-4 text-green-500" />
            <AlertTitle className="text-green-400">Vantagens do COW</AlertTitle>
            <AlertDescription className="text-green-300/90">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Economia de memória:</strong> Não duplica páginas desnecessariamente</li>
                <li><strong>Fork mais rápido:</strong> Não precisa copiar tudo imediatamente</li>
                <li><strong>Eficiente para exec():</strong> Se o filho chamar exec(), as páginas do pai nunca serão copiadas</li>
              </ul>
            </AlertDescription>
          </Alert>

          <CodeBlock language="c" title="Implementação de Copy-on-Write" className="mt-6">
            {copyOnWriteCode}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Working Set e Thrashing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <h4 className="font-semibold text-foreground text-lg">Working Set</h4>
          <p>
            O <strong>working set</strong> de um processo é o conjunto de páginas que ele está ativamente usando em um determinado período de tempo (janela Δ). 
            É a quantidade mínima de páginas que o processo precisa manter na memória para executar eficientemente.
          </p>

          <div className="bg-muted/30 p-4 rounded-lg mt-4">
            <p className="font-mono text-sm">
              WS(t, Δ) = {"{ "} conjunto de páginas referenciadas no intervalo (t-Δ, t) {" }"}
            </p>
          </div>

          <h4 className="font-semibold text-foreground text-lg mt-6">Thrashing</h4>
          <p>
            <strong>Thrashing</strong> ocorre quando o sistema passa mais tempo lidando com page faults do que executando instruções úteis. 
            Isso acontece quando a soma dos working sets de todos os processos excede a memória física disponível.
          </p>

          <Alert className="border-red-500/50 bg-red-500/10 mt-4">
            <AlertCircle className="size-4 text-red-500" />
            <AlertTitle className="text-red-400">Sintomas de Thrashing</AlertTitle>
            <AlertDescription className="text-red-300/90">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>CPU utilization baixa (sistema esperando I/O de disco)</li>
                <li>Taxa de page fault extremamente alta (&gt;50%)</li>
                <li>Disco trabalhando continuamente (swap constante)</li>
                <li>Throughput do sistema despenca</li>
                <li>Tempo de resposta aumenta drasticamente</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-500/50 bg-yellow-500/10 mt-4">
            <Lightbulb className="size-4 text-yellow-500" />
            <AlertTitle className="text-yellow-400">Soluções para Thrashing</AlertTitle>
            <AlertDescription className="text-yellow-300/90">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Reduzir grau de multiprogramação:</strong> Suspender alguns processos</li>
                <li><strong>Adicionar mais RAM:</strong> Aumentar memória física</li>
                <li><strong>Working Set Model:</strong> Garantir que cada processo tenha seu WS na memória</li>
                <li><strong>Page Fault Frequency (PFF):</strong> Monitorar e ajustar alocação dinamicamente</li>
              </ul>
            </AlertDescription>
          </Alert>

          <CodeBlock language="c" title="Working Set e Detecção de Thrashing" className="mt-6">
            {workingSetCode}
          </CodeBlock>

          <CodeBlock language="c" title="Métricas de Performance" className="mt-6">
            {thrashingMetricsCode}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Comparação: Tempo de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Operação</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Tempo</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Observação</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Acesso à RAM</td>
                  <td className="text-right py-3 px-4 font-mono">~100 ns</td>
                  <td className="py-3 px-4">Memória principal</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Acesso ao TLB</td>
                  <td className="text-right py-3 px-4 font-mono">~1 ns</td>
                  <td className="py-3 px-4">Cache da MMU</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Page Fault (SSD)</td>
                  <td className="text-right py-3 px-4 font-mono">~100 μs</td>
                  <td className="py-3 px-4">Disco rápido (1000x mais lento)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Page Fault (HDD)</td>
                  <td className="text-right py-3 px-4 font-mono">~8 ms</td>
                  <td className="py-3 px-4 text-red-400">Disco mecânico (80.000x mais lento!)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Context Switch</td>
                  <td className="text-right py-3 px-4 font-mono">~1-10 μs</td>
                  <td className="py-3 px-4">Troca de processo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 italic">
            * Por isso é crucial minimizar page faults! Um único page fault custa o equivalente a <strong>milhares</strong> de acessos normais à RAM.
          </p>
        </CardContent>
      </Card>

      <Separator />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <VirtualMemorySimulator />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <PageFaultVisualizer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CopyOnWriteVisualizer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <WorkingSetVisualizer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <EffectiveAccessTimeCalculator />
      </motion.div>

      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">📝 Exercícios de Fixação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">1. Cálculo de Effective Access Time</h4>
            <div className="text-sm">
              <p>Dado:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Tempo de acesso à RAM: 100 ns</li>
                <li>Tempo de page fault: 8 ms</li>
                <li>Taxa de page faults: 0.1% (1 em 1000 acessos)</li>
              </ul>
              <p className="mt-2">Calcule o tempo efetivo de acesso.</p>
            </div>
            <details className="mt-2 p-3 bg-muted/30 rounded-lg">
              <summary className="cursor-pointer font-semibold text-blue-400">Ver Resposta</summary>
              <div className="mt-3 space-y-2 text-sm">
                <p><strong>Fórmula:</strong> EAT = (1 - p) × RAM + p × PageFault</p>
                <p><strong>Cálculo:</strong></p>
                <p className="font-mono">EAT = (1 - 0.001) × 100 + 0.001 × 8,000,000</p>
                <p className="font-mono">EAT = 0.999 × 100 + 0.001 × 8,000,000</p>
                <p className="font-mono">EAT = 99.9 + 8,000</p>
                <p className="font-mono text-green-400">EAT = 8,099.9 ns ≈ 8.1 μs</p>
                <p className="text-yellow-400 mt-2">
                  📊 Apenas 0.1% de page faults já tornam o acesso 81x mais lento!
                </p>
              </div>
            </details>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">2. Working Set</h4>
            <p className="text-sm">
              Um processo faz os seguintes acessos a páginas (sequência): <br />
              <code className="bg-muted px-2 py-1 rounded">1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</code>
              <br />
              Com uma janela Δ = 4 acessos, qual é o tamanho máximo do working set?
            </p>
            <details className="mt-2 p-3 bg-muted/30 rounded-lg">
              <summary className="cursor-pointer font-semibold text-blue-400">Ver Resposta</summary>
              <div className="mt-3 space-y-2 text-sm">
                <p><strong>Análise por janela de 4 acessos:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1 font-mono text-xs">
                  <li>[1,2,3,4] → WS = {"{1,2,3,4}"} (tamanho 4)</li>
                  <li>[2,3,4,1] → WS = {"{1,2,3,4}"} (tamanho 4)</li>
                  <li>[3,4,1,2] → WS = {"{1,2,3,4}"} (tamanho 4)</li>
                  <li>[4,1,2,5] → WS = {"{1,2,4,5}"} (tamanho 4)</li>
                  <li>[1,2,5,1] → WS = {"{1,2,5}"} (tamanho 3)</li>
                  <li>[2,5,1,2] → WS = {"{1,2,5}"} (tamanho 3)</li>
                  <li>[5,1,2,3] → WS = {"{1,2,3,5}"} (tamanho 4)</li>
                  <li>[1,2,3,4] → WS = {"{1,2,3,4}"} (tamanho 4)</li>
                  <li>[2,3,4,5] → WS = {"{2,3,4,5}"} (tamanho 4)</li>
                </ul>
                <p className="text-green-400 mt-3">
                  <strong>Resposta:</strong> O tamanho máximo do working set é <strong>4 páginas</strong>.
                </p>
              </div>
            </details>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">3. Copy-on-Write</h4>
            <p className="text-sm">
              Processo pai tem 1000 páginas (total de 4 MB com páginas de 4 KB). Ele chama fork() criando um filho. 
              O filho modifica 10 páginas. Quanto de memória foi economizado usando COW vs. cópia completa?
            </p>
            <details className="mt-2 p-3 bg-muted/30 rounded-lg">
              <summary className="cursor-pointer font-semibold text-blue-400">Ver Resposta</summary>
              <div className="mt-3 space-y-2 text-sm">
                <p><strong>Sem COW (cópia completa):</strong></p>
                <p className="font-mono ml-4">1000 páginas × 4 KB = 4 MB copiados</p>
                
                <p className="mt-3"><strong>Com COW:</strong></p>
                <p className="font-mono ml-4">10 páginas × 4 KB = 40 KB copiados</p>
                
                <p className="text-green-400 mt-3">
                  <strong>Economia:</strong> 4 MB - 40 KB = <strong>3.96 MB (99% de economia!)</strong>
                </p>
              </div>
            </details>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </div>
    </div>
    </div>
  );
}

