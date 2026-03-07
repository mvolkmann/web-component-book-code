import { nonNegative } from "./decorators";

export class Game {
  #score = 0;

  get score() {
    return this.#score;
  }

  @nonNegative
  set score(value) {
    /*
    if (value < 0) {
      throw new Error(`score cannot be negative`);
    }
    */
    this.#score = value;
  }
}
