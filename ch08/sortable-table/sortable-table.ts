import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  observable,
  type ViewTemplate,
} from "@microsoft/fast-element";

type LooseObject = Record<string, unknown>;

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

// x is set to a SortableTable instance.
const template = html<SortableTable>`
  <slot></slot>
  <table>
    <thead>
      <tr>
        ${x => x.makeHeadings()}
      </tr>
    </thead>
    <tbody>
      ${x => x.makeRows()}
    </tbody>
  </table>
  <slot name="footnote"></slot>
`;

function composeTemplates<T>(templates: Array<ViewTemplate<T>>) {
  const strings = new Array(templates.length + 1).fill(
    "",
  ) as unknown as TemplateStringsArray;
  Object.defineProperty(strings, "raw", { value: strings });
  return html<T>(strings, ...templates);
}

@customElement({ name: "sortable-table", template, styles })
export class SortableTable extends FASTElement {
  @observable data: Array<LooseObject> = [];
  @attr headings = "";
  @attr properties = "";

  @observable descending = false;
  @observable sortedData: Array<LooseObject> = [];
  @observable sortProperty = "";
  @observable propertyArray: string[] = [];

  makeHeadings() {
    return composeTemplates(
      this.headings
        .split(",")
        .map((heading, i) =>
          this.makeTh(heading.trim(), this.propertyArray[i]),
        ),
    );
  }

  makeRows() {
    return composeTemplates(this.sortedData.map(obj => this.makeTr(obj)));
  }

  makeTd(value: unknown) {
    return html`<td>${value}</td>`;
  }

  makeTh(heading: string, property: string) {
    return html`
      <th
        aria-sort="${property === this.sortProperty
          ? this.descending
            ? "descending"
            : "ascending"
          : undefined}"
        data-property="${property}"
        title="${`sort by ${heading}`}"
      >
        <button type="button" @click=${() => this.updateSort(property)}>
          <span>${heading}</span>
          <span class="sort-indicator"> ${this.sortIndicator(property)} </span>
        </button>
      </th>
    `;
  }

  makeTr(obj: LooseObject) {
    const cells = composeTemplates(
      this.propertyArray.map(propName => this.makeTd(obj[propName])),
    );
    return html`
      <tr>
        ${cells}
      </tr>
    `;
  }

  #sort() {
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

  sortIndicator(property: string) {
    if (property !== this.sortProperty) return "";
    return this.descending ? "▼" : "▲";
  }

  connectedCallback() {
    super.connectedCallback();
    this.#syncProperties();
    this.#syncSortedData();
  }

  dataChanged() {
    this.#syncSortedData();
  }

  descendingChanged() {
    this.#syncSortedData();
  }

  propertiesChanged() {
    this.#syncProperties();
    this.#syncSortedData();
  }

  sortPropertyChanged() {
    this.#syncSortedData();
  }

  #syncProperties() {
    this.propertyArray = this.properties
      .split(",")
      .map(property => property.trim())
      .filter(Boolean);
  }

  #syncSortedData() {
    this.sortedData = this.#sort();
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
