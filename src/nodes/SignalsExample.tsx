import { Circle, Layer, Stage } from "./NodesWithSignals";
import { Signal, useSignal } from "../signals/useSignal";

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
  // create signals containing state that won't cause re-renders on change
  const $a = useSignal<Point>({ x: 0, y: 0 });
  const $b = useSignal<Point>({ x: 0, y: 0 });

  // Create a readonly signal derived from other signals.
  // Listeners to this signal will be notified when either $a or $b changes.
  const $midpoint = useSignal(() => getMidpoint($a, $b), [$a, $b]);

  return (
    <Stage>
      <Layer>
        {/* <Circle $dragPosition={$a} draggable />
        <Circle $dragPosition={$b} draggable /> */}
        {/* <Circle $={{ position: $midpoint }} /> */}
      </Layer>
    </Stage>
  );
}
