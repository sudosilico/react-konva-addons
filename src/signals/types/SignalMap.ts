import Konva from "konva";
import { NodeConfig } from "konva/lib/Node";
import { Signal } from "../useSignal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributeSignalOverUnion<T> = T extends any ? Signal<T> : never;

type RemoveUndefined<T> = T extends undefined ? never : T;

export type SignalMap<N extends Konva.Node, C extends NodeConfig> = {
  [K in keyof C]: K extends string
    ? DistributeSignalOverUnion<RemoveUndefined<C[K]>> | undefined
    : never;
};
