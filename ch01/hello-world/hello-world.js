class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name") ?? "World";
    this.shadowRoot.innerHTML = `
      <style>
        button {
          color: blue;
        }
      </style>
      <button>Hello, ${name}!</button>
    `;
    this.addEventListener("click", () => {
      const button = this.shadowRoot.querySelector("button");
      const { style } = button;
      style.color = style.color === "red" ? "blue" : "red";
    });
  }
}

customElements.define("hello-world", HelloWorld);
