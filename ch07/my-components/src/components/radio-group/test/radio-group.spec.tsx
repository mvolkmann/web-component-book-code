import { h, render, vi } from "@stencil/vitest";
import "../radio-group";

function getPage() {
  return render(
    <radio-group
      labels="Red,Green,Blue"
      legend="Color"
      name="color"
      value="blue"
      values="red,green,blue"
    >
      <div slot="before">Choose a primary color.</div>
      <div slot="after">This will be the most used color.</div>
    </radio-group>,
  );
}

describe("radio-group", () => {
  it("renders", async () => {
    const { root } = await getPage();
    const { shadowRoot } = root;
    const inputs = [...shadowRoot!.querySelectorAll("input")];
    const labels = [...shadowRoot!.querySelectorAll("label")];
    const slotBefore = shadowRoot!.querySelector('slot[name="before"]') as HTMLSlotElement;
    const slotAfter = shadowRoot!.querySelector('slot[name="after"]') as HTMLSlotElement;

    expect(shadowRoot!.querySelector("legend")?.textContent).toBe("Color");
    expect(inputs.map((input) => input.value)).toEqual(["red", "green", "blue"]);
    expect(labels.map((label) => label.textContent)).toEqual(["Red", "Green", "Blue"]);
    expect(slotBefore.assignedNodes()[0]?.textContent).toBe("Choose a primary color.");
    expect(slotAfter.assignedNodes()[0]?.textContent).toBe("This will be the most used color.");
  });

  it("updates value when a radio button changes", async () => {
    const { root, waitForChanges } = await getPage();
    const greenButton = root.shadowRoot!.querySelector("#green") as HTMLInputElement;
    greenButton.checked = true;
    greenButton.dispatchEvent(new Event("change", { bubbles: true }));
    await waitForChanges();
    expect((root as HTMLRadioGroupElement).value).toBe("green");
    expect(greenButton.checked).toBe(true);
  });

  it("does not emit when the selected value is the same", async () => {
    const { root, waitForChanges } = await getPage();
    const eventSpy = vi.fn();
    root.addEventListener("valueChanged", eventSpy);
    const blueButton = root.shadowRoot!.querySelector("#blue") as HTMLInputElement;
    blueButton.checked = true;
    blueButton.dispatchEvent(new Event("change", { bubbles: true }));
    await waitForChanges();
    expect((root as HTMLRadioGroupElement).value).toBe("blue");
    expect(eventSpy).not.toHaveBeenCalled();
  });
});
