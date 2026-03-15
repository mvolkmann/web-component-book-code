import { newSpecPage } from '@stencil/core/testing';
import { SortableTable } from '../sortable-table';

describe('sortable-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SortableTable],
      html: `<sortable-table></sortable-table>`,
    });
    expect(page.root).toEqualHtml(`
      <sortable-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sortable-table>
    `);
  });
});
