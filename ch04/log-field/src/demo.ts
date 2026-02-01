import { logField } from "./decorators.js";

export class Residence {
  accessor city = "";

  accessor zip = "";

  accessor years = 0;

  @logField
  secret = "random";
}

const residence = new Residence();
console.log("secret =", residence.secret);
residence.years = 3;
