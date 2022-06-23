import { KonvaEventObject } from "konva/lib/Node";

export function shouldPanStage(e: KonvaEventObject<DragEvent>) {
  const shift = e.evt.getModifierState("Shift");
  const buttons = e.evt.buttons;

  return (buttons === 1 && shift) || buttons === 4;
}
