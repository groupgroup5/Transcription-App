import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { vite as vidstack } from 'vidstack/plugins';

export default defineConfig({
  plugins: [vidstack({ include: /editor\// }), sveltekit()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    fs: {
      allow: [
        './static',
      ],
    },
  },
  envPrefix: ['VITE_', 'TAURI_']
});
