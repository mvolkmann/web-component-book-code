import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import { HelloGoodbye } from "../hello-goodbye.ts";
import "../hello-goodbye.ts";

const meta: Meta = {
  component: "hello-goodbye",
};
export default meta;

const html = String.raw;

export const Primary: StoryObj = {
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

export const Named: StoryObj = {
  args: { name: "Earth" },
};
