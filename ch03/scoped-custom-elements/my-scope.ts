// This works in Chrome, Edge, and Safari.
class MyScope extends HTMLElement {
  constructor() {
    super();

    // Create a new custom element registry
    // that will be scoped to this element.
    // This constructor is not yet supported in Firefox.
    const registry = new CustomElementRegistry();

    // Find a custom element class that is registered in the global scope.
    const HelloWorld = customElements.get("hello-world");

    // Define a new custom element name in the scoped registry
    // that uses the custom element class from the global scope.
    // A motivation for doing this is to avoid name collisions
    // when multiple web component implementations
    // use the same custom element name.
    if (HelloWorld) registry.define("hello-name", HelloWorld);

    // Create a shadow root that uses the scoped registry.
    const shadow = this.attachShadow({
      mode: "open",
      customElementRegistry: registry,
    });

    // Use the new custom element name in the current scope.
    shadow.innerHTML = `
      <!-- This custom element name is known in this scope. -->
      <hello-name name="Mars"></hello-name>

      <!-- This custom element name is not known in this scope. -->
      <hello-world name="Venus"></hello-world>
    `;

    // For more detail, including more ways to use a CustomElementRegistry,
    // see https://developer.chrome.com/blog/scoped-registries.
  }
}

customElements.define("my-scope", MyScope);
