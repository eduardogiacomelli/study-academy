/**
 * Utilitários para manipulação de bytes e potências de 2
 */

// Valores comuns de potências de 2 em bytes
export const POW2_BYTES = [
  128,    // 128 B
  256,    // 256 B
  512,    // 512 B
  1024,   // 1 KB
  2048,   // 2 KB
  4096,   // 4 KB
  8192,   // 8 KB
  16384,  // 16 KB
  32768,  // 32 KB
  65536,  // 64 KB
  131072, // 128 KB
];

/**
 * Verifica se um número é potência de 2
 * Usa bit manipulation: potências de 2 têm apenas um bit 1
 * Exemplo: 8 = 0b1000, 8-1 = 0b0111, 8 & 7 = 0
 */
export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Formata bytes em unidades legíveis
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes % 1024 === 0 ? 0 : 1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Converte string formatada para bytes
 */
export function parseBytes(str: string): number {
  const match = str.match(/^(\d+(?:\.\d+)?)\s*([KMGT]?B?)$/i);
  if (!match) throw new Error("Formato inválido");
  
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  
  const multipliers: Record<string, number> = {
    "B": 1,
    "KB": 1024,
    "K": 1024,
    "MB": 1024 * 1024,
    "M": 1024 * 1024,
    "GB": 1024 * 1024 * 1024,
    "G": 1024 * 1024 * 1024,
  };
  
  return value * (multipliers[unit] || 1);
}

/**
 * Calcula log2 de um número (útil para calcular bits necessários)
 */
export function log2(n: number): number {
  return Math.log2(n);
}

/**
 * Retorna o próximo múltiplo de align maior ou igual a n
 */
export function alignUp(n: number, align: number): number {
  return Math.ceil(n / align) * align;
}

/**
 * Retorna o múltiplo de align menor ou igual a n
 */
export function alignDown(n: number, align: number): number {
  return Math.floor(n / align) * align;
}

