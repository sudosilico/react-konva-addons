/**
 * Linear interpolation between two values
 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Clamps the value between [0, 1].
 */
export function clamp01(value: number) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/**
 * Linear interpolation between two values, clamping the t input between [0, 1].
 */
export function lerp01(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}

/**
 * Inverse linear interpolation of a value over a range.
 */
export function inverseLerp(val: number, a: number, b: number) {
  return (val - a) / (b - a);
}

/**
 * Remaps a value from one range to another.
 * @param val The value to remap
 * @param a1 The start of the first range
 * @param b1 The end of the first range
 * @param a2 The start of the second range
 * @param b2 The end of the second range
 */
export function remap(val: number, a1: number, b1: number, a2: number, b2: number) {
  return a2 + (b2 - a2) * ((val - a1) / (b1 - a1));
}

/**
 * Remaps a value from one range to another, clamping the intermediate t value to the
 * range [0, 1], ensuring that the result is within the second range.
 * @param val The value to remap
 * @param a1 The start of the first range
 * @param b1 The end of the first range
 * @param a2 The start of the second range
 * @param b2 The end of the second range
 */
export function remapClamped(val: number, a1: number, b1: number, a2: number, b2: number) {
  return lerp01(a2, b2, (val - a1) / (b1 - a1));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PickField<T, K extends string> = T extends Record<K, any> ? T[K] : never;
