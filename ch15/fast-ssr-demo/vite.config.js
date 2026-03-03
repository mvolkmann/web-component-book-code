import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "server.ts",
      output: {
        format: "esm",
      },
    },
    ssr: {
      noExternal: [],
      external: [
        "@hono/node-server",
        "stream",
        "buffer",
        "http",
        "https",
        "fs",
      ],
    },
    target: "node24",
  },
});
