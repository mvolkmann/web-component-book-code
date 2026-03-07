import { countInstances } from "./decorators";

@countInstances
export class Dog {
  name = "";
  constructor(name: string) {
    this.name = name;
  }
}

const dogs = [
  new Dog("Ramsay"),
  new Dog("Oscar"),
  new Dog("Comet"),
  new Dog("Greta"),
];
console.log((Dog as any).instanceCount);
