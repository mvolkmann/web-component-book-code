// This is used to compile client-side code.
// It also copies public/index.html to the dist directory.
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // This avoids deleting outDir server files
    // created using vite.config.server.js.
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "hello-world": "src/hello-world.ts",
      },
      output: {
        // Default is "assets/{name}-{hash}.js" which we do not want.
        entryFileNames: "[name].js",
      },
    },
  },
});
