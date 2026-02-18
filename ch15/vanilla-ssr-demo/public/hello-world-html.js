const html = String.raw;

export function content(name) {
  return html`
    <style>
      :host {
        color: red;
        font-family: fantasy;
      }
    </style>
    <p>Hello, ${name || "World"}!</p>
  `;
}

export function ssr(name) {
  return html`
    <hello-world name="${name}">
      <template shadowrootmode="open">${content(name)}</template>
    </hello-world>
  `;
}
