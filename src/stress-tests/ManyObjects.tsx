import { Layer, Rect, Stage } from "react-konva";
import { FrameCounter } from "../components/FrameCounter/FrameCounter";

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
});

const getInitialItems = (count: number) => () => mapCreate(count, getRandomItem);

export type ManyObjectsProps = {
  count: number;
};

export function ManyObjects(props: ManyObjectsProps) {
  const { count } = props;

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect width={500} height={500} fill="gray" />
        {getInitialItems(count)().map((item, index) => (
          <Rect {...item} key={index} />
        ))}
      </Layer>
      <Layer>
        <FrameCounter width={500} height={100} />
      </Layer>
    </Stage>
  );
}
