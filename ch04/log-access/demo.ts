import { logAccess } from "./decorators";

class Dog {
  name = "";

  @logAccess
  accessor age = 0;

  constructor(name: string) {
    this.name = name;
  }
}

const dog = new Dog("Comet");
dog.age = 5;
const nextAge = dog.age + 1;
console.log(`Next year, ${dog.name} will be ${nextAge}.`);
