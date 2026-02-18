import { content } from "./radio-group-html.js";

class RadioGroup extends HTMLElement {
  labels = "";
  name = "";
  values = "";
  #value = ""; // managed by a getter and setter

  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "value") {
      this.#value = newValue;

      let radioButton = this.shadowRoot.querySelector(
        `input[name="${this.name}"][value="${oldValue}"]`
      );
      radioButton?.removeAttribute("checked");

      radioButton = this.shadowRoot.querySelector(
        `input[name="${this.name}"][value="${newValue}"]`
      );
      radioButton?.setAttribute("checked", "checked");
      if (radioButton) radioButton.checked = true;
    }
  }

  connectedCallback() {
    this.labels = this.getAttribute("labels");
    this.name = this.getAttribute("name");
    this.#value = this.getAttribute("value");
    this.values = this.getAttribute("values");

    this.shadowRoot.innerHTML = content({
      labels: this.labels,
      name: this.name,
      value: this.#value,
      values: this.values,
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
        })
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
    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = input.value === v;
    }
  }
}

customElements.define("radio-group", RadioGroup);
