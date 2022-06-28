import Konva from "konva";
import { RefObject, useRef } from "react";
import { Group, Layer, Rect, Stage, StageProps } from "react-konva";
import { getStageBackgroundProps, getDraggableStageProps } from "./getDraggableStageProps";
import { AddonsStageContext, useStageState } from "./StageContext";
import { getInputContainerProps } from "./getInputContainerProps";
import { useStageScrollListener } from "./useStageScrollListener";

export type StageContextState = {
  viewOffset: { x: number; y: number };
  refs?: DraggableStageRefs;
};

const initialStageState: StageContextState = {
  viewOffset: { x: 0, y: 0 },
};

export type StageContextRef = React.MutableRefObject<StageContextState>;

export type DraggableStageRefs = {
  stageContextRef: StageContextRef;
  stageRef: RefObject<Konva.Stage>;
  bgRef: RefObject<Konva.Rect>;
};

export type DraggableStageProps = StageProps & {
  bgFill?: string;
  overrideTabIndex?: number;
};

export function DraggableStage(props: DraggableStageProps) {
  // inputs
  const { width, height, bgFill, overrideTabIndex } = props;
  const tabIndex = typeof overrideTabIndex === "number" ? overrideTabIndex : 1;

  // refs
  const contextStateRef = useRef<StageContextState>(initialStageState) as StageContextRef;
  const stageRef = useRef<Konva.Stage>(null);
  const bgRef = useRef<Konva.Rect>(null);

  const refs: DraggableStageRefs = {
    stageContextRef: contextStateRef,
    stageRef,
    bgRef,
  };

  contextStateRef.current.refs = refs;

  // props
  const stageProps = getDraggableStageProps(refs);
  const inputContainerProps = getInputContainerProps(refs);
  const bgProps = getStageBackgroundProps(refs);

  useStageScrollListener(refs);

  return (
    <div
      tabIndex={tabIndex}
      style={{
        backgroundColor: bgFill,
        width: width,
        height: height,
      }}
      {...inputContainerProps}
    >
      <Stage ref={stageRef} {...props} {...stageProps}>
        <AddonsStageContext.Provider value={{ stateRef: contextStateRef }}>
          <Layer>
            <Rect ref={bgRef} width={width} height={height} {...bgProps} draggable />
          </Layer>
          {props.children}
        </AddonsStageContext.Provider>
      </Stage>
    </div>
  );
}
