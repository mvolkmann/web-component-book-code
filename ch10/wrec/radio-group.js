import { css, html, Wrec } from "wrec";

class RadioGroup extends Wrec {
  static properties = {
    labels: { type: String },
    name: { type: String },
    value: { type: String, dispatch: true },
    values: { type: String },
  };

  static css = css`
    :host > span {
      display: flex;
      gap: 1rem;

      > div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  `;

  static html = "this.makeButtons(this.labels, this.values)";

  makeButtons(labels, values) {
    const labelArray = labels.split(",");
    const valueArray = values.split(",").map((value) => value.trim());
    return valueArray.map(
      (value, index) => html`
        <div>
          <input
            type="radio"
            id=${value}
            name=${this.name}
            value=${value}
            checked="this.value"
          />
          <label for=${value}>${labelArray[index]}</label>
        </div>
      `,
    );
  }
}

RadioGroup.define("radio-group");
