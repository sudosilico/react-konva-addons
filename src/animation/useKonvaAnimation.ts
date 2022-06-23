import Konva from "konva";
import { IFrame } from "konva/lib/types";
import {
  RefObject,
  useEffect,
  useState,
} from "react";

export type KonvaAnimFunc = (frame: IFrame) => false | undefined | void;

type UseAnimationOptions<TRef> = {
  ref: RefObject<TRef>;
  tickFunc: KonvaAnimFunc;
  disabled?: boolean;
};

export function useKonvaAnimation<TRef extends Konva.Node>({
  ref,
  tickFunc,
  disabled,
}: UseAnimationOptions<TRef>) {
  const [activeAnimation, setActiveAnimation] = useState<Konva.Animation | null>(null);

  useEffect(() => {
    if (disabled) return;

    const node = ref.current;
    if (!node) return;

    const animation = new Konva.Animation((frame) => {
      if (!frame) return;
      tickFunc(frame);
    }, node.getLayer());

    animation.start();
    setActiveAnimation(activeAnimation);

    return () => {
      animation.stop();
    };
  }, [ref, tickFunc, disabled, activeAnimation]);
}
