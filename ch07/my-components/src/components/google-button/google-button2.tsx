import { Component, h } from '@stencil/core';

// This version differs from google-button in that it uses
// an anchor element instead of a button element.
// That removes the need for event handling, but the
// point of this book example is to demonstrate event handling.
@Component({
  tag: 'google-button2',
  styleUrl: 'google-button2.css',
  shadow: true,
})
export class GoogleButton2 {
  render() {
    return (
      <a href="https://google.com" target="_blank">
        Google It
      </a>
    );
  }
}
