import { newSpecPage } from '@stencil/core/testing';
import { ReactiveCss } from '../reactive-css';

describe('reactive-css', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReactiveCss],
      html: `<reactive-css></reactive-css>`,
    });
    expect(page.root).toEqualHtml(`
      <reactive-css>
        <mock:shadow-root>
          <div>
            <input max="64" min="8" type="range" value="18">
            <p style="--font-size: 18px;">
              My size is reactive!
            </p>
          </div>
        </mock:shadow-root>
      </reactive-css>
    `);
  });
});
