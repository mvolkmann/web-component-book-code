import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { expect, userEvent } from "storybook/test";
import { HelloGoodbye } from "../hello-goodbye.ts";
import "../hello-goodbye.ts";

type StoryArgs = {
  name: string;
  salutation: string;
};

const component = "hello-goodbye";
let { args, argTypes, template } = getStorybookHelpers<StoryArgs>(component);
const meta: Meta<StoryArgs> = {
  component,
  args,
  argTypes,
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const helloGoodbye = canvasElement.querySelector("hello-goodbye") as HelloGoodbye;
    expect(helloGoodbye).toBeInTheDocument();
    if (!helloGoodbye) return;

    expect(helloGoodbye.salutation).toBe("Hello");
    expect(helloGoodbye.name).toBe("World");

    const p = helloGoodbye.shadowRoot?.querySelector("p");
    expect(p).toBeInTheDocument();
    if (!p) return;

    expect(p).toHaveTextContent("Hello");
    await userEvent.click(helloGoodbye);
    expect(p).toHaveTextContent("Goodbye");
    await userEvent.click(helloGoodbye);
    expect(p).toHaveTextContent("Hello");
  },
};

export const Named: Story = {
  args: { name: "Earth" },
};
