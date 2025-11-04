"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, HelpCircle, Trophy } from "lucide-react";
import { useState } from "react";

export default function ExerciciosPage() {
  const [respostasVisiveis, setRespostasVisiveis] = useState<Set<number>>(new Set());

  const toggleResposta = (id: number) => {
    const novas = new Set(respostasVisiveis);
    if (novas.has(id)) {
      novas.delete(id);
    } else {
      novas.add(id);
    }
    setRespostasVisiveis(novas);
  };

  const exercicios = [
    {
      id: 1,
      categoria: "Conceitual",
      dificuldade: "Fácil",
      questao: "Explique o que é memória virtual, destacando sua principal motivação, princípio básico e benefícios.",
      resposta: "Memória virtual é uma técnica que permite que processos executem mesmo que não estejam completamente carregados na memória física. \n\nPRINCIPAL MOTIVAÇÃO: Permitir execução de programas maiores que a RAM disponível, facilitando multiprogramação.\n\nPRINCÍPIO BÁSICO: Cada processo tem um espaço de endereçamento virtual separado, que é mapeado para a memória física através de páginas. O sistema operacional gerencia esse mapeamento dinamicamente.\n\nBENEFÍCIOS:\n1. Programas maiores que RAM podem executar\n2. Isolamento entre processos (segurança)\n3. Multiprogramação eficiente\n4. Simplificação do desenvolvimento (processos veem memória contínua)\n5. Compartilhamento de código entre processos\n6. Proteção de memória (cada processo tem seu espaço privado)"
    },
    {
      id: 2,
      categoria: "Conceitual",
      dificuldade: "Fácil",
      questao: "O que é o princípio da localidade de referência?",
      resposta: "O princípio da localidade de referência afirma que programas tendem a acessar um conjunto relativamente pequeno de páginas durante qualquer período de tempo.\n\nExistem dois tipos:\n\n1. LOCALIDADE TEMPORAL: Dados/instruções acessados recentemente têm alta probabilidade de serem acessados novamente em breve.\n   Exemplo: Loops executam as mesmas instruções repetidamente.\n\n2. LOCALIDADE ESPACIAL: Dados/instruções próximos aos recentemente acessados têm alta probabilidade de serem acessados.\n   Exemplo: Arrays são acessados sequencialmente.\n\nIMPORTÂNCIA: Este princípio justifica o uso de memória virtual e cache. Apenas uma pequena parte do programa precisa estar na RAM a qualquer momento, permitindo que programas maiores que a RAM executem eficientemente."
    },
    {
      id: 3,
      categoria: "Conceitual",
      dificuldade: "Médio",
      questao: "Apresente um exemplo prático de exploração de localidade temporal e outro de localidade espacial.",
      resposta: "LOCALIDADE TEMPORAL - Exemplo:\n\nfor (int i = 0; i < 1000; i++) {\n    sum += array[i];  // Instrução 'sum +=' executada 1000x\n}\n\nA mesma instrução 'sum +=' é acessada repetidamente. Uma vez carregada na memória, é reutilizada muitas vezes.\n\nLOCALIDADE ESPACIAL - Exemplo:\n\nint arr[10000];\nfor (int i = 0; i < 10000; i++) {\n    arr[i] = i;  // Elementos adjacentes acessados sequencialmente\n}\n\nQuando arr[0] é acessado, arr[1], arr[2], etc. (que estão na mesma página) têm alta probabilidade de serem acessados em seguida. A página inteira é carregada, aproveitando múltiplos acessos."
    },
    {
      id: 4,
      categoria: "Conceitual",
      dificuldade: "Médio",
      questao: "Paginação sob demanda é uma forma de implementação de memória virtual baseada no mecanismo de paginação. Neste contexto, avalie as afirmações:\nA) Neste modelo, apenas páginas efetivamente acessadas pelo processo são carregadas na memória física.\nB) Uma tabela de páginas contendo para cada entrada apenas o número da página e o número do quadro é suficiente para implementar paginação sob demanda.\nC) Page Fault refere-se a um tipo de interrupção gerado para sinalizar que a memória física está totalmente ocupada e não há lugar para novas páginas.\nD) O bit \"Referenciado\" é utilizado na tabela de páginas para controlar as páginas que estão carregadas na memória física.",
      resposta: "A) VERDADEIRO (V)\nEm paginação sob demanda, páginas só são carregadas quando acessadas pela primeira vez. Isso economiza memória e permite programas maiores que a RAM.\n\nB) FALSO (F)\nUma tabela de páginas para paginação sob demanda precisa de mais informações:\n- Bit de validade (presente/ausente na memória)\n- Bit de modificação (dirty bit)\n- Bit de referência (para algoritmos de substituição)\n- Permissões (read/write/execute)\n- Endereço do quadro (quando presente)\n\nC) FALSO (F)\nPage Fault é uma interrupção gerada quando um processo tenta acessar uma página que não está na memória física. Pode ocorrer mesmo quando há espaço disponível na RAM. O sistema então carrega a página do disco.\n\nD) FALSO (F)\nO bit \"Referenciado\" (R) é usado para rastrear quais páginas foram acessadas recentemente, útil para algoritmos de substituição como LRU. O bit que controla se uma página está carregada é o bit de \"Validade\" ou \"Presente\" (P)."
    },
    {
      id: 5,
      categoria: "Conceitual",
      dificuldade: "Médio",
      questao: "Descreva os passos necessários para tratamento de um page fault.",
      resposta: "Quando um page fault ocorre, o sistema operacional executa os seguintes passos:\n\n1. DETECÇÃO: A MMU (Memory Management Unit) detecta que o bit de validade na tabela de páginas está desativado, gerando uma interrupção.\n\n2. SALVAR CONTEXTO: O SO salva o estado do processo (registradores, PC, etc.) para poder retomar depois.\n\n3. VERIFICAR ENDEREÇO: Verifica se o endereço virtual é válido (dentro dos limites do processo). Se inválido → Segmentation Fault.\n\n4. LOCALIZAR PÁGINA: Determina onde a página está armazenada (disco swap ou arquivo executável).\n\n5. VERIFICAR ESPAÇO: Verifica se há frames livres na memória física. Se não houver, executa algoritmo de substituição.\n\n6. SUBSTITUIÇÃO (se necessário): Escolhe uma vítima, escreve no disco se foi modificada (dirty), marca como ausente.\n\n7. CARREGAR PÁGINA: Lê a página do disco para o frame físico escolhido.\n\n8. ATUALIZAR TABELA: Atualiza a tabela de páginas: marca como presente, define número do frame, ativa bits de permissão.\n\n9. RETOMAR EXECUÇÃO: Restaura o contexto do processo e retoma a instrução que causou o fault.\n\nTEMPO TÍPICO: ~10ms (milissegundos) - muito mais lento que acesso à RAM (~100ns)."
    },
    {
      id: 6,
      categoria: "Cálculo",
      dificuldade: "Difícil",
      questao: "Em um sistema computacional, o tempo médio de acesso à memória é tam = 150 ns e o tempo médio para tratamento de um page fault é tpf = 10 ms. Para uma taxa de um page fault para cada 500 acessos, o tempo efetivo de acesso à memória é te = 20,150 µs. Qual taxa de page fault é necessária para se obter um tempo efetivo de te = 10,150 µs?",
      resposta: "FÓRMULA DO TEMPO EFETIVO:\nte = (1 - p) × tam + p × tpf\n\nOnde:\n- te = tempo efetivo de acesso\n- tam = tempo de acesso à memória = 150 ns = 0,15 µs\n- tpf = tempo de page fault = 10 ms = 10.000 µs\n- p = taxa de page fault (probabilidade)\n\nDADOS INICIAIS:\np1 = 1/500 = 0,002 = 0,2%\nte1 = 20,150 µs\n\nVERIFICAÇÃO:\nte1 = (1 - 0,002) × 0,15 + 0,002 × 10.000\nte1 = 0,998 × 0,15 + 20\nte1 = 0,1497 + 20 = 20,1497 µs ✓\n\nPROBLEMA:\nQueremos te2 = 10,150 µs\nQual p2?\n\n10,150 = (1 - p2) × 0,15 + p2 × 10.000\n10,150 = 0,15 - 0,15p2 + 10.000p2\n10,150 = 0,15 + 9.999,85p2\n10,149,85 = 9.999,85p2\n\np2 = 10,149,85 / 9.999,85\np2 ≈ 1,015\n\nComo p2 > 1, isso é impossível! Vamos recalcular:\n\n10,150 = 0,15 + 9.999,85p2\n10,149,85 = 9.999,85p2\np2 = 1,015 (impossível)\n\nRevisando: se te = 10,150 µs e tam = 0,15 µs, então:\n10,150 = (1-p) × 0,15 + p × 10.000\n10,150 = 0,15 - 0,15p + 10.000p\n10,149,85 = 9.999,85p\np ≈ 0,001015 ≈ 1/985\n\nRESPOSTA: Aproximadamente 1 page fault para cada 985 acessos (p ≈ 0,1015%)"
    },
    {
      id: 7,
      categoria: "Conceitual",
      dificuldade: "Difícil",
      questao: "Descreva o funcionamento dos seguintes algoritmos de substituição de páginas:\n(a) FIFO\n(b) Segunda Chance\n(c) Relógio\n(d) NRU\n(e) LRU\n(f) NFU\n(g) Envelhecimento",
      resposta: "(a) FIFO (First In First Out)\nSubstitui a página que está há mais tempo na memória. Usa uma fila: quando uma página entra, vai para o final; quando precisa substituir, remove a do início. Simples, mas pode sofrer Anomalia de Belady.\n\n(b) Segunda Chance\nVariante do FIFO que dá uma 'segunda chance' às páginas. Ao escolher a vítima, verifica o bit R (referenciado). Se R=1, zera R e move para o final da fila. Se R=0, substitui. Melhora o FIFO consideravelmente.\n\n(c) Relógio (Clock)\nImplementação circular da Segunda Chance. Usa um ponteiro circular que percorre os frames. Em cada substituição, move o ponteiro até encontrar uma página com R=0. Se R=1, zera e continua. Mais eficiente que Segunda Chance.\n\n(d) NRU (Not Recently Used)\nClassifica páginas em 4 classes baseado nos bits R (referenciado) e M (modificado):\n- Classe 0: R=0, M=0 (não referenciada, não modificada)\n- Classe 1: R=0, M=1 (não referenciada, modificada)\n- Classe 2: R=1, M=0 (referenciada, não modificada)\n- Classe 3: R=1, M=1 (referenciada, modificada)\nSubstitui da classe mais baixa possível. Bits R são zerados periodicamente.\n\n(e) LRU (Least Recently Used)\nSubstitui a página que não foi usada há mais tempo. Requer manter timestamp ou contador de acesso para cada página. Ótimo desempenho, mas custoso de implementar (hardware ou software).\n\n(f) NFU (Not Frequently Used)\nMantém um contador para cada página que incrementa a cada referência. Substitui a página com menor contador. Simples, mas não 'envelhece' contadores (páginas antigas mantêm contador alto).\n\n(g) Envelhecimento (Aging)\nMelhoria do NFU. Mantém contador de 8 bits que é deslocado à direita periodicamente, com o bit R atual sendo adicionado à esquerda. Assim, contadores antigos perdem peso. Boa aproximação de LRU com custo menor."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Exercícios</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
            Exercícios Práticos
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            {exercicios.length} questões sobre memória virtual, do básico ao avançado.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { label: "Conceituais", value: "5" },
              { label: "Cálculos", value: "1" },
              { label: "Algoritmos", value: "1" }
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Exercícios */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-6">
          {exercicios.map((ex) => (
            <Card key={ex.id} className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-500 text-white text-lg px-3 py-1">
                  {ex.id}
                </Badge>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{ex.categoria}</Badge>
                    <Badge className={
                      ex.dificuldade === "Fácil" ? "bg-green-500" :
                      ex.dificuldade === "Médio" ? "bg-yellow-500" :
                      "bg-red-500"
                    }>
                      {ex.dificuldade}
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-slate-300 mb-4">{ex.questao}</p>
                  
                  <Button
                    onClick={() => toggleResposta(ex.id)}
                    variant="outline"
                    size="sm"
                    className="mb-4"
                  >
                    {respostasVisiveis.has(ex.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Ocultar Resposta
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Ver Resposta
                      </>
                    )}
                  </Button>
                  
                  {respostasVisiveis.has(ex.id) && (
                    <div className="bg-green-950/20 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-green-400">Resposta:</span>
                      </div>
                      <pre className="text-slate-300 whitespace-pre-wrap text-sm">
                        {ex.resposta}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border-blue-500/20 p-8 mt-12">
          <div className="flex items-center gap-4 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">Parabéns!</h3>
              <p className="text-slate-300">
                Continue praticando para dominar memória virtual!
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            💡 Dica: Tente resolver sem ver a resposta primeiro!
          </div>
        </Card>
      </div>
    </div>
  );
}

