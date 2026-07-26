import { h, render } from "@stencil/vitest";

// Verifies the browser-rendered greeting for a given name.
async function helloWorldTest(name?: string) {
  const { root } = await render(<hello-world name={name} />);
  expect(root).toHaveClass("hydrated");
  expect(root.shadowRoot?.querySelector("p")?.textContent).toBe(
    `Hello, ${name ?? "World"}!`,
  );
}

describe("hello-world browser", () => {
  it("renders default", async () => {
    await helloWorldTest();
  });

  it("renders with name", async () => {
    await helloWorldTest("Earth");
  });
});
