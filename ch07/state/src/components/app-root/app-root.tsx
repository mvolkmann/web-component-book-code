import { Component, h } from '@stencil/core';
import store from '../../app-store';

@Component({
  tag: 'app-root',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <labeled-input id="name" label="Name"></labeled-input>
        <hello-world></hello-world>
        <button onClick={this.#reset}>Reset</button>
      </div>
    );
  }

  #reset = () => {
    store.name = 'World';
  };
}
