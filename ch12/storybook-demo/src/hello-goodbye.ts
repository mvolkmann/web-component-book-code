const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <p style="color: green"><span class="salutation"></span>, <span class="name"></span>!</p>
`;

/**
 * This is a simple web component that renders a greeting message.
 * @attr {string} salutation - initial salutation
 * @attr {string} name - initial name to greet
 * @prop {string} [name="World"] - current name to greet
 * @prop {string} [salutation="Hello"] - current salutation
 */
export class HelloGoodbye extends HTMLElement {
  #name = "World";
  #salutation = "Hello";
  #span1: HTMLSpanElement | undefined; // assigned in constructor
  #span2: HTMLSpanElement | undefined; // assigned in constructor

  static get observedAttributes() {
    return ["name", "salutation"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#span1 = shadowRoot.querySelector(".salutation")!;
    this.#span2 = shadowRoot.querySelector(".name")!;
    this.#span1.textContent = this.#salutation;
    this.#span2.textContent = this.#name;
    this.addEventListener("click", () => {
      const newValue = this.#salutation === "Hello" ? "Goodbye" : "Hello";
      this.salutation = newValue;
    });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "name") {
      this.name = newValue ?? "World";
    } else if (name === "salutation") {
      this.salutation = newValue ?? "Hello";
    }
  }

  get name() {
    return this.#name;
  }

  get salutation() {
    return this.#salutation;
  }

  set name(value: string) {
    if (this.#span2) this.#span2.textContent = value;
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
  }

  set salutation(value: string) {
    if (this.#span1) this.#span1.textContent = value;
    if (value === this.#salutation) return;
    this.#salutation = value;
    this.setAttribute("salutation", value);
  }
}

customElements.define("hello-goodbye", HelloGoodbye);
