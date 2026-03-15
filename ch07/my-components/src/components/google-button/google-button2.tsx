import { Component, h } from '@stencil/core';

@Component({
  tag: 'google-button2',
  styleUrl: 'google-button2.css',
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
