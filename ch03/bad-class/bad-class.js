class BadClass {
  // doesn't extend HTMLElement
  connectedCallback() {
    this.innerHTML = "<p>Hello, World!</p>";
  }
}

customElements.define("bad-class", BadClass);
