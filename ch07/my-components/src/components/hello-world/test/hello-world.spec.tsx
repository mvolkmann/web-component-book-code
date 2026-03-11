import { newSpecPage } from '@stencil/core/testing';
import { HelloWorld } from '../hello-world';

async function helloWorldTest(name = '') {
  const attribute = name ? ` name="${name}"` : '';
  const page = await newSpecPage({
    components: [HelloWorld],
    html: `<hello-world${attribute}></hello-world>`,
  });
  if (!name) name = 'World';
  expect(page.root).toEqualHtml(`
      <hello-world name="${name}">
        <mock:shadow-root>
          <p>Hello, ${name}!</p>
        </mock:shadow-root>
      </hello-world>
    `);
}

describe('hello-world default', () => {
  it('renders default', async () => {
    await helloWorldTest();
  });
  it('renders with name', async () => {
    await helloWorldTest('Earth');
  });
});
