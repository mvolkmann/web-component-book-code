import { Component, h } from '@stencil/core';

/**
 * @summary Renders a button that opens Google in a new browser tab.
 * @element google-button
 */
@Component({
  tag: 'google-button',
  styleUrl: 'google-button.css',
  shadow: true,
})
export class GoogleButton {
  /**
   * Opens Google when the button is clicked.
   */
  private handleClick = () => {
    window.open('https://google.com', '_blank');
  };

  /**
   * Renders the button markup.
   * @returns The component markup.
   */
  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Google It
      </button>
    );
  }
}
