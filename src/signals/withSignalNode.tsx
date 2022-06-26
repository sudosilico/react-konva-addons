import Konva from "konva";
import { NodeConfig } from "konva/lib/Node";
import { ClassAttributes, forwardRef, RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { KonvaNodeComponent, KonvaNodeEvents } from "react-konva";
import { Signal } from "./useSignal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type RemoveLastUnionElement<Union> = Exclude<Union, GetLastUnionElement<Union>>;
type GetLastUnionElement<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToSignalUnion<Union> = ToSignalUnionRec<Union, Union>;
type ToSignalUnionRec<Union, Rslt> = RemoveLastUnionElement<Union> extends never
  ? Signal<GetLastUnionElement<Union>> | Rslt
  : ToSignalUnionRec<RemoveLastUnionElement<Union>, Signal<GetLastUnionElement<Union>>>;

type SignalMap<N extends Konva.Node, C extends NodeConfig> = {
  [K in keyof C]: K extends string ? ToSignalUnion<C[K]> : never;
};

type AddonProps<N extends Konva.Node, C extends NodeConfig> = {
  $?: SignalMap<N, C>;
};

type WrappedProps<N extends Konva.Node, C extends NodeConfig> = C &
  ClassAttributes<N> &
  KonvaNodeEvents &
  AddonProps<N, C>;

type ComponentWithSignals<N extends Konva.Node, C extends NodeConfig> = (
  props: WrappedProps<N, C>,
) => JSX.Element;

type ListenerMap<N extends Konva.Node, C extends NodeConfig> = {
  [id: string]: number[];
};

type SignalsById<C extends NodeConfig> = {
  [id: string]: Signal<keyof C[Extract<keyof C, string>]>;
};

export function withSignalNode<N extends Konva.Node, C extends NodeConfig>(
  Component: KonvaNodeComponent<N, C>,
): ComponentWithSignals<N, C> {
  function useInternalRef<S>(ref: RefObject<N>, signals: S) {
    const internalRef = useRef<N>(null);

    if (!ref && signals) {
      return internalRef;
    }

    return ref;
  }

  const ComponentWithSignals = (props: WrappedProps<N, C>, forwardedRef: RefObject<N>) => {
    const signals = props.$;

    const ref = useInternalRef(forwardedRef, signals);

    useEffect(() => {
      if (!ref) {
        return;
      }

      const addedListenersMap: ListenerMap<N, C> = {};
      const signalsById: SignalsById<C> = {};

      if (signals) {
        for (const key in signals) {
          if (typeof key === "string") {
            const keyStr = key as keyof N;
            type SignalType = keyof C[Extract<keyof C, string>];

            const signal = signals[key] as Signal<SignalType>;

            function listener(value: SignalType) {
              if (ref.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore :(
                ref.current[keyStr](value);
              }
            }

            const listenerId = signal.addListener(listener);

            listener(signal.get());

            const listeners = addedListenersMap[signal.id()];

            if (!listeners) {
              addedListenersMap[signal.id()] = [listenerId];
              signalsById[signal.id()] = signal;
            } else {
              listeners.push(listenerId);
            }
          }
        }
      }

      return () => {
        const signalIds = Object.keys(signalsById);

        for (let i = 0; i < signalIds.length; i++) {
          const signal = signalsById[signalIds[i]];
          const listeners = addedListenersMap[signal.id()];

          for (let j = 0; j < listeners.length; j++) {
            signal.removeListenerAt(listeners[j]);
          }
        }
      };
    }, [ref, signals]);

    return <Component ref={ref} {...props} />;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return forwardRef(ComponentWithSignals) as ComponentWithSignals<N, C>;
}
