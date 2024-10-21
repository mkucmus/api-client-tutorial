import tutorialkit from "@tutorialkit/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://frontends-api-client.github.io",
  base: "mkucmus/api-client-tutorial",
  // devToolbar: {
  //   enabled: false,
  // },
  integrations: [tutorialkit()],
});
