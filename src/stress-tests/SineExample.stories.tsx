import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SineExample, SineExampleProps } from "./SineExample";

export default {
  component: SineExample,
  title: "SineExample",
  argTypes: {},
} as ComponentMeta<typeof SineExample>;

const Template: ComponentStory<typeof SineExample> = (args: SineExampleProps) => {
  return <SineExample {...args} />;
};

const defaultProps: SineExampleProps = {
  // TODO: Add default props
};

const create = (args?: Partial<SineExampleProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
