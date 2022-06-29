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
      console.log("eventListener callback");
      savedCallback.current(event);
    };

    const node = ref.current;
    if (!node) {
      console.log("No node, returning.");
      return;
    }

    const stage = node.getStage();
    if (!stage) {
      console.log("No stage, returning.");
      return;
    }

    const container = stage.container();

    console.log("Adding container listener: " + eventName);
    container.addEventListener(eventName, eventListener, options);

    return () => {
      console.log("Removing container listener: " + eventName);
      container.removeEventListener(eventName, eventListener);
    };
  }, [eventName, options, ref]);
}
