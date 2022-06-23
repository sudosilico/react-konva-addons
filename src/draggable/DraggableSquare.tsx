import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Rect } from "react-konva";
import { useDraggable } from "./useDraggable";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";
import { useCallback, useRef } from "react";
import { IFrame } from "konva/lib/types";
import { useKonvaAnimationEffect } from "../animation/useKonvaAnimationEffect";

export const DraggableSquare = ({ color }: { color: string }) => {
  const ref = useRef<Konva.Rect>(null);
  const addonProps = useDraggable<Konva.Rect>(ref);

  return (
    <Rect
      ref={ref}
      width={150}
      height={150}
      fill={color}
      x={50}
      y={200}
      draggable
      {...addonProps}
    />
  );
};

let time = 0;

type AnimationData = {
  clickTime: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const DraggableSquare2 = () => {
  const ref = useRef<Konva.Rect & AnimationData>(null);

  const addonProps = useDraggable(ref);

  useKonvaAnimation({
    ref,
    tickFunc: useCallback((frame: IFrame) => {
      const rect = ref.current;
      if (!rect) return;

      time = frame.time;

      const start = rect.clickTime;
      const end = start + 400;
      const t = (time - start) / (end - start);

      if (t > 0 && t < 2) {
        const t01 = Math.min(Math.max(t, 0), 1);
        rect.opacity(lerp(1, 0.5, t01));
        return undefined;
      } else {
        return false;
      }
    }, []),
  });

  useKonvaAnimationEffect(
    useCallback(() => {
      const rect = ref.current;
      if (!rect) return;
    }, [ref]),
    ref,
  );

  const onClick = (event: KonvaEventObject<MouseEvent>) => {
    if (ref.current) {
      ref.current.clickTime = time;
    }
  };

  return <h1>hi</h1>;

  // return (
  //   <Spring
  //     native
  //     to={{
  //       x: 100,
  //       y: 300,
  //     }}
  //   >
  //     {(props) => (
  //       <animated.Rect
  //         ref={ref}
  //         width={100}
  //         height={100}
  //         fill="green"
  //         draggable
  //         {...addonProps}
  //         {...props}
  //       />
  //     )}
  //   </Spring>
  // );
};
