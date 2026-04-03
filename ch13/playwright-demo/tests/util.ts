import { Locator } from "@playwright/test";

export function getProperty(locator: Locator, name: string) {
  return locator.evaluate((el: HTMLElement, name) => (el as any)[name], name);
}

export function setAttribute(locator: Locator, name: string, value: string) {
  return locator.evaluate(
    (el: HTMLElement, [name, value]) => {
      el.setAttribute(name, value);
    },
    [name, value],
  );
}

export function setProperty(locator: Locator, name: string, value: unknown) {
  type Arg = { name: string; value: unknown };
  return locator.evaluate(
    (el: HTMLElement, { name, value }: Arg) => {
      (el as any)[name] = value;
    },
    { name, value },
  );
}
