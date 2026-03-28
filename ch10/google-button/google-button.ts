import { css, html, Wrec } from "wrec";

class GoogleButton extends Wrec {
  static css = css`
    button {
      background-color: #4285f4; /* Google blue */
      border: none;
      border-radius: 0.5rem;
      color: #fbbc05; /* Google yellow */
      font-weight: bold;
      padding: 0.5rem;
    }
  `;

  static html = html`
    <button type="button" onClick="handleClick">Google It</button>
  `;

  handleClick() {
    window.open("https://google.com", "_blank");
  }
}

GoogleButton.define("google-button");
