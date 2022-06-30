export type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PickField<T, K extends string> = T extends Record<K, any> ? T[K] : never;
