import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NewDraggableStage, NewDraggableStageProps } from "./NewDraggableStage";

export default {
  component: NewDraggableStage,
  title: "NewDraggableStage",
  argTypes: {},
} as ComponentMeta<typeof NewDraggableStage>;

const Template: ComponentStory<typeof NewDraggableStage> = (args: NewDraggableStageProps) => {
  return <NewDraggableStage {...args} />;
};

const defaultProps: NewDraggableStageProps = {
  // TODO: Add default props
};

const create = (args?: Partial<NewDraggableStageProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
