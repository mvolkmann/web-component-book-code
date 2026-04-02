import { html, Wrec } from "wrec";
import TrafficLight from "./traffic-light";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const sleepMap: Record<string, number> = {
  stop: 3,
  yield: 1,
  go: 2,
};

class MyApp extends Wrec {
  static html = html`<traffic-light></traffic-light>`;

  async connectedCallback() {
    await super.connectedCallback();
    const trafficLight = this.shadowRoot?.querySelector(
      "traffic-light",
    ) as TrafficLight;
    if (!trafficLight) return;
    while (true) {
      const ms = sleepMap[trafficLight.state] * 1000;
      await sleep(ms);
      trafficLight.next();
    }
  }
}

MyApp.define("my-app");
