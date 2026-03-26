import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import { myState } from "./my-state.js";

const template = html<HelloWorld>`<p>Hello, ${x => x.name}!</p>`;

@customElement({
  name: "hello-world",
  styles: css`
    p { color: purple; }
  }`,
  template,
})
export class HelloWorld extends FASTElement {
  get name() {
    return myState.current.name;
  }
}
