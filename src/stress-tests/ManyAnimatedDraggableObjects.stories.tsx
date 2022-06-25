import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ManyAnimatedDraggableObjects,
  ManyAnimatedDraggableObjectsProps,
} from "./ManyAnimatedDraggableObjects";

export default {
  component: ManyAnimatedDraggableObjects,
  title: "StressTests/Animated Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyAnimatedDraggableObjects>;

const Template: ComponentStory<typeof ManyAnimatedDraggableObjects> = (
  args: ManyAnimatedDraggableObjectsProps,
) => {
  return <ManyAnimatedDraggableObjects {...args} />;
};

const defaultProps: ManyAnimatedDraggableObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyAnimatedDraggableObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
