import { html, Wrec } from "wrec";
import "./traffic-light"; // register custom element
import type TrafficLight from "./traffic-light";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class LightController extends Wrec {
  static html = html`<traffic-light></traffic-light>`;

  async connectedCallback() {
    // Wait for wrec to finish build the DOM.
    await super.connectedCallback();
    const trafficLight = this.shadowRoot?.querySelector(
      "traffic-light",
    ) as TrafficLight;
    if (!trafficLight) return;
    while (true) {
      const { state } = trafficLight;
      const seconds = state === "stop" ? 3 : state === "yield" ? 1 : 2;
      await sleep(seconds * 1000);
      trafficLight.next();
    }
  }
}

LightController.define("light-controller");
