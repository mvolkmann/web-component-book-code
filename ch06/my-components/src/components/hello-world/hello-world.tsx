import { Component, Prop, h } from '@stencil/core';

/**
 * @summary Displays a greeting for the provided name.
 * @element hello-world
 * @attr name - The name to include in the greeting.
 */
@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css',
  shadow: true,
})
export class HelloWorld {
  /**
   * The name to include in the greeting.
   * @type {string}
   */
  @Prop({ reflect: true }) name: string = 'World';

  /**
   * Renders the component markup.
   * @returns The greeting paragraph.
   */
  render() {
    return <p>Hello, {this.name}!</p>;
  }
}
