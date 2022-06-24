import { KonvaEventObject } from "konva/lib/Node";
import { AddonsStageRefs } from "./DraggableStage";

// eslint-disable-next-line react-hooks/rules-of-hooks

export function getStageBackgroundProps({ contextStateRef, stageRef, bgRef }: AddonsStageRefs) {
  return {
    draggable: true,
    onDragStart(e: KonvaEventObject<DragEvent>) {
      const context = contextStateRef.current;
      const stage = stageRef.current;
      const background = bgRef.current;

      if (!context || !stage || !background) return;

      background.stopDrag();
      stage.startDrag();

      const viewOffset = context.viewOffset;

      stage.position({ x: viewOffset.x, y: viewOffset.y });
      background.position({
        x: -(viewOffset.x / stage.scaleX()),
        y: -(viewOffset.y / stage.scaleX()),
      });
    },
  };
}

export function getDragStageProps({ contextStateRef, stageRef, bgRef }: AddonsStageRefs) {
  //
  return {
    onDragStart(e: KonvaEventObject<DragEvent>) {
      const context = contextStateRef.current;
      const stage = stageRef.current;

      if (!context || !stage) return;
    },
    onDragMove(e: KonvaEventObject<DragEvent>) {
      if (e.target != e.currentTarget) {
        return;
      }

      // return if any refs are missing
      const contextState = contextStateRef.current;
      const stage = stageRef.current;
      const background = bgRef.current;

      if (!contextState || !stage || !background) return;

      const translation = { x: e.evt.movementX, y: e.evt.movementY };

      // get translation multiplier based on stage scale
      const translationMultiplier = 1.0;
      const viewOffset = contextState.viewOffset;

      viewOffset.x += translation.x * translationMultiplier;
      viewOffset.y += translation.y * translationMultiplier;

      stage.position({ x: viewOffset.x, y: viewOffset.y });
      background.position({
        x: -(viewOffset.x / stage.scaleX()),
        y: -(viewOffset.y / stage.scaleX()),
      });

      contextState.viewOffset = viewOffset;
    },
    onDragEnd(e: KonvaEventObject<DragEvent>) {
      const contextState = contextStateRef.current;
      const stage = stageRef.current;
      const background = bgRef.current;

      if (!contextState || !stage || !background) return;

      const { viewOffset } = contextState;

      stage.position({ x: viewOffset.x, y: viewOffset.y });
      background.position({
        x: -(viewOffset.x / stage.scaleX()),
        y: -(viewOffset.y / stage.scaleX()),
      });
    },
  };
}
