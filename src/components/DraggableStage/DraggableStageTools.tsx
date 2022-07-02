import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef } from "react";
import { Circle, Group, Rect, Text } from "react-konva";

const font = "Inter";

export function FixedRect({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Rect x={x} y={y + 20} width={50} height={50} fill="black" />
      <Text x={x} y={y} text="FREQ" fontSize={14} fontFamily={font} fontStyle="700" />
    </>
  );
}

export function DraggableRect({ x, y }: { x: number; y: number }) {
  return (
    <Group draggable>
      <Rect x={x} y={y + 20} width={50} height={50} fill="orange" />
      <Text x={x} y={y} text="Draggable" fontSize={20} fill="orange" fontFamily={font} />
    </Group>
  );
}

const vec2 = (x: number, y: number) => ({ x, y });

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
      <Text x={x} y={y} text="Bound Draggable" fontSize={20} fill="green" fontFamily={font} />
    </Group>
  );
}
