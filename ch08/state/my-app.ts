import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import "./hello-world.js";
import "./labeled-input.js";
import { myState } from "./my-state.js";

const template = html<MyApp>`
  <hello-world></hello-world>
  <labeled-input input-id="name" label="Name" name="name"></labeled-input>
  <button @click=${x => x.reset()}>Reset</button>
`;

@customElement({
  name: "my-app",
  template,
  styles: css`
    :host {
      font-family: sans-serif;
    }
    button {
      margin-top: 1rem;
    }
  }`,
})
export class MyApp extends FASTElement {
  reset() {
    myState.set({ name: "World" });
  }
}
