import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FastAnimation, FastAnimationProps } from "./FastAnimation";

export default {
  component: FastAnimation,
  title: "StressTests/Animated Rects (Fast)",
  argTypes: {},
} as ComponentMeta<typeof FastAnimation>;

const Template: ComponentStory<typeof FastAnimation> = (args: FastAnimationProps) => {
  return <FastAnimation {...args} />;
};

const defaultProps: FastAnimationProps = {
  count: 10,
};

const create = (args?: Partial<FastAnimationProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
