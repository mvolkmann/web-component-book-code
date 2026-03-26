import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  repeat,
} from "@microsoft/fast-element";

// x is set to a SortableTable instance.
const template = html<SortableTable>`
  <slot></slot>
  <table>
    <thead>
      <tr>
        ${this.makeHeadings()}
      </tr>
    </thead>
    <tbody>
      ${this.makeRows()}
    </tbody>
  </table>
  <slot name="footnote"></slot>
`;

const styles = css`
  :host {
    display: inline-block;
  }
  .sort-indicator {
    color: white;
    display: inline-block;
    line-height: 1rem;
    margin-left: 0.5rem;
    width: 1rem;
  }
  table {
    border-collapse: collapse;
  }
  td,
  th {
    border: 2px solid gray;
    padding: 0.5rem;
  }
  th {
    background-color: cornflowerblue;
    color: white;

    > button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;

      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font: inherit;
      padding: 0;
      width: 100%;
    }
  }
`;

@customElement({ name: "sortable-table", template, styles })
export class SortableTable extends FASTElement {
  @attr labels: string;
  @attr legend: string;
  @attr name: string;
  @attr value: string;
  @attr values: string;

  get pairs() {
    const labelArray = this.labels.split(",");
    const valueArray = this.values.split(",");
    return labelArray.map((label, index) => ({
      label,
      value: valueArray[index],
    }));
  }

  handleChange(newValue: string) {
    this.value = newValue;
  }
}
