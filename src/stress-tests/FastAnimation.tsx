import Konva from "konva";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Layer, Rect } from "react-konva";
import { Frame, useKonvaAnimation } from "../animation/useKonvaAnimation";
import { DraggableLayer } from "../components/DraggableLayer";
import { DraggableStage } from "../components/DraggableStage/DraggableStage";
import { FrameCounter } from "../components/FrameCounter";

const rand = (min: number, max: number) => Math.random() * max - min + min;

function mapCreate<T>(n: number, factory: () => T): T[] {
  const items: T[] = [];

  for (let i = 0; i < n; i++) {
    items.push(factory());
  }

  return items;
}

const getRandomItem = () => ({
  x: rand(0, 500),
  y: rand(0, 500),
  fill: "red",
  width: 50,
  height: 50,
  offsetX: 25,
  offsetY: 25,
});

const getInitialItems = (count: number) => mapCreate(count, getRandomItem);

export type FastAnimationProps = {
  count: number;
};

export function FastAnimation(props: FastAnimationProps) {
  const { count } = props;

  const items = useMemo(() => {
    return getInitialItems(count);
  }, [count]);

  const itemsRef = useRef<Array<Konva.Rect | null>>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, count);
  }, [count]);

  const animate = useCallback((frame: Frame) => {
    const elements = itemsRef.current as Konva.Rect[];

    if (!elements) {
      console.log("!elements");
      return;
    }

    Konva.autoDrawEnabled = false;

    for (let i = 0; i < elements.length; i++) {
      const rect = elements[i];

      if (!rect) continue;

      rect.rotation(frame.time / (1 / (1.0 * 0.1)));

      if (i === elements.length - 1) {
        rect.getLayer()?.draw();
      }
    }

    Konva.autoDrawEnabled = true;
  }, []);

  useKonvaAnimation(animate);

  return (
    <DraggableStage width={500} height={500} bgFill="gray">
      <DraggableLayer>
        {items.map((item, index) => (
          <Rect
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            {...item}
            key={index}
            stroke="black"
            draggable
          />
        ))}
      </DraggableLayer>
      <Layer>
        <FrameCounter width={500} height={100} />
      </Layer>
    </DraggableStage>
  );
}
