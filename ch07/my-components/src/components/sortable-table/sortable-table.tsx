import {
  Component,
  Event,
  EventEmitter,
  Fragment,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';

type LooseObject = Record<string, unknown>;

interface SortDetail {
  property: string;
  descending: boolean;
}

/**
 * @summary Renders a table whose rows can be sorted by clicking the headings.
 * @element sortable-table
 * @attr descending - Whether the active sort direction is descending.
 * @attr headings - A comma-delimited list of column headings.
 * @attr properties - A comma-delimited list of object property names to display.
 * @prop data - The row data to render in the table.
 * @slot - Content rendered before the table.
 * @slot footnote - Content rendered after the table.
 * @fires tableSorted - Emitted after the table sort changes.
 */
@Component({
  tag: 'sortable-table',
  styleUrl: 'sortable-table.css',
  shadow: true,
})
export class SortableTable {
  /**
   * The row data to render in the table.
   * @type {LooseObject[]}
   */
  @Prop({ mutable: true }) data: LooseObject[] = [];
  /**
   * Whether the current sort direction is descending.
   * @type {boolean}
   */
  @Prop({ mutable: true }) descending = false;
  /**
   * A comma-delimited list of column headings.
   * @type {string}
   */
  @Prop() headings: string;
  /**
   * A comma-delimited list of object property names to display.
   * @type {string}
   */
  @Prop() properties: string;

  /**
   * The parsed list of property names.
   * @type {string[]}
   */
  @State() propertyArray: string[] = [];
  /**
   * The table data after sorting has been applied.
   * @type {LooseObject[]}
   */
  @State() sortedData: LooseObject[] = [];
  /**
   * The property currently used for sorting.
   * @type {string}
   */
  @State() sortProperty = '';

  /**
   * Emitted after the table sort changes.
   * @type {EventEmitter<SortDetail>}
   */
  @Event({ bubbles: true, composed: true })
  tableSorted: EventEmitter<SortDetail>;

  /**
   * Parses the property names and initializes the sorted rows.
   */
  componentWillLoad() {
    this.propertyArray = this.properties.split(',');
    this.resort();
  }

  // Not called on initial render, only on subsequent changes.
  /**
   * Recomputes the sorted rows when the source data or sort changes.
   */
  @Watch('data')
  @Watch('sortProperty')
  @Watch('descending')
  resort() {
    this.sortedData = this.#sort();
  }

  /**
   * Builds the table heading cells.
   * @returns The table heading cells.
   */
  makeHeadings() {
    return this.headings
      .split(',')
      .map((heading, i) => this.makeTh(heading, this.propertyArray[i]));
  }

  /**
   * Builds the table body rows.
   * @returns The table row elements.
   */
  makeRows() {
    return this.sortedData.map(obj => this.makeTr(obj));
  }

  /**
   * Builds a table data cell.
   * @param value The value to render in the cell.
   * @returns The table data cell.
   */
  makeTd(value: unknown) {
    return <td>{value}</td>;
  }

  /**
   * Builds a sortable table heading cell.
   * @param heading The heading text to display.
   * @param property The property associated with the heading.
   * @returns The table heading cell.
   */
  makeTh(heading: string, property: string) {
    return (
      <th
        aria-sort={
          property === this.sortProperty
            ? this.descending
              ? 'descending'
              : 'ascending'
            : undefined
        }
        data-property={property}
        title={`sort by ${heading}`}
      >
        <button type="button" onClick={() => this.updateSort(property)}>
          <span>{heading}</span>
          <span class="sort-indicator">{this.sortIndicator(property)}</span>
        </button>
      </th>
    );
  }

  /**
   * Builds a table row for a single data object.
   * @param obj The row data object.
   * @returns The table row element.
   */
  makeTr(obj: LooseObject) {
    return (
      <tr>{this.propertyArray.map(propName => this.makeTd(obj[propName]))}</tr>
    );
  }

  /**
   * Renders the table and its slots.
   * @returns The component markup.
   */
  render() {
    return (
      <Fragment>
        <slot></slot>
        <table>
          <thead>
            <tr>{this.makeHeadings()}</tr>
          </thead>
          <tbody>{this.makeRows()}</tbody>
        </table>
        <slot name="footnote"></slot>
      </Fragment>
    );
  }

  /**
   * Returns the table data in its current sorted order.
   * @returns The sorted row data.
   */
  #sort() {
    const sortProperty = this.sortProperty;
    if (!sortProperty) return this.data;

    return this.data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare =
        typeof aValue === 'string'
          ? aValue.localeCompare(bValue as string)
          : typeof aValue === 'number'
            ? aValue - (bValue as number)
            : 0;
      return this.descending ? -compare : compare;
    });
  }

  /**
   * Returns the sort indicator for a given property.
   * @param property The property to inspect.
   * @returns The indicator character, or an empty string.
   */
  sortIndicator(property: string) {
    if (property !== this.sortProperty) return '';
    return this.descending ? '▼' : '▲';
  }

  /**
   * Updates the active sort property and direction.
   * @param property The property to sort by.
   */
  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.sortProperty = property;
    this.descending = same ? !this.descending : false;
    this.tableSorted.emit({ property, descending: this.descending });
  }
}
