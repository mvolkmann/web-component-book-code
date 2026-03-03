import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: ["src/hello-world.ts", "src/server.ts"],
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
