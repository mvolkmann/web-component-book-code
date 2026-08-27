import { h, render } from "@stencil/vitest";
import "../hello-world";

// Verifies the greeting rendered for a given name.
async function helloWorldTest(name?: string) {
  const { root } = await render(<hello-world name={name} />);
  expect(root.getAttribute("name")).toBe(name ?? "World");
  expect(root.shadowRoot?.querySelector("p")?.textContent).toBe(
    `Hello, ${name ?? "World"}!`,
  );
}

describe("hello-world", () => {
  it("renders default", async () => {
    await helloWorldTest();
  });

  it("renders with name", async () => {
    await helloWorldTest("Earth");
  });
});
