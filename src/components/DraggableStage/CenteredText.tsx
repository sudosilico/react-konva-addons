import { useEffect, useRef } from "react";
import Konva from "konva";
import { Rect, Text } from "react-konva";

export type CenteredTextProps = {
  x: number;
  y: number;
  anchor?: "left" | "center" | "right";
};

export function CenteredText(props: CenteredTextProps) {
  const { x, y, anchor } = props;
  const textRef = useRef<Konva.Text>(null);
  const rectRef = useRef<Konva.Rect>(null);

  useEffect(() => {}, []);

  return (
    <>
      <Rect ref={rectRef} x={x} y={y} width={150} height={100} fill="white" />
      <Text
        ref={textRef}
        align={"center"}
        verticalAlign={"middle"}
        x={x}
        y={y}
        width={150}
        height={100}
        text="Hello!"
        fill="green"
        fontSize={50}
      />
    </>
  );
}
