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
          <button type="button">Google It</button>
        </mock:shadow-root>
      </google-button>
    `);
  });

  it('opens Google when clicked', async () => {
    const page = await newSpecPage({
      components: [GoogleButton],
      html: `<google-button></google-button>`,
    });
    const openSpy = jest.spyOn(page.win, 'open').mockImplementation(() => null);
    const googleButton = page.rootInstance as any;
    googleButton.handleClick();
    expect(openSpy).toHaveBeenCalledWith('https://google.com', '_blank');
    openSpy.mockRestore();
  });
});
