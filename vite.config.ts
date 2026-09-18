import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const sheetUrl =
    process.env.VITE_GOOGLE_SHEET_URL ||
    'https://docs.google.com/spreadsheets/d/1jMaLcDctj4MAUl-mXQGCdCZ36B4c3TGCliVFP_zA20E/edit?usp=sharing';

  const adminPassword = process.env.VITE_ADMIN_PASSWORD || 'admin';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_GOOGLE_SHEET_URL': JSON.stringify(sheetUrl),
      'import.meta.env.VITE_ADMIN_PASSWORD': JSON.stringify(adminPassword),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
