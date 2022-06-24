import Konva from "konva";
import { RefObject, useRef } from "react";
import { Layer, Rect, Stage, StageProps } from "react-konva";
import { AddonsStageState, initialAddonsStageState } from "./AddonsStageState";
import { getStageBackgroundProps, getDragStageProps } from "./getDragStageProps";
import { AddonsStageContext } from "./StageContext";
import { getInputContainerProps } from "./getInputContainerProps";
import { useStageScrollListener } from "./useStageScrollListener";

export type StateRef = React.MutableRefObject<AddonsStageState>;

export type AddonsStageRefs = {
  contextStateRef: StateRef;
  stageRef: RefObject<Konva.Stage>;
  bgRef: RefObject<Konva.Rect>;
};

export type AddonsStageProps = StageProps & {
  bgFill?: string;
  overrideTabIndex?: number;
};

export function DraggableStage(props: AddonsStageProps) {
  // inputs
  const { width, height, bgFill, overrideTabIndex } = props;
  const tabIndex = typeof overrideTabIndex === "number" ? overrideTabIndex : 1;

  // refs
  const contextStateRef = useRef<AddonsStageState>(initialAddonsStageState) as StateRef;
  const stageRef = useRef<Konva.Stage>(null);
  const bgRef = useRef<Konva.Rect>(null);

  const refs: AddonsStageRefs = {
    contextStateRef,
    stageRef,
    bgRef,
  };

  if (contextStateRef.current) contextStateRef.current.refs = refs;

  // props
  const stageProps = getDragStageProps(refs);
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
            <Rect
              ref={bgRef}
              width={width}
              height={height}
              {...bgProps}
              fill="blue"
              opacity={0.5}
            />
          </Layer>
          {props.children}
        </AddonsStageContext.Provider>
      </Stage>
    </div>
  );
}
