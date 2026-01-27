<script lang="ts">
  import { onMount } from "svelte";
  import "./hello-world.js";
  import "./radio-group.js";

  const initialColor = "red";
  let helloWorldElement: HTMLElement | undefined = undefined;
  let radioGroupElement: HTMLElement | undefined = undefined;

  onMount(() => {
    const color = radioGroupElement
      ? (radioGroupElement as any).value
      : "black";
    updateColor(color);
  });

  function handleEvent(event: CustomEvent) {
    updateColor(event.detail.value);
  }

  function updateColor(color: string) {
    if (helloWorldElement) helloWorldElement.style.color = color;
  }
</script>

<main>
  <hello-world name="Mark" bind:this={helloWorldElement}></hello-world>
  <radio-group
    name="color"
    bind:this={radioGroupElement}
    labels="Red,Green,Blue"
    value={initialColor}
    values="red,green,blue"
    on:change={handleEvent}
  ></radio-group>
</main>
