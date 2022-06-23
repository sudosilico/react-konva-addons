import Konva from "konva";
import { RefObject, ReactNode, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { DraggableStageBackground } from "./DraggableStageBackground";
import { useDraggableStage, DraggableStageRef } from "./useDraggableStage";

export type DraggableStageProps = {
  width: number;
  height: number;
  stageRef?: RefObject<DraggableStageRef>;
  children?: ReactNode;
};

function usePassedOrInternalRef<T>(inRef: RefObject<T> | undefined) {
  const selfRef = useRef<T>(null);
  return !inRef ? selfRef : inRef;
}

export const DraggableStage = (props: DraggableStageProps) => {
  const bgRef = useRef<Konva.Rect>(null);
  const ref = usePassedOrInternalRef<DraggableStageRef>(props.stageRef);

  const dragCallbacks = useDraggableStage(ref, bgRef);

  return (
    <Stage
      ref={ref}
      width={props.width}
      height={props.height}
      style={{
        backgroundColor: "gray",
        width: props.width,
        height: props.height,
      }}
      {...dragCallbacks}
    >
      <Layer>
        <DraggableStageBackground
          stageRef={ref}
          bgRef={bgRef}
          width={props.width}
          height={props.height}
        />
      </Layer>
      {props.children}
    </Stage>
  );
};
