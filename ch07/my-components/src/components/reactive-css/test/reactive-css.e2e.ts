import { newE2EPage } from '@stencil/core/testing';

describe('reactive-css', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reactive-css></reactive-css>');

    const element = await page.find('reactive-css');
    expect(element).toHaveClass('hydrated');
  });
});
