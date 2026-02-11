const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    button {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;

      background-color: black;
      border-radius: 1.5rem;
      padding: 0.5rem;
    }
    div {
      --size: 3rem;
      border: none;
      border-radius: 50%;
      font-weight: bold;
      padding: 0.5rem;
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
  </style>
  <button aria-label="traffic light" type="button">
    <div class="stop"></div>
    <div class="yield"></div>
    <div class="go"></div>
  </button>
`;

/**
 * This web component emulates a U.S. traffic light
 * with red, yellow, and green lights.
 * The `state` attribute specifies the initial state.
 * To advance to the next state, click the component
 * or call the next() method on an instance.
 * To get the current state, access the `state` property of an instance.
 * @attr {string} state - initial traffic light state.
 * @prop {string} [state="stop"] - current traffic light state
 */
export class TrafficLight extends HTMLElement {
  static states = ["stop", "yield", "go"];
  #state = "stop";
  #stateToDivMap = new Map();

  static get observedAttributes() {
    return ["state"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "state") this.state = newValue;
  }

  connectedCallback() {
    const initial = this.getAttribute("state") ?? "";
    this.#state = TrafficLight.states.includes(initial) ? initial : "stop";

    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    const divs = this.shadowRoot?.querySelectorAll("div") ?? [];
    TrafficLight.states.forEach((state, index) => {
      this.#stateToDivMap.set(state, divs[index]);
    });

    this.addEventListener("click", () => this.next());
    this.#change(true);
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    if (value === this.#state) return;
    this.#change(false);
    this.#state = value;
    this.#change(true);
    this.setAttribute("state", value);
  }

  next() {
    this.#change(false);
    const s = this.#state;
    this.#state = s === "stop" ? "yield" : s === "yield" ? "go" : "stop";
    this.#change(true);
    this.dispatchEvent(
      new CustomEvent("state-change", {
        detail: { state: this.state },
        bubbles: true,
        composed: true,
      }),
    );
  }

  #change(on) {
    const div = this.#stateToDivMap.get(this.#state);
    div?.classList.toggle("on", on);
  }
}

customElements.define("traffic-light", TrafficLight);
