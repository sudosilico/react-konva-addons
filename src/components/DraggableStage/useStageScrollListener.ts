import { useCallback, useEffect } from "react";
import { DraggableStageRefs } from "./DraggableStage";

export function useStageScrollListener(refs: DraggableStageRefs) {
  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const stageContext = refs.stageContextRef.current;
      const stage = refs.stageRef.current;
      const background = refs.bgRef.current;

      if (!stageContext || !stage || !background) return;

      if (e.ctrlKey) {
        // ctrlKey means zoom
        let inDelta = e.deltaY;

        if (Math.abs(inDelta) === 100) {
          inDelta *= 0.1;
        }

        const scaleDelta = Math.exp(-inDelta / 100);

        // update stage scale
        const oldScale = stage.scale().x;

        // get mouse pos
        const pointer = stage.getPointerPosition();

        if (!pointer) return;

        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = oldScale * scaleDelta;

        stage.scaleX(newScale);
        stage.scaleY(newScale);
        background.scaleX(1.0 / newScale);
        background.scaleY(1.0 / newScale);

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };

        stageContext.viewOffset = newPos;
        const { viewOffset } = stageContext;

        stage.position(viewOffset);
        background.position({
          x: -(viewOffset.x / stage.scaleX()),
          y: -(viewOffset.y / stage.scaleX()),
        });
      } else {
        // no ctrlKey means pan
        const translation = { x: e.deltaX * -1, y: e.deltaY * -1 };

        // get translation multiplier based on stage scale
        const translationMultiplier = 1.0;

        const { viewOffset } = stageContext;

        viewOffset.x += translation.x * translationMultiplier;
        viewOffset.y += translation.y * translationMultiplier;

        stage.position(viewOffset);
        background.position({
          x: -(viewOffset.x / stage.scaleX()),
          y: -(viewOffset.y / stage.scaleX()),
        });

        stageContext.viewOffset = viewOffset;
      }
    },
    [refs.bgRef, refs.stageContextRef, refs.stageRef],
  );

  useEffect(() => {
    // { passive: false } option is required so we can preventDefault
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);
}
