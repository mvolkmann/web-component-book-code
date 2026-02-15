import { expect, Locator, Page } from "@playwright/test";

export async function expectAttribute(
  locator: Locator,
  attrName: string,
  expectedValue: boolean | number | string,
) {
  const value = await locator.evaluate(
    (el: Element, attrName) => (el as any).getAttribute(attrName),
    attrName,
  );
  return expect(value).toBe(expectedValue);
}

export async function expectProperty(
  locator: Locator,
  propertyName: string,
  expectedValue: boolean | number | string,
) {
  const value = await locator.evaluate(
    (el: Element, propertyName) => (el as any)[propertyName],
    propertyName,
  );
  return expect(value).toBe(expectedValue);
}

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
