"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { PageReplacementComparator } from "@/components/os/PageReplacementComparator";
import { BeladyAnomalyDemonstrator } from "@/components/os/BeladyAnomalyDemonstrator";
import { Lightbulb, AlertTriangle, TrendingUp, Clock as ClockIcon } from "lucide-react";

const fifoCode = `
// FIFO (First-In, First-Out) - Algoritmo mais simples

struct FIFO {
    int frames[MAX_FRAMES];
    int num_frames;
    int next_to_replace; // Índice circular
    int page_faults;
};

void fifo_init(FIFO* fifo, int num_frames) {
    fifo->num_frames = num_frames;
    fifo->next_to_replace = 0;
    fifo->page_faults = 0;
    for (int i = 0; i < num_frames; i++) {
        fifo->frames[i] = -1; // -1 = vazio
    }
}

void fifo_access(FIFO* fifo, int page) {
    // Verifica se página já está na memória (HIT)
    for (int i = 0; i < fifo->num_frames; i++) {
        if (fifo->frames[i] == page) {
            printf("✅ HIT: Página %d\\n", page);
            return;
        }
    }
    
    // PAGE FAULT - página não encontrada
    fifo->page_faults++;
    printf("❌ PAGE FAULT: Página %d\\n", page);
    
    // Substitui página na posição circular
    printf("   Substituindo quadro %d (página %d → %d)\\n", 
           fifo->next_to_replace,
           fifo->frames[fifo->next_to_replace],
           page);
    
    fifo->frames[fifo->next_to_replace] = page;
    fifo->next_to_replace = (fifo->next_to_replace + 1) % fifo->num_frames;
}

// Anomalia de Belady: Mais quadros podem causar MAIS page faults!
void demonstrate_belady_anomaly() {
    int references[] = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    int n = 12;
    
    // Com 3 quadros
    FIFO fifo3;
    fifo_init(&fifo3, 3);
    for (int i = 0; i < n; i++) {
        fifo_access(&fifo3, references[i]);
    }
    printf("FIFO com 3 quadros: %d page faults\\n", fifo3.page_faults);
    
    // Com 4 quadros
    FIFO fifo4;
    fifo_init(&fifo4, 4);
    for (int i = 0; i < n; i++) {
        fifo_access(&fifo4, references[i]);
    }
    printf("FIFO com 4 quadros: %d page faults\\n", fifo4.page_faults);
    
    // Pode acontecer: FIFO com 4 quadros ter MAIS page faults que com 3!
}
`;

const lruCode = `
// LRU (Least Recently Used) - Substitui a página menos recentemente usada

struct LRU {
    int frames[MAX_FRAMES];
    int last_access[MAX_FRAMES]; // Timestamp do último acesso
    int num_frames;
    int current_time;
    int page_faults;
};

void lru_init(LRU* lru, int num_frames) {
    lru->num_frames = num_frames;
    lru->current_time = 0;
    lru->page_faults = 0;
    for (int i = 0; i < num_frames; i++) {
        lru->frames[i] = -1;
        lru->last_access[i] = -1;
    }
}

int lru_find_victim(LRU* lru) {
    int victim_idx = 0;
    int oldest_time = lru->last_access[0];
    
    for (int i = 1; i < lru->num_frames; i++) {
        if (lru->last_access[i] < oldest_time) {
            oldest_time = lru->last_access[i];
            victim_idx = i;
        }
    }
    
    return victim_idx;
}

void lru_access(LRU* lru, int page) {
    lru->current_time++;
    
    // Verifica se página já está na memória
    for (int i = 0; i < lru->num_frames; i++) {
        if (lru->frames[i] == page) {
            // HIT - atualiza timestamp
            lru->last_access[i] = lru->current_time;
            printf("✅ HIT: Página %d (timestamp = %d)\\n", page, lru->current_time);
            return;
        }
    }
    
    // PAGE FAULT
    lru->page_faults++;
    printf("❌ PAGE FAULT: Página %d\\n", page);
    
    // Encontra vítima (LRU)
    int victim_idx = lru_find_victim(lru);
    printf("   LRU vítima: quadro %d (página %d, último acesso: %d)\\n",
           victim_idx,
           lru->frames[victim_idx],<div className="space-y-8">
           lru->last_access[victim_idx]);
    
    // Substitui
    lru->frames[victim_idx] = page;
    lru->last_access[victim_idx] = lru->current_time;
}

// LRU é um algoritmo "stack" - não sofre de anomalia de Belady!
`;

