import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { consume } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("hello-world")
export class HelloWorld extends LitElement {
  static styles = [
    css`
      p {
        color: purple;
      }
    `,
  ];

  @consume({ context: myContext, subscribe: true })
  private context!: MyContext;

  render() {
    return html`<p>Hello, ${this.context.name}!</p>`;
  }
}
