const STATES = ["stop", "yield", "go"];

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }

    .housing {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 10px;
      background: #000;
      border: 2px solid #1f1f1f;
      border-radius: 24px;
      box-sizing: border-box;
      width: 92px;
    }

    .light {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      opacity: 0.35;
      transition:
        opacity 150ms ease,
        filter 150ms ease,
        box-shadow 150ms ease;
    }

    .light.on {
      opacity: 1;
      filter: saturate(1.15);
    }

    .light.stop {
      background: #f20d0d;
    }

    .light.stop.on {
      box-shadow: 0 0 14px rgb(242 13 13 / 0.45);
    }

    .light.yield {
      background: #808000;
    }

    .light.yield.on {
      background: #e0d100;
      box-shadow: 0 0 14px rgb(224 209 0 / 0.45);
    }

    .light.go {
      background: #3d8500;
    }

    .light.go.on {
      background: #56b000;
      box-shadow: 0 0 14px rgb(86 176 0 / 0.45);
    }
  </style>
  <div class="housing" part="housing">
    <div class="light stop" part="light red"></div>
    <div class="light yield" part="light yellow"></div>
    <div class="light go" part="light green"></div>
  </div>
`;

class TrafficLight extends HTMLElement {
  static get observedAttributes() {
    return ["state"];
  }

  #state = "stop";
  #lights = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(template.content.cloneNode(true));

    for (const state of STATES) {
      this.#lights.set(state, this.shadowRoot.querySelector(`.light.${state}`));
    }

    this.addEventListener("click", this.#handleAdvance);
    this.addEventListener("keydown", this.#handleKeydown);
  }

  connectedCallback() {
    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }
    this.state = this.getAttribute("state") ?? "stop";
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#handleAdvance);
    this.removeEventListener("keydown", this.#handleKeydown);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "state" && newValue !== this.#state) {
      this.state = newValue;
    }
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    const nextState = STATES.includes(value) ? value : "stop";
    if (nextState === this.#state) {
      if (this.getAttribute("state") !== nextState) {
        this.setAttribute("state", nextState);
      }
      this.#render();
      return;
    }

    this.#state = nextState;
    if (this.getAttribute("state") !== nextState) {
      this.setAttribute("state", nextState);
    }
    this.#render();
  }

  next() {
    const index = STATES.indexOf(this.#state);
    const nextIndex = (index + 1) % STATES.length;
    this.state = STATES[nextIndex];
    this.dispatchEvent(
      new CustomEvent("state-change", {
        detail: { state: this.#state },
        bubbles: true,
        composed: true,
      }),
    );
  }

  #render() {
    for (const [state, light] of this.#lights) {
      light.classList.toggle("on", state === this.#state);
    }
    this.setAttribute("aria-label", `Traffic light: ${this.#state}`);
  }

  #handleAdvance = () => {
    this.next();
  };

  #handleKeydown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.next();
    }
  };
}

customElements.define("traffic-light", TrafficLight);
