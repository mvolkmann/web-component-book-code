import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "../traffic-light.js";

const component = "traffic-light";
const { args, argTypes, template } = getStorybookHelpers(component);
// The control type is inferred to be "text", but we want "radio".
const { state } = argTypes;
state.control = "radio";
state.options = ["stop", "yield", "go"];
//const defaultState = "stop";
const meta: Meta = {
  component,
  /*
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
  */
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {};

export const Specified: StoryObj = {
  //args: { state: "yield" },
  render: () => html`<traffic-light state="yield" />`,
};
