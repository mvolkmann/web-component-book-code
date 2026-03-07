import { minLength, range, regex, required } from "./decorators.js";

export class Residence {
  @required
  @minLength(3)
  accessor city = "";

  @regex("^[0-9]{5}$")
  accessor zip = "";

  @range(0, 100)
  accessor years = 0;
}
