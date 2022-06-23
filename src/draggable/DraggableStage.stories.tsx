import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DraggableStage, DraggableStageProps } from "./DraggableStage";

export default {
  component: DraggableStage,
  title: "DraggableStage",
  argTypes: {},
} as ComponentMeta<typeof DraggableStage>;

const Template: ComponentStory<typeof DraggableStage> = (
  args: DraggableStageProps
) => {
  return <DraggableStage {...args} />;
};

const defaultProps: DraggableStageProps = {
  // TODO: Add default props
};

const create = (args?: Partial<DraggableStageProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
