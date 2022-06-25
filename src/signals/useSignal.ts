import { useRef, useState } from "react";

type SignalListener<T> = ((value: T) => void) | null;

export interface Signal<T> {
  get: () => T;
  set: (value: T) => void;
  setQuietly: (value: T) => void;
  addListener: (listener: (value: T) => void) => number;
  removeListenerAt: (index: number) => void;
  id: () => number;
}

export interface SignalRef<T> {
  value: T;
  listeners: SignalListener<T>[];
  signal?: Signal<T>;
  id: number;
}

function CreateSignal<T>(ref: React.MutableRefObject<SignalRef<T>>) {
  return {
    get: () => ref.current.value,
    set: (value: T) => {
      ref.current.value = value;
      const listeners = ref.current.listeners;

      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        if (listener != null) {
          listener(value);
        }
      }
    },
    setQuietly: (value: T) => {
      ref.current.value = value;
    },
    listeners: [],
    addListener: (listener: (value: T) => void) => {
      const listeners = ref.current.listeners;

      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === null) {
          listeners[i] = listener;
          return i;
        }
      }

      listeners.push(listener);
      return listeners.length - 1;
    },
    removeListenerAt: (index: number) => {
      ref.current.listeners[index] = null;
    },
    id: () => {
      return ref.current.id;
    },
  };
}

let currentSignal = 0;

function getSignalId() {
  return currentSignal++;
}

export function useSignal<T>(initial: T): Signal<T> {
  const ref = useRef<SignalRef<T>>({
    value: initial,
    listeners: [],
    id: -1,
  });

  if (ref.current.id === -1) {
    ref.current.id = getSignalId();
  }

  const [signal] = useState(() => CreateSignal(ref));
  ref.current.signal = signal;

  return signal;
}

export function useDerivedSignal<T>(signal: Signal<T>, derive: (value: T) => T): Signal<T> {
  const ref = useRef<SignalRef<T>>({
    value: derive(signal.get()),
    listeners: [],
    id: -1,
  });

  if (ref.current.id === -1) {
    ref.current.id = getSignalId();
  }

  const [derivedSignal] = useState(() => CreateSignal(ref));
  ref.current.signal = derivedSignal;

  const listener = (value: T) => {
    ref.current.value = derive(value);
  };

  signal.addListener(listener);
  derivedSignal.addListener(listener);

  return derivedSignal;
}
