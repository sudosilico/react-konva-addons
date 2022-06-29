import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject, useRef, useLayoutEffect, useEffect } from "react";

type KonvaMouseEventName =
  | "mouseover"
  | "mouseout"
  | "mouseenter"
  | "mouseleave"
  | "mousemove"
  | "mousedown"
  | "mouseup"
  | "wheel"
  | "click"
  | "dblclick";
type KonvaTouchEventName = "touchstart" | "touchmove" | "touchend" | "tap" | "dbltap";
type KonvaPointerEventName =
  | "pointerdown"
  | "pointermove"
  | "pointerup"
  | "pointercancel"
  | "pointerover"
  | "pointerenter"
  | "pointerout"
  | "pointerleave"
  | "pointerclick"
  | "pointerdblclick";
type KonvaDragEventName = "dragstart" | "dragmove" | "dragend";
type KonvaTransformEventName = "transformstart" | "transform" | "transformend";

export type KonvaEventMap = {
  [K in KonvaMouseEventName]: KonvaEventObject<MouseEvent>;
} & {
  [K in KonvaTouchEventName]: KonvaEventObject<TouchEvent>;
} & {
  [K in KonvaPointerEventName]: KonvaEventObject<PointerEvent>;
} & {
  [K in KonvaDragEventName]: KonvaEventObject<DragEvent>;
} & {
  [K in KonvaTransformEventName]: KonvaEventObject<Event>;
};

export function useKonvaEventListener<N extends Konva.Node, K extends keyof KonvaEventMap>(
  ref: RefObject<N>,
  eventName: K,
  callback: (event: KonvaEventMap[K]) => void,
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const eventListener: typeof callback = (event) => savedCallback.current(event);

    const node = ref.current;
    if (!node) return;

    node.on(eventName, eventListener);

    return () => {
      node.off(eventName, eventListener);
    };
  }, [eventName, ref]);
}
