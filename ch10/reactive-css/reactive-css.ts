import { css, html, Wrec } from "wrec";

class ReactiveCSS extends Wrec {
  static properties = {
    size: { type: Number, value: 18 },
  };

  static css = css`
    p {
      font-size: this.size + "px";
    }
  `;

  static html = html`
    <input type="range" min="8" max="64" value:input="this.size" />
    <p>My size is reactive!</p>
  `;
}

ReactiveCSS.define("reactive-css");
