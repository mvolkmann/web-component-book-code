import { content } from "./radio-group-html.js";

class RadioGroup extends HTMLElement {
  #value = "";

  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName === "value") this.value = newValue;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = content({
      labels: this.getAttribute("labels"),
      name: this.getAttribute("name"),
      value: this.#value,
      values: this.getAttribute("values"),
    });

    this.shadowRoot.addEventListener("change", (e) => {
      const { labels, value } = e.target;
      const label = labels[0].textContent;
      this.value = value;
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true, // to bubble outside the shadow DOM
          detail: { label, value },
        }),
      );
    });
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    if (v === this.#value) return;
    this.#value = v;
    this.setAttribute("value", v);

    // Update the checked property in all the radio buttons.
    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = input.value === v;
    }
  }
}

customElements.define("radio-group", RadioGroup);
