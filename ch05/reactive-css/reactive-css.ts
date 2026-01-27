import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("reactive-css")
export class ReactiveCSS extends LitElement {
  static styles = [
    css`
      p {
        font-size: var(--font-size);
      }
    `,
  ];

  @property() size = 18;

  #handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.size = Number(input.value);
  }

  render() {
    return html`
      <input
        type="range"
        min="8"
        max="64"
        value="${this.size}"
        @input=${this.#handleInput}
      />
      <p style="--font-size: ${this.size}px">My size is reactive!</p>
    `;
  }
}
