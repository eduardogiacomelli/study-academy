# Conteúdo Extraído dos PDFs

Este documento contém o conteúdo acadêmico extraído dos PDFs da professora para referência e implementação na plataforma.

## 01 - Gerência de Memória

### Conceitos Fundamentais

- **Memória**: Segundo componente mais importante de qualquer computador (atrás apenas da CPU)
- Para executar um programa, suas instruções devem estar na memória
- Memória consiste em uma sequência de posições capazes de armazenar um byte ou palavra
- Cada posição é referenciada por um endereço

### Características Ideais da Memória

1. **Velocidade**: Extremamente rápida
2. **Capacidade**: Espaço de armazenamento abundante
3. **Persistência**: Não volátil (não perde conteúdo quando desligada)
4. **Custo**: Baixo

**Realidade**: Nenhuma tecnologia atual satisfaz todos estes objetivos simultaneamente.

### Hierarquia de Memória

Computadores modernos apresentam uma hierarquia de memória com diferentes níveis:

1. **Registradores** (mais rápidos, menores)
2. **Cache L1, L2, L3**
3. **Memória Principal (RAM)**: Volátil, velocidade média, gigabytes de capacidade, custo moderado
4. **Memória Secundária (Disco)**: Não volátil, baixa velocidade, grande capacidade, baixo custo

### Gerenciador de Memória

**Definição**: Parte do sistema operacional responsável por prover os mecanismos necessários ao acesso compartilhado à hierarquia de memória, de forma segura e eficiente.

**Desafios**:
- Multiprogramação implica em vários processos em memória simultaneamente
- Memória precisa ser alocada de maneira eficiente
- Algoritmos dependem de facilidades disponibilizadas pelo hardware

### Memória Lógica vs Memória Física

- **Espaço de Endereçamento Lógico**: "Visto" pelo processo
- **Espaço de Endereçamento Físico**: Memória RAM real
- **MMU (Memory Management Unit)**: Hardware responsável pela tradução

### Tópicos Principais

1. Memória Lógica e Memória Física
2. Alocação de Memória
3. Swapping
4. Considerações Finais

---

## 02 - Paginação e Segmentação

### Problema: Fragmentação Externa

**Origem**: Programas precisam ocupar uma área contígua de memória.

**Solução**: Remover esta restrição, permitindo que programas ocupem áreas não contíguas da memória.

### Métodos de Alocação Não Contígua

Exploram a existência de:
- **Espaço de endereçamento lógico**: Continua sendo contíguo para o processo
- **Espaço de endereçamento físico**: Não precisa ser contíguo
- **Mecanismo de mapeamento**: Do espaço lógico para o espaço físico

**Principais Métodos**:
1. Paginação
2. Segmentação
3. Segmentação paginada

### Paginação

**Definição**: Método de alocação de memória que define uma abstração de páginas e quadros de tamanho fixo, assim como o mapeamento entre eles, para permitir que o espaço de endereçamento físico de um processo seja não contíguo.

**Conceitos Fundamentais**:
- **Página**: Bloco de tamanho fixo na memória lógica
- **Quadro (Frame)**: Bloco de tamanho fixo na memória física (mesmo tamanho da página)
- **Tamanhos Típicos**: 4KB, 8KB ou 16KB

### Tradução de Endereço Lógico para Físico

**Endereço Lógico = Número da Página + Deslocamento (Offset)**

1. **Número da Página**: Índice na tabela de páginas
2. **Deslocamento**: Posição dentro da página

**Processo de Tradução**:
1. Extrair número da página e offset do endereço lógico
2. Buscar o número do quadro na tabela de páginas
3. Calcular endereço físico: (Quadro × Tamanho_Página) + Offset

### Tabela de Páginas

**Estrutura**: Cada processo tem sua própria tabela de páginas.

**Entrada na Tabela (PTE - Page Table Entry)**:
- **Frame Number**: Número do quadro físico
- **Present Bit**: Página está na memória?
- **Modified Bit (Dirty Bit)**: Página foi modificada?
- **Referenced Bit**: Página foi acessada?
- **Protection Bits**: Permissões (R/W/X)
- **Valid Bit**: Entrada é válida?

### TLB - Translation Lookaside Buffer

**Definição**: Cache especial que armazena as traduções mais recentemente usadas.

**Funcionamento**:
1. **TLB Hit**: Tradução encontrada no TLB → Muito rápido (~1 ciclo)
2. **TLB Miss**: Busca na tabela de páginas → Mais lento (~100 ciclos)
3. **Atualização**: Adiciona tradução no TLB

**Taxa de Acerto**: 95-99% em sistemas modernos

### Paginação Multinível

Para processos grandes, tabelas de páginas podem ocupar muita memória. Solução: usar múltiplos níveis de tabelas.

### Vantagens da Paginação

