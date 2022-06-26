import { useState } from "react";
import { Rect } from "react-konva";
import { DraggableLayer } from "../components/DraggableLayer";
import { DraggableStage } from "../components/DraggableStage/DraggableStage";

const StaticRect = () => {
  return <Rect width={50} height={50} x={50} y={50} fill="white" />;
};

const DraggableRect = () => {
  return <Rect width={50} height={50} x={150} y={50} fill="green" draggable />;
};

/**
 * This is a docstring for MyExample.
 */
export function MyExample() {
  const size = { width: 400, height: 400 };
  const [cursor, setCursor] = useState(25);
  const [items, setItems] = useState([
    {
      x: 20,
      y: 0,
      width: 50,
      height: 50,
      fill: "white",
      draggable: true,
    },
  ]);

  const onClick = () => {
    setItems([
      ...items,
      {
        x: 20,
        y: cursor,
        width: 50,
        height: 50,
        fill: "white",
        draggable: true,
      },
    ]);

    setCursor(cursor + 25);
  };

  return (
    <>
      <button onClick={onClick}>Click Me</button>
      <DraggableStage {...size} bgFill="black">
        <DraggableLayer>
          <StaticRect />
          <DraggableRect />
          {items.map((item, index) => (
            <Rect {...item} key={index} />
          ))}
        </DraggableLayer>
      </DraggableStage>
    </>
  );
}
