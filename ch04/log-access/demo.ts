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
console.log(dog.age);
