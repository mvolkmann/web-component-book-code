import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { expect } from "storybook/test";
import { HelloWorld } from "../hello-world.ts";
import "../hello-world.ts";

const component = "hello-world";
let { args, argTypes, template } = getStorybookHelpers(component);
const defaultName = "World";
const meta: Meta = {
  component,
  /*
  args: {
    name: defaultName,
  },
  argTypes: {
    name: {
      control: "text", // the default
      table: {
        defaultValue: { summary: defaultName },
      },
      description: "name to greet",
    },
  },
  */
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {
  play: ({ canvasElement }) => {
    const helloWorld = canvasElement.querySelector("hello-world") as HelloWorld;
    expect(helloWorld).toBeInTheDocument();
    if (!helloWorld) return;

    function verifyText(name: string) {
      const p = helloWorld!.shadowRoot?.querySelector("p");
      expect(p).toBeInTheDocument();
      expect(p).toHaveTextContent(`Hello, ${name}!`);
    }

    // The "name" attribute is not set yet.
    let name = "World";
    verifyText(name);

    // Set the "name" attribute.
    name = "Earth";
    helloWorld.setAttribute("name", name);
    expect(helloWorld).toHaveProperty("name", name);
    verifyText(name);

    // Set the "name" property.
    name = "Moon";
    helloWorld.name = name;
    expect(helloWorld).toHaveAttribute("name", name);
    verifyText(name);
  },
};

export const Named: StoryObj = {
  args: { name: "Earth" },
  //render: () => html`<hello-world name="Earth" />`,
};
