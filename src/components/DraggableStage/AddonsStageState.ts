import { DraggableStageRefs } from "./DraggableStage";

export type DraggableStageContextState = {
  viewOffset: { x: number; y: number };
  refs?: DraggableStageRefs;
};

export const initialAddonsStageState: AddonsStageState = {
  viewOffset: { x: 0, y: 0 },
};
