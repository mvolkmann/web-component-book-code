import { Residence } from "./residence.js";
import { validate } from "./decorators.js";
const residence = new Residence();
residence.years = -3;
console.log(validate(residence));
residence.city = "St. Charles";
residence.zip = "63304";
residence.years = 27;
console.log(validate(residence));
