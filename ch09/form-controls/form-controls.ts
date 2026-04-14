import { css, html, Wrec } from "wrec";

class FormControls extends Wrec {
  static properties = {
    color: { type: String, value: "red" },
    size: { type: Number, value: 18 },
    story: { type: String, value: "Once upon a time..." },
  };

  static css = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      border: 1px solid gray;
      font-family: sans-serif;
      padding: 1rem;
      width: 20rem;
    }
    label {
      font-weight: bold;
    }
    p {
      color: this.color;
      font-size: this.size + "px";
      margin: 0;
    }
    .row {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      input,
      textarea {
        flex-grow: 1;
      }
    }
  `;

  static html = html`
    <div class="row">
      <label>Story</label>
      <textarea>this.story</textarea>
    </div>
    <div class="row">
      <label>Size</label>
      <input type="range" min="8" max="48" value:input="this.size" />
      <span>this.size</span> px
    </div>
    <div class="row">
      <label>Color</label>
      <select value="this.color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </div>
    <p>this.story</p>
  `;
}

FormControls.define("form-controls");
