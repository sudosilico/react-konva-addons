import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MyTestStuffContainer2 } from "./TestStuff2";
import { MyExample } from "./WithAddonExample";

export default {
  title: "TestStuff",
  component: MyExample,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "z",
        content: "This is a docstring for MyExample.",
        story: "storytxt",
      },
    },
  },
} as ComponentMeta<typeof MyExample>;

export const Basic: ComponentStory<typeof MyExample> = () => {
  return <MyExample />;
};

export const Basic2: ComponentStory<typeof MyExample> = () => {
  return <MyTestStuffContainer2 />;
};
