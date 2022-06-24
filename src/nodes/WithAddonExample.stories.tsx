import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MyExample } from "./WithAddonExample";

export default {
  component: MyExample,
  title: "MyExample",
  argTypes: {},
} as ComponentMeta<typeof MyExample>;

export const Basic: ComponentStory<typeof MyExample> = () => {
  return <MyExample />;
};
