"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, MemoryStick, Zap, ArrowDown } from "lucide-react";

interface MemoryLevel {
  name: string;
  size: string;
  speed: string;
  cost: string;
  color: string;
  icon: React.ElementType;
  description: string;
}

const memoryLevels: MemoryLevel[] = [
  {
    name: "Registradores",
    size: "< 1 KB",
    speed: "< 1 ns",
    cost: "Altíssimo",
    color: "from-red-500 to-orange-500",
    icon: Cpu,
    description: "Memória interna da CPU, mais rápida",
  },
  {
    name: "Cache L1",
    size: "32-64 KB",
    speed: "~1 ns",
    cost: "Muito Alto",
    color: "from-orange-500 to-yellow-500",
    icon: Zap,
    description: "Cache de primeiro nível, por núcleo",
  },
  {
    name: "Cache L2",
    size: "256 KB - 1 MB",
    speed: "~3-10 ns",
    cost: "Alto",
    color: "from-yellow-500 to-green-500",
    icon: Zap,
    description: "Cache de segundo nível, por núcleo",
  },
  {
    name: "Cache L3",
    size: "4-32 MB",
    speed: "~10-20 ns",
    cost: "Médio-Alto",
    color: "from-green-500 to-cyan-500",
    icon: Zap,
    description: "Cache compartilhado entre núcleos",
  },
  {
    name: "RAM (Memória Principal)",
    size: "4-128 GB",
    speed: "~100 ns",
    cost: "Médio",
    color: "from-cyan-500 to-blue-500",
    icon: MemoryStick,
    description: "Memória volátil de acesso rápido",
  },
  {
    name: "SSD (Memória Virtual)",
    size: "256 GB - 4 TB",
    speed: "~100 μs",
    cost: "Baixo",
    color: "from-blue-500 to-purple-500",
    icon: HardDrive,
    description: "Armazenamento não-volátil rápido",
  },
  {
    name: "HDD (Armazenamento)",
    size: "1-20 TB",
    speed: "~8-15 ms",
    cost: "Muito Baixo",
    color: "from-purple-500 to-pink-500",
    icon: HardDrive,
    description: "Armazenamento mecânico, mais lento",
  },
];

export function MemoryHierarchyDiagram() {
  return (
    <Card className="p-6 bg-gradient-to-br from-os-primary/10 to-os-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-os-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-os-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-os-primary relative z-10">
        Hierarquia de Memória
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Do mais rápido e caro ao mais lento e barato. A memória virtual usa o disco (SSD/HDD) como extensão da RAM.
      </p>

      <div className="relative z-10 space-y-4">
        {memoryLevels.map((level, idx) => {
          const widthPercentage = 100 - (idx * 10);
          const IconComponent = level.icon;
          
          return (
            <div key={level.name} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ width: `${widthPercentage}%` }}
                className={`bg-gradient-to-r ${level.color} p-6 rounded-xl shadow-lg border-2 border-white/20`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      {React.createElement(IconComponent, { className: "size-5 text-white" })}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{level.name}</h4>
                      <p className="text-white/80 text-xs">{level.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Nível {idx + 1}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-white/70">Tamanho</p>
                    <p className="font-mono font-bold text-white text-sm">{level.size}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-white/70">Velocidade</p>
                    <p className="font-mono font-bold text-white text-sm">{level.speed}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-white/70">Custo</p>
                    <p className="font-semibold text-white text-sm">{level.cost}</p>
                  </div>
                </div>
              </motion.div>
              
              {idx < memoryLevels.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                  className="my-2"
                >
                  <ArrowDown className="size-6 text-os-primary animate-bounce" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
            <Zap className="size-4" />
            Velocidade ↓
          </h4>
          <p className="text-sm text-muted-foreground">
            À medida que descemos na hierarquia, o tempo de acesso aumenta drasticamente.
            HDD é <strong>80.000x mais lento</strong> que RAM!
          </p>
        </div>

        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <MemoryStick className="size-4" />
            Capacidade ↑
          </h4>
          <p className="text-sm text-muted-foreground">
            Memórias mais lentas compensam com maior capacidade. Podemos ter TBs de HDD vs KBs de cache.
          </p>
        </div>

        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <h4 className="font-semibold text-green-400 mb-2">💰 Custo por GB ↓</h4>
          <p className="text-sm text-muted-foreground">
            O custo por GB diminui conforme descemos. Cache é caríssimo, HDD é barato.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 relative z-10">
        <p className="text-sm text-blue-300">
          💡 <strong>Princípio da Localidade:</strong> A hierarquia funciona porque programas tendem a acessar
          os mesmos dados repetidamente (localidade temporal) e dados próximos (localidade espacial).
          Isso permite que caches pequenos e rápidos sejam muito eficientes!
        </p>
      </div>
    </Card>
  );
}

