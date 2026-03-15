import { newE2EPage } from '@stencil/core/testing';

describe('sortable-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sortable-table></sortable-table>');

    const element = await page.find('sortable-table');
    expect(element).toHaveClass('hydrated');
  });
});
