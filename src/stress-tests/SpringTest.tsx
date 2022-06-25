import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DraggableLayer } from "../components/DraggableLayer";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";
import { DraggableStage } from "../components/DraggableStage/DraggableStage";

type MyRectProps = {
  //
};
const SPRING_CONFIG = {
  mass: 0.1,
  tension: 251,
  friction: 10,
  precision: 0.01,
  velocity: 0.029,
};

function getRandomCssColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function ColoredRect({
  springTestProps,
  scale,
}: {
  springTestProps: SpringTestProps;
  scale: { x: number; y: number };
}) {
  const ref = useRef<Konva.Rect>(null);
  const [flag, setFlag] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [initialSpringProps] = useState({
    fill: getRandomCssColor(),
    width: 50,
    height: 50,
    strokeWidth: 1,
    rotation: 0,
  });

  useKonvaAnimation((frame) => {
    if (ref.current) {
      ref.current.rotation(ref.current.rotation() + frame.timeDiff * 0.2);
    }
  });

  const [position, setPosition] = useState({
    x: Math.random() * springTestProps.width,
    y: Math.random() * springTestProps.height,
  });

  const [springProps, setSpringProps] = useState(initialSpringProps);
  const [style, api] = useSpring(() => ({
    from: initialSpringProps,
    config: SPRING_CONFIG,
  }));

  const handleClick = () => {
    setFlag(!flag);

    api.start({
      ...springProps,
      fill: getRandomCssColor(),
      rotation: Math.random() * 360,
    });
  };

  const onMouseEnter = (evt: KonvaEventObject<MouseEvent>) => {
    setIsHovering(true);

    api.start({
      ...springProps,
      width: 50,
      height: 50,
    });
  };

  const onMouseLeave = (evt: KonvaEventObject<MouseEvent>) => {
    setIsHovering(false);

    api.start({
      ...springProps,
      width: 50,
      height: 50,
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <animated.Rect
      {...position}
      ref={ref}
      offset={{ x: 25, y: 25 }}
      onClick={handleClick}
      stroke="black"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable
      scale={scale}
      {...style}
    />
  );
}

export type SpringTestProps = {
  width: number;
  height: number;
  count: number;
};

export function SpringTest(springTestProps: SpringTestProps) {
  const { width, height, count } = springTestProps;
  const nums: number[] = [];
  const scales: number[] = [];

  for (let i = 0; i < count; i++) {
    nums.push(i);
    scales.push(Math.random() * 0.3);
  }

  return (
    <>
      <h1>Before Stage</h1>
      <DraggableStage width={width} height={height}>
        <DraggableLayer>
          {nums.map((num) => (
            <ColoredRect
              springTestProps={springTestProps}
              key={num}
              scale={{ x: scales[num], y: scales[num] }}
            />
          ))}
        </DraggableLayer>
      </DraggableStage>
      <h2>After Stage</h2>
    </>
  );
}
