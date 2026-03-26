import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  ref,
} from "@microsoft/fast-element";
import { myState } from "./my-state.js";

const template = html<LabeledInput>`
  <label for=${x => x.inputId}>${x => x.label}</label>
  <input
    id=${x => x.inputId}
    name=${x => x.name}
    type="text"
    :value=${x => x.getName()}
    @change=${x => x.handleChange()}
    ${ref("input")}
  />
`;

@customElement({
  name: "labeled-input",
  template,
  styles: css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `,
})
export class LabeledInput extends FASTElement {
  @attr({ attribute: "input-id" }) inputId: string;
  @attr label: string;
  @attr name: string;
  input: HTMLInputElement;

  getName() {
    return myState.current.name;
  }

  handleChange() {
    myState.set({ ...myState.current, name: this.input.value });
  }
}
