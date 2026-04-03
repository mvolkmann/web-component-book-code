import { html, Wrec } from "wrec/ssr";

class HelloWorld extends Wrec {
  static properties = {
    name: { type: String, value: "World" },
  };

  static html = html` <p>Hello, <span>this.name</span>!</p> `;
}

HelloWorld.define("hello-world");
export default HelloWorld; // so server.ts can import it
