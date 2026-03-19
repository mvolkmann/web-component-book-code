import { Component, h, State } from '@stencil/core';

/**
 * @summary Demonstrates updating CSS from reactive component state.
 * @element reactive-css
 * @cssprop --font-size - Controls the paragraph font size.
 */
@Component({
  tag: 'reactive-css',
  styleUrl: 'reactive-css.css',
  shadow: true,
})
export class ReactiveCss {
  /**
   * The current font size in pixels.
   * @type {number}
   */
  @State() size: number = 18;

  // This must be defined using an arrow function
  // to preserve the "this" context.
  /**
   * Updates the font size when the range input changes.
   * @param event The input event from the range control.
   */
  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.size = Number(input.value);
  };

  /**
   * Renders the slider and reactive text.
   * @returns The component markup.
   */
  render() {
    return (
      <div>
        <input
          type="range"
          min="8"
          max="64"
          value={this.size}
          onInput={this.handleInput}
        />
        <p style={{ '--font-size': this.size + 'px' }}>My size is reactive!</p>
      </div>
    );
  }
}
