import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * This displays a greeting message for a given name in a specified color.
 * @summary This displays a greeting message.
 * @element hello-lit
 * @attr {string} color - initial text color
 * @attr {string} name - initial name to greet
 * @prop {string} [color=black] - current text color
 * @prop {string} [name=World] - current name to greet
 * @slot - for content after the greeting
 * @slot before - for content before the greeting
 * @cssprop [--border-color=gray] color of border that surrounds the component
 * @csspart greeting - greeting message
 */
@customElement("hello-lit")
export class HelloLit extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      border: 3px solid var(--border-color, gray);
      margin: 0.5rem 0;
      padding: 0.5rem;
    }
    p {
      color: var(--color);
    }
  `;

  @property({ reflect: true })
  color?: string = "black";

  @property({ reflect: true })
  name?: string = "World";

  render() {
    return html`
      <slot name="before"></slot>
      <p style="--color: ${this.color}">Hello, ${this.name}!</p>
      <slot></slot>
    `;
  }
}
