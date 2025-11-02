"use client";

import { create } from "zustand";
import { isPowerOfTwo } from "@/lib/bytes";

export type FrameIndex = number;
export type PageIndex = number;

/**
 * Representa um processo na memória
 */
export type Process = {
  pid: number;              // Identificador único do processo
  sizeBytes: number;        // Tamanho total em bytes
  pagesCount: number;       // Número de páginas alocadas
  pageTable: number[];      // Mapeamento: índice da página → índice do quadro
};

/**
 * Informação sobre quem ocupa cada quadro
 */
export type FrameOccupant = { pid: number; page: number } | null;

/**
 * Configuração do sistema de paginação
 */
export type PagingConfig = {
  physicalMemoryBytes: number;  // Tamanho total da memória física (potência de 2)
  pageSizeBytes: number;        // Tamanho de cada página/quadro (potência de 2)
  maxProcessBytes: number;      // Tamanho máximo permitido para um processo
};

/**
 * Eventos do sistema (para animações)
 */
export type PagingEvent =
  | { type: "alloc"; frames: number[]; pid: number; at: number }
  | { type: "free"; frames: number[]; pid: number; at: number }
  | null;

/**
 * Estado do simulador de paginação
 */
type PagingState = {
  // ==================== ESTADO ====================
  config: PagingConfig;
  physicalMemory: Uint8Array;       // Memória física real
  frameOccupancy: FrameOccupant[];  // Quem ocupa cada quadro
  processes: Record<number, Process>; // Processos ativos (key = PID)
  
  // ==================== GAMIFICAÇÃO ====================
  score: number;
  achievements: string[];
  lastEvent: PagingEvent;
  
  // ==================== MMU FOCUS (para highlights visuais) ====================
  mmuFocusFrame: number | null;
  mmuFocusAt: number | null;
  
  // ==================== GETTERS (derivados do estado) ====================
  framesCount: () => number;
  freeFrames: () => number[];
  freePercent: () => number;
  
  // ==================== AÇÕES ====================
  applyConfig: (cfg: Partial<PagingConfig>) => void;
  createProcess: (pid: number, sizeBytes: number) => void;
  removeProcess: (pid: number) => void;
  clearAll: () => void;
  setMMUFocus: (frameIndex: number | null) => void;
  award: (description: string, points?: number) => void;
};

/**
 * Valida configuração do sistema
 */
function validateConfig(c: PagingConfig) {
  if (!isPowerOfTwo(c.physicalMemoryBytes))
    throw new Error("Tamanho da memória física deve ser potência de 2.");
  if (!isPowerOfTwo(c.pageSizeBytes))
    throw new Error("Tamanho da página deve ser potência de 2.");
  if (!isPowerOfTwo(c.maxProcessBytes))
    throw new Error("Tamanho máximo do processo deve ser potência de 2.");
  if (c.physicalMemoryBytes % c.pageSizeBytes !== 0)
    throw new Error("Memória física deve ser múltiplo do tamanho da página.");
  if (c.pageSizeBytes > c.physicalMemoryBytes)
    throw new Error("Tamanho da página não pode ser maior que a memória física.");
  if (c.maxProcessBytes > c.physicalMemoryBytes)
    throw new Error("Tamanho máximo do processo não pode exceder a memória física.");
}

/**
 * Cria estado vazio para uma configuração
 */
function emptyState(c: PagingConfig) {
  const frames = c.physicalMemoryBytes / c.pageSizeBytes;
  return {
    physicalMemory: new Uint8Array(c.physicalMemoryBytes),
    frameOccupancy: Array<FrameOccupant>(frames).fill(null),
    processes: {} as Record<number, Process>,
  };
}

/**
 * Store principal de paginação usando Zustand
 */
