import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

type LooseObject = Record<string, unknown>;

interface SortDetail {
  property: string;
  descending: boolean;
}

@Component({
  tag: 'sortable-table',
  styleUrl: 'sortable-table.css',
  shadow: true,
})
export class SortableTable {
  @Prop({ mutable: true }) data: LooseObject[] = [];
  @Prop({ mutable: true }) descending = false;
  @Prop() headings: string;
  @Prop() properties: string;

  @State() propertyArray: string[] = [];
  @State() sortedData: LooseObject[] = [];
  @State() sortProperty = '';

  @Event({ bubbles: true, composed: true })
  tableSorted: EventEmitter<SortDetail>;

  componentWillLoad() {
    this.propertyArray = this.properties.split(',');
    this.resort();
  }

  // Not called on initial render, only on subsequent changes.
  @Watch('data')
  @Watch('sortProperty')
  @Watch('descending')
  resort() {
    this.sortedData = this.sort();
  }

  makeHeadings() {
    return this.headings.split(',').map((heading, i) => this.makeTh(heading, this.propertyArray[i]));
  }

  makeRows() {
    return this.sortedData.map(obj => this.makeTr(obj));
  }

  makeTd(value: unknown) {
    return <td>{value}</td>;
  }

  makeTh(heading: string, property: string) {
    return (
      <th data-property="{property}" role="button" title="sort by {heading}" onClick={() => this.updateSort(property)}>
        <span>{heading}</span>
        <span class="sort-indicator">{this.sortIndicator(property)}</span>
      </th>
    );
  }

  makeTr(obj: LooseObject) {
    return <tr>{this.propertyArray.map(propName => this.makeTd(obj[propName]))}</tr>;
  }

  render() {
    return (
      <>
        <slot></slot>
        <table>
          <thead>
            <tr>{this.makeHeadings()}</tr>
          </thead>
          <tbody>{this.makeRows()}</tbody>
        </table>
        <slot name="footnote"></slot>
      </>
    );
  }

  sort() {
    const sortProperty = this.sortProperty;
    if (!sortProperty) return this.data;

    return this.data.toSorted((a: LooseObject, b: LooseObject) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];
      const compare = typeof aValue === 'string' ? aValue.localeCompare(bValue as string) : typeof aValue === 'number' ? aValue - (bValue as number) : 0;
      return this.descending ? -compare : compare;
    });
  }

  sortIndicator(property: string) {
    if (property !== this.sortProperty) return '';
    return this.descending ? '▼' : '▲';
  }

  updateSort(property: string) {
    const same = property === this.sortProperty;
    this.sortProperty = property;
    this.descending = same ? !this.descending : false;
    this.tableSorted.emit({ property, descending: this.descending });
  }
}
