"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { usePagingStore } from "@/store/paging.store";

// Cores consistentes por PID (mesmas do MemoryGrid)
function getPidColor3D(pid: number) {
  const colors = [
    "#3b82f6", // blue
    "#22c55e", // green
    "#a855f7", // purple
    "#f97316", // orange
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f59e0b", // amber
    "#10b981", // emerald
  ];
  return colors[pid % colors.length];
}

export function Memory3D() {
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
    <div className="h-[500px] rounded-2xl border overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 25, 40]} fov={55} />

        {/* Iluminação simplificada */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.0} />

        <Environment preset="night" />

        <FramesMesh
          cols={cols}
          occupancy={occupancy}
          highlight={new Set([...(lastEvent?.frames ?? []), ...(mmuFocus !== null ? [mmuFocus] : [])])}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

function FramesMesh({
  cols,
  occupancy,
  highlight,
}: {
  cols: number;
  occupancy: ({ pid: number; page: number } | null)[];
  highlight: Set<number>;
}) {
  const spacing = 1.2;
  const rows = Math.ceil(occupancy.length / cols);
  const baseX = -((cols - 1) * spacing * 0.5);
  const baseZ = -((rows - 1) * spacing * 0.5);

  // Geometria e materiais compartilhados
  const geom = useMemo(() => new THREE.BoxGeometry(1, 0.6, 1), []);
  const matFree = useMemo(() => new THREE.MeshStandardMaterial({ color: "#64748b" }), []);

  return (
    <group>
      {occupancy.map((occ, idx) => {
        const x = baseX + (idx % cols) * spacing;
        const z = baseZ + Math.floor(idx / cols) * spacing;
        const isHi = highlight.has(idx);
        const isUsed = occ !== null;

        // Cor do processo ou cinza se livre
        const color = isUsed ? getPidColor3D(occ.pid) : "#64748b";

        return (
          <group key={idx} position={[x, 0, z]}>
            <mesh geometry={geom}>
              <meshStandardMaterial color={color} />
            </mesh>

            {/* Label simplificada */}
            <FrameLabel index={idx} pid={occ?.pid} color={color} />

            {/* Ring para highlight */}
            {isHi && (
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.15, 0.65, 1.15]} />
                <meshBasicMaterial color="#f59e0b" wireframe />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function FrameLabel({ index, pid, color }: { index: number; pid?: number; color: string }) {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 64;
    const ctx = c.getContext("2d")!;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (pid !== undefined) {
      ctx.fillText(`P${pid}`, c.width / 2, c.height / 3);
      ctx.font = "14px monospace";
      ctx.fillText(`F${index}`, c.width / 2, (c.height * 2) / 3);
    } else {
      ctx.fillText(`F${index}`, c.width / 2, c.height / 2);
    }

    return c;
  }, [index, pid, color]);

  const texture = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);

  return (
    <sprite position={[0, 0.6, 0]} scale={[0.9, 0.45, 1]}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}

