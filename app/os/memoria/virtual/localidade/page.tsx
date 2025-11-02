"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { WorkingSetSimulator3D } from "@/components/virtual-memory/WorkingSetSimulator3D";
import { Target, TrendingUp, Activity, Layers, Code2, BookOpen, Brain, Zap } from "lucide-react";

export default function LocalidadeReferencia() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
              <Target className="w-8 h-8 text-purple-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Localidade de Referência
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
            Princípio da Localidade
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            A observação fundamental que torna a memória virtual eficiente: programas não acessam 
            memória aleatoriamente, mas seguem padrões previsíveis de localidade temporal e espacial.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Activity, label: "Temporal", value: "90% reuso", color: "text-purple-400" },
              { icon: Layers, label: "Espacial", value: "Arrays, structs", color: "text-pink-400" },
              { icon: Brain, label: "Working Set", value: "Modelo de Denning", color: "text-indigo-400" },
              { icon: Zap, label: "Eficiência", value: "98% hit rate", color: "text-green-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-4">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="conceitos" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="conceitos" className="data-[state=active]:bg-purple-500">
              <BookOpen className="w-4 h-4 mr-2" />
              Conceitos
            </TabsTrigger>
            <TabsTrigger value="working-set" className="data-[state=active]:bg-purple-500">
              <Brain className="w-4 h-4 mr-2" />
              Working Set
            </TabsTrigger>
            <TabsTrigger value="thrashing" className="data-[state=active]:bg-purple-500">
              <Zap className="w-4 h-4 mr-2" />
              Thrashing
            </TabsTrigger>
            <TabsTrigger value="simulador" className="data-[state=active]:bg-purple-500">
              <Activity className="w-4 h-4 mr-2" />
              Simulador 3D
            </TabsTrigger>
            <TabsTrigger value="codigo" className="data-[state=active]:bg-purple-500">
              <Code2 className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          {/* CONCEITOS */}
          <TabsContent value="conceitos" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Princípios Fundamentais</h2>
              
              <div className="space-y-8">
                {/* Localidade Temporal */}
                <div>
                  <h3 className="text-2xl font-semibold text-purple-300 mb-4 flex items-center gap-3">
                    <Activity className="w-6 h-6" />
                    Localidade Temporal
                  </h3>
                  
                  <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                    <strong className="text-purple-400">Definição:</strong> Dados ou instruções acessados recentemente 
                    têm alta probabilidade de serem acessados novamente em um futuro próximo.
                  </p>

                  <Card className="bg-purple-950/30 border-purple-500/20 p-6 mb-4">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Exemplos Clássicos:</h4>
                    <div className="space-y-3 text-slate-300">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-purple-500 mt-1">1</Badge>
                        <div>
                          <strong>Loops:</strong> Instruções dentro de um loop são executadas repetidamente.
                          <CodeBlock language="c">
                            {`for (int i = 0; i < 1000; i++) {
    sum += array[i];  // Instrução 'sum +=' executada 1000x
}`}
                          </CodeBlock>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Badge className="bg-purple-500 mt-1">2</Badge>
                        <div>
                          <strong>Funções Recursivas:</strong> Stack frames são reutilizados.
                          <CodeBlock language="c">
                            {`int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);  // Código chamado recursivamente
}`}
                          </CodeBlock>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge className="bg-purple-500 mt-1">3</Badge>
                        <div>
                          <strong>Variáveis Locais:</strong> Usadas múltiplas vezes em uma função.
                          <CodeBlock language="c">
                            {`void process() {
    int temp = 0;     // Alocada no stack
    temp = calc1();   // Acesso 1
    temp += calc2();  // Acesso 2
    temp *= calc3();  // Acesso 3
    return temp;      // Acesso 4
}`}
                          </CodeBlock>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-950/30 to-pink-950/30 border-purple-500/20 p-6">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">📊 Estatísticas Empíricas:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                      <div>
                        <div className="font-semibold text-purple-400 mb-2">Regra 90/10:</div>
                        <p>90% do tempo de execução é gasto em 10% do código (loops hot paths)</p>
                      </div>
                      <div>
                        <div className="font-semibold text-purple-400 mb-2">Cache L1 Hit Rate:</div>
                        <p>~95-98% devido à localidade temporal em instruções</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Localidade Espacial */}
                <div>
                  <h3 className="text-2xl font-semibold text-pink-300 mb-4 flex items-center gap-3">
                    <Layers className="w-6 h-6" />
                    Localidade Espacial
                  </h3>
                  
                  <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                    <strong className="text-pink-400">Definição:</strong> Se um endereço de memória foi acessado, 
                    endereços próximos (adjacentes) têm alta probabilidade de serem acessados em breve.
                  </p>

                  <Card className="bg-pink-950/30 border-pink-500/20 p-6 mb-4">
                    <h4 className="text-lg font-semibold text-pink-300 mb-3">Exemplos Clássicos:</h4>
                    <div className="space-y-3 text-slate-300">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-pink-500 mt-1">1</Badge>
                        <div>
                          <strong>Arrays Sequenciais:</strong> Elementos contíguos na memória.
                          <CodeBlock language="c">
                            {`int arr[1000];
for (int i = 0; i < 1000; i++) {
    arr[i] = i * 2;  // Acesso sequencial: arr[0], arr[1], arr[2]...
}
// Endereços: 0x1000, 0x1004, 0x1008, ... (4 bytes apart)`}
                          </CodeBlock>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Badge className="bg-pink-500 mt-1">2</Badge>
                        <div>
                          <strong>Structs:</strong> Campos adjacentes na memória.
                          <CodeBlock language="c">
                            {`struct Person {
    int id;         // Offset 0
    char name[50];  // Offset 4
    int age;        // Offset 54
};

Person p;
p.id = 123;      // Acesso em 0x2000
p.name[0] = 'A'; // Acesso em 0x2004 (próximo)
p.age = 30;      // Acesso em 0x2036 (próximo)`}
                          </CodeBlock>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge className="bg-pink-500 mt-1">3</Badge>
                        <div>
                          <strong>Instruction Fetch:</strong> Código executado sequencialmente.
                          <CodeBlock language="c">
                            {`void func() {
    int a = 1;   // Instrução em 0x4000
    int b = 2;   // Instrução em 0x4004
    int c = a+b; // Instrução em 0x4008
}
// CPU busca instruções sequencialmente (prefetching)`}
                          </CodeBlock>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gradient-to-r from-pink-950/30 to-purple-950/30 border-pink-500/20 p-6">
                    <h4 className="text-lg font-semibold text-pink-300 mb-3">⚡ Otimizações de Hardware:</h4>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div>
                        <strong className="text-pink-400">Cache Lines (64 bytes):</strong> CPU carrega 64 bytes 
                        de uma vez, aproveitando localidade espacial.
                      </div>
                      <div>
                        <strong className="text-pink-400">Prefetching:</strong> Hardware detecta acessos sequenciais 
                        e carrega próximas páginas antecipadamente.
                      </div>
                      <div>
                        <strong className="text-pink-400">TLB Coverage:</strong> Uma entrada TLB cobre 4 KB (página inteira), 
                        beneficiando acessos dentro da mesma página.
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Impacto no Desempenho */}
                <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border-indigo-500/20 p-8">
                  <h3 className="text-2xl font-semibold text-indigo-300 mb-6">
                    💎 Por que Localidade é Crucial para Memória Virtual?
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-indigo-400 mb-3">✅ Com Localidade (Típico):</h4>
                      <div className="space-y-2 text-slate-300 text-sm">
                        <div className="flex justify-between bg-green-950/30 p-3 rounded">
                          <span>Working Set:</span>
                          <Badge className="bg-green-500">5-10 páginas</Badge>
                        </div>
                        <div className="flex justify-between bg-green-950/30 p-3 rounded">
                          <span>RAM disponível:</span>
                          <Badge className="bg-green-500">1000+ frames</Badge>
                        </div>
                        <div className="flex justify-between bg-green-950/30 p-3 rounded">
                          <span>Page Fault Rate:</span>
                          <Badge className="bg-green-500">{'<'} 0.1%</Badge>
                        </div>
                        <div className="flex justify-between bg-green-950/30 p-3 rounded">
                          <span>Performance:</span>
                          <Badge className="bg-green-500">Excelente! 🚀</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-3">❌ Sem Localidade (Patológico):</h4>
                      <div className="space-y-2 text-slate-300 text-sm">
                        <div className="flex justify-between bg-red-950/30 p-3 rounded">
                          <span>Working Set:</span>
                          <Badge className="bg-red-500">1000+ páginas</Badge>
                        </div>
                        <div className="flex justify-between bg-red-950/30 p-3 rounded">
                          <span>RAM disponível:</span>
                          <Badge className="bg-red-500">100 frames</Badge>
                        </div>
                        <div className="flex justify-between bg-red-950/30 p-3 rounded">
                          <span>Page Fault Rate:</span>
                          <Badge className="bg-red-500">{'>'} 50%</Badge>
                        </div>
                        <div className="flex justify-between bg-red-950/30 p-3 rounded">
                          <span>Performance:</span>
                          <Badge className="bg-red-500">Thrashing! 💀</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-6">
                    <h4 className="font-semibold text-indigo-400 mb-3">📐 Cálculo de Impacto:</h4>
                    <CodeBlock language="text">
                      {`Sem localidade:
  - Cada acesso: 50% chance de page fault
  - Page fault time: 10 ms
  - Memory access time: 100 ns
  - EAT = 0.5 * 10ms + 0.5 * 100ns ≈ 5ms
  - Slowdown: 50,000x! 💀

Com localidade:
  - Page fault rate: 0.01%
  - EAT = 0.0001 * 10ms + 0.9999 * 100ns ≈ 1µs
  - Slowdown: 10x (aceitável! ✅)`}
                    </CodeBlock>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* WORKING SET */}
          <TabsContent value="working-set" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-400" />
                Working Set Model (Peter Denning, 1968)
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  O <strong className="text-purple-400">Working Set Model</strong> formaliza matematicamente 
                  o conceito de localidade, definindo o conjunto de páginas que um processo está ativamente usando.
                </p>

                {/* Definição Matemática */}
                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">📐 Definição Matemática</h3>
                  
                  <div className="bg-black/30 rounded-lg p-6 mb-4 font-mono text-sm">
                    <div className="text-center mb-4 text-2xl text-purple-400">
                      W(t, Δ) = {`{ páginas referenciadas em [t - Δ, t] }`}
                    </div>
                    <div className="space-y-2 text-slate-300">
                      <div><strong className="text-purple-400">t:</strong> Tempo virtual (CPU time do processo)</div>
                      <div><strong className="text-purple-400">Δ:</strong> Janela de working set (working set window)</div>
                      <div><strong className="text-purple-400">W(t, Δ):</strong> Conjunto de páginas únicas acessadas em [t-Δ, t]</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-950/30 p-4 rounded">
                      <div className="text-sm font-semibold text-indigo-400 mb-2">Exemplo 1: Δ = 5</div>
                      <CodeBlock language="text">
                        {`Sequência de acesso:
t: 0  1  2  3  4  5  6  7  8
p: 1  2  1  3  2  4  1  5  2

W(8, 5) = páginas em [3,8]
        = {3, 2, 4, 1, 5, 2}
        = {1, 2, 3, 4, 5}
        
|W(8, 5)| = 5 páginas`}
                      </CodeBlock>
                    </div>

                    <div className="bg-purple-950/30 p-4 rounded">
                      <div className="text-sm font-semibold text-purple-400 mb-2">Exemplo 2: Δ = 3</div>
                      <CodeBlock language="text">
                        {`Mesma sequência:
t: 0  1  2  3  4  5  6  7  8
p: 1  2  1  3  2  4  1  5  2

W(8, 3) = páginas em [5,8]
        = {4, 1, 5, 2}
        
|W(8, 3)| = 4 páginas
(menor que W(8, 5)!)`}
                      </CodeBlock>
                    </div>
                  </div>
                </Card>

                {/* Propriedades */}
                <Card className="bg-pink-950/30 border-pink-500/20 p-6">
                  <h3 className="text-xl font-semibold text-pink-300 mb-4">🔍 Propriedades do Working Set</h3>
                  
                  <div className="space-y-4 text-slate-300">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-pink-500 mt-1">1</Badge>
                      <div>
                        <strong className="text-pink-400">Tamanho varia com Δ:</strong>
                        <p className="text-sm mt-1">
                          Δ pequeno → WS pequeno (apenas páginas muito recentes)<br />
                          Δ grande → WS grande (mais páginas incluídas)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-pink-500 mt-1">2</Badge>
                      <div>
                        <strong className="text-pink-400">Phase Behavior:</strong>
                        <p className="text-sm mt-1">
                          Programas têm fases de execução com diferentes working sets.<br />
                          Transição de fase → WS muda drasticamente
                        </p>
                        <CodeBlock language="text">
                          {`Fase 1 (inicialização): W = {1,2,3,4}
Fase 2 (loop principal):  W = {5,6,7}
Fase 3 (finalização):     W = {8,9,10,11}`}
                        </CodeBlock>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Badge className="bg-pink-500 mt-1">3</Badge>
                      <div>
                        <strong className="text-pink-400">Steady-State vs Transient:</strong>
                        <p className="text-sm mt-1">
                          <strong>Steady-state:</strong> WS estável (loop)<br />
                          <strong>Transient:</strong> WS mudando rapidamente (transição de fase)
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Política de Gerenciamento */}
                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-4">
                    ⚙️ Política de Gerenciamento Baseada em WS
                  </h3>
                  
                  <div className="bg-black/30 rounded-lg p-6 mb-4">
                    <h4 className="font-semibold text-indigo-400 mb-3">Regra de Ouro:</h4>
                    <div className="text-lg text-slate-300 border-l-4 border-indigo-500 pl-4">
                      Um processo só deve executar se seu <strong className="text-indigo-400">Working Set inteiro</strong> 
                      estiver na memória física.
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="bg-green-950/20 border border-green-500/20 rounded p-4">
                      <strong className="text-green-400">✅ Se Σ |W_i| ≤ Frames disponíveis:</strong>
                      <p className="mt-2">Todos os processos podem executar simultaneamente. Sistema estável.</p>
                    </div>

                    <div className="bg-red-950/20 border border-red-500/20 rounded p-4">
                      <strong className="text-red-400">❌ Se Σ |W_i| {'>'} Frames disponíveis:</strong>
                      <p className="mt-2">
                        <strong>Ação:</strong> Suspender alguns processos (swap out) para evitar thrashing.<br />
                        <strong>Critério:</strong> Suspender processos com maior working set ou menor prioridade.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Implementação */}
                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">💻 Implementação Prática</h3>
                  
                  <p className="text-slate-300 mb-4">
                    Calcular W(t, Δ) exatamente é caro. Sistemas reais usam <strong>aproximações</strong>:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-indigo-950/30 p-4 rounded">
                      <h4 className="font-semibold text-indigo-400 mb-2">Método 1: Reference Bits</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Hardware seta bit quando página é acessada. SO periodicamente examina e reseta.
                      </p>
                      <CodeBlock language="c">
                        {`// Pseudo-código
void update_working_set() {
    for (each page in memory) {
        if (page.reference_bit == 1) {
            page.last_reference_time = current_time;
            page.reference_bit = 0;  // Reset
        }
        
        // Está no WS se referenciada recentemente
        if (current_time - page.last_reference_time <= DELTA) {
            working_set.add(page);
        }
    }
}`}
                      </CodeBlock>
                    </div>

                    <div className="bg-purple-950/30 p-4 rounded">
                      <h4 className="font-semibold text-purple-400 mb-2">Método 2: Aging Counter</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Contador de 8 bits shifted periodicamente, bit alto setado se referenciada.
                      </p>
                      <CodeBlock language="c">
                        {`// Cada página tem um contador de 8 bits
typedef struct {
    uint8_t age_counter;  // 0x00 = não usado, 0xFF = muito usado
} page_t;

// A cada tick do clock (e.g., 100ms)
void age_pages() {
    for (each page) {
        page.age_counter >>= 1;  // Shift right (envelhece)
        if (page.reference_bit == 1) {
            page.age_counter |= 0x80;  // Seta bit mais alto
            page.reference_bit = 0;
        }
        
        // WS = páginas com age_counter > threshold
        if (page.age_counter > 0x10) {
            working_set.add(page);
        }
    }
}`}
                      </CodeBlock>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* THRASHING */}
          <TabsContent value="thrashing" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-red-400">
                <Zap className="w-8 h-8" />
                Thrashing: O Pior Cenário
              </h2>
              
              <div className="space-y-6">
                <Card className="bg-red-950/30 border-red-500/30 p-6">
                  <h3 className="text-2xl font-semibold text-red-300 mb-4">⚠️ Definição</h3>
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    <strong className="text-red-400">Thrashing</strong> ocorre quando o sistema passa mais tempo 
                    fazendo page faults (transferindo páginas entre RAM e disco) do que executando código útil.
                  </p>
                  
                  <div className="bg-black/30 rounded-lg p-6">
                    <div className="text-center text-3xl font-bold text-red-400 mb-4">
                      CPU Utilization {'<'} 10%
                    </div>
                    <div className="text-center text-3xl font-bold text-red-400 mb-4">
                      I/O Queue Length {'>'} 90%
                    </div>
                    <div className="text-center text-lg text-slate-400">
                      = THRASHING 💀
                    </div>
                  </div>
                </Card>

                {/* Causas */}
                <Card className="bg-yellow-950/30 border-yellow-500/20 p-6">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-4">🔍 Causas do Thrashing</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "1. Working Set > RAM Disponível",
                        desc: "A soma dos working sets de todos os processos excede a RAM física.",
                        example: "4 processos, cada um precisa 500 MB, mas só há 1 GB RAM total"
                      },
                      {
                        title: "2. Multiprogramming Degree Muito Alto",
                        desc: "Sistema tenta executar muitos processos simultaneamente.",
                        example: "100 processos ativos em um sistema com apenas 4 GB RAM"
                      },
                      {
                        title: "3. Algoritmo de Substituição Ruim",
                        desc: "Algoritmo remove páginas que serão usadas imediatamente (ex: FIFO com Belády's anomaly).",
                        example: "FIFO remove página que será acessada no próximo ciclo"
                      },
                      {
                        title: "4. Fase Transition Repentina",
                        desc: "Programa muda drasticamente seu padrão de acesso.",
                        example: "Sai de um loop pequeno para processar um array gigante"
                      }
                    ].map((causa, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-yellow-500/20 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">{causa.title}</h4>
                        <p className="text-sm text-slate-300 mb-2">{causa.desc}</p>
                        <div className="text-xs text-slate-500 italic">
                          Exemplo: {causa.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Detecção */}
                <Card className="bg-orange-950/30 border-orange-500/20 p-6">
                  <h3 className="text-xl font-semibold text-orange-300 mb-4">🔎 Detecção de Thrashing</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-3">Métricas de Sistema:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-black/30 p-3 rounded">
                          <strong className="text-orange-400">CPU Utilization:</strong>
                          <div className="text-slate-300 mt-1">
                            {'<'} 20% → Alerta 🟡<br />
                            {'<'} 10% → Thrashing 🔴
                          </div>
                        </div>
                        
                        <div className="bg-black/30 p-3 rounded">
                          <strong className="text-orange-400">Page Fault Rate:</strong>
                          <div className="text-slate-300 mt-1">
                            {'>'} 50 PF/sec/processo → Alerta 🟡<br />
                            {'>'} 100 PF/sec/processo → Thrashing 🔴
                          </div>
                        </div>
                        
                        <div className="bg-black/30 p-3 rounded">
                          <strong className="text-orange-400">Disk I/O Queue:</strong>
                          <div className="text-slate-300 mt-1">
                            {'>'} 50% ocupação → Alerta 🟡<br />
                            {'>'} 90% ocupação → Thrashing 🔴
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-400 mb-3">Comandos Linux:</h4>
                      <CodeBlock language="bash">
                        {`# Ver page faults
vmstat 1 5
# campos: si (swap in), so (swap out)

# Ver CPU wait time (I/O bound)
top
# campo: %wa (I/O wait)

# Ver memória e swap
free -h

# Ver page faults de um processo
ps -o pid,min_flt,maj_flt,cmd -p <PID>

# Gráfico de memória
sar -r 1 10`}
                      </CodeBlock>
                    </div>
                  </div>
                </Card>

                {/* Soluções */}
                <Card className="bg-green-950/30 border-green-500/20 p-6">
                  <h3 className="text-xl font-semibold text-green-300 mb-4">✅ Soluções para Thrashing</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-green-400 mb-2">1. Reduzir Multiprogramming Degree</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Suspender alguns processos (swap out completo) até sistema estabilizar.
                      </p>
                      <CodeBlock language="bash">
                        {`# Linux: limitar processos em execução
nice -n 19 ./processo_baixa_prioridade &
# ou matar processos menos importantes
kill -STOP <PID>  # suspender
kill -CONT <PID>  # resumir depois`}
                      </CodeBlock>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-green-400 mb-2">2. Adicionar Mais RAM</h4>
                      <p className="text-sm text-slate-300">
                        Solução óbvia mas efetiva. Se Σ working sets cabe na RAM, problema resolvido.
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-green-400 mb-2">3. Working Set Control</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Implementar política de Working Set: só executar processo se WS inteiro cabe na RAM.
                      </p>
                      <CodeBlock language="c">
                        {`void scheduler_decision() {
    int total_ws_size = 0;
    for (each runnable_process p) {
        total_ws_size += p.working_set_size;
    }
    
    if (total_ws_size > available_frames) {
        // Suspender processos com menor prioridade
        suspend_low_priority_processes();
    }
}`}
                      </CodeBlock>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-green-400 mb-2">4. Page Fault Frequency (PFF) Control</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        Ajustar frames por processo baseado em PFF:
                      </p>
                      <CodeBlock language="c">
                        {`#define PFF_UPPER_THRESHOLD 10  // PF/sec
#define PFF_LOWER_THRESHOLD 2

void adjust_frames(process_t *p) {
    double pff = p->page_faults / elapsed_time;
    
    if (pff > PFF_UPPER_THRESHOLD) {
        allocate_more_frames(p);  // Dar mais memória
    } else if (pff < PFF_LOWER_THRESHOLD) {
        deallocate_frames(p);     // Liberar memória
    }
}`}
                      </CodeBlock>
                    </div>

                    <div className="bg-black/30 p-4 rounded">
                      <h4 className="font-semibold text-green-400 mb-2">5. Usar Algoritmo Melhor</h4>
                      <p className="text-sm text-slate-300">
                        Trocar FIFO por LRU ou Working Set Clock (WSClock) reduz page faults drasticamente.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* SIMULADOR 3D */}
          <TabsContent value="simulador" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6">Simulador 3D - Working Set Model</h2>
              <p className="text-lg text-slate-300 mb-8">
                Simulação interativa do modelo de Working Set com visualização 3D, detecção de thrashing 
                e análise de fases de execução.
              </p>
              
              <WorkingSetSimulator3D />
            </Card>
          </TabsContent>

          {/* CÓDIGO */}
          <TabsContent value="codigo" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-purple-400" />
                Implementações em C
              </h2>

              {/* Working Set Calculator */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                  1. Working Set Calculator
                </h3>
                <CodeBlock language="c">
                  {`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_PAGES 100
#define MAX_TIME 1000

typedef struct {
    int page_id;
    int access_time;
} PageAccess;

typedef struct {
    bool pages[MAX_PAGES];
    int size;
} WorkingSet;

// Calcular Working Set em um dado tempo
WorkingSet calculate_working_set(PageAccess *history, int history_len, int time, int delta) {
    WorkingSet ws = {0};
    int start_time = time - delta;
    if (start_time < 0) start_time = 0;
    
    printf("\\nCalculando W(%d, %d):\\n", time, delta);
    printf("Janela: [%d, %d]\\n", start_time, time);
    
    for (int i = 0; i < history_len; i++) {
        if (history[i].access_time >= start_time && 
            history[i].access_time <= time) {
            
            int page = history[i].page_id;
            if (!ws.pages[page]) {
                ws.pages[page] = true;
                ws.size++;
                printf("  t=%d: Página %d adicionada ao WS\\n", 
                       history[i].access_time, page);
            }
        }
    }
    
    printf("Working Set final: { ");
    for (int i = 0; i < MAX_PAGES; i++) {
        if (ws.pages[i]) printf("%d ", i);
    }
    printf("}\\n");
    printf("|W(%d, %d)| = %d páginas\\n", time, delta, ws.size);
    
    return ws;
}

// Simular sequência de acessos
void simulate_access_pattern() {
    PageAccess history[100];
    int t = 0;
    
    // Fase 1: Loop em páginas 0-2 (localidade forte)
    printf("\\n=== Fase 1: Loop Local ===\\n");
    for (int i = 0; i < 10; i++) {
        history[t++] = (PageAccess){.page_id = i % 3, .access_time = t-1};
    }
    
    // Fase 2: Acesso sequencial 3-7
    printf("\\n=== Fase 2: Sequencial ===\\n");
    for (int i = 3; i < 8; i++) {
        history[t++] = (PageAccess){.page_id = i, .access_time = t-1};
    }
    
    // Fase 3: Random (thrashing potencial)
    printf("\\n=== Fase 3: Random ===\\n");
    int random_pages[] = {15, 3, 20, 8, 12, 25, 1};
    for (int i = 0; i < 7; i++) {
        history[t++] = (PageAccess){.page_id = random_pages[i], .access_time = t-1};
    }
    
    // Análise com diferentes deltas
    int deltas[] = {3, 5, 10};
    int check_times[] = {9, 16, 23};
    
    for (int i = 0; i < 3; i++) {
        printf("\\n\\n========================================\\n");
        printf("Tempo %d\\n", check_times[i]);
        printf("========================================\\n");
        
        for (int j = 0; j < 3; j++) {
            WorkingSet ws = calculate_working_set(history, t, check_times[i], deltas[j]);
            
            // Simular comparação com frames disponíveis
            int available_frames = 5;
            printf("\\n");
            if (ws.size <= available_frames) {
                printf("✅ WS cabe na memória (%d <= %d frames)\\n", ws.size, available_frames);
            } else {
                printf("❌ THRASHING! WS > frames (%d > %d)\\n", ws.size, available_frames);
            }
        }
    }
}

int main() {
    printf("=== Working Set Model Simulator ===\\n");
    simulate_access_pattern();
    return 0;
}`}
                </CodeBlock>
              </div>

              {/* Page Fault Frequency Monitor */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-pink-300 mb-4">
                  2. Page Fault Frequency (PFF) Monitor
                </h3>
                <CodeBlock language="c">
                  {`#include <stdio.h>
#include <time.h>

#define PFF_UPPER 10.0  // Page faults per second
#define PFF_LOWER 2.0

typedef struct {
    int pid;
    int page_faults;
    int allocated_frames;
    time_t last_measurement;
} Process;

void adjust_allocation(Process *p, double pff) {
    printf("\\nProcesso %d:\\n", p->pid);
    printf("  PFF atual: %.2f page faults/sec\\n", pff);
    printf("  Frames alocados: %d\\n", p->allocated_frames);
    
    if (pff > PFF_UPPER) {
        printf("  ⚠️  PFF muito alta! Aumentando frames...\\n");
        p->allocated_frames += 2;
        printf("  ✓ Novos frames: %d\\n", p->allocated_frames);
    } else if (pff < PFF_LOWER) {
        printf("  ✓ PFF baixa. Liberando frames...\\n");
        if (p->allocated_frames > 2) {
            p->allocated_frames--;
            printf("  ✓ Novos frames: %d\\n", p->allocated_frames);
        }
    } else {
        printf("  ✓ PFF ok. Mantendo alocação.\\n");
    }
}

void monitor_pff() {
    Process processes[] = {
        {.pid = 100, .page_faults = 0, .allocated_frames = 5, .last_measurement = time(NULL)},
        {.pid = 101, .page_faults = 0, .allocated_frames = 5, .last_measurement = time(NULL)},
        {.pid = 102, .page_faults = 0, .allocated_frames = 5, .last_measurement = time(NULL)}
    };
    
    // Simular medições ao longo do tempo
    int measurements[][3] = {
        {5, 3, 12},   // t=1: P100=5PF, P101=3PF, P102=12PF
        {4, 2, 15},   // t=2
        {3, 1, 18},   // t=3
        {2, 1, 20}    // t=4
    };
    
    for (int t = 0; t < 4; t++) {
        printf("\\n====== Medição no tempo t=%d ======\\n", t+1);
        
        for (int i = 0; i < 3; i++) {
            processes[i].page_faults = measurements[t][i];
            double pff = (double)processes[i].page_faults;
            adjust_allocation(&processes[i], pff);
        }
        
        // Verificar se há thrashing
        int total_frames = 0;
        for (int i = 0; i < 3; i++) {
            total_frames += processes[i].allocated_frames;
        }
        
        printf("\\n📊 Total de frames alocados: %d\\n", total_frames);
        if (total_frames > 20) {
            printf("⚠️  ALERTA: Muitos frames alocados! Risco de thrashing.\\n");
        }
    }
}

int main() {
    printf("=== Page Fault Frequency Monitor ===\\n");
    monitor_pff();
    return 0;
}`}
                </CodeBlock>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Referências */}
        <Card className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-sm border-purple-500/20 p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            Referências e Leitura Adicional
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">📄 Papers Seminais</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Peter J. Denning (1968)</div>
                  <div className="italic">"The Working Set Model for Program Behavior"</div>
                  <div className="text-xs text-slate-500">Communications of the ACM, Vol. 11, No. 5</div>
                  <div className="mt-2 text-xs">
                    🏆 Paper fundamental que definiu o modelo de Working Set
                  </div>
                </div>
                
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-pink-400">Peter J. Denning (1980)</div>
                  <div className="italic">"Working Sets Past and Present"</div>
                  <div className="text-xs text-slate-500">IEEE Transactions on Software Engineering</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-300 mb-4">📚 Livros</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-purple-400">Tanenbaum</div>
                  <div className="italic">Modern Operating Systems (4th ed.)</div>
                  <div className="text-xs text-slate-500">Chapter 3, Section 3.5: Page Replacement Algorithms</div>
                </div>
                
                <div className="bg-white/5 rounded p-3">
                  <div className="font-semibold text-pink-400">Silberschatz</div>
                  <div className="italic">Operating System Concepts (10th ed.)</div>
                  <div className="text-xs text-slate-500">Chapter 9.6: Thrashing</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

