# sortable-table



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                 | Type            | Default     |
| ------------ | ------------ | ----------------------------------------------------------- | --------------- | ----------- |
| `data`       | --           | The row data to render in the table.                        | `LooseObject[]` | `[]`        |
| `descending` | `descending` | Whether the current sort direction is descending.           | `boolean`       | `false`     |
| `headings`   | `headings`   | A comma-delimited list of column headings.                  | `string`        | `undefined` |
| `properties` | `properties` | A comma-delimited list of object property names to display. | `string`        | `undefined` |


## Events

| Event         | Description                           | Type                      |
| ------------- | ------------------------------------- | ------------------------- |
| `tableSorted` | Emitted after the table sort changes. | `CustomEvent<SortDetail>` |


## Slots

| Slot         | Description                        |
| ------------ | ---------------------------------- |
|              | Content rendered before the table. |
| `"footnote"` | Content rendered after the table.  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
