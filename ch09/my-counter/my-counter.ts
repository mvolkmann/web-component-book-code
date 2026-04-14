import { css, html, Wrec } from "wrec";

class MyCounter extends Wrec {
  static properties = {
    count: { type: Number, dispatch: true },
  };

  static css = css`
    button {
      background-color: lightgreen;
    }
    button:disabled {
      opacity: 0.8;
    }
  `;

  static html = html`
    <button type="button" onClick="this.count--" disabled="this.count === 0">
      -
    </button>
    <span>this.count</span>
    <button onClick="this.count++" type="button">+</button>
    <span>this.count < 10 ? "single" : "multi"</span>-digit
  `;
}

MyCounter.define("my-counter");
