class HelloWorld extends HTMLElement {
  #name = "World";

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "name") this.name = newValue;
  }

  connectedCallback() {
    this.render();
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
    this.render();
  }

  render() {
    const p = document.createElement("p");
    p.textContent = `Hello, ${this.#name}!`;
    this.replaceChildren(p);
  }
}

customElements.define("hello-world", HelloWorld);
