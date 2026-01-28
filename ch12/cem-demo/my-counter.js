const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    :host {
      --font-size: 2rem;
      font-size: var(--font-size);
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      background-color: var(--button-bg-color, lightgreen);
      border: none;
      border-radius: 50%;
      font-size: var(--font-size);
      height: calc(var(--font-size) * 1.2);
      width: calc(var(--font-size) * 1.2);
    }

    button:disabled {
      opacity: 0.7;
    }
  </style>
  <div>
    <button type="button">-</button>
    <span></span>
    <button type="button">+</button>
  </div>
`;

/**
 * This is a counter web component.
 * @attr {number} count - initial count
 * @prop {number} [count=3] - current count
 * @tag my-counter
 */
class MyCounter extends HTMLElement {
  /** @default 3 */
  #count = 3;
  #decBtn;
  #span;

  static get observedAttributes() {
    return ["count"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dom = template.content.cloneNode(true);
    const [decBtn, incBtn] = dom.querySelectorAll("button");
    this.#decBtn = decBtn;
    decBtn.addEventListener("click", () => this.decrement());
    incBtn.addEventListener("click", () => this.increment());
    this.#span = dom.querySelector("span");
    this.#span.textContent = this.count;
    this.shadowRoot.replaceChildren(dom);
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName === "count") this.count = Number(newValue);
  }

  get count() {
    return this.#count;
  }

  set count(value) {
    if (value === this.#count) return;
    if (!this.#span) return;
    this.#count = value;
    this.#span.textContent = this.count;
    this.#decBtn.toggleAttribute("disabled", this.count === 0);
    this.setAttribute("count", this.count);
  }

  decrement() {
    if (this.count > 0) this.count = this.#count - 1;
  }

  increment() {
    this.count = this.#count + 1;
  }
}

customElements.define("my-counter", MyCounter);
