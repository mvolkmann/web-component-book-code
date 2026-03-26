import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  observable,
  repeat,
} from "@microsoft/fast-element";

type CellData = {
  property: string;
  value: unknown;
};

type HeadingPair = {
  heading: string;
  property: string;
};

type LooseObject = Record<string, unknown>;

type RowData = {
  cells: CellData[];
};

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

const headingTemplate = html<HeadingPair, SortableTable>`
  <th
    aria-sort="${(pair, c) =>
      pair.property === c.parent.sortProperty
        ? c.parent.descending
          ? "descending"
          : "ascending"
        : undefined}"
    data-property="${pair => pair.property}"
    title="${pair => `sort by ${pair.heading}`}"
  >
    <button
      type="button"
      @click=${(pair, c) => c.parent.updateSort(pair.property)}
    >
      <span>${pair => pair.heading}</span>
      <span class="sort-indicator">
        ${(pair, c) =>
          pair.property === c.parent.sortProperty
            ? c.parent.descending
              ? "▼"
              : "▲"
            : ""}
      </span>
    </button>
  </th>
`;

const cellTemplate = html<CellData>` <td>${cell => cell.value}</td> `;

const rowTemplate = html<RowData>`
  <tr>
    ${repeat(row => row.cells, cellTemplate)}
  </tr>
`;

// x is set to a SortableTable instance.
const template = html<SortableTable>`
  <slot></slot>
  <table>
    <thead>
      <tr>
        ${repeat(x => x.headingPairs, headingTemplate)}
      </tr>
    </thead>
    <tbody>
      ${repeat(x => x.rows, rowTemplate)}
    </tbody>
  </table>
  <slot name="footnote"></slot>
`;

@customElement({ name: "sortable-table", template, styles })
export class SortableTable extends FASTElement {
  @attr headings = "";
  @attr properties = "";

  @observable data: Array<LooseObject> = [];
  @observable descending = false;
  @observable sortProperty = "";

  get headingPairs(): HeadingPair[] {
    return this.headings
      .split(",")
      .map((heading, index) => ({
        heading: heading.trim(),
        property: this.propertyArray[index],
      }))
      .filter(pair => pair.heading && pair.property);
  }

  get propertyArray(): string[] {
    return this.properties
      .split(",")
      .map(property => property.trim())
      .filter(Boolean);
  }

  get rows(): RowData[] {
    return this.sortedData.map(row => ({
      cells: this.propertyArray.map(property => ({
        property,
        value: row[property],
      })),
    }));
  }

  get sortedData(): Array<LooseObject> {
    const sortProperty = this.sortProperty;
    if (!sortProperty) return this.data;

    return this.data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === "number"
            ? aValue - (bValue as number)
            : 0;

      return this.descending ? -compare : compare;
    });
  }

  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.sortProperty = property;
    this.descending = same ? !this.descending : false;
    this.dispatchEvent(
      new CustomEvent("sort", {
        detail: { property, descending: this.descending },
      }),
    );
  }
}
