"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Play, RotateCcw, Zap } from "lucide-react";
import * as THREE from "three";
import { boxGeometry, tallBoxGeometry, sphereGeometry } from "@/lib/utils/3d-optimizations";

interface TLBEntry {
  page: number;
  frame: number;
  valid: boolean;
}

function TLBBox({ position, color, label, isActive }: { position: [number, number, number]; color: string; label: string; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Memoize material to prevent recreation
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.5,
    roughness: 0.3,
  }), [color]);
  
  // Optimized animation using delta time
  useFrame((state, delta) => {
    if (meshRef.current && isActive) {
      // Use delta for framerate-independent animation
      meshRef.current.rotation.y += delta * 2;
      
      // Use state.clock for smooth oscillation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={boxGeometry} material={material} />
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function MemoryBlock({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Memoize material
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.3,
    roughness: 0.7,
  }), [color]);
  
  // Optimized rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={tallBoxGeometry} material={material} />
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  );
}

function DataParticle({ start, end, active }: { start: [number, number, number]; end: [number, number, number]; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  
  // Memoize emissive material
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00ff88",
    emissive: "#00ff88",
    emissiveIntensity: 2,
  }), []);

  // Optimized animation without state
  useFrame((state, delta) => {
    if (active && meshRef.current) {
      // Update progress using ref (no re-render)
      progressRef.current = (progressRef.current + delta * 0.5) % 1;
      const progress = progressRef.current;
      
      // Calculate position with arc
      const x = start[0] + (end[0] - start[0]) * progress;
      const y = start[1] + (end[1] - start[1]) * progress + Math.sin(progress * Math.PI) * 0.5;
      const z = start[2] + (end[2] - start[2]) * progress;
      
      meshRef.current.position.set(x, y, z);
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} geometry={sphereGeometry} material={material} />
  );
}

