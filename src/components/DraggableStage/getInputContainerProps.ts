import { AddonsStageRefs } from "./AddonsStageState";

export function getInputContainerProps({
  contextStateRef,
  stageRef,
  dragOverlayRef,
  bgRef,
}: AddonsStageRefs) {
  return {
    onKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
      //
    },
    onKeyUp(evt: React.KeyboardEvent<HTMLDivElement>) {
      //
    },
  };
}
