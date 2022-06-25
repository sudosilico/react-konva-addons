import Konva from "konva";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Circle as ReactKonvaCircle,
  Line as ReactKonvaLine,
  Rect as ReactKonvaRect,
} from "react-konva";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";
import { DraggableLayer } from "../components/DraggableLayer";
import { DraggableStage } from "../components/DraggableStage/DraggableStage";
import { withSignalNode } from "../signals/withSignalNode";

const Rect = withSignalNode(ReactKonvaRect);
const Line = withSignalNode(ReactKonvaRect);
const Circle = withSignalNode(ReactKonvaCircle);

export type SineExampleProps = {
  //
};

type Point = {
  x: number;
  y: number;
};

const getInitialPoints = (count: number) => {
  const points = [];

  for (let i = 0; i < count; i++) {
    points.push({
      x: i * 10,
      y: 100,
    });
  }

  return points;
};

export function SineExample(props: SineExampleProps) {
  const itemsRef = useRef<Array<Konva.Circle | null>>([]);
  const initialPoints = useMemo(() => getInitialPoints(10), []);
  const [points, setPoints] = useState<Point[]>(initialPoints);

  const count = 100;

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, count);
  }, [count]);

  useKonvaAnimation((frame) => {
    const newPoints = [...points];

    for (let i = 0; i < newPoints.length; i++) {
      const { x, y } = newPoints[i];
      newPoints[i].y = Math.sin((frame.time / 1000) * 40 + newPoints[i].x) * 100 + 100;
    }
  });

  return (
    <DraggableStage width={500} height={500} bgFill="#323232">
      <DraggableLayer>
        {points.map((point, index) => (
          <Circle
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            {...point}
            key={index}
            radius={7}
            fill="#cdcdcd"
          />
        ))}
      </DraggableLayer>
    </DraggableStage>
  );
}
