import { expect, Locator, test } from "@playwright/test";
import { TrafficLight } from "../src/traffic-light";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

const expectState = (trafficLight: Locator, state: string) =>
  expect(trafficLight).toHaveJSProperty("state", state);

test("is attached", async ({ page }) => {
  const component = page.locator("traffic-light");
  await expect(component).toBeAttached();
});

test("can click to change state", async ({ page }) => {
  const trafficLight = page.locator("traffic-light");
  await expectState(trafficLight, "stop");
  await trafficLight.click();
  await expectState(trafficLight, "yield");
  await trafficLight.click();
  await expectState(trafficLight, "go");
});

test("can call next to change state", async ({ page }) => {
  const trafficLight = page.locator("traffic-light");
  await expectState(trafficLight, "stop");
  await trafficLight.evaluate((el: TrafficLight) => el.next());
  await expectState(trafficLight, "yield");
  await trafficLight.evaluate((el: TrafficLight) => el.next());
  await expectState(trafficLight, "go");
});

test("screenshot", async ({ page }) => {
  const trafficLight = page.locator("traffic-light");
  await expect(trafficLight).toHaveScreenshot();
});
