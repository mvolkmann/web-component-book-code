import { newE2EPage } from '@stencil/core/testing';

async function helloWorldTest(name = '') {
  const attribute = name ? ` name="${name}"` : '';
  const page = await newE2EPage();
  await page.setContent(`<hello-world${attribute}></hello-world$>`);
  const element = await page.find('hello-world');
  expect(element).toHaveClass('hydrated');

  const text = await page.evaluate(() => {
    const element = document.querySelector('hello-world');
    return element.shadowRoot.querySelector('p').textContent;
  });
  expect(text).toBe(`Hello, ${name || 'World'}!`);
}

describe('hello-world', () => {
  it('renders default', async () => {
    await helloWorldTest();
  });
  it('renders with name', async () => {
    await helloWorldTest('Earth');
  });
});
