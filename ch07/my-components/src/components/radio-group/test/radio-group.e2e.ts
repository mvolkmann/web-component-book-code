import { newE2EPage } from '@stencil/core/testing';

describe('radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <radio-group
        labels="Red,Green,Blue"
        legend="Color"
        name="color"
        value="blue"
        values="red,green,blue"
      >
        <div slot="before">Choose a primary color.</div>
        <div slot="after">This will be the most used color.</div>
      </radio-group>
    `);
    const element = await page.find('radio-group');
    expect(element).toHaveClass('hydrated');

    const data = await page.evaluate(async () => {
      const element = document.querySelector('radio-group');
      const { shadowRoot } = element;
      const legend = shadowRoot.querySelector('fieldset > legend');
      const inputElements = shadowRoot.querySelectorAll('input[type="radio"]');
      const values = [...(inputElements as any)].map(input => input.value);
      const labelElements = shadowRoot.querySelectorAll('label');
      const labels = [...(labelElements as any)].map(label => label.textContent);
      const slotBefore = shadowRoot.querySelector('slot[name="before"]') as HTMLSlotElement;
      const slotAfter = shadowRoot.querySelector('slot[name="after"]') as HTMLSlotElement;
      const slotText = (slot: HTMLSlotElement) =>
        slot
          .assignedNodes()
          .map(node => node.textContent)
          .join('')
          .trim();
      return {
        after: slotText(slotAfter),
        before: slotText(slotBefore),
        labels,
        legend: legend.textContent,
        values,
      };
    });

    const { after, before, labels, legend, values } = data;
    expect(legend).toBe('Color');
    expect(after).toBe('This will be the most used color.');
    expect(before).toBe('Choose a primary color.');
    expect(labels).toEqual(['Red', 'Green', 'Blue']);
    expect(values).toEqual(['red', 'green', 'blue']);
  });
});
