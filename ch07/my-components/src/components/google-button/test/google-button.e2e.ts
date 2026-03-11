import { newE2EPage } from '@stencil/core/testing';

describe('google-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<google-button></google-button>');
    const element = await page.find('google-button');
    expect(element).toHaveClass('hydrated');
  });
});
