import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("area-calculator")
export class AreaCalculator extends LitElement {
  @property({ type: Number }) height = 1;
  @property({ type: Number }) width = 1;
  @state() area = 0;

  static styles = css`
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

  private handleHeightInput(e: Event) {
    this.height = Number((e.target as HTMLInputElement).value);
  }

  private handleWidthInput(e: Event) {
    this.width = Number((e.target as HTMLInputElement).value);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("height") || changedProps.has("width")) {
      this.area = this.height * this.width;
    }
  }

  makeSlider(label: string, property: number, handler: (e: Event) => void) {
    const name = label.toLowerCase();
    return html`
      <div>
        <label for="${name}">${label}</label>
        <input
          id=${name}
          type="range"
          min="1"
          max="10"
          .value=${property}
          @input=${handler}
        />
        <span>${property}</span>
      </div>
    `;
  }

  render() {
    return html`
      ${this.makeSlider("Width", this.width, this.handleWidthInput)}
      ${this.makeSlider("Height", this.height, this.handleHeightInput)}
      <div>
        <label>Area</label>
        <span>${this.area}</span>
      </div>
    `;
  }
}
