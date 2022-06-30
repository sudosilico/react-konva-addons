import { KonvaEventObject } from "konva/lib/Node";

export type KonvaDragHandler = (evt: KonvaEventObject<DragEvent>) => void;

export type KonvaMouseHandler = (evt: KonvaEventObject<MouseEvent>) => void;

export type KonvaDragHandlers = {
  onDragStart: KonvaDragHandler;
  onDragMove: KonvaDragHandler;
  onDragEnd: KonvaDragHandler;
};

export type KonvaMouseHandlers = {
  onMouseEnter: KonvaMouseHandler;
  onMouseLeave: KonvaMouseHandler;
};

type AllHandlers = KonvaDragHandlers & KonvaMouseHandlers;

export type KonvaAddonProps = Partial<AllHandlers>;
