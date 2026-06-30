import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
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
  // Renders the component using the current story arguments.
  render: ({ name }) => html`<hello-world name=${name}></hello-world>`,
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {};

export const Named: Story = {
  args: { name: "Earth" },
};
