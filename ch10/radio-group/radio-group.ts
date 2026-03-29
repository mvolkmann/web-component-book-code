import { css, html, Wrec } from "wrec";

class RadioGroup extends Wrec {
  static formAssociated = true;

  static properties = {
    labels: { type: String, usedBy: ["makeButtons"] },
    legend: { type: String },
    name: { type: String },
    value: { type: String, dispatch: true },
    values: { type: String, usedBy: ["makeButtons"] },
  };

  static css = css`
    :host > div {
      display: flex;
      gap: 0.5rem;
    }

    fieldset {
      border-color: var(--border-color, "black");
      display: inline-flex;
      flex-direction: column;
      align-items: start;
      gap: 0.5rem;

      > legend {
        color: var(--legend-color, "black");
      }

      > div {
        display: flex;
        flex-direction: var(--direction, row);
        gap: var(--gap, 1rem);
      }
    }

    input {
      margin: 0;
    }
  `;

  static html = html`
    <fieldset>
      <legend style="this.displayIfSet(this.legend)">this.legend</legend>
      <slot name="before"></slot>
      <div>this.makeButtons()</div>
      <slot name="after"></slot>
    </fieldset>
  `;

  // This handles the case when the specified value
  // is not in the list of values.
  #fixValue() {
    requestAnimationFrame(() => {
      const values = this.values.split(",");
      if (!this.value || !values.includes(this.value)) this.value = values[0];
    });
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  makeButtons() {
    this.#fixValue();
    const labelArray = this.labels.split(",");
    const valueArray = this.values
      .split(",")
      .map((value: string) => value.trim());
    return valueArray.map(
      (value: string, index: number) => html`
        <div>
          <input
            checked="this.value === '${value}'"
            id=${value}
            name=${this.name}
            onChange="handleChange"
            type="radio"
            value=${value}
          />
          <label for=${value}>${labelArray[index]}</label>
        </div>
      `,
    );
  }

  propertyChangedCallback(propName: string) {
    if (propName === "value") this.#fixValue();
  }
}

RadioGroup.define("radio-group");
