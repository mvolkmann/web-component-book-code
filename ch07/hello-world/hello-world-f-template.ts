import { attr, css, FASTElement } from "@microsoft/fast-element";
import { RenderableFASTElement, TemplateElement } from "@microsoft/fast-html";

TemplateElement.define({
  name: "f-template",
});

export class HelloWorld extends FASTElement {
  @attr name: string = "World";
}

RenderableFASTElement(HelloWorld).defineAsync({
  name: "hello-world",
  styles: css`
    :host {
      color: blue;
    }
  `,
  templateOptions: "defer-and-hydrate",
});
