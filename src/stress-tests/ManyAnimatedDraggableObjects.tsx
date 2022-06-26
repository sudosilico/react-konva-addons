import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect } from "react-konva";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";
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

type ItemProps = React.ComponentProps<typeof Rect> & {
  //
};

function AnimatedItem(props: ItemProps) {
  const ref = useRef<Konva.Rect>(null);

  useKonvaAnimation((frame) => {
    const rect = ref.current;
    if (!rect) return;

    const speed = 1.0;
    rect.rotation(frame.time / (1 / (speed * 0.1)));
  });

  return <Rect ref={ref} {...props} stroke="black" />;
}

const getRandomItem = () =>
  ({
    x: rand(0, 500),
    y: rand(0, 500),
    fill: "red",
    width: 50,
    height: 50,
    draggable: true,
    offsetX: 25,
    offsetY: 25,
  } as ItemProps);

export type ManyAnimatedDraggableObjectsProps = {
  count: number;
};

export function ManyAnimatedDraggableObjects(props: ManyAnimatedDraggableObjectsProps) {
  const { count } = props;

  return (
    <DraggableStage width={500} height={500} bgFill="gray">
      <DraggableLayer>
        {mapCreate(count, getRandomItem).map((item, index) => (
          <AnimatedItem {...item} key={index} />
        ))}
      </DraggableLayer>
      <Layer>
        <FrameCounter width={500} height={100} />
      </Layer>
    </DraggableStage>
  );
}
