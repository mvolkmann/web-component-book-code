// This version of the component adds support for
// the "sort-property" and "descending" attributes.
type LooseObject = Record<string, unknown>;

const template = document.createElement("template");
const html = String.raw;
template.innerHTML = html`
  <style>
    :host {
      display: inline-block;
    }
    :host([hidden]) {
      display: none;
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
  </style>
  <slot></slot>
  <table>
    <thead>
      <tr></tr>
    </thead>
    <tbody></tbody>
  </table>
  <slot name="footnote"></slot>
`;

class SortableTable2 extends HTMLElement {
  #data: LooseObject[] = [];
  #descending = false; // no sort yet
  #headings = "";
  #headTr!: HTMLTableRowElement;
  #properties = "";
  #propertyArray: string[] = [];
  #sortByClick = false;
  #sortHeader: HTMLTableCellElement | null = null;
  #sortProperty = "";

  static get observedAttributes() {
    return ["descending", "headings", "properties", "sort-property"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    if (!this.hasAttribute("title")) {
      this.setAttribute("title", "sortable-table");
    }
    this.#headTr = this.shadowRoot!.querySelector("table thead tr")!;
  }

  attributeChangedCallback(
    attrName: string,
    _oldValue: string,
    newValue: string,
  ) {
    if (attrName === "descending") {
      this.descending = Boolean(newValue);
    } else if (attrName === "headings") {
      this.headings = newValue;
    } else if (attrName === "properties") {
      this.properties = newValue;
    } else if (attrName === "sort-property") {
      this.sortProperty = newValue;
    }
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Gets the data array.
   * @returns {LooseObject[]} The data array.
   */
  /*******  00bad099-3cc8-4f92-8b58-54461ad374fe  *******/
  get data() {
    return this.#data;
  }

  get descending() {
    return this.#descending;
  }

  get headings() {
    return this.#headings;
  }

  get properties() {
    return this.#properties;
  }

  get sortProperty() {
    return this.#sortProperty;
  }

  set descending(descending: boolean) {
    if (descending === this.#descending) return;
    this.#descending = descending;
    if (descending) {
      this.setAttribute("descending", "descending");
    } else {
      this.removeAttribute("descending");
    }
    this.#sort();
  }

  set data(data: LooseObject[]) {
    this.#data = data;
    const tbody = this.shadowRoot!.querySelector("table tbody")!;
    tbody.innerHTML = "";
    data.forEach((_obj, index) => tbody.appendChild(this.#makeTr(index)));
  }

  set headings(headings: string) {
    if (headings === this.#headings) return;

    this.#headings = headings;
    this.setAttribute("headings", headings);
    const tr = this.#headTr;
    tr.innerHTML = "";
    const self = this;
    const values = headings.split(",").map((heading) => heading.trim());
    values.forEach((heading, i) => tr.appendChild(self.#makeTh(heading, i)));
  }

  set properties(properties: string) {
    if (properties === this.#properties) return;

    this.#properties = properties;
    this.setAttribute("properties", properties);
    this.#propertyArray = properties.split(",").map((prop) => prop.trim());

    // Trigger "set data".
    this.data = this.data;
  }

  set sortProperty(property: string) {
    if (property === this.#sortProperty) return;
    this.#sortProperty = property;
    this.setAttribute("sort-property", property);
    this.#descending = false;
    this.removeAttribute("descending");
    this.#sort();
  }

  #handleSort(event: Event) {
    this.#sortByClick = true;
    const th = event.target! as HTMLTableCellElement;
    const property = th.getAttribute("data-property")!;
    const sameProperty = property === this.#sortProperty;
    this.sortProperty = property;
    if (sameProperty) this.descending = !this.#descending;
  }

  #makeTd(dataIndex: number, prop: string) {
    const td = document.createElement("td");
    const value = this.data[dataIndex][prop];
    td.textContent = String(value);
    return td;
  }

  #makeTh(heading: string, index: number) {
    const th = document.createElement("th");
    th.setAttribute("data-property", this.#propertyArray[index]);
    th.setAttribute("role", "button");
    th.setAttribute("title", `sort by ${heading}`);
    th.addEventListener("click", this.#handleSort.bind(this));

    let span = document.createElement("span");
    span.textContent = heading;
    th.appendChild(span);

    span = document.createElement("span");
    span.classList.add("sort-indicator");
    th.appendChild(span);

    return th;
  }

  #makeTr(dataIndex: number) {
    const tr = document.createElement("tr");
    for (const propName of this.#propertyArray) {
      tr.appendChild(this.#makeTd(dataIndex, propName));
    }
    return tr;
  }

  #sort() {
    const property = this.#sortProperty;
    const descending = this.#descending;
    const th = this.#headTr.querySelector(
      `th[data-property="${property}"]`,
    ) as HTMLTableCellElement;

    this.#data.sort((a: LooseObject, b: LooseObject) => {
      const aValue = a[property];
      const bValue = b[property];
      let compare =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === "number"
            ? aValue - (bValue as number)
            : 0;
      return descending ? -compare : compare;
    });

    // Trigger "set data".
    this.data = this.data;

    // Clear sort indicator from previously selected header.
    if (this.#sortHeader) {
      const sortIndicator = this.#sortHeader.querySelector(".sort-indicator");
      if (sortIndicator) sortIndicator.textContent = "";
    }

    // Add sort indicator to currently selected header.
    const sortIndicator = th.querySelector(".sort-indicator");
    if (sortIndicator) {
      sortIndicator.textContent = descending ? "\u25BC" : "\u25B2";
    }
    this.#sortHeader = th;

    // This check satisfies the best practice
    // "Do not dispatch events in response to the host setting a property."
    if (this.#sortByClick) {
      this.dispatchEvent(
        new CustomEvent("sort", {
          bubbles: true,
          composed: true,
          detail: { property, descending },
        }),
      );
      this.#sortByClick = false;
    }
  }
}

customElements.define("sortable-table2", SortableTable2);
