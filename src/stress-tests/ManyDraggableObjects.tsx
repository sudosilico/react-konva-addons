import { useState } from "react";
import { Layer, Rect } from "react-konva";
import { DraggableLayer } from "../components/DraggableLayer";
import { DraggableStage } from "../components/DraggableStage/DraggableStage";
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
  draggable: true,
});

const getInitialItems = (count: number) => () => mapCreate(count, getRandomItem);

export type ManyDraggableObjectsProps = {
  count: number;
};

export function ManyDraggableObjects(props: ManyDraggableObjectsProps) {
  const { count } = props;

  return (
    <DraggableStage width={500} height={500} bgFill="gray">
      <DraggableLayer>
        {getInitialItems(count)().map((item, index) => (
          <Rect {...item} key={index} />
        ))}
      </DraggableLayer>
      <Layer>
        <FrameCounter width={500} height={100} />
      </Layer>
    </DraggableStage>
  );
}
