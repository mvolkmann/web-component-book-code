import { onMount } from "solid-js";
import "./hello-world.js";
import "./radio-group.js";

function App() {
  const initialColor = "red";
  let helloWorldRef: HTMLElement | null = null;
  let radioGroupRef: HTMLElement | null = null;

  onMount(() => {
    const color = radioGroupRef ? (radioGroupRef as any).value : "black";
    updateColor(color);
  });

  function handleChange(event: Event) {
    updateColor((event as CustomEvent).detail.value);
  }

  function updateColor(color: string) {
    if (helloWorldRef) (helloWorldRef as any).color = color;
  }

  return (
    <>
      <hello-world name="Mark" ref={helloWorldRef}></hello-world>
      <radio-group
        name="color"
        labels="Red,Green,Blue"
        ref={radioGroupRef}
        value={initialColor}
        values="red,green,blue"
        onChange={handleChange}
      ></radio-group>
    </>
  );
}

export default App;
