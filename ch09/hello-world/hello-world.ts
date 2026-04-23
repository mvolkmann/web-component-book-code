import { html, Wrec } from "wrec";

class HelloWorld extends Wrec {
  static html = html`<p>Hello, World!</p>`;
}

HelloWorld.define("hello-world");
