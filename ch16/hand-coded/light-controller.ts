import { html, Wrec } from "wrec";
import "./traffic-light"; // register custom element

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class LightController extends Wrec {
  static properties = { tl: { type: HTMLElement } };
  static html = html`<traffic-light ref="tl"></traffic-light>`;

  async ready() {
    const { tl } = this;
    while (true) {
      const { state } = tl;
      const seconds = state === "stop" ? 3 : state === "yield" ? 1 : 2;
      await sleep(seconds * 1000);
      tl.next();
    }
  }
}

LightController.define("light-controller");
