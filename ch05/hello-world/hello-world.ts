import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property({ reflect: true })
  name?: string = "World";

  @query("p") paragraph?: HTMLParagraphElement;

  private handleClick() {
    const p = this.paragraph;
    if (p) {
      const { color } = p.style;
      p.style.color = color === "blue" ? "red" : "blue";
    }
  }

  render() {
    return html`<p @click=${this.handleClick}>Hello, ${this.name}!</p>`;
  }
}
