"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Environment, Line } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface PageAccess {
  pageId: number;
  timestamp: number;
  inWorkingSet: boolean;
}

interface WorkingSetData {
  time: number;
  size: number;
  pages: Set<number>;
}

export function WorkingSetSimulator3D() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [delta, setDelta] = useState([5]); // Working set window (Δ)
  const [accessHistory, setAccessHistory] = useState<PageAccess[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [workingSet, setWorkingSet] = useState<Set<number>>(new Set());
  const [wsHistory, setWsHistory] = useState<WorkingSetData[]>([]);
  const [pageFaultCount, setPageFaultCount] = useState(0);
  const [thrashingDetected, setThrashingDetected] = useState(false);

  const totalPages = 16;
  const physicalFrames = 8;

  // Simular padrão de acesso com fases (localidade temporal e espacial)
  const generateAccessPattern = () => {
    const pattern: number[] = [];
    
    // Fase 1: Loop intenso em páginas 0-3 (forte localidade)
    for (let i = 0; i < 20; i++) {
      pattern.push(Math.floor(Math.random() * 4));
    }
    
    // Transição
    pattern.push(4, 5, 6);
    
    // Fase 2: Acesso sequencial 4-8
    for (let i = 4; i < 9; i++) {
      pattern.push(i);
      pattern.push(i); // Repetição (temporal locality)
    }
    
    // Fase 3: Random (working set maior)
    for (let i = 0; i < 15; i++) {
      pattern.push(Math.floor(Math.random() * 12));
    }
    
    // Fase 4: Thrashing simulation (acessa muitas páginas)
    for (let i = 0; i < 20; i++) {
      pattern.push(Math.floor(Math.random() * totalPages));
    }
    
    return pattern;
  };

  const accessPattern = useMemo(() => generateAccessPattern(), []);

  const reset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAccessHistory([]);
    setWorkingSet(new Set());
    setWsHistory([]);
    setPageFaultCount(0);
    setThrashingDetected(false);
    toast.success("Simulação reiniciada!");
  };

  const calculateWorkingSet = (time: number, windowSize: number): Set<number> => {
    const ws = new Set<number>();
    const startTime = Math.max(0, time - windowSize);
    
    accessHistory.forEach(access => {
      if (access.timestamp >= startTime && access.timestamp <= time) {
        ws.add(access.pageId);
      }
    });
    
    return ws;
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= accessPattern.length - 1) {
          setIsPlaying(false);
          toast.success("Simulação completa!");
          return prev;
        }

        const newTime = prev + 1;
        const pageId = accessPattern[newTime];
        
        // Calcular working set
        const ws = calculateWorkingSet(newTime, delta[0]);
        
        // Detectar page fault (página não estava no WS anterior)
        const wasPageFault = !workingSet.has(pageId);
        if (wasPageFault) {
          setPageFaultCount(pf => pf + 1);
        }

        // Adicionar ao histórico
        const newAccess: PageAccess = {
          pageId,
          timestamp: newTime,
          inWorkingSet: ws.has(pageId)
        };

        setAccessHistory(prev => [...prev, newAccess]);
        setWorkingSet(ws);
        
        // Salvar WS no histórico
        setWsHistory(prev => [
          ...prev,
          { time: newTime, size: ws.size, pages: new Set(ws) }
        ]);

        // Detectar thrashing (WS > frames disponíveis)
        if (ws.size > physicalFrames) {
          setThrashingDetected(true);
          toast.error("⚠️ Thrashing detectado!", { duration: 2000 });
        }

        return newTime;
      });
    }, 1000 / speed[0]);

    return () => clearInterval(interval);
  }, [isPlaying, speed, delta, accessPattern, workingSet, accessHistory]);

  const currentPhase = useMemo(() => {
    if (currentTime < 20) return { name: "Fase 1: Loop Local", color: "#4ade80" };
    if (currentTime < 33) return { name: "Fase 2: Sequencial", color: "#60a5fa" };
    if (currentTime < 48) return { name: "Fase 3: Random", color: "#fbbf24" };
    return { name: "Fase 4: Thrashing", color: "#ef4444" };
  }, [currentTime]);

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Simulador de Working Set 3D
            </h3>
            <p className="text-slate-400">
              Visualização do modelo de Working Set de Peter Denning (1968)
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-indigo-500 hover:bg-indigo-600"
              disabled={currentTime >= accessPattern.length - 1}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </>
              )}
            </Button>
            
            <Button
              onClick={reset}
              variant="outline"
              className="border-slate-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Velocidade */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400">Velocidade</span>
              <Badge variant="outline">{speed[0]}x</Badge>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={0.5}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Delta (Δ) */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400">Window Δ</span>
              <Badge variant="outline">{delta[0]} steps</Badge>
            </div>
            <Slider
              value={delta}
              onValueChange={setDelta}
              min={3}
              max={15}
              step={1}
              className="w-full"
            />
          </div>

          {/* Fase atual */}
          <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
            <span className="text-sm text-slate-400">Fase:</span>
            <Badge style={{ backgroundColor: currentPhase.color }}>
              {currentPhase.name}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Tempo</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {currentTime} / {accessPattern.length}
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">WS Size</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {workingSet.size}
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-green-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-400">Frames</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {physicalFrames}
          </div>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-yellow-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-400">Page Faults</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {pageFaultCount}
          </div>
        </Card>

        <Card className={`bg-slate-900/50 backdrop-blur-sm p-4 ${
          thrashingDetected ? 'border-red-500/50 animate-pulse' : 'border-slate-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`w-4 h-4 ${thrashingDetected ? 'text-red-400' : 'text-slate-400'}`} />
            <span className="text-xs text-slate-400">Thrashing</span>
          </div>
          <div className={`text-2xl font-bold ${thrashingDetected ? 'text-red-400' : 'text-slate-400'}`}>
            {thrashingDetected ? 'SIM' : 'NÃO'}
          </div>
        </Card>
      </div>

      {/* Visualização 3D */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
        <div className="h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 15, 25]} fov={60} />
            
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
            <pointLight position={[-10, 10, -10]} intensity={0.6} color="#4f46e5" />
            <spotLight position={[0, 25, 0]} angle={0.5} penumbra={1} intensity={0.8} color="#8b5cf6" />
            
            <Environment preset="night" />
            <fog attach="fog" args={["#0f172a", 20, 60]} />

            {/* Working Set Visualization */}
            <WorkingSetVisual
              workingSet={workingSet}
              totalPages={totalPages}
              physicalFrames={physicalFrames}
              currentPage={accessPattern[currentTime]}
              accessHistory={accessHistory.slice(-20)}
            />

            {/* Ground */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </mesh>

            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2.1}
              minDistance={15}
              maxDistance={50}
            />
          </Canvas>
        </div>

        {/* Legenda */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-slate-300">No Working Set</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span className="text-slate-300">Página Atual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-600 rounded" />
            <span className="text-slate-300">Fora do WS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded animate-pulse" />
            <span className="text-slate-300">Thrashing (WS {'>'} Frames)</span>
          </div>
        </div>
      </Card>

      {/* Gráfico de Working Set Size ao longo do tempo */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-indigo-500/20 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Evolução do Working Set Size
        </h4>
        <WorkingSetGraph wsHistory={wsHistory} physicalFrames={physicalFrames} />
      </Card>
    </div>
  );
}

function WorkingSetVisual({
  workingSet,
  totalPages,
  physicalFrames,
  currentPage,
  accessHistory
}: {
  workingSet: Set<number>;
  totalPages: number;
  physicalFrames: number;
  currentPage: number;
  accessHistory: PageAccess[];
}) {
  const cols = 4;
  const rows = Math.ceil(totalPages / cols);
  const spacing = 3;

  return (
    <group>
      {/* Título */}
      <Text
        position={[0, 8, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Working Set Model
      </Text>

      {/* Physical Frames Indicator */}
      <Text
        position={[10, 6, 0]}
        fontSize={0.6}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        Physical Frames: {physicalFrames}
      </Text>

      {/* Páginas */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const x = (i % cols) * spacing - ((cols - 1) * spacing) / 2;
        const z = Math.floor(i / cols) * spacing - ((rows - 1) * spacing) / 2;
        const inWS = workingSet.has(i);
        const isCurrent = i === currentPage;
        const thrashing = workingSet.size > physicalFrames;

        return (
          <PageCube
            key={i}
            position={[x, 0, z]}
            pageId={i}
            inWorkingSet={inWS}
            isCurrent={isCurrent}
            thrashing={thrashing}
          />
        );
      })}

      {/* Access Trail (últimos 20 acessos) */}
      {accessHistory.length > 1 && (
        <AccessTrail accessHistory={accessHistory} cols={cols} rows={rows} spacing={spacing} />
      )}
    </group>
  );
}

function PageCube({
  position,
  pageId,
  inWorkingSet,
  isCurrent,
  thrashing
}: {
  position: [number, number, number];
  pageId: number;
  inWorkingSet: boolean;
  isCurrent: boolean;
  thrashing: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (isCurrent) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 1.5;
        meshRef.current.rotation.y += 0.03;
      } else {
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          inWorkingSet ? 1 : 0.3,
          0.1
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      }
    }
  });

  const color = isCurrent
    ? "#fbbf24"
    : inWorkingSet
    ? thrashing
      ? "#ef4444"
      : "#22c55e"
    : "#475569";

  const emissive = isCurrent
    ? "#f59e0b"
    : inWorkingSet
    ? thrashing
      ? "#dc2626"
      : "#16a34a"
    : "#1e293b";

  const height = inWorkingSet ? 2 : 0.5;

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={isCurrent ? 0.8 : inWorkingSet ? 0.5 : 0.2}
        metalness={0.7}
        roughness={0.3}
      />
      <Text
        position={[0, 0, 1.05]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {pageId}
      </Text>
    </mesh>
  );
}

function AccessTrail({
  accessHistory,
  cols,
  rows,
  spacing
}: {
  accessHistory: PageAccess[];
  cols: number;
  rows: number;
  spacing: number;
}) {
  const points = useMemo(() => {
    return accessHistory.map((access, idx) => {
      const i = access.pageId;
      const x = (i % cols) * spacing - ((cols - 1) * spacing) / 2;
      const z = Math.floor(i / cols) * spacing - ((rows - 1) * spacing) / 2;
      const y = 3 + idx * 0.1; // Trail ascendente
      return new THREE.Vector3(x, y, z);
    });
  }, [accessHistory, cols, rows, spacing]);

  if (points.length < 2) return null;

  return (
    <Line
      points={points}
      color="#8b5cf6"
      lineWidth={2}
      opacity={0.6}
      transparent
    />
  );
}

function WorkingSetGraph({
  wsHistory,
  physicalFrames
}: {
  wsHistory: WorkingSetData[];
  physicalFrames: number;
}) {
  if (wsHistory.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-500">
        Aguardando dados da simulação...
      </div>
    );
  }

  const maxSize = Math.max(...wsHistory.map(ws => ws.size), physicalFrames);
  const width = 800;
  const height = 200;
  const padding = 40;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="bg-slate-950/50 rounded-lg">
      {/* Grid lines */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = padding + (i * (height - 2 * padding)) / 4;
        return (
          <line
            key={i}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="4"
          />
        );
      })}

      {/* Physical frames threshold line */}
      <line
        x1={padding}
        y1={height - padding - (physicalFrames / maxSize) * (height - 2 * padding)}
        x2={width - padding}
        y2={height - padding - (physicalFrames / maxSize) * (height - 2 * padding)}
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="8 4"
      />

      {/* Working set size line */}
      <polyline
        points={wsHistory
          .map((ws, idx) => {
            const x = padding + (idx / (wsHistory.length - 1)) * (width - 2 * padding);
            const y = height - padding - (ws.size / maxSize) * (height - 2 * padding);
            return `${x},${y}`;
          })
          .join(" ")}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Labels */}
      <text x={padding - 10} y={padding} fill="#94a3b8" fontSize="12" textAnchor="end">
        {maxSize}
      </text>
      <text x={padding - 10} y={height - padding} fill="#94a3b8" fontSize="12" textAnchor="end">
        0
      </text>
      <text
        x={width - padding}
        y={height - padding - (physicalFrames / maxSize) * (height - 2 * padding) - 5}
        fill="#ef4444"
        fontSize="12"
        textAnchor="end"
      >
        Physical Frames ({physicalFrames})
      </text>
    </svg>
  );
}

