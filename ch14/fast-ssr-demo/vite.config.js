import { defineConfig } from "vite";

// This adds the FAST SSR DOM shim before any imports in the server chunk.
function addDomShimToServerChunk(chunk) {
  return chunk.name === "server"
    ? 'import "@microsoft/fast-ssr/install-dom-shim.js";'
    : "";
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: ["src/hello-world.ts", "src/server.ts"],
      output: {
        banner: addDomShimToServerChunk,
      },
    },
    ssr: {},
  },
});
