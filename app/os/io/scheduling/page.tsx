"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { useState } from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { 
  Database, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen
} from "lucide-react";

interface Request {
  track: number;
  arrival: number;
}

export default function IOSchedulingPage() {
  const [requests, setRequests] = useState<Request[]>([
    { track: 55, arrival: 0 },
    { track: 58, arrival: 1 },
    { track: 39, arrival: 2 },
    { track: 18, arrival: 3 },
    { track: 90, arrival: 4 },
    { track: 160, arrival: 5 },
    { track: 150, arrival: 6 },
    { track: 38, arrival: 7 },
    { track: 184, arrival: 8 },
  ]);
  const [currentHead, setCurrentHead] = useState(50);
  const [algorithm, setAlgorithm] = useState<'FCFS' | 'SSTF' | 'SCAN' | 'CSCAN'>('FCFS');
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateFCFS = () => {
    let total = 0;
    let current = currentHead;
    const sequence = requests.map(req => {
      const distance = Math.abs(req.track - current);
      total += distance;
      current = req.track;
      return { ...req, distance };
    });
    return { sequence, total };
  };

  const calculateSSTF = () => {
    let total = 0;
    let current = currentHead;
    const remaining = [...requests];
    const sequence: Array<Request & { distance: number }> = [];
    
    while (remaining.length > 0) {
      const closest = remaining.reduce((min, req) => 
        Math.abs(req.track - current) < Math.abs(min.track - current) ? req : min
      );
      const distance = Math.abs(closest.track - current);
      total += distance;
      current = closest.track;
      sequence.push({ ...closest, distance });
      remaining.splice(remaining.indexOf(closest), 1);
    }
    return { sequence, total };
  };

  const calculateSCAN = () => {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const right = sorted.filter(r => r.track >= currentHead).sort((a, b) => a.track - b.track);
    const left = sorted.filter(r => r.track < currentHead).sort((a, b) => b.track - a.track);
    
    let total = 0;
    let current = currentHead;
    const sequence: Array<Request & { distance: number }> = [];
    
    // Vai para direita (até o fim)
    for (const req of right) {
      const distance = req.track - current;
      total += distance;
      current = req.track;
      sequence.push({ ...req, distance });
    }
    
    // Vai para esquerda (até o início)
    if (left.length > 0) {
      total += (199 - current); // Vai até o fim
      current = 199;
      for (const req of left) {
        const distance = current - req.track;
        total += distance;
        current = req.track;
        sequence.push({ ...req, distance });
      }
    }
    
    return { sequence, total };
  };

  const calculateCSCAN = () => {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const right = sorted.filter(r => r.track >= currentHead).sort((a, b) => a.track - b.track);
    const left = sorted.filter(r => r.track < currentHead).sort((a, b) => a.track - b.track);
    
    let total = 0;
    let current = currentHead;
    const sequence: Array<Request & { distance: number }> = [];
    
    // Vai para direita até o fim
    for (const req of right) {
      const distance = req.track - current;
      total += distance;
      current = req.track;
      sequence.push({ ...req, distance });
    }
    
    // Vai para o início (wrap around)
    if (left.length > 0) {
      total += (199 - current) + 199; // Fim + volta ao início
      current = 0;
      for (const req of left) {
        const distance = req.track - current;
        total += distance;
        current = req.track;
        sequence.push({ ...req, distance });
      }
    }
    
    return { sequence, total };
  };

  const getResult = () => {
    switch (algorithm) {
      case 'FCFS': return calculateFCFS();
      case 'SSTF': return calculateSSTF();
      case 'SCAN': return calculateSCAN();
      case 'CSCAN': return calculateCSCAN();
    }
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-green-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl backdrop-blur-sm">
              <Database className="w-8 h-8 text-green-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">I/O Scheduling</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text">
            Algoritmos de Scheduling de Disco
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            FCFS, SSTF, SCAN, C-SCAN e LOOK - Otimização de movimentação do cabeçote
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="comparacao" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comparacao">
              <TrendingUp className="w-4 h-4 mr-2" />
              Comparação
            </TabsTrigger>
            <TabsTrigger value="fcfs">
              <Clock className="w-4 h-4 mr-2" />
              FCFS
            </TabsTrigger>
            <TabsTrigger value="scan">
              <ArrowRight className="w-4 h-4 mr-2" />
              SCAN
            </TabsTrigger>
            <TabsTrigger value="codigo">
              <BookOpen className="w-4 h-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparacao" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-6">
              <h3 className="text-2xl font-bold mb-6">Simulador Interativo</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Algoritmo</label>
                    <select
                      value={algorithm}
                      onChange={(e) => setAlgorithm(e.target.value as any)}
                      className="w-full bg-slate-900/50 border border-green-500/30 rounded p-2"
                    >
                      <option value="FCFS">FCFS</option>
                      <option value="SSTF">SSTF</option>
                      <option value="SCAN">SCAN</option>
                      <option value="CSCAN">C-SCAN</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Posição Inicial do Cabeçote</label>
                    <input
                      type="number"
                      value={currentHead}
                      onChange={(e) => setCurrentHead(parseInt(e.target.value))}
                      className="w-full bg-slate-900/50 border border-green-500/30 rounded p-2"
                      min="0"
                      max="199"
                    />
                  </div>
                </div>

                <div className="p-6 bg-green-950/30 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-4 text-green-300">Sequência de Requisições</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {requests.map((req, idx) => (
                      <div key={idx} className="p-2 bg-slate-900/50 rounded text-center">
                        <div className="text-xs text-slate-400">Track</div>
                        <div className="text-lg font-bold text-green-300">{req.track}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-4 text-blue-300">Resultado: {algorithm}</h4>
                  <div className="space-y-2">
                    {result.sequence.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded">
                        <Badge className="bg-blue-500">{idx + 1}</Badge>
                        <span className="text-sm">Track {req.track}</span>
                        <span className="text-xs text-slate-400">→</span>
                        <span className="text-sm text-blue-300">Distância: {req.distance} cilindros</span>
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-green-900/30 rounded border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-300">Total de Movimentação:</span>
                        <span className="text-2xl font-bold text-green-400">{result.total} cilindros</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Comparação dos Algoritmos</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-500/30">
                      <th className="text-left p-3 text-green-300">Algoritmo</th>
                      <th className="text-left p-3 text-green-300">Vantagens</th>
                      <th className="text-left p-3 text-green-300">Desvantagens</th>
                      <th className="text-left p-3 text-green-300">Uso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-500/20">
                      <td className="p-3 font-semibold">FCFS</td>
                      <td className="p-3 text-slate-300">Simples, justo</td>
                      <td className="p-3 text-red-300">Pode ter muito movimento desnecessário</td>
                      <td className="p-3 text-slate-400">Raramente usado</td>
                    </tr>
                    <tr className="border-b border-green-500/20">
                      <td className="p-3 font-semibold">SSTF</td>
                      <td className="p-3 text-slate-300">Reduz movimento do cabeçote</td>
                      <td className="p-3 text-red-300">Pode causar starvation de requisições distantes</td>
                      <td className="p-3 text-slate-400">Melhor que FCFS</td>
                    </tr>
                    <tr className="border-b border-green-500/20">
                      <td className="p-3 font-semibold">SCAN</td>
                      <td className="p-3 text-slate-300">Evita starvation, bom desempenho</td>
                      <td className="p-3 text-red-300">Requisições no meio esperam mais</td>
                      <td className="p-3 text-slate-400">Muito usado (elevador)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">C-SCAN</td>
                      <td className="p-3 text-slate-300">Uniformiza tempo de espera</td>
                      <td className="p-3 text-red-300">Movimento extra no wrap-around</td>
                      <td className="p-3 text-slate-400">Melhor para carga uniforme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="fcfs" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">FCFS (First Come First Served)</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-950/30 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-3 text-green-300">Conceito (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Processa requisições na ordem de chegada. Simples de implementar, mas pode resultar em
                    muito movimento desnecessário do cabeçote do disco.
                  </p>
                  
                  <CodeBlock language="c" title="Implementação FCFS">
{`// FCFS - First Come First Served
struct io_request {
    int track;      // Número da trilha
    int arrival;    // Tempo de chegada
};

int fcfs_schedule(struct io_request requests[], int num_requests, int initial_head) {
    int total_movement = 0;
    int current_head = initial_head;
    
    // Processa na ordem de chegada
    for (int i = 0; i < num_requests; i++) {
        int distance = abs(requests[i].track - current_head);
        total_movement += distance;
        current_head = requests[i].track;
        
        printf("Move de %d para %d (distância: %d)\\n", 
               current_head - distance, current_head, distance);
    }
    
    return total_movement;
}

// Exemplo
struct io_request reqs[] = {
    {55, 0}, {58, 1}, {39, 2}, {18, 3}, {90, 4}
};
int movement = fcfs_schedule(reqs, 5, 50);
// Resultado: 55 cilindros movidos`}
                  </CodeBlock>
                </div>

                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-blue-300">Análise</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-green-300">Vantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Muito simples de implementar</li>
                        <li>Justo (FIFO)</li>
                        <li>Sem starvation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-red-300">Desvantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Alto movimento do cabeçote</li>
                        <li>Pode ter performance ruim</li>
                        <li>Não otimiza nada</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">SCAN (Elevator Algorithm)</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-950/30 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-3 text-green-300">Conceito (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    O cabeçote move-se em uma direção, atendendo todas as requisições no caminho,
                    depois inverte a direção quando chega ao fim. Como um elevador.
                  </p>
                  
                  <CodeBlock language="c" title="Implementação SCAN">
{`// SCAN - Elevator Algorithm
int scan_schedule(struct io_request requests[], int num_requests, 
                  int initial_head, int max_track) {
    // Ordena requisições por trilha
    qsort(requests, num_requests, sizeof(struct io_request), 
          compare_track);
    
    // Separa requisições à direita e esquerda da cabeça inicial
    int right_count = 0, left_count = 0;
    struct io_request right[MAX_REQUESTS];
    struct io_request left[MAX_REQUESTS];
    
    for (int i = 0; i < num_requests; i++) {
        if (requests[i].track >= initial_head) {
            right[right_count++] = requests[i];
        } else {
            left[left_count++] = requests[i];
        }
    }
    
    int total_movement = 0;
    int current_head = initial_head;
    
    // Vai para direita (até o fim)
    for (int i = 0; i < right_count; i++) {
        int distance = right[i].track - current_head;
        total_movement += distance;
        current_head = right[i].track;
    }
    
    // Vai até o fim do disco
    total_movement += (max_track - current_head);
    current_head = max_track;
    
    // Inverte: vai para esquerda
    for (int i = left_count - 1; i >= 0; i--) {
        int distance = current_head - left[i].track;
        total_movement += distance;
        current_head = left[i].track;
    }
    
    return total_movement;
}`}
                  </CodeBlock>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">C-SCAN (Circular SCAN)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Variante do SCAN onde, ao chegar ao fim, o cabeçote volta imediatamente ao início
                    (sem processar requisições no caminho de volta). Uniformiza tempo de espera.
                  </p>
                  
                  <CodeBlock language="c" title="Implementação C-SCAN">
{`int cscan_schedule(struct io_request requests[], int num_requests,
                     int initial_head, int max_track) {
    // Similar ao SCAN, mas...
    
    // Vai para direita até o fim
    for (int i = 0; i < right_count; i++) {
        // Processa requisições
    }
    
    // Volta imediatamente ao início (wrap-around)
    total_movement += (max_track - current_head) + max_track;
    current_head = 0;
    
    // Continua processando da esquerda
    for (int i = 0; i < left_count; i++) {
        // Processa requisições
    }
    
    return total_movement;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="codigo" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Código Completo - Todos os Algoritmos</h3>
              
              <CodeBlock language="c" title="Implementação Completa">
{`#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX_REQUESTS 100

struct io_request {
    int track;
    int arrival;
};

// Comparação para ordenação
int compare_track(const void *a, const void *b) {
    return ((struct io_request*)a)->track - 
           ((struct io_request*)b)->track;
}

// FCFS
int fcfs(struct io_request reqs[], int n, int head) {
    int total = 0, current = head;
    for (int i = 0; i < n; i++) {
        total += abs(reqs[i].track - current);
        current = reqs[i].track;
    }
    return total;
}

// SSTF
int sstf(struct io_request reqs[], int n, int head) {
    int total = 0, current = head;
    int used[MAX_REQUESTS] = {0};
    
    for (int count = 0; count < n; count++) {
        int min_dist = 9999, min_idx = -1;
        for (int i = 0; i < n; i++) {
            if (!used[i]) {
                int dist = abs(reqs[i].track - current);
                if (dist < min_dist) {
                    min_dist = dist;
                    min_idx = i;
                }
            }
        }
        total += min_dist;
        current = reqs[min_idx].track;
        used[min_idx] = 1;
    }
    return total;
}

// SCAN
int scan(struct io_request reqs[], int n, int head, int max_track) {
    qsort(reqs, n, sizeof(struct io_request), compare_track);
    
    int right[MAX_REQUESTS], left[MAX_REQUESTS];
    int r_count = 0, l_count = 0;
    
    for (int i = 0; i < n; i++) {
        if (reqs[i].track >= head) {
            right[r_count++] = reqs[i];
        } else {
            left[l_count++] = reqs[i];
        }
    }
    
    int total = 0, current = head;
    
    // Direita
    for (int i = 0; i < r_count; i++) {
        total += (right[i].track - current);
        current = right[i].track;
    }
    
    // Fim do disco
    total += (max_track - current);
    current = max_track;
    
    // Esquerda (reverso)
    for (int i = l_count - 1; i >= 0; i--) {
        total += (current - left[i].track);
        current = left[i].track;
    }
    
    return total;
}

int main() {
    struct io_request reqs[] = {
        {55, 0}, {58, 1}, {39, 2}, {18, 3}, {90, 4},
        {160, 5}, {150, 6}, {38, 7}, {184, 8}
    };
    int n = 9;
    int head = 50;
    int max_track = 199;
    
    printf("FCFS: %d\\n", fcfs(reqs, n, head));
    printf("SSTF: %d\\n", sstf(reqs, n, head));
    printf("SCAN: %d\\n", scan(reqs, n, head, max_track));
    
    return 0;
}`}
              </CodeBlock>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

