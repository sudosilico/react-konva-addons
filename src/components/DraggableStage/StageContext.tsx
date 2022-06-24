import { RefObject, createContext, useContext } from "react";
import { AddonsStageState } from "./AddonsStageState";

export type AddonsStageContextValue = {
  stateRef?: RefObject<AddonsStageState>;
};

export const AddonsStageContext = createContext<AddonsStageContextValue>({});

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
