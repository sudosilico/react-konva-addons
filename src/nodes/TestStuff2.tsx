import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Rect as ReactKonvaRect, Stage } from "react-konva";
import { useSignal } from "../signals/useSignal";
import { withSignalNode } from "../signals/withSignalNode";

const Rect$ = withSignalNode(ReactKonvaRect);

export function MyTestStuffContainer2() {
  const $rectWidth = useSignal<number>(300);

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect$ width={500} height={500} fill="gray" />
        <Rect$
          height={200}
          fill="cyan"
          $={{
            width: $rectWidth,
          }}
        />
        <Rect$
          y={200}
          height={200}
          fill="green"
          $={{
            width: $rectWidth,
          }}
        />
        <Rect$
          width={30}
          height={400}
          fill="blue"
          draggable
          // $in prop can take in a Signal<T> for konva props
          $={{
            x: $rectWidth,
          }}
          $drag={{
            set: {
              x: $rectWidth,
            },
          }}
          onDragMove={(e: KonvaEventObject<DragEvent>) => {
            $rectWidth.set(e.target.x());
          }}
        />
      </Layer>
    </Stage>
  );
}
