import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { viteAlias } from "./scripts/alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: viteAlias
  }
})
