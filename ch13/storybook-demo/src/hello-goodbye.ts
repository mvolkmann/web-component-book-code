const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <p style="color: green">
    <span class="salutation"></span>, <span class="name"></span>!
  </p>
`;

export class HelloGoodbye extends HTMLElement {
  #salutation = "Hello";
  #name = "World";
  #span1: HTMLSpanElement | undefined; // assigned in connectedCallback
  #span2: HTMLSpanElement | undefined; // assigned in connectedCallback

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
    this.#span1 = this.shadowRoot?.querySelector(".salutation")!;
    this.#span2 = this.shadowRoot?.querySelector(".name")!;
    this.name = this.getAttribute("name") || this.#name;
    this.salutation = this.getAttribute("salutation") || this.#salutation;
    this.shadowRoot?.addEventListener("click", () => {
      const newValue = this.#salutation === "Hello" ? "Goodbye" : "Hello";
      this.salutation = newValue;
    });
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
