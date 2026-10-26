import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vendor code rarely changes, so keep it in its own long-lived chunks
        // while the app chunks (and the lazy sections) change with each deploy.
        manualChunks: (id) => {
          if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/.test(id)) return "react";
          if (/node_modules[\\/](gsap|@gsap|lenis)[\\/]/.test(id)) return "motion";
        },
      },
    },
  },
}));
