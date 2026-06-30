import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "../my-counter.js";

type StoryArgs = {
  count: number;
};

const component = "my-counter";
let { args, argTypes } = getStorybookHelpers<StoryArgs>(component);
const meta: Meta<StoryArgs> = {
  component,
  args,
  argTypes,
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {};

export const Named: Story = {
  args: { count: 19 },
};
