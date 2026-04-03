# hello-lit

This displays a greeting message for a given name in a specified color.

## Properties

| Property | Attribute | Type     | Default | Description           |
|----------|-----------|----------|---------|-----------------------|
| `color`  | `color`   | `string` | "black" | initial text color    |
| `name`   | `name`    | `string` | "World" | initial name to greet |

## Slots

| Name     | Description                     |
|----------|---------------------------------|
|          | for content after the greeting  |
| `before` | for content before the greeting |

## CSS Shadow Parts

| Part       | Description      |
|------------|------------------|
| `greeting` | greeting message |

## CSS Custom Properties

| Property         | Default | Description                                  |
|------------------|---------|----------------------------------------------|
| `--border-color` | "gray"  | color of border that surrounds the component |


# hello-world

This displays a greeting message for a given name in a specified color.

## Properties

| Property | Attribute | Type     | Default | Description           |
|----------|-----------|----------|---------|-----------------------|
| `color`  | `color`   | `string` | "black" | current text color    |
| `name`   | `name`    | `string` | "World" | current name to greet |

## Slots

| Name     | Description                     |
|----------|---------------------------------|
|          | for content after the greeting  |
| `before` | for content before the greeting |

## CSS Custom Properties

| Property         | Default | Description                                  |
|------------------|---------|----------------------------------------------|
| `--border-color` | "gray"  | color of border that surrounds the component |


# my-counter

This is a counter web component.

## Properties

| Property | Attribute | Type     | Default | Description   |
|----------|-----------|----------|---------|---------------|
| `count`  | `count`   | `number` | 3       | current count |

## Methods

| Method      | Type       |
|-------------|------------|
| `decrement` | `(): void` |
| `increment` | `(): void` |


# radio-group

This displays a set of related radio buttons.

## Properties

| Property | Attribute | Type     | Default | Description                                    |
|----------|-----------|----------|---------|------------------------------------------------|
| `labels` | `labels`  | `string` | ""      | comma-separated list of radio button labels    |
| `name`   | `name`    | `string` | ""      | name associated with the selected radio button |
| `value`  | `value`   | `string` |         | value of the selected radio button             |
| `values` | `values`  | `string` | ""      | comma-separated list of radio button values    |

## Methods

| Method        | Type         |
|---------------|--------------|
| `makeButtons` | `(): string` |

## Events

| Event    | Type                              |
|----------|-----------------------------------|
| `change` | `CustomEvent<{ value: string; }>` |
