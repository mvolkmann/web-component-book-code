import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
  plugins: [visualizer({ open: true })],
});
