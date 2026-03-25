import { css, customElement, FASTElement, html } from "@microsoft/fast-element";

// x is set to a GoogleButton instance.
const template = html<GoogleButton>`
  <button type="button" @click=${x => x.handleClick()}>Google It</button>
`;

@customElement({
  name: "google-button",
  template,
  styles: css`
    button {
      background-color: #4285f4; /* Google blue */
      border: none;
      border-radius: 0.5rem;
      color: #fbbc05; /* Google yellow */
      font-weight: bold;
      padding: 0.5rem;
    }
  `,
})
export class GoogleButton extends FASTElement {
  handleClick() {
    window.open("https://google.com", "_blank");
  }
}
