// This is used to compile server-side code.
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // This avoids deleting outDir client files.
    emptyOutDir: false,

    rollupOptions: {
      input: {
        server: 'src/server.ts',
      },
    },

    ssr: {
      external: ['@hono/node-server'],
    },

    target: 'node24',
  },
});
