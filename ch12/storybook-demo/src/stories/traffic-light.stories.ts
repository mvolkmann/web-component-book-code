import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { TrafficLight } from "../traffic-light.ts";
import "../traffic-light.js";

type StoryArgs = {
  state: "go" | "stop" | "yield";
};

const meta: Meta<StoryArgs> = {
  component: "traffic-light",
  args: {
    state: "stop",
  },
  argTypes: {
    state: {
      control: "radio",
      options: ["stop", "yield", "go"],
    },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {
  // Verifies the traffic light's default state and state transitions.
  play: async ({ canvasElement }) => {
    const trafficLight = canvasElement.querySelector("traffic-light") as TrafficLight;
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
  args: { state: "yield" },
};
