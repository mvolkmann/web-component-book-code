import "./App.css";
import { SortableTable } from "./stencil/components";

const data = [
  { make: "Ford", model: "Mustang", year: 1967 },
  { make: "Audi", model: "A4", year: 2008 },
  { make: "BMW", model: "M3", year: 1999 },
];

export default function App() {
  return (
    <main>
      <h1>Sortable Table Demo</h1>
      <SortableTable
        data={data}
        headings="Make,Model,Year"
        properties="make,model,year"
      />
    </main>
  );
}
