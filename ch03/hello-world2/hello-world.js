class HelloWorld extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "World";
    const p = document.createElement("p");
    p.textContent = `Hello, ${name}!`;
    this.replaceChildren(p);
  }
}

customElements.define("hello-world", HelloWorld);
