import { Component, Element, h, Prop } from '@stencil/core';
import store from '../../app-store';

@Component({
  tag: 'labeled-input',
  styleUrl: 'labeled-input.css',
  shadow: true,
})
export class LabeledInput {
  @Element() el!: HTMLElement;
  @Prop() label: string = '';
  @Prop() name: string = '';

  #handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    store.name = input.value;
  };

  render() {
    return (
      <div>
        <label htmlFor={this.el.id}>{this.label}</label>
        <input id={this.el.id} name={this.name} type="text" value={store.name} onChange={this.#handleChange} />
      </div>
    );
  }
}
