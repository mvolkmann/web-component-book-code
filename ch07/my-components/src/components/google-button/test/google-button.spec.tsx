import { h, render, vi } from "@stencil/vitest";
import "../google-button";

describe("google-button", () => {
  it("renders", async () => {
    const { root } = await render(<google-button />);
    expect(root.shadowRoot?.querySelector("button")?.textContent).toBe("Google It");
  });

  it("opens Google when clicked", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { root } = await render(<google-button />);
    root.shadowRoot?.querySelector("button")?.click();
    expect(openSpy).toHaveBeenCalledWith("https://google.com", "_blank", "noopener,noreferrer");
    openSpy.mockRestore();
  });
});
