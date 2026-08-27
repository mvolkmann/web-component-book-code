import { customElement, on } from "./decorators";

@customElement("info-button")
class InfoButton extends HTMLElement {
  #dialog: HTMLDialogElement | undefined;

  @on("click")
  handleClick(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    if (button.id === "close") {
      this.#dialog?.close();
    } else {
      this.#dialog?.showModal();
    }
  }

  connectedCallback() {
    const label = this.getAttribute("label") || "Info";
    const text = this.textContent || "No information was provided.";
    this.innerHTML = `
      <button>${label}</button>
      <dialog>
        <p>${text}</p>
        <button id="close">Close</button>
      </dialog>
    `;
    this.#dialog = this.querySelector("dialog") as HTMLDialogElement;
  }
}
