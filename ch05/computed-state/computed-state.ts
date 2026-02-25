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

  render() {
    return html`
      <div>
        <label for="width">Width</label>
        <input
          id="width"
          type="range"
          min="1"
          max="10"
          .value=${this.width}
          @input=${this.handleWidthInput}
        />
        <span>${this.width}</span>
      </div>
      <div>
        <label for="height">Height</label>
        <input
          id="height"
          type="range"
          min="1"
          max="10"
          .value=${this.height}
          @input=${this.handleHeightInput}
        />
        <span>${this.height}</span>
      </div>
      <div>
        <label for="area">Area</label>
        <span>${this.area}</span>
      </div>
    `;
  }
}
