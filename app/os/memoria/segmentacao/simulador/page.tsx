"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import toast, { Toaster } from "react-hot-toast";
import { animate, stagger, utils } from "animejs";
import {
  Play,
  Trash2,
  Layers,
  Shield,
  AlertCircle,
  Plus,
  RefreshCw,
  Maximize2,
  Info,
  Zap,
  ArrowRight
} from "lucide-react";

interface Segment {
  id: string;
  name: string;
  base: number;
  size: number;
  color: string;
  protection: {
    read: boolean;
    write: boolean;
    execute: boolean;
  };
}

const SEGMENT_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#a855f7", // purple
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#14b8a6", // teal
];

export default function SimuladorSegmentacaoPage() {
  const [memorySize, setMemorySize] = useState(1024);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [nextColorIndex, setNextColorIndex] = useState(0);
  
  // Form state
  const [segmentName, setSegmentName] = useState("");
  const [segmentSize, setSegmentSize] = useState(128);
  const [canRead, setCanRead] = useState(true);
  const [canWrite, setCanWrite] = useState(false);
  const [canExecute, setCanExecute] = useState(false);

  const memoryGridRef = useRef<HTMLDivElement>(null);

  // Initialize memory
  useEffect(() => {
    if (memoryGridRef.current) {
      animate(memoryGridRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 600,
        ease: 'outExpo'
      });
    }
  }, [memorySize]);

  // Calculate memory stats
  const usedMemory = segments.reduce((acc, seg) => acc + seg.size, 0);
  const freeMemory = memorySize - usedMemory;
  const fragmentationBlocks = calculateFragmentation();

  function calculateFragmentation() {
    if (segments.length === 0) return 0;
    
    const sortedSegments = [...segments].sort((a, b) => a.base - b.base);
    let gaps = 0;
    
    for (let i = 0; i < sortedSegments.length - 1; i++) {
      const currentEnd = sortedSegments[i].base + sortedSegments[i].size;
      const nextStart = sortedSegments[i + 1].base;
      if (nextStart > currentEnd) {
        gaps++;
      }
    }
    
    return gaps;
  }

  function findFreeSpace(size: number): number | null {
    if (segments.length === 0) {
      return freeMemory >= size ? 0 : null;
    }

    const sortedSegments = [...segments].sort((a, b) => a.base - b.base);
    
    // Check before first segment
    if (sortedSegments[0].base >= size) {
      return 0;
    }

    // Check gaps between segments
    for (let i = 0; i < sortedSegments.length - 1; i++) {
      const gapStart = sortedSegments[i].base + sortedSegments[i].size;
      const gapEnd = sortedSegments[i + 1].base;
      const gapSize = gapEnd - gapStart;
      
      if (gapSize >= size) {
        return gapStart;
      }
    }

    // Check after last segment
    const lastSegment = sortedSegments[sortedSegments.length - 1];
    const afterLast = lastSegment.base + lastSegment.size;
    if (memorySize - afterLast >= size) {
      return afterLast;
    }

    return null;
  }

  function createSegment() {
    if (!segmentName.trim()) {
      toast.error("Nome do segmento obrigatório!", {
        icon: "⚠️",
        style: {
          background: "#ef4444",
          color: "#fff"
        }
      });
      return;
    }

    if (segmentSize <= 0 || segmentSize > memorySize) {
      toast.error("Tamanho inválido!", {
        icon: "⚠️"
      });
      return;
    }

    const base = findFreeSpace(segmentSize);
    
    if (base === null) {
      toast.error("Memória insuficiente! Fragmentação externa detectada.", {
        icon: "🚫",
        duration: 4000,
        style: {
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          color: "#fff"
        }
      });
      return;
    }

    const newSegment: Segment = {
      id: `seg-${Date.now()}`,
      name: segmentName,
      base,
      size: segmentSize,
      color: SEGMENT_COLORS[nextColorIndex % SEGMENT_COLORS.length],
      protection: {
        read: canRead,
        write: canWrite,
        execute: canExecute
      }
    };

    setSegments(prev => [...prev, newSegment]);
    setNextColorIndex(prev => prev + 1);

    // Animate entrance with Anime.js
    setTimeout(() => {
      animate(`#${newSegment.id}`, {
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        scale: [0.8, 1],
        rotate: [10, 0],
        duration: 800,
        ease: 'spring(1, 80, 10, 0)'
      });
    }, 50);

    toast.success(`Segmento "${segmentName}" criado!`, {
      icon: "✨",
      style: {
        background: "linear-gradient(to right, #10b981, #059669)",
        color: "#fff"
      }
    });

    // Reset form
    setSegmentName("");
    setSegmentSize(128);
  }

  function deleteSegment(id: string) {
    const segment = segments.find(s => s.id === id);
    
    // Animate exit
    animate(`#${id}`, {
      translateY: ['0%', '100%'],
      opacity: [1, 0],
      scale: [1, 0.8],
      rotate: [0, -10],
      duration: 600,
      ease: 'inExpo',
      onComplete: () => {
        setSegments(prev => prev.filter(s => s.id !== id));
      }
    });

    toast(`Segmento "${segment?.name}" liberado`, {
      icon: "🗑️",
      style: {
        background: "#6b7280",
        color: "#fff"
      }
    });
  }

  function compactMemory() {
    if (segments.length === 0) return;

    toast.loading("Compactando memória...", {
      duration: 2000,
      icon: "⚙️"
    });

    // Animate compaction
    const sortedSegments = [...segments].sort((a, b) => a.base - b.base);
    let currentBase = 0;
    
    const newSegments = sortedSegments.map(seg => {
      const newSeg = { ...seg, base: currentBase };
      currentBase += seg.size;
      return newSeg;
    });

    // Epic compaction animation!
    const sortedIds = sortedSegments.map(s => `#${s.id}`);
    
    // Phase 1: Lift all segments
    animate('.segment-block', {
      translateY: -40,
      scale: 0.95,
      opacity: 0.8,
      duration: 600,
      delay: stagger(50),
      ease: 'outCubic',
      onComplete: () => {
        // Phase 2: Update positions
        setSegments(newSegments);
        
        // Phase 3: Drop segments in new positions with bounce
        setTimeout(() => {
          animate('.segment-block', {
            translateY: [40, -10, 0],
            scale: [0.95, 1.05, 1],
            opacity: [0.8, 1],
            duration: 800,
            delay: stagger(80),
            ease: 'outElastic(1, 0.6)',
            onComplete: () => {
              toast.success("Memória compactada!", {
                icon: "✅",
                style: {
                  background: "linear-gradient(to right, #10b981, #059669)",
                  color: "#fff"
                }
              });
            }
          });
        }, 100);
      }
    });
  }

  function resetMemory() {
    animate('.segment-block', {
      opacity: [1, 0],
      scale: [1, 0],
      duration: 400,
      delay: stagger(50, { from: 'last' }),
      ease: 'inExpo',
      onComplete: () => {
        setSegments([]);
        setNextColorIndex(0);
        toast("Memória resetada", {
          icon: "🔄"
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="p-3 rounded-full inline-flex mb-4 bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Play className="size-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simulador de Segmentação 2D
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              Visualize alocação, fragmentação externa e compactação em tempo real
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="size-3 mr-1" /> Interativo
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Layers className="size-3 mr-1" /> Animado
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Shield className="size-3 mr-1" /> Proteção R/W/X
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start gap-3">
              <Info className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold text-blue-900 dark:text-blue-100">Como usar:</p>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                  <li>1. Configure o tamanho da memória total</li>
                  <li>2. Crie segmentos com nome, tamanho e permissões (R/W/X)</li>
                  <li>3. Observe a fragmentação externa (blocos vermelhos)</li>
                  <li>4. Use "Compactar" para eliminar fragmentação</li>
                  <li>5. Segmentos aparecem com animações suaves!</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left: Controls */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Memory Config */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Maximize2 className="size-5 text-purple-500" />
                  Configuração
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Tamanho da Memória (KB)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[memorySize]}
                        onValueChange={([val]) => setMemorySize(val)}
                        min={256}
                        max={4096}
                        step={256}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-20 text-right">{memorySize} KB</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Create Segment */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Plus className="size-5 text-green-500" />
                  Criar Segmento
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Tipo de Segmento</Label>
                    <Select value={segmentName} onValueChange={setSegmentName}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Code">📝 Code (Código)</SelectItem>
                        <SelectItem value="Data">💾 Data (Dados)</SelectItem>
                        <SelectItem value="Stack">📚 Stack (Pilha)</SelectItem>
                        <SelectItem value="Heap">🗄️ Heap (Heap)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tamanho (KB)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[segmentSize]}
                        onValueChange={([val]) => setSegmentSize(val)}
                        min={16}
                        max={512}
                        step={16}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={segmentSize}
                        onChange={(e) => setSegmentSize(Number(e.target.value))}
                        min={16}
                        max={512}
                        step={16}
                        className="w-20 text-center font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Proteção</Label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={canRead}
                          onChange={(e) => setCanRead(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Read</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={canWrite}
                          onChange={(e) => setCanWrite(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Write</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={canExecute}
                          onChange={(e) => setCanExecute(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Execute</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={createSegment}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    <Plus className="size-4 mr-2" />
                    Criar Segmento
                  </Button>
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Ações</h3>
                <div className="space-y-2">
                  <Button
                    onClick={compactMemory}
                    disabled={segments.length === 0}
                    className="w-full"
                    variant="outline"
                  >
                    <RefreshCw className="size-4 mr-2" />
                    Compactar Memória
                  </Button>
                  <Button
                    onClick={resetMemory}
                    disabled={segments.length === 0}
                    className="w-full"
                    variant="outline"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Resetar Tudo
                  </Button>
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="font-mono font-semibold">{memorySize} KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Usado:</span>
                    <span className="font-mono font-semibold text-blue-600">{usedMemory} KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Livre:</span>
                    <span className="font-mono font-semibold text-green-600">{freeMemory} KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fragmentação:</span>
                    <span className="font-mono font-semibold text-red-600">{fragmentationBlocks} blocos</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Segmentos:</span>
                    <span className="font-mono font-semibold">{segments.length}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Visualization */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Memory Grid */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Memória Física</h3>
                
                <div
                  ref={memoryGridRef}
                  className="relative min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-4"
                >
                  {segments.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Layers className="size-16 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">Memória vazia</p>
                        <p className="text-sm">Crie um segmento para começar</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {segments
                        .sort((a, b) => a.base - b.base)
                        .map((segment, idx) => {
                          const heightPercent = (segment.size / memorySize) * 100;
                          const topPercent = (segment.base / memorySize) * 100;
                          
                          return (
                            <motion.div
                              key={segment.id}
                              id={segment.id}
                              className="segment-block absolute left-0 right-0 mx-4 rounded-lg shadow-lg cursor-pointer group"
                              style={{
                                top: `${topPercent}%`,
                                height: `${heightPercent}%`,
                                background: `linear-gradient(135deg, ${segment.color}dd, ${segment.color})`
                              }}
                              whileHover={{
                                scale: 1.02,
                                zIndex: 10,
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)"
                              }}
                              onClick={() => deleteSegment(segment.id)}
                            >
                              <div className="p-4 h-full flex flex-col justify-between text-white">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-lg">{segment.name}</h4>
                                    <button
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSegment(segment.id);
                                      }}
                                    >
                                      <Trash2 className="size-4" />
                                    </button>
                                  </div>
                                  <div className="text-xs space-y-1 opacity-90">
                                    <p>Base: 0x{segment.base.toString(16).padStart(4, '0')}</p>
                                    <p>Tamanho: {segment.size} KB</p>
                                    <p>Limite: 0x{(segment.base + segment.size).toString(16).padStart(4, '0')}</p>
                                  </div>
                                </div>
                                
                                <div className="flex gap-1">
                                  {segment.protection.read && (
                                    <Badge className="bg-white/20 text-white text-xs">R</Badge>
                                  )}
                                  {segment.protection.write && (
                                    <Badge className="bg-white/20 text-white text-xs">W</Badge>
                                  )}
                                  {segment.protection.execute && (
                                    <Badge className="bg-white/20 text-white text-xs">X</Badge>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </Card>

              {/* Segment Table */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Tabela de Segmentos</h3>
                
                {segments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhum segmento alocado
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-semibold">Segmento</th>
                          <th className="text-left p-2 font-semibold">Base</th>
                          <th className="text-left p-2 font-semibold">Limite</th>
                          <th className="text-left p-2 font-semibold">Tamanho</th>
                          <th className="text-left p-2 font-semibold">Proteção</th>
                          <th className="text-left p-2 font-semibold">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {segments.map((seg) => (
                          <tr key={seg.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded"
                                  style={{ background: seg.color }}
                                />
                                <span className="font-medium">{seg.name}</span>
                              </div>
                            </td>
                            <td className="p-2 font-mono text-xs">
                              0x{seg.base.toString(16).padStart(4, '0')}
                            </td>
                            <td className="p-2 font-mono text-xs">
                              {seg.size} KB
                            </td>
                            <td className="p-2 font-mono text-xs">
                              0x{(seg.base + seg.size).toString(16).padStart(4, '0')}
                            </td>
                            <td className="p-2">
                              <div className="flex gap-1">
                                <Badge variant={seg.protection.read ? "default" : "outline"} className="text-xs">
                                  R
                                </Badge>
                                <Badge variant={seg.protection.write ? "default" : "outline"} className="text-xs">
                                  W
                                </Badge>
                                <Badge variant={seg.protection.execute ? "default" : "outline"} className="text-xs">
                                  X
                                </Badge>
                              </div>
                            </td>
                            <td className="p-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteSegment(seg.id)}
                              >
                                <Trash2 className="size-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <a href="/os/memoria/segmentacao/teoria" className="text-primary hover:underline flex items-center gap-2">
              ← Anterior: Teoria
            </a>
            <a href="/os/memoria/segmentacao/vs-paginacao" className="text-primary hover:underline flex items-center gap-2">
              Próximo: vs Paginação <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

