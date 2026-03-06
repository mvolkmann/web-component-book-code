import { parseHTML } from "linkedom";
const { HTMLElement } = parseHTML("<!DOCTYPE html>");
global.HTMLElement = HTMLElement;
global.customElements = {
  get: () => {},
  define: () => {},
};
