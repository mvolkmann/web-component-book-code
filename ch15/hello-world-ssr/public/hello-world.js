import { content } from "./hello-world-html.js";

class HelloWorld extends HTMLElement {
  p; // reference to p element

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

  attributeChangedCallback(name) {
    // The first call to this will occur before connectedCallback.
    // At that time, this.p will be undefined.
    if (this.p && name === "name") {
      this.p.textContent = `Hello, ${this.name}!`;
    }
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
    return this.getAttribute("name") || "World";
  }

  set name(value) {
    this.setAttribute("name", value);
  }
}

customElements.define("hello-world", HelloWorld);
