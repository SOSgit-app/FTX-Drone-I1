import { defineConfig } from 'vite';

// We keep your existing `index.html` as the renderer entry.
// Build output goes to `dist-renderer/`.
export default defineConfig({
  root: '.',
  base: './',
  build: {
    // Output path used by Electron + electron-builder packaging.
    // For external-drive builds, we create a junction `dist-renderer -> F:\DroneFTX2-renderer`.
    outDir: 'dist-renderer',
    emptyOutDir: true,
  },
});

