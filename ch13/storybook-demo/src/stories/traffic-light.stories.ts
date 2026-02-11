import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../traffic-light.js";

const defaultState = "stop";
const meta: Meta = {
  component: "traffic-light",
  args: {
    state: defaultState,
  },
  argTypes: {
    state: {
      control: "radio",
      options: ["stop", "yield", "go"],
      table: {
        defaultValue: { summary: defaultState },
      },
      description: "traffic light state",
    },
  },
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {};

export const Specified: StoryObj = {
  //args: { state: "yield" },
  render: () => html`<traffic-light state="yield" />`,
};
