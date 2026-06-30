import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { expect } from "storybook/test";
import { HelloWorld } from "../hello-world.ts";
import "../hello-world.ts";

type StoryArgs = {
  name: string;
};

const component = "hello-world";
let { args, argTypes, template } = getStorybookHelpers<StoryArgs>(component);
//const defaultName = "World";
const meta: Meta<StoryArgs> = {
  component,
  args,
  argTypes,
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {
  play: ({ canvasElement }) => {
    const helloWorld = canvasElement.querySelector("hello-world") as HelloWorld;
    expect(helloWorld).toBeInTheDocument();
    if (!helloWorld) return;

    function verifyText(name: string) {
      const p = helloWorld!.shadowRoot?.querySelector("p");
      expect(p).toBeInTheDocument();
      expect(p).toHaveTextContent(`Hello, ${name}!`);
    }

    // Set the "name" attribute.
    let name = "Earth";
    helloWorld.setAttribute("name", name);
    expect(helloWorld).toHaveProperty("name", name);
    verifyText(name);

    // Set the "name" property.
    name = "Moon";
    helloWorld.name = name;
    expect(helloWorld).toHaveAttribute("name", name);
    verifyText(name);

    name = "World";
    helloWorld.setAttribute("name", name);
    verifyText(name);
  },
};

export const Named: Story = {
  args: { name: "Earth" },
};
