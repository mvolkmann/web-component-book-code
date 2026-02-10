import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../my-counter.js";

const meta: Meta = { component: "my-counter" };
export default meta;

export const Default: StoryObj = {};

export const Named: StoryObj = {
  args: { count: 19 },
};
