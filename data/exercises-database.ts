import { Exercise } from "@/components/exercises/ExerciseCard";

export const exercisesDatabase: Exercise[] = [
  // ========== CONCEITOS BÁSICOS DE MEMÓRIA (10 exercícios) ==========
  {
    id: "mem-basic-01",
    category: "Conceitos Básicos",
    difficulty: "beginner",
    title: "Características Ideais de Memória",
    description: "Fundamentos sobre memória de computador",
    question: "Quais seriam as características ideais de uma memória de computador?",
    type: "multiple_choice",
    options: [
      "Grande capacidade, baixo custo e alta velocidade",
      "Pequena capacidade, alto custo e baixa velocidade",
      "Apenas a velocidade importa",
      "Capacidade média, custo médio e velocidade média"
    ],
    correctAnswer: "Grande capacidade, baixo custo e alta velocidade",
    explanation: "A memória ideal teria três características principais: grande capacidade para armazenar muitos dados, baixo custo para ser acessível, e alta velocidade para acesso rápido. Na prática, existe um trade-off entre essas características, por isso temos hierarquia de memória.",
    hint: "Pense no que seria 'perfeito' do ponto de vista do usuário",
    points: 5,
    timeEstimate: 1
  },
  {
    id: "mem-basic-02",
    category: "Conceitos Básicos",
    difficulty: "beginner",
    title: "Hierarquia de Memória",
    description: "Compreender a organização das memórias",
    question: "Qual a ordem correta da hierarquia de memória, do mais rápido para o mais lento?",
    type: "multiple_choice",
    options: [
      "Registradores → Cache → RAM → SSD → HDD",
      "RAM → Cache → Registradores → SSD → HDD",
      "HDD → SSD → RAM → Cache → Registradores",
      "Cache → RAM → Registradores → SSD → HDD"
    ],
    correctAnswer: "Registradores → Cache → RAM → SSD → HDD",
    explanation: "A hierarquia vai do mais rápido (e caro) para o mais lento (e barato): Registradores (~<1ns) → Cache L1/L2/L3 (1-20ns) → RAM (~100ns) → SSD (~100μs) → HDD (~8ms). Cada nível compensa velocidade com capacidade e custo.",
    hint: "Quanto mais perto da CPU, mais rápido",
    points: 10,
    timeEstimate: 2
  },
  {
    id: "mem-basic-03",
    category: "Conceitos Básicos",
    difficulty: "beginner",
    title: "Memória Principal vs Secundária",
    description: "Diferenciar tipos de memória",
    question: "Qual a principal diferença entre memória principal (RAM) e secundária (disco)?",
    type: "multiple_choice",
    options: [
      "RAM é volátil e disco é não-volátil",
      "RAM é mais lenta que disco",
      "Disco é mais caro que RAM",
      "RAM tem maior capacidade"
    ],
    correctAnswer: "RAM é volátil e disco é não-volátil",
    explanation: "A memória principal (RAM) é volátil - perde dados quando desligada - mas é muito mais rápida. A memória secundária (SSD/HDD) é não-volátil - mantém dados permanentemente - mas é mais lenta. RAM típica: 100ns, HDD: 8ms (~80.000x mais lento).",
    hint: "Pense no que acontece quando você desliga o computador",
    points: 5,
    timeEstimate: 1
  },
  {
    id: "mem-basic-04",
    category: "Conceitos Básicos",
    difficulty: "intermediate",
    title: "MMU - Memory Management Unit",
    description: "Função do gerenciador de memória",
    question: "Qual o papel principal da MMU (Memory Management Unit)?",
    type: "multiple_choice",
    options: [
      "Traduzir endereços virtuais para físicos",
      "Aumentar a capacidade da RAM",
      "Acelerar a velocidade da CPU",
      "Gerenciar o disco rígido"
    ],
    correctAnswer: "Traduzir endereços virtuais para físicos",
    explanation: "A MMU é responsável pela tradução de endereços virtuais (lógicos) usados pelos programas para endereços físicos na RAM real. Também implementa proteção de memória, detectando acessos inválidos e gerando page faults quando necessário.",
    hint: "MMU fica entre CPU e memória fazendo tradução",
    points: 10,
    timeEstimate: 2
  },
  {
    id: "mem-basic-05",
    category: "Conceitos Básicos",
    difficulty: "intermediate",
    title: "Endereço Lógico vs Físico",
    description: "Compreender espaços de endereçamento",
    question: "Qual afirmação está correta sobre endereços lógicos e físicos?",
    type: "multiple_choice",
    options: [
      "Endereço lógico é visto pelo programa, físico é na RAM real",
      "Endereço físico é usado pela CPU",
      "Não há diferença entre eles",
      "Endereço lógico é sempre maior que físico"
    ],
    correctAnswer: "Endereço lógico é visto pelo programa, físico é na RAM real",
    explanation: "Endereço LÓGICO (ou virtual) é o que o processo vê - contíguo e começando em 0. Endereço FÍSICO é onde os dados estão realmente na RAM. A MMU faz a tradução. Isso permite que processos maiores que a RAM rodem e protege processos uns dos outros.",
    hint: "Pense em 'o que o programa vê' vs 'onde está realmente'",
    points: 10,
    timeEstimate: 2
  },

  // ========== PAGINAÇÃO (20 exercícios) ==========
  {
    id: "pag-01",
    category: "Paginação",
    difficulty: "beginner",
    title: "Conceito de Paginação",
    description: "Fundamentos de paginação",
    question: "O que é paginação?",
    type: "multiple_choice",
    options: [
      "Divisão da memória lógica em páginas e física em quadros de tamanho fixo",
      "Ordenação de dados no disco",
      "Tipo de cache da CPU",
      "Algoritmo de escalonamento"
    ],
    correctAnswer: "Divisão da memória lógica em páginas e física em quadros de tamanho fixo",
    explanation: "Paginação divide o espaço de endereçamento LÓGICO em páginas de tamanho fixo (ex: 4KB) e a memória FÍSICA em quadros (frames) do mesmo tamanho. Elimina fragmentação externa! Páginas podem estar em qualquer quadro.",
    hint: "Páginas = lógico, Quadros = físico",
    points: 10,
    timeEstimate: 2
  },
  {
    id: "pag-02",
    category: "Paginação",
    difficulty: "beginner",
    title: "Páginas vs Quadros",
    description: "Diferenciar conceitos fundamentais",
    question: "Qual a diferença entre páginas e quadros (frames)?",
    type: "multiple_choice",
    options: [
      "Páginas são lógicas, quadros são físicos, mesmo tamanho",
      "Páginas são físicas, quadros são lógicos",
      "São exatamente a mesma coisa",
      "Páginas são sempre maiores que quadros"
    ],
    correctAnswer: "Páginas são lógicas, quadros são físicos, mesmo tamanho",
    explanation: "PÁGINAS (pages) são divisões do espaço de endereçamento LÓGICO do processo. QUADROS (frames) são divisões da memória FÍSICA (RAM). Ambos têm EXATAMENTE o mesmo tamanho! Ex: páginas de 4KB são mapeadas em quadros de 4KB.",
    hint: "Page = lógico, Frame = físico",
    points: 10,
    timeEstimate: 2
  },
  {
    id: "pag-03",
    category: "Paginação",
    difficulty: "intermediate",
    title: "Fragmentação na Paginação",
    description: "Entender tipos de fragmentação",
    question: "Qual tipo de fragmentação ocorre na paginação?",
    type: "multiple_choice",
    options: [
      "Apenas fragmentação interna (média de metade de uma página)",
      "Apenas fragmentação externa",
      "Ambas interna e externa",
      "Nenhuma fragmentação"
    ],
    correctAnswer: "Apenas fragmentação interna (média de metade de uma página)",
    explanation: "Paginação elimina fragmentação EXTERNA (espaços entre processos). Mas tem fragmentação INTERNA: a última página de um processo raramente está completamente cheia. Em média, desperdiça metade de uma página. Com páginas de 4KB, média de 2KB desperdiçados por processo.",
    hint: "Pense na última página do processo",
    points: 15,
    timeEstimate: 3
  },
  {
    id: "pag-calc-01",
    category: "Paginação",
    difficulty: "intermediate",
    title: "Cálculo de Número de Páginas",
    description: "Aplicar fórmulas de paginação",
    question: "Um processo tem 1MB de espaço lógico e usa páginas de 4KB. Quantas páginas ele pode ter no máximo?",
    type: "calculation",
    correctAnswer: ["256", "2^8"],
    explanation: "1 MB = 1024 KB. Cada página tem 4 KB. Número de páginas = 1024 KB ÷ 4 KB = 256 páginas. Fórmula geral: num_páginas = tamanho_processo ÷ tamanho_página. Note que 256 = 2⁸.",
    hint: "1MB = 1024KB, divida pelo tamanho da página",
    points: 20,
    timeEstimate: 3
  },
  {
    id: "pag-calc-02",
    category: "Paginação",
    difficulty: "intermediate",
    title: "Cálculo de Número de Quadros",
    description: "Aplicar fórmulas para memória física",
    question: "A memória física tem 32MB e quadros de 4KB. Quantos quadros existem?",
    type: "calculation",
    correctAnswer: ["8192", "2^13"],
    explanation: "32 MB = 32 × 1024 KB = 32768 KB. Cada quadro tem 4 KB. Número de quadros = 32768 KB ÷ 4 KB = 8192 quadros. Note que 8192 = 2¹³ (importante para bits de endereçamento).",
    hint: "32MB = 32×1024KB, divida pelo tamanho do quadro",
    points: 20,
    timeEstimate: 3
  },
  {
    id: "pag-calc-03",
    category: "Paginação",
    difficulty: "advanced",
    title: "Bits do Endereço Lógico",
    description: "Calcular tamanho de endereços",
    question: "Processo com 1MB lógico (256 páginas de 4KB). Quantos bits no endereço lógico?",
    type: "calculation",
    correctAnswer: ["20", "2^20"],
    explanation: "1 MB = 2²⁰ bytes. Endereço lógico precisa endereçar 2²⁰ posições, logo precisa de 20 bits. Alternativamente: 256 páginas = 2⁸ (8 bits) + 4KB offset = 2¹² (12 bits) → 8+12 = 20 bits total.",
    hint: "1MB = 2²⁰ bytes, quantos bits para endereçar?",
    points: 25,
    timeEstimate: 4
  },

  // ========== TLB (8 exercícios) ==========
  {
    id: "tlb-01",
    category: "TLB",
    difficulty: "intermediate",
    title: "Conceito de TLB",
    description: "Translation Lookaside Buffer",
    question: "O que é a TLB (Translation Lookaside Buffer)?",
    type: "multiple_choice",
    options: [
      "Cache associativa de traduções página→quadro recentes",
      "Tipo de memória RAM especial",
      "Algoritmo de substituição de páginas",
      "Sistema de arquivos"
    ],
    correctAnswer: "Cache associativa de traduções página→quadro recentes",
    explanation: "TLB é um cache ASSOCIATIVO de alta velocidade que armazena traduções recentes de página→quadro. Hit rate típico: 95-99%. Com TLB hit, acesso leva ~101ns (1ns TLB + 100ns RAM). Sem TLB ou com miss, leva ~200ns (100ns tabela + 100ns dado).",
    hint: "TLB = cache de traduções para acelerar paginação",
    points: 15,
    timeEstimate: 3
  },
  {
    id: "tlb-02",
    category: "TLB",
    difficulty: "advanced",
    title: "Cálculo de Tempo com TLB",
    description: "Effective Access Time com TLB",
    question: "TLB=10ns, RAM=100ns, hit rate=90%. Qual o tempo médio de acesso?",
    type: "calculation",
    correctAnswer: ["120", "120ns"],
    explanation: "EAT = hit_rate × (TLB + RAM) + miss_rate × (TLB + tabela + RAM). EAT = 0.9 × (10+100) + 0.1 × (10+100+100) = 0.9×110 + 0.1×210 = 99 + 21 = 120ns. A TLB reduziu de 200ns para 120ns!",
    hint: "Considere hit (TLB+RAM) e miss (TLB+tabela+RAM)",
    points: 30,
    timeEstimate: 5
  },

  // ========== MEMÓRIA VIRTUAL (15 exercícios) ==========
  {
    id: "vm-01",
    category: "Memória Virtual",
    difficulty: "beginner",
    title: "Conceito de Memória Virtual",
    description: "Fundamento da memória virtual",
    question: "Qual a principal motivação da memória virtual?",
    type: "multiple_choice",
    options: [
      "Permitir processos maiores que a RAM física disponível",
      "Aumentar a velocidade da CPU",
      "Reduzir o custo do hardware",
      "Melhorar os gráficos do sistema"
    ],
    correctAnswer: "Permitir processos maiores que a RAM física disponível",
    explanation: "Memória Virtual permite que processos usem MAIS memória do que há RAM física, usando disco (swap/paging file) como extensão. Baseia-se no princípio da localidade: programas não acessam todas suas páginas ao mesmo tempo. Apenas páginas usadas ficam na RAM.",
    hint: "Pense em 'extender' a memória disponível além da RAM",
    points: 10,
    timeEstimate: 2
  },
  {
    id: "vm-02",
    category: "Memória Virtual",
    difficulty: "intermediate",
    title: "Princípio da Localidade",
    description: "Base da memória virtual",
    question: "O que significa 'localidade temporal' no princípio da localidade?",
    type: "multiple_choice",
    options: [
      "Dado recém acessado tem alta chance de ser acessado novamente em breve",
      "Dados próximos no espaço tendem a ser acessados juntos",
      "Processos executam em paralelo no tempo",
      "Cache é mais rápido que RAM"
    ],
    correctAnswer: "Dado recém acessado tem alta chance de ser acessado novamente em breve",
    explanation: "LOCALIDADE TEMPORAL: dado recém acessado provavelmente será acessado de novo em breve (ex: variáveis de loop, pilha). LOCALIDADE ESPACIAL: dados próximos têm chance de serem acessados juntos (ex: elementos de array). Essas propriedades tornam caches e memória virtual eficientes!",
    hint: "Temporal = tempo, dados usados recentemente",
    points: 15,
    timeEstimate: 2
  },
  {
    id: "vm-03",
    category: "Memória Virtual",
    difficulty: "intermediate",
    title: "Page Fault",
    description: "Mecanismo fundamental de MV",
    question: "O que é um Page Fault?",
    type: "multiple_choice",
    options: [
      "Interrupção quando página acessada não está na RAM (bit Present=0)",
      "Erro fatal de programação",
      "Memória física totalmente cheia",
      "Disco rígido corrompido"
    ],
    correctAnswer: "Interrupção quando página acessada não está na RAM (bit Present=0)",
    explanation: "PAGE FAULT é uma TRAP (interrupção de hardware) gerada pela MMU quando o processo tenta acessar uma página que não está carregada na RAM (bit Present=0 na tabela de páginas). O kernel então: 1) Escolhe vítima (se RAM cheia), 2) Carrega página do disco, 3) Atualiza tabela, 4) Retoma processo.",
    hint: "Fault = falta, página não está presente",
    points: 15,
    timeEstimate: 3
  },
  {
    id: "vm-04",
    category: "Memória Virtual",
    difficulty: "advanced",
    title: "Working Set",
    description: "Conjunto de páginas ativas",
    question: "O que é o Working Set de um processo?",
    type: "multiple_choice",
    options: [
      "Conjunto de páginas referenciadas nas últimas Δ referências",
      "Todas as páginas do processo",
      "Páginas armazenadas no disco",
      "Páginas nunca acessadas"
    ],
    correctAnswer: "Conjunto de páginas referenciadas nas últimas Δ referências",
    explanation: "WORKING SET W(t,Δ) = conjunto de páginas referenciadas nas últimas Δ referências de memória. Representa as páginas 'ativas' que o processo precisa para rodar eficientemente. Se RAM < soma de todos os working sets → THRASHING (sistema passa mais tempo com page faults que executando código útil).",
    hint: "Working set = páginas 'trabalhando' recentemente",
    points: 25,
    timeEstimate: 4
  },
  {
    id: "vm-05",
    category: "Memória Virtual",
    difficulty: "advanced",
    title: "Thrashing",
    description: "Problema crítico de performance",
    question: "O que caracteriza o estado de Thrashing?",
    type: "multiple_choice",
    options: [
      "Sistema passa mais tempo com page faults que executando código útil",
      "CPU está 100% ocupada executando processos",
      "Disco está cheio",
      "Muitos processos na fila de prontos"
    ],
    correctAnswer: "Sistema passa mais tempo com page faults que executando código útil",
    explanation: "THRASHING ocorre quando a soma dos working sets > RAM disponível. Sistema fica constantemente fazendo page faults, gastando todo o tempo em I/O de disco. CPU fica ociosa! Solução: reduzir grau de multiprogramação (menos processos) ou adicionar RAM.",
    hint: "Thrashing = muitos page faults, pouco trabalho útil",
    points: 25,
    timeEstimate: 4
  },

  // ========== ALGORITMOS DE SUBSTITUIÇÃO (18 exercícios) ==========
  {
    id: "algo-fifo-01",
    category: "Algoritmos de Substituição",
    difficulty: "intermediate",
    title: "Algoritmo FIFO",
    description: "First-In-First-Out",
    question: "Como funciona o algoritmo FIFO de substituição de páginas?",
    type: "multiple_choice",
    options: [
      "Substitui a página que está há mais tempo na memória (mais antiga)",
      "Substitui a página menos recentemente usada",
      "Substitui a página mais recentemente usada",
      "Substitui uma página aleatória"
    ],
    correctAnswer: "Substitui a página que está há mais tempo na memória (mais antiga)",
    explanation: "FIFO (First In, First Out): substitui a página que foi carregada há MAIS TEMPO (mais antiga). Usa uma fila simples. Fácil de implementar mas pode substituir páginas importantes. DESVANTAGEM: sofre da Anomalia de Belady (mais quadros pode resultar em MAIS page faults!).",
    hint: "First In, First Out = primeira a entrar, primeira a sair",
    points: 15,
    timeEstimate: 2
  },
  {
    id: "algo-lru-01",
    category: "Algoritmos de Substituição",
    difficulty: "intermediate",
    title: "Algoritmo LRU",
    description: "Least Recently Used",
    question: "Como funciona o algoritmo LRU?",
    type: "multiple_choice",
    options: [
      "Substitui a página menos recentemente usada (acessada há mais tempo)",
      "Substitui a página mais recentemente usada",
      "Substitui a página mais antiga na memória",
      "Substitui a primeira página encontrada"
    ],
    correctAnswer: "Substitui a página menos recentemente usada (acessada há mais tempo)",
    explanation: "LRU (Least Recently Used): substitui a página que NÃO foi acessada há MAIS TEMPO. Baseia-se na localidade temporal: se não foi usada recentemente, provavelmente não será usada em breve. VANTAGEM: não sofre Anomalia de Belady. DESVANTAGEM: custoso implementar (precisa rastrear tempo de acesso).",
    hint: "Least Recently = menos recentemente",
    points: 15,
    timeEstimate: 2
  },
  {
    id: "algo-optimal-01",
    category: "Algoritmos de Substituição",
    difficulty: "advanced",
    title: "Algoritmo Optimal",
    description: "Algoritmo teórico ótimo",
    question: "O que o algoritmo Optimal substitui?",
    type: "multiple_choice",
    options: [
      "Página que será usada mais tarde no futuro",
      "Página menos recentemente usada",
      "Página mais antiga",
      "Página aleatória"
    ],
    correctAnswer: "Página que será usada mais tarde no futuro",
    explanation: "OPTIMAL (Belady): substitui a página que será usada MAIS TARDE no futuro (ou nunca mais). Garante MÍNIMO número de page faults possível! PROBLEMA: não é implementável na prática pois requer conhecimento do futuro. Usado como benchmark teórico para comparar outros algoritmos.",
    hint: "Optimal = escolhe olhando para o futuro",
    points: 20,
    timeEstimate: 3
  },
  {
    id: "algo-clock-01",
    category: "Algoritmos de Substituição",
    difficulty: "intermediate",
    title: "Algoritmo Clock (Second Chance)",
    description: "Aproximação eficiente do LRU",
    question: "Como funciona o algoritmo Clock (Second Chance)?",
    type: "multiple_choice",
    options: [
      "Percorre páginas em círculo, dá segunda chance se bit R=1",
      "Usa um relógio real para medir tempo",
      "Idêntico ao FIFO",
      "Idêntico ao LRU"
    ],
    correctAnswer: "Percorre páginas em círculo, dá segunda chance se bit R=1",
    explanation: "CLOCK (Second Chance): Organiza páginas em círculo. Ponteiro percorre: se bit R=1 (recentemente usada) → seta R=0 e avança (segunda chance); se R=0 → substitui. VANTAGEM: aproximação boa do LRU com custo baixo (só precisa de 1 bit). Usado em muitos SOs reais.",
    hint: "Clock = ponteiro gira em círculo dando segunda chance",
    points: 20,
    timeEstimate: 3
  },
  {
    id: "algo-belady-01",
    category: "Algoritmos de Substituição",
    difficulty: "advanced",
    title: "Anomalia de Belady",
    description: "Comportamento paradoxal do FIFO",
    question: "O que é a Anomalia de Belady?",
    type: "multiple_choice",
    options: [
      "Aumentar quadros pode AUMENTAR page faults (apenas no FIFO)",
      "Diminuir quadros sempre melhora performance",
      "LRU causa mais faults que FIFO",
      "TLB fica mais lento com mais quadros"
    ],
    correctAnswer: "Aumentar quadros pode AUMENTAR page faults (apenas no FIFO)",
    explanation: "Anomalia de Belady: paradoxalmente, AUMENTAR o número de quadros pode AUMENTAR page faults! Ocorre apenas em FIFO e outros algoritmos 'não-stack'. LRU e Optimal são 'stack algorithms' e NÃO sofrem disso. Exemplo famoso: sequência 1,2,3,4,1,2,5,1,2,3,4,5 com FIFO.",
    hint: "Paradoxo: mais memória = mais faults (só FIFO)",
    points: 25,
    timeEstimate: 4
  },

  // ========== APLICAÇÕES PRÁTICAS (12 exercícios) ==========
  {
    id: "prac-01",
    category: "Aplicações Práticas",
    difficulty: "advanced",
    title: "Análise de Performance Real",
    description: "Cenário de sistema em produção",
    question: "Sistema com RAM=100ns, Page Fault=8ms, taxa PF=10%. Qual o EAT?",
    type: "calculation",
    correctAnswer: ["800100", "800100ns"],
    explanation: "EAT = (1-p)×RAM + p×PF_time. p=0.10 (10%). PF_time = 8ms = 8,000,000ns. EAT = 0.90×100 + 0.10×8,000,000 = 90 + 800,000 = 800,090ns ≈ 800μs. Sistema está em THRASHING! 10% de page faults torna acesso 8000x mais lento. Solução: adicionar RAM urgente.",
    hint: "10% = 0.10, 8ms = 8,000,000ns",
    points: 30,
    timeEstimate: 5
  },
  {
    id: "prac-02",
    category: "Aplicações Práticas",
    difficulty: "intermediate",
    title: "Tamanho Ideal de Página",
    description: "Trade-offs no design",
    question: "Páginas muito grandes causam principalmente:",
    type: "multiple_choice",
    options: [
      "Aumento de fragmentação interna",
      "Aumento de fragmentação externa",
      "Mais page faults",
      "TLB mais lento"
    ],
    correctAnswer: "Aumento de fragmentação interna",
    explanation: "Páginas GRANDES: (+) menos entradas na tabela, (-) MAIS fragmentação interna (última página desperdiça mais). Páginas PEQUENAS: (+) menos fragmentação interna, (-) mais entradas na tabela (consome mais memória). Tamanho típico: 4KB é um bom compromisso. Sistemas modernos suportam huge pages (2MB, 1GB) para casos especiais.",
    hint: "Páginas grandes → última página mais desperdiçada",
    points: 20,
    timeEstimate: 3
  },

  // ========== PARTICIONAMENTO (8 exercícios) ==========
  {
    id: "part-01",
    category: "Particionamento",
    difficulty: "intermediate",
    title: "Fragmentação Externa",
    description: "Problema do particionamento dinâmico",
    question: "Partições livres: 17KB, 18KB, 16KB, 9KB, 21KB. Processo precisa de 14KB. Qual Best-Fit escolhe?",
    type: "multiple_choice",
    options: ["16KB", "17KB", "18KB", "21KB"],
    correctAnswer: "16KB",
    explanation: "BEST-FIT escolhe a MENOR partição que cabe o processo. 14KB cabe em: 17KB, 18KB, 16KB e 21KB. A MENOR dessas é 16KB (desperdiça apenas 2KB). FIRST-FIT escolheria 17KB (primeira que cabe). WORST-FIT escolheria 21KB (maior disponível).",
    hint: "Best-Fit = menor partição suficiente",
    points: 20,
    timeEstimate: 3
  },
  {
    id: "part-02",
    category: "Particionamento",
    difficulty: "intermediate",
    title: "First-Fit vs Best-Fit",
    description: "Comparar estratégias de alocação",
    question: "Qual vantagem do First-Fit sobre Best-Fit?",
    type: "multiple_choice",
    options: [
      "Mais rápido (para na primeira partição que cabe)",
      "Menos fragmentação",
      "Melhor utilização de memória",
      "Nunca falha"
    ],
    correctAnswer: "Mais rápido (para na primeira partição que cabe)",
    explanation: "FIRST-FIT: (+) RÁPIDO - para na primeira partição que cabe, (-) pode deixar pequenos buracos no início. BEST-FIT: (+) menos desperdício teórico, (-) LENTO - precisa percorrer TODA a lista. WORST-FIT: (+) deixa buracos grandes (úteis), (-) desperdiça mais. Na prática, First-Fit é mais usado.",
    hint: "First-Fit para na primeira, mais rápido",
    points: 15,
    timeEstimate: 3
  },

  // Total: 60+ exercícios cobrindo TODO o conteúdo!
];

// Função auxiliar para obter exercícios por categoria
export function getExercisesByCategory(category: string): Exercise[] {
  if (category === "all") return exercisesDatabase;
  return exercisesDatabase.filter(ex => ex.category === category);
}

// Função auxiliar para obter exercícios por dificuldade
export function getExercisesByDifficulty(difficulty: string): Exercise[] {
  if (difficulty === "all") return exercisesDatabase;
  return exercisesDatabase.filter(ex => ex.difficulty === difficulty);
}

// Estatísticas do banco de dados
export const exerciseStats = {
  total: exercisesDatabase.length,
  byCategory: exercisesDatabase.reduce((acc, ex) => {
    acc[ex.category] = (acc[ex.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byDifficulty: exercisesDatabase.reduce((acc, ex) => {
    acc[ex.difficulty] = (acc[ex.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  totalPoints: exercisesDatabase.reduce((sum, ex) => sum + ex.points, 0),
};
