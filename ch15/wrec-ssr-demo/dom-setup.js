import { parseHTML } from "linkedom";
const { window, document, HTMLElement } = parseHTML("<!DOCTYPE html>");
global.HTMLElement = HTMLElement;
global.customElements = {
  get: () => {},
  define: () => {},
};
