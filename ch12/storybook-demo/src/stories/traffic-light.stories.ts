import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { TrafficLight } from "../traffic-light.ts";
import "../traffic-light.js";
import { expect, userEvent } from "storybook/test";

const component = "traffic-light";
const { args, argTypes, template } = getStorybookHelpers(component);

// The control type is inferred to be "text", but we want "radio".
const { state } = argTypes;
state.control = "radio";
state.options = ["stop", "yield", "go"];

//const defaultState = "stop";
const meta: Meta = {
  component,
  /*
  args: {
    state: defaultState,
  },
  argTypes: {
    state: {
      control: "radio",
      options: ["stop", "yield", "go"],
      table: {
        defaultValue: { summary: defaultState },
      },
      description: "traffic light state",
    },
  },
  */
  args,
  argTypes,
  render: (args) => template(args),
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const trafficLight = canvasElement.querySelector(
      "traffic-light",
    ) as TrafficLight;
    expect(trafficLight).toBeInTheDocument();
    if (!trafficLight) return;

    expect(trafficLight.state).toBe("stop");

    await userEvent.click(trafficLight);
    expect(trafficLight.state).toBe("yield");

    trafficLight.next();
    expect(trafficLight.state).toBe("go");

    trafficLight.state = "stop";
  },
};

export const Specified: Story = {
  args: { state: "yield" } as Partial<Meta>,
};
