import { newSpecPage } from '@stencil/core/testing';
import { SortableTable } from '../sortable-table';

describe('sortable-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SortableTable],
      html: `
        <sortable-table
          headings="Make,Model,Year"
          properties="make,model,year"
          title="My Cars table"
        >
          <h2>My Cars</h2>
          <p slot="footnote">Some of these cars are no longer owned.</p>
        </sortable-table>
      `,
    });
    expect(page.root).toEqualHtml(`
    <sortable-table headings="Make,Model,Year" properties="make,model,year" title="My Cars table">
      <mock:shadow-root>
        <slot></slot>
        <table>
          <thead>
            <tr>
              <th data-property="make" role="button" title="sort by Make">
                <span>Make</span>
                <span class="sort-indicator"></span>
              </th>
              <th data-property="model" role="button" title="sort by Model">
                <span>Model</span>
                <span class="sort-indicator"></span>
              </th>
              <th data-property="year" role="button" title="sort by Year">
                <span>Year</span>
                <span class="sort-indicator"></span>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <slot name="footnote"></slot>
      </mock:shadow-root>
      <h2>My Cars</h2>
      <p slot="footnote">Some of these cars are no longer owned.</p>
    </sortable-table>
  `);
  });
});
