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

  makeHeadings(headings: string, propertyArray: string[]) {
    return headings
      .split(",")
      .map((heading, i) => this.makeTh(heading, propertyArray[i]));
  }

  makeRows(sortedData: LooseObject[], propertyArray: string[]) {
    return sortedData.map((obj) => this.makeTr(obj, propertyArray));
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
        onClick="this.updateSort('${property}')"
      >
        <span>${heading}</span>
        <span class="sort-indicator">
          ${this.sortIndicator(
            this.sortProperty,
            this.descending,
            "${property}",
          )}
        </span>
      </th>
    `;
  }

  makeTr(obj: LooseObject, propertyArray: string[]) {
    return html`
      <tr>
        ${propertyArray.map((propName) => this.makeTd(obj[propName]))}
      </tr>
    `;
  }

  render() {
    return html`
      <slot></slot>
      <table>
        <thead>
          <tr>
            ${this.makeHeadings(this.headings, this.propertyArray)}
          </tr>
        </thead>
        <tbody>
          ${this.makeRows(this.sortedData, this.propertyArray)}
        </tbody>
      </table>
      <slot name="footnote"></slot>
    `;
  }

  sort(data: LooseObject[], sortProperty: string, descending: boolean) {
    if (!sortProperty) return data;

    return data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === "number"
            ? aValue - (bValue as number)
            : 0;
      return descending ? -compare : compare;
    });
  }

  sortIndicator(sortProperty: string, descending: boolean, property: string) {
    if (property !== sortProperty) return "";
    return this.descending ? "▼" : "▲";
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("properties")) {
      this.propertyArray = this.properties.split(",");
    }

    if (
      changedProps.has("data") ||
      changedProps.has("sortProperty") ||
      changedProps.has("descending")
    ) {
      this.sortedData = this.sort(
        this.data,
        this.sortProperty,
        this.descending,
      );
    }
  }

  updateSort(property: string) {
    this.sortProperty = property;
    const same = property === this.sortProperty;
    this.descending = same ? !this.descending : false;
  }
}