export function TLBVisualizer3D() {
  const [tlbEntries, setTlbEntries] = useState<TLBEntry[]>(
    Array(4).fill(null).map(() => ({ page: -1, frame: -1, valid: false }))
  );
  const [pageAccess, setPageAccess] = useState("");
  const [tlbHits, setTlbHits] = useState(0);
  const [tlbMisses, setTlbMisses] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAccess, setLastAccess] = useState<{ hit: boolean; page: number } | null>(null);

  const accessPage = () => {
    const page = parseInt(pageAccess);
    if (isNaN(page) || page < 0 || page > 15) {
      toast.error("Página inválida! Use 0-15");
      return;
    }

    setIsAnimating(true);
    
    // Check TLB
    const tlbIndex = tlbEntries.findIndex(e => e.valid && e.page === page);
    
    if (tlbIndex !== -1) {
      // TLB HIT!
      setTlbHits(prev => prev + 1);
      setLastAccess({ hit: true, page });
      toast.success(`🎯 TLB HIT! Página ${page} encontrada no TLB[${tlbIndex}]`, {
        description: "Acesso ultra-rápido (~1ns)"
      });
    } else {
      // TLB MISS
      setTlbMisses(prev => prev + 1);
      setLastAccess({ hit: false, page });
      
      // Add to TLB (FIFO replacement)
      const emptyIndex = tlbEntries.findIndex(e => !e.valid);
      const targetIndex = emptyIndex !== -1 ? emptyIndex : Math.floor(Math.random() * tlbEntries.length);
      
      const newEntries = [...tlbEntries];
      newEntries[targetIndex] = { page, frame: page * 2, valid: true };
      setTlbEntries(newEntries);
      
      toast.warning(`❌ TLB MISS! Buscando na Page Table...`, {
        description: `Adicionado ao TLB[${targetIndex}] (~100ns)`
      });
    }

    setTimeout(() => setIsAnimating(false), 2000);
  };

  const reset = () => {
    setTlbEntries(Array(4).fill(null).map(() => ({ page: -1, frame: -1, valid: false })));
    setTlbHits(0);
    setTlbMisses(0);
    setLastAccess(null);
    setPageAccess("");
    toast.success("TLB reiniciado!");
  };

  const totalAccesses = tlbHits + tlbMisses;
  const hitRate = totalAccesses > 0 ? (tlbHits / totalAccesses) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden border-purple-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-purple-400 relative z-10 flex items-center gap-2">
        <Zap className="size-6" />
        TLB Visualizer 3D - Translation Lookaside Buffer
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Veja em 3D como o TLB acelera a tradução de endereços! Cache especial da MMU.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* 3D Visualization */}
        <div className="h-[500px] rounded-lg overflow-hidden border-2 border-purple-500/30 bg-black/20">
          <Canvas camera={{ position: [6, 4, 6], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

            {/* CPU */}
            <TLBBox 
              position={[-3, 0, 0]} 
              color="#ff6b6b" 
              label="CPU"
              isActive={isAnimating && !!lastAccess}
            />

            {/* TLB */}
            <TLBBox 
              position={[0, 0, 0]} 
              color={lastAccess?.hit ? "#00ff88" : "#ffd93d"} 
              label="TLB"
              isActive={isAnimating}
            />

            {/* Page Table */}
            <MemoryBlock position={[3, 0, 0]} color="#6bcfff" label="Page Table" />

            {/* RAM */}
            <MemoryBlock position={[6, 0, 0]} color="#ff9ff3" label="RAM" />

            {/* Data flow particles */}
            {isAnimating && (
              <>
                <DataParticle 
                  start={[-3, 0, 0]} 
                  end={[0, 0, 0]} 
                  active={isAnimating} 
                />
                {!lastAccess?.hit && (
                  <>
                    <DataParticle 
                      start={[0, 0, 0]} 
                      end={[3, 0, 0]} 
                      active={isAnimating} 
                    />
                    <DataParticle 
                      start={[3, 0, 0]} 
                      end={[6, 0, 0]} 
                      active={isAnimating} 
                    />
                  </>
                )}
              </>
            )}

            <OrbitControls enableZoom={true} enablePan={false} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-access">Acessar Página (0-15)</Label>
              <div className="flex gap-2">
                <Input
                  id="page-access"
                  type="number"
                  min="0"
                  max="15"
                  value={pageAccess}
                  onChange={(e) => setPageAccess(e.target.value)}
                  placeholder="Ex: 5"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && accessPage()}
                />
                <Button onClick={accessPage} disabled={isAnimating}>
                  <Play className="size-4 mr-2" /> Acessar
                </Button>
              </div>
            </div>

            <Button onClick={reset} variant="outline" className="w-full">
              <RotateCcw className="size-4 mr-2" /> Reiniciar TLB
            </Button>
          </div>

          {/* TLB Entries */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Conteúdo do TLB:</h4>
            <div className="grid grid-cols-2 gap-2">
              {tlbEntries.map((entry, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: isAnimating && entry.page === lastAccess?.page ? [1, 1.05, 1] : 1,
                  }}
                  className={`p-3 rounded-lg border-2 ${
                    entry.valid
                      ? entry.page === lastAccess?.page && isAnimating
                        ? "bg-green-500/20 border-green-500 shadow-lg shadow-green-500/50"
                        : "bg-purple-500/20 border-purple-500/50"
                      : "bg-muted/30 border-border"
                  }`}
                >
                  <div className="text-xs font-semibold text-muted-foreground mb-1">
                    TLB[{idx}]
                  </div>
                  {entry.valid ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Page:</span>
                        <span className="font-mono font-bold">{entry.page}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Frame:</span>
                        <span className="font-mono font-bold">{entry.frame}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">Vazio</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-3 p-4 bg-background/50 rounded-lg">
            <h4 className="font-semibold text-foreground">Estatísticas:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>TLB Hits:</span>
                <span className="font-mono font-bold text-green-500">{tlbHits}</span>
              </div>
              <div className="flex justify-between">
                <span>TLB Misses:</span>
                <span className="font-mono font-bold text-red-500">{tlbMisses}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Hit Rate:</span>
                  <span className="font-mono text-green-500">{hitRate.toFixed(1)}%</span>
                </div>
                <Progress value={hitRate} className="h-2" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-300">
              💡 <strong>TLB:</strong> Cache especial que armazena traduções recentes de página→quadro.
              Hit rate de 95-99% em sistemas reais! Transforma ~100ns em ~1ns.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

