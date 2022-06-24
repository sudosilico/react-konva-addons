import { useRef } from "react";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";

export function FPSMeter({ enabled }: { enabled?: boolean }) {
  const ref = useRef({
    frames: 0,
    time: 0,
    accumulator: 0,
    fps: 0,
  });

  useKonvaAnimation({
    tickFunc: (frame) => {
      const obj = ref.current;

      obj.frames++;
      obj.time += frame.timeDiff;
      obj.accumulator += frame.timeDiff;

      if (obj.accumulator >= 1000) {
        obj.fps = obj.frames;
        obj.frames = 0;
        obj.accumulator -= 1000;

        if (enabled) {
          console.log(`FPS: ${obj.fps}`);
        }
      }

      ref.current = obj;

      // return true;
    },
  });

  return <></>;
}
