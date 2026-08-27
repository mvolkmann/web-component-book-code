import { h, render } from "@stencil/vitest";

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

describe("radio-group browser", () => {
  it("renders", async () => {
    const { root } = await getPage();
    expect(root).toHaveClass("hydrated");
    expect(root.shadowRoot?.querySelector("legend")?.textContent).toBe("Color");
    expect([...root.shadowRoot!.querySelectorAll("input")].map((input) => input.value)).toEqual([
      "red",
      "green",
      "blue",
    ]);
    expect(
      [...root.shadowRoot!.querySelectorAll("label")].map((label) => label.textContent),
    ).toEqual(["Red", "Green", "Blue"]);
  });

  it("can click a radio button", async () => {
    const { root, waitForChanges } = await getPage();
    const greenButton = root.shadowRoot!.querySelector("#green") as HTMLInputElement;
    expect(greenButton.checked).toBe(false);
    greenButton.click();
    await waitForChanges();
    expect(greenButton.checked).toBe(true);
    expect((root as HTMLRadioGroupElement).value).toBe("green");
  });
});
