import { AddonsStageRefs } from "./DraggableStage";

export type AddonsStageState = {
  viewOffset: { x: number; y: number };
  refs?: AddonsStageRefs;
};

export const initialAddonsStageState: AddonsStageState = {
  viewOffset: { x: 0, y: 0 },
};
