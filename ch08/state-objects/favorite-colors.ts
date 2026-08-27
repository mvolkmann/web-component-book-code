import { html, Wrec } from "wrec";

export class FavoriteColors extends Wrec {
  static properties = {
    colors: {
      type: Array<string>,
      value: ["red", "green", "blue"],
    },
  };

  static html = html` <div class="row">this.colors.join(', ')</div> `;
}

FavoriteColors.define("favorite-colors");
