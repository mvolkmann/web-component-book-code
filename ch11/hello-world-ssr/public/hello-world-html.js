const html = String.raw;

export function content(name = "World") {
  return html`
    <style>
      :host {
        color: blue;
      }
    </style>
    <p>Hello, ${name}!</p>
  `;
}

export function ssr(name) {
  const attr = name ? `name="${name}"` : "";
  return html`
    <hello-world ${attr}">
      <template shadowrootmode="open">${content(name)}</template>
    </hello-world>
  `;
}
