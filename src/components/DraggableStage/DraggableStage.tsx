import Konva from "konva";
import { IFrame, Vector2d } from "konva/lib/types";
import { useCallback, useRef } from "react";
import { Stage, StageProps } from "react-konva";
import { useStageRedrawOnFontLoad, useWebFont } from "../../hooks";
import { useKonvaAnimation } from "../../hooks/animation/useKonvaAnimation";
import { AABB, aabbContains, getViewportAABB, lockAABBInAABB } from "../../utils/aabb";
import { lerp01, lerp2d01 } from "../../utils/math";
import { RemoveIndex } from "../../utils/type-utils";
import { useStageWheelListener } from "./useStageWheelListener";

export type DraggableStageAttribs = {
  isMouseInside?: boolean;
  targetScale?: number;
  targetPositionOffset?: Vector2d;
  isSnappingBack?: boolean;
  targetPosition?: Vector2d;
};

export type DraggableStageProps = RemoveIndex<StageProps> & {
  onWheel?: (evt: Konva.KonvaEventObject<WheelEvent>) => void;
  width: number;
  height: number;
  viewportBounds?: AABB;
  smoothScaling?: boolean;
  minZoom: number;
  maxZoom: number;
  children?: React.ReactNode;
  smoothSnapBackToBounds?: boolean;
  scalingSensitivity: number;
};

const defaultProps: DraggableStageProps = {
  width: 500,
  height: 500,
  minZoom: 0.1,
  maxZoom: 20,
  smoothScaling: true,
  smoothSnapBackToBounds: true,
  scalingSensitivity: 0.2,
};

export function DraggableStage(props: DraggableStageProps) {
  const propsWithDefaults: DraggableStageProps = { ...defaultProps, ...props };
  const {
    width,
    height,
    viewportBounds,
    smoothScaling,
    minZoom,
    maxZoom,
    children,
    smoothSnapBackToBounds,
    scalingSensitivity,
  } = propsWithDefaults;

  const stageRef = useRef<Konva.Stage & DraggableStageAttribs>(null);

  const onWheelProp = props.onWheel;

  // font loading
  useStageRedrawOnFontLoad(stageRef);
  useWebFont("Inter", [300, 400, 500, 600, 700]);

  const lockViewportToBounds = useCallback(
    (stage: Konva.Stage & DraggableStageAttribs, hardSnap?: boolean) => {
      if (!viewportBounds) return false;

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

        if (hardSnap) {
          stage.position(stage.targetPosition);
          stage.isSnappingBack = false;
          return true;
        } else {
          stage.isSnappingBack = true;
        }

        return true;
      } else {
        stage.targetPosition = stage.position();
        stage.isSnappingBack = false;
        return false;
      }
    },
    [viewportBounds],
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
        } else {
          lockViewportToBounds(stage);
        }
      } else {
        return false;
      }
    },
    [smoothSnapBackToBounds, lockViewportToBounds],
  );

  useKonvaAnimation(limitBoundsAnimateFunc, {
    layer: stageRef?.current?.getLayer() as Konva.Layer,
    disabled: !viewportBounds,
  });

  useStageWheelListener(
    stageRef,
    minZoom,
    maxZoom,
    smoothScaling,
    lockViewportToBounds,
    scalingSensitivity,
    onWheelProp,
  );

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
      e.evt.preventDefault();

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
      if (e && e.evt) {
        e.evt.preventDefault();
      }

      const stage = stageRef.current;
      const { target, evt } = e;
      const { movementX, movementY } = evt;
      if (stage && evt) {
        if (!smoothSnapBackToBounds) {
          lockViewportToBounds(stage, true);
        }
      }

      if (props.onDragMove) {
        props.onDragMove(e);
      }
    },
    onDragEnd(e: Konva.KonvaEventObject<DragEvent>) {
      if (e && e.evt) {
        e.evt.preventDefault();
      }

      const stage = stageRef.current;
      const { target, evt } = e;
      if (stage && evt) {
        if (target === stage && e.currentTarget === stage && viewportBounds) {
          lockViewportToBounds(stage);
        }
      }

      if (props.onDragEnd) {
        props.onDragEnd(e);
      }
    },
  };

  return (
    <div style={{ width: width, height: height, backgroundColor: "lightgray" }}>
      <Stage draggable ref={stageRef} {...props} {...mouseHandlers} {...dragHandlers}>
        {children}
      </Stage>
    </div>
  );
}
