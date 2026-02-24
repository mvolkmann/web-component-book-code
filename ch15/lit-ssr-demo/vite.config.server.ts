// This is used to compile server-side code.
import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // avoids generating dist/index.html
  build: {
    // This avoids deleting outDir client files
    // created using vite.config.js.
    emptyOutDir: false,
    ssr: true,
    lib: {
      entry: "server.ts",
      formats: ["es"],
    },
    outDir: "../dist",
    rollupOptions: {
      output: {
        // Default is "assets/{name}-{hash}.js" which we do not want.
        entryFileNames: "[name].js",
      },
      // These are all the Node modules used by server.ts and its dependencies.
      external: ["buffer", "fs", "http", "http2", "path", "stream"],
    },
  },
  // This is necessary when using Lit SSR.
  // It avoids "ReferenceError: HTMLElement is not defined".
  resolve: {
    conditions: ["node"],
  },
});
