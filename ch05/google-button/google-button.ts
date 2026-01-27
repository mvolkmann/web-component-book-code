import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("google-button")
export class GoogleButton extends LitElement {
  static styles = [
    css`
      button {
        background-color: #4285f4; /* Google blue */
        border: none;
        border-radius: 0.5rem;
        color: #fbbc05; /* Google yellow */
        font-weight: bold;
        padding: 0.5rem;
      }
    `,
  ];

  private handleClick() {
    window.open("https://google.com", "_blank");
  }

  render() {
    return html`<button @click=${this.handleClick}>Google It</button>`;
  }
}
