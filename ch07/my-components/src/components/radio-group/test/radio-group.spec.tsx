import { newSpecPage } from '@stencil/core/testing';
import { RadioGroup } from '../radio-group';

describe('radio-group', () => {
  it.skip('renders', async () => {
    const page = await newSpecPage({
      components: [RadioGroup],
      html: `
        <radio-group
          labels="Red,Green,Blue"
          legend="Color"
          name="color"
          value="blue"
          values="red,green,blue"
        ></radio-group>
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
      </radio-group>
    `;
    //TODO: Why does this fail? It should not compare whitespace!
    expect(page.root).toEqualHtml(expected.trim());
  });
});
