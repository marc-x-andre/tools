import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "JSON Toolset 🤖",
        short_name: "JSON 🤖",
        description:
          "JSON Toolset offers a range of features to make your JSON-related tasks easier and more efficient.",
        theme_color: "#723aa5",
        icons: [
          {
            src: "icons/mash-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/mash-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/mash-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      views: fileURLToPath(new URL("./src/views", import.meta.url)),
      vars: fileURLToPath(new URL("./src/assets/index.sass", import.meta.url)),
    },
  },
});
