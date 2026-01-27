import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { MyContext, myContext } from "./my-context.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  @provide({ context: myContext })
  private context!: MyContext;

  constructor() {
    super();
    this.reset();

    this.addEventListener("name-change", (event: Event) => {
      this.setName((event as CustomEvent).detail);
    });
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <button @click=${this.reset}>Reset</button>
      </div>
    `;
  }

  reset() {
    this.setName("World");
  }

  private setName(name: string) {
    this.context = { name };
  }
}
