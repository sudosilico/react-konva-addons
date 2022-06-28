import Konva from "konva";
import { IFrame } from "konva/lib/types";
import { useEffect } from "react";

export type Frame = IFrame;
export type AnimateFunc = (frame: IFrame) => false | undefined | void;

export function useKonvaAnimation(animate: AnimateFunc, disabled?: boolean) {
  useEffect(() => {
    if (disabled) return;

    const animation = new Konva.Animation((frame) => {
      if (!frame) return;
      animate(frame);
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animate, disabled]);
}
