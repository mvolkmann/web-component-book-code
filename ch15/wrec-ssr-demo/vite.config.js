import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => {
  if (isSsrBuild) {
    return {
      build: {
        emptyOutDir: false,
        rollupOptions: {
          input: ["dom-setup.js", "server.ts"],
          output: {
            format: "es",
          },
        },
        ssr: true,
      },
    };
  }

  return {
    build: {
      rollupOptions: {
        input: "index.html",
      },
    },
  };
});
