import Konva from "konva";
import { IFrame } from "konva/lib/types";
import { RefObject, useEffect, useState } from "react";

export type KonvaAnimFunc = (frame: IFrame) => false | undefined | void;

type UseAnimationOptions<TRef> = {
  tickFunc: KonvaAnimFunc;
  disabled?: boolean;
};

export function useKonvaAnimation<TRef extends Konva.Node>({
  tickFunc,
  disabled,
}: UseAnimationOptions<TRef>) {
  const [activeAnimation, setActiveAnimation] = useState<Konva.Animation | null>(null);

  useEffect(() => {
    if (disabled) return;

    const animation = new Konva.Animation((frame) => {
      if (!frame) return;
      tickFunc(frame);
    });

    animation.start();
    setActiveAnimation(activeAnimation);

    // eslint-disable-next-line consistent-return
    return () => {
      animation.stop();
    };
  }, [tickFunc, disabled, activeAnimation]);
}
