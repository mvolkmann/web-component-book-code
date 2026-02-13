import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect, userEvent } from "storybook/test";
import "../hello-goodbye.ts";

const meta: Meta = {
  component: "hello-goodbye",
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    const helloGoodbye = body.querySelector("hello-goodbye");
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
