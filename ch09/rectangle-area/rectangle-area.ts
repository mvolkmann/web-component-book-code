import { css, html, Wrec } from "wrec";
import "./number-slider.ts";

class RectangleArea extends Wrec {
  static properties = {
    width: { type: Number, value: 10, usedBy: "getArea" },
    height: { type: Number, value: 5, usedBy: "getArea" },
    //area: {type: Number, computed: 'this.width * this.height'}
  };

  static css = css`
    .area {
      font-weight: bold;
    }
  `;

  static html = html`
    <number-slider label="Width:" value="this.width"></number-slider>
    <number-slider label="Height:" value="this.height"></number-slider>
    <div class="area">Area: <span>this.getArea()</span></div>
  `;

  getArea() {
    return this.width * this.height;
  }
}

RectangleArea.define("rectangle-area");
