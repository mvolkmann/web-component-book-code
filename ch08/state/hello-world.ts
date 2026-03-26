import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import { myState } from "./my-state.js";

const template = html<HelloWorld>`<p>Hello, ${x => x.getName()}!</p>`;

@customElement({
  name: "hello-world",
  styles: css`
    p { color: purple; }
  }`,
  template,
})
export class HelloWorld extends FASTElement {
  getName() {
    return myState.current.name;
  }
}
