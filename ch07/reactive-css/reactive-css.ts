import { css, customElement, FASTElement, html, observable, ref } from "@microsoft/fast-element";

const template = html<ReactiveCSS>`
  <input
    type="range"
    min="8"
    max="64"
    :value="${(x) => x.size}"
    @input=${(x) => x.handleInput()}
    ${ref("slider")}
  />
  <p style="--font-size: ${(x) => x.size}px">My size is reactive!</p>
`;

@customElement({
  name: "reactive-css",
  template,
  styles: css`
    p {
      font-size: var(--font-size);
    }
  `,
})
export class ReactiveCSS extends FASTElement {
  @observable size: number = 18;
  slider: HTMLInputElement;

  handleInput() {
    this.size = Number(this.slider.value);
  }
}
