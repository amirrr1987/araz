import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});