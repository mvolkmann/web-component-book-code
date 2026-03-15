import { Component, h } from '@stencil/core';

@Component({
  tag: 'google-button',
  styleUrl: 'google-button.css',
  shadow: true,
})
export class GoogleButton {
  render() {
    return (
      <a href="https://google.com" target="_blank">
        Google It
      </a>
    );
  }
}
