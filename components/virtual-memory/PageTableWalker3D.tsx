"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Layers, ArrowRight, Database, Cpu } from "lucide-react";

interface TableEntry {
  index: number;
  value: string;
  present: boolean;
  selected: boolean;
}

export function PageTableWalker3D() {
  const [virtualAddress, setVirtualAddress] = useState("0x00007FFF12345678");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [walkPath, setWalkPath] = useState<number[]>([]);
  const [isWalking, setIsWalking] = useState(false);

  const levels = ['PML4', 'PDP', 'PD', 'PT'];
  const levelColors = ['purple', 'blue', 'green', 'yellow'];

  const parseAddress = (addr: string) => {
    const hex = addr.replace(/^0x/i, '').padStart(16, '0');
    const binary = BigInt('0x' + hex).toString(2).padStart(64, '0');
    
    return {
      pml4: parseInt(binary.slice(16, 25), 2),
      pdp: parseInt(binary.slice(25, 34), 2),
      pd: parseInt(binary.slice(34, 43), 2),
      pt: parseInt(binary.slice(43, 52), 2),
      offset: parseInt(binary.slice(52, 64), 2),
    };
  };

  const startWalk = () => {
    setIsWalking(true);
    setCurrentLevel(0);
    setWalkPath([]);
    
    const indices = parseAddress(virtualAddress);
    const path = [indices.pml4, indices.pdp, indices.pd, indices.pt];
    
    // Animate through levels
    path.forEach((idx, level) => {
      setTimeout(() => {
        setCurrentLevel(level);
        setWalkPath(prev => [...prev, idx]);
      }, level * 800);
    });
    
    setTimeout(() => {
      setCurrentLevel(4); // Complete
    }, 4 * 800);
  };

  const generateEntries = (level: number): TableEntry[] => {
    const count = 8; // Show only 8 for visibility
    const entries: TableEntry[] = [];
    const indices = parseAddress(virtualAddress);
    const path = [indices.pml4, indices.pdp, indices.pd, indices.pt];
    const selectedIdx = path[level];
    
    for (let i = 0; i < count; i++) {
      const actualIdx = Math.floor(selectedIdx / count) * count + i;
      entries.push({
        index: actualIdx,
        value: `0x${(Math.random() * 0xFFFFFF | 0).toString(16).padStart(6, '0')}`,
        present: Math.random() > 0.2,
        selected: actualIdx === selectedIdx && isWalking && currentLevel >= level,
      });
    }
    
    return entries;
  };

  const reset = () => {
    setIsWalking(false);
    setCurrentLevel(0);
    setWalkPath([]);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-semibold text-white">4-Level Page Table Walker</h3>
        </div>
        
        <div className="flex gap-3">
          <Input
            value={virtualAddress}
            onChange={(e) => setVirtualAddress(e.target.value)}
            placeholder="0x00007FFF12345678"
            className="flex-1 bg-black/30 border-indigo-500/30 text-white font-mono"
            disabled={isWalking}
          />
          <Button
            onClick={isWalking ? reset : startWalk}
            className={isWalking ? "bg-red-500" : "bg-indigo-500"}
          >
            {isWalking ? 'Reset' : 'Walk'}
          </Button>
        </div>
      </Card>

      {/* Progress */}
      {isWalking && (
        <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
          <div className="flex items-center gap-4">
            {levels.map((level, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Badge
                  className={`${
                    currentLevel >= idx
                      ? `bg-${levelColors[idx]}-500`
                      : 'bg-slate-700'
                  }`}
                >
                  {level}
                  {walkPath[idx] !== undefined && ` [${walkPath[idx]}]`}
                </Badge>
                {idx < 3 && (
                  <ArrowRight
                    className={`w-4 h-4 ${
                      currentLevel > idx ? `text-${levelColors[idx + 1]}-400` : 'text-slate-600'
                    }`}
                  />
                )}
              </div>
            ))}
            {currentLevel >= 4 && (
              <>
                <ArrowRight className="w-4 h-4 text-green-400" />
                <Badge className="bg-green-500">
                  <Database className="w-3 h-3 mr-1" />
                  Physical Frame
                </Badge>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Page Tables */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((level, levelIdx) => {
          const entries = generateEntries(levelIdx);
          const color = levelColors[levelIdx];
          const isActive = isWalking && currentLevel >= levelIdx;
          
          return (
            <Card
              key={level}
              className={`p-4 transition-all ${
                isActive
                  ? `bg-${color}-950/30 border-${color}-500/30`
                  : 'bg-slate-900/30 border-slate-700/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold ${isActive ? `text-${color}-400` : 'text-slate-500'}`}>
                  {level}
                </h4>
                <Badge variant="outline" className="text-xs">
                  Level {levelIdx}
                </Badge>
              </div>
              
              <div className="space-y-1">
                {entries.map((entry) => (
                  <div
                    key={entry.index}
                    className={`p-2 rounded text-xs font-mono border transition-all ${
                      entry.selected
                        ? `bg-${color}-500/30 border-${color}-500 scale-105`
                        : entry.present
                        ? 'bg-white/5 border-slate-700/30'
                        : 'bg-red-950/20 border-red-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">[{entry.index}]</span>
                      {entry.selected && (
                        <ArrowRight className={`w-3 h-3 text-${color}-400`} />
                      )}
                    </div>
                    {entry.present ? (
                      <div className={entry.selected ? `text-${color}-300` : 'text-slate-500'}>
                        {entry.value}
                      </div>
                    ) : (
                      <div className="text-red-400 text-[10px]">NOT PRESENT</div>
                    )}
                  </div>
                ))}
                <div className="text-center text-[10px] text-slate-600 mt-2">
                  ... {512 - 8} more entries ...
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Result */}
      {currentLevel >= 4 && (
        <Card className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-green-500/20 p-6">
          <div className="flex items-center gap-4">
            <Database className="w-12 h-12 text-green-400" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-300 mb-2">Translation Complete!</h3>
              <div className="space-y-1 text-sm text-slate-300">
                <div>
                  <strong className="text-green-400">Virtual Address:</strong>{' '}
                  <span className="font-mono">{virtualAddress}</span>
                </div>
                <div>
                  <strong className="text-emerald-400">Physical Frame:</strong>{' '}
                  <span className="font-mono">0x{(Math.random() * 0xFFFFF | 0).toString(16).padStart(5, '0')}</span>
                </div>
                <div>
                  <strong className="text-teal-400">Memory Accesses:</strong> 4 (page table walks)
                </div>
              </div>
            </div>
            <Badge className="bg-green-500 text-lg px-4 py-2">
              Success!
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
}


