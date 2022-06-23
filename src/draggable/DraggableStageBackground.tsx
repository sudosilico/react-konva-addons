import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject, useCallback } from "react";
import { Rect } from "react-konva";
import { DraggableStageRef } from "./useDraggableStage";

type DraggableStageBackgroundProps = {
  width: number;
  height: number;
  stageRef: RefObject<DraggableStageRef>;
  bgRef: RefObject<Konva.Rect>;
};

export function DraggableStageBackground({
  width,
  height,
  stageRef,
  bgRef,
}: DraggableStageBackgroundProps) {
  const handleDragMove = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (!bgRef.current) {
        return;
      }

      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      if (!stage.dragOffset) {
        stage.dragOffset = { x: 0, y: 0 };
      }

      const bg = bgRef.current;
      bg.position({
        x: stage.dragOffset.x,
        y: stage.dragOffset.y,
      });
    },
    [bgRef, stageRef],
  );

  return (
    <Rect
      ref={bgRef}
      width={width}
      height={height}
      draggable
      fill="red"
      x={0}
      y={0}
      opacity={0.2}
      onDragMove={handleDragMove}
    />
  );
}
