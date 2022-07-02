import Konva from "konva";
import { IFrame } from "konva/lib/types";
import { useEffect } from "react";

export type AnimateFunc = (frame: IFrame) => boolean | void;

export type KonvaAnimationOptions = {
  disabled?: boolean;
  layer?: Konva.Layer;
};

export function useKonvaAnimation(animate: AnimateFunc, options?: KonvaAnimationOptions) {
  const disabled = options?.disabled;
  const layer = options?.layer;

  useEffect(() => {
    if (disabled) return;

    const animation = new Konva.Animation((frame) => {
      if (!frame) return;
      return animate(frame);
    }, layer);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animate, disabled, layer]);
}
