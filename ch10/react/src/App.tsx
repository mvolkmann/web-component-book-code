import { useEffect, useRef } from "react";
import "./App.css";
import "./hello-world.js";
import "./radio-group.js";

function App() {
  let helloWorldRef = useRef<HTMLElement | null>(null);
  let radioGroupRef = useRef<HTMLElement | null>(null);

  function updateColor(color: string) {
    const { current } = helloWorldRef;
    if (current) (current as any).color = color;
  }

  useEffect(() => {
    const { current } = radioGroupRef;
    const color = current ? (current as any).value : "black";
    updateColor(color);
  }, []);

  function handleChange(event: Event) {
    // In React, the event is wrapped in a SyntheticEvent.
    // We need to get the native event in order to
    // access the CustomEvent detail.value property.
    const nativeEvent = event.nativeEvent as CustomEvent<{ value: string }>;
    const color = nativeEvent.detail.value;
    updateColor(color);
  }

  return (
    <>
      <hello-world name="Mark" ref={helloWorldRef}></hello-world>
      <radio-group
        labels="Red,Green,Blue"
        name="primaryColor"
        ref={radioGroupRef}
        values="red,green,blue"
        value="red"
        onChange={handleChange}
      ></radio-group>
    </>
  );
}

export default App;
