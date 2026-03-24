// This differs from hello-world.ts in that it
// adds support for the Boolean attribute "bold".
import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from "@microsoft/fast-element";

const template = html`
  <p style="font-weight: ${(x) => (x.bold ? "bold" : "normal")}">
    Hello, ${(x) => x.name}!
  </p>
`;

@customElement({
  name: "hello-world2",
  template,
  styles: css`
    :host {
      color: blue;
    }
  `,
})
export class HelloWorld2 extends FASTElement {
  @attr name: string = "World";
  @attr({ mode: "boolean" }) bold: boolean = false;
}
