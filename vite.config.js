import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      "@components": "/src/components",
      "@layout": "/src/layout",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@assets": "/src/assets",
      "@ui": "/src/ui",
      "@services": "/src/services",
      "@routes": "/src/routes",
    },
  },
});
