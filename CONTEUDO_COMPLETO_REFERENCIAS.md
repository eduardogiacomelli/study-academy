# Conteúdo Completo - Referências Acadêmicas

## Fonte: Capítulos 6 e 7 (Oliveira, Carissimi, Toscani) + PDFs da Professora + Lista de Exercícios

---

## CAPÍTULO 6 - GERÊNCIA DE MEMÓRIA

### 6.1 Introdução

**Conceitos Fundamentais:**
- Memória é o **segundo componente mais importante** de qualquer computador (atrás apenas da CPU)
- Multiprogramação implica em manter vários processos em memória
- Memória necessita ser alocada de forma eficiente para permitir o máximo possível de processos
- Algoritmos de gerência dependem de facilidades disponíveis pelo hardware

### 6.2 Memória Lógica vs Memória Física

**Memória Lógica:**
- É aquela que o processo "enxerga"
- Endereços lógicos são manipulados por um processo
- Também chamados de **endereços virtuais**

**Memória Física:**
- Implementada pelos circuitos integrados de memória (RAM)
- Endereços físicos correspondem a posições reais de memória

**Separação Importante:**
- Espaço lógico de um processo é diferente do espaço físico
- Programas de usuários "vêem" apenas endereços lógicos
- Endereços lógicos são transformados em endereços físicos no momento de execução

### 6.3 MMU - Memory Management Unit

**Definição:** Hardware que faz o mapeamento entre endereço lógico e endereço físico.

```
CPU → [Endereço Lógico] → MMU → [Endereço Físico] → Memória
```

**Funcionalidades da MMU:**
- Proteção de memória
- Relocação de programas
- Tradução de endereços
- Controle de acesso

**Tipos de MMU:**

1. **Com Registradores de Limite (Inferior e Superior):**
   - Verifica se endereço está dentro dos limites
   - Requer carregador **relocador**
   - Correção de endereços no momento da carga

2. **Com Registradores de Base e Limite:**
   - Base: endereço inicial do processo na memória
   - Limite: tamanho do espaço de endereçamento
   - Cálculo: `endereço_físico = base + endereço_lógico`
   - Suporta relocação em tempo de execução
   - Permite carregadores **absolutos**

### 6.4 Amarração de Endereços (Binding)

**Momento da Amarração:**

1. **Em tempo de compilação:**
   - Endereços absolutos
   - Programa deve ser carregado sempre no mesmo endereço

2. **Em tempo de carga:**
   - Código relocável
   - Carregador ajusta endereços

3. **Em tempo de execução:**
   - Relocação dinâmica
   - Suporte de hardware (MMU)
   - Permite swapping

### 6.5 Alocação de Memória

#### 6.5.1 Alocação Contígua Simples

- Sistema mais simples
- Memória dividida em duas partições:
  - Sistema Operacional (parte baixa)
  - Processo do usuário (restante)
- Problema: usuário pode acessar área do SO (não confiável)
- Solução: proteção via hardware (registradores de limite)

#### 6.5.2 Alocação Contígua Particionada Fixa

**Características:**
- Memória dividida em partições de tamanho fixo
- Partições podem ter mesmo tamanho ou tamanhos diferentes
- Número de processos ≤ número de partições (sem swapping)

**Com Código Absoluto:**
- Processo só pode ser carregado na partição para qual foi compilado
- Pode haver disputa por partição mesmo tendo outras livres
- Solução: swapping

**Com Código Relocável:**
- Processo pode ser carregado em qualquer partição livre
- Tamanho do processo ≤ tamanho da partição
- Mais flexível

**Problemas:**
- Fragmentação interna (espaço desperdiçado dentro da partição)
- Fragmentação externa (espaços livres espalhados)

#### 6.5.3 Alocação Contígua Particionada Dinâmica

**Características:**
- Partições criadas dinamicamente
- Tamanho exato do processo
- Elimina fragmentação interna
- Fragmentação externa persiste

**Algoritmos de Alocação:**

1. **First-Fit:**
   - Primeiro bloco que couber
   - Rápido
   - Fragmentação moderada

2. **Best-Fit:**
   - Menor bloco que couber
   - Mais lento (percorre toda lista)
   - Deixa pequenos fragmentos

3. **Worst-Fit:**
   - Maior bloco disponível
   - Deixa grandes fragmentos
   - Geralmente pior performance

4. **Circular-Fit (Next-Fit):**
   - Como First-Fit, mas continua de onde parou
   - Distribui alocações uniformemente

