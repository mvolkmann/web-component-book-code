import { attr, FASTElement } from "@microsoft/fast-element";
import { createTemplate } from "./template";
import helloWorldTemplateHTML from "./templates/hello-world.html?raw";

export class HelloWorld extends FASTElement {
  @attr name: string = "World";
}

HelloWorld.define({
  name: "hello-world",
  template: createTemplate<HelloWorld>(helloWorldTemplateHTML, {
    name: (x: HelloWorld) => x.name,
  }),
});
