import type { SortDetail, SortableTable } from "./sortable-table.ts";

function configureTable(elementName: string) {
  const table = document.querySelector(elementName) as SortableTable | null;
  if (!table) return;

  table.data = [
    { make: "BMW", model: "Z3", year: 2002 },
    { make: "MINI", model: "Cooper", year: 2015 },
    { make: "Subaru", model: "Forester", year: 2025 },
    { make: "Toyota", model: "RAV4", year: 2010 },
  ];

  table.addEventListener("sort", (event: Event) => {
    const customEvent = event as CustomEvent<SortDetail>;
    const { property, descending } = customEvent.detail;
    console.log(
      `The table is now sorted by ${property}`,
      `${descending ? "descending" : "ascending"}.`,
    );
  });
}

configureTable("sortable-table");
configureTable("sortable-table2");
