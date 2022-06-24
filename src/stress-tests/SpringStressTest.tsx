import Konva from "konva";
import { useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useKonvaAnimation } from "../animation/useKonvaAnimation";

export type SpringStressTestProps = {
  //
};

export function SpringStressTest(props: SpringStressTestProps) {
  return (
    <Stage width={900} height={500}>
      <Layer />
    </Stage>
  );
}
