class MyScope extends HTMLElement {
  constructor() {
    super();
    const registry = new CustomElementRegistry();
    const HelloWorld = customElements.get("hello-world");
    if (HelloWorld) registry.define("hello-name", HelloWorld);
    const shadow = this.attachShadow({
      mode: "open",
      customElementRegistry: registry,
    });
    shadow.innerHTML = `
      <!-- This custom element name is known in this scope. -->
      <hello-name name="Mars"></hello-name>

      <!-- This custom element name is not known in this scope. -->
      <hello-world name="Venus"></hello-world>
    `;
  }
}

customElements.define("my-scope", MyScope);
