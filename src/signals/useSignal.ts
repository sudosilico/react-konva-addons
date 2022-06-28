import { useRef, useState } from "react";

type SignalListener<T> = ((value: T) => void) | null;

export interface ISignalBase {
  id: () => number;
  writable: boolean;
}

export interface ReadOnlySignal<T> extends ISignalBase {
  get: () => T;
  addListener: (listener: (value: T) => void) => number;
  removeListenerAt: (index: number) => void;
  writable: boolean;
}

export interface Signal<T> extends ReadOnlySignal<T> {
  set: (value: T) => void;
  writable: boolean;
}

export interface SignalRef<T> {
  value: T;
  listeners: SignalListener<T>[];
  signal?: ReadOnlySignal<T>;
  id: number;
}

export type SignalDependencyList = ISignalBase[];

function createSignalFromRef<T>(ref: React.MutableRefObject<SignalRef<T>>) {
  const get = () => ref.current.value;

  const set = (value: T) => {
    ref.current.value = value;
    const listeners = ref.current.listeners;

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      if (listener != null) {
        listener(value);
      }
    }
  };

  const addListener = (listener: (value: T) => void) => {
    const listeners = ref.current.listeners;

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === null) {
        listeners[i] = listener;
        return i;
      }
    }

    listeners.push(listener);
    return listeners.length - 1;
  };

  const removeListenerAt = (index: number) => {
    ref.current.listeners[index] = null;
  };

  const id = () => {
    return ref.current.id;
  };

  const signal = {
    get,
    set,
    addListener,
    removeListenerAt,
    id,
    writable: true,
  };

  return signal as Signal<T>;
}

export function setSignal<T>(signal: Signal<T>, value: T) {
  signal.set(value);
}

function createDerivedSignalFromRef<T>(
  ref: React.MutableRefObject<SignalRef<T>>,
  getFunc: () => T,
  deps?: SignalDependencyList,
) {
  const addListener = (listener: (value: T) => void) => {
    const listeners = ref.current.listeners;

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === null) {
        listeners[i] = listener;
        return i;
      }
    }

    listeners.push(listener);
    return listeners.length - 1;
  };

  const removeListenerAt = (index: number) => {
    ref.current.listeners[index] = null;
  };

  const id = () => {
    return ref.current.id;
  };

  const signal = {
    get: getFunc,
    addListener,
    removeListenerAt,
    id,
    writable: false,
  };

  return signal as ReadOnlySignal<T>;
}

let currentSignalID = 0;

function nextSignalID() {
  return currentSignalID++;
}

const isFunction = <T>(value: T | (() => T)): value is () => T => typeof value === "function";

export function useSignal<T>(initial: T): Signal<T>;

export function useSignal<T>(initial: () => T, deps: SignalDependencyList): ReadOnlySignal<T>;

export function useSignal<T>(
  initial: T | (() => T),
  deps?: SignalDependencyList,
): Signal<T> | ReadOnlySignal<T> {
  const isDerivedSignal = isFunction<T>(initial);
  const initialValue = isDerivedSignal ? initial() : initial;

  const ref = useRef<SignalRef<T>>({
    value: initialValue,
    listeners: [],
    id: -1,
  });

  if (ref.current.id === -1) {
    ref.current.id = nextSignalID();
  }

  // use useState so that we only create the signal once
  const [signal] = useState(() => {
    if (isDerivedSignal) {
      return createDerivedSignalFromRef(ref, initial, deps);
    } else {
      return createSignalFromRef(ref);
    }
  });

  ref.current.signal = signal;

  return signal;
}
