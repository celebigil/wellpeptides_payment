import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The BE Jinja shell references the bundle at fixed paths
// (assets/index.js, assets/index.css) so it doesn't have to read a
// manifest. Deterministic names are mandatory — Vite hashes by default.
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "assets/index.js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith(".css")) {
                        return "assets/index.css";
                    }
                    return "assets/[name][extname]";
                },
            },
        },
    },
    server: {
        port: 5174,
    },
});
