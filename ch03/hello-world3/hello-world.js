class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "World";
    const p = document.createElement("p");
    p.textContent = `Hello, ${name}!`;
    this.replaceChildren(p);
  }
}

customElements.define("hello-world", HelloWorld);
