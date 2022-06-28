import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MultiTouchExample, MultiTouchExampleProps } from "./MultiTouchExample";

export default {
  component: MultiTouchExample,
  title: "MultiTouchExample",

  argTypes: {},
} as ComponentMeta<typeof MultiTouchExample>;

const Template: ComponentStory<typeof MultiTouchExample> = (args: MultiTouchExampleProps) => {
  return <MultiTouchExample {...args} />;
};

const defaultProps: MultiTouchExampleProps = {
  // TODO: Add default props
};

const create = (args?: Partial<MultiTouchExampleProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
