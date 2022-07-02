import Konva from "konva";
import { useRef } from "react";

export function useKonvaRef<N extends Konva.Node, P>(
  initialExtraAttribs?: P,
): React.RefObject<N & P> {
  const ref = useRef<N & P & { initialized?: true }>(null);

  if (ref.current && initialExtraAttribs && !ref.current.initialized) {
    Object.assign(ref.current, initialExtraAttribs);
    ref.current.initialized = true;
  }

  return ref;
}
