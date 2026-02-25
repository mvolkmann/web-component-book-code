import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  static styles = [
    css`
      :host {
        color: blue;
      }
    `,
  ];

  @property() name = "World";

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
