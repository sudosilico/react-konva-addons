import Konva from "konva";
import { Circle, Layer, Stage, Rect } from "./NodesWithSignals";
import { Signal, useSignal } from "../signals/useSignal";
import { withSignals } from "../signals/withSignals";
import { useRef } from "react";

type Point = { x: number; y: number };

function getMidpoint($a: Signal<Point>, $b: Signal<Point>): Point {
  const a = $a.get();
  const b = $b.get();

  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function Component() {
  const $a = useSignal<Point>({ x: 0, y: 0 });
  const $b = useSignal<Point>({ x: 0, y: 0 });

  const ref = useRef<Konva.Circle>(null);

  // Create a readonly signal derived from other signals.
  // Listeners to this signal will be notified when either $a or $b changes.
  const $midpoint = useSignal(() => getMidpoint($a, $b), [$a, $b]);

  return (
    <Stage>
      <Layer>
        <Circle $={{ position: $midpoint }} />
        <Circle $dragPos={$b} draggable />
        <Circle ref={ref} draggable />
      </Layer>
    </Stage>
  );
}
