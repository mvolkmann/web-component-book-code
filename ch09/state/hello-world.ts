import { css, html, Wrec } from "wrec";

class HelloWorld extends Wrec {
  static properties = {
    name: { type: String, value: "World" },
  };

  static css = css`
    h1 {
      color: blue;
    }
  `;

  static html = html`<h1>Hello, <span>this.name</span>!</h1>`;
}

HelloWorld.define("hello-world");
