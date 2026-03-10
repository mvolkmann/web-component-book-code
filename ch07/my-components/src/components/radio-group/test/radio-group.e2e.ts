import { newE2EPage } from '@stencil/core/testing';

describe('radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radio-group></radio-group>');

    const element = await page.find('radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
