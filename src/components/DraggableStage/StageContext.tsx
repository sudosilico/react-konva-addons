import { RefObject, createContext, useContext } from "react";
import { StageContextState } from "./DraggableStage";

export type DraggableStageContextValue = {
  stateRef?: RefObject<StageContextState>;
};

export const AddonsStageContext = createContext<DraggableStageContextValue>({});

export function useStageContext() {
  const value = useContext(AddonsStageContext);

  if (!value.stateRef) {
    return undefined;
  }

  return value.stateRef;
}

export function useStageState() {
  const ref = useStageContext();

  if (!ref) {
    return;
  }

  return ref.current;
}
