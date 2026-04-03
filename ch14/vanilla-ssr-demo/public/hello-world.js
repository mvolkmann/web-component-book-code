import { content } from "./hello-world-html.js";

class HelloWorld extends HTMLElement {
  #name = "World";
  #p;

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    // When using Declarative Shadow DOM,
    // this.shadowRoot will already be set.
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = content(this.#name);
    }
  }

  attributeChangedCallback(name, _oldValue, value) {
    if (name === "name") this.name = value;
  }

  connectedCallback() {
    const p = (this.#p = this.shadowRoot.querySelector("p"));

    // When the p element is clicked, change its text to uppercase.
    p.addEventListener("click", () => {
      p.textContent = p.textContent.toUpperCase();
    });
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
    this.#p.textContent = `Hello, ${this.name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
