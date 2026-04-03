import { css, html, Wrec } from "wrec";

//TODO: The analyzer is not generating proper documentation for this component!

/**
 * This displays a greeting message for a given name in a specified color.
 * @summary This displays a greeting message.
 * @slot - for content after the greeting
 * @slot before - for content before the greeting
 * @cssprop [--border-color=gray] color of border that surrounds the component
 * @csspart greeting - greeting message
 */
class HelloWrec extends Wrec {
  static properties = {
    color: { doc: "text color", type: String, value: "black" },
    name: { doc: "name to greet", type: String, value: "World" },
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
  `;
}

HelloWrec.define("hello-wrec");
