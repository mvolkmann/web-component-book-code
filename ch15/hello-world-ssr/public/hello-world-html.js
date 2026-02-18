const html = String.raw;

export function content(name) {
  return html`
    <style>
      :host {
        color: blue;
      }
    </style>
    <p>Hello, ${name}!</p>
  `;
}

export function ssr(name = "World") {
  return html`
    <hello-world name="${name}">
      <template shadowrootmode="open">${content(name)}</template>
    </hello-world>
  `;
}
