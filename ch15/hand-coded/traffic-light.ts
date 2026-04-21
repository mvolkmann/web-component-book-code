import { css, html, Wrec } from "wrec";

export default class TrafficLight extends Wrec {
  static properties = {
    state: {
      type: String,
      value: "stop",
      values: ["stop", "yield", "go"],
      usedBy: "classes",
    },
  };
  declare state: string;

  static css = css`
    :host {
      display: inline-block;
    }
    button {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      background-color: black;
      border-radius: 1.5rem;
      padding: 0.5rem;
    }
    div {
      --size: 4rem;
      border-radius: 50%;
      height: var(--size);
      width: var(--size);

      opacity: 0.4;
      &.on {
        opacity: 1;
      }
    }
    .stop {
      background-color: red;
    }
    .yield {
      background-color: yellow;
    }
    .go {
      background-color: lawngreen;
    }
  `;

  static html = html`
    <button aria-label="traffic light" onClick="next" type="button">
      <div class="this.classes('stop')"></div>
      <div class="this.classes('yield')"></div>
      <div class="this.classes('go')"></div>
    </button>
  `;

  classes(state: string) {
    return state + (this.state === state ? " on" : "");
  }

  next() {
    const s = this.state;
    this.state = s === "stop" ? "go" : s === "yield" ? "stop" : "yield";
  }
}

TrafficLight.define("traffic-light");
