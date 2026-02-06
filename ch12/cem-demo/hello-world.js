function createSlot(name) {
  const slot = document.createElement("slot");
  if (name) slot.setAttribute("name", name);
  return slot;
}

/**
 * This displays a greeting message for a given name in a specified color.
 * @summary This displays a greeting message.
 * @element hello-world
 * @attr {string} color - initial text color
 * @attr {string} name - initial name to greet
 * @prop {string} [color=black] - current text color
 * @prop {string} [name=World] - current name to greet
 * @slot - for content after the greeting
 * @slot before - for content before the greeting
 * @slot after - for content after the greeting and the unnamed slot
 * @cssprop [--border-color=gray] color of border that surrounds the component
 * @csspart greeting - greeting message
 */
class HelloWorld extends HTMLElement {
  #color = "black";
  #name;
  #p = document.createElement("p");

  static get observedAttributes() {
    return ["color", "name"];
  }

  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName === "name") {
      this.name = newValue;
    } else if (attrName === "color") {
      this.color = newValue;
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        border: 3px solid var(--border-color, gray);
        margin: 0.5rem 0;
        padding: 0.5rem;
      }
    `;
    this.name = "World";
    this.#p.setAttribute("part", "greeting");
    this.shadowRoot.replaceChildren(
      style,
      createSlot("before"),
      this.#p,
      createSlot(),
      createSlot("after"),
    );
  }

  get color() {
    return this.#color;
  }

  get name() {
    return this.#name;
  }

  set color(value) {
    if (value === this.#color) return;
    this.#color = value;
    this.setAttribute("color", value);
    this.#p.style.color = this.#color;
  }

  set name(value) {
    if (value === this.#name) return;
    this.#name = value;
    this.setAttribute("name", value);
    this.#p.textContent = `Hello, ${this.#name}!`;
  }
}

customElements.define("hello-world", HelloWorld);
