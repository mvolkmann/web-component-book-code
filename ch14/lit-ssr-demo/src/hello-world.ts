import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  @property({ type: String, reflect: true }) name = "World";
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
