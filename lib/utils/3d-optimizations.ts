import * as THREE from "three";

/**
 * Shared geometries for 3D components
 * These are created once and reused across all components to save memory
 */

// Box geometries
export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const smallBoxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
export const tallBoxGeometry = new THREE.BoxGeometry(0.8, 2, 0.8);

// Sphere geometries
export const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
export const smallSphereGeometry = new THREE.SphereGeometry(0.05, 8, 8);

/**
 * Material factory functions
 * Use these to create materials with consistent properties
 */

export function createStandardMaterial(color: string, options?: {
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: options?.metalness ?? 0.3,
    roughness: options?.roughness ?? 0.7,
    emissive: options?.emissive ?? "#000000",
    emissiveIntensity: options?.emissiveIntensity ?? 0,
  });
}

export function createEmissiveMaterial(color: string, intensity: number = 2) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
  });
}

/**
 * Animation helpers
 */

export function smoothRotation(current: number, target: number, delta: number, speed: number = 2) {
  const diff = target - current;
  return current + diff * delta * speed;
}

export function oscillate(time: number, amplitude: number = 0.1, frequency: number = 2) {
  return Math.sin(time * frequency) * amplitude;
}

/**
 * Performance utilities
 */

export function shouldAnimate(isActive: boolean, frameDelta: number, maxDelta: number = 0.1) {
  // Skip animation if frame delta is too high (low FPS)
  return isActive && frameDelta < maxDelta;
}

