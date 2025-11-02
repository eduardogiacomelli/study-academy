"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, TrendingUp, Activity } from "lucide-react";
import * as anime from "animejs";

interface MemoryAccess {
  address: number;
  timestamp: number;
  type: 'temporal' | 'spatial' | 'random';
}

export function MemoryAccessHeatMap() {
  const [isRunning, setIsRunning] = useState(false);
  const [accesses, setAccesses] = useState<MemoryAccess[]>([]);
  const [heatMap, setHeatMap] = useState<number[]>(new Array(256).fill(0));
  const [stats, setStats] = useState({ temporal: 0, spatial: 0, random: 0 });
  const [accessPattern, setAccessPattern] = useState<'sequential' | 'random' | 'working-set'>('working-set');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const GRID_SIZE = 16; // 16x16 = 256 cells
  const CELL_SIZE = 30;

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        generateAccess();
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isRunning, accessPattern, accesses]);

  useEffect(() => {
    drawHeatMap();
  }, [heatMap]);

  const generateAccess = () => {
    let address: number;
    let type: 'temporal' | 'spatial' | 'random' = 'random';

    const lastAccess = accesses[accesses.length - 1];

    switch (accessPattern) {
      case 'sequential':
        address = lastAccess ? (lastAccess.address + 1) % 256 : Math.floor(Math.random() * 256);
        type = 'spatial';
        break;
      
      case 'working-set':
        // 80% temporal locality (working set of ~20 pages)
        if (Math.random() < 0.8 && accesses.length > 0) {
          const recentAccesses = accesses.slice(-20);
          address = recentAccesses[Math.floor(Math.random() * recentAccesses.length)].address;
          type = 'temporal';
        } else {
          // 15% spatial locality
          if (Math.random() < 0.15 && lastAccess) {
            const offset = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
            address = Math.max(0, Math.min(255, lastAccess.address + offset));
            type = 'spatial';
          } else {
            // 5% random
            address = Math.floor(Math.random() * 256);
            type = 'random';
          }
        }
        break;
      
      case 'random':
      default:
        address = Math.floor(Math.random() * 256);
        type = 'random';
    }

    const newAccess: MemoryAccess = {
      address,
      timestamp: Date.now(),
      type,
    };

    setAccesses(prev => [...prev.slice(-100), newAccess]);
    
    setHeatMap(prev => {
      const newMap = [...prev];
      newMap[address] = Math.min(100, newMap[address] + 10);
      return newMap;
    });

    setStats(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const drawHeatMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    for (let i = 0; i < 256; i++) {
      const row = Math.floor(i / GRID_SIZE);
      const col = i % GRID_SIZE;
      const heat = heatMap[i];

      // Heat color: cold (blue) → warm (yellow) → hot (red)
      let r, g, b;
      if (heat < 50) {
        // Blue to Yellow
        const t = heat / 50;
        r = Math.floor(0 + t * 255);
        g = Math.floor(100 + t * 155);
        b = Math.floor(255 - t * 255);
      } else {
        // Yellow to Red
        const t = (heat - 50) / 50;
        r = 255;
        g = Math.floor(255 - t * 255);
        b = 0;
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);

      // Add glow effect for hot spots
      if (heat > 70) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
        ctx.shadowBlur = 0;
      }
    }

    // Decay heat over time
    setTimeout(() => {
      setHeatMap(prev => prev.map(h => Math.max(0, h - 0.5)));
    }, 100);
  };

  const reset = () => {
    setAccesses([]);
    setHeatMap(new Array(256).fill(0));
    setStats({ temporal: 0, spatial: 0, random: 0 });
    setIsRunning(false);
  };

  const totalAccesses = stats.temporal + stats.spatial + stats.random;
  const temporalPercent = totalAccesses > 0 ? (stats.temporal / totalAccesses * 100).toFixed(1) : '0';
  const spatialPercent = totalAccesses > 0 ? (stats.spatial / totalAccesses * 100).toFixed(1) : '0';
  const randomPercent = totalAccesses > 0 ? (stats.random / totalAccesses * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Memory Access Heat Map</h3>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="outline"
              size="sm"
              className={isRunning ? "bg-red-500/20 border-red-500/50" : "bg-green-500/20 border-green-500/50"}
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex gap-2 mb-6">
          {(['sequential', 'random', 'working-set'] as const).map((pattern) => (
            <Button
              key={pattern}
              onClick={() => setAccessPattern(pattern)}
              variant="outline"
              size="sm"
              className={accessPattern === pattern ? "bg-indigo-500/30 border-indigo-500" : ""}
            >
              {pattern === 'sequential' && '📈 Sequential'}
              {pattern === 'random' && '🎲 Random'}
              {pattern === 'working-set' && '🎯 Working Set'}
            </Button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/30 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="rounded border border-indigo-500/20"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>❄️ Cold</span>
              <span>🔥 Hot</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-black/30 p-4">
            <div className="text-xs text-slate-400 mb-1">Total Accesses</div>
            <div className="text-2xl font-bold text-white">{totalAccesses}</div>
          </Card>
          
          <Card className="bg-blue-950/30 border-blue-500/20 p-4">
            <div className="text-xs text-blue-400 mb-1">Temporal</div>
            <div className="text-2xl font-bold text-blue-300">{temporalPercent}%</div>
            <div className="text-xs text-slate-500">{stats.temporal} hits</div>
          </Card>
          
          <Card className="bg-green-950/30 border-green-500/20 p-4">
            <div className="text-xs text-green-400 mb-1">Spatial</div>
            <div className="text-2xl font-bold text-green-300">{spatialPercent}%</div>
            <div className="text-xs text-slate-500">{stats.spatial} hits</div>
          </Card>
          
          <Card className="bg-yellow-950/30 border-yellow-500/20 p-4">
            <div className="text-xs text-yellow-400 mb-1">Random</div>
            <div className="text-2xl font-bold text-yellow-300">{randomPercent}%</div>
            <div className="text-xs text-slate-500">{stats.random} hits</div>
          </Card>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
          <div className="text-sm text-slate-300 space-y-2">
            <div><strong className="text-indigo-400">Working Set Pattern:</strong> Simula programa real com 80% temporal locality</div>
            <div><strong className="text-green-400">Sequential Pattern:</strong> Acesso sequencial (arrays, loops)</div>
            <div><strong className="text-yellow-400">Random Pattern:</strong> Acesso totalmente aleatório (worst case)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

