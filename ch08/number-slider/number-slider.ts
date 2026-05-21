import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  nullableNumberConverter,
} from "@microsoft/fast-element";
import { twoWay } from "@microsoft/fast-element/binding/two-way.js";

const template = html<NumberSlider>`
  <label for="slider">${(x) => x.label}</label>
  <input
    id="slider"
    max=${(x) => x.max}
    min=${(x) => x.min}
    name=${(x) => x.name}
    type="range"
    :value=${twoWay((x) => x.value, {
      changeEvent: "input",
      fromView: Number,
    })}
  />
  <span>${(x) => x.value}</span>
`;

const styles = css`
  :host {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="range"] {
    width: 7rem;
  }

  label {
    font-weight: bold;
    text-align: right;
    width: ${(x) => x.labelWidth};
  }
`;

@customElement({ name: "number-slider", template, styles })
export class NumberSlider extends FASTElement {
  static formAssociated = true;

  @attr label!: string;
  @attr({ attribute: "label-width" }) labelWidth = "auto";
  @attr({ converter: nullableNumberConverter }) max = 100;
  @attr({ converter: nullableNumberConverter }) min = 0;
  @attr name!: string;
  @attr({ converter: nullableNumberConverter }) value = 0;

  private defaultValue = 0;
  private internals?: ElementInternals;

  // Attaches form internals for this form-associated custom element.
  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  // Captures the initial value and initializes the form value.
  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
    this.internals?.setFormValue(String(this.value));
  }

  // Restores the default value when the parent form is reset.
  formResetCallback() {
    this.value = this.defaultValue;
  }

  // Updates the form value and dispatches a value-change event.
  valueChanged(oldValue: number, value: number) {
    if (value === oldValue) return;
    this.internals?.setFormValue(String(value));
    this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: { oldValue, value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
