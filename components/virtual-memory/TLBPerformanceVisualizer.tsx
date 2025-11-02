"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { Zap, TrendingUp, Clock } from "lucide-react";

interface TLBEntry {
  vpn: number;
  pfn: number;
  valid: boolean;
  age: number;
}

export function TLBPerformanceVisualizer() {
  const [tlbSize, setTlbSize] = useState([64]);
  const [hitRate, setHitRate] = useState(98);
  const [accessCount, setAccessCount] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [tlb, setTlb] = useState<TLBEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAccess, setCurrentAccess] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<'hit' | 'miss' | null>(null);

  useEffect(() => {
    // Initialize TLB
    const initialTLB: TLBEntry[] = Array(tlbSize[0]).fill(null).map(() => ({
      vpn: -1,
      pfn: -1,
      valid: false,
      age: 0
    }));
    setTlb(initialTLB);
  }, [tlbSize]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        simulateAccess();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRunning, tlb, hitRate]);

  const simulateAccess = () => {
    const vpn = Math.floor(Math.random() * 1024); // Random virtual page
    setCurrentAccess(vpn);
    
    // Simulate hit/miss based on hit rate
    const isHit = Math.random() * 100 < hitRate;
    
    setAccessCount(prev => prev + 1);
    
    if (isHit) {
      setHits(prev => prev + 1);
      setLastResult('hit');
      // Update existing entry age
      setTlb(prev => prev.map(entry => 
        entry.valid && entry.vpn === vpn 
          ? { ...entry, age: 0 }
          : { ...entry, age: entry.age + 1 }
      ));
    } else {
      setMisses(prev => prev + 1);
      setLastResult('miss');
      // TLB miss: need to insert
      insertIntoTLB(vpn);
    }
  };

  const insertIntoTLB = (vpn: number) => {
    setTlb(prev => {
      const newTLB = [...prev];
      
      // Find invalid entry first
      let insertIdx = newTLB.findIndex(e => !e.valid);
      
      // If all valid, find oldest (LRU)
      if (insertIdx === -1) {
        insertIdx = 0;
        let maxAge = newTLB[0].age;
        for (let i = 1; i < newTLB.length; i++) {
          if (newTLB[i].age > maxAge) {
            maxAge = newTLB[i].age;
            insertIdx = i;
          }
        }
      }
      
      // Insert new entry
      newTLB[insertIdx] = {
        vpn,
        pfn: Math.floor(Math.random() * 2048), // Random physical frame
        valid: true,
        age: 0
      };
      
      // Age all other entries
      return newTLB.map((entry, idx) => 
        idx === insertIdx ? entry : { ...entry, age: entry.age + 1 }
      );
    });
  };

  const reset = () => {
    setAccessCount(0);
    setHits(0);
    setMisses(0);
    setIsRunning(false);
    setCurrentAccess(null);
    setLastResult(null);
    const initialTLB: TLBEntry[] = Array(tlbSize[0]).fill(null).map(() => ({
      vpn: -1,
      pfn: -1,
      valid: false,
      age: 0
    }));
    setTlb(initialTLB);
  };

  const actualHitRate = accessCount > 0 ? (hits / accessCount * 100).toFixed(1) : '0.0';
  const avgAccessTime = accessCount > 0 
    ? (hits * 2 + misses * 102) / accessCount  // TLB hit: 2ns, miss: 100ns + 2ns
    : 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">TLB Performance Simulator</h3>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? "bg-red-500" : "bg-green-500"}
            >
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">TLB Size:</span>
              <Badge variant="outline">{tlbSize[0]} entries</Badge>
            </div>
            <Slider
              value={tlbSize}
              onValueChange={setTlbSize}
              min={16}
              max={512}
              step={16}
              disabled={isRunning}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Target Hit Rate:</span>
              <Badge variant="outline">{hitRate}%</Badge>
            </div>
            <Slider
              value={[hitRate]}
              onValueChange={(val) => setHitRate(val[0])}
              min={50}
              max={100}
              step={1}
              disabled={isRunning}
            />
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-4">
          <div className="text-xs text-slate-400 mb-1">Total Accesses</div>
          <div className="text-3xl font-bold text-white">{accessCount}</div>
        </Card>
        
        <Card className="bg-green-950/30 border-green-500/20 p-4">
          <div className="text-xs text-green-400 mb-1">TLB Hits</div>
          <div className="text-3xl font-bold text-green-300">{hits}</div>
          <div className="text-xs text-slate-500">{actualHitRate}%</div>
        </Card>
        
        <Card className="bg-red-950/30 border-red-500/20 p-4">
          <div className="text-xs text-red-400 mb-1">TLB Misses</div>
          <div className="text-3xl font-bold text-red-300">{misses}</div>
          <div className="text-xs text-slate-500">{accessCount > 0 ? (100 - parseFloat(actualHitRate)).toFixed(1) : '0.0'}%</div>
        </Card>
        
        <Card className="bg-blue-950/30 border-blue-500/20 p-4">
          <div className="text-xs text-blue-400 mb-1">Avg Access Time</div>
          <div className="text-3xl font-bold text-blue-300">{avgAccessTime.toFixed(1)}</div>
          <div className="text-xs text-slate-500">nanoseconds</div>
        </Card>
      </div>

      {/* Current Access */}
      {currentAccess !== null && (
        <Card className={`p-6 ${lastResult === 'hit' ? 'bg-green-950/30 border-green-500/30' : 'bg-red-950/30 border-red-500/30'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Current Access:</div>
              <div className="text-2xl font-bold font-mono">VPN: {currentAccess}</div>
            </div>
            <Badge className={lastResult === 'hit' ? 'bg-green-500' : 'bg-red-500'}>
              {lastResult === 'hit' ? '✓ HIT' : '✗ MISS'}
            </Badge>
          </div>
        </Card>
      )}

      {/* TLB Contents */}
      <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">TLB Contents ({tlb.filter(e => e.valid).length}/{tlb.length} entries)</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 max-h-96 overflow-y-auto">
          {tlb.map((entry, idx) => (
            <div
              key={idx}
              className={`p-2 rounded text-xs border ${
                entry.valid
                  ? entry.vpn === currentAccess
                    ? 'bg-green-500/30 border-green-500'
                    : 'bg-indigo-500/20 border-indigo-500/30'
                  : 'bg-slate-800/30 border-slate-700/30'
              }`}
            >
              <div className="font-mono text-[10px] text-slate-400">#{idx}</div>
              {entry.valid ? (
                <>
                  <div className="font-mono text-white">V:{entry.vpn}</div>
                  <div className="font-mono text-indigo-300">P:{entry.pfn}</div>
                  <div className="text-[10px] text-slate-500">age:{entry.age}</div>
                </>
              ) : (
                <div className="text-slate-600">empty</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Analysis */}
      <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/20 p-6">
        <h3 className="text-xl font-semibold text-indigo-300 mb-4">Performance Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-400 mb-2">Time Breakdown</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>TLB Hit Time:</span>
                <span className="font-mono text-green-400">2 ns</span>
              </div>
              <div className="flex justify-between">
                <span>Page Walk Time:</span>
                <span className="font-mono text-red-400">100 ns</span>
              </div>
              <div className="flex justify-between">
                <span>TLB Miss Total:</span>
                <span className="font-mono text-red-400">102 ns</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Speedup</h4>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">
                {accessCount > 0 ? (102 / avgAccessTime).toFixed(1) : '0'}x
              </div>
              <div className="text-sm text-slate-400 mt-1">vs. No TLB</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

