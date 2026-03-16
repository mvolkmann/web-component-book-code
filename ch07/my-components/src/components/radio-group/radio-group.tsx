import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'radio-group',
  styleUrl: 'radio-group.css',
  shadow: true,
})
export class RadioGroup {
  @Prop() labels: string;
  @Prop() legend: string;
  @Prop() name: string;
  @Prop({ mutable: true }) value: string;
  @Prop() values: string;

  @Event() valueChanged: EventEmitter<string>;

  handleChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (value !== this.value) this.value = value;
  }

  @Watch('value')
  dispatch() {
    this.valueChanged.emit(this.value);
  }

  render() {
    const labelArray = this.labels.split(',');
    const valueArray = this.values.split(',').map(value => value.trim());
    return (
      <fieldset>
        <legend>{this.legend}</legend>
        <slot name="before"></slot>
        <div>
          {valueArray.map((v, index) => (
            <div>
              <input
                type="radio"
                id={v}
                name={this.name}
                value={v}
                checked={v === this.value}
                onChange={this.handleChange}
              />
              <label htmlFor={v}>{labelArray[index]}</label>
            </div>
          ))}
        </div>
        <slot name="after"></slot>
      </fieldset>
    );
  }
}
