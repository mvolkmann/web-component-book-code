import { ContactPerson, Person } from "./contact-person.js";
import { WrecState } from "wrec";

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

const state = new WrecState("demo", false, { person });
contactPerson.useState(state);

const button = document.querySelector("button");
button?.addEventListener("click", () => {
  const person = state.person as Person;
  person.firstName = "John";
  person.address.zip = "98765";
});