**Problema da Fragmentação Externa:**
- Solução: **Compactação**
  - Realocar processos para criar bloco contíguo grande
  - Custo alto (tempo de CPU)
  - Requer relocação dinâmica

---

## CAPÍTULO 7 - MEMÓRIA VIRTUAL

### 7.1 Motivação

**Problemas do Modelo Tradicional:**
- Todo espaço lógico mapeado no espaço físico
- Tamanho do programa limitado pelo tamanho da memória
- Desperdício: código não utilizado frequentemente em memória
  - Rotinas de tratamento de erro
  - Funcionalidades raramente usadas

**Solução:**
- Carregar apenas o que é realmente necessário
- Economia substancial de espaço
- Permite mais processos simultâneos

### 7.2 Conceito de Memória Virtual

**Definição:** Técnica que permite a execução de um processo sem que ele esteja completamente em memória.

**Princípios Básicos:**
1. Carregar página/segmento apenas quando necessária (demanda)
2. Manter em memória apenas páginas/segmentos necessários
3. Separação do vínculo entre endereço lógico e físico

**Vantagens:**
- ✅ Aumento do grau de multiprogramação
- ✅ Reduz operações de E/S (carga/swap)
- ✅ Executa programas maiores que a memória disponível
- ✅ Número de páginas > número de frames

### 7.3 Princípio da Localidade de Referência

**Base do funcionamento da memória virtual.**

**Definição:** Em um determinado instante, acessos a instruções e dados são limitados a um trecho específico.

**Tipos:**

1. **Localidade Temporal:**
   - Região acessada recentemente tem mais chances de ser acessada novamente
   - Exemplos:
     - Loops: `for`, `while`, `do-while`
     - Variáveis de controle

2. **Localidade Espacial:**
   - Maior probabilidade de acesso a dados próximos
   - Exemplos:
     - Instrução `i+1` executada após instrução `i`
     - Acesso sequencial a arrays

### 7.4 Paginação por Demanda

**Conceito:** Forma mais comum de implementação de memória virtual.

**Diferença da Paginação Simples:**
- Paginação Simples: swap do processo inteiro
- Paginação por Demanda: swap de **páginas individuais** (page-in/out)

**Vantagens:**
- Reduz operações de E/S (carrega apenas páginas necessárias)
- Reduz memória utilizada por processo
- Aumenta grau de multiprogramação

**Bit de Presença (Valid/Invalid):**
- Cada entrada da tabela de páginas tem um bit
- **Valid (1)**: Página está na memória física
- **Invalid (0)**: Página não está na memória (causa **page fault**)

### 7.5 Page Fault - Falta de Página

**Tratamento de Page Fault (Passo a Passo):**

1. **Trap para o sistema operacional**
2. **Salvamento de contexto** do processo
3. **Detecção** que a interrupção é por page fault
4. **Verifica se referência é válida** e determina localização da página no disco
5. **Solicita operação de leitura** da página do disco para um frame
6. **Processo fica suspenso** e outro é escalado
7. **Interrupção do disco** (fim da transferência)
8. **Atualiza tabela de páginas** (Present = 1)
9. **Processo volta para estado pronto**
10. **Reinicia a instrução** que causou o fault

### 7.6 Desempenho da Paginação por Demanda

**Fórmula do Tempo Efetivo de Acesso:**

```
EAT = (1 - p) × t_acesso + p × t_page_fault

Onde:
- p = taxa de page faults (0 ≤ p ≤ 1)
- t_acesso = tempo de acesso à RAM (~100 ns)
- t_page_fault = tempo para tratar page fault (~8-25 ms)
```

**Exemplo Prático:**

```
Dados:
- t_acesso = 100 ns
- t_page_fault = 25 ms = 25.000.000 ns
- p = 1/1000 = 0.001 (1 page fault a cada 1000 acessos)

Cálculo:
EAT = (1 - 0.001) × 100 + 0.001 × 25.000.000
EAT = 0.999 × 100 + 25.000
EAT = 99.9 + 25.000
EAT = 25.099,9 ns ≈ 25 μs

Conclusão: 250x mais lento que acesso normal!
```

**Para aumentar desempenho em apenas 10%:**

```
110 = 100 + p × 25.000.000
10 = p × 25.000.000
p = 0.0000004

Ou seja: 1 page fault a cada 2.500.000 acessos!
```

