import { ContactPerson, Person } from "./contact-person.js";
import { WrecState } from "wrec";
import { FavoriteColors } from "./favorite-colors.js";

const person: Person = {
  firstName: "Richard",
  middleName: "Mark",
  lastName: "Volkmann",
  phone: "123-456-7890",
  address: {
    street: "123 Main St.",
    city: "Somewhere",
    state: "CA",
    zip: "12345",
  },
};

const contactPerson = document.querySelector("contact-person") as ContactPerson;
//contactPerson.person = person;
const favoriteColors = document.querySelector(
  "favorite-colors",
) as FavoriteColors;

const state = new WrecState("demo", false, {
  colors: ["black", "white"],
  person,
});
contactPerson.useState(state, { person: "person" });
favoriteColors.useState(state, { colors: "colors" });

const button = document.querySelector("button");
button?.addEventListener("click", () => {
  const person = state.person as Person;
  person.firstName = "John";
  person.address.zip = "98765";

  state.colors = ["yellow", "orange"];
});
