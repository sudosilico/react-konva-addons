import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject, useState } from 'react';
import { KonvaAddonProps } from '../handlers/KonvaHandlers';
import { shouldPanStage } from './shouldPanStage';

const MAX_POINT: [number, number] = [Number.MAX_VALUE, Number.MAX_VALUE];

export type UseDraggableOptions = {
  cursor: string;
};

export function useDraggable<T extends Konva.Node>(
  ref: RefObject<T>,
  addonProps?: KonvaAddonProps,
  options?: UseDraggableOptions
) {
  const [position, setPosition] = useState<[number, number]>(MAX_POINT);
  const [isStageDragging, setIsStageDragging] = useState<boolean>(false);

  function onDragStart(evt: KonvaEventObject<DragEvent>) {
    if (shouldPanStage(evt)) {
      const node = ref.current;
      if (!node) return;

      setIsStageDragging(true);
      setPosition([node.x(), node.y()]);
    } else {
      setIsStageDragging(false);

      if (addonProps?.onDragStart) {
        addonProps.onDragStart(evt);
      }
    }
  }

  function onDragMove(evt: KonvaEventObject<DragEvent>) {
    if (isStageDragging) {
      const node = ref.current;
      if (!node) return;

      const [x, y] = position;

      node.x(x);
      node.y(y);
    } else {
      if (addonProps?.onDragMove) {
        addonProps.onDragMove(evt);
      }

      if (options && options.cursor) {
        const node = ref.current;
        if (!node) return;

        const stage = node.getStage();
        if (stage) {
          stage.container().style.cursor = options.cursor;
        }
      }
    }
  }

  function onDragEnd(evt: KonvaEventObject<DragEvent>) {
    if (isStageDragging) {
      const node = ref.current;
      if (!node) return;

      const [x, y] = position;

      node.x(x);
      node.y(y);
    } else {
      if (addonProps?.onDragEnd) {
        addonProps.onDragEnd(evt);
      }

      const node = ref.current;
      if (!node) return;

      const stage = node.getStage();
      if (stage) {
        stage.container().style.cursor = 'default';
      }
    }
  }

  return {
    ...addonProps,
    onDragStart,
    onDragMove,
    onDragEnd,
  } as KonvaAddonProps;
}
