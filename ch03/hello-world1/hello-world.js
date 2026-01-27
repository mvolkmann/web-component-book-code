class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p>Hello, World!</p>";
  }
}

customElements.define("hello-world", HelloWorld);
