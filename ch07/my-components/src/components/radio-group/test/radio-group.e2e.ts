import { newE2EPage } from '@stencil/core/testing';

describe('radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <radio-group
        labels="Red,Green,Blue"
        legend="Color"
        name="color"
        value="blue"
        values="red,green,blue"
      ></radio-group>
    `);

    const element = await page.find('radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
