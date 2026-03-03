import { defineConfig } from "vite";

const clientConfig = defineConfig({
  build: {
    outDir: "public",
    rollupOptions: {
      input: "src/hello-world.ts",
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});

const serverConfig = defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/server.ts",
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

export default defineConfig(({ mode }) => {
  return mode === "client" ? clientConfig : serverConfig;
});
