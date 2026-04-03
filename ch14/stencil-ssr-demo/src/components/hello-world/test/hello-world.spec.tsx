import { newSpecPage } from '@stencil/core/testing';
import { HelloWorld } from '../hello-world';

describe('hello-world', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HelloWorld],
      html: `<hello-world></hello-world>`,
    });
    expect(page.root).toEqualHtml(`
      <hello-world>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hello-world>
    `);
  });
});
