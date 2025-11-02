"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Cpu, Database, Layers, Zap } from "lucide-react";
import * as anime from "animejs";

interface AddressParts {
  pml4: string;
  pdp: string;
  pd: string;
  pt: string;
  offset: string;
}

export function AddressTranslationVisualizer() {
  const [virtualAddress, setVirtualAddress] = useState("0x00007FFFABCD1234");
  const [addressParts, setAddressParts] = useState<AddressParts | null>(null);
  const [physicalAddress, setPhysicalAddress] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const visualizerRef = useRef<HTMLDivElement>(null);

  const parseAddress = (addr: string) => {
    // Remove 0x prefix
    let hex = addr.replace(/^0x/i, "");
    // Pad to 16 hex digits (64 bits)
    hex = hex.padStart(16, "0");
    
    // Convert to binary
    const binary = BigInt("0x" + hex).toString(2).padStart(64, "0");
    
    // x86-64 4-level paging (48 bits usados):
    // PML4: bits 39-47 (9 bits)
    // PDP:  bits 30-38 (9 bits)
    // PD:   bits 21-29 (9 bits)
    // PT:   bits 12-20 (9 bits)
    // Offset: bits 0-11 (12 bits)
    
    const pml4 = binary.slice(16, 25); // bits 47-39
    const pdp = binary.slice(25, 34);  // bits 38-30
    const pd = binary.slice(34, 43);   // bits 29-21
    const pt = binary.slice(43, 52);   // bits 20-12
    const offset = binary.slice(52, 64); // bits 11-0
    
    return { pml4, pdp, pd, pt, offset };
  };

  const translate = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const parts = parseAddress(virtualAddress);
    setAddressParts(parts);
    
    // Simular tradução (endereços fictícios)
    const pml4Index = parseInt(parts.pml4, 2);
    const pdpIndex = parseInt(parts.pdp, 2);
    const pdIndex = parseInt(parts.pd, 2);
    const ptIndex = parseInt(parts.pt, 2);
    const offsetInt = parseInt(parts.offset, 2);
    
    // Simular frame físico (fictício)
    const physFrame = 0x123456; // Frame físico simulado
    const physAddr = (physFrame << 12) | offsetInt;
    
    setPhysicalAddress("0x" + physAddr.toString(16).toUpperCase().padStart(12, "0"));
    
    // Animar passos
    animateSteps();
  };

  const animateSteps = () => {
    const steps = [
      { delay: 0, step: 0 },
      { delay: 800, step: 1 },
      { delay: 1600, step: 2 },
      { delay: 2400, step: 3 },
      { delay: 3200, step: 4 },
      { delay: 4000, step: 5 },
    ];
    
    steps.forEach(({ delay, step }) => {
      setTimeout(() => setCurrentStep(step), delay);
    });
    
    setTimeout(() => setIsAnimating(false), 4500);
  };

  useEffect(() => {
    if (visualizerRef.current && currentStep > 0) {
      const target = visualizerRef.current.querySelector(`.step-${currentStep}`);
      if (target) {
        anime({
          targets: target,
          scale: [0.95, 1],
          opacity: [0.5, 1],
          duration: 400,
          easing: "easeOutBack",
        });
      }
    }
  }, [currentStep]);

  const getLevelColor = (level: number) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-teal-500",
      "from-yellow-500 to-orange-500",
      "from-red-500 to-rose-500",
    ];
    return colors[level] || colors[0];
  };

  const getLevelBg = (level: number) => {
    const colors = [
      "bg-purple-950/30 border-purple-500/30",
      "bg-blue-950/30 border-blue-500/30",
      "bg-green-950/30 border-green-500/30",
      "bg-yellow-950/30 border-yellow-500/30",
      "bg-red-950/30 border-red-500/30",
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="space-y-6" ref={visualizerRef}>
      {/* Control Panel */}
      <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-semibold text-white">Address Translation Simulator</h3>
        </div>
        
        <div className="flex gap-3 mb-4">
          <Input
            value={virtualAddress}
            onChange={(e) => setVirtualAddress(e.target.value)}
            placeholder="0x00007FFFABCD1234"
            className="flex-1 bg-black/30 border-indigo-500/30 text-white font-mono"
            disabled={isAnimating}
          />
          <Button
            onClick={translate}
            disabled={isAnimating}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <Zap className="w-4 h-4 mr-2" />
            Translate
          </Button>
        </div>

        {physicalAddress && (
          <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-400 mb-1">Physical Address:</div>
                <div className="text-2xl font-bold text-green-300 font-mono">{physicalAddress}</div>
              </div>
              <Database className="w-8 h-8 text-green-400" />
            </div>
          </div>
        )}
      </Card>

      {/* Visual Breakdown */}
      {addressParts && (
        <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            Bit-Level Breakdown (x86-64, 48-bit addressing)
          </h3>

          <div className="space-y-4">
            {/* Virtual Address Binary */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Virtual Address (64-bit):</div>
              <div className="font-mono text-xs sm:text-sm flex flex-wrap gap-2">
                <span className="text-slate-600">0000000000000000</span>
                <span className="text-purple-400 bg-purple-950/30 px-2 py-1 rounded">{addressParts.pml4}</span>
                <span className="text-blue-400 bg-blue-950/30 px-2 py-1 rounded">{addressParts.pdp}</span>
                <span className="text-green-400 bg-green-950/30 px-2 py-1 rounded">{addressParts.pd}</span>
                <span className="text-yellow-400 bg-yellow-950/30 px-2 py-1 rounded">{addressParts.pt}</span>
                <span className="text-red-400 bg-red-950/30 px-2 py-1 rounded">{addressParts.offset}</span>
              </div>
              <div className="font-mono text-xs flex flex-wrap gap-2 mt-2 text-slate-500">
                <span className="w-32">unused (16b)</span>
                <span className="text-purple-400 w-20">PML4 (9b)</span>
                <span className="text-blue-400 w-20">PDP (9b)</span>
                <span className="text-green-400 w-20">PD (9b)</span>
                <span className="text-yellow-400 w-20">PT (9b)</span>
                <span className="text-red-400 w-24">Offset (12b)</span>
              </div>
            </div>

            {/* Translation Steps */}
            <div className="grid gap-3">
              {/* Step 1: PML4 */}
              <div className={`step-1 ${getLevelBg(0)} border rounded-lg p-4 transition-all ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(0)}`}>Level 4</Badge>
                    <span className="font-semibold text-white">PML4 (Page Map Level 4)</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${currentStep >= 1 ? 'text-purple-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-sm text-slate-300">
                  Index: <span className="font-mono text-purple-400">{parseInt(addressParts.pml4, 2)}</span> (binary: {addressParts.pml4})
                </div>
                <div className="text-xs text-slate-500 mt-1">→ Points to PDP Table</div>
              </div>

              {/* Step 2: PDP */}
              <div className={`step-2 ${getLevelBg(1)} border rounded-lg p-4 transition-all ${currentStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(1)}`}>Level 3</Badge>
                    <span className="font-semibold text-white">PDP (Page Directory Pointer)</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${currentStep >= 2 ? 'text-blue-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-sm text-slate-300">
                  Index: <span className="font-mono text-blue-400">{parseInt(addressParts.pdp, 2)}</span> (binary: {addressParts.pdp})
                </div>
                <div className="text-xs text-slate-500 mt-1">→ Points to PD Table</div>
              </div>

              {/* Step 3: PD */}
              <div className={`step-3 ${getLevelBg(2)} border rounded-lg p-4 transition-all ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(2)}`}>Level 2</Badge>
                    <span className="font-semibold text-white">PD (Page Directory)</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${currentStep >= 3 ? 'text-green-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-sm text-slate-300">
                  Index: <span className="font-mono text-green-400">{parseInt(addressParts.pd, 2)}</span> (binary: {addressParts.pd})
                </div>
                <div className="text-xs text-slate-500 mt-1">→ Points to PT Table</div>
              </div>

              {/* Step 4: PT */}
              <div className={`step-4 ${getLevelBg(3)} border rounded-lg p-4 transition-all ${currentStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(3)}`}>Level 1</Badge>
                    <span className="font-semibold text-white">PT (Page Table)</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${currentStep >= 4 ? 'text-yellow-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-sm text-slate-300">
                  Index: <span className="font-mono text-yellow-400">{parseInt(addressParts.pt, 2)}</span> (binary: {addressParts.pt})
                </div>
                <div className="text-xs text-slate-500 mt-1">→ Points to Physical Frame</div>
              </div>

              {/* Step 5: Offset */}
              <div className={`step-5 ${getLevelBg(4)} border rounded-lg p-4 transition-all ${currentStep >= 5 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(4)}`}>Offset</Badge>
                    <span className="font-semibold text-white">Page Offset (4KB page)</span>
                  </div>
                  <Database className={`w-5 h-5 ${currentStep >= 5 ? 'text-red-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-sm text-slate-300">
                  Offset: <span className="font-mono text-red-400">{parseInt(addressParts.offset, 2)}</span> bytes (binary: {addressParts.offset})
                </div>
                <div className="text-xs text-slate-500 mt-1">→ Final byte within the 4KB page</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Statistics */}
      {addressParts && currentStep >= 5 && (
        <Card className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Translation Summary</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Memory Accesses:</div>
              <div className="text-3xl font-bold text-indigo-400">4</div>
              <div className="text-xs text-slate-500 mt-1">
                Without TLB: 4 page table walks + 1 data = 5 accesses
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">With TLB Hit:</div>
              <div className="text-3xl font-bold text-green-400">1</div>
              <div className="text-xs text-slate-500 mt-1">
                TLB lookup + data access = 5x faster!
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

