import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../hello-world.ts";

const meta: Meta = {
  component: "hello-world",
  /*
  argTypes: {
    name: { control: "text" },
    boolean: { control: "boolean" },
    check: { control: "check", options: ["Red", "Green", "Blue"] },
    color: { control: "color" },
    date: { control: "date" },
    file: { control: "file" },
    inlineCheck: { control: "inline-check", options: ["Red", "Green", "Blue"] },
    inlineRadio: { control: "inline-radio", options: ["Red", "Green", "Blue"] },
    multiSelect: { control: "multi-select", options: ["Red", "Green", "Blue"] },
    number: { control: "number" },
    object: { control: "object" },
    range: { control: { type: "range", min: 10, max: 90, step: 10 } },
    radio: { control: "radio", options: ["Red", "Green", "Blue"] },
    select: { control: "select", options: ["Red", "Green", "Blue"] },
    text: { control: "text" },
  },
  */
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {};

export const Named: StoryObj = {
  args: { name: "Earth" },
  //render: () => html`<hello-world name="Earth" />`,
};
