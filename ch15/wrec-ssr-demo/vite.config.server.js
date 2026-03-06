import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: "server.ts",
      output: {
        format: "es",
      },
    },
    ssr: true,
  },
});
