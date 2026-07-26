import { h, render, vi } from "@stencil/vitest";

describe("google-button browser", () => {
  it("renders", async () => {
    const { root } = await render(<google-button />);
    expect(root).toHaveClass("hydrated");
    expect(root.shadowRoot?.querySelector("button")).not.toBeNull();
  });

  it("opens Google when clicked", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { root } = await render(<google-button />);
    root.shadowRoot?.querySelector("button")?.click();
    expect(openSpy).toHaveBeenCalledWith("https://google.com", "_blank");
    openSpy.mockRestore();
  });
});
