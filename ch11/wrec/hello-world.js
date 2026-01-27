import { css, html, Wrec } from "wrec";

class HelloWorld extends Wrec {
  static properties = {
    color: { type: String, value: "black" },
    name: { type: String, value: "World" },
  };

  static css = css`
    p {
      color: this.color;
    }
  `;

  static html = html`<p>Hello, <span>this.name</span>!</p>`;
}

HelloWorld.register();
