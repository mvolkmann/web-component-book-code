import { css, html, Wrec } from "wrec";

class HelloWorld extends Wrec {
  static properties = {
    name: { type: String, value: "World" },
  };
  declare name: string;

  static css = css`
    :host {
      color: blue;
    }
  `;
  static html = html`<p>Hello, <span>this.name</span>!</p>`;
}

HelloWorld.define("hello-world");
