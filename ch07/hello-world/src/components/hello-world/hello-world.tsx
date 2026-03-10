import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css',
  shadow: true,
})
export class HelloWorld {
  @Prop() name: string = 'World';

  render() {
    return <p>Hello, {this.name}!</p>;
  }
}
