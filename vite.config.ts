import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
  },
  build: {
    target: "es2022",
    rollupOptions: {
      input: ["./src/xerris-root-config.ts"],
      preserveEntrySignatures: "exports-only",
      output: {
        exports: "auto",
      },
    },
  },
});
