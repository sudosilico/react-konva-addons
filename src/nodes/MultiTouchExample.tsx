import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useLayoutEffect, useRef, useState } from "react";
import { Circle, Group, Layer, Rect, Stage } from "react-konva";
import { DraggableRect, FixedRect } from "../components/DraggableStage/DraggableStageTools";
import { useKonvaContainerEventListener } from "../events/useKonvaContainerEventListener";

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

  useKonvaContainerEventListener(stageRef, "keydown", (e) => {
    console.log(e);
    if (e.key === "Shift") {
    }

    e.preventDefault();
  });

  useKonvaContainerEventListener(stageRef, "keyup", (e) => {
    console.log(e);
    if (e.key === "Shift") {
    }

    e.preventDefault();
  });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const container = stage.container();

    // Make sure the stage container has a tab index so that we can
    // focus it and it will pick up keyboard events.
    if (typeof container.tabIndex == "undefined") {
      container.tabIndex = 1;
    }
  }, []);

  const logLine = (line: string) => {
    const lastLineOfLog = log[log.length - 1];

    setLog((prev) => [...prev, line]);
  };

  const clearLog = () => {
    setLog([]);
  };

  const onTouchStart = (msg: string) => (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `ts: '${msg}': ${e.evt.touches.length}, t: ${e.target.name()}, ct: ${e.currentTarget.name()}`,
    );
  };

  const onTouchEnd = (msg: string) => (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `te:'${msg}': ${e.evt.touches.length}, t: ${e.target.name()}, ct: ${e.currentTarget.name()}`,
    );
  };

  const onTouchMove = (msg: string) => (e: Konva.KonvaEventObject<TouchEvent>) => {
    logLine(
      `tm: '${msg}': ${e.evt.touches.length}, t: ${e.target.name()}, ct: ${e.currentTarget.name()}`,
    );
  };

  const onDragStart = (msg: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`ds: '${msg}': t: ${e.target.name()}, ct: ${e.currentTarget.name()}`);
  };

  const onDragEnd = (msg: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`de: '${msg}': t: ${e.target.name()}, ct: ${e.currentTarget.name()}`);
  };

  const onDragMove = (msg: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
    logLine(`dm: '${msg}': t: ${e.target.name()}, ct: ${e.currentTarget.name()}`);
  };

  const onClick = (msg: string) => (e: Konva.KonvaEventObject<MouseEvent>) => {
    logLine(`c: '${msg}': t: ${e.target.name()}, ct: ${e.currentTarget.name()}`);
  };

  const width = 500;
  const height = 500;

  const bgroupRef = useRef<Konva.Group>(null);
  const brectRef = useRef<Konva.Rect>(null);

  return (
    <>
      <Stage
        name="aStage"
        ref={stageRef}
        width={width}
        height={height}
        onTouchStart={onTouchStart("stage")}
        onTouchEnd={onTouchEnd("stage")}
        onTouchMove={onTouchMove("stage")}
        onDragStart={onDragStart("stage")}
        onDragEnd={onDragEnd("stage")}
        onDragMove={onDragMove("stage")}
        onClick={onClick("stage")}
        draggable
        // x={width / 2}
        // y={height / 2}
        // offset={{ x: width / 2, y: height / 2 }}
      >
        <Layer
          name="aLayer"
          onTouchStart={onTouchStart("layer")}
          onTouchEnd={onTouchEnd("layer")}
          onTouchMove={onTouchMove("layer")}
          onDragStart={onDragStart("layer")}
          onDragEnd={onDragEnd("layer")}
          onDragMove={onDragMove("layer")}
          onClick={onClick("layer")}
        >
          <Rect width={500} height={500} fill="cornflowerblue" />
          <FixedRect x={100} y={100} />
          <DraggableRect x={180} y={150} />
          <Group ref={bgroupRef}>
            <Rect width={100} height={100} fill="green" />
            <Rect
              ref={brectRef}
              width={100}
              height={15}
              fill="black"
              opacity={0.2}
              draggable
              onDragStart={(e: KonvaEventObject<DragEvent>) => {
                if (e.currentTarget === brectRef.current) {
                  e.target.stopDrag();
                  bgroupRef.current?.startDrag(e);
                  e.cancelBubble = true;
                }
              }}
            />
            {/* <Text text="Bound Draggable" fontSize={20} fill="green" /> */}
          </Group>
          <Group
            name="aGroup"
            onTouchStart={onTouchStart("group")}
            onTouchEnd={onTouchEnd("group")}
            onTouchMove={onTouchMove("group")}
            onDragStart={onDragStart("group")}
            onDragEnd={onDragEnd("group")}
            onDragMove={onDragMove("group")}
            onClick={onClick("group")}
          >
            <Circle
              name="Red1"
              radius={50}
              x={150}
              y={250}
              fill="red"
              draggable
              onTouchStart={onTouchStart("red1")}
              onTouchEnd={onTouchEnd("red1")}
              onTouchMove={onTouchMove("red1")}
              onDragStart={onDragStart("red1")}
              onDragEnd={onDragEnd("red1")}
              onDragMove={onDragMove("red1")}
              onClick={onClick("red1")}
            />
            <Circle
              name="Red2"
              radius={50}
              x={350}
              y={250}
              fill="red"
              draggable
              onTouchStart={onTouchStart("red2")}
              onTouchEnd={onTouchEnd("red2")}
              onTouchMove={onTouchMove("red2")}
              onDragStart={onDragStart("red2")}
              onDragEnd={onDragEnd("red2")}
              onDragMove={onDragMove("red2")}
              onClick={onClick("red2")}
            />
          </Group>
        </Layer>
      </Stage>
      <div style={{ height: height, overflowY: "scroll" }}>
        <h2>Log:</h2>
        <button onClick={clearLog}>Clear log</button>
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </>
  );
}
