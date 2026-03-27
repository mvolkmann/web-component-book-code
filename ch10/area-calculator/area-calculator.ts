import { css, html, Wrec } from "wrec";

class AreaCalculator extends Wrec {
  static properties = {
    width: { type: Number, value: 1 },
    height: { type: Number, value: 1 },
    area: { type: Number, computed: "this.width * this.height" },
  };
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
    <div>this.makeSlider("Width", this.width)</div>
    <div>this.makeSlider("Height", this.height)</div>
    <div>
      <label>Area</label>
      <span>this.area</span>
    </div>
  `;

  makeSlider(label: string, property: number) {
    const name = label.toLowerCase();
    return html`
      <div>
        <label for="${name}">${label}</label>
        <input
          id="${name}"
          type="range"
          min="1"
          max="10"
          value="this.${property}"
        />
        <span>this.${property}</span>
      </div>
    `;
  }
}

AreaCalculator.define("area-calculator");
