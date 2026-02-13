import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { expect, userEvent } from "storybook/test";
import { HelloGoodbye } from "../hello-goodbye.ts";
import "../hello-goodbye.ts";

const component = "hello-goodbye";
let { args, argTypes, template } = getStorybookHelpers(component);
const meta: Meta = {
  component,
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const helloGoodbye = canvasElement.querySelector(
      "hello-goodbye",
    ) as HelloGoodbye;
    expect(helloGoodbye).toBeInTheDocument();
    if (!helloGoodbye) return;

    const p = helloGoodbye.shadowRoot?.querySelector("p");
    expect(p).toBeInTheDocument();
    if (!p) return;

    expect(p).toHaveTextContent("Hello");
    await userEvent.click(p);
    expect(p).toHaveTextContent("Goodbye");
    await userEvent.click(p);
    expect(p).toHaveTextContent("Hello");
  },
};

export const Named: Story = {
  args: { name: "Earth" } as Partial<Meta>,
};
