const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    :host > div {
      display: flex;
      gap: 1rem;

      > div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  </style>
  <div></div>
`;

export class RadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  labels = "";
  name = "";
  values = "";
  #value = ""; // managed by a getter and setter

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.#value = this.getAttribute("value");
    // React sets these properties and removes the attributes before this.
    if (!this.labels) this.labels = this.getAttribute("labels");
    if (!this.values) this.values = this.getAttribute("values");

    this.render();

    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.addEventListener("change", (event) => {
        this.value = event.target.value;
      });
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "value") this.value = newValue;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (newValue === this.#value) return;
    this.#value = newValue;
    this.setAttribute("value", newValue);

    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = input.value === this.#value;
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.#value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  makeButtons() {
    console.log("radio-group.js makeButtons: entered");
    const labelArray = this.labels.split(",");
    const valueArray = this.values.split(",").map((value) => value.trim());
    return valueArray
      .map(
        (value, index) =>
          html`<div>
            <input
              type="radio"
              id="${value}"
              name="${this.name}"
              value="${value}"
              ${value === this.value ? "checked" : ""}
            />
            <label for="${value}">${labelArray[index]}</label>
          </div>`,
      )
      .join("");
  }

  render() {
    const dom = template.content.cloneNode(true);
    dom.querySelector("div").innerHTML = this.makeButtons();
    this.shadowRoot.replaceChildren(dom);
  }
}

customElements.define("radio-group", RadioGroup);
