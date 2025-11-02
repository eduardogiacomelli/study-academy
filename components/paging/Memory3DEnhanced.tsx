"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePagingStore } from "@/store/paging.store";

// Cores 3D com HEX para shaders
function getPidColor3D(pid: number) {
  const colors = [
    "#3b82f6", // blue - mais vibrante
    "#22c55e", // green - mais vibrante
    "#a855f7", // purple - mais vibrante
    "#f97316", // orange - mais vibrante
    "#ec4899", // pink - mais vibrante
    "#06b6d4", // cyan - mais vibrante
    "#f59e0b", // amber - mais vibrante
    "#10b981", // emerald - mais vibrante
  ];
  return colors[pid % colors.length];
}

export function Memory3DEnhanced() {
  const occupancy = usePagingStore((s) => s.frameOccupancy);
  const mmuFocus = usePagingStore((s) => s.mmuFocusFrame);
  const lastEvent = usePagingStore((s) => s.lastEvent);

  const cols = useMemo(() => {
    const n = occupancy.length;
    if (n >= 128) return 16;
    if (n >= 64) return 12;
    if (n >= 32) return 10;
    return 8;
  }, [occupancy.length]);

  return (
    <div className="h-[600px] rounded-2xl border overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />
      
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 30, 45]} fov={50} />

        {/* Iluminação premium */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
        <spotLight
          position={[0, 30, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        <Environment preset="city" />
        
        {/* Fog para profundidade */}
        <fog attach="fog" args={["#0f172a", 20, 80]} />

        <FramesMeshEnhanced
          cols={cols}
          occupancy={occupancy}
          highlight={new Set([...(lastEvent?.frames ?? []), ...(mmuFocus !== null ? [mmuFocus] : [])])}
        />

        {/* Ground plane com reflexão */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.9}
            roughness={0.1}
            opacity={0.5}
            transparent
          />
        </mesh>

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={20}
          maxDistance={80}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

function FramesMeshEnhanced({
  cols,
  occupancy,
  highlight,
}: {
  cols: number;
  occupancy: ({ pid: number; page: number } | null)[];
  highlight: Set<number>;
}) {
  const spacing = 1.3;
  const rows = Math.ceil(occupancy.length / cols);
  const baseX = -((cols - 1) * spacing * 0.5);
  const baseZ = -((rows - 1) * spacing * 0.5);

  // Geometrias compartilhadas otimizadas
  const geom = useMemo(() => new THREE.BoxGeometry(1, 0.7, 1), []);
  const roundedGeom = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 0.7, 1, 2, 2, 2);
    return g;
  }, []);

  return (
    <group>
      {occupancy.map((occ, idx) => {
        const x = baseX + (idx % cols) * spacing;
        const z = baseZ + Math.floor(idx / cols) * spacing;
        const isHi = highlight.has(idx);
        const isUsed = occ !== null;

        const color = isUsed ? getPidColor3D(occ.pid) : "#64748b";

        return (
          <FrameBlock
            key={idx}
            position={[x, 0, z]}
            color={color}
            index={idx}
            pid={occ?.pid}
            isHighlight={isHi}
            geometry={roundedGeom}
          />
        );
      })}
    </group>
  );
}

function FrameBlock({
  position,
  color,
  index,
  pid,
  isHighlight,
  geometry,
}: {
  position: [number, number, number];
  color: string;
  index: number;
  pid?: number;
  isHighlight: boolean;
  geometry: THREE.BoxGeometry;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Material melhorado com emissão
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.4,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: isHighlight ? 0.5 : 0.1,
    });
  }, [color, isHighlight]);

  // Animação suave
  useFrame((state) => {
    if (meshRef.current) {
      // Hover animation
      const targetY = isHighlight ? position[1] + 0.3 : position[1];
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
      
      // Rotação suave para highlights
      if (isHighlight) {
        meshRef.current.rotation.y += 0.02;
      }
    }

    // Ring pulse animation
    if (ringRef.current && isHighlight) {
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Main block */}
      <mesh 
        ref={meshRef} 
        geometry={geometry} 
        material={material}
        castShadow
        receiveShadow
      >
        {/* Label texture */}
        <FrameLabelTexture index={index} pid={pid} color={color} />
      </mesh>

      {/* Highlight ring com glow */}
      {isHighlight && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[0.65, 0.08, 8, 32]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      )}

      {/* Glow effect para highlights */}
      {isHighlight && (
        <pointLight 
          position={[0, 0.5, 0]} 
          intensity={0.5} 
          distance={3}
          color="#f59e0b"
        />
      )}
    </group>
  );
}

function FrameLabelTexture({ index, pid, color }: { index: number; pid?: number; color: string }) {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 64;
    const ctx = c.getContext("2d")!;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, c.height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, adjustColor(color, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, c.width, c.height);

    // Border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, c.width, c.height);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (pid !== undefined) {
      ctx.fillText(`P${pid}`, c.width / 2, c.height / 3);
      ctx.font = "16px monospace";
      ctx.fillText(`F${index}`, c.width / 2, (c.height * 2) / 3);
    } else {
      ctx.fillText(`F${index}`, c.width / 2, c.height / 2);
    }

    return c;
  }, [index, pid, color]);

  const texture = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);

  return (
    <sprite position={[0, 0.6, 0]} scale={[1, 0.5, 1]}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}

// Helper: ajusta cor (escurece ou clareia)
function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

