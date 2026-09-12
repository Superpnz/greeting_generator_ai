import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/greeting_generator_ai/",
  server: {
    port: 1111,
    host: "127.0.0.1",
  },
});
