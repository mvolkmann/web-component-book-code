import {
  AttachInternals,
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch,
} from '@stencil/core';

/**
 * @summary Renders a radio group from comma-delimited labels and values.
 * @element radio-group
 * @attr labels - A comma-delimited list of labels to display.
 * @attr legend - The legend displayed above the radio options.
 * @attr name - The shared name attribute for each radio input.
 * @attr value - The currently selected value.
 * @attr values - A comma-delimited list of option values.
 * @slot before - Content rendered before the radio options.
 * @slot after - Content rendered after the radio options.
 * @fires valueChanged - Emitted whenever the selected value changes.
 * @cssprop --border-color - Sets the fieldset border color.
 * @cssprop --legend-color - Sets the legend text color.
 * @cssprop --direction - Controls the radio option layout direction.
 * @cssprop --gap - Sets the spacing between radio options.
 */
@Component({
  tag: 'radio-group',
  styleUrl: 'radio-group.css',
  shadow: true,
  formAssociated: true,
})
export class RadioGroup {
  @AttachInternals() internals: ElementInternals;
  #formData = new FormData();

  /**
   * A comma-delimited list of labels to display.
   * @type {string}
   */
  @Prop() labels: string;
  /**
   * The legend displayed above the radio options.
   * @type {string}
   */
  @Prop() legend: string;
  /**
   * The shared name attribute for each radio input.
   * @type {string}
   */
  @Prop() name: string;
  /**
   * The currently selected value.
   * @type {string}
   */
  @Prop({ mutable: true }) value: string;
  /**
   * A comma-delimited list of option values.
   * @type {string}
   */
  @Prop() values: string;

  /**
   * Emitted whenever the selected value changes.
   * @type {EventEmitter<string>}
   */
  @Event() valueChanged: EventEmitter<string>;

  componentWillLoad() {
    //this.internals.setFormValue(this.value);
    this.#formData.set(this.name, this.value);
    this.#formData.set('timestamp', Date.now().toString());
    this.internals.setFormValue(this.#formData);
  }

  /**
   * Updates the selected value from the changed radio input.
   * @param event The change event from a radio input.
   */
  private handleChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    if (value !== this.value) {
      this.value = value;
      //this.internals.setFormValue(this.value);
      this.#formData.set(this.name, this.value);
      this.#formData.set('timestamp', Date.now().toString());
      this.internals.setFormValue(this.#formData);
    }
  };

  /**
   * Emits the updated value after it changes.
   */
  @Watch('value')
  dispatch() {
    this.valueChanged.emit(this.value);
  }

  /**
   * Renders the fieldset and radio options.
   * @returns The component markup.
   */
  render() {
    const labelArray = this.labels.split(',').map(value => value.trim());
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
