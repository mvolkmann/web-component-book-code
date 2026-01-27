class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name") ?? "World";
    this.shadowRoot.innerHTML = `
      <style>
        div {
          color: blue;
        }
      </style>
      <div>Hello, ${name}!</div>
    `;
    this.addEventListener("click", () => {
      const div = this.shadowRoot.querySelector("div");
      const { style } = div;
      style.color = style.color === "red" ? "blue" : "red";
    });
  }
}

customElements.define("hello-world", HelloWorld);
