import { Signal } from "./signals/useSignal";

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp01(value: number) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function lerp01(a: number, b: number, t: number) {
  return lerp(a, b, clamp01(t));
}

export function inverseLerp(val: number, a: number, b: number) {
  return (val - a) / (b - a);
}

/**
 * Remaps a value from one range to another.
 * Equivalent to lerp(a2, b2, inverseLerp(val, a1, b1))
 */
export function remap(val: number, a1: number, b1: number, a2: number, b2: number) {
  return a2 + (b2 - a2) * ((val - a1) / (b1 - a1));
}

export function remapClamped(val: number, a1: number, b1: number, a2: number, b2: number) {
  return lerp01(a2, b2, (val - a1) / (b1 - a1));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PickField<T, K extends string> = T extends Record<K, any> ? T[K] : never;
