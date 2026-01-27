import { accessorLog, fieldLog } from "./decorators.js";

export class Residence {
  accessor city = "";

  accessor zip = "";

  @accessorLog
  accessor years = 0;

  @fieldLog
  secret = "random";
}

const residence = new Residence();
console.log("secret =", residence.secret);
residence.years = 3;
