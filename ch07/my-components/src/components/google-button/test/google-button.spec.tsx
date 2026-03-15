import { newSpecPage } from '@stencil/core/testing';
import { GoogleButton } from '../google-button';

describe('google-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoogleButton],
      html: `<google-button></google-button>`,
    });
    expect(page.root).toEqualHtml(`
      <google-button>
        <mock:shadow-root>
          <a href="https://google.com" target="_blank">Google It</a>
        </mock:shadow-root>
      </google-button>
    `);
  });
});
