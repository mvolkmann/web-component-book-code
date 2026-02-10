import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect } from "storybook/test";
import { HelloWorld } from "../hello-world.ts";
import "../hello-world.ts";

const meta: Meta = {
  component: "hello-world",
};
export default meta;

const html = String.raw;

export const Default: StoryObj = {
  play: ({ canvasElement }) => {
    console.log("hello-world.stories.ts play entered");
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
