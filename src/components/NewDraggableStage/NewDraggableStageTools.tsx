import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { useRef } from "react";
import { Circle, Group, Rect, Text } from "react-konva";

export function FixedRect({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Rect x={x} y={y + 20} width={50} height={50} fill="black" />
      <Text x={x} y={y} text="Fixed" fontSize={20} />
    </>
  );
}

export function DraggableRect({ x, y }: { x: number; y: number }) {
  return (
    <Group draggable>
      <Rect x={x} y={y + 20} width={50} height={50} fill="orange" />
      <Text x={x} y={y} text="Draggable" fontSize={20} fill="orange" />
    </Group>
  );
}

const vec2 = (x: number, y: number) => ({ x, y });

function clamp2d(value: Vector2d, min: Vector2d, max: Vector2d) {
  const result = { ...value };

  if (result.x < min.x) {
    result.x = min.x;
  }

  if (result.x > max.x) {
    result.x = max.x;
  }

  if (result.y < min.y) {
    result.y = min.y;
  }

  if (result.y > max.y) {
    result.y = max.y;
  }

  return result;
}

export function BoundInnerDraggableRect({ x, y }: { x: number; y: number }) {
  const groupRef = useRef<Konva.Group>(null);
  const rectRef = useRef<Konva.Rect>(null);

  return (
    <Group ref={groupRef}>
      <Rect x={x} y={y + 20} width={100} height={100} fill="green" />
      <Rect
        ref={rectRef}
        x={x}
        y={y + 20}
        width={100}
        height={15}
        fill="black"
        opacity={0.2}
        draggable
        onDragStart={(e: KonvaEventObject<DragEvent>) => {
          if (e.currentTarget === rectRef.current) {
            e.target.stopDrag();
            groupRef.current?.startDrag(e);

            e.cancelBubble = true;
          }
        }}
      />
      <Circle x={x + 50} y={y + 50} radius={10} fill="red" draggable />
      <Text x={x} y={y} text="Bound Draggable" fontSize={20} fill="green" />
    </Group>
  );
}
