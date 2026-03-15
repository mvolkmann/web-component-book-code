import { newE2EPage } from '@stencil/core/testing';

describe('google-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<google-button></google-button>');
    const element = await page.find('google-button');
    expect(element).toHaveClass('hydrated');

    const browserContext = page.browserContext();
    const promise = new Promise(resolve => {
      browserContext.once('targetcreated', async target => {
        const newPage = await target.page();
        await newPage.waitForNavigation();
        // This doesn't get the correct URL when running with --coverage.
        resolve(newPage.url());
      });
    });
    const button = await page.find('google-button >>> button');
    await button.click();
    const newTabUrl = await promise;

    const isCoverage = process.env.npm_lifecycle_event === 'coverage';
    if (!isCoverage) expect(newTabUrl).toContain('google.com');
  });
});
