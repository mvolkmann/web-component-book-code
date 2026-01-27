import { css, html, Wrec } from "wrec";
import "./hello-world.js";
import "./radio-group.js";

class MyApp extends Wrec {
  static properties = {
    color: { type: String, value: "red" },
  };

  static css = css`
    :host {
      font-family: sans-serif;
      padding: 1rem;
    }
  `;

  static html = html`
    <hello-world color="this.color" name="Mark"></hello-world>
    <radio-group
      name="color"
      labels="Red,Green,Blue"
      value="this.color"
      values="red,green,blue"
    ></radio-group>
  `;
}

MyApp.register();
