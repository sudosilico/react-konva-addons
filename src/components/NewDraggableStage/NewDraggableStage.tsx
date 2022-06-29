import Konva from "konva";
import { IFrame, Vector2d } from "konva/lib/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Rect, Stage as KStage, StageProps } from "react-konva";
import { useKonvaAnimation } from "../../animation/useKonvaAnimation";
import { withSignals } from "../../signals/withSignals";
import {
  getNodeAABB,
  aabbOverlap,
  aabbContains,
  getViewportAABB,
  isNodeVisibleInStage,
  lockAABBInAABB,
} from "../../utils/aabb";
import { lerp01, lerp2d01 } from "../../utils/math";
import { useForceRerender } from "../../utils/hooks/useForceRerender";
import { BoundInnerDraggableRect, DraggableRect, FixedRect } from "./NewDraggableStageTools";

const Stage = withSignals(KStage);

export type NewDraggableStageProps = StageProps & {
  onWheel?: (evt: Konva.KonvaEventObject<WheelEvent>) => void;
};

type CustomStageAttribs = {
  isMouseInside?: boolean;
  targetScale?: number;
  targetPositionOffset?: Vector2d;
  isSnappingBack?: boolean;
  targetPosition?: Vector2d;
};

let renders = 0;

const testRect1 = {
  x: 100,
  y: 400,
  width: 100,
  height: 100,
};

const testRect2 = {
  x: -200,
  y: 300,
  width: 150,
  height: 150,
};

const testRect3 = {
  x: -50,
  y: 300,
  width: 70,
  height: 70,
};

