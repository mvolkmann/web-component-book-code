import { customElement } from "./decorators";

@customElement("hello-world")
export class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p>Hello, World!</p>";
  }
}
