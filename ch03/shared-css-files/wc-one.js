class WCOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="share.css" />
      <button>WC One</button>
    `;
  }
}

customElements.define("wc-one", WCOne);
