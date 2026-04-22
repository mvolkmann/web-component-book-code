import { css, html, Wrec } from "wrec";

function makeSlider(label: string, property: string) {
  return html`
    <div>
      <label for="${property}">${label}</label>
      <input
        id="${property}"
        type="range"
        min="1"
        max="10"
        value:input="this.${property}"
      />
      <span>this.${property}</span>
    </div>
  `;
}

class AreaCalculator extends Wrec {
  static properties = {
    width: { type: Number, value: 1 },
    height: { type: Number, value: 1 },
    area: { type: Number, computed: "this.width * this.height" },
    foo: { type: Number, computed: "this.foo * 2" },
  };
  static context = { makeSlider };

  static css = css`
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    label {
      display: inline-block;
      width: 3rem;
      text-align: right;
    }
  `;

  static html = html`
    <div>${makeSlider("Width", "width")}</div>
    <div>${makeSlider("Height", "height")}</div>
    <div>
      <label>Area</label>
      <span>this.area</span>
    </div>
  `;
}

AreaCalculator.define("area-calculator");
