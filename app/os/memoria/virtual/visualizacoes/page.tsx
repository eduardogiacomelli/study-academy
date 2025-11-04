"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Zap, Activity, Layers, Sparkles } from "lucide-react";
import { AddressTranslationVisualizer } from "@/components/virtual-memory/AddressTranslationVisualizer";
import { MemoryAccessHeatMap } from "@/components/virtual-memory/MemoryAccessHeatMap";

export default function VisualizacoesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm animate-pulse">
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Visualizações Interativas
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-transparent bg-clip-text">
            Visualizações Avançadas
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
            Visualize conceitos complexos de memória virtual de forma interativa e intuitiva. 
            Veja bit-a-bit como a tradução de endereços funciona, padrões de acesso em tempo real, 
            e muito mais!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { icon: Zap, label: "Address Translation", value: "Bit-level", color: "text-purple-400" },
              { icon: Activity, label: "Heat Map", value: "Real-time", color: "text-pink-400" },
              { icon: Layers, label: "4-Level Walk", value: "Animated", color: "text-rose-400" },
              { icon: Sparkles, label: "Interactive", value: "100%", color: "text-fuchsia-400" },
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
        <Tabs defaultValue="translation" className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-sm p-2 flex-wrap h-auto gap-2">
            <TabsTrigger value="translation" className="data-[state=active]:bg-purple-500">
              <Zap className="w-4 h-4 mr-2" />
              Address Translation
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="data-[state=active]:bg-pink-500">
              <Activity className="w-4 h-4 mr-2" />
              Access Heat Map
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-rose-500">
              <Layers className="w-4 h-4 mr-2" />
              Comparações
            </TabsTrigger>
          </TabsList>

          {/* Address Translation */}
          <TabsContent value="translation" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  🔍 Address Translation Visualizer
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Veja bit-a-bit como um endereço virtual de 64 bits é traduzido para um endereço físico. 
                  O x86-64 usa 48 bits de endereçamento com paginação de 4 níveis (PML4 → PDP → PD → PT → Offset).
                </p>
              </div>

              <AddressTranslationVisualizer />

              <div className="mt-8 bg-purple-950/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-4">💡 Como Funciona:</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-500 min-w-[24px] h-6 flex items-center justify-center">1</Badge>
                    <div>
                      <strong className="text-purple-400">Bits 47-39 (9 bits):</strong> Índice na PML4 (Page Map Level 4) table
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-500 min-w-[24px] h-6 flex items-center justify-center">2</Badge>
                    <div>
                      <strong className="text-blue-400">Bits 38-30 (9 bits):</strong> Índice na PDP (Page Directory Pointer) table
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-500 min-w-[24px] h-6 flex items-center justify-center">3</Badge>
                    <div>
                      <strong className="text-green-400">Bits 29-21 (9 bits):</strong> Índice na PD (Page Directory) table
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-500 min-w-[24px] h-6 flex items-center justify-center">4</Badge>
                    <div>
                      <strong className="text-yellow-400">Bits 20-12 (9 bits):</strong> Índice na PT (Page Table)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-red-500 min-w-[24px] h-6 flex items-center justify-center">5</Badge>
                    <div>
                      <strong className="text-red-400">Bits 11-0 (12 bits):</strong> Offset dentro da página de 4KB (2^12 = 4096 bytes)
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Heat Map */}
          <TabsContent value="heatmap" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-pink-500/20 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  🌡️ Memory Access Heat Map
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Visualize padrões de acesso à memória em tempo real. Áreas mais quentes (vermelho) 
                  indicam páginas frequentemente acessadas, demonstrando localidade temporal e espacial.
                </p>
              </div>

              <MemoryAccessHeatMap />

              <div className="mt-8 bg-pink-950/30 border border-pink-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-pink-300 mb-4">📊 Interpretando o Heat Map:</h3>
                <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">🔵 Temporal Locality</h4>
                    <p className="text-sm">
                      Quando a mesma página é acessada repetidamente em curto período. 
                      Visible como &quot;hot spots&quot; estáveis no mapa.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">🟢 Spatial Locality</h4>
                    <p className="text-sm">
                      Quando páginas adjacentes são acessadas sequencialmente. 
                      Visible como &quot;trails&quot; ou &quot;streaks&quot; no mapa.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">🟣 Working Set</h4>
                    <p className="text-sm">
                      Simula programa real: 80% temporal, 15% espacial, 5% random. 
                      Padrão típico de aplicações.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">🟡 Random Access</h4>
                    <p className="text-sm">
                      Worst case scenario. Heat disperso, muitos page faults, 
                      performance ruim.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Comparisons */}
          <TabsContent value="comparison" className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-rose-500/20 p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">
                📊 Comparações e Trade-offs
              </h2>

              <div className="space-y-6">
                {/* Page Size Comparison */}
                <Card className="bg-gradient-to-r from-purple-950/30 to-pink-950/30 border-purple-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-purple-300 mb-4">Page Size: 4KB vs 2MB vs 1GB</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-3 px-4 text-slate-400">Aspecto</th>
                          <th className="text-center py-3 px-4 text-purple-400">4KB (Small)</th>
                          <th className="text-center py-3 px-4 text-pink-400">2MB (Huge)</th>
                          <th className="text-center py-3 px-4 text-rose-400">1GB (Giant)</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4 font-semibold">Page Table Entries</td>
                          <td className="text-center py-3 px-4 text-red-400">Muitas (overhead)</td>
                          <td className="text-center py-3 px-4 text-yellow-400">Moderado</td>
                          <td className="text-center py-3 px-4 text-green-400">Poucas (eficiente)</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4 font-semibold">TLB Coverage</td>
                          <td className="text-center py-3 px-4 text-red-400">4KB × 512 = 2MB</td>
                          <td className="text-center py-3 px-4 text-yellow-400">2MB × 512 = 1GB</td>
                          <td className="text-center py-3 px-4 text-green-400">1GB × 512 = 512GB</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4 font-semibold">Internal Fragmentation</td>
                          <td className="text-center py-3 px-4 text-green-400">Baixa (~2KB avg)</td>
                          <td className="text-center py-3 px-4 text-yellow-400">Média (~1MB avg)</td>
                          <td className="text-center py-3 px-4 text-red-400">Alta (~500MB avg)</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="py-3 px-4 font-semibold">I/O Efficiency</td>
                          <td className="text-center py-3 px-4 text-red-400">Muitas operações</td>
                          <td className="text-center py-3 px-4 text-yellow-400">Boa</td>
                          <td className="text-center py-3 px-4 text-green-400">Excelente</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold">Melhor Para</td>
                          <td className="text-center py-3 px-4">Uso geral</td>
                          <td className="text-center py-3 px-4">Databases, VMs</td>
                          <td className="text-center py-3 px-4">HPC, ML models</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* TLB vs No TLB */}
                <Card className="bg-gradient-to-r from-rose-950/30 to-orange-950/30 border-rose-500/20 p-6">
                  <h3 className="text-2xl font-semibold text-rose-300 mb-4">Performance: Com TLB vs Sem TLB</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/30 rounded-lg p-6">
                      <div className="text-lg font-semibold text-red-400 mb-4">❌ Sem TLB</div>
                      <div className="space-y-3 text-sm text-slate-300">
                        <div className="flex justify-between">
                          <span>4-level page walk:</span>
                          <span className="font-mono text-red-400">400 ns</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory access:</span>
                          <span className="font-mono text-red-400">+ 100 ns</span>
                        </div>
                        <div className="border-t border-red-500/20 pt-2 mt-2 flex justify-between font-bold">
                          <span>Total:</span>
                          <span className="font-mono text-red-400">500 ns</span>
                        </div>
                        <div className="text-xs text-red-300 mt-2">
                          5x mais lento que acesso direto!
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-6">
                      <div className="text-lg font-semibold text-green-400 mb-4">✅ Com TLB (98% hit)</div>
                      <div className="space-y-3 text-sm text-slate-300">
                        <div className="flex justify-between">
                          <span>TLB lookup:</span>
                          <span className="font-mono text-green-400">1 ns</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory access:</span>
                          <span className="font-mono text-green-400">+ 100 ns</span>
                        </div>
                        <div className="border-t border-green-500/20 pt-2 mt-2 flex justify-between font-bold">
                          <span>Total (hit):</span>
                          <span className="font-mono text-green-400">101 ns</span>
                        </div>
                        <div className="text-xs text-green-300 mt-2">
                          Quase tão rápido quanto RAM direta!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-950/30 border border-green-500/20 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">5x SPEEDUP</div>
                      <div className="text-sm text-slate-300">
                        TLB é essencial para performance de memória virtual!
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

