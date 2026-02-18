import { attr, FASTElement, html } from "@microsoft/fast-element";

const template = html`<p>Hello, ${(x) => x.name}!</p>`;

export class HelloWorld extends FASTElement {
  @attr name: string = "World";
}

HelloWorld.define({
  name: "hello-world",
  template,
});
