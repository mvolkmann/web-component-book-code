import { css, html, Wrec } from "wrec";

class ExpressionsDemo extends Wrec {
  static properties = {
    color: { type: String, value: "red" },
    height: { type: Number, value: 100, usedBy: "getArea" },
    width: { type: Number, value: 200, usedBy: "getArea" },
    max: { type: Number, value: 800 },
    //area: { type: Number, computed: "this.width * this.height" },
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
      border: 3px solid black;
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
      <input type="range" max="this.max" value:input="this.height" />
      <span>this.height</span>
    </div>
    <div class="row">
      <label>Width</label>
      <input type="range" max="this.max" value:input="this.width" />
      <span>this.width</span>
    </div>
    <div class="row">
      <label>Area</label>
      <!--span>this.width * this.height</span-->
      <!--span>this.getArea(this.width, this.height)</span-->
      <span>this.getArea()</span>
      <!--span>this.area</~span-->
    </div>
    <div class="row">
      <label>Color</label>
      <input type="color" value="this.color" />
    </div>
    <div class="rectangle"></div>
  `;

  /*
  getArea(width: number, height: number) {
    return width * height;
  }
  */

  getArea() {
    return this.width * this.height;
  }
}

ExpressionsDemo.define("expressions-demo");
