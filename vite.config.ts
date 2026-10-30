import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => {
  const isVercel = Boolean(process.env.VERCEL);
  const isHosting = Boolean(process.env.HOSTING_BUILD);
  // Default to '/' for localhost dev, preview, tests and Vercel; '/revelado-cultural/' when explicitly building for cPanel/Apache subdirectory hosting
  const base =
    process.env.VITE_BASE_PATH ||
    (isHosting ? '/revelado-cultural/' : '/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/') ||
              id.includes('/react-router/') ||
              id.includes('/react-router-dom/')
            ) {
              return 'vendor-react';
            }
            if (
              id.includes('/motion/') ||
              id.includes('/framer-motion/') ||
              id.includes('/motion-dom/') ||
              id.includes('/motion-utils/')
            ) {
              return 'vendor-motion';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            return undefined;
          },
        },
      },
    },
  };
});