const clockCode = `
// Clock (Second Chance) - Aproximação de LRU usando bit de referência

struct Clock {
    int frames[MAX_FRAMES];
    int ref_bit[MAX_FRAMES]; // Bit de referência (R)
    int num_frames;
    int clock_hand;           // Ponteiro circular
    int page_faults;
};

void clock_init(Clock* clk, int num_frames) {
    clk->num_frames = num_frames;
    clk->clock_hand = 0;
    clk->page_faults = 0;
    for (int i = 0; i < num_frames; i++) {
        clk->frames[i] = -1;
        clk->ref_bit[i] = 0;
    }
}

int clock_find_victim(Clock* clk) {
    // Procura por uma página com R=0 (não referenciada recentemente)
    // Se R=1, dá "segunda chance" e muda para R=0
    while (1) {
        if (clk->ref_bit[clk->clock_hand] == 0) {
            // Vítima encontrada!
            int victim = clk->clock_hand;
            clk->clock_hand = (clk->clock_hand + 1) % clk->num_frames;
            return victim;
        }
        
        // Dá segunda chance: R=1 → R=0
        printf("   Segunda chance: quadro %d (página %d) R=1→0\\n",
               clk->clock_hand, clk->frames[clk->clock_hand]);
        clk->ref_bit[clk->clock_hand] = 0;
        clk->clock_hand = (clk->clock_hand + 1) % clk->num_frames;
    }
}

void clock_access(Clock* clk, int page) {
    // Verifica se página já está na memória
    for (int i = 0; i < clk->num_frames; i++) {
        if (clk->frames[i] == page) {
            // HIT - marca bit de referência
            clk->ref_bit[i] = 1;
            printf("✅ HIT: Página %d (R=1)\\n", page);
            return;
        }
    }
    
    // PAGE FAULT
    clk->page_faults++;
    printf("❌ PAGE FAULT: Página %d\\n", page);
    
    // Encontra vítima usando algoritmo Clock
    int victim_idx = clock_find_victim(clk);
    printf("   Clock vítima: quadro %d (página %d)\\n",
           victim_idx, clk->frames[victim_idx]);
    
    // Substitui e marca como referenciada
    clk->frames[victim_idx] = page;
    clk->ref_bit[victim_idx] = 1;
}

// Variação: Clock Melhorado (Enhanced Clock / NRU - Not Recently Used)
// Usa 2 bits: R (Referenced) e M (Modified/Dirty)
// Preferência de substituição:
// 1. (R=0, M=0) - não referenciada, não modificada (melhor vítima)
// 2. (R=0, M=1) - não referenciada, mas modificada (precisa write-back)
// 3. (R=1, M=0) - referenciada, não modificada
// 4. (R=1, M=1) - referenciada e modificada (pior vítima)
`;

