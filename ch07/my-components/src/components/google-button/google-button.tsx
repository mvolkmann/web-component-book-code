import { Component, h } from '@stencil/core';

@Component({
  tag: 'google-button',
  styleUrl: 'google-button.css',
  shadow: true,
})
export class GoogleButton {
  private handleClick() {
    window.open('https://google.com', '_blank');
  }

  render() {
    return <button onClick={this.handleClick}>Google It</button>;
  }
}
