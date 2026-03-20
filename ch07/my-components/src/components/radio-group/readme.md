# radio-group



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                     | Type     | Default     |
| -------- | --------- | ----------------------------------------------- | -------- | ----------- |
| `labels` | `labels`  | A comma-delimited list of labels to display.    | `string` | `undefined` |
| `legend` | `legend`  | The legend displayed above the radio options.   | `string` | `undefined` |
| `name`   | `name`    | The shared name attribute for each radio input. | `string` | `undefined` |
| `value`  | `value`   | The currently selected value.                   | `string` | `undefined` |
| `values` | `values`  | A comma-delimited list of option values.        | `string` | `undefined` |


## Events

| Event          | Description                                  | Type                  |
| -------------- | -------------------------------------------- | --------------------- |
| `valueChanged` | Emitted whenever the selected value changes. | `CustomEvent<string>` |


## Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `"after"`  | Content rendered after the radio options.  |
| `"before"` | Content rendered before the radio options. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
