import {
  attr,
  customElement,
  FASTElement,
  html,
  observable,
} from "@microsoft/fast-element";

const template = html<MyMath>`
  <div>single = ${x => x.n}</div>
  <div>double = ${x => x.double}</div>
  <div>triple = ${x => x.triple}</div>
  <button @click=${x => (x.n = x.n - 1)}>Decrement</button>
  <button @click=${x => (x.n = x.n + 1)}>Increment</button>
`;

@customElement({
  name: "my-math",
  template,
})
export class MyMath extends FASTElement {
  @attr n: number = 1;
  @observable double: number;
  @observable triple: number;

  nChanged(_oldValue: number, newValue: number) {
    this.double = newValue * 2;
    this.triple = newValue * 3;
  }
}
