import { Stage } from "react-konva";
import { useSignal } from "../signals/useSignal";
import { withSignals } from "../signals/withSignals";

const Stage$ = withSignals(Stage);

export type TemporaryProps = {
  //
};

export function Temporary(props: TemporaryProps) {
  const $className = useSignal<string>("myClassName");

  return (
    <Stage$
      $={{
        className: $className,
        x: undefined,
      }}
    ></Stage$>
  );
}
