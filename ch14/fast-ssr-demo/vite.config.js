import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: ["src/hello-world.ts", "src/server.ts"],
    },
    ssr: {},
  },
});
