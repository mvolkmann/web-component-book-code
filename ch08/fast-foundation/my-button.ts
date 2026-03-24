import { css, FASTElement } from "@microsoft/fast-element";
import {
  Button as FoundationButton,
  ButtonOptions,
  buttonTemplate,
} from "@microsoft/fast-foundation";

export class MyButton extends FoundationButton {}

export const styles = css`
  button {
    background-color: cornflowerblue;
    border: 3px solid orange;
    border-radius: 0.5rem;
    color: white;
    padding: 0.5rem 1rem;
  }
`;

FASTElement.define(MyButton, {
  name: "my-button",
  styles,
  template: buttonTemplate(undefined, {} as ButtonOptions),
});
