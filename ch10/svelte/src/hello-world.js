class HelloWorld extends HTMLElement {
  #color = "black";
  #name = "World";
  #p = document.createElement("p");

  static get observedAttributes() {
    return ["color", "name"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.replaceChildren(this.#p);
    this.name = this.#name;
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName === "name") {
      this.name = newValue;
    } else if (attrName === "color") {
      this.color = newValue;
    }
  }

  get color() {
    return this.#color;
  }

  get name() {
    return this.#name;
  }

  set color(value) {
    this.#p.style.color = this.#color;
    if (value === this.#color) return;
    this.#color = value;
    this.setAttribute("color", value);
  }

  set name(value) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
    this.#p.textContent = `Hello, ${this.#name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