**Como Melhorar:**
1. Manter taxa de page faults pequena
2. Acelerar leitura em disco (SSDs, cache)
3. Otimizar procedimento de swap (pager)

### 7.7 Política de Substituição de Páginas

**Quando Usar:** Memória física totalmente ocupada + novo page fault

**Objetivo:** Selecionar página "vítima" para liberar frame

**Páginas que NÃO devem ser substituídas (Frame Locking):**
- Código e estruturas do sistema operacional
- Buffers de E/S
- Páginas críticas

**Bits Auxiliares:**

1. **Dirty Bit (Bit de Sujeira/Modificação):**
   - Indica se página foi alterada
   - Se não modificada: não precisa write-back ao disco
   - Economia de tempo

2. **Reference Bit (Bit de Referência):**
   - Indica se página foi acessada
   - Usado por algoritmos como Clock e LRU

3. **Lock Bit (Bit de Trava):**
   - Evita que página seja substituída
   - Usado para páginas críticas

### 7.8 Algoritmos de Substituição

#### 7.8.1 FIFO (First-In, First-Out)

**Princípio:** Substitui página que está há mais tempo na memória.

**Implementação:**
- Fila circular de páginas
- Ponteiro indica próxima a ser substituída

**Vantagens:**
- ✅ Muito simples
- ✅ Baixo overhead

**Desvantagens:**
- ❌ **Anomalia de Belády** (mais frames → mais page faults!)
- ❌ Não considera frequência de uso
- ❌ Performance geralmente inferior

#### 7.8.2 Segunda Chance (Second Chance)

**Princípio:** FIFO com melhorias usando bit de referência.

**Funcionamento:**
1. Percorre fila circular
2. Se R=0: substitui
3. Se R=1: dá "segunda chance" (R←0) e avança
4. Continua até encontrar R=0

**Vantagens:**
- ✅ Melhor que FIFO puro
- ✅ Considera uso recente
- ✅ Simples

#### 7.8.3 Relógio (Clock)

**Princípio:** Versão otimizada da Segunda Chance.

**Implementação:**
- Buffer circular de páginas
- Ponteiro "mão do relógio"
- Bit de referência por página

**Funcionamento:** Idêntico à Segunda Chance, mas com organização em relógio.

#### 7.8.4 NRU (Not Recently Used)

**Princípio:** Usa 2 bits: R (Referenciado) e M (Modificado).

**Classes de Páginas (ordem de preferência para substituição):**

1. **(R=0, M=0)** - Não referenciada, não modificada ⭐ **MELHOR VÍTIMA**
2. **(R=0, M=1)** - Não referenciada, mas modificada (precisa write-back)
3. **(R=1, M=0)** - Referenciada, não modificada
4. **(R=1, M=1)** - Referenciada e modificada **PIOR VÍTIMA**

**Algoritmo:** Substitui página da classe mais baixa disponível.

#### 7.8.5 LRU (Least Recently Used)

**Princípio:** Substitui página não usada há mais tempo.

**Base:** Princípio da localidade temporal.

**Implementações:**

1. **Com Contadores (Timestamps):**
   - Cada página tem contador
   - Atualizado a cada acesso
   - Vítima: menor timestamp

2. **Com Pilha:**
   - Lista duplamente encadeada
   - Topo: página mais recentemente usada
   - Base: LRU (vítima)
   - Atualização: O(1) com ponteiros

**Vantagens:**
- ✅ Performance próxima do Optimal
- ✅ Não sofre de Anomalia de Belády
- ✅ Considera histórico de uso

**Desvantagens:**
- ❌ Alto overhead
- ❌ Complexo de implementar em hardware
- ❌ Atualização a cada acesso

#### 7.8.6 NFU (Not Frequently Used)

**Princípio:** Contador de acessos por página.

**Funcionamento:**
- Contador incrementado a cada acesso
- Vítima: menor contador

**Problema:** Não "esquece" o passado (páginas antigas com contador alto).

#### 7.8.7 Envelhecimento (Aging)

**Princípio:** NFU com decaimento temporal.

**Funcionamento:**
1. Shift right do contador
2. Bit R inserido no bit mais significativo
3. Vítima: menor contador

**Vantagem:** Aproximação melhor do LRU, "esquece" o passado distante.

#### 7.8.8 Optimal (OPT/MIN)

**Princípio:** Substitui página que será usada mais tarde no futuro (ou nunca).

**Status:** **Impossível de implementar** (requer conhecimento do futuro).

