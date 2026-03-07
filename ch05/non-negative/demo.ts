import { Game } from "./game";

const game = new Game();
try {
  game.score = 7;
  game.score = -1;
} catch (e) {
  console.error((e as Error).message);
}
