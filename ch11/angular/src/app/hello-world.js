class HelloWorld extends HTMLElement {
  #name = '';

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName === 'name') this.name = newValue;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute('name', value);
    this.render();
  }

  render() {
    const p = document.createElement('p');
    p.textContent = `Hello, ${this.#name || 'World'}!`;
    this.shadowRoot?.replaceChildren(p);
  }
}

customElements.define('hello-world', HelloWorld);
