import { newE2EPage } from '@stencil/core/testing';

describe('google-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<google-button></google-button>');
    const element = await page.find('google-button');
    expect(element).toHaveClass('hydrated');
  });

  it('can click', async () => {
    const page = await newE2EPage();
    await page.setContent('<google-button></google-button>');

    const browserContext = page.browserContext();
    const promise = new Promise(resolve => {
      browserContext.once('targetcreated', async target => {
        const newPage = await target.page();
        await newPage.waitForNavigation();
        resolve(newPage.url());
      });
    });
    const button = await page.find('google-button >>> button');
    await button.click();
    const newTabUrl = await promise;

    // We don't get the correct URL when running with --coverage.
    const isCoverage = process.env.npm_lifecycle_event === 'coverage';
    //TODO: This test seems brittle! Sometimes the URL is http://localhost:3351.
    if (!isCoverage) expect(newTabUrl).toContain('google.com');
  });
});
