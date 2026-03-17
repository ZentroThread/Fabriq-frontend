import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://fabriq-frontend.vercel.app"
  },
});