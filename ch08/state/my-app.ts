import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import "./hello-world.js";
import "./labeled-input.js";
import { myState } from "./my-state.js";

const template = html<MyApp>`
  <labeled-input input-id="name" label="Name" name="name"></labeled-input>
  <hello-world></hello-world>
  <button @click=${x => x.reset()}>Reset</button>
`;

@customElement({
  name: "my-app",
  template,
  styles: css`
    :host {
      font-family: sans-serif;
    }
  }`,
})
export class MyApp extends FASTElement {
  reset() {
    myState.set({ name: "World" });
  }
}
