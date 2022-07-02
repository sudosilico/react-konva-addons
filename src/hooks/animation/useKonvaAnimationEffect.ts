import Konva from "konva";
import { RefObject, useEffect, useRef } from "react";
import { AnimateFunc } from "./useKonvaAnimation";

type KonvaAnimationEffectRef = {
  animation?: Konva.Animation;
  playing: boolean;
};

export function useKonvaAnimationEffect<TRef extends Konva.Node>(
  animate: AnimateFunc,
  ref: RefObject<TRef>,
) {
  const animRef = useRef<KonvaAnimationEffectRef>({
    animation: undefined,
    playing: false,
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const animEffect = animRef.current;
    if (!animEffect) return;

    const animation = new Konva.Animation((frame) => {
      if (!frame) return;
      animate(frame);
    }, node.getLayer());

    animEffect.animation = animation;
    animation.start();
    animEffect.playing = true;

    // eslint-disable-next-line consistent-return
    return () => {
      if (animEffect.animation === animation) {
        if (animEffect.playing) {
          animation.stop();
          animEffect.playing = false;
        }

        animEffect.animation = undefined;
      }
    };
  }, [ref, animRef, animate]);

  return {
    start() {
      const anim = animRef.current.animation;

      if (anim) {
        anim.start();
      }
    },
    stop() {
      const anim = animRef.current.animation;

      if (anim) {
        anim.stop();
      }
    },
    playing() {
      return animRef.current.playing;
    },
  };
}
