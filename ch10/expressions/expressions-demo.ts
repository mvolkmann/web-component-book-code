import { css, html, Wrec } from "wrec";

class ExpressionsDemo extends Wrec {
  static properties = {
    color: { type: String, value: "red" },
    height: { type: Number, value: 100 },
    width: { type: Number, value: 200 },
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    label {
      display: inline-block;
      font-weight: bold;
      width: 3.5rem;
      text-align: right;
    }
    .rectangle {
      display: block;
      background-color: this.color;
      height: this.height + "px";
      width: this.width + "px";
    }
    .row {
      display: flex;
      align-items: center;
      gap: 1rem;
  `;

  static html = html`
    <div class="row">
      <label>Height </label>
      <input type="range" max="600" value:input="this.height" />
      <span>this.height</span>
    </div>
    <div class="row">
      <label>Width</label>
      <input type="range" max="600" value:input="this.width" />
      <span>this.width</span>
    </div>
    <div class="row">
      <label>Color</label>
      <input type="color" value="this.color" />
    </div>
    <div class="rectangle"></div>
  `;
}

ExpressionsDemo.define("expressions-demo");
