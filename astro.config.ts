import tutorialkit from "@tutorialkit/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mkucmus.github.io/api-client-tutorial/",
  base: "mkucmus/api-client-tutorial",
  // devToolbar: {
  //   enabled: false,
  // },
  integrations: [tutorialkit()],
});
