import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Layer } from "react-konva";
import { DraggableStage } from "../DraggableStage/DraggableStage";
import { FrameCounter, FrameCounterProps } from "./FrameCounter";

export default {
  component: FrameCounter,
  title: "FrameCounter",
  argTypes: {},
} as ComponentMeta<typeof FrameCounter>;

const Template: ComponentStory<typeof FrameCounter> = (args: FrameCounterProps) => {
  return (
    <DraggableStage width={500} height={500}>
      <Layer>
        <FrameCounter {...args} />
      </Layer>
    </DraggableStage>
  );
};

const defaultProps: FrameCounterProps = {
  x: 0,
  y: 0,
  width: 500,
  height: 500,
};

const create = (args?: Partial<FrameCounterProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
