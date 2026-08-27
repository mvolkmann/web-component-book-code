import { rangeValidation } from "./decorators";

class Dog {
  name = "";

  @rangeValidation(0, 20)
  accessor age = 0;

  constructor(name: string) {
    this.name = name;
  }
}

const comet = new Dog("Comet");
try {
  comet.age = 5;
  comet.age = 50;
} catch (e) {
  console.error((e as Error).message);
}
