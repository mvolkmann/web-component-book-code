class CarTable extends HTMLElement {
  #cars = [];

  connectedCallback() {
    this.innerHTML = `
      <style>
        table {
          border-collapse: collapse;
          font-family: sans-serif;
        }
        th {
          background-color: lightcoral;
        } 
        th, td {
          border: 1px solid black;
          padding: 0.5rem;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  get cars() {
    return this.#cars;
  }

  set cars(cars) {
    this.#cars = cars;
    const tbody = this.querySelector("tbody");
    tbody.innerHTML = "";
    for (const car of cars) {
      tbody.appendChild(makeRow(car.make, car.model, car.year));
    }
  }
}

function makeRow(...values) {
  const tr = document.createElement("tr");
  for (const value of values) {
    const cell = document.createElement("td");
    cell.textContent = value;
    tr.appendChild(cell);
  }
  return tr;
}

customElements.define("car-table", CarTable);
