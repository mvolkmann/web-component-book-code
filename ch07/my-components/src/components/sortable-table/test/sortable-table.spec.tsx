import { h, render, vi } from "@stencil/vitest";
import "../sortable-table";

const cars = [
  { make: "Ford", model: "Mustang", year: 1967 },
  { make: "Audi", model: "A4", year: 2008 },
  { make: "BMW", model: "M3", year: 1999 },
];

// Renders the sortable table fixture used by each test.
function getPage() {
  return render(
    <sortable-table headings="Make,Model,Year" properties="make,model,year">
      <h2>My Cars</h2>
      <p slot="footnote">Some of these cars are no longer owned.</p>
    </sortable-table>,
  );
}

// Returns the rendered text from each table row.
function getRows(root: Element) {
  return [...root.shadowRoot!.querySelectorAll("tbody tr")].map((row) =>
    [...row.querySelectorAll("td")].map((cell) => cell.textContent),
  );
}

describe("sortable-table", () => {
  it("renders headings and slots", async () => {
    const { root } = await getPage();
    const headings = [...root.shadowRoot!.querySelectorAll("th")];
    expect(headings.map((heading) => heading.textContent?.trim())).toEqual([
      "Make",
      "Model",
      "Year",
    ]);
    expect(root.querySelector("h2")?.textContent).toBe("My Cars");
    expect(root.querySelector('[slot="footnote"]')?.textContent).toBe(
      "Some of these cars are no longer owned.",
    );
  });

  it("renders rows when data changes", async () => {
    const { root, waitForChanges } = await getPage();
    (root as HTMLSortableTableElement).data = cars.slice(0, 2);
    await waitForChanges();
    expect(getRows(root)).toEqual([
      ["Ford", "Mustang", "1967"],
      ["Audi", "A4", "2008"],
    ]);
  });

  it("sorts string and number values", async () => {
    const { root, waitForChanges } = await getPage();
    (root as HTMLSortableTableElement).data = cars;
    await waitForChanges();

    const buttons = root.shadowRoot!.querySelectorAll("th button");
    (buttons[0] as HTMLButtonElement).click();
    await waitForChanges();
    expect(getRows(root).map((row) => row[0])).toEqual(["Audi", "BMW", "Ford"]);

    (buttons[2] as HTMLButtonElement).click();
    await waitForChanges();
    expect(getRows(root).map((row) => row[2])).toEqual([
      "1967",
      "1999",
      "2008",
    ]);
  });

  it("toggles sort direction and emits details", async () => {
    const { root, waitForChanges } = await getPage();
    (root as HTMLSortableTableElement).data = cars;
    await waitForChanges();
    const eventSpy = vi.fn();
    root.addEventListener("tableSorted", eventSpy);
    const makeButton = root.shadowRoot!.querySelector(
      "th button",
    ) as HTMLButtonElement;

    makeButton.click();
    await waitForChanges();
    expect(
      root.shadowRoot?.querySelector("th")?.getAttribute("aria-sort"),
    ).toBe("ascending");
    expect(root.shadowRoot?.querySelector(".sort-indicator")?.textContent).toBe(
      "▲",
    );
    expect(eventSpy.mock.calls[0][0].detail).toEqual({
      descending: false,
      property: "make",
    });

    makeButton.click();
    await waitForChanges();
    expect(
      root.shadowRoot?.querySelector("th")?.getAttribute("aria-sort"),
    ).toBe("descending");
    expect(getRows(root).map((row) => row[0])).toEqual(["Ford", "BMW", "Audi"]);
    expect(eventSpy.mock.calls[1][0].detail).toEqual({
      descending: true,
      property: "make",
    });
  });
});