const optimalCode = `
// Optimal (OPT) - Substitui a página que será usada mais tarde
// É o algoritmo ÓTIMO teoricamente, mas impossível na prática
// (requer conhecimento do futuro)

struct Optimal {
    int frames[MAX_FRAMES];
    int num_frames;
    int page_faults;
};

void optimal_init(Optimal* opt, int num_frames) {
    opt->num_frames = num_frames;
    opt->page_faults = 0;
    for (int i = 0; i < num_frames; i++) {
        opt->frames[i] = -1;
    }
}

// Encontra quando cada página será usada novamente
int optimal_find_victim(Optimal* opt, int* future_refs, int future_len, int current_pos) {
    int victim_idx = -1;
    int farthest_use = -1;
    
    for (int i = 0; i < opt->num_frames; i++) {
        int page = opt->frames[i];
        int next_use = future_len; // Assume "infinito" se não for usada
        
        // Procura próxima ocorrência desta página no futuro
        for (int j = current_pos + 1; j < future_len; j++) {
            if (future_refs[j] == page) {
                next_use = j;
                break;
            }
        }
        
        // Substitui a que será usada mais tarde (ou nunca)
        if (next_use > farthest_use) {
            farthest_use = next_use;
            victim_idx = i;
        }
    }
    
    return victim_idx;
}

void optimal_access(Optimal* opt, int page, int* all_refs, int total_refs, int current_pos) {
    // Verifica se já está na memória
    for (int i = 0; i < opt->num_frames; i++) {
        if (opt->frames[i] == page) {
            printf("✅ HIT: Página %d\\n", page);
            return;
        }
    }
    
    // PAGE FAULT
    opt->page_faults++;
    printf("❌ PAGE FAULT: Página %d\\n", page);
    
    // Encontra vítima ótima (olha para o futuro!)
    int victim_idx = optimal_find_victim(opt, all_refs, total_refs, current_pos);
    
    if (opt->frames[victim_idx] != -1) {
        printf("   Vítima ótima: quadro %d (página %d)\\n",
               victim_idx, opt->frames[victim_idx]);
    }
    
    opt->frames[victim_idx] = page;
}

// Usado como BENCHMARK para avaliar outros algoritmos
// LRU geralmente se aproxima bastante do Optimal na prática
`;

const comparisonCode = `
// Comparação Completa dos 4 Algoritmos

void compare_all_algorithms() {
    int references[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1};
    int n = 20;
    int num_frames = 3;
    
    // FIFO
    FIFO fifo;
    fifo_init(&fifo, num_frames);
    for (int i = 0; i < n; i++) {
        fifo_access(&fifo, references[i]);
    }
    
    // LRU
    LRU lru;
    lru_init(&lru, num_frames);
    for (int i = 0; i < n; i++) {
        lru_access(&lru, references[i]);
    }
    
    // Clock
    Clock clk;
    clock_init(&clk, num_frames);
    for (int i = 0; i < n; i++) {
        clock_access(&clk, references[i]);
    }
    
    // Optimal
    Optimal opt;
    optimal_init(&opt, num_frames);
    for (int i = 0; i < n; i++) {
        optimal_access(&opt, references[i], references, n, i);
    }
    
    // Resultados
    printf("\\n📊 RESULTADOS (string: 20 refs, %d quadros):\\n", num_frames);
    printf("  FIFO:    %d page faults (%.1f%%)\\n", 
           fifo.page_faults, (fifo.page_faults * 100.0) / n);
    printf("  LRU:     %d page faults (%.1f%%)\\n", 
           lru.page_faults, (lru.page_faults * 100.0) / n);
    printf("  Clock:   %d page faults (%.1f%%)\\n", 
           clk.page_faults, (clk.page_faults * 100.0) / n);
    printf("  Optimal: %d page faults (%.1f%%) ⭐ MELHOR\\n", 
           opt.page_faults, (opt.page_faults * 100.0) / n);
    
    printf("\\n📈 Ranking: Optimal ≤ LRU ≤ Clock ≤ FIFO\\n");
}
`;

