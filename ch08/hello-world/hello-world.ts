import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from "@microsoft/fast-element";

const template = html`<p>Hello, ${(x) => x.name}!</p>`;

@customElement({
  name: "hello-world",
  template,
  styles: css`
    :host {
      color: blue;
    }
  `,
})
export class HelloWorld extends FASTElement {
  @attr name: string = "World";
}
