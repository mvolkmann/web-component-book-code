import { newE2EPage } from '@stencil/core/testing';

describe('sortable-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <sortable-table
        headings="Make,Model,Year"
        properties="make,model,year"
        title="My Cars table"
      >
        <h2>My Cars</h2>
        <p slot="footnote">Some of these cars are no longer owned.</p>
      </sortable-table>
    `);

    const element = await page.find('sortable-table');
    expect(element).toHaveClass('hydrated');
  });
});