**Utilidade:**
- Benchmark teórico
- Limite superior de performance
- Comparação com algoritmos práticos

**Ranking Geral:**
```
Optimal ≤ LRU ≤ Clock ≤ Segunda Chance ≤ FIFO
```

---

## LISTA DE EXERCÍCIOS - INE5611

### Gerência de Memória

**QUESTÃO 1:** Quais características poderiam ser consideradas ideais em uma memória?
- Velocidade alta
- Grande capacidade
- Não volátil
- Baixo custo
- *Nenhuma tecnologia satisfaz tudo simultaneamente*

**QUESTÃO 2:** Cite os principais elementos que compõe a hierarquia de memória.
- Registradores
- Cache L1, L2, L3
- Memória Principal (RAM)
- Memória Secundária (SSD/HD)

**QUESTÃO 3:** Apresente quatro características que diferenciam memória principal de secundária.
1. Velocidade (RAM rápida vs disco lento)
2. Volatilidade (RAM volátil vs disco persistente)
3. Acesso (RAM direta pela CPU vs disco via controlador)
4. Custo (RAM cara por GB vs disco barato)

**QUESTÃO 4:** Qual o papel do gerenciador de memória de um SO?
- Prover mecanismos para acesso compartilhado à memória
- De forma segura e eficiente
- Controlar áreas livres e ocupadas
- Implementar políticas de alocação

**QUESTÃO 5:** Diferencie memória lógica de memória física.
- **Lógica**: Vista pelo processo, endereços virtuais
- **Física**: RAM real, endereços reais

**QUESTÃO 6:** Diferencie endereço lógico de endereço físico.
- **Lógico**: Gerado pela CPU, manipulado pelo programa
- **Físico**: Enviado para a RAM, posição real na memória

**QUESTÃO 7:** O que é a MMU?
- **Memory Management Unit**
- Hardware que mapeia endereço lógico → físico
- Fornece proteção e relocação

**QUESTÃO 8:** Diferencie proteção e relocação.
- **Proteção**: Impedir acesso indevido a áreas de memória
- **Relocação**: Ajustar endereços do programa conforme localização na memória

**QUESTÃO 9:** Complete:
A) Registradores de limite inferior/superior → carregador **relocador**
B) Registradores de base/limite → carregador **absoluto**

**QUESTÃO 10:** Avalie:
A) F - Partições podem ter tamanhos diferentes
B) F - Partições variáveis não são fixas
C) V - Pode ter ambas fragmentações
D) F - Sofre apenas de fragmentação externa

**QUESTÃO 11:** Algoritmos de alocação (17, 18, 16, 9, 21, 12, 25 KB):

| Algoritmo | 9 KB | 20 KB | 14 KB | 10 KB | 8 KB |
|-----------|------|-------|-------|-------|------|
| First-fit | 17   | 21    | 18    | 16    | 17   |
| Circular  | 17   | 21    | 25    | 18    | 16   |
| Worst-fit | 25   | 21    | 17    | 16    | 18   |
| Best-fit  | 9    | 21    | 16    | 12    | 17   |

### Paginação e Segmentação

**QUESTÃO 1:** O que é paginação?
- Método de alocação não contígua
- Divide memória lógica em páginas (tamanho fixo)
- Divide memória física em quadros/frames (mesmo tamanho)

**QUESTÃO 2:** Diferença entre páginas e quadros?
- **Páginas**: Blocos da memória lógica
- **Quadros**: Blocos da memória física

**QUESTÃO 3:** Espaços lógico e físico são contíguos?
- **Lógico**: SIM (processo "vê" contíguo)
- **Físico**: NÃO (pode estar espalhado)

**QUESTÃO 4:** Fragmentação interna média?
- **Em média: metade do tamanho da página**

**QUESTÃO 5:** Sistema com 1MB lógico, 32MB físico, páginas de 4KB:

a) Páginas máximas: 1024 KB / 4 KB = **256 páginas**
b) Quadros máximos: 32768 KB / 4 KB = **8192 quadros**
c) End. lógico: 1 MB = 2²⁰ = **20 bits**
d) End. físico: 32 MB = 2²⁵ = **25 bits**
e) Bits para página: log₂(256) = **8 bits**
f) Bits para quadro: log₂(8192) = **13 bits**
g) Bits para offset: log₂(4096) = **12 bits**

