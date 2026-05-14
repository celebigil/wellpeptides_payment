import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The BE Jinja shell references the bundle at fixed paths
// (assets/index.js, assets/index.css) so it doesn't have to read a
// manifest. Deterministic names are mandatory — Vite hashes by default.
//
// `base` must be absolute in production: the landing host (set by
// EXTERNAL_PAYMENT_HOST on the BE) loads the HTML from Cloud Run, but
// assets (logo, fonts, JS, CSS) live on Cloudflare Pages. Without an
// absolute base, the browser resolves relative URLs against the BE host
// and 404s on every asset.
export default defineConfig(({ command }) => ({
    base: command === "build" ? "https://wellpeptides-payment.pages.dev/" : "/",
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
}));
