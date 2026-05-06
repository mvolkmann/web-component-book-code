import { Component, h } from '@stencil/core';
import state from '../../app-store';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css',
  shadow: true,
})
export class HelloWorld {
  render() {
    return <p>Hello, {state.name}!</p>;
  }
}
