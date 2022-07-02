import Konva from "konva";
import { RefObject, useRef, useLayoutEffect, useEffect } from "react";

export function useKonvaContainerEventListener<K extends keyof HTMLElementEventMap>(
  ref: RefObject<Konva.Node>,
  eventName: K,
  callback: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const eventListener: typeof callback = (event) => {
      savedCallback.current(event);
    };

    const node = ref.current;
    if (!node) {
      return;
    }

    const stage = node.getStage();
    if (!stage) {
      return;
    }

    const container = stage.container();

    container.addEventListener(eventName, eventListener, options);

    return () => {
      container.removeEventListener(eventName, eventListener);
    };
  }, [eventName, options, ref]);
}
