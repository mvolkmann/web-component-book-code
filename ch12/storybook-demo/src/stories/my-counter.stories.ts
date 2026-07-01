import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../my-counter.js";

type StoryArgs = {
  count: number;
};

const meta: Meta<StoryArgs> = {
  component: "my-counter",
  args: {
    count: 3,
  },
  argTypes: {
    count: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {};

export const Named: Story = {
  args: { count: 19 },
};
