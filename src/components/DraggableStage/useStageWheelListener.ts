import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject, useCallback, useEffect } from "react";
import { DraggableStageAttribs } from "./DraggableStage";

export function useStageWheelListener(
  stageRef: RefObject<Konva.Stage & DraggableStageAttribs>,
  minZoom: number,
  maxZoom: number,
  smoothScaling: boolean | undefined,
  lockViewportToBounds: (stage: Konva.Stage & DraggableStageAttribs, hardSnap?: boolean) => boolean,
  scalingSensitivity: number,
  onWheelProp?:
    | (((evt: KonvaEventObject<WheelEvent>) => void) &
        ((evt: KonvaEventObject<WheelEvent>) => void))
    | undefined,
) {
  const onWheel = useCallback(
    (e: WheelEvent) => {
      const stage = stageRef.current;
      if (stage) {
        if (stage.isMouseInside) {
          e.preventDefault();

          // If we're dragging the stage around (like with the middle mouse button),
          // we don't want to trigger stage zooming.
          if (stage.isDragging()) return;

          if (e.ctrlKey) {
            // zooming
            const prevScale = stage.scaleX();
            const scaleDelta = Math.exp(-e.deltaY / 100) * scalingSensitivity;

            // get pointer position
            const pointer = stage.getPointerPosition();
            if (!pointer) return;

            const mousePos = {
              x: (pointer.x - stage.x()) / prevScale,
              y: (pointer.y - stage.y()) / prevScale,
            };

            // apply new scale
            let newScale = prevScale * scaleDelta;

            // limit zoom
            newScale = Math.min(Math.max(minZoom, newScale), maxZoom);

            const prevPos = stage.position();
            // apply new position
            const newPos = {
              x: pointer.x - mousePos.x * newScale,
              y: pointer.y - mousePos.y * newScale,
            };

            if (smoothScaling) {
              const difference = {
                x: newPos.x - prevPos.x,
                y: newPos.y - prevPos.y,
              };
              stage.targetPositionOffset = difference;

              stage.targetScale = newScale;
            } else {
              stage.scale({ x: newScale, y: newScale });
              stage.position(newPos);
            }
          } else {
            // panning
            const delta = { x: e.deltaX * -1, y: e.deltaY * -1 };

            const prevPosition = stage.position();
            const newPosition = {
              x: prevPosition.x + delta.x,
              y: prevPosition.y + delta.y,
            };
            stage.position(newPosition);
          }

          lockViewportToBounds(stage);

          if (onWheelProp) {
            const newKonvaEvent: Konva.KonvaEventObject<WheelEvent> = {
              type: "wheel",
              target: stage,
              evt: e,
              currentTarget: stage,
              cancelBubble: false,
            };

            onWheelProp(newKonvaEvent);
          }
        }
      }
    },
    [
      lockViewportToBounds,
      maxZoom,
      minZoom,
      onWheelProp,
      scalingSensitivity,
      smoothScaling,
      stageRef,
    ],
  );

  // Set up the document scroll listener for wheel events
  useEffect(() => {
    // We use passive: false so that we can call preventDefault() when we
    // handle the event on our stage.
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);
}
