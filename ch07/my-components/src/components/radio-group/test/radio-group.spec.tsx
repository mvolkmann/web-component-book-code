import { newSpecPage } from '@stencil/core/testing';
import { RadioGroup } from '../radio-group';

function getPage() {
  return newSpecPage({
    components: [RadioGroup],
    html: `
      <radio-group
        labels="Red,Green,Blue"
        legend="Color"
        name="color"
        value="blue"
        values="red,green,blue"
      >
        <div slot="before">Choose a primary color.</div>
        <div slot="after">This will be the most used color.</div>
      </radio-group>
    `,
  });
}

const normalize = (str: string) =>
  str
    .split('\n')
    .map(line => line.trim())
    .join('\n');

describe('radio-group', () => {
  it('renders', async () => {
    const page = await getPage();
    const expected = `
      <radio-group labels="Red,Green,Blue" legend="Color" name="color" value="blue" values="red,green,blue">
        <template shadowrootmode="open">
          <fieldset>
            <legend>Color</legend>
            <slot name="before"></slot>
            <div>
              <div>
                <input id="red" name="color" type="radio" value="red">
                <label for="red">Red</label>
              </div>
              <div>
                <input id="green" name="color" type="radio" value="green">
                <label for="green">Green</label>
              </div>
              <div>
                <input checked="" id="blue" name="color" type="radio" value="blue">
                <label for="blue">Blue</label>
              </div>
            </div>
            <slot name="after"></slot>
          </fieldset>
        </template>
        <div slot="before">Choose a primary color.</div>
        <div slot="after">This will be the most used color.</div>
      </radio-group>
    `;
    // This fails due to whitespace differences, but the
    // documentation says it doesn't compare whitespace!
    //expect(page.root).toEqualHtml(expected.trim());
    expect(normalize(page.root.outerHTML)).toEqualHtml(normalize(expected));
  });

  it('updates value when a radio button changes', async () => {
    const page = await getPage();
    const radioGroup = page.root as HTMLRadioGroupElement;
    expect(radioGroup.value).toBe('blue');

    const { shadowRoot } = radioGroup;
    const greenButton = shadowRoot!.querySelector('#green') as HTMLInputElement;
    greenButton.checked = true;
    greenButton.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();
    expect(radioGroup.value).toBe('green');

    const updated = radioGroup.shadowRoot!.querySelector(
      '#green',
    ) as HTMLInputElement;
    expect(updated.checked).toBe(true);
  });

  it('does not change value when the selected value is the same', async () => {
    const page = await getPage();
    const radioGroup = page.root as HTMLRadioGroupElement;
    const instance = page.rootInstance;

    const emitSpy = jest.spyOn(instance.valueChanged, 'emit');

    const blueButton = radioGroup.shadowRoot!.querySelector(
      '#blue',
    ) as HTMLInputElement;
    blueButton.checked = true;
    blueButton.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(radioGroup.value).toBe('blue');
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
