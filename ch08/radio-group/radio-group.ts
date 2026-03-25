import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  repeat,
} from "@microsoft/fast-element";

// x is set to a RadioGroup instance.
const template = html<RadioGroup>`
  <fieldset>
    <legend>${x => x.legend}</legend>
    <slot name="before"></slot>
    <div>
      ${repeat(
        x => x.pairs,
        html`
          <div>
            <!-- p is short for pair and e is short for component. -->
            <input
              type="radio"
              id=${p => p.value}
              name=${(p, e) => e.parent.name}
              :checked=${(p, e) => p.value === e.parent.value}
              :value=${p => p.value}
              @change=${(p, e) => e.parent.handleChange(p.value)}
            />
            <label for=${p => p.value}>${x => x.label}</label>
          </div>
        `,
      )}
    </div>
    <slot name="after"></slot>
  </fieldset>
`;

const styles = css`
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

      > div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }

  input {
    margin: 0;
  }
`;

@customElement({ name: "radio-group", template, styles })
export class RadioGroup extends FASTElement {
  @attr labels: string;
  @attr legend: string;
  @attr name: string;
  @attr value: string;
  @attr values: string;

  get pairs() {
    const labelArray = this.labels.split(",");
    const valueArray = this.values.split(",");
    return labelArray.map((label, index) => ({
      label,
      value: valueArray[index],
    }));
  }

  handleChange(newValue: string) {
    this.value = newValue;
  }
}
