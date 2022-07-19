import {defineConfig} from '@micra/vite-config/library';
import {cwd} from '@micra/vite-config/utilities/cwd';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', '@micra/core', '@micra/spa-router'],
      input: {
        index: cwd('index.ts'),
      },
    },
  },

  plugins: [],
});
