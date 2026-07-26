import { h, render } from "@stencil/vitest";

describe("sortable-table browser", () => {
  it("renders", async () => {
    const { root } = await render(
      <sortable-table headings="Make,Model,Year" properties="make,model,year">
        <h2>My Cars</h2>
        <p slot="footnote">Some of these cars are no longer owned.</p>
      </sortable-table>,
    );
    expect(root).toHaveClass("hydrated");
    expect(root.shadowRoot?.querySelectorAll("th")).toHaveLength(3);
  });
});
