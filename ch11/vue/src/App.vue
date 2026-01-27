<script setup>
import { onMounted, ref } from "vue";
import "./hello-world.js";
import "./radio-group.js";

const initialColor = "red";
const helloWorldElement = ref(null);

onMounted(() => {
  updateColor(initialColor);
});

function handleChange(event) {
  updateColor(event.detail.value);
}

function updateColor(color) {
  const { value } = helloWorldElement;
  if (value) value.style.color = color;
}
</script>

<template>
  <hello-world name="Mark" ref="helloWorldElement"></hello-world>
  <radio-group
    name="color"
    labels="Red, Green, Blue"
    values="red, green, blue"
    :value="initialColor"
    @change="handleChange"
  ></radio-group>
</template>
