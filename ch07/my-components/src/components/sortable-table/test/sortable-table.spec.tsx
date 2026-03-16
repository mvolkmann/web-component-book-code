import { newSpecPage } from '@stencil/core/testing';
import { SortableTable } from '../sortable-table';

async function getPage() {
  return newSpecPage({
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
}

describe('sortable-table', () => {
  it('renders', async () => {
    const page = await getPage();
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

  it('renders sorted rows when data changes', async () => {
    const page = await getPage();
    const element = page.root as HTMLSortableTableElement;

    element.data = [
      { make: 'Ford', model: 'Mustang', year: 1967 },
      { make: 'Audi', model: 'A4', year: 2008 },
    ];
    await page.waitForChanges();

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
            <tbody>
              <tr>
                <td>Ford</td>
                <td>Mustang</td>
                <td>1967</td>
              </tr>
              <tr>
                <td>Audi</td>
                <td>A4</td>
                <td>2008</td>
              </tr>
            </tbody>
          </table>
          <slot name="footnote"></slot>
        </mock:shadow-root>
        <h2>My Cars</h2>
        <p slot="footnote">Some of these cars are no longer owned.</p>
      </sortable-table>
    `);
  });

  it('sorts string, number, and unsupported values', async () => {
    const page = await getPage();
    const instance = page.rootInstance;
    const data = [
      { make: 'Ford', model: 'Mustang', year: 1967 },
      { make: 'Audi', model: 'A4', year: 2008 },
      { make: 'BMW', model: 'M3', year: 1999 },
    ];

    instance.data = data;

    instance.sortProperty = '';
    expect(instance.sort()).toEqual(data);

    instance.sortProperty = 'make';
    instance.descending = false;
    expect(instance.sort().map(row => row.make)).toEqual([
      'Audi',
      'BMW',
      'Ford',
    ]);

    instance.descending = true;
    expect(instance.sort().map(row => row.make)).toEqual([
      'Ford',
      'BMW',
      'Audi',
    ]);

    instance.sortProperty = 'year';
    instance.descending = false;
    expect(instance.sort().map(row => row.year)).toEqual([1967, 1999, 2008]);
  });

  it('updates sort state, emits events, and reports indicators', async () => {
    const page = await getPage();
    const instance = page.rootInstance;
    const emitSpy = jest.spyOn(instance.tableSorted, 'emit');

    expect(instance.sortIndicator('make')).toBe('');

    instance.updateSort('make');
    expect(instance.sortProperty).toBe('make');
    expect(instance.descending).toBe(false);
    expect(instance.sortIndicator('make')).toBe('▲');
    expect(emitSpy).toHaveBeenLastCalledWith({
      property: 'make',
      descending: false,
    });

    instance.updateSort('make');
    expect(instance.descending).toBe(true);
    expect(instance.sortIndicator('make')).toBe('▼');
    expect(emitSpy).toHaveBeenLastCalledWith({
      property: 'make',
      descending: true,
    });

    expect(instance.sortIndicator('model')).toBe('');
  });


  it('sorts when a heading is clicked', async () => {
    const page = await getPage();
    const element = page.root as HTMLSortableTableElement;
    const emitSpy = jest.spyOn(page.rootInstance.tableSorted, 'emit');

    element.data = [
      { make: 'Ford', model: 'Mustang', year: 1967 },
      { make: 'Audi', model: 'A4', year: 2008 },
    ];
    await page.waitForChanges();

    const makeHeading = element.shadowRoot?.querySelector('th[data-property="make"]') as HTMLTableCellElement;
    makeHeading.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(page.rootInstance.sortProperty).toBe('make');
    expect(page.rootInstance.descending).toBe(false);
    expect(emitSpy).toHaveBeenCalledWith({ property: 'make', descending: false });
    expect(element.shadowRoot?.querySelector('.sort-indicator')?.textContent).toBe('▲');
  });
});
