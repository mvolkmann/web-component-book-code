import { content } from "./hello-world-html.js";

class HelloWorld extends HTMLElement {
  #name = "World";
  #p; // reference to p element

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    // This is only needed if this component
    // will contribute data to form submissions.
    //const supportsDSD =
    //  HTMLElement.prototype.hasOwnProperty("attachInternals");
    //if (supportsDSD) this.attachInternals();

    // When using Declarative Shadow DOM,
    // this.shadowRoot will already be set.
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      // this.name triggers a call to "get name" below.
      this.shadowRoot.innerHTML = content(this.name);
    }
  }

  attributeChangedCallback(name, _oldValue, value) {
    if (name === "name") this.name = value;
  }

  connectedCallback() {
    this.p = this.shadowRoot.querySelector("p");

    // When the p element is clicked, change its text to uppercase.
    const p = this.p;
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
    if (this.p) this.p.textContent = `Hello, ${this.name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
