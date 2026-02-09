# `hello-lit.ts`:

## class: `HelloLit`, `hello-lit`

### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

### Static Fields

| Name     | Privacy | Type | Default                                                                                                                                                  | Description | Inherited From |
| -------- | ------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------- |
| `styles` |         |      | `` css` :host { display: inline-block; border: 3px solid var(--border-color, gray); margin: 0.5rem 0; padding: 0.5rem; } p { color: var(--color); } ` `` |             |                |

### Fields

| Name    | Privacy | Type     | Default | Description           | Inherited From |
| ------- | ------- | -------- | ------- | --------------------- | -------------- |
| `color` |         | `string` | `black` | current text color    |                |
| `name`  |         | `string` | `World` | current name to greet |                |

### Methods

| Name     | Privacy | Description | Parameters | Return | Inherited From |
| -------- | ------- | ----------- | ---------- | ------ | -------------- |
| `render` |         |             |            |        |                |

### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `color` |       |                |
| `name`  |       |                |

### CSS Properties

| Name             | Default | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| `--border-color` | `gray`  | color of border that surrounds the component |

### CSS Parts

| Name       | Description      |
| ---------- | ---------------- |
| `greeting` | greeting message |

### Slots

| Name     | Description                     |
| -------- | ------------------------------- |
|          | for content after the greeting  |
| `before` | for content before the greeting |

<hr/>

## Exports

| Kind | Name       | Declaration | Module       | Package |
| ---- | ---------- | ----------- | ------------ | ------- |
| `js` | `HelloLit` | HelloLit    | hello-lit.ts |         |

# `hello-world.js`:

## class: `HelloWorld`, `hello-world`

### Superclass

| Name          | Module | Package |
| ------------- | ------ | ------- |
| `HTMLElement` |        |         |

### Fields

| Name    | Privacy | Type     | Default | Description           | Inherited From |
| ------- | ------- | -------- | ------- | --------------------- | -------------- |
| `color` |         | `string` | `black` | current text color    |                |
| `name`  |         | `string` | `World` | current name to greet |                |

### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `color` |       |                |
| `name`  |       |                |

### CSS Properties

| Name             | Default | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| `--border-color` | `gray`  | color of border that surrounds the component |

### CSS Parts

| Name       | Description      |
| ---------- | ---------------- |
| `greeting` | greeting message |

### Slots

| Name     | Description                     |
| -------- | ------------------------------- |
|          | for content after the greeting  |
| `before` | for content before the greeting |

<hr/>

## Exports

| Kind                        | Name          | Declaration | Module         | Package |
| --------------------------- | ------------- | ----------- | -------------- | ------- |
| `custom-element-definition` | `hello-world` | HelloWorld  | hello-world.js |         |

# `hello-wrec.js`:

## class: `HelloWrec`, `hello-wrec`

### Superclass

| Name   | Module | Package |
| ------ | ------ | ------- |
| `Wrec` |        | wrec    |

### Fields

| Name    | Privacy | Type     | Default | Description   | Inherited From |
| ------- | ------- | -------- | ------- | ------------- | -------------- |
| `color` | public  | `string` | `black` | text color    |                |
| `name`  | public  | `string` | `World` | name to greet |                |

### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `color` | color |                |
| `name`  | name  |                |

### CSS Properties

| Name             | Default | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| `--border-color` | `gray`  | color of border that surrounds the component |

### CSS Parts

| Name       | Description      |
| ---------- | ---------------- |
| `greeting` | greeting message |

### Slots

| Name     | Description                     |
| -------- | ------------------------------- |
|          | for content after the greeting  |
| `before` | for content before the greeting |

<hr/>

## Exports

| Kind                        | Name         | Declaration | Module        | Package |
| --------------------------- | ------------ | ----------- | ------------- | ------- |
| `custom-element-definition` | `hello-wrec` | HelloWrec   | hello-wrec.js |         |

# `my-counter.js`:

## class: `MyCounter`, `my-counter`

### Superclass

| Name          | Module | Package |
| ------------- | ------ | ------- |
| `HTMLElement` |        |         |

### Fields

| Name    | Privacy | Type     | Default | Description   | Inherited From |
| ------- | ------- | -------- | ------- | ------------- | -------------- |
| `count` |         | `number` | `3`     | current count |                |

### Methods

| Name        | Privacy | Description | Parameters | Return | Inherited From |
| ----------- | ------- | ----------- | ---------- | ------ | -------------- |
| `decrement` |         |             |            |        |                |
| `increment` |         |             |            |        |                |

### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `count` |       |                |

<hr/>

## Exports

| Kind                        | Name         | Declaration | Module        | Package |
| --------------------------- | ------------ | ----------- | ------------- | ------- |
| `custom-element-definition` | `my-counter` | MyCounter   | my-counter.js |         |

# `radio-group.js`:

## class: `RadioGroup`, `radio-group`

### Superclass

| Name          | Module | Package |
| ------------- | ------ | ------- |
| `HTMLElement` |        |         |

### Fields

| Name     | Privacy | Type     | Default | Description                                    | Inherited From |
| -------- | ------- | -------- | ------- | ---------------------------------------------- | -------------- |
| `labels` |         | `string` | `""`    | comma-separated list of radio button labels    |                |
| `name`   |         | `string` | `""`    | name associated with the selected radio button |                |
| `values` |         | `string` | `""`    | comma-separated list of radio button values    |                |
| `value`  |         | `string` |         | value of the selected radio button             |                |

### Methods

| Name          | Privacy | Description | Parameters | Return | Inherited From |
| ------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `makeButtons` |         |             |            |        |                |
| `render`      |         |             |            |        |                |

### Attributes

| Name     | Field | Inherited From |
| -------- | ----- | -------------- |
| `value`  |       |                |
| `labels` |       |                |
| `name`   |       |                |
| `values` |       |                |

<hr/>

## Exports

| Kind                        | Name          | Declaration | Module         | Package |
| --------------------------- | ------------- | ----------- | -------------- | ------- |
| `js`                        | `RadioGroup`  | RadioGroup  | radio-group.js |         |
| `custom-element-definition` | `radio-group` | RadioGroup  | radio-group.js |         |
