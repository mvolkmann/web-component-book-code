import { test, expect } from "@playwright/test";

test("can click to change salutation", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const locator = page.locator("hello-goodbye");
  await expect(locator).toHaveText("Hello, World!");
  await locator.click();
  await expect(locator).toHaveText("Goodbye, World!");
  await locator.click();
  await expect(locator).toHaveText("Hello, World!");
});
