import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect } from "storybook/test";
import { HelloWorld } from "../hello-world.ts";
import "../hello-world.ts";

type StoryArgs = {
  name: string;
};

const meta: Meta<StoryArgs> = {
  component: "hello-world",
  args: {
    name: "World",
  },
  argTypes: {
    name: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {
  // Verifies that the greeting responds to attribute and property changes.
  play: ({ canvasElement }) => {
    const helloWorld = canvasElement.querySelector("hello-world") as HelloWorld;
    expect(helloWorld).toBeInTheDocument();
    if (!helloWorld) return;

    // Verifies that the component renders a greeting for the given name.
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
