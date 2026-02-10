import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../hello-world.ts";

const meta: Meta = {
  title: "Components/HelloWorld",
  component: "hello-world",
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {};

export const Named: StoryObj = {
  render: () => html`<hello-world name="Mark" />`,
};
