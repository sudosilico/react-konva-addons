import { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

export function TestStuff({ setSelection }: { setSelection: (selection: string) => void }) {
  console.log("rendering TestStuff");

  return (
    <Rect
      width={20}
      height={20}
      onClick={() => {
        setSelection("blue");
      }}
      fill="blue"
    />
  );
}

export function TestStuff2({ setSelection }: { setSelection: (selection: string) => void }) {
  console.log("rendering TestStuff2");

  return (
    <Rect
      width={20}
      height={20}
      x={20}
      onClick={() => {
        setSelection("red");
      }}
      fill="red"
    />
  );
}

export function Indicator({ selection }: { selection: string }) {
  console.log("rendering Indicator");

  return <Rect width={20} height={20} x={50} fill={selection} />;
}

export function MyTestStuffContainer() {
  const [selection, setSelection] = useState("blue");

  console.log("rendering MyTestStuffContainer");

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect width={500} height={500} fill="gray" />
        <TestStuff setSelection={setSelection} />
        <TestStuff2 setSelection={setSelection} />
        <Indicator selection={selection} />
      </Layer>
    </Stage>
  );
}