export function NewDraggableStage(props: NewDraggableStageProps) {
  const stageRef = useRef<Konva.Stage & CustomStageAttribs>(null);
  const rerender = useForceRerender();

  const ref1 = useRef<Konva.Rect>(null);
  const ref2 = useRef<Konva.Rect>(null);
  const ref3 = useRef<Konva.Rect>(null);

  const width = 500;
  const height = 500;

  const updateCollisionRefs = () => {
    const stage = stageRef.current;
    const rect1 = ref1.current;
    const rect2 = ref2.current;
    const rect3 = ref3.current;

    if (!stage || !rect1 || !rect2 || !rect3) return;

    const cameraAABB = getViewportAABB(stage);
    const rect1AABB = getNodeAABB(rect1);
    const rect2AABB = getNodeAABB(rect2);
    const rect3AABB = getNodeAABB(rect3);

    const cameraOverlapsRect1 = aabbOverlap(cameraAABB, rect1AABB);
    const cameraOverlapsRect2 = aabbOverlap(cameraAABB, rect2AABB);
    const rect3OverlapsRect1 = aabbOverlap(rect3AABB, rect1AABB);

    console.log(`rect1 visible: ${isNodeVisibleInStage(stage, rect1) ? "true" : "false"}`);
    console.log(`rect2 visible: ${isNodeVisibleInStage(stage, rect2) ? "true" : "false"}`);

    // if (cameraOverlapsRect1) {
    //   rect1.fill("green");
    // } else {
    //   rect1.fill("gray");
    // }

    // if (cameraOverlapsRect2) {
    //   rect2.fill("green");
    // } else {
    //   rect2.fill("black");
    // }

    // if (rect3OverlapsRect1) {
    //   if (aabbContains(rect1AABB, rect3AABB)) {
    //     rect3.fill("white");
    //   } else {
    //     rect3.fill("green");
    //   }
    // } else {
    //   rect3.fill("yellow");
    // }
  };

  renders = renders + 1;

  const onWheelProp = props.onWheel;

  const smoothScaling = true;
  const smoothSnapBackToBounds = true;

  const viewportBounds = useMemo(
    () => ({
      x: 0,
      y: 0,
      width: 1000,
      height: width,
    }),
    [],
  );

  const smoothScalingAnimateFunc = useCallback(
    (frame?: IFrame) => {
      if (!frame) return false;
      // animate scale toward target scale
      const stage = stageRef.current;
      if (!stage || !stage.targetPositionOffset) return false;

      if (smoothScaling) {
        const currentScale = stage.scaleX();

        const t = (frame.timeDiff / 1000) * 20;

        const newScale = lerp01(currentScale, stage.targetScale ?? 1.0, t);

        stage.scaleX(newScale);
        stage.scaleY(newScale);

        // use the same lerp trick to animate our position, but using the targetPositionOffset,
        // subtracting until it is zero so that the stage position can still be changed externally
        const prevPosition = stage.position();

        const targetPosition = {
          x: prevPosition.x + stage.targetPositionOffset.x,
          y: prevPosition.y + stage.targetPositionOffset.y,
        };

        const newPosition = lerp2d01(prevPosition, targetPosition, t);

        const difference = {
          x: newPosition.x - prevPosition.x,
          y: newPosition.y - prevPosition.y,
        };

        stage.position(newPosition);
        stage.targetPositionOffset = {
          x: stage.targetPositionOffset.x - difference.x,
          y: stage.targetPositionOffset.y - difference.y,
        };
      }
    },
    [smoothScaling],
  );

  useKonvaAnimation(smoothScalingAnimateFunc, {
    layer: stageRef?.current?.getLayer() as Konva.Layer,
  });

  const limitBoundsAnimateFunc = useCallback(
    (frame?: IFrame) => {
      if (!frame) return false;
      // animate scale toward target scale
      const stage = stageRef.current;
      if (!stage) return false;

      if (smoothSnapBackToBounds && stage.isSnappingBack && stage.targetPosition) {
        const position = stage.position();
        const targetPosition = stage.targetPosition;
        const newPosition = lerp2d01(position, targetPosition, (frame.timeDiff / 1000) * 14);
        const movement = {
          x: newPosition.x - position.x,
          y: newPosition.y - position.y,
        };

        stage.position(newPosition);

        if (Math.abs(movement.x) < 0.01 && Math.abs(movement.y) < 0.01) {
          stage.isSnappingBack = false;
          stage.targetPosition = undefined;
        }
      } else {
        return false;
      }
    },
    [smoothSnapBackToBounds],
  );

  useKonvaAnimation(limitBoundsAnimateFunc, {
    layer: stageRef?.current?.getLayer() as Konva.Layer,
  });

  // // Ensure that the
  // useLayoutEffect(() => {
  //   const stage = stageRef.current;
  //   if (!stage) return;

  //   const container = stage.container();

  //   // Make sure the stage container has a tab index so that we can
  //   // focus it and pick up keyboard events on it.
  //   if (typeof container.tabIndex == "undefined") {
  //     container.tabIndex = 1;
  //   }
  // }, []);

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
            const scaleDelta = Math.exp(-e.deltaY / 100);

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
            newScale = Math.min(Math.max(0.1, newScale), 20);

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

            // recheck viewport bounds on zoom
            const viewportBoundsNeg = {
              x: -viewportBounds.x,
              y: -viewportBounds.y,
              width: viewportBounds.width,
              height: viewportBounds.height,
            };

            const cameraPosition = getViewportAABB(stage);

            if (!aabbContains(viewportBoundsNeg, cameraPosition)) {
              const fixedCameraPosition = lockAABBInAABB(viewportBoundsNeg, cameraPosition);
              stage.targetPosition = {
                x: -fixedCameraPosition.x / (1 / stage.scaleX()),
                y: -fixedCameraPosition.y / (1 / stage.scaleY()),
              };
              stage.isSnappingBack = true;
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
      onWheelProp,
      smoothScaling,
      viewportBounds.height,
      viewportBounds.width,
      viewportBounds.x,
      viewportBounds.y,
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

  // Mouse enter/leave handlers to handle the isMouseInside attribute.
  const mouseHandlers = {
    onMouseEnter: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = stageRef.current;
      if (!stage) return;

      stage.isMouseInside = true;

      if (props.onMouseEnter) {
        props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = stageRef.current;
      if (!stage) return;

      stage.isMouseInside = false;

      if (props.onMouseLeave) {
        props.onMouseLeave(e);
      }
    },
  };

  const dragHandlers = {
    onDragStart(e: Konva.KonvaEventObject<DragEvent>) {
      const stage = stageRef.current;
      if (stage) {
        stage.isSnappingBack = false;
        if (e.evt) {
          // When an object within the stage is dragged, these event handler will be called
          // multiple times for each event as the event bubbles up to the stage.
          // As the event bubbles up the parent node, e.currentTarget will store the current node
          // while e.target will always be the target of the event (the node being dragged).

          // We only care when currentTarget is the stage
          // so we only process each drag event once.
          if (e.currentTarget === stage) {
            // If we're dragging a node that isn't the stage, but we're holding shift,
            // we switch that drag event over to the stage.
            if (e.target !== stage) {
              const shiftKeyDown = e.evt.shiftKey;
              const middleMouseDown = e.evt.buttons === 4;

              if (shiftKeyDown || middleMouseDown) {
                e.evt.preventDefault();
                e.target.stopDrag();
                e.target = stage;
                stage.startDrag(e);
              }
            }
          }
        }
      }

      if (props.onDragStart) {
        props.onDragStart(e);
      }
    },
    onDragMove(e: Konva.KonvaEventObject<DragEvent>) {
      const stage = stageRef.current;
      const { target, evt } = e;
      const { movementX, movementY } = evt;
      if (stage && evt) {
        const cameraPosition = getViewportAABB(stage);
      }

      if (props.onDragMove) {
        props.onDragMove(e);
      }
    },
    onDragEnd(e: Konva.KonvaEventObject<DragEvent>) {
      const stage = stageRef.current;
      const { target, evt } = e;
      if (stage && evt) {
        updateCollisionRefs();

        if (target === stage && e.currentTarget === stage) {
          // Check to see if we need to snap the position back to the bounds.

          const cameraPosition = getViewportAABB(stage);

          const vpb = {
            x: -viewportBounds.x,
            y: -viewportBounds.y,
            width: viewportBounds.width,
            height: viewportBounds.height,
          };

          if (!aabbContains(vpb, cameraPosition)) {
            const fixedCameraPosition = lockAABBInAABB(vpb, cameraPosition);
            stage.targetPosition = {
              x: -fixedCameraPosition.x / (1 / stage.scaleX()),
              y: -fixedCameraPosition.y / (1 / stage.scaleY()),
            };
            stage.isSnappingBack = true;
          }
        }
      }

      if (props.onDragEnd) {
        props.onDragEnd(e);
      }
    },
  };

  return (
    <>
      <Stage
        draggable
        ref={stageRef}
        width={width}
        height={height}
        {...props}
        {...mouseHandlers}
        {...dragHandlers}
      >
        <Layer>
          <Rect width={viewportBounds.width} height={viewportBounds.height} fill="cornflowerblue" />
          <FixedRect x={100} y={100} />
          <DraggableRect x={180} y={150} />
          <BoundInnerDraggableRect x={260} y={200} />
          <Rect ref={ref1} {...testRect1} fill="gray" />
          <Rect ref={ref2} {...testRect2} fill="black" />
          <Rect
            ref={ref3}
            {...testRect3}
            fill="yellow"
            draggable
            onDragMove={updateCollisionRefs}
          />
        </Layer>
      </Stage>
      <div style={{ width: 500, height: 200, background: "lightgray" }}>
        <code>{`React Renders: ${renders}`}</code>
        <br />
        <button
          onClick={() => {
            rerender();
          }}
        >
          Trigger One
        </button>
      </div>
    </>
  );
}
