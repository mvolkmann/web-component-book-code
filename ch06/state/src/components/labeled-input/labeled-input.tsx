import { Component, Element, h, Prop } from '@stencil/core';
import state from '../../app-store';

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
    state.name = input.value;
  };

  render() {
    return (
      <div>
        <label htmlFor={this.el.id}>{this.label}</label>
        <input id={this.el.id} name={this.name} type="text" value={state.name} onChange={this.#handleChange} />
      </div>
    );
  }
}
