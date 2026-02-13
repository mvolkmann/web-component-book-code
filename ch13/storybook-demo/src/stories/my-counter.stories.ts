import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../my-counter.js";

const meta: Meta = { component: "my-counter" };
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Named: Story = {
  args: { count: 19 } as Partial<Meta>,
};
