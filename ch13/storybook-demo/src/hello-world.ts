const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`<p>Hello, <span></span>!</p>`;

/**
 * This is a simple web component that renders a greeting message.
 * @attr {string} name - initial name to greet
 * @prop {string} [name="World"] - current name to greet
 */
export class HelloWorld extends HTMLElement {
  #name = "World";
  #span!: HTMLSpanElement; // assigned in connectedCallback

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "name") this.name = newValue;
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.#span = this.shadowRoot?.querySelector("span")!;
    this.#span.textContent = this.getAttribute("name") || "World";
  }

  get name() {
    return this.getAttribute("name") ?? "";
  }

  set name(value: string) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
    this.#span.textContent = value;
  }
}

customElements.define("hello-world", HelloWorld);
