import { ComponentStory, ComponentMeta } from "@storybook/react";
import Konva from "konva";
import { useCallback, useRef } from "react";
import { Group, Layer, Rect, Stage } from "react-konva";
import { DraggableSquare } from "./DraggableSquare";
import { DraggableStage, DraggableStageProps } from "./DraggableStage";

export default {
  component: DraggableStage,
  title: "DraggableStage",
  argTypes: {},
} as ComponentMeta<typeof DraggableStage>;

const defaultProps: DraggableStageProps = {
  width: 500,
  height: 500,
};

const Template: ComponentStory<typeof DraggableStage> = (args: DraggableStageProps) => {
  return <DraggableStage {...args} />;
};

const create = (args?: Partial<DraggableStageProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = () => {
  return (
    <DraggableStage width={500} height={500}>
      <Layer>
        <DraggableSquare color="black" />
        <DraggableSquare color="red" />
        <DraggableSquare color="yellow" />
      </Layer>
    </DraggableStage>
  );
};

const DragGroupTest = () => {
  const dragRef = useRef<Konva.Rect>(null);
  const groupRef = useRef<Konva.Group>(null);

  const onDragStart = useCallback(() => {
    const drag = dragRef.current;
    const group = groupRef.current;
    const stage = group?.getStage();

    if (!drag || !group || !stage) {
      return;
    }

    drag.stopDrag();

    const size = group.getClientRect();
    const pos = stage.getPointerPosition();

    group.startDrag();
  }, []);

  return (
    <>
      <Group ref={groupRef}>
        <Rect
          ref={dragRef}
          x={100}
          y={0}
          width={50}
          height={50}
          fill={"blue"}
          draggable
          onDragStart={onDragStart}
        />
        <Rect x={100} y={50} width={50} height={50} fill={"cyan"} />
      </Group>
    </>
  );
};

export const Test1 = () => {
  return (
    <Stage width={650} height={650}>
      <Layer>
        <Rect width={650} height={650} fill={"gray"} />
      </Layer>
      <Layer>
        <DragGroupTest />
      </Layer>
    </Stage>
  );
};
