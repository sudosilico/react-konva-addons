import Konva from "konva";
import { NodeConfig } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { forwardRef, RefObject, useEffect, useRef } from "react";
import { KonvaNodeComponent } from "react-konva";
import { RemoveIndex } from "../utils/type-utils";
import { SignalMap } from "./types/SignalMap";
import { Signal } from "./useSignal";

export type SignalComponentProps<N extends Konva.Node, C extends NodeConfig> = C & {
  ref?: RefObject<N>;
  children?: React.ReactNode;
  $?: SignalMap<N, C>;
};

export type SignalComponent<N extends Konva.Node, C extends NodeConfig> = (
  props: RemoveIndex<SignalComponentProps<N, C>>,
) => JSX.Element;

function subscribeToSignals<N extends Konva.Node, C extends NodeConfig>(
  signals: SignalMap<N, C> | undefined,
  ref: RefObject<N>,
) {
  const addedListenersMap: {
    [id: string]: number[];
  } = {};

  const signalsById: {
    [id: string]: Signal<keyof C[Extract<keyof C, string>]>;
  } = {};

  const signalIds = [];

  if (signals) {
    // loop over each signal in our component's signals object
    // the key is the name of the property on the node that
    // is listening to the signal
    for (const key in signals) {
      if (typeof key === "string") {
        const keyStr = key as keyof N;
        type SignalType = keyof C[Extract<keyof C, string>];

        const signal = signals[key] as Signal<SignalType>;

        // function to call when changes are broadcast to the signal
        function onChange(value: SignalType) {
          if (ref.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore :(
            ref.current[keyStr](value);
          }
        }

        const listenerId = signal.addListener(onChange);

        onChange(signal.get());

        const id = signal.id();

        // get the listener map for this signal
        const listeners = addedListenersMap[id];

        if (!listeners) {
          // first listener for this signal
          addedListenersMap[id] = [listenerId];
          signalsById[id] = signal;
          signalIds.push(id);
        } else {
          // subsequent listeners
          listeners.push(listenerId);
        }
      }
    }
  }

  return { addedListenersMap, signalsById, signalIds };
}

function useInternalRef<N extends Konva.Node, C extends NodeConfig>(
  ref: RefObject<N>,
  signals?: SignalMap<N, C>,
) {
  const internalRef = useRef<N>(null);

  if (!ref && signals) {
    return internalRef;
  }

  return ref;
}

export function withSignals<N extends Konva.Node, C extends NodeConfig>(
  Component: KonvaNodeComponent<N, C>,
): SignalComponent<N, C> {
  const NodeWithSignals = (props: SignalComponentProps<N, C>, forwardedRef: RefObject<N>) => {
    const signals = props.$;
    const ref = useInternalRef(forwardedRef, signals);

    useEffect(() => {
      if (!ref) {
        return;
      }

      // if we have signals, loop through them and register a listener for each one
      const { addedListenersMap, signalsById, signalIds } = subscribeToSignals<N, C>(signals, ref);

      return () => {
        for (let i = 0; i < signalIds.length; i++) {
          const signal = signalsById[signalIds[i]];
          const listeners = addedListenersMap[signalIds[i]];

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
  return forwardRef(
    NodeWithSignals as React.ForwardRefRenderFunction<N, SignalComponentProps<N, C>>,
  );
}
