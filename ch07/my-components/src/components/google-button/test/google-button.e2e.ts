import { newE2EPage } from '@stencil/core/testing';

describe('google-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<google-button></google-button>');
    const element = await page.find('google-button');
    expect(element).toHaveClass('hydrated');

    const browserContext = page.browserContext();
    const promise = new Promise(resolve => browserContext.once('targetcreated', target => resolve(target.url())));
    const button = await page.find('google-button >>> a');
    await button.click();
    const newTabUrl = await promise;
    expect(newTabUrl).toContain('google.com');
  });
});