1. **Sem Fragmentação Externa**: Qualquer quadro pode ser alocado para qualquer página
2. **Compartilhamento Simples**: Múltiplos processos podem compartilhar páginas
3. **Proteção**: Cada página pode ter permissões independentes
4. **Base para Memória Virtual**: Fundamental para swap

### Desvantagens da Paginação

1. **Fragmentação Interna**: Última página pode não usar todo o quadro
2. **Overhead da Tabela**: Tabela pode ocupar muita memória
3. **Tempo de Tradução**: Cada acesso requer tradução (mitigado pelo TLB)

### Segmentação

**Definição**: Esquema de gerenciamento de memória que reflete a visão lógica do programador. Segmentos têm tamanhos variáveis.

**Características**:
- **Tamanho Variável**: Cada segmento pode ter tamanho diferente
- **Divisão Lógica**: Reflete a estrutura do programa
- **Proteção Individual**: Cada segmento pode ter suas próprias permissões

**Tipos Comuns de Segmentos**:
1. **Código**: Instruções do programa
2. **Dados**: Variáveis globais
3. **Pilha (Stack)**: Variáveis locais, chamadas de função
4. **Heap**: Alocação dinâmica

### Tabela de Segmentos

**Entrada na Tabela**:
- **Base**: Endereço físico inicial do segmento
- **Limite**: Tamanho do segmento
- **Proteção**: Permissões (R/W/X)
- **Valid**: Segmento está em uso?

### Segmentação vs Paginação

| Aspecto | Paginação | Segmentação |
|---------|-----------|-------------|
| Tamanho | Fixo | Variável |
| Visão | Física | Lógica |
| Fragmentação Externa | Não | Sim |
| Fragmentação Interna | Sim | Não |

---

## 03 - Memória Virtual

### Problema

Técnicas tradicionais carregam todo o programa para a memória principal:

**Limitações**:
1. Tamanho do programa limitado pelo tamanho da memória
2. Grau de multiprogramação limitado
3. Memória desperdiçada com código raramente usado

### Memória Virtual

**Definição**: Técnica de gerência de memória que permite a execução de um processo sem que ele esteja completamente carregado na memória física.

### Características

- **Paginação sob Demanda**: Páginas carregadas apenas quando necessárias
- **Área de Swap**: Espaço em memória secundária para armazenar páginas
- **Troca de Páginas**: Páginas podem ser movidas entre RAM e swap

### Vantagens

1. **Programas Maiores**: Podem ser maiores que a memória física
2. **Mais Multiprogramação**: Mais processos simultâneos
3. **Eficiência**: Apenas código usado é carregado

### Princípio da Localidade de Referência

**Definição**: Em determinados momentos, acessos a instruções e dados se concentram em uma certa região do espaço de endereçamento.

**Tipos**:

1. **Localidade Temporal**: Região acessada recentemente tem mais chances de ser acessada novamente
   - Exemplos: Loops (for, while), instruções sequenciais

2. **Localidade Espacial**: Maior probabilidade de acesso a dados próximos
   - Exemplos: Arrays, instruções sequenciais (i, i+1, i+2...)

### Paginação sob Demanda

- Páginas carregadas apenas quando referenciadas
- **Page Fault**: Quando página não está na memória
- Sistema operacional trata o page fault carregando a página

### Page Fault

**Tratamento**:
1. Identificar qual página foi referenciada
2. Buscar página no disco
3. Encontrar quadro livre (ou liberar um)
4. Carregar página no quadro
5. Atualizar tabela de páginas
6. Reiniciar instrução que causou o fault

### Working Set

**Definição**: Conjunto de páginas ativamente usadas por um processo em um dado momento.

**Importância**: Manter working set em memória minimiza page faults.

### Thrashing

**Definição**: Situação onde sistema passa mais tempo trocando páginas do que executando processos.

**Causa**: Muitos processos com working sets que não cabem na memória.

**Solução**: Reduzir grau de multiprogramação.

### Algoritmos de Substituição de Páginas

Quando memória está cheia e é necessário carregar nova página:

1. **FIFO (First-In-First-Out)**: Remove página mais antiga
2. **LRU (Least Recently Used)**: Remove página menos recentemente usada
3. **Clock**: Aproximação eficiente de LRU
4. **Optimal**: Remove página que será usada mais tarde (teórico)

### Anomalia de Belády

**Definição**: Situação onde aumentar o número de quadros disponíveis aumenta o número de page faults (ocorre com FIFO).

### Alocação de Memória

**Estratégias**:
1. **Alocação Fixa**: Cada processo recebe número fixo de quadros
2. **Alocação Variável**: Número de quadros varia conforme necessidade
3. **Alocação Local**: Processo substitui apenas suas próprias páginas
4. **Alocação Global**: Processo pode substituir páginas de outros processos

---

## Referências

- **Prof. Dr. Eduardo Camilo Inacio**
- **INE5611 – Sistemas Operacionais**
- **Universidade Federal de Santa Catarina**
- **Tanenbaum - Modern Operating Systems, 4th Edition**
- **Silberschatz - Operating System Concepts**

