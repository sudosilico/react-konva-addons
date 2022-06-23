import Konva from "konva";
import { RefObject, useCallback, useEffect } from "react";
import { DraggableStageRef } from "./useDraggableStage";

export function useDraggableScrollListener(
  stageRef: RefObject<DraggableStageRef>,
  bgRef: RefObject<Konva.Rect>,
) {
  // handle mouse scroll & touchpad zoom/pan
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!stageRef || !stageRef.current || !bgRef || !bgRef.current) {
        return;
      }

      const stage = stageRef.current;
      const bg = bgRef.current;

      if (!stage.dragOffset) {
        stage.dragOffset = { x: 0, y: 0 };
      }

      e.preventDefault();

      if (e.ctrlKey) {
        // ctrlKey means zoom
        let inDelta = e.deltaY;

        if (Math.abs(inDelta) === 100) {
          inDelta *= 0.1;
        }

        const scaleDelta = Math.exp(-inDelta / 100);

        // update stage scale
        const currentScale = stage.scale();
        const newScale = {
          x: currentScale.x * scaleDelta,
          y: currentScale.y * scaleDelta,
        };
        stage.scale(newScale);
        bg.scale({
          x: 1.0 / newScale.x,
          y: 1.0 / newScale.y,
        });
      } else {
        // no ctrlKey means pan
        const translation = { x: e.deltaX * -1, y: e.deltaY * -1 };

        // get translation multiplier based on stage scale
        const translationMultiplier = 1.0 / stage.scale().x;

        // update stage offet
        stage.dragOffset.x -= translation.x * translationMultiplier;
        stage.dragOffset.y -= translation.y * translationMultiplier;

        stage.offsetX(stage.dragOffset.x);
        stage.offsetY(stage.dragOffset.y);

        // update bg position
        bg.position({
          x: stage.dragOffset.x,
          y: stage.dragOffset.y,
        });
      }
    },
    [stageRef, bgRef],
  );

  useEffect(() => {
    // { passive: false } option is required so we can preventDefault
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);
}
