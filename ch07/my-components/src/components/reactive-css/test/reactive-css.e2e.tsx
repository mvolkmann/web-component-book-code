import { h, render } from "@stencil/vitest";

describe("reactive-css browser", () => {
  it("renders", async () => {
    const { root } = await render(<reactive-css />);
    expect(root).toHaveClass("hydrated");
    expect(root.shadowRoot?.querySelector("input")).not.toBeNull();
  });
});
