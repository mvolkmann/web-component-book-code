import { html, Wrec } from "wrec";
import "./traffic-light"; // register custom element

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class LightController2 extends Wrec {
  static properties = {
    light: { type: String, value: "stop" },
  };
  static html = html`<traffic-light state="this.light"></traffic-light>`;

  async ready() {
    while (true) {
      const l = this.light;
      const seconds = l === "stop" ? 3 : l === "yield" ? 1 : 2;
      await sleep(seconds * 1000);
      this.light = l === "stop" ? "go" : l === "yield" ? "stop" : "yield";
    }
  }
}

LightController2.define("light-controller2");
