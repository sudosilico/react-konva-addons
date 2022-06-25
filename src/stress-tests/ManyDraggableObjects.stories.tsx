import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ManyDraggableObjects, ManyDraggableObjectsProps } from "./ManyDraggableObjects";

export default {
  component: ManyDraggableObjects,
  title: "StressTests/Draggable Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyDraggableObjects>;

const Template: ComponentStory<typeof ManyDraggableObjects> = (args: ManyDraggableObjectsProps) => {
  return <ManyDraggableObjects {...args} />;
};

const defaultProps: ManyDraggableObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyDraggableObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
