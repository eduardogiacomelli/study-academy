"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Pause } from "lucide-react";
import { smallBoxGeometry } from "@/lib/utils/3d-optimizations";

interface MemoryBlockProps {
  position: [number, number, number];
  color: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function MemoryBlock({ position, color, label, isActive = false, onClick }: MemoryBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Memoize material with dynamic properties
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: hovered ? "#ffffff" : color,
      emissive: isActive ? color : "#000000",
      emissiveIntensity: isActive ? 0.5 : 0,
      metalness: 0.3,
      roughness: 0.4,
    });
  }, [color, hovered, isActive]);

  // Optimized animation using delta
  useFrame((state, delta) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += delta * 0.5;
      
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={smallBoxGeometry}
        material={material}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Text
        position={[0, 0, 0.5]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Scene() {
  const [activePage, setActivePage] = useState<number | null>(null);

  // Páginas lógicas (lado esquerdo)
  const logicalPages = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    position: [-3, 2 - i * 1, 0] as [number, number, number],
    color: "#3b82f6", // Blue
    label: `P${i}`,
  }));

  // Quadros físicos (lado direito)
  const physicalFrames = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    position: [3, 2 - i * 1, 0] as [number, number, number],
    color: "#06b6d4", // Cyan
    label: `F${i}`,
  }));

  // Mapeamento (exemplo)
  const mapping = [
    { page: 0, frame: 5 },
    { page: 1, frame: 2 },
    { page: 2, frame: 3 },
    { page: 3, frame: 7 },
    { page: 4, frame: 1 },
    { page: 6, frame: 6 },
    { page: 7, frame: 0 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Páginas Lógicas */}
      {logicalPages.map((page) => (
        <MemoryBlock
          key={`page-${page.id}`}
          position={page.position}
          color={page.color}
          label={page.label}
          isActive={activePage === page.id}
          onClick={() => setActivePage(activePage === page.id ? null : page.id)}
        />
      ))}

      {/* Quadros Físicos */}
      {physicalFrames.map((frame) => {
        const isLinked = mapping.find(m => m.page === activePage)?.frame === frame.id;
        return (
          <MemoryBlock
            key={`frame-${frame.id}`}
            position={frame.position}
            color={isLinked ? "#10b981" : frame.color}
            label={frame.label}
            isActive={isLinked}
          />
        );
      })}

      {/* Linhas de Conexão */}
      {mapping.map((m) => {
        const pagePos = logicalPages[m.page].position;
        const framePos = physicalFrames[m.frame].position;
        const isHighlighted = activePage === m.page;
        
        const points = [
          new THREE.Vector3(pagePos[0] + 0.4, pagePos[1], pagePos[2]),
          new THREE.Vector3(framePos[0] - 0.4, framePos[1], framePos[2]),
        ];
        
        return (
          <Line
            key={`line-${m.page}-${m.frame}`}
            points={points}
            color={isHighlighted ? "#10b981" : "#6b7280"}
            lineWidth={isHighlighted ? 3 : 1}
            opacity={isHighlighted ? 1 : 0.3}
            transparent
          />
        );
      })}

      {/* Labels */}
      <Text
        position={[-3, 3, 0]}
        fontSize={0.3}
        color="#3b82f6"
        anchorX="center"
      >
        Memória Lógica
      </Text>
      <Text
        position={[3, 3, 0]}
        fontSize={0.3}
        color="#06b6d4"
        anchorX="center"
      >
        Memória Física
      </Text>

      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={5}
      />
    </>
  );
}

export function PagingVisualizer3D() {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-os-primary/10 text-os-primary border-os-primary/20 mb-2">
            Visualização Interativa 3D
          </Badge>
          <p className="text-sm text-muted-foreground">
            Clique nas páginas para ver o mapeamento. Use o mouse para rotacionar, dar zoom e mover a câmera.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRotating(!isRotating)}
          >
            {isRotating ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[600px] bg-gradient-to-br from-os-primary/5 to-cyan-500/5 rounded-lg border overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="size-12 border-4 border-os-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando visualização 3D...</p>
            </div>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </Suspense>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border space-y-2">
          <h4 className="font-bold text-sm mb-2">Legenda:</h4>
          <div className="flex items-center gap-2 text-xs">
            <div className="size-3 rounded bg-os-primary" />
            <span>Páginas Lógicas</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="size-3 rounded bg-cyan-500" />
            <span>Quadros Físicos</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="size-3 rounded bg-green-500" />
            <span>Mapeamento Ativo</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border max-w-xs">
          <h4 className="font-bold text-sm mb-2">Controles:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>🖱️ <strong>Arrastar:</strong> Rotacionar câmera</li>
            <li>🔍 <strong>Scroll:</strong> Zoom in/out</li>
            <li>👆 <strong>Clicar:</strong> Selecionar página</li>
            <li>⌨️ <strong>Shift + Arrastar:</strong> Mover câmera</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Páginas Totais", value: "8", color: "bg-os-primary" },
          { label: "Quadros Disponíveis", value: "8", color: "bg-cyan-500" },
          { label: "Mapeamentos", value: "7", color: "bg-green-500" },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`size-2 rounded-full ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
