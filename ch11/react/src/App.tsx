import { useEffect, useRef } from "react";
import "./App.css";
import "./hello-world.js";
import "./radio-group.js";

function App() {
  let helloWorldRef = useRef<HTMLElement | null>(null);
  let radioGroupRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const { current } = radioGroupRef;
    const color = current ? (current as any).value : "black";
    updateColor(color);
  }, []);

  function handleChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    updateColor(value);
  }

  function updateColor(color: string) {
    const { current } = helloWorldRef;
    if (current) current.style.color = color;
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
