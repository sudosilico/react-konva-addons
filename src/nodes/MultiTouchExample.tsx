import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Circle, Group, Layer, Rect, Stage } from "react-konva";

export type MultiTouchExampleProps = {
  //
};

export function MultiTouchExample(props: MultiTouchExampleProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const [log, setLog] = useState<string[]>([]);

  //   useEffect(() => {
  //     const stage = stageRef.current;
  //     if (!stage) return;
  //   }, [stageRef]);

  const logLine = (line: string) => {
    setLog((prev) => [...prev, line]);
  };

  const clearLog = () => {
    setLog([]);
  };

  const onTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `ts: ${e.evt.touches.length}, t: ${e.target.className}, ct: ${e.currentTarget.className}`,
    );
  };

  const onTouchEnd = (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `te: ${e.evt.touches.length}, t: ${e.target.className}, ct: ${e.currentTarget.className}`,
    );
  };

  const onTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `tm: ${e.evt.touches.length}, t: ${e.target.className}, ct: ${e.currentTarget.className}`,
    );
  };

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`ds: t: ${e.target.className}, ct: ${e.currentTarget.className}`);
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`de: t: ${e.target.className}, ct: ${e.currentTarget.className}`);
  };

  const onDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`dm: t: ${e.target.className}, ct: ${e.currentTarget.className}`);
  };

  const width = 500;
  const height = 500;

  return (
    <>
      <div style={{ float: "left", marginRight: 20 }}>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          // x={width / 2}
          // y={height / 2}
          // offset={{ x: width / 2, y: height / 2 }}
        >
          <Layer>
            <Group>
              <Rect width={500} height={500} fill="blue" />
              <Circle
                radius={20}
                fill="red"
                draggable
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchMove={onTouchMove}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragMove={onDragMove}
              />
            </Group>
          </Layer>
        </Stage>
      </div>
      <div style={{ height: height, overflowY: "scroll" }}>
        <h2>Log:</h2>
        <button onClick={clearLog}>Clear log</button>
        {log.map((line, i) => (
          <li key={i}>
            <p>
              {i}: {line}
            </p>
          </li>
        ))}
      </div>
    </>
  );
}
