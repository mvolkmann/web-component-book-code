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

class SortableTable extends HTMLElement {
  #data: LooseObject[] = [];
  #headings: string = "";
  #properties: string = "";
  #propertyArray: string[] = [];
  #sortDescending = false;
  #sortHeader: HTMLTableCellElement | null = null;

  static get observedAttributes() {
    return ["headings", "properties"];
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
  }

  attributeChangedCallback(
    attrName: string,
    _oldValue: string,
    newValue: string,
  ) {
    if (attrName === "headings") {
      this.headings = newValue;
    } else if (attrName === "properties") {
      this.properties = newValue;
    }
  }

  get data() {
    return this.#data;
  }

  get headings() {
    return this.#headings;
  }

  get properties() {
    return this.#properties;
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
    const tr = this.shadowRoot!.querySelector("table thead tr")!;
    tr!.innerHTML = "";
    const values = headings.split(",").map((heading) => heading.trim());
    values.forEach((heading, i) => tr.appendChild(this.#makeTh(heading, i)));
  }

  set properties(properties: string) {
    if (properties === this.#properties) return;

    this.#properties = properties;
    this.setAttribute("properties", properties);
    this.#propertyArray = properties.split(",").map((prop) => prop.trim());

    // Trigger "set data".
    this.data = this.data;
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
    th.addEventListener("click", this.#sort.bind(this));

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

  #sort(event: Event) {
    let th = event.target! as HTMLTableCellElement;
    const property = th.getAttribute("data-property")!;
    const descending = th === this.#sortHeader ? !this.#sortDescending : false;

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
    this.#sortDescending = descending;

    this.dispatchEvent(
      new CustomEvent("sort", {
        bubbles: true,
        composed: true,
        detail: { property, descending },
      }),
    );
  }
}

customElements.define("sortable-table", SortableTable);
