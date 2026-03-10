import { newSpecPage } from '@stencil/core/testing';
import { RadioGroup } from '../radio-group';

describe('radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadioGroup],
      html: `<radio-group></radio-group>`,
    });
    expect(page.root).toEqualHtml(`
      <radio-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radio-group>
    `);
  });
});
