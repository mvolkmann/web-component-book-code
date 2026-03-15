import { newSpecPage } from '@stencil/core/testing';
import { RadioGroup } from '../radio-group';

const normalize = (str: string) =>
  str
    .split('\n')
    .map(line => line.trim())
    .join('\n');

describe('radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
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
});
