"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface VirtualMemory3DProps {
  virtualPages: number;
  physicalFrames: number;
  pageTable: Map<number, number | null>; // virtual page -> physical frame (null = not in memory)
  highlightPage?: number | null;
}

export function VirtualMemory3D({ 
  virtualPages, 
  physicalFrames, 
  pageTable,
  highlightPage 
}: VirtualMemory3DProps) {
  
  return (
    <div className="h-[600px] rounded-2xl border overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />
      
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 25, 35]} fov={50} />
        
        {/* Premium Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-15, 15, -15]} intensity={0.4} color="#4f46e5" />
        <spotLight
          position={[0, 30, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.6}
          castShadow
          color="#8b5cf6"
        />
        
        <Environment preset="city" />
        <fog attach="fog" args={["#0f172a", 30, 100]} />

        {/* Virtual Address Space (Left) */}
        <VirtualMemorySpace 
          pages={virtualPages} 
          pageTable={pageTable}
          highlightPage={highlightPage}
        />

        {/* Physical Memory (Right) */}
        <PhysicalMemorySpace 
          frames={physicalFrames}
          pageTable={pageTable}
        />

        {/* Connecting Lines */}
        <ConnectionLines pageTable={pageTable} virtualPages={virtualPages} physicalFrames={physicalFrames} />

        {/* Ground plane */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={20}
          maxDistance={80}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg text-white text-xs z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-indigo-500 rounded" />
          <span>Virtual Pages</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Physical Frames (In Memory)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <span>Empty Frames</span>
        </div>
      </div>
    </div>
  );
}

function VirtualMemorySpace({ pages, pageTable, highlightPage }: { 
  pages: number; 
  pageTable: Map<number, number | null>;
  highlightPage?: number | null;
}) {
  const cols = Math.ceil(Math.sqrt(pages));
  const rows = Math.ceil(pages / cols);
  const spacing = 2.2;
  const startX = -15;
  const startZ = -((rows - 1) * spacing) / 2;

  return (
    <group position={[startX, 0, 0]}>
      <Text
        position={[0, 10, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Virtual Memory
      </Text>
      {Array.from({ length: pages }).map((_, i) => {
        const x = (i % cols) * spacing;
        const z = Math.floor(i / cols) * spacing + startZ;
        const isInMemory = pageTable.get(i) !== null && pageTable.get(i) !== undefined;
        const isHighlighted = highlightPage === i;
        
        return (
          <VirtualPage
            key={i}
            position={[x, 0, z]}
            pageNumber={i}
            isInMemory={isInMemory}
            isHighlighted={isHighlighted}
          />
        );
      })}
    </group>
  );
}

function VirtualPage({ 
  position, 
  pageNumber, 
  isInMemory, 
  isHighlighted 
}: { 
  position: [number, number, number]; 
  pageNumber: number;
  isInMemory: boolean;
  isHighlighted: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1;
      meshRef.current.rotation.y += 0.02;
    } else if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  const color = isHighlighted ? "#fbbf24" : (isInMemory ? "#6366f1" : "#64748b");
  const emissive = isHighlighted ? "#f59e0b" : (isInMemory ? "#4f46e5" : "#1e293b");

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.8, 2, 1.8]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={isHighlighted ? 0.8 : 0.3}
        metalness={0.6}
        roughness={0.4}
      />
      <Text
        position={[0, 0, 0.95]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {pageNumber}
      </Text>
    </mesh>
  );
}

function PhysicalMemorySpace({ frames, pageTable }: { frames: number; pageTable: Map<number, number | null> }) {
  const cols = Math.ceil(Math.sqrt(frames));
  const rows = Math.ceil(frames / cols);
  const spacing = 2.2;
  const startX = 15;
  const startZ = -((rows - 1) * spacing) / 2;

  // Invert map: physical frame -> virtual page
  const frameToPage = useMemo(() => {
    const map = new Map<number, number>();
    pageTable.forEach((frame, page) => {
      if (frame !== null && frame !== undefined) {
        map.set(frame, page);
      }
    });
    return map;
  }, [pageTable]);

  return (
    <group position={[startX, 0, 0]}>
      <Text
        position={[0, 10, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Physical RAM
      </Text>
      {Array.from({ length: frames }).map((_, i) => {
        const x = (i % cols) * spacing;
        const z = Math.floor(i / cols) * spacing + startZ;
        const virtualPage = frameToPage.get(i);
        
        return (
          <PhysicalFrame
            key={i}
            position={[x, 0, z]}
            frameNumber={i}
            virtualPage={virtualPage}
          />
        );
      })}
    </group>
  );
}

function PhysicalFrame({ 
  position, 
  frameNumber, 
  virtualPage 
}: { 
  position: [number, number, number]; 
  frameNumber: number;
  virtualPage?: number;
}) {
  const isOccupied = virtualPage !== undefined;
  const color = isOccupied ? "#22c55e" : "#334155";

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[1.8, isOccupied ? 2 : 0.3, 1.8]} />
      <meshStandardMaterial
        color={color}
        emissive={isOccupied ? "#16a34a" : "#1e293b"}
        emissiveIntensity={isOccupied ? 0.4 : 0.1}
        metalness={0.6}
        roughness={0.4}
      />
      {isOccupied && (
        <Text
          position={[0, 0, 0.95]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          V{virtualPage}
        </Text>
      )}
    </mesh>
  );
}

function ConnectionLines({ pageTable, virtualPages, physicalFrames }: {
  pageTable: Map<number, number | null>;
  virtualPages: number;
  physicalFrames: number;
}) {
  const cols = Math.ceil(Math.sqrt(virtualPages));
  const spacing = 2.2;
  const startXVirtual = -15;
  const startXPhysical = 15;
  const startZ = -((Math.ceil(virtualPages / cols) - 1) * spacing) / 2;

  const lines = useMemo(() => {
    const linesData: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];
    
    pageTable.forEach((frame, page) => {
      if (frame !== null && frame !== undefined) {
        const virtualX = (page % cols) * spacing + startXVirtual;
        const virtualZ = Math.floor(page / cols) * spacing + startZ;
        
        const physicalCols = Math.ceil(Math.sqrt(physicalFrames));
        const physicalX = (frame % physicalCols) * spacing + startXPhysical;
        const physicalZ = Math.floor(frame / physicalCols) * spacing + startZ;
        
        linesData.push({
          start: new THREE.Vector3(virtualX, 1, virtualZ),
          end: new THREE.Vector3(physicalX, 1, physicalZ)
        });
      }
    });
    
    return linesData;
  }, [pageTable, cols, spacing, startXVirtual, startXPhysical, startZ, physicalFrames]);

  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} start={line.start} end={line.end} />
      ))}
    </>
  );
}

function Line({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const points = useMemo(() => [start, end], [start, end]);
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" opacity={0.4} transparent linewidth={2} />
    </line>
  );
}

