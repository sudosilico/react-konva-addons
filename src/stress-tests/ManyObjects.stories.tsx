import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ManyObjects, ManyObjectsProps } from "./ManyObjects";

export default {
  component: ManyObjects,
  title: "StressTests/Non-Draggable Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyObjects>;

const Template: ComponentStory<typeof ManyObjects> = (args: ManyObjectsProps) => {
  return <ManyObjects {...args} />;
};

const defaultProps: ManyObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
