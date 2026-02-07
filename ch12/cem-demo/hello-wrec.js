import { css, html, Wrec } from "wrec";

class HelloWrec extends Wrec {
  static properties = {
    color: { type: String, value: "blue" },
    name: { type: String, value: "World" },
  };

  static css = css`
    :host {
      display: inline-block;
      border: 3px solid var(--border-color, gray);
      margin: 0.5rem 0;
      padding: 0.5rem;
    }
    p {
      color: this.color;
    }
  `;

  static html = html`
    <slot name="before"></slot>
    <p>Hello, <span>this.name</span>!</p>
    <slot></slot>
    <slot name="after"></slot>
  `;
}

HelloWrec.register();
