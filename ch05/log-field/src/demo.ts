import { logField } from "./decorators.js";

export class Secret {
  @logField
  code = "random";
}

const secret = new Secret();
console.log(`Secret code is ${secret.code}.`);
