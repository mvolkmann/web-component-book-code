import { Component, h, Prop } from '@stencil/core';
import store from '../../app-store';

@Component({
  tag: 'labeled-input',
  styleUrl: 'labeled-input.css',
  shadow: true,
})
export class LabeledInput {
  @Prop() id: string = '';
  @Prop() label: string = '';
  @Prop() name: string = '';

  componentWillLoad() {
    this.#require('id');
    this.#require('label');
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    store.name = input.value;
  };

  render() {
    return (
      <div>
        <label htmlFor={this.id}>{this.label}</label>
        <input
          id={this.id}
          name={this.name}
          type="text"
          value={store.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  #require(attrName: string) {
    if (!this[attrName]) {
      console.error(`required attribute "${attrName}" is missing or empty`);
    }
  }
}