**QUESTÃO 6:** Tradução de endereços:
1. Dividir endereço lógico: página + offset
2. Buscar quadro na tabela de páginas
3. Endereço físico = (quadro × tam_página) + offset

**QUESTÃO 7:** Tabela em registradores:
- **Vantagem**: Acesso muito rápido
- **Desvantagem**: Número limitado de registradores

**QUESTÃO 8:** Dois acessos à memória?
- **VERDADEIRO** sem TLB:
  1. Acesso à tabela de páginas
  2. Acesso ao dado
- Com TLB: pode ser 1 acesso só (TLB hit)

**QUESTÃO 9:** O que é TLB?
- **Translation Lookaside Buffer**
- Cache da MMU para traduções recentes
- Hit rate ~95-99%
- Acelera drasticamente a tradução

**QUESTÃO 10:** O que é segmentação?
- Divide memória logicamente (não por tamanho fixo)
- Segmentos: código, dados, pilha, heap
- Tamanhos variáveis

**QUESTÃO 11:** Desvantagem da segmentação simples?
- **Fragmentação externa** (segmentos de tamanhos variados)
- **Solução**: Segmentação com paginação

### Memória Virtual

**QUESTÃO 1:** O que é memória virtual?
- **Motivação**: Executar processos maiores que a RAM
- **Princípio**: Carregar apenas páginas necessárias
- **Benefícios**: Mais multiprogramação, menos I/O

**QUESTÃO 2:** Princípio da localidade?
- Acessos concentrados em certas regiões
- Temporal: acessado recentemente → acessado de novo
- Espacial: dados próximos têm mais chance de serem acessados

**QUESTÃO 3:** Exemplos:
- **Temporal**: Loops (for, while)
- **Espacial**: Arrays sequenciais

**QUESTÃO 4:** Avalie:
A) V - Só carrega páginas acessadas
B) F - Precisa bit de presença, bits de controle
C) F - Page fault = página não está na memória
D) F - Bit "Referenciado" indica acesso recente

**QUESTÃO 5:** Passos do page fault:
1. Trap para SO
2. Salva contexto
3. Detecta page fault
4. Verifica validade e localiza no disco
5. Lê do disco para frame
6. Suspende processo
7. Interrupção do disco
8. Atualiza tabela
9. Processo fica pronto
10. Reinicia instrução

**QUESTÃO 6:** EAT = 10.150 μs com tpf = 10 ms, tam = 150 ns:
```
10150 = (1-p) × 0.150 + p × 10000
10150 = 0.150 - 0.150p + 10000p
10149.85 = 9999.85p
p ≈ 0.001015 (1/985 acessos)
```

**QUESTÃO 7:** Algoritmos:
- **(a) FIFO**: Fila, substitui mais antiga
- **(b) Segunda Chance**: FIFO + bit R
- **(c) Relógio**: Segunda chance circular
- **(d) NRU**: Classes (R, M)
- **(e) LRU**: Menos recentemente usada
- **(f) NFU**: Contador de acessos
- **(g) Envelhecimento**: NFU com decaimento

---

## RESUMO EXECUTIVO

### Hierarquia de Conceitos

```
Gerência de Memória
├── Memória Lógica vs Física
├── MMU (Mapeamento)
├── Alocação Contígua
│   ├── Simples
│   ├── Particionada Fixa
│   └── Particionada Dinâmica
└── Alocação Não Contígua
    ├── Paginação
    │   ├── Simples
    │   └── Por Demanda (Memória Virtual)
    ├── Segmentação
    └── Segmentação Paginada

Memória Virtual
├── Paginação por Demanda
├── Page Fault
├── Princípio da Localidade
└── Algoritmos de Substituição
    ├── FIFO
    ├── Segunda Chance / Clock
    ├── NRU
    ├── LRU
    ├── NFU / Aging
    └── Optimal (teórico)
```

### Fórmulas Importantes

**Tempo Efetivo de Acesso:**
```
EAT = (1 - p) × t_mem + p × t_page_fault
```

**Fragmentação Interna Média (Paginação):**
```
Frag_interna_média = tamanho_página / 2
```

**Endereço Físico (Paginação):**
```
end_físico = (número_quadro × tam_página) + offset
```

**Endereço Lógico (Segmentação):**
```
end_físico = base_segmento + offset
```

---

**Total de Linhas de Conteúdo Extraído: ~4900 linhas do PDF 01 + Capítulos 6 e 7 completos**

**Última Atualização**: 2025-10-22

