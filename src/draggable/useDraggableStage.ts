import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject } from "react";
import { useDraggableScrollListener } from "./useDraggableScrollListener";

export function shouldPanStage({ evt }: KonvaEventObject<DragEvent>) {
  const shift = evt.getModifierState("Shift");
  const { buttons } = evt;

  return (buttons === 1 && shift) || buttons === 4;
}

type DraggableStageCallbacks = {
  onDragStart: (evt: KonvaEventObject<DragEvent>) => void;
  onDragMove: (evt: KonvaEventObject<DragEvent>) => void;
};

export type DraggableStageRef = Konva.Stage & {
  dragOffset: { x: number; y: number } | undefined;
};

export function useDraggableStage(
  stageRef: RefObject<DraggableStageRef>,
  bgRef: RefObject<Konva.Rect>,
) {
  function onDragStart(evt: KonvaEventObject<DragEvent>) {
    if (!shouldPanStage(evt) || !stageRef.current) {
      return;
    }

    const stage = stageRef.current;

    if (!stage.dragOffset) {
      stage.dragOffset = { x: 0, y: 0 };
    }
  }

  function onDragMove(evt: KonvaEventObject<DragEvent>) {
    if (!shouldPanStage(evt) || !stageRef.current || !bgRef.current) {
      return;
    }

    const stage = stageRef.current;
    const bg = bgRef.current;
    const translation = { x: evt.evt.movementX, y: evt.evt.movementY };

    if (!stage.dragOffset) {
      stage.dragOffset = { x: 0, y: 0 };
    }

    // get translation multiplier based on stage scale
    const translationMultiplier = 1.0 / stage.scale().x;

    stage.dragOffset.x -= translation.x * translationMultiplier;
    stage.dragOffset.y -= translation.y * translationMultiplier;

    stage.offsetX(stage.dragOffset.x);
    stage.offsetY(stage.dragOffset.y);

    bg.position({
      x: stage.dragOffset.x,
      y: stage.dragOffset.y,
    });
  }

  useDraggableScrollListener(stageRef, bgRef);

  return {
    onDragStart,
    onDragMove,
  } as DraggableStageCallbacks;
}
