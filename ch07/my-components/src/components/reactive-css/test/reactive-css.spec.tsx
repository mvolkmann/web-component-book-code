import { h, render } from "@stencil/vitest";
import "../reactive-css";

describe("reactive-css", () => {
  it("renders and reacts to input", async () => {
    const { root, waitForChanges } = await render(<reactive-css />);
    const input = root.shadowRoot?.querySelector("input") as HTMLInputElement;
    const paragraph = root.shadowRoot?.querySelector("p");

    expect(input.value).toBe("18");
    expect(paragraph?.style.getPropertyValue("--font-size")).toBe("18px");

    input.value = "24";
    input.dispatchEvent(new Event("input"));
    await waitForChanges();
    expect(paragraph?.style.getPropertyValue("--font-size")).toBe("24px");
  });
});
