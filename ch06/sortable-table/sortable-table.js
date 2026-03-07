var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let SortableTable = class SortableTable extends LitElement {
    constructor() {
        super(...arguments);
        this.data = [];
        this.descending = false;
        this.headings = "";
        this.properties = "";
        this.propertyArray = [];
        this.sortedData = [];
        this.sortProperty = "";
    }
    static { this.styles = css `
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
  `; }
    makeHeadings() {
        return this.headings
            .split(",")
            .map((heading, i) => this.makeTh(heading, this.propertyArray[i]));
    }
    makeRows() {
        return this.sortedData.map((obj) => this.makeTr(obj));
    }
    makeTd(value) {
        return html `<td>${value}</td>`;
    }
    makeTh(heading, property) {
        return html `
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
    makeTr(obj) {
        return html `
      <tr>
        ${this.propertyArray
            .map((propName) => this.makeTd(obj[propName]))
            .join("")}
      </tr>
    `;
    }
    render() {
        return html `
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
        if (!sortProperty)
            return this.data;
        return this.data.toSorted((a, b) => {
            const aValue = a[sortProperty];
            const bValue = b[sortProperty];
            const compare = typeof aValue === "string"
                ? aValue.localeCompare(bValue)
                : typeof aValue === "number"
                    ? aValue - bValue
                    : 0;
            return this.descending ? -compare : compare;
        });
    }
    sortIndicator(property) {
        if (property !== this.sortProperty)
            return "";
        return this.descending ? "▼" : "▲";
    }
    willUpdate(changedProps) {
        if (changedProps.has("properties")) {
            this.propertyArray = this.properties.split(",");
        }
        if (changedProps.has("data") ||
            changedProps.has("sortProperty") ||
            changedProps.has("descending")) {
            this.sortedData = this.sort();
        }
    }
    updateSort(property) {
        const same = property === this.sortProperty;
        this.sortProperty = property;
        this.descending = same ? !this.descending : false;
        this.dispatchEvent(new CustomEvent("sort", {
            detail: { property, descending: this.descending },
        }));
    }
};
__decorate([
    property({ type: (Array) })
], SortableTable.prototype, "data", void 0);
__decorate([
    property({ type: Boolean })
], SortableTable.prototype, "descending", void 0);
__decorate([
    property({ type: String })
], SortableTable.prototype, "headings", void 0);
__decorate([
    property({ type: String })
], SortableTable.prototype, "properties", void 0);
__decorate([
    state()
], SortableTable.prototype, "propertyArray", void 0);
__decorate([
    state()
], SortableTable.prototype, "sortedData", void 0);
__decorate([
    state()
], SortableTable.prototype, "sortProperty", void 0);
SortableTable = __decorate([
    customElement("sortable-table")
], SortableTable);
export { SortableTable };
