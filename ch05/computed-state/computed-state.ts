import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("computed-state")
export class ComputedState extends LitElement {
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

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("height") || changedProperties.has("width")) {
      this.area = this.height * this.width;
    }
  }

  makeSlider(
    label: string,
    name: string,
    property: number,
    handler: (e: Event) => void,
  ) {
    return html`
      <div>
        <label for="width">${label}</label>
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
      ${this.makeSlider("Width", "width", this.width, this.handleWidthInput)}
      ${this.makeSlider(
        "Height",
        "height",
        this.height,
        this.handleHeightInput,
      )}
      <div>
        <label>Area</label>
        <span>${this.area}</span>
      </div>
    `;
  }
}
