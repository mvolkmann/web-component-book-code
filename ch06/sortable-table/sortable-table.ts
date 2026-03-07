import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type LooseObject = Record<string, unknown>;

@customElement("sortable-table")
export class SortableTable extends LitElement {
  @property({ type: Array<LooseObject> }) data = [];
  @property({ type: Boolean }) descending = false;
  @property({ type: String }) headings = "";
  @property({ type: String }) properties = "";
  @state() propertyArray: string[] = [];
  @state() sortedData: Array<LooseObject> = [];
  @state() sortProperty = "";

  static styles = css`
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
      cursor: pointer;
      > span {
        pointer-events: none;
      }
    }
  `;

  makeHeadings() {
    return this.headings
      .split(",")
      .map((heading, i) => this.makeTh(heading, this.propertyArray[i]));
  }

  makeRows() {
    return this.sortedData.map((obj) => this.makeTr(obj));
  }

  makeTd(value: unknown) {
    return html`<td>${value}</td>`;
  }

  makeTh(heading: string, property: string) {
    return html`
      <th
        data-property="${property}"
        role="button"
        title="${`sort by ${heading}`}"
        @click=${() => this.updateSort(property)}
      >
        <span>${heading}</span>
        <span class="sort-indicator"> ${this.sortIndicator(property)} </span>
      </th>
    `;
  }

  makeTr(obj: LooseObject) {
    return html`
      <tr>
        ${this.propertyArray.map((propName) => this.makeTd(obj[propName]))}
      </tr>
    `;
  }

  render() {
    return html`
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
  }

  sort() {
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

  willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has("properties")) {
      this.propertyArray = this.properties.split(",");
    }

    if (
      changedProps.has("data") ||
      changedProps.has("sortProperty") ||
      changedProps.has("descending")
    ) {
      this.sortedData = this.sort();
    }
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
