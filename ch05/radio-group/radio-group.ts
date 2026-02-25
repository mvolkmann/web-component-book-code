import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("radio-group")
export class RadioGroup extends LitElement {
  styles = [
    css`
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
    `,
  ];

  @property({ type: String, reflect: true }) labels = "";
  @property({ type: String, reflect: true }) legend = "";
  @property({ type: String, reflect: true }) name = "";
  @property({ type: String, reflect: true }) value = "";
  @property({ type: String, reflect: true }) values = "";

  formResetCallback() {
    this.value = this.values.split(",")[0];
  }

  private handleChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  render() {
    const labelArray = this.labels.split(",");
    const valueArray = this.values
      .split(",")
      .map((value: string) => value.trim());
    return html`
      <fieldset>
        <legend>${this.legend}</legend>
        <slot name="before"></slot>
        <div>
          ${valueArray.map(
            (v: string, index: number) => html`
              <div>
                <!-- prettier-ignore -->
                <input
                  type="radio"
                  id=${v}
                  name=${this.name}
                  value=${v}
                  .checked=${v === this.value}
                  @change=${this.handleChange}
                />
                <label for=${v}>${labelArray[index]}</label>
              </div>
            `,
          )}
        </div>
        <slot name="after"></slot>
      </fieldset>
    `;
  }
}