export const usePagingStore = create<PagingState>((set, get) => {
  // Configuração inicial: 32 KB de RAM, páginas de 256 B = 128 quadros
  const initialConfig: PagingConfig = {
    physicalMemoryBytes: 32768,  // 32 KB
    pageSizeBytes: 256,          // 256 B
    maxProcessBytes: 8192,       // 8 KB
  };
  
  validateConfig(initialConfig);
  const base = emptyState(initialConfig);

  return {
    // ==================== ESTADO INICIAL ====================
    config: initialConfig,
    ...base,
    score: 0,
    achievements: [],
    lastEvent: null,
    mmuFocusFrame: null,
    mmuFocusAt: null,

    // ==================== GETTERS ====================
    
    framesCount: () => get().frameOccupancy.length,
    
    freeFrames: () => {
      const occ = get().frameOccupancy;
      const free: number[] = [];
      for (let i = 0; i < occ.length; i++) {
        if (occ[i] === null) free.push(i);
      }
      return free;
    },
    
    freePercent: () => {
      const free = get().freeFrames().length;
      const total = get().framesCount();
      return total === 0 ? 0 : Math.round((free / total) * 100);
    },

    // ==================== AÇÕES ====================
    
    /**
     * Aplica nova configuração (reseta todo o sistema)
     */
    applyConfig: (cfg) => {
      const prev = get().config;
      const next: PagingConfig = {
        physicalMemoryBytes: cfg.physicalMemoryBytes ?? prev.physicalMemoryBytes,
        pageSizeBytes: cfg.pageSizeBytes ?? prev.pageSizeBytes,
        maxProcessBytes: cfg.maxProcessBytes ?? prev.maxProcessBytes,
      };
      
      validateConfig(next);
      const cleared = emptyState(next);
      
      set({
        config: next,
        ...cleared,
        score: 0,
        achievements: [],
        lastEvent: null,
        mmuFocusFrame: null,
        mmuFocusAt: null,
      });
    },

    /**
     * Limpa toda a memória (remove todos os processos)
     */
    clearAll: () => {
      const c = get().config;
      const cleared = emptyState(c);
      set({
        ...cleared,
        score: 0,
        achievements: [],
        lastEvent: null,
        mmuFocusFrame: null,
        mmuFocusAt: null,
      });
    },

    /**
     * Cria um novo processo (aloca memória)
     */
    createProcess: (pid, sizeBytes) => {
      const { config, frameOccupancy, physicalMemory, processes } = get();
      
      // ═══════════════════════════════════════════════════════════════
      // VALIDAÇÕES
      // ═══════════════════════════════════════════════════════════════
      if (pid in processes)
        throw new Error(`PID ${pid} já existe.`);
      if (!Number.isInteger(pid) || pid <= 0)
        throw new Error("PID deve ser inteiro positivo.");
      if (!isPowerOfTwo(sizeBytes))
        throw new Error("Tamanho do processo deve ser potência de 2.");
      if (sizeBytes > config.maxProcessBytes)
        throw new Error(`Tamanho do processo excede o máximo (${config.maxProcessBytes} B).`);

      // ═══════════════════════════════════════════════════════════════
      // CÁLCULO DE PÁGINAS NECESSÁRIAS
      // ═══════════════════════════════════════════════════════════════
      const pageSize = config.pageSizeBytes;
      const pagesCount = Math.ceil(sizeBytes / pageSize);
      
      // ═══════════════════════════════════════════════════════════════
      // VERIFICAÇÃO DE MEMÓRIA DISPONÍVEL
      // ═══════════════════════════════════════════════════════════════
      const free = get().freeFrames();
      if (free.length < pagesCount)
        throw new Error("Memória insuficiente para alocar o processo.");

      // ═══════════════════════════════════════════════════════════════
      // INICIALIZAÇÃO DA MEMÓRIA LÓGICA (com valores aleatórios)
      // ═══════════════════════════════════════════════════════════════
      const logical = new Uint8Array(pagesCount * pageSize);
      crypto.getRandomValues(logical);

      // ═══════════════════════════════════════════════════════════════
      // CONSTRUÇÃO DA TABELA DE PÁGINAS + CÓPIA PARA MEMÓRIA FÍSICA
      // ═══════════════════════════════════════════════════════════════
      const selectedFrames = free.slice(0, pagesCount);
      const pageTable: number[] = [];

      for (let p = 0; p < pagesCount; p++) {
        const frameIndex = selectedFrames[p];
        pageTable.push(frameIndex);
        
        // Copia dados da página lógica para o quadro físico
        const frameStart = frameIndex * pageSize;
        const srcStart = p * pageSize;
        
        // Zera o quadro primeiro (limpa dados residuais)
        physicalMemory.fill(0, frameStart, frameStart + pageSize);
        
        // Copia os bytes da página lógica
        physicalMemory.set(
          logical.subarray(srcStart, srcStart + pageSize),
          frameStart
        );
      }

      // ═══════════════════════════════════════════════════════════════
      // ATUALIZAÇÃO DO ESTADO: ocupação dos quadros
      // ═══════════════════════════════════════════════════════════════
      const newOcc = frameOccupancy.slice();
      for (let p = 0; p < pagesCount; p++) {
        newOcc[selectedFrames[p]] = { pid, page: p };
      }

      // ═══════════════════════════════════════════════════════════════
      // CRIAÇÃO DO OBJETO PROCESS e ATUALIZAÇÃO DO ESTADO
      // ═══════════════════════════════════════════════════════════════
      const proc: Process = { pid, sizeBytes, pagesCount, pageTable };
      const newScore = get().score + pagesCount;

      set({
        physicalMemory,
        frameOccupancy: newOcc,
        processes: { ...processes, [pid]: proc },
        score: newScore,
        achievements:
          newScore >= 16
            ? Array.from(new Set([...get().achievements, "Primeiros 16 quadros alocados!"]))
            : get().achievements,
        lastEvent: { type: "alloc", frames: selectedFrames, pid, at: Date.now() },
      });
    },

    /**
     * Remove um processo (libera memória)
     */
    removeProcess: (pid) => {
      const { processes, frameOccupancy, physicalMemory, config } = get();
      const proc = processes[pid];
      
      if (!proc) return; // Processo não existe

      const pageSize = config.pageSizeBytes;
      const newOcc = frameOccupancy.slice();

      // ═══════════════════════════════════════════════════════════════
      // LIBERAÇÃO DE QUADROS
      // ═══════════════════════════════════════════════════════════════
      for (const frameIndex of proc.pageTable) {
        // Marca quadro como livre
        newOcc[frameIndex] = null;
        
        // Zera os bytes do quadro (segurança/privacidade)
        const start = frameIndex * pageSize;
        physicalMemory.fill(0, start, start + pageSize);
      }

      // ═══════════════════════════════════════════════════════════════
      // REMOÇÃO DO PROCESSO DO DICIONÁRIO
      // ═══════════════════════════════════════════════════════════════
      const { [pid]: _omit, ...rest } = processes;
      const newScore = Math.max(0, get().score - proc.pagesCount);

      set({
        frameOccupancy: newOcc,
        physicalMemory,
        processes: rest,
        score: newScore,
        lastEvent: { type: "free", frames: proc.pageTable, pid, at: Date.now() },
        mmuFocusFrame: null,
        mmuFocusAt: null,
      });
    },

    /**
     * Define qual quadro está em foco (para highlight visual)
     */
    setMMUFocus: (frameIndex) => {
      set({
        mmuFocusFrame: frameIndex,
        mmuFocusAt: frameIndex === null ? null : Date.now(),
      });
    },

    /**
     * Adiciona conquista e pontos
     */
    award: (desc, pts = 1) => {
      set({
        achievements: Array.from(new Set([...get().achievements, desc])),
        score: get().score + pts,
      });
    },
  };
});

