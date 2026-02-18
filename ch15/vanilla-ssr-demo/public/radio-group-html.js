const html = String.raw;

function makeButtons(props) {
  const { labels, name, value, values } = props;
  const labelArray = labels.split(",");
  const valueArray = values.split(",").map((value) => value.trim());
  return valueArray
    .map(
      (thisValue, index) =>
        html`<div>
          <input
            type="radio"
            id="${thisValue}"
            name="${name}"
            value="${thisValue}"
            ${thisValue === value ? "checked" : ""}
          />
          <label for="${thisValue}">${labelArray[index]}</label>
        </div>`
    )
    .join("");
}

export function content(props) {
  return html`
    <style>
      div {
        display: flex;
        gap: 1rem;

        & > div {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      }

      input {
        margin: 0;
      }
    </style>
    <div>${makeButtons(props)}</div>
  `;
}

export function ssr(props) {
  return html`
    <radio-group
      labels="${props.labels}"
      name="${props.name}"
      values="${props.values}"
      value="${props.value}"
    >
      <template shadowrootmode="open">${content(props)}</template>
    </radio-group>
  `;
}
