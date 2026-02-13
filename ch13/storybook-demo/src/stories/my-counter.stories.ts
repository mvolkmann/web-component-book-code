import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "../my-counter.js";

const component = "my-counter";
let { args, argTypes, template } = getStorybookHelpers(component);
const meta: Meta = {
  component,
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Named: Story = {
  args: { count: 19 } as Partial<Meta>,
};
