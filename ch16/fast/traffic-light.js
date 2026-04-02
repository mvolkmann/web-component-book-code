import {
  FASTElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/npm/@microsoft/fast-element/dist/esm/index.js";

const states = ["stop", "yield", "go"];

const template = html`
  <div
    id="housing"
    class="housing"
    role="button"
    tabindex="0"
  >
    <div id="redLight" class="light light--red"></div>
    <div id="yellowLight" class="light light--yellow"></div>
    <div id="greenLight" class="light light--green"></div>
  </div>
`;

const styles = css`
  :host {
    display: inline-block;
    user-select: none;
  }

  * {
    box-sizing: border-box;
  }

  .housing {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 88px;
    padding: 10px 8px;
    border-radius: 24px;
    border: 2px solid #2f2f2f;
    background: linear-gradient(180deg, #101010 0%, #000 100%);
    box-shadow:
      inset 0 2px 2px rgba(255, 255, 255, 0.08),
      inset 0 -4px 10px rgba(0, 0, 0, 0.55);
    cursor: pointer;
    outline: none;
  }

  .housing:focus-visible {
    box-shadow:
      0 0 0 3px rgba(40, 140, 255, 0.45),
      inset 0 2px 2px rgba(255, 255, 255, 0.08),
      inset 0 -4px 10px rgba(0, 0, 0, 0.55);
  }

  .light {
    width: 70px;
    aspect-ratio: 1;
    border-radius: 50%;
    opacity: 0.38;
    filter: saturate(75%);
    transition:
      opacity 160ms ease,
      filter 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .light--red {
    background: #ff1208;
  }

  .light--yellow {
    background: #8f8900;
  }

  .light--green {
    background: #348600;
  }

  .light.is-on {
    opacity: 1;
    filter: saturate(115%);
    transform: scale(1.01);
  }

  .light--red.is-on {
    box-shadow:
      0 0 12px rgba(255, 18, 8, 0.55),
      inset 0 -6px 10px rgba(0, 0, 0, 0.2);
  }

  .light--yellow.is-on {
    background: #e3db00;
    box-shadow:
      0 0 12px rgba(227, 219, 0, 0.45),
      inset 0 -6px 10px rgba(0, 0, 0, 0.2);
  }

  .light--green.is-on {
    background: #4ea300;
    box-shadow:
      0 0 12px rgba(78, 163, 0, 0.45),
      inset 0 -6px 10px rgba(0, 0, 0, 0.2);
  }
`;

export class TrafficLight extends FASTElement {
  #state = "stop";
  #isReflectingState = false;

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.getElementById("housing").addEventListener("click", this);
    this.shadowRoot.getElementById("housing").addEventListener("keydown", this);

    const initialState = this.getAttribute("state");
    this.state = initialState ?? "stop";
    this.#updateLights();
  }

  disconnectedCallback() {
    this.shadowRoot.getElementById("housing").removeEventListener("click", this);
    this.shadowRoot
      .getElementById("housing")
      .removeEventListener("keydown", this);
    super.disconnectedCallback();
  }

  static get observedAttributes() {
    return ["state"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === "state" && !this.#isReflectingState && oldValue !== newValue) {
      this.state = newValue ?? "stop";
    }
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    const nextState = states.includes(value) ? value : "stop";
    if (nextState === this.#state) {
      this.#reflectState();
      this.#updateLights();
      return;
    }

    this.#state = nextState;
    this.#reflectState();
    this.#updateLights();
  }

  next() {
    const currentIndex = states.indexOf(this.state);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % states.length;
    this.state = states[nextIndex];
  }

  handleEvent(event) {
    if (event.type === "click") {
      this.next();
      return;
    }

    if (event.type === "keydown" && (event.key === " " || event.key === "Enter")) {
      event.preventDefault();
      this.next();
    }
  }

  #reflectState() {
    this.#isReflectingState = true;
    this.setAttribute("state", this.#state);
    this.#isReflectingState = false;
  }

  #updateLights() {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }

    root.getElementById("housing")?.setAttribute("aria-label", `Traffic light: ${this.#state}`);
    root.getElementById("redLight")?.classList.toggle("is-on", this.#state === "stop");
    root
      .getElementById("yellowLight")
      ?.classList.toggle("is-on", this.#state === "yield");
    root.getElementById("greenLight")?.classList.toggle("is-on", this.#state === "go");
  }
}

TrafficLight.define({
  name: "traffic-light",
  template,
  styles,
});
