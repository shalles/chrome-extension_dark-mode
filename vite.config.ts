import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // lib: {
    //   name:     '@shalles/chrome-extension_dark-mode',
    //   entry:    fileURLToPath(new URL('./src/main.ts', import.meta.url)),
    //   fileName: 'template-ts',
    // },
    rollupOptions: {
      input: {
        popup:   fileURLToPath(new URL('./src/popup.html', import.meta.url)),
        content: fileURLToPath(new URL('./src/content.ts', import.meta.url)),
        // background: fileURLToPath(new URL('./src/background.ts', import.meta.url)),
      },
      output: {
        globals: {
          chrome: 'chrome'
        },
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    hmr:  true,
    host: '127.0.0.1',
    // https: true,
    // port: 5173,
  },
});
