import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

enum Modes {
  DEV = "development",
  PROD = "production",
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const importMap = mode === Modes.DEV ? "local" : "production";

  return {
    plugins: [
      react(),
      // use correct import-map based on which mode we are using (dev, prod)
      viteStaticCopy({
        targets: [
          {
            src: `./import-maps/${importMap}.import-map.json`,
            dest: "",
            rename: "import-map.json",
            transform: (content) => {
              const importMapJson = JSON.stringify(
                JSON.parse(content.toString()),
                null,
                2
              );
              return importMapJson;
            },
          },
        ],
      }),
    ],
    server: {
      port: 9000,
    },
    build: {
      target: "es2022",
      rollupOptions: {
        input: ["./src/xerris-root-config.ts"],
        preserveEntrySignatures: "exports-only",
        output: {
          format: "system",
          exports: "auto",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
