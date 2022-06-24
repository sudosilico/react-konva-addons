import { KonvaEventObject } from "konva/lib/Node";
import { Group, Layer } from "react-konva";
import { useStageContext } from "./DraggableStage/StageContext";

/**
 * This component allows the DraggableStage to properly handle drag events from objects within the group.
 */
export const DraggableGroup = (props: React.ComponentProps<typeof Group>) => {
  const stageContext = useStageContext();

  const groupOnDragStart = (e: KonvaEventObject<DragEvent>) => {
    const stage = stageContext?.current?.refs?.stageRef.current;
    if (!stage) return;

    const shift = e.evt.getModifierState("Shift");
    const { buttons } = e.evt;

    if ((buttons === 1 && shift) || buttons === 4) {
      e.target.stopDrag();
      e.currentTarget.stopDrag();
      stage.startDrag();
    } else {
      if (props.onDragStart) {
        props.onDragStart(e);
      }
    }
  };

  return (
    <Group {...props} onDragStart={groupOnDragStart}>
      {props.children}
    </Group>
  );
};

/**
 * This component allows the DraggableStage to properly handle drag events from objects within the layer.
 */
export const DraggableLayer = (props: React.ComponentProps<typeof Layer>) => {
  return (
    <Layer {...props}>
      <DraggableGroup>{props.children}</DraggableGroup>
    </Layer>
  );
};
