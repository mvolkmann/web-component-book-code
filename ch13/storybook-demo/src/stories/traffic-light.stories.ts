import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../traffic-light.js";

const meta: Meta = {
  component: "traffic-light",
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {};

export const Specified: StoryObj = {
  //args: { state: "yield" },
  render: () => html`<traffic-light state="yield" />`,
};
