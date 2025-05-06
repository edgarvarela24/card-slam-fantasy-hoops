import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/database', 'firebase/functions'],
    force: true,
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    }
  },
  resolve: {
    dedupe: ['firebase', '@firebase/app', '@firebase/auth', '@firebase/database', '@firebase/firestore', '@firebase/functions'],
    preserveSymlinks: true
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/firebase/, /node_modules/]
    },
    rollupOptions: {
      external: ['@firebase/auth', '@firebase/app', '@firebase/firestore', '@firebase/database', '@firebase/functions', '@firebase/util'],
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/database', 'firebase/functions']
        }
      }
    }
  },
  // Add specific instructions for handling Firebase modules
  ssr: {
    // Avoid SSR problems with Firebase
    noExternal: ['firebase', '@firebase/*']
  }
})
