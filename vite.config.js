import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/crm": {
        target: "https://fakeapifordevs.vercel.app",
        changeOrigin: true,
        secure: true,
      },
      "/api/auth": {
        target: "https://fakeapifordevs.vercel.app",
        changeOrigin: true,
        secure: true,
      },
      "/api/notifications": {
        target: "https://fakeapifordevs.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
