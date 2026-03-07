import { logGetter, logSetter } from "./decorators";

class Game {
  #score = 1;

  @logGetter
  get score() {
    return this.#score;
  }

  @logSetter
  set score(value: number) {
    if (value < 0) {
      throw new Error("Score cannot be negative.");
    }
    this.#score = value;
  }
}

const game = new Game();
console.log("Initial score:", game.score);
game.score = 10;
console.log("New score:", game.score);
