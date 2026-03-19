import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'reactive-css',
  styleUrl: 'reactive-css.css',
  shadow: true,
})
export class ReactiveCss {
  @State() size: number = 18;

  // This must be defined using an arrow function
  // to preserve the "this" context.
  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.size = Number(input.value);
  };

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