export default function SubstituicaoPage() {
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
        <h1 className="text-4xl font-bold text-os-primary">
          Algoritmos de Substituição de Página
        </h1>
        <p className="text-lg text-muted-foreground max-w-4xl">
          Quando ocorre um page fault e não há quadros livres, o sistema operacional precisa escolher qual página remover da memória. 
          Diferentes algoritmos têm diferentes critérios para essa escolha, impactando diretamente a performance.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">FIFO</Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">LRU</Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Clock</Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">Optimal</Badge>
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Comparação Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Algoritmo</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Critério</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Complexidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Performance</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Overhead</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-semibold text-red-400">FIFO</td>
                  <td className="py-3 px-4">Primeira a entrar</td>
                  <td className="py-3 px-4">O(1)</td>
                  <td className="py-3 px-4 text-yellow-500">Regular</td>
                  <td className="py-3 px-4 text-green-500">Muito baixo</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-semibold text-blue-400">LRU</td>
                  <td className="py-3 px-4">Menos recentemente usada</td>
                  <td className="py-3 px-4">O(1) com hardware</td>
                  <td className="py-3 px-4 text-green-500">Muito boa</td>
                  <td className="py-3 px-4 text-red-500">Alto (timestamps)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-semibold text-purple-400">Clock</td>
                  <td className="py-3 px-4">Segunda chance (R bit)</td>
                  <td className="py-3 px-4">O(n) no pior caso</td>
                  <td className="py-3 px-4 text-green-500">Boa</td>
                  <td className="py-3 px-4 text-green-500">Baixo</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-green-400">Optimal</td>
                  <td className="py-3 px-4">Usada mais tarde</td>
                  <td className="py-3 px-4">Impossível</td>
                  <td className="py-3 px-4 text-green-500">Perfeita ⭐</td>
                  <td className="py-3 px-4 text-gray-500">N/A (teórico)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FIFO */}
      <Card className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-red-400">FIFO (First-In, First-Out)</CardTitle>
            <Badge variant="outline" className="border-red-500/50 text-red-400">Mais Simples</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            O algoritmo mais simples: substitui a página que está há mais tempo na memória (a primeira que entrou). 
            Usa uma fila circular (round-robin).
          </p>
          
          <h4 className="font-semibold text-foreground text-lg">✅ Vantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Extremamente simples de implementar</li>
            <li>Baixo overhead (apenas um ponteiro circular)</li>
            <li>Justo: todas as páginas têm tempo igual na memória</li>
          </ul>

          <h4 className="font-semibold text-foreground text-lg">❌ Desvantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Anomalia de Belady:</strong> Mais quadros podem causar MAIS page faults!</li>
            <li>Não considera frequência de uso</li>
            <li>Performance geralmente inferior aos outros</li>
          </ul>

          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="size-4 text-yellow-500" />
            <AlertTitle className="text-yellow-400">Anomalia de Belady</AlertTitle>
            <AlertDescription className="text-yellow-300/90">
              Em algumas sequências de referências, <strong>aumentar</strong> o número de quadros pode paradoxalmente 
              <strong>aumentar</strong> o número de page faults! Este fenômeno ocorre apenas em algoritmos que não são &quot;stack&quot;, como FIFO.
            </AlertDescription>
          </Alert>

          <CodeBlock language="c" title="Implementação FIFO">
            {fifoCode}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* LRU */}
      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-blue-400">LRU (Least Recently Used)</CardTitle>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">Mais Usado</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Substitui a página que não foi usada há mais tempo. Baseia-se no princípio de <strong>localidade temporal</strong>: 
            se uma página foi recentemente usada, provavelmente será usada novamente em breve.
          </p>
          
          <h4 className="font-semibold text-foreground text-lg">✅ Vantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Performance próxima do algoritmo Optimal na prática</li>
            <li>Não sofre de anomalia de Belady (algoritmo &quot;stack&quot;)</li>
            <li>Considera o histórico de uso recente</li>
          </ul>

          <h4 className="font-semibold text-foreground text-lg">❌ Desvantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Alto overhead: precisa manter timestamps ou pilha</li>
            <li>Complexo de implementar em hardware</li>
            <li>Cada acesso à memória requer atualização de metadados</li>
          </ul>

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Lightbulb className="size-4 text-blue-500" />
            <AlertTitle className="text-blue-400">Implementações de LRU</AlertTitle>
            <AlertDescription className="text-blue-300/90">
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Contadores:</strong> Cada página tem um timestamp atualizado a cada acesso</li>
                <li><strong>Pilha:</strong> Lista duplamente encadeada mantém páginas ordenadas por uso</li>
                <li><strong>Aproximações:</strong> Clock e Enhanced Clock são aproximações eficientes do LRU</li>
              </ul>
            </AlertDescription>
          </Alert>

          <CodeBlock language="c" title="Implementação LRU com Timestamps">
            {lruCode}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Clock */}
      <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
              <ClockIcon className="size-6" />
              Clock (Second Chance)
            </CardTitle>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">Balanceado</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Aproximação eficiente do LRU usando um bit de referência (R). Páginas são organizadas em um buffer circular. 
            Quando uma página com R=1 é encontrada, ela recebe uma &quot;segunda chance&quot; (R muda para 0).
          </p>
          
          <h4 className="font-semibold text-foreground text-lg">Como Funciona</h4>
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>Ponteiro percorre páginas circularmente</li>
            <li>Se R=0, essa página é a vítima</li>
            <li>Se R=1, dá segunda chance: R←0 e avança ponteiro</li>
            <li>Continua até encontrar R=0</li>
          </ol>

          <h4 className="font-semibold text-foreground text-lg mt-4">✅ Vantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Baixo overhead: apenas 1 bit por página</li>
            <li>Performance próxima do LRU</li>
            <li>Fácil de implementar em hardware</li>
          </ul>

          <h4 className="font-semibold text-foreground text-lg">❌ Desvantagens</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>No pior caso, percorre todas as páginas (O(n))</li>
            <li>Não tão preciso quanto LRU verdadeiro</li>
          </ul>

          <Alert className="border-purple-500/50 bg-purple-500/10">
            <TrendingUp className="size-4 text-purple-500" />
            <AlertTitle className="text-purple-400">Clock Melhorado (Enhanced Clock / NRU)</AlertTitle>
            <AlertDescription className="text-purple-300/90">
              Usa 2 bits: <strong>R (Referenced)</strong> e <strong>M (Modified)</strong>. Ordem de preferência para substituição:
              <ol className="list-decimal list-inside mt-2 space-y-1 ml-4">
                <li>(R=0, M=0) - Não usada recentemente, não modificada ⭐ MELHOR</li>
                <li>(R=0, M=1) - Não usada, mas precisa write-back</li>
                <li>(R=1, M=0) - Usada recentemente, mas não modificada</li>
                <li>(R=1, M=1) - Usada e modificada 😢 PIOR</li>
              </ol>
            </AlertDescription>
          </Alert>

          <CodeBlock language="c" title="Implementação Clock (Second Chance)">
            {clockCode}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Optimal */}
      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-green-400">Optimal (OPT / MIN)</CardTitle>
            <Badge variant="outline" className="border-green-500/50 text-green-400">Teórico ⭐</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            O algoritmo <strong>teoricamente perfeito</strong>: substitui a página que será usada mais tarde no futuro 
            (ou nunca será usada novamente). Garante o menor número possível de page faults.
          </p>
          
          <Alert className="border-green-500/50 bg-green-500/10">
            <AlertTriangle className="size-4 text-green-500" />
            <AlertTitle className="text-green-400">Por que é Impossível?</AlertTitle>
            <AlertDescription className="text-green-300/90">
              O algoritmo Optimal requer conhecimento <strong>do futuro</strong> - quais páginas serão acessadas e quando. 
              Na prática, o sistema operacional não pode prever isso. É usado apenas como <strong>baseline teórico</strong> 
              para comparar a eficiência de outros algoritmos.
            </AlertDescription>
          </Alert>

          <h4 className="font-semibold text-foreground text-lg">Utilidade</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Benchmark para avaliar algoritmos práticos</li>
            <li>LRU geralmente fica 5-10% abaixo do Optimal</li>
            <li>FIFO pode ficar 50%+ abaixo em alguns casos</li>
            <li>Usado em análises offline (após execução)</li>
          </ul>

          <CodeBlock language="c" title="Implementação Optimal (apenas para simulação)">
            {optimalCode}
          </CodeBlock>
        </CardContent>
      </Card>

      <Separator />

      {/* Belady's Anomaly Demonstrator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BeladyAnomalyDemonstrator />
      </motion.div>

      {/* Interactive Comparator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <PageReplacementComparator />
      </motion.div>

      {/* Comparison Code */}
      <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-os-primary">Código Comparativo Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock language="c" title="Comparação dos 4 Algoritmos">
            {comparisonCode}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">📝 Exercícios de Fixação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">1. Simulação Manual</h4>
            <p className="text-sm">
              String de referências: <code className="bg-muted px-2 py-1 rounded">1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5</code><br />
              Número de quadros: 3<br />
              Calcule o número de page faults para FIFO e LRU.
            </p>
            <details className="mt-2 p-3 bg-muted/30 rounded-lg">
              <summary className="cursor-pointer font-semibold text-blue-400">Ver Resposta</summary>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">FIFO:</p>
                  <div className="font-mono text-xs space-y-1 ml-4">
                    <p>1: [1,-,-] FAULT</p>
                    <p>2: [1,2,-] FAULT</p>
                    <p>3: [1,2,3] FAULT</p>
                    <p>4: [4,2,3] FAULT (substitui 1)</p>
                    <p>1: [4,1,3] FAULT (substitui 2)</p>
                    <p>2: [4,1,2] FAULT (substitui 3)</p>
                    <p>5: [5,1,2] FAULT (substitui 4)</p>
                    <p>1: [5,1,2] HIT</p>
                    <p>2: [5,1,2] HIT</p>
                    <p>3: [5,3,2] FAULT (substitui 1)</p>
                    <p>4: [5,3,4] FAULT (substitui 2)</p>
                    <p>5: [5,3,4] HIT</p>
                  </div>
                  <p className="text-red-400 mt-2"><strong>FIFO: 9 page faults</strong></p>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold text-foreground">LRU:</p>
                  <div className="font-mono text-xs space-y-1 ml-4">
                    <p>1: [1,-,-] FAULT</p>
                    <p>2: [1,2,-] FAULT</p>
                    <p>3: [1,2,3] FAULT</p>
                    <p>4: [4,2,3] FAULT (LRU: 1)</p>
                    <p>1: [4,1,3] FAULT (LRU: 2)</p>
                    <p>2: [4,1,2] FAULT (LRU: 3)</p>
                    <p>5: [5,1,2] FAULT (LRU: 4)</p>
                    <p>1: [5,1,2] HIT</p>
                    <p>2: [5,1,2] HIT</p>
                    <p>3: [5,3,2] FAULT (LRU: 1)</p>
                    <p>4: [5,3,4] FAULT (LRU: 2)</p>
                    <p>5: [5,3,4] HIT</p>
                  </div>
                  <p className="text-blue-400 mt-2"><strong>LRU: 9 page faults</strong></p>
                </div>
                <p className="text-yellow-400">Neste caso específico, FIFO e LRU têm o mesmo resultado!</p>
              </div>
            </details>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">2. Qual algoritmo usar?</h4>
            <p className="text-sm">
              Para cada cenário, escolha o algoritmo mais adequado:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-2 text-sm">
              <li>Sistema embarcado com memória limitada e sem hardware especializado</li>
              <li>Servidor de alto desempenho com muita RAM</li>
              <li>Sistema real-time com overhead mínimo</li>
            </ol>
            <details className="mt-2 p-3 bg-muted/30 rounded-lg">
              <summary className="cursor-pointer font-semibold text-blue-400">Ver Resposta</summary>
              <div className="mt-3 space-y-2 text-sm">
                <p><strong>1. Sistema embarcado:</strong> <span className="text-purple-400">Clock</span> - Baixo overhead, razoável performance</p>
                <p><strong>2. Servidor alto desempenho:</strong> <span className="text-blue-400">LRU ou Enhanced Clock</span> - Melhor performance, overhead aceitável</p>
                <p><strong>3. Sistema real-time:</strong> <span className="text-red-400">FIFO</span> - Overhead mínimo e tempo de execução previsível (O(1))</p>
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

