import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SpringTest, SpringTestProps } from "./SpringTest";

export default {
  component: SpringTest,
  title: "Spring",
} as ComponentMeta<typeof SpringTest>;

const Template: ComponentStory<typeof SpringTest> = (args: SpringTestProps) => {
  return (
    <>
      <SpringTest {...args} />
    </>
  );
};

const defaultProps: SpringTestProps = {
  width: 700,
  height: 700,
  count: 500,
};

const create = (args?: Partial<SpringTestProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
