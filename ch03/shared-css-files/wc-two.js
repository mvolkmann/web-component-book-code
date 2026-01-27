class WCTwo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="share.css" />
      <button>WC Two</button>
    `;
  }
}

customElements.define("wc-two", WCTwo);
