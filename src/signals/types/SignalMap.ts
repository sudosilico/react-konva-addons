import Konva from "konva";
import { NodeConfig } from "konva/lib/Node";
import { Signal } from "../useSignal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type RemoveLastUnionElement<Union> = Exclude<Union, GetLastUnionElement<Union>>;
type GetLastUnionElement<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToSignalUnion<Union> = ToSignalUnionRec<Union, Union>;
type ToSignalUnionRec<Union, Rslt> = RemoveLastUnionElement<Union> extends never
  ? Signal<GetLastUnionElement<Union>> | Rslt
  : ToSignalUnionRec<RemoveLastUnionElement<Union>, Signal<GetLastUnionElement<Union>>>;

export type SignalMap<N extends Konva.Node, C extends NodeConfig> = {
  [K in keyof C]: K extends string ? ToSignalUnion<C[K]> : never;
};
